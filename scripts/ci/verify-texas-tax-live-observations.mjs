// Independent, read-only proof that EVERY verified local tax observation
// (including future additions) is rendered on both production origins.
// Supabase service credentials are restricted to the GitHub runner; never sent
// to a Worker, URL query, logs or a browser. No data is modified.
import { appendFileSync } from 'node:fs';
import { checkVerifiedLocalRate } from './verify-texas-tax-local-sources.mjs';
import { checkYearSpecificTaxRateRow } from './tax-history-row-contract.mjs';

const CANONICAL = 'https://texasdefined.com';
const DIRECT_WORKER = 'https://texasdefined-site.freddy-coppola.workers.dev';
const MAX_RECORDS = 1000;
const BATCH_SIZE = 4;

export function formatRate(value) {
  const rate = Number(value);
  if (!Number.isFinite(rate) || rate < 0 || rate > 20) throw new Error('Invalid documented tax rate');
  const six = rate.toFixed(6);
  if (Math.abs(rate - Number(six)) < 1e-10) return six;
  return rate.toFixed(8).replace(/0+$/, '').replace(/\.$/, '');
}

export function classifyLiveObservation(local, officialRows) {
  const mode = checkVerifiedLocalRate(local, officialRows);
  if (!/^20\d\d-\d\d-\d\d$/.test(local.verified_on ?? '') ||
      !String(local.evidence_note ?? '').trim() ||
      (local.component_source_url && !String(local.component_source_url).startsWith('https://'))) {
    throw new Error('Verified local observation missing dated official evidence: ' + local.slug + '/' + local.tax_year);
  }
  return {
    slug: local.slug,
    year: local.tax_year,
    rate: formatRate(local.total_rate),
    agency: local.source_agency,
    sourceUrl: local.source_url,
    componentSourceUrl: local.component_source_url,
    verifiedOn: local.verified_on,
    zeroCity: local.unit_type === 'city' && Number(local.total_rate) === 0,
    mode,
    statewideRate: mode === 'conflict' ? formatRate(officialRows[0].total_rate) : null,
  };
}

export function validateLiveObservation(html, observation) {
  const { slug, year, rate, agency, sourceUrl, componentSourceUrl, verifiedOn, zeroCity, mode, statewideRate } = observation;
  const row = checkYearSpecificTaxRateRow(html, {
    year, rate, agency,
    conflict: mode === 'conflict',
    corroborated: mode === 'corroborated',
    statewideRate,
  });
  if (!row.ok) return row;
  const required = [
    'How the locally sourced rates were verified',
    'Evidence last checked by Texas Defined',
    verifiedOn,
    'display-only',
    'https://texasdefined.com/property-tax/taxing-unit/' + slug,
    agency,
  ];
  const hasUrl = (url) => html.includes(url) || html.includes(url.replaceAll('&', '&amp;'));
  if (!hasUrl(sourceUrl)) return {ok:false,reason:'primary government source link missing'};
  if (componentSourceUrl && !hasUrl(componentSourceUrl)) return {ok:false,reason:'component evidence link missing'};
  if (zeroCity && mode === 'supplement') required.push('A zero <strong>city</strong> rate does not mean');
  if (mode === 'conflict') required.push('Unresolved official-source discrepancy.');
  const missing = required.filter((needle) => !html.includes(needle));
  return missing.length ? {ok:false,reason:'missing source-qualified details: ' + missing.join(', ')} : {ok:true,reason:null};
}

