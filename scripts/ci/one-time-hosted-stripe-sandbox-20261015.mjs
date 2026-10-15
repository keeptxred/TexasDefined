import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/tdqa/node_modules/playwright-core');
import { mkdir, writeFile } from 'node:fs/promises';

const TEST_URL = "https://checkout.stripe.com/c/pay/cs_test_a13Ok5sdy1d7lk7ZsMeDjVAh7RbXtvcSwyKd80nvBGo81fOSGZGQHHo4TU#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSdicyc%2FNSknZHVsTmB8Jz8ndW5acWB2cVowNFFqZ0x%2FSXFXcHdvM0JIS0N9bm5EY0c0czRRcjRNUHB0MmRfajV2XXZ3cGc3Zm5EcEpWVV1zVlNtclNSV0pIaHEyNzZxR0NcMkFodTVHUH83X1xXX1NvYzU1RnRpUG9BT0gnKSdjd2poVmB3c2B3Jz9xd3BgKSdnZGZuYndqcGthRmppancnPycmY2NjY2NjJyknaWR8anBxUXx1YCc%2FJ3Zsa2JpYFpscWBoJyknYGtkZ2lgVWlkZmBtamlhYHd2Jz9xd3BgeCUl";
const expected = new URL(TEST_URL);
if (expected.hostname !== 'checkout.stripe.com' ||
    !expected.pathname.includes('/cs_test_')) {
  throw new Error('Refusing to navigate a non-sandbox Stripe checkout');
}
const out = 'artifacts/one-time-hosted-stripe-test';
await mkdir(out,{recursive:true});
const events = [];
const browser = await chromium.launch({
  headless: true, args:['--no-sandbox'],
  ...(process.env.CHROME_BIN?{executablePath:process.env.CHROME_BIN}:{})
});
const page = await browser.newPage({viewport:{width:390,height:844}});
page.on('pageerror',e=>events.push({type:'pageerror',message:e.message.slice(0,400)}));
page.on('requestfailed',r=>events.push({type:'requestfailed',host:(()=>{try{return new URL(r.url()).hostname}catch{return 'unknown'}})(),reason:r.failure()?.errorText?.slice(0,130)}));
const details={mode:'stripe-sandbox',maxAmountCents:50,liveMoney:false,finalUrl:'',stages:[],events};
async function inspect(label){
  const frames=page.frames();
  details.stages.push({label,urlHost:new URL(page.url()).hostname,title:await page.title().catch(()=>''),frames:frames.map(f=>({host:(()=>{try{return new URL(f.url()).hostname}catch{return ''}})(),inputs:[]}))});
  for(let i=0;i<frames.length;i++){
    const f=frames[i];const inputs=await f.locator('input').evaluateAll(els=>els.map(e=>({name:e.name,placeholder:e.placeholder,aria:e.getAttribute('aria-label'),type:e.type}))).catch(()=>[]);
    details.stages.at(-1).frames[i].inputs=inputs;
  }
  await page.screenshot({path:out+'/'+label+'.png',fullPage:false,timeout:20000}).catch(()=>{});
}
async function tryFill(labels,value){
  for(const f of page.frames()){
    for(const selector of labels){
      try {
        const loc=f.locator(selector).first();
        if(await loc.isVisible({timeout:1500})){await loc.fill(value,{timeout:4000});return true;}
      }catch{}
    }
  }
  return false;
}
try{
  const response=await page.goto(TEST_URL,{waitUntil:'domcontentloaded',timeout:55000});
  details.responseStatus=response?.status();
  await page.waitForTimeout(3000);
  await inspect('open');
  details.emailFilled=await tryFill(['input[type=email]','input[name=email]','input[autocomplete=email]'],'texasdefined-qa@example.com');
  await page.waitForTimeout(800);
  details.cardFilled=await tryFill(['input[autocomplete=cc-number]','input[name=cardNumber]','input[placeholder*="1234"]','input[aria-label*="Card number"]'],'4242424242424242');
  details.expirationFilled=await tryFill(['input[autocomplete=cc-exp]','input[name=cardExpiry]','input[placeholder*="MM"]'],'1230');
  details.cvcFilled=await tryFill(['input[autocomplete=cc-csc]','input[name=cardCvc]','input[placeholder*="CVC"]'],'123');
  details.nameFilled=await tryFill(['input[name=billingName]','input[autocomplete=cc-name]','input[placeholder*="Name on card"]'],'Texas Defined QA');
  details.zipFilled=await tryFill(['input[autocomplete=postal-code]','input[name=postalCode]','input[placeholder*="ZIP"]'],'77001');
  await inspect('before-submit');
  if(details.emailFilled && details.cardFilled && details.expirationFilled && details.cvcFilled){
    let clicked=false;
    for(const f of page.frames()){
      for(const query of ['button[type=submit]','button:has-text("Pay")','button:has-text("Complete")']){
        try{const loc=f.locator(query).first();if(await loc.isVisible({timeout:700})){await loc.click({timeout:4500});clicked=true;break;}}catch{}
      }
      if(clicked) break;
    }
    details.submitted=clicked;
    if(clicked){
      await Promise.race([
        page.waitForURL(u=>u.hostname==='texasdefined.com',{timeout:35000}),
        page.waitForTimeout(35000)
      ]);
      await inspect('after-submit');
      details.finalUrl=new URL(page.url()).origin+new URL(page.url()).pathname;
      details.returnedToMerchant=new URL(page.url()).hostname==='texasdefined.com';
    }
  }
  console.log('SANDBOX CHECKOUT DIAGNOSTIC '+JSON.stringify({
    status:details.responseStatus,
    emailFilled:details.emailFilled,
    cardFilled:details.cardFilled,
    expirationFilled:details.expirationFilled,
    cvcFilled:details.cvcFilled,
    submitted:details.submitted,
    returnedToMerchant:details.returnedToMerchant,
    stageFields:details.stages.map(s=>({label:s.label,title:s.title,hosts:s.frames.map(f=>f.host),inputs:s.frames.flatMap(f=>f.inputs.map(x=>x.name||x.aria||x.placeholder)).slice(0,20)}))
  }));
  if(!details.returnedToMerchant) process.exitCode=1;
}catch(error){details.error=String(error);console.error('SANDBOX TEST ERROR '+String(error));process.exitCode=1;}
finally{await writeFile(out+'/results.json',JSON.stringify(details,null,2));await browser.close();}
