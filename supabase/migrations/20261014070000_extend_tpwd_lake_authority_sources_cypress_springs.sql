-- Enrollment for Lake Cypress Springs source-researched fishing authority.
-- TPWD's older $2/day and "open year round" ramp data is not current
-- operating certification. Franklin County Water District's rules (updated
-- August 2026) control closures, vessel dimensions and camping permissions.
-- HTTP availability/fingerprints are not equivalent to editorial verification.
insert into td_maintenance.tpwd_lake_source_manifest (path,source_url)
values ('/fishing/lakes/lake-cypress-springs', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cypress_springs/')
on conflict (path) do update set source_url=excluded.source_url;

do $block$
begin
  if to_regclass('public.td_authority_verification_sources') is not null
    and to_regclass('public.td_authority_verification_registry') is not null then
    perform td_maintenance.enroll_tpwd_lake_sources();
  end if;
end;
$block$;
