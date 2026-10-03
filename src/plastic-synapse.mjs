import {q, scalar} from './cell/units.mjs';
import {exactKeys, freeze, hash, positive} from './cell/runtime.mjs';

const LEGACY_VERSION = '1.0.0';
const VERSION = '2.0.0';
const CONFIG_KEYS = ['initial_weight_S', 'min_weight_S', 'max_weight_S', 'potentiation_S', 'depression_S', 'time_constant_s'];
const finite = (value, name) => {
  if (!Number.isFinite(value)) throw Error('INVALID_' + name.toUpperCase());
  return value;
};
const close = (a, b) => Math.abs(a - b) <= 64 * Number.EPSILON * Math.max(Number.MIN_VALUE, Math.abs(a), Math.abs(b));

function normalize(options = {}) {
  if (!options || Object.getPrototypeOf(options) !== Object.prototype) throw Error('STDP_CONFIG');
  for (const key of Object.keys(options)) if (!['initialWeight', 'minWeight', 'maxWeight', 'potentiation', 'depression', 'timeConstant', 'rule'].includes(key)) throw Error('UNKNOWN_FIELD ' + key);
  const rule = options.rule ?? 'soft-bounded';
  if (!['soft-bounded', 'additive-clipped'].includes(rule)) throw Error('STDP_RULE');
  // Engineering preset, not a fit to human tissue. Legacy trials retain their original amplitudes.
  const amplitude_nS = rule === 'soft-bounded' ? .001 : 1.5;
  const config = {
    initial_weight_S: positive(scalar(options.initialWeight ?? q(.4, 'nS'), 'S'), 'initial weight'),
    min_weight_S: positive(scalar(options.minWeight ?? q(.25, 'nS'), 'S'), 'minimum weight'),
    max_weight_S: positive(scalar(options.maxWeight ?? q(14, 'nS'), 'S'), 'maximum weight'),
    potentiation_S: positive(scalar(options.potentiation ?? q(amplitude_nS, 'nS'), 'S'), 'potentiation'),
    depression_S: positive(scalar(options.depression ?? q(amplitude_nS, 'nS'), 'S'), 'depression'),
    time_constant_s: positive(scalar(options.timeConstant ?? q(20, 'ms'), 's'), 'time constant'),
  };
  if (config.min_weight_S >= config.max_weight_S || config.initial_weight_S < config.min_weight_S || config.initial_weight_S > config.max_weight_S) throw Error('WEIGHT_RANGE');
  if (config.potentiation_S > config.max_weight_S || config.depression_S > config.max_weight_S) throw Error('UPDATE_RANGE');
  if (rule === 'soft-bounded') {
    const span = config.max_weight_S - config.min_weight_S;
    if (config.potentiation_S > span || config.depression_S > span) throw Error('UPDATE_RANGE');
    config.weight_dependence = rule;
  }
  return freeze(config);
}
function optionsFromConfiguration(c) {
  return {initialWeight: q(c.initial_weight_S, 'S'), minWeight: q(c.min_weight_S, 'S'), maxWeight: q(c.max_weight_S, 'S'),
    potentiation: q(c.potentiation_S, 'S'), depression: q(c.depression_S, 'S'), timeConstant: q(c.time_constant_s, 's'),
    rule: c.weight_dependence ?? 'additive-clipped'};
}

export class PlasticSynapse {
  #configuration;
  #state;

  constructor(options = {}) {
    this.#configuration = normalize(options);
    this.#state = {weight_S: this.#configuration.initial_weight_S, updates: []};
    Object.freeze(this);
  }

