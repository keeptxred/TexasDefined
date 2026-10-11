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
let serverOutput='',browser;
function launchWorker(){
 const next=spawn('node_modules/.bin/wrangler',[
  'dev','--config','dist/server/wrangler.json','--local',
  '--ip','127.0.0.1','--port',String(port)
 ],{env:{...process.env,CI:'true',NO_COLOR:'1'},stdio:['ignore','pipe','pipe'],detached:process.platform!=='win32'});
 serverOutput='';
 for(const stream of [next.stdout,next.stderr]){
  stream.on('data',data=>{serverOutput=(serverOutput+data.toString()).slice(-25000)});
 }
 return next;
}
let server=launchWorker();
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
 // Probe anonymous billing before any page hydration to distinguish route defects
 // from errors that emerge after prolonged local Worker activity.
 const billingPreflight={route:'/api/public/network-billing',viewport:'HTTP-PREFLIGHT',status:'PASS',failures:[]};
 results.push(billingPreflight);
 try{
  const preflight=await fetch(origin+'/api/public/network-billing',{signal:AbortSignal.timeout(15000)});
  const detail=(await preflight.text()).slice(0,400);
  if(preflight.status!==401){
   throw Error('Anonymous billing GET preflight returned '+preflight.status+', expected 401; body='+JSON.stringify(detail));
  }
 }catch(e){billingPreflight.status='FAIL';billingPreflight.failures.push(String(e))}
 console.log('NETWORK API anonymous billing GET preflight',billingPreflight.status,billingPreflight.failures.join(' | '));
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
    // Finish hydration-triggered asset requests before tearing down Chrome pages.
    // Abrupt aborts can destabilize Miniflare's local request bridge.
    await page.waitForLoadState('networkidle',{timeout:20000});
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
    await page.screenshot({path:output+'/'+route.replaceAll('/','-').replace(/^-/, '')+'-'+viewport+'.png',animations:'disabled',fullPage:true});
    await page.waitForLoadState('networkidle',{timeout:20000});
    assert.equal(row.pageErrors.length,0,'client-side JavaScript errors: '+row.pageErrors.join(' | '));
   }catch(error){
    row.status='FAIL';row.failures.push(String(error));
    try{await page.screenshot({path:output+'/FAILED-'+route.replaceAll('/','-')+'-'+viewport+'.png'})}catch{}
   }finally{await page.close()}
   console.log('NETWORK BROWSER',viewport,route,row.status,row.failures.join(' | '));
  }
  await context.close();
 }
 // Release Chrome and its connection pool before independent API probes.
 // First-response assertions are strict; no retry can turn an HTTP 500 green.
 await browser.close();
 browser=undefined;
 // Wrangler's local Miniflare proxy intermittently loses its internal network
 // channel after the asset-heavy 18-page Chrome run (observed as unrelated
 // 500/fetch failures after browser teardown). Each suite now owns a fresh
 // local Worker lifecycle. This is isolation, not retry: the prior browser
 // assertions already completed, and every API probe checks its FIRST response.
 await stop();
 server=launchWorker();
 await ready();
 // Prove direct HTTP callers are blocked even when bypassing disabled UI controls.
 // No valid application, email, Stripe session or user identity is created.
 const apiCases=[
  {method:'POST',path:'/api/public/network-application',body:'{}',status:503,label:'direct intake closed'},
  {method:'POST',path:'/api/public/network-billing',body:'{}',status:401,label:'anonymous billing portal denied'},
  {method:'GET',path:'/api/public/network-billing',status:401,label:'anonymous membership list denied'},
  ...Array.from({length:8},(_,i)=>({
   method:'GET',path:'/api/public/network-billing',status:401,
   label:'anonymous membership denial sustained '+(i+1)+'/8'
  })),
  {method:'POST',path:'/api/public/network-checkout',body:'{}',status:400,label:'invalid checkout request rejected'},
  {method:'GET',path:'/network/business/unpublished-qa-fixture',status:404,label:'no unpublished business profile'},
 ];
 for(const api of apiCases){
  // Test the Worker endpoint before and after sustained 401 denials.
  if(api.label==='anonymous membership list denied'){
   const health={route:'/network/join',viewport:'HTTP-HEALTH-BEFORE',status:'PASS',failures:[]};
   results.push(health);
   try{
    const probe=await fetch(origin+'/network/join',{signal:AbortSignal.timeout(15000)});
    const detail=(await probe.text()).slice(0,220);
    assert.equal(probe.status,200,'Worker unhealthy before anonymous GET checks: '+detail+'; '+serverOutput.slice(-700));
   }catch(e){health.status='FAIL';health.failures.push(String(e))}
   console.log('NETWORK API Worker before anonymous membership checks',health.status,health.failures.join(' | '));
  }
  const entry={route:api.path,viewport:'HTTP',status:'PASS',failures:[]};
  results.push(entry);
  try{
   const response=await fetch(origin+api.path,{
    method:api.method,
    // Fully consume the response body before the next probe. Early socket
    // teardown can abort Miniflare's local request bridge under Node fetch.
    // No retry is allowed to turn an initial wrong response into a pass.
    headers:{origin,'content-type':'application/json'},
    ...(api.body!==undefined?{body:api.body}:{}),
    signal:AbortSignal.timeout(15000)
   });
   const message=(await response.text()).slice(0,400);
   if(response.status!==api.status){
    // Never promote a second attempt into a pass: record diagnostics for the
    // initial failure and retain the release-gate failure.
    let repeat='not-probed';
    if(api.label==='anonymous membership list denied'){
     try{
      const followup=await fetch(origin+api.path,{
       method:api.method,headers:{origin,'content-type':'application/json'},
       signal:AbortSignal.timeout(15000)
      });
      await followup.text();
      repeat=String(followup.status);
     }catch(e){repeat=String(e)}
    }
    throw Error(`${api.label} expected ${api.status}, got ${response.status}; body=${JSON.stringify(message)}; immediate_followup=${repeat}; worker_running=${server.exitCode===null}; worker_tail=${JSON.stringify(serverOutput.slice(-700))}`);
   }
   // After a disabled intake POST the very same Worker must still be alive.
   if(api.label==='direct intake closed'){
    const alive=await fetch(origin+'/network/join',{signal:AbortSignal.timeout(15000)});
    const healthBody=(await alive.text()).slice(0,200);
    assert.equal(alive.status,200,'Worker died after rejected intake POST: '+healthBody);
   }
  }catch(error){entry.status='FAIL';entry.failures.push(String(error))}
  console.log('NETWORK API',api.label,entry.status,entry.failures.join(' | '));
  if(api.label==='anonymous membership denial sustained 8/8'){
   const health={route:'/network/join',viewport:'HTTP-HEALTH-AFTER',status:'PASS',failures:[]};
   results.push(health);
   try{
    const probe=await fetch(origin+'/network/join',{signal:AbortSignal.timeout(15000)});
    const detail=(await probe.text()).slice(0,220);
    assert.equal(probe.status,200,'Worker unhealthy after anonymous GET checks: '+detail+'; '+serverOutput.slice(-700));
   }catch(e){health.status='FAIL';health.failures.push(String(e))}
   console.log('NETWORK API Worker after anonymous membership checks',health.status,health.failures.join(' | '));
  }
 }
}finally{
 if(browser)await browser.close();
 await stop();
 await writeFile(output+'/results.json',JSON.stringify({testedAt:new Date().toISOString(),origin,results},null,2)+'\n');
}
const failures=results.filter(r=>r.status!=='PASS');
console.log('NETWORK BROWSER RESULT '+(results.length-failures.length)+'/'+results.length+' mobile/desktop and direct HTTP checks PASS');
if(failures.length)process.exitCode=1;
