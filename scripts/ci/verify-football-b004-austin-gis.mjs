/**
 * Independent Batch 004 campus-to-municipality check.
 * Uses TEA AskTED 2024-25 geocoded SCHOOL SITE POINTS (not AISD attendance polygons)
 * and City of Austin live FULL PURPOSE jurisdiction polygons.
 * Fail closed: missing/mismatched/ambiguous/outdated-school points never certify links.
 * This is a location check, not an assertion about enrollment or stadium locations.
 */
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const teabase='https://services2.arcgis.com/5MVN2jsqIrNZD4tP/ArcGIS/rest/services/Schools_2024_to_2025/FeatureServer/0/query';
const citybase='https://services.arcgis.com/0L95CJ0VTaxqcmED/arcgis/rest/services/BOUNDARIES_jurisdictions/FeatureServer/0/query';
// Exact 2024-25 AskTED campus labels, selected from the official point layer.
// A broad /travis/ or /navarro/ regex also matches unrelated district campuses
// and would generate a false unresolved duplicate. Fail closed on real renames.
const routeSchoolNames={
 'austin':/^AUSTIN H S$/i,
 'austin-achieve':/^AUSTIN ACHIEVE H S$/i,
 'austin-akins':/^AKINS EARLY COLLEGE H S$/i,
 'austin-anderson':/^ANDERSON H S$/i,
 'austin-bowie':/^BOWIE H S$/i,
 'austin-crockett':/^CROCKETT EARLY COLLEGE H S$/i,
 'austin-eastside':/^EASTSIDE EARLY COLLEGE H S$/i,
 'austin-johnson':/^LBJ EARLY COLLEGE H S$/i,
 'austin-lasa':/^LASA H S$/i,
 'austin-mccallum':/^MCCALLUM H S$/i,
 'austin-navarro':/^NAVARRO EARLY COLLEGE H S$/i,
 'austin-northeast':/^NORTHEAST EARLY COLLEGE H S$/i,
 'austin-travis':/^TRAVIS EARLY COLLEGE H S$/i,
 'austin-vandegrift':/^VANDEGRIFT H S$/i
};
const excluded={
 'austin-lake-travis':/^LAKE TRAVIS H S$/i,
 'austin-westlake':/^WESTLAKE H S$/i
};
const now=new Date().toISOString();
const out='artifacts/football-b004-municipal-gis';await mkdir(out,{recursive:true});
async function query(base, params){
 const url=new URL(base);for(const [k,v] of Object.entries({...params,f:'json'}))url.searchParams.set(k,String(v));
 let last;for(let attempt=0;attempt<2;attempt++){
   try{
     const res=await fetch(url,{headers:{'User-Agent':'TexasDefined-Football-GIS-Audit/1.0'},signal:AbortSignal.timeout(22000)});
     if(!res.ok)throw Error('HTTP '+res.status);
     const data=await res.json();if(data.error)throw Error(JSON.stringify(data.error));
     return {data,url:url.toString()};
   }catch(e){last=e;if(attempt===0)await new Promise(r=>setTimeout(r,900))}
 }throw last;
}
const result={schema:'b004-independent-geo-v1',verifiedAt:now,schoolDatasetVintage:'2024-25 TEA AskTED export (NOT 2026 campus directory)',sources:{school:teabase,jurisdiction:citybase,austinISD:'https://www.austinisd.org/schools'},rows:[],summary:{}};
let records=[],fetchError=null;
try{
 const q=await query(teabase,{
    where:"USER_District_Name = 'AUSTIN ISD'",
    outFields:'USER_School_Name,USER_District_Number,USER_District_Name,USER_School_Site_Street_Address,USER_School_Street_Address,USER_School_City,Score,Match_type',
    returnGeometry:'true',outSR:'4326',resultRecordCount:1000
 });
 result.sources.schoolQuery=q.url;records=q.data.features||[];
 if(q.data.exceededTransferLimit)throw Error('TEA school query truncated; cannot accept');
 if(records.length<12)throw Error('TEA query matched fewer than 12 schools: '+records.length);
 // The GIS scope includes Austin Achieve charter, Lake Travis, Leander/Vandegrift
 // and Eanes/Westlake; do not pretend an Austin ISD-only query covers them.
 const exclusionQ=await query(teabase,{
  where:"USER_School_Name LIKE '%Achieve%' OR USER_School_Name LIKE '%Lake Travis%' OR USER_School_Name LIKE '%Vandegrift%' OR USER_School_Name LIKE '%Westlake%'",
  outFields:'USER_School_Name,USER_District_Number,USER_District_Name,USER_School_Site_Street_Address,USER_School_Street_Address,USER_School_City,Score,Match_type',
  returnGeometry:'true',outSR:'4326',resultRecordCount:200
 });
 result.sources.excludedSchoolQuery=exclusionQ.url;
 if(exclusionQ.data.exceededTransferLimit)throw Error('Exclusion geocode query truncated');
 for(const feature of exclusionQ.data.features||[]){
   if(!records.some(existing=>existing.attributes?.USER_District_Number===feature.attributes?.USER_District_Number
      &&existing.attributes?.USER_School_Name===feature.attributes?.USER_School_Name))records.push(feature);
 }

}catch(e){fetchError=String(e);result.errors=[fetchError]}
for(const [slug,pattern] of Object.entries({...routeSchoolNames,...excluded})){
 const expected=Object.hasOwn(routeSchoolNames,slug);
 const candidates=records.filter(f=>pattern.test(String(f.attributes?.USER_School_Name||'')));
 let selected=null,status='UNRESOLVED',reason='',jurisdictions=[],cityQuery=null;
 if(fetchError)reason='TEA query unavailable: '+fetchError;
 else if(candidates.length!==1)reason='Expected one distinct TEA campus point, found '+candidates.length;
 else {
  selected=candidates[0];const pt=selected.geometry;
  const score=Number(selected.attributes?.Score);
  if(!Number.isFinite(pt?.x)||!Number.isFinite(pt?.y)||pt.x>-93||pt.x< -100||pt.y<29||pt.y>32)
    reason='Invalid or missing TEA campus point';
  else if(!Number.isFinite(score)||score<85)
    reason='Unreliable/unknown official AskTED geocoded site score: '+String(selected.attributes?.Score);
  else{
   try {
    const q=await query(citybase,{
      geometry:JSON.stringify({x:pt.x,y:pt.y,spatialReference:{wkid:4326}}),
      geometryType:'esriGeometryPoint',inSR:4326,spatialRel:'esriSpatialRelIntersects',
      outFields:'CITY_NAME,JURISDICTION_TYPE_SPECIFICS,JURISDICTION_TYPE',
      returnGeometry:'false'
    });
    cityQuery=q.url;jurisdictions=(q.data.features||[]).map(x=>x.attributes);
    const full=jurisdictions.some(x=>/austin/i.test(String(x.CITY_NAME)) &&
      x.JURISDICTION_TYPE_SPECIFICS==='FULL PURPOSE' && String(x.JURISDICTION_TYPE||'').toUpperCase()==='FULL');
    if(expected){status=full?'VERIFIED_FULL_PURPOSE':'NOT_VERIFIED_FOR_CITY_LINK';reason=full?'TEA campus point within official Austin full-purpose polygon':'Campus point did not match Austin FULL PURPOSE; preserve as flag for editorial correction'}
    else {status=full?'EXCLUDED_BUT_IN_FULL_PURPOSE':'EXCLUSION_CONSISTENT';reason=full?'Excluded campus appears inside full-purpose Austin; review editorial city cross-links':'No official Austin full-purpose polygon at excluded campus point'}
   }catch(e){reason='City jurisdiction query failed: '+String(e)}
  }
 }
 result.rows.push({slug,expectedCityLink:expected,status,reason,matchedCount:candidates.length,
  school:selected?{name:selected.attributes.USER_School_Name,siteAddress:selected.attributes.USER_School_Site_Street_Address||selected.attributes.USER_School_Street_Address,city:selected.attributes.USER_School_City,score:selected.attributes.Score,coordinates:selected.geometry}:null,
  jurisdictions,cityQuery});
}
result.summary={expectedCityLinks:Object.keys(routeSchoolNames).length,verified:result.rows.filter(x=>x.expectedCityLink&&x.status==='VERIFIED_FULL_PURPOSE').length,unverified:result.rows.filter(x=>x.expectedCityLink&&x.status!=='VERIFIED_FULL_PURPOSE').map(x=>x.slug),excludedReviewed:Object.keys(excluded).length,excludedUnresolved:result.rows.filter(x=>!x.expectedCityLink&&x.status==='UNRESOLVED').map(x=>x.slug),excludedFullPurpose:result.rows.filter(x=>x.status==='EXCLUDED_BUT_IN_FULL_PURPOSE').map(x=>x.slug)};
result.summary.verdict=result.summary.unverified.length===0&&result.summary.excludedFullPurpose.length===0&&result.summary.excludedUnresolved.length===0?'GIS_VERIFIED_2024_25_POINTS':'EVIDENCE_OR_EDITORIAL_REVIEW_REQUIRED';
await writeFile(out+'/report.json',JSON.stringify(result,null,2)+'\n');
console.log('Batch004 independent GIS',JSON.stringify(result.summary));for(const row of result.rows)console.log(row.slug,row.status,row.school?.name||'',row.reason);
assert.equal(result.summary.verdict,'GIS_VERIFIED_2024_25_POINTS','Campus/municipal evidence missing or contrary; do not certify without review');
