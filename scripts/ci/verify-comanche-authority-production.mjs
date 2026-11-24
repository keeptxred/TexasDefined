#!/usr/bin/env node
/**
 * Comanche four-page public release and sitemap acceptance.
 * Invoke after a successful deploy, or on the weekly drift-monitor schedule.
 * No remote source row is allowed to replace November 2026 reviewed copy.
 */
import { setTimeout as delay } from "node:timers/promises";

const host = process.env.COMANCHE_PUBLIC_ORIGIN?.replace(/\/$/, "") || "https://texasdefined.com";
const targets = [
  {
    path: "/explore/small-towns",
    evidence: ["Comanche", "JW Hardin Wine Co. tasting room; Brennan Vineyards history", "Old Cora Courthouse", "Fleming Oak"],
  },
  {
    path: "/destination/comanche",
    evidence: ["Clint and Jami Tunnell", "Fleming Oak", "Old Cora", "Brennan Vineyards", "Comanche Square Walking Tour", "National Register of Historic Places", "Brennan Vineyards", "December 30, 2025", "JW Hardin Wine Co.", "roof replacement", "Preservation Trust Fund", "1969", "Prairie School", "parking", "Renelibrary"],
  },
  {
    path: "/county/comanche",
    evidence: ["Clint and Jami Tunnell", "Fleming Oak", "Old Cora", "Comanche County Historical Museum", "Guide updated", "Comanche Downtown Historic District", "Brennan Vineyards", "December 30, 2025", "JW Hardin Wine Co.", "roof replacement", "Preservation Trust Fund"],
  },
  {
    path: "/destination/comanche-county-historical-museum",
    evidence: ["Jack Wright Saloon", "blacksmith", "free general admission", "Comanche Square Walking Tour", "comanche-county-historical-museum-editorial.svg", "The museum confirms free general admission", "No. Its official homepage states general admission is free", "Brennan Vineyards", "December 30, 2025", "JW Hardin Wine Co.", "roof replacement", "Preservation Trust Fund"],
  },
];

const normalize = (html) => html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;|&#160;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/&#(?:39|x27);|&apos;/gi, "'")
  .replace(/&quot;/gi, '"')
  .replace(/\s+/g, " ");

