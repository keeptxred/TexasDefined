#!/usr/bin/env node
/**
 * Account-scoped, READ-ONLY Impact partner-report discovery.
 *
 * Never print tokens, partner report rows, payout figures, buyer attributes,
 * customer identifiers or raw API errors to a public GitHub Actions log.
 * This diagnostic intentionally does not call a report's Records endpoint;
 * validate the account's actual report catalog and metadata first.
 */
import { pathToFileURL } from 'node:url';

const ORIGIN = 'https://api.impact.com';
const TIMEOUT_MS = 15_000;
const RESPONSE_CAP = 2_000_000;

export function validateSid(value) {
  if (!/^[A-Za-z0-9_-]{3,90}$/.test(String(value || ''))) throw new Error('IMPACT_ACCOUNT_SID has an invalid format.');
  return value;
}

export function performanceCandidates(value) {
  const all = Array.isArray(value?.Reports) ? value.Reports : [];
  const accessible = all.filter(r => r && r.ApiAccessible === true && typeof r.Id === 'string' && /^[a-z0-9_-]{3,120}$/i.test(r.Id));
  // Only inspect broadly available performance reports: report entitlements
  // vary by publisher. Do not assume a specific report is accessible.
  const daily = accessible.filter(r => /performance\s+by\s+(day|date)|daily\s+performance/i.test(r.Name || ''));
  const program = accessible.filter(r => /performance\s+by\s+(brand|campaign|program)/i.test(r.Name || ''));
  const action = accessible.filter(r => /action\s+listing/i.test(r.Name || ''));
  return { total: all.length, accessible: accessible.length, daily, program, action };
}

export function safeMeta(meta) {
  const columns = Array.isArray(meta?.Attributes) ? meta.Attributes : [];
  const filters = Array.isArray(meta?.Filters) ? meta.Filters : [];
  // Only generic schema names. Never expose business data or report Records.
  return {
    columns: columns.map(x => String(x?.Name || '')).filter(x => /^[A-Za-z][A-Za-z0-9_ -]{0,60}$/.test(x)).slice(0,55),
    filters: filters.map(x => String(x?.Name || '')).filter(x => /^[A-Za-z][A-Za-z0-9_ -]{0,60}$/.test(x)).slice(0,30),
  };
}

export function reportUrl(sid, suffix) {
  const root = '/Mediapartners/' + encodeURIComponent(validateSid(sid)) + '/Reports';
  if (suffix !== '' && !/^\/[A-Za-z0-9_-]+\/MetaData$/.test(suffix)) throw new Error('Unapproved Impact report path.');
  return ORIGIN + root + suffix;
}

export async function impactGet(url, sid, token, fetcher = fetch) {
  if (!url.startsWith(ORIGIN + '/Mediapartners/' + encodeURIComponent(validateSid(sid)) + '/Reports')) {
    throw new Error('Unapproved Impact report request.');
  }
  if (!token || /[\r\n]/.test(token)) throw new Error('IMPACT_AUTH_TOKEN missing or invalid.');
  const response = await fetcher(url, {
    method: 'GET',
    redirect: 'error',
    headers: {
      Authorization: 'Basic ' + Buffer.from(sid + ':' + token).toString('base64'),
      Accept: 'application/json',
      'User-Agent': 'TexasDefined-ReadOnly-Impact-Reporting/1.0',
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) {
    // Never include response body, request URL, or HTTP auth in errors.
    throw new Error('Impact reporting API returned HTTP ' + response.status + '.');
  }
  const size = Number(response.headers?.get?.('content-length') || 0);
  if (size > RESPONSE_CAP) throw new Error('Impact response exceeded the metadata safety limit.');
  const body = await response.text();
  if (body.length > RESPONSE_CAP) throw new Error('Impact response exceeded the metadata safety limit.');
  try { return JSON.parse(body); }
  catch { throw new Error('Impact returned invalid JSON for a read-only metadata request.'); }
}

export async function diagnose(env = process.env, fetcher = fetch) {
  const sid = validateSid(env.IMPACT_ACCOUNT_SID);
  const token = env.IMPACT_AUTH_TOKEN;
  if (!token) throw new Error('IMPACT_AUTH_TOKEN is not configured.');
  const catalog = performanceCandidates(await impactGet(reportUrl(sid, ''), sid, token, fetcher));
  if (!catalog.total) throw new Error('Impact returned no reports; confirm the token has List reports scope.');
  const selected = [...catalog.daily.slice(0, 1), ...catalog.program.slice(0, 1), ...catalog.action.slice(0, 1)]
    .filter((r, i, all) => all.findIndex(x => x.Id === r.Id) === i);
  const inspected = [];
  for (const report of selected) {
    const metadata = safeMeta(await impactGet(reportUrl(sid, '/' + report.Id + '/MetaData'), sid, token, fetcher));
    inspected.push({ type: catalog.daily.includes(report) ? 'daily' : catalog.program.includes(report) ? 'program' : 'action',
      reportId: report.Id, ...metadata });
  }
  return { status: 'AUTHENTICATED_READ_ONLY', availableReports: catalog.total,
    apiAccessibleReports: catalog.accessible, dailyCandidates: catalog.daily.length,
    programCandidates: catalog.program.length, actionCandidates: catalog.action.length, inspected };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  diagnose().then(result => {
    console.log('IMPACT_REPORTING_DISCOVERY ' + JSON.stringify(result));
    if (!result.inspected.length) {
      console.error('Impact credentials work, but no expected daily/program/action report is API-accessible. Review actual account entitlements.');
      process.exitCode = 2;
    }
  }).catch(err => {
    // Deliberately do not log raw errors: runtime auth and API responses may
    // contain headers/tokens or private account information.
    const message = err instanceof Error && /^(IMPACT_|Impact|Unapproved)/.test(err.message)
      ? err.message : 'Impact reporting discovery failed; review token scopes and API access.';
    console.error('IMPACT_REPORTING_DISCOVERY_FAILED ' + message);
    process.exitCode = 1;
  });
}
