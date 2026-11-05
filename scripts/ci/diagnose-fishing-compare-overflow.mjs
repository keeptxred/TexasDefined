import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("/tmp/texasdefined-fishing-overflow-qa/node_modules/playwright-core");
const browser = await chromium.launch({headless: true, executablePath:process.env.CHROME_BIN || "/usr/bin/google-chrome",args:["--no-sandbox","--disable-dev-shm-usage"]});
for (const viewport of [{width:1366,height:900},{width:390,height:844}]) {
  const ctx = await browser.newContext({viewport,deviceScaleFactor:1,isMobile:viewport.width<500,hasTouch:viewport.width<500});
  const page = await ctx.newPage();
  await page.goto("https://texasdefined.com/fishing/compare?lake1=lake-conroe&lake2=lake-abilene&lake3=sam-rayburn-reservoir",{waitUntil:"domcontentloaded",timeout:60000});
  await page.getByRole("heading",{name:"Compare Texas Fishing Lakes Side by Side"}).waitFor({state:"visible",timeout:20000});
  const result = await page.evaluate(() => {
    const vw = window.innerWidth;
    const docw = document.documentElement.scrollWidth;
    const elements = Array.from(document.body.querySelectorAll("*"));
    const describe = e => {
      const r = e.getBoundingClientRect(),c=getComputedStyle(e);
      let parent=e.parentElement,scrollParent=null;
      while(parent && parent!==document.body) {
        const pc=getComputedStyle(parent);
        if (/(auto|scroll)/.test(pc.overflowX) && parent.scrollWidth>parent.clientWidth+3) {
          scrollParent={tag:parent.tagName,cl:String(parent.className).slice(0,120),scrollWidth:parent.scrollWidth,clientWidth:parent.clientWidth};break;
        }
        parent=parent.parentElement;
      }
      return {tag:e.tagName,cl:String(e.className).slice(0,180),text:e.textContent?.trim().slice(0,80),left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width),scrollWidth:e.scrollWidth,clientWidth:e.clientWidth,overflowX:c.overflowX,minWidth:c.minWidth,display:c.display,scrollParent};
    };
    const outside = elements.filter(e=>{const r=e.getBoundingClientRect();return r.width && (r.right>vw+8 || r.left < -8);}).map(describe).sort((a,b)=>b.right-a.right).slice(0,35);
    const outer = elements.filter(e => {const c=getComputedStyle(e);return /(auto|scroll|hidden|clip)/.test(c.overflowX) && e.scrollWidth>e.clientWidth+4}).map(describe).slice(0,35);
    return {viewport:vw,client:document.documentElement.clientWidth,docw,bodyw:document.body.scrollWidth,delta:docw-vw,outside,outer,topLevel:[...document.body.children].map(describe)};
  });
  console.log(JSON.stringify({viewport:viewport.width,result},null,2));
  await ctx.close();
}

for (const viewport of [{width:1366,height:900},{width:390,height:844}]) {
  const ctx = await browser.newContext({viewport,deviceScaleFactor:1,isMobile:viewport.width<500,hasTouch:viewport.width<500});
  const page = await ctx.newPage();
  await page.goto("https://texasdefined.com/fishing/lakes",{waitUntil:"domcontentloaded",timeout:60000});
  await page.getByRole("searchbox",{name:"Lake, county or city"}).waitFor({state:"visible",timeout:15000});
  for (const slug of ["lake-conroe","lake-abilene","sam-rayburn-reservoir"]) {
    await page.locator('section[aria-labelledby="lake-directory-heading"] article').filter({has:page.locator('h3 a[href="/fishing/lakes/' + slug + '"]')}).getByRole("checkbox",{name:"Compare this lake"}).check();
  }
  await page.getByRole("link",{name:/Compare 3 selected lakes/}).click();
  await page.getByRole("heading",{name:"Compare Texas Fishing Lakes Side by Side"}).waitFor({state:"visible",timeout:25000});
  const measure=()=>page.evaluate(()=>({location:location.pathname+location.search,innerWidth:innerWidth,docWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,scrollX:window.scrollX,elementWidth:document.querySelector("main")?.scrollWidth,windowWidth:document.documentElement.clientWidth,tableSection:(()=>{let e=document.querySelector('section.overflow-x-auto');return e?{scrollWidth:e.scrollWidth,clientWidth:e.clientWidth,bounds:e.getBoundingClientRect().toJSON()}:null})()}));
  const snapshots={now:await measure()};
  await page.waitForTimeout(100);
  snapshots.after100ms=await measure();
  await page.waitForTimeout(500);
  snapshots.after600ms=await measure();
  await page.evaluate(()=>document.fonts.ready);
  snapshots.afterFonts=await measure();
  await page.waitForTimeout(1200);
  snapshots.after1800ms=await measure();
  console.log(JSON.stringify({kind:"link-navigation",viewport:viewport.width,snapshots},null,2));
  await ctx.close();
}

await browser.close();
