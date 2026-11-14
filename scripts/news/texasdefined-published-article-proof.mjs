/**
 * A live page must carry an actual exact-source NewsArticle JSON-LD graph.
 * This is evidence of correct metadata and attribution, not an independent
 * guarantee that a reported event is factual or that Google will index it.
 */
export function certifiedNewsArticleSchema(html, expectedUrl, expectedSource) {
  if (!/^https:\/\/texasdefined\.com\/news\/[a-z0-9-]+$/.test(expectedUrl)
      || !/^https:\/\/[^\s]+$/.test(expectedSource)) return null;
  const scripts = [...String(html ?? '').matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const [, json] of scripts) {
    let root;
    try { root = JSON.parse(json.trim()); } catch { continue; }
    const roots = Array.isArray(root) ? root : [root];
    const nodes = roots.flatMap(item => Array.isArray(item?.['@graph']) ? item['@graph'] : [item]);
    for (const item of nodes) {
      const types = Array.isArray(item?.['@type']) ? item['@type'] : [item?.['@type']];
      if (!types.includes('NewsArticle')) continue;
      if (item.url !== expectedUrl || item.citation !== expectedSource) continue;
      if (item.mainEntityOfPage?.['@id'] !== expectedUrl) continue;
      if (!item['@id']?.startsWith(expectedUrl+'#')) continue;
      if (!String(item.headline ?? '').trim() || !String(item.description ?? '').trim()) continue;
      if (!Number.isFinite(Date.parse(String(item.datePublished ?? '')))) continue;
      if (!item.author?.url?.startsWith('https://texasdefined.com/authors/')) continue;
      if (!item.publisher?.['@id']?.startsWith('https://texasdefined.com/')) continue;
      const image = item.image;
      if (!image || !String(image.url || '').startsWith('https://')) continue;
      if (!Number.isFinite(Number(image.width)) || Number(image.width) <= 0
          || !Number.isFinite(Number(image.height)) || Number(image.height) <= 0) continue;
      if (!/illustration/i.test(String(image.caption || ''))) continue;
      if (!/AI-generated editorial illustration/i.test(String(image.creditText || ''))) continue;
      return item;
    }
  }
  return null;
}
