-- Register official TPWD Bachman Lake source for the statewide lake authority inventory.
-- TPWD's fishing page lists a 5-HP motor restriction, while the July 2026
-- Dallas City Code §32-40 (current legal source) generally sets a 10.5-HP
-- operation ceiling with defined exceptions. These should not be conflated.
-- TPWD also calls the Shorecrest public ramp two lanes while an older survey
-- described one lane: current City of Dallas field conditions remain separate.
-- Probing source HTTP 200/fingerprint is NOT an editorial fact verification.
insert into td_maintenance.tpwd_lake_source_manifest(path, source_url)
values ('/fishing/lakes/bachman-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bachman/')
on conflict (path) do update set source_url=excluded.source_url;

do $block$
begin
  if to_regclass('public.td_authority_verification_sources') is not null
    and to_regclass('public.td_authority_verification_registry') is not null then
    perform td_maintenance.enroll_tpwd_lake_sources();
  end if;
end;
$block$;
