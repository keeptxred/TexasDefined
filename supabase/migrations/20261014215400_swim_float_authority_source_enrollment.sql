-- Swimming holes and river tubing: operational primary-source enrollment.
-- Correct the sitemap-discovered 90-day, zero-source placeholder. Keep the
-- editorial record unverified until a person reviews the actual conditions.
-- HTTP reachability, an unchanged fingerprint, or a successful scheduled
-- probe NEVER proves that a swim area or tubing reach is currently open.
-- The existing td-authority-enqueue-sources and collect-sources cron jobs
-- flag changes and unreachable pages; they do not automatically reopen water.

INSERT INTO public.td_authority_verification_registry
  (path, topic, cadence_days, status, next_review_at, updated_at)
VALUES (
  '/explore/swimming-holes-river-tubing',
  'water-recreation-visitor-safety',
  7,
  'awaiting_editorial_verification',
  now(),
  now()
)
ON CONFLICT (path) DO UPDATE SET
  topic = EXCLUDED.topic,
  cadence_days = LEAST(public.td_authority_verification_registry.cadence_days, 7),
  next_review_at = LEAST(
    public.td_authority_verification_registry.next_review_at,
    COALESCE(public.td_authority_verification_registry.last_verified_at + interval '7 days', now())
  ),
  updated_at = now();

INSERT INTO public.td_authority_verification_sources
  (path, source_url, label, cadence_days, next_check_at)
VALUES
  ('/explore/swimming-holes-river-tubing',
   'https://www.newbraunfels.gov/comalriver',
   'New Braunfels current Comal River access and safety rules', 1, now()),
  ('/explore/swimming-holes-river-tubing',
   'https://newbraunfels.gov/3369/Guadalupe-River',
   'New Braunfels current Guadalupe River access and tubing restrictions', 1, now()),
  ('/explore/swimming-holes-river-tubing',
   'https://www.sanmarcostx.gov/facilities/facility/details/riovistapark-41',
   'San Marcos Rio Vista Park access and amenities', 1, now()),
  ('/explore/swimming-holes-river-tubing',
   'https://wimberleyparksandrec.com/blue-hole-swimming/',
   'Wimberley Blue Hole swimming reservations and season', 1, now()),
  ('/explore/swimming-holes-river-tubing',
   'https://www.austintexas.gov/services/visit-barton-springs-pool',
   'Austin Barton Springs Pool hours, admission, and closure notices', 1, now()),
  ('/explore/swimming-holes-river-tubing',
   'https://tpwd.texas.gov/state-parks/garner',
   'TPWD Garner State Park recreation and operating notices', 1, now()),
  ('/explore/swimming-holes-river-tubing',
   'https://tpwd.texas.gov/state-parks/blanco',
   'TPWD Blanco State Park water access and operating notices', 1, now()),
  ('/explore/swimming-holes-river-tubing',
   'https://tpwd.texas.gov/state-parks/abilene/alert/',
   'TPWD Abilene current no-swimming and lake closure alerts', 1, now()),
  ('/explore/swimming-holes-river-tubing',
   'https://tpwd.texas.gov/state-parks/abilene/fees-facilities/pool/swimming-pool/',
   'TPWD Abilene historic swimming pool renovation notice', 1, now()),
  ('/explore/swimming-holes-river-tubing',
   'https://tpwd.texas.gov/state-parks/parks/things-to-do/swimming-in-state-parks-1',
   'TPWD statewide swimming activities directory, not proof of open access', 7, now())
ON CONFLICT (path, source_url) DO UPDATE SET
  label = EXCLUDED.label,
  cadence_days = EXCLUDED.cadence_days,
  next_check_at = LEAST(public.td_authority_verification_sources.next_check_at, now());
