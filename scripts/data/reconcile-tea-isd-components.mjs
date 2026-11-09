// Reconcile only missing 2021–2023 school-district M&O/I&S components.
// The official Comptroller total remains authoritative and unchanged.
// The independently published TEA spreadsheet is matched by district CDN,
// normalized name, year and exact arithmetic, never by a fuzzy slug alone.
import * as XLSX from 'npm:xlsx@0.18.5';

const TEA_URL='https://tea.texas.gov/about-tea/state-funding/additional-finance-resources/school-district-adopted-tax-rates-1.xlsx';
const EXPECTED_YEARS=[2021,2022,2023];
const OFFICIAL_NAME='Texas Education Agency';
const base=Deno.env.get('SUPABASE_URL');
const key=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
if(!base||!key)throw Error('Read-only source matching requires existing server-side Supabase credentials');
const response=await fetch(TEA_URL,{headers:{'user-agent':'TexasDefined-ISD-Evidence-Matcher/1.0'},signal:AbortSignal.timeout(30000)});
if(!response.ok)throw Error('TEA official XLSX fetch failed: HTTP '+response.status);
const bytes=new Uint8Array(await response.arrayBuffer());
if(bytes.length<100000)throw Error('TEA XLSX unexpectedly small');
const sha=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(n=>n.toString(16).padStart(2,'0')).join('');
const wb=XLSX.read(bytes,{type:'array',raw:true});
if(wb.SheetNames.length!==1)throw Error('Unexpected TEA workbook sheets');
const rows=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1,defval:null,raw:true});
const normalize=s=>String(s??'').normalize('NFKC').toUpperCase().replace(/\bINDEPENDENT SCHOOL DISTRICT\b/g,'ISD').replace(/[^A-Z0-9]/g,'');
const header=rows[0].map(s=>String(s??'').trim().replace(/\s+/g,' ').toUpperCase());
if(header[0]!=='CDN'||header[1]!=='SCHOOL DISTRICT')throw Error('TEA district ID/name headers changed');
const indices=new Map();
for(const year of EXPECTED_YEARS){
  const mo=header.indexOf((year+'-'+(year+1)+' M&O TAX RATE').toUpperCase());
  const debt=header.indexOf((year+'-'+(year+1)+' I&S TAX RATE').toUpperCase());
  if(mo<0||debt<0||mo===debt)throw Error('TEA tax-year component headers changed for '+year);
  indices.set(year,{mo,debt});
}
const official=new Map();
for(const row of rows.slice(1)){
  const cdn=String(row[0]??'').trim().padStart(6,'0');
  if(!/^\d{6}$/.test(cdn))continue;
  if(official.has(cdn))throw Error('Duplicate TEA district CDN '+cdn);
  official.set(cdn,row);
}
if(official.size<900)throw Error('Too few TEA district identifiers: '+official.size);
async function fetchSource(year,offset){
  const url=new URL('/rest/v1/texas_property_tax_rates',base);
  for(const [name,val]of Object.entries({select:'year,slug,name,source_status,rate_unavailable,total_rate,maintenance_operations_rate,debt_service_rate,official_taxing_unit_ids',type:'eq.school-district',year:'eq.'+year,order:'slug.asc',limit:'1000',offset:String(offset)}))url.searchParams.set(name,val);
  const res=await fetch(url,{headers:{apikey:key,Authorization:'Bearer '+key,Accept:'application/json'},signal:AbortSignal.timeout(30000)});
  if(!res.ok)throw Error('Supabase school rate read failed, year '+year+' offset '+offset+', HTTP '+res.status);
  const data=await res.json();
  if(!Array.isArray(data))throw Error('Unexpected Supabase row shape');
  return data;
}
const report={sourceAgency:OFFICIAL_NAME,sourceUrl:TEA_URL,sourceSha256:sha,sourceYearRange:[2021,2023],verifiedOn:new Date().toISOString().slice(0,10),districts:{},stats:{}};
for(const year of EXPECTED_YEARS){
  const state=[...await fetchSource(year,0),...await fetchSource(year,1000)];
  if(state.length<900||state.length>1100)throw Error('School year '+year+' query returned incomplete size '+state.length);
  const seen=new Set();
  const stats={rows:state.length,exactVerified:0,alreadyComplete:0,unmatchedCDN:0,nameMismatch:0,sourceMismatch:0,nonReconciling:0,invalid:0};
  for(const record of state){
    const identity=year+'/'+record.slug;
    if(seen.has(identity))throw Error('Duplicate state district identity '+identity);
    seen.add(identity);
    if(record.maintenance_operations_rate!=null&&record.debt_service_rate!=null){stats.alreadyComplete++;continue}
    if(record.rate_unavailable||record.source_status!=='reported-final'||record.total_rate==null){stats.invalid++;continue}
    const stateIds=(record.official_taxing_unit_ids??[]).map(x=>String(x).replace(/-\d+$/,'').replace(/-/g,''));
    const matches=[...new Set(stateIds)].filter(id=>official.has(id));
    if(matches.length!==1){stats.unmatchedCDN++;continue}
    const school=official.get(matches[0]);
    if(normalize(school[1])!==normalize(record.name)){stats.nameMismatch++;continue}
    const i=indices.get(year);
    const mo=Number(school[i.mo]), debt=Number(school[i.debt]);
    const total=Number(record.total_rate);
    if(!Number.isFinite(mo)||!Number.isFinite(debt)||mo<0||debt<0||mo>3||debt>3){stats.invalid++;continue}
    if(Math.abs(mo+debt-total)>0.000002){stats.nonReconciling++;continue}
    const prior=report.districts[record.slug]??{};
    if(prior[String(year)])throw Error('Duplicate approved component');
    prior[String(year)]={year,officialDistrictId:matches[0],name:record.name,totalRate:total,maintenanceOperationsRate:mo,debtServiceRate:debt,sourceUrl:TEA_URL};
    report.districts[record.slug]=prior;
    stats.exactVerified++;
  }
  report.stats[String(year)]=stats;
}
const sum=Object.values(report.stats).reduce((n,v)=>n+v.exactVerified,0);
if(sum<300)throw Error('Unacceptably small matched official component coverage: '+sum);
console.log('TEA_MATCH_STATISTICS '+JSON.stringify({sourceSha256:sha,sourceRows:official.size,years:report.stats,totalAccepted:sum,districts:Object.keys(report.districts).length}));
const content=JSON.stringify(report);
const size=4000;
const count=Math.ceil(content.length/size);
for(let i=0;i<count;i++)console.log('TEA_OVERLAY_CHUNK '+i+'/'+count+' '+content.slice(i*size,(i+1)*size));
