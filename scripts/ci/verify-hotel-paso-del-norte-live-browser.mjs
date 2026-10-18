import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-hotel-qa/node_modules/playwright-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const path = '/destination/hotel-paso-del-norte';
const city = '/city/el-paso';
const county = '/county/el-paso';
const magoffin = '/destination/magoffin-home';
const dir = 'artifacts/hotel-paso-del-norte-qa';
const reports = [];
let failures = [];
await mkdir(dir, {recursive:true});

const check = (condition, message) => { if (!condition) failures.push(message); };
const linkExists = (links, pathname) => links.some(url => { try { return new URL(url).pathname === pathname; } catch { return false; } });
const visitUrl = (p, size) => origin + p + '?acceptance=hotel-pdn-' + size;

async function collect(page) {
  return page.evaluate(() => {
    const all = selector => [...document.querySelectorAll(selector)];
    const imgs = all('img');
    return {
      h1: all('h1').map(e => e.textContent.trim()),
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || '',
      canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      text: document.body.innerText,
      width: document.documentElement.scrollWidth,
      viewportWidth: innerWidth,
      links: all('a[href]').map(e=> e.href),
      images: imgs.map(e=> ({src:e.currentSrc || e.src, alt:e.alt, naturalWidth:e.naturalWidth, naturalHeight:e.naturalHeight, complete:e.complete, visible:e.getBoundingClientRect().width>0 && e.getBoundingClientRect().height>0})),
      jsonLd: all('script[type="application/ld+json"]').map(e=>e.textContent),
      mainCount: all('main').length,
    };
  });
}

async function decode(img) {
  // Fixed per-image timeout; do not loop or delay entire site workflows.
  return img.evaluate(async el => {
    try { await Promise.race([el.decode(), new Promise((_, reject)=>setTimeout(()=>reject(new Error('image decode timeout')), 15000))]); return {ok:true,width:el.naturalWidth,height:el.naturalHeight,src:el.currentSrc||el.src}; }
    catch(error) { return {ok:false,error:String(error),width:el.naturalWidth,height:el.naturalHeight,src:el.currentSrc||el.src}; }
  });
}

