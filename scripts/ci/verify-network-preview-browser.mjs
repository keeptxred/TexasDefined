import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';

const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_CORE_PATH||'/tmp/texasdefined-network-qa/node_modules/playwright-core');
const port=8798,origin='http://127.0.0.1:'+port;
const output='artifacts/network-preview-browser';
await mkdir(output,{recursive:true});
const cases=[
 ['/network/join','Put Your Business'],
 ['/network/apply','Build your business listing'],
 ['/network/example/basic','Lone Star Heritage Workshop'],
 ['/network/example/plus','Lone Star Heritage Workshop'],
 ['/network/directory','Explore the Texas Defined Network'],
 ['/network/billing','Manage your membership'],
 ['/network/checkout-return','Thank you for joining us.'],
 ['/business/dashboard','My Business Dashboard'],
 ['/admin/network-applications','Network applications'],
];
const viewports=[['mobile',390,844],['desktop',1366,900]];
const results=[];
const server=spawn('node_modules/.bin/wrangler',[
 'dev','--config','dist/server/wrangler.json','--local',
 '--ip','127.0.0.1','--port',String(port)
],{env:{...process.env,CI:'true',NO_COLOR:'1'},stdio:['ignore','pipe','pipe'],detached:process.platform!=='win32'});
let serverOutput='',browser;
for(const stream of [server.stdout,server.stderr]){
 stream.on('data',data=>{
  serverOutput=(serverOutput+data.toString()).slice(-25000);
 });
}
const sleep=(ms)=>new Promise(resolve=>setTimeout(resolve,ms));
async function ready(){
 const start=Date.now();
 while(Date.now()-start<75000){
  if(server.exitCode!==null)throw Error('Wrangler exited before ready: '+serverOutput.slice(-2500));
  if(serverOutput.includes('Ready on '+origin))return;
  await sleep(180);
 }
 throw Error('Wrangler not ready: '+serverOutput.slice(-2500));
}
async function stop(){
 if(server.exitCode!==null)return;
 try{
  if(process.platform!=='win32'&&server.pid)process.kill(-server.pid,'SIGTERM');
  else server.kill('SIGTERM');
 }catch{server.kill('SIGTERM')}
 await Promise.race([new Promise(resolve=>server.once('exit',resolve)),sleep(3000)]);
 if(server.exitCode===null){
  try{if(process.platform!=='win32'&&server.pid)process.kill(-server.pid,'SIGKILL');else server.kill('SIGKILL')}catch{}
 }
}
try{
 await ready();
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',args:['--no-sandbox','--disable-dev-shm-usage']});
 for(const [viewport,width,height] of viewports){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
  for(const [route,heading] of cases){
   const page=await context.newPage();
   const row={route,viewport,status:'PASS',failures:[],pageErrors:[],imageIssues:[],horizontalOverflow:0,hydrated:false};
   results.push(row);
   page.on('pageerror',e=>row.pageErrors.push(e.message));
   try{
    const response=await page.goto(origin+route+'?qa=network-preview',{waitUntil:'domcontentloaded',timeout:45000});
    assert.equal(response?.status(),200,'expected successful Network route');
    await page.waitForFunction(()=>document.documentElement.dataset.tdRootHydrated==='1',null,{timeout:22000});
    row.hydrated=true;
    const state=await page.evaluate(()=>({
     heading:[...document.querySelectorAll('main h1')].map(h=>(h.textContent||'').trim()),
     mainCount:document.querySelectorAll('main').length,
     robots:document.querySelector('meta[name="robots"]')?.content||'',
     overflow:document.documentElement.scrollWidth-window.innerWidth,
     missingAlts:[...document.querySelectorAll('main img')].filter(i=>!i.hasAttribute('alt')).map(i=>i.currentSrc||i.src),
     brokenImages:[...document.querySelectorAll('main img')].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.currentSrc||i.src),
    }));
    assert.equal(state.mainCount,1,'exactly one main landmark required');
    assert.equal(state.heading.length,1,'exactly one main heading required');
    assert.ok(state.heading[0].includes(heading),'unexpected heading '+state.heading[0]);
    assert.ok(/noindex/i.test(state.robots),'Network preview must be noindex');
    row.horizontalOverflow=state.overflow;
    assert.ok(state.overflow<=10,'horizontal overflow '+state.overflow+'px');
    row.imageIssues=[...state.missingAlts,...state.brokenImages];
    assert.equal(row.imageIssues.length,0,'invalid image alternatives or broken image');
    if(route==='/network/apply'){
      assert.equal(await page.getByRole('button',{name:'Submit listing for review'}).isDisabled(),true,'intake must be disabled');
      await page.getByRole('textbox',{name:'Business or organization name'}).fill('Browser QA Texas Business');
      await page.getByRole('button',{name:'Plus · $19.99/month'}).click();
      assert.equal(await page.getByRole('button',{name:'Plus · $19.99/month'}).getAttribute('aria-pressed'),'true','Plus toggle failed');
      assert.ok((await page.locator('main').innerText()).includes('Browser QA Texas Business'),'React preview not reactive');
    }
    if(route==='/network/billing'){
      assert.equal(await page.getByRole('button',{name:'Email me a secure sign-in link'}).isDisabled(),true,'billing email must be disabled');
    }
    if(route==='/business/dashboard'){
      assert.equal(await page.getByRole('button',{name:'Email sign-in link'}).isDisabled(),true,'owner OTP must be disabled');
    }
    if(route==='/admin/network-applications'){
      assert.equal(await page.locator('input[type="password"]').count(),1,'admin key must be required');
    }
    await page.screenshot({path:output+'/'+route.replaceAll('/','-').replace(/^-/, '')+'-'+viewport+'.png',animations:'disabled',fullPage:false});
    assert.equal(row.pageErrors.length,0,'client-side JavaScript errors: '+row.pageErrors.join(' | '));
   }catch(error){
    row.status='FAIL';row.failures.push(String(error));
    try{await page.screenshot({path:output+'/FAILED-'+route.replaceAll('/','-')+'-'+viewport+'.png'})}catch{}
   }finally{await page.close()}
   console.log('NETWORK BROWSER',viewport,route,row.status,row.failures.join(' | '));
  }
  await context.close();
 }
}finally{
 if(browser)await browser.close();
 await stop();
 await writeFile(output+'/results.json',JSON.stringify({testedAt:new Date().toISOString(),origin,results},null,2)+'\n');
}
const failures=results.filter(r=>r.status!=='PASS');
console.log('NETWORK BROWSER RESULT '+(results.length-failures.length)+'/'+results.length+' mobile/desktop route checks PASS');
if(failures.length)process.exitCode=1;
