# Contributing

The project seeks reproducible implementations and clearly bounded evidence. Start with [README](README.md), [architecture](docs/ARCHITECTURE.md) and the dated [GNN design](docs/GNN_DESIGN_SNAPSHOT.ko.md).

## Before a contribution

License selection is still pending; resolve the repository's contribution and redistribution terms with its owner before relying on an open-source license. Do not add a license or copyright holder for existing material by assumption.

Describe which layer you change: single-cell equations, synaptic learning, formation geometry, event scheduling, record representation, or interpretation. Preserve the difference between user-defined rules and an implementation proposal. If a policy is unresolved, expose an explicit option or propose a specification first.

## Useful first tasks

1. **Portable neuron API documentation:** add parameter examples and independent tests of units, event ordering and replay without changing equations.
2. **Online plasticity adapter:** use actual presynaptic arrival/post firing, define ties and multiple events, compare against frozen weights, and include delayed events in saved state.
3. **Scalable formation structure:** remove 27-bit assumptions while exactly reproducing old27-position results. Measure both payload and runtime-object overhead before claiming scale gains.
4. **Color/role policy:** propose explicit role mapping and mixing semantics with degenerate projections and reflection/scale tests. Do not call symbolic interpolation learned meaning.
5. **Thought record and H5 line codec:** preserve original branches, chronology and identity; compare full package size and decoding time against a general compression baseline.
6. **Memory protection:** distinguish release inhibition, write-window control, electrical inhibition and resource exhaustion. Test old+new recall after temporary controls are removed.
7. **Selective erasure:** start with reversible logical disablement, protect shared successful paths, track edge versions and pending events, and measure mistaken deletions. Do not delete every edge after a fixed failure count without a stated causal test.

## Validation

Run `npm test`, both original contract checks, examples and `npm run verify`. For changed source, keep the original provenance hash and update `exportSHA256` plus a specific `change` description; do not pretend changed code is byte-identical. Add a regression test for a new failure or a new contract, not just a test repeating implementation arithmetic.

Reports should state Node version, configuration, input source/hash, independent sample count, conditions, numeric resolution, expected outputs, actual outputs, limits and failures. Distinguish synthetic fixtures from ANU inputs. Do not count two integration resolutions as two independent inputs.

Never loosen numeric bounds solely to turn failures into passes. Changes to equations, clocks, spike detector, state schema, event ordering or learning rule require a versioned explanation and recovery compatibility policy. Snapshot hashes alone cannot certify semantic truth or biological validity.

Report speed with setup, transfer and recovery costs where applicable. Bytes for a codec payload alone are not the entire neural system size. Hours spent running many experiments are not the retention time of one memory.

## Suggested pull-request content

- Problem and observable before/after behavior.
- Exact rules changed and newly introduced assumptions.
- Tests and comparison baseline, including failures.
- Scope, memory/CPU costs and reproducibility instructions.
- Unresolved decisions and whether any saved state becomes incompatible.

Human similarity, feelings, consciousness and selfhood are research goals, not established properties of this software. Avoid claims of biological validation from software tests alone.
