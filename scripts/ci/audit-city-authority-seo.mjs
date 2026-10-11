/** Independent live SEO/structured-data/sitemap evidence for the 11-city authority pages.
 * Strictly diagnostic; preserve unknowns on transient sitemap infrastructure failures.
 * Run only after exact-SHA protected production deployment; do not certify factual claims.
 */
import {mkdir,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_CORE_PATH||'/tmp/texasdefined-city-qa/node_modules/playwright-core');
const origin=(process.env.PRODUCTION_ORIGIN||'https://texasdefined.com').replace(/\/$/,'');
const cities=['houston','dallas','fort-worth','austin','san-antonio','el-paso','arlington','hurst','corpus-christi','plano','lubbock'];
const directory='artifacts/city-authority-seo';
await mkdir(directory,{recursive:true});
const report={schema:'city-seo-independent-v1',deploymentSha:process.env.PRODUCTION_COMMIT_SHA||process.env.GITHUB_SHA||null,
  checkedAt:new Date().toISOString(),origin,source:'actual rendered DOM and separately fetched live primary sitemap',sitemap:{status:'UNVERIFIED'},cities:[]};
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN,args:['--no-sandbox']});
const ctx=await browser.newContext({viewport:{width:1440,height:900}});
try {
  // Check live primary sitemap (not a source-generated, mocked, or search-index approximation).
  // Avoid treating 429, 5xx, bot blocks or timeouts as a definitive omission.
  let locs=[];
  try {
    const response=await ctx.request.get(origin+'/sitemap.xml',{timeout:60000,maxRedirects:4});
    report.sitemap.httpStatus=response.status();
    report.sitemap.resolvedUrl=response.url();
    const xml=await response.text();
    report.sitemap.length=xml.length;
    const isXml=response.status()===200&&/\<urlset\b/.test(xml)&&/\<loc\>/.test(xml);
    report.sitemap.status=isXml?'READABLE_XML':'UNVERIFIED_RESPONSE';
    if(isXml)locs=[...xml.matchAll(/\<loc\>([^<]+)\<\/loc\>/g)].map(m=>m[1].replace(/&amp;/g,'&'));
    report.sitemap.urlCount=locs.length;
    await response.dispose();
  } catch(e) {report.sitemap.status='NETWORK_UNVERIFIED';report.sitemap.error=String(e).slice(0,500)}
  for(const slug of cities){
    const expected=origin+'/city/'+slug;
    const row={city:slug,expected,status:'UNVERIFIED',checks:{},jsonLdGraphs:[],errors:[]};
    report.cities.push(row);
    const page=await ctx.newPage();
    page.on('pageerror',error=>row.errors.push('JS: '+error.message));
    try{
      const response=await page.goto(expected,{waitUntil:'domcontentloaded',timeout:55000});
      row.httpStatus=response?.status()??null;
      await page.locator('h1').first().waitFor({state:'visible',timeout:20000});
      await page.waitForLoadState('load',{timeout:20000}).catch(()=>{});
      const dom=await page.evaluate(()=>{
        const schemas=[];
        const parseErrors=[];
        document.querySelectorAll('script[type="application/ld+json"]').forEach((script,index)=>{
          try {schemas.push(JSON.parse(script.textContent||''));}
          catch(error) {parseErrors.push({index,error:String(error)});}
        });
        return {
          canonical:document.querySelector('link[rel="canonical"]')?.href||null,
          robots:document.querySelector('meta[name="robots"]')?.content||'',
          h1:[...document.querySelectorAll('h1')].map(x=>x.textContent?.trim()||''),
          schemaCount:document.querySelectorAll('script[type="application/ld+json"]').length,
          parseErrors,schemas
        }
      });
      row.canonical=dom.canonical;row.h1=dom.h1;row.schemaCount=dom.schemaCount;
      row.schemaParseErrors=dom.parseErrors;row.robots=dom.robots;
      const nodes=[];
      function unpack(root){
        if(Array.isArray(root)){for(const n of root)unpack(n);return;}
        if(!root||typeof root!=='object')return;
        if(root['@graph'])unpack(root['@graph']);
        if(root['@type'])nodes.push(root);
      }
      dom.schemas.forEach(unpack);
      row.jsonLdGraphs=nodes.map(n=>({type:n['@type'],id:n['@id'],url:n.url,name:n.name,itemListLength:n.itemListElement?.length||0}));
      const cityNodes=nodes.filter(n=>[].concat(n['@type']).includes('City')&&n.url===expected);
      const breadcrumbNodes=nodes.filter(n=>[].concat(n['@type']).includes('BreadcrumbList')&&
        Array.isArray(n.itemListElement)&&n.itemListElement.some(x=>x.item===expected));
      row.checks.http=row.httpStatus===200?'PASS':'FAIL';
      row.checks.canonical=dom.canonical===expected?'PASS':'FAIL';
      row.checks.h1=dom.h1.length===1&&dom.h1[0].toLowerCase()===slug.replaceAll('-',' ')?'PASS':'FAIL';
      row.checks.robots=!/\bnoindex\b/i.test(dom.robots)?'PASS':'FAIL';
      row.checks.jsonLdSyntax=dom.parseErrors.length===0&&dom.schemaCount>0?'PASS':'FAIL';
      row.checks.cityJsonLd=cityNodes.length>=1?'PASS':'FAIL';
      row.checks.breadcrumbJsonLd=breadcrumbNodes.length>=1?'PASS':'FAIL';
      row.checks.sitemap=report.sitemap.status==='READABLE_XML'
        ? (locs.includes(expected)?'PASS':'FAIL') : 'UNVERIFIED';
      row.status=Object.values(row.checks).includes('FAIL')?'FAIL':
        Object.values(row.checks).includes('UNVERIFIED')?'PARTIAL':'PASS_AUTOMATED_ONLY';
    }catch(e){row.errors.push(String(e));row.status='UNVERIFIED';}
    finally{await page.close();}
    console.log('CITY SEO '+slug+' '+JSON.stringify({status:row.status,checks:row.checks,errors:row.errors}));
  }
}finally{
  await ctx.close();await browser.close();
  await writeFile(directory+'/evidence.json',JSON.stringify(report,null,2)+'\n');
}
const totals={cities:report.cities.length,pass:report.cities.filter(x=>x.status==='PASS_AUTOMATED_ONLY').length,
  partial:report.cities.filter(x=>x.status==='PARTIAL').length,fail:report.cities.filter(x=>x.status==='FAIL').length,
  unverified:report.cities.filter(x=>x.status==='UNVERIFIED').length,sitemap:report.sitemap.status};
console.log('CITY SEO DIAGNOSTIC '+JSON.stringify(totals));
console.log('Automated SEO integrity is not an independent factual, GIS or accessibility certificate.');
