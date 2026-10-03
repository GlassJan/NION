import test from 'node:test';
import assert from 'node:assert/strict';
import {ControlNeuron,createControlConfig,SimulationClock,Protocol,q} from '../src/neuron.mjs';
const fresh=()=>new ControlNeuron(createControlConfig(),{clock:new SimulationClock(q(0,'ms'))});
test('one physical cell fires, restores from JSON, and continues identically',()=>{
 const cell=fresh();
 cell.advance(q(20,'ms'),Protocol.step('c0',q(500,'pA'),q(5,'ms'),q(5.5,'ms')));
 assert.equal(cell.outputs().total_spikes,1);
 const restored=fresh();restored.restore(JSON.parse(JSON.stringify(cell.snapshot())));
 assert.deepEqual(restored.snapshot(),cell.snapshot());
 cell.advance(q(2,'ms'));restored.advance(q(2,'ms'));
 assert.deepEqual(restored.outputs(),cell.outputs());
});
test('independent cells share definitions without sharing mutable state',()=>{
 const config=createControlConfig();
 const a=new ControlNeuron(config,{clock:new SimulationClock(q(0,'ms'))});
 const b=new ControlNeuron(config,{clock:new SimulationClock(q(0,'ms'))});
 const before=b.snapshot();
 a.receive({sequence:0,time:q(1,'ms'),kind:'excitatory',conductance:q(12,'nS')});
 a.advance(q(3,'ms'));
 assert.deepEqual(b.snapshot(),before);
 assert.equal(a.outputs().applied_events,1);
});
