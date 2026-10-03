# Project NION — Research Source Kit

[한국어 설명](README.ko.md) · [Architecture and equations](docs/ARCHITECTURE.md) · [Contribution guide](CONTRIBUTING.md)

This repository is a portable extraction of existing NION/Neuron Set and QHON research code. It contains a **single-cell model**, a **plastic synapse**, and **experimental formation/representation rules**. It is not a finished million-neuron NION GNN, a trained model, or evidence of human-like consciousness.

## Start here

| Requested component | Entry point | Existing implementation |
|---|---|---|
| GNN formation rules | [formation-rules.mjs](src/gnn/formation-rules.mjs) | [QHON growth](src/qhon/compact-cache-v11b.mjs), [design record](docs/GNN_DESIGN_SNAPSHOT.ko.md) |
| One neuron | [neuron.mjs](src/neuron.mjs) | [ControlNeuron](src/cell/control-neuron.mjs) and its six shared dependencies |
| One plastic synapse | [synapse.mjs](src/synapse.mjs) | [PlasticSynapse](src/plastic-synapse.mjs) |

Node.js **24 or later**. No external npm packages, installation, API keys, GPU, or network access are required for the examples and tests.

```sh
npm run demo:neuron
npm run demo:synapse
npm run demo:formation
npm test
npm run check:color
npm run check:contribution
npm run verify
```

Run commands from this directory. `demo:formation` uses a **synthetic software fixture**, explicitly not quantum randomness. To replay recorded ANU input in little-endian uint32 binary format:

```sh
node examples/formation.mjs --qrng-file private-data/recorded-words.bin
```

The input label is caller-declared, not authenticated by the adapter. Preserve the original ANU response, acquisition record, conversion rules and input hash for actual research. JSON API responses must first be converted correctly; they are not the binary input format. This kit makes no live QRNG API request.

## What is implemented?

- **ControlNeuron 1.0.0:** HH-type voltage/gating dynamics, excitatory/inhibitory conductance input, synthetic adaptation, bounded observations, explicit simulated time, snapshots and replay validation.
- **PlasticSynapse:** pair-based soft-bounded STDP, an older additive/clipped rule, explicit units, bounded history and restore validation. Pair selection and scheduling are the caller's responsibility.
- **QHON formation reference:** harmonic-frontier growth on exactly 27 positions, exact cache, packed frontier paths, recorded-bit consumption, and a reflected-update barrier experiment.
- **Representation proposals:** three-plane symbolic color mixtures and alternative neuron contribution counts, with original shape/event records retained.
- **Small integration reference:** `TinyNetwork` and the existing three-cell learning trial. This is not the complete GNN and is bounded to 16 cells/64 synapses.

The million-neuron complete graph, autonomous thought-path selection, learned color semantics, adopted emotion assignments, selective erasure cell and complete online GNN remain **design work**. QHON's newest 3D → layer-tagged 2D → line → continuous-thought extension is documented as unimplemented here.

## Source integrity and scope

`SOURCE_MANIFEST.json` records logical source locations and original/export SHA-256 hashes without private absolute paths. Core copied modules are byte-identical. Entry wrappers, input validation, examples and packaging tests were added for this export. Two original checks only have their relative import paths adjusted. Original documentation links were adapted for portability.

QHON's later coupled 27-cell resource/learning engine is **not** replaced by this standalone neuron/STDP pair. This kit does not reproduce every QHON campaign. Large results, personal paths, credentials, background runners and automatic research schedules are excluded.

## Contributing and license status

See [CONTRIBUTING.md](CONTRIBUTING.md) for concrete extension tasks and validation expectations. A software check is not biological validation, a memory-retention duration, or a measure of selfhood.

**License choice is pending.** `UNLICENSED` is a temporary package status, not an open-source license. The owner must select a license and confirm attribution before requesting public redistribution under specific terms; see [LICENSE_STATUS.md](LICENSE_STATUS.md). No MIT/Apache license has been silently assigned. `private: true` only prevents accidental npm publication; it does not configure GitHub visibility.
