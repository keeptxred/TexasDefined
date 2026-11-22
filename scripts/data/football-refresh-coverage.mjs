// Permanent enrollment is deliberately separate from the backlog of stale games.
// Use the same UIL alignment and district resolver as the public routes.
import { createRequire, registerHooks } from 'node:module';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const dir=fileURLToPath(new URL('../../src/data/high-school-football/',import.meta.url));
const require=createRequire(import.meta.url);
// The production Vite resolver accepts extensionless TS and JSON imports.
// Node 24's native TS runner needs explicit extensions and JSON attributes.
const hook=registerHooks({resolve(specifier,context,nextResolve){
  if(context.parentURL?.startsWith(pathToFileURL(dir).href)&&specifier.startsWith('./')){
    const resolved=new URL(specifier,context.parentURL);
    if(!/\.(?:json|ts|js)$/.test(resolved.pathname)&&existsSync(fileURLToPath(resolved)+'.ts')){
      return nextResolve(resolved.href+'.ts',context);
    }
    if(resolved.pathname.endsWith('.json')){
      return nextResolve(resolved.href,{...context,importAttributes:{type:'json'}});
    }
  }
  return nextResolve(specifier,context);
}});
let programs,slugFor,getDistricts,getGames;
try{
  ({UIL_FOOTBALL_PROGRAMS_2026:programs}=require(join(dir,'uil-football-alignments-2026.server.ts')));
  ({footballProgramSlug:slugFor}=require(join(dir,'program-slugs.ts')));
  ({getAllFootballDistricts:getDistricts}=require(join(dir,'football-districts.server.ts')));
  ({getDistrictFootballGames:getGames}=require(join(dir,'football-district-game-week.ts')));
}finally{hook.deregister();}
const SITE='https://texasdefined.com';
const teamPath=slug=>SITE+'/texas-high-school-football-teams/'+slug;
const districtPath=slug=>SITE+'/texas-high-school-football-districts/'+slug;
const matchupHub=SITE+'/texas-high-school-football-matchups';
const bracketHub=SITE+'/texas-high-school-football-playoff-brackets';
const final=g=>g.status==='final'&&Number.isInteger(g.awayScore)&&Number.isInteger(g.homeScore);
export function footballRefreshCoverage({editorials,matchups,aubreyResults,reviewed,today}){
  const enrolled=new Map(),scan=new Set(),districts=getDistricts();
  const add=(page,kind,sourceFile,opts={})=>{
    const existing=enrolled.get(page);
    if(existing){if(!existing.sources.includes(sourceFile))existing.sources.push(sourceFile);return;}
    enrolled.set(page,{page,kind,sourceFile,sources:[sourceFile],...opts});
  };
  for(const p of programs)scan.add(teamPath(slugFor(p.schoolName)));
  for(const d of districts)scan.add(SITE+d.profilePath);
  for(const p of editorials.values()){
    scan.add(p.page||teamPath(p.slug));
    if(p.published)add(p.page||teamPath(p.slug),'team',p.file,{slug:p.slug,sourceUrl:p.sourceUrl,verifiedAt:p.verifiedAt});
  }
  const sharedDue=[];
  for(const d of districts){
    // District 6 and 9 deliberately suppress the shared score feed on their
    // district routes, but individual team overlays still use the resolver.
    const games=getGames(d.slug,d.classification,d.district);
    const finals=games.filter(final);
    if(!finals.length)continue;
    const page=districtPath(d.slug);
    const sourceUrl=finals.find(g=>g.resultSourceUrl)?.resultSourceUrl||finals[0].sourceUrl;
    if(!['6a-district-6','6a-district-9'].includes(d.slug))
      add(page,'district','football-district-game-week.ts (effective resolver)',{slug:d.slug,sourceUrl});
    for(const p of programs.filter(p=>p.classification===d.classification&&p.division===d.division&&p.district===d.district)){
      if(!finals.some(g=>g.home===p.schoolName||g.away===p.schoolName))continue;
      const slug=slugFor(p.schoolName);
      add(teamPath(slug),'team','football-district-game-week.ts (effective team overlay)',{slug,sourceUrl});
    }
    for(const g of games.filter(g=>g.status==='scheduled'&&g.date<today)){
      const due={date:g.date,away:g.away,home:g.home,sourceFile:'football-district-game-week.ts'};
      if(enrolled.has(page))sharedDue.push({page,overdue:[due]});
      for(const p of programs.filter(p=>p.classification===d.classification&&p.division===d.division&&p.district===d.district&&(p.schoolName===g.home||p.schoolName===g.away))){
        const team=teamPath(slugFor(p.schoolName));
        if(enrolled.has(team))sharedDue.push({page:team,overdue:[due]});
      }
    }
  }
  // Standalone standings and scorecard data are published independently of
  // the general resolver; enroll their own page as well as their team links.
  add(districtPath('6a-district-16'),'district','District16Coverage.tsx',{slug:'6a-district-16'});
  add(districtPath('6a-district-21'),'district','District21TeamSeason.tsx',{slug:'6a-district-21'});
  for(const p of programs.filter(p=>p.classification==='6A'&&p.district===21)){
    const slug=slugFor(p.schoolName);
    add(teamPath(slug),'team','District21TeamSeason.tsx',{slug});
  }
  for(const g of matchups.games||[]){
    const page=matchupHub+'/'+g.slug;
    scan.add(page);
    // Upcoming matchup routes are monitored for their next final, even if
    // they do not yet publish one. Do not label them stale until game day passes.
    add(page,'matchup','football-matchups.snapshot.json',{slug:g.slug,sourceUrl:g.sourceUrl,verifiedAt:g.verifiedAt});
    if(final(g)||g.home.recordAtKickoff||g.away.recordAtKickoff)
      for(const team of [g.home,g.away])add(teamPath(team.slug),'team','football-matchups.snapshot.json',{slug:team.slug,sourceUrl:g.sourceUrl});
    if(g.status==='scheduled'&&g.date<today)sharedDue.push({page,overdue:[{date:g.date,away:g.away.name,home:g.home.name}]});
  }
  if(aubreyResults.verifiedResults.length)add(teamPath('aubrey'),'team','aubrey-auto-results.snapshot.json',{slug:'aubrey'});
  for(const row of reviewed.verifiedFinals)add(teamPath(row.slug),'team','football-manually-verified-finals-2026.snapshot.json',{slug:row.slug,sourceUrl:row.primarySourceUrl,verifiedAt:row.verifiedAt});
  add(matchupHub,'hub','football-matchups.snapshot.json',{sourceUrl:'https://www.uiltexas.org/maxpreps/'});
  add(bracketHub,'bracket','football-matchups.snapshot.json + UIL official brackets',{sourceUrl:'https://www.uiltexas.org/football/playoff-brackets'});
  for(const page of enrolled.keys())scan.add(page);
  const enrollment=[...enrolled.values()].sort((a,b)=>a.page.localeCompare(b.page));
  return {enrollment,sharedDue,scannedPages:[...scan].sort(),summary:{
    uilTeams:programs.length,uilDistricts:districts.length,scannedPages:scan.size,
    enrolledPages:enrollment.length,teams:enrollment.filter(p=>p.kind==='team').length,
    districts:enrollment.filter(p=>p.kind==='district').length,
    matchups:enrollment.filter(p=>p.kind==='matchup').length,hubs:2}};
}
