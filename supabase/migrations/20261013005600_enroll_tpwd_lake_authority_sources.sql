-- Register actual TexasDefined lake-specific TPWD sources already present in
-- its independently curated 54-guide research dataset. This is source
-- monitoring enrollment, NEVER automatic editorial/fact verification.
-- Four pending routes auto-enroll only after a real canonical sitemap entry exists.
-- Keep the manifest replay-safe in disposable schema-only CI databases: the
-- pre-existing authority verification registry is a separately installed
-- operations system, not necessarily part of the clean-room network schema.
create schema if not exists td_maintenance;
create table if not exists td_maintenance.tpwd_lake_source_manifest (
 path text primary key,
 source_url text not null check (source_url like 'https://tpwd.texas.gov/%'),
 evidence_note text not null default 'TPWD lake source published in TexasDefined fishing authority dataset; claim-level editorial verification still required'
);
alter table td_maintenance.tpwd_lake_source_manifest enable row level security;
revoke all on td_maintenance.tpwd_lake_source_manifest from public, anon, authenticated;

insert into td_maintenance.tpwd_lake_source_manifest (path,source_url) values
  ('/fishing/lakes/aquilla-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/aquilla/'),
  ('/fishing/lakes/alan-henry-reservoir', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/alan_henry/'),
  ('/fishing/lakes/amistad-reservoir', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/amistad/'),
  ('/fishing/lakes/bardwell-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bardwell/'),
  ('/fishing/lakes/belton-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/belton/'),
  ('/fishing/lakes/benbrook-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/benbrook/'),
  ('/fishing/lakes/caddo-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/caddo/'),
  ('/fishing/lakes/calaveras-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/calaveras/'),
  ('/fishing/lakes/canyon-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/canyon/'),
  ('/fishing/lakes/cedar-creek-reservoir', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cedar_creek/'),
  ('/fishing/lakes/cedar-lake-cleburne-state-park', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cleburnesp/'),
  ('/fishing/lakes/choke-canyon-reservoir', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/choke_canyon/'),
  ('/fishing/lakes/eagle-mountain-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/eagle_mountain/'),
  ('/fishing/lakes/falcon-international-reservoir', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/falcon/'),
  ('/fishing/lakes/fayette-county-reservoir', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fayette/'),
  ('/fishing/lakes/granger-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/granger/'),
  ('/fishing/lakes/grapevine-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/grapevine/'),
  ('/fishing/lakes/joe-pool-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/joe_pool/'),
  ('/fishing/lakes/lake-arrowhead', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/arrowhead/'),
  ('/fishing/lakes/lake-arlington', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/arlington/'),
  ('/fishing/lakes/lake-austin', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/austin/'),
  ('/fishing/lakes/lake-bastrop', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bastrop/'),
  ('/fishing/lakes/lake-bob-sandlin', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bob_sandlin/'),
  ('/fishing/lakes/lake-bridgeport', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bridgeport/'),
  ('/fishing/lakes/lake-brownwood', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/brownwood/'),
  ('/fishing/lakes/lake-buchanan', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/buchanan/'),
  ('/fishing/lakes/lake-casa-blanca', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/casa_blanca/'),
  ('/fishing/lakes/lake-colorado-city', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/colorado_city/'),
  ('/fishing/lakes/lake-conroe', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/index.phtml'),
  ('/fishing/lakes/lake-corpus-christi', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/corpus_christi/'),
  ('/fishing/lakes/lake-fork', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/'),
  ('/fishing/lakes/lake-georgetown', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/georgetown/'),
  ('/fishing/lakes/lake-granbury', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/granbury/'),
  ('/fishing/lakes/lake-houston', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/houston/'),
  ('/fishing/lakes/lake-lavon', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lavon/'),
  ('/fishing/lakes/lake-lbj', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lbj/'),
  ('/fishing/lakes/lake-livingston', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/livingston/'),
  ('/fishing/lakes/lake-meredith', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/meredith/'),
  ('/fishing/lakes/lake-mineral-wells', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/mineral_wells/'),
  ('/fishing/lakes/lake-nacogdoches', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/nacogdoches/'),
  ('/fishing/lakes/lake-o-the-pines', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lop/'),
  ('/fishing/lakes/lake-palestine', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/palestine/'),
  ('/fishing/lakes/lake-ray-hubbard', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/ray_hubbard/'),
  ('/fishing/lakes/lake-somerville', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/somerville/'),
  ('/fishing/lakes/lake-stamford', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/stamford/'),
  ('/fishing/lakes/lake-sweetwater', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sweetwater/'),
  ('/fishing/lakes/lake-tawakoni', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/tawakoni/'),
  ('/fishing/lakes/lake-texoma', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/texoma/'),
  ('/fishing/lakes/lake-travis', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/travis/'),
  ('/fishing/lakes/lake-waco', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/waco/'),
  ('/fishing/lakes/lake-worth', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/worth/'),
  ('/fishing/lakes/lake-whitney', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/whitney/'),
  ('/fishing/lakes/lewisville-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lewisville/'),
  ('/fishing/lakes/o-h-ivie-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/o_h_ivie/'),
  ('/fishing/lakes/possum-kingdom-reservoir', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/possum_kingdom/'),
  ('/fishing/lakes/proctor-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/proctor/'),
  ('/fishing/lakes/ray-roberts-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/ray_roberts/'),
  ('/fishing/lakes/richland-chambers-reservoir', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/richland_chambers/'),
  ('/fishing/lakes/sam-rayburn-reservoir', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sam_rayburn/'),
  ('/fishing/lakes/stillhouse-hollow-reservoir', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/stillhouse_hollow/'),
  ('/fishing/lakes/white-rock-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/white_rock/'),
  ('/fishing/lakes/toledo-bend-reservoir', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/toledo_bend/')
on conflict(path) do update set source_url=excluded.source_url;

create or replace function td_maintenance.enroll_tpwd_lake_sources()
returns integer
language plpgsql
security invoker
set search_path=''
as $function$
declare result_count integer;
begin
  with inserted as (
    insert into public.td_authority_verification_sources(path,source_url,label,next_check_at)
    select m.path,m.source_url,
           'Official TPWD lake-specific profile — claim verification still required',now()
    from td_maintenance.tpwd_lake_source_manifest m
    join public.td_authority_verification_registry r on r.path=m.path
    on conflict (path,source_url) do nothing returning path
  )
  select count(*) into result_count from inserted;
  return result_count;
end;
$function$;
revoke all on function td_maintenance.enroll_tpwd_lake_sources() from public, anon, authenticated;
-- Only enroll source watchers when both live editorial registry tables exist.
-- Clean-room migration replay intentionally skips this operations integration.
do $block$
begin
 if to_regclass('public.td_authority_verification_sources') is not null
    and to_regclass('public.td_authority_verification_registry') is not null then
   perform td_maintenance.enroll_tpwd_lake_sources();
 end if;
 if to_regclass('cron.job') is not null then
   if not exists(select 1 from cron.job where jobname='td-authority-enroll-tpwd-lake-sources') then
     perform cron.schedule('td-authority-enroll-tpwd-lake-sources','54 4 * * *',
       'select td_maintenance.enroll_tpwd_lake_sources();');
   end if;
 end if;
end;
$block$;
