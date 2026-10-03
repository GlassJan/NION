// Explicit SI conversion boundary. No implicit JavaScript arithmetic/coercion.
const U = Object.freeze({
  '1': [1, [0,0,0,0,0]],
  V: [1,[1,0,0,0,0]], mV: [1e-3,[1,0,0,0,0]],
  A: [1,[0,1,0,0,0]], nA: [1e-9,[0,1,0,0,0]], pA: [1e-12,[0,1,0,0,0]],
  s: [1,[0,0,1,0,0]], ms: [1e-3,[0,0,1,0,0]],
  m: [1,[0,0,0,1,0]], cm: [1e-2,[0,0,0,1,0]], um: [1e-6,[0,0,0,1,0]],
  m2: [1,[0,0,0,2,0]], cm2: [1e-4,[0,0,0,2,0]], um2: [1e-12,[0,0,0,2,0]],
  m3: [1,[0,0,0,3,0]], um3: [1e-18,[0,0,0,3,0]],
  F: [1,[-1,1,1,0,0]], pF: [1e-12,[-1,1,1,0,0]],
  S: [1,[-1,1,0,0,0]], nS: [1e-9,[-1,1,0,0,0]],
  'F/m2': [1,[-1,1,1,-2,0]], 'uF/cm2': [0.01,[-1,1,1,-2,0]],
  'S/m2': [1,[-1,1,0,-2,0]], 'mS/cm2': [10,[-1,1,0,-2,0]],
  'A/m2': [1,[0,1,0,-2,0]], 'uA/cm2': [0.01,[0,1,0,-2,0]],
  'ohm*m': [1,[1,-1,0,1,0]], 'ohm*cm': [0.01,[1,-1,0,1,0]],
  C: [1,[0,1,1,0,0]], J: [1,[1,1,1,0,0]], W: [1,[1,1,0,0,0]],
  'mol/m3': [1,[0,0,0,-3,1]], mM: [1,[0,0,0,-3,1]],
  'm2/s': [1,[0,0,-1,2,0,0]], 'mol/s': [1,[0,0,-1,0,1,0]], '1/s': [1,[0,0,-1,0,0,0]],
  mol: [1,[0,0,0,0,1,0]], K: [1,[0,0,0,0,0,1]],
  'J/mol': [1,[1,1,1,0,-1,0]], 'kJ/mol': [1000,[1,1,1,0,-1,0]],
});
const dimension = d => {
  if(!Array.isArray(d)||d.length>6||d.some(v=>!Number.isInteger(v))) throw new TypeError('INVALID_DIMENSION');
  return Object.freeze(Array.from({length:6},(_,i)=>d[i]??0));
};
const same = (a,b) => a.length===b.length && a.every((v,i)=>v===b[i]);
function finite(v) { if (typeof v !== 'number' || !Number.isFinite(v)) throw new TypeError('NON_FINITE quantity'); return v; }
export class Quantity {
  #si; #dimension;
  constructor(value, unit, internalDimension) {
    if (internalDimension) { this.#si=finite(value); this.#dimension=dimension(internalDimension); }
    else {
      if (!Object.hasOwn(U,unit)) throw new TypeError('UNKNOWN_UNIT ' + unit);
      this.#si=finite(finite(value)*U[unit][0]); this.#dimension=dimension(U[unit][1]);
    }
    Object.freeze(this);
  }
  in(unit) {
    if (!Object.hasOwn(U,unit) || !same(this.#dimension,dimension(U[unit][1]))) throw new TypeError('UNIT_MISMATCH ' + unit);
    return finite(this.#si/U[unit][0]);
  }
  add(other) { this.#check(other); return new Quantity(this.#si+other.#si,null,this.#dimension); }
  subtract(other) { this.#check(other); return new Quantity(this.#si-other.#si,null,this.#dimension); }
  compare(other) { this.#check(other); return Math.sign(this.#si-other.#si); }
  multiply(other) { this.#quantity(other); return new Quantity(this.#si*other.#si,null,this.#dimension.map((d,i)=>d+other.#dimension[i])); }
  divide(other) { this.#quantity(other); return new Quantity(this.#si/other.#si,null,this.#dimension.map((d,i)=>d-other.#dimension[i])); }
  #quantity(other) { if (!(other instanceof Quantity)) throw new TypeError('QUANTITY_REQUIRED'); }
  #check(other) { this.#quantity(other); if (!same(this.#dimension,other.#dimension)) throw new TypeError('UNIT_MISMATCH'); }
  [Symbol.toPrimitive]() { throw new TypeError('IMPLICIT_UNIT_COERCION: use .in(unit), .add(), or .compare()'); }
  toJSON() { throw new TypeError('EXPLICIT_UNIT_SERIALIZATION_REQUIRED'); }
}
export const q=(value,unit)=>new Quantity(value,unit);
export function scalar(value,unit) {
  if (!(value instanceof Quantity)) throw new TypeError('QUANTITY_REQUIRED ' + unit);
  return value.in(unit);
}
