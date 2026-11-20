#!/usr/bin/env node
/* Sitewide Texas football score freshness inventory. No score scraping or
 * publishing. Only materialized 2026 results/record/standings pages qualify. */
import {readdirSync,readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
export const ROOT=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
export const DIR=join(ROOT,'src/data/high-school-football');
export const OUT=join(ROOT,'artifacts/football-score-research');
const SITE='https://texasdefined.com';
const DAY=86400000;
export function texasToday(clock=new Date()){
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(clock);
  const p=x=>parts.find(t=>t.type===x)?.value;
  return [p('year'),p('month'),p('day')].join('-');
}
export function isoDate(v,year=2026){
  if(typeof v!=='string')return null;
  v=v.trim();
  if(/^\d{4}-\d{2}-\d{2}$/.test(v)){
    const t=new Date(v+'T12:00:00Z');
    return Number.isFinite(t.getTime())&&t.toISOString().slice(0,10)===v?v:null;
  }
  const m=/^(January|February|March|April|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\.?\s+(\d{1,2})(?:,?\s+(20\d\d))?$/i.exec(v);
  if(!m)return null;
  const months={jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,sept:9,oct:10,nov:11,dec:12};
  return isoDate([m[3]||year,String(months[m[1].toLowerCase().slice(0,3)]).padStart(2,'0'),m[2].padStart(2,'0')].join('-'));
}
function fieldRe(k){return new RegExp('(?:^|[\\s,{])["\\x27]?'+k+'["\\x27]?\\s*:','m');}
function pos(source,k){const m=fieldRe(k).exec(source);return m?m.index+m[0].length:-1;}
export function field(source,k){
  const at=pos(source,k);if(at<0)return null;
  let i=at;while(/\s/.test(source[i]||'')&&i<source.length)i++;
  const q=source[i];if(q!=='"'&&q!=="'")return null;
  let v='';
  for(i++;i<source.length;i++){
    let c=source[i];
    if(c==='\\'&&i+1<source.length){c=source[++i];v+=c==='n'?' ':c;continue;}
    if(c===q)return v;
    v+=c;
  }
  return null;
}
export function balanced(source,start,open,close){
  let i=start;while(/\s/.test(source[i]||'')&&i<source.length)i++;
  if(source[i]!==open)return null;
  let depth=0,quote=null,esc=false,comment='';
  const at=i;
  for(;i<source.length;i++){
    const c=source[i],n=source[i+1];
    if(comment==='line'){if(c==='\n')comment='';continue;}
    if(comment==='block'){if(c==='*'&&n==='/'){i++;comment='';}continue;}
    if(quote){if(esc){esc=false;continue;}if(c==='\\'){esc=true;continue;}if(c===quote)quote=null;continue;}
    if(c==='/'&&n==='/'){comment='line';i++;continue;}
    if(c==='/'&&n==='*'){comment='block';i++;continue;}
    if(c==="'"||c==='"'||c.charCodeAt(0)===96){quote=c;continue;}
    if(c===open)depth++;
    if(c===close){depth--;if(depth===0)return source.slice(at,i+1);}
  }
  return null;
}
function arrayObjects(arr){
  if(!arr)return [];
  const objects=[];let quote='',esc=false;
  for(let i=1;i<arr.length-1;i++){
    const c=arr[i];
    if(quote){if(esc)esc=false;else if(c==='\\')esc=true;else if(c===quote)quote='';continue;}
    if(c==="'"||c==='"'||c.charCodeAt(0)===96){quote=c;continue;}
    if(c==='{'){const obj=balanced(arr,i,'{','}');if(obj){objects.push(obj);i+=obj.length-1;}}
  }
  return objects;
}
function sourceRank(name){if(name==='program-editorial-comal-canyon-lake.ts'||name==='program-editorial-frisco-lone-star.ts')return 100;
  return Number(/^program-editorial-b(\d+)/.exec(name)?.[1]||1);}
export function inspectEditorial(source,file,today){
  const anchors=[...source.matchAll(/(?:^|[\s,{])(?:"slug"|'slug'|slug)\s*:\s*(?:"([^"\n]{1,110})"|'([^'\n]{1,110})')/gm)];
  const found=[];
  for(let i=0;i<anchors.length;i++){
    const slug=anchors[i][1]||anchors[i][2];
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))continue;
    const chunk=source.slice(anchors[i].index,i+1<anchors.length?anchors[i+1].index:source.length);
    const sp=pos(chunk,'season'),season=sp>=0?balanced(chunk,sp,'{','}'):null;
    if(!season){found.push({slug,file,rank:sourceRank(file),published:false});continue;}
    const gp=pos(season,'games');
    const rows=arrayObjects(gp>=0?balanced(season,gp,'[',']'):null);
    const games=rows.map(row=>({date:isoDate(field(row,'date')),opponent:field(row,'opponent'),
      result:field(row,'result'),site:field(row,'site')}))
      .filter(g=>g.date?.startsWith('2026-')&&g.opponent);
    const record=field(season,'record'),checked=field(season,'verifiedAt');
    const published=Boolean((record&&/\d+\s*[–-]\s*\d+/.test(record))||games.some(g=>g.result));
    const overdue=games.filter(g=>g.date<today&&!g.result);
    const searchName=slug.replaceAll('-',' ');
    const age=isoDate(checked)?(Date.parse(today)-Date.parse(checked))/DAY:0;
    const finished=/\b(?:final (?:2026 )?(?:season|record)|finished (?:the )?2026 season|season complete|season concluded)\b/i.test(record||'');
    const aging=published&&!overdue.length&&!finished&&age>=14&&games.length>0;
    found.push({slug,file,rank:sourceRank(file),published,verifiedAt:checked,
      page:SITE+'/texas-high-school-football-teams/'+slug,
      record,sourceUrl:field(season,'sourceUrl'),
      reason:published?(overdue.length?'overdue-fixture':aging?'dated-score-review':null):null,
      overdue:overdue.map(g=>({date:g.date,away:g.site==='Home'?g.opponent:searchName,
        home:g.site==='Home'?searchName:g.opponent})),
      scoresPublished:games.filter(g=>g.result).length});
  }
  return found;
}
function districtScheduled(source,functions,today,file,kickoffFirst=false){
  const pattern=new RegExp('(?:^|\\s)(?:'+functions.join('|')+')\\(\\s*["\\x27](2026-\\d\\d-\\d\\d)["\\x27]\\s*,\\s*["\\x27]([^"\\x27]+)["\\x27]\\s*,\\s*["\\x27]([^"\\x27]+)["\\x27]','g');
  const regular=[...source.matchAll(pattern)].filter(x=>x[1]<today).map(m=>({date:m[1],away:m[2],home:m[3],sourceFile:file}));
  if(!kickoffFirst)return regular;
  const kickoffPattern=/scheduled\(\s*['"](2026-\d\d-\d\d)['"]\s*,\s*['"][^'"]+['"]\s*,\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/g;
  return [...source.matchAll(kickoffPattern)].filter(x=>x[1]<today).map(m=>({date:m[1],away:m[2],home:m[3],sourceFile:file}));
}
export function inventory({today=texasToday(),dir=DIR,read=p=>readFileSync(p,'utf8')}={}){
  const filenames=readdirSync(dir).filter(n=>n==='program-editorial.ts'||/^program-editorial-.*\.ts$/.test(n))
    .filter(n=>!n.includes('loader.')&&!n.endsWith('.server.ts'));
  const effective=new Map();
  for(const file of filenames)for(const row of inspectEditorial(read(join(dir,file)),file,today)){
    const old=effective.get(row.slug);
    if(!old||row.rank>old.rank||(row.rank===old.rank&&(row.verifiedAt||'')>(old.verifiedAt||'')))effective.set(row.slug,row);
  }
  const pages=[];
  for(const p of effective.values())if(p.published&&p.reason)pages.push({kind:'team',page:p.page,slug:p.slug,
    reason:p.reason,sourceFile:p.file,verifiedAt:p.verifiedAt,record:p.record,sourceUrl:p.sourceUrl,overdue:p.overdue});
  for(const [file,slug,fn] of [
    ['football-district5-2026.ts','6a-district-5',['scheduled']],
    ['football-district11-2026.ts','4a-division-i-district-11',['upcoming']],
    ['football-district21-2026.ts','6a-district-21',['scheduled']],
    ['football-district-game-week.ts','6a-district-22',['scheduled']]
  ]){
    const due=districtScheduled(read(join(dir,file)),fn,today,file,slug==='6a-district-22');
    if(due.length)pages.push({kind:'district',page:SITE+'/texas-high-school-football-districts/'+slug,
      reason:'overdue-fixture',sourceFile:file,overdue:due});
  }
  const d16=read(join(dir,'football-district16-2026.ts')),marker='export const DISTRICT_16_NEXT_GAMES = ';
  const begin=d16.indexOf(marker),arr=begin<0?null:balanced(d16,begin+marker.length,'[',']');
  // The archived October schedule remains on the page for context, but every
  // matching Nov-verified final must NOT be returned as an outstanding game.
  const lateMarker='export const DISTRICT_16_LATE_FINALS = ';
  const lateBegin=d16.indexOf(lateMarker);
  const lateRows=lateBegin<0?[]:arrayObjects(balanced(d16,lateBegin+lateMarker.length,'[',']'));
  const sourced16=new Set(lateRows.map(row=>[field(row,'date'),field(row,'away'),field(row,'home')].join('|')));
  const due16=arrayObjects(arr).map(row=>({date:field(row,'date'),away:field(row,'away'),home:field(row,'home'),
    sourceFile:'football-district16-2026.ts'}))
    .filter(g=>isoDate(g.date)&&g.date<today&&!sourced16.has([g.date,g.away,g.home].join('|')));
  const asOf16=/DISTRICT_16_STANDINGS_AS_OF\s*=\s*'([^']+)'/.exec(d16)?.[1];
  const old16=isoDate(asOf16)?(Date.parse(today)-Date.parse(isoDate(asOf16)))/DAY>=14:false;
  if(due16.length||old16)pages.push({kind:'district',
    page:SITE+'/texas-high-school-football-districts/6a-district-16',
    reason:due16.length?'overdue-fixture':'dated-standings-review',
    sourceFile:'football-district16-2026.ts',standingsAsOf:asOf16,overdue:due16});
  const d21=read(join(dir,'football-district21-2026.ts'));
  const asOf21=/DISTRICT_21_STANDINGS_AS_OF\s*=\s*'([^']+)'/.exec(d21)?.[1];
  const old21=isoDate(asOf21)?(Date.parse(today)-Date.parse(isoDate(asOf21)))/DAY>=14:false;
  if(old21&&!pages.some(p=>p.page.endsWith('/6a-district-21')))pages.push({kind:'district',
    page:SITE+'/texas-high-school-football-districts/6a-district-21',
    reason:'dated-standings-review',sourceFile:'football-district21-2026.ts',standingsAsOf:asOf21,overdue:[]});
  // District 21's shared scorecard is also visibly published on all eight
  // individual team routes, even if those teams have no authored season field.
  const d21Scorecard=read(join(ROOT,'src/components/sports/District21TeamSeason.tsx'));
  const teamSlugBlock=/{[\s\S]*?}/.exec(d21Scorecard.slice(d21Scorecard.indexOf('const DISTRICT_21_PROFILE_SLUGS')))?.[0]||'';
  const district21Teams=new Map([...teamSlugBlock.matchAll(/'([^']+)': '([^']+)'/g)].map(m=>[m[1],m[2]]));
  const due21=districtScheduled(d21,['scheduled'],today,'football-district21-2026.ts');
  if(!d21.includes('DISTRICT_21_2026_GAMES')||!d21Scorecard.includes('source-verified 2026 district finals'))throw Error('District 21 team scorecard contract changed');
  for(const [name,slug] of district21Teams){
    const due=due21.filter(g=>g.home===name||g.away===name);
    if(!due.length)continue;
    const page=SITE+'/texas-high-school-football-teams/'+slug;
    const existing=pages.find(p=>p.page===page);
    if(existing){existing.reason='overdue-fixture';existing.overdue.push(...due);}
    else pages.push({kind:'team',page,slug,reason:'overdue-fixture',
      sourceFile:'District21TeamSeason.tsx + football-district21-2026.ts',
      sourceUrl:'https://www.maxpreps.com/tx/football/',overdue:due});
  }
  const matchups=JSON.parse(read(join(dir,'football-matchups.snapshot.json')));
  // Both team profiles receive a shared matchup overlay, but only a team with
  // at least one actually published final gets an outdated score-card review.
  for(const game of matchups.games||[]){
    if(game.status!=='scheduled'||game.date>=today)continue;
    for(const team of [game.home,game.away]){
      const hasFinal=(matchups.games||[]).some(g=>g.status==='final'&&(g.home.slug===team.slug||g.away.slug===team.slug));
      if(!hasFinal)continue;
      const page=SITE+'/texas-high-school-football-teams/'+team.slug;
      const due=[{date:game.date,away:game.away.name,home:game.home.name}];
      const present=pages.find(p=>p.page===page);
      if(present){present.reason='overdue-fixture';present.overdue.push(...due);}
      else pages.push({kind:'team',page,slug:team.slug,reason:'overdue-fixture',
        sourceFile:'football-matchups.snapshot.json (published team score overlay)',overdue:due});
    }
  }
  for(const g of matchups.games||[])if(g.status==='scheduled'&&g.date<today)pages.push({kind:'matchup',
    page:SITE+'/texas-high-school-football-matchups/'+g.slug,reason:'overdue-fixture',
    sourceFile:'football-matchups.snapshot.json',overdue:[{date:g.date,away:g.away.name,home:g.home.name}]});
  const aubrey=JSON.parse(read(join(dir,'aubrey-postseason-fixtures.snapshot.json')));
  const verified=new Set(JSON.parse(read(join(dir,'aubrey-auto-results.snapshot.json'))).verifiedResults.map(r=>r.date+'|'+r.opponent));
  const due=(aubrey.games||[]).filter(g=>g.date<today&&!verified.has(g.date+'|'+g.opponent));
  const aubreyUrl=SITE+'/texas-high-school-football-teams/aubrey';
  if(due.length){
    const postseason=due.map(g=>({date:g.date,away:'Aubrey',home:g.opponent}));
    const present=pages.find(p=>p.page===aubreyUrl);
    if(present){present.reason='overdue-fixture';present.overdue.push(...postseason);}
    else pages.push({kind:'team',page:aubreyUrl,slug:'aubrey',reason:'overdue-fixture',
      sourceFile:'aubrey-postseason-fixtures.snapshot.json',overdue:postseason});
  }
  const unique=new Map();
  for(const p of pages){const old=unique.get(p.page);if(old){old.overdue.push(...p.overdue);}else unique.set(p.page,p);}
  const selected=[...unique.values()].sort((a,b)=>a.page.localeCompare(b.page));
  for(const page of selected){
    const distinct=new Map();
    for(const game of page.overdue)distinct.set(game.date+'|'+game.away+'|'+game.home,game);
    page.overdue=[...distinct.values()];
  }
  const games=new Map();
  const normalize=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-');
  for(const p of selected)for(const game of p.overdue){
    if(!isoDate(game.date)||game.date>=today)continue;
    const key=game.date+'|'+[normalize(game.away),normalize(game.home)].sort().join('|');
    if(games.has(key)){games.get(key).pages.push(p.page);continue;}
    games.set(key,{date:game.date,away:game.away,home:game.home,pages:[p.page]});
  }
  return {schemaVersion:1,season:'2026',today,summary:{editorialFilesScanned:filenames.length,
    effectiveTeamEditorials:effective.size,affectedPages:selected.length,
    overduePages:selected.filter(p=>p.overdue.length).length,
    datedScoreReviewPages:selected.filter(p=>!p.overdue.length).length,unverifiedFixtures:games.size},
    pages:selected,fixtures:[...games.values()].sort((a,b)=>b.date.localeCompare(a.date)),
    policy:'Exclude pages with no published 2026 score, W-L or standings. Unconfirmed past fixtures are research leads, not finals.'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  if(process.argv[2]!=='--inventory')throw Error('Usage: --inventory');
  const output=inventory();mkdirSync(OUT,{recursive:true});
  writeFileSync(join(OUT,'inventory.json'),JSON.stringify(output,null,2)+'\n');
  console.log(JSON.stringify(output.summary));
}