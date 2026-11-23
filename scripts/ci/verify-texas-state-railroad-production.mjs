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
async function getPage(path) {
  if (!cached.has(path)) {
    cached.set(path, (async () => {
      const response = await fetch(new URL(path, site), { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error(path + ": HTTP " + response.status);
      return response.text();
    })());
  }
  return cached.get(path);
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
  const article = schemaNodes(guide).find((node) => ["Article", "NewsArticle", "BlogPosting"].some((type) => [node["@type"]].flat().includes(type)));
  if (!article?.headline || !article.datePublished || !article.dateModified || !article.image || !article.author) {
    throw new Error("incomplete Article structured data");
  }
  for (const name of ["description", "og:image", "twitter:card", "viewport"]) {
    if (!guide.includes('="' + name + '"')) throw new Error("missing " + name);
  }
}));
checks.push(check("Museum photo and structured data", async () => {
  const page = await getPage(museumPath);
  if (/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(page)) throw new Error("museum is noindexed");
  const museum = schemaNodes(page).find((node) => [node["@type"]].flat().includes("Museum"));
  if (!museum?.image?.some((image) => image.license === "https://creativecommons.org/licenses/by/2.0/") ||
      !page.includes("Rusk_station") || !page.includes("gnomonic") ||
      !page.includes("https://creativecommons.org/licenses/by/2.0/")) {
    throw new Error("museum schema or credited Rusk station image missing");
  }
  if (!hasLink(page, "/county/cherokee") || !hasLink(await getPage("/county/cherokee"), museumPath)) {
    throw new Error("museum and Cherokee County need reciprocal links");
  }
}));
for (const [path, sitemap] of [[slug, "/sitemap.xml"], [museumPath, "/sitemap-explore.xml"]]) {
  checks.push(check(sitemap, async () => {
    const xml = await getPage(sitemap);
    const entry = xml.split("<loc>" + site + path + "</loc>")[1]?.split("</url>", 1)[0];
    if (!entry || !/<lastmod>\d{4}-\d{2}-\d{2}/.test(entry)) throw new Error("missing canonical URL or lastmod for " + path);
  }));
}
await Promise.all(checks);


if (failures.length) {
  for (const failure of failures) console.error("::error::" + failure);
  process.exitCode = 1;
} else {
  console.log("Texas State Railroad production authority: canonical and direct Worker HTML, search metadata, reciprocal links, museum photo and sitemap entries checked.");
}
