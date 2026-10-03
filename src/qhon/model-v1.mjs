import zlib from 'node:zlib';
import crypto from 'node:crypto';
export const VERSION='qhon-model-v1';
export const N=27;
export const XYZ=Array.from({length:N},(_,i)=>[i%3,Math.floor(i/3)%3,Math.floor(i/9)]);
export const DIRS=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
export const idOf=([x,y,z])=>x+3*y+9*z;
export const NEIGH=XYZ.map(p=>DIRS.map(d=>p.map((x,k)=>x+d[k])).map(p=>p.every(v=>v>=0&&v<3)?idOf(p):-1));
export const mirror=i=>26-i;
export const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
export class Tape{
  constructor(bytes){this.bytes=bytes;this.offset=0;}
  u32(){if(this.offset+4>this.bytes.length)throw Error('QRNG_TAPE_EXHAUSTED');const x=this.bytes.readUInt32LE(this.offset);this.offset+=4;return x;}
  uniform(){return this.u32()/4294967296;}
  index(n){const limit=Math.floor(4294967296/n)*n;let x;do{x=this.u32();}while(x>=limit);return x%n;}
}
const norm=v=>Math.hypot(...v);
const unit=v=>{const n=norm(v);return v.map(x=>x/n)};
const dot=(a,b)=>a.reduce((s,x,k)=>s+x*b[k],0);
const sub=(a,b)=>a.map((x,k)=>x-b[k]);
const add=(a,b)=>a.map((x,k)=>x+b[k]);
const scale=(a,s)=>a.map(x=>x*s);
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function rayHit(origin,direction,centre,radius){
  const oc=sub(origin,centre),b=dot(oc,direction),c=dot(oc,oc)-radius*radius,disc=b*b-c;
  if(disc<0)return null;const t=-b-Math.sqrt(disc);return t>=0?t:null;
}
export function h1Trial(bytes,p={}){
  const cfg={events:40,radius:.22,range:3.5,speed:.5,ttl:8,directionError:0,stabilize:.95,...p};
  const t=new Tape(bytes);let hits=0,contacts=0,functional=0,expired=0,missedDirection=0,edges=[];
  for(let event=0;event<cfg.events;event++){
    const source=t.index(N),z=2*t.uniform()-1,a=2*Math.PI*t.uniform(),r=Math.sqrt(Math.max(0,1-z*z));
    const direction=[r*Math.cos(a),r*Math.sin(a),z],reach=cfg.range*(.5+.5*t.uniform()),lifetime=cfg.ttl*(.5+.5*t.uniform()),stable=t.uniform()<cfg.stabilize;
    const twist=2*Math.PI*t.uniform(),inputAmplitude=.8+.6*t.uniform();
    const origin=XYZ[source];let target=-1,nearest=Infinity;
    for(let j=0;j<N;j++){if(j===source)continue;const d=rayHit(origin,direction,XYZ[j],cfg.radius);if(d!==null&&d<=reach&&d<nearest){nearest=d;target=j;}}
    if(target<0)continue;hits++;
    const hit=add(origin,scale(direction,nearest));
    const backwards=scale(direction,-1),axis=Math.abs(backwards[2])<.9?[0,0,1]:[0,1,0];
    const u=unit([backwards[1]*axis[2]-backwards[2]*axis[1],backwards[2]*axis[0]-backwards[0]*axis[2],backwards[0]*axis[1]-backwards[1]*axis[0]]);
    const v=[backwards[1]*u[2]-backwards[2]*u[1],backwards[2]*u[0]-backwards[0]*u[2],backwards[0]*u[1]-backwards[1]*u[0]];
    const growth=unit(add(scale(backwards,Math.cos(cfg.directionError)),scale(add(scale(u,Math.cos(twist)),scale(v,Math.sin(twist))),Math.sin(cfg.directionError))));
    const needed=rayHit(hit,growth,origin,cfg.radius);
    if(needed===null){missedDirection++;continue;}if(needed>cfg.speed*lifetime){expired++;continue;}contacts++;
    // An operational transmission assay: a matured edge passes a unit pulse;
    // a target integrates it with gain 1, and crosses a normalized threshold 1.
    // This is not a biophysical HH assay or proof of dendritic growth.
    if(stable&&inputAmplitude>=1){functional++;edges.push([source,target]);}
  }
  return{hits,contacts,functional,expired,missedDirection,edges,consumedBytes:t.offset,cfg};
}

