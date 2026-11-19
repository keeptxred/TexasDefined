import assert from "node:assert/strict";

// Read-only public release proof against the actual production domain.
// The existing post-deployment workflow reruns it after a successful release.
const ORIGIN = process.env.ATTRACTION_CHECK_ORIGIN || "https://texasdefined.com";
// Independent cache-busting per run; never rely on a search-engine cache.
const auditToken = `${Date.now()}-${process.env.GITHUB_RUN_ID || "manual"}`;
const targets = [
  { slug: "texas-freshwater-fisheries-center", name: "Texas Freshwater Fisheries Center", credit: "Larry D. Moore",
    facts: ["$5.50", "pets are not allowed", "summer 2027"] },
  { slug: "texas-forestry-museum-lufkin", name: "Texas Forestry Museum", credit: "Billy Hathorn",
    facts: ["$3 per person", "Angelina County", "sensory backpacks"] },
  { slug: "national-ranching-heritage-center-lubbock", name: "National Ranching Heritage Center", credit: "USDA NRCS Texas",
    facts: ["$50", "larger than 20", "service animals", "Illustrative Texas ranching photograph"] },
];
const userAgent = "Mozilla/5.0 (compatible; TexasDefinedApprovedAttractionsLiveCheck/1.0)";
function readAttr(tag, attr) {
  const match = tag.match(new RegExp("(?:^|\\s)" + attr + "\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)')", "i"));
  return match?.[1] ?? match?.[2] ?? null;
}
function tags(html, name) {
  return [...html.matchAll(new RegExp("<" + name + "\\b[^>]*>", "gi"))].map(match => match[0]);
}
async function get(url) {
  let last;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": userAgent, "cache-control": "no-cache, no-store, max-age=0", "pragma": "no-cache" },
        cache: "no-store",
        signal: AbortSignal.timeout(25000),
        redirect: "follow",
      });
      return { response, text: await response.text() };
    } catch (error) {
      last = error;
      if (attempt < 3) await new Promise(resolve => setTimeout(resolve, 600 * attempt));
    }
  }
  throw last;
}
const found = [];
for (const target of targets) {
  const canonical = ORIGIN + "/destination/" + target.slug;
  const data = await get(canonical + "?approved-attraction-audit=" + encodeURIComponent(auditToken));
  const response = data.response;
  const html = data.text;
  assert.equal(response.status, 200, target.slug + " production HTTP");
  assert.ok(html.length > 12000, target.slug + " expected substantive SSR HTML");
  assert.ok(!/noindex/i.test(response.headers.get("x-robots-tag") || ""), target.slug + " X-Robots-Tag");
  const meta = tags(html, "meta");
  for (const tag of meta) {
    if (["robots", "googlebot"].includes((readAttr(tag, "name") || "").toLowerCase())) {
      assert.ok(!/noindex/i.test(readAttr(tag, "content") || ""), target.slug + " meta robots");
    }
  }
  const canonicalLinks = tags(html, "link").filter(tag => (readAttr(tag, "rel") || "").toLowerCase() === "canonical");
  assert.equal(canonicalLinks.length, 1, target.slug + " exactly one canonical");
  assert.equal(readAttr(canonicalLinks[0], "href"), canonical, target.slug + " self canonical");
  assert.ok(/<h1\b/i.test(html) && html.includes(target.name), target.slug + " correct title and H1");
  assert.ok(html.includes("TouristAttraction"), target.slug + " TouristAttraction JSON-LD");
  assert.ok(html.includes(target.credit), target.slug + " visible rights attribution");
  // React SSR can split a museum heading into text/element/comment nodes.
  // Inspect actual heading text, not a brittle literal HTML substring.
  const headings = [...html.matchAll(/<h[2-4]\b[^>]*>([\s\S]*?)<\/h[2-4]>/gi)]
    .map(match => match[1].replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").trim().toLowerCase());
  const faqHeadings = headings.filter(heading => heading.includes("frequently asked questions about") && heading.includes(target.name.toLowerCase()));
  assert.equal(faqHeadings.length, 1, target.slug + " exactly one primary FAQ heading");
  const lower = html.toLowerCase();
  for (const fact of target.facts) {
    assert.ok(lower.includes(fact.toLowerCase()), target.slug + " missing visitor fact " + fact);
  }
  const images = tags(html, "img");
  assert.ok(images.some(tag => /alt=/i.test(tag) && /src=/i.test(tag)), target.slug + " accessible image");
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/<[^>]*>/g, "").trim() || "";
  const description = meta.map(tag => (readAttr(tag, "name") || "").toLowerCase() === "description" ? readAttr(tag, "content") : null).find(Boolean) || "";
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const mainText = (html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ").replace(/&[a-z]+;|&#\d+;/gi, " ");
  const mainWords = mainText.trim().split(/\s+/).filter(Boolean).length;
  const anchorLinks = tags(html, "a").map(tag => readAttr(tag, "href")).filter(Boolean);
  const sameSiteLinks = anchorLinks.filter(url => url.startsWith("/") || url.startsWith(ORIGIN));
  const operator = target.slug.includes("fisheries") ? "tpwd.texas.gov" : target.slug.includes("forestry") ? "treetexas.com" : "ranchingheritage.org";
  const officialLinks = anchorLinks.filter(url => url.includes(operator)).length;
  const altImages = images.filter(tag => (readAttr(tag, "alt") || "").trim().length > 7).length;
  assert.ok(title.length > 30 && title.length <= 100, target.slug + " descriptive, bounded title");
  assert.ok(description.length >= 85 && description.length <= 220, target.slug + " substantive meta description");
  assert.equal(h1Count, 1, target.slug + " exactly one H1");
  assert.ok(mainWords >= 650, target.slug + " >=650 server-rendered main-content words");
  assert.ok(sameSiteLinks.length >= 5, target.slug + " internal discovery links");
  assert.ok(officialLinks >= 2, target.slug + " direct operator source links");
  assert.ok(altImages >= 1, target.slug + " meaningful image alternative text");
  const evidence = {
    observedAt: new Date().toISOString(), url: canonical, cacheBustingToken: auditToken,
    http: response.status, responseDate: response.headers.get("date"),
    cdnCache: response.headers.get("cf-cache-status"), age: response.headers.get("age"),
    htmlBytes: Buffer.byteLength(html, "utf8"), mainWords,
    title, titleLength: title.length, descriptionLength: description.length,
    h1Count, faqSections: faqHeadings.length,
    internalAnchors: sameSiteLinks.length, officialAnchors: officialLinks, altImages
  };
  console.log("NO_CACHE_LIVE_AUDIT " + JSON.stringify(evidence));
  console.log("PASS " + canonical + ": HTTP 200, indexable robots, canonical, schema, sourced facts, image, SEO elements, source links and FAQ");
  found.push(canonical);
}
const sitemapData = await get(ORIGIN + "/sitemap-explore.xml?approved-attraction-audit=" + encodeURIComponent(auditToken));
assert.equal(sitemapData.response.status, 200, "live Explore sitemap HTTP");
for (const canonical of found) {
  assert.ok(sitemapData.text.includes("<loc>" + canonical + "</loc>"), "Missing live sitemap canonical " + canonical);
}
console.log("PASS: all three approved attraction guides are public and present in the production Explore sitemap.");