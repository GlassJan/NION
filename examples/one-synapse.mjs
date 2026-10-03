import {PlasticSynapse,q} from '../src/synapse.mjs';
const synapse=new PlasticSynapse(),before_nS=synapse.weight.in('nS');
// Explicit selected presynaptic arrival and postsynaptic spike times.
const potentiation=synapse.learn({trial:1,preTime:q(5,'ms'),postTime:q(10,'ms')});
const depression=synapse.learn({trial:2,preTime:q(15,'ms'),postTime:q(10,'ms')});
const restored=PlasticSynapse.restore(JSON.parse(JSON.stringify(synapse.snapshot())));
console.log(JSON.stringify({before_nS,potentiation,depression,after_nS:synapse.weight.in('nS'),restored_nS:restored.weight.in('nS'),scope:'Example timings, not measured biological events.'},null,2));
