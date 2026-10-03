import zlib from'node:zlib';
import{Tape,N,NEIGH,solveDense,residual,lightning,packEdges,unpackEdges,distances,sha,h1Trial,mirror,propagate}from'./model-v1.mjs';
export const VERSION='qhon-model-v2';
const cache=new Map();let hits=0,misses=0,evictions=0;
export function cacheInfo(){return{entries:cache.size,hits,misses,evictions,potentialArrayBytes:cache.size*N*8,limit:100000,note:'Array payload only; Map/key/runtime overhead excluded'};}
export function clearCache(){cache.clear();hits=0;misses=0;evictions=0;}
export function cachedPotential(mask,sink){
 const key=mask*27+sink;let p=cache.get(key);if(p){hits++;return p;}misses++;p=solveDense(mask,sink);
 if(cache.size>=100000){cache.delete(cache.keys().next().value);evictions++;}cache.set(key,p);return p;
}
export function lightningCached(bytes,p={}){
 const cfg={eta:2,root:0,sink:26,...p},t=new Tape(bytes);let mask=1<<cfg.root,edges=[],maxResidual=0;
 while(!(mask&(1<<cfg.sink))&&edges.length<N-1){
  const phi=cachedPotential(mask,cfg.sink);maxResidual=Math.max(maxResidual,residual(phi,mask,cfg.sink));const candidates=[];
  for(let j=0;j<N;j++)if(!(mask&(1<<j))){let parent=27;for(const n of NEIGH[j])if(n>=0&&(mask&(1<<n)))parent=Math.min(parent,n);if(parent<27)candidates.push({node:j,parent,weight:Math.max(0,phi[j])**cfg.eta});}
  const total=candidates.reduce((s,c)=>s+c.weight,0);if(!(total>0))throw Error('NO_POSITIVE_FRONTIER');
  const u=t.uniform();let cumulative=0,chosen=candidates.length-1;for(let k=0;k<candidates.length;k++){cumulative+=candidates[k].weight/total;if(u<cumulative){chosen=k;break;}}
  const c=candidates[chosen];edges.push([c.parent,c.node]);mask|=1<<c.node;
 }
 return{edges,maxResidual,consumedBytes:t.offset,cfg};
}
export function exactSpeedTrial(bytes,p={}){
 let reference,cached,referenceMs,cachedMs;const before=cacheInfo();
 const runRef=()=>{const t=performance.now();reference=lightning(bytes,{...p,solver:'dense'});referenceMs=performance.now()-t;};
 const runCache=()=>{const t=performance.now();cached=lightningCached(bytes,p);cachedMs=performance.now()-t;};
 if(p.order===1){runCache();runRef();}else{runRef();runCache();}
 const after=cacheInfo();return{referenceMs,cachedMs,exactPath:JSON.stringify(reference.edges)===JSON.stringify(cached.edges),edges:reference.edges.length,cacheHits:after.hits-before.hits,cacheMisses:after.misses-before.misses,cacheEntries:after.entries,cachedResidual:cached.maxResidual,consumedBytes:reference.consumedBytes,cfg:p};
}
export function packBatch(records){
 const size=8+records.reduce((s,r)=>s+2+r.edges.length,0),b=Buffer.alloc(size);b.write('QHB1');b.writeUInt32LE(records.length,4);let at=8;
 for(const r of records){const p=packEdges(r.edges,r.root,r.sink);b.writeUInt16LE(r.root|(r.sink<<5)|(r.edges.length<<10),at);at+=2;p.copy(b,at,4);at+=r.edges.length;}return b;
}
export function unpackBatch(b){
 if(b.length<8||b.toString('ascii',0,4)!=='QHB1')throw Error('BAD_BATCH_HEADER');const count=b.readUInt32LE(4);if(count>(b.length-8)/2)throw Error('BAD_BATCH_COUNT');
 let at=8;const records=[];for(let i=0;i<count;i++){
  if(at+2>b.length)throw Error('TRUNCATED_BATCH');const meta=b.readUInt16LE(at);at+=2;
  if(meta&32768)throw Error('BAD_BATCH_RESERVED');const root=meta&31,sink=(meta>>5)&31,n=(meta>>10)&31;if(root>=27||sink>=27||n>26||at+n>b.length)throw Error('BAD_BATCH_RECORD');
  const v1=Buffer.alloc(4+n);v1.set([1,root,sink,n]);b.copy(v1,4,at,at+n);at+=n;records.push({root,sink,edges:unpackEdges(v1)});
 }if(at!==b.length)throw Error('TRAILING_BATCH_BYTES');return records;
}
export function batchCompressionTrial(bytes,p={}){
 const cfg={eta:2,records:16,...p};const records=[];
 for(let i=0;i<cfg.records;i++){const root=i%27,sink=(root+13)%27;const slice=bytes.subarray(i*128,(i+1)*128);if(slice.length<128)throw Error('QRNG_TAPE_EXHAUSTED');records.push({root,sink,edges:lightningCached(slice,{root,sink,eta:cfg.eta}).edges});}
 const json=Buffer.from(JSON.stringify(records));let pairBytes=8,individualPacked=0,individualDeflate=0;
 for(const r of records){pairBytes+=3+2*r.edges.length;const b=packEdges(r.edges,r.root,r.sink);individualPacked+=b.length;individualDeflate+=zlib.deflateRawSync(b).length;}
 const t=performance.now(),packed=packBatch(records),encodeMs=performance.now()-t;
 const t1=performance.now(),deflate=zlib.deflateRawSync(packed,{level:6}),deflateMs=performance.now()-t1;
 const t2=performance.now(),brotli=zlib.brotliCompressSync(packed,{params:{[zlib.constants.BROTLI_PARAM_QUALITY]:4}}),brotliMs=performance.now()-t2;
 const t3=performance.now(),restored=unpackBatch(zlib.inflateRawSync(deflate)),decodeDeflateMs=performance.now()-t3;
 const t4=performance.now(),restoredBrotli=unpackBatch(zlib.brotliDecompressSync(brotli)),decodeBrotliMs=performance.now()-t4;
 const original=JSON.stringify(records);
 const raw=bytes.subarray(0,cfg.records*128),rawDeflate=zlib.deflateRawSync(raw);
 return{records:records.length,edges:records.reduce((s,r)=>s+r.edges.length,0),jsonBytes:json.length,pairFramedBytes:pairBytes,individualPackedBytes:individualPacked,individualDeflateBytes:individualDeflate,batchPackedBytes:packed.length,batchDeflateBytes:deflate.length,batchBrotliBytes:brotli.length,encodeMs,deflateMs,brotliMs,decodeDeflateMs,decodeBrotliMs,exactDeflate:JSON.stringify(restored)===original,exactBrotli:JSON.stringify(restoredBrotli)===original,rawQRNGBytes:raw.length,rawQRNGDeflateBytes:rawDeflate.length,rawQRNGRoundTrip:zlib.inflateRawSync(rawDeflate).equals(raw),cfg};
}

