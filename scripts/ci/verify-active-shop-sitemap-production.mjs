// Bounded live verification. This file is intentionally NOT part of PR checks:
// it requires the changed sitemap and upstream paginated catalog to be deployed.
const ORIGIN = "https://texasdefined.com";
const API_ORIGIN = "https://keeptxred.com";
const ua = "TexasDefined-ShopSitemapParity/1.0";
const fetchPage = async (url) => {
  const response = await fetch(url, { headers: { "user-agent": ua, "cache-control": "no-cache" }, signal: AbortSignal.timeout(15000) });
  const text = await response.text();
  if (response.status !== 200) throw new Error(`${url} returned HTTP ${response.status}`);
  return text;
};
const decode = s => s.replace(/&amp;/g, "&");
const robots = await fetchPage(`${ORIGIN}/robots.txt`);
const index = await fetchPage(`${ORIGIN}/sitemap-index.xml`);
const sitemapUrl = `${ORIGIN}/sitemap-shop.xml`;
if (!robots.includes(`Sitemap: ${sitemapUrl}`)) throw Error("Shop sitemap missing from production robots.txt");
if (!index.includes(`<loc>${sitemapUrl}</loc>`)) throw Error("Shop sitemap missing from production sitemap index");
const xml = await fetchPage(sitemapUrl);
if (!/<urlset\b/i.test(xml)) throw Error("Shop sitemap must be XML urlset");
const urls = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map(x => decode(x[1].trim()));
const sitemapProducts = new Set(urls);
if (urls.length !== sitemapProducts.size) throw Error("Duplicate product URLs in shop sitemap");
if (urls.some(u => !/^https:\/\/texasdefined\.com\/shop\/product\/[^/?#]+$/.test(u))) {
  throw Error("Shop sitemap contains non-canonical or variant URL");
}
const apiIds = new Set();
const pageSize = 250;
for (let offset = 0; offset < 10000; offset += pageSize) {
  const endpoint = new URL("/api/public/store-products", API_ORIGIN);
  endpoint.searchParams.set("site","texasdefined");
  endpoint.searchParams.set("limit",String(pageSize));
  endpoint.searchParams.set("offset",String(offset));
  const parsed = JSON.parse(await fetchPage(endpoint.href));
  if (!parsed.ok || !Array.isArray(parsed.products)) throw Error("Catalog response invalid at offset "+offset);
  for (const product of parsed.products) {
    if (!product.id || !product.title || !product.imageUrl) continue;
    if (apiIds.has(product.id)) throw Error("Published catalog repeated ID "+product.id);
    apiIds.add(product.id);
  }
  if (parsed.products.length < pageSize) break;
  if (offset + pageSize >= 10000) throw Error("Catalog exceeds sitemap parity bound");
}
const expected = new Set([...apiIds].map(id => `${ORIGIN}/shop/product/${encodeURIComponent(id)}`));
const missing = [...expected].filter(url => !sitemapProducts.has(url));
const extra = [...sitemapProducts].filter(url => !expected.has(url));
console.log(JSON.stringify({catalogProducts: expected.size, sitemapProducts: sitemapProducts.size, missing, extra}));
if (missing.length || extra.length) throw Error(`Shop sitemap parity failed: ${missing.length} missing, ${extra.length} unpublished`);
for (const url of [...expected].slice(0, 5)) {
  const html = await fetchPage(url);
  const linkTags = html.match(/<link\b[^>]*>/gi) ?? [];
  const canonical = linkTags.find(tag => /\brel=["']canonical["']/i.test(tag));
  if (!canonical?.includes(url)) throw Error("Canonical missing or incorrect on "+url);
  if (/<meta\b[^>]*name=["'](?:robots|googlebot)["'][^>]*content=["'][^"']*noindex/i.test(html)) {
    throw Error("Active product page is noindex: "+url);
  }
}
console.log(`PASS: ${expected.size} live assigned shop products have exactly one canonical URL in advertised sitemap, sample product pages indexable`);
