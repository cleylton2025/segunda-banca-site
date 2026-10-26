import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const base=path.join(root,'public');
const manifest=JSON.parse(readFileSync(path.join(root,'docs','snapshot.json'),'utf8'));
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
let errors=[];let warnings=[];
for(const file of manifest.files){
  const target=path.join(base,file.path);
  if(!existsSync(target)){errors.push('Arquivo ausente: '+file.path);continue;}
  const actual=createHash('sha256').update(readFileSync(target)).digest('hex');
  if(actual!==file.sha256)errors.push('Snapshot foi alterado: '+file.path);
}
for(const filename of walk(base).filter(f=>f.endsWith('.html'))){
  const text=readFileSync(filename,'utf8');
  if((text.match(/<h1\b/g)||[]).length!==1)errors.push('Esperado um h1: '+filename);
  const page='/'+path.relative(base,filename).split(path.sep).join('/');
  for(const match of text.matchAll(/(?:href|src)=["']([^"']+)["']/g)){
    const link=match[1];if(/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(link))continue;
    const u=new URL(link,'https://snapshot.test'+page);
    let target=path.join(base,decodeURIComponent(u.pathname));
    if(u.pathname.endsWith('/'))target=path.join(target,'index.html');
    if(!existsSync(target)){errors.push('Link/asset local ausente: '+link);continue;}
    if(u.hash&&target.endsWith('.html')){
      const fragment=decodeURIComponent(u.hash.slice(1));
      const source=readFileSync(target,'utf8');
      if(!source.includes(`id="${fragment}"`)&&!source.includes(`id='${fragment}'`))warnings.push('Âncora preexistente sem destino: '+link+' em '+page);
    }
  }
}
for(const warning of [...new Set(warnings)])console.warn('AVISO: '+warning);
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`OK: ${manifest.files.length} arquivos preservados byte a byte; páginas, links e assets locais conferidos.`);
