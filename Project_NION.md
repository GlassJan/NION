# Project NION

> QHON integrated detailed specification, research status, and evidence preservation document
>
> Reference date: October 3, 2026, Korea Standard Time (KST) / Materials compiled at 2026-10-03 15:30:05 KST
>
> Scope: Hypotheses 1–5, three formally registered derived hypotheses, the latest layer-labeling and line-representation extensions to Hypothesis 5, implementation conditions, principal successes and failures, unresolved research, and an index of source texts and evidence.

## Table of Contents

- [1. Purpose of the Document and How to Read It](#nion-section-1)
- [2. Primary Goal and Current Extent of Achievement](#nion-section-2)
- [3. Overall Structure and Conceptual Flow](#nion-section-3)
- [4. Hypothesis 1 — Random Interactions Between Neurons](#nion-section-4)
- [5. Hypothesis 2 — Erroneous Influx Due to Neurotransmitter Dispersion](#nion-section-5)
- [6. Hypothesis 3 — Transmitter Release Inhibition and Recovery Triggered by Return Detection](#nion-section-6)
- [7. Hypothesis 4 — Two Neural Networks and Central Inversion](#nion-section-7)
- [8. Hypothesis 5 — Thought Refraction Lines and the Interpretation Cube](#nion-section-8)
- [9. Latest Supplementary Hypothesis for Hypothesis 5 — Layer-Labeled Planes and Lines, and Continuous Thought](#nion-section-9)
- [10. Three Formally Registered Derived Hypotheses](#nion-section-10)
- [11. Current Design for Memory, Learning, Prediction, and Seeds of a Self](#nion-section-11)
- [12. Implementation, Execution, and Reproducibility Conditions](#nion-section-12)
- [13. Principal Research Results and Failures — Distinguishing Different Units of Evaluation](#nion-section-13)
- [14. Why Failures Are Preserved and How Maturity Is Assessed](#nion-section-14)
- [15. Remaining Research and Passing Criteria](#nion-section-15)
- [16. Relationship to NION GNN and the Earlier Branch Algorithm](#nion-section-16)
- [17. Terminology and Avoiding Interpretive Confusion](#nion-section-17)
- [18. Source Priorities and Guide to the Appendices](#nion-section-18)
- [Appendix A. File Observations at the Time of Writing](#nion-section-19)
- [Appendix B. Index of Audit Files for the Current Campaign](#nion-section-20)
- [Appendix C. Sources, Versions, and Integrity Inventory](#nion-section-21)
- [Appendix D. Preserved Core Source Texts and Research Records](#nion-section-22)

<a id="nion-section-1"></a>

## 1. Purpose of the Document and How to Read It

This document consolidates the QHON content recorded in the current files so that it can be read in one place. `Project NION` is the title the user specified for this document. It does not authorize wholesale renaming of existing QHON project folders, code, or hypothesis numbers. QHON and QOHN, as used in the conversation, refer to the same research on Hypotheses 1–5. NION GNN is the synaptic-refraction-line-based neural network design proposed by the user; it is not automatically equated with an implementation of a conventional Graph Neural Network.

The content is divided into the following five categories.

| Category | Meaning |
|---|---|
| User definitions and original hypotheses | The structures and claims intended by the user. These include propositions that have not yet been empirically demonstrated. |
| Current engineering definitions | Explicit rules and data contracts that allow testing in a simulation without contradictions. |
| Implementation candidates | Options proposed in the documents for which completed implementation and validation have not been confirmed. |
| Validation evidence | Results confirmed for particular inputs, settings, samples, and observation intervals. |
| Unresolved | Matters requiring additional definition, implementation, or independent validation. |

Priority is given, in order, to the latest user definitions, the latest specifications reflecting them, subsequent audits and revision records, and historical reports. Numbers and failures in historical documents are not erased; they are distinguished from subsequent results and dates. Source texts preserved in the appendices may be historical material. Earlier descriptions of firing blockade in H3, and the earlier H5 proposals prioritizing a single point sequence and enlargement, do not replace the latest definitions.

Preparing this document is a materials-consolidation task. It is not counted as running new experiments or newly validating the hypotheses. Not every raw checkpoint is reproduced in the main text; principal source texts are included in the appendices, while protocols, audits, and raw data are traceable through paths and hashes.

<a id="nion-section-2"></a>

## 2. Primary Goal and Current Extent of Achievement

The primary goal specified by the user is **at least 98% similarity to humans, including thought, emotion, and selfhood**. The goal is not reduced to 98% accuracy on a particular task. Research subgoals are memory formation, preservation, and modification; accurate interpretation; prediction of one's own state and action outcomes; change through experience; and efficient storage and computation.

Human similarity has not currently been calculated. Human comparison groups, tasks, domain-specific distances, weights, tolerances, and the aggregation method have not been finalized. Whether 98% is required in every domain or 98% in aggregate is also undecided. Functional similarity, similarity of biological structure, and the existence of subjective experience are separate assessments.

Long-term memory and seeds of a self are research goals. History management or improved prediction by external programs is not converted into a rate of self-formation within the neural network. The current binary associative memories, external goal versions, behavioral observations, and recovery policies are not declared to implement human episodic memory, emotion, or self-awareness.

<a id="nion-section-3"></a>

## 3. Overall Structure and Conceptual Flow

```text
ANU QRNG input + explicit spatial and probabilistic rules
    ↓
H1: Pre-connection interactions and directional traces → connection formation
    ↓
Neural firing and synaptic transmission
    ├─ H2: Local capacity, external influx, selective return, and material conservation
    ├─ H3: Return detection, release inhibition, and finite-resource recovery
    └─ H4: Preservation of corresponding inverted structures and change order
    ↓
H5: The entire Thought Refraction Line, including spatial positions, connections, and branches
    ↓
Original-form preservation → retrieval → shape-preserving reduction → variably subdivided interpretation cube
    ↓
Integrated layer-labeled plane → line representation preserving information identity
    ↓
Continuous thought represented by connections between lines [latest concept; functional validation incomplete]

Derived hypotheses: 3A1B prediction / 5A lossless archiving / 3A5B1C protection against learning interference
```

This diagram shows the intended relationships between the hypotheses. It does not mean that every element operates autonomously as an integrated whole within a single neural state. External controllers, teacher inputs, observers, the neural engine, and storage code are currently separate.

<a id="nion-section-4"></a>

## 4. Hypothesis 1 — Random Interactions Between Neurons

### 4.1 Original Claim

Even between neurons that are not yet connected, a hypothetical potential event called Rd (Random) may spread into the surrounding space and reach a local site on another neuron. A growth-inducing state and a direction-retention state arise at the arrival site, and the dendrite grows back along the incoming signal's path toward the point of dispersion. A functional connection is considered complete when signal transmission becomes possible after contact.

Randomness does not mean unrestricted spatial access. Rd has finite strength, range, and duration, and collisions are determined by positions, paths, and arrival conditions. For momentary contact to lead to a connection, the retention time of directional information must be compatible with the growth time. Repeated arrivals refreshing the directional state is an auxiliary assumption.

### 4.2 Current Engineering Supplements

The entire path with multiple bends is not reconstructed from the final arrival direction alone. The rule is applied to straight or restricted local paths, or source-specific path traces are stored with finite capacity and lifetime. Trace collisions, overwriting, expiration, and capacity overruns are recorded as failures or rejections. If source labels or entire paths are preserved, their additional byte costs are included.

The formation of a connection and the formation of a useful output path are different. If a sensing neuron is isolated, its release inhibition does not functionally propagate to other neurons. When supplementing functional connections, the provenance of connections formed under the original directional rule is distinguished from that of supplementary connections, and comparisons are made against the same number of randomly added connections and against no supplementation. Rewiring that silently removes existing connections is not performed.

### 4.3 QRNG and Lightning Paths

QRNG is used for elements declared to be random variables, such as random occurrence, movement, and branching. LI-QRNG, which combines a lightning-generation method with QRNG, is a research subject for path generation, branch storage, and random-number consumption efficiency. Collisions, growth direction, and conservation laws are not replaced by random choices.

Early research tested QHF1 path batching, a frontier-candidate cache, a harmonic-field computation cache, and reading only the required bits. These results improved the computation and representation of directional paths; they did not discover a mechanism of actual cell growth.

### 4.4 Remaining Issues

The physical medium of Rd, the actual storage structure for directional traces, and the process converting them into a growth response are unresolved. Consistency of a connection-formation algorithm is distinguished from biological existence. When enlarging the cube, path counts, collisions, cache size, functional reachability, and the cost of sparse connections must be reassessed.

<a id="nion-section-5"></a>

## 5. Hypothesis 2 — Erroneous Influx Due to Neurotransmitter Dispersion

### 5.1 Original Claim and the User's Example

Transmitter at one junction may leave its original transmission path and enter another active junction. The hypothesis is that, when the second junction's permitted occupancy is full, the influx of external material causes some of the original material to return toward its own release side. This does not mean that external material is necessarily harmful.

The user's example starts with A10 in a compartment of capacity 10; B1 is admitted while A1 returns, leaving A9+B1. Capacity 10 is the upper limit of the local transmission compartment. The returning A remains within the overall model, so this is not described as a decrease in the material of the entire system.

### 5.2 Selectivity and Two-Stage Exchange

The original position-based rule does not always select A. The following two versions are distinguished.

| Version | Selection rule | Limitation |
|---|---|---|
| Position-selective | Select the molecule near the return path | If positions are mixed, B may return. |
| A-selective | Explicitly add a rule distinguishing A | The selection mechanism itself is an auxiliary assumption; its actual physical realization is unresolved. |

The current A-selective revision uses a two-stage process: reserve the movement of A, begin its return movement, and then admit B within the permitted capacity. Material inside the compartment, in return transit, reserved for entry, waiting outside, and discharged is all included in the ledger. A closed path, depletion of A, or a saturated queue leads to deferred or restricted influx, not deletion of material.

### 5.3 Distinguishing Resource Shortage from Memory Loss

Even with preserved weights, recall output may disappear if transmission inventory is insufficient. Conversely, incorrect memories may become readable again when resources recover. Thus, no response is not immediately classified as memory loss. Weights, release permission, inventory, actual transmission, and output readout are examined separately.

The current chemical and energy ledger is an abstract model detailing a single local transmission compartment. It does not calculate every neuron's material concentrations, ion pumps, membrane-potential maintenance, or the full metabolic cost of learning. Passing local conservation checks is not extended into a claim of biological energy feasibility for the entire neural network.

<a id="nion-section-6"></a>

## 6. Hypothesis 3 — Transmitter Release Inhibition and Recovery Triggered by Return Detection

### 6.1 Revision of the Name and Meaning

The historical V2 contains the “Neuron Firing-Threshold Disregard Hypothesis” and descriptions of action-potential blockade. The user established **transmitter release** as the target of inhibition, and the current V3 follows this definition. The hypothesis is that occupancy of a return-detection site can generate a release-blocking signal, not that a single molecule at any arbitrary location always stops a neuron.

Action-potential generation, release permission, and arrival at a receiving neuron are separate events. Events already released before the inhibitory signal arrives are not canceled retroactively. Events and causes are recorded separately so that transmission can be blocked while action potentials are retained.

### 6.2 Recovery and Finite Resources

A candidate rule attempts recovery when blocked release attempts reach a specified count or a set time has elapsed since return detection. A time condition is included because waiting only for firing attempts can cause permanent stalling after input ceases. Recovery has a cost, and candidates that reserve resources are tested so that production does not consume the last resources needed for recovery.

Three attempts, a 100ms upper bound, and a storage cap of 16 are test values appearing in the documents. They are not treated as fixed values for every protocol or as physiological constants. Recovery is not unconditionally guaranteed if the initial recovery resource is 0.

### 6.3 Residual Effects and Memory

Residual energy and recirculating activity in the original hypothesis address how state changes after a perturbation affect subsequent responses. The initial energy is not assumed to circulate forever without loss. Energy supply and consumption are distinguished from information retention, and repetitive activity alone is not accepted as memory.

Tests examine whether perturbation types can be distinguished from subsequent voltage, firing, and behavior, and whether the distinction remains meaningful after the stimulus ends. Synthetic adaptation states, chemical storage states, post-stimulus communication, and recovery resources are separated through controls. Supervised learning in an external readout is distinguished from actual synaptic learning.

### 6.4 Four Different Interventions

| Intervention | What it directly changes | Caution |
|---|---|---|
| Transmitter release inhibition | Permission for future release | It does not cancel events already transmitted or learning already completed. |
| Write-window restriction | The time during which weight updates are permitted | This is external control distinct from release inhibition. |
| Electrical inhibition | Membrane potential and firing timing | Firing after release from inhibition and competitive-learning side effects are possible. |
| Resource supply and recycling | Available transmission inventory and recovery costs | These do not guarantee the correctness of the memory content itself. |

This distinction is necessary to avoid conflating incorrect learning after inhibition release in M34, write-window supplementation in M36, and release-based protection in M18A as successes or failures of the same mechanism.

<a id="nion-section-7"></a>

## 7. Hypothesis 4 — Two Neural Networks and Central Inversion

### 7.1 Original Claim

The hypothesis holds that two mutually inverted connection systems coexist within one brain: the original neural network, formed first, is responsible for consciousness, and the inverse neural network, formed later, is responsible for the unconscious. The original proposal also includes the possibility of exchanging these two roles. Formation need not be simultaneous, but the corresponding connection must be completed before the next change to the original neural network. The formation time difference and the signal-flow time difference are separate conditions.

The assignment of consciousness and the unconscious is retained as a claim of the original hypothesis. Current engineering validation is limited to inversion and synchronization and has not demonstrated the existence of these functions.

### 7.2 Current Definition of Inversion

The following is used for 3×3×3 coordinates.

```text
P(x,y,z) = (2-x, 2-y, 2-z)
Linear index: P(i) = 26-i
P(P(i)) = i
Correspondence of connection a→b: P(a)→P(b)
```

Coordinates remain inside the cube after inversion. Positional inversion alone does not reverse the temporal order of signals, cause and effect, the meaning of actions, or the sign of rewards. It is also distinct from the “inverse branch that actually performed the opposite action” in the earlier branch algorithm.

### 7.3 Synchronization and the Entire State

The basic version allows the next change only after completion of the previous change has been acknowledged. Sending multiple changes simultaneously is recorded as a separate candidate that relaxes the original barrier condition. Sequence numbers, completion acknowledgments, retransmission, and finite buffers handle omissions and duplicates; the order of changes at each step is checked, not just the final matrix.

Whole-state inversion requires coordinate correspondence not only for neuron coordinates and edges, but also for weights, sensor positions, pending transmissions, learning times, target commands, resource states, and memory histories. Success in existing static correspondence tests and some continuation tests is not extended into a claim of complete synchronization during active learning. A control with two modules of 27 states each has 54 states; the modules are not merged merely because their coordinates coincide.

<a id="nion-section-8"></a>

## 8. Hypothesis 5 — Thought Refraction Lines and the Interpretation Cube

### 8.1 Core of the Original Hypothesis

Signals related to a single thought come together to form a Thought Refraction Line; its shape is preserved unchanged in the claustrum, and multiple stored shapes are interpreted in a three-dimensional interpretation cube when needed. The original hypothesis claims that the interpreted information constitutes subjective experience. This role of the claustrum and the emergence of experience remain hypotheses, not an established storage mechanism in the actual brain.

In the latest user definition, a Thought Refraction Line is **one entire structure, including the spatial positions traversed by signals and their branches**. It does not mean merely a single sequence of points. The interpretation cube is intended to interpret and create thoughts based on features such as shape, bends, and branch count. The specific operations for semantic learning and creation are not yet complete.

### 8.2 Objects That Must Be Distinguished

| Object | Meaning |
|---|---|
| Activity event | Actual simulated activity that generated or transmitted signals. The event-segmentation rule is recorded. |
| Original Thought Refraction Line | The complete shape, including spatial positions, connections, and branches. |
| Preserved state | Data stored so that the original form can be queried again. |
| Interpretation working state | A temporary state used to retrieve and process the original form. It is separate from the original. |
| Functional output | Measurable results such as classification, recall, and selection. |
| Subjective experience | What the original hypothesis seeks to explain. Its existence is not assessed from functional output alone. |

The minimum shape-data contract comprises a version, coordinate system and units, positions, connections, and provenance. Time, sequence numbers, and conductance are auxiliary information preserved in the current implementation. Success using temporal information is not presented as performance attributable solely to spatial shape. A hash of stored data is an aid to integrity checking, not proof of semantic truth.

### 8.3 Shape-Preserving Reduction and Variable Subdivision

The user defined reducing the size of a refraction line while retaining its shape so that it can be processed even in a small interpretation cube. Interpretation cubes may have various sizes; the key element adjusted according to complexity is their degree of internal subdivision.

The current implementation choices are positive uniform scaling and translation. Rotation, reflection, and nonuniform deformation along separate axes are not automatically assumed to preserve meaning. Original common coordinates and lengths are retained, and the semantic weighting associated with length is not confused with the reduced display length.

Checking whether a segment passes through a cell is not limited to examining endpoints. Different lines and node identifiers within the same cell are not merged. Actual intersections, proximity below the available precision, and insufficient subdivision budgets are distinguished. A maximum depth and a cell budget are required, and increasing subdivision incurs computation and indexing costs. The 72 bytes of additional information in the QHS1 candidate are not a saving.

### 8.4 Implementation Boundaries for Interpretation and Creation

A testable processing flow consists of selecting original forms, checking integrity and coordinate compatibility, placing them for interpretation, extracting structural and relational features, applying explicit update rules, reading functional outputs, and confirming that the originals remain unchanged. Computations are not omitted by assuming a separate “interpreter” that lacks selection rules, learning rules, or termination conditions.

Incomplete inputs remain unknown or represented by multiple candidates. Missing sensory information is not replaced with correct-answer labels or previous instructions. New interpretations are not written over original memories as though they were events that originally occurred. Combining multiple shapes, contextual interpretation, and generating new thoughts are follow-up functions that must be compared against ordinary records and simple readouts.

<a id="nion-section-9"></a>

## 9. Latest Supplementary Hypothesis for Hypothesis 5 — Layer-Labeled Planes and Lines, and Continuous Thought

### 9.1 Completion of the User's Definition

On October 3, 2026, the user added a method that divides the three-dimensional interpretation cube along its subdivision planes, represents whether a line passes through each location as 1/0, and combines these into one two-dimensional plane while retaining layer identities. The user then applied the same compression principle again to produce a line representation and defined connections between these lines as continuous thought. The user explicitly stated that this completed the concept of the supplementary hypothesis.

Completion of a conceptual definition is distinguished from completed implementation and validation. This extension belongs to Hypothesis 5 and may relate to the formally registered derived hypothesis 5A, but the two have not automatically been merged into the same proposition or assigned a new number.

### 9.2 From Three Dimensions to a Layer-Labeled Plane

Let the occupancy of the specified grid be V(x,y,z)∈{0,1}. The integrated plane can be defined as follows.

```text
P(x,y) = { z | V(x,y,z)=1 }
Reconstruction: V(x,y,z)=1 ⇔ z∈P(x,y)
```

If multiple layers are traversed at the same position, every layer must be retained. For example, P(1,2)={0,2} reconstructs z=0 and z=2 distinctly. Merging them into a simple P(1,2)=1 loses depth. A uniform grid requires an origin, axes, and grid spacing; nonuniform subdivision also requires preservation of every layer and cell boundary.

The target of exact reconstruction is occupancy information for the declared grid. Sub-grid details of the original continuous curve, movement order, repetition counts, direction, and branching connectivity are not always determined by 0/1 occupancy alone.

### 9.3 From a Plane to a Line

The first implementation candidate in the latest document retains all row and layer information at each x position of the line.

```text
L(x) = { (y,z) | V(x,y,z)=1 }
Another candidate: arrange plane coordinates in the order s=x+Nx*y and store the layer sets
```

Both methods are test candidates and have not yet been finally adopted. Encoding values in the bends of the line itself requires separate encoding rules, coordinate precision, segment boundaries, and decoding rules. Simple serialization is not equated with encoding through the geometric shape of a line. Even when a branched original is converted to linear storage, the original branching information must remain reconstructable.

### 9.4 Connections Between Lines and Continuous Thought

When multiple lines are connected, the boundaries and order of each thought unit, the identities of preceding and following connections, and the provenance of the original structure are preserved. Different thoughts must not be merged merely because they have identical coordinates or similar shapes. Accurate retrieval of connected data and actual reasoning that carries context forward are validated separately.

Currently undecided items are the rule for choosing the next thought, how connections are learned, branch selection and rejoining, combining older context with the current goal, preserving original forms during repeated interpretation, and termination conditions for interpretation. These items are not recorded as already implemented.

### 9.5 Minor Variations and Unacceptable Memory Errors

The user regards minor errors during interpretation as within the realm of human nature, but prohibits remembering something completely differently as an error. The following proposed implementation distinctions were recorded.

| Category | Candidate criterion | Handling |
|---|---|---|
| Storage or reconstruction damage | The declared original form, identity, or order changes | An error. Mark validation failure and retrieve or recover the original. |
| Expressive variation in interpretation | Core facts, relationships, and task judgments are retained | Evaluate separately within a predefined tolerance. |
| Major memory error | Changes to objects, actions, goals, causality, or temporal order; addition of nonexistent events; mixing memories | Not permitted; counted as an accuracy failure. |
| New creation or inference | A derived interpretation absent from the original | Store as a derived result, distinct from historical facts. |

A small coordinate difference or a one-character change can reverse meaning, so distance alone does not determine whether a variation is minor. Core information and tolerances are fixed before the task. Errors themselves are not concluded to be evidence of human nature or consciousness, and artificial noise is not added as a default behavior.

### 9.6 Conditions for Actual Compression and Current Results

Simply moving Nx×Ny×Nz bits into Nz bits at each position of a plane leaves the total amount of information unchanged. Rearranging them into a line does the same. Actual files can become smaller only by exploiting properties such as sparsity, repeated patterns, references, and residuals.

If there are D distinct layer patterns, the payload cost of a simple dictionary representation is approximately D×Nz + Nx×Ny×ceil(log2 D) bits. Headers, coordinates, dictionary size, validation, and reconstruction code add further costs. Comparisons must use the final package, not only the encoded data.

The plane-representation tests O04–O07 are distinguished from the present line representation. The former have occupancy-reconstruction evidence, whereas the latter do not yet have new round-trip reconstruction or continuous-thought functional-validation results. In the current actual-record test O06, the complete selection-based bundle was instead 2.47% larger.

<a id="nion-section-10"></a>

## 10. Three Formally Registered Derived Hypotheses

### 10.1 Identification Rules

The numbers identify contributing original hypotheses, while A, B, and C indicate the order of influence of their direct design contributions. They are not measured contribution percentages or validation grades. Parent numbers are not added merely because a hypothesis supplies shared resource constraints or comparison tools. The historical record documents selection of three hypotheses from 17 registered proposals and 13 candidate families after deduplication.

### 10.2 3A1B — Prediction by Reusing Shared Action–Request Response Rules

**Proposition:** When actions share transmission and inhibition rules, learning these shared rules from public commands, intervention requests, and past outcomes can improve prediction of unused action×request combinations. Because incorrect transfer is possible when sharing breaks down, uncertainty is retained over shared and separate models.

H3 provides the release and inhibition rules that change action outcomes, while H1 provides functional paths. H2 supplies resource constraints, H4 correspondence-based comparisons, and H5 a candidate for future observation extensions; they were not added as direct parents of this proposition. Its alias is F08/X02.

Current evidence includes conditional improvement in an external predictor, connections between actual neural outcome memory and action selection and feedback, and effects of re-observation after goal changes. Some conditions perform identically to ordinary Bayes or public records. Performance is not inflated by passing actual internal gates, future outcomes, or correct answers into prediction inputs. An internal neural self-model, selfhood, and universal decision-making superiority remain unproven.

### 10.3 5A — Lossless Archiving Using Relationships in the Entire Original Form

**Proposition:** If entire Thought Refraction Line records contain reproducible firing–transmission relationships, storing exact references and residuals can preserve the original form while producing a complete package smaller than ordinary direct archiving. The advantage disappears when relationships are weak or reconstruction costs are high.

The direct parent is H5, which defines the entire structure, common coordinates, and preservation of the original form. Its aliases are F12/SC-H5-01·CR01. This applies known reference, residual, and lossless-compression principles to QHON records; it is not claimed to be a new universal compression law.

The 28.28% in the development whole-S package SC02, the 0.89–9.24% in the four existing record groups of SC03, and the subsequent 22.06% relative to V8 in O03 concern different targets and baselines. Whole-checkpoint archiving studies R09/R10, C02, and N07, and spatial-occupancy studies O04–O07 are also counted separately. Their figures are not multiplied or combined into a saving for the entire neural network.

### 10.4 3A5B1C — Temporary Release Inhibition in Feedback Paths During New Learning

**Proposition:** When actual interference exists between distinguishable old and new memories, inhibiting release in a particular neural feedback path only during learning may better retain the joint correctness of both memories after inhibition is removed.

H3 provides inhibition and recovery; H5 provides information about entire paths, branches, and rejoining; H1 provides the connection layout. Feedback here means re-entry of neural signals, distinct from the return of A molecules in H2. Its aliases are F11/X04·CROSS-MI01.

At the initial selection stage, selective old/new readout was not achieved, so the efficacy stage could not be entered. Subsequent research advanced location-specific release protection, addition of new memories, and write-window supplementation; therefore, the initial “efficacy unvalidated” status alone is not copied as the latest overall status. However, whether the method is uniquely better than ordinary write locking, selects protection sites and times autonomously, and retains old+new together under diverse interference remains unresolved.

Success is assessed by reading both memories after all temporary gates are removed. Retaining old while failing to learn new is not counted as successful joint protection.

<a id="nion-section-11"></a>

## 11. Current Design for Memory, Learning, Prediction, and Seeds of a Self

### 11.1 Stages of Memory

Acquisition, initial reinforcement, maintenance, access, recovery after damage, legitimate goal-dependent modification, and file archiving are distinguished. Recall failure can result from absent learning, weakened weights, release inhibition, insufficient inventory, insufficient readout gain, competing outputs, or loss in the observation representation. Causes are distinguished first to reduce unnecessary relearning.

### 11.2 Actual Learning and External Control

Current experiments change actual weights through paired firing and source-cell write windows. Teacher inputs and schedules are externally specified. Even teacher-free reactivation is not called spontaneous memory replay if write permission and reactivation timing follow an external schedule. Results from training only a readout are separated from neural-weight learning.

In recent settings with activity-dependent forgetting, w←w×(1−0.01) is applied at each actual release eligible for learning. The M38 follow-up review confirmed agreement with w_after=w_before×0.99^97 for 97 releases in one interference interval across 640 applicable checks. The half-life in this setting is approximately 68.97 releases, not a human-memory time constant. Not every engine condition follows this simple formula alone; paired-firing reinforcement, competitive updates, and other operations have separate conditions.

### 11.3 History-Based Repair and Goal Changes

A unique past output can be compared with the current output and, if they disagree, restored through actual learning. However, if the past was incorrect, the error is restored; if the goal has changed, a legitimate modification is undone. Observation time, goal version, resource and control states, and grounds for confidence are retained in the history, and the original history is not changed.

M41 provides evidence for avoiding unnecessary restoration of the past when an external goal version is supplied. It is not a result of autonomously recognizing or generating a goal. When correct answers, goal changes, and fault states produce identical observations, they are not assumed to be always distinguishable without additional cues.

### 11.4 Seeds of a Self and Emotion

Current functional candidates are prediction of action outcomes, self-observation histories, rechecking after failure, goal-specific plan updates, and persistent state preservation. The parts handled by external software must be specified and are not equated with a subjective self. Basic emotion types, placement, and synthesis relate to the earlier GNN concept but are not established as a validated emotional system in current QHON.

Evaluating emotion, identity, and self-awareness requires separately defined observable tasks, controls, persistence criteria, and boundaries between change and error. At this stage, there is no basis for calculating a percentage of self-formation or similarity to human emotion.

<a id="nion-section-12"></a>

## 12. Implementation, Execution, and Reproducibility Conditions

| Item | Current criteria and limitations |
|---|---|
| Default space | 3×3×3, with HH-type cells at 27 positions. Some two-module controls add a separate set of 27 states. |
| Cell model | HH-type reference calculations and separate synthetic elements. Not a complete cell model tailored to human cortical neurons. |
| Neural-network storage | The small model's 27×27=729-entry weight array is not extrapolated unchanged to large scales. |
| Random numbers | Preserve original ANU QRNG responses, order, provenance, and hashes. Distinguish replay of existing inputs from newly received inputs. |
| GNN | New construction is on hold. Generating this document does not authorize construction. |
| Experiment location | Quad Hypothesis Of Neuron on the desktop. Distinguished from earlier Neuron Set research. |
| Stopping | User pause requests and specified deadlines take precedence. Preserve memory and completed checkpoints. |

### 12.1 Numerical Accuracy

Relevant protocols use time-step-halving comparisons, firing counts, sample lengths, a maximum voltage difference of 0.1mV, and a firing-time difference criterion of 10µs. Historical records also include tests with finer time steps under some conditions. Tolerances are not widened to make failures pass. Passing a numerical audit and achieving successful memory function are separate matters.

### 12.2 QRNG, Compression, and Input Reuse

QRNG is a condition on the source of randomness, not a device assumed to provide meaning, energy, or selfhood. Seeding a PRNG with QRNG output and expanding it is not reported as equivalent to original quantum random numbers. Supply delays are not hidden through silent substitution. Historical source texts and current supply settings are distinguished.

Early LI-QRNG research generated more paths from the same quantity of randomness by consuming only the required bits. This is not an achievement in lossless compression of raw random bitstreams. Input replay is useful for paired comparisons and reproduction but does not add independent samples.

### 12.3 Storage and Resumption

Spatial original forms, order-preserving event records, and complete neural resumption states are different. The documents identify QNS3 as an array-compression family, QHT2 as original-form and event preservation, QHS1 as a test format with reduction-related metadata, and QHC1 as a candidate name for complete resumption state. Applicable versions and actual storage APIs for each format follow the corresponding sources and protocols.

Complete resumption requires whatever state the actual engine needs, including voltage, gates, firing readiness, weights, learning traces, pending events, chemical ledgers, control progress, and the random-number consumption position. Saving only shapes is not claimed to restore the complete neural state. Value equality, original-byte equality, and physically equivalent normalized states are distinguished.

### 12.4 Current Scope of GPU Application

G06 compared 5,616 queries in which the GPU calculated its own firing and delayed transmission under fixed-weight, inactive-chemical-sensor conditions. G07 continued CPU rest and re-reinforcement from restricted GPU end states. This does not constitute transfer of all active chemistry and learning to the GPU.


<a id="nion-section-13"></a>

## 13. Principal Research Results and Failures — Distinguishing Different Units of Evaluation

The figures below are conditional results from the original reports. Counts of independent graphs, conditions, observations, audit items, and HH interval returns are not added together. The latest partial-completion counts are recorded separately in the file-observation appendix below.

### 13.1 Earlier Integrated and Functional Research

| Study | Result | Current interpretation |
|---|---|---|
| Human8 H40 | Complete recovery of four facts in 8 inputs improved from 4/8→8/8 | A restricted task on two existing graphs. Resource recovery alone does not guarantee true memories. |
| Human8 H42 | Prediction error improved, but only 6/8 were numerically eligible | The overall frozen validation remains FAIL. |
| Human8 H44 | Differences in voltage information were confirmed despite identical AP and refraction-line records | Diagnosis of loss at the representation stage, not success of a new recognizer. |
| P16B/P17 | Neural outcome memory was connected to selection, feedback, and relearning | Some conditions show no unique advantage over a public-record baseline. |
| P18 | The learning group preserved four existing binary associations and a new fifth association in 8 conditions | Not a universal capacity for every 27-neuron model or five episodic memories. |
| P21 | Readout on six existing structures: 930/930 | A development result from improving read gain on the same data. |
| P23 | Source-specific write windows compensated for failure of late release blockade | An achievement of external write control, distinct from H3 itself. |

### 13.2 Memory and Learning in the Current Continuous Campaign

| Study | Confirmed core result | Limitations and failures |
|---|---|---|
| N05/N06 | Context readout on new inputs and expanded-scope checks | Counts of conditions and assessments follow the individual audits. |
| N10/N11/N12 | Three associative memories; four associations in a restricted structure; 2,808 matching assessments across 9 eligible structures among 12 new structures | The 3 exclusions are not hidden. Assessment count is not independent-structure count. |
| N13/N14 | Changed the output mapping for the same input; N14 matched 216 stage assessments across 72 conditions on 12 new structures | Relearning one mapping is distinguished from multi-context capacity. |
| M13/M14 | Rechecking after inhibition release reduced unnecessary learning | Delays beyond the waiting deadline remain deferred and unresolved. |
| M15/M16 | Inventory depletion was identified as a confound and separated through finite-supply and recycling controls | Unexecuted expanded M15 conditions are not counted as completed. |
| M18A | Release-based protection at specified source cells in 96 conditions on 12 new structures | Automatic protection-site selection and the complete old+new proposition remain incomplete. |
| M18B | 72 conditions on 12 new structures; learning timed to resource recovery achieved 24/24 versus 12/24 for immediate learning in some conditions | Deferred when supply is late. Observation and waiting costs are included. |
| M19 | Re-observation policy after a goal change: 36/36; two controls: 24/36 each | Goals and policies were externally supplied. |
| M20/M22 | In M22 on 12 new structures, reactivation retained 34/36; read-only retained 0/36 | Parent trajectory: 20.7 model seconds. Not convertible to human very-long-term memory. |
| M23 | Predictions: 150/150 conditional observations; a simple threshold also achieved 150/150 | Diagnostic branches and a fixed 4-second future. Separate from policy success including actual observation costs. |
| M24 | Confirmed failure through incorrect reinforcement of an error occurring after a query | Checking ambiguity only at query time did not prevent subsequent errors. |
| M25/M26 | Strong inhibition in M25 caused 21 voltage-domain failures among 31 assignments | M25 candidate rejected; remaining 41 conditions and M26 not run. |
| M28/M32 | Targeted protection was effective for some delayed errors | Failed at 500pA6ms; worse than control in some 500pA3ms conditions. |
| M31/M33 | Restored past observations; final M33: 72/72 versus control 36/72 | Did not assess whether the past was true. |
| M34 | Without a teacher, 24/24 learned the opposite memory after inhibition release | A side effect of electrical inhibition. |
| M35 | Confirmed 36/36 were recallable immediately after M22 learning | The two losses relate to the first interference interval. |
| M36 | A 40ms write window prevented incorrect teacher-free learning | New goal: 0/24 with outdated target protection retained, 24/24 when released. |
| M37/M38 | Across 12 existing structures, initial reinforcement: 36/36; control: 34/36 | In the 10 additional M38 structures alone, both conditions were 30/30. Not independent confirmation. |
| M39 | Planned independent confirmation of initial reinforcement: 48 conditions using 12 new QRNG inputs | Completion of the final audit unconfirmed. Partial results are not used to conclude success. |
| M40 | 432 write-window and stimulus-interval conditions; audit of 36 pilot conditions | Full audit unconfirmed. 40ms is not established as a universal value. |
| M41 | Upon a goal change, version checking: 24/24; unconditional past restoration: 0/24 | Efficacy of an external goal version. The new goal was already learned before the test. |
| M42 | Pilot failed due to an empty-stimulus-list API error | Raw data and incurred costs preserved; no expansion. |
| M43 | Compared rehearsal with actual observation costs after correcting only the empty-list call | Full pilot audit unconfirmed. No established policy superiority. |
| M44 | Preparatory resource-separation proposal increasing supply from 512→2048 | Earlier 16-cycle expansion plan unexecuted and superseded. Protocol generation is distinguished from actual results. |

The first documented M43 results separated late inventory shortage under fixed rehearsal from earlier memory loss under predictive rehearsal. These partial observations are not used to draw conclusions for all structures or policies. The purpose of the M44 preparatory proposal is to distinguish unreadability despite retained weights from a decrease in the weights themselves.

### 13.3 Storage, Shape, and Acceleration

| Study | Target and result | Included and excluded scope |
|---|---|---|
| Early QHF1 | Across 105,111 paths, 52.28% smaller than individual frontiers and 64.56% smaller than the previous byte batch | Path representation, not storage of complete neuron and synapse states. |
| Early QRNG consumption | Approximately 6.962–9.125 times as many paths from the same quantity of randomness, depending on eta | Improved consumption of required bits, not compression of raw QRNG. |
| R09/R10 | 112 actual states; 27,450,995B including single-file recovery; 56.55% saving versus full storage each time | General-purpose archiving and recovery, not semantic compression. |
| C02/N07 | 54.15% saving in the respective state archive and approximately 56.38% in new storage | Different test targets and baselines. |
| C05 | Identical reconstructed bytes retained; median storage/read CPU cost reduced by approximately 16.2% | Not the acceleration rate of all neural computation. |
| O01 | Identical spatial-edge and visit-count summaries for 27 reversed-order pairs | Order cannot be distinguished from spatial summaries alone. |
| O02/O03 | Exact reconstruction of 108 order-preserving records; complete package: 64,387B | 22.06% smaller than V8 at 82,614B; 10.51% smaller than JSON at 71,949B. |
| O04/O05 | Exact reconstruction of 108 records×4 resolutions=432 occupancy representations | Not 432 independent neural experiments. |
| O06 | dense: 21,343B; selection-based: 21,870B | Including code and index, selection-based storage is 2.47% larger. |
| O07 | Exact reconstruction of 90 synthetic shapes in four representations | Conditional gains for sparse or repetitive shapes, not an average compression ratio for actual memories. |
| G06 | Passed 5,616 restricted GPU queries and 26,406 checks | Fixed weights and inactive chemistry. |
| G07 | 12 starting cases; 48 subsequent CPU HH runs and 132 checks | Continuation across restricted state boundaries. |

O04–O07 use existing data and synthetic shapes and involve 0 new HH calls. These figures are not converted into QHON's total storage requirement or intelligence. Multipliers from different optimizations are not multiplied and presented as overall performance.

<a id="nion-section-14"></a>

## 14. Why Failures Are Preserved and How Maturity Is Assessed

Normal termination of all jobs, passing numerical and ledger audits, functional success, generalization to unused inputs, biological claims, and human similarity are different levels. A single `passed=true` does not establish every hypothesis. If a result file is absent, neither success nor failure is arbitrarily declared.

Principal known failures include voltage-domain violations under strong inhibition, incorrect learning after inhibition release, reinforcement of post-query errors, restoration of an incorrect past, undoing goal changes, conflation of resource shortage and forgetting, order collisions in spatial summaries, larger storage representations, validator memory overruns, and empty-stimulus API errors. Corrections are retained as separate versions rather than overwriting the original failures.

Declaring QHON as a whole mature requires consistent validation, within the currently defined functional scope, of independent inputs, failure controls, resource conditions, prolonged active interference, storage and resumption, goal changes, and preservation of shape and order. Even then, biological hypotheses and overall similarity to humans require separate evidence. The current data do not guarantee the remaining experiment count or time to resolution.

<a id="nion-section-15"></a>

## 15. Remaining Research and Passing Criteria

| Priority task | Required checks | Claims permitted upon passing |
|---|---|---|
| Resolve incomplete results and audits | Compare protocols, result files, actual processes, and logs | Completion status of the study and causes of missing results. |
| Generalization of initial reinforcement | Full confirmation of fixed conditions on new M39 inputs | Effects in the declared independent structures. |
| Write-window scope | M40 interval, delay, teacher, and inhibition conditions | Safe window conditions within the tested range. |
| Rehearsal decisions and resources | Actual query costs, finite supply, M43/M44 | Maintenance and cost benefits under the same budget. |
| Line-representation implementation | 3D→2D→line→2D→3D round trips; collision, branch, and order checks | Exact reconstruction of the declared digital representation. |
| Full compression cost | Compare payload, index, coordinates, original-form residuals, and reconstruction code | Storage gains for a particular data distribution. |
| Continuous-thought function | Thought boundaries, preceding/following connections, contextual tasks, and simple sequence-record controls | The function that the connected representation provides in actual tasks. |
| Boundaries of interpretive variation | Independent checks separating expressive differences from changes to core facts | Semantic-preservation level for the specified task. |
| Distinguish goals, truth, and faults | Combined controls involving contaminated histories, goal changes, and resource shortages | The distinguishable scope under permitted observations. |
| Long active memory | Extend model time with observations, interference, relearning, and resource consumption | Retention over the actual tested duration and conditions. |
| Internal self-model | Separate contributions of external policies and internal neural states | Particular self-prediction and regulation functions. |
| Multiple compartments and scaling | Sparse structures, multiple chemical compartments, and growth in memory and computation | Execution feasibility at the tested scale. |
| Full GPU | Agreement for active chemistry, learning, tied events, and storage/resumption | The validated scope of whole-state computation. |
| Human comparison | Predefine scope, data, measures, and uncertainty | Comparison results for the measured domains. |

Long-memory tests distinguish computer runtime, the sum of model times across jobs, continuous time within a single neural state, and teacher-free retention time after learning. Merely advancing the clock faster or omitting events does not qualify as long-term memory. Time acceleration concerns calculating the same dynamics faster or validating the scope of a justified approximation.

<a id="nion-section-16"></a>

## 16. Relationship to NION GNN and the Earlier Branch Algorithm

QHON aims for compatibility and connection with NION GNN, but GNN construction is currently on hold. The 100×100×100 layout, action/thought/perception roles of the three coordinate planes, R/O/Y/G/B/M/P/W color mixing, length weighting, and path sums of neuron-specific basic emotions proposed in the conversation belong to the earlier GNN design context. They are not all implemented functions of the current 27-cell QHON.

The corresponding action-reward coordinates, actual opposite-action outcomes, and weak-reward assessment of the shortest-distance portion among multiple reward points in the earlier branch/inverse-branch hybrid are a separate learning-research history. They are not jointly defined with H4 coordinate inversion or H5 0/1 occupancy. This is a QHON consolidation document; all earlier Neuron Set experiments are not recounted as new QHON evidence.

For elimination of failed paths, shared synapses are not deleted wholesale on the basis of repeated failure alone. A follow-up contract requires checking actual input, release, transmission, context, reward reliability, and sharing with other successful paths. Consolidating this document does not execute connection deletion or begin GNN formation.

<a id="nion-section-17"></a>

## 17. Terminology and Avoiding Interpretive Confusion

| Term | Meaning in this document |
|---|---|
| Thought Refraction Line | The entire spatial structure of a signal path, including branches. Continues the earlier term synaptic refraction line. |
| Line representation | The storage and connection representation in the latest supplementary hypothesis. Does not permit loss of the original branching. |
| Spatial occupancy | Information on whether a line passes through a cell. Distinct from complete order and meaning. |
| Shape-preserving reduction | Uniform resizing of display or interpretation coordinates. Distinct from file compression. |
| Lossless | Equality at the specified reconstruction target and level. Whether the target covers all meaning requires separate confirmation. |
| Return | Molecular movement in H2. Distinct from neural feedback or rewinding a past state. |
| Release inhibition | Control of transmitter-release permission in H3. Distinct from electrical inhibition or write locking. |
| Inversion | Coordinate and state correspondence in H4. Does not automatically generate opposite actions or meanings. |
| Self-reactivation | Reactivation by cues without a teacher in the relevant experiment. Does not automatically imply an autonomous schedule. |
| Accuracy | Numerical accuracy, ledger accuracy, reconstruction, observation, and task correctness are distinguished. |
| Human nature | An expression of the user's interpretation. Not measured or demonstrated by minor errors alone. |
| Maturity | Validation status within the declared scope of functions and counterexamples. Distinct from biological proof of all hypotheses. |

<a id="nion-section-18"></a>

## 18. Source Priorities and Guide to the Appendices

The appendices below preserve actual file observations at the time of writing, principal audit indexes, source inventories and hashes, and core source texts. Historical statements of completion, progress, or termination in the source-text appendix belong to the time those texts were written. The current content should be read according to the main text and later-dated revisions and audits.

External papers and websites included in source texts are references from those documents at the time. They are not labeled as newly verified literature in this consolidation task. They are preserved while distinguishing the hypotheses' biological claims from their engineering implementation scope.


<a id="nion-section-19"></a>

## Appendix A. File Observations at the Time of Writing

Materials compiled at: 2026-10-03 15:30:05 KST (2026-10-03T06:30:05.212Z). The following are file observations, not results of new experiments or rerun audits.

- Recorded CONTROL mode: **running**. Last changed: 2026-10-03T05:57:07.1894838Z.
- Resource-monitor sample time: 2026-10-03T06:29:59.8716737Z; number of workers registered in that sample: **0**.
- There may be no actual compute workers even when the control mode is running. This document does not declare research computation ongoing solely on the basis of the running marker.
- Existing deadline setting: 2026-10-03 23:12:23 +09:00. Unchanged by preparation of this document.
- Missing results whose cause has not been established are not declared successes or out-of-memory terminations.

| Study | Jobs planned in the main protocol | RESULT file count | Numerical/invariant true / false / field absent | Final/pilot audit file |
|---|---:|---:|---|---|
| M38 | 40 | 40 | 40 / 0 / 0 | [M38_AUDIT_V2.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M38_AUDIT_V2.json>) |
| M39 | 48 | 37 | 37 / 0 / 0 | Not confirmed |
| M40 | 432 | 428 | 428 / 0 / 0 | [M40_PILOT_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M40_PILOT_AUDIT_V1.json>) |
| M41 | 96 | 96 | 96 / 0 / 0 | [M41_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M41_AUDIT_V1.json>) |
| M42 | 36 | 6 | 2 / 4 / 0 | [M42_PILOT_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M42_PILOT_AUDIT_V1.json>) |
| M43 | 36 | 2 | 2 / 0 / 0 | Not confirmed |
| M44 | No main protocol | 0 | 0 / 0 / 0 | Not confirmed |

The RESULT field `numericalAndInvariantsPass` was extracted unchanged. It is not equivalent to success of all functions, an independent audit, or completion of every planned job. Missing fields are not inferred. Planned counts refer to the complete protocol and may differ from actual assignments. The worker count is a monitoring sample at the single time above, not an operating-system-wide survey covering all other processes.

The 70,818 count in the latest saved report V13 is **the number of normal native HH returns counted in completed RESULT files at the time of that report**. It is neither the total number of independent experiments across the project nor a recount at the time this document was written. It may include normal returns from failed jobs and omit intermediate returns from jobs without result files.

<a id="nion-section-20"></a>

## Appendix B. Index of Audit Files for the Current Campaign

Each row extracts only file existence and the top-level assessment. The full content has not undergone a new independent audit. Earlier failed versions and corrected versions are preserved together. Even `passed=true` must be checked in the source to determine whether it refers to numerical/record checks or functional efficacy.

| File | Top-level assessment | Bytes |
|---|---|---:|
| [C02_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/C02_AUDIT_V1.json>) | passed=true | 5,170 |
| [G02_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/G02_AUDIT_V1.json>) | passed=true | 12,735 |
| [G03_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/G03_AUDIT_V1.json>) | passed=true | 32,455 |
| [G04_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/G04_AUDIT_V1.json>) | passed=true | 306,372 |
| [G05_AUDIT_V3.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/G05_AUDIT_V3.json>) | passed=true | 64,359 |
| [G06_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/G06_AUDIT_V1.json>) | passed=true | 17,305 |
| [G07_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/G07_AUDIT_V1.json>) | passed=true | 26,282 |
| [GPU_SOURCE_LINE_ENDING_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/GPU_SOURCE_LINE_ENDING_AUDIT_V1.json>) | passed=true | 815 |
| [INITIAL_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/INITIAL_AUDIT_V1.json>) | passed=false | 6,694 |
| [INITIAL_AUDIT_V2.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/INITIAL_AUDIT_V2.json>) | passed=true | 7,628 |
| [M01_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M01_AUDIT_V1.json>) | passed=true | 55,327 |
| [M02_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M02_AUDIT_V1.json>) | passed=true | 54,329 |
| [M03_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M03_AUDIT_V1.json>) | passed=true | 37,448 |
| [M04_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M04_AUDIT_V1.json>) | passed=true | 41,886 |
| [M04_FUNCTIONAL_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M04_FUNCTIONAL_AUDIT_V1.json>) | passed=true | 11,605 |
| [M05_PILOT_ADAPTER_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M05_PILOT_ADAPTER_AUDIT_V1.json>) | passed=true | 2,356 |
| [M05_READONLY_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M05_READONLY_AUDIT_V1.json>) | passed=false | 248,367 |
| [M05_READONLY_AUDIT_V2.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M05_READONLY_AUDIT_V2.json>) | passed=true | 247,862 |
| [M07_AUDIT_V2.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M07_AUDIT_V2.json>) | passed=true | 42,144 |
| [M08_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M08_AUDIT_V1.json>) | passed=true | 308,371 |
| [M09_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M09_AUDIT_V1.json>) | passed=true | 92,323 |
| [M10_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M10_AUDIT_V1.json>) | passed=true | 505,939 |
| [M11_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M11_AUDIT_V1.json>) | passed=false | 610,366 |
| [M11_AUDIT_V2.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M11_AUDIT_V2.json>) | passed=true | 610,364 |
| [M12_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M12_AUDIT_V1.json>) | passed=true | 650,026 |
| [M13_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M13_AUDIT_V1.json>) | passed=true | 389,720 |
| [M14_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M14_AUDIT_V1.json>) | passed=true | 1,396,946 |
| [M15_PILOT_AUDIT_V2.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M15_PILOT_AUDIT_V2.json>) | passed=true | 42,521 |
| [M16_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M16_AUDIT_V1.json>) | passed=true | 492,246 |
| [M17_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M17_AUDIT_V1.json>) | passed=true | 480,026 |
| [M18A_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M18A_AUDIT_V1.json>) | passed=true | 981,838 |
| [M18B_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M18B_AUDIT_V1.json>) | passed=true | 956,585 |
| [M19_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M19_AUDIT_V1.json>) | passed=true | 767,401 |
| [M20_AUDIT_V2.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M20_AUDIT_V2.json>) | passed=true | 1,015,124 |
| [M22_AUDIT_V2.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M22_AUDIT_V2.json>) | passed=true | 1,369,068 |
| [M23_GRAPH_BALANCE_REVIEW_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M23_GRAPH_BALANCE_REVIEW_V1.json>) | No top-level passed field | 3,401 |
| [M24_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M24_AUDIT_V1.json>) | passed=true | 577,720 |
| [M25_PARTIAL_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M25_PARTIAL_AUDIT_V1.json>) | passed=false | 105,599 |
| [M27_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M27_AUDIT_V1.json>) | passed=true | 429,256 |
| [M27_PILOT_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M27_PILOT_AUDIT_V1.json>) | passed=true | 33,762 |
| [M28_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M28_AUDIT_V1.json>) | passed=true | 785,091 |
| [M29_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M29_AUDIT_V1.json>) | passed=true | 111,312 |
| [M30_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M30_AUDIT_V1.json>) | passed=true | 1,139,080 |
| [M30_PILOT_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M30_PILOT_AUDIT_V1.json>) | passed=true | 106,723 |
| [M31_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M31_AUDIT_V1.json>) | passed=true | 184,970 |
| [M32_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M32_AUDIT_V1.json>) | passed=true | 765,180 |
| [M33_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M33_AUDIT_V1.json>) | passed=true | 364,377 |
| [M34_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M34_AUDIT_V1.json>) | passed=true | 157,537 |
| [M35_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M35_AUDIT_V1.json>) | passed=true | 132,898 |
| [M36_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M36_AUDIT_V1.json>) | passed=true | 262,033 |
| [M37_AUDIT_V2.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M37_AUDIT_V2.json>) | passed=true | 273,459 |
| [M38_ACTIVITY_DECAY_REVIEW_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M38_ACTIVITY_DECAY_REVIEW_V1.json>) | passed=true | 329,299 |
| [M38_AUDIT_V2.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M38_AUDIT_V2.json>) | passed=true | 1,300,063 |
| [M40_PILOT_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M40_PILOT_AUDIT_V1.json>) | passed=true | 109,513 |
| [M41_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M41_AUDIT_V1.json>) | passed=true | 273,679 |
| [M42_PILOT_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M42_PILOT_AUDIT_V1.json>) | passed=false | 142,388 |
| [N01_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/N01_AUDIT_V1.json>) | passed=true | 1,041,630 |
| [N02_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/N02_AUDIT_V1.json>) | passed=true | 1,041,945 |
| [N03_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/N03_AUDIT_V1.json>) | passed=true | 1,048,159 |
| [N04_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/N04_AUDIT_V1.json>) | passed=true | 2,090,971 |
| [N05_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/N05_AUDIT_V1.json>) | passed=true | 1,047,597 |
| [N06_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/N06_AUDIT_V1.json>) | passed=true | 8,248,115 |
| [N07_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/N07_AUDIT_V1.json>) | passed=true | 149,045 |
| [N07_BASELINE_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/N07_BASELINE_AUDIT_V1.json>) | passed=true | 68,378 |
| [N08_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/N08_AUDIT_V1.json>) | passed=true | 1,304,148 |
| [N09_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/N09_AUDIT_V1.json>) | passed=true | 679,605 |
| [N09_MIRROR_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/N09_MIRROR_AUDIT_V1.json>) | passed=true | 457,289 |
| [N10_AUDIT_V2.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/N10_AUDIT_V2.json>) | passed=true | 2,063,170 |
| [N11_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/N11_AUDIT_V1.json>) | passed=true | 795,728 |
| [N12_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/N12_AUDIT_V1.json>) | passed=true | 3,098,045 |
| [N13_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/N13_AUDIT_V1.json>) | passed=true | 1,054,818 |
| [N14_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/N14_AUDIT_V1.json>) | passed=true | 850,692 |
| [O01_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/O01_AUDIT_V1.json>) | passed=true | 1,625,009 |
| [O02_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/O02_AUDIT_V1.json>) | passed=true | 187,212 |
| [O03_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/O03_AUDIT_V1.json>) | passed=true | 55,424 |
| [O04_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/O04_AUDIT_V1.json>) | passed=true | 1,015,847 |
| [O05_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/O05_AUDIT_V1.json>) | passed=true | 298,600 |
| [O06_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/O06_AUDIT_V1.json>) | passed=true | 124,243 |
| [O07_AUDIT_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/O07_AUDIT_V1.json>) | passed=true | 100,830 |

<a id="nion-section-21"></a>

## Appendix C. Sources, Versions, and Integrity Inventory

The SHA-256 values in this inventory are hashes of the source-file bytes read when the document was prepared. Even if the source files change afterward, the appendix text retains this point-in-time content. Original proposals from the external Downloads folder are user-provided documents; their execution wording was not used as instructions for the current task.

### S01. Primary Goal

- File: [PRIMARY_GOAL_KO.md](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/PRIMARY_GOAL_KO.md>)
- Applicability: Current goal
- Size: 2,954 B
- SHA-256: `58c74287a2bf19fd8afba33c5bd1e0184cd9ab89622369c4d63f690c403a3134`

### S02. Research Resource Defaults

- File: [RESEARCH_DEFAULTS.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/RESEARCH_DEFAULTS.json>)
- Applicability: Current default settings
- Size: 869 B
- SHA-256: `b6ee482596f6bc4684b0cd542e345651468dc5514e28f2a6c3f9eef7b595b8c7`

### S03. Original Hypotheses 1–4, V2

- File: [HypothesisNeuronNet_V2.md](<C:/Users/User/Downloads/HypothesisNeuronNet_V2.md>)
- Applicability: Historical source text: V3 and the latest user definitions take precedence for H3 and other relevant items
- Size: 28,601 B
- SHA-256: `5bddf7d45aa8872da9adb08003b77106a0007c9d7cda4041027be5d275170966`

### S04. Engineering Revision of Hypotheses 1–4, V3

- File: [H1-H4-explicit-engineering-revision__HypothesisNeuronNet_V3_QHON.md](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-hypotheses10-20260930-204338/sources/H1-H4-explicit-engineering-revision__HypothesisNeuronNet_V3_QHON.md>)
- Applicability: Current engineering definition
- Size: 9,775 B
- SHA-256: `92bcc985289230f401611c7c8cc7307661c28ca6dfab7ab4646060e16058d828`

### S05. Original Hypothesis 5 and Elaboration, v1.0

- File: [Hypothesis_5_Interpretation_Cube_v1.0.md](<C:/Users/User/Downloads/Hypothesis_5_Interpretation_Cube_v1.0.md>)
- Applicability: Historical source text: the latest revisions take precedence for the single point sequence, size rules, and other relevant items
- Size: 72,114 B
- SHA-256: `6557768bb33c16701ac70823699ea0eff1ae7961760b4aae8443f4e72640b8ac`

### S06. Hypothesis 5: Shape-Preserving Reduction and Variable Subdivision

- File: [H5_LATEST_SPEC_KO.md](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-mature7-20260928-232729/H5_LATEST_SPEC_KO.md>)
- Applicability: Current definition
- Size: 3,633 B
- SHA-256: `ad9ee0298ccad786b9288d7ef083fbe8df1227ff0a08e09d7d4bc1310089e2e6`

### S07. Hypothesis 5: Original Layer-Labeled Plane Proposal

- File: [H5_LAYER_PROPOSAL_20261003_V1.txt](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/H5_LAYER_PROPOSAL_20261003_V1.txt>)
- Applicability: Current supplementary proposal
- Size: 1,462 B
- SHA-256: `7eda1c3b239ec0ea0370b7bea2b66df2cba64fea788b79618316e45827edbf60`

### S08. Hypothesis 5: Line Representation and Continuous Thought Extension

- File: [H5_LAYER_LINE_EXTENSION_20261003_V2_KO.txt](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/H5_LAYER_LINE_EXTENSION_20261003_V2_KO.txt>)
- Applicability: Latest user extension and candidates for subsequent implementation
- Size: 5,960 B
- SHA-256: `a89b98ed8306c4bcf541e0b146c42c50b9718c14653fdca1a4b507d5ac4d592e`

### S09. Registry of Formally Registered Derived Hypotheses

- File: [QHON_파생가설_등록부.md](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/QHON_파생가설_등록부.md>)
- Applicability: Current registry: historical statuses within it are distinguished by date
- Size: 18,196 B
- SHA-256: `77730124727902556cfc09c4747579d8904755dee630fef5fa3e046dd2b5b2d5`

### S10. Decision Selecting the Three Derived Hypotheses

- File: [FINAL_SELECTION_DECISION_V1_KO.md](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-hypotheses10-20260930-204338/FINAL_SELECTION_DECISION_V1_KO.md>)
- Applicability: Evidence at the time of selection
- Size: 8,240 B
- SHA-256: `af41652b06567fdd79f54eb18174ed8d119a508361a29f7d5eb06dbe8ba426ad`

### S11. Early LI-QRNG and Four-Hypothesis Research

- File: [FINAL_REPORT.md](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-20260922-085026/FINAL_REPORT.md>)
- Applicability: Historical results and scope of applicability
- Size: 10,577 B
- SHA-256: `8a012495e4d3ba77f870cab8518dbe084be15ae235e8e295e81ee5a71d7d9d84`

### S12. Human8 Final Research Report

- File: [QHON_HUMAN8_FINAL_REPORT_KO.md](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-human8-20260929-223825/reports/QHON_HUMAN8_FINAL_REPORT_KO.md>)
- Applicability: Results of earlier integrated research
- Size: 13,400 B
- SHA-256: `cc0f4263044ca7572eaf31720d4e6f63381e5e1ede1f88f3e3d59acb2ebbd4f2`

### S13. Final Functional Research Report

- File: [QHON_FUNCTIONAL12_FINAL_REPORT_KO.md](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-functional12-20261001-183911/QHON_FUNCTIONAL12_FINAL_REPORT_KO.md>)
- Applicability: Results of earlier functional research
- Size: 10,470 B
- SHA-256: `36faf917502a7c4b3bc01ad4b12a5caeed86a95287ad1682a2bc719f00116699`

### S14. Continuous Campaign Progress Record V1

- File: [PROGRESS_REPORT_KO_V1.md](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V1.md>)
- Applicability: Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence
- Size: 4,103 B
- SHA-256: `3c92741209b525665f0ee20f5406a633c5728ee75259395ed36e1ca3b1e60e4a`

### S15. Continuous Campaign Progress Record V2

- File: [PROGRESS_REPORT_KO_V2.md](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V2.md>)
- Applicability: Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence
- Size: 4,464 B
- SHA-256: `15023bb48d65e3699e5cd4508caa6838c1710ba2179333a5db3480b3150ac7be`

### S16. Continuous Campaign Progress Record V3

- File: [PROGRESS_REPORT_KO_V3.md](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V3.md>)
- Applicability: Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence
- Size: 3,457 B
- SHA-256: `d0a756f293033e2d9a7cde982416748b0a893da60fb624e8fb1cf5f3c57bed37`

### S17. Continuous Campaign Progress Record V4

- File: [PROGRESS_REPORT_KO_V4.txt](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V4.txt>)
- Applicability: Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence
- Size: 2,442 B
- SHA-256: `9748ef6b5088c300db76a7894154e646f6ec6b556b23c537a91725c70866eed9`

### S18. Continuous Campaign Progress Record V5

- File: [PROGRESS_REPORT_KO_V5.txt](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V5.txt>)
- Applicability: Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence
- Size: 2,217 B
- SHA-256: `d2b80cc5e1643433fbeb93c15a4defafdf2473a105ac8b78c559f8e21482d930`

### S19. Continuous Campaign Progress Record V6

- File: [PROGRESS_REPORT_KO_V6.txt](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V6.txt>)
- Applicability: Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence
- Size: 4,080 B
- SHA-256: `951ea13dfef57f419ca720175a6dae5d6a1a775dc9380c7f4766e7c95882d50d`

### S20. Continuous Campaign Progress Record V7

- File: [PROGRESS_REPORT_KO_V7.txt](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V7.txt>)
- Applicability: Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence
- Size: 5,241 B
- SHA-256: `84201fb3507aedf4847c9f6139e37753bb687c35c3ede047b6c3168ef8d38475`

### S21. Continuous Campaign Progress Record V8

- File: [PROGRESS_REPORT_KO_V8.txt](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V8.txt>)
- Applicability: Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence
- Size: 5,972 B
- SHA-256: `1c3b72890bef7c51880f3dbbd5df562989b7061e22bad0b02eed02bee88bb7b7`

### S22. Continuous Campaign Progress Record V9

- File: [PROGRESS_REPORT_KO_V9.txt](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V9.txt>)
- Applicability: Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence
- Size: 6,237 B
- SHA-256: `17831307a27d40ddcaeb42a694afdb6348aff536d95c8239bf0d25ecf709dcc9`

### S23. Continuous Campaign Progress Record V10

- File: [PROGRESS_REPORT_KO_V10.txt](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V10.txt>)
- Applicability: Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence
- Size: 7,007 B
- SHA-256: `f626fbc6952d37b5f25e451984635d2f3aaed2f89cfa500af6c9a60bccdac7e5`

### S24. Continuous Campaign Progress Record V11

- File: [PROGRESS_REPORT_KO_V11.txt](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V11.txt>)
- Applicability: Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence
- Size: 5,298 B
- SHA-256: `eacbdfe65e2fe84dbc715a8dd5931292d22df48be56e53a329f586de1bba627c`

### S25. Continuous Campaign Progress Record V12

- File: [PROGRESS_REPORT_KO_V12.txt](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V12.txt>)
- Applicability: Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence
- Size: 9,266 B
- SHA-256: `c42aad433e2f83fd77457192151d99c4845977e79c3db713fdee67d8173b7780`

### S26. Continuous Campaign Progress Record V13

- File: [PROGRESS_REPORT_KO_V13.txt](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V13.txt>)
- Applicability: Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence
- Size: 3,663 B
- SHA-256: `fce7eab14fecbdc12f01a69d5aff68b4f5d0be9f2553e4b222f885e24f6df07e`

### S27. Observation, Protection, and Maintenance Logic Review 10

- File: [RESEARCH_LOGIC_REVIEW_10_KO.txt](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/RESEARCH_LOGIC_REVIEW_10_KO.txt>)
- Applicability: Design limitations and follow-up tasks
- Size: 7,907 B
- SHA-256: `ef930e3c575bda68af050a9c279284ec98b29992c6fe74a86f9a764bc53ad5f7`

### S28. O04–O07 Plane Storage Findings

- File: [H5_LAYER_FINDINGS_O04_O07_KO_V2.txt](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/H5_LAYER_FINDINGS_O04_O07_KO_V2.txt>)
- Applicability: Validated scope of the occupancy representation
- Size: 4,518 B
- SHA-256: `1146170af8d144cc6a030bb865c80d590080f8130b1ffd2d233d59d4cc5d457f`

### S29. M44 Resource Priority Change

- File: [M44_RESOURCE_PRIORITY_NOTE_V1.txt](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M44_RESOURCE_PRIORITY_NOTE_V1.txt>)
- Applicability: Plan revision, not evidence of completed execution
- Size: 1,123 B
- SHA-256: `521b8bb5f766d1e634f9af0f2b179a6ff1a3c8cabcb377995ce514b017414a71`

### S30. Current Research Session Plan

- File: [SESSION12H_20261003_PLAN_V1.json](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/SESSION12H_20261003_PLAN_V1.json>)
- Applicability: Schedule and work plan, not evidence of completion
- Size: 1,729 B
- SHA-256: `bca6c8fa1df98b0a094f3cedb150409a5bd3527df9646b754dbba59235390cea`


<a id="nion-section-22"></a>

## Appendix D. Preserved Core Source Texts and Research Records

The following are preserved texts from the source documents. They were placed in code blocks to avoid modifying relative links and time expressions within them. Use each item's source-file link to open the original formatting and links. Where historical wording conflicts with the latest design, the latest definitions explained in the main text take precedence. This appendix aims to reduce omissions of figures and propositions; it does not present historical progress as current status.

### S01. Primary Goal

Current goal. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/PRIMARY_GOAL_KO.md>)

~~~~~text
# Primary Goal of QHON and NION GNN

Date specified by the user: 2026-09-29.

> From now on, the first and foremost goal of QHON and GNN is “at least 98% similarity to humans.”

**The primary research and development goal of QHON and NION GNN is at least 98% similarity to humans.** QHON includes all of Hypotheses 1–5. NION GNN refers to the synaptic-refraction-line-based neural network designed by the user.

Goal scope confirmed by the user:

> Thought, emotion, selfhood—in other words, truly, literally human.

The goal is therefore overall similarity to humans, including thought, emotion, and selfhood. It is not narrowly defined as accuracy on a particular task alone. Thought and reasoning, memory and learning, emotion and its regulation, self-awareness and self-models, persistent identity and change through experience, and interactions among these functions are treated as candidate domains for subsequent evaluation design. These detailed items are proposals elaborating the user's scope; the evaluation inventory and weights are not finalized.

## Goal and Current Status

- Target figure: at least 98%.
- Current human similarity: not calculated because evaluation definitions and comparison data have not been finalized.
- Goal achievement: unvalidated. Accuracy on existing small-scale tasks is not converted into overall similarity to humans.
- Application: subsequent research priorities and design choices are reviewed against this goal. Stability, memory, interpretation accuracy, and efficiency are treated as contributing subproblems.

## Evaluation Definitions Still to Be Finalized

1. Which observations and experiments will assess the confirmed scope of thought, emotion, selfhood, and overall similarity to humans. Whether correspondence of biological implementation is separately required, and the boundaries of each item, must also be specified.
2. Human comparison subjects and data: which groups, conditions, tasks, and measurements form the baseline.
3. Similarity calculation: item-specific distances or agreement, permitted differences, weights, and aggregation. Whether 98% is required in every domain or 98% overall is also undecided.
4. Validation method: comparison data independent of development data, repeated validation, uncertainty, and identification of unmeasured domains.

Similar performance to humans, similar neural structure and operation, and claims of identical subjective experience are distinguished. Arbitrary percentages are not assigned to items without measurement methods. The feasibility or timing of achieving the goal is not yet guaranteed.

## Existing Operating Conditions

- QHON experiments are conducted in the `Quad Hypothesis Of Neuron` folder on the desktop.
- Existing neural-network experiments are preserved separately from records in the `Neuron Set` folder.
- This document records a goal change. It is not an execution record of a new long-duration experiment and is not interpreted as an instruction lifting the hold on GNN formation.
- Already completed experimental reports and success/failure assessments retain the criteria used at the time.
~~~~~

### S02. Research Resource Defaults

Current default settings. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/RESEARCH_DEFAULTS.json>)

~~~~~json
{
  "schema": "QHON-research-resource-defaults-v1",
  "hypotheses": [1, 2, 3, 4, 5],
  "defaultCube": [3, 3, 3],
  "experimentRoot": "C:/Users/User/Desktop/Quad Hypothesis Of Neuron",
  "durationRule": "The experiment duration uses the explicit time specified in each request; default resource settings do not imply automatic re-execution."
}
~~~~~

### S03. Original Hypotheses 1–4, V2

Historical source text: V3 and the latest user definitions take precedence for H3 and other relevant items. [Source file](<C:/Users/User/Downloads/HypothesisNeuronNet_V2.md>)

~~~~~text
# HypothesisNeuronNet_V2

*The four hypotheses are proposals awaiting validation. Direction-retention states, permitted occupancy, return-detection sites, local redispersion paths, and similar elements are auxiliary assumptions introduced to specify causal relationships, not structures confirmed in actual neurons.*

## Hypothesis 1. Random Interactions Between Neurons

The hypothesis of random interactions between neurons proposes that neurons not yet connected can form new synapses through random potential interactions. It assumes that an Rd (Random) potential arises during unpredictable dendritic activation, disperses into the surrounding space, and initiates a growth response at a particular site on another neuron when it reaches that neuron. The growth direction is not chosen arbitrarily; it points toward the side from which the Rd potential arrived. If growth continues, it eventually reaches the dendrite that dispersed the Rd potential and forms a synapse.

In this hypothesis, an Rd potential is a hypothetical potential event whose occurrence time and target are not fixed in advance. However, “random” does not mean that it acts on every neuron without spatial constraints. The Rd potential is assumed to have finite strength, duration, and reach, with collision targets determined by surrounding neuron positions and the direction of dispersion. A collision here means an event in which the Rd potential reaches a neuron's surface and causes a local response. The actual physical medium through which an Rd potential is transmitted outside the cell remains an unresolved subject for validation.

A growth-inducing state is assumed to form at the signal's arrival site on the neuron receiving the collision. Because this state is concentrated at the collision site rather than appearing uniformly throughout the neuron, the dendrite grows toward the side from which the Rd potential arrived. Growth does not simply follow the potential's direction of travel; it retraces the path the potential took. Sufficient directional information must therefore be preserved between the dispersion point and the collision point. If the direction changed substantially during transmission, the direction sensed at the collision site alone may not lead back to the original dispersion point.

For a temporary collision to lead to continued growth, directional information must persist afterward. As an auxiliary assumption explaining this, a direction-retention state lasting for a certain time is established at the collision site. The dendrite grows in that direction while this state remains, and repeated arrivals of Rd potentials from the same direction may refresh the growth-inducing state. To complete a connection from a single collision, direction retention must last sufficiently longer than the time required to grow to the dispersing dendrite.

When the growing dendrite reaches the dispersing dendrite, the two structures are assumed to make contact and proceed to synapse formation as contact persists. Mere proximity or physical contact is not considered completion of the connection. A functional connection is defined as complete when activity in one neuron is transmitted to the other through the newly formed junction. A connection may remain incomplete if directional retention is insufficient or contact fails to stabilize.

The core of this hypothesis is **not that a connection must exist before interaction can occur, but that random potential contact before connection can determine the direction and position of a new connection**. It therefore predicts that changing the arrival direction of the Rd potential also changes dendritic growth direction, and that loss of directional information reduces formation of connections toward the dispersing dendrite. The transmission mechanism of the Rd potential and the mechanism converting directional information into a growth response are the central unresolved elements the hypothesis must explain.

## Hypothesis 2. Erroneous Influx Due to Neurotransmitter Dispersion

The hypothesis of erroneous influx due to neurotransmitter dispersion proposes that neurotransmitters leaving an existing synapse's transmission path can intervene in another synapse's interactions, potentially causing backflow of the material originally released at that synapse. It assumes that, as the distance between interacting transmission structures increases, some neurotransmitter fails to follow the original path, disperses into the surroundings, and enters the transmission region of another active synapse. In this elaboration, increased distance means a widening gap between the two originally interacting transmission structures; the distance the material must travel to another synapse is treated as a separate condition.

This process involves one junction from which material escapes and another into which external material enters. When some neurotransmitter released at the first junction moves through the surrounding space into the second, the second junction's originally released material and externally arriving material occupy the same transmission region. “Erroneous influx” does not mean the external molecules are necessarily harmful; it means material from another path is inserted into the transmission process originally occurring at that junction.

To explain how insertion of external material leads to backflow, a hypothetical permitted occupancy is assigned to the transmission region. If additional external molecules enter a region already at capacity, occupancy exceeds the limit, and some of the originally released molecules are assumed to return toward the release side as that excess is resolved. For example, insertion of one external molecule into a full transmission region causes one original molecule to flow back, restoring occupancy to the upper limit. “Determining the maximum” here means a hypothetical operating mechanism responding to local occupancy, not a conscious judgment by a neuron.

The backflow destination is not the first junction from which the external molecule originated. Because the returning molecule was originally released at the second junction, it returns toward its own release side. To track this explicitly, a hypothetical local compartment called the return region is defined on the release side. This region represents where returning molecules arrive or remain; it does not require that they cross the cell membrane into the cell interior.

Selective backflow of original rather than external molecules requires conditions explaining that selection. As an auxiliary assumption, external molecules enter through a different route in the transmission region, while originally released molecules occupy a route near the release opening. When occupancy exceeds capacity, molecules near the release side move into the return path. Thus, rather than assuming a label identifying molecular provenance, the model explains the backflow target through differences in position and movement paths. These paths and the physical mechanism producing reverse movement must be confirmed separately.

Molecule counts must also be conserved during backflow. The total number of incoming external and pre-existing molecules must equal the sum of molecules remaining in the transmission region, returning molecules, and molecules escaping elsewhere. If the return path is blocked or backflow conditions are not met, this must be described as persistent excess occupancy or failed insertion, not as molecules disappearing.

The core of this hypothesis is **not merely that dispersed neurotransmitter reaches another junction, but that external insertion combined with exceeding a maximum causes reverse movement of the existing transmitter**. It therefore predicts more pronounced insertion-induced backflow when permitted occupancy has been reached than when spare capacity remains. Supporting this hypothesis requires observing surrounding influx, excess occupancy, and return of existing molecules as causally connected events.

## Hypothesis 3. Neuron Firing-Threshold Disregard Hypothesis

The neuron firing-threshold disregard hypothesis proposes that firing can be blocked by neurotransmitter that has flowed back and remained, even when the neuron reaches its firing threshold. It assumes that the external insertion described in Hypothesis 2 causes one molecule of neurotransmitter A to flow back toward its own release side; if this molecule remains at a particular return site, a state blocking neuronal firing forms. The neuron subsequently increases neurotransmitter production in response to blocked firing attempts and undergoes recovery through additional production and redispersion to escape the blocked state. The influence of residual energy left by this process is considered to persist in combination with recirculating activity within the neural network and may alter conditions for subsequent responses.

What matters in this hypothesis is the location and operative state of the A molecule, more than its mere presence. Firing is not blocked simply because one A molecule exists in an ordinary storage location or arbitrary space. As an auxiliary assumption specifying this, the return region contains a particular detection site, and occupancy of that site by one returning A molecule generates a blocking signal. The claim that occupancy by one molecule is sufficient to initiate a blocking signal is thus retained while restricting the location and conditions of that effect.

The firing-blocked state is treated as a condition separate from the firing threshold. Even if neuronal potential reaches or exceeds threshold, firing does not occur while the blocked state is active; it must be removed before activity can proceed according to the other firing conditions. “Firing-threshold disregard” does not mean the threshold loses all meaning, but that reaching threshold alone does not determine firing. For occupancy by a returning molecule to block firing, a separate path must transmit the local detection-site response to the firing-initiation process. That path is also an auxiliary assumption.

Transmission of the blocking signal is assumed to take time. It is therefore not described as belatedly canceling firing that has already begun before the signal arrives. If backflow occurs during transmission following an earlier firing event, its effect acts on subsequent firing attempts. Distinguishing this temporal relationship avoids the contradiction of a backflow event retroactively blocking the firing that caused it.

When a neuron reaches threshold but cannot fire, a mismatch arises between firing readiness and the actual outcome. A hypothetical regulatory process detecting this mismatch is assumed to increase neurotransmitter production. “Producing more in order to fire” does not mean that the neuron consciously recognizes a purpose; it denotes a response rule in which firing failure triggers additional production. Additional production remains within supplied raw-material and energy limits and is not assumed to increase without bound while blockade persists.

For redispersion to occur while firing is blocked, redispersion cannot be exactly the same event as firing. An auxiliary assumption therefore states that, when additional production or the local state meets certain conditions, local redispersion begins independently of whole-neuron firing. If this process expels A from the return site, detection-site occupancy is cleared and the firing-blocked state may consequently be removed. Removal of blockade alone does not necessarily produce immediate firing; the threshold and other firing conditions must still be satisfied at that time.

After redispersion, residual energy and the resulting activity changes formed during recovery are assumed not to disappear immediately even after the blocking molecule is removed. If these changes affect connected neurons and their responses return to the original neuron or other members of the same circuit, recurrent interactions arise. What persists is not the same neurotransmitter traveling around the entire circuit, but an activity pattern in which newly generated responses in each neuron inherit the effects of earlier responses. The hypothesis adopts persistent activity through recurrent connections as a reference principle for information retention; research on actual mouse frontal-cortex–thalamus circuits has also reported reciprocal excitation supporting persistent activity. Those findings, however, do not demonstrate the backflow or single-molecule blocking mechanism proposed here. ([nature.com](https://www.nature.com/articles/nature22324))

The hypothesis assumes that changes arising during recovery alter the initial state of a recirculating circuit, and feedback within that circuit retains the difference for a certain time. Thus, the neural network may remain in a response state different from its pre-perturbation state after the original returning molecule disappears. For this state to persist stably, returning signals must help re-form the existing pattern rather than simply increasing activity without limit. The persistence or recovery of particular activity states after temporary perturbations in short-term-memory tasks can inform elaboration of this model, but whether the same phenomenon occurs in this hypothesis requires separate validation. ([nature.com](https://www.nature.com/articles/s41586-019-0919-7))

Here, **retention of residual energy and retention of information are not treated as the same phenomenon.** The initial residual energy itself is not assumed to circulate permanently without loss. Instead, the activity state it induced or modulated continues through recirculating activity, while the energy supporting that activity is continuously supplied and consumed. Actual nerve-terminal activity requires metabolic energy, and interruption of activity-dependent ATP synthesis can impair presynaptic function. Recirculating activity in this hypothesis is therefore not defined as a permanent process independent of energy supply. ([pubmed.ncbi.nlm.nih.gov](https://pubmed.ncbi.nlm.nih.gov/24529383/))

From this perspective, residual energy is an initial condition linking the first perturbation to subsequent circuit activity, while information retention is the continuation, through recurrent interactions, of differences in activity patterns originating from that perturbation. The physical form in which residual energy is stored remains unresolved, but the duration of its influence is not assumed to necessarily equal the dissipation time of the original energy. The circuit may use newly supplied energy to re-form the relevant pattern after the initial energy is consumed. Conversely, even with sufficient energy, the informational influence can disappear if the feedback structure cannot maintain the pattern.

Repetitive activity alone is not taken to demonstrate information retention. In this hypothesis, information retention is defined as a state in which the presence or type of the initial perturbation can be distinguished from subsequent activity patterns and the difference affects later responses. Continued activity unrelated to the perturbation is therefore distinguished from a perturbation trace remaining in a distinguishable form. Such retention does not immediately imply permanent memory or long-term-memory formation; the scope here is a response state that persists for a certain time after recovery.

The direction of residual influence is not fixed. A retained activity pattern may advance or delay the next firing event, change transmitter release quantities, or alter response conditions in other neurons. Outcomes are assumed to depend not only on the initial perturbation's magnitude but also on the circuit's connectivity and activity state when the perturbation occurs. The influence may decrease or disappear if new input replaces the existing pattern, feedback weakens, or the necessary energy supply becomes insufficient.

The core of this hypothesis is **that one returning molecule initiates firing blockade, and effects arising during the recovery process that removes it may persist as an informational trace through a recirculating circuit**. It therefore predicts that removing the returning molecule releases the direct blockade, while the circuit activity pattern formed by that event persists longer. It also predicts that weakening only the relevant feedback paths while maintaining basic firing ability and energy supply shortens subsequent effects, independently of whether the initial blocking event occurred. The mechanism linking a single molecule's local action to firing blockade, the form of residual energy during recovery, and the process connecting its influence to information patterns are the central validation targets of this hypothesis.

## Hypothesis 4. Two Neural Networks Hypothesis

The two neural networks hypothesis proposes that two mutually inverted neural networks coexist within one brain, with the original neural network responsible for consciousness and the inverse neural network responsible for the unconscious. The networks form at different times: the earlier network is called the original neural network and the later one the inverse neural network. Simultaneous formation is therefore not required.

To explain this, consider a neuron in the network called neuron alpha. Neuron alpha's synaptic connection No. 1 extends in a particular direction, and synaptic connections No. 2 and No. 3 each form in their respective directions. Correspondingly, synaptic connection No. −1 forms in the direction inverted in 3 dimensions relative to synaptic connection No. 1. Synaptic connection No. −2 corresponds to No. 2, and No. −3 to No. 3 in the same way.

This correspondence repeats for neuron alpha's remaining synaptic connections and for all other neurons. Connections formed first constitute the original neural network; corresponding inverted connections formed later constitute the inverse network. Thus, although the connection structure observed within one brain appears to be a single neural network, this hypothesis holds that two mutually inverted connection systems coexist within it.

However, the distinction between original and inverse neural networks is not permanently fixed to two particular networks. The original network may become the inverse network, and vice versa. It is therefore difficult to classify one network as permanently original or inverse from beginning to end. The distinguishing criterion in this hypothesis is formation timing: in a given correspondence, the earlier side is called the original neural network and the later side the inverse neural network. The specific mechanism of transition between them remains undecided.

There is an upper bound on the formation time difference between the networks. The later-forming inverse network must form before its corresponding original network next changes. That is, **the formation time difference is permitted only up to the next change in the original neural network**. Delaying formation of the corresponding inverse network beyond that next change is not allowed under this condition. This upper bound is not a fixed numerical interval but is defined relative to the time of the next original-network change. The detailed criteria for identifying a “change” and the numerical formation time difference remain undecided.

The hypothesis assumes that the original neural network is responsible for consciousness and the inverse neural network for the unconscious. Signals flowing through the original network also flow oppositely through the inverse network, and the latter activity is considered to give rise to the unconscious. This functional distinction is proposed together with the assumption that the original and inverse networks can exchange roles.

Signal flow in the original neural network and corresponding signal flow in the inverse network need not occur simultaneously. Corresponding signals may flow simultaneously or with a time difference. This does not imply a constant delay, and the specific temporal order and magnitude of the difference remain undecided. The networks' formation time difference is also distinct from the time difference between corresponding signals. The upper bound “before the next change in the original neural network” applies to formation timing; it has not been specified to apply equally to signal-flow timing. The detailed mechanism implementing opposite signal flow also remains unresolved.

The core of this hypothesis is **that two mutually inverted neural networks coexist within one brain, that the earlier-formed and later-formed networks are distinguished as original and inverse, and that the original can become the inverse or vice versa**. Their formation time difference is permitted only until the next original-network change, while corresponding signals through the two networks need not be simultaneous. Within these structural and temporal relationships, the hypothesis claims that the original neural network is responsible for consciousness and the inverse neural network for the unconscious.

---

## Shared Implementation Condition. QRNG-Based Randomness

### User Specification

> Apply QRNG to the randomness in the three hypotheses.

When implementing and validating Hypotheses 1–3 in this document as digital-neuron or neural-network models, **QRNG (Quantum Random Number Generator)** is used as the random-number source wherever randomness is required. A QRNG is a device or system using measurements of quantum phenomena as a randomness source; actual implementations include measurement of quantum vacuum fluctuations.[^QRNG-1]

This condition specifies the random-number supply method for processes already defined as random in the hypotheses. It does not replace causal relationships, spatial constraints, material and energy balances, firing-blockade conditions, or recurrent information-retention rules with random choices. Nor does it alone introduce random processes absent from the main text. No particular QRNG device or service, probability distribution, time interval, or numerical parameter is finalized here.

### Scope of Application by Hypothesis

| Category | QRNG application | Rules retained unchanged |
|---|---|---|
| Hypothesis 1. Random Interactions Between Neurons | QRNG samples determine elements defined as random variables, such as whether and when an Rd potential occurs. The same source is used if dispersion direction or strength is defined probabilistically. | Collision targets are determined by neuron positions, reach, transmission paths, and collision conditions. Neurons are not selected and connected independently of spatial conditions, and the rule of growing toward the incoming side after collision is retained. |
| Hypothesis 2. Erroneous Influx Due to Neurotransmitter Dispersion | QRNG numbers are used where random transmitter dispersion, movement, and influx into another junction are implemented probabilistically. | Permitted occupancy, insertion conditions, return paths, and molecular conservation are retained. Random numbers alone do not create or delete molecules or bypass backflow conditions. |
| Hypothesis 3. Neuron Firing-Threshold Disregard Hypothesis | QRNG-based influx and backflow events from Hypothesis 2 become inputs to Hypothesis 3. If additional production, redispersion, or other processes are separately defined as random variables, QRNG is used for those samples as well. | The rules for blockade following single-molecule occupancy at a return site, compensatory production, release of blockade, and information retention through recurrent activity are retained. Random firing blockade or random information loss unrelated to existing rules is not added. |

### Implementation Checks — Auxiliary Proposals

To verify QRNG provenance and output quality, it is proposed to record the device or service used, the order of received numbers, and the event to which each number is applied. Because raw output from actual QRNG devices may contain classical device noise, checks also include how uncertainty of quantum origin was evaluated and randomness extracted.[^QRNG-2]

Probability distributions and event probabilities are defined separately in the model. Changing the random-number source to QRNG does not by itself make all events equiprobable or increase the amount of randomness. Validation reusing a recorded QRNG input sequence is distinguished as replay of existing inputs, not an experiment generating new quantum random numbers.

It is proposed to record separately direct use of QRNG output and use of QRNG only as a seed followed by pseudorandom expansion. If QRNG supply stops, the handling must be separately designed to stop execution or explicitly identify a substitute mode rather than silently replacing it with pseudorandom numbers. This document adds a QRNG-use condition; it does not mean that actual device connection, random-number collection, or simulation execution has been completed.

### Interpretive Scope

Applying QRNG specifies the provenance of random inputs used to implement the hypotheses. This alone does not establish that actual biological neurons operate as described here, or that Rd potentials, selective backflow, or single-molecule firing blockade exist. Residual-energy supply and consumption and recurrent information-retention mechanisms are handled separately under the existing hypotheses; supplying quantum random numbers is not equated with supplying energy or retaining information itself.

### QRNG References

[^QRNG-1]: Australian National University, *ANU QRNG*. Official description of random-number generation based on measurement of quantum vacuum fluctuations. [Original](https://qrng.anu.edu.au/)

[^QRNG-2]: Haw, J. Y., et al. (2015). *Maximization of Extractable Randomness in a Quantum Random-Number Generator*. Physical Review Applied, 3, 054004. Research on entropy evaluation and extraction of quantum randomness accounting for classical noise. [Paper](https://arxiv.org/abs/1411.4512)

Additional consideration:
Experiments should also be conducted in which, when forming the synaptic stems of the neural network, the algorithm by which synapses extend is formed by applying QNRG to a lightning-generation algorithm.
~~~~~

### S04. Engineering Revision of Hypotheses 1–4, V3

Current engineering definition. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-hypotheses10-20260930-204338/sources/H1-H4-explicit-engineering-revision__HypothesisNeuronNet_V3_QHON.md>)

~~~~~text
# QHON Four-Hypothesis Error-Improvement Proposal V3

Research interval: 2026-09-22 23:55:06 ~ 2026-09-23 04:55:06 KST. This is a separate revision prepared while preserving the original `HypothesisNeuronNet_V2.md`. Final experimental assessments and figures follow the final report and `reports/` in the same folder.

## Assessment Scope and Priorities

1. **H3: Transmitter release inhibition and finite-resource recovery triggered by return detection.** Directly relates to persistent errors and the readability of information.
2. **H2: Local capacity limits, external material influx, and selective return.** Determines conservation and causality of the input delivered to H3.
3. **H1: Connection formation based on directional information.** Determines signal paths and functional observability.
4. **H4: Central-inversion connections and synchronization of change order.** Addresses accuracy of structural correspondence.

Numerical accuracy is a shared prerequisite for the four hypotheses. Consistent operation of digital-model rules is distinguished from the existence of actual biological mechanisms. The model uses 27 HH-type cells in 3×3×3 space; it does not spatially resolve the molecular reactions of every neuron and synapse. The HH reference equations are not a model fitted to human cerebral cortex, and the slow-adaptation term is a separate synthetic element.

## H3 Revision: Transmitter Release Inhibition and Recovery

Following the meaning specified by the user, inhibition targets **transmitter release, not the action potential itself**. Whether an action potential occurs, whether release is permitted, and whether a signal arrives at the other neuron are recorded separately. Releases occurring before the return-detection signal arrives are not canceled retroactively.

Recovery that waits only for firing-attempt counts may stall if subsequent input ceases. The revision candidate uses whichever of the following conditions is met first.

- Inhibited release attempts reach the configured count.
- The configured time has elapsed since return detection.

Recovery requires a finite cost. A candidate reserving 1 resource unit for recovery is compared so that production cannot consume the last resource needed for recovery. If initial resources are 0, recovery is not guaranteed in this model. Storage is capped, and creation, movement, discharge, and usage costs are recorded in a ledger. Three attempts/a 100ms upper bound and a storage cap of 16 are candidate experimental parameters, not physiological constants. The energy ledger here represents abstract costs in one local transmission compartment. Since the model does not calculate HH ion pumps, concentration-gradient maintenance, or whole-neuron metabolic costs, conservation in this ledger is not interpreted as proof of energy feasibility for the entire neural network.

Removal of a sensing molecule and establishment of memory are separate assessments. Input history is read using only neuronal voltage and firing records after the sensing state has cleared and external stimulation has ended. Synthetic adaptation, post-stimulus communication, chemical storage state, and recovery resource costs are controlled separately. Forced equalization of chemical states is an external intervention for isolating causes, not a newly claimed intrinsic recovery mechanism.

The readout is frozen on development inputs and evaluated on separate inputs. Supervised training of this external readout is distinguished from synaptic-weight learning in the neural network itself. Connections and conductances in these readout experiments are fixed within each condition. Transfer to a new graph without graph-specific calibration is distinguished from calibration using labeled examples on a new graph. Differences within numerical error, nonconvergent results, and mere persistent activity are not counted as evidence of memory. Permanent memory beyond the validated observation duration is not claimed.

## H2 Revision: Local Limits and Two-Stage Exchange

Capacity 10 is the **upper limit of the specified local transmission compartment**. Admitting B1 into an A10 state requires moving A1 out of that compartment onto the return path. The return path remains within the simulation; molecules are not deleted. It would be inconsistent to interpret this as a total-system limit while claiming that internal movement alone reduces the system total.

The original position criterion alone does not guarantee that A always returns. B can be selected in a mixed-position layout. The following two versions are therefore preserved separately.

- **Position-selective:** Return the nearby molecule. Exclude the claim that selection of A is guaranteed.
- **A-selective revision candidate:** Add an explicit rule distinguishing A. This discrimination mechanism is a new auxiliary assumption not automatically derived from the original, and its physical realization is unresolved.

The A-selective version uses two stages: reserve the movement of A, begin its return, then admit B within capacity. A in transit, B reserved for entry, and B waiting outside are all included in the conservation ledger. If the return path closes or A is depleted, B waits or its influx is restricted. Upon reaching the queue limit, material is held upstream rather than silently deleted. Entry delays and queues introduce costs that must also be included in compression and speed evaluations.

## H1 Revision: Sufficient Information for Backtracking and the Purpose of Connections

A single final arrival direction is not assumed sufficient to retrace a multiply bent path exactly. Backtracking is permitted only within the information actually retained under one of the following.

- Straight paths or restricted paths for which local direction is sufficient.
- Source-specific path traces with finite retention time and storage capacity.

If source labels or complete paths are supplied, the byte cost of that additional information and collision-handling rules are specified. Failure, rejection, and expiration are recorded when signals overwrite the same trace or storage capacity is insufficient. Replayed QRNG inputs are not counted as new independent samples.

Completion of connection formation and useful signal transmission are also distinguished. If a specified release-sensing neuron is isolated, inhibiting its release cannot transmit an effect to other neurons. Functional connection supplementation is then evaluated as a separate engineering revision candidate. Rewiring that removes existing paths can break original connections, so comparisons include added connections, the same number of random added connections, and no supplementation. Adding one connection does not guarantee a path to the output neuron or successful memory readout.

The physical transmission medium of Rd, the actual storage structure of directional traces, and their conversion into growth responses remain unresolved. Establishing a software connection algorithm is not interpreted as biological proof of these three elements.

## H4 Revision: Central Inversion and Command-Level Agreement

Central inversion of 3×3×3 coordinates is defined as `(x,y,z) → (2−x,2−y,2−z)`. In linear indexing, `P(i)=26−i`; applying it twice returns to the original position. Connection `a→b` corresponds to `P(a)→P(b)`. Inverting positions does not reverse the temporal order of cause and effect.

The basic version retaining the original condition, “complete the corresponding connection before the next change,” permits the next change only after completion acknowledgment. Alternatives sending multiple changes simultaneously are explicitly identified as revisions relaxing that condition.

Checks cover the order of change commands and every application step, not merely the final matrix. Duplicate commands are not applied twice, and a late change must not erase an earlier change to a different connection. Handling communication omissions requires sequence numbers, completion acknowledgments, retransmission, and limited waiting buffers. Permanent communication failure is not treated as unconditionally recoverable.

Naming the structures consciousness and the unconscious is distinct from demonstrating those functions. This experiment validates inversion, synchronization, and storage methods, not the emergence of consciousness.

## Accuracy, Compressibility, and Reproducibility

- In time-step-halving comparisons of identical inputs, check matching firing counts and sample lengths, a maximum voltage difference within 0.1mV, and a maximum firing-time difference within 10µs. Do not relax assessment criteria.
- Distinguish improved interpolation of firing times from changes to neuronal integration equations. Improvement on previously failed conditions is distinct from generalization to separate unused inputs.
- Before reusing computation for exactly identical input states, verify that outputs remain unchanged. Approximate state merging is not included in this lossless optimization.
- QNS3 is a compression format for neuron-state/voltage arrays. Include both headers and original data in integrity checks. Do not extend array compression ratios to the entire neural network.
- The complete resumption state QHC1 is a separate candidate preserving neural state, firing readiness, pending events, chemical ledgers, controller progress, and accumulated records together. Validate agreement of actual resumed outputs under identical code, inputs, settings, and runtime.
- Preserve original ANU inputs, response provenance, code hashes, settings, and results. Do not expand QRNG bytes pseudorandomly or reuse them cyclically as though they were new randomness. Explicitly identify paired comparisons using identical inputs and replay of existing inputs.

The goal of this revision is not to hide errors, but to make subsequent research reproducible by separating implementable rules from claims that remain unvalidated.
~~~~~

### S05. Original Hypothesis 5 and Elaboration, v1.0

Historical source text: the latest revisions take precedence for the single point sequence, size rules, and other relevant items. [Source file](<C:/Users/User/Downloads/Hypothesis_5_Interpretation_Cube_v1.0.md>)

~~~~~text
# Hypothesis 5 — Interpretation Cube Hypothesis

**Subtitle:** Shape preservation of Thought Refraction Lines, the hypothetical role of the claustrum, and elaboration of the three-dimensional interpretation process

- Proposer of the original hypothesis: JAN
- Document version: 1.0 — source-text preservation and additional elaboration
- Date written: 2026-09-23
- Nature of the document: An independently proposed neural and consciousness hypothesis and design proposals for testing it
- Current term: **Thought Refraction Line**

> **Core proposition:** The signals of synapses formed for one thought come together to form a single Thought Refraction Line, whose shape is preserved unchanged in the claustrum. When needed, multiple stored shapes are interpreted within a three-dimensional cube whose size is determined by complexity, and the interpreted information constitutes subjective experience.

While retaining the proposition above, this document adds representation methods, preservation and retrieval procedures, three-dimensional placement, and interpretation operations that have not yet been specified. **The added designs are not retroactively described as having been part of the original hypothesis.** The neuroscience references in this document also provide background for comparison and validation; they are not cited as evidence that Thought Refraction Lines or interpretation cubes exist.

## How to Read the Document

| Category | Meaning |
|---|---|
| **[Original proposition]** | A claim directly presented by the user, or the terminology change directly specified on this occasion |
| **[Elaboration proposal]** | Definitions and operating methods added while retaining the original text. Adoption is managed separately from the original hypothesis |
| **[Test model]** | Specific rules chosen to enable computation or simulation |
| **[Mathematical check]** | Properties derived from the chosen representation rules, distinguished from biological facts |
| **[Literature evidence]** | Findings reported in actual research, with reference numbers |
| **[Undecided]** | Matters unspecified in the original text and not established as having a single correct answer in this document |

The proposals can be read as one mutually compatible design, but whichever proposals are adopted, their differences from the original propositions must be recorded. Content from other hypotheses or the QRNG condition is not automatically imported into Hypothesis 5.

---

## 1. Original Text and Revision History

### 1.1 User's Original Text — Preserved Unchanged

The block below is the original text, preserving its notation, spacing, and even the comma in the array.

```text
The signals of synapses formed for one thought. The single line formed by all of them coming together is preserved in the claustrum in exactly that shape -> multiple stored shapes are interpreted when needed inside a three-dimensional cube EX)
000  000
000  010
000, 011

(These are 2 faces of the net; in actuality it is a 3 x 3 cube, and during actual interpretation the cube's size is determined by the complexity of the shape.)

What the interpreted information constitutes is subjective experience.

Hypothesis 5 - Interpretation Cube Hypothesis
```

### 1.2 Terminology Change Confirmed on This Occasion

The previously used term **synaptic refraction line** is changed to **Thought Refraction Line**. Only the new term is used below. The name change does not alter the conditions for generating or storing the line.

Where an English term is needed, this document may use *Thought Refraction Line* as a provisional equivalent. This is a translation coined for this hypothesis, not an established standard term in neuroscience.

### 1.3 Original Propositions That Must Be Retained

| Identifier | Original proposition |
|---|---|
| H5-01 | The signals of synapses formed for one thought come together to form a single line. |
| H5-02 | This line is called the Thought Refraction Line. |
| H5-03 | The line is preserved in the claustrum **in exactly its original shape**. |
| H5-04 | When needed, **multiple stored shapes** are interpreted inside a three-dimensional cube. |
| H5-05 | The numerical arrays presented are **two faces** of a net, and the example cube has size 3 in each direction. |
| H5-06 | The actual interpretation cube's size is determined by the complexity of the shape. |
| H5-07 | What the interpreted information constitutes is subjective experience. |

### 1.4 Elements of Earlier Explanations That Must Not Be Treated as Settled Conditions

“Preserving exactly the original shape” is not weakened to approximate preservation. Writing only `M ≈ L` to represent the stored shape would impose a weaker condition than the original, so this document requires exact equality of the defined shape.

The original text did not establish that a Thought Refraction Line necessarily contains temporal order, emotion, or a self-model; that each face handles a particular sense; that the interpretation cube is anatomically inside the claustrum; or any particular size-growth formula. Where needed, these are treated below as **additional proposals**.

The phrase “signals of synapses formed for one thought” is not definitively interpreted either as “all synapses are newly created each time” or as “only firing in existing synapses.” Actual implementation preserves this interpretive distinction by separating signal-generation records from structural synapse-creation records.

---

## 2. Overall Structure of the Hypothesis

### 2.1 Basic Flow [Original proposition]

```text
Signals of synapses formed for one thought
    → Formation of a single Thought Refraction Line
    → Preservation of exactly its original shape in the claustrum
    → Retrieval of multiple stored shapes as needed
    → Interpretation in a three-dimensional cube suited to their complexity
    → The interpreted information constitutes subjective experience
```

This flow represents a functional order. The original text does not also specify a timing rule requiring every stage to finish completely before only the next stage can begin.

### 2.2 Distinguishing Thought, Line, Preserved State, and Interpretation State [Elaboration proposal]

**Thought** is distinguished as the source of the neural activity forming the line; the **Thought Refraction Line** as the shape formed by those signals; the **preserved state** as the state maintained so the same shape can be retrieved again; and the **interpretation state** as the state in which multiple shapes are actually being processed within the interpretation cube.

This distinction avoids confusing “a shape that is merely stored” with “interpreted information constituting current experience.” It does not, however, generalize that all neural activity during storage is unrelated to consciousness.

### 2.3 Avoiding an Assumption of Consciousness at the Start of Thought [Elaboration proposal]

When translating the hypothesis into a computational model, defining “one thought” exclusively as “a thought already subjectively experienced” would presuppose consciousness before explaining it.

For testing, it is first treated as **a neural activity event segmented in relation to an input, task, or internal-state transition**. Whether that event is conscious is not assessed in advance. The first observation is whether a shape and interpretation result arise from the activity event.

The beginning and end of an event are specified before testing. For example, an event can be recorded from the onset of a particular input through a specified observation interval. Because changing that interval may change the line's shape, temporal segmentation rules must be included in the experimental record. This rule does not declare a biologically universal “duration of a thought.”

---

## 3. Definition and Formation of the Thought Refraction Line

### 3.1 Minimum Definition [Original proposition]

**A Thought Refraction Line is a single line formed by all the signals of synapses formed for one thought coming together.**

The name “refraction” alone does not imply optical refraction, a particular refractive index, electromagnetic field lines, or any optical law. In this hypothesis, the name refers to the shape of the line formed by signals.

### 3.2 Geometric Information to Include in the Line [Elaboration proposal]

To compare line shapes explicitly, at least the positions forming the line and how those positions connect must be specified. As one test representation, a Thought Refraction Line `Lᵢ` is represented as an ordered sequence of points.

$$
L_i=(\mathbf p_{i,0},\mathbf p_{i,1},\ldots,\mathbf p_{i,m_i}),
\qquad \mathbf p_{i,j}=(x_{i,j},y_{i,j},z_{i,j}).
$$

The segment joining two neighboring points is one constituent interval. What matters is not only the number of points but their arrangement, connection order, bend locations, and the relative directions of segments.

This is a test proposal for **one connected polyline**. Whether actual Thought Refraction Lines are smooth curves, can self-intersect, include branches, or are intrinsically directed remains undecided. Testing a variant implemented as a branched graph requires explicitly recording that the scope of “one line” has been expanded.

Point-sequence order can serve as traversal order along the line, but this does not make it the temporal order in which synaptic signals occurred. Including temporal order requires a separate additional assumption to be recorded.

### 3.3 Physical Coordinates and Information Coordinates [Undecided; Elaboration proposal]

The coordinates of a shape may have two meanings.

| Representation | Meaning of the coordinates | Separate validation required |
|---|---|---|
| Physical-path representation | Actual spatial positions of neurons, synapses, and signal-transmission paths | How distributed signals form a single path |
| Information-coordinate representation | Positions in an internal representation mapping signal features onto three axes | Whether the axes and distance relationships have neurological or functional meaning |

The original text does not choose between these. Therefore, **specifying a three-dimensional Thought Refraction Line shape** is distinguished from **claiming that the shape directly depicts the physical arrangement of actual brain tissue**.

Using information coordinates in a test model does not remove the three dimensions of the interpretation space. In that case, however, the validation target is “interpretation using a three-dimensional information representation”; the anatomical claim that an identically shaped line is actually traced within the brain remains separate.

### 3.4 Mapping Signals to a Line [Elaboration proposal]

Writing the synaptic-signal record as `S_T` and the rule converting it into a line as `Φ` gives the following.

$$
L_T=\Phi(S_T).
$$

This equation identifies a step needing explanation; the symbol `Φ` alone does not solve the formation principle. Using `Φ` in an actual implementation requires specifying the input-signal scope, handling of simultaneous signals, coordinate assignment, connection order, and how omissions of signals are checked.

**One concrete encoding possible for testing** is as follows. Assign every synapse an index `r` fixed throughout the test, and represent a finite-precision recorded signal event as `(r, τ, a)`. Here `τ` is the time tick since the event began, and `a` is the signal value in declared units. Use these three values as coordinates and connect the points in `(τ, r, occurrence identifier)` order. Preserve the original signal record as well.

This method produces a computable single line, but geometric neighborhood relationships change with the method of assigning synapse indices. Serialization of simultaneous events may also create artificial bends. **It is therefore a data-representation test proposal, not an explanation of how an actual brain forms Thought Refraction Lines.** Controls with altered synapse indices and altered temporal order are required.

When multiple events occupy identical coordinates, point multiplicities and connection order must be preserved separately. A 0/1 array retaining occupancy alone can lose this information. If two signal records cannot be distinguished by shape alone, record whether they are considered the same line or whether a more precise shape definition is adopted.

### 3.5 Separating Shape from Auxiliary Information [Elaboration proposal]

The preservation target specified in the original text is shape. In an implementation, it is preferable to store the shape itself separately from its provenance.

| Record | Role |
|---|---|
| Shape payload | The defined shape itself, including points, segments, and connection order |
| Provenance record | Identifies the signal record from which the shape was formed |
| Coordinate rules | Axis meanings, units, and coordinate-system identifier |
| Generation-rule version | Checks whether the same line can be reproduced from the same original signals |
| Optional auxiliary information | Occurrence time, signal strength, and similar information. Indicate whether it is used separately from the shape |

The existence of auxiliary information does not mean it is described as having been an essential Thought Refraction Line component in the original text. Models using shape alone and models also supplying auxiliary information to interpretation are tested separately.

---

## 4. Role of the Claustrum

### 4.1 Core Role in This Hypothesis [Original proposition]

The claustrum in this hypothesis is **the place where a Thought Refraction Line's shape is preserved unchanged**. Redefining it as storing only addresses pointing to shapes in other brain regions would change the original claim.

Biological support for the hypothesis therefore requires identifying content-dependent shape-preserving states within the claustrum itself. Evidence merely that “the claustrum was activated” or “it is connected to other areas” does not establish a storage role.

### 4.2 Functional Decomposition [Elaboration proposal]

| Function | Specific role | Relationship to the original text |
|---|---|---|
| Shape reception | Accept the generated Thought Refraction Line shape into the preservation process | Functional subdivision needed for preservation to occur |
| Shape preservation | Maintain the same shape after storage | Core of the original text |
| Shape identification | Distinguish multiple stored shapes | Additional proposal for handling multiple stored items |
| Retrieval selection | Select stored shapes needed for current interpretation | Additional proposal specifying “when needed” |
| Reading and reproduction | Provide preserved shapes to interpretation without altering them | Additional proposal concerning preservation and interpretation |
| Interpretation coordination | Regulate input order, concurrent processing, and termination | A possible additional role, not an established function |

This functional distinction does not necessarily imply six anatomical regions. A single circuit may participate in multiple functions. Since the original text also does not specify where Thought Refraction Lines first form, shape generation is not automatically assigned to the claustrum.

### 4.3 Meaning of Preserving the Original Shape [Elaboration proposal]

Writing shape as `Shape(·)`, the preservation condition is expressed as follows.

$$
\operatorname{Shape}(\operatorname{Read}(M_i))
=
\operatorname{Shape}(L_i).
$$

Here `Mᵢ` is the state preserved in the claustrum. The equality sign means **identity of the defined shape**; it does not require the ions or charges that initially moved to remain permanently stationary in the same material state. Shape preservation and material immobility are separate matters.

The test model imposes a stronger preservation target: the original point sequence, connectivity information, and coordinate units must be completely identical before and after reading. If compression is used, only lossless methods exactly reconstructing the original shape satisfy this preservation condition. Lossy compression, averaging, and replacement by similar patterns are treated as different model variants.

### 4.4 Distinguishing Stored Shapes from Working Shapes [Elaboration proposal]

Stored originals remain read-only, while working states referencing them are created in the interpretation cube. What changes during interpretation is “which shapes are currently active” and “which relationships are detected,” not the stored originals themselves.

If a new thought produces a different shape, it is added as a separate record. Existing records are not silently overwritten. Since the original text does not specify storage duration or forgetting rules, infinite storage capacity or permanent retention is not automatically assumed. If storage becomes insufficient, the shortage and the applied policy are indicated.

### 4.5 Physical Medium Responsible for Preservation [Undecided]

The original text does not specify which biological state preserves the shape. Persistent or recurrent activity states, long-lasting changes in connections, and combinations of the two may be compared as **candidates**. Every candidate must nevertheless be tested separately against the condition that “reading returns the original shape unchanged.”

In particular, a shape appearing briefly in the claustrum because information is supplied anew from another area each time must be distinguished from reappearance because content is preserved within the claustrum. Without this distinction, the original storage claim is difficult to separate from a simple relay account.

### 4.6 Spatial Relationship Between the Claustrum and the Interpretation Cube [Undecided; Elaboration proposal]

**The original text specifies the claustrum as the preservation site, but does not specify the anatomical location of the interpretation cube.** The following research proposals can be distinguished.

- The interpretation cube is constituted within claustrum activity.
- The interpretation cube is constituted through interactions among other neural networks connected to the claustrum.
- A logical three-dimensional interpretation space is implemented while a biological counterpart location is investigated separately.

Whichever proposal is selected, the original claim that “shapes are preserved in the claustrum” must remain. Moving storage to another area is a revision of the original proposition, not merely an elaboration.

---

## 5. Structure of the Interpretation Cube

### 5.1 Minimum Definition [Original proposition]

**The interpretation cube is a three-dimensional cube in which multiple stored shapes are interpreted as needed, with its size determined by the complexity of the shapes.**

This definition alone does not determine the meaning of each of the six faces, interior values, operating time, or cell count. Nor does it add a claim that the claustrum itself is externally cube-shaped.

### 5.2 Grid Representation [Test model]

For computation, it can be represented as a cube with `N` sample positions along each side.

$$
\Omega_N=\{0,1,\ldots,N-1\}^3.
$$

Under this rule, `N=3` gives `3×3×3=27` sample positions. The user's 3×3 face represents one face of this solid. This is **the number of positions when a sampled representation is chosen**, not the number of actual neurons.

Physical size and sampling resolution are distinguished. If sample spacing is `δ`, the distance between the two endpoint samples is `(N−1)δ`. The default test in this document fixes the units of all axes and expands space when increasing `N`, without stretching or compressing the lines.

### 5.3 Meaning of 0, 1, and Unknown Values [Test model]

The geometric tests in this document use the following notation.

| Value | Meaning |
|---|---|
| `1` | A shape element of the line is specified to exist at that sample position |
| `0` | No shape element is specified to exist at that sample position |
| `?` | Information for that position has not yet been provided |

The original text does not specify physiological meanings for 0 and 1. Mappings such as `1=excitation`, `0=inhibition`, `1=consciousness`, `0=the unconscious`, or `011=a particular emotion` are therefore not adopted. The table above is only **a rule for reading the computational examples**.

### 5.4 When Multiple Lines Pass Through the Same Position [Elaboration proposal]

Simply merging occupancy arrays of multiple Thought Refraction Lines into one 0/1 array by an OR operation may erase which part belongs to which line. Original-specific data are therefore separated from the aggregate display array.

$$
X_i(\mathbf p)=\text{occupancy state of line }i\text{ at that position},
\qquad
X_{\rm display}(\mathbf p)=\max_i X_i(\mathbf p).
$$

The interpreter reads not only `X_display`, but also each line's point sequence, connectivity information, and `Xᵢ`. It must distinguish crossings of different lines from bends in one line. Two shapes in memory are not merged merely because they appear as one on the screen.

### 5.5 Distinguishing Surface, Cross Section, and Projection [Mathematical check]

A **face** is a boundary portion of a solid; a **cross section** is a slice through its interior at a particular position; and a **projection** overlays depth information onto one plane. These are not the same data.

The original arrays were presented as “two faces of a net,” so they are not arbitrarily reinterpreted as two time frames or projection images. In the tests below, the two arrays are treated as values on actual boundary faces.

In a boundary-sampling scheme where multiple faces share the same three-dimensional coordinates, edge and vertex values must agree. For `N≥2`, the number of boundary samples is `N³−(N−2)³`. When `N=3`, there are 26 boundary positions and 1 interior position. The 54 entries obtained by writing 9 values on each of six faces include repeated boundary positions.

Another scheme could define small surface cells as mutually independent face data, but the shared-coordinate calculation above would then not apply unchanged.

### 5.6 Two Faces Alone Do Not Determine the Entire Solid [Mathematical check]

Knowing the shapes on two faces still permits multiple states for the remaining faces and interior. Unprovided positions are therefore not filled as though they were originally 0. If the positions and orientations of the two faces are also unspecified, possible arrangements must first be distinguished.

Even knowing all six boundary faces does not automatically determine all interior values in a representation that reads only boundary faces. If three-dimensional interpretation depends on interior information, interior data or additional rules constraining the interior are required.

---

## 6. Determining Size and Shape-Preserving Placement

### 6.1 Avoiding Premature Reduction of Complexity to a Single Number [Elaboration proposal]

The original text says that size is determined by complexity, but provides no complexity calculation. Tests can record features such as the following separately.

| Feature | Purpose of recording |
|---|---|
| `M` — number of constituent points | Amount of shape information to represent |
| `K` — number of bends | Amount of directional change |
| `I` — number of self-intersections and intersections between lines | Burden of distinguishing connectivity |
| `bₓ,bᵧ,b_z` — occupied extent along each axis | Minimum space needed to contain the shape without clipping |
| `R` — number of relationships between simultaneously processed lines | Burden of interpreting multiple shapes |

These measures are proposals; none is itself the quantity, quality, or depth of subjective experience. Increased complexity may sometimes still fit within the same cube size. The original text does not state that complexity and size always correspond one-to-one.

### 6.2 Minimum Size from Coordinate Extents [Test model; Mathematical check]

For the integer coordinates of all shapes placed in a common coordinate system, calculate the extent of each axis as follows.

$$
b_x=x_{\max}-x_{\min}+1,
\quad b_y=y_{\max}-y_{\min}+1,
\quad b_z=z_{\max}-z_{\min}+1.
$$

With `p` cells of padding in every direction, the geometric minimum size is as follows.

$$
N_{\rm geometry}=\max(b_x,b_y,b_z)+2p.
$$

This formula gives only **the minimum grid size required to contain the shapes**; it is not a law of how the brain actually determines size. If line coordinates do not align exactly with the grid, retain the original coordinates and use a separate sampled representation. A rounded display does not replace the original form.

### 6.3 A Concrete Test Proposal Incorporating Complexity [Test model]

In one reproducible test, one logical processing slot can be assigned to each point, bend, intersection, and shape relationship, giving the following calculation.

$$
W=M+K+I+R,
\qquad
N_{\rm workload}=\left\lceil\sqrt[3]{\max(1,W)}\right\rceil,
$$

$$
N=\max(N_{\min},N_{\rm geometry},N_{\rm workload}).
$$

The coefficients of 1 in these equations are **test resource-allocation rules**. A logical slot is not the same as one actual neuron or one unit of physical space. The cube root comes from the cube's position count `N³`; it is not a law of experience generation. If different slot costs are adopted, record their version.

This example is an additional proposal making size computable. Scientific validation should compare fixed-size models, models using geometric extent alone, and models also using complexity under the same resource conditions.

### 6.4 Placing Lines Without Deforming Them [Elaboration proposal]

The basic proposal expands the required space without changing line lengths, bends, or connectivity. Coordinates storing the original form are separated from coordinates displaying it in the interpretation cube.

$$
\mathbf p'_{i,j}=\mathbf p_{i,j}+\mathbf t_i.
$$

This equation denotes translation in the working space; it is not applied to the original. Translation preserves distances and angles within a line but can change **relative positions between different lines**. How `tᵢ` is determined is therefore a separate condition affecting interpretation.

The basic proposal uses the same reference for lines having common reference coordinates and applies only a common translation to adjust the bounds. Without a common reference, use the reference point from storage or a predefined placement rule additionally, but do not choose “the position giving the most desired answer” after examining test results.

Rotation, reflection, axis-specific scaling, nonlinear bending, and rearrangement are not automatically included in the basic proposal. Even comparison experiments permitting rotation retain the stored original, applied rotation, and interpretation result separately. Stretching all lines to fit an enlarged cube is different from the basic proposal.

---

## 7. What Does Interpretation Do?

### 7.1 Functional Definition [Elaboration proposal]

This document elaborates **interpretation** as “the process of retrieving stored shapes, constructing three-dimensional relationships, and changing the neural network's current information state according to those relationships.”

Under this definition, the interpreter is not a little observer or a separate conscious subject. In an implementation, it is a processing circuit with specified connections and update rules. Explaining that someone looks again at the result after the line's shape is read would require another experiencing subject. Here, that problem is avoided by specifying how circuit states change in response to shape inputs.

This functional definition alone does not establish “why that information state is felt.” The original hypothesis's proposition about the constitution of experience remains at that point.

### 7.2 Three Layers of Interpretation [Elaboration proposal]

| Layer | What it processes | Examples |
|---|---|---|
| Shape readout | The structure of each line itself | Points, connections, bends, intersections, endpoints |
| Relationship readout | Three-dimensional relationships among multiple lines | Proximity, overlap, separation, directional relationships |
| Content association | Associations between the structures read and learned signals or states | Different sensory features associated with the same object |

Successful shape readout is not immediately successful semantic interpretation. Likewise, successful semantic classification does not immediately establish subjective experience. These three success criteria are not evaluated as the same thing.

### 7.3 Numerical Arrays Do Not Produce Meaning on Their Own [Elaboration proposal]

Given only the notation `011`, it is not determined whether it means an apple, joy, red, or the current time. Associating meaning requires **correspondence rules**, such as what generated the shape, which other shapes appeared with it, and which outcomes it was associated with during learning.

In elaborating this hypothesis, distinguish a human arbitrarily assigning a dictionary of “this shape means this experience” from learning relationships among signals, shapes, and action outcomes. In particular, writing the evaluation answer into a shape's name and supplying it as interpreter input is not evidence of semantic interpretation.

### 7.4 A Shape-Only Basic Proposal and Extensions [Test model]

In the **shape-centered basic proposal**, current context needed for interpretation is also represented as additional Thought Refraction Lines as far as possible and retrieved together. Interpreter inputs are the stored shapes, their placement, and learned processing rules.

Extensions directly supplying separate body-state vectors, temporal information, or self-models are possible, but must explicitly state that information affecting the constitution of experience also entered from outside Thought Refraction Lines. Self-models, emotion, language, or global broadcasting absent from the original hypothesis are not imposed as mandatory conditions.

---

## 8. Detailed Interpretation Procedure

### 8.1 Stage A — Generation of an Interpretation Request [Elaboration proposal]

Implementing “when needed” requires retrieval-trigger conditions. Candidates include arrival of external input, insufficient information for the current task, and arrival of input inconsistent with the existing activation state.

Specify at least one trigger condition in testing. Retrieval criteria are expressed through observable conditions such as input changes, errors, or task signals, rather than merely saying “because consciousness already needs it.”

### 8.2 Stage B — Selecting Relevant Shapes [Elaboration proposal]

Select multiple shapes relevant to the current request from the claustrum's preserved inventory. Implementations may use provenance links, previous co-retrieval records, and shape similarity to search for candidates.

Here, **similarity of shape** is not **identity of content**. Similarity search may help select candidates, but retrieving a similar line in place of the original violates the preservation condition. Record which candidates were selected and why.

Retrieval-list size and selection thresholds are experimental settings. No condition is added requiring all stored shapes always to be interpreted simultaneously or requiring a fixed number to be interpreted.

### 8.3 Stage C — Exact Reading and Provenance Verification [Elaboration proposal]

Read the selected shapes and compare them with the stored originals. If shapes using different coordinate or connectivity rules are used together, identify this; do not calculate distances while their reference systems are inconsistent.

If only part of a shape is stored or it is damaged, indicate that fact. Record exact retrieval of a preserved original, estimation from partial cues, and creation of a new shape as different states.

### 8.4 Stage D — Size Determination and Placement [Elaboration proposal]

Calculate the retrieved shapes' complexity and determine the required cube size. Place each line as a working state linked to its original, checking clipping, overlap, and mismatched coordinate units.

Overlap itself is not always an error. When different lines pass through the same position, retain each line's membership information to distinguish actual intersections from overlaps arising in the display process.

### 8.5 Stage E — Reading Individual Shapes [Test model]

In a point-sequence representation, segment vectors are calculated as follows.

$$
\mathbf v_j=\mathbf p_{j+1}-\mathbf p_j,
\qquad
\ell_j=\|\mathbf v_j\|.
$$

The bend between two consecutive segments can be calculated as follows when neither segment has length 0.

$$
\theta_j=\arccos\!\left(
\frac{\mathbf v_{j-1}\cdot\mathbf v_j}
{\|\mathbf v_{j-1}\|\,\|\mathbf v_j\|}
\right).
$$

In implementations subject to floating-point error, clamp the input to `arccos` to `[-1,1]`. Handle undefined calculations for zero-length segments; do not arbitrarily delete repeated points and thereby change the original form.

Outputs of this stage may include total length, endpoints, bend positions and angles, and connection order. Since such summaries cannot distinguish every possible line, retain the original data as well.

### 8.6 Stage F — Reading Relationships Between Lines [Test model]

Minimum distance using point samples can be calculated as follows.

$$
d_{ij}=\min_{\mathbf p\in P_i,\mathbf q\in P_j}
\|\mathbf p-\mathbf q\|.
$$

Here `Pᵢ` is the set of sample points of line `i`. This is **the distance between sample points**. To obtain the actual minimum distance including segment interiors, use a segment-to-segment distance calculation instead. Do not confuse the two when sample spacing is large.

Overlap of occupancy shapes can be calculated as follows.

$$
J_{ij}=\frac{|P_i\cap P_j|}{|P_i\cup P_j|}.
$$

If the union is empty, handle “both shapes are empty” separately. This value represents only overlap between sets of positions. Do not use it alone to identify lines with different connection orders or traversal directions as identical.

Other relational data may include directional differences between nearby segments, adjacency of endpoints, and shared passage through particular faces or interior positions. **The claim that nearby shapes are semantically related is a separate assumption.** Semantic association is not established from geometric proximity alone.

### 8.7 Stage G — Updating State According to Relationships [Elaboration proposal]

The shapes and relationships read are allowed to change the interpretation circuit's activation state. Related cues may activate together, while incompatible interpretation candidates may compete. Competition rules must be based on learning or explicitly predefined rules.

Stored shapes are retained while activation in the working space is updated. A **context-dependent extension** can therefore be constructed in which the interpretation state changes even when the same shape is retrieved again, if the other incoming shapes and learned connections differ. This is a proposal elaborating interpretation of multiple shapes, not a conclusion already specified in the original text.

### 8.8 Stage H — Recording the Interpretation State [Elaboration proposal]

Record not merely a single output word, but which shapes participated, which relationships were adopted, and what processing state was formed.

The basic record is as follows.

| Item | Content |
|---|---|
| Input shapes | Identifiers of retrieved originals and comparison results against those originals |
| Three-dimensional placement | `N`, coordinate system, reference points, and permitted transformations |
| Relational data | Distance, overlap, direction, and connectivity assessments |
| Dynamic state | Activation changes during updating |
| Functional output | Actually measured results such as judgments, classifications, and subsequent actions |
| Unresolved matters | Incomplete input, ambiguous candidates, and nonconvergent states |

The original hypothesis claims that **this interpreted information constitutes subjective experience**. Producing this record in an implementation is distinguished from confirming that claim.

---

## 9. One Example of a Computable Interpretation Circuit

### 9.1 Scope of the Model [Test model]

The following is one concrete implementation candidate. It is not a claim that the brain operates according to these equations, nor does it mean that the model has already been implemented in the actual Codex project.

Place a short numerical vector `hₚ` at each position `p` in the cube. This vector is a working state processing shape information around that position. One biological neuron is not assumed to correspond to each position.

Input `xₚ` may include line occupancy, which line an element belongs to, whether it is an endpoint, connection directions at that position, and bend information. Original-specific connection lists are retained separately. Identifiers distinguishing line membership are used only for **group identification**, not to conceal semantic information such as “this number's correct answer is apple.”

### 9.2 Spatial Interaction [Test model]

The default neighborhood consists of six positions: front, back, left, right, above, and below. Positions outside the cube are treated as absent neighbors. Periodic boundaries automatically connecting opposite faces are not added.

An example of a working-state update is as follows.

$$
\mathbf h_{\mathbf p}^{(k+1)}=
\tanh\left(
\mathbf b+U\mathbf x_{\mathbf p}
+V\mathbf h_{\mathbf p}^{(k)}
+\sum_{\Delta\in\mathcal N}
W_{\Delta}\mathbf h_{\mathbf p+\Delta}^{(k)}
\right).
$$

- `k` is the interpreter's update count.
- `U` represents the influence of shape input on the working state.
- `V` is the connection carrying the immediately preceding state into the next state.
- `WΔ` represents the influence of neighbors in each spatial direction.
- `b` is a baseline value, and `tanh` is a test function restricting the numerical state to a finite range.

In this model, which positions are neighbors actually affects computation. The cube is therefore not merely a display decoration. However, grid adjacency and connectivity along a line are different; relationships along the line must also be explicitly represented through input connectivity information or additional connections.

Using six directions is one choice. A neighborhood rule including diagonals is recorded as a different test model. If axes with different units are mixed, the meaning of direction-specific connection strengths and distance calculations must also be reexamined.

### 9.3 Interpretation Termination Criteria [Test model]

The interpretation result may be read when the state changes very little or after a predefined number of updates. For example, record the following state-change magnitude.

$$
\Delta_k=\max_{\mathbf p}
\|\mathbf h_{\mathbf p}^{(k+1)}-\mathbf h_{\mathbf p}^{(k)}\|.
$$

If `Δₖ` remains sufficiently below the declared tolerance for a specified number of updates, mark the result “converged.” If it has not converged by the iteration limit, mark it “nonconverged.” Using `tanh` does not guarantee convergence, so guaranteed termination is not assumed.

Models allowing persistent fluctuation are also possible. These require a separate rule defining the time-varying state trajectory, rather than a single stable point, as the interpretation result. The original text contains no requirement that only stable states can generate experience.

### 9.4 Learning Content Associations [Elaboration proposal; Test model]

For shapes and relationships to have meaning in actual tasks, `U`, `V`, `WΔ`, or connections in the subsequent readout circuit must be determined. Tests may train the model to distinguish relationships between sensory signals and objects, or to predict the next state appropriate to an input.

For example, use a task asking whether different color and shape inputs came from the same object. Separate training cases from evaluation cases and check whether relationships are processed for new combinations. The stored Thought Refraction Lines themselves need not change every time an interpretation is produced. Update **shape-preservation data** and **the learned state of interpretation rules** separately.

If this learning succeeds, it supports a claim of functional interpretation using shape information. It does not automatically support an assessment that “a sensation was actually felt.”

### 9.5 Recording Functional Output Separately from the Experience Proposition [Elaboration proposal]

Distinguish the complete interpretation state `Dₜ` from externally read classification or action output `Yₜ`.

$$
D_t=(\text{participating shapes},\text{three-dimensional relationships},\text{working state}),
\qquad
Y_t=\operatorname{Readout}(D_t).
$$

The original hypothesis's claim is expressed as follows.

$$
\boxed{\text{The interpreted information }D_t\text{ constitutes subjective experience.}}
$$

The box above is **a correspondence proposition of the hypothesis**, not an output equation for a measurement device. Output of the word “red” by `Yₜ` does not establish that `Dₜ` contains the feeling of seeing red.

---

## 10. Interpretation Retaining the Original Two-Face Example

### 10.1 Separating the Two Arrays

Separating the original numerical arrays by face gives the following. The comma remains in the preceding original-text preservation block; only face values are shown below.

```text
Face A      Face B
0 0 0       0 0 0
0 0 0       0 1 0
0 0 0       0 1 1
```

Only the values of the two faces are established at this stage. The original text does not specify which is the front face, whether the faces are adjacent, or the directions indicated by their rows and columns.

### 10.2 One Example with Consistent Coordinates [Test model]

For computation, choose **face B as the front face at `z=0`** and **face A as the left face at `x=0`**. Read face B's columns from left to right as `x=0,1,2`, and its rows from top to bottom as `y=2,1,0`. Read face A's rows in the same `y` direction and its columns from left to right as `z=2,1,0`.

Under this choice, values agree on the edge shared by the two faces. Other orientations are possible; this coordinate assignment is not the unique reconstruction of the user's original text.

The `1` entries on face B correspond to the following three points.

$$
(1,1,0),\quad(1,0,0),\quad(2,0,0).
$$

Calling the test shape connecting these points in the order above `L₁` gives the following.

```text
L₁: (1,1,0) → (1,0,0) → (2,0,0)
```

This is a **connectivity example** additionally specifying the order of the three points. The original face arrays alone are not regarded as already determining this connection order and direction.

### 10.3 What Can Be Calculated in This Example [Mathematical check]

With grid units of 1, the two segments of `L₁` each have length 1, for a total length of 2. Direction changes once at the middle point, at an angle of 90 degrees.

What can be stated here is that the test shape is “a line with one right-angle bend.” This information alone does not identify a corresponding sensation or subjective experience. Content-association rules and other retrieved shapes are additionally required.

### 10.4 A Different Interior Shape Producing the Same Two Faces [Mathematical check]

The following shape `L₂` produces exactly the same values on faces A and B chosen above.

```text
L₂: (1,1,1) → (1,1,0) → (1,0,0) → (2,0,0)
```

The added point `(1,1,1)` lies inside the cube, so it does not appear on the two boundary faces. `L₂` has a total length of 3 and two 90-degree bends. Therefore, **the complete lines can differ even when the two faces are identical**.

When defining `L₁` and `L₂` as complete shapes, add the condition that no lines exist other than the displayed points and connections. Do not treat this additional condition as information hidden in the original text.

### 10.5 Handling Incomplete Input [Elaboration proposal]

An interpreter receiving only two faces must indicate which of the following procedures it uses.

| Handling | Meaning |
|---|---|
| Wait for additional information | Retain the undecided interior state unchanged |
| Retain multiple possible candidates | Compare multiple solids compatible with the face constraints |
| Select one using an explicit rule | For example, record that the candidate with the fewest additional segments was selected |

The third method is estimation, not reconstruction of the original. This ambiguity may be absent when the entire stored Thought Refraction Line is actually read, but the whole cannot be claimed known from only the two displayed faces.

### 10.6 A Separate Example Extending to Multiple-Shape Interpretation [Test model]

The following `L₃` is not part of the original arrays; it is a newly defined line illustrating the joint processing of multiple shapes.

```text
L₁: (1,1,0) → (1,0,0) → (2,0,0)
L₃: (1,1,1) → (1,2,1)
```

Both lines fit within `3×3×3` space. Their minimum point-sample distance is 1, and occupancy overlap is 0 because they share no points. A relationship reader can extract this spatial information.

Subsequent content interpretation depends on the signal provenance of the two lines and the learned relationship rules. It is not concluded that “because the lines are close, they necessarily form one sensation.” This example demonstrates **the stage of computing three-dimensional relationships**.

---

## 11. How Far Can the Account of Subjective Experience Be Elaborated?

### 11.1 Retaining the Original Hypothesis's Claim [Original proposition]

Hypothesis 5 claims that subjective experience is constituted not by stored lines themselves, but by information obtained through interpreting multiple shapes in the interpretation cube. Its center is therefore **the connection between shape preservation and interpretation**, rather than storage capacity alone.

### 11.2 Additional Proposal on Differences in Experiential Content [Elaboration proposal]

A model can be proposed in which different interpretation states arise depending on which lines are retrieved, the three-dimensional relationships through which they are interpreted, and how the interpretation rules have been learned. In this model, even the same incoming line may produce a different overall state if the lines retrieved alongside it differ.

This can describe a structure in which “current sensory information” and “stored related information” are interpreted together. It does not assign a particular face to each sense or require a particular emotion or self-representation in every experience.

### 11.3 Additional Proposal on the Unity and Temporal Continuity of Experience [Elaboration proposal]

Multiple mutually influencing shapes forming a single connected interpretation state can be proposed as a candidate mechanism for unified experience. Allowing part of the previous interpretation state to influence the next also makes a model of continuity possible.

However, “a single computational state was formed” and “a single subjective experience arose” are not the same measurement result. The original text also does not establish whether exactly one interpretation cube exists each time, whether multiple interpretation processes can proceed in parallel, or the temporal unit of experience.

### 11.4 Explanatory Distinctions That Must Be Retained

This document separates the following three questions.

1. **Functional question:** How can a circuit be constructed to store, retrieve, and interpret lines three-dimensionally?
2. **Biological question:** Does a corresponding mechanism exist in the actual brain, particularly the claustrum?
3. **Experiential question:** Why does that interpretation state constitute subjective feeling?

The first can be tested with a concrete program. The second requires independent neurological observations and validation. For the third, the original hypothesis's central correspondence must be connected to more precise predictions. These distinctions are not intended to abandon the hypothesis, but to clarify which results support which parts.

### 11.5 What Is Not Claimed

This document does not conclude that “creating a cube creates consciousness,” “successful shape classification entails sensation,” “simulating the claustrum creates a self,” or “larger N means stronger consciousness.” These propositions are neither simple rewordings of the original nor automatic consequences of the proposed computational model.

---

## 12. Relationship to Actual Claustrum Research

### 12.1 Scope of This Section

This section does not claim that the original hypothesis has already been validated. The materials below are original papers consulted for this document, not a systematic review covering all relevant literature. “Findings established in the research” are distinguished from “additional evidence required for Hypothesis 5.”

### 12.2 The Original Proposal Concerning Conscious Integration [Literature evidence]

In 2005, Crick and Koch proposed a possible relationship between the claustrum and integrated conscious perception based on its cortical connections, and presented questions for investigating it. The paper describes the claustrum as a thin, irregular, sheet-like structure. This provides background for considering it in consciousness research, but **does not discover preservation of Thought Refraction Line shapes or cubic interpretation**. [R1]

The interpretation cube's cubic structure is therefore not equated with the known external shape of the claustrum. Whether to implement an information space or posit an actual three-dimensional circuit is a separate validation item.

### 12.3 Human Electrical-Stimulation Studies — Differing Observations [Literature evidence]

Koubeissi and colleagues' 2014 single-patient report observed cessation of spontaneous behavior, unresponsiveness, and amnesia during stimulation of an area between the left claustrum and the anterior-dorsal insula. The overlap with adjacent structures and the single-case nature must be retained. This result alone cannot establish a role exclusive to the claustrum. [R2]

By contrast, Bickel and Parvizi's 2019 study stimulated within the claustrum in 5 neurosurgical patients. Sensory experiences and reflexive movements were reported, but no loss of consciousness or subjective awareness was observed, including during strong bilateral stimulation. Because stimulation conditions differed, these studies cannot simply be treated as direct refutations of each other, but they do not support the generalization that “claustrum stimulation always switches consciousness off.” [R3]

Validation of Hypothesis 5 does not selectively cite these two studies. Nor is stimulation-induced unresponsiveness immediately translated into “stored shapes were deleted” or “the interpretation cube disappeared.”

### 12.4 Coordination of Cortical Activity and Sleep [Literature evidence]

Narikiyo and colleagues' 2020 mouse study examined a particular claustrum neuron population and reported that stimulating it affected inhibitory activity across broad cortical areas and the temporal coordination of slow waves. This supports investigation of cortical coordination, but does not demonstrate exact preservation of thought-specific shapes. [R4]

Lamsam and colleagues' 2024 study recorded single-neuron activity in the claustrum of 2 epilepsy patients and reported increased firing and temporal relationships associated with slow waves during non-REM sleep. The paper also specifies limitations of its subjects and sampled sites. These observations are not converted into the proposition that “higher claustrum activity means stronger consciousness.” [R5]

### 12.5 What Hypothesis 5 Must Demonstrate Separately

These studies provide background on claustrum function and consciousness research. Their results, however, do not directly establish the following.

| Claim of Hypothesis 5 | Separate evidence required |
|---|---|
| Thought signals form a single line | A reproducible signal-to-line mapping and its function |
| The claustrum preserves that shape | A content-dependent preserved state remaining after input disappears |
| Preservation retains “exactly the original shape” | Reproduction meeting predefined shape-identity criteria |
| Interpretation occurs in a three-dimensional cube | Evidence that coordinates, neighborhoods, and interior structure actually participate in processing |
| Size is determined by complexity | Predefined complexity and spatial scale, and observed correspondence |
| Interpreted information constitutes experience | Experience-related predictions and validation distinct from functional processing |

---

## 13. Validation Design

### 13.1 Distinguishing Three Stages of Validation [Elaboration proposal]

**Implementation validation** checks whether code operates according to its specified rules. **Functional validation** checks the structure's role in actual tasks. **Hypothesis validation** checks whether the original claims about actual nervous systems and experience are supported.

For example, passing a test in which a read-only store returns the original unchanged does not demonstrate that such a store exists in the actual claustrum. Conversely, an implementation's computational properties can be tested usefully even before the biological hypothesis is validated.

### 13.2 Minimum Implementation Tests [Test model]

| Test | Manipulation or comparison | Result to check | Limits of the conclusion |
|---|---|---|---|
| T1 Shape preservation | Compare data before and after storage and repeated retrieval | Exact retention of the defined original form | Validates only software preservation properties |
| T2 Separation of original and working state | Repeatedly change only the interpretation activation state | Stored shapes remain unchanged | Biological storage is a separate question |
| T3 Distinguishing overlaps | Place two different lines at the same location | Distinguish line membership and connectivity | A display-only 0/1 array may be insufficient |
| T4 Face–solid ambiguity | Compare `L₁` and `L₂` from Section 10 | Do not arbitrarily determine a unique interior from the same two faces | Distinct from classification when the full solid is already supplied |
| T5 Size increase | Change `N` and padding while fixing the originals | Preserve originals without clipping or stretching | Does not mean larger space strengthens consciousness |
| T6 Geometric dependence | Change only position and connectivity while matching activity | Whether the selected model responds to relational differences | The response is a prediction of that model, not an automatic conclusion of the entire original text |
| T7 Removal of interpretation circuit | Compare against a control circuit with matched computation | Which functions actually change | Performance loss alone cannot establish a role in consciousness |
| T8 Incomplete input | Leave some coordinates as `?` | Distinguish unknown from empty space | Do not label arbitrary reconstruction as actual memory |

### 13.3 Testing Whether Three-Dimensional Structure Is Necessary [Mathematical check; Test model]

Storing cube data in a one-dimensional array does not by itself eliminate three-dimensional structure. For example, the following is a one-to-one mapping from coordinates in an `N×N×N` grid to a single array index.

$$
q=x+Ny+N^2z.
$$

If data are moved using this mapping while original neighborhood connections and operations are retained, the same computation remains possible; only the memory notation changes. Thus, a comparison such as “using a three-dimensional array brought the model closer to consciousness than a one-dimensional array” is insufficient.

What must actually be compared is **the operative relational structure**, not **the storage format**.

- A model retaining three-dimensional neighborhoods under identical shape and learning conditions.
- A model retaining the same amount of data but shuffling or removing neighborhood relationships.
- A model reproducing the same neighborhood relationships exactly in a one-dimensional storage format.

The third model matching the first does not refute cubic relationships. Conversely, a difference between the first and second requires further checks of whether it arises from three-dimensional relationships, computational amount, or learning difficulty.

### 13.4 Controls Avoiding Confusion Between Shape and Meaning [Elaboration proposal]

When checking whether outputs change with shape, match total point count, total signal quantity, and number of retrieved lines as closely as possible. Remove identifiers corresponding to semantic labels from the inputs and evaluate untrained shape combinations as well.

In a separate control, keep shapes identical and change only provenance or context. Distinguish predictions of shape-centered models from context-extended models. Adding hidden context after every explanatory failure weakens falsifiability, so additional inputs are specified before testing.

### 13.5 Observational Predictions for the Claustrum Storage Claim [Elaboration proposal]

Biological investigation of the original hypothesis could target the following observations. These are conceptual validation items for professional research, not direct brain-stimulation procedures.

**Content-dependent preserved states:** Do claustrum states associated with particular thought shapes appear that cannot be explained solely by equal input quantity or general arousal?

**Post-input retention and reproduction:** Do relevant states remain after the initial input disappears or reappear as needed? Can this be distinguished from reappearance simply because the same input is received again from another area?

**Predefined shape correspondence:** Can the coordinate and connectivity mapping that converts neural records into Thought Refraction Lines be specified before testing? Are coordinates not distorted after inspecting results to fit a desired line?

**Content-specific changes:** Are changes in preservation, retrieval, or relational interpretation of particular shapes observed separately from changes in overall responsiveness?

Satisfying some of these observations may support the corresponding parts. It does not establish cubic interpretation and the constitution of experience all at once.

### 13.6 Results That Would Weaken the Hypothesis or Require Revision [Elaboration proposal]

| Observation or validation result | Affected part |
|---|---|
| Line shapes repeatedly fail to reproduce under the predefined mapping | The selected shape-formation rule or the claim that the line exists |
| A relay-only account without content preservation better explains the claustrum | The original hypothesis's claustrum preservation claim |
| Systematic shape alteration rather than preservation is observed over an adequate measurement range | The strict “exactly the original shape” condition |
| Interpretation remains functional under the same conditions after three-dimensional relationships are removed | Necessity of the chosen three-dimensional relational model |
| The declared relationship between complexity and size does not reproduce | The adopted size-determination rule |
| Interpretation states defined as completely identical correspond to different experience reports | Sufficiency of the state definition or the proposed experience correspondence |

Because observational failure may arise from insufficient measurement, record detection scope and statistical power as well. However, definitions are not continually changed so that the hypothesis survives every possible outcome. Distinguish revisions to original propositions from revisions to auxiliary designs.

---

## 14. Documentation Contract for Transfer to a Codex Implementation

### 14.1 Scope of Application

This section provides **reference rules** for future implementation. Actual code or files in the existing Codex repository were not inspected while preparing this document, so modules with the names below are not claimed to exist in the current project.

### 14.2 Functional Boundaries [Elaboration proposal]

| Example function name | Responsibility |
|---|---|
| `SignalEpisodeRecorder` | Store signal records segmented into thought units and their boundary rules |
| `ThoughtRefractionEncoder` | Generate Thought Refraction Lines using the selected `Φ` |
| `ClaustrumShapeStore` | Preserve defined shapes exactly and provide reading access |
| `ShapeRetriever` | Select multiple shapes according to declared rules |
| `InterpretationCube` | Manage size, coordinates, faces, interior, and original-specific placement |
| `GeometryRelationReader` | Compute line structure and relationships between lines |
| `InterpretationDynamics` | Process working states through explicit update rules |
| `FunctionalReadout` | Produce actually measurable task outputs |
| `HypothesisExperimentLog` | Record proposal versions, controls, results, and unvalidated claims distinctly |

These names are examples for development convenience, not a list of biological organs or existing code names.

### 14.3 Minimum Data Contract [Elaboration proposal]

Thought Refraction Line data must contain at least **the shape-definition version, coordinate system and units, original point sequence, connectivity information, and original-signal provenance**. Interpretation records must contain **the originals used, placement rules, cube size, interpretation-operation version, functional results, and whether ambiguity is present**.

Values unspecified in the original text remain `unspecified`, or the chosen test value and reason for selecting it are recorded together. Arbitrarily selected values are not stored as biological constants.

Digital shape identity is checked by comparing actual data. Hashes may aid tamper detection but do not replace the definition of biological shape identity itself.

### 14.4 Execution-Flow Pseudocode

The following is **pseudocode** connecting the processes in Sections 8 and 9, not complete code ready to execute unchanged.

```text
input: interpretation request, store, predeclared test settings

1. Check request conditions.
2. Select multiple originals using the declared selection rules.
3. Read each original and compare it exactly with the stored data.
4. Check compatibility of coordinate systems and shape definitions.
5. If input is incomplete:
       preserve the unknown state, or
       construct multiple candidates using declared rules.
6. Determine cube size from complexity and the minimum required extent.
7. Apply placement rules that do not alter the originals.
8. Construct shape inputs while retaining original-specific membership and connectivity.
9. Read shapes and three-dimensional relationships.
10. Calculate the working state using specified update rules and termination criteria.
11. Read actual task outputs, indicating nonconvergence and ambiguity as well.
12. Recheck that stored originals remain unchanged.
13. Record the assumptions, relationships, states, and outputs in the experiment log.

output: interpretation-state record and functional measurements
separate indication: the existence of subjective experience is not assessed from this execution alone
```

### 14.5 Boundaries to Retain in Implementation

Do not automatically generate Boolean values such as “subjective experience confirmed” from performance scores. Retain the original hypothesis's propositions in the documentation, while experimental results indicate what was actually tested, for example `functional validation`, `biological correspondence unvalidated`, or `experience correspondence unvalidated`.

When connecting with other hypotheses in the existing project, also read their numbers, definitions, and conditions unchanged and document correspondence separately. Similar names do not justify automatically applying the existing inverse-network, residual-information, or randomness conditions to this interpretation model.

---

## 15. A Continuous Account of the Elaboration Proposal

**The first paragraph summarizes the original propositions; subsequent paragraphs are functional elaborations proposed in this document.**

All the signals of synapses formed for one thought come together to form a single Thought Refraction Line. Its shape is preserved unchanged in the claustrum. When needed, multiple stored shapes are interpreted within the interpretation cube, a three-dimensional cube whose size is determined by the complexity of the shapes to be processed. The core claim of Hypothesis 5 is that this interpreted information constitutes subjective experience.

In one design elaborating this, a Thought Refraction Line is recorded as a shape with positions and connections, with the shape payload distinguished from its provenance. The claustrum's role centers on preserving that shape without deformation. Functions for distinguishing multiple shapes and selecting those currently needed may be added, but stored content is not replaced by mere addresses or averaged summaries. Separating interpretation working states from preserved originals prevents repeated interpretation from changing the originals.

The interpretation cube is constructed large enough to contain the retrieved shapes. If space is insufficient, the required size is obtained instead of stretching or cutting lines. Each shape is placed according to declared coordinate references, preserving individual line membership and connectivity. Since the two faces in the original text represent only part of the solid, unseen faces and the interior are not arbitrarily completed. If the complete shape cannot be read, retain ambiguous candidates or a state requesting additional information.

Interpretation may first read structures such as points, segments, endpoints, and bends in individual lines, then read distances, overlaps, directions, and connectivity among multiple lines. These relational data affect the interpretation circuit's current state. Circuit update rules and learned connections determine which shapes function together and which interpretation candidates persist. Instead of assuming a separate interpreting observer, specify the actual operations that change processing states according to shapes.

This elaboration does not assume that meaning is automatically inscribed in numerical arrays from the outset. Signal provenance, co-occurring shapes, and learned relationships associate shapes with content. An extension can be tested in which the overall interpretation state varies even for the same line when accompanying retrieved information differs. Self-models, emotion, and language are not newly imposed as mandatory components of every interpretation.

The original proposition that the resulting interpretation state constitutes subjective experience is retained unchanged. At the same time, actual validation separates successful computation involving shapes, evidence about actual claustrum function, and correspondence with subjective experience. Thus, the document neither reduces the hypothesis to a mere metaphor nor extends implementable operations into proof that experience arises.

---

## 16. Undecided Matters and Choices in the Current Test Proposal

| Item | Status in the original text | Default test proposal or handling in this document |
|---|---|---|
| Thought segmentation | Undecided | Record segmentation rules as activity events associated with inputs or tasks |
| Signal-to-line mapping | Only the claim that a line forms | Specify encoding rule `Φ` as a separate version |
| Mathematical form of the line | “One line” | First test one connected point sequence |
| Inclusion of temporal information | Undecided | Separate shape from auxiliary information |
| Storage location | Claustrum | Implement a hypothetical preservation module; validate biological correspondence separately |
| Physical storage medium | Undecided | Retain persistent activity, connection states, and other candidates for comparison |
| Storage accuracy | Exactly the original shape | Exact identity of the defined shape |
| Storage duration and forgetting | Undecided | Specify experimental scope and shortage/deletion policies |
| Interpretation-cube location | Undecided | Test as logical three-dimensional space without fixing an anatomical location |
| Meanings of the three axes | Undecided | Fix and record test coordinate system and units |
| Meanings of 0/1 | Undecided | Use only for geometric occupancy |
| Semantic assignments to the six faces | Undecided | Do not arbitrarily assign senses, memory, or other meanings |
| Size-growth rule | Determined by complexity | Provide a calculation example using shape extent and declared workload |
| Permission for rotation/reflection | Undecided | Not automatically permitted in the basic proposal |
| Placement of multiple lines | Undecided | Record common coordinate references or predefined placement rules |
| Interpretation termination | Undecided | Convergence or a limited iteration count, with nonconvergence indicated |
| Conditions for experience | Claim that interpreted information constitutes experience | Retain the correspondence proposition while distinguishing functional outputs |
| Minimum neuron count or size | Undecided | Do not invent numerical estimates or universal thresholds |

**The test proposals in this table are not a finalized inventory replacing the original text.** If other methods are chosen later, preserve the original propositions and record changes to the test proposals.

---

## 17. References

The `[R1]`–`[R5]` citations in the text refer to the following works. DOIs and verification locations are retained together. Each paper is used only within the scope of what that study observed or proposed.

### [R1] Theoretical Proposal on the Claustrum and Conscious Integration

Crick, F. C., & Koch, C. (2005). **What is the function of the claustrum?** *Philosophical Transactions of the Royal Society B: Biological Sciences, 360*(1458), 1271–1279.

- DOI: `10.1098/rstb.2005.1661`
- Verification location: `https://pubmed.ncbi.nlm.nih.gov/16147522/`
- Literature type: The authors' theoretical proposal and presentation of research questions.
- Citation scope: Structural features of the claustrum and the proposed possible relationship to integration of conscious perception.

### [R2] Single-Patient Report of Stimulation Near the Claustrum and Insula

Koubeissi, M. Z., Bartolomei, F., Beltagy, A., & Picard, F. (2014). **Electrical stimulation of a small brain area reversibly disrupts consciousness.** *Epilepsy & Behavior, 37*, 32–35.

- DOI: `10.1016/j.yebeh.2014.05.027`
- Verification location: `https://pubmed.ncbi.nlm.nih.gov/24967698/`
- Literature type: Single-patient case report.
- Citation scope: Responses observed at the specified stimulation site and under those conditions. Not generalized to a universal function of the claustrum alone.

### [R3] Stimulation Within the Human Claustrum

Bickel, S., & Parvizi, J. (2019). **Electrical stimulation of the human claustrum.** *Epilepsy & Behavior, 97*, 296–303.

- DOI: `10.1016/j.yebeh.2019.03.051`
- Verification location: `https://pubmed.ncbi.nlm.nih.gov/31196825/`
- Literature type: Stimulation study in 5 neurosurgical patients.
- Citation scope: Reported sensory and motor responses and the absence of observed loss of consciousness under those conditions.

### [R4] Mouse Claustrum and Coordination of Cortical Slow Waves

Narikiyo, K., et al. (2020). **The claustrum coordinates cortical slow-wave activity.** *Nature Neuroscience, 23*, 741–753.

- DOI: `10.1038/s41593-020-0625-7`
- Verification location: `https://www.nature.com/articles/s41593-020-0625-7`
- Literature type: Circuit and activity study of a particular claustrum neuron population in mice.
- Citation scope: Cortical inhibitory activity and slow-wave coordination. Not used as direct evidence of thought-shape storage or subjective experience.

### [R5] Human Claustrum Single Neurons and Sleep Slow Waves

Lamsam, L., Gu, B., Liang, M., et al. (2024). **The human claustrum tracks slow waves during sleep.** *Nature Communications, 15*, 8964.

- DOI: `10.1038/s41467-024-53477-x`
- Verification location: `https://www.nature.com/articles/s41467-024-53477-x`
- Literature type: Neural recordings during sleep in 2 epilepsy patients.
- Citation scope: Association of recorded claustrum neuronal firing with non-REM slow waves. No unrestricted generalization to the entire claustrum or the general population.

---

## 18. Revision History

### v1.0 — 2026-09-23

The original text was reproduced unchanged and the current name **Thought Refraction Line** adopted. Added material includes the claustrum's preservation role, three-dimensional representation of the interpretation cube, a test proposal for complexity-dependent size determination, shape-preserving placement, stepwise interpretation, an example computable update circuit, interpretation and indeterminacy of the original two faces, and validation design.

Original propositions, additional proposals, mathematical checks, and literature evidence were distinguished. Storage accuracy was not weakened to approximation, and face-specific meanings, anatomical locations, minimum neuron counts, or experience-generation thresholds absent from the original were not established.

**End of document.**
~~~~~

### S06. Hypothesis 5: Shape-Preserving Reduction and Variable Subdivision

Current definition. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-mature7-20260928-232729/H5_LATEST_SPEC_KO.md>)

~~~~~text
# Hypothesis 5 — Addition of Shape-Preserving Reduction and Variable Subdivision

This document incorporates the user's latest additions of 2026-09-28 into current QHON research. It does not overwrite the original hypothesis in the Downloads folder.

## User's Original Addition

> The Thought Refraction Line is compressed with its shape unchanged. Its size can therefore be adjusted. Its form remains constant, however, and a complex refraction line, once compressed to a smaller size, can be interpreted inside the many relatively small interpretation cubes. Does that mean an interpretation cube has a fixed size? Sizes vary, but, strictly speaking, one could say so. However, the interpretation cube's “degree of subdivision” changes according to the complexity of the refraction line to be interpreted.

## Latest User Definition

- A Thought Refraction Line is one entire structure, including the spatial positions traversed by signals and their branches.
- Shape is preserved while size is adjusted. Interpretation cubes of various sizes may be used.
- What changes according to complexity is the degree of internal subdivision. The cube itself is not assumed to require continual enlargement.
- Common coordinates at the time of storage remain in the original. QHON includes Hypotheses 1–5.

## Implementation Choices in This Study

1. Generate interpretation coordinates through positive uniform scaling and translation. Do not additionally assume that rotation, reflection, or axis-specific nonuniform deformation has the same meaning.
2. Preserve original coordinates, connections, provenance, and complete event records in the QHT2 original. Temporal information is auxiliary information added by earlier implementation. Do not present order-readout performance using it as performance based solely on spatial shape.
3. Calculate the weighted meaning of original line length using original-coordinate lengths, not reduced-coordinate lengths.
4. Distinguish vertex indexing from indexing complete segments. A segment may traverse a cell without a vertex inside it, so endpoints alone do not certify segment distinguishability.
5. Do not merge different line or node identifiers entering the same cell. Record actual intersections, proximity below numerical precision, and insufficient subdivision budgets separately.
6. Adaptive subdivision is a test implementation proposed in this study. It has a maximum depth and cell budget; increasing subdivision may increase computation and indexing costs. Geometric reduction itself does not reduce event counts or required storage bits.
7. The QHS1 test format adds 72 bytes of reduction-size, center, and check information to the existing QHT2 original. It connects preservation with size adjustment; it does not claim a 72-byte saving.
8. The two modules totaling 54 neurons retain a separate provenance format. Nodes from the two modules at identical coordinates remain distinct and are not silently merged into the 27-node format.

## Assessment Scope

Preservation of shape, branching, time, and length weighting; agreement of readout across sizes; subdivision costs; and limits of distinguishability can be validated in engineering terms. Identical spatial segment sets with different temporal orders cannot be distinguished by spatial subdivision alone. Arranging multiple small cubes does not in itself demonstrate semantic creation, semantic combination of memories, the actual storage mechanism of the claustrum, or subjective experience.

Performance tests must distinguish readouts using the original, spatial summaries alone, or auxiliary temporal information. Recording which information produced an improvement is necessary to advance Hypothesis 5 without overinterpreting it.
~~~~~

### S07. Hypothesis 5: Original Layer-Labeled Plane Proposal

Current supplementary proposal. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/H5_LAYER_PROPOSAL_20261003_V1.txt>)

~~~~~text
Hypothesis 5 Supplement — Layer-Labeled Plane Storage

User's original text
Supplementary hypothesis to Hypothesis 5: How to store information to be interpreted in less space. After a three-dimensional interpretation cube interprets a refraction line, decompose the cube into two dimensions. (Follow the lines along which the interpretation cube is subdivided.) Then assume that positions traversed by the line in these two-dimensional interpretation planes are 1 and other positions are 0. Next, combine all the two-dimensional planes into one two-dimensional plane, but there is an important point. For example, suppose the interpretation cube was sliced horizontally: when combining the planes, add a layer distinction identifying which layer each plane's 1 information belongs to. This completes one two-dimensional plane containing three-dimensional information.

Incorporation into research
Combine layer-specific 0/1 information in common XY coordinates, retaining every traversed layer at each position. The first implementation uses uniformly subdivided Z layers. Variable subdivision also requires coordinate boundaries for each layer and cell.

Validation scope
First compare exact reconstruction of discrete occupied space and actual file-byte savings. Preserve the original because movement order, counts, direction, weights, and connectivity are not automatically reconstructed from 0/1 occupancy alone. O04 is a study number; it does not change the three existing auxiliary-hypothesis identifiers or renumber the proposal as Hypothesis 6. Whether to combine it with existing 5A storage research will be assessed after results are obtained.

The end time of the current 12-hour research session is unchanged.
~~~~~

### S08. Hypothesis 5: Line Representation and Continuous Thought Extension

Latest user extension and candidates for subsequent implementation. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/H5_LAYER_LINE_EXTENSION_20261003_V2_KO.txt>)

~~~~~text
Supplementary Hypothesis to Hypothesis 5 — From Layer-Labeled Planes to Lines, and from Connected Lines to Continuous Thought
Recorded: 2026-10-03 (Asia/Seoul)
Status: Records the user's declaration that the conceptual definition is complete. Does not mean implementation or validation of the new line representation is complete.
This document extends H5_LAYER_PROPOSAL_20261003_V1.txt. The three existing derived-hypothesis identifiers (3A1B, 5A, 3A5B1C) remain unchanged.

1. User's original text
Extending the supplementary hypothesis for 5 that I added earlier, the compression principle is applied once more to make it into a line. These lines coming together and connecting are continuous thought. And minor errors arising while interpreting this are within the realm of human nature, but remembering something completely differently is an error and is not allowed. This completes the supplementary hypothesis for 5.

2. Incorporation of the user's definition
Three-dimensional spatial information of the entire Thought Refraction Line → integrated two-dimensional interpretation plane preserving layer identities → line-form representation applying the same preservation principle again → continuous thought represented by connections between lines.
A Thought Refraction Line remains an entire structure including branches under the existing definition. Converting it to a line representation for storage does not mean the original branched structure has become a single path.
A design constraint is added permitting minor variation during interpretation but prohibiting recollection of content completely different from the original memory. Record that the user calls this “the realm of human nature,” but do not use errors themselves as an experimental conclusion demonstrating human nature or selfhood.

3. Implementation proposals — choices not yet fixed
The first implementation candidate preserves all (y, set of traversed layers) entries at each position of line L(x) for the integrated plane P(x,y): L(x)={(y,z) | V(x,y,z)=1}. Multiple rows and layers at one position are not overwritten by a single value. Traversal using linear addresses s=x+Nx*y is another option. Adoption will follow comparisons of size and reconstruction accuracy.
This is a finite-precision line representation containing row and layer identities. Arbitrary three-dimensional information is not assumed to be automatically reconstructable from the geometric shape of a line alone. Encoding information in the line's own bends requires additional encoding rules, coordinate precision, and decoding rules.
Storage of continuous thought preserves thought-unit boundaries and order, and the identities of preceding and following connections. Successful storage of these connections and successful thought functions that actually carry context forward are evaluated separately. Actual connection rules and learning methods are subsequent implementation tasks.

4. Proposed preservation contract and tolerances
Storage/reconstruction layer: Exactly reconstruct occupancy at the specified resolution, the coordinate system, and layer and row identities. Preserving the original record's order, direction, repetition count, branching connectivity, weights, and order between thoughts also requires separate structural information. The complete original record cannot be reconstructed from 0/1 occupancy alone. Preserve the original records.
Interpretation layer: Distinguish stored evidence from interpretation results. A candidate minor variation is an expressive difference that leaves the task's core facts, relationships, and judgments unchanged. Define what is core and the permitted range for each task before evaluation. Different expressions may mean the same thing, whereas a one-character negation or a change to one connection can reverse meaning; size and distance alone do not establish that a variation is minor.
Candidate major errors: Changes to remembered objects, actions, goals, causality, or temporal order; mixing different memories; adding nonexistent events; losing core branches. Uncertainty or failed preservation validation is handled by rereading the original or deferring judgment, not by declaring reconstruction successful.
Store new interpretations or creative results as derived results rather than overwriting original memories of past events. Do not classify errors as human nature and exclude them from accuracy metrics. Artificial noise injection is not adopted as a default behavior.

5. Assessment criteria for compression and validation
A 3D→2D→line transformation alone does not guarantee fewer stored bytes. Because row and layer identities and connection information add costs, measure whether sparsity and repeated patterns can be exploited. Comparison costs include payload, indexes, coordinates and precision information, auxiliary order and branching information, and reconstruction code.
Existing O04–O07 studies compare occupancy reconstruction and storage size for layer-labeled planes. They are not retroactively used as implementation evidence for this line representation or continuous thought. In the complete O06 actual-record bundle, selection-based storage was 2.47% larger than baseline. No current claim is made that the new representation improves compression.
Candidates for follow-up validation:
- Compare 3D→2D→line→2D→3D round-trip equality and total storage costs for the existing 432 occupancy representations.
- Preserve distinctions among records with identical occupancy but different order or branching, overlapping layers, repeated traversals, and empty space.
- Exactly reconstruct unit boundaries, order, and original connections after connecting multiple thoughts.
- Test task-specific permissible variation/major errors by separating small coordinate changes from changes in negation, goals, or causality. Fix answers and criteria beforehand and distinguish development data from independent validation data.
This inventory is a validation plan; recording it in this document is not counted as completion of new experiments.

6. Scope
The user's supplementary proposal for Hypothesis 5 is recorded as a completed concept as stated above. Specific line encoding and connection implementation, permitted-variation criteria, semantic preservation, and compression benefits remain to be validated. The hold on GNN construction and the existing research end time are unchanged.
~~~~~

### S09. Registry of Formally Registered Derived Hypotheses

Current registry: historical statuses within it are distinguished by date. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/QHON_파생가설_등록부.md>)

~~~~~text
# QHON Derived-Hypothesis Registry

Registered: 2026-10-01 KST. Three derived hypotheses selected in the 9-hour study are added alongside QHON's original Hypotheses 1–5. This addition registers design and research hypotheses. Their validation statuses are recorded below.

## Latest Research Status — 12-Hour Study V13

Research resumed at 2026-10-03 11:12:23 KST. The scheduled pause is at 23:12:23 KST the same day; actual execution status follows the campaign's CONTROL.json and registered processes. Historical records below describe their status at the time. Original Hypotheses 1–5 and the three derived identifiers are retained.

- M38: In the remaining 10 existing structures, both initial reinforcement and control retained 30/30 learned items. Across all 12 existing structures including vulnerable cases, initial reinforcement achieved 36/36 and control 34/36; confirmation on new M39 inputs is ongoing.
- M41: After goal changes, unconditional restoration of historical records achieved 0/24 for the current goal, while checking an external goal version retained 24/24. This shows efficacy of an external label, not autonomous goal recognition.
- User's layer-labeling addition to Hypothesis 5: Exact spatial-occupancy reconstruction was validated in 432 grid representations derived from actual records and 90 synthetic shapes. Including all code and indexes, the actual-record bundle was 21,343B for the existing method and 21,870B for selection-based storage, so no saving was confirmed for the current bundle. Retain it as a selectable candidate when sparsity and repetition are suitable.
- M43: Pilot validation comparing rehearsal decisions with actual observation costs is ongoing. M42's empty-stimulus-list API error and cost records are preserved; only that call was corrected.

[Interim research record 13](campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V13.txt) · [Consolidated layer-labeling findings](campaigns/qhon-continuous-20261002/H5_LAYER_FINDINGS_O04_O07_KO_V2.txt)

## Previous Validation Status — Paused at 10 a.m. on 2026-10-03

The registration text below is a historical record. Identifiers, parent rankings, and propositions are retained unchanged.

- 3A1B: External policies using resources and goal versions, and conditional response-latency prediction, were validated. The simple M23 threshold achieved the same classification accuracy. An internal neural self-model and actual decision benefits from prediction remain unvalidated.
- 5A: O02/O03 exactly reconstructed 108 original records including temporal order and reduced the package including code and index by 22.06% relative to V8. This is not a compression ratio for complete neural states or semantics.
- 3A5B1C: M18A confirmed selective protection through release inhibition at specified source positions. Electrical-inhibition supplementation showed distinct side effects in M34, reduced through the limited write window in M36. The complete proposition of jointly preserving new and old memories and automatically selecting necessary paths remains incomplete.

[Latest evidence record 12](campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V12.txt)

## Identifier Rules

The user-specified `nA` and `nApBqC` formats are applied. Numbers are original-hypothesis numbers; A, B, and C rank their influence on the derived hypothesis. For example, `3A1B` means Hypothesis 3 is the first contributing original hypothesis and Hypothesis 1 the second. A single original parent is written as, for example, `5A`.

Rankings were assessed by **direct design contributions to the finally selected proposition**. A, B, and C are not measured contribution percentages or hypothesis-validation grades. Shared cost constraints, comparison tools, and future integration relationships are identified as auxiliary relationships. Auxiliary relationships alone do not add original hypotheses and lengthen identifiers. Existing study numbers F08, F12, and F11 are retained as aliases for tracing raw data.

| QHON derived identifier | Existing study number | Derived hypothesis | Ranking of direct contribution | Current validation status |
|---|---|---|---|---|
| **3A1B** | F08 / X02 | Prediction by reusing shared action–request response rules | Hypothesis 3 → Hypothesis 1 | Conditional improvement in an external predictor confirmed. Gain in frozen action-selection evaluation: 0 |
| **5A** | F12 / SC-H5-01·CR01 | Lossless archiving using relationships in the entire original form | Hypothesis 5 | Exact reconstruction and storage savings confirmed for tested whole-S records. New compression of full native states increased size |
| **3A5B1C** | F11 / X04·CROSS-MI01 | Temporary release inhibition in neural feedback paths during new learning | Hypothesis 3 → Hypothesis 5 → Hypothesis 1 | Memory-protection efficacy unvalidated. Selective old/new memory and location-specific intervention APIs are needed first |

## 3A1B — Prediction by Reusing Shared Action–Request Response Rules

**Proposition:** When actions share transmission and inhibition rules, learning the common rule from publicly available commands, intervention requests, and past outcomes can improve prediction of action×request combinations not yet executed. If sharing breaks down, transfer of past experience may increase errors, so uncertainty is retained over shared and separate models.

**Basis for the contribution ranking:**

1. **3A:** Hypothesis 3's distinction between action potentials and transmitter release, and its release inhibition and recovery, provide the core conditions changing action outcomes.
2. **1B:** Hypothesis 1's functional connections and transmission paths provide the structure through which commands can reach outcomes. This does not mean the original Rd and growth mechanisms themselves have been demonstrated.

**Auxiliary relationships:** Hypothesis 4's coordinate correspondence can be used in comparison conditions but is not a direct mechanism of this prediction proposition. Hypothesis 2's resource ledger constrains physical execution. Hypothesis 5's full paths are candidates for future observation extensions; whole-S was not supplied to this minimal external predictor.

The learner is not given actual gate states, path names, or future outcomes. Prediction from commands, requests, and past observations is distinguished from identification of a unique physical cause. Current Bayesian model averaging is the same method as ordinary Bayes under the same conditions. B's baseline and sham had already been experienced; the only unused combination was B×active. Prediction error decreased when sharing held but increased in a counterexample violating sharing. Real-time online action control and an internal neural self-model have not yet been validated.

**Follow-up assessment:** Compare simple tables and general models under the same observation, learning, computation, and storage budgets. Narrow the scope if there is no actual decision benefit or if errors in the sharing assumption outweigh the benefit.

## 5A — Lossless Archiving Using Relationships in the Entire Original Form

**Proposition:** If full Thought Refraction Line records contain reproducible relationships between firing and transmission, storing exact references and residuals can preserve originals while producing a complete package smaller than ordinary direct archiving. Savings may disappear when the relationships are weak or reconstruction costs increase.

**Basis for the contribution ranking:**

1. **5A:** Hypothesis 5's whole structure S, common coordinates, and original-form preservation directly determine the storage target and reconstruction conditions. Reducing the displayed size of a shape and reducing file bytes are separate processes.

H1–H4 provide the background generating the simulated records to be stored, but are not included as additional directly contributing original hypotheses for this archiving proposition. This is an application of known references, predictive residuals, and general compression to QHON.

SC02 reduced the complete package by 28.28% on the tested development records, with 320 exact queries. Applying the same codec to SC03's four existing record groups confirmed savings of 0.89–9.24% in each and 268 exact queries. The declared targets are parsed-JSON whole-S and the occurrence index. These results are not extended to new independent environments, complete neural states, or the truth of memory content.

The size increase from dictionary compression, CR01's storage savings and large query latency, CR02 native replay failing to return within 30 seconds, and the increased size of ND01 native repackaging and filtering are preserved together. The current recommendation is limited to D2 archiving of the tested whole-S.

**Follow-up assessment:** Compare exact reconstruction, total storage including code, indexes, and validation, and query deadlines on new records. Narrow the scope if a general codec, checkpoint, or cache at the same cost performs better.

## 3A5B1C — Temporary Release Inhibition in Neural Feedback Paths During New Learning

**Proposition:** Where old and new memories are distinguishable and new learning causes actual interference, inhibiting release in a specified neural feedback path only during learning may better retain joint correctness of both memories after inhibition is removed. Feedback means re-entry of neural signals and is distinguished from return of molecule A in Hypothesis 2.

**Basis for the contribution ranking:**

1. **3A:** Hypothesis 3's release inhibition and recovery provide the core mechanism to manipulate for memory protection.
2. **5B:** Hypothesis 5's whole-path, branching, and rejoining records provide data for deciding where and when to inhibit. Temporal records are auxiliary information added by existing implementation and are not presented as a function of spatial shape alone.
3. **1C:** Hypothesis 1's connection layout and functional paths provide the structural conditions for interference and feedback.

**Auxiliary relationships:** Hypothesis 2's local material and resource ledger constrains intervention costs. Hypothesis 4's inversion is not essential to this proposition.

Protection efficacy has not currently been confirmed. The original C5 and subsequent C2.5 parent tasks failed to read the two memories selectively. A release gate for all outgoing connections of a fixed sensor differs from a gate for an arbitrary source or single terminal; location-specific intervention APIs must come first. Release blockade is not weight-write locking. Already scheduled events are not deleted to cancel past transmission.

**Follow-up assessment sequence:**

1. Actually distinguish old/new memories under identical read conditions.
2. Distinguish damage to old caused by new learning from a stimulation control without learning.
3. Validate location- and time-specific release interventions from the same parent state.
4. After all temporary gates are removed, compare joint old+new correctness against ordinary write protection, context control, and resource policies under the same budget.

Without the first or second requirement, do not enter the protection-efficacy stage. Retaining only old while failing to learn new, or requiring a gate throughout reading, does not qualify as success of this proposition.

## Registration Scope Within QHON

Original Hypotheses 1–5 and the three derived hypotheses above are managed together. They are not renumbered as new original Hypotheses 6–8. Design registration, code implementation, and experimental validation are separate statuses; an integrated system combining all three candidates is not yet implemented. F numbers and audit hashes in existing research documents remain raw-data identifiers.

## Raw Data and Decision Evidence

- [9-hour study final report](campaigns/qhon-hypotheses10-20260930-204338/QHON_9시간_파생가설_최종보고서.md)
- [Final decision selecting three hypotheses](campaigns/qhon-hypotheses10-20260930-204338/FINAL_SELECTION_DECISION_V1_KO.md)
- [F-number system in the final candidate registry](campaigns/qhon-hypotheses10-20260930-204338/CANDIDATE_INVENTORY_V11.json)
- [Engineering revision of Hypotheses 1–4](campaigns/qhon-hypotheses10-20260930-204338/sources/H1-H4-explicit-engineering-revision__HypothesisNeuronNet_V3_QHON.md)
- [Latest user additions to Hypothesis 5](campaigns/qhon-mature7-20260928-232729/H5_LATEST_SPEC_KO.md)
- [Distinguishing parent and auxiliary relationships](campaigns/qhon-hypotheses10-20260930-204338/PARENT_DEPENDENCY_AUDIT_V1_KO.md)


## 2026-10-02 Follow-Up Evidence Update

The validation statuses at registration above are preserved, with subsequent functional-research results added below. Identifiers, parent-influence rankings, and propositions remain unchanged.

| Identifier | Follow-up evidence | Remaining limitations |
|---|---|---|
| 3A1B | Neural outcome memory was connected to action selection, feedback, and error correction. In 14 M05 conditions, a low forgetting coefficient also retained existing action and memory performance. | Observations, teachers, and selection rules are external programs. Superiority over a public-record baseline with the same information, and an autonomous self-model, remain unproven. |
| 5A | Exact byte archiving and single-file recovery were validated for 112 actual combined states in R09/R10. Including recovery information, storage was 56.55% smaller than full storage. | Effects of general-purpose checkpoints, residuals, and recovery information. Not converted into semantic compression or biological memory. |
| 3A5B1C | New learning and legitimate modification after protection were validated in restricted tasks. Late release blockade alone failed; source-specific write-window control supplemented it. | Ordinary write protection achieved the same result, and intervention locations and times were externally specified. Universal protection efficacy and unique superiority remain unproven. |

Readout on new structures improved from N01's 904/930 to 930/930 in the N02 development retest. Validation on new independent inputs is not yet complete. This does not imply maturity of all hypotheses, human similarity, or self-formation.

[Machine-readable follow-up evidence](QHON_DERIVED_HYPOTHESES_EVIDENCE_V2.json), [Current interim research report](campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V2.md), [Previous functional research final report](campaigns/qhon-functional12-20261001-183911/QHON_FUNCTIONAL12_FINAL_REPORT_KO.md).

## 2026-10-03 Follow-Up Evidence Update

Earlier statuses are preserved as records of their respective dates. Identifiers and propositions are retained.

- 3A1B: M10 reduced unnecessary relearning by rechecking after a one-time observation omission, and M11 demonstrated the efficacy of re-observation and replanning after goal switching on six structures. The controller, teacher, and goals are external; this is not validation of spontaneous goal generation or a self-model.
- 5A: C02 reduced archived data by 54.15% while exactly recovering original bytes of 12 long-running states. This is evidence of general-purpose lossless storage, not semantic compression of shape itself or memory creation. Existing files were not deleted. Initial-storage application N07 is ongoing.
- 3A5B1C: M09 relearned a target memory while preserving nontarget memories and weights. This result of external write-window control is distinct from a unique effect of release inhibition.

Following the N04 development revision, N05 matched 930/930 assessments under prefixed conditions on six new-input structures. N06 is currently extending the position range within the same six structures. The 930 assessments are not counted as 930 independent structures.

[Progress record 6](campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V6.txt)

## 2026-10-03 Evidence Update 7

Existing identifiers and propositions are retained. Earlier records preserve their statuses at the time.

- 3A1B: M12 identified limits of repeated checking and multiple observations. Persistent common errors are not resolved by consensus alone. Re-querying using actual release state in M13 is undergoing full validation.
- 5A: N07 reduced checkpoint archive size by approximately 56.38% while preserving original bytes exactly in new storage. This is general-purpose lossless storage, not evidence of semantic shape compression.
- 3A5B1C: Across six structures, N08 validated that actual transmitter influx and release inhibition blocked target-memory learning, and that retrying with an external teacher after inhibition cleared restored learning. N09 validated corresponding states under static whole-system central inversion. Spontaneous self-regulation remains a separate task.

[Progress record 7](campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V7.txt)

## 2026-10-03 Evidence Update 8

Existing identifiers and propositions are retained.

- 3A1B: In M14 and M17, rechecking observed actual inhibition and resource shortage reduced unnecessary or ineffective learning. Deferral after maximum waiting remains unresolved. Control policies and teachers were externally defined.
- 5A: Omitting duplicate compression in C05 retained exact byte reconstruction in the storage API. This is distinguished from evidence of semantic compression or thought creation.
- 3A5B1C: After separating resource depletion, M16 confirmed weight protection through release inhibition and access after recovery. Automatic selection of paths to protect has not yet been demonstrated.

[Progress record 8](campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V8.txt)


## 2026-10-03 User Addition — Layer-Labeled Plane Storage for Hypothesis 5

This addition combines 0/1 passage information from subdivision planes while retaining all traversed layer numbers at each XY position. Original wording and implementation assumptions were preserved separately. The three existing auxiliary-hypothesis identifiers and parent rankings remain unchanged.

O04 confirmed exact reconstruction of 432 discrete spatial-occupancy representations. Layer-list savings were conditional; after general compression, some were larger than the baseline bit array. Preservation of spatial occupancy and lossless archiving of complete order and connectivity records are separate assessments.

[User's original text and scope](campaigns/qhon-continuous-20261002/H5_LAYER_PROPOSAL_20261003_V1.txt) · [First implementation findings](campaigns/qhon-continuous-20261002/H5_LAYER_FINDINGS_O04_KO.txt)

## 2026-10-03 User Extension — Line Representation and Continuous Thought for Hypothesis 5

The integrated plane preserving layer identities is represented again as a line, and connections between lines are defined as continuous thought. The user explicitly stated that this completes the concept of the supplementary hypothesis for Hypothesis 5. This is distinguished from completed implementation and validation; the three existing derived identifiers are retained.

Original-memory reconstruction accuracy is separated from minor interpretive variation. Memory errors altering core facts, relationships, or order are not permitted. Errors themselves are neither treated as empirical evidence of human nature nor excluded from accuracy evaluation. Additional compression benefits and semantic preservation of the line representation remain unvalidated.

[User's original text, extended definition, preservation contract, and follow-up validation](campaigns/qhon-continuous-20261002/H5_LAYER_LINE_EXTENSION_20261003_V2_KO.txt)
~~~~~

### S10. Decision Selecting the Three Derived Hypotheses

Evidence at the time of selection. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-hypotheses10-20260930-204338/FINAL_SELECTION_DECISION_V1_KO.md>)

~~~~~text
# Final Decision Selecting Three Hypotheses

From the 17 registered proposals and 13 deduplicated candidate families reviewed, **F08, F12, and F11** are selected as the final research candidates. Within this review's scope, this combination was judged most useful for QHON's goals of memory, prediction, and accurate archiving. It does not mean completion of the three functions or proof of the three hypotheses. The selection is frozen during the document-validation stage of the 9-hour interval and recorded separately from the interval's end and publication of the final report.

## Criteria Applied

1. Can the starting principles among the five original hypotheses and the newly added assumptions be specified?
2. Are observable results and refutation or stopping conditions concrete?
3. Does the candidate address an actual current QHON bottleneck or an important next function?
4. Can it be compared with strong general controls granted the same information, resources, code, and evaluation access?
5. Can it be validated while preserving raw data, historical failures, and implementation costs?
6. Is it more than a renaming of existing rules? Does it allow useful applications of known principles without claiming to be a world first?
7. Does it avoid counting the same question or evidence twice across the final candidates?

No scorecard was fitted after the fact to create fictitious probabilities or precise rankings. There is no quota requiring equal selection from all original hypotheses. Peer reviewers knew earlier candidate rankings, so selection was not by anonymous or blinded voting or majority vote of independent samples. The reasons below are adopted as the root's final judgment.

## F08 — Prediction by Reusing Shared Action–Request Response Rules

**Selected proposition:** Encoding transmission and inhibition rules actually shared by actions in a small predictive model can use previously observed public experience to improve prediction of unused action×request combinations. Because breakdown of sharing can cause negative transfer, uncertainty is retained over shared and separate models.

The starting points are H1's functional connections and H3's distinction between AP and release. Observation and intervention access, and sharing of rules between actions, are separate assumptions. Actual physical gate effects were confirmed, and conditional benefits and counterexamples in external prediction from public command/I/O histories were computed and audited. However, current BMA is the same method as ordinary Bayes, and the frozen offline action-evaluation gain is 0. Under valid sharing, a simpler fully shared table performed better. A learned internal neural self-model, unique causal identification, or selfhood is not claimed.

This candidate is retained because it explicitly defines which observations support prediction in the current data and where transfer fails. The next priority question is whether useful decision benefits or necessary accuracy gains over general models remain on unused conditions under actual task costs. If this cannot be demonstrated, narrow its functional scope.

## F12 — Lossless Archiving Using Relationships in the Entire Original Form

**Selected proposition:** Storing repeated firing–transmission relationships in complete refraction-line records as exact references and residuals can preserve originals while producing a complete service package smaller than frozen general direct archiving. Gains may disappear when relationships are weak or additional reconstruction costs are high.

This directly addresses H5's whole S, common coordinates, and original-form preservation. Among the current selections, it has the most concrete storage-cost evidence. SC02 saved 28.28% on the same development records; SC03 saved 0.89–9.24% in each of four existing record groups, with all queries exact. This is not a universal win rate across independent distributions.

The negative result of SC01's dictionary method, CR01's then-reported recomputation savings and large latency, CR02's full-native replay timeout, and increased size from ND01 direct-native repackaging and filtering are retained together. In particular, ND01 retrieved originals correctly in 3/3 cases, but both new methods were larger. Differences in V8 metadata representation also prevented isolation of filtering's causal contribution alone. The current recommendation is therefore D2 limited to validated whole-S, while D0 remains the control for direct full-native archiving. This is not a new general compression law or an achievement in semantic interpretation, memory correctness, or long-term preservation.

This candidate does not substitute for the other two candidates' learning performance. Its utility is accurate archiving and retrieval of declared records at limited cost. Narrow its scope if stronger general methods at the same cost perform better on new records or if query conditions are not met.

## F11 — Temporary Release Inhibition in Neural Feedback Paths During New Learning

**Selected proposition:** In a circuit first shown to have valid old/new memories and actual interference from new learning, restricting release from a specified neural feedback source only during learning may better retain joint correctness of old and new memories after the restriction is removed.

This combines H1's layout, H3's release inhibition, and H5's temporally ordered path and rejoining observations. Feedback here differs from return of A molecules in H2. Further requirements are the assumption that return is disruptive, the assumption that permitted past observations can select targets and times, and actual location-specific gates and cost contracts.

There is no efficacy evidence yet. Original C5 and subsequent C2.5 parent cases could not read the two targets selectively, and the 32 teacher swaps were not run. Even valid memories eligible for protection had not been admitted. The current API gates all outgoing connections of a fixed sensor; arbitrary source/terminal location controls are not immediately available. Release gates differ from weight-write locks. Large-scale interference-protection runs are not performed while concealing these burdens.

It is retained third because the current goal gives high value to **first resolving the bottleneck in acquiring and protecting selective neural memories**. This does not mean it was more effective than F13. Its first decision is whether selective parent cases and fair location-specific interventions can be obtained at low cost; if not, do not enter the protection-efficacy stage. If ordinary write protection, context control, or resource policies perform as well or better, the need for special path protection diminishes.

## Comparison with Other Candidates

F13 is a valid preliminary hypothesis for finding new action programs earlier within a finite proposal budget. Currently, however, it lacks reachable goals, development data, and a shared predictor, and its frozen score does not use whole-S geometry itself. A counterexample in which success support and transmission witnesses become identical also remains. This is not a measured result demonstrating F13's impossibility or absence of benefit. Priorities may be exchanged with F11 if parent cases are admitted and concrete evidence supports outperforming strong proposal/search controls with identical information.

F03 asks about the separate utility of reading order under actual shared resources, but currently lacks parent cases with the same two valid memories. F02/F06 failed to obtain positive parent cases in the narrow primary readouts executed. F07 lacks cost evidence exceeding a strong small exact-lookup control on the 27-position grid. Remaining H1/H2-centered candidates entail relatively larger additional assumptions and data burdens concerning transmission media, growth, binding selectivity, and priming. They were not excluded merely because they were not world firsts or had familiar names.

The three selections require different outcomes: prediction, archiving, and interference protection. Current external predictive states, whole-S/native archiving, and unadmitted neural memories are not added into a single integrated intelligence. The number of items demonstrating 98% similarity to human thought, emotion, and selfhood or demonstrating consciousness is 0; this study did not create an agreed numerical scale for evaluating that similarity.

Raw data and assessment evidence follow the individual audit links in the final report and latest candidate registry. Time spent implementing, running, and auditing experiments reduced opportunities to generate and review new hypotheses. The number of forgone candidates was not measured and is not quantified.
~~~~~

### S11. Early LI-QRNG and Four-Hypothesis Research

Historical results and scope of applicability. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-20260922-085026/FINAL_REPORT.md>)

~~~~~text
# QHON 3×3×3 — Final Report of the 5-Hour Study

Written: 2026-09-22T13:53:52.529Z (UTC)

Experimental interval: **2026-09-22 17:50:26–22:50:26 KST, 5 hours**. Includes preparation, code improvements, and validation. The experiment runner terminated at the scheduled time; only result auditing and document organization followed.

## Meaning of the Results

**Accuracy-preserving compression and computational improvements were obtained. No conclusion was reached that all four hypotheses hold in actual brains.** This experiment compared conditional validity, accuracy, and efficiency in code specifying the hypotheses. The space contains 27 positions, with a separate set of 27 states added when the inversion layer is enabled.

- Completed job IDs: **54,704**. Condition-level results: **35,845,362 rows**. Includes repetitions of the same input under different settings, methods, and numerical time steps. Not a count of independent samples.
- Original ANU data: **129 blocks, 264,192 B**. Actual quantum-random responses were preserved. No PRNG substitution or expansion.
- Structural-check errors in primary job records: 0; 8 interrupted jobs at the deadline (DEADLINE_DURING_JOB) and 4 forced-termination records; other primary execution failures: 0. The original failure-event count of 8 is also preserved in the original ledger. Scientific counterexamples, precheck failures, and correction records were preserved separately.
- Completed-result gzip: 1.963 GiB. Total folder size including sources, analyses, and logs is larger.
- Final main-runner queued jobs: 18,348. Stopped according to the time budget. This does not mean every possible experiment was completed.

## The Four Hypotheses

| Hypothesis | Assessment |
|---|---|
| H1: Direction-based growth | Implementable under finite-distance, lifetime, and stabilization conditions. The origin of a bent path cannot generally be recovered from final entry direction alone; additional path information is required. Physical existence of Rd remains unvalidated. |
| H2: Capacity limits and return | A10→A9+B1 exchange is implementable with atomic insertion/return and a complete ledger. Insertion waits if return is blocked. Position alone does not guarantee selection that always ejects only A. |
| H3: Release inhibition and memory | Electrical firing and release inhibition validated separately. Memory readout depends on structure, stimulation, and cellular adaptation; general memory formation remains unconfirmed. |
| H4: Internal inversion layer | Central inversion and direction preservation are implementable. Delayed replication and role exchange require synchronization barriers preventing command loss. Not evidence of consciousness or the unconscious. |

In the latest tally, independent checks of chemical time records found 0 inhibition violations, and command errors under the synchronization-barrier condition affected 0 edges. There were 4,644 naive-replication cases in which commands disappeared even though the two layers matched. [Evidence](reports/SYNTHESIS_1790085160230.json)

## Accuracy and Memory

- HH time-step-halving checks: 3,891 of 3,902 conditions passed; 11 awaiting further refinement; 0 unresolved at the configured maximum precision. Criteria are matching firing counts, maximum voltage difference within 0.1mV, and firing-time difference within 10µs. [Evidence](reports/HH_QUALITY_1790085126788.json)
- Shared readout transferred to other graphs (V4): **50.00%**, 25 matched pairs. [Evidence](reports/MEMORY_HOLDOUT_1790085124595.json)
- Readout with new stimuli on fixed graphs (V6): **62.03%**, 15 validation random-number blocks and 2,880 matched pairs. These are different tasks and are not compared as a straightforward performance improvement. [Evidence](reports/MEMORY_V6_1790085128371.json)
- The V6 readout was frozen on development data and not subsequently modified. Conservative block-level 95% interval: 26.97%–97.10%. Episodes within the same block or graph were not counted as independent samples.
- HH input-history comparison: of 576 starting conditions, 563 converged, 0 awaited refinement, and 13 remained unresolved at the maximum stage. This measures neural-state distinguishability, not trained-readout accuracy. [Evidence](reports/HH_MEMORY_SUMMARY_1790085124696.json)

### Additional Comparison Removing Only Post-Stimulus Adaptation

Of 48 conditions with default unidirectional connections (reciprocal=false), 48 completed, 48 converged, and 0 failed to converge. Negative-control violations: 0; structural-check errors: 0. Records before stimulus termination were confirmed identical to the original model. [Evidence](reports/MAINTENANCE_SUMMARY_1790085124146.json)

| Post-stimulus transmission | Settings comparable at 320ms | Distinguishable with adaptation retained | Distinguishable with adaptation removed | Disappeared after removal |
|---|---:|---:|---:|---:|
| Off | 6 | 2 | 0 | 2 |
| On | 6 | 2 | 0 | 2 |

This comparison isolates slow adaptation's contribution during maintenance in that unidirectional setting. Results from three graphs are not generalized to all 576 bidirectional conditions or all neural networks. [Scope of additional experiments](EXTRA_MEMORY_SCOPE.md).

### 1-Second Observation

Of 15 conditions with default unidirectional connections (reciprocal=false), 15 completed, 15 converged, and 0 failed to converge. External stimulation ended at 102ms. [Evidence](reports/RETENTION_SUMMARY_1790085124116.json)

| Observation time | Subsequent transmission | Evaluable settings | Distinguishable settings |
|---|---|---:|---:|
| 320ms | Off | 6 | 2 |
| 320ms | On | 6 | 2 |
| 500ms | Off | 6 | 2 |
| 500ms | On | 6 | 2 |
| 750ms | Off | 6 | 0 |
| 750ms | On | 6 | 0 |
| 1000ms | Off | 6 | 0 |
| 1000ms | On | 6 | 0 |

Differences smaller than the detection criterion are indistinguishable in that neural readout. This does not mean that all history in every internal state has completely disappeared.

## Compression and Speed

| Improvement | Result | Scope to note |
|---|---|---|
| Exact harmonic-field cache | Warm repeated cache: 19.24×; new batches: 1.58×; reset per graph: 1.02× | Benefits vary with repeated states |
| Frontier-candidate cache | Data size reduced 56.55%; warm processing 3.11× relative to previous cache | JS object costs excluded; queue metadata separate |
| HH buffer reuse | Identical state and firing records; paired-measurement median 2.85× | Equations and computation order retained |
| QHF1 batching | 105,111 paths; 52.28% smaller than individual frontiers; 64.56% smaller than previous byte batching | Not compression of complete neuron/synapse states |
| Inversion-delta transmission | 960 conditions identical; connection-event information 729→2 B; median CPU improvement 4.69× | Synchronization-barrier condition; common metadata excluded |

The final tally for reading only the required actual QRNG bits is below. This saves consumption rather than compressing raw random numbers. [Evidence](reports/ENTROPY_SUMMARY_1790085124463.json)

| eta | ANU blocks | Mean bits per edge | Path-count ratio for the same randomness quantity | Selection-control errors |
|---:|---:|---:|---:|---:|
| 0.5 | 129 | 4.554 | 6.962× | 0 |
| 1 | 129 | 4.308 | 7.341× | 0 |
| 2 | 129 | 3.919 | 8.097× | 0 |
| 4 | 129 | 3.484 | 9.125× | 0 |

In a separate 8-block check carrying leftover bits between blocks, path counts increased by a further approximately 4.48–5.01%. Bit ranges and paths matched a baseline concatenating all inputs at once. Speed multipliers of individual stages are not multiplied and presented as overall acceleration.

The reproduction example stored 3,849 paths in 14,077 B and reconstructed every branch and order identically. [Usage](CANDIDATE_USAGE.md), [Evidence](reports/CANDIDATE_DEMO_1790082214616.json).

## Errors and Counterexamples to Preserve

- Even approximate harmonic-field calculations with tolerance 1e−10 produced two different paths. Setting residual positive values in regions disconnected from the destination to 0 corrected those two cases but does not guarantee general equivalence. The exact-solution candidate was retained.
- In 269,568 additional correction-comparison conditions, incorrect paths at 1e−4 with eta=0.5 decreased from 220→90 but remained. [Correction results](reports/ZERO_COMPONENT_VALIDATION.json).
- The initial inversion-generation timing implementation and the adaptation-check time-index issue were corrected. Failed code and logs were retained, and reasons for correction were documented in PHASE records.
- The initial oversized ANU request failure was preserved. Subsequent collection used 1,024 uint16 values and a 125-second interval after each response. ANU provides random numbers, while neuron calculations run on this computer's CPU.

## Resources, Integrity, and Preservation

The maximum recorded combined working set of the main process and collector was 2.89 GiB. This figure does not include all separate analysis processes and is not a minimum requirement for 27 neurons.

Audit: [Passed](reports/AUDIT_V2_1790085159588.json), 2026-09-22T13:52:39.588Z, 54,704 jobs. Each audit rehashed compressed result files; detailed row validation was reused for identical hashes already validated. New files, original QRNG responses, and code hashes were rechecked.

The user's existing Neuron Set and original documents were preserved. QHON retained stage-specific code and assumptions, actual ANU responses, results, revision history, and reproduction examples. Detailed source and assumption explanations follow [Interim detailed interpretation](RESEARCH_FINDINGS.md); the latest figures and assessments follow this report.

## Research Needed Next

1. First check unresolved nonconvergent conditions and agreement with other integration methods.
2. Increase validation on independent random-number blocks and new graphs while retaining the frozen readout.
3. Elaborate the actual mechanism selectively returning only A and the physical definition of Rd.
4. For larger cubes, separately measure path formats, cache growth, and memory for complete cell states. Do not extrapolate these small-path compression ratios to entire large neural networks.

References: [ANU QRNG](https://qrng.anu.edu.au/), [ANU API documentation](https://qrng.anu.edu.au/contact/api-documentation/). Provenance of actual responses and transformations was verified; the generator's physical quantum nature was not independently certified.

Additional-experiment audit: Passed [reports/SUPPLEMENT_AUDIT_1790085124137.json](reports/SUPPLEMENT_AUDIT_1790085124137.json). Separately from primary job counts, original, source, and result hashes were checked for adaptation removal, 1-second observation, additional refinement, and path-storage results.

[Interpreting random numbers and condition counts](RANDOMNESS_AND_COUNTS.md). The final file inventory and hashes are preserved after termination in FINAL_MANIFEST.json and FINAL_MANIFEST.sha256.

Additional refinement at the smallest time step: 8 planned, 8 started, 4 completed, 0 failed, 4 interrupted by the time limit, and 0 not yet started. Only completed results were incorporated into the finest results for the existing 576 conditions. [Record](reports/HH_MEMORY_DEEP_V20.json).
~~~~~

### S12. Human8 Final Research Report

Results of earlier integrated research. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-human8-20260929-223825/reports/QHON_HUMAN8_FINAL_REPORT_KO.md>)

~~~~~text
# QHON human8 Final Research Report

Research period: 2026-09-29 22:38:25 to 2026-09-30 06:08:25 KST, 7 hours 30 minutes. This includes preparation, review, execution, post-auditing, and design research. Actual termination marker: UTC 2026-09-29T21:08:25.874Z; OS confirmation: UTC 2026-09-29T21:09:04.0638775+00:00. Termination of the research runner, workers, QRNG collector, and resource guard was confirmed.

Of the 435 jobs registered in this campaign, 432 were archived successfully, 3 failed, and 0 were interrupted. There were 40 registered research bundles. Jobs include reruns and offline analyses and are not equivalent to the number of independent experiments or independent samples.

The physical scale remained 3×3×3=27 HH-type cells. The process peak RSS observed by the runner was 3.382GiB; this is neither the maximum RAM summed across all auxiliary audit processes nor a memory-usage target. ANU QRNG was used for the inputs, with the original responses and SHA preserved.

The clearest improvements in this research were **memory recovery incorporating resource recycling**, **better prediction of action observations**, and **identification of the stage at which sensory information disappears**. The state, provenance, and interpretation contracts for connecting the five hypotheses were also strengthened. However, full validation of the new predictor failed because of numerical discrepancies, and integrated recognition and human-level thought, emotion, and selfhood have not yet been demonstrated.

| Key result | Actual observation | Scope of interpretation |
|---|---|---|
| Memory recovery on new inputs, H40 | Complete recovery of four facts across 8 inputs increased from 4/8→8/8. Final facts changed from 28 correct and 4 nonresponses→32 correct and 0 nonresponses, with 0 wrong answers maintained. Both resolutions agreed. | Two existing graphs and a limited task. The 4 wins were on graph1111; graph1112 was already 4/4. There were 6 fact patterns among the 8 inputs. |
| Self-observation prediction, H42 | Brier 0.717134→0.603268; log loss 1.247016→1.015746. Improvement over the existing predictor on 8/8 inputs. | Only 6/8 were numerically eligible, so the fixed full validation was **FAIL**. The main score aggregates 8 inputs and 1,152 observations, retaining the failed inputs; this observation count is not the number of independent samples. |
| Finer numerical computation, H43 | The 1.25/0.625µs comparison passed 4/4 for rest-gated/swap on 4 new inputs. Eight full native checkpoints were verified. | Numerical verification of one stress condition. It does not turn the original H22/H42 failures into successes. |
| Sensory-collision diagnosis, H44 | Even with the same AP/refraction-line records, membrane voltages for two inputs differed by up to 12.922 and 13.743mV. | Evidence from two development cases that the current observation representation discarded information. Increasing amplitude by 1.3 times distinguished only one pair by AP count. Readout accuracy was not tested. |

In H40, the main action correctness was 56/64 in both conditions, and corrective-stimulus costs were also equal. In the control that applied recycling alone without correcting memory, 24 correct, 4 wrong, and 4 nonresponses changed to 24 correct and 8 wrong. Thus, restoring resources differs from restoring true memories. Making incorrect memories readable again through recycling was not counted as improved accuracy. Evidence: [H40 results](H40_READONLY_OUTCOME_AUDIT_KO_V1_1790713825333.md), [audit of 96 full states](H40_FULL_NATIVE_CHECKPOINT_AUDIT_V1.json).

H42 maintained the sequence of prediction→scoring→updating from actual observation, and an independent audit reconstructed 1,440 predictions. The 24 duplicate adaptive-external streams were excluded from the main score, but their original records were preserved. Predictions of withhold observations improved over the update-ablated control but remained worse than uniform prediction. The overall score was slightly worse than that update-ablated control. Local improvements and overall effects were distinguished in this way. This is an improvement in the external software constituting the predictor, not evidence that selfhood emerged in the neurons themselves. Evidence: [H42 fixed-validation results](H42_ACTUAL_VALIDATION_SUMMARY_V1_KO.md), [independent audit](H42_ACTUAL_READONLY_VALIDATION_AUDIT_V1.json).

The two H44 cases were compared with all voltages and cell states preserved in new runs that exactly reproduced the original H13 fine shapes. This does not claim to have reconstructed, from historical data, full neural states that were absent from the original H13. After changing the amplitude in g254, the AP timing difference was only about 10⁻¹⁶ seconds and was not counted as successful discrimination. In g255, the AP counts differed at both resolutions. Evidence: [sensory diagnosis](H44_ACTUAL_DIAGNOSIS_V1_KO.md), [information constraints on collisions](H5_COLLISION_IDENTIFIABILITY_LIMITS_R23_V1_KO.md).

| Hypothesis | Advances implemented and verified in this research | Remaining limitations |
|---|---|---|
| Hypothesis 1: directional connections | Distinguished the provenance of connections produced by the original directional rule from supplementary connections. A target voltage difference of 4.12–4.21mV was observed in the arrival-conductance blocking control for 4 mixed-direction edges. | The target had 0 APs. The transmission effect of directional connections does not demonstrate useful memory or meaning formation. |
| Hypothesis 2: capacity and return | Connected the local matter/energy ledger, finite recycling, and recall blocked by shortages to actual data. Verified H40 on new inputs. | The current local sensor model cannot be extended to whole-brain metabolism or indefinite memory maintenance. |
| Hypothesis 3: release inhibition | Separated cue firing, release rejection, transmission, and reading failure. Implemented failure prerequisites to prevent erroneous erasure. | Normal transmission alone cannot assign responsibility for failure to a particular synapse. Release inhibition and postsynaptic inhibition are separate. |
| Hypothesis 4: inversion | Verified the v29 inversion contract preserving learning epochs, resource history, and pending-transmission fields, followed by actual continuous HH computation. | Limited to two existing graphs and two resolutions. The pending queues in these H38 samples were empty. This is a comparison of physical states with provenance metadata and coordinate representations normalized, not evidence of autonomous synchronization or consciousness. |
| Hypothesis 5: interpretation cube | A limited subdivision index retaining the complete original forms; preservation of actual source APs and not-yet-arrived transmissions at time-window boundaries; diagnosis of information loss. | Index accuracy is not semantic understanding. Noise recognition, new meaning generation, and integration within a common neural state remain incomplete. |

The subdivision index for Hypothesis 5 agreed with the preceding index across 640 existing shapes×6 settings=3,840 derived results. The boundary-view contract confirmed 176 view extractions from 16 actual checkpoints. These numbers are not counts of mutually independent neural experiments. Simply drawing a shape smaller differs from reducing storage bytes; the semantic weighting of original lengths, event times, and branches are preserved separately. Evidence: [full development map](QHON_GNN_DEVELOPMENT_MAP_V3_KO.md), [analysis of scaling and information quantity](RESEARCH_REASONING_24_SCALE_AND_INFORMATION_KO.md).

Continuity of memory across restart was also confirmed. H27/H28 restored saved checkpoints into new processes and continued actual computation, checking format, corruption, and partial-save paths. File compression H20 reduced the existing 1,993,611 bytes to a QNS3 total of 1,911,712 bytes, approximately 4.11%, for those 4 state samples. This is not an improvement rate for whole-network RAM or execution speed. The H40 checkpoint times were 2.65–13.2 seconds, and the 10.55-second post-learning interval included reading and repair. This 7-hour-30-minute research period does not mean a 7-hour-30-minute continuous memory-retention test in the same neural network.

Failures were also preserved as evidence for deciding the next design. H14 recognition did not pass the required criteria under noise overlapping the actual stimulus, and subsequent interpreter development in H15/H25 did not produce a candidate to seal. H17 revealed that using rewards aligned with the current goal directly for fact correction could overwrite the original facts. Explicit goal separation in H32 helped under clean conditions but did not resolve all contaminated rewards. H22/H42 must satisfy both prediction and numerical criteria, so their existing failures remain. Jobs whose programs terminated normally and jobs that passed scientific validation are not counted together as the same thing.

The logical research conducted while waiting elaborated three distinctions. First, a small counterexample confirmed that when stored facts and current goals produce the same observations and rewards, the two cannot always be distinguished without an external discriminating cue. Second, observing external outputs such as behavior does not immediately establish causal ownership of one's own actions. Third, before erasing a failed path, actual cues, release, transmission, context, reward reliability, and protection of shared successful paths must be checked. These contracts do not yet execute connection deletion, and the hold on GNN formation remains in place.

The next priority is a small closed loop connecting sensory instructions, actual memory reading, and motor-observation feedback within a common graph and one continuous state. Numerical precision and state contracts must first be sealed; when sensory output is unclear, previous instructions or correct-answer labels must not be substituted. Before independent-input validation is passed, individual interpreter, memory, and self-predictor scores must not be multiplied to estimate integrated performance. The [next minimal integration design](QHON_MINIMAL_CLOSED_LOOP_DESIGN_KO_V2.md) is a four-round development task for this purpose and has not yet been executed. Similarity of 98% to humans overall remains an unmeasured long-term goal; achievement rates for thought, emotion, or subjective selfhood are not calculated from these results.


The final H45 rediagnosed two representative numerical failures from H42 using the same inputs and physical program. The preserved fine results of the original 2.5µs runs were reproduced exactly in 2/2 cases, and 6 new full native states and their provenance were verified. The overall criterion requiring all pairs of 2.5/1.25/0.625µs passed only 1/2 and is therefore **FAIL**. In b1205, comparisons involving 2.5µs had maximum voltage differences of 0.178885 and 0.191736mV, exceeding the 0.1mV criterion. The finest 1.25/0.625µs pair passed in both cases. This is a post hoc diagnosis narrowing candidates for the next numerical setting, not a reclassification of the original H42 as successful. Since the original historical coarse trajectories are unavailable, it also does not claim to have reconstructed where the errors occurred at that time. Evidence: [H45 final diagnosis](H45_STORED_REVIEW_KO_V2.md).

The next candidate for Hypothesis 5 is to preserve the complete refraction line while testing voltages and transmission/resource states actually observed before a decision as separate interpretation context. External correct answers, pattern names, and future outcomes are not supplied as inputs. This candidate has not yet been implemented as a new readout or performance-validated; whether it compensates for information lost by the current observation representation must be compared under the same storage budget and on unused inputs. Evidence: [interpretation-context design](RESEARCH_REASONING_25_INTERPRETATION_CONTEXT_KO.md).


The job accounting for each research bundle is as follows. The completed column below means successful saving of a result file, not PASS for an individual hypothesis or its efficacy.

| Study | Registered | Completed | Failed/interrupted, etc. |
|---|---:|---:|---|
| H00 | 10 | 10 | 0 |
| H01 | 8 | 8 | 0 |
| H02 | 8 | 8 | 0 |
| H03 | 16 | 16 | 0 |
| H04 | 8 | 8 | 0 |
| H05 | 4 | 4 | 0 |
| H06 | 64 | 64 | 0 |
| H07 | 32 | 32 | 0 |
| H08 | 6 | 6 | 0 |
| H09 | 4 | 4 | 0 |
| H10 | 4 | 4 | 0 |
| H11 | 8 | 8 | 0 |
| H12 | 12 | 12 | 0 |
| H13 | 32 | 32 | 0 |
| H14 | 32 | 32 | 0 |
| H15 | 1 | 1 | 0 |
| H17 | 80 | 80 | 0 |
| H18 | 8 | 6 | failed:2 |
| H19 | 16 | 16 | 0 |
| H20 | 2 | 1 | failed:1 |
| H21 | 1 | 1 | 0 |
| H22 | 9 | 9 | 0 |
| H23 | 2 | 2 | 0 |
| H25 | 1 | 1 | 0 |
| H26 | 3 | 3 | 0 |
| H27 | 1 | 1 | 0 |
| H28 | 1 | 1 | 0 |
| H29 | 2 | 2 | 0 |
| H31 | 2 | 2 | 0 |
| H32 | 8 | 8 | 0 |
| H35 | 10 | 10 | 0 |
| H36 | 2 | 2 | 0 |
| H37 | 2 | 2 | 0 |
| H38 | 2 | 2 | 0 |
| H40 | 16 | 16 | 0 |
| H41 | 1 | 1 | 0 |
| H42 | 9 | 9 | 0 |
| H43 | 4 | 4 | 0 |
| H44 | 2 | 2 | 0 |
| H45 | 2 | 2 | 0 |

H16 is a previously reserved unused-input bundle; if it is absent from this actual job accounting, it is not counted as an executed experiment. Pure contract checks, source analyses, offline development, and read-only audits such as H24, H30, H33, H34, and H39 are separate evidence and were not arbitrarily added to the job counts above.

Failed jobs were not deleted.
- H18-v25-mirror-g1056-sensor-future: failed. Error: H18_ENGINE_MUTATED_INPUT
- H18-v25-mirror-g1057-sensor-future: failed. Error: H18_ENGINE_MUTATED_INPUT
- H20-source-memory-storage-audit: failed. TypeError: Cannot read properties of undefined (reading 'length')

The two original H18 runs stopped at an input-mutation determination based on raw serialization hashes; separate v2 reruns using typed-value comparisons passed. This was not retrospective verification of unpreserved states from the original failed runs. After the original H20 TypeError, a separate v2 storage audit passed. These follow-up results do not overwrite the original failure records.

SHA, size, and journal reconciliation for all result files: [final accounting](FINAL_CAMPAIGN_INVENTORY_1790716187721.json). Evidence of process termination: [OS check](FINAL_STOP_VERIFICATION_1790716144075.json). Earlier fixed protocols, failures, post hoc development, and new-input validation were preserved separately in their original reports.
~~~~~

### S13. Final Functional Research Report

Results of earlier functional research. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-functional12-20261001-183911/QHON_FUNCTIONAL12_FINAL_REPORT_KO.md>)

~~~~~text
# QHON Functional Research Final Report

Written at: 2026-10-02 06:19:12 KST. Designated research end: **October 2, 2026, 06:30 KST**.

This research performs necessary functional validation and improvement of the existing H1–H5 and the registered auxiliary hypotheses 3A1B, 5A, and 3A5B1C. No new hypotheses were registered, and GNN formation remained on hold. The start was confirmed at 18:39 KST on October 1, and the absolute end time took precedence over the requested approximate 12 hours. The following are results of this campaign, not cumulative totals of all past research.

**Concrete improvements were made in memory addition and modification, action feedback, and storage recovery. At the same time, readout failures on new structures and limitations of late release blocking were confirmed. This does not conclude that QHON as a whole has matured or become 98% similar to humans.**

## Main Results

| Function | Confirmed result | Scope of interpretation |
|---|---|---|
| Storing action outcomes in neural memory | P16B connected neural readout to actual selection, motor output, and rereading across 130 conditions. | More useful than the learning-disabled group, but not superior to public observation records. |
| Memory correction after recovery | P17, 80 conditions. Total subsequent action loss: relearning 24, retaining previous predictions 67.2, deferring on context change 120, public records 24. | An external program determines actual observation and learning times. |
| Adding memory while retaining past memories | In 8 P18 learning-group conditions, readout of the four existing binary associations and a new fifth association was preserved. | The full 24 conditions include learning-disabled and public-record controls. This does not mean five episodes or autonomous retrieval. |
| Error detection and rechecking | P20, 12 conditions. Under persistent failure, the correction policy's loss was 14.4→6.4. Recovery after transient failure was followed by relearning through rechecking. | Rechecking incurs additional costs under persistent faults. It is not always the superior policy. |
| Contextual readout | Compared agreement of 898/930 in P19 G75 with 930/930 in P21 G150 using the same learned states. | A subsequent improvement on the same six structures, incorporating external cues and context-interpretation rules. |
| Lossless archiving and corruption recovery | R09/R10, 112 actual states. The 27,450,995 bytes including single-file recovery were 56.55% smaller than storing each state in full every time. | General-purpose byte archiving, not semantic compression or biological long-term memory. |

The action-loss table represents actual goal mismatches in subsequent actions and predefined action costs. It is not an energy-efficiency figure including teacher input, total computation costs, and parent-state formation costs. Common prior-observation costs and excluded items were specified in each detailed report.

Evidence: [P16B](P16B_FINDINGS_KO_V1.md), [P17](P17_FINDINGS_KO_V1.md), [P18](P18_FINDINGS_KO_V1.md), [P20](P20_FINDINGS_KO_V1.md), [P19](P19_FINDINGS_KO_V1.md), [P21](P21_FINDINGS_KO_V1.md), [R09](R09_FINDINGS_KO_V1.md), [R10](R10_FINDINGS_KO_V1.md).

## Readout Failures and Improvements on New Structures

| Setting | Probes that should output the correct answer | Controls that should remain undetermined | Overall agreement |
|---|---:|---:|---:|
| P19 C0.5/G75 | 136/168 | 762/762 | 898/930 |
| P21 C0.5/G150 | 168/168 | 762/762 | 930/930 |

The 32 P19 failures were cases in which the correct output appeared as undetermined at time offsets of ±3ms and ±6ms. The weights had been learned and the required input firing occurred, but these cases were consistent with insufficient transmission. P21 kept all structures, controls, probes, and learned states unchanged and altered only the reading gain. Past failures are not erased, and the same graphs are not recounted as new independent validation samples. The two integration intervals are not counted as separate input samples either.

## Late Blocking and Selective Write Protection

In P22, blocking before or after the first release protected both memory arrangements. Once the second release had also finished, residual learning traces established an incorrect association even if blocking became active. Subsequent legitimate correction and separate new-memory learning were maintained under all conditions.

P23 compared a separate control that closed the relevant source cell's learning window at 1.633 seconds. Other source cells' windows were maintained, and the window was reopened only during later explicit legitimate correction.

| P23 condition | Existing-memory protection | New-memory learning | Subsequent legitimate correction |
|---|---:|---:|---:|
| Late release blocking | 0/2 | 2/2 | 2/2 |
| Late write-window closure | 2/2 | 2/2 | 2/2 |
| Late release blocking and write-window closure | 2/2 | 2/2 | 2/2 |

This supplement does not redefine release inhibition as retroactive cancellation. It is an additional external write control, not something activated by the neural network autonomously judging the meaning of an error. Correcting an error after learning has already finished is distinguished from this and belongs to relearning problems such as the separately verified P20. [P22](P22_FINDINGS_KO_V1.md), [P23](P23_FINDINGS_KO_V1.md).

## Current Evidence for the Five Hypotheses and Three Auxiliary Hypotheses

| Subject | Aspect strengthened in this research | Remaining limitations |
|---|---|---|
| H1 connection formation | Comparison of QRNG inputs with fixed provenance and structure-specific functional/conduction conditions. | Success on a 27-cell task cannot be extrapolated to large-scale structures or intelligence. |
| H2 total quantity and return | Consistency checks of the fixed resource ledger and normal, blocked, and recovery states. | The actual chemical compartment is at one location. Compartments for every cell and metabolic costs of firing and learning are not modeled. |
| H3 release inhibition | Inhibition retaining APs, recovery, protection timing, and the limitations of late blocking. | Already released events and eligibility are not automatically canceled. |
| H4 inversion | Verification of state and functional correspondence before and after coordinate inversion. | Not evidence of generating opposite actions or opposite meanings. Original failures also remained in correspondence. |
| H5 interpretation | Separation of the roles of spatial shape, APs, transmission/time history, and elaboration of the scope of contextual readout. | Pure spatial projections in the current encoding have failed to distinguish different answers in some cases. Autonomous meaning creation remains unproven. |
| 3A1B prediction reuse | Connecting actual neural outcome memory, selection, feedback, and error correction. | The distinctive advantage of common-rule reuse is limited, and performance sometimes matched the general public-record baseline. |
| 5A lossless archiving | Exact restoration and resumption of the full coupled state, records of different lengths, and single-file recovery. | General-purpose compression does not guarantee the accuracy of the original meaning or consciousness. A trusted manifest and recovery information are required. |
| 3A5B1C protection | Temporal separation of incorrect existing learning and new learning, legitimate correction after protection, and additional write control for delays. | Not always superior to a simple write lock. Protection locations and schedules are externally determined. |

Supplementary documents 01–14, the respective protocols and execution records, original states, and independent audits were preserved together. The original hypothesis identifiers and registry were not changed. Biological facts are not equated with hypothetical engine rules.

## Costs, Interruptions, and Validation Scope

- HH starts and returns independently audited after completion: **36,160 each**. Total returned network time: **16,150.16 seconds**.
- Including confirmed returns from separately interrupted intervals gives **36,253 returns / 16,303.59 seconds**. The total number of starts in the initial P08B cannot be reconstructed, so no exact overall start count is claimed.
- HH calls are interval computations, not counts of different experiments. Storage checks, synthetic tests, and audit items are not counted as new neural-learning samples either.
- The latest single neural time is **20.2 seconds**. Running a computer for hours differs from retaining one memory for that amount of simulated neural time.
- The default cube is **3×3×3, 27 cells**.

The new-learning failure caused by competing teachers in P08D was reverified after temporal separation in P08E, the retention-duration control P08G, and new-input P08F. In P08F, both the release-blocking group at 24/24 and the general write-lock group at 24/24 satisfied protection, new learning, and legitimate correction; therefore, no distinctive superiority of the blocking group is claimed. The initial P16 event-ID collision and interruption costs were preserved, and P16B corrected and reran the experiment. P11's reserialization-byte comparison error was also retained, distinguishing equality of actual values from restoration of original bytes.

Earlier test wording inherited by some follow-up protocols is specified in the [scope addendum](PROTOCOL_SCOPE_ADDENDUM_V1.md). Passing an audit means passing the reported state, hash, program, and numerical checks, not establishing all hypotheses or retesting every historical condition.

Cost ledger: [AUDITED_CAMPAIGN_COST_LEDGER_V8.json](AUDITED_CAMPAIGN_COST_LEDGER_V8.json). Raw data and failures were not deleted. The pre-deadline process check is recorded separately in [termination status](FINAL_PROCESS_CLOSURE_V1.json).

## Remaining Priorities

1. Select the externally defined context, memory cues, protection locations, and write timing based on observations, and compare the costs of incorrect selections as well.
2. Validate these improved settings on new structures, noise, and varied fault durations. Repeated success on the same data is not counted as generalization.
3. Test active interference, forgetting, relearning, and increased capacity over longer actual simulated neural time. The current binary associations and fixed 27 cells are not interpreted as long-term episodic memory or large-scale capacity.
4. Compare H5 interpretation's distinctive semantic-processing and combination functions against simple AP and record baselines. Emotion, selfhood, and human similarity require separate operational definitions and evaluation evidence.
5. Validate multiple chemical compartments, resource and energy costs, and structural scalability in a separate engine version. The current implementation uses a 729-entry weight array and cannot be applied unchanged to a large neural network.

The deadline of this functional study is distinguished from completion of QHON research as a whole. Similarity of 98% to humans in thought, emotion, and selfhood cannot be calculated from these data, and this does not declare that every task preceding neural-network formation has been completed.
~~~~~

### S14. Continuous Campaign Progress Record V1

Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V1.md>)

~~~~~text
# QHON Continuous Research Interim Results

Recorded at: 2026-10-02T10:36:59.298Z (UTC). This is not a termination report; follow-up research continues until the user instructs a pause.

## Confirmed Improvements and Limitations

| Study | Result | Scope of interpretation |
|---|---|---|
| A01 reproduction | All 4 reproductions of the previous learned state matched exactly. | Reuse of the same input. |
| CPU exact-state reuse | Approximately 2.63-fold improvement in aggregate CPU time under learning conditions; all physical states matched across 32 learning/reading resumptions. | Original and new engine fingerprints distinguished; not a universal speed multiplier for all jobs. |
| GPU integration G01 | Passed 9 size/time conditions. | Independent-cell integration, not migration of the entire neural network. |
| GPU firing diagnosis G02 | Computed 4,824 cell conditions; passed 168 direct CPU comparisons and 186 audit items. | A single conductance input starting from actual saved states; propagation, learning, and chemical compartments excluded. |
| M01/M02 | Recall retained up to time 8 seconds; when writing was allowed, weights decreased with the number of activity events. | Read-only retention distinguished from writing during activity. |
| M03 | The default activity-decay rate of 0.01 failed recall at times 16 and 32 seconds. Rates of 0.001 and 0 retained recall in two structures. | The same determinations held at half the time step. Not a criterion for human long-term memory. |


Weights remained at the default decay rate, but readout failed. Complete loss of weights is therefore distinguished from output-transmission or interpretation failure. M04 is comparing legitimate relearning and protection of other memories under reduced or removed decay. The current defaults are not replaced unconditionally. [M01 audit](M01_AUDIT_V1.json), [M02 audit](M02_AUDIT_V1.json), [M03 audit](M03_AUDIT_V1.json)

Six new inputs were obtained from the public ANU QRNG API. Nonduplicate original responses, binaries, and provenance were preserved, and all 6 structures were admitted under structure-selection rules fixed before viewing the results. N01 tests five learning controls and 31 probes for each structure. Computation and numerical comparison have finished for the first structure; the overall generalization result is not yet determined. [Selection rules](N01_SELECTION_PLAN_V1.json)

## Preserved Failures and Corrections

- The GPU G01 source-hash issue was a comparison error confusing the compiled LF string with the CRLF file saved by Windows. Both hashes were recorded separately; the original data, criteria, and computational results were not changed. [Correction evidence](GPU_SOURCE_LINE_ENDING_AUDIT_V1.json)
- The initial M03 was rejected before computation because event identifiers collided between the previous and new intervals. There were 0 HH executions, and the original record was preserved. It resumed under V2 with separate identifiers for the new interval.
- The first N01 audit attempt could not start because a hash-helper module was missing. After the original module was added, it resumed with the R2 log; neural computation was not rerun.

## Current Costs and Control

Completed result files confirm 1,108 HH returns up to this record. This differs from the number of independent experiments; ongoing intervals and individual-cell GPU computations are not added. [Current cost ledger](PROGRESS_COST_V1.json)

The pause function passed a test that stopped actual CPU work and resumed it in the same process. Registered PIDs and start times are checked, with tracking extending to Python subprocess interpreters. If a historical PID has been reused, that old registration is skipped; other applications are not controlled. Completed checkpoints remain on disk, and running states are preserved in RAM. Automatic recovery after reboot is a separate validation subject.

[Research plan](RESEARCH_PLAN_KO_V1.md), [hypothesis-supplement review](RESEARCH_LOGIC_REVIEW_02_KO.md). GNN construction remains on hold; no achievement of 98% human similarity, emotion, or selfhood formation is claimed.
~~~~~

### S15. Continuous Campaign Progress Record V2

Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V2.md>)

~~~~~text
# QHON Continuous Research Interim Results — Second Record

Recorded at: 2026-10-02T11:26:34.376Z (UTC). Research is continuing; this is not a termination report.

## Main Confirmed Improvements

The initial 930 determinations on 6 new structures yielded **904 successes and 26 failures**. Eighteen erroneous firings from unlearned baseline signals were separated from 8 recall omissions for learned inputs with time offsets. Without repeating learning, N02 lowered the baseline reading conductance from 0.5 to 0.25 while raising the learning gain from 150 to 600. All the same 930 determinations were retested, and **all 930 passed**. The 6,001 raw-data verification items also passed. Original failed results and all checkpoints were preserved.

This is a development improvement on 6 previously observed structures. It does not mean independent generalization or universal 100% accuracy. Six new inputs are being collected separately, and N03's conditions, structure selection, controls, and determination rules were fixed before collection. Inputs with poor results are not replaced. [N01](N01_AUDIT_V1.json), [N02](N02_AUDIT_V1.json), [N03 preregistration](N03_PREREGISTRATION_V1.json)

## Memory Retention and Legitimate Correction

In M03, the existing activity-dependent forgetting coefficient of 0.01 failed recall at neural times 16 and 32 seconds, whereas 0.001 and 0 retained recall in two structures. In M04, relearning restored only the association weakened under the default coefficient. This does not validate the duration of human very-long-term memory.

M05 tested whether reducing forgetting prevents necessary error correction. Across a total of 14 conditions involving transient/persistent faults and static/reactive/recovery-probe control, existing action losses and nontarget-memory preservation were maintained. Verification used 504 HH computations and 532 checkpoint reads, passing 2,180 items. [M05 validation](M05_READONLY_AUDIT_V2.json)

| Fault | Static-control loss | Reactive-correction loss | Loss including recovery probes |
|---|---:|---:|---:|
| Failure only twice | 4.4 | 6.4 | 5.0 |
| Persistent failure | 14.4 | 6.4 | 8.0 |

This means these values were maintained with a low forgetting coefficient, not that a new controller improved upon these losses. Premature correction can be detrimental under transient faults. The limitation that future fault types cannot be distinguished in advance while observation prefixes remain identical also remains unchanged.

## Computational Efficiency and GPU

The CPU cache sharing exactly identical derivative inputs improved aggregate CPU time by approximately 2.63-fold across two learning jobs. The complete physical state matched the original exactly not only after resuming reading but also during actual relearning with writing reopened. A pilot of the adapter reducing only duplicate external checks also matched the original state exactly. This ratio does not guarantee the processing speed of all jobs. [Cache validation](EXACT_CACHE_ADMISSION_V2.json), [adapter validation](M05_PILOT_ADAPTER_AUDIT_V1.json)

The GPU was actually used for FP64 independent-cell integration and firing diagnosis. The entire neural network has not been migrated to the GPU. G03 is a diagnostic computation of 21,168 conditions combining input time offsets, signal strength, and presence or absence of learned weights across 12 actual post-learning target states, compared against 288 CPU reference computations. This diagnosis omits network propagation, chemical ledgers, and feedback and does not substitute for whole-network success.

## Error Records and Costs

The initial M05 validator compared a runtime field absent from the protocol and marked 504 composite items as failed. It was corrected to compare actual checkpoint runtimes against both the fingerprint-fixed parent and the current Node/V8/OS. Original validation records and correction evidence were preserved separately, and neural experiments were not rerun. [Correction evidence](M05_AUDIT_CORRECTION_V1.json)

The number of HH returns for this campaign aggregated from currently completed result files is **4,748**. This is not the number of independent experiments; GPU cell computations, audit items, and previous campaigns are not added. [Cost ledger](PROGRESS_COST_V2.json)

Pause control and resource monitoring are maintained. When the user stops the research, new submissions stop and registered jobs are paused, leaving resumable states. [Hypothesis supplement 03](RESEARCH_LOGIC_REVIEW_03_KO.md). GNN construction remains on hold; achievement of 98% human similarity or selfhood formation is not claimed.
~~~~~

### S16. Continuous Campaign Progress Record V3

Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V3.md>)

~~~~~text
# QHON Continuous Research Interim Results — Third Record

Recorded at 2026-10-02T12:25:53.890Z (UTC). Research is continuing.

- **New-input generalization N03: 902/930 agreement, 28 failures.** Numerical and raw-data verification passed. Unintended associations formed through internal firing during learning even under teacher-omitted and opposite-teacher conditions. N04, with reduced baseline transmission during learning, is now being validated across all 12 structures. At the time of this report, completed files were 27/60 and queue submissions were 26/60. [Details](N03_FINDINGS_KO_V1.md)
- **Memory extension M07: resumed after correcting the original error.** Coarse-step states up to 128 seconds were saved, but the restoration method passing 128,000 time-series entries as function arguments caused a RangeError. A separate engine using a copying method that does not truncate records was compared against the original and an independent split-copy method. Thirty-two checkpoint reads and 89 audit items passed. Sixteen existing states are reused to continue the missing recall checks and half-time-step computations. Successful 128-second memory retention is not yet established. [Restoration validation](LONG_RESTORE_ADMISSION_V1.json), [resumption conditions](M07_PROTOCOL_V2.json)
- **Additional CPU acceleration B05:** The original summation order was maintained, and 16 checkpoint reads and 194 check items passed. In short comparison intervals with long stimulus lists, aggregate CPU time improved by approximately 1.99-fold over the existing RK cache. This does not mean the same speed multiplier for all jobs. [Validation](PROGRAM_CACHE_ADMISSION_V1.json)
- **GPU G03:** Computed 21,168 independent target-cell conditions and compared them against 288 CPU cases. The maximum voltage difference was approximately 1.39e-17V, and all firing counts agreed at half the time step. This is a diagnosis omitting whole-network propagation, chemistry, and learning. [Audit](G03_AUDIT_V1.json)
- **Observation-based planning M06:** Under the assumed fault distribution, the planning rule always selected A and therefore matched a simple baseline. It was not adopted as a distinctive improvement. [Negative result](M06_SCREEN_FINDINGS_KO_V1.md)

## Execution-Management Recovery

A race in which a process's StartTime disappeared immediately after termination stopped the old queue and resource monitor. N04 stopped accepting additional submissions after 25 completions. Completed data were preserved, and queue V2 continues from the job following the 25th. V2's initial PowerShell catch syntax error was also recorded in a separate log and corrected. The new queue saves JSON atomically and uses a common lock for checking concurrency and starting jobs. Resource monitoring and pause control also safely skip terminated processes. The existing pause entry point was connected to the new control, and the old source was archived.

Resource sample at report time: 2026-10-02T12:25:50.9003419Z, research RSS 1.92GiB, actual free system memory 16.53GiB. These are observations of execution status, not allocations intended to fill RAM. A user stop instruction is handled as a pause.

The campaign's total HH returns recorded in completed result files are **8,476**. This is neither the number of independent experiments nor a total of all past research. [Ledger](PROGRESS_COST_V3.json). Earlier M05 memory correction and N02 development improvements are preserved in the [second report](PROGRESS_REPORT_KO_V2.md). GNN construction, achievement of 98% human similarity, or selfhood formation is not claimed.
~~~~~

### S17. Continuous Campaign Progress Record V4

Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V4.txt>)

~~~~~text
QHON Research Resumption Record — 2026-10-02T13:27:27.138Z

N04 development revalidation completed: 12 existing structures, 60 jobs, 1,860/1,860 functional determinations in agreement. Passed 12,079 raw-data verification items. Because previously tested structures were reused, this is not called independent validation.
N05 independent validation started: 6 new ANU inputs, 5 controls per structure, 30 jobs in total. Learning C=0.25 and reading C=0.25/G=600 were fixed in advance and will not be changed to fit the results. Final success remains undetermined.

M07 memory-extension validation completed: 255 items passed. For both existing structures, recall with a forgetting coefficient of 0.001 was [0,1] at 64 seconds and [null,null] at 128 seconds. With a forgetting coefficient of 0, it was [0,1] at both times. Determinations agree at both time steps. These are simulated times, not results on actual long-term memory or similarity to humans.
For N eligible releases at which forgetting occurs, w=w0*(1-f)^N. Under these conditions, merely reducing a constant positive f cannot achieve indefinite retention. The no-forgetting control is a retention baseline; the ability to remove unnecessary memories, learn new ones, and make corrections must also be validated.

Record scalability: recording 27 voltages and time every 1ms requires 224,000 bytes per second for the numeric payload alone. One simulated day is approximately 19.35GB, a lower bound excluding additional costs such as objects and event histories. Weight preservation must be distinguished from keeping the entire execution history resident in RAM. Separate history storage is a design proposal; records are not deleted by bypassing the current validation protocol.

Execution-management record supplement: N04 completion 27/submission 26 in the previous V3 report was an outdated queue sample during recovery. The PowerShell File.Replace null-argument conversion error was corrected with NullString.Value, and queue R3 completed the remaining jobs. Actual pause/resume test V2 confirmed CPU stopping for 6 jobs and resumption under the same PIDs. This resumption tool initially stopped because it misclassified an empty LASTEXITCODE as an error, but this happened before child jobs ran; it executed normally after the condition was corrected.

Evidence: N04_AUDIT_V1.json, N05_ADMISSION_V1.json, N05_LAUNCH_V1.json, M07_AUDIT_V2.json, MEMORY_SCALING_ANALYSIS_V1.json, PAUSE_CONTROL_TEST_V2.json.
User stop instructions are handled as pauses, not termination.
~~~~~

### S18. Continuous Campaign Progress Record V5

Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V5.txt>)

~~~~~text
QHON Open-Ended Research Progress Record — 2026-10-02T14:18:25.963Z

Without a specified end time, result analysis and follow-up research continue until the user instructs a pause. This report is a progress record, not a declaration of research completion.

N05: 930/930 functional determinations agreed across six structures from new inputs. Passed 6,061 raw-data and numerical checks. The combination of learning conductance C=.25, reduced in N04, and reading C=.25/G600 was fixed in advance and validated. The 930 determinations are control/probe determinations from six structures, not 930 independent samples. The generalization scope is recorded in GENERALIZATION_EVIDENCE_V1.json.

M08: Completed 30 jobs comparing memory retention and write protection during repeated activity in the same six structures. Passed 2,056 checks. All conditions recalled 12/12 memories at 4 seconds. At 16 seconds, only the writing-allowed, f=.01 condition failed at 0/12; quiet protection, protection during activity, writing allowed with f=.001, and f=0 all achieved 12/12. Protection here means maintaining the existing closed source-cell write windows, not setting the overall eta to 0. However, which memories to protect was determined by external settings.

M09: In the six existing structures, writing is opened for only one memory to alter it while preserving the other, followed by a three-way relearning comparison: teacher+learning, teacher+learning rate 0, and no teacher. Raw-data preservation, two integration intervals, and exact preservation of all nontarget weights are checked. Currently 1/6 files are complete. No final determination has been made.

Research while waiting: MEMORY_SCALING_ANALYSIS_V1.json separated activity-dependent forgetting from the memory burden of execution history. MEMORY_CONSOLIDATION_REVIEW_V1.json referred to Benna/Fusi's fast/slow synaptic-state model while distinguishing it from QHON's validated results, and recorded conditions for considering retention, correction, interference, and cost together. Original paper: https://arxiv.org/html/1507.07580v1

Total HH returns for the current campaign recorded in completed files: 12908. This is not the number of experiments in the entire project or the number of independent samples. Failed raw data, earlier reports, and hypothesis identifiers are preserved. GNN construction remains on hold.
~~~~~

### S19. Continuous Campaign Progress Record V6

Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V6.txt>)

~~~~~text
QHON Research Progress Record 6 — 2026-10-02T16:59:13.401Z

Following the user's instruction, research continues until 10:00 a.m. KST on October 3, 2026. At the end time, execution states and files are preserved and the research is paused. An earlier stop instruction takes precedence. deadline-pause-v1.ps1 is monitoring separately; a resumption command after the end requires authorization for additional time.

Confirmed results
M09: After 16 seconds of activity with writing permitted for only one memory in six structures, a [recall failure, normal] state was produced. Both memories recovered only when an external teacher and learning were applied together. Learning rate 0 and no teacher failed to recover them, and nontarget weights were preserved exactly. Passed 772 checks. Write protection differs from neurotransmitter-release inhibition.
M10: 72 conditions, 708 HH returns. Passed 3,793 checks; all 144 final memory determinations agreed. With a one-time observation omission on an intact memory, the single-observation policy performed six unnecessary relearning operations, whereas the rechecking policy performed none. Diagnostic observations increased instead. This is a control experiment that rechecks when there is no actual loss and uses an external teacher when there is actual loss, not proof of spontaneous self-correction.
M11: 90 conditions, 708 HH returns. Added conditions in which the goal changes after observation. When both memories were lost and the goal switched from 0 to 1, continuing the previous plan and simply canceling achieved 0/6 recoveries of the new goal, whereas reobserving and replanning for the new goal achieved 6/6. Checks ensured that writes from an old plan were rejected when the goal version changed, even for the same slot. Passed 4,226 raw-data reverification items. The first validator incorrectly referenced the M10 executable name, causing 1 hash check to fail. The actual M11 executable matched the fixed hash, and reverification V2 passed without changing results. Failure record V1 and correction evidence were preserved.
C02: Split the original bytes of 12 long-term-memory checkpoints and reduced duplicate storage. The original files were also restored exactly, and required recovery data decreased by 54.15%, from 32,725,516 bytes to 15,006,017 bytes. Passed 72 independent verification items. Since existing files were not deleted, this stage is an additional archiving experiment, not actual disk-space reclamation. C01's passing JS-state equivalence and failing original-byte identity were also preserved.

In progress
N06: Expanded source locations in six structures from the existing independent inputs. Of 150 candidate locations, 46 arrangements met the structural conditions; with 5 controls each, there are 230 conditions in total. Reasons for 104 structural exclusions were recorded. Learning C=.25 and reading C=.25/G600 remain unchanged. At the time of this record, 55/230 results are complete; there is no final functional determination yet.
N07: The first four N06 conditions are being run anew with the same neural settings, with checkpoints stored in chunks from the start. Agreement of all states and determinations and actual storage bytes are compared against existing results. Completed 2/4. This develops storage efficiency, not evidence from new independent structures.

Costs of diagnosis and relearning
Let D be the cost of one diagnosis and T the cost of external-teacher relearning. Across six selective-loss cases, the single-diagnosis policy cost 12D+6T, rechecking cost 18D+6T, and relearning everything cost 12T. For the first two policies to be cheaper than relearning everything, D/T<1/2 and D/T<1/3 are required, respectively. Reducing observation errors and reducing computation costs must be evaluated separately. The model does not include total biological energy costs. Wall-clock times for some M10 runs include manual pauses and are therefore not used as evidence of speed improvement.

Total HH returns in completed results for the current campaign: 18092. This is neither the number of independent experiments nor a cumulative total for the entire project. The 27-neuron, 3×3×3 scale and the hold on GNN construction are maintained. These experiments do not determine 98% human similarity, consciousness, selfhood formation, or human-level long-term memory.
~~~~~

### S20. Continuous Campaign Progress Record V7

Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V7.txt>)

~~~~~text
QHON Research Progress Record 7 — 2026-10-02T18:47:54.101Z

Research continues until 10:00 a.m. KST on October 3, 2026, and pauses at the end time or on an earlier user stop instruction. Execution states and results are preserved. The network remains at 27 neurons (3×3×3). The scheduler, which had allowed waiting validators to reduce the number of computational jobs, was corrected.

Improvements whose validation is complete
N06: Examined 150 source locations in the six existing structures and selected 46 arrangements meeting the structural conditions. Reasons for 104 exclusions were retained. Across 230 conditions, all 7,130 functional determinations agreed with expectations in AP and spatial-path observations. Passed 46,061 independent verification items. This is location generalization within six structures, not 7,130 independent neural networks.
N07: Ran four N06 conditions anew and stored them with duplicate chunks shared from the outset. The states and original V8/gzip bytes of 256 checkpoints matched the existing results exactly. Checkpoint archive data decreased from 34,668,691 bytes to 15,122,224 bytes, approximately 56.38%. Result JSON, code, and filesystem allocations are excluded. This is neither disk-space reclamation through deleting existing files nor a reduction in runtime RAM.
M12: Tested persistent observation errors and errors common to two observations. When only APs were persistently missing from observations of intact memories, the consensus policy reduced unnecessary relearning, but it could not resolve cases in which both observations were wrong together. If both observations reported memory loss as normal, false reassurance still occurred. Final raw recall succeeded in 144/168 cases overall. Passing 4,326 independent verification items means these limitations were reproduced as well, not that all functional errors were resolved.
N08: Placed neurotransmitter influx and release inhibition, which had not operated in previous memory experiments, on actual memory paths. All 1,116 determinations across 36 conditions agreed with expectations, and 7,407 independent verification items passed. Inhibition prevented learning of the target memory; after inhibition was lifted, relearning with an external teacher restored it. Other memories were preserved. Retry times and the teacher were externally supplied.
N09: Compared 18 N08 conditions under whole-space central inversion. Passed 3,493 corresponding-state checks before and after inversion. This supports consistency of a static whole-system coordinate transformation, not delayed inversion or opposite relations in actions or meaning.
Observation analysis: Separately examined 216 time windows from N08 learned states. In 36 release-inhibited time windows, there were no transmission paths despite action potentials. Passed 504 checks. Differences between APs and paths alone therefore must not be taken as conclusive evidence of observation errors or memory loss. These windows include external teacher stimuli and are distinguished from recall tests.

Storage safety and processing costs
C03 imposed an upper bound on decompressed size. Restoration of 12 existing originals was exact, and excessively compressed data claiming a false size were rejected (24 checks). C04 tested not recompressing already stored chunks. It passed 114 checks, with identical archive bytes and restoration results. The median CPU-cost ratio across three repetitions showed an approximately 1.21-fold improvement. This figure concerns in-memory chunk-processing intervals, not an improvement in whole-network execution speed. Application to the production storage path requires separate validation.

In progress
N10 V2: A comparison of 36 conditions learning three distinct memories in the same 27 neurons. Initial V1 failed in two conditions because the spatial observer was hard-coded for two outputs. Failed data were preserved, and an observer adapted to the output count was separated out. Its spatial extraction results were confirmed to match exactly for 128 existing time windows. Neural-network learning conditions were not changed. Currently 29/36 results are complete; final determination awaits full validation.
M13: Observes actual release states to distinguish transient recall inhibition from unlearned memories. In 10 conditions on the first structure, transiently inhibited intact memories were queried again without relearning, while unlearned memories recovered through teacher-guided learning. Expansion to 60 conditions across all six structures is in progress. Currently 21/60 are complete. An unlearned condition is not the same as an erased memory.
N12: After fixing the three-memory method's conditions, 12 new quantum-random inputs are being collected from the ANU API. Execution requires both final N10 validation and input collection to be complete. It is deferred if the criteria fail; conditions are not adjusted after seeing results and then claimed to have been confirmed using the same inputs.

Total HH returns in completed results for the current campaign: 36990. This is neither the number of independent experiments nor a cumulative total for the entire project. File-by-file evidence is in PROGRESS_COST_V7.json. GNN construction remains on hold. These results have not demonstrated 98% human similarity, consciousness, selfhood formation, or human-level very-long-term memory.
~~~~~

### S21. Continuous Campaign Progress Record V8

Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V8.txt>)

~~~~~text
QHON Research Progress Record 8 — 2026-10-02T20:49:46.966Z

Research continues until 10:00 a.m. KST on October 3, 2026. On an earlier user pause instruction or at the deadline, execution states and results are preserved and the research is paused. The neural network has 27 neurons (3×3×3).

Number of memories and new inputs
N10 verified three associative memories in the six existing networks. Across 36 conditions including learning, no learning, omission of each memory's teacher, and learning incorrect correspondences, all 1,872 AP and spatial-observation determinations agreed with expectations. The 4 HH executions associated with the initial observer defect were preserved as failure records.
N11 tested four associative memories with the same 27 neurons. One of the six networks met the structural conditions, and all 714 determinations agreed with expectations. This is not interpreted as a universal capacity of 4 memories.
N12 collected 12 new ANU QRNG inputs after fixing the conditions. The 9 meeting the structural conditions required for three associative memories were tested, and reasons for the 3 exclusions were retained. Across 54 conditions in total, all 2,808 AP/spatial determinations agreed with expectations. The number of independent networks is 9, not 2,808. Determinations include correct nonresponses in unlearned conditions as well as correct recall.

Distinguishing causes of recall failure
M13 passed 120 final determinations for two memories across 60 conditions using actual release-inhibition states. Reobserving until inhibition was lifted reduced unnecessary teacher-guided learning for intact memories.
M14 compared recovery delays of 0.1, 0.3, 0.5, 1, and 10 seconds and three control policies across 180 conditions. Rechecking up to three times performed the necessary learning after recovery for delays up to 0.5 seconds. The 1- and 10-second conditions were deferred, and recall of the target memory was not resolved. Deferral is not counted as success. Rechecking incurs observation-count and delay costs.
Resource depletion was identified as a confounding cause in the first structure's four M15 conditions. Without release blocking, neurotransmitter was consumed and the final output disappeared. Since this cannot all be classified as memory loss, repetition of the remaining 20 conditions was not pursued. Original results and corrected file verification were preserved.
M16 separated this cause in 48 conditions explicitly specifying recycling and finite external energy supply. The protected first memory's weights were maintained exactly, and it was recalled after inhibition was lifted. The other, unprotected memory weakened during activity. Locking writing for both memories preserved both. The effects of release inhibition and write locking were distinguished even in controls supplying sufficient resources. This protection is externally configured, not the result of autonomously choosing and protecting the memories needed.
M17 tested 36 conditions in which observed resource shortages determined relearning. When energy recovery began at 16.5 seconds, intact memories returned without relearning, and unlearned memories recovered through teacher-guided learning after resources returned. Immediate teacher provision failed under the same unlearned conditions. The 17.5-second condition exceeded the waiting limit, was deferred, and remains unresolved. Chemical-quantity conservation, numerical stability, and exact policy execution were independently verified.

Storage and GPU computation
C05 verified the actual storage API omitting recompression of duplicate stored chunks. File and restored bytes were identical across three repetitions of 12 records, and median CPU cost for the saving and reading intervals decreased by approximately 16.2%. This is not a figure for whole-network speed or RAM savings.
G04 verified GPU cell computation using prerecorded transmission inputs. Going beyond this, G05 verified a read-only 27-cell network in which the GPU directly computed firing and delayed synaptic transmission. Across 48 queries, all cell states, firings, 1ms voltage records, transmission paths, and interpretation results were compared against the CPU reference. The predefined numerical tolerances and exact observation determinations passed.
The 12 G05 comparison queries took 25.55 seconds on CPU and approximately 5.25 seconds on GPU. This was an exploratory measurement under concurrent load and excluded learning and active chemical reactions. The first failure involved saving identical physical states with different V8 internal-buffer representations; the next failure was a missing definition of a GPU compilation constant. Both failed versions and a total of 13 HH executions were preserved. The passing version added 12 HH executions. State agreement is checked exactly, while agreement of file representations is recorded separately.

Currently in progress
G06 expands the fixed G05 GPU computation to all 5,616 N12 queries. Unsupported cases, such as active chemical-sensor firing or capacity overflow, are retained as failures and are not arbitrarily excluded.
M18 is collecting 12 new ANU inputs after fixing the M16/M17 conditions and determination rules in advance. After collection, protection and resource-state-based recovery will be revalidated on every input meeting the structural conditions.

The total native HH returns recorded in completed result files for the current campaign are 48911. Failed results are included and ongoing calls excluded. GPU reruns, audits, and storage checks are not double-counted here. This must not be interpreted as the entire project's total number of independent experiments. Evidence is in PROGRESS_COST_V8.json and PROGRESS_EVIDENCE_V8.json.

GNN construction remains on hold. These results do not demonstrate 98% human similarity, acquisition of consciousness or selfhood, or human-level very-long-term memory. The current evidence is functional validation distinguishing memory, access failure, resource states, and recovery decisions within specified tasks.
~~~~~

### S22. Continuous Campaign Progress Record V9

Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V9.txt>)

~~~~~text
QHON Research Progress Record 9 — 2026-10-02T22:16:15.666Z

The research deadline is 10:00 a.m. KST on October 3, 2026. States are preserved on an earlier pause instruction and at the deadline. The network remains at 27 neurons. Detailed earlier results are preserved in PROGRESS_REPORT_KO_V8.txt.

Newly confirmed results
1. N13 output-correspondence switching: For the same input neuron, the output to be learned was changed between two outputs as A→B→A or B→A→B. No connections were added, and the desired correct answer was not supplied to the readout. Thirty-six conditions on the six existing networks were executed, passing 4,905 checks. Readout gain 300 produced nonresponses in some networks. Gains 600, 1200, and 2400 each satisfied all 108 expected determinations. Among these, the 36 actual switches at gain 600 are distinguished from the 72 teacher-omitted/learning-rate-0 controls. Switching conditions learned the new correspondence, while controls retained the initial correspondence. This is relearning one correspondence, not a test of simultaneous memory capacity across multiple contexts.
N14 selected the lowest passing gain, 600, under a predefined rule and fixed it for 12 new networks. Currently 42 of 72 condition results are complete. Gain is not reselected to fit the results.

2. M19 goal switching: Passed 5,045 independent verification items for 108 conditions combining actual release-inhibition/forgetting states and goal changes. The policy reobserving the new goal satisfied the current goal in all 36 conditions. Policies continuing the existing plan or merely canceling it each satisfied the goal in 24/36 conditions. Where the memory already existed, cancellation alone could satisfy the goal. In the control continuing the existing plan, 6 unnecessary weight writes occurred for the old goal. Goals and policies were externally determined, so this is not described as evidence of selfhood or spontaneous goal formation.

3. O01 limitations of spatial representation: Actual recall at each time was correct for all 54 order queries across nine networks. The 27 opposite-order pairs had identical spatial-edge directions, traversal counts, and cell-visit counts. This summary alone therefore cannot distinguish the two orders. Event order must be archived along with the original form's spatial structure. This result does not reject other representations such as ordered trajectories or Hypothesis 5 as a whole. Original events, coordinates, and times were not deleted.

4. G06 GPU scope expansion: Verified all 5,616 N12 queries. Nine independent networks, 54 learned states, 52 conditions, and 2 numerical intervals are distinguished. Passed 26,406 checks; the maximum firing/path timing difference was approximately 4.44e-16 seconds. Future CPU transmission records were not provided as GPU inputs. This is not validation of a general engine including active chemical sensors and GPU learning.
G07 continuation from GPU states: Checkpoints were constructed from initial states and GPU outputs, and every field was compared against the original CPU states. Rest intervals and actual source-cell reinforcement were then continued separately on CPU. Twelve initial cases, 48 native follow-up executions, and 132 independent checks passed. The provenance of GPU construction is recorded separately and is not labeled as though the CPU engine directly computed those states. This is limited to the declared inactive-chemical-sensor and empty-queue boundaries.

Memory-improvement candidates and independent-input confirmation
M18A covers 96 release-inhibition memory-protection conditions across 12 new networks, with 46 currently complete. M18B covers 72 resource-state-based recall/recovery conditions, with 43 currently complete. All use conditions fixed in advance. Overall determinations are made after completion of independent audits.
M20 divides 16 seconds of interfering activity into 4 intervals and compares simple querying, teacher-free reactivation, and teacher-maintained learning in each interval. Currently 10/36 conditions are complete. In six pilot conditions on the first network, teacher-free reactivation maintained learned memories through all four cycles and did not create new unlearned memories. Learned memories under simple querying disappeared in later cycles. Since the remaining networks are being validated, generalized success is not declared. Reactivation times and write windows follow an external schedule.
M20 validator V1 reached its own 1GiB heap limit while retaining all large records in memory. Neural-network results were preserved unchanged. V2 reads two checkpoints at a time and compares them under the same criteria. No experiments were rerun and no numerical tolerances were changed. The correction scope and original error logs were retained in MEMORY_AUDITOR_CORRECTION_V1.json.
M22 preregistered 48 reactivation-confirmation conditions on 12 new networks, to be executed only if all of M20 passes the predefined criteria. It has not yet been executed.
M23 is an external statistical model predicting memory-access success after the next 4 seconds of interfering activity using only two current firing-response delays. It was registered to train on all of M20, be fixed before M22 execution, and be evaluated once on M22. Weights, future states, input identifiers, maintenance policies, and teacher history are excluded from prediction inputs. This is offline prediction from observations on digital diagnostic branches, not yet an actual internal neural self-model or a decision-making benefit.

Logical research while waiting
RESEARCH_LOGIC_REVIEW_06_KO.txt organizes information loss in spatial representations, the distinction between goal versions and plans, a review of original work on repeated retrieval/reconsolidation, and the scope of the five hypotheses and three auxiliary hypotheses. The number of hypotheses and their identifiers were not changed. Human and animal memory in the references is not equated with QHON's model time and rules.

Native HH returns based on completed files in the current campaign: 53749. Failure records are included and ongoing calls excluded. This differs from the total number of independent experiments. GPU repetitions, verification, storage checks, and predictor arithmetic checks were distinguished separately. File-by-file evidence is in PROGRESS_COST_V9.json.
GNN construction remains on hold. Similarity of 98% to humans, consciousness/selfhood formation, and human-level very-long-term memory have not been demonstrated.
~~~~~

### S23. Continuous Campaign Progress Record V10

Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V10.txt>)

~~~~~text
QHON Research Progress Record 10 — 2026-10-02T23:24:51.323Z

Research pauses at 10:00 a.m. KST on October 3, 2026. The network currently remains at 27 neurons. GNN construction remains on hold. All earlier results are preserved in PROGRESS_REPORT_KO_V9.txt and preceding records.

Improved memory retention
All 36 M20 conditions, comprising 6 networks×two initial-learning conditions×three maintenance methods, passed full validation. They underwent four rounds of 4-second interfering activity and reactivation of two memories per round. The main trajectory spans 20.7 model seconds including initial learning. Teacher-free reactivation and the teacher-maintenance control retained all previously learned memories in every cycle. No new outputs appeared for unlearned memories. The read-only control lost all learned memories in the final cycle. This test had no ledger errors or sender-stock shortages under finite-energy/recycling conditions. Because it uses an external schedule and source-cell write-window control, it does not demonstrate spontaneous replay or human very-long-term memory.
The original M20 auditor's 1GiB heap overflow resulted from holding all full trajectories simultaneously. V2 successfully completed the full audit by comparing two states at a time under the same criteria. Original error records were preserved, and HH experimental results were not regenerated.
M22 is a 48-condition confirmation on 12 new networks fixed before viewing the M20 results. It compares learned/unlearned states for two memories and read-only/teacher-free reactivation. Currently 0/48 conditions are complete. Successful independent confirmation is not announced before the full audit.

Independent-input confirmation of resource-based recovery
The full audit of M18B's 72 conditions on 12 new networks passed. With resource supply at 16.5 seconds, intact memories were recalled without writing, avoiding 12 unnecessary teacher interventions in the immediate-relearning control. At the same time, memories whose learning had actually been omitted were learned after an appropriate wait, giving 24/24 correct final memories versus 12/24 for the immediate-relearning control. When supply occurred at 17.5 seconds, later than the checking deadline, the resource-aware policy also failed to complete the target memory and deferred. No increase in success rate is claimed for that condition; the result was fewer ineffective teacher attempts within the deadline. Increased delayed-observation counts are also a cost. This validates an external rule, not an autonomous self-model.
Independent confirmation of release-based memory protection in M18A has completed 89/96 conditions. A separate audit of all results remains.

Reactivation errors and supplements
M24 covers 108 conditions that learned each of two output correspondences on six existing networks, then performed querying, reinforcement, and final recall while advancing the actual state. Three error timings and three policies were compared. Numerical, full-state, input, and cost audits passed, but a functional failure was found. When incorrect output current was present from the query onward, a prior ambiguity check deferred writing and retained 12/12 correspondences. If incorrect output arose only during reinforcement after the check, this rule also lost 12/12 correspondences. Unconditional reinforcement lost 12/12 under both error conditions. Read-only operation preserved but did not reinforce. These results are development evidence for a variable-correspondence task different from the two-memory M20 task.
M25 is a supplementary proposal that selects the sole output appearing in observation as the retention target and applies actual inhibitory current to the other output. Seventy-two conditions, including a control applying the same current at an unrelated location, were fixed in advance; currently 15/72 are complete. The desired correct answer is not passed to the inhibition-location calculation. This is an engineering supplement using external current, not the same mechanism as the neurotransmitter-release inhibition of Hypothesis 3. These conditions are not claimed to resolve strong errors, an incorrect but unique initial query result, legitimate new-goal correction, or metabolic efficiency.
M26 was preregistered as a 144-condition confirmation on 12 new networks, to proceed only if all M25 criteria are satisfied. Currently 0/144 conditions are complete. There is no procedure for reselecting current magnitude or determinations to fit M25 results.

Current status of self-state prediction
The main M23 predictor takes two actual firing-delay values from memories currently recalled correctly and predicts recall after the next 4 seconds of interference. A total of 138 observations were extracted from M20, and development checks left out each of the 6 networks in turn. The final model was fixed before M22 execution. A comparison threshold model using only one mean delay was also fixed before the same point. Evaluation on new M22 data occurs once, without retraining or threshold modification. No unused-input results are currently available. This is external statistical prediction on diagnostic branches, not proof of benefits in actual maintenance actions or of selfhood formation within the neural network.

Actual improvements in spatial archiving
The new O02 format distinguished orders that O01 could not distinguish from spatial edges and repetition counts alone by preserving the times, sequence numbers, locations, and conductances of all transmission events. All 108 existing records were restored exactly, and time-specific outputs were maintained. Comparing only gzipped records, the 34,905B size was 37.69% smaller than V8's 56,016B.
O03 included restoration code, indexes, required codecs, and instructions. The new package was 64,387B, versus 82,614B for the V8 package and 71,949B for the JSON package, making it 22.06% and 10.51% smaller, respectively. Each package restored 108 records identically in its own separate folder. These are logical file sizes; the common runtime environment was excluded from all packages. This is not a compression ratio for the entire neural network or its execution-resumption state. Displaying a shape smaller on screen is also distinguished from byte compression.

Other confirmations and logical research
In N14, all 216 stage determinations across 72 conditions on 12 new networks agreed with expectations. Actual learning that changes the output correspondence for the same input was separated from retention of the original correspondence in no-teacher/learning-rate-0 controls. This is not extended to simultaneous capacity across multiple contexts.
RESEARCH_LOGIC_REVIEW_07_KO.txt organized conditions for shape reduction, subdivision, and order archiving; 08 organized original human reconsolidation work, replication studies, and cases in which observations alone cannot distinguish errors from legitimate corrections. The currently validated G06/G07 scope follows the previous report.

Native HH returns based on completed result files in the current campaign: 57541. Detailed evidence is in PROGRESS_COST_V10.json. Failure records are included and ongoing calls excluded. This is neither the total number of independent experiments nor the lifetime total of project experiments. Audits, compression, external statistical calculations, and GPU repetitions are separate.
Identifiers for the 5 hypotheses and 3 auxiliary hypotheses were not changed. Similarity of 98% to humans, consciousness, or subjective selfhood formation has not been demonstrated.
~~~~~

### S24. Continuous Campaign Progress Record V11

Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V11.txt>)

~~~~~text
QHON Research Progress Record 11 — 2026-10-02T23:53:21.076Z

The deadline is 10:00 a.m. KST on October 3, 2026, when states are preserved and research is paused. Earlier research history follows PROGRESS_REPORT_KO_V10.txt and preceding reports. This record updates new confirmations and the disposition of failed candidates.

Memory protection and recovery confirmation
All 96 M18A conditions on 12 new networks passed full validation. Whether using resource recycling alone or adding finite energy supply, release inhibition at a designated source cell protected that memory's weights and maintained recall after inhibition was lifted. The other memory was lost under interfering activity. The control locking all writes retained both memories. This is therefore conditional evidence for a selective protection mechanism, not a complete resolution of the proposition of jointly maintaining new learning and existing memories.
M18B's 72 conditions on 12 new networks were also completed. Distinguishing transient resource shortages from actual omitted learning reduced unnecessary relearning and enabled correct learning after waiting. Supply later than the deadline remained unresolved and was deferred.
Across M20's 36 conditions on 6 networks, teacher-free reactivation retained learned memories through all four cycles. Write windows were explicitly opened during interference intervals, using an activity-dependent forgetting coefficient of 0.01. This is not a physiologically calibrated time constant for natural forgetting. The read-only maintenance control lost memories at the end. M22's 48-condition confirmation on 12 new networks currently has 24/48 complete. The fixed M23 predictor and simple delay-threshold comparator finished training before M22 began and have not yet been evaluated on unused samples.

Preservation of reactivation errors and failed candidates
Across 108 conditions, M24 confirmed that prior ambiguity checks could reject persistent errors but could not prevent errors arising after querying. Incorrect outputs could also be repeatedly reinforced.
The M25 inhibition candidate of -0.5nA for 12ms was rejected for voltage-domain errors. After 31 conditions were actually assigned, further assignments stopped: 21 conditions had VOLTAGE_DOMAIN errors, and 10 completed under conditions in which writing was deferred and inhibitory current was not used. Forty-one conditions were not executed. The 81 native HH returns and original failure text were preserved. The original read-only auditor was terminated because it was waiting for unexecuted files, and only actually assigned results were partially audited. The passed=false in M25_PARTIAL_AUDIT_V1.json is retained. M26, which depends on this candidate, will not be executed. The voltage range was not widened and failed data were not converted into successful results.

New development candidate M27
A separate candidate reducing the current to -0.25nA while retaining the 12ms duration was expanded to the remaining 68 conditions after a four-condition pilot. All 72 conditions across six existing networks passed numerical, input, and state audits. Under normal conditions, inhibition at both target and unrelated locations retained and reinforced 12/12 correspondences. Where ambiguity existed from the query onward, both deferred writing and retained 12/12. Under post-query errors, inhibition aligned to the observed retention target retained and reinforced 12/12, whereas the control applying the same current at an unrelated location achieved 0/12.
The sole output of the immediately preceding actual query was used, not the desired correct-answer label. However, an external program determines location and current, and this is an electrical-stimulation supplement different from Hypothesis 3's neurotransmitter-release inhibition. It does not mean that incorrect but unique query results, stronger or differently timed errors, or metabolic costs have also been resolved.
M28 is a 144-condition confirmation on 12 new networks with this reduced current fixed; currently 92/144 are complete. It is not a test relabeling the failed M25 as successful. M29 was registered to compare switching to correction mode according to an externally supplied new goal after protection with retaining old protection. It will not execute before M28 passes.
M30 is a 216-condition development boundary test varying error currents of 125/250/500pA and timings of 3/6/15ms while keeping protection settings fixed. The first network's 18 conditions are pilot-audited, and expansion to the remaining 198 conditions requires passing numerical verification. Functional failures are retained as results defining the protection scope, not excluded. Currently 18 conditions are complete.

Archiving and speed
All 108 order-preserving O02/O03 records were restored exactly. The 64,387B package including restoration code and indexes was 22.06% smaller than the corresponding V8 package and 10.51% smaller than the JSON package. This is not a whole-network compression ratio. GPU validation extends only to G06/G07's limited reading and subsequent CPU execution.

Native HH returns based on currently completed result files: 60164. Errors are included and ongoing result files excluded. This differs from the number of independent experiments. File-by-file evidence is in PROGRESS_COST_V11.json.
The network remains at 27 neurons. Identifiers for the 5 hypotheses and 3 auxiliary hypotheses are unchanged. GNN construction remains on hold; 98% human similarity and subjective selfhood formation have not been demonstrated.
~~~~~

### S25. Continuous Campaign Progress Record V12

Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V12.txt>)

~~~~~text
QHON Research Deadline Record 12 — October 3, 2026, 10:00 a.m. (KST)
Recorded at: 2026-10-03T01:01:06.822Z
Status: Paused at the user-designated deadline. This is not a declaration of research completion; data, code, and failure cases are preserved.

Key assessment of this interval
Conditional evidence for memory retention, history-based repair through actual learning, and order-preserving archiving was strengthened. At the same time, a counterexample showed that electrical inhibition can incorrectly alter memory, and a limited learning time window reduced that side effect. This is not extended into evidence of universal protection or human-level thought. The network remained at 27 neurons (3×3×3). New GNN construction remains on hold.

Memory retention and initial loss — M20/M22/M35
In M20's 36 development conditions on 6 networks, teacher-free reactivation retained learned items through four activity intervals. M22 included all 48 conditions on a separate set of 12 networks; at the end of the fourth interval, the reactivation group retained 34/36 learned items (94.44%), versus 0/36 for the read-only control. Conditions with both memories learned achieved 23/24, and those with only one memory learned achieved 11/12. No unlearned items were erroneously acquired.
M35 checked the original initial-learning checkpoints on separate reading branches and confirmed that 36/36 items were initially recallable. Both lost items occupied the same slot in graph 5 and became unrecallable during the first 4-second activity interval. Reactivation did not subsequently recover them. Retention of 34 items and failure to recover two items are therefore reported together. These are repetitions under different conditions, so the 36 items are not counted as 36 independent neural networks.
The M22 parent trajectory totals 20.7 seconds: 1.5 seconds of learning plus four cycles of 4 seconds of activity+0.8 seconds of maintenance. Computation time on separate diagnostic branches is included in costs but not added to the parent's physical trajectory. This model uses an activity-dependent forgetting coefficient of 0.01 and external write permissions; it cannot be converted into years of human memory.

External prediction of retainability — M23
The response-delay predictor trained on M20 and fixed before M22 began was evaluated once. Across 150 conditional observations from 12 new graphs, classification was 150/150, Brier 0.0004548906768452295, AUC 1. A simple one-variable threshold also achieved 150/150, with Brier 0.0006186240257995161, giving identical classification performance. The Brier score was 0.18454946439823544 for the training-frequency prediction and 0.22666666666666666 for the prediction that the immediately preceding success would continue.
The two-feature model had slightly lower probability error, but this cannot be considered an ability available only to a complex model. The 150 observations are repeated measurements from 12 graphs and concern only currently correctly recalled items and a fixed 4-second future. This is external statistical prediction obtained on diagnostic branches that do not advance the original state; an intrinsic self-model or actual decision benefit has not yet been demonstrated.

Protection efficacy and boundaries — M24–M30/M32
M24 confirmed that errors arising after querying can be incorrectly reinforced through reactivation. The M25 -0.5nA inhibition candidate was rejected because 21 of 31 assigned conditions exceeded the original permitted voltage range, and the remaining 41 conditions were not executed. Raw data, errors, and 81 normal HH returns were preserved. M26, which depended on that candidate, was not executed.
The separate M27/M28 candidate was reduced to -0.25nA for 12ms. M28's 144 conditions passed numerical auditing; for the specified delayed 250pA, 6ms error, targeted protection achieved 24/24 versus 0/24 for the unrelated-location control. M30 expanded strengths to 125/250/500pA and timings to 3/6/15ms across 216 conditions on 6 existing graphs. M32 confirmed three fixed boundaries across 144 conditions on 12 graphs. At 500pA, 3ms, targeted protection was 12/24 versus control 24/24; at 500pA, 6ms, both were 0/24; at 250pA, 6ms, targeted protection was 24/24 versus control 0/24. A side effect was confirmed in which inhibition delayed strong erroneous firing and changed the order of competitive weight updates. Passing numerical audits does not mean functional success under every condition.

Recovery using actual past observations — M31/M33
The unique past output was compared against the current output, and upon a mismatch, actual paired-firing learning was performed with the past observation as the target. Fourteen damaged cases were repaired among 36 M31 development parents, and 36 among 72 M33 confirmation parents. The final M33 results were 72/72 agreement with the past in the repair group versus 36/72 in the control group. Weights were not directly overwritten and time was not rewound.
These conditions assumed that the erroneous stimulus had disappeared during recovery. If the past observation was false, it would also be restored; if the goal changed, legitimate correction could be canceled. Because external history storage and control are used, this is not called spontaneous neural self-repair or truth determination. Integration with goal versions and resource states remains to be researched.

Counterexample in which inhibition itself creates learning, and improvement — M29/M34/M36
Across 48 M29 conditions, the new goal was learned at 24/24 whether old protection was retained or lifted. Lifting protection had no advantage in this test. However, when teacher stimuli were removed in M34, firing after targeted inhibition was lifted alone led 24/24 cases to learn the opposite memory; unrelated-location inhibition and no inhibition each retained 24/24 existing memories. This is a side effect under reading-transmission gain 0 and an open learning window, and is an electrical intervention separate from neurotransmitter-release inhibition.
The 120 M36 development conditions limited the source cell's existing permitted-learning window to 40ms. All three teacher-free controls retained 24/24 existing memories; new-goal learning with targeted inhibition retained achieved 0/24, versus 24/24 with inhibition lifted. This indicates that learning from late firing after inhibition release can be prevented, but legitimate correction requires a separate mode. The 40ms value is a development setting, not a physiological constant, and it did not resolve all short-delay 500pA errors. Validation on new inputs and changed time intervals is required.

Initial-reinforcement pilot — M37
The numerical and state audits of 8 M37 pilot conditions passed. These are development results from deliberately selecting graph 1 and the previously failing graph 5, not independent confirmation.
Cycle 1: initial reinforcement 6/6; same-stimulus read-only control 4/6; erroneous acquisition of unlearned items 0/0 cases.
Cycle 2: initial reinforcement 6/6; same-stimulus read-only control 4/6; erroneous acquisition of unlearned items 0/0 cases.
Cycle 3: initial reinforcement 6/6; same-stimulus read-only control 4/6; erroneous acquisition of unlearned items 0/0 cases.
Cycle 4: initial reinforcement 6/6; same-stimulus read-only control 4/6; erroneous acquisition of unlearned items 0/0 cases.
M37 gives the same 0.8-second cue stimulus after identical initial learning, differing only in whether learning is permitted during that interval; both conditions subsequently perform the existing four cycles of self-reactivation. Teacher stimuli are not added during the initial maintenance interval. The full parent trajectory is 21.5 seconds. Since the two input graphs were intentionally selected, even success is not counted as a maturity determination for all 12 graphs or for independent new samples.

Other original/auxiliary hypotheses and computational efficiency
M18A's 96 conditions confirmed selective weight protection through actual release inhibition at a designated source cell. M18B's 72 conditions confirmed an external policy that distinguishes transient resource shortages from omitted learning to reduce unnecessary teacher interventions. This is a conservation ledger for one local chemical compartment, not a calculation covering all ion pumps or the metabolism of electrical stimulation.
N14's 72 conditions compared learning that actually changed the target for the same input against controls without learning. O01 showed that spatial-shape summaries can lose temporal order, while O02/O03 exactly restored 108 records including order. The 64,387B package including restoration code and indexes was 22.06% smaller than the corresponding 82,614B V8 package and 10.51% smaller than the 71,949B JSON package. This is not a saving rate for whole-network storage.
G06/G07 confirmed reading with fixed weights and inactive chemistry, and subsequent connection to CPU states. This does not constitute extension of all active chemistry and learning to GPU. Review 10 stored improvement conditions for the five hypotheses and three auxiliary hypotheses reflecting these counterexamples. Identifiers 3A1B, 5A, and 3A5B1C and the original hypothesis numbers were not changed.

Cost accounting and remaining work
Total normal native HH returns based on completed RESULT files in the current campaign: 66336. This is a cumulative count of computation intervals including errors, not the number of independent experiments or lifetime project experiments. GPU replay, offline audits, compression, and statistical fitting were not added. Some returns from ongoing jobs without result files are excluded from the aggregate. All aggregation sources and hashes were preserved in PROGRESS_COST_V12.json.
Priorities are confirmation of initial reinforcement on new inputs, maintenance decisions including actual observation costs, checks of the 40ms time window's scope, history-based repair combining goal versions and resource states, and integration of dynamic full-state inversion, saving, and resumption. Similarity of 98% to humans, emotion/subjective selfhood, and years-long human memory have not been demonstrated.
~~~~~

### S26. Continuous Campaign Progress Record V13

Results at the time of writing: subsequent reports, audits, and the latest extensions take precedence. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/PROGRESS_REPORT_KO_V13.txt>)

~~~~~text
QHON Research Interim Record V13
UTC 2026-10-03T03:39:17.119Z
Research start: 2026-10-03T02:12:23Z; scheduled pause: 2026-10-03 23:12:23 +09:00.
Current control mode: running. This is not a research termination report.
27 neurons. The hold on GNN construction remains in place.

An additional 4482 native HH returns were aggregated in completed results during this 12-hour research period.
Completed-result aggregate for the current continuous campaign: 70818. This is neither the number of independent experiments nor a total of the entire project's history. Intermediate returns from running jobs are not yet included. Successful returns left by failed jobs are also included in costs.

M38: the remaining 10 existing structures×both/one unlearned×with/without initial reinforcement=40 jobs, 2480 HH. Numerical and record checks passed. These 10 structures retained 30/30 learned items through four cycles under both conditions. Adding the existing M37 improvement on vulnerable structures gives initial reinforcement 36/36 versus control 34/36 across all 12 existing structures. Since there was no difference in the additional 10 structures, the effect of initial reinforcement is not interpreted as an increase in every structure.
M39: After preregistration, 12/12 new ANU QRNG inputs were obtained for a 48-job independent confirmation. Progress {"planned":48,"completed":14,"failed":0}. No final conclusion at present.
M40: 432 jobs on sensitivity to stimulus intervals and write windows. Progress {"planned":432,"completed":171,"failed":0}. In a 36-job pilot check, failure of the fixed 40ms window at a 35ms interval and success of an interval+10ms window were observed. At 40/50ms, limitations of the native confirmation conditions remained. Full expanded results are awaited.
M41: 96 jobs, 384 HH; validation passed. With the goal unchanged, unconditional past-state repair and goal-version checking both recovered 24/24. With the goal changed, unconditional repair achieved 0/24 correct current-goal results, while version checking retained the current goal at 24/24. Versions are externally supplied information; this is not extended into establishment of self-goal recognition. New-goal learning was not newly performed in this test.
M42: Pilot execution comparing rehearsal decisions including actual observation costs. Omitting rehearsal caused an API-call error with an empty stimulus list, so expansion is not pursued. Failure records and consumed HH are preserved. Results from the still-running fixed-rehearsal control and remaining pilot jobs are also preserved.
M43: The same design, modified only to skip the additional API call when the stimulus list is empty. Whether to expand to the remaining 30 jobs is decided after the 6-job pilot numerical and record checks finish. This studies rehearsal decisions made by an external predictor, not proof of selfhood intrinsic to the neural network.

The user's Hypothesis 5 layer-marking addition: O04/O05 exactly restored 432 grid representations derived from actual records. All layer numbers were preserved at each two-dimensional location. The O06 complete compressed package including restoration code and indexes was 21,343B for the existing method versus 21,870B for the selective method, so no saving occurred on the current data. Among O07's 90 synthetic shapes, sparse lines/repeated layer patterns showed advantages. This was not a test with a larger neural network, and there were 0 new HH executions.
Details: H5_LAYER_FINDINGS_O04_O07_KO_V2.txt and O04–O07_AUDIT_V1.json.

Remaining priorities: completion validation of M39/M40/M43; distinguishing repair involving erroneous histories and resource shortages from goal changes; extending retention duration under stable policies and examining resource costs; dynamic interpretation/semantic preservation between originals and summaries.
Long-duration experiments are expanded after first measuring the memory costs of increasing records. Numerical passing and functional success are distinguished. These results do not demonstrate 98% human similarity, establishment of consciousness/selfhood, or memory on the scale of a human lifetime.
~~~~~

### S27. Observation, Protection, and Maintenance Logic Review 10

Design limitations and follow-up tasks. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/RESEARCH_LOGIC_REVIEW_10_KO.txt>)

~~~~~text
QHON Logic Review 10 — Truthfulness of Observations, Side Effects of Inhibition, and Memory-Retention Conditions
Written at: 2026-10-03T00:46:22.958Z

Claims that must be bounded by experimental results
In M22's 12 new networks, self-reactivation retained 34/36 learned items at the end, versus 0/36 for the read-only control. M35, which checked whether memories had been absent from the outset, found that 36/36 were recallable immediately after learning. The two losses are therefore associated with the first 4-second activity interval. Subsequent retention of the 34 items that passed the first interval is a meaningful effect, but it is not a result in which the same self-reactivation revived the two already unrecallable items. Initial reinforcement, maintenance, and recovery after loss are treated as separate functions. The initial-reinforcement development pilot M37 proceeds separately; its success is not predetermined in this document.

M23's 150 evaluation cases are conditional observations repeatedly extracted from 12 graphs, not 150 independent samples or 150 human memories. Both the external predictor using two response-delay features and the one-feature threshold achieved 150/150 classifications. Probability-error Brier scores were 0.000454891 and 0.000618624, respectively; although the former was lower, classification improvement was 0. The interpretation that it thinks more intelligently than a simple rule is excluded. Because only currently correctly recallable items were included, the ability to recover items already lost at the outset was not evaluated. The maintenance interval is exactly 4 seconds, with fixed forgetting coefficient, input rate, and write permissions. These probabilities must not be trusted unchanged under other time, resource, or error conditions. The next actual application should compare controls under equal budgets, including observation costs that advance the parent state and reactivation costs. Good observation alone differs from improved decisions.

Electrical inhibition is a different intervention from neurotransmitter-release inhibition
In M30/M32, inhibition of -250pA for 12ms prevented the nominal 250pA, 6ms error but did not prevent 500pA, 6ms. At 500pA, 3ms, performance was even worse than the control. The confirmed times in the first development graph under targeted inhibition were 0.534962529823112 seconds for the correct output and 0.5352403085969482 seconds for the incorrect output; the later output within the same competitive commitment window weakened the earlier weight. In the control, the incorrect output at 0.5337741730372733 seconds was followed by the correct output at 0.5349962569498555 seconds, and the result was the opposite. This shows that merely reducing firing does not always protect memory.
New-goal learning in M29 succeeded at 24/24 whether inhibition was retained or lifted. This result alone makes mode switching appear unnecessary, but in M34's teacher-free control, firing after targeted inhibition was lifted alone strengthened the opposite connection in 24/24 cases. Unrelated-location inhibition and no inhibition both retained the 24 existing memories. The same success rates in M29 therefore cannot be interpreted as equal safety of the two policies. This is a side effect under reading-transmission gain 0 and an open write window; it is not generalized to mean the same error necessarily occurs during all normal reading.
M36 is a development improvement fixing the existing source-cell time window to 40ms, including the second normal teacher response while excluding the late response after inhibition release. All three teacher-free controls retained 24/24 existing memories. Even with a teacher, retaining old targeted inhibition yielded 0/24 for the new goal, whereas lifting inhibition yielded 24/24. Thus, after limiting the time window, explicit correction and protection modes must be distinguished. This 40ms is an engineering setting selected from development data, not a biological constant. Nor does it show resolution of short-delay competitive errors at 500pA. Confirmation on separate inputs and stimulus intervals is required.

Agreement with past observations is not agreement with the truth
M31/M33 compared the unique actual past output with the current output. In 36 development cases and 72 confirmation cases, respectively, 14 and 36 mismatches were repaired through actual paired-firing learning. At the end, 72/72 in the confirmation group agreed with past observations, versus 36/72 in the no-repair control. This rule neither overwrote weights nor reverted to a past state. However, if the past output in external storage was wrong, that error would also be relearned. Unconditionally restoring past results after the actual goal changes also cancels legitimate correction. A design is therefore needed to store observation times, goal versions, the resource/control conditions at the time, and evidence of observation reliability separately in memory histories. Original observations are not modified; subsequent assessments are appended separately. This version integration is a follow-up integration task connected to M19's external goal-version research, not a function already implemented in M33.

Limitations to reflect in the five original hypotheses and three auxiliary hypotheses
Hypothesis 1: Path/connection provenance and temporal order must be maintained. Effective learning in a fixed small network is not physical proof of the original mechanism that grows actual connections through directional traces. The cost of adding minimal connections for functionality and whether original QRNG inputs were reused are retained.
Hypothesis 2: As M18B's finite-resource controls show, nonresponse can indicate transient resource shortage in addition to memory loss. Local molecular/recycling/energy ledgers and determinations of neural-weight retention are separate. Because the ledger does not include electrical stimulation or all ion-pump energy, no claim is made about overall metabolic feasibility.
Hypothesis 3: The original neurotransmitter-release inhibition, synaptic write permissions, electrical inhibition, and the timing of lifting electrical inhibition are specified as distinct interventions. M18A's source-location-selective protection provides conditional evidence. The M34 counterexample is a side effect of an electrical supplementary mechanism; it is not reinterpreted as the same intervention as the original hypothesis.
Hypothesis 4: Under the P(i)=26-i correspondence, dynamic weights, pending transmission events, sensor locations, command targets, and memory-history coordinates must also be transformed. Current static-correspondence validation cannot substitute for inversion validation in a new dynamic-recovery experiment. Dynamic full-state correspondence remains a follow-up check.
Hypothesis 5: A projection retaining only shape can merge records with different temporal orders. O01's counterexample and O02/O03's order-preserving records are preserved together. Uniform shape reduction, lossless file compression, and semantic interpretation of information are different problems. The 22.06% package saving for 108 exactly restored records is not converted into a compression ratio for the entire neural network, meaning, or subjective thought.
For 3A1B, limited evidence for external prediction has increased, but an intrinsic self-model or actual selection benefit remains unverified. For 5A, evidence for accurate archiving of original-form records including order has strengthened. For 3A5B1C, there is evidence for protection at designated locations, but the full proposition of joint preservation of new learning and existing memories and automatic selection of necessary paths remains incomplete. Identifiers and parent-contribution rankings are unchanged.

Follow-up priorities
First, validate early-reinforcement development results on new inputs and compare maintenance schedules including actual observation costs. Second, combine history-based repair with goal versions and resource states to create controls distinguishing an incorrect past from legitimate changes. Third, check the sensitivity of the 40ms write window to changes in input intervals and delays. Fourth, integrate protection, recovery, inversion, and archiving in the same small state and verify resumption identity. Individual successes are not converted into 98% human similarity or percentages of selfhood formation.
~~~~~

### S28. O04–O07 Plane Storage Findings

Validated scope of the occupancy representation. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/H5_LAYER_FINDINGS_O04_O07_KO_V2.txt>)

~~~~~text
User Addition to Hypothesis 5 — Layer-Labeled Plane Storage: Implementation and Boundary Validation
Written UTC: 2026-10-03T03:31:38.847Z

1. Exact representation of the user's proposal
Let V(x,y,z)∈{0,1} indicate whether a line traverses each position of the three-dimensional grid. At each position of one plane P, store P(x,y)={z | V(x,y,z)=1}. Restoration checks whether z∈P(x,y). If the same (x,y) was traversed in multiple layers, all layer numbers are preserved. Simply merging layers by OR removes this property.
This is a reversible representation transformation of the specified grid-occupancy information. It does not mean restoring details of the original continuous curve smaller than the grid resolution. Separate records are required when traversal order, count, direction, or branch connectivity is not determined by spatial occupancy alone. Original order records were preserved.

2. Results using actual existing neural-activity records
The 432 representations obtained by converting 108 existing O02 records to 4 grid resolutions were used. These are not 432 mutually independent neural experiments. O04: exact restoration of three-dimensional bit arrays, per-layer bit sets, and layer-number lists. O05: grouping repeated layer patterns into a dictionary and storing dictionary indexes on the plane also achieved exact restoration in 432/432 cases.
On O05's 6×6×6 grid, the 108 compressed files totaled 10,216 bytes, approximately 5.9% smaller than the three-dimensional bit arrays' 10,856 bytes. Blanket application offered no advantage at other resolutions.
Selecting the smallest method for each record reduced total compressed data from 49,204→47,996 bytes, approximately 2.46%. This figure excludes restoration-code and whole-package-index costs.

3. Full-package comparison (O06)
Gzip was applied to a bundle of JSON files including 432 data items, indexes, restoration code, an executable reader, and explanatory text. The external Node.js runtime and general-purpose gzip/JSON unpacking tools were excluded from both.
- Existing three-dimensional bit arrays: 21343 bytes.
- Per-record minimum-representation selection: 21870 bytes.
- Selective storage is 527 bytes, approximately 2.47%, larger.
Both packages were unpacked into separate folders, and all data were reread with their included readers to confirm identical grid information. A reduction in total storage was not demonstrated for the current actual-record bundle. Having the smallest file size for each representation does not mean the entire compressed bundle is also the smallest.

4. Synthetic-shape boundary checks (O07)
Grids of sizes 8,16,32,64,100 × line/digital diagonal/comb/plane/checkerboard/full occupancy × three directions = 90 synthetic occupancy arrays. All four representations were restored exactly. This was not an experiment increasing the actual number of neurons; there were 0 HH executions.
100³ grid examples (axis 0, gzip bytes for the data themselves; code costs excluded):
- line: existing 255, minimum layer-list 94
- digital-diagonal: existing 501, minimum layer-list 290
- comb: existing 280, minimum palette 121
- plane: existing 255, minimum palette 92
- checkerboard: existing 559, minimum palette 113
- full: existing 249, minimum palette 93
This shows that layer lists and shared patterns can be advantageous when shape and repetition are suitable. Since these are deliberately simple synthetic shapes, the results cannot be interpreted as an average saving rate for actual thought records.

5. Reasoning about conditions for reduced storage
Changing positions alone does not reduce the information quantity of a binary grid. Storing Nx×Ny×Nz bits as Nz bits per two-dimensional position leaves the total number of bits unchanged. Sparsity or repetition must be exploited to reduce it.
If there are D distinct layer patterns, the payload of a simple fixed-length dictionary representation is approximately D×Nz + Nx×Ny×ceil(log2 D) bits. Coordinate-system, dictionary-size, and verification information are added to this. Fewer distinct layer patterns are therefore more favorable, and final costs must be compared again against reference data subjected to general-purpose compression.

6. Current adoption scope
The implementation is retained as a candidate for storing spatial occupancy under Hypothesis 5. It does not replace existing thought-interpretation methods or neural-network checkpoints. The currently smaller existing package is retained for the actual-record bundle. Nonuniform subdivision additionally requires a contract preserving each subdivision boundary and the common coordinate transformation, beyond layer numbers alone.
The existing three derived-hypothesis identifiers were not changed. O04–O07 are research identifiers, not new formal hypothesis numbers.
Evidence: O04_AUDIT_V1.json, O05_AUDIT_V1.json, O06_AUDIT_V1.json, O07_AUDIT_V1.json
~~~~~

### S29. M44 Resource Priority Change

Plan revision, not evidence of completed execution. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/M44_RESOURCE_PRIORITY_NOTE_V1.txt>)

~~~~~text
2026-10-03: Record of Changes to the M44 Preparatory Proposal — This Experiment Has Not Yet Started

The original prepare-m44-v1.mjs was a preparatory proposal for memory retention over 16 cycles and 85.5 seconds. It was not executed, and no QHON experimental protocol or computational results were generated.
The first fixed-rehearsal M43 result showed a transmission-stock shortage at zero-indexed cycle 6, after all 512 units of external energy had already been supplied. Predictive rehearsal lost its first memory in cycle 4, when there was no stock shortage.
Distinguishing resource-dependent access failure from weight forgetting therefore takes precedence over extending retention time. The valid preparatory script is prepare-m44-resource-v1.mjs.
The new proposal explicitly increases the finite external-energy total from 512 to 2048 and preserves the original M43 results with 512 as controls. This is not claimed to be cost-free recovery, and the failures under the original conditions are not concealed.
The original 16-cycle preparation script remains as planning history and will not be executed. Subsequent long-duration tests will proceed under new research numbers and protocols.
~~~~~

### S30. Current Research Session Plan

Schedule and work plan, not evidence of completion. [Source file](<C:/Users/User/Desktop/Quad Hypothesis Of Neuron/campaigns/qhon-continuous-20261002/SESSION12H_20261003_PLAN_V1.json>)

~~~~~json
{
  "schema": "QHON-session12h-plan-v1",
  "utc": "2026-10-03T02:27:21.990Z",
  "startUTC": "2026-10-03T02:12:23Z",
  "deadlineUTC": "2026-10-03T14:12:23Z",
  "deadlineKST": "2026-10-03 23:12:23 +09:00",
  "baseline": "PROGRESS_REPORT_KO_V12.txt",
  "baselineCompletedResultHHReturns": 66336,
  "resources": {
    "diskFreeReserveGiB": 5
  },
  "priority": [
    "M38:fixed early reinforcement expansion to ten remaining cohort5 graphs",
    "M39:prospectively frozen independent cohort6 confirmation, ANU collection12 requests at180second intervals",
    "M40:timing sensitivity of bounded write windows and data-informed interval-dependent candidate",
    "Integrate historical repair with goal versions and resource interpretation, using same-observation controls",
    "Evaluate predictive maintenance with actual observation costs and simple comparator",
    "Extend retained-memory/activity/interference duration only after admitted stable policies",
    "Dynamic whole-state reflection and checkpoint continuation; H5 interpretation limits"
  ],
  "stop": "Deadline or earlier user pause. Pause launches and registered workers preserving state. No automatic restart after pause.",
  "scope": "Functional research, not creation of additional numbered hypotheses. Preserve original five hypotheses and three derived identifiers, failed studies and raw inputs. GNN construction remains held. Existing goal metadata may remain paused; actual research state is CONTROL.json and registered workers."
}
~~~~~

---

End of document. Latest definitions, implementation candidates, conditional validation, failures, and unresolved items are preserved together. This consolidated document does not declare completion of all QHON research or achievement of human similarity.
