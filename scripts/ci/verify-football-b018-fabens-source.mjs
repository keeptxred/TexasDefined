import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const guide = read('src/data/high-school-football/program-editorial-b018-fabens.ts');
const edges = read('src/data/high-school-football/batch018-county-edges.ts');
const server = read('src/data/high-school-football/football-program-profile.server.ts');
const school = read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const county = read('src/routes/$kind.$slug.lazy.tsx');
const ledger = read('docs/football-authority/schools/fabens-b018.md');

for (const value of [
  'fabens', '601 NE G Avenue', '600 NE 4th Street', '(915) 765-2634',
  '4AD2FB2026.pdf', 'https://fhs.fabensisd.net/',
  'https://www.fabensisd.net/departments/athletics/wildcats',
  '2026-11-13', 'Class 4A Division II', 'stadium',
]) assert.ok(guide.includes(value), 'Missing Fabens sourced detail: ' + value);
assert.ok(ledger.includes('El Paso County'));
assert.ok(edges.includes("county: 'el-paso'") && edges.includes("slug: 'fabens'"));
assert.ok(server.includes('getBatch018FirstFabensEditorial(canonicalSlug)'));
assert.ok(school.includes('BATCH018_FOOTBALL_COUNTY_EDGES.map'));
assert.ok(county.includes('BATCH018_FOOTBALL_COUNTY_EDGES.filter'));
assert.ok(!/\b(photoUrl|imageUrl|headCoach|finalScore)\s*:/.test(guide), 'Unlicensed media or unverified claims');
console.log('PASS Batch018 Fabens source-backed guide, SSR and reciprocal campus-county edges; NOT production certified');
