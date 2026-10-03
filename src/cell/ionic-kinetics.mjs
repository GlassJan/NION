import {finite,positive} from './runtime.mjs';

// Exact SI defining constants, rounded only by binary64 multiplication.
export const FARADAY=6.02214076e23*1.602176634e-19;
export const GAS_CONSTANT=6.02214076e23*1.380649e-23;
export const ION_NAMES=Object.freeze(['Na','K','Cl']);
export const VALENCE=Object.freeze({Na:1,K:1,Cl:-1});
export function nernst(inside,outside,z,temperature) {
  positive(inside,'CONCENTRATION inside');positive(outside,'CONCENTRATION outside');
  if(!Number.isInteger(z)||z===0)throw Error('INVALID_VALENCE');
  positive(temperature,'TEMPERATURE');
  return finite(GAS_CONSTANT*temperature/(z*FARADAY)*(Math.log(outside)-Math.log(inside)),'Nernst');
}
// x/(1-exp(-x/k)); removable singularity evaluated by its Taylor expansion.
const trap=(x,k)=>Math.abs(x/k)<1e-7?k*(1+x/(2*k)+(x/k)**2/12):x/(-Math.expm1(-x/k));
export function gateRates(voltage_V) {
  const v=finite(voltage_V,'voltage')*1000;
  // NEURON hh.mod modern voltage convention; rates converted ms^-1 -> s^-1.
  const rates={m:{alpha_s:100*trap(v+40,10),beta_s:4000*Math.exp(-(v+65)/18)},
    h:{alpha_s:70*Math.exp(-(v+65)/20),beta_s:1000/(Math.exp(-(v+35)/10)+1)},
    n:{alpha_s:10*trap(v+55,10),beta_s:125*Math.exp(-(v+65)/80)}};
  for(const r of Object.values(rates))for(const x of Object.values(r))positive(x,'rate',true);
  return rates;
}
