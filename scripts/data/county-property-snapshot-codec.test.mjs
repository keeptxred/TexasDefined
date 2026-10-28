import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parseExistingCountySnapshot, preserveSourcedCountyLinks, isAmbiguousCountyWithdrawal, applyQuarantinedCountyRefresh} from './county-property-snapshot-codec.mjs';

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
  assert.match(curated, /lastVerifiedAt:\s*'20\d{2}-\d{2}-\d{2}'/, 'Fixture must contain a real record date, not only the TS type declaration');
  assert.throws(()=>parseExistingCountySnapshot(curated.replace(/lastVerifiedAt:\s*'20\d{2}-\d{2}-\d{2}'/, "badLastVerifiedAt: '2026-10-27'")),/Corrupt/);
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


test('preserve separately verified same-office tax search/payment links without overwriting new directory authority',()=>{
  const old = parseExistingCountySnapshot(curated).bell;
  const refreshed = {
    appraisalDistrict: {websiteUrl:'https://bellcad.org/'},
    taxOffice: {websiteUrl:'https://www.bellcountytx.com/'},
    links: {appraisalDistrictUrl:'https://bellcad.org/',taxOfficeUrl:'https://www.bellcountytx.com/'},
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/bell.php'],
    lastVerifiedAt:'2026-10-27',
  };
  const merged = preserveSourcedCountyLinks(old,refreshed,'2026-10-27');
  assert.equal(merged.links.propertySearchUrl,old.links.propertySearchUrl);
  assert.equal(merged.links.paymentUrl,old.links.paymentUrl);
  assert.deepEqual(merged.appraisalDistrict,refreshed.appraisalDistrict);
  assert.deepEqual(merged.taxOffice,refreshed.taxOffice);
  assert.ok(merged.sourceUrls.includes(old.links.propertySearchUrl));
  assert.ok(merged.sourceUrls.includes(old.links.paymentUrl));
  assert.equal(merged.lastVerifiedAt,refreshed.lastVerifiedAt);
});

test('never resurrect payment URLs with old office hosts, missing sources or stale review dates',()=>{
  const old = parseExistingCountySnapshot(curated).bell;
  const fresh = {
    appraisalDistrict:{websiteUrl:'https://new-cad.example.org/'},
    taxOffice:{websiteUrl:'https://new-tax.example.org/'},
    links:{appraisalDistrictUrl:'https://new-cad.example.org/',taxOfficeUrl:'https://new-tax.example.org/'},
    sourceUrls:['https://comptroller.texas.gov/taxes/property-tax/county-directory/bell.php'],
    lastVerifiedAt:'2026-10-27',
  };
  assert.equal(preserveSourcedCountyLinks(old,fresh,'2026-10-27'),fresh);
  const sameHost = {...fresh,appraisalDistrict:{websiteUrl:'https://bellcad.org/'}};
  assert.equal(preserveSourcedCountyLinks({...old,sourceUrls:[]},sameHost,'2026-10-27'),sameHost);
  assert.equal(preserveSourcedCountyLinks({...old,lastVerifiedAt:'2024-01-01'},sameHost,'2026-10-27'),sameHost);
  assert.equal(preserveSourcedCountyLinks({...old,links:{...old.links,paymentUrl:'http://bellcad.org/pay-property-taxes/'}},sameHost,'2026-10-27').links.paymentUrl,undefined);
});

test('the refreshed official directory wins for explicitly supplied new payment destinations',()=>{
  const prior = parseExistingCountySnapshot(curated).bell;
  const fresh = {
    appraisalDistrict:{websiteUrl:'https://bellcad.org/'},
    taxOffice:{websiteUrl:'https://www.bellcountytx.com/'},
    links:{paymentUrl:'https://bellcad.org/new-official-payment/',appraisalDistrictUrl:'https://bellcad.org/'},
    sourceUrls:['https://comptroller.texas.gov/taxes/property-tax/county-directory/bell.php'],
    lastVerifiedAt:'2026-10-27',
  };
  const actual = preserveSourcedCountyLinks(prior,fresh,'2026-10-27');
  assert.equal(actual.links.paymentUrl,fresh.links.paymentUrl);
  assert.equal(actual.links.propertySearchUrl,prior.links.propertySearchUrl);
  assert.ok(!actual.sourceUrls.includes(prior.links.paymentUrl),'Do not retain superseded payment URL in active source list');
});


