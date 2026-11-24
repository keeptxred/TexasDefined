import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
const base = 'https://texasdefined.com';
const paths = [
  ['/texas-brand-origin-stories', 'https://drpeppermuseum.com/history/', 'https://stories.whataburger.com/our-history/'],
  ['/texas-chili-con-carne-history', 'https://www.tshaonline.org/handbook/entries/gebhardt-mexican-foods-company', 'https://www.tsl.texas.gov/ref/abouttx/symbols'],
  ['/texas-chicken-fried-steak-guide', 'https://www.tshaonline.org/handbook/entries/chicken-fried-steak', 'https://capitol.texas.gov/tlodocs/82R/billtext/pdf/SC00034I.pdf'],
  ['/texas-breakfast-taco-guide', 'https://www.jstor.org/stable/10.7560/316528', 'https://joesbakery.com/menu/'],
];
const rows = [['/made-in-texas', 'https://www.ftc.gov/business-guidance/resources/complying-made-usa-standard']];
if (process.argv.includes('--all') || [1,3,5,7,9,11].includes(new Date().getUTCMonth()+1)) rows.push(...paths);
// Collect every guide-level citation and section source, scoped to this cluster.
const batch3 = await fs.readFile('src/data/texas-evergreen-guides-batch3.ts','utf8');
const batch4 = await fs.readFile('src/data/texas-evergreen-guides-batch4.ts','utf8');
const component = await fs.readFile('src/components/editorial/TexasEvergreenGuide.tsx','utf8');
const urlsFrom = value => [...value.matchAll(/https:\/\/[^"'\s<>]+/g)].map(m => m[0]);
for (const row of rows.slice(1)) {
  const slug = row[0].slice(1);
  const dataStart = slug === 'texas-brand-origin-stories' ? batch3.indexOf('slug: "'+slug+'"') : batch4.indexOf('  "'+slug+'": {');
  const dataSource = slug === 'texas-brand-origin-stories' ? batch3 : batch4;
  assert.ok(dataStart >= 0, 'Missing article source: '+slug);
  const dataEnd = slug === 'texas-brand-origin-stories' ? dataSource.length : dataSource.indexOf('\n  "',dataStart+1);
  row.push(...urlsFrom(dataSource.slice(dataStart,dataEnd<0?undefined:dataEnd)));
  const registry = component.slice(component.indexOf('const guideSources:'));
  const start = registry.indexOf('  "'+slug+'": [');
  if(start>=0){
    const end = registry.indexOf('\n  ],',start);
    if(end>start) row.push(...urlsFrom(registry.slice(start,end)));
  }
}
const data = await fs.readFile('src/data/made-in-texas.ts','utf8');
const production = await fs.readFile('src/data/made-in-texas-evidence.ts','utf8');
const relationships = await fs.readFile('src/data/made-in-texas-relationship-evidence.ts','utf8');
const extra = JSON.parse(relationships.slice(relationships.indexOf('= [')+2,relationships.lastIndexOf(';')));
const entries = new Map([...data.matchAll(/^\s*entry\('((?:\\.|[^'])*)',\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*'([^']*)'/gm)].map(m=>[m[1].replace(/\\'/g,"'"),m[2]]));
const names = new Set();
for (const e of extra) {
  assert.ok(entries.has(e.entryName) && entries.get(e.entryName)!=='made-or-processed', 'Invalid relationship: '+e.entryName);
  assert.ok(!names.has(e.entryName), 'Duplicate: '+e.entryName);
  names.add(e.entryName);
  assert.equal(new URL(e.sourceUrl).protocol,'https:');
  assert.ok(e.claim.length>35 && e.sourceLabel && /^\d{4}-\d{2}-\d{2}$/.test(e.checkedAt));
}
const prodUrls = [...production.matchAll(/sourceUrl:\s*['"](https:[^'"]+)['"]/g)].map(m=>m[1]);
rows[0].push(...prodUrls,...extra.map(e=>e.sourceUrl));
const missing = [...entries].filter(([n,r])=>r!=='made-or-processed'&&!names.has(n)).map(([n])=>n);
console.log('Directory coverage', {total:entries.size,production:prodUrls.length,other:extra.length,missing});
assert.equal(missing.length, 0, 'Every retained non-production relationship must have its own published evidence');
assert.equal(entries.size, prodUrls.length + extra.length, 'Every directory record must have one evidence record');
if (process.argv.includes('--static')) process.exit(0);
const report=[]; const alerts=[];
for (const [route,...sources] of rows) {
  try {
    const res=await fetch(base+route+'?__td_refresh_proof='+randomUUID(),{headers:{'Cache-Control':'no-cache, no-store, max-age=0'},signal:AbortSignal.timeout(20000)});
    const html=await res.text();
    assert.equal(res.status,200);
    assert.ok(html.includes('href="'+base+route+'"') && html.includes('rel="canonical"'));
    assert.ok(!/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html));
    assert.ok(html.includes('<h1'));
    assert.ok(!['HIT','STALE','UPDATING'].includes((res.headers.get('cf-cache-status')||'').toUpperCase()));
    report.push({route,public:'pass'});
  } catch(e){alerts.push(base+route+' — public SEO/HTTP check failed: '+e.message);}
  const unique=[...new Set(sources)];
  for(let i=0;i<unique.length;i+=5) await Promise.all(unique.slice(i,i+5).map(async url=>{
    try {
      const res=await fetch(url,{signal:AbortSignal.timeout(15000),headers:{'User-Agent':'TexasDefinedEditorialReview/1.0'}});
      await res.body?.cancel();
      if(!res.ok) throw Error('HTTP '+res.status);
      report.push({route,url,reachability:'pass',factReview:'not established by HTTP'});
    } catch(e){report.push({route,url,reachability:'needs review',error:e.message});alerts.push(base+route+' — verify source access and factual claims: '+url+' ('+e.message+')');}
  }));
  // A scheduled review is an actionable primary-source editorial review, never a fabricated fact update.
  alerts.push(base+route+' — scheduled editorial source review: '+unique[0]);
}
if(missing.length) alerts.push(base+'/made-in-texas — missing relationship citations: '+missing.join(', '));
await fs.mkdir('.artifacts',{recursive:true});
await fs.writeFile('.artifacts/texas-food-brand-source-review.json',JSON.stringify({checkedAt:new Date().toISOString(),report,missing,alerts,policy:'Reachability is not fact verification; never restamp public dates on a scheduled run.'},null,2));
await fs.writeFile('.artifacts/texas-food-brand-source-review.md',alerts.join('\n')+'\n');
console.log('Review queue written. No public facts or timestamps changed.');
