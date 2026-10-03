import{NEIGH,N,sha}from'./model-v1.mjs';import{compactFrontier,compactCacheInfo}from'./compact-cache-v11b.mjs';import{packFrontier,unpackFrontier}from'./model-v3.mjs';
export class BitTape{
 constructor(bytes){this.bytes=bytes;this.position=0;this.totalBits=Math.floor(bytes.length/4)*32;}
 bit(){if(this.position>=this.totalBits)throw Error('QRNG_BIT_TAPE_EXHAUSTED');const word=this.bytes.readUInt32LE(Math.floor(this.position/32)*4),value=(word>>>(31-this.position%32))&1;this.position++;return value;}
 word(){let x=0;for(let k=0;k<32;k++)x=x*2+this.bit();return x;}
 peekWord(){const p=this.position;const value=this.word();this.position=p;return value;}
}
export function intervalIndex(cuts,value){for(let i=0;i<cuts.length;i++)if(value<cuts[i])return i;throw Error('CDF_NOT_COVERING_VALUE');}
export function prefixChoose(tape,cuts,precision=32){
 const total=2**precision;if(!cuts.length||cuts.at(-1)!==total||cuts.some((x,i)=>!Number.isInteger(x)||x<0||x>total||(i>0&&x<cuts[i-1])))throw Error('INVALID_INTEGER_CDF');
 let value=0,bits=0;for(;;){const width=2**(precision-bits),low=value*width,high=(value+1)*width-1,a=intervalIndex(cuts,low),b=intervalIndex(cuts,high);if(a===b)return{index:a,bits};if(bits>=precision)throw Error('PREFIX_RESOLUTION_FAILURE');value=value*2+tape.bit();bits++;}
}
function grow(tape,cfg,mode){
 let mask=1<<cfg.root;const edges=[];let auditMismatches=0;
 while(!(mask&(1<<cfg.sink))&&edges.length<26){
  const entry=compactFrontier(mask,cfg.sink),candidates=[];for(let at=8;at<entry.length;at+=9){const encoded=entry[at],parent=encoded>>3,node=NEIGH[parent][encoded&7];candidates.push({node,parent,weight:Math.max(0,entry.readDoubleLE(at+1))**cfg.eta});}
  const total=candidates.reduce((s,c)=>s+c.weight,0),cuts=[],bounds=[];let cumulative=0;for(const c of candidates){cumulative+=c.weight/total;bounds.push(cumulative);cuts.push(Math.min(4294967296,Math.ceil(cumulative*4294967296)));}cuts[cuts.length-1]=4294967296;
  const full=tape.peekWord();let selected;if(mode==='word32'){tape.word();selected=intervalIndex(cuts,full);}else selected=prefixChoose(tape,cuts).index;
  // The unconsumed suffix is read for audit only; it never influences choice.
  // This coupled check compares each choice with a full 32-bit variate at the
  // same starting bit position, not entire paths from a different consumer.
  if(selected!==intervalIndex(cuts,full))auditMismatches++;
  let originalChoice=candidates.length-1;for(let k=0;k<bounds.length;k++)if(full/4294967296<bounds[k]){originalChoice=k;break;}if(selected!==originalChoice)auditMismatches++;
  const c=candidates[selected];edges.push([c.parent,c.node]);mask|=1<<c.node;
 }
 return{edges,auditMismatches};
}
export function entropyTrial(bytes,p={}){
 const cfg={root:0,sink:26,eta:2,maxRecords:10000,...p},result={};
 for(const mode of ['word32','prefix']){
  const tape=new BitTape(bytes),records=[];let totalEdges=0,auditMismatches=0,roundTripErrors=0,stopReason='reserved_tail';const began=performance.now();
  while(tape.totalBits-tape.position>=26*32&&records.length<cfg.maxRecords){
   const start=tape.position,r=grow(tape,cfg,mode),packed=packFrontier(r.edges,cfg.root,cfg.sink).bytes;
   if(JSON.stringify(unpackFrontier(packed))!==JSON.stringify(r.edges))roundTripErrors++;
   records.push({startBit:start,endBit:tape.position,edgeCount:r.edges.length,packed:packed.toString('base64')});totalEdges+=r.edges.length;auditMismatches+=r.auditMismatches;
   if(tape.position===start){stopReason='deterministic_no_entropy_case';break;}
  }
  if(records.length===cfg.maxRecords)stopReason='record_limit';
  result[mode]={trials:records.length,bitsConsumed:tape.position,tailBits:tape.totalBits-tape.position,totalEdges,bitsPerEdge:totalEdges?tape.position/totalEdges:0,bitsPerTrial:records.length?tape.position/records.length:0,elapsedMs:performance.now()-began,auditMismatches,roundTripErrors,stopReason,records};
 }
 return{inputBytes:bytes.length,inputSHA256:sha(bytes),word32:result.word32,prefix:result.prefix,trialsPerBlockRatio:result.prefix.trials/result.word32.trials,bitsPerEdgeRatio:result.prefix.bitsPerEdge/result.word32.bitsPerEdge,auditMismatches:result.prefix.auditMismatches+result.word32.auditMismatches,roundTripErrors:result.prefix.roundTripErrors+result.word32.roundTripErrors,cfg,note:'Both consume actual QRNG bits without PRNG expansion. Prefix method has the same integer-CDF transition probabilities as a 32-bit variate, but later bit boundaries and whole paths differ. At least 832 bits are required before starting a graph; the unused tail is reported. This is entropy-efficient sampling, not lossless compression of raw QRNG.'};
}
export function exhaustivePrefixChecks(){
 const cutsA=[37,128,255,256],cutsB=[13,93,211,256],counts=Array.from({length:4},()=>Array(4).fill(0));let mismatch=0,overread=0,maxBits=0;
 for(let value=0;value<65536;value++){
  let position=0;const tape={bit(){if(position>=16){overread++;throw Error('FIXTURE_OVERREAD');}return(value>>>(15-position++))&1;}};
  const a=prefixChoose(tape,cutsA,8).index,b=prefixChoose(tape,cutsB,8).index;counts[a][b]++;maxBits=Math.max(maxBits,position);
  const direct=intervalIndex(cutsA,value>>>8);if(a!==direct)mismatch++;
 }
 const widths=c=>c.map((v,i)=>v-(i?c[i-1]:0)),a=widths(cutsA),b=widths(cutsB);let jointErrors=0;for(let i=0;i<4;i++)for(let j=0;j<4;j++)if(counts[i][j]!==a[i]*b[j])jointErrors++;
 return{enumeratedInputs:65536,firstChoiceMismatch:mismatch,jointDistributionErrors:jointErrors,overread,maxBits,counts,pass:mismatch===0&&jointErrors===0&&overread===0};
}

