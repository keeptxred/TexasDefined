/**
 * One-school, source-grounded production browser acceptance after a protected
 * Worker release. The release must contain PR #7538. Do not substitute fixture,
 * PR preview, cached archive or source code for the actual public response.
 *
 * This measures browser usability and automated contrast, not real-user CrUX,
 * manual screen-reader certification, Google rankings or school affiliation.
 */
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('/tmp/texasdefined-aubrey-qa/node_modules/playwright-core');
const axe = require('/tmp/texasdefined-aubrey-qa/node_modules/axe-core');
const path = '/texas-high-school-football-teams/aubrey';
const url = 'https://texasdefined.com' + path;
const sources = ['https://texasdefined.com', 'https://texasdefined-site.freddy-coppola.workers.dev'];
const out = 'artifacts/aubrey-authority-production';
await mkdir(out,{recursive:true});
const evidence = { testedAt:new Date().toISOString(), deployedSha:process.env.ACCEPTANCE_SHA||null,
  note:'Automated source, browser, contrast and overflow check. Real-user Core Web Vitals and human WCAG review are separate.',
  requests:[],browsers:[] };
function humanText(html) {
  return html.replace(/<(script|style|noscript|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,' ')
    .replace(/<[^>]+>/g,' ').replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16)))
    .replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n)))
    .replace(/&ndash;/g,'–').replace(/&rsquo;/g,'’').replace(/&amp;/g,'&')
    .replace(/\s+/g,' ').trim();
}
function assertSsr(html,label) {
  assert.ok(html.length>20000,label+' unexpectedly short');
  const text=humanText(html);
  for(const marker of [
    'Aubrey Chaparrals Football','How Aubrey won District 4 and where its 2026 season ended',
    'Aubrey won all seven District 4-4A Division I games',
    '328–132','8–4 overall','7–0 in district','Canyon 39, Aubrey 36',
    'Bi-district · November 12','Area round · November 19',
    'Canyon led 36–7','Keith Ivy',
  ]) assert.ok(text.includes(marker),label+' missing '+marker);
  for(const attr of ['data-aubrey-authority="2026"','Aubrey Chaparrals 2026 sourced season visual summary','/texas-high-school-football-teams/andrews','/texas-high-school-football-teams/canyon','https://www.aubreyisd.net/o/ahs']) assert.ok(html.includes(attr),label+' missing '+attr);
  assert.ok(!html.includes('https://www.texasfootball.com/team/aubrey-chaparrals'),label+' dead DCTF source remains');
  const title=html.match(/<title>([^<]+)<\/title>/i)?.[1]||'';
  assert.ok(title.includes('Aubrey Chaparrals Football 2026: 8–4'),label+' old title '+title);
  const meta=html.match(/<meta\b[^>]*name=["']description["'][^>]*>/i)?.[0]||'';
  assert.ok(meta.includes('District 4 champions'),label+' old meta description');
  const canonicals=[...html.matchAll(/<link\b[^>]*>/gi)].map(m=>m[0]).filter(t=>/\brel=["']canonical["']/i.test(t));
  assert.equal(canonicals.length,1,label+' canonical count');
  assert.ok(canonicals[0].includes(url),label+' incorrect canonical');
  assert.ok(!/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html),label+' noindex');
  assert.ok(html.includes('dateModified')&&html.includes('2026-11-22'),label+' dateModified absent');
  const opponents=[...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map(m=>humanText(m[1]));
  for(const [opponent,score] of [['Andrews','63–24'],['Canyon','36–39'],['Alvarado','70–40'],['Godley','55–22']]){
    assert.equal(opponents.filter(row=>row.includes(opponent)&&row.includes(score)).length,1,label+' score row '+opponent);
  }
  return { title, bytes:html.length, titleConfirmed:true, rowsMatched:4 };
}
async function fetchPage(origin,bypass) {
  const full = origin + path + (bypass?'?aubrey_release_check='+encodeURIComponent(process.env.GITHUB_RUN_ID||Date.now().toString()):'');
  const response=await fetch(full,{redirect:'follow',signal:AbortSignal.timeout(35000),headers:{accept:'text/html',...(bypass?{'cache-control':'no-store',pragma:'no-cache'}:{})}});
  assert.equal(response.status,200,'HTTP '+response.status+' '+full);
  const html=await response.text();
  const result=assertSsr(html,full);
  evidence.requests.push({url:full,status:response.status,cache:response.headers.get('cf-cache-status'),...result});
  console.log('Aubrey canonical SSR PASS',full,result.bytes);
}
let failed=false;
for(const origin of sources)for(const bypass of [false,true]){
  try {await fetchPage(origin,bypass);}
  catch(e){failed=true;console.error('Aubrey SSR FAIL',String(e));}
}
if(!failed){
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',args:['--no-sandbox','--disable-dev-shm-usage']});
 try{
  for(const viewport of [{name:'mobile',width:390,height:844},{name:'desktop',width:1366,height:768}]){
    const context=await browser.newContext({viewport,deviceScaleFactor:1,isMobile:viewport.name==='mobile',hasTouch:viewport.name==='mobile'});
    const page=await context.newPage();
    const errors=[];
    page.on('pageerror',error=>errors.push(String(error).slice(0,200)));
    try{
      const response=await page.goto(url+'?aubrey_browser='+viewport.name+'-'+(process.env.GITHUB_RUN_ID||Date.now()),{waitUntil:'domcontentloaded',timeout:60000});
      assert.equal(response?.status(),200,viewport.name+' page status');
      await page.locator('[data-aubrey-authority="2026"]').waitFor({state:'visible',timeout:30000});
      await page.locator('[aria-label="Aubrey Chaparrals 2026 sourced season visual summary"]').first().waitFor({state:'visible',timeout:15000});
      await page.locator('#aubrey-2026-retrospective').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      const sizes=await page.evaluate(()=>({viewport:innerWidth,doc:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
      assert.ok(sizes.doc<=sizes.viewport+2 && sizes.body<=sizes.viewport+2,viewport.name+' horizontal page overflow '+JSON.stringify(sizes));
      assert.equal(await page.locator('main h1').count(),1,viewport.name+' expected one main h1');
      assert.ok((await page.locator('[data-aubrey-authority="2026"]').innerText()).includes('328–132'));
      assert.ok(await page.locator('a[href="/texas-high-school-football-teams/andrews"]').count()>0);
      assert.ok(await page.locator('a[href="/texas-high-school-football-teams/canyon"]').count()>0);
      await page.addScriptTag({content:axe.source});
      const contrast=await page.evaluate(async ()=>{
        const scope=document.querySelector('[data-aubrey-authority="2026"]');
        const result=await window.axe.run(scope,{runOnly:{type:'rule',values:['color-contrast']},resultTypes:['violations','incomplete']});
        return {violations:result.violations.flatMap(r=>r.nodes).map(n=>n.target.join(' ')),incomplete:result.incomplete.flatMap(r=>r.nodes).length};
      });
      assert.equal(contrast.violations.length,0,viewport.name+' confirmed contrast violation '+contrast.violations.join('; '));
      assert.deepEqual(errors,[],viewport.name+' runtime errors');
      await page.screenshot({path:out+'/'+viewport.name+'.png',fullPage:true,animations:'disabled'});
      evidence.browsers.push({...viewport,sizes,contrast,errors,status:'PASS'});
      console.log('Aubrey browser PASS',JSON.stringify(evidence.browsers.at(-1)));
    }catch(e){failed=true;console.error('Aubrey '+viewport.name+' browser FAIL',String(e));evidence.browsers.push({...viewport,status:'FAIL',error:String(e)});}
    finally{await page.close();await context.close();}
  }
 }finally{await browser.close();}
}
await writeFile(out+'/report.json',JSON.stringify(evidence,null,2)+'\n');
if(failed)throw new Error('Aubrey 2026 production authority acceptance failed');
console.log('Aubrey public/direct and desktop/mobile acceptance PASS');
