#!/usr/bin/env node
/**
 * Probe Impact partner reports using GET and suppress all private record VALUES.
 * Runs at most two reports for a single completed Texas calendar day.
 * Only reports field names and response structure; never commissions, payouts,
 * customer identities, account SID, token, raw response, or business metrics.
 */
import { pathToFileURL } from 'node:url';
import { impactGet, reportUrl, validateSid } from './impact-reporting-discovery.mjs';

const REPORTS = Object.freeze(['partner_performance_by_day','partner_performance_by_program']);
const ALLOWED_KEYS = new Set([
  'sort_date','date_display','Campaign','campaign_id',
  'Clicks','Impressions','Imps','Actions','Sales',
  'Sale_zzzAmount','Sale_Amount','Sales_Sales_Amount',
  'Action_Cost','Total_Cost','Sale_Cost','Other_Cost',
  'Reversed_Sale_Payout','Reversed_Sales','Reversed_Revenue',
  'Status','Currency','CurrencyCode','@page','@numpages','Records',
]);

export function completedTexasDate(now = new Date()) {
  if (!(now instanceof Date) || !Number.isFinite(now.valueOf())) throw new Error('Invalid date for report verification.');
  const fmt = new Intl.DateTimeFormat('en-CA',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'});
  const parts = fmt.formatToParts(now);
  const get = type => parts.find(p=>p.type===type)?.value;
  // Yesterday in Texas, never a partially-filled current-day report.
  const today = get('year')+'-'+get('month')+'-'+get('day');
  const utc = new Date(today+'T12:00:00Z');
  utc.setUTCDate(utc.getUTCDate()-1);
  return utc.toISOString().slice(0,10);
}

export function reportRecords(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('Unexpected Impact report wrapper.');
  if (!Array.isArray(payload.Records)) throw new Error('Impact report is missing the Records array.');
  // The legacy reports API paginates. Never accept an incomplete financial
  // statement as a complete sample.
  const totalPages = Number(payload['@numpages'] ?? 1);
  // A legitimate historical day with no recorded activity may return 0 pages
  // and 0 records. This is a missing provider report, NOT a proven zero sale.
  // Reject contradictory metadata and multi-page results instead of silently
  // truncating the financial period.
  if (totalPages === 0 && payload.Records.length === 0 && Number(payload['@total'] ?? 0) === 0) return [];
  if (!Number.isSafeInteger(totalPages) || totalPages !== 1)
    throw new Error('Impact report requires additional pages or has inconsistent empty pagination; use ReportExport instead.');
  return payload.Records;
}

export function safeResponseShape(payload) {
  const records = reportRecords(payload);
  const first = records.find(r=>r && typeof r==='object' && !Array.isArray(r));
  if (!first) return {empty:true,hasRows:false,fields:[],dateFieldPresent:false,hasReportCurrency:false};
  const fields = Object.keys(first).filter(key=>ALLOWED_KEYS.has(key)).sort();
  return {
    empty:false,
    hasRows:true,
    fields,
    dateFieldPresent:fields.includes('sort_date')||fields.includes('date_display'),
    hasReportCurrency:fields.includes('Currency')||fields.includes('CurrencyCode'),
    // Do NOT emit row count or field values into public workflow logs.
  };
}

export async function verifyResponse(env=process.env,fetcher=fetch,now=new Date()) {
  const sid=validateSid(env.IMPACT_ACCOUNT_SID);
  const token=env.IMPACT_AUTH_TOKEN;
  if (!token)throw new Error('IMPACT_AUTH_TOKEN is not configured.');
  const day=completedTexasDate(now);
  const results=[];
  for(const reportId of REPORTS) {
    const url=new URL(reportUrl(sid,'/'+reportId+'/MetaData').replace(/\/MetaData$/,''));
    url.searchParams.set('START_DATE',day);
    url.searchParams.set('END_DATE',day);
    const payload=await impactGet(url.toString(),sid,token,fetcher);
    results.push({report:reportId,...safeResponseShape(payload)});
  }
  return {status:'READ_ONLY_RESPONSE_SHAPE_VERIFIED',reportWindow:'single_completed_texas_day',results};
}

if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
  verifyResponse().then(result=>{
    console.log('IMPACT_RESPONSE_SHAPE '+JSON.stringify(result));
  }).catch(error=>{
    const message=error instanceof Error && /^(IMPACT_|Impact report|Unexpected Impact|Invalid date)/.test(error.message)
      ?error.message:'Impact report response could not be safely verified.';
    console.error('IMPACT_RESPONSE_SHAPE_FAILED '+message);
    process.exitCode=1;
  });
}
