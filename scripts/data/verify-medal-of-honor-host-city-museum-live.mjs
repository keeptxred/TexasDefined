/**
 * Fail-closed published HTML audit for the Gainesville museum authority page.
 * Runs from GitHub Actions (public network), never via the Cloudflare API.
 * A PR, commit, or passing build does not qualify as production acceptance.
 */
import fs from "node:fs";

const root = "https://texasdefined.com";
const slug = "/destination/medal-of-honor-host-city-museum-gainesville";
const release = process.env.DEPLOYED_SHA ?? "scheduled";
const attempts = 5;
const targets = [
  { id: "museum", path: slug },
  { id: "heroes", path: "/article/texas-medal-of-honor-heroes" },
  { id: "military", path: "/article/texas-military-museums-historic-sites-guide" },
  { id: "cooke", path: "/article/cooke-county-gainesville-red-river-muenster-north-texas" },
  { id: "sitemap", path: "/sitemap-explore.xml" },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const findings = [];
const report = { checkedAt: new Date().toISOString(), release, canonical: root + slug, findings };

function record(id, passed, detail) {
  findings.push({ id, passed, detail });
  console.log((passed ? "PASS" : "FAIL") + " " + id + ": " + detail);
}
function tagAttributes(html, tag) {
  return [...html.matchAll(new RegExp("<" + tag + "\\b[^>]*>", "gi"))].map(([match]) => match);
}
function hasAttribute(tag, name, expected) {
  const value = new RegExp("\\b" + name + "\\s*=\\s*[\"']([^\"']*)[\"']", "i").exec(tag)?.[1];
  return expected === undefined ? value : value?.toLowerCase() === expected.toLowerCase();
}
function checkPageHtml(id, html) {
  if (id === "sitemap") {
    record("sitemap-entry", html.includes("<loc>" + root + slug + "</loc>") || html.includes(root + slug), "canonical museum URL appears in live Explore sitemap");
    return;
  }
  const canonicalLinks = tagAttributes(html, "link").filter((tag) => (hasAttribute(tag, "rel") ?? "").toLowerCase().split(/\s+/).includes("canonical"));
  const robots = tagAttributes(html, "meta")
    .filter((tag) => (hasAttribute(tag, "name") ?? "").toLowerCase() === "robots")
    .map((tag) => hasAttribute(tag, "content") ?? "");
  record(id + "-not-noindex", !robots.some((content) => /\bnoindex\b/i.test(content)), "Google-indexable robots directive");
  if (id === "museum") {
    record("museum-identification", html.includes("Medal of Honor Host City Museum") && html.includes("Gainesville"), "Gainesville museum identity published");
    record("museum-address", /1525\s*W(?:est)?\.?\s*California/i.test(html), "actual NCTC museum address in HTML");
    record("museum-primary-source", html.includes("nctc.edu/museum"), "NCTC source rendered in HTML");
    record("museum-visitor-facts", /(?:admission|free)/i.test(html) && /(?:Friday|8 a\.m\.)/i.test(html), "free admission and weekday visitor information");
    record("museum-recipient-reporting", html.includes("Duane E. Dewey") && html.includes("Roger Hugh C. Donlon"), "researched named recipient gallery context");
    record("museum-search-title", /<title[^>]*>[^<]*Medal of Honor Host City Museum[^<]*Gainesville/i.test(html), "unique museum-specific search title");
    record("museum-canonical", canonicalLinks.some((tag) => hasAttribute(tag, "href") === root + slug), "exact self-referencing canonical link");
    record("museum-jsonld", /application\/ld\+json/i.test(html) && /"Museum"/.test(html), "Museum structured data rendered as JSON-LD");
  } else {
    record(id + "-incoming-link", html.includes(slug), "contextual incoming article link published");
  }
}
async function download(target) {
  let lastError = "";
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const url = new URL(root + target.path);
    url.searchParams.set("_td_museum_release", release);
    url.searchParams.set("check", String(attempt));
    try {
      const res = await fetch(url, {
        headers: { "Accept": target.id === "sitemap" ? "application/xml,text/xml" : "text/html", "User-Agent": "Mozilla/5.0 (compatible; TexasDefinedAuthorityAudit/2.0)" },
        signal: AbortSignal.timeout(25000),
        redirect: "follow",
      });
      if (!res.ok) throw new Error("HTTP " + res.status + " " + res.url);
      const body = await res.text();
      if (body.length < 300) throw new Error("HTML/XML body too short: " + body.length);
      return body;
    } catch (err) {
      lastError = String(err);
      console.warn("Attempt " + attempt + " failed for " + target.id + ": " + lastError);
      if (attempt < attempts) await sleep(7000);
    }
  }
  record(target.id + "-http", false, "Unretrievable production document after " + attempts + " attempts: " + lastError);
  return null;
}
for (const target of targets) {
  const html = await download(target);
  if (html !== null) {
    record(target.id + "-http", true, "Public production document responds HTTP 2xx");
    checkPageHtml(target.id, html);
  }
}
const failed = findings.filter((x) => !x.passed);
report.passed = failed.length === 0;
report.failureCount = failed.length;
fs.mkdirSync("artifacts/museum-live-qa", { recursive: true });
fs.writeFileSync("artifacts/museum-live-qa/gainesville.json", JSON.stringify(report, null, 2) + "\n");
if (failed.length) {
  console.error("PUBLICATION NOT CERTIFIED: " + failed.length + " production acceptance checks failed");
  process.exitCode = 1;
} else {
  console.log("PRODUCTION VERIFIED: canonical, indexability, Museum JSON-LD, official source, five HTML/XML routes and inbound links");
}
