import test from 'node:test';
import assert from 'node:assert/strict';
import {PlasticSynapse} from '../src/plastic-synapse.mjs';
import {q} from '../src/network.mjs';
import {runLearningTrial, runStdpExperiment} from '../src/learning-experiment.mjs';
import {hash} from '../src/cell/runtime.mjs';

test('causal spike order potentiates and reverse order depresses', () => {
  const causal = new PlasticSynapse();
  const up = causal.learn({trial: 1, preTime: q(5, 'ms'), postTime: q(10, 'ms')});
  assert.ok(up.applied_delta_S > 0);assert.ok(causal.weight.in('nS') > .4);
  const reverse = new PlasticSynapse();
  const down = reverse.learn({trial: 1, preTime: q(10, 'ms'), postTime: q(5, 'ms')});
  assert.ok(down.applied_delta_S < 0);assert.ok(reverse.weight.in('nS') < .4);
});

test('plastic weight respects both configured bounds', () => {
  const upper = new PlasticSynapse({rule: 'additive-clipped', initialWeight: q(13.9, 'nS')});
  upper.learn({trial: 1, preTime: q(5, 'ms'), postTime: q(5.1, 'ms')});assert.equal(upper.weight.in('nS'), 14);
  const lower = new PlasticSynapse({rule: 'additive-clipped', initialWeight: q(.3, 'nS')});
  lower.learn({trial: 1, preTime: q(5.1, 'ms'), postTime: q(5, 'ms')});assert.equal(lower.weight.in('nS'), .25);
});

test('JSON memory restore reproduces learned weight and history', () => {
  const source = new PlasticSynapse();
  source.learn({trial: 1, preTime: q(5, 'ms'), postTime: q(9, 'ms')});
  source.learn({trial: 2, preTime: q(5, 'ms'), postTime: q(8, 'ms')});
  const restored = PlasticSynapse.restore(JSON.parse(JSON.stringify(source.snapshot())));
  assert.equal(restored.weight.in('S'), source.weight.in('S'));assert.deepEqual(restored.history, source.history);
});

test('changing and rehashing stored history still fails deterministic replay', () => {
  const source = new PlasticSynapse();source.learn({trial: 1, preTime: q(5, 'ms'), postTime: q(9, 'ms')});
  const snapshot = source.snapshot();snapshot.state.updates[0].after_S += 1e-9;
  const {state_hash, ...payload} = snapshot;snapshot.state_hash = hash(payload);
  assert.throws(() => PlasticSynapse.restore(snapshot), /REPLAY/);
});

test('weak plastic connection is silent without a teacher spike', () => {
  const response = runLearningTrial(q(.4, 'nS'));
  assert.deepEqual(response.counts, {input: 1, relay: 1, output: 0});
});

test('complete pre-registered STDP experiment meets all criteria', () => {
  const result = runStdpExperiment();
  assert.equal(result.passed, true, JSON.stringify(result.assertions));
  assert.ok(Object.values(result.assertions).every(Boolean));
});
