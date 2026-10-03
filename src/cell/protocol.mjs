import { q, scalar } from './units.mjs';
import { freeze, exactKeys, positive } from './runtime.mjs';
const target=id=>{if(typeof id!=='string'||!/^c\d+$/.test(id)) throw Error('INVALID_COMPARTMENT');return id;};
const token=Symbol('protocol');
export class Protocol {
  #spec;
  constructor(secret,spec) { if(secret!==token) throw Error('USE_PROTOCOL_FACTORY');this.#spec=freeze(spec);Object.freeze(this); }
  static none() { return new Protocol(token,{kind:'none',target:null,points:[]}); }
  static constant(id,current) { return new Protocol(token,{kind:'constant',target:target(id),points:[{time_s:0,current_A:scalar(current,'A')}]}); }
  static step(id,current,start,end) {
    const s=positive(scalar(start,'s'),'start',true),e=positive(scalar(end,'s'),'end');
    if(e<=s) throw Error('INVALID_STEP_INTERVAL');
    return new Protocol(token,{kind:'step',target:target(id),points:[{time_s:s,current_A:scalar(current,'A')},{time_s:e,current_A:0}]});
  }
  static sequence(id,points) {
    if(!Array.isArray(points)||points.length===0||points.length>10000) throw Error('INVALID_SEQUENCE');
    const normalized=points.map(p=>{exactKeys(p,['time','current'],'sequence point');return {time_s:positive(scalar(p.time,'s'),'point time',true),current_A:scalar(p.current,'A')};});
    if(normalized.some((p,i)=>i&&p.time_s<=normalized[i-1].time_s)) throw Error('UNSORTED_SEQUENCE');
    return new Protocol(token,{kind:'sequence',target:target(id),points:normalized});
  }
  get target() { return this.#spec.target; }
  valueAt(time_s) { positive(time_s,'protocol time',true);let value=0;for(const p of this.#spec.points){if(p.time_s>time_s)break;value=p.current_A;}return value; }
  boundaries(start_s,end_s) { return this.#spec.points.map(p=>p.time_s).filter(t=>t>start_s&&t<end_s); }
  toJSON() { return structuredClone(this.#spec); }
  static fromJSON(spec) {
    exactKeys(spec,['kind','target','points'],'protocol');
    for(const p of spec.points) exactKeys(p,['time_s','current_A'],'protocol point');
    let result;
    if(spec.kind==='none'&&spec.target===null&&spec.points.length===0) result=Protocol.none();
    else if(spec.kind==='constant'&&spec.points.length===1&&spec.points[0].time_s===0) result=Protocol.constant(spec.target,q(spec.points[0].current_A,'A'));
    else if(spec.kind==='step'&&spec.points.length===2&&spec.points[1].current_A===0) result=Protocol.step(spec.target,q(spec.points[0].current_A,'A'),q(spec.points[0].time_s,'s'),q(spec.points[1].time_s,'s'));
    else if(spec.kind==='sequence') result=Protocol.sequence(spec.target,spec.points.map(p=>({time:q(p.time_s,'s'),current:q(p.current_A,'A')})));
    else throw Error('INVALID_PROTOCOL');
    return result;
  }
}