async function checkHotel(page, viewport) {
  const errors=[]; page.on('pageerror', e=>errors.push(e.message));
  const response=await page.goto(visitUrl(path,viewport),{waitUntil:'domcontentloaded',timeout:55000});
  await page.locator('h1').first().waitFor({state:'visible',timeout:25000});
  await page.evaluate(()=>document.fonts?.ready);
  // Inspect the source-backed, user-visible offer WITHOUT CLICKING its CJ
  // redirect, so our production QA generates no artificial affiliate clicks.
  const exactOffer=page.locator('a[data-affiliate-placement="hotel-paso-exact-hotel-stay"]').first();
  try { await exactOffer.waitFor({state:'visible',timeout:7000}); }
  catch (error) {
    const diagnostics=await page.evaluate(() => ({
      pathname:location.pathname,
      hydrated:document.documentElement.dataset.tdRootHydrated,
      expediaType:document.getElementById('expedia-travel-surface')?.dataset.surfaceType || 'absent',
      cjApi:typeof window.TexasDefinedStayAffiliateOptions,
      expediaApi:typeof window.TexasDefinedStayNearby,
      cjChoice:document.getElementById('td-stay-affiliate-options')?.outerHTML.slice(0,1000) || 'absent',
      relatedLinks:[...document.querySelectorAll('a[data-affiliate-partner]')].map(a=>a.textContent).slice(0,6),
      scripts:[...document.scripts].filter(s=>/expedia-travel|stay-affiliate-options/.test(s.src)).map(s=>s.src),
    }));
    console.error('HOTEL_CJ_MISSING '+viewport+' '+JSON.stringify({diagnostics,errors}));
    await page.evaluate(()=>window.TexasDefinedStayAffiliateOptions?.sync?.());
    await page.waitForTimeout(600);
    const postSync=await page.evaluate(()=>({
      choice:document.getElementById('td-stay-affiliate-options')?.outerHTML.slice(0,300)||'absent',
      hotelOffer:document.querySelectorAll('a[data-affiliate-placement="hotel-paso-exact-hotel-stay"]').length
    }));
    console.error('HOTEL_CJ_ON_DEMAND '+viewport+' '+JSON.stringify({postSync,errors}));
    throw error;
  }
  const offer=await exactOffer.evaluate(el=>({
    href:el.href,rel:el.rel,text:(el.textContent||'').trim(),
    partner:el.dataset.affiliatePartner,placement:el.dataset.affiliatePlacement,
  }));
  const disclosure=await page.locator('#td-stay-affiliate-options .td-stay-affiliate-disclosure').first().textContent({timeout:12000});
  const hero=page.locator('img[alt*="stained-glass dome"]').first();
  const heroImage=await decode(hero);
  const gallery=page.locator('section[aria-labelledby="destination-photo-archive"] img');
  const imageCount=await gallery.count();
  const archive=[];
  for(let i=0;i<Math.min(imageCount,3);i++) {
    const img=gallery.nth(i);
    await img.scrollIntoViewIfNeeded({timeout:15000});
    archive.push(await decode(img));
  }
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:dir+'/'+viewport+'-hotel-full.png',fullPage:true,animations:'disabled',timeout:35000});
  const data=await collect(page);
  await writeFile(dir+'/'+viewport+'-hotel.json',JSON.stringify({http:response?.status(),heroImage,archive,offer,disclosure, ...data, text:data.text.slice(0,28000),errors},null,2));

  check(response?.status()===200,viewport+': hotel HTTP '+response?.status());
  check(data.mainCount===1,viewport+': missing/duplicate main landmark: '+data.mainCount);
  check(data.h1.length===1&&data.h1[0]==='Hotel Paso del Norte',viewport+': hotel H1 '+JSON.stringify(data.h1));
  check(/Hotel Paso del Norte El Paso/.test(data.title),viewport+': missing page-specific SEO title '+data.title);
  check(data.description.length>=90&&data.description.length<=320,viewport+': meta description length '+data.description.length);
  check(data.canonical===origin+path,viewport+': canonical '+data.canonical);
  check(!/noindex/i.test(data.robots),viewport+': hotel set noindex');
  const types=data.jsonLd.flatMap(s=>{try{return [JSON.parse(s)]}catch{return []}}).flatMap(o=>o['@graph']||[o]).flatMap(o=>[o['@type']].flat());
  check(types.includes('Hotel')&&types.includes('BreadcrumbList'),viewport+': Hotel/Breadcrumb JSON-LD missing '+JSON.stringify(types));
  check(data.text.includes('79002933')&&data.text.includes('1912')&&data.text.includes('Trost')&&data.text.includes('Dome Bar')&&data.text.includes('2020'),viewport+': thin or wrong historic narrative');
  check(data.text.includes('10 Henry Trost Court')&&data.text.includes('115 El Paso Street'),viewport+': missing historical/current address distinction');
  check(data.text.includes('Research sources')||data.text.includes('Research sources and image rights'),viewport+': source bibliography not rendered');
  check(/historic home is closed through 2027 for restoration/i.test(data.text),viewport+': missing documented Magoffin Home closure in hotel nearby places');
  check(data.width <= data.viewportWidth+10,viewport+': horizontal overflow '+data.width+'/'+data.viewportWidth);
  check(heroImage.ok&&heroImage.width>=900&&/wikimedia.org/.test(heroImage.src),viewport+': hero failed to load '+JSON.stringify(heroImage));
  check(imageCount===2,viewport+': expected two archival photos, got '+imageCount);
  check(archive.length===2&&archive.every(i=>i.ok&&i.width>=500),viewport+': archive image failed '+JSON.stringify(archive));
  // Empty alt is correct for decorative logos; require meaningful alt on exactly the three historical photos.\n  check(data.images.filter(i=>/stained-glass dome|Historic American Buildings Survey|Early twentieth-century postcard/i.test(i.alt)).length===3,viewport+': three hotel photographs must have meaningful alt text');
  check(linkExists(data.links,county),viewport+': missing county link');
  check(data.links.some(h=>h.startsWith('https://www.marriott.com/en-us/hotels/elpak-')),viewport+': missing official non-affiliate booking link');
  check(offer.href.startsWith('https://www.anrdoezrs.net/links/101876465/type/dlg/https://www.hotels.com/ho114680/'),viewport+': CJ URL not scoped to verified Hotel Paso property: '+offer.href);
  check(offer.partner==='hotels.com'&&offer.placement==='hotel-paso-exact-hotel-stay',viewport+': missing CJ partner/placement tracking tags');
  check(offer.rel.includes('sponsored')&&offer.rel.includes('nofollow')&&offer.rel.includes('noopener'),viewport+': missing sponsored-safe new tab link rel');
  check(offer.text==='Check Hotel Paso del Norte on Hotels.com',viewport+': mislabeled exact hotel booking offer '+offer.text);
  check((disclosure||'').includes('Affiliate disclosure:')&&(disclosure||'').includes('Hotels.com'),viewport+': missing visible Hotels.com commission disclosure');
  check(data.text.includes('independently operated visitor options')||data.text.includes('independently operated'),viewport+': independent tour/operator disclosure absent');
  check(data.links.some(h=>h.includes('commons.wikimedia.org/wiki/File:')),viewport+': missing archival photo credits');
  check(errors.length===0,viewport+': runtime errors '+JSON.stringify(errors.slice(0,3)));
  // Verify real TanStack client navigation does not strand Hotel Paso's
  // exact-property affiliate offer on the unrelated El Paso city guide.
  const cityLink=page.locator('a[href="/city/el-paso"]:visible').first();
  const cityNav=await cityLink.count();
  if(cityNav){
    await cityLink.click({timeout:14000});
    await page.waitForURL(url=>url.pathname==='/city/el-paso',{timeout:18000});
    await page.waitForTimeout(800);
    check(await page.locator('a[data-affiliate-placement="hotel-paso-exact-hotel-stay"]').count()===0,
      viewport+': hotel-specific tracked offer persists after TanStack navigation to city guide');
  } else failures.push(viewport+': no internal El Paso city link for SPA navigation check');
  return {page:path,viewport,http:response?.status(),hero:heroImage,archive,offer:{partner:offer.partner,placement:offer.placement,rel:offer.rel,label:offer.text},spaCityNavigationChecked:Boolean(cityNav),bodyCharacters:data.text.length,documentWidth:data.width,viewportWidth:data.viewportWidth,errors};
}

