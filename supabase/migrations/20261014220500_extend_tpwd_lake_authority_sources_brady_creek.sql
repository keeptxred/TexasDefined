-- Brady Creek Reservoir / Brady Lake source enrollment.
-- HTTP retrieval is evidence that a URL is reachable, not that its claims or
-- time-sensitive boat ramp and camping operations have been editorially certified.
insert into td_maintenance.tpwd_lake_source_manifest (path, source_url)
values ('/fishing/lakes/brady-creek-reservoir', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/brady_creek/')
on conflict (path) do update set source_url = excluded.source_url;

do $enroll$
begin
  if to_regclass('public.td_authority_verification_registry') is not null
  and to_regclass('public.td_authority_verification_sources') is not null then
    perform td_maintenance.enroll_tpwd_lake_sources();
    insert into public.td_authority_verification_registry
      (path, topic, cadence_days, status, next_review_at, discovered_from)
    values
      ('/fishing/lakes/brady-creek-reservoir', 'fishing', 1,
       'awaiting_editorial_verification', now(), 'brady-lake-authority-2026-10-14')
    on conflict (path) do update set
      cadence_days = least(public.td_authority_verification_registry.cadence_days, excluded.cadence_days),
      next_review_at = least(public.td_authority_verification_registry.next_review_at, now()),
      updated_at = now();

    insert into public.td_authority_verification_sources
      (path, source_url, label, next_check_at)
    select '/fishing/lakes/brady-creek-reservoir', refs.url, refs.label, now()
    from (values
      ('https://tpwd.texas.gov/fishboat/fish/recreational/lakes/brady_creek/',
       'TPWD lake-specific fishery quality, fishing techniques and golden-alga history'),
      ('https://tpwd.texas.gov/fishboat/fish/recreational/lakes/brady_creek/access.phtml',
       'TPWD City Park at Dam ramp high-water-only usability warning'),
      ('https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/brady_creek/index.asp',
       'TWDB original Brady Creek dam permit, construction and impoundment record'),
      ('https://waterdatafortexas.org/reservoirs/individual/brady-creek',
       'TWDB timestamped Brady Creek Reservoir storage and surface elevation'),
      ('https://www.bradytx.us/881/Brady-Lake',
       'City of Brady operator campground, cabin, RV, tent, marina and reservations'),
      ('https://commons.wikimedia.org/wiki/File:Brady_Lake_Texas_2021.jpg',
       'Actual Brady Lake image source by Larry D. Moore, May 2021'),
      ('https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=extmetadata%7Csize&titles=File%3ABrady_Lake_Texas_2021.jpg&format=json',
       'Commons exact-image creator, pixel dimensions and CC BY 4.0 license metadata')
    ) refs(url,label)
    on conflict (path,source_url) do nothing;
  end if;
end;
$enroll$;
