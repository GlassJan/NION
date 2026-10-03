import test from 'node:test';
import assert from 'node:assert/strict';
import {PlasticSynapse} from '../src/plastic-synapse.mjs';
import {q} from '../src/cell/units.mjs';
import {hash} from '../src/cell/runtime.mjs';
import {runLearningTrial} from '../src/learning-experiment.mjs';

const pair = (synapse, trial, dt_ms) => synapse.learn({trial, preTime: q(200, 'ms'), postTime: q(200 + dt_ms, 'ms')});
const nS = synapse => synapse.weight.in('nS');
const rehash = snapshot => { const {state_hash, ...payload} = snapshot; snapshot.state_hash = hash(payload); return snapshot; };

test('new default makes tiny bidirectional changes; coincident spikes have no selected order', () => {
  const up = new PlasticSynapse(), down = new PlasticSynapse(), tied = new PlasticSynapse();
  assert.equal(up.snapshot().version, '2.0.0');
  assert.equal(up.capabilities.soft_bounds, true);
  assert.equal(up.capabilities.human_calibrated, false);
  const a = pair(up, 1, 5), b = pair(down, 1, -5);
  assert.ok(a.applied_delta_S > 0 && a.applied_delta_S < 1e-12);
  assert.ok(b.applied_delta_S < 0 && Math.abs(b.applied_delta_S) < 1e-12);
  assert.equal(pair(tied, 1, 0).applied_delta_S, 0);
  assert.equal(nS(tied), .4);
});

test('timing influence fades and the available headroom limits both directions', () => {
  const delta = (weight, dt) => pair(new PlasticSynapse({initialWeight:q(weight,'nS')}), 1, dt).applied_delta_S;
  assert.ok(delta(7, 5) > delta(7, 100));
  assert.ok(Math.abs(delta(7, -5)) > Math.abs(delta(7, -100)));
  assert.ok(delta(7, 5) > delta(13.9, 5));
  assert.ok(Math.abs(delta(7, -5)) > Math.abs(delta(.3, -5)));
  assert.equal(delta(14, 5), 0);
  assert.equal(delta(.25, -5), 0);
  assert.ok(delta(14, -5) < 0);
  assert.ok(delta(.25, 5) > 0);
});

test('repeated pairing agrees with the independent geometric convergence solution', () => {
  const count = 3000, initial = 7, lower = .25, upper = 14;
  const alpha = .001 / (upper - lower) * Math.exp(-.005 / .02);
  for (const sign of [1, -1]) {
    const synapse = new PlasticSynapse({initialWeight:q(initial,'nS')});
    let previous = nS(synapse);
    for (let trial = 1; trial <= count; trial++) {
      pair(synapse, trial, 5 * sign);
      const weight = nS(synapse);
      assert.ok(weight >= lower && weight <= upper);
      assert.ok(sign * (weight - previous) > 0);
      previous = weight;
    }
    const boundary = sign > 0 ? upper : lower;
    const expected = boundary + (initial - boundary) * (1 - alpha) ** count;
    assert.ok(Math.abs(nS(synapse) - expected) < 1e-10);
  }
});

test('mixed history restores and continues identically across a JSON round trip', () => {
  const source = new PlasticSynapse();
  for (let trial = 1; trial <= 120; trial++) pair(source, trial, [5,-8,0,100][trial % 4]);
  const snapshot = JSON.parse(JSON.stringify(source.snapshot()));
  const restored = PlasticSynapse.restore(snapshot);
  assert.deepEqual(restored.snapshot(), snapshot);
  assert.deepEqual(pair(source, 121, 7), pair(restored, 121, 7));
  assert.deepEqual(restored.snapshot(), source.snapshot());
});