export function chemistryTrial(bytes,p={}){
  const cfg={steps:96,capacity:10,initialA:10,gap:1,returnOpen:true,gate:true,recovery:true,recoveryDemand:3,energy:64,returnDelay:1,deliveryDelay:2,...p};
  const t=new Tape(bytes),K=cfg.capacity;
  let a=cfg.initialA,b=0,foreign=12,walker=-1,pending=0,returned=0,clearedA=0,clearedB=0,outputA=0,stockA=8,precursor=32,energy=cfg.energy,energySpent=0;
  const initialTotal=a+foreign+stockA+precursor;
  const incoming=[],deliveries=[];let blockedStreak=0;
  const m={arrivals:0,exchanges:0,admissions:0,insertionBlocked:0,spikes:0,releaseAttempts:0,releases:0,blockedReleases:0,delivered:0,recoveries:0,produced:0,conservationErrors:0,capacityErrors:0,negativeErrors:0,illegalBlockedRelease:0,maxOccupancy:a,maxReturned:0,firstReturn:null,lastRecovery:null};
  const trace=[];
  for(let tick=0;tick<cfg.steps;tick++){
    const leak=t.uniform(),move=t.u32(),clear=t.uniform(),clearWhich=t.uniform();
    // Four disjoint uint32 draws per step; no PRNG and no cyclic tape reuse.
    // Boundary proposals outside the 3x3x3 grid stay in place.
    if(walker<0&&foreign>0&&leak<.15*cfg.gap/(1+cfg.gap)){foreign--;walker=0;}
    if(walker>=0&&walker!==13){
      // Equal 6-direction proposal using rejection of the top four uint32 values.
      // A rejected word causes no movement this tick, not a biased modulo draw.
      if(move<4294967292){const n=NEIGH[walker][move%6];if(n>=0)walker=n;}
    }
    if(walker===13){
      if(!pending){m.arrivals++;pending=1;}
      if(a+b<K){b++;walker=-1;pending=0;m.admissions++;}
      else if(cfg.returnOpen&&a>0){a--;b++;walker=-1;pending=0;incoming.push(tick+cfg.returnDelay);m.exchanges++;if(m.firstReturn===null)m.firstReturn=tick;}
      else m.insertionBlocked++;
    }
    // A physical removal ledger, never silent deletion.
    if(clear<.025&&a+b>0){if(clearWhich<a/(a+b)){a--;clearedA++;}else{b--;clearedB++;}}
    for(let k=incoming.length-1;k>=0;k--)if(incoming[k]<=tick){incoming.splice(k,1);returned++;}
    for(let k=deliveries.length-1;k>=0;k--)if(deliveries[k]<=tick){deliveries.splice(k,1);outputA++;m.delivered++;}
    const electricalSpike=tick%4===0;
    if(electricalSpike){
      m.spikes++;m.releaseAttempts++;
      const inhibited=cfg.gate&&returned>0;
      if(inhibited){
        m.blockedReleases++;blockedStreak++;
        if(precursor>0&&energy>0){precursor--;stockA++;energy--;energySpent++;m.produced++;}
      }else if(stockA>0){stockA--;deliveries.push(tick+cfg.deliveryDelay);m.releases++;blockedStreak=0;}
      // Recovery is deliberately independent of the normal release gate.
      if(cfg.recovery&&returned>0&&blockedStreak>=cfg.recoveryDemand&&energy>0){returned--;clearedA++;energy--;energySpent++;m.recoveries++;m.lastRecovery=tick;blockedStreak=0;}
      trace.push([tick,returned,inhibited?1:0,m.releases,m.delivered,energy]);
    }
    const mass=a+b+foreign+(walker>=0?1:0)+incoming.length+returned+clearedA+clearedB+outputA+stockA+precursor+deliveries.length;
    if(mass!==initialTotal)m.conservationErrors++;
    if(a+b>K)m.capacityErrors++;
    if(Math.min(a,b,foreign,returned,clearedA,clearedB,outputA,stockA,precursor,energy)<0||energy+energySpent!==cfg.energy)m.negativeErrors++;
    m.maxOccupancy=Math.max(m.maxOccupancy,a+b);m.maxReturned=Math.max(m.maxReturned,returned);
  }
  return{...m,final:{a,b,foreign,walker,pending,returned,clearedA,clearedB,outputA,stockA,precursor,energy,incoming,deliveries},trace,consumedBytes:t.offset,cfg};
}

