const ORIGIN = "https://texasdefined.com";
const USER_AGENT = "Mozilla/5.0 TexasDefinedProductionVerifier/1.0";
const MAX_ATTEMPTS = 10;
const RETRY_DELAY_MS = 30_000;
const REQUEST_TIMEOUT_MS = 30_000;

const slugs = [
  "sam-houston-texas-life-legacy",
  "davy-crockett-texas-alamo-legend",
  "william-barret-travis-alamo-commander",
  "james-bowie-texas-alamo-life-legend",
  "stephen-f-austin-father-of-texas",
  "mirabeau-b-lamar-president-republic-texas",
  "juan-seguin-tejano-texas-revolution",
  "audie-murphy-texas-war-hero-actor",
  "chester-nimitz-texas-fleet-admiral",
  "chris-kyle-texas-navy-seal-life-legacy",
  "heb-texas-grocery-history-culture",
  "bucees-texas-road-trip-history",
  "king-ranch-texas-history-cattle-legacy",
  "san-antonio-spurs-texas-basketball-culture",
  "texas-high-school-football-friday-night-lights",
  "san-antonio-stock-show-rodeo-history-guide",
  "fort-worth-stockyards-history-cattle-culture",
  "blue-bell-ice-cream-brenham-texas-history",
  "texas-oil-boom-wichita-falls-west-texas-rigs",
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithTimeout = (url) =>
  fetch(url, {
    headers: { "user-agent": USER_AGENT },
    redirect: "follow",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

const decodeHtml = (value) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'");

const extractAttribute = (html, attribute, value, target) => {
  const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const first = new RegExp(
    `<[^>]+${attribute}=["']${escapedValue}["'][^>]+${target}=["']([^"']+)["']`,
    "i",
  );
  const second = new RegExp(
    `<[^>]+${target}=["']([^"']+)["'][^>]+${attribute}=["']${escapedValue}["']`,
    "i",
  );
  return first.exec(html)?.[1] ?? second.exec(html)?.[1] ?? null;
};

const extractRobotsDirectives = (html) => {
  const directives = [];
  for (const tag of html.match(/<meta[^>]+>/gi) ?? []) {
    if (!/name=["']robots["']/i.test(tag)) continue;
    const content = /content=["']([^"']+)["']/i.exec(tag)?.[1];
    if (content) directives.push(content.toLowerCase());
  }
  return directives;
};

const extractPrimarySourceHref = (html) => {
  const markerIndex = html.indexOf("Primary source:");
  if (markerIndex < 0) return null;

  const sourceBlock = html.slice(markerIndex, markerIndex + 1_500);
  const hrefRaw = /<a\b[^>]*href=["']([^"']+)["'][^>]*>/i.exec(sourceBlock)?.[1];
  if (!hrefRaw) return null;

  try {
    const href = new URL(decodeHtml(hrefRaw), ORIGIN);
    if (href.protocol !== "https:" || href.origin === ORIGIN) return null;
    return href.href;
  } catch {
    return null;
  }
};

async function verifyPage(slug) {
  const url = `${ORIGIN}/article/${slug}`;

  try {
    const response = await fetchWithTimeout(url);
    if (response.status !== 200) {
      console.log(`WAIT page=${response.status} ${url}`);
      return false;
    }

    const html = await response.text();
    if (/Story unavailable|This story is no longer available|page not found|404[^0-9].*not found/i.test(html)) {
      console.log(`WAIT fallback-page ${url}`);
      return false;
    }

    const canonicalRaw = extractAttribute(html, "rel", "canonical", "href");
    const canonical = canonicalRaw ? decodeHtml(canonicalRaw) : null;
    if (canonical !== url) {
      console.log(`WAIT canonical=${JSON.stringify(canonical)} expected=${url}`);
      return false;
    }

    const robotsDirectives = extractRobotsDirectives(html);
    if (robotsDirectives.length === 0) {
      console.log(`WAIT robots=missing ${url}`);
      return false;
    }
    if (robotsDirectives.some((directives) => directives.includes("noindex") || directives.includes("nofollow"))) {
      console.log(`WAIT robots=${robotsDirectives.join(" | ")} ${url}`);
      return false;
    }
    if (!robotsDirectives.some((directives) => directives.includes("index") && directives.includes("follow"))) {
      console.log(`WAIT robots=index-follow-missing ${robotsDirectives.join(" | ")} ${url}`);
      return false;
    }

    const decoded = decodeHtml(html);
    if (!/"@type"\s*:\s*"Article"/.test(decoded)) {
      console.log(`WAIT Article-schema ${url}`);
      return false;
    }
    const primarySourceHref = extractPrimarySourceHref(decoded);
    if (!primarySourceHref) {
      console.log(`WAIT primary-source-link ${url}`);
      return false;
    }
    if (!decoded.includes("Sources and further reading")) {
      console.log(`WAIT multi-source-section ${url}`);
      return false;
    }

    const heroRaw = extractAttribute(html, "property", "og:image", "content");
    if (!heroRaw) {
      console.log(`WAIT hero-metadata ${url}`);
      return false;
    }

    const hero = new URL(decodeHtml(heroRaw), ORIGIN).href;
    const imageResponse = await fetchWithTimeout(hero);
    const imageType = imageResponse.headers.get("content-type") ?? "";
    if (imageResponse.status !== 200 || !imageType.toLowerCase().startsWith("image/")) {
      console.log(`WAIT hero=${imageResponse.status} mime=${imageType} ${hero} (${url})`);
      return false;
    }

    console.log(
      `PASS page=200 canonical=indexable schema=Article sources=https hero=200 ${url} source=${primarySourceHref}`,
    );
    return true;
  } catch (error) {
    console.log(`WAIT request-error ${url}: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
  let sitemap = "";
  let sitemapStatus = 0;

  try {
    const sitemapResponse = await fetchWithTimeout(`${ORIGIN}/sitemap.xml`);
    sitemapStatus = sitemapResponse.status;
    sitemap = await sitemapResponse.text();
  } catch (error) {
    console.log(`WAIT sitemap=request-error ${error instanceof Error ? error.message : String(error)}`);
  }

  let failures = 0;
  for (const slug of slugs) {
    const url = `${ORIGIN}/article/${slug}`;
    if (sitemapStatus !== 200 || !sitemap.includes(url)) {
      console.log(`WAIT sitemap=${sitemapStatus} missing=${url}`);
      failures += 1;
      continue;
    }

    if (!(await verifyPage(slug))) failures += 1;
  }

  if (failures === 0) {
    console.log(
      "All 19 remote evergreen articles are live, canonical, indexable, sourced, image-backed, structured, and discoverable in the primary sitemap.",
    );
    process.exit(0);
  }

  console.log(`Production is not ready for ${failures} cohort check(s); attempt ${attempt}/${MAX_ATTEMPTS}.`);
  if (attempt < MAX_ATTEMPTS) await sleep(RETRY_DELAY_MS);
}

console.error("Remote evergreen production verification failed after deployment propagation window.");
process.exit(1);
