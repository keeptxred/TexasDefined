-- Lake Tyler East/West shares one TPWD lake profile and one canonical authority
-- page; source monitoring does not constitute operator or editorial verification.
insert into td_maintenance.tpwd_lake_source_manifest(path,source_url) values
  ('/fishing/lakes/lake-tyler', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/tyler/')
on conflict(path) do update set source_url=excluded.source_url;

do $block$
begin
  if to_regclass('public.td_authority_verification_sources') is not null
    and to_regclass('public.td_authority_verification_registry') is not null then
    perform td_maintenance.enroll_tpwd_lake_sources();
  end if;
end;
$block$;
