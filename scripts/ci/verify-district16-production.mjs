import assert from 'node:assert/strict';
// Source-dated SSR acceptance on the direct Worker and the public custom domain.
// This fails deployment when a healthy HTTP 200 actually serves an old district template.
const pathname='/texas-high-school-football-districts/6a-district-16';
const origins=['https://texasdefined-site.freddy-coppola.workers.dev','https://texasdefined.com'];
async function verify(origin){
  const url=new URL(pathname,origin);
  url.searchParams.set('district16_live',(process.env.GITHUB_SHA || 'manual').slice(0,16));
  const response=await fetch(url,{redirect:'follow',cache:'no-store',signal:AbortSignal.timeout(30000),headers:{accept:'text/html','cache-control':'no-cache, no-store, max-age=0',pragma:'no-cache','user-agent':'TexasDefined-D16-Live-Acceptance'}});
  assert.equal(response.status,200,origin+' HTTP status');
  assert.notEqual(response.headers.get('cf-mitigated'),'challenge',origin+' challenged');
  const html=await response.text();
  assert.ok(html.length>6000,origin+' response unexpectedly short '+html.length);
  const markers=['District 16 scores, standings and next games','2026 reported district standings','Remaining district games','CFISD tickets, stadiums and game-day logistics','October 18, 2026','Kickoff unconfirmed','not a continuously updated scoreboard','Official CFISD tickets','Langham Creek','Cypress Woods','Cypress Falls','Cypress Lakes','Cy-Fair','Jersey Village','Cypress Ridge','Cypress Creek'];
  for(const marker of markers) assert.ok(html.includes(marker),origin+' missing '+marker);
  const title=html.match(/<title>([^<]+)<\/title>/i)?.[1]||'';
  assert.ok(title.includes('District 16-6A Football: 2026 Standings, Scores'),origin+' stale title '+title);
  const canonicals=[...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi)];
  assert.equal(canonicals.length,1,origin+' canonical count');
  assert.ok(canonicals[0][0].includes('https://texasdefined.com'+pathname),origin+' bad canonical');
  assert.ok(!/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html),origin+' noindex');
  const match=html.match(/id=["']district-16-standings["'][\s\S]*?<table[\s\S]*?<tbody[^>]*>([\s\S]*?)<\/tbody>/i);
  assert.ok(match,origin+' no standings table');
  assert.equal((match[1].match(/<tr\b/g)||[]).length,8,origin+' number of team rows');
  assert.equal((html.match(/data-district16-result=["']final["']/g)||[]).length,4,origin+' number of finals');
  assert.equal((html.match(/data-district16-result=["']scheduled["']/g)||[]).length,12,origin+' number of fixtures');
  const schoolPaths=[...new Set((html.match(/href=["']\/texas-high-school-football-teams\/[^"'#?]+/g)||[]).map(x=>x.split('/texas-high-school-football-teams/')[1]))];
  assert.ok(schoolPaths.length>=8,origin+' incomplete school links '+schoolPaths.join(','));
  const content=html.slice(html.indexOf('data-football-district-hub="v2"'));
  assert.ok(content.indexOf('District 16 scores, standings and next games')>=0,origin+' no key section');
  const affiliateIndex=content.indexOf('anrdoezrs.net');
  assert.ok(affiliateIndex<0||content.indexOf('District 16 scores, standings and next games')<affiliateIndex,origin+' premature affiliates');
  console.log('PASS District16 production',origin,'HTTP',response.status,'rows 8, finals 4, fixtures 12, school links',schoolPaths.length,'title',title,'cf-cache-status',response.headers.get('cf-cache-status'));
}
const outcomes=await Promise.allSettled(origins.map(verify));
for(const o of outcomes) if(o.status==='rejected') console.error(o.reason);
if(outcomes.some(o=>o.status==='rejected'))throw new Error('District 16 post-deploy acceptance failed');
