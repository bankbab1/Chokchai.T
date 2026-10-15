import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {resolve,extname} from 'node:path';
import {readFile} from 'node:fs/promises';
const repo=process.cwd();
export default defineConfig({root:'web',base:'./',publicDir:false,plugins:[react(),tailwindcss(),{
 name:'existing-image-urls',configureServer(server){server.middlewares.use(async(req,res,next)=>{
 const file=decodeURIComponent((req.url||'').split('?')[0]).replace(/^\//,'');
 if(file.includes('/')||!['.png','.jpg','.jpeg','.gif','.svg','.webp','.ico'].includes(extname(file).toLowerCase()))return next();
 try{const bytes=await readFile(resolve(repo,file));res.setHeader('Content-Type',({'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif','.svg':'image/svg+xml','.webp':'image/webp','.ico':'image/x-icon'} as Record<string,string>)[extname(file).toLowerCase()]);res.end(bytes);}catch{next();}
 });}
}],build:{outDir:'../dist',emptyOutDir:true,rollupOptions:{input:{index:resolve(repo,'web/index.html'),profile:resolve(repo,'web/profile.html')}}}});
