import{N,NEIGH,Tape,solveDense,residual}from'./model-v1.mjs';
import{lightningCached,cacheInfo}from'./model-v2.mjs';
function buildEntry(mask,sink){const phi=solveDense(mask,sink),candidates=[];for(let node=0;node<N;node++)if(!(mask&(1<<node))){let parent=27;for(const neighbor of NEIGH[node])if(neighbor>=0&&(mask&(1<<neighbor)))parent=Math.min(parent,neighbor);if(parent<27)candidates.push({parent,node,phi:phi[node]});}const entry=Buffer.alloc(8+9*candidates.length);entry.writeDoubleLE(residual(phi,mask,sink),0);let at=8;for(const c of candidates){entry[at]=(c.parent<<3)|NEIGH[c.parent].indexOf(c.node);entry.writeDoubleLE(c.phi,at+1);at+=9;}return entry;}
export function createFrontierCache(limit=100000){
 if(!Number.isInteger(limit)||limit<1||limit>1000000)throw Error('CACHE_LIMIT');const map=new Map();let keys=new Uint32Array(Math.min(limit,1024)),head=0,count=0,hits=0,misses=0,evictions=0,payloadBytes=0;
 return{get(mask,sink){if(!Number.isInteger(mask)||mask<0||mask>=2**27||!Number.isInteger(sink)||sink<0||sink>=27)throw Error('CACHE_KEY_DOMAIN');const key=mask*27+sink;let entry=map.get(key);if(entry){hits++;return entry;}misses++;entry=buildEntry(mask,sink);
  if(count===limit){const oldest=keys[head];payloadBytes-=map.get(oldest).length;map.delete(oldest);keys[head]=key;head=(head+1)%limit;evictions++;}else{if(count===keys.length){const grown=new Uint32Array(Math.min(limit,keys.length*2));grown.set(keys);keys=grown;}keys[(head+count)%limit]=key;count++;}map.set(key,entry);payloadBytes+=entry.length;return entry;
 },info(){return{entries:map.size,hits,misses,evictions,payloadBytes,queueMetadataBytes:keys.byteLength,explicitBytes:payloadBytes+keys.byteLength,limit,note:'Exact Float64 frontier payload plus fixed Uint32 FIFO ring; Map and Buffer object overhead excluded'};},clear(){map.clear();keys=new Uint32Array(Math.min(limit,1024));head=count=hits=misses=evictions=payloadBytes=0;}};
}
const cache=createFrontierCache();export const compactFrontier=(mask,sink)=>cache.get(mask,sink);export const compactCacheInfo=()=>cache.info();export const clearCompactCache=()=>cache.clear();
export function lightningCompact(bytes,p={}){
 const cfg={eta:2,root:0,sink:26,...p},tape=new Tape(bytes),weights=new Float64Array(27);let mask=1<<cfg.root,maxResidual=0;const edges=[];
 while(!(mask&(1<<cfg.sink))&&edges.length<N-1){const entry=compactFrontier(mask,cfg.sink),count=(entry.length-8)/9;maxResidual=Math.max(maxResidual,entry.readDoubleLE(0));let total=0;
  for(let k=0;k<count;k++){weights[k]=Math.max(0,entry.readDoubleLE(9+k*9))**cfg.eta;total+=weights[k];}if(!(total>0))throw Error('NO_POSITIVE_FRONTIER');
  const u=tape.uniform();let cumulative=0,chosen=count-1;for(let k=0;k<count;k++){cumulative+=weights[k]/total;if(u<cumulative){chosen=k;break;}}
  const encoded=entry[8+chosen*9],parent=encoded>>3,node=NEIGH[parent][encoded&7];edges.push([parent,node]);mask|=1<<node;
 }
 return{edges,maxResidual,consumedBytes:tape.offset,cfg};
}
export function compactCacheTrial(bytes,p={}){const t=performance.now(),baseline=lightningCached(bytes,p),baselineMs=performance.now()-t,start=performance.now(),compact=lightningCompact(bytes,p),compactMs=performance.now()-start;return{exactPath:JSON.stringify(baseline)===JSON.stringify(compact),baselineMs,compactMs,edgeCount:baseline.edges.length,baselineCache:cacheInfo(),compactCache:compactCacheInfo(),cfg:p};}

