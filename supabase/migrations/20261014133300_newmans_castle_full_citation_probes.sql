-- Track every source directly cited by the Newman's Castle authority article.
-- The initial enrollment covered six operator, local, license and hero-photo URLs.
-- These ten historical, journalistic and interior-photo citations close the coverage gap.
-- HTTP reachability does NOT imply editorial fact verification. Some publishers return
-- an HTTP 200 JavaScript challenge; leave article editorial status unchanged.
-- Existing source checks, next-check timestamps and fingerprints are preserved.
INSERT INTO public.td_authority_verification_sources
  (path,source_url,label,next_check_at)
VALUES
  ('/article/newmans-castle-bellville-texas','https://www.legacy.com/us/obituaries/name/michael-newman-obituary?id=54620317',
   'Mike Newman''s family obituary, published by Schmidt Funeral Home',now()),
  ('/article/newmans-castle-bellville-texas','https://www.chron.com/culture/article/newmans-castle-texas-bellville-22321241.php',
   'Chron (June 28, 2026): castle maintenance and working drawbridge',now()),
  ('/article/newmans-castle-bellville-texas','https://schedule.rfdcc.com/rfdtv/getschedule/index.html',
   'RFD-TV 2026 programming: Texas Country Reporter Newman''s Castle segment',now()),
  ('/article/newmans-castle-bellville-texas','https://projects.texasmonthly.com/media-kit/tcr/',
   'Texas Monthly: ownership of Texas Country Reporter',now()),
  ('/article/newmans-castle-bellville-texas','https://texascooppower.com/king-of-his-own-castle/',
   'Texas Co-op Power (January 2011): Mike Newman interview and 3,400-square-foot size',now()),
  ('/article/newmans-castle-bellville-texas','https://www.houstoniamag.com/news-and-city-life/2013/06/the-prince-and-the-bakery-may-2013',
   'Houstonia (2013): assistant Jose Cummings, 42-foot keep, five 24-foot turrets, and cinderblock/stucco construction',now()),
  ('/article/newmans-castle-bellville-texas','https://abc7amarillo.com/amazing-america/texas-medieval-castle-alligator-moat-drawbridge-roadside-attraction',
   'Amazing America / ABC7 Amarillo (May 2026): reported but unconfirmed alligator claims',now()),
  ('/article/newmans-castle-bellville-texas','https://wish.org/sites/default/files/2025-08/SEALY_080625_MAKEAWISH.pdf',
   'The Sealy News (August 2025): Make-A-Wish royal celebration held at Newman''s Castle',now()),
  ('/article/newmans-castle-bellville-texas','https://www.flickr.com/photos/57412095@N05/10610391246/',
   'A Yee (Arturo Yee): IMG_2314 at Newman''s Castle, October 24, 2013 — CC BY 2.0',now()),
  ('/article/newmans-castle-bellville-texas','https://www.flickr.com/photos/57412095@N05/10610466805/',
   'A Yee (Arturo Yee): IMG_2342 at Newman''s Castle, October 24, 2013 — CC BY 2.0',now())
ON CONFLICT (path,source_url) DO UPDATE
SET label=excluded.label;
