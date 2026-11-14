// Read-only editorial research report for official tax-rate gaps.
// Missing Comptroller values never become zero and no published rate is changed.
// Reuses the existing Supabase service key in the monthly GitHub workflow.

export function summarizeUnreportedRates(rows, locallyVerified) {
  if (!Array.isArray(rows) || !Array.isArray(locallyVerified)) throw new Error('Expected arrays of official missing rows and verified local evidence');
  const byIdentity = new Map();
  for (const local of locallyVerified) {
    const key = [Number(local.tax_year), local.unit_type, local.slug].join('/');
    if (byIdentity.has(key)) throw new Error('Duplicate locally verified rate identity: '+key);
    byIdentity.set(key,local);
  }
  const groups = new Map();
  const candidates = [];
  const seen = new Set();
  const types = new Set(['city','county','school-district','special-district']);
  for (const row of rows) {
    const year = Number(row.year);
    if (!Number.isInteger(year) || !types.has(row.type) || !row.slug ||
        row.source_status !== 'not-reported' || row.total_rate !== null) {
      throw new Error('Unexpected official missing-rate source row: '+JSON.stringify(row));
    }
    const key = [year,row.type,row.slug].join('/');
    if (seen.has(key)) throw new Error('Duplicate official source gap: '+key);
    seen.add(key);
    const local = byIdentity.get(key);
    const entry = groups.get(year) ?? {year, city:0,county:0,'school-district':0,'special-district':0,verified:0,stillMissing:0};
    entry[row.type]++;
    if (local) {
      if (local.status !== 'verified' ||
          !Array.isArray(row.official_taxing_unit_ids) ||
          !row.official_taxing_unit_ids.includes(local.official_unit_id))
        throw new Error('Locally verified gap has mismatched source ID: '+key);
      entry.verified++;
    } else {
      entry.stillMissing++;
      if (row.type==='city'||row.type==='county') candidates.push({year,type:row.type,name:row.name,slug:row.slug});
    }
    groups.set(year,entry);
  }
  return {
    groups:[...groups.values()].sort((a,b)=>b.year-a.year),
    total:rows.length,
    covered: [...groups.values()].reduce((sum,g)=>sum+g.verified,0),
    // Research queue only; no rate is implied.
    candidates:candidates.sort((a,b)=>b.year-a.year||a.type.localeCompare(b.type)||a.name.localeCompare(b.name)),
  };
}

async function readRows(base,key,table,query){
  const url = new URL('/rest/v1/'+table,base);
  for (const [name,value] of Object.entries(query)) url.searchParams.set(name,String(value));
  const res = await fetch(url, {headers:{apikey:key,Authorization:'Bearer '+key}});
  if (!res.ok) throw new Error('Source gap report could not read '+table+' (HTTP '+res.status+')');
  const rows=await res.json();
  if (!Array.isArray(rows)) throw new Error('Unexpected '+table+' API response');
  return rows;
}

export async function fetchSourceGapInventory(base,key){
  const years=[];
  const currentYear=Number(new Date().getUTCFullYear());
  // Check all retained published years, not only the moving five-year lookback.
  // Current year may not be published until the following January.
  for(let year=2021;year<=currentYear;year++){
    const rows=await readRows(base,key,'texas_property_tax_rates',{
      select:'year,type,name,slug,official_taxing_unit_ids,source_status,total_rate',
      year:'eq.'+year,source_status:'eq.not-reported',limit:1000
    });
    if(rows.length===1000) throw new Error(year+': source gaps may exceed one API page; refusing incomplete report');
    years.push(...rows);
  }
  const locals=await readRows(base,key,'texas_tax_local_verified_rates',{
    select:'tax_year,unit_type,slug,official_unit_id,status',
    status:'eq.verified',limit:1000
  });
  if(locals.length===1000) throw new Error('Local evidence may exceed one API page; refusing incomplete report');
  return summarizeUnreportedRates(years,locals);
}

export function markdownSourceGapReport(report){
  const lines = ['','### Official tax-rate reporting gaps','',
    'These are **not reported** values in the Texas Comptroller source, not zero rates. A verified local supplement is display-only and never a calculator input.','',
    '| Year | Cities | Counties | Schools | Special districts | Locally documented | Still without local evidence |',
    '|---|---:|---:|---:|---:|---:|---:|'];
  for(const g of report.groups){
    lines.push('| '+[g.year,g.city,g.county,g['school-district'],g['special-district'],g.verified,g.stillMissing].join(' | ')+' |');
  }
  lines.push('','**Total official not-reported rows:** '+report.total+'; **with verified local evidence:** '+report.covered+'.',
    '','#### Research candidates (not assumed zero)','',
    ...report.candidates.slice(0,20).map(x=>'- '+x.year+' '+x.type+': '+x.name+' ('+x.slug+')'));
  if(report.candidates.length>20)lines.push('- … and '+(report.candidates.length-20)+' additional unresolved city/county observations');
  if(!report.candidates.length)lines.push('- No currently unresolved city or county observations.');
  lines.push('','Only year-specific primary government documents can justify a new verified local rate.','');
  return lines.join('\n');
}

if(import.meta.main){
  const base=Deno.env.get('SUPABASE_URL'),key=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if(!base||!key)throw new Error('Existing Supabase sync credentials are missing');
  const result=await fetchSourceGapInventory(base,key);
  const markdown=markdownSourceGapReport(result);
  console.log('Source gap audit: '+result.total+' unreported official rows, '+result.covered+' locally verified; '+result.candidates.length+' unresolved city/county observations.');
  const summary=Deno.env.get('GITHUB_STEP_SUMMARY');
  if(summary)await Deno.writeTextFile(summary,markdown,{append:true});
}
