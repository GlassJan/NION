import assert from 'node:assert/strict';import {encodeDirection,encodeThoughtShape,SYMBOLS} from '../src/qhon/gnn-color-contract-v1.mjs';
const policy={version:'development-symbolic-1',mixing:'adjacent-symbolic-linear',order:[...SYMBOLS],offset_rad:{xy:0,xz:0,yz:0},roles:{xy:null,xz:null,yz:null}};
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-12,`${a} != ${b}`);let cases=0;
for(const x of[-2,-1,0,1,2])for(const y of[-2,-1,0,1,2])for(const z of[-2,-1,0,1,2]){
 const d=[x,y,z],a=encodeDirection(d,policy),b=encodeDirection(d.map(v=>v*3),policy),c=encodeDirection(d.map(v=>-v),policy);
 near(b.originalLength,3*a.originalLength);
 for(const plane of ['xy','xz','yz']){
  assert.equal(a.planes[plane].defined,b.planes[plane].defined);
  if(a.planes[plane].defined){const w=a.planes[plane].components;near(w.reduce((s,v)=>s+v,0),1);assert.ok(w.every(v=>v>=0&&v<=1));assert.ok(w.filter(v=>v!==0).length<=2);w.forEach((v,i)=>{near(v,b.planes[plane].components[i]);near(v,c.planes[plane].components[(i+4)%8]);});}
 }
 cases++;
}
const axial=encodeDirection([0,0,1],policy);assert.equal(axial.planes.xy.defined,false);assert.equal(axial.planes.xz.left,'Y');
assert.throws(()=>encodeDirection([Infinity,0,0],policy));assert.throws(()=>encodeDirection([1,0,0],{...policy,roles:{xy:'action',xz:'action',yz:null}}));
const shape={nodes:[{id:0,xyz:[0,0,0]},{id:1,xyz:[1,0,0]},{id:2,xyz:[1,1,0]}],edges:[[0,1],[1,2]],events:[{source:0,target:1,sequence:0},{source:1,target:2,sequence:1},{source:0,target:1,sequence:2}],spikes:[[0,0],[1,1],[2,2],[0,3]]};
const original=structuredClone(shape),encoded=encodeThoughtShape(shape,policy);assert.deepEqual(encoded.shape,original);assert.deepEqual(shape,original);assert.equal(encoded.shape.events.length,3);
const translated=structuredClone(shape);for(const n of translated.nodes)n.xyz=n.xyz.map(v=>v+10);assert.deepEqual(encodeThoughtShape(translated,policy).segments,encoded.segments);
const reordered=structuredClone(shape);reordered.events.reverse();assert.notDeepEqual(encodeThoughtShape(reordered,policy).shape.events,encoded.shape.events);assert.deepEqual(encodeThoughtShape(reordered,policy).segments,encoded.segments);
console.log(JSON.stringify({latticeDirectionsChecked:cases,scaleAndReversalChecks:true,zeroProjectionExplicit:true,originalChronologyPreserved:true,scope:'Software and algebra checks only; no HH simulation, semantics, or GNN formation.'}));
