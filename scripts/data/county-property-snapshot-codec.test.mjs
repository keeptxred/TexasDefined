import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parseExistingCountySnapshot} from './county-property-snapshot-codec.mjs';

const curated=readFileSync('src/data/property/county-property-enrichment.generated.ts','utf8');
const extra=readFileSync('src/data/property/county-property-supplement.server.ts','utf8');

test('the split official county directory decodes all historical contacts without a data-loss fallback',()=>{
  const first=parseExistingCountySnapshot(curated);
  const second=parseExistingCountySnapshot(extra,'COUNTY_PROPERTY_SUPPLEMENT');
  assert.equal(Object.keys(first).length,17);
  assert.equal(Object.keys(second).length,91);
  assert.equal(new Set([...Object.keys(first),...Object.keys(second)]).size,108);
  assert.equal(first.bell.links.propertySearchUrl,'https://esearch.bellcad.org/');
  assert.ok(second.anderson.sourceUrls.some(url=>url.endsWith('/anderson.php')));
});

test('malformed, empty or truncated source snapshots cannot silently wipe previously verified county evidence',()=>{
  assert.throws(()=>parseExistingCountySnapshot(''),/does not export/);
  assert.throws(()=>parseExistingCountySnapshot(curated.slice(0,-6)),/Truncated/);
  assert.throws(()=>parseExistingCountySnapshot(curated.replace('lastVerifiedAt:', 'badLastVerifiedAt:')),/Corrupt/);
  assert.throws(()=>parseExistingCountySnapshot(extra,'COUNTY_PROPERTY_ENRICHMENT'),/does not export/);
});

test('trailing TS commas and punctuation within an office name are preserved',()=>{
  const fixture=[
    'export const COUNTY_PROPERTY_ENRICHMENT = {',
    '  test: { sourceUrls: [\'https://state.gov/counties/test.php\',], lastVerifiedAt: \'2026-10-21\', note: \'City, tax office; O\\\'Brien\', },',
    '};',
  ].join('\n');
  const result=parseExistingCountySnapshot(fixture);
  assert.equal(result.test.note,"City, tax office; O'Brien");
  assert.equal(result.test.sourceUrls.length,1);
});
