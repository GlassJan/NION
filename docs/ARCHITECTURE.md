# Architecture, equations, and extension boundaries

## Module map

```text
src/neuron.mjs
  └─ cell/control-neuron.mjs
      ├─ control-config.mjs
      ├─ control-dynamics.mjs → ionic-kinetics.mjs
      ├─ units.mjs / runtime.mjs
      └─ protocol.mjs

src/synapse.mjs → plastic-synapse.mjs → cell/{units,runtime}.mjs
src/network.mjs → actual delayed conductance transmission between ControlNeuron instances
src/learning-experiment.mjs → bounded three-cell teaching trial

src/gnn/formation-rules.mjs [new export adapter and declarative design]
  ├─ qhon/compact-cache-v11b.mjs → model-v1.mjs / model-v2.mjs
  ├─ qhon/gnn-color-contract-v1.mjs
  └─ qhon/neuron-contribution-contract-v1.mjs

qhon/li-qrng-stream-v13.mjs → model-v3.mjs [existing packed-frontier format]
qhon/formation-delta-v14.mjs → model-v1.mjs [reflected-update barrier experiment]
```

## One neuron

The nine binary64 state values are V, m, h, n, a, ge, gi, fast, slow. The shared definition is immutable; each cell has its own mutable state. Source code is not duplicated per cell. The initial state, event queue, command history, observation buffers and JS object overhead also consume memory: nine numbers are not the entire RAM footprint.

```text
C dV/dt = I(t)
  + gNa*m^3*h*(ENa-V) + gK*n^4*(EK-V) + gL*(EL-V)
  + gA*a*(EK-V) + ge*(Ee-V) + gi*(Ei-V)
dx/dt = alpha_x(V)*(1-x) - beta_x(V)*x, x∈{m,h,n}
da/dt = (sigmoid((V-Vhalf)/slope)-a)/tauA
dge/dt=-ge/tauE; dgi/dt=-gi/tauI
```

The full reference, parameters, event boundaries, detector, replay and limits are in [CONTROL_SPEC.md](CONTROL_SPEC.md). Integration uses RK4. Spike observations detect upward threshold crossings without resetting V or gates. A synthetic adaptation gate is not a fitted biological mechanism. Use quantities such as `q(500,'pA')`; stored values use SI units.

`receive()` queues conductance delivery; it is not an instruction to train a synapse. `advance()` advances explicit simulated time. Snapshot restoration replays the bounded command history and checks state equality. Rolling observation eviction is reported. Histories and queues must not be expanded without checking memory and recovery costs.

## Plastic synapse

Let dt be selected postsynaptic spike time minus presynaptic arrival time, and span=wmax-wmin.

```text
dt > 0: dw=+Aplus*exp(-dt/tau)*(wmax-w)/span
dt < 0: dw=-Aminus*exp(dt/tau)*(w-wmin)/span
dt = 0: dw=0
w_next=clamp(w+dw,wmin,wmax)
```

The caller must select pairs and include axonal delay when arrival timing is the intended rule. The existing legacy `runStdpExperiment()` retains its historical presynaptic emission pairing and additive-clipped mode; it is not a new recommended online pairing policy. The soft-bounded integration test explicitly obtains the delayed input arrival and actual output spike.

A PlasticSynapse does not own a source/target, delay, release gate, or membrane state. `TinyNetwork` stores source/target/kind/conductance/delay separately. Its synaptic conductance is set for a trial, not automatically subscribed to PlasticSynapse updates. Connecting continuous online learning requires an event order and checkpoint contract, not just importing both classes.

## Formation and representation

Existing QHON growth uses six axis-aligned neighbors on a 3×3×3 grid. A discrete harmonic potential is solved outside the occupied set, with occupied boundary potential0 and sink potential1. Frontier probability is proportional to max(0,phi)^eta. The smallest eligible parent index is chosen for a newly selected node. All growth branches are retained; the exporter does not replace the full tree with a path to the sink.

The cache retains exact Float64 values. `model-v3.mjs` encodes canonical frontier choices and validates padding. `QuantumPathStream` consumes recorded bits across blocks; it does not expand a QRNG seed with a PRNG. These low-level research APIs have narrower input validation than the public formation wrapper. Treat their parameters as trusted research configuration.

Color encoding projects a common 3D direction onto XY/XZ/YZ, requires caller policy and marks zero-length projection as undefined. Adjacent symbolic linear interpolation is an engineering candidate, not physical pigment/light mixing or learned meaning. Plane roles, angular origins and symbol order are explicit. Three projections of one direction are not independent degrees of freedom.

Neuron contribution code keeps distinct-neuron count, actual spike count and received delivery count separate. A source with many outgoing branches must not automatically count as several different neurons. Numerical label assignments are caller data; the code does not choose basic emotions or demonstrate felt emotion.

## Current GNN design remains incomplete

The original proposal has one million neurons in a100³ cube and all-pair connections. Under the explicit assumption of directed edges without self-edges it has999,999,000,000 synapses. Four-byte weights alone require3,999,996,000,000bytes. `estimateCompleteCube()` uses BigInt and does not allocate that graph. It does not silently substitute sparse QHON growth for the original proposal.

Unresolved policies include directionality, self-links, exact color mixing, role mapping, learned meaning, branching/merging/termination, recall, emotion assignment and selective erasure. The whole thought representation must retain its source structure and relevant chronology. A geometry-only graph does not contain fabricated spike events.

## Newest H5 extension, documented only

For binary occupancy V(x,y,z), a lossless grid-level plane can use P(x,y)={z|V=1}. A candidate line representation can retain L(x)={(y,z)|V=1}, or serialize plane addresses while retaining layers. These are candidate encodings, not a final adopted geometric line law.

Connecting such lines is the user's definition of continuous thought. To test it, preserve thought boundaries, previous/next relationships, branches, repeat visits, original coordinates and required time ordering. Exact occupancy recovery is not exact continuous geometry recovery or meaning preservation. Dimension reduction alone does not guarantee fewer bytes.

Store interpretation variants separately from source memory. A small change that reverses identity, negation, cause or time order is a serious error, even if it is small in geometric distance. The allowance for minor interpretive variation is not permission to hide errors or inject noise as evidence of humanity.

## Relation to later QHON engines

The native QHON resource/learning campaign uses separate coupled-state engines. This extraction does not include their full chemical compartments, resource recycling, competing plasticity, online control policies, GPU kernels, acquisition services or long-running orchestration. Contributions must state whether they change this standalone kit or seek integration into those engines. No complete QHON reproduction is promised by these modules.
