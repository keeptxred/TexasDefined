import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(path, 'utf8');
const places = read('src/data/texas-places.ts');
const index = read('src/data/city-authority-index.ts');
const graph = read('src/data/city-metro-authority.ts');
const profile = read('src/data/city-authority-profiles.ts');
const social = read('src/data/city-social-images.ts');
const browse = read('src/routes/browse.cities.tsx');
const route = read('src/routes/$kind.$slug.tsx');
const section = profile.split("  'del-rio': {")[1]?.split("  'corpus-christi': {")[0] || '';

test('Del Rio is a real Texas City entity with explicit authority approval', () => {
  assert.match(places, /\['Del Rio','Val Verde','Southwest Texas'\]/);
  assert.match(index, /\{ name: 'Del Rio', slug: 'del-rio' \}/);
  assert.match(graph, /'del-rio': \{/);
  assert.match(graph, /sourceCheckedAt: '2026-11-13'/);
  assert.match(graph, /'https:\/\/www\.cityofdelrio\.com\/'/);
  assert.match(graph, /'county:val-verde'/);
  assert.match(browse, /CITY_AUTHORITY_SLUGS/);
  assert.match(route, /isIndexableEntityPage\(loaderData\.entity\)/);
});

test('Del Rio Census claims and municipal service boundaries are source-backed', () => {
  assert.ok(section.length > 11_000, 'independent city profile must not be a lightweight summary');
  assert.match(section, /population2020:\s*34_673/);
  assert.match(section, /value:\s*34_496,\s*year:\s*2025/);
  assert.match(section, /census\.gov\/quickfacts\/fact\/table\/delriocitytexas/);
  assert.match(section, /primaryCounty:\s*'Val Verde County'/);
  for (const source of [
    'www.cityofdelrio.com/community/visiting',
    'www.cityofdelrio.com/government/departments/utility-billing',
    'www.cityofdelrio.com/government/departments/transportation',
    'www.cityofdelrio.com/government/departments/international-airport',
    'txschools.gov/?id=233901&view=district',
    'www.nps.gov/amis/planyourvisit/conditions.htm',
    'whiteheadmuseum.org/plan-your-visit.html',
  ]) assert.ok(section.includes(source), 'Missing primary source: ' + source);
});

test('Del Rio guidance distinguishes city services, reservoir, museum and airport', () => {
  for (const claim of [
    'San Felipe Creek','Val Verde County','10477 Highway 90 West','1308 South Main',
    '21800 FM','Laughlin Air Force Base','San Felipe–Del Rio CISD',
    'no general entrance fee','scheduled commercial airline service is not available',
  ]) {
    // Del Rio is not Fort Leaton in Big Bend Ranch; the 21800 FM address must NOT leak.
    if (claim === '21800 FM') assert.ok(!section.includes(claim)); else assert.ok(section.includes(claim), claim);
  }
  assert.match(section, /municipal service area/);
  assert.match(section, /water-level changes|water levels/i);
  assert.match(section, /separate.*(camping|boating)|boating and camping permits/);
});

test('Del Rio hero is distinct, right-attributed and linked to an original license page', () => {
  assert.match(section, /Brown_Plaza\.jpg\?width=1600/);
  assert.match(section, /JherreraCODR · CC BY-SA 4\.0 · Wikimedia Commons/);
  assert.match(section, /commons\.wikimedia\.org\/wiki\/File:Brown_Plaza\.jpg/);
  assert.match(social, /'del-rio': \{ src:.*Brown_Plaza\.jpg/);
});

test('Del Rio is covered by existing 12-city production monitors and exact audit sample', () => {
  assert.match(read('scripts/ci/audit-city-authority-seo.mjs'), /'lubbock','del-rio'/);
  assert.match(read('scripts/ci/verify-city-authority-browser.mjs'), /'lubbock','del-rio'/);
  assert.ok(read('ops/seo/gsc-404-2026-11-13-paths.txt').includes('/city/del-rio'));
});
