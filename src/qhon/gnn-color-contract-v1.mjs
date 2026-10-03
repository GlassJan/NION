// A parameterized representation proposal. It neither forms a network nor assigns semantics.
export const PLANES=Object.freeze({xy:[0,1],xz:[0,2],yz:[1,2]});
export const SYMBOLS=Object.freeze(['R','O','Y','G','B','M','P','W']);
const TAU=2*Math.PI;
const finiteVector=v=>Array.isArray(v)&&v.length===3&&v.every(Number.isFinite);
export function validateColorPolicy(policy){
 if(!policy||typeof policy.version!=='string'||!policy.version||policy.mixing!=='adjacent-symbolic-linear')throw Error('COLOR_POLICY');
 if(!Array.isArray(policy.order)||policy.order.length!==8||new Set(policy.order).size!==8||policy.order.some(c=>!SYMBOLS.includes(c)))throw Error('COLOR_BASIS');
 const roles=[];
 for(const plane of Object.keys(PLANES)){
  if(!Number.isFinite(policy.offset_rad?.[plane]))throw Error('COLOR_OFFSET');
  const role=policy.roles?.[plane];if(![null,'action','thought','perception'].includes(role))throw Error('COLOR_ROLE');
  if(role!==null)roles.push(role);
 }
 if(new Set(roles).size!==roles.length)throw Error('DUPLICATE_ROLE');
 return policy;
}
function projectionMix(direction,axes,offset,order){
 const [a,b]=axes,x=direction[a],y=direction[b];
 if(x===0&&y===0)return {defined:false,reason:'zero-projection',angle_rad:null,components:null};
 const angle=Math.atan2(y,x),turn=((angle-offset)%TAU+TAU)%TAU,u=turn*8/TAU;
 const left=Math.floor(u)%8,fraction=u-Math.floor(u),right=(left+1)%8,components=Array(8).fill(0);
 components[left]=1-fraction;components[right]=fraction;
 return {defined:true,angle_rad:angle,basisAngle_rad:turn,left:order[left],right:order[right],fraction,components};
}
export function encodeDirection(direction,policy){
 validateColorPolicy(policy);if(!finiteVector(direction))throw Error('DIRECTION');
 const length=Math.hypot(...direction);if(!Number.isFinite(length))throw Error('DIRECTION_RANGE');
 const unit=length?direction.map(x=>x/length):[0,0,0];
 return {status:length?'defined':'zero-length',originalLength:length,direction:[...direction],unit,
  planes:Object.fromEntries(Object.entries(PLANES).map(([plane,axes])=>[plane,{role:policy.roles[plane],...projectionMix(unit,axes,policy.offset_rad[plane],policy.order)}]))};
}
export function encodeThoughtShape(shape,policy){
 validateColorPolicy(policy);
 if(!shape||!Array.isArray(shape.nodes)||!Array.isArray(shape.edges)||!Array.isArray(shape.events)||!Array.isArray(shape.spikes))throw Error('THOUGHT_INPUT');
 const nodes=new Map();for(const n of shape.nodes){if(!Number.isInteger(n.id)||n.id<0||nodes.has(n.id)||!finiteVector(n.xyz))throw Error('THOUGHT_NODE');nodes.set(n.id,n.xyz);}
 const seen=new Set(),segments=shape.edges.map(edge=>{
  if(!Array.isArray(edge)||edge.length!==2||!nodes.has(edge[0])||!nodes.has(edge[1]))throw Error('THOUGHT_EDGE');
  const [source,target]=edge,key=source+':'+target;if(seen.has(key))throw Error('DUPLICATE_EDGE');seen.add(key);
  return {source,target,...encodeDirection(nodes.get(target).map((x,k)=>x-nodes.get(source)[k]),policy)};
 });
 for(const e of shape.events)if(!seen.has(e.source+':'+e.target))throw Error('EVENT_WITHOUT_EDGE');
 return {schema:'QHON-GNN-color-contract-proposal-v1',policy:structuredClone(policy),shape:structuredClone(shape),segments,
  scope:'Complete original shape/events/spikes retained. Per-edge symbolic mixtures are derived annotations, not a replacement thought or synaptic weights. Roles and angular origins are explicit caller choices. Adjacent symbolic interpolation is an engineering candidate, not an adopted physical-color law or learned meaning. Projection components are constrained by one shared 3D direction.'};
}
