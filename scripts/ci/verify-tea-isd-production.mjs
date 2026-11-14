// Verify a representative, reproducible sample of TEA-corroborated ISD annual
// rows on both entry points. Daily checks are intentionally bounded; the
// complete 2,494-record source inventory is verified off-request in CI.
import { readFileSync } from 'node:fs';

const evidence=JSON.parse(readFileSync(new URL('../../src/data/property/tea-isd-historical-verified.json',import.meta.url),'utf8'));
const origins=['https://texasdefined.com','https://texasdefined-site.freddy-coppola.workers.dev'];
const slugs=Object.keys(evidence.districts).sort();
const failed=[];
const samples=[];
function fmt(value){
  const six=Number(value).toFixed(6);
  return Math.abs(Number(value)-Number(six))<1e-10?six:Number(value).toFixed(8).replace(/0+$/,'').replace(/\.$/,'');
}
function textContent(html){return html.replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();}
function findRateRow(html,year){
  const anchor=html.indexOf('Annual tax rates, with source distinctions');
  const table=anchor<0?null:html.slice(anchor).match(/<table\b[^>]*>([\s\S]*?)<\/table>/i)?.[1];
  if(!table)return null;
  const trs=[...table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)];
  const rows=trs.map(t=>[...t[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map(x=>textContent(x[1]))).filter(c=>c.length===6&&c[0]===String(year));
  return rows.length===1?rows[0]:null;
}
for(const year of [2021,2022,2023]){
  const matching=slugs.filter(slug=>evidence.districts[slug][String(year)]);
  if(matching.length<700)throw Error(year+': insufficient TEA corroborated records for sampling');
  const candidates=[matching[0],matching[Math.floor(matching.length/4)],matching[Math.floor(matching.length/2)],matching[matching.length-1]];
  for(const slug of new Set(candidates))samples.push({slug,year,rate:evidence.districts[slug][String(year)]});
}
for(const sample of samples){
  for(const origin of origins){
    try {
      const url=origin+'/property-tax/taxing-unit/'+sample.slug+'?verify-tea='+Date.now();
      const response=await fetch(url,{cache:'no-store',redirect:'follow',signal:AbortSignal.timeout(20000)});
      const html=await response.text();
      if(!response.ok||!/text\/html/i.test(response.headers.get('content-type')??''))throw Error('HTTP '+response.status+' or wrong content type');
      const row=findRateRow(html,sample.year);
      if(!row)throw Error('Missing unique annual row '+sample.year);
      const wanted=[fmt(sample.rate.totalRate),fmt(sample.rate.maintenanceOperationsRate),fmt(sample.rate.debtServiceRate)];
      if(row[1]!==wanted[0]||row[2]!==wanted[1]||row[3]!==wanted[2])throw Error('Annual total/M&O/I&S mismatch: actual '+row.slice(1,4).join(',')+' expected '+wanted.join(','));
      if(!row[4].includes('Texas Education Agency')||!html.includes(evidence.sourceUrl))throw Error('Missing TEA official evidence');
      if(!html.includes('https://texasdefined.com/property-tax/taxing-unit/'+sample.slug))throw Error('Canonical missing');
      if(/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html))throw Error('Unexpected noindex');
      console.log('PASS '+sample.slug+'/'+sample.year+' at '+origin);
    }catch(e){failed.push(sample.slug+'/'+sample.year+' '+origin+': '+String(e));}
  }
}
const msg='Source-qualified TEA history production: '+(samples.length*2-failed.length)+'/'+(samples.length*2)+' sampled year-by-origin checks passed.\n';
console.log(msg);
if(process.env.GITHUB_STEP_SUMMARY){const {appendFileSync}=await import('node:fs');appendFileSync(process.env.GITHUB_STEP_SUMMARY,'\n### TEA ISD history verification\n'+msg+(failed.length?failed.join('\n')+'\n':''));}
if(failed.length){for(const msg of failed)console.error('::error::'+msg);process.exitCode=1;}
