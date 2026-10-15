import {cp,readdir,copyFile,rm} from 'node:fs/promises';
// Keep branch/root GitHub Pages hosting and every existing image URL intact.
await rm('assets',{recursive:true,force:true});
for(const name of ['index.html','profile.html','assets']) await cp(`dist/${name}`,name,{recursive:true});
for(const file of await readdir('.')) if(/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(file)) await copyFile(file,`dist/${file}`);
