import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (p) => readFileSync(new URL('../../' + p, import.meta.url), 'utf8');
const entries = [
  ['fort-bend-crawford', ['801 Caldwell Ranch','David Jackson','La Porte','51–24','Traylor Stadium','5A Division II','District 11']],
  ['fort-bend-dulles', ['550 Dulles Avenue','1959','Corey Stewart','5A Division I','District 11','dhs.fortbendisd.gov']],
  ['fort-bend-elkins', ['7007 Knights Court','Trae Grimes','Courtney Muceus','Class 6A','District 21','ehs.fortbendisd.gov']],
  ['fort-bend-hightower', ['3333 Hurricane Lane','3335 Hurricane Lane','Hall Stadium','L.V. Hightower','Class 6A','District 21']],
  ['fort-bend-kempner', ['14777 Voss Road','281-634-2363','Reginald Brown','5A Division II','District 11','khs.fortbendisd.gov']],
];
for (const [slug, facts] of entries) {
  const s = read('src/data/high-school-football/program-editorial-b018-' + slug + '.ts');
  for (const fact of facts) assert.ok(s.includes(fact), slug + ': missing official-source fact ' + fact);
  assert.ok(s.includes('2026-11-13'));
  assert.ok(!/\b(photoUrl|imageUrl|finalScore)\s*:/.test(s), 'Unlicensed image or unsourced final score: ' + slug);
}
const edges = read('src/data/high-school-football/batch018-fifth-five-county-edges.ts');
for (const [slug] of entries) {
  const exactEdge = new RegExp("\\\\{ slug: '" + slug + "', name: '[^']+', county: 'fort-bend'");
  assert.ok(exactEdge.test(edges), 'Missing exact Fort Bend campus county for: ' + slug);
}
const loader = read('src/data/high-school-football/program-editorial-b018-fifth-five.ts');
assert.ok(loader.includes('export function getBatch018FifthFiveEditorial(slug: string)'), 'Missing typed fifth cohort loader');
const server = read('src/data/high-school-football/football-program-profile.server.ts');
const schoolRoute = read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const countyRoute = read('src/routes/$kind.$slug.lazy.tsx');
assert.ok(server.includes('getBatch018FifthFiveEditorial(canonicalSlug)'), 'Missing UIL SSR fifth cohort');
assert.ok(server.includes('getBatch018FifthFiveEditorial(legacy.featured.slug)'), 'Missing private fallback fifth cohort');
assert.ok(schoolRoute.includes('BATCH018_FIFTH_FIVE_COUNTY_EDGES.map'), 'Missing school-to-county fifth links');
assert.ok(countyRoute.includes('BATCH018_FIFTH_FIVE_COUNTY_EDGES.filter'), 'Missing county-to-school fifth links');
console.log('PASS Batch018 final five original source modules and staged county records; SSR/county source-integrated; NOT production certified');
