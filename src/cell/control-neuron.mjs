import {q,scalar} from './units.mjs';
import {freeze,hash,exactKeys,finite,positive,SimulationClock,MemoryJournal} from './runtime.mjs';
import {Protocol} from './protocol.mjs';
import {CONTROL_VERSION,CONTROL_PROVENANCE,compileControl} from './control-config.mjs';
import {controlCurrents,rk4Control,validateControlState} from './control-dynamics.mjs';
export {createControlConfig,controlConfigFromJSON} from './control-config.mjs';

export const CONTROL_MODEL_HASH=hash({version:CONTROL_VERSION,equations:'CONTROL_SPEC.md/1.0.0',solver:'RK4; event/protocol boundaries; crossing-interpolated traces',states:['V','m','h','n','a','ge','gi','fast','slow']});
const CAPABILITIES=freeze({krita_write:false,mouse_input:false,file_write:false,file_delete:false,feedback_db_write:false,approval_creation:false,system_settings:false,network:false,network_execution:false,learning:false,output_kind:'observation_only'});
const VALIDATION=freeze({implementation:'COMPUTATIONAL_REFERENCE',numerical:'SEE_CONTROL_REPORT',biological_equivalence:'UNVERIFIED',target_cell:'NOT_CALIBRATED',network_execution:'DEFERRED',learning:'UNIMPLEMENTED',traces:'ACTIVITY_OBSERVATIONS_NOT_LEARNED_MEMORY'});
const startState=(c,origin)=>({schema_version:1,origin_s:origin,time_s:origin,y:Float64Array.from(c.initial),status:'READY',errors:[],queue:[],next_sequence:0,applied_events:0,commands:[],records:[],records_dropped:0,spikes:[],spikes_dropped:0,total_spikes:0,armed:c.initial[0]<c.config.parameters.spike_threshold_V,total_substeps:0,current_at_end_A:0});
const serialize=s=>({...structuredClone(s),y:Array.from(s.y)});
function boundedPush(state,key,value,limit){if(state[key].length===limit){state[key].shift();state[key+'_dropped']++;}state[key].push(value);}
function deliver(c,s){while(s.queue.length&&s.queue[0].time_s===s.time_s){const event=s.queue.shift(),i=event.kind==='excitatory'?5:6;s.y[i]+=event.conductance_S;validateControlState(c,s.y);s.applied_events++;}}
function run(c,s,command){
 const p=c.config.parameters,L=c.config.limits;
 if(command.kind==='ERROR'){exactKeys(command,['kind','time_s','message'],'error');if(s.status!=='READY'||s.time_s!==command.time_s||typeof command.message!=='string'||command.message.length>512)throw Error('ERROR_HISTORY');s.status='ERROR';s.errors.push({time_s:s.time_s,message:command.message});s.commands.push(structuredClone(command));return;}
 if(s.status!=='READY')throw Error('ERROR_STATE_RESTORE_REQUIRED');if(s.commands.length>=L.maxCommands)throw Error('COMMAND_LIMIT');
 if(command.kind==='RECEIVE'){
  exactKeys(command,['kind','event'],'receive');const e=command.event;exactKeys(e,['sequence','time_s','kind','conductance_S'],'event');
  if(!Number.isSafeInteger(e.sequence)||e.sequence!==s.next_sequence)throw Error('EVENT_SEQUENCE');
  positive(e.time_s,'event time',true);if(e.time_s<s.time_s)throw Error('PAST_EVENT');
  if(!['excitatory','inhibitory'].includes(e.kind))throw Error('EVENT_KIND');positive(e.conductance_S,'conductance');if(e.conductance_S>p.max_input_S)throw Error('CONDUCTANCE_LIMIT');if(s.queue.length>=L.maxQueue)throw Error('QUEUE_LIMIT');
  s.queue.push({...e});s.queue.sort((a,b)=>a.time_s-b.time_s||a.sequence-b.sequence);s.next_sequence++;s.commands.push(structuredClone(command));return;
 }
 if(command.kind!=='ADVANCE')throw Error('UNKNOWN_COMMAND');exactKeys(command,['kind','duration_s','max_step_s','record_interval_s','protocols'],'advance');
 const duration=positive(command.duration_s,'duration'),step=positive(command.max_step_s,'step'),interval=positive(command.record_interval_s,'record interval');
 if(step>2e-5)throw Error('EXCESSIVE_STEP');if(!Array.isArray(command.protocols)||command.protocols.length>100)throw Error('PROTOCOL_LIMIT');
 const protocols=command.protocols.map(Protocol.fromJSON);for(const pr of protocols)if(pr.target!==null&&pr.target!=='c0')throw Error('UNKNOWN_COMPARTMENT');
 const begin=s.time_s,end=finite(begin+duration,'end');if(end<=begin)throw Error('TIME_PRECISION_LOSS');
 if(Math.ceil(duration/step)>L.maxSubsteps)throw Error('SUBSTEP_LIMIT');
 let nextRecord=begin+interval;if(nextRecord<=begin)throw Error('TIME_PRECISION_LOSS');
 const stops=[...new Set([...protocols.flatMap(pr=>pr.boundaries(begin,end)),...s.queue.filter(e=>e.time_s>begin&&e.time_s<=end).map(e=>e.time_s),end])].sort((a,b)=>a-b);
 let steps=0;deliver(c,s);
 for(const stop of stops){while(s.time_s<stop){
  if(++steps>L.maxSubsteps)throw Error('SUBSTEP_LIMIT');const before=s.time_s,boundary=Math.min(stop,nextRecord),dt=Math.min(step,boundary-before);if(!(dt>0)||before+dt===before)throw Error('TIME_PRECISION_LOSS');
  const current=protocols.reduce((a,pr)=>a+pr.valueAt(before+dt/2),0);finite(current,'current');if(Math.abs(current)>p.max_current_A)throw Error('CURRENT_LIMIT');
  const oldV=s.y[0];s.y=rk4Control(c,s.y,dt,current);s.time_s=before+dt;
  if(boundary-s.time_s<=16*Number.EPSILON*Math.max(Math.abs(boundary),dt))s.time_s=boundary;
  if(s.armed&&oldV<p.spike_threshold_V&&s.y[0]>=p.spike_threshold_V){
   const at=before+(s.time_s-before)*(p.spike_threshold_V-oldV)/(s.y[0]-oldV);s.total_spikes++;s.armed=false;
   boundedPush(s,'spikes',{sequence:s.total_spikes,time_s:at,compartment:'c0',kind:'UPWARD_CROSSING'},L.maxSpikes);
   s.y[7]+=Math.exp(-(s.time_s-at)/p.fast_trace_s);s.y[8]+=Math.exp(-(s.time_s-at)/p.slow_trace_s);
  }
  if(s.y[0]<=p.spike_rearm_V)s.armed=true;deliver(c,s);
  if(s.time_s===nextRecord||s.time_s===end){boundedPush(s,'records',{time_s:s.time_s,voltage_V:s.y[0],gates:Array.from(s.y.slice(1,5)),excitatory_S:s.y[5],inhibitory_S:s.y[6],fast_trace:s.y[7],slow_trace:s.y[8]},L.maxRecords);}
  if(s.time_s===nextRecord){const old=nextRecord;nextRecord+=interval;if(nextRecord<=old)throw Error('TIME_PRECISION_LOSS');}
 }}
 s.current_at_end_A=finite(protocols.reduce((a,pr)=>a+pr.valueAt(end),0),'current at end');if(Math.abs(s.current_at_end_A)>p.max_current_A)throw Error('CURRENT_LIMIT');
 s.total_substeps+=steps;s.commands.push(structuredClone(command));
}

