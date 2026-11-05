// Site-owned crawler: compare public, indexable, internally linked URLs against
// every nested XML sitemap advertised by robots.txt. Output exact missing URLs.
import fs from 'node:fs';
import path from 'node:path';
const ORIGIN=new URL(process.env.SITE_ORIGIN||'https://texasdefined.com').origin;
const HOST=new URL(ORIGIN).hostname;
const MAX=Math.max(1,Math.min(5000,Number(process.env.MAX_PAGES||600)));
const CONCURRENCY=Math.max(1,Math.min(6,Number(process.env.CONCURRENCY||3)));
const OUT=process.env.REPORT_DIR||'.artifacts/sitemap-discovery-'+HOST;
const UA='TexasSite-SitemapDiscoveryAudit/1.0 (site-owned crawl)';
const de=s=>String(s).replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&#39;/g,"'").replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n));
const norm=(s,base=ORIGIN)=>{try{const u=new URL(de(s),base);if(u.origin!==ORIGIN||!/^https?:$/.test(u.protocol)||u.search)return null;u.hash='';if(u.pathname!=='/')u.pathname=u.pathname.replace(/\/+$/,'');return u.href;}catch{return null;}};
const skip=u=>/\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|json|xml|pdf|zip|mp4|woff2?|ttf|txt)$/i.test(new URL(u).pathname);
async function fetchSafe(u){
 let err;
 for(let a=0;a<2;a++)try{
  const r=await fetch(u,{redirect:'manual',signal:AbortSignal.timeout(18000),headers:{'user-agent':UA,accept:'text/html,application/xml,text/xml;q=0.9,*/*;q=0.1'}});
  if(r.status>=500&&a===0){await r.body?.cancel();continue;}return r;
 }catch(e){err=e;}throw err;
}
const attr=(tag,name)=>de(tag.match(new RegExp('\\b'+name+'\\s*=\\s*(["\\x27])(.*?)\\1','i'))?.[2]||'');
const canonical=html=>(html.match(/<link\b[^>]*>/gi)||[]).filter(t=>attr(t,'rel').toLowerCase().split(/\s+/).includes('canonical')).map(t=>attr(t,'href'))[0]||'';
const meta=html=>(html.match(/<meta\b[^>]*>/gi)||[]).filter(t=>['robots','googlebot'].includes(attr(t,'name').toLowerCase())).map(t=>attr(t,'content').toLowerCase()).join(',');
const title=html=>de((html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]||'').replace(/\s+/g,' ').trim()).slice(0,160);
const links=(html,current)=>[...new Set((html.match(/<a\b[^>]*>/gi)||[]).map(t=>norm(attr(t,'href'),current)).filter(Boolean).filter(u=>!skip(u)))];
function robotsGroups(txt){
 const gs=[];let g=null,body=false;
 for(const raw of txt.split(/\r?\n/)){
  const m=raw.split('#')[0].trim().match(/^(user-agent|allow|disallow):\s*(.*)$/i);if(!m)continue;
  const k=m[1].toLowerCase(),v=m[2].trim();
  if(k==='user-agent'){if(!g||body){g={agents:[],rules:[]};gs.push(g);body=false;}g.agents.push(v.toLowerCase());}
  else if(g){g.rules.push({k,v});body=true;}
 }return gs;
}
function allowed(u,groups){
 const candidates=groups.map(g=>({g,rank:Math.max(-1,...g.agents.map(a=>a==='*'?0:'googlebot'.includes(a)?a.length:-1))})).filter(x=>x.rank>=0);
 if(!candidates.length)return true;
 const max=Math.max(...candidates.map(x=>x.rank)),p=new URL(u).pathname;
 const found=[];
 for(const {g,rank} of candidates)if(rank===max)for(const r of g.rules){
  if(!r.v)continue;
  const patt=r.v.replace(/\$$/,'');
  const escaped=patt.split('*').map(s=>s.replace(/[.*+?^$\{\}()|[\]\\]/g,'\\$&')).join('.*');
  if(new RegExp('^'+escaped+(r.v.endsWith('$')?'$':'')).test(p))found.push({score:r.v.replace(/[\*$]/g,'').length,allow:r.k==='allow'});
 }
 found.sort((a,b)=>b.score-a.score||Number(b.allow)-Number(a.allow));
 return !found.length||found[0].allow;
}
async function sitemapInventory(){
 const r=await fetchSafe(ORIGIN+'/robots.txt');if(r.status!==200)throw Error('robots.txt HTTP '+r.status);
 const robots=await r.text();
 const seeds=[...robots.matchAll(/^\s*Sitemap:\s*(\S+)/gim)].map(x=>norm(x[1])).filter(Boolean).filter(u=>u.endsWith('.xml') && new URL(u).pathname!=='/rss.xml');
 if(!seeds.length)seeds.push(ORIGIN+'/sitemap.xml');
 const pending=[...new Set(seeds)],visited=new Set(),pages=new Set(),counts={};
 while(pending.length){
  const u=pending.shift();if(visited.has(u))continue;visited.add(u);
  if(visited.size>150)throw Error('Exceeded 150 sitemap files');
  const resp=await fetchSafe(u);if(resp.status!==200)throw Error('Sitemap '+u+' HTTP '+resp.status+'; abort missing-page comparison');
  const xml=await resp.text();if(!/<(?:urlset|sitemapindex)\b/i.test(xml))throw Error('Invalid sitemap XML: '+u);
  const found=[...xml.matchAll(/<loc(?:\s[^>]*)?>([\s\S]*?)<\/loc>/gi)].map(m=>norm(m[1].trim()));
  if(found.includes(null))throw Error('Invalid or off-origin URL in sitemap '+u);
  if(/<sitemapindex\b/i.test(xml)){for(const x of found){if(!x.endsWith('.xml'))throw Error('Invalid child sitemap '+x);pending.push(x);}}
  else{counts[u]=found.length;for(const x of found)pages.add(x);}
 }
 return{robots:robotsGroups(robots),sitemaps:[...visited],pages,counts};
}
const inventory=await sitemapInventory();
const queue=[ORIGIN+'/'],queued=new Set(queue),seen=new Set(),from=new Map([[ORIGIN+'/','(seed)']]),missing=[],errors=[],excluded={};
while(queue.length&&seen.size<MAX){
 const batch=[];
 while(queue.length&&batch.length<CONCURRENCY&&seen.size+batch.length<MAX){const u=queue.shift();if(!seen.has(u))batch.push(u);}
 if(!batch.length)break;
 const data=await Promise.all(batch.map(async u=>{
  try{
   const r=await fetchSafe(u);
   if(r.status!==200){await r.body?.cancel();return{u,reason:'HTTP '+r.status,links:[]};}
   if(!/text\/html/i.test(r.headers.get('content-type')||'')){await r.body?.cancel();return{u,reason:'not HTML',links:[]};}
   const html=await r.text(),can=canonical(html),normalized=can?norm(can,u):'';
   const robots=meta(html)+','+(r.headers.get('x-robots-tag')||'').toLowerCase();
   let reason='';
   if(!allowed(u,inventory.robots))reason='robots.txt disallow';
   else if(/\bnoindex\b/.test(robots))reason='noindex';
   else if(can&&normalized!==u)reason='alternate canonical';
   else if(/^(404|not found|page not found)\b/i.test(title(html)))reason='soft-404 title';
   return{u,reason,title:title(html),canonical:can,links:links(html,u)};
  }catch(e){return{u,reason:'fetch error: '+String(e),links:[]};}
 }));
 for(const r of data){
  seen.add(r.u);
  if(r.reason)excluded[r.reason]=(excluded[r.reason]||0)+1;
  else if(!inventory.pages.has(r.u))missing.push({url:r.u,from:from.get(r.u),title:r.title,canonical:r.canonical||'(none)'});
  if(r.reason.startsWith('fetch error'))errors.push(r.u+' '+r.reason);
  for(const u of r.links){if(queued.has(u)||seen.has(u)||!allowed(u,inventory.robots))continue;queued.add(u);queue.push(u);from.set(u,r.u);}
 }
}
missing.sort((a,b)=>a.url.localeCompare(b.url));
const report={origin:ORIGIN,date:new Date().toISOString(),sitemapCount:inventory.sitemaps.length,sitemapUrls:inventory.pages.size,sitemapCounts:inventory.counts,crawled:seen.size,remaining:queue.length,limit:MAX,crawlIncomplete:queue.length>0,missing,errors,excluded};
fs.mkdirSync(OUT,{recursive:true});
fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify(report,null,2)+'\n');
const cell=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
fs.writeFileSync(path.join(OUT,'missing.csv'),['URL,Found on,Title,Canonical',...missing.map(x=>[x.url,x.from,x.title,x.canonical].map(cell).join(','))].join('\n')+'\n');
const md=['# Sitemap discovery-gap audit — '+HOST,'','- Public pages crawled: **'+seen.size+'**','- Sitemap files inspected: **'+inventory.sitemaps.length+'**','- Sitemap URLs inventoried: **'+inventory.pages.size+'**','- Missing candidate URLs: **'+missing.length+'**','- Remaining uncrawled queue: **'+queue.length+'** (zero is required for complete link-graph coverage)','- Fetch errors: **'+errors.length+'**','','Missing candidates are HTTP 200 HTML pages without noindex or an alternate canonical. Each URL was reached through an internal hyperlink. Pages without a canonical remain candidates requiring review.','', '| Missing URL | Linked from |','|---|---|',...missing.slice(0,100).map(x=>'| '+x.url+' | '+x.from+' |'),'','Download the complete list from missing.csv in the workflow artifact.'];
fs.writeFileSync(path.join(OUT,'summary.md'),md.join('\n')+'\n');
console.log(md.join('\n'));
if(errors.length)process.exitCode=2;
else if(missing.length)process.exitCode=1;
