import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (p) => readFileSync(new URL('../../' + p, import.meta.url), 'utf8');
const entries = [
  ['forsan', ['411 West 6th St','Casey Thompson','February 26, 2025','2A Division I','District 4','forsan.esc18.net']],
  ['fort-bend-austin', ['3434 Pheasant Creek','Christopher Wilson','Jasmine Hartman','Sugar Land','District 21','ahs.fortbendisd.gov']],
  ['fort-bend-bush', ['6707 FM 1464','Mario MacDonald','Colonious McNeal','District 21','bhs.fortbendisd.gov']],
  ['fort-bend-christian', ['1250 Seventh Street','1201 Lakeview Drive','Kendrick Kitchens','TAPPS','June 1, 2026','fortbendchristian.org']],
  ['fort-bend-clements', ['4200 Elkins Dr.','Bobby Darnell','Mercer Stadium','October 22, 2026','District 21','fortbendisd.gov']],
];
for (const [slug, facts] of entries) {
  const source = read('src/data/high-school-football/program-editorial-b018-' + slug + '.ts');
  for (const fact of facts) assert.ok(source.includes(fact), slug + ' missing first-party source fact ' + fact);
  assert.ok(source.includes('2026-11-13'));
  assert.ok(!/\b(photoUrl|imageUrl|finalScore)\s*:/.test(source), 'No unlicensed images or unsourced scores: ' + slug);
}
const edges = read('src/data/high-school-football/batch018-fourth-five-county-edges.ts');
for (const [slug,county] of [['forsan','howard'],['fort-bend-austin','fort-bend'],['fort-bend-bush','fort-bend'],['fort-bend-christian','fort-bend'],['fort-bend-clements','fort-bend']]) {
  assert.ok(edges.includes("slug: '" + slug + "'") && edges.includes("county: '" + county + "'"), 'Missing campus county: ' + slug);
}
const loader = read('src/data/high-school-football/program-editorial-b018-fourth-five.ts');
assert.ok(loader.includes('export function getBatch018FourthFiveEditorial(slug: string)'), 'Missing typed fourth cohort loader');
const server = read('src/data/high-school-football/football-program-profile.server.ts');
const schoolRoute = read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const countyRoute = read('src/routes/$kind.$slug.lazy.tsx');
assert.ok(server.includes('getBatch018FourthFiveEditorial(canonicalSlug)'), 'Missing UIL SSR fourth cohort');
assert.ok(server.includes('getBatch018FourthFiveEditorial(legacy.featured.slug)'), 'Missing private fallback fourth cohort');
assert.ok(schoolRoute.includes('BATCH018_FOURTH_FIVE_COUNTY_EDGES.map'), 'Missing school-to-county fourth links');
assert.ok(countyRoute.includes('BATCH018_FOURTH_FIVE_COUNTY_EDGES.filter'), 'Missing county-to-school fourth links');
console.log('PASS Batch018 fourth five source-authored modules and staged county records; SSR/county source-integrated; NOT production certified');
