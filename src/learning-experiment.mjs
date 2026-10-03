import {TinyNetwork, createControlConfig, q, Protocol} from './network.mjs';
import {PlasticSynapse} from './plastic-synapse.mjs';

const ids = ['input', 'relay', 'output'];

export function learningCircuitSpec(weight) {
  const config = createControlConfig();
  return {
    neurons: ids.map(id => ({id, config})),
    synapses: [
      {id: 'input_relay', from: 'input', to: 'relay', kind: 'excitatory', conductance: q(12, 'nS'), delay: q(1, 'ms')},
      {id: 'relay_output_plastic', from: 'relay', to: 'output', kind: 'excitatory', conductance: weight, delay: q(2, 'ms')},
    ],
    tick: q(1, 'ms'), maxStep: q(.01, 'ms'), sampleInterval: q(.1, 'ms'),
  };
}

export function runLearningTrial(weight, {teacher = null} = {}) {
  const network = new TinyNetwork(learningCircuitSpec(weight));
  const inputs = {input: Protocol.step('c0', q(500, 'pA'), q(5, 'ms'), q(5.5, 'ms'))};
  if (teacher === 'after') inputs.output = Protocol.step('c0', q(500, 'pA'), q(10, 'ms'), q(10.5, 'ms'));
  else if (teacher === 'before') inputs.output = Protocol.step('c0', q(500, 'pA'), q(5, 'ms'), q(5.5, 'ms'));
  else if (teacher !== null) throw Error('TEACHER_MODE');
  const started = performance.now();
  network.advance(q(40, 'ms'), inputs);
  const output = network.outputs();
  const spikes = Object.fromEntries(ids.map(id => [id, output.spikes.filter(s => s.neuron === id).map(s => s.time_s)]));
  return {weight_nS: weight.in('nS'), teacher, wall_ms: performance.now() - started, state_hash: network.stateHash, spikes,
    counts: Object.fromEntries(ids.map(id => [id, output.neurons[id].total_spikes])), samples: output.samples, transmissions: output.transmissions};
}

function train(synapse, count, teacher) {
  const trials = [];
  for (let trial = 1; trial <= count; trial++) {
    const response = runLearningTrial(synapse.weight, {teacher});
    const pre = response.spikes.relay[0], post = response.spikes.output[0];
    if (!Number.isFinite(pre) || !Number.isFinite(post)) throw Error('PAIRING_SPIKE_MISSING');
    const update = synapse.learn({trial: synapse.history.length + 1, preTime: q(pre, 's'), postTime: q(post, 's')});
    trials.push({...response, update});
  }
  return trials;
}

export function runStdpExperiment({trainingTrials = 8, reversalTrials = 8} = {}) {
  if (!Number.isSafeInteger(trainingTrials) || trainingTrials < 1 || trainingTrials > 20 || !Number.isSafeInteger(reversalTrials) || reversalTrials < 1 || reversalTrials > 20) throw Error('TRIAL_COUNT');
  const learned = new PlasticSynapse({rule: 'additive-clipped'});
  const baseline = runLearningTrial(learned.weight);
  const causal_trials = train(learned, trainingTrials, 'after');
  const learnedTest = runLearningTrial(learned.weight);
  const memory = learned.snapshot();
  const restored = PlasticSynapse.restore(JSON.parse(JSON.stringify(memory)));
  const restoredTest = runLearningTrial(restored.weight);

  const control = new PlasticSynapse({rule: 'additive-clipped'});
  const control_trials = Array.from({length: trainingTrials}, () => runLearningTrial(control.weight));
  const controlTest = runLearningTrial(control.weight);

  const reversed = PlasticSynapse.restore(JSON.parse(JSON.stringify(memory)));
  const reverse_trials = train(reversed, reversalTrials, 'before');
  const reversedTest = runLearningTrial(reversed.weight);

  const assertions = {
    baseline_silent: baseline.counts.output === 0,
    causal_weight_increased: learned.weight.in('nS') > baseline.weight_nS,
    learned_response: learnedTest.counts.output >= 1,
    restored_weight_equal: restored.weight.in('S') === learned.weight.in('S'),
    restored_response_equal: JSON.stringify(restoredTest.counts) === JSON.stringify(learnedTest.counts),
    control_weight_unchanged: control.weight.in('nS') === baseline.weight_nS,
    control_remains_silent: controlTest.counts.output === 0,
    reverse_weight_decreased: reversed.weight.in('nS') < learned.weight.in('nS'),
    reverse_erases_response: reversedTest.counts.output === 0,
  };
  return {passed: Object.values(assertions).every(Boolean), assertions,
    parameters: {training_trials: trainingTrials, reversal_trials: reversalTrials, learning_rule: 'pair-based exponential STDP', episodic_cell_reset: true},
    baseline, causal_trials, learned_test: learnedTest, learned_memory: memory, restored_test: restoredTest,
    control_trials, control_test: controlTest, reverse_trials, reversed_test: reversedTest, reversed_memory: reversed.snapshot()};
}
