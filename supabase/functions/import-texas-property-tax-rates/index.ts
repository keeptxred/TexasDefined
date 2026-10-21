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
function numberValue(v:unknown):number|null{if(v==null)return null;const raw=String(v).trim();if(!raw)return null;const cleaned=raw.replace(/[$,%]/g,"");if(!cleaned.trim())return null;const n=typeof v==="number"?v:Number(cleaned);return Number.isFinite(n)?n:null}
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
function normalizeYear(raw:RawRecord[],year:number){const groups=new Map<string,RawRecord[]>();for(const r of raw){const k=`${r.type}:${r.officialBase}`;const g=groups.get(k)??[];g.push(r);groups.set(k,g)}const units:any[]=[];for(const group of groups.values()){const usable=group.filter(r=>!r.unavailable);const rateUnavailable=usable.length===0;const totals=uniqueNumbers(usable.map(r=>r.totalRate));const mos=uniqueNumbers(usable.map(r=>r.moRate));const debts=uniqueNumbers(usable.map(r=>r.debtRate));const names=uniqueStrings(group.map(r=>r.name));const name=names.sort((a,b)=>a.length-b.length||a.localeCompare(b))[0];const levies=usable.map(r=>r.levy).filter((v):v is number=>v!=null);units.push({year,type:group[0].type,name,baseSlug:slugify(name),officialBase:group[0].officialBase,county_slugs:uniqueStrings(group.map(r=>r.countySlug)),total_rate:rateUnavailable?null:(totals.length===1?totals[0]:null),maintenance_operations_rate:rateUnavailable?null:(mos.length===1?mos[0]:null),debt_service_rate:rateUnavailable?null:(debts.length===1?debts[0]:null),levy:rateUnavailable?null:(levies.length?levies.reduce((a,b)=>a+b,0):null),source_url:group[0].sourceUrl,source_status:rateUnavailable?"not-reported":(usable.length<group.length?"partial-reporting":"reported-final"),variable_rate:!rateUnavailable&&totals.length>1,rate_variants:rateUnavailable?[]:totals,official_taxing_unit_ids:uniqueStrings(group.map(r=>r.officialId)),split_across_cads:uniqueStrings(group.map(r=>r.countySlug)).length>1,rate_unavailable:rateUnavailable,imported_at:new Date().toISOString()})}const collisions=new Map<string,any[]>();for(const u of units){const k=`${u.type}:${u.baseSlug}`;const g=collisions.get(k)??[];g.push(u);collisions.set(k,g)}for(const u of units){if(u.total_rate!=null&&u.total_rate>0&&u.maintenance_operations_rate!=null&&u.debt_service_rate!=null&&Math.abs(u.total_rate-u.maintenance_operations_rate-u.debt_service_rate)>0.000001){/* Preserve the adopted total, but never publish components that do not reconcile. */u.maintenance_operations_rate=null;u.debt_service_rate=null}const coll=collisions.get(`${u.type}:${u.baseSlug}`)??[];u.slug=coll.length>1?`${u.baseSlug}-${slugify(u.officialBase)}`:u.baseSlug;u.id=`${year}:${u.type}:${u.slug}`;applyKnown2025SchoolRateCorrection(u);if(year===2025&&u.type==="school-district"&&!u.rate_unavailable&&u.maintenance_operations_rate!=null&&u.maintenance_operations_rate<TEA_2025_MINIMUM_MCR){u.source_status="cross-source-conflict";u.rate_unavailable=true}delete u.baseSlug;delete u.officialBase}return units}
// Never touch published rates until all official workbooks are downloaded,
// independently hashed, normalized, validated, and completely staged.
const sha256 = async (bytes: Uint8Array) => [...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes))].map(b=>b.toString(16).padStart(2,"0")).join("");
const json = (body:unknown,status=200)=>Response.json(body,{status,headers:{"cache-control":"no-store"}});
function validateYear(records:any[],raw:RawRecord[],year:number,diagnostics:any[]){
  if(diagnostics.length!==4||diagnostics.some(d=>!d.rawRows||!d.sha256))throw new Error("All four original source files are required");
  const minimums:Record<UnitType,number>={"county":200,"city":500,"school-district":500,"special-district":500};
  for(const type of Object.keys(minimums) as UnitType[]){
    if(raw.filter(r=>r.type===type).length<minimums[type])throw new Error(type+": incomplete official workbook");
    if(records.filter(r=>r.type===type).length<Math.floor(minimums[type]*0.8))throw new Error(type+": unexpectedly few jurisdictions");
  }
  const ids=new Set<string>();
  const natural=new Set<string>();
  for(const record of records){
    if(record.year!==year||!record.id||!record.slug||!record.name||!record.source_url.startsWith("https://"))throw new Error("Malformed tax-year identity or source");
    if(ids.has(record.id))throw new Error("Duplicate normalized record "+record.id);
    ids.add(record.id);
    const key=record.year+":"+record.type+":"+record.slug;
    if(natural.has(key))throw new Error("Duplicate taxing unit "+key);
    natural.add(key);
    if(record.total_rate!=null&&(!Number.isFinite(record.total_rate)||record.total_rate<0||record.total_rate>10))throw new Error("Invalid total rate "+record.id);
    if(record.maintenance_operations_rate!=null&&record.debt_service_rate!=null&&record.total_rate!=null&&Math.abs(record.total_rate-record.maintenance_operations_rate-record.debt_service_rate)>0.000001)throw new Error("Components do not reconcile for "+record.id);
    if(record.source_status==="not-reported"&&record.total_rate!==null)throw new Error("Unreported record contains rate "+record.id);
    if(!Array.isArray(record.official_taxing_unit_ids)||!record.official_taxing_unit_ids.length)throw new Error("Missing official identity "+record.id);
  }
  if(records.length<3000)throw new Error("Refusing incomplete statewide dataset");
}
Deno.serve(async(req:Request)=>{
  const url=new URL(req.url);
  const year=Number(url.searchParams.get("year")??String(new Date().getUTCFullYear()));
  const currentYear=new Date().getUTCFullYear();
  if(!Number.isInteger(year)||year<2021||year>currentYear)return json({ok:false,error:"Unsupported tax year"},400);
  const diagnostics:Array<{type:UnitType;rawRows:number;sha256:string;sourceUrl:string}>=[];
  const raw:RawRecord[]=[];
  try{
    for(const type of Object.keys(FILES) as UnitType[]){
      const sourceUrl=`https://comptroller.texas.gov/taxes/property-tax/docs/${year}-${FILES[type]}`;
      const response=await fetch(sourceUrl,{headers:{"user-agent":"TexasDefined tax-rate importer/5.0"}});
      if(response.status===404)return json({ok:true,status:"unavailable",year,reason:"Official workbook not yet published or missing",workbook:type,sourceUrl});
      if(!response.ok)throw new Error(type+": source download returned HTTP "+response.status);
      const bytes=new Uint8Array(await response.arrayBuffer());
      if(bytes.byteLength<5000)throw new Error(type+": truncated official workbook");
      const digest=await sha256(bytes);
      const records=parseWorkbook(type,sourceUrl,bytes);
      if(!records.length)throw new Error(type+": empty or unparseable workbook");
      raw.push(...records);
      diagnostics.push({type,rawRows:records.length,sha256:digest,sourceUrl});
    }
    const normalized=normalizeYear(raw,year);
    validateYear(normalized,raw,year,diagnostics);
    const unresolved=normalized.filter(r=>r.type==="school-district"&&r.source_status==="cross-source-conflict");
    if(year===2025&&unresolved.length)return json({ok:false,status:"validation-failed",year,error:"Unresolved school-source conflicts",conflicts:unresolved.map(r=>({id:r.id,name:r.name}))},422);
    const signature=await sha256(new TextEncoder().encode("normalization-rules-v5|"+year+"|"+diagnostics.map(d=>d.type+":"+d.sha256).sort().join("|")));
    const {data:prior,error:priorError}=await supabase.from("texas_tax_import_runs")
      .select("id,source_signature,expected_count").eq("tax_year",year).eq("status","completed")
      .order("finished_at",{ascending:false}).limit(1);
    if(priorError)throw priorError;
    if(prior?.[0]?.source_signature===signature){
      const {count,error}=await supabase.from("texas_property_tax_rates").select("id",{head:true,count:"exact"}).eq("year",year);
      if(error)throw error;
      if(count===normalized.length)return json({ok:true,status:"unchanged",year,count,sourceSignature:signature,diagnostics});
    }
    // Keep failed staging from accumulating indefinitely without touching completed audit history.
    const expiredBefore=new Date(Date.now()-14*24*60*60*1000).toISOString();
    const {error:cleanupError}=await supabase.from("texas_tax_import_runs")
      .delete().eq("status","staging").lt("started_at",expiredBefore);
    if(cleanupError)console.warn("Could not prune expired tax import staging:",cleanupError.code);
    const runId=crypto.randomUUID();
    const now=new Date().toISOString();
    const {error:runError}=await supabase.from("texas_tax_import_runs").insert({
      id:runId,tax_year:year,source_signature:signature,
      sources:diagnostics,expected_count:normalized.length,expected_raw_count:raw.length
    });
    if(runError)throw runError;
    for(let i=0;i<normalized.length;i+=300){
      const stage=normalized.slice(i,i+300).map(record=>({run_id:runId,record_id:record.id,record:{...record,imported_at:now}}));
      const {error}=await supabase.from("texas_tax_import_stage").insert(stage);
      if(error)throw error;
    }
    for(let i=0;i<raw.length;i+=300){
      const stage=raw.slice(i,i+300).map((record,index)=>({run_id:runId,unit_type:record.type,
        ordinal:i+index,record}));
      const {error}=await supabase.from("texas_tax_import_raw_stage").insert(stage);
      if(error)throw error;
    }
    const {data:result,error:finalizeError}=await supabase.rpc("finalize_texas_tax_import",{p_run_id:runId});
    if(finalizeError)throw finalizeError;
    return json({ok:true,...result,sourceSignature:signature,diagnostics,
      knownSchoolRateCorrectionCount:normalized.filter(r=>Object.values(KNOWN_2025_SCHOOL_RATE_CORRECTIONS).some(c=>c.sourceUrl===r.source_url)).length,
      notReportedCount:normalized.filter(r=>r.source_status==="not-reported").length});
  }catch(e){
    const message=e instanceof Error?e.message:String(e);
    console.error("Texas tax import failed for year",year,message);
    return json({ok:false,status:"error",year,error:message.slice(0,400),diagnostics},500);
  }
});
