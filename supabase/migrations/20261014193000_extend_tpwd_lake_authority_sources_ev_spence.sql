-- Lake E. V. Spence official TPWD fishing-page enrollment.
-- The operator CRMWD must confirm day-of-visit launch usability: TWDB
-- documents extreme low water and TPWD marks Rough Creek closed.
-- HTTP source monitoring and fingerprints do not certify editorial facts.
insert into td_maintenance.tpwd_lake_source_manifest (path,source_url)
values ('/fishing/lakes/e-v-spence-reservoir', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/spence/')
on conflict (path) do update set source_url=excluded.source_url;

do $block$
begin
  if to_regclass('public.td_authority_verification_sources') is not null
    and to_regclass('public.td_authority_verification_registry') is not null then
    perform td_maintenance.enroll_tpwd_lake_sources();
  end if;
end;
$block$;
