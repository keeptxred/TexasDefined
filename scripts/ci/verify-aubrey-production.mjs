import assert from 'node:assert/strict';
import { retryTransientProduction5xx } from './retry-transient-production-5xx.mjs';

// Fixed acceptance contract for the completed, source-reviewed 2026 season.
// Do not mistake hydrated route data in script tags for visible SSR content.
const games = [
  ['Prosper Richland','49–56'], ['Van Alstyne','36–40'], ['Sanger','21–37'],
  ['River Oaks Castleberry','60–0'], ['Springtown','21–14'], ['Decatur','28–21'],
  ['Carrollton Ranchview','66–14'], ['Lake Dallas','28–21'], ['Alvarado','70–40'],
  ['Godley','55–22'], ['Andrews','63–24'], ['Canyon','36–39'],
];
const pathname='/texas-high-school-football-teams/aubrey';
const canonical='https://texasdefined.com'+pathname;
const faq='How did Aubrey finish its 2026 regular-season schedule?';
const intro='Verified 2026 scores, season results, home tickets and Chaparral Stadium information.';
const caption='individually verified finals are reflected in this dated editorial snapshot';
function visible(html) {
  return html.replace(/<!--[\s\S]*?-->/g,'')
    .replace(/<(script|style|template|noscript)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,' ')
    .replace(/<[^>]*>/g,' ')
    .replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16)))
    .replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n)))
    .replace(/&ndash;/g,'–').replace(/&rsquo;/g,'’').replace(/&apos;/g,"'")
    .replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
}
function verifyContent(html,label) {
  const text=visible(html);
  assert.ok(text.includes(intro),label+' missing corrected introduction');
  assert.ok(text.includes(caption),label+' missing corrected source label');
  assert.ok(!text.includes('snapshot reviewed October 16, not a live scoreboard'),label+' old source label visible');
  assert.ok(!text.includes('What games are on Aubrey’s late-2026 regular-season schedule?'),label+' old FAQ visible');
  const faqStart=text.indexOf(faq);
  assert.ok(faqStart>=0,label+' missing corrected FAQ');
  const answer=text.slice(faqStart,faqStart+350);
  for(const marker of ['Oct 23: Lake Dallas','28–21','Oct 30: Alvarado','70–40','Nov 6: Godley','55–22']) assert.ok(answer.includes(marker),label+' FAQ missing '+marker);
  assert.ok(text.includes('8–4 overall · 7–0 district'),label+' missing correct record');
  const headings=[...html.matchAll(/<h[2-4]\b[^>]*>([\s\S]*?)<\/h[2-4]>/gi)].map(m=>visible(m[1]));
  assert.equal(headings.filter(h=>/who.*aubrey.*head coach/i.test(h)).length,1,label+' head-coach FAQ count');
  const rows=[...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map(m=>visible(m[1]));
  for(const [opponent,score] of games) assert.equal(rows.filter(row=>row.includes(opponent)&&row.includes(score)).length,1,label+' score row '+opponent);
  const canonicals=[...html.matchAll(/<link\b[^>]*>/gi)].map(m=>m[0]).filter(t=>/\brel=["']canonical["']/i.test(t));
  assert.equal(canonicals.length,1,label+' canonical count');
  const href=canonicals[0].match(/\bhref=["']([^"']+)["']/i)?.[1];
  assert.equal(href?.replace(/\/$/,''),canonical,label+' canonical');
}
function selfTest() {
  const html='<link rel="canonical" href="'+canonical+'"><h1>'+intro+'</h1><p>'+caption+'</p><p>8–4 overall · 7–0 district</p><h3>'+faq+'</h3><p>Oct 23: Lake Dallas — W 28–21; Oct 30: Alvarado — W 70–40; Nov 6: Godley — W 55–22.</p><h3>Who is the Aubrey football head coach?</h3><table>'+games.map(([team,score])=>'<tr><td>'+team+'</td><td>'+score+'</td></tr>').join('')+'</table>';
  verifyContent(html,'fixture');
  assert.throws(()=>verifyContent(html.replace(intro,'Old intro')+'<script>'+intro+'</script>','stale'),/introduction/);
  assert.throws(()=>verifyContent(html.replace('Oct 23: Lake Dallas','Remaining games'), 'old FAQ answer'),/FAQ missing/);
  assert.throws(()=>verifyContent(html.replace('<td>36–39</td>','<td>36–37</td>'),'wrong result'),/Canyon/);
  assert.throws(()=>verifyContent(html+'<h3>Who is the Aubrey head coach?</h3>','duplicate'),/FAQ count/);
  console.log('Aubrey visible SSR verifier self-tests passed');
}
async function verify(origin,bypass) {
  const url=new URL(pathname,origin);
  if(bypass) url.searchParams.set('aubrey_live',process.env.GITHUB_RUN_ID||String(Date.now()));
  const response=await retryTransientProduction5xx(()=>fetch(url,{redirect:'follow',signal:AbortSignal.timeout(30000),headers:{accept:'text/html',...(bypass?{'cache-control':'no-cache, no-store, max-age=0',pragma:'no-cache'}:{})}}));
  assert.equal(response.status,200,url.href);
  assert.notEqual(response.headers.get('cf-mitigated'),'challenge',url.href);
  const html=await response.text();
  verifyContent(html,url.href);
  console.log(JSON.stringify({status:'PASS',url:url.href,htmlBytes:html.length,cache:response.headers.get('cf-cache-status'),workerVersion:response.headers.get('x-td-worker-version'),record:'8–4 overall, 7–0 district',finals:games.length,checkedAt:new Date().toISOString()}));
}
selfTest();
if(!process.argv.includes('--self-test')) {
  const outcomes=await Promise.allSettled(['https://texasdefined.com','https://texasdefined-site.freddy-coppola.workers.dev'].flatMap(origin=>[false,true].map(bypass=>verify(origin,bypass))));
  for(const result of outcomes) if(result.status==='rejected') console.error(result.reason);
  if(outcomes.some(r=>r.status==='rejected')) throw new Error('Aubrey dual-origin post-deploy acceptance failed');
}
