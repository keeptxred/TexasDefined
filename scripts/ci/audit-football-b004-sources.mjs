/**
 * Batch 004 source-ledger freshness, citation reachability and image-rights inventory.
 * Never claim that HTTP 200 establishes factual accuracy, or that license text
 * establishes photographer permission. Current authoring data must be cited.
 */
import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
const schools=['arp','aspermont','athens','atlanta','aubrey','austin','austin-achieve','austin-akins','austin-anderson','austin-bowie','austin-crockett','austin-eastside','austin-johnson','austin-lake-travis','austin-lasa','austin-mccallum','austin-navarro','austin-northeast','austin-travis','austin-vandegrift','austin-westlake','avalon','axtell','azle','baird'];
const source=(await readFile('src/data/high-school-football/program-editorial.ts','utf8'));
const matches=[...source.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map(m=>({slug:m[1],at:m.index}));
const lines=schools.map(slug=>{
 const found=matches.find(x=>x.slug===slug),next=matches.find(x=>x.at>(found?.at??Infinity));
 const content=found?source.slice(found.at,next?.at||source.length):'';
 const sources=[...content.matchAll(/"sourceUrl":\s*"(https?:[^"]+)"/g)].map(m=>m[1]);
 const verifiedAt=[...content.matchAll(/"verifiedAt":\s*"([^"]+)"/g)].map(m=>m[1]);
 const photo=/^\s+"photo":\s*\{/m.test(content);
 return {slug,found:!!found,verifiedAt,latestVerified:verifiedAt.slice().sort().at(-1)||null,
     sourceUrls:[...new Set(sources)],editorialPhotoPresent:photo};
});
const urls=[...new Set(lines.flatMap(x=>x.sourceUrls))],results=[];
let cursor=0;
async function test(url){
 const r={url,code:null,finalUrl:null,outcome:'UNVERIFIED',error:null};
 try{
  const res=await fetch(url,{method:'GET',redirect:'follow',headers:{'User-Agent':'Mozilla/5.0 (compatible; TexasDefinedReferenceCheck/1.0)'},signal:AbortSignal.timeout(14000)});
  r.code=res.status;r.finalUrl=res.url;
  // Close response body early: we are checking reachability, not copying publishers' pages.
  await res.body?.cancel().catch(()=>{});
  if(res.status===404||res.status===410)r.outcome='PERMANENT_MISSING';
  else if(res.ok)r.outcome='FETCHABLE_NOT_FACT_VERIFIED';
  else if([403,429].includes(res.status))r.outcome='BLOCKED_BY_SOURCE_REVIEW_REQUIRED';
  else r.outcome='HTTP_REVIEW_REQUIRED';
 }catch(e){r.error=String(e).slice(0,250);r.outcome='NETWORK_REVIEW_REQUIRED'}
 results.push(r);
}
const workers=Array.from({length:Math.min(8,urls.length)},async()=>{while(cursor<urls.length){const i=cursor++;await test(urls[i])}});
await Promise.all(workers);
const byUrl=new Map(results.map(x=>[x.url,x]));
const rows=lines.map(x=>({...x,sourceHealth:x.sourceUrls.map(url=>byUrl.get(url))}));
const summary={schoolCount:rows.length,missingEditorialRecords:rows.filter(x=>!x.found).map(x=>x.slug),
 missingVerifiedDates:rows.filter(x=>!x.verifiedAt.length).map(x=>x.slug),
 oldestVerifiedDate:rows.flatMap(x=>x.verifiedAt).sort()[0]||null,
 newestVerifiedDate:rows.flatMap(x=>x.verifiedAt).sort().at(-1)||null,
 editorialPhotos:rows.filter(x=>x.editorialPhotoPresent).map(x=>x.slug),
 uniqueSourceURLs:urls.length,fetchable:results.filter(x=>x.outcome==='FETCHABLE_NOT_FACT_VERIFIED').length,
 broken:results.filter(x=>x.outcome==='PERMANENT_MISSING').map(x=>x.url),
 reviewRequired:results.filter(x=>x.outcome!=='FETCHABLE_NOT_FACT_VERIFIED'&&x.outcome!=='PERMANENT_MISSING').map(x=>({url:x.url,code:x.code,error:x.error}))};
const report={schema:'b004-source-review-v1',auditedAt:new Date().toISOString(),summary,rows,
 caveat:'URLs returning 200 do not certify current coaching, score, ADA or ticket facts; HTTP 403/429 is not a claim that links are wrong. Authoring timestamps are not independently verified as published source update times. No photo record is not a license certification for all site images.'};
await mkdir('artifacts/football-b004-source-evidence',{recursive:true});
await writeFile('artifacts/football-b004-source-evidence/report.json',JSON.stringify(report,null,2)+'\n');
console.log('Batch004 source inventory',JSON.stringify({...summary,reviewRequiredCount:summary.reviewRequired.length,reviewRequired:'see artifact'}));
assert.equal(summary.schoolCount,25);
assert.equal(summary.missingEditorialRecords.length,0,'Missing school editorial');
assert.equal(summary.missingVerifiedDates.length,0,'Missing source verification dates');
assert.equal(summary.editorialPhotos.length,0,'Unreviewed photo records found');
assert.equal(summary.broken.length,0,'Known permanent 404/410 sources must be corrected');
