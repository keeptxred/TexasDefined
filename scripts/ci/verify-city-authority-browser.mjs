import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-city-qa/node_modules/playwright-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const slugs = ['houston','dallas','fort-worth','austin','san-antonio','el-paso','arlington','hurst','corpus-christi','plano','lubbock'];
const viewports = [['mobile',390,844],['tablet',768,1024],['desktop',1440,900]];
const output = 'artifacts/city-authority-browser';
await mkdir(output,{recursive:true});
const results=[];
let browser;
for (const [viewport,width,height] of viewports) {
  // Isolated process per viewport to reduce cross-context hydration interference.
  browser = await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN,args:['--no-sandbox']});
  for (const slug of slugs) {
    const context = await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
    const page = await context.newPage();
    const row={city:slug,viewport,checks:{},errors:[],brokenImages:[],internalLinkProblems:[]};
    results.push(row);
    page.on('pageerror',e=>row.errors.push('JS: '+e.message));
    page.on('response',r=>{if(r.status()>=400 && r.url().startsWith(origin))row.errors.push('HTTP '+r.status()+': '+r.url());});
    try {
      const response=await page.goto(origin+'/city/'+slug,{waitUntil:'domcontentloaded',timeout:55000});
      row.checks.http=response?.status()===200?'PASS':'FAIL';
      await page.locator('h1').first().waitFor({state:'visible',timeout:20000});
      await page.waitForLoadState('load',{timeout:20000}).catch(()=>{});
      const data=await page.evaluate(()=>{
        const imgs=[...document.images].map(i=>({src:i.currentSrc||i.src,alt:i.getAttribute('alt'),hasAlt:i.hasAttribute('alt'),decorative:i.getAttribute('alt')==='',complete:i.complete,naturalWidth:i.naturalWidth}));
        const links=[...document.querySelectorAll('main a[href]')].map(a=>({href:a.href,label:a.innerText.trim()||a.getAttribute('aria-label')||''}));
        const headings=[...document.querySelectorAll('h1')].map(e=>e.textContent.trim());
        const canonical=document.querySelector('link[rel="canonical"]')?.href;
        const robots=document.querySelector('meta[name="robots"]')?.content||'';
        const description=document.querySelector('meta[name="description"]')?.content||'';
        const og=document.querySelector('meta[property="og:image"]')?.content||'';
        const overflow=document.documentElement.scrollWidth-window.innerWidth;
        const focusable=[...document.querySelectorAll('main a[href],main button,main input')].filter(e=>e.getClientRects().length);
        return {imgs,links,headings,canonical,robots,description,og,overflow,focusable:focusable.length};
      });
      row.checks.h1=data.headings.length===1 && data.headings[0].toLowerCase()===slug.replaceAll('-',' ')?'PASS':'FAIL';
      row.checks.canonical=data.canonical===origin+'/city/'+slug?'PASS':'FAIL';
      row.checks.description=data.description.length>=70?'PASS':'FAIL';
      row.checks.indexable=!/noindex/i.test(data.robots)?'PASS':'FAIL';
      row.checks.og=data.og?'PASS':'FAIL';
      row.checks.overflow=data.overflow<=10?'PASS':'FAIL';
      row.horizontalOverflowPixels=data.overflow;
      row.imageCount=data.imgs.length;
      row.brokenImages=data.imgs.filter(i=>i.complete&&i.naturalWidth===0);
      row.checks.images=row.brokenImages.length?'FAIL':'PASS';
      row.missingAltImages=data.imgs.filter(i=>!i.hasAlt).map(i=>i.src);
      row.decorativeImageCount=data.imgs.filter(i=>i.decorative).length;
      row.checks.imageAlternatives=row.missingAltImages.length===0?'PASS':'FAIL';
      row.checks.internalLinkPresence=data.links.some(l=>l.href.startsWith(origin+'/'))?'PASS':'FAIL';
      if (slug === 'fort-worth') {
        const expected = origin + '/destination/kimbell-art-museum-fort-worth';
        const obsolete = origin + '/destination/kimbell-art-museum';
        const relevant = data.links.filter(link => /\/destination\/kimbell-art-museum/.test(link.href));
        row.kimbellLinks = relevant;
        row.checks.kimbellCanonicalLink = relevant.length >= 2 && relevant.every(link => link.href === expected) ? 'PASS' : 'FAIL';
        row.checks.kimbellObsoleteLinkAbsent = data.links.every(link => link.href !== obsolete) ? 'PASS' : 'FAIL';
        const destination = await page.request.get(expected, { timeout: 20000 });
        row.checks.kimbellDestinationHttp = destination.status() === 200 ? 'PASS' : 'FAIL';
      }
      row.checks.keyboardTargets=data.focusable?'PASS':'NOT TESTED';
      // Actual keyboard events rather than source-only counts. A real focused element
      // should be reached by Tab and its focus should remain observable.
      // Navigate multiple Tab stops: browser shell controls may precede the
      // first visible interactive target in the page's actual focus order.
      row.keyboardEvidence = [];
      for(let tab = 0; tab < 12; tab++) {
        await page.keyboard.press('Tab');
        row.keyboardEvidence.push(await page.evaluate(() => {
          const el = document.activeElement;
          return {tag:el?.tagName || '', name:(el?.getAttribute('aria-label') ||
            el?.textContent?.trim().slice(0,80) || el?.getAttribute('title') || ''),
            visible:!!el?.getClientRects().length,
            focusVisible:!!el?.matches?.(':focus-visible')};
        }));
      }
      row.checks.keyboardNavigation = row.keyboardEvidence.some(f=>
        f.visible && f.tag !== 'BODY' && f.tag !== 'HTML') ? 'PASS' : 'FAIL';
      // Independently exercise the actual mobile/tablet navigation menu, not
      // merely keyboard focus on page links. Includes accessible labeling,
      // aria-expanded state and 44x44 CSS-pixel touch target dimensions.
      if (viewport !== 'desktop') {
        const menuToggle=page.locator('button[aria-controls="mobile-main-menu"]').first();
        row.menuEvidence={};
        try {
          row.menuEvidence.buttonVisible=await menuToggle.isVisible();
          const before=await menuToggle.evaluate(el=>({
            label:el.getAttribute('aria-label')||'',
            expanded:el.getAttribute('aria-expanded'),
            width:Math.round(el.getBoundingClientRect().width),
            height:Math.round(el.getBoundingClientRect().height)
          }));
          row.menuEvidence.before=before;
          await menuToggle.click();
          row.menuEvidence.expanded=await menuToggle.getAttribute('aria-expanded');
          row.menuEvidence.menuVisible=await page.locator('#mobile-main-menu nav[aria-label="Main menu"]').isVisible();
          row.menuEvidence.menuLinkCount=await page.locator('#mobile-main-menu nav a').count();
          await menuToggle.click();
          row.menuEvidence.collapsed=await menuToggle.getAttribute('aria-expanded');
          row.menuEvidence.menuHidden=!(await page.locator('#mobile-main-menu').isVisible());
          row.checks.mobileMenuInteraction=row.menuEvidence.buttonVisible &&
            before.label.trim().length>0 && before.expanded==='false' &&
            before.width>=44 && before.height>=44 &&
            row.menuEvidence.expanded==='true' && row.menuEvidence.menuVisible &&
            row.menuEvidence.menuLinkCount>0 &&
            row.menuEvidence.collapsed==='false' && row.menuEvidence.menuHidden?'PASS':'FAIL';
        }catch(error){
          row.menuEvidence.error=String(error);
          row.checks.mobileMenuInteraction='FAIL';
        }
      }
      // Retry transient network errors once; preserve failures, URLs and status
      // codes, do not whitelist persistent broken links.
      const sample = [...new Set(data.links
        .filter(l=>l.href.startsWith(origin+'/') && !l.href.includes('#'))
        .map(l=>l.href))].slice(0,12);
      row.linkSample = [];
      for(const href of sample) {
        const attempts=[];
        for(let attempt=0;attempt<2;attempt++) {
          try {
            const res=await page.request.get(href,{timeout:20000,maxRedirects:5});
            attempts.push({status:res.status()});
            if(res.status()>=200 && res.status()<400)break;
          }catch(error){attempts.push({error:String(error)});}
        }
        const final=attempts[attempts.length-1];
        row.linkSample.push({href,...final,attempts});
      }
      row.checks.internalLinkSample = row.linkSample.length &&
        row.linkSample.every(l=>l.status>=200 && l.status<400) ? 'PASS' : 'FAIL';
      if(row.checks.keyboardNavigation==='FAIL' || row.checks.internalLinkSample==='FAIL') {
        console.error('CITY DIAGNOSTIC',slug,viewport,JSON.stringify({
          keyboardEvidence:row.keyboardEvidence,
          failedLinks:row.linkSample.filter(l=>!(l.status>=200 && l.status<400))
        }));
      }
      row.linkCount=data.links.length;
      // Keyboard QA can auto-scroll the document to a focused anchor. A screenshot
      // of that scroll position misses the page title and is unsuitable as a
      // top-of-page visual QA artifact. Preserve focus evidence before blurring.
      await page.evaluate(() => {
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
        window.scrollTo({top: 0, behavior: 'instant'});
      });
      await page.waitForFunction(() => window.scrollY === 0, undefined, {timeout: 3000}).catch(() => {});
      row.screenshotScrollY = await page.evaluate(() => window.scrollY);
      row.checks.screenshotTop = row.screenshotScrollY === 0 ? 'PASS' : 'FAIL';
      await page.screenshot({path:output+'/'+slug+'-'+viewport+'.png',fullPage:false,animations:'disabled'});
      // Additional full-page desktop evidence for actual manual editorial review.
      // This file alone does not certify contrast, keyboard order, or aesthetics.
      if (viewport === 'desktop') {
        // A fullPage screenshot does NOT imply the browser scrolled into
        // below-the-fold loading="lazy" images. The earlier retained Houston,
        // Fort Worth and Austin captures had apparently empty hero slots, so
        // proactively visit every viewport-height before full-page capture.
        await page.evaluate(async () => {
          const step = Math.max(500, Math.floor(window.innerHeight * 0.8));
          for (let y = 0, scans = 0; scans < 100 && y <= document.documentElement.scrollHeight; y += step, scans++) {
            window.scrollTo({top:y,behavior:'instant'});
            await new Promise(resolve => setTimeout(resolve, 90));
          }
        });
        await page.waitForFunction(() => [...document.querySelectorAll('main img')].every(img => img.complete), undefined, {timeout:5000}).catch(() => {});
        row.fullPageImageEvidence = await page.evaluate(() => [...document.querySelectorAll('main img')].map(img => ({
          src: img.currentSrc || img.src,
          alt: img.getAttribute('alt'),
          loading: img.getAttribute('loading'),
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          renderedWidth: Math.round(img.getBoundingClientRect().width),
          renderedHeight: Math.round(img.getBoundingClientRect().height),
          status: img.complete && img.naturalWidth > 0 ? 'LOADED' : (img.complete ? 'FAILED' : 'PENDING')
        })));
        row.fullPageImageReadiness = {
          loaded: row.fullPageImageEvidence.filter(img => img.status === 'LOADED').length,
          failed: row.fullPageImageEvidence.filter(img => img.status === 'FAILED').length,
          pending: row.fullPageImageEvidence.filter(img => img.status === 'PENDING').length
        };
        row.checks.fullPageImageReadiness = row.fullPageImageReadiness.failed === 0 && row.fullPageImageReadiness.pending === 0 ? 'PASS' : 'REVIEW';
        await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'}));
        await page.waitForFunction(() => window.scrollY === 0, undefined, {timeout:3000}).catch(() => {});
        row.fullPageScreenshotScrollY = await page.evaluate(() => window.scrollY);
        row.checks.fullPageScreenshotTop = row.fullPageScreenshotScrollY === 0 ? 'PASS' : 'FAIL';
        await page.screenshot({path:output+'/'+slug+'-desktop-full.png',fullPage:true,animations:'disabled'});
      }
      row.checks.javascript=row.errors.filter(x=>x.startsWith('JS:')).length?'FAIL':'PASS';
    }catch(e){row.errors.push(String(e));row.checks.render='FAIL';}
    finally{await context.close();}
    console.log(slug,viewport,JSON.stringify(row.checks));
  }
  await browser.close();browser=null;
}
await writeFile(output+'/results.json',JSON.stringify({capturedAt:new Date().toISOString(),origin,results},null,2)+'\n');
const failures=results.filter(r=>Object.values(r.checks).includes('FAIL')||r.errors.length);
console.log('CITY QA: '+(results.length-failures.length)+'/'+results.length+' viewport runs without failures. Full manual accessibility and factual QA NOT TESTED.');
if(failures.length)process.exitCode=1;
