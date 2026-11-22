import { mkdirSync, writeFileSync } from "node:fs";

const route = "/destination/martin-creek-lake-state-park-rv-area";
const canonical = "https://texasdefined.com" + route;
const origins = [
  { label: "Canonical", base: "https://texasdefined.com" },
  { label: "Direct Worker", base: "https://texasdefined-site.freddy-coppola.workers.dev" },
];
const failures = [];
const checks = [];

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#(?:x27|39);/gi, "'")
    .replace(/&#(?:x2013|8211);/gi, "–")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

async function fetchPage(url) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "TexasDefinedMartinCreekAuthorityAcceptance/1.0", "Cache-Control": "no-cache" },
        signal: AbortSignal.timeout(20000),
        redirect: "follow",
      });
      if (!response.ok) throw new Error("HTTP " + response.status);
      return { html: await response.text(), status: response.status, finalUrl: response.url, attempt };
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 750));
    }
  }
  throw lastError;
}

function verify(label, name, condition) {
  checks.push({ origin: label, name, pass: Boolean(condition) });
  if (!condition) failures.push(label + ": " + name);
}

for (const origin of origins) {
  try {
    const { html, status, finalUrl, attempt } = await fetchPage(origin.base + route);
    const visible = visibleText(html);
    const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "";
    const canonicalHref = html.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\bhref=["']([^"']+)["']/i)?.[1] ?? "";
    const robots = [...html.matchAll(/<meta\b[^>]*\bname=["']robots["'][^>]*>/gi)].map(([tag]) => tag).join(" ");
    verify(origin.label, "HTTP 200", status === 200);
    verify(origin.label, "specific RV camping SEO title", /Martin Creek Lake State Park RV Camping: Sites, Hookups/i.test(title));
    verify(origin.label, "unchanged canonical URL", canonicalHref === canonical);
    verify(origin.label, "indexable robots directive", !/noindex/i.test(robots));
    verify(origin.label, "WebPage and TouristAttraction schema", html.includes('"@type":"WebPage"') && html.includes('"@type":["Campground","TouristAttraction"]'));
    verify(origin.label, "reviewed November 18, 2026", visible.includes("november 18, 2026"));
    verify(origin.label, "fire ban rescission qualified by current alerts", visible.includes("rusk county rescinded") && visible.includes("this is not permission to light a fire"));
    verify(origin.label, "three campsite-class selection tools", visible.includes("want a lakefront site?") && visible.includes("need 50-amp electric service?") && visible.includes("prioritizing price?"));
    verify(origin.label, "campground-specific quiet hours and checkout", visible.includes("noon campsite checkout") && visible.includes("quiet hours"));
    verify(origin.label, "site-specific accessibility", visible.includes("accessibility and individual rv pad fit") && visible.includes("does not establish that every electric rv site is accessible"));
    verify(origin.label, "licensed genuine park footbridge photo via first-party broker", /<img[^>]+src="\/media\/remote\?url=[^"]*Bridge_Martin_Creek_Lake_State_Park_Texas_2025\.jpg/i.test(html) && visible.includes("larry d. moore"));
    verify(origin.label, "RV substantive modification date", html.includes('"dateModified":"2026-11-21"'));
    verify(origin.label, "approved licensed docks photo with accurate park-only context",
      html.includes("Docks_at_Martin_Creek_Lake_State_Park_2019.jpg") &&
      html.includes("/media/remote?url=") &&
      visible.includes("docks and wooded shoreline, june 2019") &&
      visible.includes("not an rv campsite") &&
      visible.includes("resized for web") &&
      html.includes("https://commons.wikimedia.org/wiki/File:Docks_at_Martin_Creek_Lake_State_Park_2019.jpg") &&
      html.includes("https://creativecommons.org/licenses/by/4.0/"));
    verify(origin.label, "official photos of real numbered campsites", visible.includes("actual numbered campsite photos") && html.includes("tpwd.texas.gov/state-parks/martin-creek-lake/fees-facilities/campsites"));
    verify(origin.label, "internal RV, state parks and fishing access links", html.includes("/explore/rv-parks") && html.includes("/explore/state-parks") && html.includes("/fishing/access"));
    verify(origin.label, "county, TPWD and reservations external source links", html.includes("ruskcountytxfire.gov/rusk-county-burn-ban-status") && html.includes("tpwd.texas.gov/state-parks/martin-creek-lake/alert") && html.includes("texasstateparks.reserveamerica.com"));
    console.log(origin.label + ": " + status + " in attempt " + attempt + ", HTML bytes " + html.length + ", final URL " + finalUrl);
  } catch (error) {
    failures.push(origin.label + ": fetch failed: " + String(error));
  }
}

for (const origin of origins) {
  try {
    const parkPath = "/destination/martin-creek-lake-state-park";
    const { html, status } = await fetchPage(origin.base + parkPath);
    const visible = visibleText(html);
    const canon = html.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\bhref=["']([^"']+)["']/i)?.[1];
    const robots = [...html.matchAll(/<meta\b[^>]*\bname=["']robots["'][^>]*>/gi)].map(([tag]) => tag).join(" ");
    verify(origin.label, "park HTTP 200 canonical indexable", status === 200 && canon === "https://texasdefined.com" + parkPath && !/noindex/i.test(robots));
    verify(origin.label, "park title and updated schema", html.includes("Martin Creek Lake State Park: Trails, Fishing") && html.includes('"dateModified":"2026-11-21"'));
    verify(origin.label, "park-specific decision guide and accurate trail mileage", visible.includes("plan the right day at martin creek lake") && visible.includes("old henderson road loop") && visible.includes("1.4 miles") && visible.includes("harmony hill loop") && visible.includes("1.7 miles") && visible.includes("island trails") && visible.includes("0.9 mile"));
    verify(origin.label, "park fishing, accessibility and lodging", visible.includes("four-lane boat ramp") && visible.includes("not fully ada compliant") && visible.includes("19 screened shelters") && visible.includes("two simpler cottages") && visible.includes("argentine ant"));
    verify(origin.label, "park reciprocal RV guide and specific reservation link", html.includes('href="' + route + '"') && html.includes("parkId=1200121"));
    verify(origin.label, "park source links and licensed images", html.includes("Fishing_Pier_Martin_Creek_Lake_State_Park_2019.jpg") && html.includes("Bridge_Martin_Creek_Lake_State_Park_Texas_2025.jpg") && html.includes("Docks_at_Martin_Creek_Lake_State_Park_2019.jpg") && html.includes("creativecommons.org/licenses/by/4.0/") && html.includes("/trails-info") && html.includes("martin_creek/access.phtml"));
    const sitemap = await fetchPage(origin.base + "/sitemap-explore.xml");
    for (const path of [route, parkPath]) {
      const rows = [...sitemap.html.matchAll(/<url>[\s\S]*?<\/url>/gi)].map(m => m[0]).filter(row => row.includes("<loc>https://texasdefined.com" + path + "</loc>"));
      verify(origin.label, path + " unique fresh sitemap lastmod", rows.length === 1 && rows[0].includes("<lastmod>2026-11-21</lastmod>"));
    }
  } catch (error) { failures.push(origin.label + ": park or sitemap fetch failed: " + String(error)); }
}

mkdirSync(".artifacts", { recursive: true });
const report = {
  checkedAt: new Date().toISOString(),
  commit: process.env.GITHUB_SHA || null,
  route, canonical, checks, failures,
};
writeFileSync(".artifacts/martin-creek-rv-live.json", JSON.stringify(report, null, 2) + "\n");
if (failures.length) {
  for (const failure of failures) console.error("Martin Creek RV acceptance failure: " + failure);
  process.exitCode = 1;
} else {
  console.log("Martin Creek RV live authority acceptance passed on both canonical and direct Worker, with SEO, campsite, rules, licensing, crosslinks and freshness verified.");
}
