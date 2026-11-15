import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

function eventRecord(file, slug) {
  const body = fs.readFileSync(path.resolve(file), 'utf8');
  const start = body.indexOf('slug: "' + slug + '"');
  assert.ok(start >= 0, 'Missing event: ' + slug);
  let end = body.indexOf('\n  },', start);
  if (end < 0) end = body.length;
  return body.slice(start, end);
}
const record = (tranche, slug) => eventRecord(
  'src/data/major-event-expanded-authority-tranche' + tranche + '.server.ts', slug);

test('fourth editorial tranche records only genuine organizer rechecks', () => {
  const reviewed = [
    [13, 'austin-chronicle-hot-sauce-festival'],
    [17, 'galveston-juneteenth-celebrations'],
    [17, 'granbury-founders-day-jubilee'],
    [23, 'great-american-scrapbook-convention'],
    [18, 'larry-joe-taylor-texas-music-festival'],
    [12, 'luling-watermelon-thump'],
    [20, 'rockport-art-festival'],
  ];
  for (const [tranche, slug] of reviewed)
    assert.match(record(tranche, slug), /sourceCheckedAt: "2026-11-15"/,
      'Editorial verification missing: ' + slug);
  for (const slug of ['bandera-round-up-cattle-drive', 'mckinney-oktoberfest',
    'terlingua-international-chili-championship'])
    assert.match(eventRecord('src/data/major-event-index.ts', slug),
      /sourceCheckedAt: "2026-11-15"/);
});
test('new verified future dates cannot be replaced with past year or inference', () => {
  const gasc = record(23, 'great-american-scrapbook-convention');
  assert.match(gasc, /city: "Arlington"/);
  assert.match(gasc, /startDate: "2027-06-11"/);
  assert.match(gasc, /endDate: "2027-06-12"/);
  assert.doesNotMatch(gasc, /venue: "Mesquite Convention Center"/);
  const mckinney = eventRecord('src/data/major-event-index.ts','mckinney-oktoberfest');
  assert.match(mckinney, /startDate: "2027-09-24"/);
  const chili = eventRecord('src/data/major-event-index.ts',
    'terlingua-international-chili-championship');
  assert.match(chili, /startDate: "2027-11-02"/);
  assert.match(chili, /endDate: "2027-11-06"/);
  assert.match(chili, /November 1 setup\/early gathering/);
  const june = record(17,'galveston-juneteenth-celebrations');
  assert.match(june, /June 1–30, 2027/);
});
test('historical-only festivals never advertise fabricated 2027 admission', () => {
  const granbury = record(17,'granbury-founders-day-jubilee');
  assert.match(granbury, /startDate: "2026-03-13"/);
  assert.doesNotMatch(granbury, /startDate: "2027-03-19"/);
  const luling = record(12,'luling-watermelon-thump');
  assert.match(luling, /startDate: "2026-06-25"/);
  assert.doesNotMatch(luling, /startDate: "2027-06-24"/);
  assert.match(record(20,'rockport-art-festival'), /2027 art-fest calendar pending/);
});


test('confirmed McKinney 2027 dates do not inherit unconfirmed 2026 free admission', () => {
  const current = eventRecord('src/data/major-event-index.ts', 'mckinney-oktoberfest');
  const evidence = eventRecord('src/data/major-event-schema-enrichment-batch2.server.ts', 'mckinney-oktoberfest');
  const productionVerifier = fs.readFileSync('scripts/ci/verify-event-structured-data-production.mjs', 'utf8');
  assert.match(current, /startDate: "2027-09-24"/);
  assert.match(current, /endDate: "2027-09-26"/);
  assert.match(current, /current public admissions and special-event times are not yet confirmed/);
  assert.match(evidence, /https:\/\/downtownmckinney\.com\/events\/event-opportunities/);
  assert.match(evidence, /offers: \[\]/);
  assert.doesNotMatch(evidence, /usdOffer\(/, 'Prior-year zero-price Offer must not roll into 2027');
  assert.match(productionVerifier, /const startDate = '2027-09-24'/);
  assert.match(productionVerifier, /asArray\(event\.offers\)\.length === 0/);
  assert.match(productionVerifier, /Latest confirmed occurrence has ended\./);
  assert.doesNotMatch(productionVerifier, /McKinney Oktoberfest must expose a verified free Offer/);
});
