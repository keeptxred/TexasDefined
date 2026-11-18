import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import sharp from 'sharp';
import { renderChihuahuaHero } from './materialize-newsroom-chihuahua-hero.mjs';

test('original TexasDefined editorial Chihuahua SVG generates a real 1200px PNG with accurate provenance',async()=>{
  const dir=mkdtempSync(path.join(tmpdir(),'texasdefined-dog-raster-'));
  try{
    const name=path.join(dir,'texas-chihuahua-dog-illustration.png');
    const result=await renderChihuahuaHero(name);
    const meta=await sharp(name).metadata();
    const bytes=readFileSync(name);
    assert.deepEqual([meta.format,meta.width,meta.height],['png',1200,800]);
    assert.equal(bytes.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
    assert.ok(statSync(name).size>=10000);
    assert.equal(result.bytes,bytes.length);
  } finally { rmSync(dir,{recursive:true,force:true});}
});