async function checkInbound(page,p,viewport){
  const response=await page.goto(visitUrl(p,viewport),{waitUntil:'domcontentloaded',timeout:55000});
  await page.locator('h1').first().waitFor({state:'visible',timeout:25000});
  const data=await collect(page);
  const found=linkExists(data.links,path);
  check(!data.links.some(h=>h.startsWith('https://www.anrdoezrs.net/links/101876465/type/dlg/https://www.hotels.com/ho114680/')),viewport+': Hotel Paso CJ link present on unrelated '+p);
  check(response?.status()===200,viewport+': inbound '+p+' HTTP '+response?.status());
  check(found,viewport+': missing inbound Hotel Paso del Norte link on '+p);
  check(data.width<=data.viewportWidth+10,viewport+': inbound overflow '+p);
  await writeFile(dir+'/'+viewport+'-'+p.split('/').slice(1).join('-')+'.json',JSON.stringify({http:response?.status(),h1:data.h1,title:data.title,hotelLink:found,documentWidth:data.width,viewportWidth:data.viewportWidth},null,2));
  return {page:p,viewport,http:response?.status(),hotelLink:found};
}

async function checkMagoffin(page, viewport) {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const response = await page.goto(visitUrl(magoffin,viewport),{waitUntil:'domcontentloaded',timeout:55000});
  await page.locator('h1').first().waitFor({state:'visible',timeout:25000});
  await page.evaluate(()=>document.fonts?.ready);
  const hero = page.locator('img[alt*="Magoffin Home"]').first();
  const photo = await decode(hero);
  const data = await collect(page);
  await page.screenshot({path:dir+'/'+viewport+'-magoffin-full.png',fullPage:true,animations:'disabled',timeout:35000});
  await writeFile(dir+'/'+viewport+'-magoffin.json',JSON.stringify({status:response?.status(),photo,title:data.title,canonical:data.canonical,h1:data.h1,excerpt:data.text.slice(0,9500),width:data.width,viewportWidth:data.viewportWidth,errors},null,2));
  check(response?.status()===200,viewport+': Magoffin HTTP '+response?.status());
  check(data.h1.length===1&&/Magoffin Home/i.test(data.h1[0]),viewport+': missing Magoffin H1');
  check(data.canonical===origin+magoffin,viewport+': Magoffin canonical '+data.canonical);
  check(!/noindex/i.test(data.robots),viewport+': Magoffin noindex');
  check(/closed through 2027/i.test(data.text),viewport+': Magoffin public house-closure notice absent');
  check(photo.ok && photo.width>=900 && /magoffin.*home|magoffin_home/i.test(decodeURIComponent(photo.src).replace(/%25/g,'%')),viewport+': site-specific Magoffin photograph failed '+JSON.stringify(photo));
  check(data.width<=data.viewportWidth+10,viewport+': Magoffin horizontal overflow');
  check(errors.length===0,viewport+': Magoffin runtime errors '+JSON.stringify(errors.slice(0,3)));
  return {page:magoffin,viewport,http:response?.status(),photo,closureNoted:/closed through 2027/i.test(data.text),errors};
}

let browser;
try {
  browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',args:['--no-sandbox','--disable-dev-shm-usage']});
  for(const [viewport,width,height,isMobile] of [['mobile',390,844,true],['desktop',1366,900,false]]) {
    const context=await browser.newContext({viewport:{width,height},isMobile,hasTouch:isMobile,deviceScaleFactor:1});
    try {
      for(const [label,p] of [['hotel',path],['city',city],['county',county],['magoffin',magoffin]]){
        const page=await context.newPage();
        try {
          const result=label==='hotel'?await checkHotel(page,viewport):label==='magoffin'?await checkMagoffin(page,viewport):await checkInbound(page,p,viewport);
          reports.push(result);
          console.log('INSPECTED '+viewport+' '+p+' '+JSON.stringify(result).slice(0,900));
        }catch(error){
          failures.push(viewport+': '+p+': '+(error instanceof Error?error.stack||error.message:String(error)));
          try { await page.screenshot({path:dir+'/'+viewport+'-'+label+'-error.png',fullPage:true,timeout:15000}); } catch {}
        }finally { await page.close(); }
      }
    }finally {await context.close();}
  }
} catch(error){failures.push('Browser setup failure: '+String(error));}
finally {if(browser)await browser.close();}
await writeFile(dir+'/summary.json',JSON.stringify({ok:failures.length===0,failures,reports},null,2)+'\n');
for(const f of failures)console.error('FAIL: '+f);
if(failures.length)process.exitCode=1;else console.log('PASS: Hotel Paso del Norte: mobile+desktop history, licensed photos, exact-property CJ booking disclosure and no tracked CTA leakage, city/county backlinks and Magoffin closure.');
