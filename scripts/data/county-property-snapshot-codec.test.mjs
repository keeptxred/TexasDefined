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
  // The generated snapshot legitimately advances its verified date. Keep the
  // positive unit test anchored to that source date, not yesterday's calendar.
  const sourceDay = old.lastVerifiedAt;
  const refreshed = {
    appraisalDistrict: {websiteUrl:'https://bellcad.org/'},
    taxOffice: {websiteUrl:'https://www.bellcountytx.com/'},
    links: {appraisalDistrictUrl:'https://bellcad.org/',taxOfficeUrl:'https://www.bellcountytx.com/'},
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/bell.php'],
    lastVerifiedAt:sourceDay,
  };
  const merged = preserveSourcedCountyLinks(old,refreshed,sourceDay);
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
  const sourceDay = old.lastVerifiedAt;
  const fresh = {
    appraisalDistrict:{websiteUrl:'https://new-cad.example.org/'},
    taxOffice:{websiteUrl:'https://new-tax.example.org/'},
    links:{appraisalDistrictUrl:'https://new-cad.example.org/',taxOfficeUrl:'https://new-tax.example.org/'},
    sourceUrls:['https://comptroller.texas.gov/taxes/property-tax/county-directory/bell.php'],
    lastVerifiedAt:sourceDay,
  };
  assert.equal(preserveSourcedCountyLinks(old,fresh,sourceDay),fresh);
  const sameHost = {...fresh,appraisalDistrict:{websiteUrl:'https://bellcad.org/'}};
  assert.equal(preserveSourcedCountyLinks({...old,sourceUrls:[]},sameHost,sourceDay),sameHost);
  assert.equal(preserveSourcedCountyLinks({...old,lastVerifiedAt:'2024-01-01'},sameHost,sourceDay),sameHost);
  const yesterday=new Date(Date.parse(sourceDay+'T00:00:00Z')-86400000).toISOString().slice(0,10);
  assert.equal(preserveSourcedCountyLinks(old,sameHost,yesterday),sameHost,
    'A source verified tomorrow must not be retained as if verified today');
  assert.equal(preserveSourcedCountyLinks({...old,links:{...old.links,paymentUrl:'http://bellcad.org/pay-property-taxes/'}},sameHost,sourceDay).links.paymentUrl,undefined);
});

