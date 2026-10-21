// Unattended, read-only audit of verified local tax-rate evidence.
// Same Supabase credentials and GitHub runner as the official monthly sync.
// NEVER mutate published Comptroller rows, the verified supplements or calculators.

export function checkVerifiedLocalRate(local, officialRows) {
  const identity = local.tax_year + '/' + local.unit_type + '/' + local.slug;
  if (!/^[a-z0-9-]+$/.test(String(local.slug ?? '')) ||
      !Number.isInteger(Number(local.tax_year)) ||
      !['county','city','school-district','special-district'].includes(local.unit_type)) {
    throw new Error('Invalid local supplement identity: ' + identity);
  }
  if (!Array.isArray(officialRows) || officialRows.length !== 1) {
    throw new Error(identity + ': expected exactly one matching Comptroller row, got ' + (officialRows?.length ?? 'unknown'));
  }
  const official = officialRows[0];
  if (Number(official.year) !== Number(local.tax_year) ||
      official.type !== local.unit_type || official.slug !== local.slug ||
      !Array.isArray(official.official_taxing_unit_ids) ||
      !official.official_taxing_unit_ids.includes(local.official_unit_id)) {
    throw new Error(identity + ': local evidence no longer matches the Comptroller official unit ID');
  }
  if (local.status !== 'verified' || !String(local.source_url ?? '').startsWith('https://') ||
      !String(local.source_agency ?? '').trim()) {
    throw new Error(identity + ': verified status or HTTPS primary-source attribution is invalid');
  }
  const localRate = Number(local.total_rate);
  if (!Number.isFinite(localRate) || localRate < 0 || localRate > 20) {
    throw new Error(identity + ': invalid local rate');
  }
  const mo = local.maintenance_operations_rate;
  const debt = local.debt_service_rate;
  if ((mo == null) !== (debt == null)) {
    throw new Error(identity + ': local M&O and I&S are only partially specified');
  }
  if (mo != null && (!Number.isFinite(Number(mo)) || !Number.isFinite(Number(debt)) ||
      Math.abs(Number(mo) + Number(debt) - localRate) > 0.000001)) {
    throw new Error(identity + ': local rate components do not reconcile');
  }
  const officialRate = official.total_rate == null ? null : Number(official.total_rate);
  if (officialRate == null) {
    if (official.source_status !== 'not-reported' || !official.rate_unavailable) {
      throw new Error(identity + ': unreported official row has an inconsistent source status');
    }
    return 'supplement';
  }
  if (!Number.isFinite(officialRate)) throw new Error(identity + ': nonnumeric official rate');
  return Math.abs(officialRate - localRate) <= 0.000001 ? 'corroborated' : 'conflict';
}

async function restRead(baseUrl, serviceKey, table, query) {
  const url = new URL('/rest/v1/' + table, baseUrl);
  for (const [key,value] of Object.entries(query)) url.searchParams.set(key,value);
  const response = await fetch(url, {
    headers: { apikey: serviceKey, Authorization: 'Bearer ' + serviceKey,
      Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(table + ' read failed (HTTP ' + response.status + ')');
  const rows = await response.json();
  if (!Array.isArray(rows)) throw new Error(table + ': unexpected response format');
  return rows;
}

export async function auditVerifiedLocalSources(baseUrl, serviceKey) {
  const locals = await restRead(baseUrl,serviceKey,'texas_tax_local_verified_rates',{
    select:'tax_year,unit_type,slug,official_unit_id,total_rate,maintenance_operations_rate,debt_service_rate,source_url,source_agency,status',
    status:'eq.verified',limit:'1000',
  });
  if (!locals.length || locals.length >= 1000) {
    throw new Error('Unexpected verified-local-rate inventory size: ' + locals.length);
  }
  const seen = new Set();
  const outcomes = {supplement:0,corroborated:0,conflict:0};
  // Batch calls rather than unbounded network fan-out; URL filters use
  // server-validated year, source type and URL-encoded slug.
  for (let offset=0;offset<locals.length;offset+=5) {
    const batch=locals.slice(offset,offset+5);
    const matches=await Promise.all(batch.map(local=>{
      const identity=[local.tax_year,local.unit_type,local.slug].join('/');
      if(seen.has(identity)) throw new Error('Duplicate verified local identity: '+identity);
      seen.add(identity);
      return restRead(baseUrl,serviceKey,'texas_property_tax_rates',{
        select:'year,type,slug,official_taxing_unit_ids,total_rate,source_status,rate_unavailable',
        year:'eq.'+local.tax_year,type:'eq.'+local.unit_type,
        slug:'eq.'+local.slug,limit:'2',
      });
    }));
    batch.forEach((local,i)=>{
      outcomes[checkVerifiedLocalRate(local,matches[i])]++;
    });
  }
  return { checked: locals.length, ...outcomes };
}

if (import.meta.main) {
  const supabaseUrl=Deno.env.get('SUPABASE_URL');
  const serviceKey=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if(!supabaseUrl || !serviceKey) throw new Error('Existing Supabase sync credentials not configured');
  const result=await auditVerifiedLocalSources(supabaseUrl,serviceKey);
  const line='Verified local tax-rate identity audit: '+result.checked+' matched; '+
    result.supplement+' supplements, '+result.corroborated+
    ' corroborations, '+result.conflict+' explicitly retained conflicts';
  console.log(line);
  const summaryPath=Deno.env.get('GITHUB_STEP_SUMMARY');
  if(summaryPath) {
    await Deno.writeTextFile(summaryPath,'\n### Local government rate provenance\n'+line+
      '\nNo published tax-rate or calculator records were changed.\n',{append:true});
  }
}
