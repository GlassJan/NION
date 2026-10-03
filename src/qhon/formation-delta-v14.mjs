import{N,Tape,mirror}from'./model-v1.mjs';
const reflectedMatrix=A=>{const B=new Uint8Array(N*N);for(let i=0;i<N;i++)for(let j=0;j<N;j++)B[mirror(i)*N+mirror(j)]=A[i*N+j];return B;};
const matrixDifference=(a,b)=>a.reduce((s,v,i)=>s+(v!==b[i]?1:0),0);
export function formationDeltaTrial(bytes,p={}){
 const cfg={commands:96,interval:4,delay:1,policy:'barrier',swapPeriod:7,...p},tape=new Tape(bytes);
 if(cfg.policy!=='barrier')throw Error('DELTA_REQUIRES_BARRIER');
 const layers=[new Uint8Array(N*N),new Uint8Array(N*N)],oracle=new Uint8Array(N*N),versions=[-1,-1],birth=[0,null];let active=0,now=0,lastDue=-Infinity;
 const events=[];let violations=0,staleRejected=0,waitTicks=0,swaps=0,prematureRoleSwaps=0,quiescentMismatch=0,maxLag=0;
 const flush=time=>{events.sort((a,b)=>a.due-b.due||a.version-b.version);while(events.length&&events[0].due<=time){const e=events.shift();if(e.version<versions[e.target]){staleRejected++;continue;}const delta=e.delta[0];layers[e.target][delta>>1]=delta&1;versions[e.target]=e.version;if(birth[e.target]===null)birth[e.target]=e.due;}};
 for(let k=0;k<cfg.commands;k++){
  const requested=k*cfg.interval;now=cfg.policy==='barrier'?Math.max(requested,lastDue+1):requested;waitTicks+=now-requested;flush(now);
  if(k>0&&lastDue>=now)violations++;
  if(k&&k%cfg.swapPeriod===0){if(birth[1-active]===null)prematureRoleSwaps++;active=1-active;swaps++;}
  if(birth[active]===null)birth[active]=now;
  const a=tape.index(N);let b=tape.index(N-1);if(b>=a)b++;layers[active][a*N+b]^=1;versions[active]=k;
  oracle[(active===0?a:mirror(a))*N+(active===0?b:mirror(b))]^=1;
  const due=now+cfg.delay;events.push({due,target:1-active,delta:Uint16Array.of((mirror(a)*N+mirror(b))*2+layers[active][a*N+b]),version:k});lastDue=due;maxLag=Math.max(maxLag,versions[active]-versions[1-active]);
  flush(now);
 }
 flush(Infinity);quiescentMismatch=matrixDifference(layers[1],reflectedMatrix(layers[0]));
 return{formationViolations:violations,formationStrictlyLater:cfg.delay>0,staleRejected,waitTicks,meanWaitTicks:waitTicks/cfg.commands,roleSwaps:swaps,prematureRoleSwaps,quiescentMismatch,canonicalCommandErrorEdges:matrixDifference(layers[0],oracle),maxVersionLag:maxLag,totalTicks:Math.max(now,lastDue)+1,commands:cfg.commands,commandsPerTick:cfg.commands/(Math.max(now,lastDue)+1),birthTimes:birth,finalVersions:versions,birthMetadataPreserved:birth[0]===0,consumedBytes:tape.offset,cfg,note:'Barrier policy treats a reflected update as due strictly before the next original change. Role labels may swap; layer birth metadata is not rewritten. Delay zero is a simultaneous-formation control, not the later-formation hypothesis.'};
}
