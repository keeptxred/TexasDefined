import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (p) => readFileSync(new URL('../../' + p, import.meta.url), 'utf8');
const sources = [
  ['floresville', ['1813 Tiger Lane','1200 5th Street','Ilyan Martinez','Israel Aguero','4A Division I','District 14','tigersjags.fisd.us']],
  ['floydada', ['618 S Tree St','215 N White','Jeff Smith','2A Division I','District 2','board agenda','floydadaisd.esc17.net']],
  ['follett', ['205 E Ivanhoe Ave','six-man','Division II','District 1','Groom','Hedley','follettisd.net']],
  ['forestburg', ['16346 FM 455','six-man','off the main campus','District 10','Cori Hayes','forestburgisd.net']],
  ['forney', ['1800 College Ave','North Forney','Jeff Fleener','Marcus Shavers','Class 6A','District 10','forneyisd.net']],
];
for (const [slug, facts] of sources) {
  const s = read('src/data/high-school-football/program-editorial-b018-' + slug + '.ts');
  for (const fact of facts) assert.ok(s.includes(fact), slug + ': missing official source ' + fact);
  assert.ok(s.includes('2026-11-13'), slug + ': missing verification date');
  assert.ok(!/\b(photoUrl|imageUrl|finalScore)\s*:/.test(s), slug + ': unlicensed photo or unverified result');
}
const edges = read('src/data/high-school-football/batch018-third-five-county-edges.ts');
for (const [slug,county] of [['floresville','wilson'],['floydada','floyd'],['follett','lipscomb'],['forestburg','montague'],['forney','kaufman']]) {
  assert.ok(edges.includes("slug: '" + slug + "'") && edges.includes("county: '" + county + "'"), 'Missing county edge: ' + slug);
}
console.log('PASS Batch018 third-five source modules and staged county records; NOT SSR/county integrated or production certified');