function harmonicSystem(mask,sink){
  const unknown=[];for(let i=0;i<N;i++)if(i!==sink&&!(mask&(1<<i)))unknown.push(i);
  const m=unknown.length,A=Array.from({length:m},()=>new Float64Array(m+1)),where=new Int8Array(N).fill(-1);
  unknown.forEach((id,k)=>where[id]=k);
  for(let k=0;k<m;k++){const id=unknown[k];A[k][k]=NEIGH[id].filter(n=>n>=0).length;for(const n of NEIGH[id]){if(n<0)continue;if(n===sink)A[k][m]++;else if(where[n]>=0)A[k][where[n]]--;}}
  return{unknown,A};
}
export function solveDense(mask,sink=26){
  const {unknown,A}=harmonicSystem(mask,sink),m=unknown.length;
  for(let col=0;col<m;col++){
    let pivot=col;for(let r=col+1;r<m;r++)if(Math.abs(A[r][col])>Math.abs(A[pivot][col]))pivot=r;
    if(Math.abs(A[pivot][col])<1e-14)throw Error('SINGULAR_HARMONIC_SYSTEM');
    [A[pivot],A[col]]=[A[col],A[pivot]];
    for(let r=col+1;r<m;r++){const f=A[r][col]/A[col][col];for(let c=col;c<=m;c++)A[r][c]-=f*A[col][c];}
  }
  const phi=new Float64Array(N);phi[sink]=1;
  for(let k=m-1;k>=0;k--){let s=A[k][m];for(let c=k+1;c<m;c++)s-=A[k][c]*phi[unknown[c]];phi[unknown[k]]=s/A[k][k];}
  return phi;
}
export function residual(phi,mask,sink=26){let max=0;for(let i=0;i<N;i++){if(i===sink||mask&(1<<i))continue;let s=0,d=0;for(const j of NEIGH[i])if(j>=0){s+=phi[j];d++;}max=Math.max(max,Math.abs(d*phi[i]-s));}return max;}
export function solveIterative(mask,sink=26,tolerance=1e-10,maxIterations=2000){
  const phi=Float64Array.from({length:N},(_,i)=>i===sink?1:mask&(1<<i)?0:.5);let iterations=0;
  for(;iterations<maxIterations;iterations++){let change=0;for(let i=0;i<N;i++){if(i===sink||mask&(1<<i))continue;let sum=0,d=0;for(const j of NEIGH[i])if(j>=0){sum+=phi[j];d++;}const v=sum/d;change=Math.max(change,Math.abs(v-phi[i]));phi[i]=v;}if(change<tolerance)break;}
  return{phi,iterations:iterations+1,residual:residual(phi,mask,sink)};
}
export function lightning(bytes,p={}){
  const cfg={eta:2,solver:'dense',tolerance:1e-10,root:0,sink:26,...p};const t=new Tape(bytes);
  let mask=1<<cfg.root,edges=[],maxResidual=0,iterations=0;const decisions=[];
  while(!(mask&(1<<cfg.sink))&&edges.length<N-1){
    const solved=cfg.solver==='dense'?{phi:solveDense(mask,cfg.sink),iterations:0}:solveIterative(mask,cfg.sink,cfg.tolerance);
    const phi=solved.phi;iterations+=solved.iterations;maxResidual=Math.max(maxResidual,residual(phi,mask,cfg.sink));
    const candidates=[];
    for(let j=0;j<N;j++)if(!(mask&(1<<j))){const parents=NEIGH[j].filter(n=>n>=0&&(mask&(1<<n))).sort((a,b)=>a-b);if(parents.length)candidates.push({node:j,parent:parents[0],weight:Math.max(0,phi[j])**cfg.eta});}
    const total=candidates.reduce((s,c)=>s+c.weight,0);if(!(total>0))throw Error('NO_POSITIVE_FRONTIER');
    const u=t.uniform();let cumulative=0,selected=candidates.length-1;for(let k=0;k<candidates.length;k++){cumulative+=candidates[k].weight/total;if(u<cumulative){selected=k;break;}}
    const choice=candidates[selected];edges.push([choice.parent,choice.node]);mask|=1<<choice.node;decisions.push({u,selected,candidateCount:candidates.length});
  }
  return{edges,mask,decisions,maxResidual,iterations,consumedBytes:t.offset,cfg};
}
export function packEdges(edges,root=0,sink=26){
  const b=Buffer.alloc(4+edges.length);b[0]=1;b[1]=root;b[2]=sink;b[3]=edges.length;
  edges.forEach(([a,c],k)=>{const d=NEIGH[a].indexOf(c);if(d<0)throw Error('NON_LOCAL_EDGE');b[k+4]=(a<<3)|d;});return b;
}
export function unpackEdges(b){
  if(b.length<4||b[0]!==1||b[1]>=N||b[2]>=N||b[3]>26||b.length!==4+b[3])throw Error('BAD_PACKED_HEADER');
  let mask=1<<b[1];const edges=[];
  for(let k=4;k<b.length;k++){const a=b[k]>>3,d=b[k]&7,c=NEIGH[a]?.[d];if(c===undefined||c<0||!(mask&(1<<a))||(mask&(1<<c)))throw Error('BAD_PACKED_EDGE');edges.push([a,c]);mask|=1<<c;}
  return edges;
}
export function pathOnly(edges,sink=26){const parent=new Map(edges.map(([a,b])=>[b,a]));const keep=new Set();let node=sink;while(parent.has(node)){keep.add(node);node=parent.get(node);}return edges.filter(([,b])=>keep.has(b));}
export function distances(edges,source=0){const d=Array(N).fill(-1);d[source]=0;let changed=true;while(changed){changed=false;for(const[a,b]of edges)if(d[a]>=0&&(d[b]<0||d[b]>d[a]+1)){d[b]=d[a]+1;changed=true;}}return d;}
export function compressionTrial(bytes,p={}){
  const started=performance.now(),r=lightning(bytes,{...p,solver:'dense'}),referenceMs=performance.now()-started;
  const start2=performance.now(),fast=lightning(bytes,{...p,solver:'iterative'}),iterativeMs=performance.now()-start2;
  const json=Buffer.from(JSON.stringify(r.edges)),pairs=Buffer.from(r.edges.flat()),packed=packEdges(r.edges,p.root??0,p.sink??26);
  const c0=performance.now(),compressed=zlib.deflateRawSync(packed,{level:6}),compressionMs=performance.now()-c0;
  const d0=performance.now(),roundTrip=unpackEdges(zlib.inflateRawSync(compressed)),decompressionMs=performance.now()-d0;
  const lossy=pathOnly(r.edges,p.sink??26),before=distances(r.edges,p.root??0),after=distances(lossy,p.root??0);
  return{edges:r.edges,referenceMs,iterativeMs,compressionMs,decompressionMs,exactRoundTrip:equal(r.edges,roundTrip),sameIterativePath:equal(r.edges,fast.edges),referenceResidual:r.maxResidual,iterativeResidual:fast.maxResidual,iterations:fast.iterations,jsonBytes:json.length,pairBytes:pairs.length,packedBytes:packed.length,deflateBytes:compressed.length,lossyPackedBytes:4+lossy.length,lossyDroppedEdges:r.edges.length-lossy.length,lossyReadoutDisagreements:before.filter((v,i)=>v!==after[i]).length,reachableBefore:before.filter(v=>v>=0).length,reachableAfter:after.filter(v=>v>=0).length,consumedBytes:r.consumedBytes,cfg:r.cfg};
}

