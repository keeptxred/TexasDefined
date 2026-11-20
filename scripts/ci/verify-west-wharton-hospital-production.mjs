#!/usr/bin/env node
/**
 * Independent production acceptance for the West Wharton hospital tax authority.
 * Check rendered server HTML on both origins. A 200 with an old template is a
 * failure. This never rewrites tax rates, deploys Workers or weakens indexing.
 */
import assert from 'node:assert/strict';
import { appendFileSync } from 'node:fs';
import { westWhartonHospitalDistrict as facts } from '../../src/data/property/west-wharton-hospital-district.ts';

const origins = [
  'https://texasdefined.com',
  'https://texasdefined-site.freddy-coppola.workers.dev',
];
const pagePath = '/property-tax/taxing-unit/' + facts.slug;
const nonce = Date.now();
const failures = [];
const results = [];

async function request(origin, path, cacheBust = true) {
  let last;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      // Compare exactly what a visitor or search crawler requests with a
      // cache-bypassed response. A healthy query URL must not hide stale HTML
      // still served from the ordinary canonical path.
      const url = origin + path + (cacheBust ? (path.includes('?') ? '&' : '?') + 'hospital_acceptance=' + nonce + '-' + attempt : '');
      const response = await fetch(url, {
        cache: cacheBust ? 'no-store' : 'default',
        redirect: 'follow',
        headers: cacheBust ? { 'accept': 'text/html', 'cache-control': 'no-cache' } : { 'accept': 'text/html' },
        signal: AbortSignal.timeout(22000),
      });
      const body = await response.text();
      if (!response.ok || !/text\/html/i.test(response.headers.get('content-type') || '')) {
        throw Error('HTTP ' + response.status + ' / unexpected Content-Type ' + response.headers.get('content-type'));
      }
      return { response, body };
    } catch (error) {
      last = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 700));
    }
  }
  throw last;
}

function verifyHospital(html) {
  const checks = new Map([
    ['correct tax unit', html.includes('West Wharton County Hospital District') && html.includes('property tax rate')],
    ['2025 rate', html.includes('0.232100')],
    ['2026 county-adopted rate identified', html.includes('2026 hospital district rate') && html.includes('Wharton County') && html.includes('0.23210')],
    ['2026 rate visible in initial page body', html.includes('id="wwchd-current-rate"') && html.includes('West Wharton hospital district — 2026 tax rate') && html.includes('Verify parcel jurisdictions with Wharton CAD')],
    ['original source-check method', html.includes('How this page was checked:') && html.includes('2026 adopted-rate table')],
    ['visible desk and review date', html.includes('/authors/a-homes-land') && (html.includes('Texas Defined Homes') && html.includes('November 20, 2026'))],
    ['2026 original primary evidence', html.includes(facts.sources.county2026AdoptedTable)],
    ['county five-year truth in taxation summary linked', html.includes(facts.sources.countyFiveYearSummary)],
    ['independent historic district worksheets linked', html.includes(facts.sources.county2024UnitWorksheet) && html.includes(facts.sources.county2023UnitWorksheet) && html.includes('A second county document corroborates the 2023 figure')],
    ['2026 tax benchmarks and careful distinction', html.includes('2026 no-new-revenue benchmark') && html.includes('2026 voter-approval benchmark') && html.includes('0.23633') && html.includes('0.25913') && html.includes('not additional taxes charged')],
    ['2023 official-source disagreement', html.includes('Why official sources disagree about the 2023 hospital district rate') && html.includes('0.20550') && html.includes('0.21897') && html.includes('published documents do not explain the discrepancy')],
    ['2023 table warning', html.includes('Unresolved county/state source difference:') && html.includes('Read the comparison')],
    ['2026 locally adopted history row', html.includes('Not a 2026 Comptroller statewide workbook record.')],
    ['2024 rate', html.includes('0.217100')],
    ['full authority guide rendered', html.includes('What this hospital district taxes') && html.includes('The adopted rate versus the public-hearing benchmarks')],
    ['local history explanation', html.includes('How the notice') && html.includes('average homestead changed')],
    ['2025 levy source distinction', html.includes('Why two official 2025 levy figures differ') && html.includes('$8,153,326') && html.includes('$8,182,353')],
    ['district boundaries', html.includes('west of the Colorado River')],
    ['district identifier', html.includes(facts.officialTaxingUnitId)],
    ['2025 tax-rate benchmarks', html.includes('0.21512') && html.includes('0.23328')],
    ['homeowner calculation', html.includes('$580.25') && html.includes('$542.75')],
    ['primary notice link', html.includes(facts.sources.districtNotice)],
    ['district official agency references', html.includes(facts.sources.districtHome) && html.includes(facts.sources.comptrollerCounty) && html.includes(facts.sources.appraisal)],
    ['county cross-link', html.includes('/property-tax/county/wharton')],
    ['rate-history accessible anchor', html.includes('taxing-unit-rate-history')],
    ['canonical', /<link\b[^>]*rel=["']canonical["'][^>]*>/i.test(html) && (html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi) || []).some((tag) => tag.includes('https://texasdefined.com' + pagePath))],
    ['not noindexed', !/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)],
    ['Dataset structured metadata', html.includes('schema.org') && html.includes('Dataset') && html.includes('dateModified')],
    ['source-review date', html.includes(facts.lastVerified) || html.includes('November 20, 2026')],
  ]);
  return Array.from(checks).filter((entry) => !entry[1]).map((entry) => entry[0]);
}

for (const origin of origins) {
  for (const variant of ['clean-canonical', 'cache-bypassed']) {
    const cacheBust = variant === 'cache-bypassed';
    try {
      const { response, body } = await request(origin, pagePath, cacheBust);
      const missing = verifyHospital(body);
      if (/\bnoindex\b/i.test(response.headers.get('x-robots-tag') || '')) missing.push('X-Robots-Tag unexpectedly noindex');
      results.push({ origin, variant, status: response.status, worker: response.headers.get('x-texasdefined-worker-version'), missing });
      if (missing.length) failures.push(origin + ' (' + variant + '): missing ' + missing.join(', '));
    } catch (error) {
      failures.push(origin + ' (' + variant + '): ' + String(error instanceof Error ? error.message : error));
    }
  }
  // Reciprocal links must also work without a query parameter. A stale
  // county page cannot be disguised by a fresh cache-busted-only link.
  for (const variant of ['clean-canonical', 'cache-bypassed']) {
    try {
      const { body } = await request(origin, '/property-tax/county/wharton', variant === 'cache-bypassed');
      if (!body.includes(pagePath)) failures.push(origin + ' (' + variant + '): Wharton County guide missing reciprocal hospital district link');
    } catch (error) {
      failures.push(origin + ' (' + variant + '): county crosslink fetch failed: ' + String(error instanceof Error ? error.message : error));
    }
  }
}

for (const result of results) console.log(JSON.stringify(result));
const summary = [
  '## West Wharton County Hospital District live authority acceptance',
  '',
  'Clean and cache-bypassed HTML on both origins, official references, calculator, reciprocal county link, canonical, indexability, structured metadata.',
  '',
  ...results.map((r) => '- ' + r.origin + ' (' + r.variant + '): HTTP ' + r.status + ', Worker ' + (r.worker || '(header unavailable)') + ', missing ' + (r.missing.length ? r.missing.join(', ') : 'none')),
  ...failures.map((failure) => '- FAIL: ' + failure),
  failures.length ? '**INCOMPLETE — live acceptance failed.**' : '**PASS — live authority content verified on both origins.**',
  '',
].join('\n');
console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
assert.equal(failures.length, 0, failures.join('\n'));
