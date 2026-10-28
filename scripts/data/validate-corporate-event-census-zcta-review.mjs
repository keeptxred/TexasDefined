import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  reviewCensusZctaSources, ZCTA_GAZETTEER_SOURCE, COUNTY_RELATIONSHIP_SOURCE,
} from './review-corporate-census-zctas.mjs';

// Synthetic controls only; these numbers are not actual public venue or ZIP points.
const gazetteer = [
  'GEOID|GEOIDFQ|ALAND|AWATER|ALAND_SQMI|AWATER_SQMI|INTPTLAT|INTPTLONG',
  '77030|test|0|0|0|0|29.7100|-95.3900',
  '77031|test|0|0|0|0|29.7200|-95.3900',
  '77033|test|0|0|0|0|29.7300|-95.3900',
  '77033|test|0|0|0|0|29.7400|-95.3900',
  '77034|test|0|0|0|0|40.0000|-95.3900',
  '77035|test|0|0|0|0|29.7500|-95.3900',
  '77036|test|0|0|0|0|29.7600|-95.3900',
].join('\n');
const counties = [
  'GEOID_ZCTA5_20|OID_ZCTA5_20|GEOID_COUNTY_20|NAMELSAD_COUNTY_20',
  '77030|a|48201|Harris County',
  '77031|b|48201|Harris County',
  '77031|b|22071|Synthetic Louisiana overlap',
  '77033|c|48201|Harris County',
  '77034|d|48201|Harris County',
  '77035|e|06037|Synthetic California overlap',
  '77036|f|48201|Harris County',
].join('\n');
const zips = ['77030','77031','77032','77033','77034','77035','77036'];
const out = reviewCensusZctaSources(gazetteer,counties,zips,'2026-10-26');
assert.equal(out.candidates.length,zips.length);
assert.equal(out.candidates[0].status,'research-candidate-needs-independent-review');
assert.deepEqual(out.candidates[0].countyGeoids2020,['48201']);
assert.equal(out.candidates[0].censusRepresentativeCoordinate.latitude,29.71);
assert.equal(out.candidates[0].censusRepresentativeCoordinate.longitude,-95.39);
assert.equal(out.candidates[0].source2026,ZCTA_GAZETTEER_SOURCE);
assert.equal(out.candidates[0].countyEvidence2020,COUNTY_RELATIONSHIP_SOURCE);
assert.equal(out.candidates[1].status,'non-texas-or-cross-state-relationship',
  'Mixed-state geographic intersections cannot be silently called Texas-only');
assert.equal(out.candidates[1].censusRepresentativeCoordinate,null);
assert.equal(out.candidates[2].status,'no-official-county-relationship');
assert.equal(out.candidates[3].status,'missing-ambiguous-or-out-of-range-census-point');
assert.equal(out.candidates[4].status,'missing-ambiguous-or-out-of-range-census-point');
assert.equal(out.candidates[5].status,'non-texas-or-cross-state-relationship');
assert.equal(out.candidates[6].status,'research-candidate-needs-independent-review');
assert.equal(out.verifiedZipLocationsCreated,0);
assert.equal(out.venuesGeolocated,0);
assert.equal(out.publicRadiusEnabled,false);
assert(out.candidates.every(x=>x.manualSourceValidationRequired === true &&
  x.admissionToRadiusSearch === false &&
  !Object.hasOwn(x,'point') && !Object.hasOwn(x,'precision')),
  'Research objects must never masquerade as enrolled VerifiedZipLocation points');
assert.throws(()=>reviewCensusZctaSources(gazetteer,counties,['77030','77030'],'2026-10-26'),/Require/);
assert.throws(()=>reviewCensusZctaSources(gazetteer,counties,['77030'],'2026-02-31'),/Require/);
assert.throws(()=>reviewCensusZctaSources(gazetteer,counties,['77030'], '2026-10-26'.repeat(2)),/Require/);
assert.throws(()=>reviewCensusZctaSources(gazetteer.replace('INTPTLAT','FAKE_LAT'),counties,['77030'],'2026-10-26'),/unexpected official header/);
assert.throws(()=>reviewCensusZctaSources(gazetteer,counties.replace('GEOID_COUNTY_20','BAD_COUNTY'),['77030'],'2026-10-26'),/unexpected official header/);
assert.throws(()=>reviewCensusZctaSources(gazetteer,counties,Array(26).fill('77030'),'2026-10-26'),/Require/);
const source = readFileSync('scripts/data/review-corporate-census-zctas.mjs','utf8');
assert(source.includes("'.artifacts/corporate-events'"));
assert(source.includes("flag: 'wx'") && source.includes('mode: 0o600'));
assert(source.includes("lstat(path)") && source.includes('info.isSymbolicLink()'));
assert(!/\bfetch\s*\(|\baxios\b|supabaseAdmin|wrangler|createServerFn|navigator\.geolocation/.test(source),
  'Offline research cannot fetch websites, write DB, deploy, or collect visitor position');
const premerge = readFileSync('scripts/ci/run-premerge-validation.mjs','utf8');
assert(premerge.includes('validate-corporate-event-census-zcta-review.mjs'),
  'Source/county research regressions must be protected by canonical premerge validation');
const workflow = readFileSync('.github/workflows/corporate-zcta-evidence-review.yml','utf8');
for (const required of [
  'workflow_dispatch:', 'schedule:', "contents: read",
  '2026_Gaz_zcta_national.zip',
  'tab20_zcta520_county20_natl.txt',
  '--zips 77030,77058,77020,77034,77056,77007',
  '--output .artifacts/corporate-events/zcta-review.json',
  'corporate-census-zcta-private-review',
  'retention-days: 30', 'if: success()',
  '--max-filesize 3000000', '--max-filesize 15000000',
  'unzip -p "$ZIP_ARCHIVE" "$MEMBER"',
]) assert(workflow.includes(required), 'Missing bounded official Census offline source-review safeguard: ' + required);
assert(workflow.includes("branches: [main]") && workflow.includes("paths:\n      - '.github/workflows/corporate-zcta-evidence-review.yml'"),
  'Initial automatic evidence job must fire from the protected workflow merge, not from arbitrary site changes');
assert(!/\b(?:wrangler deploy|git push|supabase|secrets\.|pull_request_target|npm publish|curl.+POST)\b/i.test(workflow),
  'Official Census research cannot deploy, modify databases, require secrets or create commercial activity');
assert(!workflow.includes('src/data/corporate-event-verified-proximity.ts') &&
  !workflow.includes('public/geo/'),
  'Research workflow must never modify or claim actual enrolled public points');

console.log('Corporate ZCTA official-source county crosscheck/quarantine PASS: no inferred Texas from ZIP prefix, no points admitted');
