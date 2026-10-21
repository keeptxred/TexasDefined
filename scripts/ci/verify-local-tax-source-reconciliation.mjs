// Compare official statewide taxing-unit rows against independently documented
// local supplements during the existing monthly Comptroller sync.
// This is read-only: a discrepancy fails the scheduled workflow rather than
// silently overriding either source or changing the parcel calculator.
import { appendFileSync } from 'node:fs';

const EPSILON=0.00000001;
const knownConflict={
  key:'2022:city:city-of-union-valley',
  official:0.287248,
  local:0,
  id:'116-111-03',
  evidenceHost:'hunt-cad.org',
};

export function reconcileLocalTaxRate(local,official) {
  const key=String(local.tax_year)+':'+local.unit_type+':'+local.slug;
  if(!official||!Array.isArray(official.official_taxing_unit_ids)
    ||!official.official_taxing_unit_ids.includes(local.official_unit_id)
    ||official.year!==local.tax_year
    ||official.type!==local.unit_type
    ||official.slug!==local.slug) return {status:'invalid-identity',key};
  const total=Number(local.total_rate);
  if(!Number.isFinite(total)||total<0||total>10
    ||typeof local.source_url!=='string'
    ||!local.source_url.startsWith('https://')) return {status:'invalid-local-evidence',key};
  const mo=local.maintenance_operations_rate;
  const debt=local.debt_service_rate;
  if((mo===null)!==(debt===null)
    ||(mo!==null&&Math.abs(total-Number(mo)-Number(debt))>EPSILON))
    return {status:'invalid-local-components',key};
  if(official.total_rate===null) {
    if(official.source_status!=='not-reported'&&official.rate_unavailable!==true)
      return {status:'unexpected-missing-official-rate',key};
    return {status:'supplement',key};
  }
  const reported=Number(official.total_rate);
  if(!Number.isFinite(reported)||reported<0||reported>10)
    return {status:'invalid-official-rate',key};
  if(Math.abs(total-reported)<=EPSILON)return {status:'corroborated',key};
  if(key===knownConflict.key
    &&local.official_unit_id===knownConflict.id
    &&Math.abs(total-knownConflict.local)<=EPSILON
    &&Math.abs(reported-knownConflict.official)<=EPSILON
    &&new URL(local.source_url).hostname.toLowerCase()===knownConflict.evidenceHost)
    return {status:'documented-conflict',key};
  return {status:'new-conflict',key,localRate:total,officialRate:reported};
}

const base=(process.env.SUPABASE_URL||'').replace(/\/+$/,'');
const secret=process.env.SUPABASE_SERVICE_ROLE_KEY||'';
async function rest(table,params) {
  const u=new URL(base+'/rest/v1/'+table);
  for(const [key,value] of Object.entries(params))u.searchParams.set(key,value);
  const response=await fetch(u.toString(),{
    headers:{apikey:secret,Authorization:'Bearer '+secret,Accept:'application/json'},
    signal:AbortSignal.timeout(25000),
  });
  if(!response.ok)throw new Error(table+' source audit read returned HTTP '+response.status);
  const data=await response.json();
  if(!Array.isArray(data))throw new Error(table+' returned an unexpected result format');
  return data;
}
async function audit() {
  if(!base.startsWith('https://')||!secret)
    throw new Error('Existing secure Supabase URL and service-role key are required');
  const local=await rest('texas_tax_local_verified_rates',{
    select:'tax_year,unit_type,slug,official_unit_id,total_rate,maintenance_operations_rate,debt_service_rate,source_url,status',
    status:'eq.verified',limit:'1000',
  });
  if(!local.length||local.length>=1000)
    throw new Error('Verified-local source registry was empty or truncated');
  const seen=new Set();
  const outcomes=[];
  for(const record of local) {
    const key=String(record.tax_year)+':'+record.unit_type+':'+record.slug;
    if(seen.has(key))throw new Error('Duplicate local-rate identity: '+key);
    seen.add(key);
    const official=await rest('texas_property_tax_rates',{
      select:'year,type,slug,official_taxing_unit_ids,total_rate,source_status,rate_unavailable',
      year:'eq.'+record.tax_year,type:'eq.'+record.unit_type,
      slug:'eq.'+record.slug,limit:'5',
    });
    if(official.length!==1)
      throw new Error('Expected one official row for '+key+', found '+official.length);
    outcomes.push(reconcileLocalTaxRate(record,official[0]));
  }
  const tally={};
  for(const result of outcomes)tally[result.status]=(tally[result.status]||0)+1;
  const summary=[
    '## Verified local property-tax source reconciliation',
    '',
    '| Status | Count |',
    '|---|---:|',
    ...Object.entries(tally).sort().map(([status,count])=>'| '+status+' | '+count+' |'),
    '',
    'Documented conflict: 2022 City of Union Valley (Hunt CAD zero vs Comptroller 0.287248).',
    '',
  ].join('\n');
  if(process.env.GITHUB_STEP_SUMMARY)
    appendFileSync(process.env.GITHUB_STEP_SUMMARY,summary+'\n');
  const problems=outcomes.filter(x=>!['supplement','corroborated','documented-conflict'].includes(x.status));
  if(problems.length){
    for(const v of problems)console.error('::error::Local tax-source reconciliation '+v.key+': '+v.status);
    throw new Error(problems.length+' unexpected locally verified source discrepancy(ies)');
  }
  console.log('Verified '+outcomes.length+' independently documented local tax years, including '+(tally['documented-conflict']||0)+' known explicit source conflict(s).');
}

if(process.argv.includes('--execute')){
  audit().catch(e=>{console.error(e instanceof Error?e.message:String(e));process.exitCode=1;});
}
