-- Newman's Castle evergreen guide: verified operator, heritage and photo-license source checks.
-- Maintains "awaiting_editorial_verification"; an HTTP 200 does not certify article facts.
-- 7-day interval reflects private visitor booking/hours changes and preserves site-wide
-- source monitoring through existing td-authority-enqueue-sources / collect-sources cron.
INSERT INTO public.td_authority_verification_registry
  (path,topic,cadence_days,status,next_review_at,updated_at)
VALUES (
  '/article/newmans-castle-bellville-texas',
  'private-attraction-visitor-operations',7,'awaiting_editorial_verification',now(),now()
)
ON CONFLICT (path) DO UPDATE
SET topic='private-attraction-visitor-operations',
    cadence_days=7,
    next_review_at=CASE
      WHEN public.td_authority_verification_registry.last_verified_at IS NOT NULL
      THEN least(public.td_authority_verification_registry.next_review_at,
        now()+interval '7 days')
      ELSE public.td_authority_verification_registry.next_review_at
    END,
    updated_at=now();

INSERT INTO public.td_authority_verification_sources
  (path,source_url,label,next_check_at)
VALUES
  ('/article/newmans-castle-bellville-texas','https://newmanscastle.com/',
   'Newman Castle official visitor information and reservations',now()),
  ('/article/newmans-castle-bellville-texas','https://newmanscastle.com/history/',
   'Newman Castle operator history',now()),
  ('/article/newmans-castle-bellville-texas','https://business.bellville.com/list/member/newman-s-castle-2139',
   'Bellville Chamber local visitor listing',now()),
  ('/article/newmans-castle-bellville-texas','https://austincountynewsonline.com/hello/newmans-castle-bellville/',
   'October 2025 family-operator interview',now()),
  ('/article/newmans-castle-bellville-texas','https://www.flickr.com/photos/57412095@N05/10611367506/',
   'A Yee IMG_2330 exact original photo and CC BY 2.0 license',now()),
  ('/article/newmans-castle-bellville-texas','https://creativecommons.org/licenses/by/2.0/',
   'Creative Commons Attribution 2.0 license terms',now())
ON CONFLICT (path,source_url) DO UPDATE
SET label=excluded.label;
