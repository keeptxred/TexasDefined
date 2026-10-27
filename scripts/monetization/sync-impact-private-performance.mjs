#!/usr/bin/env node
/**
 * Import provider-reported daily counts to private Supabase.
 * This is NOT a paid commission ledger. Financial values are intentionally
 * withheld until the publisher account's currency is independently verified.
 */
import {pathToFileURL} from 'node:url';
import {impactGet,reportUrl,validateSid} from './impact-reporting-discovery.mjs';
import {completedTexasDate,reportRecords} from './impact-readonly-sample.mjs';
import {normalizeDailyImpactRows} from './impact-performance-normalize.mjs';

const REPORT='partner_performance_by_day';
const TABLE='texasdefined_impact_performance_daily';
const MAX_DAYS=3;

function required(env,name){
  const v=env[name]?.trim();
  if(!v)throw new Error(name+' is required.');
  return v;
}
function dayOffset(day,n){
  const date=new Date(day+'T12:00:00Z');
  date.setUTCDate(date.getUTCDate()-n);
  return date.toISOString().slice(0,10);
}
export async function loadCompletedDays({env=process.env,fetcher=fetch,now=new Date(),days=MAX_DAYS}={}){
  if(!Number.isSafeInteger(days)||days<1||days>MAX_DAYS)throw new Error('Unsafe Impact sync day count.');
  const sid=validateSid(required(env,'IMPACT_ACCOUNT_SID'));
  const token=required(env,'IMPACT_AUTH_TOKEN');
  const completed=completedTexasDate(now);
  const output=[];
  for(let n=days-1;n>=0;n--){
    const day=dayOffset(completed,n);
    const url=new URL(reportUrl(sid,'/'+REPORT+'/MetaData').replace(/\/MetaData$/,''));
    url.searchParams.set('START_DATE',day);
    url.searchParams.set('END_DATE',day);
    const response=await impactGet(url.href,sid,token,fetcher);
    const records=reportRecords(response);
    const row=normalizeDailyImpactRows(records,day);
    if(row)output.push(row); // Empty response never produces a fabricated zero.
  }
  return output;
}

export async function upsertPrivateImpact(rows,{env=process.env,fetcher=fetch}={}){
  if(!Array.isArray(rows)||rows.length>MAX_DAYS)throw new Error('Impact sync requires a bounded daily aggregate.');
  if(rows.length===0)return {saved:false};
  const supabaseUrl=required(env,'SUPABASE_URL');
  const key=required(env,'SUPABASE_SERVICE_ROLE_KEY');
  const parsed=new URL(supabaseUrl);
  if(parsed.protocol!=='https:'||!/^[-a-z0-9]+\.supabase\.co$/.test(parsed.hostname)||parsed.pathname!=='/')
    throw new Error('Unexpected private Supabase project origin.');
  const url=new URL('/rest/v1/'+TABLE,parsed.origin);
  url.searchParams.set('on_conflict','metric_date');
  const response=await fetcher(url.href,{
    method:'POST',
    redirect:'error',
    headers:{
      apikey:key,
      Authorization:'Bearer '+key,
      'Content-Type':'application/json',
      Prefer:'resolution=merge-duplicates,return=minimal',
    },
    body:JSON.stringify(rows),
    signal:AbortSignal.timeout(15_000),
  });
  // Never disclose response data, URL credentials, or financial metrics.
  if(!response.ok)throw new Error('Private Impact aggregate persistence failed with HTTP '+response.status+'.');
  response.body?.cancel?.();
  return {saved:true};
}

export async function run({env=process.env,fetcher=fetch,now=new Date()}={}){
  const rows=await loadCompletedDays({env,fetcher,now});
  const result=await upsertPrivateImpact(rows,{env,fetcher});
  return {status:'PRIVATE_AGGREGATE_SYNC_VERIFIED',saved:result.saved,providerDaysQueried:MAX_DAYS,amountsStored:false};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  run().then(x=>console.log('IMPACT_PRIVATE_SYNC '+JSON.stringify(x))).catch(err=>{
    const e=err instanceof Error?err.message:'Unknown private sync error.';
    const safe=/^(IMPACT_|SUPABASE_|Impact|Private Impact|Unsafe|Unexpected|Invalid)/.test(e)?e:'Impact private reporting sync failed.';
    console.error('IMPACT_PRIVATE_SYNC_FAILED '+safe);
    process.exitCode=1;
  });
}
