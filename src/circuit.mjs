import {TinyNetwork, createControlConfig, q, Protocol} from './network.mjs';

export function circuitSpec({inhibition = true, disconnected = false, tick_ms = 1, max_step_ms = .01} = {}) {
  const config = createControlConfig();
  const synapses = disconnected ? [] : [
    {id: 'input_relay', from: 'input', to: 'relay', kind: 'excitatory', conductance: q(12, 'nS'), delay: q(1, 'ms')},
    {id: 'relay_output', from: 'relay', to: 'output', kind: 'excitatory', conductance: q(12, 'nS'), delay: q(2, 'ms')},
  ];
  if (inhibition && !disconnected) synapses.push({id: 'input_output_inhibition', from: 'input', to: 'output', kind: 'inhibitory', conductance: q(80, 'nS'), delay: q(1, 'ms')});
  return {neurons: ['input', 'relay', 'output'].map(id => ({id, config})), synapses, tick: q(tick_ms, 'ms'), maxStep: q(max_step_ms, 'ms'), sampleInterval: q(.1, 'ms')};
}
export const createCircuit = options => new TinyNetwork(circuitSpec(options));
export const stimulus = () => ({input: Protocol.step('c0', q(500, 'pA'), q(5, 'ms'), q(5.5, 'ms'))});
export function runExperiment(options = {}) {
  const network = createCircuit(options);
  network.advance(q(40, 'ms'), stimulus());
  return {configuration: network.configuration, state_hash: network.stateHash, ...network.outputs()};
}
