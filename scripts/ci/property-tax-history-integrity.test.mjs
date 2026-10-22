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
test('three independently documented tax years can be indexed without overriding statewide data',()=>{
  assert.match(route,/const indexable = history\.filter/);
  assert.match(route,/!record\.rateUnavailable && record\.totalRate != null/);
  assert.match(route,/record\.localVerification\?\.mode === 'supplement'/);
  assert.match(route,/record\.localVerification\.sourceUrl\.startsWith\('https:\/\/'\)/);
  assert.match(route,/\.length >= 3/);
  assert.doesNotMatch(route,/record\.localVerification\?\.mode === 'conflict'\s*\|\|/);
  assert.match(route,/robots: indexable \? undefined : 'noindex, follow, max-image-preview:large'/);
});

test('missing latest Comptroller year is not mislabeled as a finalized rate',()=>{
  assert.match(route,/Latest Comptroller workbook year/);
  assert.match(route,/Years with numeric source records/);
  assert.match(route,/What the Comptroller reported/);
  assert.match(route,/distinguishing finalized statewide figures from separately verified local records/);
  assert.doesNotMatch(route,/Latest finalized year/);
  assert.doesNotMatch(route,/What the reported rate contains/);
  assert.match(route,/Not reported \/ withheld from calculation/);
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
  const matches=[...smoke.matchAll(/\{ slug: '([^']+)', year: 202[1-5], rate: '[^']+', agency: '[^']+'/g)];
  assert.equal(matches.length,15);
  assert.equal(new Set(matches.map((m)=>m[1])).size,12);
  assert.match(smoke,/async function verifySourcedTaxingUnit/);
  assert.match(smoke,/async function verifyWoodlandsClassification/);
  assert.match(smoke,/await runWithConcurrency\(verifiedLocalTaxingUnits, verifySourcedTaxingUnit\)/);
  assert.match(smoke,/await verifyWoodlandsClassification\(\)/);
  assert.match(smoke,/const taxHistoryOrigins = \[/);
  assert.match(smoke,/5 of 5/);
  assert.match(smoke,/0\.1330247/);
  assert.match(smoke,/Latest independently verified local rate \(display only\)/);
});

test('locally verified zero city rate and state/local 2022 disagreement are explicit',()=>{
  const local=readFileSync('supabase/migrations/20261021210000_union_valley_2021_2022_local_rate_discrepancy.sql','utf8');
  assert.match(local,/2021,'city','city-of-union-valley','116-111-03',0\.000000,null,null/);
  assert.match(local,/2022,'city','city-of-union-valley','116-111-03',0\.000000,null,null/);
  assert.match(local,/2022,'116-111-03','reported-final',0\.287248::numeric/);
  assert.match(local,/r\.total_rate is not distinct from e\.source_total/);
  assert.match(local,/on conflict \(tax_year,unit_type,slug\) do nothing/);
  assert.match(route,/latestConflict/);
  assert.match(route,/Unresolved official-source discrepancy/);
  assert.match(route,/The statewide record is retained unchanged/);
  assert.match(smoke,/city-of-union-valley', year: 2022, rate: '0\.000000'/);
  assert.match(smoke,/if \(conflict\) required\.push\('Unresolved official-source discrepancy\.'/);
});

test('Post Oak Bend 2021 and 2024 rates are verified on both production entry points',()=>{
  assert.match(smoke,/post-oak-bend', year: 2021, rate: '0\.000000', agency: 'Kaufman County Appraisal District'/);
  assert.match(smoke,/post-oak-bend', year: 2024, rate: '0\.000000', agency: 'City of Post Oak Bend'/);
  assert.match(smoke,/post-oak-bend', year: 2025, rate: '0\.000000', agency: 'City of Post Oak Bend'/);
});
test('JSON-LD attribution includes every historical Comptroller workbook, not just latest',()=>{
  assert.match(route,/citation: \[\.\.\.new Set\(history\.flatMap\(\(record\) => \[/);
  assert.match(route,/record\.sourceUrl/);
  assert.match(route,/record\.localVerification\.componentSourceUrl/);
  assert.doesNotMatch(route,/citation: \[latest\.sourceUrl/);
});

test('year-specific official local evidence and verification date are visible on tax pages',()=>{
  assert.match(server,/verified_on:|verifiedOn: local\.verified_on/);
  assert.match(server,/evidenceNote: local\.evidence_note/);
  assert.match(route,/localEvidenceNote: local\?\.evidenceNote/);
  assert.match(route,/localVerifiedOn: local\?\.verifiedOn/);
  assert.match(route,/How the locally sourced rates were verified/);
  assert.match(route,/record\.localEvidenceNote/);
  assert.match(route,/record\.localVerifiedOn/);
  assert.match(route,/dateTime=\{record\.localVerifiedOn\}/);
  assert.match(route,/These source notes do not authorize using local figures/);
  assert.match(smoke,/How the locally sourced rates were verified/);
  assert.match(smoke,/Evidence last checked by Texas Defined/);
});

test('Woodlands production H1 verification tolerates SSR text nodes without dropping history checks',()=>{
  assert.match(smoke,/async function verifyWoodlandsClassification\(\)/);
  assert.match(smoke,/heading\.replace\(\/<\[\^>\]\*>\//);
  assert.match(smoke,/headingText\.includes\('the woodlands township'\)/);
  assert.match(smoke,/headingText\.includes\('property tax rate'\)/);
  assert.match(smoke,/else if \(!validHeading\) fail\(label,/);
  assert.match(smoke,/5 of 5/);
  assert.match(smoke,/Harris County/);
  assert.match(smoke,/Montgomery County/);
  const woodlands=smoke.slice(smoke.indexOf('async function verifyWoodlandsClassification'),smoke.indexOf("appendSummary('\\n## Local financial production verification"));
  assert.doesNotMatch(woodlands,/body\.includes\('The Woodlands Township property tax rate'\)/);
});

test('isolated tax authority smoke can verify a failed production release independently',()=>{
  const workflow=readFileSync('.github/workflows/verify-property-tax-production.yml','utf8');
  assert.match(workflow,/workflow_run:/);
  assert.match(workflow,/Deploy TexasDefined production/);
  assert.match(workflow,/workflow_run.conclusion == 'failure'/);
  assert.match(workflow,/workflow_dispatch:/);
  assert.match(workflow,/TEXAS_TAX_VERIFY_ONLY: '1'/);
  assert.match(workflow,/verify-local-financial-production.mjs/);
  assert.match(smoke,/const TAX_ONLY = process.env.TEXAS_TAX_VERIFY_ONLY === '1'/);
  assert.match(smoke,/if \(!TAX_ONLY\) \{/);
  assert.match(smoke,/await runWithConcurrency\(verifiedLocalTaxingUnits, verifySourcedTaxingUnit\)/);
  assert.match(smoke,/await verifyWoodlandsClassification\(\)/);
  assert.match(smoke,/Independent live Texas tax-rate verification passed/);
});

test('independent tax production smoke checks run daily, even after unrelated deploy success',()=>{
  const standalone=readFileSync('.github/workflows/verify-property-tax-production.yml','utf8');
  assert.match(standalone,/schedule:\s*\n\s*- cron: '17 10 \* \* \*'/);
  assert.match(standalone,/github\.event_name == 'push'/);
  assert.match(standalone,/\.github\/workflows\/verify-property-tax-production\.yml/);
  assert.match(standalone,/github\.event_name == 'schedule'/);
  assert.match(standalone,/workflow_run\.conclusion == 'failure'/);
  assert.ok(standalone.includes('group: texasdefined-tax-live-independent-${{ github.event_name }}'));
  assert.match(standalone,/TEXAS_TAX_VERIFY_ONLY: '1'/);
  assert.match(standalone,/node scripts\/ci\/verify-local-financial-production\.mjs/);
  assert.match(smoke,/const taxHistoryOrigins = \[/);
  assert.match(smoke,/direct-worker/);
  assert.match(smoke,/How the locally sourced rates were verified/);
});
