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
const browserAcceptance = read('scripts/ci/verify-west-wharton-hospital-browser.mjs');
const production = read('.github/workflows/deploy-production.yml');
const near = (actual, expected, label, tolerance = 0.011) => assert.ok(Math.abs(actual - expected) < tolerance, `${label}: expected ${expected}; got ${actual}`);

assert.equal(facts.slug, 'west-wharton-county-hospital-district');
assert.equal(facts.officialTaxingUnitId, '241-201-11');
assert.equal(facts.currentWorkbookYear, 2025);
assert.equal(facts.priorYear, 2024);
assert.equal(facts.localAdopted2026.noNewRevenueRate, 0.23633);
assert.equal(facts.localAdopted2026.voterApprovalRate, 0.25913);
assert.equal(facts.county2023Reconciliation.year, 2023);
assert.equal(facts.county2023Reconciliation.countyFiveYearSummaryRate, 0.20550);
assert.equal(facts.county2023Reconciliation.comptrollerImportedTotalRate, 0.21897);
near(facts.localAdopted2026.noNewRevenueRate - facts.localAdopted2026.totalRate, 0.00423, '2026 below no-new-revenue rate', 0.0000001);
near(facts.county2023Reconciliation.comptrollerImportedTotalRate - facts.county2023Reconciliation.countyFiveYearSummaryRate, 0.01347, '2023 source conflict', 0.0000001);
assert.ok(facts.localAdopted2026.totalRate < facts.localAdopted2026.noNewRevenueRate && facts.localAdopted2026.noNewRevenueRate < facts.localAdopted2026.voterApprovalRate);
assert.ok(facts.sources.countyFiveYearSummary.endsWith('/2026%205%20Year%20Summary.pdf'));
assert.equal(facts.localAdopted2026.year, 2026);
near(facts.localAdopted2026.totalRate, 0.23210, '2026 county adopted total', 0.0000001);
near(facts.localAdopted2026.maintenanceOperationsRate, 0.23210, '2026 county adopted M&O', 0.0000001);
assert.equal(facts.localAdopted2026.debtServiceRate, 0);
near(facts.localAdopted2026.totalRate, facts.localAdopted2026.maintenanceOperationsRate + facts.localAdopted2026.debtServiceRate, '2026 county rate breakdown', 0.0000001);
near(facts.localAdopted2026.totalRate, facts.adoptedRate2025, '2025 to 2026 adopted rate unchanged', 0.0000001);
assert.match(facts.sources.county2026AdoptedTable, /\/2026%20Tax%20Rates\.pdf$/);
assert.match(facts.sources.countyRateIndex, /wharton\.tax\.rate$/);
assert.equal(facts.lastVerified, '2026-11-19');
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
  '2026 hospital district rate: $0.23210 per $100', 'county2026AdoptedTable', 'October 2026',
  'countyFiveYearSummary', 'county2023Reconciliation', '2026 no-new-revenue benchmark', '2023 hospital district rate',
  '/property-tax/county/wharton', '/texas-property-tax-estimator',
]) assert.ok(component.includes(marker), `Page missing authority contract: ${marker}`);
assert.ok(parent.includes('latest.slug === whartonEvidence.slug'));
assert.ok(parent.includes('<WestWhartonHospitalDistrictAuthority latestWorkbookYear={latest.year}/>'));
assert.ok(parent.includes('westWhartonAuthorityReconciled') && parent.includes('Local historical analysis is under source review.'));
assert.ok(parent.includes('showWestWharton2026Adoption') && parent.includes('whartonEvidence.sources.county2026AdoptedTable'));
assert.ok(parent.includes('id="wwchd-current-rate"'), 'The 2026 tax answer must be in the primary route body, not solely a streamed lazy detail');
assert.ok(parent.includes('Wharton County\'s official 2026 tax-rate table'), 'First-render source must be visible');
assert.ok(parent.indexOf('id="wwchd-current-rate"') < parent.indexOf('<WestWhartonHospitalDistrictAuthority'), 'Above-the-fold 2026 answer precedes lazy long-form research');
assert.ok(parent.includes('Verify parcel jurisdictions with Wharton CAD'), 'First-render rate must carry parcel-specific jurisdiction warning');
assert.ok(component.includes('How this page was checked:'), 'Primary-source research method must be transparently documented');
assert.ok(component.includes('the sources do not prove') || component.includes('The sources do not prove'), 'Do not guess a cause for proposed-vs-reported levy differences');
assert.ok(parent.includes('Not a 2026 Comptroller statewide workbook record.'));
assert.ok(parent.includes('Unresolved county/state source difference:') && parent.includes('whartonEvidence.sources.countyFiveYearSummary') && parent.includes('whartonEvidence.county2023Reconciliation.year'), '2023 source conflict must be visible in the imported-rate table, not hidden in prose');
assert.ok(route.includes('wharton2025?.levy === westWhartonHospitalDistrict.statewideLevy.current'));

