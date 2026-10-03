import fs from 'node:fs';
import {formQhonReference,estimateCompleteCube,GNN_DESIGN_RULES} from '../src/gnn/formation-rules.mjs';
const args=process.argv.slice(2);let bytes,inputKind;
if(args.length===1&&args[0]==='--fixture'){
 bytes=Buffer.alloc(1024);for(let i=0;i<bytes.length;i++)bytes[i]=(i*73+19)&255;
 inputKind='synthetic-test-fixture';
}else if(args.length===2&&args[0]==='--qrng-file'){
 bytes=fs.readFileSync(args[1]);inputKind='anu-qrng-recording';
}else throw Error('Usage: node examples/formation.mjs --fixture OR --qrng-file PATH_TO_RECORDED_LE_UINT32_BYTES');
console.log(JSON.stringify({designImplemented:GNN_DESIGN_RULES.completeGnnImplemented,originalProposalCount:estimateCompleteCube({side:100,directed:true,selfConnections:false}),graph:formQhonReference(bytes,{inputKind})},null,2));
