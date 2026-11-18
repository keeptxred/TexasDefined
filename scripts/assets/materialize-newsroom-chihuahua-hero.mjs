import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const svgPath=path.join(root,'src/assets/navigation-texas-dogs.svg');
export const rasterPath=path.join(root,'public/images/editorial/texas-chihuahua-dog-illustration.png');

/**
 * First-party editorial drawing is already part of our owned Texas Dogs
 * material. Render a real 1200px PNG at build time instead of exposing an
 * externally rate-limited Wikimedia redirect as a news Open Graph hero.
 * Never claim this is a photograph of a real Chihuahua or a visit.
 */
export async function renderChihuahuaHero(output=rasterPath){
  const svg=fs.readFileSync(svgPath);
  if(!svg.toString('utf8').includes('Editorial illustration of a small long-haired Chihuahua')){
    throw new Error('Expected original TexasDefined Chihuahua illustration is missing.');
  }
  fs.mkdirSync(path.dirname(output),{recursive:true});
  await sharp(svg,{density:96}).resize(1200,800,{fit:'fill'})
    .png({compressionLevel:9,palette:false}).toFile(output);
  const meta=await sharp(output).metadata();
  const bytes=fs.statSync(output).size;
  if(meta.format!=='png'||meta.width!==1200||meta.height!==800||bytes<10000) {
    throw new Error('TexasDefined Chihuahua OG hero must be a real 1200×800 raster PNG of at least 10KB.');
  }
  return {path:output,bytes,width:meta.width,height:meta.height};
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const out=await renderChihuahuaHero();
  console.log('Materialized first-party illustrated Chihuahua news hero '+path.relative(root,out.path)+' ('+out.bytes+' bytes)');
}
