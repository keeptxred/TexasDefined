-- Source monitoring for the newly researched Medina Lake authority guide.
-- A reachable official source is not an editorial acceptance or ramp-open certification.
insert into td_maintenance.tpwd_lake_source_manifest (path,source_url) values
  ('/fishing/lakes/medina-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/medina/')
on conflict (path) do update set source_url=excluded.source_url;

do $block$
begin
  if to_regclass('public.td_authority_verification_sources') is not null
    and to_regclass('public.td_authority_verification_registry') is not null then
    perform td_maintenance.enroll_tpwd_lake_sources();
  end if;
end;
$block$;
