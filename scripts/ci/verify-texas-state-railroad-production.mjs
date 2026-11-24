// Read-only production acceptance for the Texas State Railroad authority page.
// Never assert that old movie cars or active hospital/prison grounds are visitor sites.
const slug = "/article/texas-state-railroad-rusk-palestine-history-guide";
const origins = [
  "https://texasdefined.com",
  "https://texasdefined-site.freddy-coppola.workers.dev",
];
const failures = [];
for (const origin of origins) {
  const url = origin + slug + "?__railroad_authority_verify=" + Date.now();
  let html = "", status = 0, contentType = "";
  for (let attempt=1;attempt<=2;attempt++) {
    try {
      const response = await fetch(url, {
        headers: { Accept: "text/html", "Cache-Control":"no-cache", "User-Agent":"TexasDefinedRailroadAuthorityValidator/1.0" },
        signal: AbortSignal.timeout(24000),
        redirect: "follow",
      });
      status = response.status;
      contentType = response.headers.get("content-type") || "";
      html = await response.text();
      if (status === 200 && html.length > 1200) break;
    } catch (error) {
      if (attempt === 2) failures.push(origin + ": network error " + String(error));
    }
  }
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/<[^>]+>/g, "").trim() || "";
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<!--[\s\S]*?-->/g,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim() || "";
  const canonical = html.match(/<link\b(?=[^>]*rel=["']canonical["'])[^>]*href=["']([^"']+)["']/i)?.[1] || "";
  const hasNoindex = /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  const result = {origin,status,htmlBytes:html.length,contentType,title:title.slice(0,180),h1:h1.slice(0,180),canonical,hasNoindex};
  console.log(JSON.stringify(result));
  if (status !== 200 || !contentType.includes("text/html")) failures.push(origin + ": no 200 HTML response");
  if (!title.includes("Texas State Railroad")) failures.push(origin + ": missing railroad browser title");
  if (!h1.includes("Texas State Railroad")) failures.push(origin + ": missing railroad opening H1");
  if (canonical !== "https://texasdefined.com"+slug) failures.push(origin + ": missing/incorrect self-canonical");
  if (hasNoindex) failures.push(origin + ": article accidentally noindexed");
  if (!html.includes("1910 (Texas State Library) / 1913 (TSHA)")) failures.push(origin + ": source-attributed foundry closure chronology is not live");
}

const site = origins[0];
const museumPath = "/destination/heritage-center-cherokee-county-rusk";
const related = [
  "/county/anderson",
  "/county/cherokee",
  "/destination/palestine",
  museumPath,
  "/explore/scenic-trains",
  "/event/polar-express-palestine",
  "/article/texas-railroads-town-growth-explained",
  "/article/texas-historic-travel-transportation-guide",
];

const cached = new Map();
async function getPage(path, origin = site) {
  const key = origin + path;
  if (!cached.has(key)) {
    cached.set(key, (async () => {
      // A brief canonical origin timeout must not fail an otherwise healthy
      // release. Re-request the exact ordinary visitor URL; never switch to
      // a cache-busted URL or relax the subsequent content assertions.
      let lastError;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const response = await fetch(new URL(path, origin), {
            headers: { Accept: "text/html, application/xml;q=0.9", "User-Agent": "TexasDefinedRailroadAuthorityValidator/1.0" },
            signal: AbortSignal.timeout(attempt === 1 ? 30000 : 40000),
          });
          if (!response.ok) throw new Error(path + ": HTTP " + response.status);
          return await response.text();
        } catch (error) {
          lastError = error;
          if (attempt < 3) {
            console.warn(path + ": attempt " + attempt + " failed (" + String(error) + "), retrying the ordinary URL");
            await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
          }
        }
      }
      throw new Error(path + ": failed after 3 exact-URL attempts: " + String(lastError));
    })());
  }
  return cached.get(key);
}

function hasLink(html, path) {
  return [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)].some(([, href]) => {
    try {
      const url = new URL(href, site);
      return url.origin === site && url.pathname === path;
    } catch { return false; }
  });
}

