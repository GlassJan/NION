# Export validation

Date: 2026-10-03 KST. Runtime used: Node.js v24.16.0 on Windows.

| Command | Observed result |
|---|---|
| `node --test tests/*.test.mjs` | 21 tests passed, 0 failed, 0 skipped; approximately14.45 seconds in this run. |
| `node tests/original-color-check.mjs` | 125 direction cases; scaling/reflection, explicit zero projection and chronology checks passed. |
| `node tests/original-contribution-check.mjs` | Branch fan-out, passive target vs AP, revisits, carry-in, ordering, malformed inputs and assignment consistency passed. |
| `node examples/one-neuron.mjs` | One cell,20ms simulation, one observed spike; successful exit. |
| `node examples/one-synapse.mjs` | Explicit strengthening and weakening; restored final weight matched. |
| `node examples/formation.mjs --fixture` |27-position geometry with12 grown edges; residual approximately1.33e-15; successful exit. |
| `node scripts/verify-package.mjs` | Original/export hashes, in-package relative imports and local documentation links checked; limited credential/private-path pattern scan passed. |

The formation regression checks compare16 synthetic configurations against the dense reference and check topology plus two path encodings. An exhaustive reduced-precision prefix-sampling check and split/combined stream comparison are included. These are software regression fixtures, not independent ANU research samples.

The existing soft-bounded tests include an independent geometric convergence solution, bound behavior, legacy restore, tamper/replay rejection, history capacity and actual delayed input/output spike pairing. The legacy additive teaching trial remains explicitly separate.

No live ANU request, GitHub publication, million-cell allocation or long-running campaign was started. This validation does not establish human equivalence, feelings, selfhood, or the efficacy of the unimplemented complete GNN.

Core copied source files were not changed to make tests pass. The package verifier's first import scanner matched a data field as if it were an import; its pattern was corrected before final verification. This was an export-tool issue, not a neuron or synapse result change.

`.gitattributes` disables automatic line-ending conversion to preserve the original source bytes and their recorded hashes. Contributor changes should keep provenance and explicitly update the export hash and change description.
