-- Enroll the new source-researched Lake Abilene authority guide in the TPWD
-- evidence and scheduled source-probe manifest. Even though the primary
-- lake directory lists the Dam and Creek ramps year-round, TPWD state park
-- warnings presently supersede them: both ramps are closed, lake swimming and
-- fishing prohibited; visiting a separate campground does not change that.
-- A successful HTTP response never marks the lake's current operating
-- conditions or editorial certification complete.
insert into td_maintenance.tpwd_lake_source_manifest (path,source_url)
values ('/fishing/lakes/lake-abilene', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/abilene/')
on conflict (path) do update set source_url=excluded.source_url;

do $block$
begin
  if to_regclass('public.td_authority_verification_sources') is not null
    and to_regclass('public.td_authority_verification_registry') is not null then
    perform td_maintenance.enroll_tpwd_lake_sources();
  end if;
end;
$block$;
