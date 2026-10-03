import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'SOURCE_MANIFEST.json'),'utf8'));
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
for(const f of manifest.files){const p=path.resolve(root,f.file);if(!p.startsWith(root+path.sep))throw Error('MANIFEST_PATH');if(hash(fs.readFileSync(p))!==f.exportSHA256)throw Error('SOURCE_HASH '+f.file);}
const files=[];function walk(dir){for(const f of fs.readdirSync(dir,{withFileTypes:true})){if(f.isDirectory()){if(!['.git','node_modules','private-data','results'].includes(f.name))walk(path.join(dir,f.name));}else files.push(path.join(dir,f.name));}}walk(root);
let checkedImports=0,checkedLinks=0;
for(const p of files){
 if(!/\.(mjs|json|md|ya?ml)$/.test(p))continue;
 const s=fs.readFileSync(p,'utf8');
 // No value is printed if any forbidden pattern is found.
 if(/[A-Za-z]:[\\/]Users[\\/]/i.test(s))throw Error('PRIVATE_ABSOLUTE_PATH '+path.relative(root,p));
 if(/(?:ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|-----BEGIN (?:RSA |OPENSSH )?PRIVATE KEY-----)/.test(s))throw Error('CREDENTIAL_PATTERN '+path.relative(root,p));
 if(s.includes('\uFFFD'))throw Error('TEXT_ENCODING '+path.relative(root,p));
 if(p.endsWith('.mjs')){
  for(const m of s.matchAll(/(?:^|[;\r\n])\s*(?:import|export)\s*(?:[^'";]*?\bfrom\s*)?['"]([^'"]+)['"]/g)){
   const spec=m[1];if(spec.startsWith('node:'))continue;
   if(!spec.startsWith('.'))throw Error('UNDECLARED_DEPENDENCY '+path.relative(root,p));
   const resolved=path.resolve(path.dirname(p),spec);
   if(!resolved.startsWith(root+path.sep)||!fs.existsSync(resolved))throw Error('BROKEN_IMPORT '+path.relative(root,p)+' '+spec);
   checkedImports++;
  }
 }
 if(p.endsWith('.md'))for(const m of s.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)){
  const target=m[1].replace(/^<|>$/g,'').split('#')[0];
  if(!target||/^https?:/.test(target))continue;
  if(!fs.existsSync(path.resolve(path.dirname(p),target)))throw Error('BROKEN_DOC_LINK '+path.relative(root,p)+' '+target);
  checkedLinks++;
 }
}
console.log(JSON.stringify({sourceHashesVerified:manifest.files.length,files:files.length,relativeImportsChecked:checkedImports,localDocumentationLinksChecked:checkedLinks,credentialAndPersonalPathPatternScan:'passed (limited pattern check, not a security certification)',license:JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')).license},null,2));
