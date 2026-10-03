import test from 'node:test';
import assert from 'node:assert/strict';
import {formQhonReference,estimateCompleteCube,GNN_DESIGN_RULES} from '../src/gnn/formation-rules.mjs';
import {lightning,NEIGH,packEdges,unpackEdges} from '../src/qhon/model-v1.mjs';
import {packFrontier,unpackFrontier} from '../src/qhon/model-v3.mjs';
import {QuantumPathStream,exhaustivePrefixChecks} from '../src/qhon/li-qrng-stream-v13.mjs';
// Deliberate deterministic synthetic fixtures. Never reported as ANU QRNG data.
const fixture=k=>Buffer.from(Array.from({length:1024},(_,i)=>(i*73+19+k*41)&255));
test('formation adapter preserves exact dense-reference paths and complete branches',()=>{
 for(let k=0;k<4;k++)for(const eta of [.5,1,2,4]){
  const bytes=fixture(k),inputKind='synthetic-test-fixture';
  const graph=formQhonReference(bytes,{inputKind,eta});
  const reference=lightning(bytes,{eta,solver:'dense'});
  assert.deepEqual(graph.edges,reference.edges);
  assert.equal(graph.nodes.length,27);
  assert.equal(graph.input.originVerified,false);
  assert.equal(graph.input.kind,inputKind);
  const occupied=new Set([0]);
  for(const [a,b] of graph.edges){assert.ok(occupied.has(a));assert.ok(!occupied.has(b));assert.ok(NEIGH[a].includes(b));occupied.add(b);}
  assert.ok(occupied.has(26));assert.ok(graph.maxResidual<1e-10);
  assert.deepEqual(unpackEdges(packEdges(graph.edges)),graph.edges);
  assert.deepEqual(unpackFrontier(packFrontier(graph.edges).bytes),graph.edges);
 }
});
test('input provenance and unsupported topology are explicit',()=>{
 assert.throws(()=>formQhonReference(fixture(0),{}),/INPUT_KIND/);
 assert.throws(()=>formQhonReference(fixture(0),{inputKind:'synthetic-test-fixture',root:27}),/ENDPOINTS/);
 assert.throws(()=>formQhonReference(fixture(0),{inputKind:'synthetic-test-fixture',root:0,sink:0}),/ENDPOINTS/);
 assert.throws(()=>formQhonReference(Buffer.alloc(103),{inputKind:'synthetic-test-fixture'}),/INPUT/);
 assert.throws(()=>formQhonReference(fixture(0),{inputKind:'synthetic-test-fixture',side:100}),/UNKNOWN/);
 assert.equal(GNN_DESIGN_RULES.completeGnnImplemented,false);
});
test('large graph estimate is exact and performs no graph allocation',()=>{
 const c=estimateCompleteCube({side:100,directed:true,selfConnections:false});
 assert.equal(c.neurons,'1000000');assert.equal(c.synapses,'999999000000');
 assert.equal(c.weightOnlyFloat32Bytes,'3999996000000');
 assert.throws(()=>estimateCompleteCube({side:100}),/EXPLICIT/);
});
test('prefix consumption has exhaustive small-CDF distribution checks and streaming conservation',()=>{
 const check=exhaustivePrefixChecks();assert.equal(check.pass,true);
 const stream=new QuantumPathStream();
 const first=stream.feed(fixture(0)),second=stream.feed(fixture(1));
 assert.equal(first.auditMismatches+first.roundTripErrors,0);
 assert.equal(second.auditMismatches+second.roundTripErrors,0);
 assert.equal(second.inputBits,second.consumedBits+second.tailBits);
 const one=new QuantumPathStream().feed(Buffer.concat([fixture(0),fixture(1)]));
 assert.deepEqual([...first.records,...second.records],one.records);
});