test('immutable pre-change v1 fixture restores with its original hash and update size', () => {
  // Captured from the unmodified 1.0.0 implementation on 2026-09-19.
  const snapshot = {
    version:'1.0.0',
    configuration:{initial_weight_S:4.0000000000000007e-10,min_weight_S:2.5e-10,max_weight_S:1.4000000000000001e-8,potentiation_S:1.5000000000000002e-9,depression_S:1.5000000000000002e-9,time_constant_s:.02},
    state:{weight_S:4.5989495500986537e-10,updates:[
      {trial:1,pre_time_s:.005,post_time_s:.009000000000000001,delta_t_s:.004000000000000001,before_S:4.0000000000000007e-10,raw_delta_S:1.2280961296169728e-9,applied_delta_S:1.2280961296169728e-9,after_S:1.628096129616973e-9},
      {trial:2,pre_time_s:.012,post_time_s:.007,delta_t_s:-.005,before_S:1.628096129616973e-9,raw_delta_S:-1.1682011746071075e-9,applied_delta_S:-1.1682011746071075e-9,after_S:4.5989495500986537e-10}
    ]},
    state_hash:'ab4ccfd78bcf06f062b5789bf70395b6a96a93272ed32af81b0a2220ac3dc604'
  };
  const restored = PlasticSynapse.restore(snapshot);
  assert.deepEqual(restored.snapshot(), snapshot);
  assert.equal(restored.capabilities.soft_bounds, false);
  assert.ok(pair(restored,3,5).applied_delta_S > 1e-9);
});

test('modified history or a forged rule is rejected even when its hash is recomputed', () => {
  const synapse = new PlasticSynapse(); pair(synapse,1,5);
  const changed = synapse.snapshot(); changed.state.updates[0].after_S += 1e-10;
  assert.throws(() => PlasticSynapse.restore(rehash(changed)), /REPLAY/);
  const rule = structuredClone(synapse.snapshot()); rule.configuration.weight_dependence = 'additive-clipped';
  assert.throws(() => PlasticSynapse.restore(rehash(rule)), /RULE/);
  const unknown = structuredClone(synapse.snapshot()); unknown.configuration.extra = 1;
  assert.throws(() => PlasticSynapse.restore(rehash(unknown)), /UNKNOWN_FIELD/);
});

test('invalid update rates and invalid events fail without changing synapse state', () => {
  assert.throws(() => new PlasticSynapse({rule:'human-exact'}), /RULE/);
  assert.throws(() => new PlasticSynapse({potentiation:q(13.9,'nS')}), /UPDATE_RANGE/);
  const synapse = new PlasticSynapse(), before = synapse.snapshot();
  assert.throws(() => synapse.learn({trial:1,preTime:q(-1,'ms'),postTime:q(2,'ms')}), /SPIKE_TIMING/);
  assert.deepEqual(synapse.snapshot(),before);
  assert.throws(() => pair(synapse,2,5), /TRIAL_SEQUENCE/);
});

test('history capacity never creates a checkpoint that cannot be restored', () => {
  const synapse = new PlasticSynapse();
  for (let trial=1;trial<=10000;trial++) pair(synapse,trial,0);
  const before = synapse.snapshot();
  assert.throws(() => pair(synapse,10001,5), /STDP_HISTORY/);
  assert.deepEqual(synapse.snapshot(),before);
  assert.deepEqual(PlasticSynapse.restore(before).snapshot(),before);
});

test('actual delayed neuronal input and output spikes drive the new learning rule', () => {
  for (const teacher of ['after','before']) {
    const synapse = new PlasticSynapse();
    const response = runLearningTrial(synapse.weight,{teacher});
    const arrival = response.transmissions.find(t => t.synapse === 'relay_output_plastic' && t.delivered)?.arrival_s;
    const post = response.spikes.output[0];
    assert.ok(Number.isFinite(arrival) && Number.isFinite(post));
    const change = synapse.learn({trial:1,preTime:q(arrival,'s'),postTime:q(post,'s')});
    assert.ok(teacher === 'after' ? change.applied_delta_S > 0 : change.applied_delta_S < 0);
  }
});
