import http from 'node:http';
import {stat,readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const folder=process.argv[2]||'public';
if(!['public','dist'].includes(folder))throw new Error('Use public ou dist.');
const root=path.join(project,folder);
await stat(root).catch(()=>{throw new Error('Diretório ausente. Para preview, execute o build primeiro.');});
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.png':'image/png','.pdf':'application/pdf'};
const server=http.createServer(async(req,res)=>{
  try{
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
    let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let filename=path.resolve(root,'.'+pathname);
    if(!filename.startsWith(root+path.sep)&&filename!==root){res.writeHead(403);res.end();return;}
    let info=await stat(filename);
    if(info.isDirectory()){
      if(!pathname.endsWith('/')){res.writeHead(308,{Location:pathname+'/'});res.end();return;}
      filename=path.join(filename,'index.html');info=await stat(filename);
    }
    if(!info.isFile())throw new Error('Not a file');
    const content=await readFile(filename);
    res.writeHead(200,{'Content-Type':types[path.extname(filename)]||'application/octet-stream','Content-Length':content.length,'Cache-Control':'no-store'});
    res.end(req.method==='HEAD'?undefined:content);
  }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Arquivo não encontrado');}
});
server.listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log(`Prévia de ${folder}: http://127.0.0.1:${server.address().port}`));
