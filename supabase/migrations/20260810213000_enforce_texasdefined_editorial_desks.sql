-- TexasDefined publishes institutional desk bylines unless a separately approved
-- real-author system is introduced. The legacy IDs are intentionally retained so
-- existing article references remain stable while no fictional human identity is
-- exposed to readers or structured data.

UPDATE public.texasdefined_articles
SET author_id = CASE
  WHEN author_id IN ('a-hollis', 'a-marisol', 'a-dell') THEN author_id
  ELSE 'a-hollis'
END
WHERE author_id IS NULL
   OR author_id NOT IN ('a-hollis', 'a-marisol', 'a-dell');

ALTER TABLE public.texasdefined_articles
  ALTER COLUMN author_id SET DEFAULT 'a-hollis',
  ALTER COLUMN author_id SET NOT NULL;

ALTER TABLE public.texasdefined_articles
  DROP CONSTRAINT IF EXISTS texasdefined_articles_author_id_is_editorial_desk;

ALTER TABLE public.texasdefined_articles
  ADD CONSTRAINT texasdefined_articles_author_id_is_editorial_desk
  CHECK (author_id IN ('a-hollis', 'a-marisol', 'a-dell'));

COMMENT ON COLUMN public.texasdefined_articles.author_id IS
  'Institutional Texas Defined editorial desk ID. a-hollis = Editorial Desk; a-marisol = Food & Culture Desk; a-dell = Travel & Outdoors Desk. These are not human contributor identities.';
