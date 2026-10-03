import {gateRates} from './ionic-kinetics.mjs';
import {finite} from './runtime.mjs';

export function controlCurrents(c,y,current=0){
 const p=c.config.parameters,[v,m,h,n,a,ge,gi]=y;
 return {injected:current,sodium:p.sodium_S*m**3*h*(p.sodium_reversal_V-v),potassium:p.potassium_S*n**4*(p.potassium_reversal_V-v),leak:p.leak_S*(p.leak_reversal_V-v),adaptation:p.adaptation_S*a*(p.potassium_reversal_V-v),excitatory:ge*(p.excitatory_reversal_V-v),inhibitory:gi*(p.inhibitory_reversal_V-v)};
}
export function validateControlState(c,y){
 if(y.length!==9)throw Error('STATE_SIZE');for(const v of y)finite(v,'state');
 if(y[0]<-.2||y[0]>.12)throw Error('VOLTAGE_DOMAIN');
 for(let i=1;i<=4;i++)if(y[i]<0||y[i]>1)throw Error('GATE_DOMAIN');
 for(let i=5;i<=6;i++)if(y[i]<0||y[i]>c.config.parameters.max_input_S)throw Error('CONDUCTANCE_LIMIT');
 if(y[7]<0||y[8]<0)throw Error('TRACE_DOMAIN');
}
export function controlDerivative(c,y,current=0){
 const p=c.config.parameters,r=gateRates(y[0]),currents=controlCurrents(c,y,current),a=1/(1+Math.exp(-(y[0]-p.adaptation_half_V)/p.adaptation_slope_V));
 return [Object.values(currents).reduce((a,b)=>a+b,0)/p.capacitance_F,
 ...['m','h','n'].map((k,i)=>r[k].alpha_s*(1-y[i+1])-r[k].beta_s*y[i+1]),
 (a-y[4])/p.adaptation_decay_s,-y[5]/p.excitatory_decay_s,-y[6]/p.inhibitory_decay_s,-y[7]/p.fast_trace_s,-y[8]/p.slow_trace_s];
}
export function rk4Control(c,y,dt,current){
 const a=controlDerivative(c,y,current),b=controlDerivative(c,y.map((v,i)=>v+a[i]*dt/2),current),d=controlDerivative(c,y.map((v,i)=>v+b[i]*dt/2),current),e=controlDerivative(c,y.map((v,i)=>v+d[i]*dt),current);
 const result=Float64Array.from(y,(v,i)=>v+dt*(a[i]+2*b[i]+2*d[i]+e[i])/6);validateControlState(c,result);return result;
}
