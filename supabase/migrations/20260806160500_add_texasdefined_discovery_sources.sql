-- TexasDefined lifestyle discovery sources.
-- These feeds intentionally exclude politics-first coverage and are designed for
-- travel, culture, health, education, sports, and relocation editorial angles.

WITH sources(platform, source_name, source_url, rss_url, category, notes, enabled) AS (
  VALUES
    ('rss', 'Texas Universities and Campus Life — Google News', 'https://news.google.com/', 'https://news.google.com/rss/search?q=%28%22Texas+A%26M%22+OR+%22University+of+Texas%22+OR+%22Texas+Tech%22+OR+%22UT+System%22%29+%28campus+OR+research+OR+student+OR+tradition+OR+ranking%29+when%3A7d&hl=en-US&gl=US&ceid=US%3Aen', 'Education', 'TexasDefined: campus life, research, traditions, rankings, and major non-political university stories.', true),
    ('rss', 'Texas Hospitals, Health and Rankings — Google News', 'https://news.google.com/', 'https://news.google.com/rss/search?q=%28Texas+hospital+OR+%22Houston+Methodist%22+OR+%22UT+Southwestern%22+OR+%22Baylor+University+Medical+Center%22%29+%28ranking+OR+health+OR+wellness+OR+research%29+when%3A7d&hl=en-US&gl=US&ceid=US%3Aen', 'Health', 'TexasDefined: hospital rankings, wellness, medical research, and healthcare lifestyle coverage.', true),
    ('rss', 'Moving to Texas and Relocation — Google News', 'https://news.google.com/', 'https://news.google.com/rss/search?q=%28%22moving+to+Texas%22+OR+Texas+relocation+OR+Texas+migration+OR+Texas+population%29+%28city+OR+metro+OR+neighborhood+OR+cost+of+living+OR+lifestyle%29+when%3A7d&hl=en-US&gl=US&ceid=US%3Aen', 'Moving', 'TexasDefined: relocation, metro growth, neighborhoods, cost of living, and lifestyle migration stories.', true),
    ('rss', 'Texas Culture and Attractions — Google News', 'https://news.google.com/', 'https://news.google.com/rss/search?q=%28Texas+museum+OR+Texas+attraction+OR+Whataburger+OR+%22Six+Flags+Over+Texas%22+OR+Texas+festival%29+when%3A7d&hl=en-US&gl=US&ceid=US%3Aen', 'Culture', 'TexasDefined: museums, attractions, Texas brands, anniversaries, festivals, expansions, and statewide culture stories.', true),
    ('rss', 'Texas Sports and Fan Culture — Google News', 'https://news.google.com/', 'https://news.google.com/rss/search?q=%28Dallas+Cowboys+OR+Houston+Texans+OR+Texas+Rangers+OR+Houston+Astros+OR+FC+Dallas%29+%28fans+OR+stadium+OR+tradition+OR+community+OR+experience%29+when%3A7d&hl=en-US&gl=US&ceid=US%3Aen', 'Sports', 'TexasDefined: statewide sports, fan culture, stadium experiences, traditions, and community stories.', true)
)
INSERT INTO public.content_sources (platform, source_name, source_url, rss_url, category, notes, enabled)
SELECT s.*
FROM sources s
WHERE NOT EXISTS (
  SELECT 1 FROM public.content_sources existing
  WHERE lower(existing.rss_url) = lower(s.rss_url)
);

UPDATE public.content_sources existing
SET source_name = s.source_name,
    category = s.category,
    notes = s.notes,
    enabled = true
FROM sources s
WHERE lower(existing.rss_url) = lower(s.rss_url);
