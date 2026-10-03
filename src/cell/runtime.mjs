import { createHash } from 'node:crypto';
import { q, scalar } from './units.mjs';

export function canonical(value) {
  if (value===null || typeof value==='string' || typeof value==='boolean') return JSON.stringify(value);
  if (typeof value==='number') { if (!Number.isFinite(value)) throw Error('NON_FINITE JSON'); return JSON.stringify(value); }
  if (Array.isArray(value)) return '['+value.map(canonical).join(',')+']';
  if (value && Object.getPrototypeOf(value)===Object.prototype) return '{'+Object.keys(value).sort().map(k=>JSON.stringify(k)+':'+canonical(value[k])).join(',')+'}';
  throw Error('UNSUPPORTED_JSON_VALUE');
}
export const hash=value=>createHash('sha256').update(canonical(value)).digest('hex');
export function freeze(value) {
  if(value && typeof value==='object' && !Object.isFrozen(value)) { for(const v of Object.values(value)) freeze(v); Object.freeze(value); }
  return value;
}
export function exactKeys(value,keys,label) {
  if(!value || Object.getPrototypeOf(value)!==Object.prototype) throw Error('INVALID_OBJECT '+label);
  for(const key of Object.keys(value)) if(!keys.includes(key)) throw Error('UNKNOWN_FIELD '+label+'.'+key);
  for(const key of keys) if(!Object.hasOwn(value,key)) throw Error('MISSING_FIELD '+label+'.'+key);
}
export function finite(value,label) { if(typeof value!=='number'||!Number.isFinite(value)) throw Error('NON_FINITE '+label);return value; }
export function positive(value,label,zero=false) { finite(value,label); if(zero?value<0:value<=0) throw Error('INVALID_RANGE '+label);return value; }

export class SimulationClock {
  #time;
  constructor(time) { this.#time=positive(scalar(time,'s'),'clock',true);Object.freeze(this); }
  get time() { return q(this.#time,'s'); }
  snapshot() { return {time_s:this.#time}; }
}
// Explicit deterministic extension boundary. The passive solver never calls next().
export class SeededRng {
  #seed;#state;#draws=0;
  constructor(seed) {
    if(!Number.isInteger(seed)||seed<0||seed>0xffffffff) throw Error('INVALID_SEED');
    this.#seed=seed;this.#state=seed||0x6d2b79f5;
  }
  next() { let x=this.#state;x^=x<<13;x^=x>>>17;x^=x<<5;this.#state=x>>>0;this.#draws++;return this.#state/4294967296; }
  snapshot() { return {algorithm:'xorshift32',seed:this.#seed,state:this.#state,draws:this.#draws,purpose:'extension-only; unused by passive model'}; }
  static fromSnapshot(snapshot) {
    exactKeys(snapshot,['algorithm','seed','state','draws','purpose'],'rng');
    const rng=new SeededRng(snapshot.seed);
    if(snapshot.algorithm!=='xorshift32'||snapshot.purpose!==rng.snapshot().purpose||!Number.isInteger(snapshot.state)||snapshot.state<=0||snapshot.state>0xffffffff||!Number.isSafeInteger(snapshot.draws)||snapshot.draws<0) throw Error('INVALID_RNG_STATE');
    rng.#state=snapshot.state;rng.#draws=snapshot.draws;return rng;
  }
}
export class MemoryJournal {
  #entries=[];
  append(kind,payload) {
    const body={sequence:this.#entries.length,prev_hash:this.#entries.at(-1)?.hash??null,kind,payload:structuredClone(payload)};
    const entry=freeze({...body,hash:hash(body)});this.#entries.push(entry);return structuredClone(entry);
  }
  get entries() { return structuredClone(this.#entries); }
}
export function verifyJournal(entries,expectedHead) {
  let head=null;
  for(const [index,entry] of entries.entries()) {
    exactKeys(entry,['sequence','prev_hash','kind','payload','hash'],'journal');
    const {hash:recordHash,...body}=entry;
    if(entry.sequence!==index||entry.prev_hash!==head||hash(body)!==recordHash) throw Error('JOURNAL_INTEGRITY');
    head=recordHash;
  }
  if(expectedHead!==undefined&&head!==expectedHead) throw Error('JOURNAL_HEAD_MISMATCH');
  return true;
}