async function readRows(base, key, table, params) {
  const url = new URL('/rest/v1/' + table, base);
  for (const [name,value] of Object.entries(params)) url.searchParams.set(name, String(value));
  const response = await fetch(url, {
    headers: { apikey:key, Authorization:'Bearer ' + key, Accept:'application/json' },
    signal:AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('Read-only tax inventory failed: ' + table + ' HTTP ' + response.status);
  const rows = await response.json();
  if (!Array.isArray(rows)) throw new Error('Unexpected source inventory format');
  return rows;
}

async function loadObservations(base, key) {
  const locals = await readRows(base,key,'texas_tax_local_verified_rates',{
    select:'tax_year,unit_type,slug,official_unit_id,total_rate,maintenance_operations_rate,debt_service_rate,source_url,component_source_url,source_agency,verified_on,evidence_note,status',
    status:'eq.verified',limit:MAX_RECORDS,
  });
  if (locals.length === 0 || locals.length >= MAX_RECORDS)
    throw new Error('Incomplete or missing verified local source inventory');
  const seen = new Set();
  const observations = [];
  for (let start=0;start<locals.length;start+=BATCH_SIZE) {
    const batch = locals.slice(start,start+BATCH_SIZE);
    const official = await Promise.all(batch.map((local) =>
      readRows(base,key,'texas_property_tax_rates',{
        select:'year,type,slug,official_taxing_unit_ids,total_rate,source_status,rate_unavailable',
        year:'eq.' + local.tax_year,type:'eq.' + local.unit_type,slug:'eq.' + local.slug,limit:2,
      })));
    batch.forEach((local,i)=>{
      const identity = [local.tax_year,local.unit_type,local.slug].join('/');
      if (seen.has(identity)) throw new Error('Duplicate local verified identity: ' + identity);
      seen.add(identity);
      observations.push(classifyLiveObservation(local,official[i]));
    });
  }
  return observations;
}

async function fetchProduction(base, slug) {
  const path = '/property-tax/taxing-unit/' + encodeURIComponent(slug);
  let lastError;
  for (let attempt=0;attempt<2;attempt++) {
    try {
      const url = new URL(path,base);
      url.searchParams.set('tax-audit', String(Date.now()) + '-' + attempt);
      const response = await fetch(url, {
        cache:'no-store',redirect:'follow',
        headers: {'cache-control':'no-cache', pragma:'no-cache', 'user-agent':'TexasDefined-Tax-Live-Observations-CI/1.0'},
        signal:AbortSignal.timeout(15000),
      });
      if (response.ok && response.headers.get('cf-mitigated') !== 'challenge') return response.text();
      lastError = new Error('HTTP ' + response.status + ' or Cloudflare challenge');
    } catch (e) { lastError = e; }
  }
  throw lastError ?? new Error('Live tax history not accessible');
}

async function verifyLive() {
  const base = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !key) throw new Error('Existing server-side tax sync credentials are required');
  const observations = await loadObservations(base,key);
  const grouped = new Map();
  for (const observation of observations) {
    const items = grouped.get(observation.slug) ?? [];
    items.push(observation);
    grouped.set(observation.slug,items);
  }
  let verified = 0;
  const failures = [];
  for (const [slug,items] of grouped) {
    for (const [label,origin] of [['canonical',CANONICAL],['direct-worker',DIRECT_WORKER]]) {
      try {
        const html = await fetchProduction(origin,slug);
        for (const item of items) {
          const result = validateLiveObservation(html,item);
          if (!result.ok) failures.push(slug + '/' + item.year + ' ' + label + ': ' + result.reason);
          else verified++;
        }
      } catch(e) { failures.push(slug + ' ' + label + ': ' + String(e)); }
    }
  }
  const summary='Independently checked ' + observations.length +
    ' live local government tax-rate observations on both origins (' + verified +
    '/' + (observations.length*2) + ' year-specific page checks passed).';
  console.log(summary);
  if(process.env.GITHUB_STEP_SUMMARY)
    appendFileSync(process.env.GITHUB_STEP_SUMMARY,'\n### Dynamic live local-rate inventory\n' + summary + '\n');
  for(const failure of failures) console.error('::error title=Live tax evidence mismatch::' + failure);
  if(failures.length) throw new Error(failures.length + ' local government rate displays are incorrect');
}

if (import.meta.url === 'file://' + process.argv[1]) {
  verifyLive().catch((error)=>{ console.error(error.message);process.exitCode=1; });
}
