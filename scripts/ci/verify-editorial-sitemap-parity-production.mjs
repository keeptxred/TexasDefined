// Site-owned, bounded verifier. Execute after deployment and on the weekly GitHub schedule.
const origin = "https://texasdefined.com";
const headers = { "user-agent": "TexasDefined-EditorialSitemapParity/1.0", "cache-control": "no-cache" };
const explore = [
  "/destination/blanco",
  "/destination/blue-hole-wimberley",
  "/destination/caddo-lake",
  "/destination/fort-worth-water-gardens",
  "/destination/houston-botanic-garden",
  "/destination/san-antonio-japanese-tea-garden",
  "/explore/big-bend-scenic-drives",
  "/explore/lighthouses",
];
const main = ["/network/terms"];
async function fetchLive(path) {
  const response = await fetch(origin + path, { headers, redirect: "manual", signal: AbortSignal.timeout(15000) });
  const body = await response.text();
  if (response.status !== 200) throw Error(path + " returned HTTP " + response.status);
  return { body, headers: response.headers };
}
function locs(xml) {
  if (!/<(?:urlset|sitemapindex)\b/.test(xml)) throw Error("Malformed XML sitemap");
  return [...xml.matchAll(/<loc(?:\s[^>]*)?>([\s\S]*?)<\/loc>/g)].map(m => m[1].trim().replace(/&amp;/g, "&"));
}
const [robots, index, exploreSitemap, mainSitemap] = await Promise.all([
  fetchLive("/robots.txt"), fetchLive("/sitemap-index.xml"),
  fetchLive("/sitemap-explore.xml"), fetchLive("/sitemap.xml"),
]);
for (const path of ["/sitemap-explore.xml", "/sitemap.xml"]) {
  if (!robots.body.includes("Sitemap: " + origin + path)) throw Error(path + " not advertised in robots.txt");
  if (!locs(index.body).includes(origin + path)) throw Error(path + " omitted from sitemap index");
}
const sitemapUrls = { explore: locs(exploreSitemap.body), main: locs(mainSitemap.body) };
const failures = [];
for (const [owner, paths] of [["explore", explore], ["main", main]]) {
  for (const path of paths) {
    const found = sitemapUrls[owner].filter(value => value === origin + path).length;
    if (found !== 1) failures.push({ path, error: "sitemap count " + found + ", expected 1" });
  }
}
const allPaths = [...explore, ...main];
for (let i = 0; i < allPaths.length; i += 3) {
  const batch = await Promise.all(allPaths.slice(i, i + 3).map(async (path) => {
    try {
      const page = await fetchLive(path);
      const tags = page.body.match(/<link\b[^>]*>/gi) ?? [];
      const canonical = tags.find(tag => /\brel\s*=\s*["']canonical["']/i.test(tag));
      const href = canonical?.match(/\bhref\s*=\s*(["'])(.*?)\1/i)?.[2];
      if (href !== origin + path) throw Error("self canonical missing or incorrect");
      const robotsMeta = (page.body.match(/<meta\b[^>]*>/gi) ?? [])
        .filter(tag => /\bname\s*=\s*["'](?:robots|googlebot)["']/i.test(tag));
      if (robotsMeta.some(tag => /\bnoindex\b/i.test(tag)) || /\bnoindex\b/i.test(page.headers.get("x-robots-tag") ?? "")) {
        throw Error("noindex directive on public canonical page");
      }
      return null;
    } catch (error) { return { path, error: String(error) }; }
  }));
  failures.push(...batch.filter(Boolean));
}
console.log(JSON.stringify({
  date: new Date().toISOString(),
  editorialPages: explore.length, legalPages: main.length, inspected: allPaths.length,
  exploreSitemapEntries: sitemapUrls.explore.length, mainSitemapEntries: sitemapUrls.main.length,
  emergencyExploreFallback: exploreSitemap.headers.get("x-texasdefined-sitemap-fallback") || "0",
  failures,
}));
if (failures.length) throw Error("Editorial and public legal sitemap parity failed for " + failures.length + " URLs");
console.log("PASS: eight editorial pages and public Network terms page are live, self-canonical, indexable and listed once in their correct XML sitemap");
