// Read-only post-import integrity check for raw Comptroller source archive.
// Uses existing Supabase URL/service key; no writes and no new services.
const TAX_START_YEAR=2021;
const CATEGORIES=['county','city','school-district','special-district'];

export function verifyArchiveYear(run,counts) {
  const identity='Tax year '+run.tax_year;
  if(!Number.isInteger(run.tax_year)||run.tax_year<TAX_START_YEAR ||
      !/^[a-f0-9]{64}$/i.test(String(run.source_signature??''))) {
    throw new Error(identity+': invalid completed-run provenance');
  }
  if(counts.published!==run.expected_count || counts.source!==run.expected_raw_count ||
     counts.matchingSignature!==counts.source || counts.counties!==254) {
    throw new Error(identity+': inconsistent normalized, raw, source-signature, or county counts '+
      JSON.stringify({actual:counts,expected:{published:run.expected_count,source:run.expected_raw_count,counties:254}}));
  }
  for(const type of CATEGORIES) {
    if(!(counts.byCategory?.[type]>0)) throw new Error(identity+': missing source workbook category '+type);
  }
  if(CATEGORIES.reduce((acc,type)=>acc+counts.byCategory[type],0)!==counts.source) {
    throw new Error(identity+': workbook-category counts do not reconcile to source-row total');
  }
  return true;
}

async function readRows(base,key,table,query){
  const url=new URL('/rest/v1/'+table,base);
  for(const [k,v] of Object.entries(query))url.searchParams.set(k,String(v));
  const response=await fetch(url,{headers:{apikey:key,Authorization:'Bearer '+key}});
  if(!response.ok)throw new Error(table+': HTTP '+response.status);
  const rows=await response.json();
  if(!Array.isArray(rows))throw new Error(table+': unexpected response data');
  return rows;
}

async function exactCount(base,key,table,filters){
  const url=new URL('/rest/v1/'+table,base);
  url.searchParams.set('select','id');
  url.searchParams.set('limit','1');
  for(const [k,v] of Object.entries(filters))url.searchParams.set(k,String(v));
  // Only the server-side service key can read restricted archive tables.
  const res=await fetch(url,{method:'HEAD',headers:{
    apikey:key,Authorization:'Bearer '+key,Prefer:'count=exact'
  }});
  if(!res.ok)throw new Error(table+': exact count failed (HTTP '+res.status+')');
  const range=res.headers.get('content-range')??'';
  const match=range.match(/\/(\d+)$/);
  if(!match)throw new Error(table+': no exact count in Content-Range header');
  return Number(match[1]);
}

export async function verifySourceArchive(base,key){
  const completed=await readRows(base,key,'texas_tax_import_runs',{
    select:'tax_year,source_signature,expected_count,expected_raw_count,finished_at',
    status:'eq.completed',order:'finished_at.desc',limit:500
  });
  const byYear=new Map();
  for(const run of completed){
    if(!byYear.has(run.tax_year))byYear.set(run.tax_year,run);
  }
  if(!byYear.size)throw new Error('No completed official tax imports in audit ledger');
  const latest=Math.max(...byYear.keys());
  for(let year=TAX_START_YEAR;year<=latest;year++){
    if(!byYear.has(year))throw new Error('Missing completed import for retained year '+year);
  }
  const years=[...byYear].sort((a,b)=>b[0]-a[0]);
  // Cap concurrent exact-count requests, preserving cheap scheduled execution.
  for(const [year,run] of years){
    const filters={year:'eq.'+year};
    const raw={tax_year:'eq.'+year};
    const values=await Promise.all([
      exactCount(base,key,'texas_property_tax_rates',filters),
      exactCount(base,key,'texas_property_tax_rates',{...filters,type:'eq.county'}),
      exactCount(base,key,'texas_tax_import_source_rows',raw),
      exactCount(base,key,'texas_tax_import_source_rows',{...raw,source_signature:'eq.'+run.source_signature}),
      ...CATEGORIES.map(type=>exactCount(base,key,'texas_tax_import_source_rows',{...raw,unit_type:'eq.'+type}))
    ]);
    const counts={published:values[0],counties:values[1],source:values[2],
      matchingSignature:values[3],byCategory:Object.fromEntries(CATEGORIES.map((type,i)=>[type,values[4+i]]))};
    verifyArchiveYear(run,counts);
    console.log('Tax archive '+year+': '+counts.published+' normalized, '+counts.source+
      ' original parsed source rows, four valid workbook categories');
  }
  return {years:years.length,earliest:TAX_START_YEAR,latest};
}

if(import.meta.main){
  const base=Deno.env.get('SUPABASE_URL'),key=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if(!base||!key)throw new Error('Existing sync Supabase URL/key unavailable');
  const result=await verifySourceArchive(base,key);
  const line='Official source archive intact for '+result.years+
    ' retained tax years ('+result.earliest+'–'+result.latest+').';
  console.log(line);
  const summary=Deno.env.get('GITHUB_STEP_SUMMARY');
  if(summary)await Deno.writeTextFile(summary,'\n### Retained historical source archive\n'+line+
    '\nSource categories, fingerprints, normalized row totals, and 254 county rows/year verified.\n',{append:true});
}
