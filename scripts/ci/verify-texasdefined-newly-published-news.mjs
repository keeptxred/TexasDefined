#!/usr/bin/env node
/**
 * Exact-URL live acceptance after a successful protected newsroom publication.
 * This checks actual public HTML and sitemap output, not merely the RPC result.
 */
const root = 'https://texasdefined.com';
const input = process.argv[2] || '';
const candidate = new URL(input, root);
const expectedSource = process.argv[3] || '';
if (!/^https:\/\/[^\s]+$/.test(expectedSource)) throw new Error('Expected exact HTTPS original publisher URL');
if (candidate.origin !== root || !/^\/news\/[a-z0-9-]+$/.test(candidate.pathname)) {
  throw new Error('Expected exact TexasDefined public /news/{slug} URL');
}
function publishedArticleSchema(html, expectedUrl, expectedSource) {
  const scriptBlocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const [, raw] of scriptBlocks) {
    let record;
    try { record = JSON.parse(raw.trim()); } catch { continue; }
    const nodes = [...(Array.isArray(record) ? record : [record]), ...(Array.isArray(record?.['@graph']) ? record['@graph'] : [])];
    const article = nodes.find(node => node?.['@type'] === 'NewsArticle'
      && node?.url === expectedUrl && node?.citation === expectedSource);
    if (article && typeof article.headline === 'string' && article.headline.length >= 20
        && typeof article.datePublished === 'string'
        && typeof article.author?.url === 'string'
        && typeof article.image?.url === 'string'
        && /illustration/i.test(String(article.image?.caption || ''))
        && /AI-generated editorial illustration/i.test(String(article.image?.creditText || ''))) return article;
  }
  return null;
}
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const request = async (path, attempt) => {
  const url = new URL(path, root);
  url.searchParams.set('td_article_accept', String(Date.now()) + '-' + attempt);
  const r = await fetch(url, { cache: 'no-store', redirect: 'follow', signal: AbortSignal.timeout(30_000) });
  return { ok: r.ok && r.headers.get('cf-mitigated') !== 'challenge', status: r.status, text: await r.text() };
};
let failure = '';
for (let attempt = 1; attempt <= 6; attempt += 1) {
  try {
    const [story, index, sitemap] = await Promise.all([
      request(candidate.pathname, attempt), request('/news', attempt), request('/sitemap.xml', attempt),
    ]);
    const canonical = root + candidate.pathname;
    const checks = {
      storyHttp200: story.ok && story.status === 200,
      storyCanonical: story.text.includes(canonical),
      sourceAttribution: story.text.includes(expectedSource) || story.text.includes(expectedSource.replace(/&/g, '&amp;')),
      byline: story.text.includes('/authors/'),
      articleSchema: Boolean(publishedArticleSchema(story.text, canonical, expectedSource)),
      noNoindex: !/<meta[^>]*name=[\"']robots[\"'][^>]*noindex/i.test(story.text),
      newsListing: index.ok && index.text.includes(candidate.pathname),
      sitemap: sitemap.ok && sitemap.text.includes('<loc>' + canonical + '</loc>'),
    };
    if (Object.values(checks).every(Boolean)) {
      console.log(JSON.stringify({ verified: true, url: canonical, ...checks }));
      process.exit(0);
    }
    failure = JSON.stringify({ status: story.status, checks });
  } catch (error) {
    failure = String(error?.message || error);
  }
  if (attempt < 6) await sleep(8_000);
}
throw new Error('Published TexasDefined article is not production-certified: ' + candidate.href + ': ' + failure);
