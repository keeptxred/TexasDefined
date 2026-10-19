import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const { chromium, request } = createRequire(import.meta.url)('/tmp/td-county-qa/node_modules/playwright-core');
const site = 'https://texasdefined.com';
const path = '/texas-data/city-county-relationships';
const dir = 'artifacts/city-county-production';
const stamp = (process.env.TARGET_DEPLOY_SHA || process.env.GITHUB_SHA || 'manual').slice(0,12) + '-' + Date.now();
const headers = ['city_name','city_slug','place_type','primary_directory_county','all_counties','county_count','region','county_registry_match'];
// Pull-request checks hit the previously deployed revision, while workflow_run
// checks must enforce the new deployed count after protected production release.
const isPredeployPR = process.env.GITHUB_EVENT_NAME === 'pull_request';
const expected = {
  Abilene: 'Taylor; Jones', 'Corpus Christi': 'Nueces; Aransas; Kleberg; San Patricio',
  Dallas: 'Dallas; Collin; Denton; Kaufman; Rockwall',
  'Fort Worth': 'Tarrant; Denton; Johnson; Parker; Wise',
  Mesquite: 'Dallas; Kaufman', 'San Antonio': 'Bexar; Comal; Medina',
  'Port Arthur': 'Jefferson; Orange', 'Wichita Falls': 'Wichita; Archer; Clay',
  Houston: 'Harris; Fort Bend; Montgomery', Katy: 'Harris; Fort Bend; Waller',
  Austin: 'Travis; Hays; Williamson', Pearland: 'Brazoria; Fort Bend; Harris',
  Frisco: 'Collin; Denton', Plano: 'Collin; Denton',
  'San Marcos': 'Hays; Caldwell; Guadalupe', 'New Braunfels': 'Comal; Guadalupe',
  'Grand Prairie': 'Dallas; Ellis; Tarrant', 'The Woodlands': 'Montgomery; Harris'
};
const report = {checkedAt:new Date().toISOString(),expectedSha:process.env.TARGET_DEPLOY_SHA||'', csv:null,viewports:[],links:[],failures:[]};
const fail = (label,e) => {const msg=label+': '+(e?.stack||String(e));report.failures.push(msg);console.error('FAIL '+msg);};
function parseCsv(s) {
  const rows=[];let row=[],value='',quoted=false;
  for(let i=0;i<s.length;i++){const ch=s[i];
    if(ch==='"'){if(quoted&&s[i+1]==='"'){value+='"';i++;}else quoted=!quoted;}
    else if(ch===','&&!quoted){row.push(value);value='';}
    else if((ch==='\n'||ch==='\r')&&!quoted){if(ch==='\r'&&s[i+1]==='\n')i++;row.push(value);value='';if(row.some(Boolean))rows.push(row);row=[];}
    else value+=ch;
  }
  if(quoted)throw new Error('Unclosed CSV quote');
  if(row.length||value){row.push(value);if(row.some(Boolean))rows.push(row);}
  return rows;
}
await mkdir(dir,{recursive:true});
let browser,api,records;
try {
  api=await request.newContext({timeout:30000,extraHTTPHeaders:{'cache-control':'no-cache','user-agent':'TexasDefined-CityCounty-QA'}});
  try{
    const res=await api.get(site+path+'.csv?qa='+stamp);
    const body=await res.text();await writeFile(dir+'/production.csv',body);
    assert.equal(res.status(),200,'CSV HTTP');
    assert.match(res.headers()['content-type']||'',/text\/csv/i);
    assert.match(res.headers()['content-disposition']||'',/attachment/i);
    assert.notEqual(res.headers()['cf-mitigated'],'challenge');
    const rows=parseCsv(body);assert.deepEqual(rows[0],headers);
    assert.equal(rows.length-1,57,'Directory row count');
    records=rows.slice(1).map(values=>{assert.equal(values.length,headers.length);return Object.fromEntries(headers.map((h,i)=>[h,values[i]]));});
    assert.equal(new Set(records.map(r=>r.city_name)).size,57);
    for(const r of records){
      const counties=r.all_counties.split(';').map(s=>s.trim());
      assert.equal(Number(r.county_count),counties.length,r.city_name);
      assert.equal(r.primary_directory_county,counties[0],r.city_name);
      assert.equal(new Set(counties).size,counties.length,r.city_name+' duplicates');
      assert.ok(counties.every(Boolean),r.city_name+' empty county');
      assert.equal(r.county_registry_match,'matched',r.city_name);
      if(r.city_name==='San Antonio'&&isPredeployPR){
        const text=counties.join('; ');
        assert.ok(['Bexar County; Comal County','Bexar County; Comal County; Medina County'].includes(text),
          'Pre-deploy San Antonio mapping must be the old or newly released dataset');
      }else if(expected[r.city_name])assert.deepEqual(counties,expected[r.city_name].split('; ').map(s=>s+' County'),r.city_name);
    }
    const multiCountyCount=records.filter(r=>Number(r.county_count)>1).length;
    if(isPredeployPR)assert.ok([30,31].includes(multiCountyCount),'Predeploy current production must be old or new count');
    else assert.equal(multiCountyCount,31,'Released city/county dataset must contain 31 multi-county places');
    assert.equal(records.find(r=>r.city_name==='The Woodlands')?.place_type,'census_designated_place');
    report.csv={status:200,rows:57,multiCounty:multiCountyCount,mode:isPredeployPR?'predeploy':'postdeploy',bytes:Buffer.byteLength(body),result:'PASS'};
    console.log('PASS live CSV — 57 rows, '+multiCountyCount+' multi-county, authoritative examples, downloadable format');
  }catch(e){report.csv={result:'FAIL'};fail('CSV',e);}
  browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN,args:['--no-sandbox','--disable-dev-shm-usage']});
  for(const [name,width,height,mobile] of [['desktop',1280,850,false],['mobile',390,844,true],['small-mobile',320,700,true]]){
    const info={name,width,height};report.viewports.push(info);
    const context=await browser.newContext({viewport:{width,height},isMobile:mobile,hasTouch:mobile});
    const page=await context.newPage();
    const jsErrors=[];page.on('pageerror',e=>jsErrors.push(e.message));
    try{
      const res=await page.goto(site+path+'?qa='+stamp+'-'+name,{waitUntil:'domcontentloaded',timeout:45000});
      assert.equal(res?.status(),200);
      await page.locator('table tbody tr').first().waitFor({state:'attached',timeout:15000});
      const d=await page.evaluate(()=>{
        const t=document.querySelector('table'),b=t.parentElement;
        const rows=[...t.querySelectorAll('tbody tr')].map(tr=>{const c=tr.querySelectorAll('td');
          return {name:c[0].firstChild?.textContent?.trim(),type:c[0].textContent,
            counties:[c[1].textContent.trim(),...(c[2].textContent.trim()==='—'?[]:c[2].textContent.split(',').map(s=>s.trim()))],
            countyLinks:[...c[1].querySelectorAll('a'),...c[2].querySelectorAll('a')].map(a=>a.getAttribute('href')),
            cityGuide:c[4].querySelector('a')?.getAttribute('href'),cityGuideLabel:c[4].textContent};
        });
        const ld=[...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(el=>{
          try{const x=JSON.parse(el.textContent);return x['@graph']||[x];}catch{return [];}
        });
        return {rows,ld,title:document.title,canonical:document.querySelector('link[rel=canonical]')?.href,
          desc:document.querySelector('meta[name=description]')?.content,h1:document.querySelector('h1')?.textContent,
          csvLink:!!document.querySelector('a[href="/texas-data/city-county-relationships.csv"]'),
          addressLink:!!document.querySelector('a[href="/find-my-county"]'),
          breadcrumbs:[...document.querySelectorAll('nav[aria-label=Breadcrumb] a')].map(a=>a.getAttribute('href')),
          overflow:getComputedStyle(b).overflowX,pageWidth:document.documentElement.scrollWidth,
          windowWidth:innerWidth,tableWidth:t.scrollWidth,boxWidth:b.clientWidth,
          fontSize:parseFloat(getComputedStyle(t.querySelector('td')).fontSize)};
      });
      info.geometry={pageWidth:d.pageWidth,windowWidth:d.windowWidth,tableWidth:d.tableWidth,boxWidth:d.boxWidth,overflow:d.overflow};
      assert.match(d.title,/City-to-County Reference/);assert.match(d.desc||'',/multi-county/i);
      assert.equal(d.canonical,site+path);assert.match(d.h1,/What county is a Texas city in/i);
      assert.equal(d.rows.length,57);assert.ok(d.csvLink&&d.addressLink);
      assert.ok(d.breadcrumbs.includes('/')&&d.breadcrumbs.includes('/texas-data'));
      assert.equal(d.overflow,'auto');assert.ok(d.pageWidth<=d.windowWidth+10,'Page-wide horizontal overflow');
      assert.ok(d.fontSize>=13,'Unreadably small table text');
      assert.equal(jsErrors.length,0,'Browser errors: '+jsErrors.join('; '));
      if(records){
        const found=new Map(d.rows.map(r=>[r.name,r]));assert.equal(found.size,57);
        for(const record of records){
          const row=found.get(record.city_name);assert.ok(row,record.city_name+' row missing');
          assert.deepEqual(row.counties,record.all_counties.split(';').map(s=>s.trim()),record.city_name+' CSV/table conflict');
          assert.equal(row.countyLinks.length,row.counties.length,record.city_name+' linked counties');
          assert.ok(row.countyLinks.every(s=>s?.startsWith('/county/')),record.city_name+' county URLs');
          assert.ok(row.cityGuide?.startsWith('/city/'),record.city_name+' city guide');
        }
        assert.match(found.get('The Woodlands').type,/Census-designated place/);
        assert.match(found.get('The Woodlands').cityGuideLabel,/Place guide/);
        const dataset=d.ld.find(s=>s['@type']==='Dataset');
        assert.ok(dataset&&d.ld.some(s=>s['@type']==='BreadcrumbList'));
        assert.equal(dataset.distribution?.contentUrl,site+path+'.csv');
        assert.equal(dataset.variableMeasured?.length,57);
        for(const record of records){
          const item=dataset.variableMeasured.find(s=>s.name===record.city_name);
          assert.equal(item?.value,record.all_counties.split(';').map(s=>s.trim()).join(', '),record.city_name+' JSON-LD');
        }
      }
      info.result='PASS';console.log('PASS '+name+' — page, links, CSV, JSON-LD, mobile layout');
    }catch(e){info.result='FAIL';fail(name,e);}
    try{await page.screenshot({path:dir+'/'+name+'.png',fullPage:true,animations:'disabled',timeout:30000});info.screenshot=true;}
    catch(e){fail(name+' screenshot',e);}
    await context.close();
  }
  for(const path of ['/find-my-county','/texas-data','/county/jones','/county/orange','/county/harris','/city/katy','/city/dallas','/city/the-woodlands']){
    try{const r=await api.get(site+path+'?qa='+stamp,{timeout:20000});assert.equal(r.status(),200);
      report.links.push({path,status:200});}
    catch(e){report.links.push({path,status:'FAIL'});fail('Guide '+path,e);}
  }
}catch(e){fail('setup',e);}
finally{
  await browser?.close();await api?.dispose();
  await writeFile(dir+'/results.json',JSON.stringify(report,null,2)+'\n');
  console.log('FINAL CITY/COUNTY QA '+(report.failures.length?'FAIL':'PASS'));
  if(report.failures.length)process.exitCode=1;
}
