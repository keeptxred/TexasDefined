import { readFile } from "node:fs/promises";
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
      const canonicals = tags.filter(tag => /\brel\s*=\s*["']canonical["']/i.test(tag));
      if (canonicals.length !== 1) throw Error("expected one canonical tag, found " + canonicals.length);
      const canonical = canonicals[0];
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

// These three previously approved attractions also require independently checked
// production JSON-LD, licensed image delivery, and relevant city/county discovery.
const reviewedCatalogSource = await readFile(new URL("../../src/data/reviewed-attraction-authorities.ts", import.meta.url), "utf8");
const reviewedCatalogMarker = "export const reviewedAttractionDestinations: Destination[] = ";
if (!reviewedCatalogSource.includes(reviewedCatalogMarker)) throw Error("Missing reviewed attraction ledger");
const reviewedCatalog = JSON.parse(reviewedCatalogSource.split(reviewedCatalogMarker)[1].trim().replace(/;\s*$/, ""));
const sourceLastmod = new Map(reviewedCatalog.map((guide) => ["/destination/" + guide.slug, guide.updatedAt ?? guide.sourceCheckedAt]));
// Compare against actual live <lastmod>, not merely the presence of a URL.
for (const path of explore.filter((name) => sourceLastmod.has(name))) {
  const loc = "<loc>" + origin + path + "</loc>";
  const offset = exploreSitemap.body.indexOf(loc);
  const start = exploreSitemap.body.lastIndexOf("<url>", offset);
  const end = exploreSitemap.body.indexOf("</url>", offset);
  const row = start >= 0 && end >= 0 ? exploreSitemap.body.slice(start, end + 6) : "";
  const expected = sourceLastmod.get(path);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(expected ?? "") || !row.includes("<lastmod>" + expected + "</lastmod>")) {
    failures.push({ path, error: "live sitemap lastmod differs from verified source/editorial change date: " + String(expected) });
  }
}

const attractionCertification = [
  { path: "/destination/san-antonio-japanese-tea-garden", name: "San Antonio Japanese Tea Garden",
    creator: "Jouaienttoi", license: "https://creativecommons.org/licenses/by-sa/4.0/",
    file: "San_Antonio_Japanese_Tea_Garden_2022.jpg", city: "/city/san-antonio", county: "/county/bexar" },
  { path: "/destination/fort-worth-water-gardens", name: "Fort Worth Water Gardens",
    creator: "Farragutful", license: "https://creativecommons.org/licenses/by-sa/4.0/",
    file: "Fort_Worth_Water_Gardens_01.jpg", city: "/city/fort-worth", county: "/county/tarrant" },
  { path: "/destination/houston-botanic-garden", name: "Houston Botanic Garden",
    creator: "WhisperToMe", license: "https://creativecommons.org/publicdomain/zero/1.0/",
    file: "Houston_Botanic_Garden.jpg", city: "/city/houston", county: "/county/harris" },
];
function structuredGraph(html) {
  const nodes = [];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    const json = JSON.parse(match[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
    nodes.push(...(Array.isArray(json["@graph"]) ? json["@graph"] : [json]));
  }
  return nodes;
}
for (const guide of attractionCertification) {
  try {
    const { body } = await fetchLive(guide.path);
    // A Googlebot user-agent probe is useful evidence but does not prove Google IP access.
    const crawler = await fetch(origin + guide.path, {
      headers: { "user-agent": "Googlebot/2.1 (+http://www.google.com/bot.html)", "cache-control": "no-cache" },
      redirect: "manual", signal: AbortSignal.timeout(15000),
    });
    const crawlerHtml = await crawler.text();
    if (crawler.status !== 200 || !crawlerHtml.includes(guide.name) ||
      /\bnoindex\b/i.test(crawler.headers.get("x-robots-tag") ?? "")) {
      throw Error("Googlebot user-agent lacks indexable, named SSR document (HTTP " + crawler.status + ")");
    }
    // Reject the previously observed unrelated Grapevine recommendation on the
    // Fort Worth guide; keep genuinely local museum guides instead.
    if (guide.path === "/destination/fort-worth-water-gardens" &&
        /href=["']\/destination\/grapevine(?:["'?#/])/i.test(body)) {
      throw Error("unrelated Grapevine recommendation remains in Fort Worth destination links");
    }
    if (!body.includes("<title>") || !body.includes(guide.name)) throw Error("missing named title");
    if (!/<meta\b[^>]*name=["']description["'][^>]*content=["'][^"']{50,}["']/i.test(body)) {
      throw Error("missing substantial SSR meta description");
    }
    if (!new RegExp("<h1\\b[^>]*>\\s*" + guide.name + "\\s*</h1>", "i").test(body)) {
      throw Error("missing original named SSR H1");
    }
    if (!body.includes("Research sources") || !body.includes("Planning your visit")) {
      throw Error("visitor guidance or official research missing in server HTML");
    }
    const graph = structuredGraph(body);
    const canonical = origin + guide.path;
    const entity = graph.find((node) => node["@id"] === canonical + "#attraction");
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList" && node["@id"] === canonical + "#breadcrumbs");
    if (!entity || !breadcrumb || !Array.isArray(breadcrumb.itemListElement)) {
      throw Error("missing attraction or consistent BreadcrumbList schema");
    }
    if (entity.url !== canonical || !Array.isArray(entity.image)) throw Error("attraction URL or ImageObject missing");
    const image = entity.image.find((node) => node["@type"] === "ImageObject");
    if (!image || image.creator?.name !== guide.creator || image.license !== guide.license ||
      image.acquireLicensePage !== "https://commons.wikimedia.org/wiki/File:" + guide.file ||
      image["@id"] !== canonical + "#primaryimage" ||
      !image.contentUrl?.includes(guide.file) || image.width !== 1280 || image.height !== 960 ||
      !image.copyrightNotice) {
      throw Error("licensed image provenance, identity or declared dimensions mismatched");
    }
    const picture = await fetch(image.contentUrl, {
      headers: { "user-agent": "TexasDefined-AttractionImageHealth/1.0", Accept: "image/jpeg,image/webp,image/png" },
      redirect: "follow", signal: AbortSignal.timeout(15000),
    });
    const mediaType = picture.headers.get("content-type") ?? "";
    if (!picture.ok || !/^image\/(?:jpeg|png|webp)/i.test(mediaType)) {
      throw Error("hero delivery failed: HTTP " + picture.status + " content type " + mediaType);
    }
    // All three vetted Commons originals are JPEG. Decode the delivered pixel
    // dimensions instead of trusting the ImageObject width/height declarations.
    if (!/^image\/jpeg\b/i.test(mediaType)) throw Error("unrecognized hero media: " + mediaType);
    const bytes = new Uint8Array(await picture.arrayBuffer());
    if (bytes.length < 500 || bytes.length > 2_000_000 || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
      throw Error("invalid or oversized delivered JPEG");
    }
    let dimensions = null;
    for (let i = 2; i + 9 < bytes.length;) {
      if (bytes[i] !== 0xff) { i++; continue; }
      const marker = bytes[i + 1];
      if (marker === 0xd9 || marker === 0xda) break;
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
      const length = (bytes[i + 2] << 8) | bytes[i + 3];
      if (length < 2 || i + 2 + length > bytes.length) break;
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
        dimensions = { height: (bytes[i + 5] << 8) | bytes[i + 6], width: (bytes[i + 7] << 8) | bytes[i + 8] };
        break;
      }
      i += 2 + length;
    }
    if (dimensions?.width !== image.width || dimensions?.height !== image.height) {
      throw Error("actual hero pixels " + JSON.stringify(dimensions) + " differ from ImageObject " + image.width + "x" + image.height);
    }
  } catch (error) {
    failures.push({ path: guide.path, error: "attraction certification: " + String(error) });
  }
}
for (const guide of attractionCertification) {
  for (const context of [guide.city, guide.county]) {
    try {
      const page = await fetchLive(context);
      if (!page.body.includes('href="' + guide.path + '"')) {
        throw Error("canonical contextual link missing");
      }
    } catch (error) {
      failures.push({ path: context, error: "inbound to " + guide.path + ": " + String(error) });
    }
  }
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
