import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_CORE_PATH||'/tmp/texasdefined-wp-qa/node_modules/playwright-core');
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',args:['--no-sandbox','--disable-dev-shm-usage']});
try{
 for(const spec of [{name:'desktop',width:1440,height:900,mobile:false},{name:'mobile',width:390,height:844,mobile:true}]){
  const context=await browser.newContext({viewport:{width:spec.width,height:spec.height},isMobile:spec.mobile,hasTouch:spec.mobile});
  await context.route(/(?:google-analytics|googletagmanager|connect\.facebook\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track)/i,r=>r.abort());
  try{
   const page=await context.newPage(), errors=[];
   page.on('pageerror',e=>errors.push(String(e)));
   const response=await page.goto('https://texasdefined.com/texas-high-school-football-districts/6a-district-16?district16_browser='+(process.env.GITHUB_SHA||'manual').slice(0,12),{waitUntil:'domcontentloaded',timeout:45000});
   assert.equal(response?.status(),200,spec.name+' HTTP');
   await page.locator('[data-football-district-section="district-16-2026"]').waitFor({state:'visible',timeout:15000});
   const facts=await page.evaluate(()=>({title:document.title,canonical:document.querySelector('link[rel="canonical"]')?.href,h1:document.querySelectorAll('h1').length,rows:document.querySelectorAll('#district-16-standings tbody tr').length,finals:document.querySelectorAll('[data-district16-result="final"]').length,fixtures:document.querySelectorAll('[data-district16-result="scheduled"]').length,links:new Set([...document.querySelectorAll('a[href^="/texas-high-school-football-teams/"]')].map(a=>a.getAttribute('href'))).size,overflow:document.documentElement.scrollWidth-innerWidth,sectionHeight:document.querySelector('#district-16-results')?.getBoundingClientRect().height||0}));
   assert.ok(facts.title.includes('District 16-6A Football: 2026 Standings'),spec.name+' stale title');
   assert.equal(facts.canonical,'https://texasdefined.com/texas-high-school-football-districts/6a-district-16');
   assert.equal(facts.h1,1);assert.equal(facts.rows,8);assert.equal(facts.finals,4);assert.equal(facts.fixtures,12);assert.ok(facts.links>=8);
   assert.ok(facts.sectionHeight>200);assert.ok(facts.overflow<=8,spec.name+' horizontal overflow '+facts.overflow);
   assert.deepEqual(errors,[],spec.name+' client runtime errors');
   console.log('PASS District 16 rendered',spec.name,facts);
  }finally{await context.close();}
 }
}finally{await browser.close();}
