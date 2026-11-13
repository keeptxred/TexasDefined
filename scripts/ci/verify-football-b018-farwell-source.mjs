import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (p) => readFileSync(new URL('../../' + p, import.meta.url), 'utf8');
const guide = read('src/data/high-school-football/program-editorial-b018-farwell.ts');
const florence = read('src/data/high-school-football/program-editorial-b018-florence.ts');
const flatonia = read('src/data/high-school-football/program-editorial-b018-flatonia.ts');
const fba = read('src/data/high-school-football/program-editorial-b018-first-baptist-dallas.ts');
const ferris = read('src/data/high-school-football/program-editorial-b018-ferris.ts');
const edges = read('src/data/high-school-football/batch018-second-five-county-edges.ts');
const ledger = read('docs/football-authority/schools/farwell-b018.md');
for (const fact of ['801 Avenue G', '805 Avenue G', '2A Division I', 'District 2', 'Spearman', 'Happy State Bank Stadium', 'Canyon', 'November 13', '4 p.m.', '$5', '2026-11-13', 'farwellschools.org/page/article/1671']) {
  assert.ok(guide.includes(fact), 'Missing Farwell first-party source detail: ' + fact);
}
assert.ok(ledger.includes('NOT_REVIEWED'));
for (const [slug, county] of [['farwell','parmer'],['ferris','ellis'],['first-baptist-dallas','dallas'],['flatonia','fayette'],['florence','williamson']]) assert.ok(edges.includes("slug: '" + slug + "'") && edges.includes("county: '" + county + "'"), 'Missing school county edge: ' + slug);
for (const fact of ['401 FM 970', '306 College Avenue', 'Quentin Posey', 'Russell Porterfield', '3A Division II', 'District 13', 'florenceisd.net/o/fhs/staff', '2026-11-13']) assert.ok(florence.includes(fact), 'Missing Florence official-source fact: ' + fact);
assert.ok(!/\b(photoUrl|imageUrl|finalScore)\s*:/.test(florence));
for (const fact of ['400 E 4th St', '2A Division I', 'District 15', 'Gabriel Adamek', 'Rank One', 'sec.flatoniaisd.net', 'flatoniaisd.net/generalinfo', '2026-11-13']) assert.ok(flatonia.includes(fact), 'Missing Flatonia official-source fact: ' + fact);
assert.ok(!/\b(photoUrl|imageUrl|finalScore|headCoach)\s*:/.test(flatonia));
for (const fact of ['7898 Samuell Blvd.', '7894 Samuell Blvd.', 'TAPPS', '2013', '2023', 'Division IV', 'Jason Lovvorn', 'fbacademy.com/athletics/dallas-football-program/', '2026-11-13']) assert.ok(fba.includes(fact), 'Missing First Baptist Dallas first-party fact: ' + fact);
assert.ok(!fba.includes('UIL district team') || fba.includes('not a UIL district team'));
assert.ok(!/\b(photoUrl|imageUrl|finalScore)\s*:/.test(fba));
for (const fact of ['1025 E 8th St', '301 E 5th St', '4A Division I', 'District 7', 'Yellowjacket Stadium', 'Tony Castillo', 'Dallas Pinkston', 'Kaufman', '2026-11-13']) assert.ok(ferris.includes(fact), 'Missing Ferris source fact: ' + fact);
assert.ok(!/\b(photoUrl|imageUrl|finalScore)\s*:/.test(ferris));
assert.ok(guide.includes('designated home team'));
assert.ok(!/\b(photoUrl|imageUrl|finalScore|headCoach)\s*:/.test(guide), 'Unlicensed media or unverified result/coach');
console.log('PASS five second-cohort source-only editorial guides; SSR and county integration still pending');
