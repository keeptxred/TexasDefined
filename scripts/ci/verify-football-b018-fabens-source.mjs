import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const guide = read('src/data/high-school-football/program-editorial-b018-fabens.ts');
const farmersville = read('src/data/high-school-football/program-editorial-b018-farmersville.ts');
const fallsCity = read('src/data/high-school-football/program-editorial-b018-falls-city.ts');
const falfurrias = read('src/data/high-school-football/program-editorial-b018-falfurrias.ts');
const fairfield = read('src/data/high-school-football/program-editorial-b018-fairfield.ts');
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
for (const value of ['499 North State Hwy 78', 'Zac Quinlan', 'Rank One', 'TicketSpicket', 'Hometown Ticketing', 'District 7', 'Alpha_26-28.pdf', '2026-11-13']) assert.ok(farmersville.includes(value), 'Missing Farmersville official-source fact: ' + value);
assert.ok(server.includes('getBatch018FarmersvilleEditorial(canonicalSlug)'));
assert.ok(edges.includes("county: 'collin'") && edges.includes("slug: 'farmersville'"));
assert.ok(!/\b(photoUrl|imageUrl|finalScore)\s*:/.test(farmersville));
for (const value of ['700 N. Nelson St.', '525 N. Nelson St.', 'Beaver Stadium', 'District 15', '2026_RR-Packet.pdf', 'fcisd.net/contact-us/visiting-campus', 'fcisd.net/athletics/athletic-schedules']) assert.ok(fallsCity.includes(value), 'Missing Falls City source: ' + value);
assert.ok(server.includes('getBatch018FallsCityEditorial(canonicalSlug)'));
assert.ok(edges.includes("county: 'karnes'") && edges.includes("slug: 'falls-city'"));
assert.ok(!/\b(photoUrl|imageUrl|finalScore)\s*:/.test(fallsCity));
for (const value of ['100 Jersey Drive', 'Alpha_26-28.pdf', 'District 16', 'Lamar Rodriguez', 'fhs.bcisd.us/activities/athletics', 'Hometown Ticketing', 'Brooks County', '2026-11-13']) assert.ok(falfurrias.includes(value), 'Missing Falfurrias source: ' + value);
assert.ok(server.includes('getBatch018FalfurriasEditorial(canonicalSlug)'));
assert.ok(edges.includes("county: 'brooks'") && edges.includes("slug: 'falfurrias'"));
assert.ok(!/\b(photoUrl|imageUrl|finalScore)\s*:/.test(falfurrias));
for (const value of ['631 Post Oak Road', '3AD1FB2026.pdf', 'Berton A. Yates Stadium', 'East Chambers', '2026-11-13', 'fairfieldisd.net/fairfieldhighschool', 'fairfieldeagles.net/sport/football/boys/', 'November 9', 'Willis']) assert.ok(fairfield.includes(value), 'Missing Fairfield first-party source: ' + value);
assert.ok(server.includes('getBatch018FairfieldEditorial(canonicalSlug)'));
assert.ok(edges.includes("county: 'freestone'") && edges.includes("slug: 'fairfield'"));
assert.ok(!/\b(photoUrl|imageUrl|headCoach|finalScore)\s*:/.test(fairfield), 'Unlicensed Fairfield media or unsourced final result');
assert.ok(edges.includes("county: 'el-paso'") && edges.includes("slug: 'fabens'"));
assert.ok(server.includes('getBatch018FirstFabensEditorial(canonicalSlug)'));
assert.ok(school.includes('BATCH018_FOOTBALL_COUNTY_EDGES.map'));
assert.ok(county.includes('BATCH018_FOOTBALL_COUNTY_EDGES.filter'));
assert.ok(!/\b(photoUrl|imageUrl|headCoach|finalScore)\s*:/.test(guide), 'Unlicensed media or unverified claims');
console.log('PASS Batch018 five first-cohort source-backed guides, SSR and reciprocal campus-county edges; NOT production certified');
