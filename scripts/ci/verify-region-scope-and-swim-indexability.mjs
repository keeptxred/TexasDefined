import fs from 'node:fs';

const origin = 'https://texasdefined.com';
const regionSpecs = [
  { id:'hill-country', title:'Hill Country', allowed:'enchanted-rock-state-natural-area', forbidden:['texas-state-aquarium','moody-gardens','houston-zoo','downtown-aquarium-houston','houston-interactive-aquarium-animal-preserve','space-center-houston','palo-duro-canyon-state-park','caprock-canyons-state-park','big-bend-national-park','guadalupe-mountains-national-park','dinosaur-valley-state-park','brazos-bend-state-park'] },
  { id:'gulf-coast', title:'Gulf Coast', allowed:'texas-state-aquarium', forbidden:['palo-duro-canyon-state-park','big-bend-national-park','enchanted-rock-state-natural-area'] },
  { id:'panhandle', title:'Panhandle Plains', allowed:'palo-duro-canyon-state-park', forbidden:['texas-state-aquarium','moody-gardens','big-bend-national-park'] },
  { id:'big-bend', title:'Big Bend Country', allowed:'big-bend-national-park', forbidden:['texas-state-aquarium','moody-gardens','palo-duro-canyon-state-park'] },
  { id:'piney-woods', title:'Piney Woods', forbidden:['texas-state-aquarium','moody-gardens','palo-duro-canyon-state-park','big-bend-national-park'] },
  { id:'prairies-lakes', title:'Prairies & Lakes', forbidden:['texas-state-aquarium','moody-gardens','palo-duro-canyon-state-park','big-bend-national-park'] },
  { id:'south-texas', title:'South Texas Plains', forbidden:['texas-state-aquarium','moody-gardens','palo-duro-canyon-state-park','big-bend-national-park'] },
];
const failures = [];
const norm = html => html.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/\s+/g,' ');
const destinationLinks = html => [...new Set([...html.matchAll(/<a\b[^>]*\bhref=["'](?:https:\/\/texasdefined\.com)?\/destination\/([a-z0-9-]+)(?:[?#][^"']*)?["']/gi)].map(x=>x[1]))];
const main = html => html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0];
function sourceCheck(){
 const route=fs.readFileSync('src/routes/explore.region.$region.tsx','utf8');
 const consistency=fs.readFileSync('src/data/destination-region-consistency.ts','utf8');
 const destinationScope=fs.readFileSync('src/data/destination-query-scope.ts','utf8');
 const destinationRuntime=fs.readFileSync('src/data/destination-query-runtime.ts','utf8');
 for(const [slug,expectedRegion] of [
  ['texas-state-aquarium','gulf-coast'], ['moody-gardens','gulf-coast'],
  ['houston-zoo','gulf-coast'], ['downtown-aquarium-houston','gulf-coast'], ['houston-interactive-aquarium-animal-preserve','gulf-coast'], ['space-center-houston','gulf-coast'],
  ['palo-duro-canyon-state-park','panhandle'], ['caprock-canyons-state-park','panhandle'],
  ['big-bend-national-park','big-bend'], ['guadalupe-mountains-national-park','big-bend'],
  ['dinosaur-valley-state-park','prairies-lakes'], ['brazos-bend-state-park','gulf-coast'],
 ]) {
  if(!consistency.includes('"'+slug+'": "'+expectedRegion+'"'))failures.push('Canonical region mapping missing '+slug+' → '+expectedRegion);
 }
 if(!consistency.includes('isGeographicallyPlausibleForTravelRegion'))failures.push('Geographically impossible remote region memberships are not rejected');
 if(!destinationScope.includes('destinations.map(correctDestinationTravelRegion)'))failures.push('Scoped regional lists missing canonical geography normalization');
 if(!destinationScope.includes('isGeographicallyPlausibleForTravelRegion(destination, query.region)'))failures.push('Scoped regional lists missing geographic contradiction check');
 if(!destinationRuntime.replace(/\s+/g, '').replace(/,\)/g, ')').includes('improved.map((destination)=>applyStateParkHeroAsset(correctDestinationTravelRegion(destination)))'))failures.push('Merged destination catalog must correct geography before applying the exact-place hero resolver');
 if(!destinationRuntime.includes('correctDestinationTravelRegion(applyResolvedHero(destination))'))failures.push('Destination detail resolver missing geographic corrections');

 // Check the actual curated source fields, not just a downstream override that
 // could hide incorrect records from the editor and future data exports.
 for(const [file,slug] of [
   ['src/data/aquarium-marine-destinations-2.ts','downtown-aquarium-houston'],
   ['src/data/aquarium-marine-destinations-3.ts','houston-interactive-aquarium-animal-preserve'],
   ['src/data/aquarium-marine-destinations-4.ts','houston-zoo'],
 ]) {
   const source=fs.readFileSync(file,'utf8');
   const start=source.indexOf('slug: "'+slug+'"');
   const next=start<0?'':source.slice(start,start+1200);
   const taggedRegion=next.match(/region:\s*"([^"]+)"/)?.[1];
   if(start<0||taggedRegion!=='gulf-coast')failures.push('Houston source catalog region regression: '+slug);
 }


 const category=fs.readFileSync('src/routes/explore.$category.tsx','utf8');
 const staticAuthority=fs.readFileSync('public/content/explore-category-authority/swimming-holes-river-tubing.html','utf8');
 if(!route.includes('filterDestinationsByScope(loadedDestinations, { region: region.id })'))failures.push('Region route lacks strict final regional filter');
 if(!route.includes('return { region, regions, destinations };'))failures.push('Region metadata/cards are not based on filtered loader list');
 if(!category.includes('swimmingAuthorityReady')||!category.includes('&& loaderData.authorityHtml.includes("Official sources")'))failures.push('Swim/float page lacks evidence-gated fallback index readiness');
 if(!staticAuthority.includes('id="texas-swimming-holes-river-tubing-guide"')||!staticAuthority.includes('Official sources'))failures.push('Independent swimming authority content or citations missing');
 for(const reg of regionSpecs)if(!route.includes('destinations'))failures.push('Region listing missing '+reg.id);
}
async function fetchPage(path){
 const res=await fetch(origin+path,{headers:{'User-Agent':'TexasDefinedRegionScopeVerifier/1.0','Cache-Control':'no-cache'},signal:AbortSignal.timeout(30000)});
 if(res.status!==200)throw new Error('HTTP '+res.status);
 return await res.text();
}
async function liveCheck(){
 for(const region of regionSpecs){
  const path='/explore/region/'+region.id;
  try{
   const html=norm(await fetchPage(path));
   const content=main(html);
   if(!content){failures.push(path+': missing SSR main landmark');continue;}
   const links=destinationLinks(content);
   if(links.length<1)failures.push(path+': no discoverable destination cards');
   const wrong=region.forbidden.filter(slug=>links.includes(slug));
   if(wrong.length)failures.push(path+': out-of-region destination cards '+wrong.join(','));
   if(region.allowed&&!links.includes(region.allowed))failures.push(path+': known correctly regional destination missing '+region.allowed);
   console.log('REGION '+region.id+' linked destinations='+links.length+' forbidden='+wrong.length);
  }catch(error){failures.push(path+': '+(error?.message||String(error)));}
 }
 const path='/explore/swimming-holes-river-tubing';
 try{
  const html=norm(await fetchPage(path));
  const content=main(html);
  if(!content)failures.push(path+': SSR main landmark missing');
  const count=destinationLinks(content||'').length;
  const robots=[...html.matchAll(/<meta\b[^>]*>/gi)].filter(x=>/\bname=["'](?:robots|googlebot)["']/i.test(x[0]) && /noindex/i.test(x[0]));
  if(count>=3 && robots.length)failures.push(path+': '+count+' mapped destinations but robots noindex');
  if(count<3&&!content?.includes('Official sources'))failures.push(path+': neither substantive destination collection nor official-source reference');
  console.log('SWIMMING destinations='+count+' noindexMeta='+robots.length);
 }catch(error){failures.push(path+': '+(error?.message||String(error)));}
}
if(process.argv.includes('--live'))await liveCheck();
else sourceCheck();
if(failures.length){failures.forEach(e=>console.error('FAIL '+e));process.exitCode=1;}
else console.log('PASS: '+(process.argv.includes('--live')?'live seven-region and swim category SSR scope/indexability':'region/source contract'));