  get configuration() { return this.#configuration; }
  get weight() { return q(this.#state.weight_S, 'S'); }
  get history() { return structuredClone(this.#state.updates); }
  get capabilities() { return freeze({pair_based_stdp: true, soft_bounds: this.#configuration.weight_dependence === 'soft-bounded', persistence: true, online_continuous_learning: false, reward_modulation: false, human_calibrated: false}); }

  learn({trial, preTime, postTime}) {
    if (!Number.isSafeInteger(trial) || trial < 1 || trial !== this.#state.updates.length + 1) throw Error('TRIAL_SEQUENCE');
    if (this.#state.updates.length >= 10000) throw Error('STDP_HISTORY');
    const pre_time_s = finite(scalar(preTime, 's'), 'pre_time');
    const post_time_s = finite(scalar(postTime, 's'), 'post_time');
    const soft = this.#configuration.weight_dependence === 'soft-bounded';
    if (pre_time_s < 0 || post_time_s < 0 || (!soft && pre_time_s === post_time_s)) throw Error('SPIKE_TIMING');
    const delta_t_s = post_time_s - pre_time_s;
    let raw_delta_S = delta_t_s === 0 ? 0 : delta_t_s > 0
      ? this.#configuration.potentiation_S * Math.exp(-delta_t_s / this.#configuration.time_constant_s)
      : -this.#configuration.depression_S * Math.exp(delta_t_s / this.#configuration.time_constant_s);
    const before_S = this.#state.weight_S;
    if (soft) {
      const span = this.#configuration.max_weight_S - this.#configuration.min_weight_S;
      const room = delta_t_s > 0 ? this.#configuration.max_weight_S - before_S : before_S - this.#configuration.min_weight_S;
      raw_delta_S *= room / span;
    }
    const after_S = Math.min(this.#configuration.max_weight_S, Math.max(this.#configuration.min_weight_S, before_S + raw_delta_S));
    const entry = {trial, pre_time_s, post_time_s, delta_t_s, before_S, raw_delta_S, applied_delta_S: after_S - before_S, after_S};
    this.#state.updates.push(entry);
    this.#state.weight_S = after_S;
    return structuredClone(entry);
  }

  snapshot() {
    const payload = {version: this.#configuration.weight_dependence ? VERSION : LEGACY_VERSION, configuration: this.#configuration, state: structuredClone(this.#state)};
    return {...payload, state_hash: hash(payload)};
  }

  static restore(snapshot) {
    if (!snapshot || Object.getPrototypeOf(snapshot) !== Object.prototype) throw Error('STDP_SNAPSHOT');
    exactKeys(snapshot, ['version', 'configuration', 'state', 'state_hash'], 'STDP snapshot');
    const {state_hash, ...payload} = snapshot;
    if (![VERSION, LEGACY_VERSION].includes(snapshot.version) || hash(payload) !== state_hash) throw Error('STDP_SNAPSHOT_INTEGRITY');
    exactKeys(snapshot.configuration, snapshot.version === VERSION ? [...CONFIG_KEYS, 'weight_dependence'] : CONFIG_KEYS, 'STDP configuration');
    if (snapshot.version === VERSION && snapshot.configuration.weight_dependence !== 'soft-bounded') throw Error('STDP_RULE');
    exactKeys(snapshot.state, ['weight_S', 'updates'], 'STDP state');
    if (!Array.isArray(snapshot.state.updates) || snapshot.state.updates.length > 10000) throw Error('STDP_HISTORY');
    const restored = new PlasticSynapse(optionsFromConfiguration(snapshot.configuration));
    for (const expected of snapshot.state.updates) {
      exactKeys(expected, ['trial', 'pre_time_s', 'post_time_s', 'delta_t_s', 'before_S', 'raw_delta_S', 'applied_delta_S', 'after_S'], 'STDP update');
      const actual = restored.learn({trial: expected.trial, preTime: q(expected.pre_time_s, 's'), postTime: q(expected.post_time_s, 's')});
      for (const key of ['delta_t_s', 'before_S', 'raw_delta_S', 'applied_delta_S', 'after_S']) if (!close(actual[key], expected[key])) throw Error('STDP_SNAPSHOT_REPLAY');
    }
    if (!close(restored.#state.weight_S, snapshot.state.weight_S)) throw Error('STDP_SNAPSHOT_REPLAY');
    return restored;
  }
}
