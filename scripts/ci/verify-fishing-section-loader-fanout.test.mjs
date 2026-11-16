import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync('src/routes/fishing.lakes.$slug.$section.tsx', 'utf8');
const monitor = readFileSync('scripts/ci/verify-worker-memory-sensitive-production.mjs', 'utf8');
const count = (text) => source.split(text).length - 1;

test('camping/fish/access routes skip unrelated guide, report, business, or placement inventories', () => {
  assert.equal(source.includes('fishingBusinessesQuery'), false, 'section loader should not load unused business inventory');
  assert.equal(count('params.section === "reports" ? context.queryClient.ensureQueryData(fishingReportsQuery'), 1);
  assert.equal(count('params.section === "guides" ? context.queryClient.ensureQueryData(fishingGuidesQuery'), 1);
  assert.equal(count('params.section === "guides" ? context.queryClient.ensureQueryData(fishingPlacementsQuery'), 1);
  const conroe = source.slice(source.indexOf('if (params.slug === LAKE_CONROE_SLUG)'), source.indexOf('const { fishingGuidesQuery, fishingLakeQuery, fishingPlacementsQuery, fishingReportsQuery }'));
  assert.ok(conroe.includes('const pageData = await getLakeConroePageData()'), 'Conroe keeps canonical server editorial data');
  assert.ok(conroe.includes('if (params.section === "reports" || params.section === "guides")'), 'repository import must be optional');
  assert.ok(conroe.includes('fishingLakeQuery(params.slug)'), 'report/guide tabs still require canonical fishing lake');
  assert.ok(conroe.includes('fishingReportsQuery({ lakeId: lake.id, limit: 20 }, lake)'), 'official report hydration remains source-backed');
  assert.ok(conroe.includes('fishingGuidesQuery({ lakeId: lake.id, limit: 50 })'), 'verified guide inventory remains gated');
  assert.ok(!conroe.includes('fishingPlacementsQuery'), 'Conroe editorial sections do not request unrelated placements');
  assert.ok(source.includes('businesses: [], placements, pageData'));
});

test('the exact HTTP 500 route is monitored on both uncached Worker origins', () => {
  assert.ok(monitor.includes("'/fishing/lakes/lake-conroe/camping'"));
  assert.ok(monitor.includes('for (const origin of origins)'));
  assert.ok(monitor.includes('for (const path of routes)'));
});
