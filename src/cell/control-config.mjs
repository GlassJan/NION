import {q,scalar} from './units.mjs';
import {freeze,hash,exactKeys,finite} from './runtime.mjs';
import {gateRates} from './ionic-kinetics.mjs';

export const CONTROL_VERSION='1.0.0';
export const CONTROL_PROVENANCE=freeze({classification:'COMPUTATIONAL_REFERENCE',hh:'existing ionic-kinetics.mjs; classical squid HH reference at 6.3 Celsius',synaptic_input:'Brian 2 exponential conductance model',adaptation:'EXPLORATORY_ASSUMPTION: synthetic continuous slow potassium-like gate',geometry:'10 pF reference cell; no reconstructed morphology',biology:'No Drosophila fit or biological equivalence',omissions:['finite ions','ATP metabolism','pH','gene/protein chemistry','molecular transport','organelle motion','growth','support cells'],learning:'UNIMPLEMENTED'});
// Public option -> stored SI key, unit, default, lower bound, upper bound.
export const CONTROL_PARAMETER_SCHEMA=freeze([
 ['capacitance','capacitance_F','pF',10,1e-13,1e-8],
 ['initialVoltage','initial_voltage_V','mV',-65,-.12,.05],
 ['conductanceNa','sodium_S','nS',1200,0,1e-4],
 ['conductanceK','potassium_S','nS',360,0,1e-4],
 ['conductanceLeak','leak_S','nS',3,1e-12,1e-5],
 ['sodiumReversal','sodium_reversal_V','mV',50,-.15,.1],
 ['potassiumReversal','potassium_reversal_V','mV',-77,-.15,.1],
 ['leakReversal','leak_reversal_V','mV',-54.387,-.15,.1],
 ['excitatoryReversal','excitatory_reversal_V','mV',0,-.15,.1],
 ['inhibitoryReversal','inhibitory_reversal_V','mV',-80,-.15,.1],
 ['excitatoryDecay','excitatory_decay_s','ms',5,.0001,10],
 ['inhibitoryDecay','inhibitory_decay_s','ms',10,.0001,10],
 ['conductanceAdaptation','adaptation_S','nS',20,0,1e-5],
 ['adaptationDecay','adaptation_decay_s','ms',100,.001,100],
 ['adaptationHalf','adaptation_half_V','mV',-30,-.12,.08],
 ['adaptationSlope','adaptation_slope_V','mV',10,.001,.1],
 ['fastTraceDecay','fast_trace_s','ms',20,.001,100],
 ['slowTraceDecay','slow_trace_s','ms',1000,.001,1000],
 ['spikeThreshold','spike_threshold_V','mV',0,-.04,.06],
 ['spikeRearm','spike_rearm_V','mV',-20,-.12,.04],
 ['maxInputConductance','max_input_S','nS',200,1e-12,1e-5],
 ['maxInputCurrent','max_current_A','nA',1,1e-12,1e-6],
]);
const LIMITS=freeze({maxCommands:[4096,1,100000],maxQueue:[1024,1,10000],maxRecords:[1024,1,10000],maxSpikes:[256,1,10000],maxSubsteps:[1000000,1,2000000]});
const cache=new WeakMap(),known=new WeakSet();
function range(x,min,max,label){finite(x,label);if(x<min||x>max)throw Error('PARAMETER_RANGE '+label);return x;}
function validate(p,limits){
 exactKeys(p,CONTROL_PARAMETER_SCHEMA.map(s=>s[1]),'parameters');
 for(const [,name,, ,min,max] of CONTROL_PARAMETER_SCHEMA)range(p[name],min,max,name);
 if(p.spike_rearm_V>=p.spike_threshold_V)throw Error('DETECTOR_HYSTERESIS');
 if(p.inhibitory_reversal_V>=p.excitatory_reversal_V)throw Error('REVERSAL_ORDER');
 exactKeys(limits,Object.keys(LIMITS),'limits');for(const [k,[,min,max]] of Object.entries(LIMITS)){range(limits[k],min,max,k);if(!Number.isSafeInteger(limits[k]))throw Error('INTEGER_LIMIT '+k);}
}
function finish(parameters,limits){validate(parameters,limits);const data={version:CONTROL_VERSION,parameters,limits,provenance:CONTROL_PROVENANCE};const config=freeze({...data,configuration_hash:hash(data)});known.add(config);return config;}
export function createControlConfig(options={}){
 if(!options||Object.getPrototypeOf(options)!==Object.prototype)throw Error('CONFIG_OPTIONS');
 const allowed=[...CONTROL_PARAMETER_SCHEMA.map(s=>s[0]),...Object.keys(LIMITS)];for(const k of Object.keys(options))if(!allowed.includes(k))throw Error('UNKNOWN_OPTION '+k);
 const p={};
 // scalar(..., SI unit), never serialize a Quantity implicitly.
 for(const [opt,name,unit,value] of CONTROL_PARAMETER_SCHEMA){const si=name.endsWith('_F')?'F':name.endsWith('_S')?'S':name.endsWith('_V')?'V':name.endsWith('_A')?'A':'s';p[name]=scalar(options[opt]??q(value,unit),si);}
 return finish(p,Object.fromEntries(Object.entries(LIMITS).map(([name,[value]])=>[name,options[name]??value])));
}
export function controlConfigFromJSON(value){
 exactKeys(value,['version','parameters','limits','provenance','configuration_hash'],'control configuration');
 if(value.version!==CONTROL_VERSION||hash(value.provenance)!==hash(CONTROL_PROVENANCE))throw Error('CONFIG_VERSION');
 const c=finish(structuredClone(value.parameters),structuredClone(value.limits));if(c.configuration_hash!==value.configuration_hash)throw Error('CONFIG_INTEGRITY');return c;
}
export function compileControl(config){
 if(cache.has(config))return cache.get(config);if(!known.has(config))throw Error('USE_CONTROL_CONFIG_FACTORY');
 const p=config.parameters,r=gateRates(p.initial_voltage_V),adapt=1/(1+Math.exp(-(p.initial_voltage_V-p.adaptation_half_V)/p.adaptation_slope_V));
 const result=freeze({config,initial:[p.initial_voltage_V,...['m','h','n'].map(k=>r[k].alpha_s/(r[k].alpha_s+r[k].beta_s)),adapt,0,0,0,0]});cache.set(config,result);return result;
}
