#!/usr/bin/env node
/**
 * West Wharton County Hospital District factual / render / source checks.
 * 2025 public-hearing PROPOSAL values must never replace the imported statewide
 * finalized levy, source year or account-level parcel jurisdiction.
 *
 * CI: node --experimental-strip-types scripts/data/validate-west-wharton-hospital-district.mjs
 * GitHub scheduled review: append --remote. A remote check raises an editorial
 * review signal; it NEVER writes unverified adopted rates or auto-publishes.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { westWhartonHospitalDistrict as facts } from '../../src/data/property/west-wharton-hospital-district.ts';

const read = (path) => readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const component = read('src/components/property/WestWhartonHospitalDistrictAuthority.tsx');
const parent = read('src/components/property/TaxingUnitRatePage.tsx');
const route = read('src/routes/property-tax.taxing-unit.$unit.tsx');
const sitemap = read('src/routes/sitemap[.]xml.ts');
const countyRoute = read('src/routes/property-tax.county.$county.tsx');
const workflow = read('.github/workflows/verify-west-wharton-hospital-tax.yml');
const scripts = read('package.json');
const liveAcceptance = read('scripts/ci/verify-west-wharton-hospital-production.mjs');
const near = (actual, expected, label, tolerance = 0.011) => assert.ok(Math.abs(actual - expected) < tolerance, `${label}: expected ${expected}; got ${actual}`);

assert.equal(facts.slug, 'west-wharton-county-hospital-district');
assert.equal(facts.officialTaxingUnitId, '241-201-11');
assert.equal(facts.currentWorkbookYear, 2025);
assert.equal(facts.priorYear, 2024);
assert.equal(facts.lastVerified, '2026-11-18');
near(facts.adoptedRate2025, 0.23210, 'Official 2025 statewide rate', 0.0000001);
near(facts.priorRate2024, 0.21710, 'Official 2024 statewide rate', 0.0000001);
near((facts.adoptedRate2025/facts.priorRate2024-1)*100, 6.91, 'Rate percent difference');
near(facts.noNewRevenueProposed2025, 0.21512, '2025 public hearing NNR', 0.0000001);
near(facts.voterApprovalProposed2025, 0.23328, '2025 public hearing voter approval', 0.0000001);
near(facts.homestead.priorTaxableValue * facts.priorRate2024/100, facts.homestead.priorTax, '2024 notice homestead tax');
near(facts.homestead.proposedTaxableValue * facts.adoptedRate2025/100, facts.homestead.proposedTax, '2025 notice average homestead tax');
near(facts.homestead.proposedTax-facts.homestead.priorTax, 49.97, 'Notice homeowner illustration delta');
near((facts.homestead.proposedTax/facts.homestead.priorTax-1)*100, 11.19, 'Notice homestead percent change');
assert.equal(facts.noticeLevy.proposed, 8153326);
assert.equal(facts.noticeLevy.prior, 6940914);
assert.equal(facts.statewideLevy.current, 8182353);
assert.equal(facts.statewideLevy.prior, 6798734);
assert.equal(facts.statewideLevy.current - facts.noticeLevy.proposed, 29027);
near(250000 * facts.adoptedRate2025/100, 580.25, '250k illustration');
near(250000 * facts.priorRate2024/100, 542.75, '2024 comparison');
assert.ok(facts.sources.districtNotice.endsWith('/WestWhartonhospitaldistrictpublicnotice9.09.25.pdf'));
for (const [name, link] of Object.entries(facts.sources)) assert.match(link, /^https:\/\//, `${name} official source URL`);
for (const marker of [
  'west of the Colorado River', 'El Campo Memorial Hospital', '2025 adopted total',
  'public-hearing benchmarks', 'average homestead changed', 'levy figures differ',
  'district-taxable', 'not interchangeable', '2025 proposed',
  'Wharton CAD', 'County Tax Assessor-Collector', 'Frequently asked questions',
  '/property-tax/county/wharton', '/texas-property-tax-estimator',
]) assert.ok(component.includes(marker), `Page missing authority contract: ${marker}`);
assert.ok(parent.includes('latest.slug === whartonEvidence.slug'));
assert.ok(parent.includes('<WestWhartonHospitalDistrictAuthority latestWorkbookYear={latest.year}/>'));
assert.ok(parent.includes('westWhartonAuthorityReconciled') && parent.includes('Local historical analysis is under source review.'));
assert.ok(route.includes('wharton2025?.levy === westWhartonHospitalDistrict.statewideLevy.current'));

assert.ok(route.includes('hasWestWhartonAuthority') && route.includes('westWhartonHospitalDistrict.sources.districtNotice'));
assert.ok(route.includes('canonicalLink(texasDefinedBrand, canonicalPath)'));
assert.ok(sitemap.includes('{ path: "/property-tax/taxing-unit/west-wharton-county-hospital-district", lastmod: "2026-11-18" }'));
assert.ok(countyRoute.includes('county.slug === \'wharton\'') && countyRoute.includes('/property-tax/taxing-unit/west-wharton-county-hospital-district'));


assert.ok(workflow.includes('cron:') && workflow.includes('workflow_dispatch:') && workflow.includes('issues: write'));
assert.ok(workflow.includes('--remote'));
assert.ok(workflow.includes('verify-west-wharton-hospital-production.mjs'));
for (const marker of ['What this hospital district taxes', '0.21512', '0.23328', 'dateModified', 'facts.sources.districtNotice', 'Wharton County guide missing reciprocal hospital district link']) assert.ok(liveAcceptance.includes(marker), 'Live acceptance missing: ' + marker);
assert.ok(scripts.includes('validate-west-wharton-hospital-district.mjs'));
console.log('PASS: 2024–25 district-rate math, original content, citations, canonical/metadata, integration and scheduled review contract');

if (process.argv.includes('--remote')) {
  // Use bounded requests, tolerate anti-bot and temporary network errors. A
  // permanent 404/410 or factual contradiction is actionable; the rest is
  // inconclusive and must never be interpreted as a newer adopted rate.
  const checks = [
    [facts.sources.districtHome, 'west of the Colorado River', 'district boundary'],
    [facts.sources.districtAbout, 'El Campo Memorial Hospital', 'funding mission'],
    [facts.sources.districtTaxes, 'September 22, 2025', 'tax notice'],
    [facts.sources.comptrollerCounty, facts.officialTaxingUnitId, 'Comptroller district identity'],
    [facts.sources.districtNotice, null, '2025 notice PDF'],
    [facts.sources.countyTaxOffice, null, 'Wharton County tax office'],
    [facts.sources.countyEstimator, null, 'official estimator'],
    [facts.sources.taxTransparency, null, 'truth-in-taxation portal'],
  ];
  const failed = [];
  const inconclusive = [];
  for (const [url, expected, label] of checks) {
    try {
      const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000), headers: {'user-agent':'TexasDefined-authority-source-review/1.0 (+https://texasdefined.com/)' } });
      if (response.status === 404 || response.status === 410) { failed.push(`${label}: HTTP ${response.status} ${url}`); continue; }
      if (!response.ok) { inconclusive.push(`${label}: HTTP ${response.status}`); continue; }
      if (expected) {
        const html = (await response.text()).replace(/\s+/g, ' ');
        if (!html.toLowerCase().includes(expected.toLowerCase())) failed.push(`${label}: previously reviewed source text is missing from ${url}`);
        if (label === 'tax notice' && /(?:notice|tax rate|public hearing)[^<]{0,150}202[6-9]/i.test(html)) failed.push('District tax page may contain a new-year notice; verify adopted rate and refresh local history.');
      }
      console.log(`OK ${label}: ${response.status}`);
    } catch (error) {
      inconclusive.push(`${label}: ${String(error?.message ?? error)}`);
    }
  }
  if (inconclusive.length) console.warn('Inconclusive official-source probes (not evidence of a changed rate):\n' + inconclusive.join('\n'));
  if (failed.length) {
    console.error('OFFICIAL-SOURCE EDITORIAL REVIEW REQUIRED:\n' + failed.join('\n'));
    process.exitCode = 1;
  } else {
    console.log('PASS: no confirmed dead original sources or changed district notice; this does not independently verify a new adopted-rate year');
  }
}
