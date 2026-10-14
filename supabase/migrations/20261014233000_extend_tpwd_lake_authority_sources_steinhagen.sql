-- B.A. Steinhagen, actual seven access sites and operator alerts; HTTP probes are NOT editorial signoff.
insert into td_maintenance.tpwd_lake_source_manifest(path, source_url)
values ('/fishing/lakes/b-a-steinhagen-lake', 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/steinhagen/')
on conflict (path) do update set source_url=excluded.source_url;
do $enroll$
begin
 if to_regclass('public.td_authority_verification_registry') is not null
 and to_regclass('public.td_authority_verification_sources') is not null then
   perform td_maintenance.enroll_tpwd_lake_sources();
   insert into public.td_authority_verification_registry
     (path,topic,cadence_days,status,next_review_at,discovered_from)
   values ('/fishing/lakes/b-a-steinhagen-lake','fishing',1,'awaiting_editorial_verification',now(),'steinhagen-authority-2026-10-14')
   on conflict (path) do update set
    cadence_days=least(public.td_authority_verification_registry.cadence_days,excluded.cadence_days),
    next_review_at=least(public.td_authority_verification_registry.next_review_at,now()),
    updated_at=now();
   insert into public.td_authority_verification_sources(path,source_url,label,next_check_at)
   select '/fishing/lakes/b-a-steinhagen-lake', sources.url,sources.label,now()
   from (values
    ('https://tpwd.texas.gov/fishboat/fish/recreational/lakes/steinhagen/','TPWD fisheries, water body, species and special fish-consumption notice'),
    ('https://tpwd.texas.gov/fishboat/fish/recreational/lakes/steinhagen/access.phtml','TPWD seven named lake ramp and park access inventories'),
    ('https://www.swf-wc.usace.army.mil/townbluff/','USACE Town Bluff ramp/campground live open/closed operations and no-cash policy'),
    ('https://tpwd.texas.gov/state-parks/martin-dies-jr/alert','TPWD Hen House Ridge ramp and camping loop 2026/2027 closures'),
    ('https://tpwd.texas.gov/state-parks/martin-dies-jr/fees-facilities/campsites','TPWD camping inventory/booking, check loop-specific construction closures'),
    ('https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/ba_steinhagen/index.asp','TWDB 1947–1953 Dam B history and 1967 rename'),
    ('https://waterdatafortexas.org/reservoirs/individual/b-a-steinhagen','TWDB live level and elevation datum'),
    ('https://tpwd.texas.gov/regulations/outdoor-annual/fishing/general-rules-regulations/fish-consumption-bans-and-advisories','Current Neches/Steinhagen revised DSHS fish-consumption limits'),
    ('https://commons.wikimedia.org/wiki/File:Martin-Dies-Jr-State-Park.jpg','Original 2013 actual reservoir photograph Plazak CC BY-SA 3.0'),
    ('https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=extmetadata%7Csize&titles=File%3AMartin-Dies-Jr-State-Park.jpg&format=json','Original Commons 2100x1605 image ownership/licensing metadata')
   ) sources(url,label)
   on conflict(path,source_url) do nothing;
 end if;
end; $enroll$;
