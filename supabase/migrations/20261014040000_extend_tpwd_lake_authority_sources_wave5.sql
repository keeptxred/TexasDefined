-- Add two independently researched, TPWD-matched lake sources without
-- rewriting the already-shipped October 13 manifest migration.
-- Durable source reachability is NOT editorial fact certification.
insert into td_maintenance.tpwd_lake_source_manifest (path,source_url) values
  ('/fishing/lakes/lake-nasworthy', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/nasworthy/'),
  ('/fishing/lakes/fort-parker-state-park-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fort_parker/')
on conflict (path) do update set source_url=excluded.source_url;

do $block$
begin
  if to_regclass('public.td_authority_verification_sources') is not null
    and to_regclass('public.td_authority_verification_registry') is not null then
    perform td_maintenance.enroll_tpwd_lake_sources();
  end if;
end;
$block$;
