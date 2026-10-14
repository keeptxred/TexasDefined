-- Enroll the five live TexasDefined reservoir-system guides in the existing
-- Supabase source-probing and editorial-review system.
-- Structural water-supply facts can change with operator revisions; review
-- published sources every 30 days. More frequently changing lake levels and
-- fishing conditions are managed by their separate, faster operational feeds.
-- Never mark editorial verification complete from HTTP response status alone.

INSERT INTO public.td_authority_verification_registry
(path,topic,cadence_days,status,next_review_at,updated_at)
VALUES
  ('/article/lake-buchanan-water-system-guide','reservoir-water-system',30,'awaiting_editorial_verification',now(),now()),
  ('/article/lake-travis-water-system-guide','reservoir-water-system',30,'awaiting_editorial_verification',now(),now()),
  ('/article/lake-whitney-water-system-guide','reservoir-water-system',30,'awaiting_editorial_verification',now(),now()),
  ('/article/possum-kingdom-water-system-guide','reservoir-water-system',30,'awaiting_editorial_verification',now(),now()),
  ('/article/toledo-bend-water-system-guide','reservoir-water-system',30,'awaiting_editorial_verification',now(),now())
ON CONFLICT (path) DO UPDATE SET
  topic='reservoir-water-system',
  cadence_days=30,
  updated_at=now();

INSERT INTO public.td_authority_verification_sources
(path,source_url,label,next_check_at)
VALUES
  ('/article/lake-buchanan-water-system-guide','https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/buchanan/','TWDB reservoir engineering and operating data',now()),
  ('/article/lake-buchanan-water-system-guide','https://www.lcra.org/water/dams-and-lakes/','LCRA official Highland Lakes operating and visitor information',now()),
  ('/article/lake-buchanan-water-system-guide','https://commons.wikimedia.org/wiki/File:Lake_Buchanan%2C_Texas_%289302%29.jpg','Original Lake Buchanan photograph credit and license',now()),
  ('/article/lake-travis-water-system-guide','https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/travis/index.asp','TWDB Lake Travis reservoir data',now()),
  ('/article/lake-travis-water-system-guide','https://www.lcra.org/water/flood-management/key-elevations-for-lake-travis-during-floods/','LCRA flood management and lake operations',now()),
  ('/article/lake-travis-water-system-guide','https://commons.wikimedia.org/wiki/File:Lake_travis_from_iguana_grill_2013.jpg','Original Lake Travis photograph attribution and reuse terms',now()),
  ('/article/lake-whitney-water-system-guide','https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/whitney/index.asp','TWDB Whitney Lake engineering and water-supply data',now()),
  ('/article/lake-whitney-water-system-guide','https://www.swf-wc.usace.army.mil/whitney/','US Army Corps Whitney Lake information',now()),
  ('/article/lake-whitney-water-system-guide','https://commons.wikimedia.org/wiki/File:Lake_Whitney_at_sunset6.jpg','Original Lake Whitney photo provenance and Creative Commons licensing',now()),
  ('/article/possum-kingdom-water-system-guide','https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/possum_kingdom/index.asp','TWDB Possum Kingdom engineering and reservoir data',now()),
  ('/article/possum-kingdom-water-system-guide','https://brazos.org/about-us/reservoirs/possum-kingdom-lake','Brazos River Authority current Possum Kingdom information',now()),
  ('/article/possum-kingdom-water-system-guide','https://commons.wikimedia.org/wiki/File:Possumkingdomlake.jpg','Original Possum Kingdom photo and license record',now()),
  ('/article/toledo-bend-water-system-guide','https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/toledo_bend/index.asp','TWDB Toledo Bend reservoir data',now()),
  ('/article/toledo-bend-water-system-guide','https://srala-toledo.com/sra/','Sabine River Authority Louisiana interstate reservoir management',now()),
  ('/article/toledo-bend-water-system-guide','https://commons.wikimedia.org/wiki/File:Sabine_National_Forest%2C_Toledo_Bend_Reservoir%2C_Texas.jpg','Original Toledo Bend photography and CC license',now())
ON CONFLICT (path,source_url) DO UPDATE SET label=EXCLUDED.label;
