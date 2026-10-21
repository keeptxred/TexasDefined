import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const server=readFileSync('src/data/property/texas-tax-rates.server.ts','utf8');
const route=readFileSync('src/routes/property-tax.taxing-unit.$unit.tsx','utf8');
const smoke=readFileSync('scripts/ci/verify-local-financial-production.mjs','utf8');

test('slug histories never combine two Comptroller source classifications',()=>{
  assert.match(server,/new Set\(records\.map\(\(record\) => record\.type\)\)\.size > 1/);
  assert.match(server,/const newestYear = Math\.max/);
  assert.match(server,/latestTypes\.length !== 1/);
  assert.match(server,/throw new Error\(.*Ambiguous taxing-unit classification/);
  assert.match(server,/records = records\.filter\(\(record\) => record\.type === latestTypes\[0\]\)/);
  assert.match(server,/if \(type\) query = query\.eq\('type', type\)/);
});
test('rate labels never round documented seven-decimal values to six',()=>{
  const match=route.match(/function formatTaxRate\(value: number\): string \{([\s\S]*?)\n\}/);
  assert.ok(match,'a pure source-aware tax formatter is required');
  const formatRate=new Function('value',match[1]);
  assert.equal(formatRate(0.1330247),'0.1330247');
  assert.equal(formatRate(0.340447),'0.340447');
  assert.equal(formatRate(0),'0.000000');
  assert.equal(formatRate(0.492123),'0.492123');
  assert.equal(formatRate(0.12345678),'0.12345678');
  assert.match(route,/formatTaxRate\(latestLocal\.totalRate\)/);
  assert.match(route,/formatTaxRate\(record\.displayTotalRate\)/);
  assert.match(route,/function RateFact/);
  assert.doesNotMatch(route,/record\.displayTotalRate\.toFixed\(6\)/);
});
test('live release gate audits every primary-source local rate and Woodlands',()=>{
  const matches=[...smoke.matchAll(/\{ slug: '([^']+)', year: 202[45], rate: '[^']+', agency: '[^']+'/g)];
  assert.equal(matches.length,11);
  assert.equal(new Set(matches.map((m)=>m[1])).size,11);
  assert.match(smoke,/async function verifySourcedTaxingUnit/);
  assert.match(smoke,/async function verifyWoodlandsClassification/);
  assert.match(smoke,/await runWithConcurrency\(verifiedLocalTaxingUnits, verifySourcedTaxingUnit\)/);
  assert.match(smoke,/await verifyWoodlandsClassification\(\)/);
  assert.match(smoke,/const taxHistoryOrigins = \[/);
  assert.match(smoke,/5 of 5/);
  assert.match(smoke,/0\.1330247/);
  assert.match(smoke,/Latest independently verified local rate \(display only\)/);
});