function verify({ path, evidence }, html) {
  const text = normalize(html);
  const missing = evidence.filter((phrase) => !(text.includes(phrase) || html.includes(phrase)));
  const tags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
  const robots = tags.filter((tag) => /name=["']robots["']/i.test(tag));
  if (robots.some((tag) => /noindex/i.test(tag))) missing.push("indexable robots directive (found noindex)");
  if (!html.includes(`https://texasdefined.com${path}`)) missing.push("canonical absolute URL");
  if (text.length < 4000) missing.push("substantial server-rendered page content");
  if (path !== "/explore/small-towns" && !html.includes("texas-preservation-trust-fund-benefits-historic-tavern-dance-hall-log-courthouse-more")) missing.push("primary-source Old Cora preservation grant link");
  if (path === "/explore/small-towns" && text.includes("Brennan Vineyards and JW Hardin Wine Co.")) missing.push("stale Comanche wine recommendations in small-towns directory");
  if (path === "/destination/comanche" && !html.includes("atlas.thc.texas.gov/Details/5000022414")) missing.push("THC historic marker corroborating Comanche Frisco depot");
  if (path !== "/explore/small-towns" && !html.includes("npgallery.nps.gov/AssetDetail/NRIS/100001872")) missing.push("NPS separate National Register depot source");
  if (path === "/destination/comanche" && !text.includes("2012")) missing.push("dated Frisco depot preservation reopening");
  if (path === "/destination/comanche" && !text.includes("Comanche City Park")) missing.push("family park visitor planning");
  if (path === "/destination/comanche" && !html.includes("Downtown_Comanche_Wiki_1_")) missing.push("licensed downtown Comanche image");
  if (path === "/destination/comanche" && !html.includes("Comanche_tx_city_hall")) missing.push("licensed Comanche city-hall storefront photograph");
  if (["/destination/comanche", "/county/comanche"].includes(path) && !(text.includes("State National Bank") && text.includes("114 West Central Avenue"))) missing.push("bank-to-city-hall adaptive reuse chronology and exact place address");
  if (["/destination/comanche", "/county/comanche"].includes(path) && !html.includes("THC_Quarterly_Public_Nov2025.pdf")) missing.push("THC source for Comanche bank / city hall conservation");
  if (path === "/destination/comanche" && !html.includes("Comanche Texas: Old Cora Courthouse, Historic Square")) missing.push("specific Comanche search title");
  if (["/destination/comanche", "/county/comanche", "/destination/comanche-county-historical-museum"].includes(path) && !html.includes("www.comanchenation.com/about/page/history")) missing.push("first-person Comanche Nation history citation");
  if (path === "/county/comanche" && !html.includes("Comanche County TX: History, De Leon &amp; Proctor Lake") && !html.includes("Comanche County TX: History, De Leon & Proctor Lake")) missing.push("distinctive Comanche County search title");
  if (path === "/destination/comanche-county-historical-museum" && !html.includes("Comanche County Historical Museum: Free Admission &amp; Hours") && !html.includes("Comanche County Historical Museum: Free Admission & Hours")) missing.push("museum fee-and-hours search title");
  const obsoleteBrennanAdvice = [
    "Brennan Vineyards at 802 South Austin Street makes Texas wine",
    "Brennan Vineyards at 802 South Austin Street in Comanche produces Texas wine",
    "Brennan Vineyards and JW Hardin Wine Co. both maintain official local presences",
    "preconfirmed Brennan Vineyards or JW Hardin tasting",
    "Texas-made wine at the historic McCrary homestead, 802 S. Austin St; confirm tasting reservations",
  ];
  if (obsoleteBrennanAdvice.some((advice) => text.includes(advice))) missing.push("obsolete Brennan Comanche tasting-room recommendation");
  if (["/destination/comanche", "/county/comanche", "/destination/comanche-county-historical-museum"].includes(path)) {
    for (const phrase of ["1891 courthouse", "leg irons", "1938", "City Hall and Fire Station"]) {
      if (!text.includes(phrase)) missing.push("NPS landmark context: " + phrase);
    }
    if (!html.includes("atlas.thc.texas.gov/NR/pdfs/100009117/100009117.pdf")) missing.push("National Register district nomination citation");
  }
  if (["/destination/comanche", "/county/comanche", "/destination/comanche-county-historical-museum"].includes(path)) {
    if (!/fourteen (?:exhibit|exhibition|historical exhibit) rooms/i.test(text)) missing.push("official fourteen-room museum inventory");
    if (/more than fourteen|more than 14/i.test(text)) missing.push("unsupported museum room count contradicts current official homepage");
  }
  if (path === "/destination/comanche-county-historical-museum" &&
    (text.includes("This visitor guide does not claim a published admission price") ||
    text.includes("Yes. The museum\'s official homepage explicitly states general admission is free"))) {
    missing.push("outdated, contradictory museum admission guidance");
  }
  return missing;
}

let failures = [];
for (let attempt = 1; attempt <= 5; attempt++) {
  failures = [];
  for (const target of targets) {
    const url = new URL(host + target.path);
    // A unique query avoids false passes from a cached previous release.
    url.searchParams.set("comanche-acceptance", `${process.env.GITHUB_SHA?.slice(0, 12) || "local"}-${attempt}`);
    try {
      const response = await fetch(url, {
        headers: { "cache-control": "no-cache", "user-agent": "TexasDefined-Comanche-release-acceptance/1.0" },
        signal: AbortSignal.timeout(20000),
        redirect: "follow",
      });
      if (response.status !== 200) {
        failures.push(`${target.path}: HTTP ${response.status}`);
        continue;
      }
      const html = await response.text();
      const missing = verify(target, html);
      if (missing.length) failures.push(`${target.path}: ${missing.join("; ")}`);
      else console.log(`PASS ${target.path}: all source-verified content, canonical and indexability checks`);
    } catch (error) {
      failures.push(`${target.path}: ${error instanceof Error ? error.message : error}`);
    }
  }
  // Indexable canonicals should be discoverable with the actual editorial dates.
  // The county primary sitemap has a separately versioned edge cache.
  for (const [sitemap, expected] of [
    ["/sitemap.xml", { "/county/comanche": "2026-11-24" }],
    ["/sitemap-explore.xml", {
      "/destination/comanche": "2026-11-24",
      "/destination/comanche-county-historical-museum": "2026-11-24",
    }],
  ]) {
    try {
      const url = new URL(host + sitemap);
      url.searchParams.set("comanche-sitemap-acceptance", `${process.env.GITHUB_SHA?.slice(0, 12) || "local"}-${attempt}`);
      const response = await fetch(url, {
        headers: { "cache-control": "no-cache", "user-agent": "TexasDefined-Comanche-sitemap-acceptance/1.0" },
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) {
        failures.push(`${sitemap}: HTTP ${response.status}`);
        continue;
      }
      const xml = await response.text();
      for (const [page, lastmod] of Object.entries(expected)) {
        const location = host + page;
        const entry = xml.match(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>\s*<\/url>/g) ?? [];
        const found = entry.find((item) => item.includes(`<loc>${location}</loc>`));
        if (!found || !found.includes(`<lastmod>${lastmod}</lastmod>`)) {
          failures.push(`${sitemap}: missing ${page} with verified lastmod ${lastmod}`);
        }
      }
    } catch (error) {
      failures.push(`${sitemap}: ${error instanceof Error ? error.message : error}`);
    }
  }
  if (!failures.length) break;
  console.error(`Attempt ${attempt}/5: ${failures.join(" | ")}`);
  if (attempt < 5) await delay(15000);
}
if (failures.length) {
  console.error("COMANCHE PRODUCTION ACCEPTANCE FAILED:", failures.join("\n - "));
  process.exitCode = 1;
} else {
  console.log("COMANCHE PRODUCTION ACCEPTANCE: 4 of 4 verified.");
}
