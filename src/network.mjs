import {ControlNeuron, createControlConfig, controlConfigFromJSON} from './cell/control-neuron.mjs';
import {compileControl} from './cell/control-config.mjs';
import {q, scalar} from './cell/units.mjs';
import {Protocol} from './cell/protocol.mjs';
import {SimulationClock, MemoryJournal, exactKeys, freeze, hash, positive} from './cell/runtime.mjs';

export {q, Protocol, createControlConfig};
const VERSION = '1.0.0';
const MODEL_HASH = hash({version: VERSION, cell: 'ControlNeuron 1.0.0', scheduler: 'synchronous lookahead, exact spike-time plus delay', learning: false});
const identifier = value => {
  if (typeof value !== 'string' || !/^[A-Za-z][A-Za-z0-9_]{0,31}$/.test(value)) throw Error('INVALID_ID');
  return value;
};
const integer = (value, min, max, label) => {
  if (!Number.isSafeInteger(value) || value < min || value > max) throw Error('INVALID_LIMIT ' + label);
  return value;
};
function normalize(spec) {
  if (!spec || Object.getPrototypeOf(spec) !== Object.prototype) throw Error('NETWORK_SPEC');
  for (const key of Object.keys(spec)) if (!['neurons', 'synapses', 'tick', 'maxStep', 'sampleInterval', 'maxTicks', 'maxCommands', 'maxEvents', 'maxSamples'].includes(key)) throw Error('UNKNOWN_FIELD ' + key);
  if (!Array.isArray(spec.neurons) || spec.neurons.length < 1 || spec.neurons.length > 16) throw Error('NEURON_COUNT');
  if (!Array.isArray(spec.synapses) || spec.synapses.length > 64) throw Error('SYNAPSE_COUNT');
  const tick_s = positive(scalar(spec.tick ?? q(1, 'ms'), 's'), 'tick');
  const max_step_s = positive(scalar(spec.maxStep ?? q(.01, 'ms'), 's'), 'integration step');
  const sample_interval_s = positive(scalar(spec.sampleInterval ?? q(.1, 'ms'), 's'), 'sample interval');
  if (tick_s > .01 || max_step_s > .00002 || max_step_s > tick_s || sample_interval_s > tick_s) throw Error('TIME_RESOLUTION');
  const neurons = spec.neurons.map(node => {
    exactKeys(node, ['id', 'config'], 'neuron');
    compileControl(node.config);
    return {id: identifier(node.id), configuration: node.config};
  }).sort((a, b) => a.id.localeCompare(b.id, 'en'));
  const ids = new Set(neurons.map(n => n.id));
  if (ids.size !== neurons.length) throw Error('DUPLICATE_NEURON');
  const synapses = spec.synapses.map(edge => {
    exactKeys(edge, ['id', 'from', 'to', 'kind', 'conductance', 'delay'], 'synapse');
    if (!ids.has(edge.from) || !ids.has(edge.to)) throw Error('UNKNOWN_NEURON');
    if (!['excitatory', 'inhibitory'].includes(edge.kind)) throw Error('SYNAPSE_KIND');
    const conductance_S = positive(scalar(edge.conductance, 'S'), 'conductance');
    const delay_s = positive(scalar(edge.delay, 's'), 'delay');
    if (delay_s < tick_s) throw Error('DELAY_MUST_COVER_TICK');
    if (delay_s > 10) throw Error('DELAY_LIMIT');
    if (conductance_S > neurons.find(n => n.id === edge.to).configuration.parameters.max_input_S) throw Error('CONDUCTANCE_LIMIT');
    return {id: identifier(edge.id), from: edge.from, to: edge.to, kind: edge.kind, conductance_S, delay_s};
  }).sort((a, b) => a.id.localeCompare(b.id, 'en'));
  if (new Set(synapses.map(s => s.id)).size !== synapses.length) throw Error('DUPLICATE_SYNAPSE');
  return freeze({version: VERSION, origin_s: 0, neurons, synapses, tick_s, max_step_s, sample_interval_s,
    limits: {ticks: integer(spec.maxTicks ?? 1000, 1, 4000, 'ticks'), commands: integer(spec.maxCommands ?? 128, 1, 512, 'commands'), events: integer(spec.maxEvents ?? 10000, 1, 100000, 'events'), samples: integer(spec.maxSamples ?? 50000, 1, 500000, 'samples')}});
}
function specFromConfiguration(c) {
  const shared = new Map();
  return {
    neurons: c.neurons.map(n => {
      const key = n.configuration.configuration_hash;
      if (!shared.has(key)) shared.set(key, controlConfigFromJSON(n.configuration));
      return {id: n.id, config: shared.get(key)};
    }),
    synapses: c.synapses.map(e => ({id: e.id, from: e.from, to: e.to, kind: e.kind, conductance: q(e.conductance_S, 'S'), delay: q(e.delay_s, 's')})),
    tick: q(c.tick_s, 's'), maxStep: q(c.max_step_s, 's'), sampleInterval: q(c.sample_interval_s, 's'),
    maxTicks: c.limits.ticks, maxCommands: c.limits.commands, maxEvents: c.limits.events, maxSamples: c.limits.samples,
  };
}

