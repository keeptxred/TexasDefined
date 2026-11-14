#!/usr/bin/env node
import assert from 'node:assert/strict';
// Bounded first-party public + Worker District 9 SSR acceptance, not a sports feed.
const path = '/texas-high-school-football-districts/6a-district-9';
const origins = ['https://texasdefined.com','https://texasdefined-site.freddy-coppola.workers.dev'];
const required = [
 'District 9-6A Football','district-9-guide','district-9-authority','district-9-calendar',
 'district-9-game-day','district-9-playoffs','district-9-sources','district-9-faq',
 'Garland ISD','Wylie ISD','Lakeview Centennial','Rowlett','Sachse','North Garland',
 'South Garland','Wylie East','Naaman Forest moved to 5A','automated District 9 scores',
 'varsity fixture snapshot','Williams Stadium','Homer B. Johnson Stadium',
 'https://events.hometownticketing.com/boxoffice/wylieisd',
];
async function validate(origin){
 const url=new URL(path,origin);
 url.searchParams.set('district9_verification',(process.env.GITHUB_SHA||'manual').slice(0,12));
 const res=await fetch(url,{redirect:'follow',cache:'no-store',signal:AbortSignal.timeout(30000),
  headers:{accept:'text/html','cache-control':'no-cache, no-store, max-age=0',pragma:'no-cache',
  'user-agent':'TexasDefined-District9-Production-Verification/1.0'}});
 assert.equal(res.status,200,origin+' HTTP '+res.status);
 assert.notEqual(res.headers.get('cf-mitigated'),'challenge');
 const html=await res.text();
 assert.ok(html.length>6000,origin+' short SSR document');
 for(const marker of required)assert.ok(html.includes(marker),origin+' missing '+marker);
 const title=html.match(/<title>([^<]+)<\/title>/i)?.[1]||'';
 assert.ok(title.includes('District 9-6A Football: UIL Teams, Tickets'),origin+' unexpected SEO title '+title);
 const canonical=[...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi)];
 assert.equal(canonical.length,1,origin+' canonical count');
 assert.ok(canonical[0][0].includes('https://texasdefined.com'+path),origin+' canonical mismatch');
 assert.ok(!/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html));
 assert.ok(!html.includes('data-football-district-records="source-derived"'),origin+' partial records widget');
 assert.ok(!html.includes('data-football-district-records="reported-standings-snapshot"'));
 assert.ok(!html.includes('data-district9-result="final"'));
 for(const marker of ['data-football-district-section="district-9-guide"',
  'data-football-district-section="teams"','data-football-district-section="official-sources"'])
   assert.ok(html.includes(marker),origin+' missing '+marker);
 const sources=html.indexOf('data-football-district-section="official-sources"');
 const ads=html.indexOf('data-football-monetization');
 assert.ok(sources>=0&&(ads<0||ads>sources),origin+' advertisements before official sources');
 console.log(JSON.stringify({pass:true,origin,bytes:html.length,canonical:path,cache:res.headers.get('cf-cache-status')}));
}
const results=await Promise.allSettled(origins.map(validate));
for(const r of results)if(r.status==='rejected')console.error(r.reason);
assert.ok(results.every(r=>r.status==='fulfilled'),'District 9 live SSR verification failed');
