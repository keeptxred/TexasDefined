import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync('src/routes/fishing.lakes.$slug.$section.tsx', 'utf8');
const monitor = readFileSync('scripts/ci/verify-worker-memory-sensitive-production.mjs', 'utf8');
const count = (text) => source.split(text).length - 1;

test('camping/fish/access routes skip unrelated guide, report, business, or placement inventories', () => {
  assert.equal(source.includes('fishingBusinessesQuery'), false, 'section loader should not load unused business inventory');
  assert.equal(count('params.section === "reports" ? context.queryClient.ensureQueryData(fishingReportsQuery'), 2);
  assert.equal(count('params.section === "guides" ? context.queryClient.ensureQueryData(fishingGuidesQuery'), 2);
  assert.equal(count('params.section === "guides" ? context.queryClient.ensureQueryData(fishingPlacementsQuery'), 1);
  assert.ok(source.includes('businesses: [], placements, pageData'));
});

test('the exact HTTP 500 route is monitored on both uncached Worker origins', () => {
  assert.ok(monitor.includes("'/fishing/lakes/lake-conroe/camping'"));
  assert.ok(monitor.includes('for (const origin of origins)'));
  assert.ok(monitor.includes('for (const path of routes)'));
});
