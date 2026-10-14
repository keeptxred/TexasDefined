// Every completed TPWD-matched lake in the authority coverage map must have a
// named, lake-specific official source in the durable enrollment manifest.
// Registry enrollment is still distinct from editorial factual verification.
import fs from 'node:fs';
const docs = JSON.parse(fs.readFileSync('docs/fishing/TPWD_LAKE_COVERAGE_GAP_MAP_2026-10-12.json','utf8'));
const manifest = [
  'supabase/migrations/20261013005600_enroll_tpwd_lake_authority_sources.sql',
  'supabase/migrations/20261014040000_extend_tpwd_lake_authority_sources_wave5.sql',
  'supabase/migrations/20261014040500_extend_tpwd_lake_authority_sources_tyler.sql',
  'supabase/migrations/20261014041000_extend_tpwd_lake_authority_sources_medina.sql',
  'supabase/migrations/20261014041500_extend_tpwd_lake_authority_sources_weatherford.sql',
  'supabase/migrations/20261014042500_extend_tpwd_lake_authority_sources_abilene.sql',
  'supabase/migrations/20261014070000_extend_tpwd_lake_authority_sources_cypress_springs.sql',
  'supabase/migrations/20261014081000_extend_tpwd_lake_authority_sources_bachman.sql',
  'supabase/migrations/20261014193000_extend_tpwd_lake_authority_sources_ev_spence.sql',
  'supabase/migrations/20261014220500_extend_tpwd_lake_authority_sources_brady_creek.sql',
].map(path=>fs.readFileSync(path,'utf8')).join('\n');
const entries=[...manifest.matchAll(/\('\/fishing\/lakes\/([a-z0-9-]+)',\s*'(https:\/\/tpwd\.texas\.gov\/fishboat\/fish\/recreational\/lakes\/[a-z0-9_/.-]+)'\)/g)];
const matched=docs.listing.filter(row=>row.coverage==='complete-fishing-guide').map(row=>row.texasDefinedGuideSlug);
const paths=new Map(entries.map((match)=>[match[1],match[2]]));
const errs=[];
if(entries.length!==paths.size)errs.push('Duplicate lake authority-source registrations in manifest');
for(const slug of matched){
  if(!paths.has(slug))errs.push('Completed fishing authority lake lacks an official TPWD monitoring source: '+slug);
}
for(const slug of paths.keys()){
  if(!matched.includes(slug))errs.push('Lake authority-source manifest includes an unconfirmed coverage item: '+slug);
}
const statewide=fs.readFileSync('src/data/fishing/statewide-lake-network.ts','utf8');
// Only real top-level lake definition rows are lake sources. An unanchored
// slug/name regex can mistake nearbyDestinations for an actual lake and
// erroneously assign that related destination the NEXT lake's TPWD slug.
const topLevel=[...statewide.matchAll(/^    slug:\s*"([a-z0-9-]+)",\s*name:\s*"[^"]+",/gm)];
if(topLevel.length===0)errs.push('No top-level statewide lake definitions recognized');
for(let i=0;i<topLevel.length;i++){
  const slug=topLevel[i][1];
  const end=i+1<topLevel.length?topLevel[i+1].index:statewide.indexOf('\n];',topLevel[i].index);
  const block=statewide.slice(topLevel[i].index,end>topLevel[i].index?end:undefined);
  const tpwd=block.match(/\btpwdSlug:\s*"([a-z0-9_]+)"/)?.[1];
  if(!tpwd){errs.push('Missing lake-specific TPWD slug in '+slug);continue;}
  const expected='https://tpwd.texas.gov/fishboat/fish/recreational/lakes/'+tpwd+'/';
  if(paths.get(slug)!==expected)errs.push('Wrong TPWD source for '+slug);
}
for(const requirement of [
  'td_maintenance.enroll_tpwd_lake_sources()',
  'join public.td_authority_verification_registry r on r.path=m.path',
  'on conflict (path,source_url) do nothing',
  'cron.schedule',
]){
 if(!manifest.includes(requirement))errs.push('Source enrollment guard missing: '+requirement);
}
if(errs.length){for(const error of errs)console.error('FAIL '+error);process.exit(1)}
console.log('PASS '+matched.length+' completed TPWD-matched fishing guides all have matching lake-specific official-source monitoring entries; fact verification remains separate.');
