import {cpSync,existsSync,mkdirSync,readFileSync,writeFileSync,readdirSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2);
const value=args.includes('--site-url')?args[args.indexOf('--site-url')+1]:process.env.SITE_URL;
if(!value){console.error('Informe SITE_URL no ambiente ou --site-url https://dominio-real.com.br');process.exit(1);}
let url;
try{url=new URL(value);}catch{console.error('SITE_URL deve ser uma URL HTTPS válida.');process.exit(1);}
if(url.protocol!=='https:'||url.username||url.password||url.pathname!=='/'||url.search||url.hash||url.hostname==='seu-dominio.com.br'){
  console.error('Use somente a origem HTTPS do domínio real, sem subpasta, credenciais, consulta ou fragmento.');process.exit(1);
}
const destination=path.join(root,'dist');
// Prevent stale outputs without deleting user files: this tiny static bundle has a fixed inventory.
if(existsSync(destination)){
  const marker=path.join(destination,'.segunda-banca-build');
  if(!existsSync(marker)){console.error('dist/ já existe sem marcador deste build. Use uma cópia limpa do projeto.');process.exit(1);}
}
mkdirSync(destination,{recursive:true});
cpSync(path.join(root,'public'),destination,{recursive:true});
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
for(const filename of walk(destination).filter(f=>f.endsWith('.html'))){
  const relative=path.relative(destination,filename).split(path.sep).join('/').replace(/index\.html$/,'');
  const canonical=url.origin+'/'+relative;
  let html=readFileSync(filename,'utf8');
  html=html.replace(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi,'');
  html=html.replace(/<meta\b[^>]*\bproperty=["']og:url["'][^>]*>/gi,'');
  html=html.replace('</head>',`<link rel="canonical" href="${canonical}"><meta property="og:url" content="${canonical}"></head>`);
  writeFileSync(filename,html);
}
writeFileSync(path.join(destination,'.segunda-banca-build'),'Generated from public/. Not a Sites deployment.\n');
console.log(`Build pronto em dist/ para ${url.origin}. Somente canonical e og:url foram adaptados; public/ permaneceu intacta.`);
