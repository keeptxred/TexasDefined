import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync('src/routes/fishing.lakes.$slug.$section.tsx', 'utf8');
const monitor = readFileSync('scripts/ci/verify-worker-memory-sensitive-production.mjs', 'utf8');

test('camping/fish/access routes do not resolve unrelated guide, report, business, or placement inventories', () => {
  assert.equal(source.includes('fishingBusinessesQuery'), false, 'section loader should not load unused business inventory');
  assert.equal((source.match(/params\\.section === "reports" \\? context\\.queryClient\\.ensureQueryData\\(fishingReportsQuery/g) || []).length, 2);
  assert.equal((source.match(/params\\.section === "guides" \\? context\\.queryClient\\.ensureQueryData\\(fishingGuidesQuery/g) || []).length, 2);
  assert.equal((source.match(/params\\.section === "guides" \\? context\\.queryClient\\.ensureQueryData\\(fishingPlacementsQuery/g) || []).length, 1);
  assert.match(source, /businesses: \[\], placements, pageData/);
});

test('the exact route that returned HTTP 500 is monitored on both uncached origins', () => {
  assert.match(monitor, /'\\/fishing\\/lakes\\/lake-conroe\\/camping'/);
  assert.match(monitor, /for \\(const origin of origins\\)/);
  assert.match(monitor, /for \\(const path of routes\\)/);
});