export function propagate(edges,initial,{steps=32,gain=.8,leak=.2,reciprocal=false}={}){
  let x=Float64Array.from(initial);const adj=Array.from({length:N},()=>[]);
  for(const[a,b]of edges){adj[b].push(a);if(reciprocal)adj[a].push(b);}
  for(let s=0;s<steps;s++){
    const y=new Float64Array(N);for(let i=0;i<N;i++){let sum=0;for(const j of adj[i])sum+=x[j];const avg=adj[i].length?sum/adj[i].length:0;y[i]=Math.tanh(leak*x[i]+gain*avg);}x=y;
  }return Array.from(x);
}
export function mirrorTrial(bytes,p={}){
  const cfg={eta:2,gain:.8,steps:32,formationDelay:1,changeInterval:4,...p};
  const {edges}=lightning(bytes,cfg),mirrored=edges.map(([a,b])=>[mirror(a),mirror(b)]);
  const input=Array.from({length:N},(_,i)=>i===0?1:i===1?-.5:0),inverseInput=input.slice().reverse();
  const begin=performance.now(),out=propagate(edges,input,cfg),singleMs=performance.now()-begin;
  const t=performance.now(),inverseOut=propagate(mirrored,inverseInput,cfg),secondMs=performance.now()-t;
  const error=Math.max(...out.map((v,i)=>Math.abs(v-inverseOut[mirror(i)])));
  const unrelated=propagate(mirrored,input,cfg),independentInputError=Math.max(...out.map((v,i)=>Math.abs(v-unrelated[mirror(i)])));
  return{edgeCount:edges.length,equivarianceError:error,independentInputError,singleMs,secondMs,explicitPairBytes:edges.length*4,implicitPairBytes:edges.length*2+1,formationDeadlineMet:cfg.formationDelay<cfg.changeInterval,formationDelay:cfg.formationDelay,requiredThrottledInterval:Math.max(cfg.changeInterval,cfg.formationDelay+1),cfg};
}

