import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (p) => readFileSync(new URL('../../' + p, import.meta.url), 'utf8');
const guide = read('src/data/high-school-football/program-editorial-b018-farwell.ts');
const ferris = read('src/data/high-school-football/program-editorial-b018-ferris.ts');
const ledger = read('docs/football-authority/schools/farwell-b018.md');
for (const fact of ['801 Avenue G', '805 Avenue G', '2A Division I', 'District 2', 'Spearman', 'Happy State Bank Stadium', 'Canyon', 'November 13', '4 p.m.', '$5', '2026-11-13', 'farwellschools.org/page/article/1671']) {
  assert.ok(guide.includes(fact), 'Missing Farwell first-party source detail: ' + fact);
}
assert.ok(ledger.includes('NOT_REVIEWED'));
for (const fact of ['1025 E 8th St', '301 E 5th St', '4A Division I', 'District 7', 'Yellowjacket Stadium', 'Tony Castillo', 'Dallas Pinkston', 'Kaufman', '2026-11-13']) assert.ok(ferris.includes(fact), 'Missing Ferris source fact: ' + fact);
assert.ok(!/\b(photoUrl|imageUrl|finalScore)\s*:/.test(ferris));
assert.ok(guide.includes('designated home team'));
assert.ok(!/\b(photoUrl|imageUrl|finalScore|headCoach)\s*:/.test(guide), 'Unlicensed media or unverified result/coach');
console.log('PASS Farwell and Ferris source-only editorial research; SSR and county integration still pending');