export class TinyNetwork {
  #configuration;
  #cells;
  #state;
  #journal = new MemoryJournal();
  #auditCount = 0;

  constructor(spec) {
    this.#configuration = normalize(spec);
    this.#cells = new Map(this.#configuration.neurons.map(n => [n.id, new ControlNeuron(n.configuration, {clock: new SimulationClock(q(0, 's'))})]));
    this.#state = {tick: 0, commands: [], cursors: Object.fromEntries([...this.#cells.keys()].map(id => [id, 0])), spikes: [], transmissions: [], samples: [...this.#cells].map(([id, cell]) => ({neuron: id, time_s: 0, voltage_V: cell.outputs().voltage_V}))};
    if (this.#state.samples.length > this.#configuration.limits.samples) throw Error('SAMPLE_LIMIT');
    this.#audit('CREATE', {state_hash: this.stateHash});
    Object.freeze(this);
  }

  get configuration() { return this.#configuration; }
  get time() { return q(this.#state.tick * this.#configuration.tick_s, 's'); }
  get stateHash() { return this.snapshot().state_hash; }
  get journal() { return this.#journal.entries; }
  get capabilities() { return freeze({network_execution: true, learning: false, krita_write: false, file_write: false, internet: false}); }

  #audit(kind, data) {
    this.#journal.append(kind, {...data, model_hash: MODEL_HASH});
    this.#auditCount++;
  }
  #checkAudit() {
    if (this.#auditCount >= this.#configuration.limits.commands * 4 + 16) throw Error('AUDIT_LIMIT');
  }
  #fresh() { return new TinyNetwork(specFromConfiguration(this.#configuration)); }
  #recordError(error) {
    if (this.#auditCount < this.#configuration.limits.commands * 4 + 16) this.#audit('REJECT', {time_s: this.time.in('s'), message: String(error.message).slice(0, 512)});
    throw error;
  }

  #simulate(command) {
    exactKeys(command, ['kind', 'ticks', 'inputs'], 'command');
    if (command.kind !== 'ADVANCE') throw Error('COMMAND_KIND');
    const c = this.#configuration;
    integer(command.ticks, 1, Number.MAX_SAFE_INTEGER, 'advance ticks');
    if (this.#state.tick + command.ticks > c.limits.ticks) throw Error('TICK_LIMIT');
    if (this.#state.commands.length >= c.limits.commands) throw Error('COMMAND_LIMIT');
    if (!command.inputs || Object.getPrototypeOf(command.inputs) !== Object.prototype) throw Error('INPUTS');
    const protocols = new Map();
    for (const [id, values] of Object.entries(command.inputs)) {
      if (!this.#cells.has(id)) throw Error('UNKNOWN_NEURON');
      if (!Array.isArray(values) || values.length > 100) throw Error('PROTOCOL_LIMIT');
      const parsed = values.map(Protocol.fromJSON);
      if (parsed.some(p => p.target !== null && p.target !== 'c0')) throw Error('CELL_TARGET_MUST_BE_C0');
      protocols.set(id, parsed);
    }
    for (let step = 0; step < command.ticks; step++) {
      const begin = this.time.in('s'), end = (this.#state.tick + 1) * c.tick_s;
      const emitted = [];
      for (const [id, cell] of this.#cells) {
        cell.advance(q(end - cell.time.in('s'), 's'), protocols.get(id) ?? Protocol.none(), {maxStep: q(c.max_step_s, 's'), recordInterval: q(c.sample_interval_s, 's')});
        if (Math.abs(cell.time.in('s') - end) > 1e-14) throw Error('CLOCK_DESYNCHRONIZED');
        for (const spike of cell.spikesSince(this.#state.cursors[id])) emitted.push({...spike, neuron: id});
        this.#state.cursors[id] = cell.outputs().total_spikes;
        // Network keeps its own complete, bounded traces; the cell's display buffer may roll.
        const rows = cell.records.filter(row => row.time_s > begin && row.time_s <= end + 1e-14);
        if (rows.length === 0 || rows[0].time_s - begin > c.sample_interval_s * 1.01) throw Error('CELL_SAMPLE_HISTORY_LOST');
        for (const row of rows) this.#state.samples.push({neuron: id, time_s: row.time_s, voltage_V: row.voltage_V});
        if (this.#state.samples.length > c.limits.samples) throw Error('SAMPLE_LIMIT');
      }
      // Finish the entire window before scheduling newly observed spikes. Since every
      // delay >= tick, none of these events can arrive inside a window already advanced.
      for (const item of this.#state.transmissions) {
        if (item.delivered) continue;
        const pending = this.#cells.get(item.to).outputs().pending_events;
        if (!pending.some(e => e.sequence === item.target_sequence)) item.delivered = true;
      }
      emitted.sort((a, b) => a.time_s - b.time_s || a.neuron.localeCompare(b.neuron, 'en') || a.sequence - b.sequence);
      this.#state.spikes.push(...emitted);
      if (this.#state.spikes.length > c.limits.events) throw Error('SPIKE_LIMIT');
      const sends = [];
      for (const spike of emitted) for (const edge of c.synapses) if (edge.from === spike.neuron) sends.push({edge, spike, arrival_s: spike.time_s + edge.delay_s});
      sends.sort((a, b) => a.arrival_s - b.arrival_s || a.edge.id.localeCompare(b.edge.id, 'en') || a.spike.sequence - b.spike.sequence);
      for (const {edge, spike, arrival_s} of sends) {
        if (arrival_s < end) throw Error('CAUSALITY_VIOLATION');
        const target = this.#cells.get(edge.to), sequence = target.outputs().next_sequence;
        target.receive({sequence, time: q(arrival_s, 's'), kind: edge.kind, conductance: q(edge.conductance_S, 'S')});
        this.#state.transmissions.push({synapse: edge.id, from: edge.from, to: edge.to, kind: edge.kind, conductance_S: edge.conductance_S, source_sequence: spike.sequence, target_sequence: sequence, emitted_at_s: spike.time_s, arrival_s, delivered: false});
        if (this.#state.transmissions.length > c.limits.events) throw Error('TRANSMISSION_LIMIT');
      }
      this.#state.tick++;
    }
    this.#state.commands.push(structuredClone(command));
  }

  advance(duration, inputs = {}) {
    try {
      this.#checkAudit();
      const count = positive(scalar(duration, 's'), 'duration') / this.#configuration.tick_s;
      const ticks = Math.round(count);
      if (!Number.isSafeInteger(ticks) || ticks < 1 || Math.abs(count - ticks) > 32 * Number.EPSILON * Math.max(1, count)) throw Error('DURATION_MUST_BE_TICK_MULTIPLE');
      if (!inputs || Object.getPrototypeOf(inputs) !== Object.prototype) throw Error('INPUTS');
      const normalized = {};
      for (const id of Object.keys(inputs).sort()) {
        if (!this.#cells.has(id)) throw Error('UNKNOWN_NEURON');
        const list = Array.isArray(inputs[id]) ? inputs[id] : [inputs[id]];
        if (list.some(p => !(p instanceof Protocol))) throw Error('PROTOCOL_REQUIRED');
        normalized[id] = list.map(p => p.toJSON());
      }
      const candidate = this.#fresh();
      for (const command of this.#state.commands) candidate.#simulate(command);
      candidate.#simulate({kind: 'ADVANCE', ticks, inputs: normalized});
      this.#cells = candidate.#cells;
      this.#state = candidate.#state;
      this.#audit('ADVANCE', {ticks, state_hash: this.stateHash});
      return this.outputs();
    } catch (error) { return this.#recordError(error); }
  }

  snapshot() {
    const data = {version: VERSION, model_hash: MODEL_HASH, configuration: this.#configuration, configuration_hash: hash(this.#configuration),
      state: {...structuredClone(this.#state), cells: Object.fromEntries([...this.#cells].map(([id, cell]) => [id, cell.snapshot()]))}};
    return {...data, state_hash: hash(data)};
  }

  restore(snapshot) {
    try {
      this.#checkAudit();
      exactKeys(snapshot, ['version', 'model_hash', 'configuration', 'configuration_hash', 'state', 'state_hash'], 'snapshot');
      const {state_hash, ...data} = snapshot;
      if (hash(data) !== state_hash) throw Error('SNAPSHOT_INTEGRITY');
      if (snapshot.version !== VERSION || snapshot.model_hash !== MODEL_HASH || snapshot.configuration_hash !== hash(this.#configuration) || hash(snapshot.configuration) !== hash(this.#configuration)) throw Error('SNAPSHOT_CONFIGURATION');
      if (!Array.isArray(snapshot.state.commands) || snapshot.state.commands.length > this.#configuration.limits.commands) throw Error('SNAPSHOT_COMMANDS');
      const candidate = this.#fresh();
      for (const command of snapshot.state.commands) candidate.#simulate(command);
      if (candidate.stateHash !== state_hash) throw Error('SNAPSHOT_REPLAY_MISMATCH');
      this.#cells = candidate.#cells;
      this.#state = candidate.#state;
      this.#audit('RESTORE', {state_hash});
      return this.outputs();
    } catch (error) { return this.#recordError(error); }
  }

  outputs() {
    return {time_s: this.time.in('s'), neurons: Object.fromEntries([...this.#cells].map(([id, cell]) => [id, cell.outputs()])),
      spikes: structuredClone(this.#state.spikes), transmissions: structuredClone(this.#state.transmissions), samples: structuredClone(this.#state.samples),
      capabilities: this.capabilities, validation: {kind: 'SMALL_FIXED_CIRCUIT', biological_equivalence: 'UNVERIFIED', learned: false, drawing_capability: false}};
  }
}
