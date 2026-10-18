#!/usr/bin/env node
/** Strictly read-only, bounded audit of exact-site Wikimedia Commons image metadata.
 * No auto-publishing, file download or indexability changes. */
import assert from "node:assert/strict";
import { readFileSync, mkdirSync, writeFileSync, appendFileSync } from "node:fs";
import { dirname } from "node:path";

const SOURCE="src/data/texas-water-parks.ts";
const OUTPUT=".artifacts/waterpark-photo-provenance.json";
const API="https://commons.wikimedia.org/w/api.php";
const MAX_PAGES=30;
const candidates = [
  {venue:"paradise-springs-grapevine", filename:"Paradise Springs Aquatic Park (49394283508).jpg"},
  {venue:"hawaiian-waters-garland", filename:"Hawaiian falls garland - panoramio.jpg"},
  {venue:"wet-n-wild-waterworld-anthony", filename:"Wet'nWild Waterworld.jpeg"},
];
function parseRows() {
  const match = readFileSync(SOURCE,"utf8").match(/export const texasWaterParks: WaterParkGuide\[\] = (\[[\s\S]*?\]);\nexport const texasWaterParksBySlug/);
  if (!match) throw new Error("Canonical waterpark data source changed.");
  return JSON.parse(match[1]);
}
const canonical = v=>decodeURIComponent(v).replace(/_/g," ").trim().replace(/^File:/i,"");
const fromFileUrl = v=>{
  const url=new URL(v);
  if(url.protocol!=="https:"||url.hostname!=="commons.wikimedia.org"||!url.pathname.startsWith("/wiki/File:"))throw new Error("Non-Commons source URL: "+v);
  return canonical(url.pathname.slice("/wiki/".length));
};
function normalizeLicense(raw) {
  const s=String(raw??"").replace(/&amp;/g,"&").trim();
  if(!s)return null;
  let u;
  try{u=new URL(s.startsWith("//")?"https:"+s:s)}catch{return null}
  if(u.hostname!=="creativecommons.org")return null;
  return u.pathname.replace(/\/+$/,"").toLowerCase();
}
const plain = raw=>String(raw??"").replace(/<[^>]*>/g," ").replace(/&nbsp;|&#160;/g," ").replace(/&amp;/g,"&").replace(/\s+/g," ").trim();
function assess(venue,page) {
  if(!page||page.missing===true||!page.imageinfo?.length) return {status:"MISSING_FILE_OR_METADATA"};
  const im=page.imageinfo[0],e=im.extmetadata??{};
  const sourceLicense=normalizeLicense(e.LicenseUrl?.value);
  const sourceArtist=plain(e.Artist?.value);
  const sourceDescription=plain(e.ImageDescription?.value);
  const actualFilename=canonical(page.title);
  if(venue.expectedFilename!==actualFilename) return {status:"FILENAME_MISMATCH",actualFilename};
  if(!im.width||im.width<800||!im.height||im.height<450) return {status:"LOW_RESOLUTION",width:im.width,height:im.height};
  const datum={actualFilename,width:im.width,height:im.height,sourceLicense,sourceLicenseLabel:plain(e.LicenseShortName?.value),sourceArtist:sourceArtist.slice(0,250),description:sourceDescription.slice(0,800),date:plain(e.DateTimeOriginal?.value??e.DateTime?.value??"").slice(0,90)};
  if(!sourceLicense) return {status:"SOURCE_LICENSE_UNVERIFIED",...datum};
  if(!/^(\/licenses\/(?:by|by-sa)\/\d+(?:\.\d+)?|\/publicdomain\/(?:zero|mark)\/1\.0)$/.test(sourceLicense)) return {status:"LICENSE_NOT_CLEAR_FOR_COMMERCIAL_REUSE",...datum};
  if(venue.license && venue.license!==sourceLicense) return {status:"LICENSE_DISAGREES_WITH_COMMONS",expected:venue.license,...datum};
  return {status:venue.candidate?"CANDIDATE_METADATA_ONLY_REQUIRES_VENUE_CHECK":"SOURCE_METADATA_MATCHES_CHECK_EDITORIAL_CONTEXT",...datum};
}
function selfTest() {
  const file={title:"File:Exactly Named Park.jpg",imageinfo:[{width:1280,height:960,extmetadata:{LicenseUrl:{value:"https://creativecommons.org/licenses/by-sa/4.0/"},Artist:{value:"Alex Smith"},ImageDescription:{value:"Town water park"}}}]};
  const v={expectedFilename:"Exactly Named Park.jpg",license:"/licenses/by-sa/4.0"};
  assert.equal(assess(v,file).status,"SOURCE_METADATA_MATCHES_CHECK_EDITORIAL_CONTEXT");
  assert.equal(assess({...v,license:"/licenses/by/2.0"},file).status,"LICENSE_DISAGREES_WITH_COMMONS");
  assert.equal(assess(v,{...file,missing:true}).status,"MISSING_FILE_OR_METADATA");
  assert.equal(assess(v,{...file,title:"File:Unrelated.jpg"}).status,"FILENAME_MISMATCH");
  assert.equal(assess(v,{...file,imageinfo:[{...file.imageinfo[0],extmetadata:{LicenseUrl:{value:"https://creativecommons.org/licenses/by-nc/4.0/"}}}]}).status,"LICENSE_NOT_CLEAR_FOR_COMMERCIAL_REUSE");
  assert.equal(assess({...v,candidate:true},file).status,"CANDIDATE_METADATA_ONLY_REQUIRES_VENUE_CHECK");
  assert.equal(fromFileUrl("https://commons.wikimedia.org/wiki/File:Great_Wolf_Lodge.jpg"),"Great Wolf Lodge.jpg");
  console.log("Wikimedia waterpark provenance fail-closed self-tests passed.");
}
async function main() {
  if(process.argv.includes("--self-test")){selfTest();return}
  const rows=parseRows();
  const enrolled=rows.filter(p=>p.licensedMedia).map(p=>({
    venue:p.slug,expectedFilename:fromFileUrl(p.licensedMedia.sourceUrl),
    license:normalizeLicense(p.licensedMedia.licenseUrl),claimedArtist:p.licensedMedia.photographer,claimedYear:p.licensedMedia.year,
    candidate:false,
  }));
  const toQuery=[...enrolled,...candidates.map(c=>({venue:c.venue,expectedFilename:c.filename,candidate:true}))];
  if(toQuery.length<1||toQuery.length>MAX_PAGES)throw new Error("Bounded metadata audit permits 1–30 titles.");
  const u=new URL(API);
  u.searchParams.set("action","query");
  u.searchParams.set("format","json");
  u.searchParams.set("formatversion","2");
  u.searchParams.set("prop","imageinfo");
  u.searchParams.set("iiprop","extmetadata|size");
  u.searchParams.set("titles",toQuery.map(x=>"File:"+x.expectedFilename).join("|"));
  const result={generatedAt:new Date().toISOString(),mode:"READ_ONLY_EDITORIAL_AUDIT",entries:[]};
  try {
    const response=await fetch(u,{headers:{"User-Agent":"TexasDefined-WaterparkImageProvenance/1.0 (https://texasdefined.com)"},signal:AbortSignal.timeout(20000)});
    if(!response.ok)throw new Error("MediaWiki HTTP "+response.status);
    const body=await response.json();
    if(body.error)throw new Error("MediaWiki API error: "+String(body.error.code));
    if(!Array.isArray(body.query?.pages))throw new Error("Malformed MediaWiki pages response");
    const pageMap=new Map(body.query.pages.map(x=>[canonical(x.title),x]));
    result.entries=toQuery.map(e=>({...e,assessment:assess(e,pageMap.get(e.expectedFilename))}));
  }catch(err){
    result.providerError=String(err?.message??err).slice(0,350);
    console.error("Commons provenance provider failure:",result.providerError);
  }
  mkdirSync(dirname(OUTPUT),{recursive:true});
  writeFileSync(OUTPUT,JSON.stringify(result,null,2)+"\n");
  for(const e of result.entries)console.log([e.venue,e.candidate?"CANDIDATE":"LIVE","status="+e.assessment.status,
    "license="+(e.assessment.sourceLicense??"UNKNOWN"),
    "artist="+(e.assessment.sourceArtist??"UNKNOWN"),
    "description="+String(e.assessment.description??"").slice(0,115)
  ].join(" | "));
  const problems=result.entries.filter(e=>!e.candidate&&!e.assessment.status.startsWith("SOURCE_METADATA_MATCHES_"));
  const note="Commons provenance audit: "+enrolled.length+" published photo records, "+candidates.length+" review-only new candidates, "+problems.length+" current-source discrepancies, "+(result.providerError?"provider error":"provider request completed")+".";
  console.log(note);
  if(process.env.GITHUB_STEP_SUMMARY)appendFileSync(process.env.GITHUB_STEP_SUMMARY,note+"\n\n**This is source metadata only. Exact location, creator, original date, actual image delivery, and usable editorial context still require independent review. No image is promoted by this job.**\n");
  // Do not mask outages; do not automatically rewrite or unpublish on a one-off remote failure.
  if(result.providerError)process.exitCode=1;
  if(process.argv.includes("--strict")&&problems.length)process.exitCode=1;
}
await main();