export function memoryTrial(bytes,p={}){
  const cfg={eta:2,gain:.8,leak:.2,steps:64,reciprocal:true,...p};const{edges}=lightning(bytes,cfg);
  const positive=Array(N).fill(0);positive[0]=.1;const negative=positive.map(x=>-x);
  const plus=propagate(edges,positive,cfg),minus=propagate(edges,negative,cfg),zero=propagate(edges,Array(N).fill(0),cfg);
  const separation=Math.sqrt(plus.reduce((s,v,i)=>s+(v-minus[i])**2,0));
  return{separation,distinguishable:separation>1e-4,peak:Math.max(...plus.map(Math.abs)),zeroDrift:Math.max(...zero.map(Math.abs)),finite:plus.every(Number.isFinite)&&minus.every(Number.isFinite),cfg,note:'Normalized recurrent state assay, no ATP model and no learned readout; sign perturbation retention is not biological memory validation.'};
}

export function deterministicChecks(){
  let pairChecks=0,failed=0;for(let i=0;i<N;i++){if(mirror(mirror(i))!==i)failed++;for(let j=0;j<N;j++){if(i===j)continue;pairChecks++;const a=sub(XYZ[j],XYZ[i]),b=sub(XYZ[mirror(j)],XYZ[mirror(i)]);if(a.some((x,k)=>x!==-b[k]))failed++;}}
  const dense=solveDense(1),it=solveIterative(1);const initialSolveError=Math.max(...dense.map((v,i)=>Math.abs(v-it.phi[i])));
  const paths=[[[0,1],[1,4],[4,13],[13,22],[22,25],[25,26]],[[0,9],[9,18],[18,19],[19,20],[20,23],[23,26]]];
  let roundTrips=0;for(const edges of paths)if(equal(edges,unpackEdges(packEdges(edges))))roundTrips++;
  let malformedRejected=0;for(const bytes of [Buffer.from([1,0,26,1,7]),Buffer.from([1,0,26,1,255]),Buffer.from([1,0,26,2,0])]){try{unpackEdges(bytes)}catch{malformedRejected++;}}
  return{pairChecks,failed,centreFixed:mirror(13)===13,initialSolveError,denseResidual:residual(dense,1),iterativeResidual:it.residual,roundTrips,malformedRejected,pass:failed===0&&initialSolveError<1e-8&&roundTrips===2&&malformedRejected===3};
}
