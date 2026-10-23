import { corporateEventProviders } from '../../src/data/corporate-events.ts';
import { mkdirSync, writeFileSync } from 'node:fs';

const timeoutMs = 12000;
const staleDays = 90;

export function classifyCorporateSourceStatus(status, finalUrl, error) {
  if (error) return { state: 'manual-review', reason: String(error).slice(0, 160) };
  try {
    const end = new URL(finalUrl);
    if (end.protocol !== 'https:') return { state: 'broken', reason: 'Redirected away from HTTPS' };
  } catch {
    return { state: 'broken', reason: 'Invalid redirect destination' };
  }
  if (status >= 200 && status < 300) return { state: 'reachable', reason: null };
  if (status >= 300 && status < 400) return { state: 'manual-review', reason: 'Redirect requires manual review' };
  if (status === 404 || status === 410) return { state: 'broken', reason: 'HTTP ' + status };
  return { state: 'manual-review', reason: 'HTTP ' + status };
}

export function providerSourceAgeDays(value, now = new Date()) {
  const date = new Date(value + 'T12:00:00Z');
  if (!Number.isFinite(date.getTime())) return null;
  return Math.floor((now.getTime() - date.getTime()) / 86400000);
}

function officialSafeUrl(value) {
  try {
    const url = new URL(value);
    // Sources are source-controlled editorial HTTPS URLs; never accept file or
    // user-submitted scheme values for the automated network fetch.
    if (url.protocol !== 'https:' || !url.hostname.includes('.')) return false;
    if (/^(localhost|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/.test(url.hostname)) return false;
    return true;
  } catch {
    return false;
  }
}

async function checkUrl(url) {
  if (!officialSafeUrl(url)) return { url, status: null, state: 'broken', reason: 'Unsafe or invalid editorial URL' };
  let error = null;
  try {
    // HEAD is inexpensive, but some legitimate activity-booking websites block
    // crawlers and HEAD requests. Such answers require manual review, not a
    // fabricated claim that their business closed.
    const response = await fetch(url, {
      method: 'HEAD', redirect: 'manual',
      headers: { 'User-Agent': 'TexasDefined-EditorialSourceCheck/1.0 (+https://texasdefined.com/corrections-policy)' },
      signal: AbortSignal.timeout(timeoutMs),
    });
    const result = classifyCorporateSourceStatus(response.status, response.url, null);
    return { url, status: response.status, finalUrl: response.url, ...result };
  } catch (cause) {
    error = cause instanceof Error ? cause.message : 'Network request failed';
  }
  return { url, status: null, ...classifyCorporateSourceStatus(null, url, error) };
}

export async function auditCorporateEventEditorialSources(now = new Date()) {
  const sources = [...new Set(corporateEventProviders.flatMap((p) => [p.officialUrl, p.sourceUrl]))];
  const result = [];
  // Bounded batches avoid overloading venues and do not claim live availability.
  for (let i = 0; i < sources.length; i += 3) {
    const batch = await Promise.all(sources.slice(i, i + 3).map(checkUrl));
    result.push(...batch);
  }
  const byUrl = new Map(result.map((item) => [item.url, item]));
  const providers = corporateEventProviders.map((provider) => {
    const ageDays = providerSourceAgeDays(provider.verifiedOn, now);
    const official = byUrl.get(provider.officialUrl);
    const source = byUrl.get(provider.sourceUrl);
    return {
      slug: provider.slug,
      city: provider.city,
      verifiedOn: provider.verifiedOn,
      ageDays,
      needsEditorialReview: ageDays === null || ageDays > staleDays || official?.state !== 'reachable' || source?.state !== 'reachable',
      officialSource: official,
      supportingSource: source,
    };
  });
  return {
    auditAt: now.toISOString(),
    policy: 'Report only: a successful link check does not prove published price, capacity, availability, affiliation, or re-verification.',
    sourceCount: sources.length,
    providerCount: providers.length,
    needsReview: providers.filter((provider) => provider.needsEditorialReview).length,
    providerReports: providers,
  };
}

if (process.argv[1]?.endsWith('audit-corporate-event-sources.mjs')) {
  const report = await auditCorporateEventEditorialSources();
  mkdirSync('.artifacts', { recursive: true });
  writeFileSync('.artifacts/corporate-event-source-audit.json', JSON.stringify(report, null, 2) + '\n');
  console.log('Corporate venue sources checked: ' + report.sourceCount);
  console.log('Editorial entries requiring source or freshness review: ' + report.needsReview + '/' + report.providerCount);
  for (const p of report.providerReports.filter((entry) => entry.needsEditorialReview)) {
    console.log('[REVIEW] ' + p.slug + ' | ageDays=' + p.ageDays +
      ' | official=' + p.officialSource?.state + ' | source=' + p.supportingSource?.state);
  }
  if (process.env.GITHUB_STEP_SUMMARY) {
    const { appendFileSync } = await import('node:fs');
    appendFileSync(process.env.GITHUB_STEP_SUMMARY,
      '## TexasDefined corporate-event source audit\n' +
      '- Editorial records: ' + report.providerCount + '\n' +
      '- Unique HTTPS URLs checked: ' + report.sourceCount + '\n' +
      '- Records needing a human review: ' + report.needsReview + '\n' +
      '- Notes: Network accessibility is not a venue fact check or booking confirmation.\n');
  }
}
