#!/usr/bin/env node
/**
 * Bounded, read-only live acceptance for the Canyon Lake Hawks 2026 authority page.
 * This verifies what the public Worker actually serves; it does NOT certify an
 * unrelated production release, waive any deploy gate, or scrape sports results.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const PAGE='/texas-high-school-football-teams/comal-canyon-lake';
const sourceFile=readFileSync('src/data/high-school-football/program-editorial-comal-canyon-lake.ts','utf8');
const sourceMatch=sourceFile.match(/const CANYON_LAKE: FootballProgramEditorial = ([\s\S]*?);\s*export function getCanyonLakeFootballEditorial/);
assert.ok(sourceMatch,'Canyon Lake source contract is unavailable');
const currentEditorial=JSON.parse(sourceMatch[1]);
const EXPECTED_SCORE_SOURCE=currentEditorial.season.sourceLabel;
const EXPECTED_RECORD=currentEditorial.season.record;
const EXPECTED_RECORD_SUMMARY=EXPECTED_RECORD.match(/\d+–\d+ overall · \d+–\d+ district/);
assert.ok(EXPECTED_RECORD_SUMMARY,'Expected sourced W–L totals');
const currentScorePairs=currentEditorial.season.games.filter(g=>g.result)
  .map(g=>g.result.slice(2).split('–').map(Number));
const EXPECTED_FOR=String(currentScorePairs.reduce((sum,row)=>sum+row[0],0));
const EXPECTED_AGAINST=String(currentScorePairs.reduce((sum,row)=>sum+row[1],0));
const LATEST_RESULT=currentEditorial.season.games.filter(g=>g.result).at(-1);
assert.ok(LATEST_RESULT,'Canyon Lake must preserve verified score history');
const ARTIFACT='artifacts/comal-canyon-lake-live';
const ORIGINS=[
  'https://texasdefined-site.freddy-coppola.workers.dev',
  'https://texasdefined.com',
];
const EXPECTED_CANONICAL='https://texasdefined.com'+PAGE;
const HERO='/images/high-school-football/comal-canyon-lake-2026.svg';
const VERSION=/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i;
const REQUIRED=[
  'Canyon Lake High School', 'Hawks', EXPECTED_RECORD_SUMMARY[0],
  '49–28', 'Pleasanton', 'Port Lavaca Calhoun',
  'November 20', 'Sam Parker', 'Green and Gold',
  'Hawk Stadium', 'Leopard Stadium', 'Jace Wheeler',
  'Isaac Torres', EXPECTED_FOR, EXPECTED_AGAINST, LATEST_RESULT.result,
];
const FORBIDDEN=[
  'Not listed by the verified source',
  'TexasDefined does not publish an unverified team-specific schedule',
  'The available first-party page validates athletic-coordinator identity',
];
function decodeHtml(value){
  return value.replace(/&(?:amp|nbsp|ndash|mdash|rsquo|lsquo|quot|lt|gt|#(?:x[0-9a-f]+|[0-9]+));/gi,entity=>{
    const m=entity.match(/^&#(x[0-9a-f]+|[0-9]+);$/i);
    if(m)return String.fromCodePoint(m[1][0].toLowerCase()==='x'
      ?parseInt(m[1].slice(1),16):parseInt(m[1],10));
    return ({'&amp;':'&','&nbsp;':' ','&ndash;':'–','&mdash;':'—',
      '&rsquo;':'’','&lsquo;':'‘','&quot;':'"','&lt;':'<','&gt;':'>'})[entity.toLowerCase()]||entity;
  });
}
function plain(html){
  return decodeHtml(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ')
    .replace(/<[^>]+>/g,' ').replace(/\s+/g,' '));
}
function checkHtml(html,location){
  const text=plain(html);
  const missing=REQUIRED.filter(s=>!text.includes(s));
  assert.deepEqual(missing,[],location+' missing visible sourced football facts');
  // Reject stale CDN markup: basic W–L figures can remain unchanged after an
  // editorial source refresh, so compare rendered source attribution to main.
  assert.ok(text.includes(EXPECTED_SCORE_SOURCE),
    location+' is serving an older score source label than the merged editorial release');
  assert.ok(text.includes(EXPECTED_RECORD),
    location+' does not match the merged score record');
  assert.deepEqual(FORBIDDEN.filter(s=>text.includes(s)),[],location+' serves retired boilerplate');
  assert.ok(html.includes(HERO),location+' missing original rights-safe artwork');
  assert.ok(html.includes(EXPECTED_CANONICAL),location+' missing canonical URL');
  assert.ok(/<script[^>]+application\/ld\+json/i.test(html),
    location+' missing structured data');
  assert.ok(!/<meta\b[^>]*name=["'](?:robots|googlebot)["'][^>]*content=["'][^"']*noindex/i.test(html),
    location+' contains noindex meta');
  const football=text.indexOf('2026 results & schedule');
  const sponsors=text.indexOf('Independent page sponsors and TexasDefined shop');
  assert.ok(football>=0,location+' missing the real 2026 results table');
  assert.ok(sponsors<0 || sponsors>football,location+' promotes sponsorship ahead of football');
  assert.ok(html.includes('https://www.lgisd.net/o/lhs/article/3260936'),
    location+' missing first-party playoff-host notice');
  return {required:REQUIRED.length,sourceFreshness:true,recordMatched:true,
    footballBeforeCommercial:sponsors<0||sponsors>football};
}
async function request(url,{normalCache=false}={}){
  const headers={
    'User-Agent':normalCache
      ? 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
      : 'TexasDefined-CanyonLake-Authority-Acceptance/1.0',
  };
  if(!normalCache)headers['Cache-Control']='no-cache, no-store, max-age=0';
  return fetch(url,{redirect:'manual',headers,signal:AbortSignal.timeout(25000)});
}
async function auditOrigin(origin){
  const sep=PAGE.includes('?')?'&':'?';
  const url=origin+PAGE+sep+'authority_probe='+Date.now();
  const response=await request(url);
  assert.equal(response.status,200,origin+' authority page HTTP status');
  assert.ok((response.headers.get('content-type')||'').includes('text/html'),
    origin+' authority page MIME');
  assert.notEqual(response.headers.get('cf-mitigated'),'challenge',origin+' challenge');
  const worker=response.headers.get('x-texasdefined-worker-version')||'';
  assert.match(worker,VERSION,origin+' published Worker UUID');
  const html=await response.text();
  const checks=checkHtml(html,origin+' (cache-busted)');
  // A normal reader/search engine uses the canonical path without a query string.
  // A passing cache-busted route does not prove that an older CDN edge document
  // has been evicted. Check both forms on both origins after production deploy.
  const bare=await request(origin+PAGE,{normalCache:true});
  assert.equal(bare.status,200,origin+' plain canonical URL HTTP status');
  assert.ok((bare.headers.get('content-type')||'').includes('text/html'),
    origin+' plain canonical URL MIME');
  assert.notEqual(bare.headers.get('cf-mitigated'),'challenge',
    origin+' plain canonical URL challenged');
  const bareHtml=await bare.text();
  checkHtml(bareHtml,origin+' (unbusted reader URL)');
  const bareWorker=bare.headers.get('x-texasdefined-worker-version')||'';
  assert.equal(bareWorker,worker,origin+' plain URL is serving a stale Worker revision');
  const graphic=await request(origin+HERO);
  assert.equal(graphic.status,200,origin+' original football artwork HTTP status');
  const svg=await graphic.text();
  assert.ok(svg.includes('<svg ')&&svg.includes('Original Hill Country football field illustration'),
    origin+' original SVG is missing or wrong');
  return {origin,worker,htmlBytes:html.length,
    unbustedHtmlBytes:bareHtml.length,unbustedCacheStatus:bare.headers.get('cf-cache-status'),
    unbustedAge:bare.headers.get('age'),unbustedFresh:true,
    graphicBytes:svg.length,...checks};
}
async function auditChrome(){
  const moduleRoot=process.env.PLAYWRIGHT_MODULE_ROOT||'/tmp/td-canyon-lake-chrome/node_modules';
  const require=createRequire(resolve(moduleRoot,'../package.json'));
  const {chromium}=require('playwright-core');
  const executablePath=process.env.CHROME_BIN;
  assert.ok(executablePath,'CHROME_BIN must identify an installed Chrome/Chromium');
  const browser=await chromium.launch({executablePath,headless:true,args:['--no-sandbox']});
  const results=[];
  try{
    for (const width of [1366,390,320]){
      const page=await browser.newPage({viewport:{width,height:850},deviceScaleFactor:1});
      const response=await page.goto(EXPECTED_CANONICAL+'?authority_chrome='+Date.now()+'-'+width,
        {waitUntil:'domcontentloaded',timeout:35000});
      assert.equal(response?.status(),200,width+'px Chrome page status');
      await page.locator('h1').first().waitFor({timeout:10000});
      const h1=(await page.locator('h1').first().innerText()).trim();
      assert.ok(h1.includes('Hawks Football'),width+'px missing true team H1');
      const body=await page.locator('body').innerText();
      for(const term of [EXPECTED_RECORD_SUMMARY[0],LATEST_RESULT.result,'Pleasanton','Port Lavaca Calhoun','Sam Parker'])
        assert.ok(body.includes(term),width+'px browser missing '+term);
      const metrics=await page.evaluate(()=>{
        const badImages=[...document.images].filter(img=>img.complete&&img.naturalWidth===0)
          .map(img=>img.getAttribute('src'));
        return {
          viewport:window.innerWidth,
          scrollWidth:document.documentElement.scrollWidth,
          badImages,
          canonical:document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        };
      });
      assert.ok(metrics.scrollWidth<=metrics.viewport+8,
        width+'px document horizontal overflow '+metrics.scrollWidth);
      assert.deepEqual(metrics.badImages,[],width+'px broken visible images');
      assert.equal(metrics.canonical,EXPECTED_CANONICAL,width+'px canonical changed');
      const image=page.locator('img[src="'+HERO+'"]');
      assert.ok(await image.count(),width+'px original green/gold hero is missing');
      await page.screenshot({path:ARTIFACT+'/canyon-lake-'+width+'.png',fullPage:true});
      results.push({width,h1,...metrics});
      await page.close();
    }
  }finally{await browser.close();}
  return results;
}
await mkdir(ARTIFACT,{recursive:true});
const report={checkedAt:new Date().toISOString(),target:EXPECTED_CANONICAL,origins:[],chrome:[]};
try{
  report.origins=await Promise.all(ORIGINS.map(auditOrigin));
  assert.equal(report.origins[0].worker,report.origins[1].worker,
    'Canonical and direct origins serve different Worker versions');
  report.chrome=await auditChrome();
  report.ok=true;
  console.log('PASS Canyon Lake 2026 source-based authority, both Workers and 1366/390/320 Chrome.');
}catch(error){
  report.ok=false;
  report.error=String(error?.stack||error);
  console.error('FAIL Canyon Lake live authority: '+String(error?.message||error));
  process.exitCode=1;
}finally{
  await writeFile(ARTIFACT+'/report.json',JSON.stringify(report,null,2)+'\n');
}
