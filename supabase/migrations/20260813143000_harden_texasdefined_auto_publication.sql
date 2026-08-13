-- Prepare TexasDefined's shared-backend article channel for future automation.
-- The scheduler remains disabled in GitHub. Publication requires an explicit
-- service-role RPC call after every source, quality, image and ownership gate.

ALTER TABLE public.texasdefined_articles
  ADD COLUMN IF NOT EXISTS hero_credit text,
  ADD COLUMN IF NOT EXISTS generator_model text,
  ADD COLUMN IF NOT EXISTS publication_method text NOT NULL DEFAULT 'manual'
    CHECK (publication_method IN ('manual', 'automated')),
  ADD COLUMN IF NOT EXISTS quality_score integer
    CHECK (quality_score IS NULL OR quality_score BETWEEN 0 AND 100);

CREATE OR REPLACE VIEW public.texasdefined_ready_queue
WITH (security_invoker = true)
AS
SELECT f.*
FROM public.texasdefined_story_queue f
WHERE f.texasdefined_slug IS NULL
  AND f.ready_for_rewrite IS TRUE
  AND coalesce(length(trim(f.extracted_body)), 0) >= 1200
  AND coalesce(f.classification_confidence, 0) >= 0.80
  AND coalesce(f.texas_relevance_score, 0) >= 70
  AND coalesce(f.source_reputation_score, 0) >= 60
  AND NOT EXISTS (
    SELECT 1 FROM public.texasdefined_articles a WHERE a.source_feed_id = f.id
  );

REVOKE ALL ON public.texasdefined_ready_queue FROM anon, authenticated;
GRANT SELECT ON public.texasdefined_ready_queue TO service_role;

CREATE OR REPLACE FUNCTION public.publish_texasdefined_queue_item_v2(
  p_feed_id bigint,
  p_slug text,
  p_title text,
  p_dek text,
  p_category text,
  p_region text,
  p_hero_url text,
  p_hero_alt text,
  p_hero_credit text,
  p_author_id text,
  p_tags text[],
  p_body_json jsonb,
  p_related_collections text[] DEFAULT '{}',
  p_related_destinations text[] DEFAULT '{}',
  p_generator_model text DEFAULT NULL,
  p_quality_score integer DEFAULT NULL
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_feed public.texas_news_feed%ROWTYPE;
  v_slug text := lower(trim(coalesce(p_slug, '')));
BEGIN
  SELECT * INTO v_feed FROM public.texas_news_feed WHERE id = p_feed_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Feed item % not found', p_feed_id; END IF;
  IF v_feed.target_site IS DISTINCT FROM 'texasdefined' THEN
    RAISE EXCEPTION 'Feed item % is routed to %, not TexasDefined', p_feed_id, coalesce(v_feed.target_site, 'unrouted');
  END IF;
  IF v_feed.texasdefined_slug IS NOT NULL THEN
    RAISE EXCEPTION 'Feed item % is already published as %', p_feed_id, v_feed.texasdefined_slug;
  END IF;
  IF v_feed.ready_for_rewrite IS DISTINCT FROM TRUE
     OR coalesce(length(trim(v_feed.extracted_body)), 0) < 1200
     OR coalesce(v_feed.classification_confidence, 0) < 0.80
     OR coalesce(v_feed.texas_relevance_score, 0) < 70
     OR coalesce(v_feed.source_reputation_score, 0) < 60 THEN
    RAISE EXCEPTION 'Feed item % has not cleared TexasDefined source and rewrite gates', p_feed_id;
  END IF;
  IF v_slug !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' OR length(v_slug) > 160 THEN
    RAISE EXCEPTION 'TexasDefined article slug is invalid';
  END IF;
  IF length(trim(coalesce(p_title, ''))) < 20 OR length(trim(coalesce(p_dek, ''))) < 80 THEN
    RAISE EXCEPTION 'TexasDefined article title/dek is too thin';
  END IF;
  IF jsonb_typeof(p_body_json) <> 'array'
     OR jsonb_array_length(p_body_json) < 8
     OR length(p_body_json::text) < 3500 THEN
    RAISE EXCEPTION 'TexasDefined article body is too thin or unstructured';
  END IF;
  IF coalesce(p_hero_url, '') !~ '^https://[^ ]+$' OR length(trim(coalesce(p_hero_alt, ''))) < 20 THEN
    RAISE EXCEPTION 'TexasDefined article requires an HTTPS hero image and descriptive alt text';
  END IF;
  IF coalesce(array_length(p_related_destinations, 1), 0) < 2 THEN
    RAISE EXCEPTION 'TexasDefined article requires at least two verified internal destination links';
  END IF;
  IF p_quality_score IS NULL OR p_quality_score < 85 OR p_quality_score > 100 THEN
    RAISE EXCEPTION 'TexasDefined article quality score must be between 85 and 100';
  END IF;

  INSERT INTO public.texasdefined_articles(
    source_feed_id, slug, title, dek, category, region, hero_url, hero_alt,
    hero_credit, author_id, tags, body_json, related_collections,
    related_destinations, status, source_name, source_url, canonical_url,
    generator_model, publication_method, quality_score, published_at, updated_at
  ) VALUES (
    p_feed_id, v_slug, trim(p_title), trim(p_dek), p_category, nullif(p_region, ''),
    p_hero_url, trim(p_hero_alt), nullif(trim(coalesce(p_hero_credit, '')), ''),
    coalesce(nullif(p_author_id, ''), 'a-hollis'), coalesce(p_tags, '{}'),
    p_body_json, coalesce(p_related_collections, '{}'),
    coalesce(p_related_destinations, '{}'), 'published', v_feed.source,
    v_feed.link, 'https://texasdefined.com/news/' || v_slug,
    nullif(p_generator_model, ''), 'automated', p_quality_score, now(), now()
  );

  UPDATE public.texas_news_feed SET texasdefined_slug = v_slug WHERE id = p_feed_id;
  RETURN v_slug;
END;
$$;

REVOKE ALL ON FUNCTION public.publish_texasdefined_queue_item_v2(bigint,text,text,text,text,text,text,text,text,text,text[],jsonb,text[],text[],text,integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.publish_texasdefined_queue_item_v2(bigint,text,text,text,text,text,text,text,text,text,text[],jsonb,text[],text[],text,integer) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.publish_texasdefined_queue_item_v2(bigint,text,text,text,text,text,text,text,text,text,text[],jsonb,text[],text[],text,integer) TO service_role;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'texasdefined-article-images',
  'texasdefined-article-images',
  true,
  10485760,
  ARRAY['image/png', 'image/jpeg', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

DROP POLICY IF EXISTS texasdefined_article_images_public_read ON storage.objects;
CREATE POLICY texasdefined_article_images_public_read
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'texasdefined-article-images');