export class ControlNeuron{
 #c;#state;#origin;#journal=new MemoryJournal();#journalCount=0;
 constructor(config,options={}){
  if(!(options?.clock instanceof SimulationClock))throw Error('EXPLICIT_SIMULATION_CLOCK_REQUIRED');exactKeys(options,['clock'],'options');this.#c=compileControl(config);this.#origin=options.clock.time.in('s');this.#state=startState(this.#c,this.#origin);validateControlState(this.#c,this.#state.y);this.#audit('CREATE',{state_hash:this.stateHash});Object.freeze(this);
 }
 #audit(kind,payload){if(this.#journalCount>=this.#c.config.limits.maxCommands*4+16)throw Error('JOURNAL_LIMIT');this.#journal.append(kind,{...payload,model_hash:CONTROL_MODEL_HASH,config_hash:this.configHash});this.#journalCount++;}
 #checkAudit(){if(this.#journalCount>=this.#c.config.limits.maxCommands*4+15)throw Error('JOURNAL_LIMIT');}
 #fail(e){if(this.#state.status==='READY'){const command={kind:'ERROR',time_s:this.#state.time_s,message:String(e.message).slice(0,512)};run(this.#c,this.#state,command);if(this.#journalCount<this.#c.config.limits.maxCommands*4+16)this.#audit('ERROR',{command,state_hash:this.stateHash});}throw e;}
 #execute(command){this.#checkAudit();const candidate=structuredClone(this.#state),before=this.stateHash;run(this.#c,candidate,command);this.#state=candidate;this.#audit(command.kind,{command,before_state_hash:before,after_state_hash:this.stateHash});return this.outputs();}
 get configuration(){return this.#c.config;}get definition(){return this.#c;}get capabilities(){return CAPABILITIES;}get configHash(){return this.configuration.configuration_hash;}get modelHash(){return CONTROL_MODEL_HASH;}get stateHash(){return this.snapshot().state_hash;}get time(){return q(this.#state.time_s,'s');}get status(){return this.#state.status;}get records(){return structuredClone(this.#state.records);}get journal(){return this.#journal.entries;}
 receive(event){try{exactKeys(event,['sequence','time','kind','conductance'],'input');return this.#execute({kind:'RECEIVE',event:{sequence:event.sequence,time_s:scalar(event.time,'s'),kind:event.kind,conductance_S:scalar(event.conductance,'S')}});}catch(e){return this.#fail(e);}}
 advance(duration,protocol=Protocol.none(),options={}){try{
  if(!options||Object.getPrototypeOf(options)!==Object.prototype)throw Error('OPTIONS');for(const k of Object.keys(options))if(!['maxStep','recordInterval'].includes(k))throw Error('UNKNOWN_OPTION '+k);
  const protocols=Array.isArray(protocol)?protocol:[protocol];if(protocols.some(p=>!(p instanceof Protocol)))throw Error('INVALID_PROTOCOL');
  return this.#execute({kind:'ADVANCE',duration_s:scalar(duration,'s'),max_step_s:scalar(options.maxStep??q(.01,'ms'),'s'),record_interval_s:scalar(options.recordInterval??q(1,'ms'),'s'),protocols:protocols.map(p=>p.toJSON())});
 }catch(e){return this.#fail(e);}}
 snapshot(){const payload={schema_version:1,model_version:CONTROL_VERSION,model_hash:CONTROL_MODEL_HASH,config_hash:this.configHash,configuration:this.configuration,state:serialize(this.#state)};return {...payload,state_hash:hash(payload)};}
 restore(snapshot){try{
  this.#checkAudit();exactKeys(snapshot,['schema_version','model_version','model_hash','config_hash','configuration','state','state_hash'],'snapshot');const {state_hash,...payload}=snapshot;
  if(hash(payload)!==state_hash)throw Error('SNAPSHOT_INTEGRITY');if(snapshot.schema_version!==1||snapshot.model_version!==CONTROL_VERSION||snapshot.model_hash!==CONTROL_MODEL_HASH||snapshot.config_hash!==this.configHash||hash(snapshot.configuration)!==hash(this.configuration))throw Error('SNAPSHOT_CONFIG_VERSION');
  if(!Array.isArray(snapshot.state.commands)||snapshot.state.commands.length>this.configuration.limits.maxCommands+1)throw Error('SNAPSHOT_COMMANDS');
  const rebuilt=startState(this.#c,this.#origin);for(const command of snapshot.state.commands)run(this.#c,rebuilt,command);
  if(hash(serialize(rebuilt))!==hash(snapshot.state))throw Error('SNAPSHOT_REPLAY_MISMATCH');this.#state=rebuilt;this.#audit('RESTORE',{state_hash});return this.outputs();
 }catch(e){return this.#fail(e);}}
 spikesSince(sequence){if(!Number.isSafeInteger(sequence)||sequence<0||sequence>this.#state.total_spikes)throw Error('SPIKE_CURSOR');if(sequence<this.#state.spikes_dropped)throw Error('SPIKE_HISTORY_EVICTED');return structuredClone(this.#state.spikes.filter(s=>s.sequence>sequence));}
 outputs(){const s=this.#state,y=s.y;return {time_s:s.time_s,status:s.status,voltage_V:y[0],gates:{m:y[1],h:y[2],n:y[3]},adaptation:y[4],conductance_S:{excitatory:y[5],inhibitory:y[6]},activity:{fast:y[7],slow:y[8],filtered_rate_Hz:y[7]/this.configuration.parameters.fast_trace_s},currents_A:controlCurrents(this.#c,y,s.current_at_end_A),spikes:structuredClone(s.spikes),total_spikes:s.total_spikes,spikes_dropped:s.spikes_dropped,records_dropped:s.records_dropped,pending_events:structuredClone(s.queue),applied_events:s.applied_events,next_sequence:s.next_sequence,total_substeps:s.total_substeps,validation:VALIDATION,energy_model:'FIXED_REVERSAL_RESERVOIR_NO_ATP_MODEL',provenance:CONTROL_PROVENANCE};}
}
