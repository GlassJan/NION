# Essential pre-network cell — ControlNeuron 1.0.0

## Scope and interpretation

The 2026-09-16 user instruction narrows the prerequisite scope to functions indispensable to a future drawing-control circuit. This is a single-cell computational reference, not a network, learning rule, drawing controller, fitted target cell, or a proven behavior-preserving reduction of DevelopmentNeuron. The original detailed profiles and all evidence remain unchanged. The product target is still a complete commercial-quality editable illustration; passing these cell tests does not satisfy that product target.

The profile retains conductance-based nonlinear excitation, HH gating and refractory recovery, temporal integration, excitatory/inhibitory input, continuous adaptation, fast/slow activity traces, causal timing, bounded resources, independent state and deterministic recovery. It omits finite ion accounting, metabolic pathways and ATP costs, pH, molecular transport, growth, organelle motion, gene/protein chemistry, support cells and fitted morphology. Fixed reversal potentials represent an implicit maintained reservoir. Electrical current is modeled; ATP consumption and closed-system chemical/charge conservation are not claimed. No fictitious energy-cost field replaces omitted metabolism.

## State and equations

Nine binary64 values, in order: V [V], m/h/n/a [dimensionless], ge/gi [S], fast/slow [dimensionless]. Membrane capacitance C is in F; time is in seconds; positive current is inward/depolarizing. Every cell owns its state. Only a deeply frozen definition may be shared via a WeakMap keyed by the same immutable configuration object.

```
C dV/dt = I(t)
  + gNa m^3 h (ENa - V) + gK n^4 (EK - V) + gL (EL - V)
  + gA a (EK - V) + ge (Ee - V) + gi (Ei - V)
dx/dt = alpha_x(V) (1-x) - beta_x(V) x, x in {m,h,n}
da/dt = (1/(1+exp(-(V-Vhalf)/slope)) - a)/tauA
dge/dt = -ge/tauE; dgi/dt = -gi/tauI
dfast/dt = -fast/tauFast; dslow/dt = -slow/tauSlow
```

HH rates are reused verbatim from the previously verified `ionic-kinetics.mjs`, in the modern voltage convention, with rates in s^-1. They are the 6.3 Celsius classical squid reference, not a fitted human or Drosophila cell. Default 10 pF / 1200 nS Na / 360 nS K / 3 nS leak corresponds to 1000 um2 at conventional HH densities. ENa=50 mV, EK=-77 mV, EL=-54.387 mV. The leak reference rounds the classic reference; small resting drift is not hidden by resetting V.

Adaptation is an explicitly synthetic continuous potassium-like gate: gA=20 nS, tauA=100 ms, Vhalf=-30 mV, slope=10 mV. It is initialized at its voltage equilibrium. It is not an identified molecular pathway or a general homeostatic controller. gA=0 is the mechanism-blocked control. Arbitrary network activity stability is unverified.

A delivered excitatory/inhibitory input adds a positive conductance to ge/gi at its absolute timestamp. Ee=0 mV, Ei=-80 mV, tauE=5 ms, tauI=10 ms. Inputs are externally supplied events; no sender identity, connectivity, synaptic weight learning or release chemistry is implemented. Inhibitory/excitatory labels describe configured reversal potentials; the actual current always depends on E-V.

An upward crossing of 0 mV emits an observation. The detector rearms at -20 mV. V and HH gates are never reset by the detector. A linearly interpolated crossing increments the two activity traces by one at the interpolated time; its contribution is exponentially decayed for the remaining fraction of the integration step. tauFast=20 ms; tauSlow=1 s. Filtered rate is fast/tauFast. These finite decaying observations are not learned long-term memory, plasticity, a reward or evidence of intelligence.

## Timing, inputs and outputs

An explicit SimulationClock is mandatory. `advance(q(duration,'ms'), protocol, {maxStep,recordInterval})` accepts existing Protocol objects targeting c0 only, including sums of at most 100 protocols. Defaults are maxStep=0.01 ms and recordInterval=1 ms. Maximum allowed step is 0.02 ms. RK4 stops exactly at input, protocol and sampling boundaries. Very small intervals that cannot advance binary64 time are rejected. No clock, random samples, file writes or network calls are implicit.