function schemaNodes(html) {
  return [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .flatMap(([, json]) => {
      const item = JSON.parse(json);
      return item["@graph"] ?? [item];
    });
}

async function check(label, verify) {
  try { await verify(); }
  catch (error) { failures.push(label + ": " + error.message); }
}

const checks = related.map((path) => check(path, async () => {
  const [guide, page] = await Promise.all([getPage(slug), getPage(path)]);
  if (!hasLink(guide, path)) throw new Error("missing link from the guide");
  if (!hasLink(page, slug)) throw new Error("missing link back to the guide");
}));
checks.push(check("Guide metadata", async () => {
  const guide = await getPage(slug);
  if (!guide.includes("1910 (Texas State Library) / 1913 (TSHA)")) throw new Error("ordinary visitor HTML has stale, unqualified foundry-closure history; recheck canonical cache purge");
  const article = schemaNodes(guide).find((node) => ["Article", "NewsArticle", "BlogPosting"].some((type) => [node["@type"]].flat().includes(type)));
  if (!article?.headline || !article.datePublished || !article.dateModified || !article.image || !article.author) {
    throw new Error("incomplete Article structured data");
  }
  for (const name of ["description", "og:image", "twitter:card", "viewport"]) {
    if (!guide.includes('="' + name + '"')) throw new Error("missing " + name);
  }
}));
for (const origin of origins) checks.push(check("Museum source-freshness on ordinary HTML: " + origin, async () => {
  const page = await getPage(museumPath, origin); // Normal visitor URL: deliberately no cache-busting query.
  for (const [label, marker] of [
    ["attributed November 2026 hours", "The Cherokeean Herald reported on November 4, 2026"],
    ["2026 local reporting citation", "thecherokeean.com/articles/55397/view"],
    ["museum-curator 2023 source", "fliphtml5.com/mynmf/okij/Historic_Tour_of_Rusk/"],
    ["operator-hours caveat", "not direct confirmation from the museum"],
    ["Bonner Bank historical context", "1884 Bonner Bank"],
    ["historically documented model railway", "1890s Cherokee County model railway"],
    ["historical exhibit reporting citation", "thecherokeean.com/articles/44898/view"],
    ["Bonner Bank archival citation", "texashistory.unt.edu/ark:/67531/metapth614711/m1/1/"],
    ["Bonner Bank relocation correction", "completed relocation"],
    ["June 2018 exhibit date", "June 2018"],
    ["2025 hospital and sports display source", "theeasttexasweekend.com/2025/10/20/preserving-rusks-rich-history/"],
    ["2009 institutional history", "former Barr grocery store"],
    ["New Birmingham exhibit", "New Birmingham"],
    ["2022 curator interview source", "tpwmagazine.com/travel-culture/discover-the-east-texas-town-that-built-its-own-railroad/"],
    ["Rex Brasher exhibit", "Rex Brasher"],
  ]) {
    if (!page.includes(marker)) throw new Error("ordinary public museum HTML missing " + label + "; inspect edge cache versus current release");
  }
}));
checks.push(check("Museum photo and structured data", async () => {
  const page = await getPage(museumPath);
  if (/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(page)) throw new Error("museum is noindexed");
  const museum = schemaNodes(page).find((node) => [node["@type"]].flat().includes("Museum"));
  if (!museum?.image?.some((image) => image.license === "https://creativecommons.org/licenses/by/2.0/") ||
      !page.includes("/images/heritage-center-cherokee-county-rusk-station-2004.jpg") || !page.includes("gnomonic") ||
      !page.includes("https://creativecommons.org/licenses/by/2.0/")) {
    throw new Error("museum schema or credited Rusk station image missing");
  }
  // Check the licensed local asset without failing the entire production
  // release on one transient fetch reset. Keep the image URL and MIME rules.
  const imageUrl = site + "/images/heritage-center-cherokee-county-rusk-station-2004.jpg";
  let photoVerified = false;
  let photoError = "no image response";
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const photo = await fetch(imageUrl, { signal: AbortSignal.timeout(attempt === 1 ? 15000 : 25000) });
      const mime = photo.headers.get("content-type") || "";
      photoVerified = photo.ok && mime.startsWith("image/");
      photoError = "HTTP " + photo.status + " / " + mime;
      await photo.body?.cancel();
      if (photoVerified) break;
    } catch (error) {
      photoError = String(error);
    }
    if (attempt < 3) {
      console.warn("Museum photo attempt " + attempt + ": " + photoError + "; retrying the exact same asset");
      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }
  if (!photoVerified) throw new Error("museum photo does not load after 3 attempts: " + photoError);
  if (!hasLink(page, "/county/cherokee") || !hasLink(await getPage("/county/cherokee"), museumPath)) {
    throw new Error("museum and Cherokee County need reciprocal links");
  }
}));
for (const origin of origins) for (const [path, sitemap, editorialFloor] of [[slug, "/sitemap.xml", "2026-11-23"], [museumPath, "/sitemap-explore.xml", "2026-11-24"]]) {
  checks.push(check(origin + sitemap, async () => {
    const xml = await getPage(sitemap, origin);
    const matches = xml.split("<loc>" + site + path + "</loc>");
    const entry = matches[1]?.split("</url>", 1)[0];
    const lastmod = entry?.match(/<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/)?.[1];
    if (matches.length !== 2 || !lastmod || lastmod < editorialFloor || lastmod > new Date().toISOString().slice(0, 10)) throw new Error("missing, duplicate, or stale/future sitemap lastmod for " + path + ": " + lastmod);
  }));
}
await Promise.all(checks);


if (failures.length) {
  for (const failure of failures) console.error("::error::" + failure);
  process.exitCode = 1;
} else {
  console.log("Texas State Railroad production authority: canonical and direct Worker HTML, search metadata, reciprocal links, museum photo and sitemap entries checked.");
}
