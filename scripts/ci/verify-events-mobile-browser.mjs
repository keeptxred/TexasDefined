/** Scoped post-deploy event-page browser acceptance; no outbound ticket clicks. */
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-wp-qa/node_modules/playwright-core',
);
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const root = 'artifacts/events-mobile-browser';
await mkdir(root, { recursive:true });
const pages = [
  { key:'statewide', route:'/events', title:'Texas' },
  { key:'christmas', route:'/events/christmas-events', title:'Christmas' },
  { key:'palestine', route:'/event/polar-express-palestine', title:'POLAR EXPRESS' },
  // Exact festival parent pages whose general badges, free-entry policy or
  // organizer homepage must NOT masquerade as event admission checkout.
  { key:'austin-film-festival', route:'/event/austin-film-festival', sourceHostname:'austinfilmfestival.com' },
  { key:'sxsw', route:'/event/sxsw', sourceHostname:'sxsw.com' },
  { key:'austin-powwow', route:'/event/austin-powwow', sourceHostname:'austinpowwow.net' },
  { key:'houston-art-car-parade', route:'/event/houston-art-car-parade', sourceHostname:'thehoustonartcarparade.com' },
  { key:'main-st-fort-worth-arts-festival', route:'/event/main-st-fort-worth-arts-festival', sourceHostname:'mainstreetartsfest.org' },
];
const viewports = [
  { key:'desktop', width:1440, height:900, mobile:false },
  { key:'mobile', width:390, height:844, mobile:true },
];
const browser = await chromium.launch({
  headless:true,
  executablePath:process.env.CHROME_BIN || '/usr/bin/google-chrome',
  args:['--no-sandbox','--disable-dev-shm-usage'],
});
try {
  for(const viewport of viewports){
    const context=await browser.newContext({
      viewport:{width:viewport.width,height:viewport.height},
      isMobile:viewport.mobile,hasTouch:viewport.mobile,deviceScaleFactor:1,
    });
    await context.route(/(?:google-analytics|googletagmanager|connect\.facebook\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track)/i, request=>request.abort());
    try {
      for(const target of pages){
        const page=await context.newPage();
        try {
          const url=origin+target.route+'?event_visual_verifier='+encodeURIComponent((process.env.GITHUB_SHA||'manual').slice(0,12));
          const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
          assert.equal(response?.status(),200,target.key+' '+viewport.key+' HTTP');
          await page.locator('h1').first().waitFor({state:'visible',timeout:12000});
          const d=await page.evaluate((sourceHostname)=>{
            const h1=document.querySelector('h1')?.textContent?.trim() || '';
            const links=[...document.querySelectorAll('a[href]')];
            const ticket=links.filter(a=>/Tickets|admission/i.test(a.textContent||'') && /https:\/\//.test(a.href));
            const impact=links.filter(a=>{try{return new URL(a.href).hostname==='ticketmaster.evyy.net'}catch{return false}});
            const eventId=impact.map(a=>({href:a.href,eventId:a.dataset.affiliateEventId||'',partner:a.dataset.commercialPartner||'',rel:a.rel}));
            return {
              h1,canonical:document.querySelector('link[rel="canonical"]')?.href||'',
              overflow:document.documentElement.scrollWidth-innerWidth,
              mobileViewport:window.innerWidth,viewportHeight:window.innerHeight,
              hasDebug:!!document.querySelector('[data-major-event-snapshot="true"]'),
              officialRailroad:!!document.querySelector('[data-event-official-ticket-cta="true"]'),
              essential:!!document.querySelector('[data-polar-express-editorial-essentials="true"]'),
              ticketLinks:ticket.length,impact:eventId,
              // Parent festival guides retain organizer links but must not
              // sell generalized credentials/free entry as exact admission.
              festivalSourcePresent:!sourceHostname || links.some(a=>{
                try{return new URL(a.href).hostname.replace(/^www\\./,'')===sourceHostname}catch{return false}
              }),
              festivalOfferHeading:[...document.querySelectorAll('h3')].some(h=>
                /^(?:Tickets and admission|Verified admission options)$/i.test(h.textContent?.trim()||'')),
              festivalEventSchemaOffer:sourceHostname ? [...document.querySelectorAll('script[type="application/ld+json"]')].some(el=>{
                let root;
                try{root=JSON.parse(el.textContent||'null')}catch{return false}
                const stack=[root];
                while(stack.length){
                  const record=stack.pop();
                  if(!record || typeof record!=='object')continue;
                  if(Array.isArray(record)){stack.push(...record);continue}
                  const kinds=Array.isArray(record['@type'])?record['@type']:[record['@type']];
                  if(kinds.some(kind=>typeof kind==='string' && /Event$/.test(kind)) && record.offers)return true;
                  if(record['@graph'])stack.push(record['@graph']);
                }
                return false;
              }):false,
            };
          },target.sourceHostname||'');
          assert.ok(d.h1,target.key+' '+viewport.key+' H1 missing');
          if(target.title)assert.ok(d.h1.toLowerCase().includes(target.title.toLowerCase()),target.key+' '+viewport.key+' title: '+d.h1);
          assert.equal(d.canonical,origin+target.route,target.key+' '+viewport.key+' canonical');
          assert.ok(d.overflow<=8,target.key+' '+viewport.key+' horizontal overflow: '+d.overflow);
          if(target.key==='palestine'){
            assert.ok(d.essential && d.officialRailroad,target.key+' editorial essentials/official booking missing');
            assert.ok(!d.hasDebug,'Palestine obsolete dashboard visible');
          }
          if(target.key==='statewide') assert.ok(d.ticketLinks>0,'Statewide calendar missing all ticket CTAs');
          if(target.sourceHostname){
            assert.ok(d.festivalSourcePresent,target.key+' '+viewport.key+' organizer source missing');
            assert.equal(d.festivalOfferHeading,false,target.key+' '+viewport.key+' generalized admission offers still visible');
            assert.equal(d.festivalEventSchemaOffer,false,target.key+' '+viewport.key+' unqualified Event structured-data Offers remain');
          }
          for(const item of d.impact){
            const u=new URL(item.href);
            assert.equal(u.searchParams.size,4,'Only approved Impact tracking fields');
            for(const [key,value] of [
              ['subId1','texasdefined'],['partnerpropertyid','8837726'],['MediaPartnerPropertyId','8837726']
            ])assert.equal(u.searchParams.get(key),value,'Impact '+key);
            assert.match(u.pathname,/^\/c\/7758914\/264167\/4272\/?$/,'Impact publisher and campaign');
            assert.ok(item.eventId,'Affiliate source event ID missing');
            assert.ok(item.partner,'Commercial partner missing');
            assert.ok(item.rel.includes('sponsored'),'Commercial CTA missing sponsored rel');
          }
          await page.screenshot({path:`${root}/${target.key}-${viewport.key}.png`});
          console.log('EVENT_MOBILE_ACCEPTANCE '+JSON.stringify({page:target.key,viewport:viewport.key,...d,impact:d.impact.length}));
        }finally{await page.close()}
      }
    }finally{await context.close()}
  }
}finally{await browser.close()}
console.log('PASS: three event hubs plus five reviewed festival guides validated at 1440px and 390px; no ticket purchases or unsupported inventory claims.');
