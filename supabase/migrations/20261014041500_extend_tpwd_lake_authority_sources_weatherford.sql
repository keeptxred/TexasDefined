-- Register the individually researched Lake Weatherford public guide in the durable
-- TPWD source manifest. Source reachability is NOT a claim of live boat-ramp,
-- fishery, editorial or public-production verification.
insert into td_maintenance.tpwd_lake_source_manifest (path,source_url) values
  ('/fishing/lakes/lake-weatherford', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/weatherford/')
on conflict (path) do update set source_url=excluded.source_url;

do $block$
begin
  if to_regclass('public.td_authority_verification_sources') is not null
    and to_regclass('public.td_authority_verification_registry') is not null then
    perform td_maintenance.enroll_tpwd_lake_sources();
  end if;
end;
$block$;
