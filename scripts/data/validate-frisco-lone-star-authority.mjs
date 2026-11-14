#!/usr/bin/env node
// Focused source, template, and no-unlicensed-score automation contract.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p) => readFileSync(p, 'utf8');
const editorial = read('src/data/high-school-football/program-editorial-frisco-lone-star.ts');
const server = read('src/data/high-school-football/football-program-profile.server.ts');
const identities = read('src/data/high-school-football/school-identities.ts');
const template = read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const ledger = JSON.parse(read('docs/football-authority/official-source-watch.json'));
const workflow = read('.github/workflows/check-football-authority-official-sources.yml');
const monitor = read('scripts/data/check-football-authority-official-sources.mjs');

for (const fact of ['2015', '2025', '2026–28', 'Nick Bolton',
  '14 consecutive winning seasons', '2606 Panther Creek Parkway']) {
  assert.ok(editorial.includes(fact), 'Missing verified Lone Star fact: ' + fact);
}
for (const source of ['https://www.friscoisd.org/o/lshs',
  'https://www.friscoisd.org/article/3120877',
  'https://files-backend.assets.thrillshare.com/documents/asset/uploaded_file/5799/Fisd/4e4f782e-9f60-4246-aa9a-6854740f2f4c/2026-Fball-Schedule-8-21.pdf?disposition=inline',
  'https://realignment.uiltexas.org/alignments/2026/5AD1FB2026.pdf']) {
  assert.ok(editorial.includes(source), 'Missing primary citation: ' + source);
}
assert.match(editorial, /slug: 'frisco-lone-star'/);
assert.doesNotMatch(editorial, /^\s*season:\s*\{/m, 'Scores/record feed must remain deferred');
assert.ok(editorial.includes("name: 'Jeff Rayburn'"), 'Missing date-qualified 2026 head coach');
assert.ok(editorial.includes('https://www.maxpreps.com/tx/frisco/lone-star-rangers/football/staff/'), 'Dated UIL partner coaching source missing');
assert.ok(server.includes("import('./program-editorial-frisco-lone-star')"));
assert.ok(server.includes("canonicalSlug === 'frisco-lone-star'"));
assert.ok(identities.includes("sourceUrl: 'https://www.friscoisd.org/o/lshs'"));
assert.ok(!identities.includes('https://sf2.friscoisd.org/campus/high-school/lone-star/home'));
assert.ok(template.includes("slug === 'frisco-lone-star' ? 'Official 2026 schedule & game-day resources'"));
assert.ok(template.includes("slug !== 'frisco-lone-star' && <FootballMonetizationSlot"));
assert.ok(template.includes("slug !== 'frisco-lone-star' && sponsorPlacement ?"));
assert.ok(template.includes('Independent page sponsors and TexasDefined shop'));
assert.ok(template.indexOf('Independent page sponsors and TexasDefined shop') > template.indexOf('Source trail'), 'Commercial modules must follow source-backed content');
assert.ok(workflow.includes("cron: '43 12 * * 2'"));
assert.ok(workflow.includes("cron: '23 12 * 8-12 6'"));
assert.ok(monitor.includes('perRunSourceCap'));
assert.ok(ledger.safety.perRunSourceCap <= 25, 'Keep source watcher bounded');
const matches = ledger.sources.filter((row) => row.slug === 'frisco-lone-star');
assert.equal(matches.length, 1, 'Exactly one official Lone Star watcher source');
assert.equal(matches[0].url, 'https://files-backend.assets.thrillshare.com/documents/asset/uploaded_file/5799/Fisd/4e4f782e-9f60-4246-aa9a-6854740f2f4c/2026-Fball-Schedule-8-21.pdf?disposition=inline');
assert.equal(matches[0].reviewAfter, '2027-01-29', 'Explicit next quarter editorial due date');
assert.ok(ledger.safety.approvedDomains.includes('www.friscoisd.org'));
console.log('Frisco Lone Star source-backed authority, deferral, and GitHub cadence validated.');