export function integratedTrial(bytes,p={}){
 const cfg={steps:128,gain:.8,decay:.8,threshold:1,refractory:1,returnOpen:true,gate:true,recovery:true,recoveryDemand:3,energy:64,reciprocal:false,includeH1:true,mirrorLayer:false,...p};
 if(bytes.length<4096)throw Error('INTEGRATED_NEEDS_4096_QRNG_BYTES');
 const h1=h1Trial(bytes.subarray(0,1536),{events:40,ttl:8});
 const tree=lightningCached(bytes.subarray(1536,1664),{root:0,sink:26,eta:2});
 const unique=new Map();for(const edge of [...tree.edges,...(cfg.includeH1?h1.edges:[])])unique.set(edge.join(','),edge);
 if(cfg.reciprocal)for(const[a,b]of [...unique.values()])unique.set(b+','+a,[b,a]);
 const edges=[...unique.values()],out=Array.from({length:27},()=>[]);for(const[a,b]of edges)out[a].push(b);
 const chem=new Tape(bytes.subarray(1664,3712));
 let a=10,b=0,foreign=12,walker=-1,returned=0,clearedA=0,clearedB=0,stockA=8,precursor=32,outputA=0,energy=cfg.energy,spent=0,streak=0;
 const initialMass=a+foreign+stockA+precursor;
 let voltage=new Float64Array(27),refractory=new Int32Array(27),mirrorVoltage=new Float64Array(27),mirrorRefractory=new Int32Array(27);
 const events=[],inverseEvents=[],returnEvents=[],moleculeEvents=[];let trace=[],spikeCount=new Int32Array(27),inverseSpikeCount=new Int32Array(27);
 const m={spikes:0,blockedReleases:0,releases:0,noStock:0,delivered:0,exchanges:0,recoveries:0,produced:0,conservationErrors:0,capacityErrors:0,negativeErrors:0,nonFiniteErrors:0,mirrorError:0,peakVoltage:0,firstReturn:null,lastRecovery:null};
 for(let tick=0;tick<cfg.steps;tick++){
  const leak=chem.uniform(),move=chem.u32(),clear=chem.uniform(),clearWhich=chem.uniform();
  if(walker<0&&foreign>0&&leak<.15*10/11){foreign--;walker=0;}
  if(walker>=0&&walker!==13&&move<4294967292){const n=NEIGH[walker][move%6];if(n>=0)walker=n;}
  if(walker===13){if(a+b<10){b++;walker=-1;}else if(cfg.returnOpen&&a>0){a--;b++;walker=-1;returnEvents.push(tick+1);m.exchanges++;if(m.firstReturn===null)m.firstReturn=tick;}}
  if(clear<.025&&a+b>0){if(clearWhich<a/(a+b)){a--;clearedA++;}else{b--;clearedB++;}}
  for(let k=returnEvents.length-1;k>=0;k--)if(returnEvents[k]<=tick){returnEvents.splice(k,1);returned++;}
  for(let k=moleculeEvents.length-1;k>=0;k--)if(moleculeEvents[k]<=tick){moleculeEvents.splice(k,1);outputA++;m.delivered++;}
  const drive=new Float64Array(27),inverseDrive=new Float64Array(27);
  // Periodic experimental drive is specified, not randomly generated. Neuron
  // 13 receives a probe regardless of whether random growth connected it.
  if(tick%4===0){drive[0]+=1.2;drive[13]+=1.2;inverseDrive[mirror(0)]+=1.2;inverseDrive[mirror(13)]+=1.2;}
  for(let k=events.length-1;k>=0;k--)if(events[k][0]<=tick){const[,node,amplitude]=events[k];drive[node]+=amplitude;events.splice(k,1);}
  for(let k=inverseEvents.length-1;k>=0;k--)if(inverseEvents[k][0]<=tick){const[,node,amplitude]=inverseEvents[k];inverseDrive[node]+=amplitude;inverseEvents.splice(k,1);}
  const spiking=[];for(let i=0;i<27;i++){
   if(refractory[i]>0){refractory[i]--;voltage[i]=0;}else{voltage[i]=cfg.decay*voltage[i]+drive[i];if(voltage[i]>=cfg.threshold){spiking.push(i);spikeCount[i]++;m.spikes++;voltage[i]=0;refractory[i]=cfg.refractory;}}
  }
  const inverseSpiking=[];if(cfg.mirrorLayer)for(let i=0;i<27;i++){
   if(mirrorRefractory[i]>0){mirrorRefractory[i]--;mirrorVoltage[i]=0;}else{mirrorVoltage[i]=cfg.decay*mirrorVoltage[i]+inverseDrive[i];if(mirrorVoltage[i]>=cfg.threshold){inverseSpiking.push(i);inverseSpikeCount[i]++;mirrorVoltage[i]=0;mirrorRefractory[i]=cfg.refractory;}}
  }
  // A single chemical release event drives a normalized electrical fan-out.
  // Electrical copies are not additional molecule production in the ledger.
  const releasePermissions=new Map();
  for(const neuron of spiking){
   let allowed=true;
   if(neuron===13){
    if(cfg.gate&&returned>0){allowed=false;m.blockedReleases++;streak++;if(precursor>0&&energy>0){precursor--;stockA++;energy--;spent++;m.produced++;}}
    else if(stockA>0){stockA--;moleculeEvents.push(tick+2);m.releases++;streak=0;}else{allowed=false;m.noStock++;}
    if(cfg.recovery&&returned>0&&streak>=cfg.recoveryDemand&&energy>0){returned--;clearedA++;energy--;spent++;m.recoveries++;m.lastRecovery=tick;streak=0;}
   }
   releasePermissions.set(neuron,allowed);
   if(allowed)for(const target of out[neuron])events.push([tick+1,target,cfg.gain/Math.max(1,out[neuron].length)]);
  }
  if(cfg.mirrorLayer){
   // This is a tied, exact counterpart, not an independent chemical layer.
   for(const neuron of inverseSpiking){const original=mirror(neuron);if(!releasePermissions.has(original)){m.mirrorError++;continue;}if(releasePermissions.get(original))for(const target of out[original])inverseEvents.push([tick+1,mirror(target),cfg.gain/Math.max(1,out[original].length)]);}
   for(let i=0;i<27;i++)m.mirrorError=Math.max(m.mirrorError,Math.abs(voltage[i]-mirrorVoltage[mirror(i)]),Math.abs(spikeCount[i]-inverseSpikeCount[mirror(i)]));
  }
  const mass=a+b+foreign+(walker>=0?1:0)+returned+returnEvents.length+clearedA+clearedB+stockA+precursor+outputA+moleculeEvents.length;
  if(mass!==initialMass)m.conservationErrors++;if(a+b>10)m.capacityErrors++;
  if(Math.min(a,b,foreign,returned,stockA,precursor,energy)<0||energy+spent!==cfg.energy)m.negativeErrors++;
  for(const v of voltage){if(!Number.isFinite(v))m.nonFiniteErrors++;m.peakVoltage=Math.max(m.peakVoltage,Math.abs(v));}
  trace.push([tick,spiking.length,returned,m.blockedReleases,m.releases,m.recoveries,energy]);
 }
 return{...m,edgeCount:edges.length,h1Hits:h1.hits,h1Functional:h1.functional,h1Used:cfg.includeH1?h1.edges.length:0,spikeCounts:Array.from(spikeCount),stateSHA256:sha(Buffer.from(JSON.stringify({voltage:Array.from(voltage),refractory:Array.from(refractory),events,spikeCount:Array.from(spikeCount),a,b,foreign,walker,returned,clearedA,clearedB,stockA,precursor,outputA,energy,returnEvents,moleculeEvents}))),trace,chemicalRandomBytes:chem.offset,cfg,note:'27 normalized LIF states; optional 27 tied mirror LIF states; one chemical compartment at site13. No calibrated biological units, ATP chemistry, or independent mirrored chemistry.'};
}
