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

-- Lake-specific, repeatable monitoring for operator restrictions, water
-- levels, dam history and exact-image rights. Daily checks do not set
-- last_verified_at: human/editorial factual verification remains separate.
do $sources$
begin
  if to_regclass('public.td_authority_verification_registry') is not null
    and to_regclass('public.td_authority_verification_sources') is not null then
    insert into public.td_authority_verification_registry
      (path, topic, cadence_days, status, next_review_at, discovered_from)
    values
      ('/fishing/lakes/e-v-spence-reservoir', 'fishing', 1,
       'awaiting_editorial_verification', now(), 'lake-authority-spence-researched-2026-10-14')
    on conflict (path) do update set
      cadence_days = least(public.td_authority_verification_registry.cadence_days, excluded.cadence_days),
      next_review_at = least(public.td_authority_verification_registry.next_review_at, now()),
      updated_at = now();

    insert into public.td_authority_verification_sources
      (path, source_url, label, next_check_at)
    select '/fishing/lakes/e-v-spence-reservoir', refs.url, refs.label, now()
    from (values
      ('https://tpwd.texas.gov/fishboat/fish/recreational/lakes/spence/',
       'TPWD lake identity, fishery and historic golden-alga damage'),
      ('https://tpwd.texas.gov/fishboat/fish/recreational/lakes/spence/access.phtml',
       'TPWD site-by-site ramp and bank access; Rough Creek closure'),
      ('https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/ev_spence/index.asp',
       'TWDB permit, dam chronology and reservoir surveys'),
      ('https://waterdatafortexas.org/reservoirs/individual/e-v-spence',
       'Live timestamped level and storage measurements'),
      ('https://www.crmwd.org/', 'Reservoir owner and operator CRMWD'),
      ('https://commons.wikimedia.org/wiki/Category:Reservoirs_in_Texas',
       'Wikimedia Commons reservoir photo location reference'),
      ('https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=extmetadata%7Csize&titles=File%3AEV_Spence_Reservoir_TX.jpg&format=json',
       'Original Commons photo license and dimensions')
    ) refs(url, label)
    on conflict (path, source_url) do nothing;
  end if;
end;
$sources$;
