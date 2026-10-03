// Symbolic contribution bookkeeping for a complete thought record.
// No neuron emotion assignments, dynamics, synapse writes or consciousness claims.
export const VERSION='QHON-neuron-contribution-proposal-v1';
const natural=(x,label)=>{if(!Number.isSafeInteger(x)||x<0)throw Error(label);};
const finite=(x,label)=>{if(!Number.isFinite(x))throw Error(label);};
export function thoughtContributions(shape){
  if(!shape||!Array.isArray(shape.nodes)||!Array.isArray(shape.edges)||!Array.isArray(shape.events)||!Array.isArray(shape.spikes)||!Array.isArray(shape.window)||shape.window.length!==2)throw Error('CONTRIBUTION_SHAPE');
  const [start,end]=shape.window;finite(start,'WINDOW');finite(end,'WINDOW');if(start>end)throw Error('WINDOW');
  const nodes=new Map();for(const node of shape.nodes){natural(node.id,'NODE');if(nodes.has(node.id)||!Array.isArray(node.xyz)||node.xyz.length!==3||!node.xyz.every(Number.isFinite))throw Error('NODE');nodes.set(node.id,node.xyz);}
  const edges=new Set();for(const edge of shape.edges){if(!Array.isArray(edge)||edge.length!==2||!nodes.has(edge[0])||!nodes.has(edge[1])||edge[0]===edge[1])throw Error('EDGE');const key=edge.join(':');if(edges.has(key))throw Error('DUPLICATE_EDGE');edges.add(key);}
  const ids=[...nodes.keys()].sort((a,b)=>a-b),rows=new Map(ids.map(id=>[id,{id,distinctRecordedNeuron:0,spikeEvents:0,receivedDeliveries:0,naiveEdgeEndpointCount:0}]));
  const active=new Set(),spikes=new Map(),eventIDs=new Set(),usedEdges=new Set();
  for(const spike of shape.spikes){if(!Array.isArray(spike)||spike.length!==2||!nodes.has(spike[0]))throw Error('SPIKE');const [id,at]=spike;finite(at,'SPIKE_TIME');if(at<start||at>end)throw Error('SPIKE_WINDOW');if(!spikes.has(id))spikes.set(id,new Set());if(spikes.get(id).has(at))throw Error('DUPLICATE_SPIKE');spikes.get(id).add(at);rows.get(id).spikeEvents++;active.add(id);}
  let carryInDeliveries=0,emissionsWithoutInWindowSpike=0;
  for(const event of shape.events){
    const {source,target,sequence,emittedAt,arrivedAt,g}=event;natural(sequence,'EVENT_ID');
    if(eventIDs.has(sequence))throw Error('DUPLICATE_EVENT');eventIDs.add(sequence);
    const key=source+':'+target;if(!edges.has(key))throw Error('EVENT_EDGE');usedEdges.add(key);
    finite(emittedAt,'EVENT_TIME');finite(arrivedAt,'EVENT_TIME');finite(g,'EVENT_G');
    if(g<=0||emittedAt>arrivedAt||arrivedAt<start||arrivedAt>end)throw Error('EVENT_TIME_OR_G');
    if(emittedAt<start)carryInDeliveries++;
    if(!spikes.get(source)?.has(emittedAt)){
      if(emittedAt>=start)throw Error('EVENT_WITHOUT_IN_WINDOW_SOURCE_AP');
      emissionsWithoutInWindowSpike++;
    }
    rows.get(source).naiveEdgeEndpointCount++;rows.get(target).naiveEdgeEndpointCount++;
    rows.get(target).receivedDeliveries++;active.add(source);active.add(target);
  }
  // These are activity-record nodes/edges, not a supplied list of all potential cells.
  if(active.size!==nodes.size||usedEdges.size!==edges.size)throw Error('UNOBSERVED_GEOMETRY');
  for(const id of active)rows.get(id).distinctRecordedNeuron=1;
  const coefficients=[...rows.values()];
  for(const row of coefficients)for(const key of ['spikeEvents','receivedDeliveries','naiveEdgeEndpointCount'])natural(row[key],'COUNT_OVERFLOW');
  return{schema:VERSION,sourceFrame:shape.frame,window:[...shape.window],shape:structuredClone(shape),coefficients,
    observed:{recordedNeurons:active.size,spikeEvents:shape.spikes.length,deliveredEvents:shape.events.length,carryInDeliveries,emissionsWithoutInWindowSpike},
    policies:{distinctRecordedNeuron:'Each neuron in the complete spatial/AP record contributes once; the same source repeated on many branches does not multiply its coefficient.',spikeEvents:'Each actual recorded AP contributes once; a passive delivery without a target AP is not an AP contribution.',receivedDeliveries:'Counts actual arrivals, including carry-in events; a distinct observable, not assumed to equal neuron activation.',naiveEdgeEndpointCount:'Diagnostic only: summing both endpoints per edge multiplies source contribution by fan-out. Not an adopted aggregation rule.'},
    adoptedPolicy:null,scope:'Alternative symbolic coefficients only. No basic emotions or biological meaning assigned. Whole shape retained; omitted/out-of-window causal parents are not invented. Contribution count is distinct from geometric length, learned efficacy and subjective feeling.'};
}
export function evaluateAssignedContributions(record,{policy,labels,assignments}){
  if(record?.schema!==VERSION||!['distinctRecordedNeuron','spikeEvents','receivedDeliveries'].includes(policy))throw Error('CONTRIBUTION_POLICY');
  // Recompute coefficients from the retained shape, so an altered summary is rejected.
  const actual=thoughtContributions(record.shape);
  if(JSON.stringify(actual.coefficients)!==JSON.stringify(record.coefficients))throw Error('CONTRIBUTION_COEFFICIENT_CHANGED');
  if(!Array.isArray(labels)||labels.length<1||labels.length>64||labels.some(x=>typeof x!=='string'||!x)||new Set(labels).size!==labels.length||!(assignments instanceof Map))throw Error('ASSIGNMENTS');
  if(assignments.size!==actual.coefficients.length)throw Error('ASSIGNMENT_COVERAGE');
  const raw=Array(labels.length).fill(0);let totalContributions=0;
  for(const row of actual.coefficients){const values=assignments.get(row.id);if(!Array.isArray(values)||values.length!==labels.length||!values.every(Number.isFinite))throw Error('ASSIGNMENT_VECTOR');totalContributions+=row[policy];for(let k=0;k<raw.length;k++){raw[k]+=row[policy]*values[k];finite(raw[k],'ASSIGNMENT_SUM_OVERFLOW');}}
  natural(totalContributions,'TOTAL_OVERFLOW');
  return{policy,labels:[...labels],raw,totalContributions,mean:totalContributions?raw.map(x=>x/totalContributions):null,
    scope:'Explicit caller-assigned numerical basis only. Raw sum is preserved; separately reported mean does not replace it. No emotion label or neuron assignment is supplied by this module.'};
}