test('the refreshed official directory wins for explicitly supplied new payment destinations',()=>{
  const prior = parseExistingCountySnapshot(curated).bell;
  const sourceDay = prior.lastVerifiedAt;
  const fresh = {
    appraisalDistrict:{websiteUrl:'https://bellcad.org/'},
    taxOffice:{websiteUrl:'https://www.bellcountytx.com/'},
    links:{paymentUrl:'https://bellcad.org/new-official-payment/',appraisalDistrictUrl:'https://bellcad.org/'},
    sourceUrls:['https://comptroller.texas.gov/taxes/property-tax/county-directory/bell.php'],
    lastVerifiedAt:sourceDay,
  };
  const actual = preserveSourcedCountyLinks(prior,fresh,sourceDay);
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
  const contradictoryStale={
    ...parseFailed,audit:{appraisalSourceUpdated:'2023-05-05',taxOfficeSourceUpdated:'2025-03-03',appraisalCurrent:false,taxOfficeCurrent:true}
  };
  assert.equal(isAmbiguousCountyWithdrawal(prior,contradictoryStale,'2026-10-27'),true,
    'A new contradictory stale date cannot delete a previously source-current office');
  const oldExpired={...prior,sourceUpdatedAt:{appraisalDistrict:'2023-01-01',taxOffice:'2023-01-01'}};
  assert.equal(isAmbiguousCountyWithdrawal(oldExpired,contradictoryStale,'2026-10-27'),false,
    'Only independently confirmed stale dates plus previously expired source evidence allow withdrawal');
  assert.equal(isAmbiguousCountyWithdrawal(oldExpired,{...parseFailed,audit:{}},'2026-10-27'),true,
    'A missing later source is not proof of an expired county office withdrawal');
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
  const retainedOldSource={...previous,denton:{...previous.denton,
    sourceUpdatedAt:{appraisalDistrict:'2023-01-01',taxOffice:'2023-01-01'}}};
  const quarantine=new Set(results.filter(row=>isAmbiguousCountyWithdrawal(retainedOldSource[row.county.slug],row,'2026-10-28')).map(row=>row.county.slug));
  assert.deepEqual([...quarantine],['bell']);
  const next=applyQuarantinedCountyRefresh(retainedOldSource,results,quarantine);
  assert.deepEqual(next.bell,bell,'Quarantined verified record unchanged, including verification timestamp');
  assert.equal(next.fresh.lastVerifiedAt,'2026-10-28','Independent fresh record advances');
  assert.equal(next.denton,undefined,'Affirmatively stale source can withdraw record');
  assert.deepEqual(next.bexar,previous.bexar,'Fetch failure cannot delete record');
  assert.equal(Object.keys(previous).length,17,'Previously sourced fixture remains intact');
});
test('every previously fresh verified source refuses a contradictory stale-page withdrawal',()=> {
  const old={...parseExistingCountySnapshot(curated),
    ...parseExistingCountySnapshot(extra,'COUNTY_PROPERTY_SUPPLEMENT')};
  const selected=['deaf-smith','fort-bend','jim-hogg','san-augustine','san-patricio'];
  for(const slug of selected){
    const prior=old[slug];
    assert.ok(prior?.sourceUpdatedAt?.appraisalDistrict && prior?.sourceUpdatedAt?.taxOffice,
      'County must have both prior official source update dates: '+slug);
    const falselyStale={county:{slug},fetched:true,enrichment:null,
      audit:{appraisalSourceUpdated:'2023-01-01',taxOfficeSourceUpdated:'2025-01-01',
        appraisalCurrent:false,taxOfficeCurrent:true}};
    assert.equal(isAmbiguousCountyWithdrawal(prior,falselyStale,'2026-10-28'),true,
      'Current Comptroller source-backed county must not disappear on contradictory date: '+slug);
  }
});

test('scheduled importer permanently invokes quarantined non-destructive reconciliation',()=> {
  const importer=readFileSync('scripts/data/sync-county-property-data.mjs','utf8');
  assert.match(importer,/const ambiguousSlugs = new Set\(ambiguousWithdrawals\.map\(/);
  assert.match(importer,/applyQuarantinedCountyRefresh\(merged, results, ambiguousSlugs\)/);
  assert.match(importer,/Prior records and their verification dates were preserved, not reverified/);
  assert.doesNotMatch(importer,/else if \(fetched\) delete merged\[county\.slug\]/);
});

test('protected finisher pins the exact official Comptroller source path for all 108 existing county records',()=>{
  const current={...parseExistingCountySnapshot(curated),
    ...parseExistingCountySnapshot(extra,'COUNTY_PROPERTY_SUPPLEMENT')};
  const officialExceptions={
    'deaf-smith':'deafsmith',
    'fort-bend':'fortbend',
    'jim-hogg':'jimhogg',
    'san-augustine':'sanaugustine',
    'san-patricio':'sanpatricio',
  };
  const finisher=readFileSync('.github/workflows/finish-county-property-refresh.yml','utf8');
  assert.match(finisher,/const officialSourceUrl = slug =>/);
  assert.equal((finisher.match(/officialSourceUrl\(slug\)/g)??[]).length,2,
    'Both retained and newly added county records require exact source identity');
  for(const [slug,record] of Object.entries(current)){
    const expected='https://comptroller.texas.gov/taxes/property-tax/county-directory/'+
      (officialExceptions[slug]??slug)+'.php';
    assert.equal(record.sourceUrls[0],expected,'County provenance mismatch: '+slug);
  }
  for(const [slug,path] of Object.entries(officialExceptions)){
    assert.ok(finisher.includes("['"+slug+"','"+path+"']"),
      'Finisher must preserve official directory exception: '+slug);
  }
});
