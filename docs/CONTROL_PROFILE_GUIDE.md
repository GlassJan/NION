# ControlNeuron 사용법

목표 지향 신경망 이전 필수 단일 세포 프로필입니다. 실제 연결·학습·Krita 조작은 없습니다. 기존 상세 세포를 대체하거나 생물학적 동등성을 주장하지 않습니다.

```javascript
import {ControlNeuron, createControlConfig} from './src/digital-neuron/control-neuron.mjs';
import {SimulationClock} from './src/digital-neuron/runtime.mjs';
import {q} from './src/digital-neuron/units.mjs';

const config = createControlConfig(); // reuse this immutable object across cells
const clock = new SimulationClock(q(0, 's'));
const cell = new ControlNeuron(config, {clock});
cell.receive({sequence: 0, time: q(1, 'ms'), kind: 'excitatory', conductance: q(10, 'nS')});
cell.advance(q(10, 'ms'));
const observations = cell.outputs();
const copy = new ControlNeuron(config, {clock});
copy.restore(JSON.parse(JSON.stringify(cell.snapshot())));
if (cell.stateHash !== copy.stateHash) throw Error('Replay mismatch');
console.log(observations.time_s, observations.total_spikes);
```

입력 sequence는 0부터 순서대로 증가하며 time은 절대 모의 시각입니다. 반복 표시용 spikes 배열은 제한된 이력입니다. 소비자는 spikesSince(cursor)를 사용하고 SPIKE_HISTORY_EVICTED를 손실로 처리해야 합니다. 기록과 발화의 유실 개수는 명시적으로 보고됩니다. 명령 이력은 자동으로 버리지 않으며 기본 4096개 이후 거부합니다.

설정 숫자는 q로 명시합니다. configure/learn/connect처럼 구현하지 않은 API는 없습니다. 필요한 범위는 명세 (original reference: `CONTROL_SPEC.md`), 등록부 (original reference: `CONTROL_REGISTRY.json`), 검증 보고 (original reference: `CONTROL_REPORT_KO.md`)에 있습니다.
