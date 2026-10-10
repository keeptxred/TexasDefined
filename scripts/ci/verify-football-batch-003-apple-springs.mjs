import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('/tmp/texasdefined-wp-qa/node_modules/playwright-core');
const origin = 'https://texasdefined.com';
const path = '/texas-high-school-football-teams/apple-springs';
const out = 'artifacts/football-batch-003-apple-springs';
const expectedTitle = 'Apple Springs Eagles Football: 2026 Coach, Stadium and Results';
await mkdir(out, {recursive:true});
const browser = await chromium.launch({headless:true, executablePath:process.env.CHROME_BIN || '/usr/bin/google-chrome', args:['--no-sandbox','--disable-dev-shm-usage']});
const results=[];
try {
  for(const [viewport,width,height,mobile] of [['desktop',1366,900,false],['mobile',390,844,true]]) {
    const context = await browser.newContext({viewport:{width,height},isMobile:mobile,hasTouch:mobile,deviceScaleFactor:1});
    const page = await context.newPage();
    const runtime=[];
    page.on('pageerror',e=>runtime.push(e.message));
    let data={},status=0;
    const errors=[];
    try {
      const response=await page.goto(origin+path+'?batch003_apple_retest='+Date.now(),{waitUntil:'domcontentloaded',timeout:55000});
      status=response?.status()||0;
      await page.locator('h1').first().waitFor({state:'visible',timeout:30000});
      await page.waitForTimeout(1100);
      data=await page.evaluate(()=>({
        title:document.title,
        h1:[...document.querySelectorAll('h1')].map(x=>x.innerText.trim()),
        canonical:document.querySelector('link[rel="canonical"]')?.href||'',
        description:document.querySelector('meta[name="description"]')?.content||'',
        schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(x=>x.textContent||'').join('\n'),
        sourceLinks:[...document.querySelectorAll('a[href]')].filter(x=>x.href.startsWith('http')&&!x.href.startsWith(location.origin)).length,
        countyLinks:[...document.querySelectorAll('a[href]')].filter(x=>new URL(x.href).pathname==='/county/trinity').length,
        brokenImages:[...document.images].filter(x=>x.complete&&!x.naturalWidth&&x.getBoundingClientRect().width>0).length,
        missingImageAlts:[...document.images].filter(x=>!x.hasAttribute('alt')&&x.getBoundingClientRect().width>0).length,
        overflow:Math.max(0,document.documentElement.scrollWidth-window.innerWidth),
      }));
      if(status!==200) errors.push('non-200: '+status);
      if(data.h1.length!==1||!data.h1[0].includes('Apple Springs')) errors.push('school heading mismatch');
      if(!data.title.includes(expectedTitle)) errors.push('corrected complete SEO title absent: '+data.title);
      if(/&\s*\|\s*Texas Defined/.test(data.title)) errors.push('truncated title still ends with dangling &');
      if(data.canonical!==origin+path) errors.push('wrong canonical: '+data.canonical);
      if(data.description.length<70) errors.push('missing SEO description');
      if(!data.schema.includes('SportsTeam')||!data.schema.includes('BreadcrumbList'))errors.push('schema missing');
      if(data.sourceLinks<3) errors.push('too few external source links');
      if(data.countyLinks<1) errors.push('missing Trinity county link');
      if(data.brokenImages||data.missingImageAlts||data.overflow>10) errors.push('image/alt/horizontal overflow defect');
      if(runtime.length)errors.push('JS runtime errors: '+runtime.join('; '));
      await page.screenshot({path:out+'/'+viewport+'-apple-springs.png',animations:'disabled',fullPage:true,timeout:30000});
    } catch(e) {errors.push(String(e?.message||e));}
    results.push({viewport,status,passed:errors.length===0,errors,...data,runtime});
    await context.close();
  }
} finally {await browser.close();}
let sitemap={present:false,http:0,error:null};
try{
  const r=await fetch(origin+'/sitemap.xml?batch003_apple_sitemap='+Date.now(),{signal:AbortSignal.timeout(90000),cache:'no-store'});
  const xml=await r.text();
  sitemap={present:r.ok&&xml.includes('<loc>'+origin+path+'</loc>'),http:r.status,error:null};
}catch(e){sitemap.error=String(e);}
const report={date:new Date().toISOString(),expectedDeploymentCommit:'7ca7f815caa79083bc6b833e5bec77a5307665fa',results,sitemap,passed:results.every(x=>x.passed)&&sitemap.present};
await writeFile(out+'/report.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({passed:report.passed,results:results.map(x=>({viewport:x.viewport,title:x.title,passed:x.passed,errors:x.errors})),sitemap},null,2));
if(!report.passed)process.exitCode=1;
