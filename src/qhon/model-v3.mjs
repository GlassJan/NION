import{N,XYZ,NEIGH,Tape,mirror,sha,packEdges,unpackEdges}from'./model-v1.mjs';
import{lightningCached}from'./model-v2.mjs';
export const VERSION='qhon-model-v3';
function frontier(mask){const f=[];for(let node=0;node<N;node++)if(!(mask&(1<<node))){let parent=27;for(const p of NEIGH[node])if(p>=0&&(mask&(1<<p)))parent=Math.min(parent,p);if(parent<27)f.push([parent,node]);}return f;}
export function packFrontier(edges,root=0,sink=26){
 const payload=[];let acc=0,used=0,mask=1<<root,bits=0;
 const write=(value,n)=>{for(let i=0;i<n;i++){acc|=((value>>i)&1)<<used;used++;bits++;if(used===8){payload.push(acc);used=0;acc=0;}}};
 for(const[a,b]of edges){const f=frontier(mask),index=f.findIndex(([p,n])=>p===a&&n===b);if(index<0)throw Error('NOT_CANONICAL_LI_TOPOLOGY');const width=Math.ceil(Math.log2(f.length));write(index,width);mask|=1<<b;}
 if(used)payload.push(acc);return{bytes:Buffer.from([3,root,sink,edges.length,...payload]),bits};
}
export function unpackFrontier(b){
 if(b.length<4||b[0]!==3||b[1]>=27||b[2]>=27||b[3]>26)throw Error('BAD_FRONTIER_HEADER');let at=32,mask=1<<b[1];const edges=[];
 for(let i=0;i<b[3];i++){
  const f=frontier(mask),width=Math.ceil(Math.log2(f.length));if(!f.length||at+width>b.length*8)throw Error('TRUNCATED_FRONTIER');
  let value=0;for(let j=0;j<width;j++){value|=((b[at>>3]>>(at&7))&1)<<j;at++;}if(value>=f.length)throw Error('BAD_FRONTIER_INDEX');
  const edge=f[value];edges.push(edge);mask|=1<<edge[1];
 }
 if(Math.ceil(at/8)!==b.length)throw Error('TRAILING_FRONTIER_BYTES');for(let k=at;k<b.length*8;k++)if((b[k>>3]>>(k&7))&1)throw Error('NONZERO_FRONTIER_PADDING');return edges;
}
export function frontierCodecTrial(bytes,p={}){
 const cfg={root:0,sink:26,eta:2,...p},r=lightningCached(bytes,cfg),baseline=packEdges(r.edges,cfg.root,cfg.sink);
 const t=performance.now(),packed=packFrontier(r.edges,cfg.root,cfg.sink),encodeMs=performance.now()-t;
 const t2=performance.now(),restored=unpackFrontier(packed.bytes),decodeMs=performance.now()-t2;
 const t3=performance.now(),baseRestored=unpackEdges(baseline),baseDecodeMs=performance.now()-t3;
 return{edgeCount:r.edges.length,baselineBytes:baseline.length,frontierBytes:packed.bytes.length,payloadBits:packed.bits,exactPath:JSON.stringify(restored)===JSON.stringify(r.edges)&&JSON.stringify(baseRestored)===JSON.stringify(r.edges),encodeMs,decodeMs,baseDecodeMs,consumedBytes:r.consumedBytes,cfg,note:'Codec depends on 3x3x3 six-neighbour frontier and lowest-ID parent rule. It preserves chronological ordered edges; it does not restore original QRNG words.'};
}
export function reverseGuidanceTrial(bytes,p={}){
 const cfg={root:0,sink:26,eta:2,...p},{edges}=lightningCached(bytes,cfg),parents=new Map(edges.map(([a,b])=>[b,a]));
 if(cfg.root===cfg.sink)throw Error('REVERSE_GUIDANCE_REQUIRES_DISTINCT_ENDPOINTS');
 const path=[cfg.sink];while(parents.has(path.at(-1)))path.push(parents.get(path.at(-1)));
 const first=path[0],second=path[1],direction=XYZ[second].map((v,k)=>v-XYZ[first][k]),delta=XYZ[cfg.root].map((v,k)=>v-XYZ[first][k]);
 let tangentReaches=true,distance=null;for(let k=0;k<3;k++){if(direction[k]===0){if(delta[k]!==0)tangentReaches=false;}else{const steps=delta[k]/direction[k];if(steps<=0||(distance!==null&&steps!==distance))tangentReaches=false;distance=steps;}}
 let bends=0;for(let i=1;i+1<path.length;i++){const a=XYZ[path[i-1]],b=XYZ[path[i]],c=XYZ[path[i+1]];if(a.some((v,k)=>b[k]-v!==c[k]-b[k]))bends++;}
 return{pathSteps:path.length-1,bends,tangentReaches,breadcrumbReaches:path.at(-1)===cfg.root,tangentDirectionBits:3,routeDirectionBits:3*(path.length-1),sourceIdBits:5,packedWholeTreeBytes:packEdges(edges,cfg.root,cfg.sink).length,cfg,note:'Incoming tangent lacks source identity; breadcrumb success assumes accessible recorded route. Source-coordinate guidance is an oracle assumption, not inferred from the tangent.'};
}
export function spatialExchangeTrial(bytes,p={}){
 const cfg={capacity:10,initialB:0,arrivals:12,mixingSwaps:0,returnOpen:true,...p};const tape=new Tape(bytes),sites=Array(cfg.capacity-cfg.initialB).fill('A').concat(Array(cfg.initialB).fill('B'));
 let outsideB=cfg.arrivals,returnA=0,returnB=0,pendingB=0,conservationErrors=0,capacityErrors=0,firstReturned=null;const trace=[];
 for(let event=0;event<cfg.arrivals;event++){
  for(let k=0;k<cfg.mixingSwaps&&cfg.capacity>1;k++){const i=tape.index(cfg.capacity-1);[sites[i],sites[i+1]]=[sites[i+1],sites[i]];}
  outsideB--;
  if(cfg.returnOpen){const expelled=sites.shift();if(firstReturned===null)firstReturned=expelled;if(expelled==='A')returnA++;else returnB++;sites.push('B');trace.push(expelled);}else pendingB++;
  const a=sites.filter(x=>x==='A').length,b=sites.length-a;
  if(a+returnA!==cfg.capacity-cfg.initialB||b+returnB+outsideB+pendingB!==cfg.initialB+cfg.arrivals)conservationErrors++;
  if(sites.length!==cfg.capacity)capacityErrors++;
 }
 return{returnA,returnB,pendingB,firstReturned,remainingA:sites.filter(x=>x==='A').length,conservationErrors,capacityErrors,trace,consumedBytes:tape.offset,cfg,note:'Spatial nearest-mouth displacement has no molecule identity selection. A-only return is guaranteed initially when the full region contains only A; repeated mixing may place B nearest the return route.'};
}
const reflectedMatrix=A=>{const B=new Uint8Array(N*N);for(let i=0;i<N;i++)for(let j=0;j<N;j++)B[mirror(i)*N+mirror(j)]=A[i*N+j];return B;};
const matrixDifference=(a,b)=>a.reduce((s,v,i)=>s+(v!==b[i]?1:0),0);
export function formationTrial(bytes,p={}){
 const cfg={commands:96,interval:4,delay:1,policy:'barrier',swapPeriod:7,...p},tape=new Tape(bytes);
 const layers=[new Uint8Array(N*N),new Uint8Array(N*N)],oracle=new Uint8Array(N*N),versions=[-1,-1],birth=[0,null];let active=0,now=0,lastDue=-Infinity;
 const events=[];let violations=0,staleRejected=0,waitTicks=0,swaps=0,quiescentMismatch=0,maxLag=0;
 const flush=time=>{events.sort((a,b)=>a.due-b.due||a.version-b.version);while(events.length&&events[0].due<=time){const e=events.shift();if(e.version<versions[e.target]){staleRejected++;continue;}layers[e.target]=e.snapshot;versions[e.target]=e.version;if(birth[e.target]===null)birth[e.target]=e.due;}};
 for(let k=0;k<cfg.commands;k++){
  const requested=k*cfg.interval;now=cfg.policy==='barrier'?Math.max(requested,lastDue+1):requested;waitTicks+=now-requested;flush(now);
  if(k>0&&lastDue>=now)violations++;
  if(k&&k%cfg.swapPeriod===0){active=1-active;swaps++;}
  const a=tape.index(N);let b=tape.index(N-1);if(b>=a)b++;layers[active][a*N+b]^=1;versions[active]=k;
  oracle[(active===0?a:mirror(a))*N+(active===0?b:mirror(b))]^=1;
  const due=now+cfg.delay;events.push({due,target:1-active,snapshot:reflectedMatrix(layers[active]),version:k});lastDue=due;maxLag=Math.max(maxLag,versions[active]-versions[1-active]);
  flush(now);
 }
 flush(Infinity);quiescentMismatch=matrixDifference(layers[1],reflectedMatrix(layers[0]));
 return{formationViolations:violations,formationStrictlyLater:cfg.delay>0,staleRejected,waitTicks,meanWaitTicks:waitTicks/cfg.commands,roleSwaps:swaps,quiescentMismatch,canonicalCommandErrorEdges:matrixDifference(layers[0],oracle),maxVersionLag:maxLag,totalTicks:Math.max(now,lastDue)+1,commands:cfg.commands,commandsPerTick:cfg.commands/(Math.max(now,lastDue)+1),birthTimes:birth,finalVersions:versions,birthMetadataPreserved:birth[0]===0,consumedBytes:tape.offset,cfg,note:'Barrier policy treats a reflected update as due strictly before the next original change. Role labels may swap; layer birth metadata is not rewritten. Delay zero is a simultaneous-formation control, not the later-formation hypothesis.'};
}