assert.ok(route.includes('hasWestWhartonAuthority') && route.includes('westWhartonHospitalDistrict.sources.districtNotice'));
assert.ok(route.includes('westWhartonHospitalDistrict.sources.county2026AdoptedTable'));
assert.ok(route.includes('westWhartonHospitalDistrict.sources.countyFiveYearSummary'));
assert.ok(route.includes('a disclosed 2023 county/Comptroller rate conflict'));
assert.ok(route.includes('Math.max(latest.year, westWhartonHospitalDistrict.localAdopted2026.year)'));
assert.ok(route.includes('canonicalLink(texasDefinedBrand, canonicalPath)'));
assert.ok(sitemap.includes('{ path: "/property-tax/taxing-unit/west-wharton-county-hospital-district", lastmod: "2026-11-19" }'));
assert.ok(countyRoute.includes('county.slug === \'wharton\'') && countyRoute.includes('/property-tax/taxing-unit/west-wharton-county-hospital-district'));


assert.ok(workflow.includes('cron:') && workflow.includes('workflow_dispatch:') && workflow.includes('issues: write'));
assert.ok(workflow.includes('--remote'));
assert.ok(workflow.includes('verify-west-wharton-hospital-production.mjs'));
assert.ok(workflow.includes("github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'"), 'Live verification before publication must not block PR merge');
assert.ok(production.includes('live_wharton_hospital_tax') && production.includes('Verify West Wharton 2026 adopted hospital district authority on both origins'), 'The production release must enforce district live acceptance after deploy');
const westWhartonReleaseBlock = production.slice(production.indexOf('id: live_wharton_hospital_tax'), production.indexOf('- name: Preserve West Wharton hospital tax live diagnostics'));
assert.ok(westWhartonReleaseBlock.includes("steps.cloudflare.outcome == 'success'"), 'West Wharton canary must require a new successful Worker');
assert.ok(!westWhartonReleaseBlock.includes('steps.change_scope.outputs.financial'), 'Superseded tax changes cannot bypass live district acceptance under an unrelated release');
assert.ok(westWhartonReleaseBlock.includes('verify-west-wharton-hospital-production.mjs'), 'The unconditional test must verify the page on both public origins');
assert.ok(liveAcceptance.includes("['clean-canonical', 'cache-bypassed']"), 'Both normal canonical and forced-fresh URLs must be checked');
assert.ok(liveAcceptance.includes("request(origin, pagePath, cacheBust)") && liveAcceptance.includes("request(origin, '/property-tax/county/wharton', variant === 'cache-bypassed')"), 'Clean/uncached validation must include page AND reciprocal county link');
assert.ok(liveAcceptance.includes("cache: cacheBust ? 'no-store' : 'default'"), 'Canonical probe must not force request-cache bypass');
assert.ok(browserAcceptance.includes("'mobile-320'") && browserAcceptance.includes("'mobile-390'") && browserAcceptance.includes("'desktop-1440'"), 'Real responsive QA must cover two phone widths and desktop');
assert.ok(browserAcceptance.includes("page.locator('#wwchd-2023-sources')") && browserAcceptance.includes("document.documentElement.scrollWidth"), 'Chrome must wait for hydrated authority and fail on horizontal overflow');
assert.ok(browserAcceptance.includes("window.innerWidth") && browserAcceptance.includes("no uncaught page exceptions"), 'Chrome must measure real viewport and page errors');
assert.ok(production.includes('id: wharton_browser_deps') && production.includes('id: live_wharton_browser'), 'Production must run bounded West Wharton Chrome after successful SSR verification');
assert.ok(production.includes('scripts/ci/verify-west-wharton-hospital-browser.mjs'), 'Production must invoke dedicated hydrated Chrome acceptance');


for (const marker of ['What this hospital district taxes', '0.21512', '0.23328', 'dateModified', 'facts.sources.districtNotice', 'facts.sources.county2026AdoptedTable', 'facts.sources.countyFiveYearSummary', '2026 hospital district rate', '2023 official-source disagreement', '2026 rate visible in initial page body', 'Wharton County guide missing reciprocal hospital district link']) assert.ok(liveAcceptance.includes(marker), 'Live acceptance missing: ' + marker);
assert.ok(scripts.includes('validate-west-wharton-hospital-district.mjs'));
console.log('PASS: 2026 county benchmarks, 2023 official rate discrepancy provenance, 2024–25 state history and levy math, publication metadata and scheduled source checks');

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
    [facts.sources.county2026AdoptedTable, null, '2026 adopted-rate table PDF'],
    [facts.sources.countyFiveYearSummary, null, '2026 county five-year summary PDF'],
    [facts.sources.countyRateIndex, '2026 Tax Rate', 'county tax-rate index'], 
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
        if (label === 'county tax-rate index' && /202[7-9]\s*Tax Rate/i.test(html)) failed.push('Wharton County posted a later local adopted-rate year; reconcile the unit before publishing stale 2026 as latest.');
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
