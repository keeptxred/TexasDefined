-- Source enrollment for Lake Athens, Henderson County, Texas (Flat Creek).
-- TPWD old marina fee and access table may not match modern concessions.
-- Athens Municipal Water Authority's February 2025 local boating rules take
-- precedence over generalized reservoir recreation summaries.
-- No claim that a successful HTTP source check verifies the individual rules.
insert into td_maintenance.tpwd_lake_source_manifest (path,source_url)
values ('/fishing/lakes/lake-athens','https://tpwd.texas.gov/fishboat/fish/recreational/lakes/athens/')
on conflict(path) do update set source_url=excluded.source_url;

do $block$
begin
  if to_regclass('public.td_authority_verification_sources') is not null
    and to_regclass('public.td_authority_verification_registry') is not null then
    perform td_maintenance.enroll_tpwd_lake_sources();
  end if;
end;
$block$;
