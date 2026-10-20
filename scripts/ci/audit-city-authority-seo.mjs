/**
 * Independent production 11-city canonical/schema/sitemap evidence inventory.
 * Research-only. JSON-LD validity does NOT imply Google rich result eligibility.
 * Never mark a city fully certified from this alone.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-city-qa/node_modules/playwright-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const slugs = ['houston','dallas','fort-worth','austin','san-antonio','el-paso','arlington','hurst','corpus-christi','plano','lubbock'];
const out = 'artifacts/city-authority-seo';
await mkdir(out,{recursive:true});
const report = {
  provenance: {createdAtUtc:new Date().toISOString(), origin, revision:process.env.PRODUCTION_COMMIT_SHA || process.env.GITHUB_SHA || null,
    caveat:'Live research inventory only; manual source accuracy, governance and Google Search Console indexing are not certified'},
  sitemap:{status:'UNVERIFIED',http:null,url:origin+'/sitemap.xml',retrieved:false,bytes:0,locCounts:0,error:null},
  city:[], summary:{visited:0,routeHttp200:0,validCityGraphs:0,validBreadcrumbGraphs:0,sitemapListed:0,needsReview:[]}
};
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN,args:['--no-sandbox']});
let sitemapLocs=[];
try {
  const context=await browser.newContext({viewport:{width:1440,height:900}});
  const request=context.request;
  try {
    const resp=await request.get(origin+'/sitemap.xml',{timeout:55000,maxRedirects:5});
    report.sitemap.http=resp.status();
    report.sitemap.headerFallback=resp.headers()['x-texasdefined-sitemap-fallback']||null;
    report.sitemap.contentType=resp.headers()['content-type']||null;
    const xml=await resp.text();
    report.sitemap.bytes=Buffer.byteLength(xml,'utf8');
    // Strict match on XML location elements only; URL strings elsewhere do not count.
    sitemapLocs=[...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(m=>m[1].trim().replaceAll('&amp;','&'));
    report.sitemap.locCounts=sitemapLocs.length;
    report.sitemap.retrieved=true;
    report.sitemap.status=resp.status()===200&&/^\s*<\?xml/.test(xml)&&xml.includes('<urlset')?'FETCHED_XML':'INVALID_OR_FALLBACK';
    await resp.dispose();
  } catch(e) {report.sitemap.error=String(e).slice(0,380);}
  const sitemapSet=new Set(sitemapLocs);
  for(const slug of slugs){
    const url=origin+'/city/'+slug;
    const row={slug,url,status:'UNVERIFIED',http:null,canonical:null,title:null,robots:null,
      h1:null,schemas:[],citySchema:null,breadcrumbSchema:null,listedInPrimarySitemap:sitemapSet.has(url),errors:[]};
    report.city.push(row);report.summary.visited++;
    const page=await context.newPage();
    page.on('pageerror',e=>row.errors.push('JS:'+e.message));
    try {
      const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:55000});
      row.http=response?.status()||null;
      await page.locator('h1').first().waitFor({state:'visible',timeout:18000});
      await page.waitForLoadState('load',{timeout:16000}).catch(()=>{});
      const values=await page.evaluate(()=>{
        const schemas=[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>s.textContent||'');
        return {title:document.title,canonical:document.querySelector('link[rel="canonical"]')?.href||null,
          robots:document.querySelector('meta[name="robots"]')?.content||'',
          h1:[...document.querySelectorAll('h1')].map(e=>e.textContent?.trim()),
          schemas};
      });
      row.title=values.title;row.canonical=values.canonical;row.robots=values.robots;row.h1=values.h1;
      const nodes=[];
      for(const source of values.schemas){
        try{
          const parsed=JSON.parse(source);
          if(Array.isArray(parsed))nodes.push(...parsed);
          else if(Array.isArray(parsed['@graph']))nodes.push(...parsed['@graph']);
          else nodes.push(parsed);
        }catch(e){row.errors.push('INVALID_JSONLD:'+String(e).slice(0,180));}
      }
      row.schemas=nodes.map(n=>({type:n['@type'],id:n['@id'],url:n.url,name:n.name})).slice(0,40);
      const cityNodes=nodes.filter(n=>n['@type']==='City' || (Array.isArray(n['@type'])&&n['@type'].includes('City')));
      const matching=cityNodes.find(n=>n.url===url&&n.name?.toLowerCase()===slug.replaceAll('-',' '));
      row.citySchema=matching?{status:'PASS_AUTOMATED_ONLY',id:matching['@id'],sameAs:matching.sameAs,
        geo:matching.geo,description:matching.description?.slice(0,190)}:
        {status:'REVIEW_REQUIRED',found:cityNodes.map(x=>({url:x.url,name:x.name}))};
      const crumbs=nodes.filter(n=>n['@type']==='BreadcrumbList');
      const good=crumbs.find(n=>Array.isArray(n.itemListElement)&&n.itemListElement.some(item=>item.position===3&&item.item===url));
      row.breadcrumbSchema=good?{status:'PASS_AUTOMATED_ONLY',count:good.itemListElement.length}:
        {status:'REVIEW_REQUIRED',count:crumbs.length};
      row.status=row.http===200&&row.canonical===url&&row.h1?.length===1&&!/noindex/i.test(row.robots)
        ?'PASS_AUTOMATED_ROUTE':'REVIEW_REQUIRED';
    }catch(e){row.errors.push(String(e).slice(0,360));row.status='REVIEW_REQUIRED'}
    await page.close();
    if(row.http===200)report.summary.routeHttp200++;
    if(row.citySchema?.status==='PASS_AUTOMATED_ONLY')report.summary.validCityGraphs++;
    if(row.breadcrumbSchema?.status==='PASS_AUTOMATED_ONLY')report.summary.validBreadcrumbGraphs++;
    if(row.listedInPrimarySitemap)report.summary.sitemapListed++;
    if(row.status!=='PASS_AUTOMATED_ROUTE'||row.citySchema?.status!=='PASS_AUTOMATED_ONLY'||
      row.breadcrumbSchema?.status!=='PASS_AUTOMATED_ONLY'||!row.listedInPrimarySitemap||row.errors.length)
      report.summary.needsReview.push(slug);
    console.log('CITY SEO',slug,JSON.stringify({route:row.status,citySchema:row.citySchema?.status,breadcrumb:row.breadcrumbSchema?.status,sitemap:row.listedInPrimarySitemap,errors:row.errors.slice(0,2)}));
  }
  await context.close();
}finally{
  await browser.close();
  await writeFile(out+'/research.json',JSON.stringify(report,null,2)+'\n');
}
console.log('CITY SEO research summary',JSON.stringify(report.summary));
console.log('DO NOT certify schema legal correctness, indexing or factual freshness from automated success');
