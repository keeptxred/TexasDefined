import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('/tmp/texasdefined-wp-qa/node_modules/playwright-core');
const url = 'https://texasdefined.com/texas-high-school-football-teams/aubrey';
const output = 'artifacts/aubrey-2026-regular-season-live';
await mkdir(output, {recursive:true});
const browser = await chromium.launch({
  headless:true, executablePath:process.env.CHROME_BIN || '/usr/bin/google-chrome',
  args:['--no-sandbox','--disable-dev-shm-usage'],
});
const views = [
  {name:'desktop',width:1366,height:900},
  {name:'mobile',width:390,height:844},
];
const results=[];
try {
  for (const viewport of views) {
    const context = await browser.newContext({
      viewport:{width:viewport.width,height:viewport.height},
      reducedMotion:'reduce',
      userAgent:'TexasDefinedAubreyRegularSeasonVerification/1.0 (non-visitor synthetic)',
    });
    await context.route(/(google-analytics\.com|googletagmanager\.com|doubleclick\.net|facebook\.com\/tr|plausible\.io|segment\.io|\/api\/(?:analytics|track|events|pageviews|sports-traffic))/i,
      (route)=>route.abort('blockedbyclient'));
    const page=await context.newPage();
    const errors=[],runtime=[];
    page.on('pageerror',(error)=>runtime.push(error.message));
    let response;
    try {
      response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:38000});
      await page.locator('main h1').first().waitFor({state:'visible',timeout:25000});
      await page.waitForTimeout(1600);
      const data=await page.evaluate(()=>({
        title:document.title,
        h1:[...document.querySelectorAll('h1')].map(el=>el.innerText.trim()),
        canonical:document.querySelector('link[rel=canonical]')?.href || '',
        description:document.querySelector('meta[name=description]')?.content || '',
        body:document.body?.innerText || '',
        games:[...document.querySelectorAll('#football-current-season table tbody tr')]
          .map(el=>el.innerText.replace(/\s+/g,' ').trim()),
        coachFaq:[...document.querySelectorAll('h3')].map(el=>el.innerText.trim())
          .filter(text=>/head coach|who coaches/i.test(text)),
        links:[...document.querySelectorAll('a[href]')].map(el=>({text:(el.innerText||'').trim(),href:el.href})),
        overflow:document.documentElement.scrollWidth-window.innerWidth,
        brokenImages:[...document.images].filter(el=>el.getBoundingClientRect().width && el.complete && !el.naturalWidth).map(el=>el.currentSrc),
      }));
      const check=(ok,why)=>{if(!ok)errors.push(why);};
      check(response?.status()===200,'Expected HTTP 200');
      check(data.h1.length===1 && /Aubrey.*Football/i.test(data.h1[0]),'Aubrey team H1');
      check(data.canonical===url,'Aubrey canonical mismatch');
      check(data.title.includes('Aubrey'),'Aubrey title not present');
      check(data.description.includes('7–3') && data.description.includes('7–0'),
        'New regular-season record missing from search description');
      check(data.body.includes('7–3 overall') && data.body.includes('7–0 district'),
        '7–3 overall / 7–0 district record not rendered');
      check(data.games.length===10,'Expected ten regular-season rows; received '+data.games.length);
      for (const item of [
        ['2026-10-23','Lake Dallas','28–21'],
        ['2026-10-30','Alvarado','70–40'],
        ['2026-11-06','Godley','55–22'],
      ]) {
        check(data.games.some(row=>row.includes(item[0]) && row.includes(item[1]) && row.includes(item[2])),
          'New verified Aubrey final missing: '+item.join(' / '));
      }
      check(data.coachFaq.length===1,'Expected one coach FAQ');
      check(data.links.some(link=>link.href.includes('/football/game/aubrey-vs-godley/11-6-2026/')),
        'Latest November 6 final source link not updated');
      check(data.links.some(link=>link.href==='https://gofan.co/app/school/TX90134'),
        'Official ticket link disappeared');
      check(data.overflow<=4,'Horizontal overflow: '+data.overflow+'px');
      check(data.brokenImages.length===0,'Visible broken image URLs: '+data.brokenImages.join(', '));
      check(runtime.length===0,'Client runtime errors: '+runtime.join(' | '));
      await page.screenshot({path:output+'/'+viewport.name+'-top.png',animations:'disabled'});
      results.push({viewport:viewport.name,status:response?.status(),pass:errors.length===0,errors,
        title:data.title,description:data.description,h1:data.h1,gameRows:data.games,coachFaq:data.coachFaq,
        overflow:data.overflow,brokenImages:data.brokenImages,runtime,
        cfRay:response?.headers()['cf-ray']||null});
    } catch(error) {
      errors.push('Browser exception: '+String(error).slice(0,600));
      results.push({viewport:viewport.name,status:response?.status()||0,pass:false,errors});
    } finally {await context.close();}
  }
} finally {
  await browser.close();
  await writeFile(output+'/report.json',JSON.stringify({at:new Date().toISOString(),url,results},null,2)+'\n');
}
for(const result of results)console.log(JSON.stringify(result));
assert.equal(results.length,2);
assert.ok(results.every(result=>result.pass),'Aubrey regular-season live browser assertions failed');
console.log('Aubrey 2026 regular-season finals and record verified live on desktop and mobile.');
