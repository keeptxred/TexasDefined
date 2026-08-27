const SITE = "https://texasdefined.com";
const USER_AGENT = "Mozilla/5.0 TexasDefinedProductionVerifier/1.0";
const ATTEMPTS = 10;
const RETRY_MS = 30_000;

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

async function fetchWithTimeout(url, { method = "GET" } = {}) {
  const response = await fetch(url, {
    method,
    redirect: "follow",
    headers: { "user-agent": USER_AGENT, accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" },
    signal: AbortSignal.timeout(30_000),
  });
  return response;
}

function attrValue(tag, attribute) {
  const escaped = attribute.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = tag.match(new RegExp(`${escaped}\\s*=\\s*["']([^"']+)["']`, "i"));
  return match?.[1] ?? null;
}

function findTag(html, tagName, predicate) {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];
  return tags.find(predicate) ?? null;
}

function canonicalFromHtml(html) {
  const tag = findTag(html, "link", (candidate) => {
    const rel = attrValue(candidate, "rel")?.toLowerCase().split(/\s+/) ?? [];
    return rel.includes("canonical");
  });
  return tag ? attrValue(tag, "href") : null;
}

function robotsDirectives(html) {
  const directives = [];
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    if (attrValue(tag, "name")?.toLowerCase() !== "robots") continue;
    const content = attrValue(tag, "content");
    if (content) directives.push(content.toLowerCase());
  }
  return directives;
}

function ogImageFromHtml(html) {
  const tag = findTag(html, "meta", (candidate) => attrValue(candidate, "property")?.toLowerCase() === "og:image");
  return tag ? attrValue(tag, "content") : null;
}

async function verifyImage(url) {
  const response = await fetchWithTimeout(url);
  const type = response.headers.get("content-type") ?? "";
  if (!response.ok || !type.toLowerCase().startsWith("image/")) {
    throw new Error(`hero failed: status=${response.status} content-type=${type || "missing"} url=${url}`);
  }
}

async function verifyPage(slug) {
  const url = `${SITE}/article/${slug}`;
  const response = await fetchWithTimeout(url);
  const html = await response.text();

  if (response.status !== 200) throw new Error(`page status ${response.status}: ${url}`);
  if (/Story unavailable|This story is no longer available|page not found|404[^0-9].*not found/i.test(html)) {
    throw new Error(`fallback page detected: ${url}`);
  }

  const canonical = canonicalFromHtml(html);
  if (canonical !== url) throw new Error(`canonical mismatch: ${canonical ?? "missing"} != ${url}`);

  for (const directives of robotsDirectives(html)) {
    if (directives.includes("noindex") || directives.includes("nofollow")) {
      throw new Error(`blocked robots directives (${directives}): ${url}`);
    }
  }

  if (!/"@type"\s*:\s*"Article"/.test(html)) throw new Error(`Article structured data missing: ${url}`);
  if (!html.includes("Primary source:")) throw new Error(`visible primary source missing: ${url}`);
  if (!html.includes("Sources and further reading")) throw new Error(`visible multi-source section missing: ${url}`);

  let hero = ogImageFromHtml(html);
  if (!hero) throw new Error(`og:image missing: ${url}`);
  if (hero.startsWith("/")) hero = `${SITE}${hero}`;
  await verifyImage(hero);

  console.log(`PASS page=200 canonical=indexable schema=Article sources=visible hero=200 ${url}`);
}

async function verifyAttempt(attempt) {
  const sitemapResponse = await fetchWithTimeout(`${SITE}/sitemap.xml`);
  const sitemap = await sitemapResponse.text();
  const failures = [];

  if (sitemapResponse.status !== 200) {
    failures.push(`sitemap status ${sitemapResponse.status}`);
  }

  for (const slug of slugs) {
    const url = `${SITE}/article/${slug}`;
    if (!sitemap.includes(url)) {
      failures.push(`sitemap missing ${url}`);
      continue;
    }
    try {
      await verifyPage(slug);
    } catch (error) {
      failures.push(error instanceof Error ? error.message : String(error));
    }
  }

  if (failures.length === 0) {
    console.log("All 19 remote evergreen articles are live, canonical, indexable, sourced, image-backed, structured, and discoverable in the primary sitemap.");
    return true;
  }

  console.error(`Production is not ready for ${failures.length} cohort check(s); attempt ${attempt}/${ATTEMPTS}.`);
  for (const failure of failures) console.error(`WAIT ${failure}`);
  return false;
}

for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
  try {
    if (await verifyAttempt(attempt)) process.exit(0);
  } catch (error) {
    console.error(`WAIT verifier error on attempt ${attempt}/${ATTEMPTS}:`, error);
  }
  if (attempt < ATTEMPTS) await sleep(RETRY_MS);
}

console.error("Remote evergreen production verification failed after deployment propagation window.");
process.exit(1);