test('reachable official pages cannot silently remove recently verified counties on parser or security failures',()=>{
  const old=parseExistingCountySnapshot(curated);
  const prior=old.bell;
  const county={slug:'bell'};
  const parseFailed={county,fetched:true,enrichment:null,audit:{appraisalSourceUpdated:'2026-08-21',taxOfficeSourceUpdated:'2025-03-03',appraisalCurrent:true,taxOfficeCurrent:true}};
  assert.equal(isAmbiguousCountyWithdrawal(prior,parseFailed,'2026-10-27'),true);
  assert.equal(isAmbiguousCountyWithdrawal(prior,{...parseFailed,audit:{}},'2026-10-27'),true);
  assert.equal(isAmbiguousCountyWithdrawal(prior,{...parseFailed,fetched:false},'2026-10-27'),false);
  assert.equal(isAmbiguousCountyWithdrawal(prior,{...parseFailed,enrichment:prior},'2026-10-27'),false);
  assert.equal(isAmbiguousCountyWithdrawal(undefined,parseFailed,'2026-10-27'),false);
  assert.equal(isAmbiguousCountyWithdrawal(prior,{
    ...parseFailed,audit:{appraisalSourceUpdated:'2023-05-05',taxOfficeSourceUpdated:'2025-03-03',appraisalCurrent:false,taxOfficeCurrent:true}
  },'2026-10-27'),false, 'A positively stale upstream office date can justify withdrawal under normal index gates');
});

test('quarantine failed reachable official pages without blocking independently verified county updates',()=> {
  const previous=parseExistingCountySnapshot(curated);
  const bell=previous.bell;
  const uncertain={county:{slug:'bell'},fetched:true,enrichment:null,
    audit:{appraisalSourceUpdated:'2026-08-21',taxOfficeSourceUpdated:'2025-03-03',appraisalCurrent:true,taxOfficeCurrent:true}};
  const newCounty={...bell,lastVerifiedAt:'2026-10-28',sourceUrls:[...bell.sourceUrls]};
  const verified={county:{slug:'fresh'},fetched:true,enrichment:newCounty};
  const confirmedStale={county:{slug:'denton'},fetched:true,enrichment:null,
    audit:{appraisalSourceUpdated:'2023-01-01',taxOfficeSourceUpdated:'2025-01-01',appraisalCurrent:false,taxOfficeCurrent:true}};
  const unreachable={county:{slug:'bexar'},fetched:false,enrichment:null};
  const results=[uncertain,verified,confirmedStale,unreachable];
  const quarantine=new Set(results.filter(row=>isAmbiguousCountyWithdrawal(previous[row.county.slug],row,'2026-10-28')).map(row=>row.county.slug));
  assert.deepEqual([...quarantine],['bell']);
  const next=applyQuarantinedCountyRefresh(previous,results,quarantine);
  assert.deepEqual(next.bell,bell,'Quarantined verified record unchanged, including verification timestamp');
  assert.equal(next.fresh.lastVerifiedAt,'2026-10-28','Independent fresh record advances');
  assert.equal(next.denton,undefined,'Affirmatively stale source can withdraw record');
  assert.deepEqual(next.bexar,previous.bexar,'Fetch failure cannot delete record');
  assert.equal(Object.keys(previous).length,17,'Previously sourced fixture remains intact');
});
test('scheduled importer permanently invokes quarantined non-destructive reconciliation',()=> {
  const importer=readFileSync('scripts/data/sync-county-property-data.mjs','utf8');
  assert.match(importer,/const ambiguousSlugs = new Set\(ambiguousWithdrawals\.map\(/);
  assert.match(importer,/applyQuarantinedCountyRefresh\(merged, results, ambiguousSlugs\)/);
  assert.match(importer,/Prior records and their verification dates were preserved, not reverified/);
  assert.doesNotMatch(importer,/else if \(fetched\) delete merged\[county\.slug\]/);
});
