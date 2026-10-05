const ORIGIN = "https://texasdefined.com";
const SITEMAP = `${ORIGIN}/sitemap-evergreen.xml`;
const USER_AGENT = "Mozilla/5.0 TexasDefinedProductionVerifier/1.0";
const MAX_ATTEMPTS = 10;
const RETRY_DELAY_MS = 30_000;
const REQUEST_TIMEOUT_MS = 30_000;

const slugs = [
  "sam-houston-texas-life-legacy", "davy-crockett-texas-alamo-legend", "william-barret-travis-alamo-commander",
  "james-bowie-texas-alamo-life-legend", "stephen-f-austin-father-of-texas", "mirabeau-b-lamar-president-republic-texas",
  "juan-seguin-tejano-texas-revolution", "audie-murphy-texas-war-hero-actor", "chester-nimitz-texas-fleet-admiral",
  "chris-kyle-texas-navy-seal-life-legacy", "heb-texas-grocery-history-culture", "bucees-texas-road-trip-history",
  "king-ranch-texas-history-cattle-legacy", "san-antonio-spurs-texas-basketball-culture",
  "texas-high-school-football-friday-night-lights", "san-antonio-stock-show-rodeo-history-guide",
  "fort-worth-stockyards-history-cattle-culture", "blue-bell-ice-cream-brenham-texas-history",
  "texas-oil-boom-wichita-falls-west-texas-rigs",
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const fetchWithTimeout = (url) => fetch(url, {
  headers: { "user-agent": USER_AGENT }, redirect: "follow", signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
});
const decodeHtml = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&apos;", "'");
const extractAttribute = (html, attribute, value, target) => {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`<[^>]+${attribute}=["']${escaped}["'][^>]+${target}=["']([^"']+)["']`, "i").exec(html)?.[1]
    ?? new RegExp(`<[^>]+${target}=["']([^"']+)["'][^>]+${attribute}=["']${escaped}["']`, "i").exec(html)?.[1] ?? null;
};
const robots = (html) => (html.match(/<meta[^>]+>/gi) ?? []).filter((tag) => /name=["']robots["']/i.test(tag))
  .flatMap((tag) => /content=["']([^"']+)["']/i.exec(tag)?.[1]?.toLowerCase() ?? []);
const primarySource = (html) => {
  const at = html.indexOf("Primary source:");
  if (at < 0) return null;
  const raw = /<a\b[^>]*href=["']([^"']+)["']/i.exec(html.slice(at, at + 1500))?.[1];
  if (!raw) return null;
  try { const url = new URL(decodeHtml(raw), ORIGIN); return url.protocol === "https:" && url.origin !== ORIGIN ? url.href : null; } catch { return null; }
};

async function verifyPage(slug) {
  const url = `${ORIGIN}/article/${slug}`;
  try {
    const response = await fetchWithTimeout(url);
    if (response.status !== 200) return console.log(`WAIT page=${response.status} ${url}`), false;
    const html = await response.text();
    if (/Story unavailable|This story is no longer available|page not found|404[^0-9].*not found/i.test(html)) return console.log(`WAIT fallback-page ${url}`), false;
    const canonical = decodeHtml(extractAttribute(html, "rel", "canonical", "href") ?? "");
    if (canonical !== url) return console.log(`WAIT canonical=${JSON.stringify(canonical)} expected=${url}`), false;
    const directives = robots(html);
    if (!directives.some((d) => d.includes("index") && d.includes("follow")) || directives.some((d) => d.includes("noindex") || d.includes("nofollow")))
      return console.log(`WAIT robots=${directives.join(" | ")} ${url}`), false;
    const decoded = decodeHtml(html);
    if (!/"@type"\s*:\s*"Article"/.test(decoded)) return console.log(`WAIT Article-schema ${url}`), false;
    const source = primarySource(decoded);
    if (!source || !decoded.includes("Sources and further reading")) return console.log(`WAIT sources ${url}`), false;
    const heroRaw = extractAttribute(html, "property", "og:image", "content");
    if (!heroRaw) return console.log(`WAIT hero-metadata ${url}`), false;
    const hero = new URL(decodeHtml(heroRaw), ORIGIN).href;
    const image = await fetchWithTimeout(hero);
    if (image.status !== 200 || !(image.headers.get("content-type") ?? "").toLowerCase().startsWith("image/"))
      return console.log(`WAIT hero=${image.status} ${hero} (${url})`), false;
    console.log(`PASS page=200 canonical=indexable schema=Article sources=https hero=200 ${url} source=${source}`);
    return true;
  } catch (error) {
    console.log(`WAIT request-error ${url}: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
  let sitemap = "";
  let sitemapStatus = 0;
  try { const response = await fetchWithTimeout(SITEMAP); sitemapStatus = response.status; sitemap = await response.text(); }
  catch (error) { console.log(`WAIT evergreen-sitemap=request-error ${error instanceof Error ? error.message : String(error)}`); }
  let failures = 0;
  for (const slug of slugs) {
    const url = `${ORIGIN}/article/${slug}`;
    if (sitemapStatus !== 200 || !sitemap.includes(url)) { console.log(`WAIT evergreen-sitemap=${sitemapStatus} missing=${url}`); failures += 1; continue; }
    if (!(await verifyPage(slug))) failures += 1;
  }
  if (!failures) {
    console.log("All 19 remote evergreen articles are live, canonical, indexable, sourced, image-backed, structured, and discoverable in the resilient evergreen sitemap.");
    process.exit(0);
  }
  console.log(`Production is not ready for ${failures} cohort check(s); attempt ${attempt}/${MAX_ATTEMPTS}.`);
  if (attempt < MAX_ATTEMPTS) await sleep(RETRY_DELAY_MS);
}
console.error("Remote evergreen production verification failed after deployment propagation window.");
process.exit(1);
