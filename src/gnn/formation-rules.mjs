/** NION design contract + adapter for EXISTING QHON 3x3x3 growth.
 * This does not implement the proposed million-neuron NION GNN.
 * New packaging adapter; equations and growth selection are unchanged.
 */
import {lightningCompact} from '../qhon/compact-cache-v11b.mjs';
import {XYZ, sha} from '../qhon/model-v1.mjs';
import {freeze} from '../cell/runtime.mjs';
export {encodeDirection, encodeThoughtShape, validateColorPolicy, SYMBOLS} from '../qhon/gnn-color-contract-v1.mjs';
export {thoughtContributions, evaluateAssignedContributions} from '../qhon/neuron-contribution-contract-v1.mjs';

export const GNN_DESIGN_RULES = freeze({
 version:'nion-design-export-2026-10-03',completeGnnImplemented:false,constructionStatus:'deferred',
 proposedCube:[100,100,100],proposedTopology:'all-neuron-pairs; directionality and self-connections require explicit decisions',
 basicSymbols:['R','O','Y','G','B','M','P','W'],planeRoles:['action','thought','perception'],
 adoptedPlaneRoleMapping:null,adoptedPhysicalColorMix:null,
 thought:'whole spatial structure including branches; event order retained separately where required',
 geometricLength:'meaning contribution; distinct from learned conductance',
 neuronEmotion:'caller-defined basic emotion; assignment and revisit policy unresolved',
 plasticity:'pair-based soft-bounded STDP available as a separate module',
 erasureCell:'design only: selective, reversible, protects shared successful paths',
 implementedFormationInThisPackage:'QHON finite 27-position harmonic-frontier growth; not complete-graph GNN',
 unresolved:['online path choice','branch/merge semantics','stopping and recall policy','learned color meanings','autonomous emotion assignment','integrated online learning','selective erasure implementation']
});

/** Counts only; never allocates the proposed neurons or synapses. */
export function estimateCompleteCube({side,directed,selfConnections}) {
 if(!Number.isSafeInteger(side)||side<1)throw Error('SIDE');
 if(typeof directed!=='boolean'||typeof selfConnections!=='boolean')throw Error('EXPLICIT_TOPOLOGY_REQUIRED');
 const n=BigInt(side)**3n,pairs=directed?n*(n-1n):n*(n-1n)/2n,edges=pairs+(selfConnections?n:0n);
 return {neurons:n.toString(),synapses:edges.toString(),weightOnlyFloat32Bytes:(edges*4n).toString(),scope:'Counts only; excludes indexes, delays, learning state, neuron state and logs.'};
}

/** Buffer of little-endian uint32 words; at least 26 words.
 * inputKind is a caller declaration, NOT independent quantum certification.
 * Retain acquisition provenance separately for scientific QRNG experiments.
 */
export function formQhonReference(bytes,options) {
 if(!Buffer.isBuffer(bytes)||bytes.length<104||bytes.length%4)throw Error('WORD_ALIGNED_INPUT_MIN_104_BYTES');
 if(!options||Object.getPrototypeOf(options)!==Object.prototype)throw Error('FORMATION_OPTIONS');
 for(const key of Object.keys(options))if(!['root','sink','eta','inputKind'].includes(key))throw Error('UNKNOWN_OPTION '+key);
 const {root=0,sink=26,eta=2,inputKind}=options;
 if(!Number.isInteger(root)||!Number.isInteger(sink)||root<0||root>26||sink<0||sink>26||root===sink)throw Error('ENDPOINTS');
 if(!Number.isFinite(eta)||eta<=0||eta>4)throw Error('ETA_REFERENCE_RANGE');
 if(!['anu-qrng-recording','synthetic-test-fixture'].includes(inputKind))throw Error('EXPLICIT_INPUT_KIND_REQUIRED');
 const r=lightningCompact(bytes,{root,sink,eta});
 return {schema:'nion-qhon-formation-adapter-v1',input:{kind:inputKind,originVerified:false,sha256:sha(bytes),bytes:bytes.length,consumedBytes:r.consumedBytes},
  nodes:XYZ.map((xyz,id)=>({id,xyz:[...xyz]})),edges:r.edges.map(e=>[...e]),maxResidual:r.maxResidual,configuration:r.cfg,
  scope:'Geometry only. No AP events, trained synapses, color meanings, emotions or thought execution are fabricated.'};
}