export {compactCacheInfo};
export const liQrngBatch=entropyTrial;


export class QuantumPathStream{
 constructor(p={}){this.cfg={root:0,sink:26,eta:2,...p};if(this.cfg.root===this.cfg.sink)throw Error('STREAM_DISTINCT_ENDPOINTS_REQUIRED');this.pending=Buffer.alloc(0);this.pendingBit=0;this.consumedBits=0;this.inputBits=0;this.graphs=0;}
 feed(bytes){if(!Buffer.isBuffer(bytes)||bytes.length%4)throw Error('STREAM_REQUIRES_WHOLE_QRNG_WORDS');const joined=Buffer.concat([this.pending,bytes]),tape=new BitTape(joined),initial=this.pendingBit,globalStart=this.consumedBits,records=[];tape.position=initial;this.inputBits+=bytes.length*8;let auditMismatches=0,roundTripErrors=0;
  while(tape.totalBits-tape.position>=26*32){const start=tape.position,r=grow(tape,this.cfg,'prefix');if(tape.position===start)throw Error('DETERMINISTIC_ZERO_ENTROPY_STREAM');const packed=packFrontier(r.edges,this.cfg.root,this.cfg.sink).bytes;if(JSON.stringify(unpackFrontier(packed))!==JSON.stringify(r.edges))roundTripErrors++;auditMismatches+=r.auditMismatches;records.push({startBit:globalStart+start-initial,endBit:globalStart+tape.position-initial,edgeCount:r.edges.length,packed:packed.toString('base64')});}
  this.consumedBits+=tape.position-initial;const cut=Math.floor(tape.position/32)*4;this.pending=Buffer.from(joined.subarray(cut));this.pendingBit=tape.position%32;this.graphs+=records.length;const tailBits=this.pending.length*8-this.pendingBit;if(this.consumedBits+tailBits!==this.inputBits)throw Error('STREAM_BIT_CONSERVATION');
  return{records,auditMismatches,roundTripErrors,inputBits:this.inputBits,consumedBits:this.consumedBits,tailBits,graphs:this.graphs,pendingStorageBytes:this.pending.length};
 }
}