`receive({sequence,time,kind,conductance})` queues one conductance input. sequence must equal next_sequence starting at 0; time must not be in the past. `kind` is excitatory or inhibitory. Units are explicit quantities. Same-time inputs are applied in sequence order as one instantaneous boundary without intervening integration. An event at an advance endpoint is included in the final conductance; its effect on voltage begins with subsequent time advancement. A same-time queued event is delivered when advance starts, not when receive is called.

`outputs()` returns voltages/gates/conductances/adaptation, traces, timestamped spikes, cumulative counts and pending inputs. Currents use the right-limit protocol current at the end of the most recent successful advance. `spikesSince(cursor)` returns later retained spikes; if earlier unconsumed spikes were evicted it rejects with SPIKE_HISTORY_EVICTED. A future runner must poll often enough and must not infer delivery from the rolling display buffer alone.

## Bounds, errors, replay and limitations

Default limits: 1024 pending inputs, 1024 sampled records, 256 displayed spike records, 4096 successful commands per replay session, 1,000,000 substeps per advance. Applied event count/next_sequence avoid retaining every event ID separately. Records and displayed spikes are rolling buffers with explicit eviction counts. Commands are never silently evicted; reaching the finite history limit rejects the next command. The hash-linked journal has a finite cap of 4*maxCommands+16, including restore/error observations. An indefinitely running circuit with streaming authenticated checkpoints is future work, not implied by these bounded sessions.

Per-receptor maximum aggregate conductance is 200 nS by default, and external current magnitude is at most 1 nA. Same-time aggregate inputs exceeding the cap reject the entire advance. State voltage must be in [-200,120] mV, gates/adaptation in [0,1], conductances and traces nonnegative and all values finite. There is no clipping or silent saturation to manufacture stability. Valid parameter bounds do not guarantee RK4 stability at every allowed step: stiff configurations can require a smaller step, or be rejected. All exported parameter units, bounds and defaults are in CONTROL_REGISTRY.json.

Mutations execute against a candidate state. Any rejected command preserves physical time, voltages, gates, conductances and queued inputs; only ERROR status/audit state changes. Restore a known valid snapshot to recover. Snapshots contain full bounded command history and configuration/model hashes. Restore reconstructs from the initial state and replays every command before accepting the snapshot, including ERROR history. A rehashed fake trajectory is rejected. Hashes are integrity checks, not cryptographic authentication of an external author. An internally consistent different history cannot be authenticated without an external trusted journal head.

## Validation and sources

E1–E8 acceptance is recorded in CONTROL_REPORT_KO.md and CONTROL_REGISTRY.json. Predeclared thresholds: analytic passive voltage <=1e-8 V; independent DOP853 active voltage <=5e-6 V, gates/adaptation <=1e-5, conductance <=1e-15 S, spike times <=2e-5 s, activity traces <=0.002; exponential decay relative <=1e-8. RK4 refinement ratios must exceed 8 against a finer reference. Spatial convergence is not applicable to this explicitly single-compartment profile; the detailed profile's spatial evidence is preserved separately.

Primary implementation documentation: [Brian conductance equations](https://brian2.readthedocs.io/en/2.5.3/introduction/brian1_to_2/library.html#conductance-based-synapses), accessed 2026-09-16. HH provenance and source are inherited from ionic reference (original reference: `IONIC_EXTENSION_SPEC.md`). The official NEURON mechanism documentation was search-index accessible in this session; direct access timed out, so no new downloaded hh.mod or NEURON reproduction is claimed. Synthetic adaptation/traces are design assumptions with computational controls, not experimentally measured cell properties.

Network execution, synaptic learning, neuron-to-neuron validation, visual encoding, motor decoding, task training and actual drawing improvement remain future work. No unspecified biological feature is represented by an empty API or a PASS constant.
