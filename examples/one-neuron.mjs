import {ControlNeuron,createControlConfig,SimulationClock,Protocol,q} from '../src/neuron.mjs';
const neuron=new ControlNeuron(createControlConfig(),{clock:new SimulationClock(q(0,'ms'))});
neuron.advance(q(20,'ms'),Protocol.step('c0',q(500,'pA'),q(5,'ms'),q(5.5,'ms')));
const result=neuron.outputs();
console.log(JSON.stringify({model:'ControlNeuron 1.0.0',time_ms:result.time_s*1000,voltage_mV:result.voltage_V*1000,spikes:result.spikes,scope:'One HH-type reference cell, not a calibrated human neuron.'},null,2));
