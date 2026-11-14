import test from 'node:test';
import assert from 'node:assert/strict';
import { parseTexasStateCensus, censusUrl, verifySource, refresh } from './refresh-texas-state-population.mjs';

const official2025 = {
  vintage: 2025, verifiedAt: '2026-08-27', sourceUrl: censusUrl(2025),
  population: 31709821, priorPopulation: 31318578, populationChange: 391243,
  domesticMigration: 67299, internationalMigration: 167475, naturalIncrease: 157711,
};
function fixture(year, current, prior, domestic, international, natural, residual) {
  const fields = ['SUMLEV','STATE','NAME','POPESTIMATE'+(year-1),
    'POPESTIMATE'+year,'NPOPCHG_'+year,'DOMESTICMIG'+year,
    'INTERNATIONALMIG'+year,'NATURALCHG'+year,'RESIDUAL'+year];
  const data = ['040','48','Texas',prior,current,current-prior,domestic,
    international,natural,residual];
  return fields.join(',') + '\n' + data.join(',') + '\n';
}

test('Census source matches historical Texas population and component arithmetic', () => {
  const data = parseTexasStateCensus(fixture(2025,31709821,31318578,67299,167475,157711,-1242),2025);
  assert.deepEqual(data, (({verifiedAt, ...stable}) => stable)(official2025));
  assert.throws(() => parseTexasStateCensus(fixture(2025,31709821,31318578,67299,167475,157711,0),2025), /consistency/);
  assert.throws(() => parseTexasStateCensus(fixture(2025,31709821,31318578,67299,167475,157711,-1242).replace('040,48,Texas','040,49,Texas'),2025), /Texas state/);
  assert.throws(() => parseTexasStateCensus('error,not,csv',2025), /source rows/);
});

test('Census update accepts only one year forward and plausible release magnitudes', () => {
  const fresh = parseTexasStateCensus(fixture(2026,32000000,31709821,50000,100000,150000,-9821),2026);
  verifySource(fresh, official2025);
  assert.throws(() => verifySource({...fresh, vintage: 2024}, official2025), /backwards/);
  assert.throws(() => verifySource({...fresh, population: 60000000}, official2025), /bound/);
});

test('GitHub updater publishes only a verified new Census vintage and updates sitemap date', async () => {
  const writes = new Map();
  const csv = fixture(2026,32000000,31709821,50000,100000,150000,-9821);
  const changed = await refresh({
    load: async path => path.endsWith('.json') ? JSON.stringify(official2025)
      : "{ slug: 'texas-population-and-migration-latest', updated: '2026-08-27' }",
    save: async (path, value) => { writes.set(path, value); },
    download: async year => year === 2026 ? csv : null,
  });
  assert.equal(changed, true);
  const snapshot = JSON.parse(writes.get('src/data/generated/texas-state-population-current.json'));
  assert.equal(snapshot.vintage, 2026);
  assert.equal(snapshot.populationChange, 290179);
  assert.match(writes.get('src/data/texas-data-center.ts'), /texas-population-and-migration-latest/);
  assert.match(writes.get('src/data/texas-data-center.ts'), /updated: '\d{4}-\d{2}-\d{2}'/);
});
