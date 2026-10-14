import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import * as XLSX from "npm:xlsx@0.18.5";
import { createClient } from "npm:@supabase/supabase-js@2.112.0";

type UnitType = "county" | "city" | "school-district" | "special-district";
type RawRecord = { type:UnitType; name:string; baseSlug:string; countySlug:string; officialId:string; officialBase:string; unavailable:boolean; totalRate:number|null; moRate:number|null; debtRate:number|null; levy:number|null; sourceUrl:string };
const supabase=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,{auth:{persistSession:false,autoRefreshToken:false}});
const FILES:Record<UnitType,string>={"school-district":"school-district-rates-levies.xlsx",city:"city-rates-levies.xlsx",county:"county-rates-levies.xlsx","special-district":"special-district-rates-levies.xlsx"};
const TEA_2025_MINIMUM_MCR=0.5689;
const KNOWN_2025_SCHOOL_RATE_CORRECTIONS:Record<string,{raw:{total:number;mo:number;debt:number};corrected:{total:number;mo:number;debt:number};sourceUrl:string}>={
  "200-901-02":{raw:{total:0.286335,mo:0.286335,debt:0},corrected:{total:0.7705,mo:0.7705,debt:0},sourceUrl:"https://www.runnelscounty.org/upload/page/6004/2025/Ballinger%20ISD%202025%20Tax%20Rate%20Adoption.pdf"},
  "099-902-02":{raw:{total:0.8247,mo:0.47,debt:0.3547},corrected:{total:1.0239,mo:0.6692,debt:0.3547},sourceUrl:"https://www.hardemancad.org/Forms/GetDocument?fileName=1773687390_2025+Tax+Rates.pdf&subPath=Data+Records"},
  "220-907-02":{raw:{total:1.0852,mo:0.33,debt:0.7552},corrected:{total:1.0852,mo:0.7552,debt:0.33},sourceUrl:"https://www.kellerisd.net/departments/finance"},
};
const sameRate=(a:number|null,b:number)=>a!=null&&Math.abs(a-b)<1e-8;
function applyKnown2025SchoolRateCorrection(unit:any){
  if(unit.year!==2025||unit.type!=="school-district")return false;
  const correction=KNOWN_2025_SCHOOL_RATE_CORRECTIONS[unit.officialBase];
  if(!correction)return false;
  if(!sameRate(unit.total_rate,correction.raw.total)||!sameRate(unit.maintenance_operations_rate,correction.raw.mo)||!sameRate(unit.debt_service_rate,correction.raw.debt))return false;
  unit.total_rate=correction.corrected.total;
  unit.maintenance_operations_rate=correction.corrected.mo;
  unit.debt_service_rate=correction.corrected.debt;
  unit.source_url=correction.sourceUrl;
  unit.source_status="reported-final";
  unit.variable_rate=false;
  unit.rate_variants=[correction.corrected.total];
  unit.rate_unavailable=false;
  return true;
}
const clean=(v:unknown)=>String(v??"").replace(/\s+/g," ").trim();
const slugify=(v:string)=>clean(v).toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const header=(v:unknown)=>clean(v).toUpperCase();
function numberValue(v:unknown):number|null{const n=typeof v==="number"?v:Number(String(v??"").replace(/[$,%]/g,""));return Number.isFinite(n)?n:null}
const hasSingleStar=(v:string)=>/\*\s*$/.test(clean(v))&&!/\*\*\s*$/.test(clean(v));
const stripTrailingStars=(v:string)=>clean(v).replace(/\s*\*+\s*$/,"").trim();
const stripCounty=(v:string)=>clean(v).replace(/\s+County$/i,"").trim();
function cleanCounty(v:string){return stripCounty(clean(v).replace(/\s*\*+\s*(?=County$|$)/i," "))}
function sumKnown(vs:Array<number|null>){const f=vs.filter((v):v is number=>v!=null);return f.length?f.reduce((a,b)=>a+b,0):null}
const uniqueNumbers=(vs:Array<number|null>)=>[...new Set(vs.filter((v):v is number=>v!=null).map(v=>Number(v.toFixed(8))))].sort((a,b)=>a-b);
const uniqueStrings=(vs:string[])=>[...new Set(vs.filter(Boolean))].sort();
function officialBase(id:string){const p=id.split("-").filter(Boolean);return p.slice(0,Math.min(3,p.length)).join("-")||id}
function locateRows(bytes:Uint8Array){const wb=XLSX.read(bytes,{type:"array",cellDates:false});for(const sn of wb.SheetNames){const rows=XLSX.utils.sheet_to_json(wb.Sheets[sn],{header:1,defval:null,raw:true}) as unknown[][];for(let i=0;i<Math.min(rows.length,30);i++){const hs=rows[i].map(header);if(hs.includes("TAXING UNIT ID")&&(hs.includes("TOTAL TAX RATE")||hs.includes("TOTAL COUNTY TAX RATE")))return{headers:hs,rows:rows.slice(i+1)}}}throw new Error("Could not locate Detail header row")}
function cellMap(headers:string[],row:unknown[]){const m=new Map<string,unknown>();headers.forEach((h,i)=>{if(h)m.set(h,row[i])});return m}
function pick(m:Map<string,unknown>,ks:string[]){for(const k of ks)if(m.has(k))return m.get(k);return null}
function parseWorkbook(type:UnitType,sourceUrl:string,bytes:Uint8Array):RawRecord[]{const{headers,rows}=locateRows(bytes);const out:RawRecord[]=[];for(const row of rows){const m=cellMap(headers,row);const countyRaw=clean(pick(m,["COUNTY NAME","COUNTY"]));const countyName=cleanCounty(countyRaw);const oid=clean(pick(m,["TAXING UNIT ID"]));if(!countyName||!oid)continue;const unitRaw=type==="county"?countyRaw:clean(pick(m,["TAXING UNIT NAME","TU NAME","DISTRICT NAME","CITY NAME"]));const unavailable=hasSingleStar(unitRaw);const name=type==="county"?`${countyName} County`:stripTrailingStars(unitRaw);if(!name)continue;const totalRate=numberValue(pick(m,type==="county"?["TOTAL COUNTY TAX RATE","TOTAL TAX RATE"]:["TOTAL TAX RATE"]));const moRate=type==="county"?sumKnown([numberValue(pick(m,["GF M&O TAX RATE"])),numberValue(pick(m,["R&B M&O TAX RATE"])),numberValue(pick(m,["FMFC M&O RATE"]))]):numberValue(pick(m,["M&O RATE","M&O TAX RATE"]));const debtRate=type==="county"?sumKnown([numberValue(pick(m,["GF I&S TAX RATE"])),numberValue(pick(m,["R&B I&S TAX RATE"])),numberValue(pick(m,["FMFC I&S RATE"]))]):numberValue(pick(m,["I&S RATE","I&S TAX RATE"]));out.push({type,name,baseSlug:slugify(name),countySlug:slugify(countyName),officialId:oid,officialBase:officialBase(oid),unavailable,totalRate,moRate,debtRate,levy:numberValue(pick(m,["CALCULATED LEVY","LEVY"])),sourceUrl})}return out}
function normalizeYear(raw:RawRecord[],year:number){const groups=new Map<string,RawRecord[]>();for(const r of raw){const k=`${r.type}:${r.officialBase}`;const g=groups.get(k)??[];g.push(r);groups.set(k,g)}const units:any[]=[];for(const group of groups.values()){const usable=group.filter(r=>!r.unavailable);const rateUnavailable=usable.length===0;const totals=uniqueNumbers(usable.map(r=>r.totalRate));const mos=uniqueNumbers(usable.map(r=>r.moRate));const debts=uniqueNumbers(usable.map(r=>r.debtRate));const names=uniqueStrings(group.map(r=>r.name));const name=names.sort((a,b)=>a.length-b.length||a.localeCompare(b))[0];const levies=usable.map(r=>r.levy).filter((v):v is number=>v!=null);units.push({year,type:group[0].type,name,baseSlug:slugify(name),officialBase:group[0].officialBase,county_slugs:uniqueStrings(group.map(r=>r.countySlug)),total_rate:rateUnavailable?null:(totals.length===1?totals[0]:null),maintenance_operations_rate:rateUnavailable?null:(mos.length===1?mos[0]:null),debt_service_rate:rateUnavailable?null:(debts.length===1?debts[0]:null),levy:rateUnavailable?null:(levies.length?levies.reduce((a,b)=>a+b,0):null),source_url:group[0].sourceUrl,source_status:rateUnavailable?"not-reported":(usable.length<group.length?"partial-reporting":"reported-final"),variable_rate:!rateUnavailable&&totals.length>1,rate_variants:rateUnavailable?[]:totals,official_taxing_unit_ids:uniqueStrings(group.map(r=>r.officialId)),split_across_cads:uniqueStrings(group.map(r=>r.countySlug)).length>1,rate_unavailable:rateUnavailable,imported_at:new Date().toISOString()})}const collisions=new Map<string,any[]>();for(const u of units){const k=`${u.type}:${u.baseSlug}`;const g=collisions.get(k)??[];g.push(u);collisions.set(k,g)}for(const u of units){const coll=collisions.get(`${u.type}:${u.baseSlug}`)??[];u.slug=coll.length>1?`${u.baseSlug}-${slugify(u.officialBase)}`:u.baseSlug;u.id=`${year}:${u.type}:${u.slug}`;applyKnown2025SchoolRateCorrection(u);if(year===2025&&u.type==="school-district"&&!u.rate_unavailable&&u.maintenance_operations_rate!=null&&u.maintenance_operations_rate<TEA_2025_MINIMUM_MCR){u.source_status="cross-source-conflict";u.rate_unavailable=true}delete u.baseSlug;delete u.officialBase}return units}
const TEA_SOF_SHEET="inputs_lpe";
const strictSourceRate=(value:unknown):number|null=>value==null||clean(value)===""?null:numberValue(value);
const roundedRate=(value:number)=>Number(value.toFixed(8));
async function reconcileSchoolRatesWithTea(units:any[],year:number){
  if(year<2025)return{schoolCount:0,verifiedCount:0,correctedCount:0,teaSourceUrl:null};
  const schools=units.filter(u=>u.type==="school-district");
  const teaSourceUrl=`https://tea.texas.gov/about-tea/state-funding/fy${year}-${year+1}-sof-data.xlsx`;
  const response=await fetch(teaSourceUrl,{headers:{"user-agent":"TexasDefined adopted-school-tax-rate cross-source reconciler/1.0"}});
  if(!response.ok)throw new Error(`TEA school-finance authority unavailable: HTTP ${response.status} for ${year}; aborting import.`);
  const workbook=XLSX.read(new Uint8Array(await response.arrayBuffer()),{type:"array",cellDates:false});
  const sheet=workbook.Sheets[TEA_SOF_SHEET];
  if(!sheet)throw new Error("TEA school-finance file lacks required inputs_lpe sheet; aborting import.");
  const data=XLSX.utils.sheet_to_json<Record<string,unknown>>(sheet,{defval:null,raw:true});
  const byCdn=new Map<string,{mo:number;debt:number;name:string}>();
  for(const row of data){
    if(Number(row.SCHOOLYEAR)!==year+1)continue;
    const cdn=clean(row.DISTRICT_ID).replace(/\D/g,"").padStart(6,"0");
    const mo=strictSourceRate(row.PY1_MO_RATE_ADOPT);
    const debt=strictSourceRate(row.I_S_RATE);
    if(!/^\d{6}$/.test(cdn)||mo==null||debt==null)continue;
    if(byCdn.has(cdn))throw new Error(`TEA district ID duplicated in ${year} SOF: ${cdn}`);
    byCdn.set(cdn,{mo:roundedRate(mo),debt:roundedRate(debt),name:clean(row.DISTRICT_NAME)});
  }
  const unresolved:string[]=[];
  let correctedCount=0;
  let verifiedCount=0;
  for(const unit of schools){
    const match=/^([0-9]{3})-([0-9]{3})-02(?:-|$)/.exec(clean(unit.official_taxing_unit_ids?.[0]));
    const cdn=match?`${match[1]}${match[2]}`:"";
    const tea=byCdn.get(cdn);
    if(!tea){unresolved.push(`${unit.slug}: no TEA adopted-rate record for official CDN ${cdn}`);continue}
    const total=roundedRate(tea.mo+tea.debt);
    if(tea.mo<0||tea.debt<0||total<=0||total>3){unresolved.push(`${unit.slug}: invalid TEA adopted components`);continue}
    const localOfficial=Object.values(KNOWN_2025_SCHOOL_RATE_CORRECTIONS).some(c=>c.sourceUrl===unit.source_url);
    if(localOfficial&&(Math.abs(Number(unit.maintenance_operations_rate??0)-tea.mo)>0.00015||Math.abs(Number(unit.debt_service_rate??0)-tea.debt)>0.00015)){
      unresolved.push(`${unit.slug}: published local correction disagrees with TEA adoption`);continue;
    }
    const changed=unit.total_rate==null||unit.maintenance_operations_rate==null||unit.debt_service_rate==null
      ||Math.abs(Number(unit.total_rate)-total)>0.00015
      ||Math.abs(Number(unit.maintenance_operations_rate)-tea.mo)>0.00015
      ||Math.abs(Number(unit.debt_service_rate)-tea.debt)>0.00015;
    if(changed){correctedCount++;if(!localOfficial)unit.source_url=teaSourceUrl}
    unit.maintenance_operations_rate=tea.mo;
    unit.debt_service_rate=tea.debt;
    unit.total_rate=total;
    unit.rate_variants=[total];
    unit.variable_rate=false;
    unit.rate_unavailable=false;
    unit.source_status="reported-final";
    verifiedCount++;
  }
  if(schools.length<1000||verifiedCount!==schools.length||unresolved.length){
    throw new Error(`TEA ${year} statewide school reconciliation rejected ${schools.length} schools, ${verifiedCount} verified; ${unresolved.slice(0,15).join("; ")}`);
  }
  return{schoolCount:schools.length,verifiedCount,correctedCount,teaSourceUrl};
}
const MINIMUM_IMPORT_COUNTS:Record<UnitType,number>={"school-district":1000,city:1000,county:254,"special-district":2000};
function validateImportPreflight(rows:any[],year:number,schoolOnly:boolean):string[]{
  if(year<2025)return [];
  const problems:string[]=[];
  for(const type of (schoolOnly?["school-district"] as UnitType[]:Object.keys(MINIMUM_IMPORT_COUNTS) as UnitType[])){
    const units=rows.filter((row)=>row.type===type);
    if(units.length<MINIMUM_IMPORT_COUNTS[type])problems.push(type+": incomplete statewide record count "+units.length);
    if(type==="county"&&units.length!==254)problems.push("county: expected exactly 254 counties, got "+units.length);
    if(type==="school-district"&&year===2025&&units.length!==1013)problems.push("school-district: expected 1013 districts in finalized 2025 file, got "+units.length);
    const slugs=new Set(units.map((unit)=>unit.slug));
    if(slugs.size!==units.length)problems.push(type+": duplicate slugs");
    if(type!=="school-district")continue;
    for(const u of units){
      if(!u.name||!u.slug||!u.county_slugs?.length||!u.official_taxing_unit_ids?.length)problems.push("school-district: missing identifier, name, or county for "+(u.slug??"unknown"));
      if(u.source_status!=="reported-final"||u.rate_unavailable||u.variable_rate||u.total_rate==null||u.maintenance_operations_rate==null||u.debt_service_rate==null)problems.push("school-district: non-final or incomplete adopted rate for "+u.slug);
      else if(Math.abs(u.total_rate-u.maintenance_operations_rate-u.debt_service_rate)>0.00015)problems.push("school-district: M&O/I&S sum differs from total for "+u.slug);
      if(typeof u.source_url!=="string"||!u.source_url.startsWith("https://"))problems.push("school-district: missing official source for "+u.slug);
    }
  }
  return problems;
}
Deno.serve(async(req:Request)=>{const url=new URL(req.url);const year=Number(url.searchParams.get("year")??String(new Date().getUTCFullYear()));const currentYear=new Date().getUTCFullYear();if(!Number.isInteger(year)||year<2021||year>currentYear)return Response.json({error:`year must be between 2021 and ${currentYear}`},{status:400});try{const schoolOnly=url.searchParams.get("scope")==="school-district";if(url.searchParams.has("scope")&&!schoolOnly)return Response.json({error:"unsupported import scope"},{status:400});const raw:RawRecord[]=[];const diagnostics:any[]=[];for(const type of (schoolOnly?["school-district"] as UnitType[]:Object.keys(FILES) as UnitType[])){const sourceUrl=`https://comptroller.texas.gov/taxes/property-tax/docs/${year}-${FILES[type]}`;const response=await fetch(sourceUrl,{headers:{"user-agent":"TexasDefined tax-rate importer/4.1"}});if(!response.ok)throw new Error(`${type}: HTTP ${response.status}`);const records=parseWorkbook(type,sourceUrl,new Uint8Array(await response.arrayBuffer()));raw.push(...records);diagnostics.push({type,rawRows:records.length})}const normalized=normalizeYear(raw,year);const teaReconciliation=await reconcileSchoolRatesWithTea(normalized,year);diagnostics.push({source:"TEA SOF",...teaReconciliation});const unresolvedSchoolConflicts=normalized.filter(r=>r.type==="school-district"&&r.source_status==="cross-source-conflict");if(year===2025&&unresolvedSchoolConflicts.length){return Response.json({ok:false,year,error:"Refusing to replace production data while unresolved 2025 school-rate conflicts remain.",conflicts:unresolvedSchoolConflicts.map(r=>({slug:r.slug,name:r.name,totalRate:r.total_rate,moRate:r.maintenance_operations_rate,debtRate:r.debt_service_rate,sourceUrl:r.source_url}))},{status:422,headers:{"cache-control":"no-store"}})}const preflightIssues=validateImportPreflight(normalized,year,schoolOnly);if(preflightIssues.length){return Response.json({ok:false,year,error:"Refusing to replace production data when the statewide import is incomplete or internally inconsistent.",issues:preflightIssues.slice(0,40),issueCount:preflightIssues.length},{status:422,headers:{"cache-control":"no-store"}})}if(url.searchParams.get("dryRun")==="true"){return Response.json({ok:true,dryRun:true,year,rawCount:raw.length,normalizedCount:normalized.length,schoolCount:normalized.filter(u=>u.type==="school-district").length,teaReconciliation,diagnostics},{headers:{"cache-control":"no-store"}})}const deleteQuery=supabase.from("texas_property_tax_rates").delete().eq("year",year);const{error:de}=await (schoolOnly?deleteQuery.eq("type","school-district"):deleteQuery);if(de)throw de;for(let i=0;i<normalized.length;i+=400){const{error}=await supabase.from("texas_property_tax_rates").upsert(normalized.slice(i,i+400),{onConflict:"id"});if(error)throw error}return Response.json({ok:true,year,rawCount:raw.length,normalizedCount:normalized.length,teaReconciliation,scope:schoolOnly?"school-district":"all",knownSchoolRateCorrectionCount:normalized.filter(r=>Object.values(KNOWN_2025_SCHOOL_RATE_CORRECTIONS).some(c=>c.sourceUrl===r.source_url)).length,notReportedCount:normalized.filter(r=>r.source_status==="not-reported").length,crossSourceConflictCount:normalized.filter(r=>r.source_status==="cross-source-conflict").length,partialCount:normalized.filter(r=>r.source_status==="partial-reporting").length,variableCount:normalized.filter(r=>r.variable_rate).length,multiCountyCount:normalized.filter(r=>r.split_across_cads).length,diagnostics},{headers:{"cache-control":"no-store"}})}catch(error){return Response.json({ok:false,year,error:error instanceof Error?error.message:String(error)},{status:500})}});
