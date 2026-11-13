import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const route = readFileSync(new URL('../../src/routes/sitemap-explore[.]xml.ts', import.meta.url), 'utf8');
const fn = route.slice(route.indexOf('async function auditedFredericksburgSitemapEntry()'), route.indexOf('async function auditedMagoffinSitemapEntry()'));
for (const expected of [
  'smallTownWave1Destinations', 'destination.slug === "fredericksburg"',
  'isPrimaryTripPlannerDestination(canonical)', 'auditDestination(canonical)',
  'audit.readyForIndexing', 'issueCodes: audit.issues.map',
  'return null;', 'entry(`/destination/${canonical.slug}`',
  'Fredericksburg audited sitemap canonical rejected by route/indexability policy',
]) assert.ok(fn.includes(expected), 'Fredericksburg sitemap diagnostic lost fail-closed contract: ' + expected);
assert.ok(route.includes('X-TexasDefined-Sitemap-Fallback'), 'Fallback identity header lost');
assert.ok(!fn.includes('return entry("/destination/fredericksburg")'), 'Do not bypass canonical audit');
console.log('PASS Fredericksburg fallback source diagnostics retain primary, quality and route gates');
