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
  assert.ok(conroe.includes('params.section === "camping"'), 'camping takes light source-backed static SSR path');
  assert.ok(conroe.includes('await getLakeConroeCampingPageData()'), 'camping avoids loading optional live lake-level parser');
  assert.ok(conroe.includes('await getLakeConroePageData()'), 'other sections preserve canonical live-data handler');
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

test('Lake Conroe camping cold SSR avoids the optional live-water fetch without dropping its official USFS citations', () => {
  const sources = readFileSync('src/data/fishing/lake-conroe-page-data.functions.ts', 'utf8');
  const route = readFileSync('src/routes/fishing.lakes.$slug.$section.tsx', 'utf8');
  const guide = readFileSync('src/components/fishing/LakeConroeGuide.tsx', 'utf8');
  assert.ok(sources.includes('const { loadLiveLakeLevelResilient } = await import("./live-lake-level-fetch.server")'));
  assert.ok(sources.includes('export const getLakeConroeCampingPageData'));
  assert.ok(sources.includes('...loadLakeConroePageDataServer()'));
  assert.ok(sources.includes('liveLakeLevel: null'));
  assert.ok(route.includes('data.section !== "camping" && <LiveLakeLevelStrip'));
  assert.ok(guide.includes('pageData.camping.map'), 'published camping facilities remain in visitor HTML');
  assert.ok(guide.includes('pageData.sectionResearch.sourceUrls.map'), 'official sources remain in page HTML');
});
