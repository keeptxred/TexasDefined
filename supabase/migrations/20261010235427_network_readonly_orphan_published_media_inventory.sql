-- Applied to shared project as migration 20261010235427. Read-only, no deletion.
CREATE OR REPLACE FUNCTION public.list_texasdefined_network_orphan_published_media(p_min_age_days integer DEFAULT 45, p_limit integer DEFAULT 100)
 RETURNS TABLE(path text, uploaded_at timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
 IF p_min_age_days IS NULL OR p_min_age_days<30 OR p_min_age_days>365
 OR p_limit IS NULL OR p_limit<1 OR p_limit>100 THEN
  RAISE EXCEPTION 'Invalid published-media review range';
 END IF;
 RETURN QUERY
 SELECT o.name,o.created_at
 FROM storage.objects o
 WHERE o.bucket_id='texasdefined-network-published'
 AND o.created_at<now()-make_interval(days=>p_min_age_days)
 AND NOT EXISTS(
  SELECT 1 FROM public.texasdefined_network_public_listings l
  WHERE l.logo_storage_path=o.name
    OR o.name=ANY(coalesce(l.gallery_storage_paths,ARRAY[]::text[]))
    OR l.profile::text LIKE '%'||o.name||'%'
 )
 AND NOT EXISTS(
  SELECT 1 FROM public.texasdefined_network_profile_revisions r
  WHERE r.proposed_profile::text LIKE '%'||o.name||'%'
 )
 ORDER BY o.created_at,o.name LIMIT p_limit;
END;
$function$
;
REVOKE ALL ON FUNCTION public.list_texasdefined_network_orphan_published_media(integer,integer) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.list_texasdefined_network_orphan_published_media(integer,integer) TO service_role;
