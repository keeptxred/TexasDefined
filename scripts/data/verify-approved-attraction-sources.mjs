import { readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync(new URL("../../docs/editorial/attraction-approval-2026-11-17/attraction-source-verification.json", import.meta.url), "utf8"));
const sources = manifest.attractions.flatMap((entry) => entry.sources.map((source) => source.fetchUrl));
// Forestry has its own museum manifest and 30-day review entry; monitor the
// operator's separate priced adult-tour form here as well.
sources.push("https://www.treetexas.com/visit-us", "https://www.treetexas.com/blank-6");
// The museum also publishes an independently hosted first-party domain.
// Wix currently blocks GitHub-hosted HTTP requests to its older www pages.
sources.push("https://treetexas.com/", "https://www.texasforestry.org/programs/texas-forestry-museum");
const checks = new Map([
  ["https://tpwd.texas.gov/fishing/tffc/hours-and-fees/", ["spring and summer hours", "fall and winter hours", "$5.50", "$4.50", "$3.50", "pets are not allowed"]],
  ["https://tpwd.texas.gov/fishing/tffc/exhibits/", ["tram tour", "summer 2027"]],
  ["https://ranchingheritage.org/about-us/visit/", ["free admission", "only service animals allowed"]],
  ["https://ranchingheritage.org/learn/adult-group-visits/", ["more than 20", "two weeks", "$50 fee"]],
  ["https://ranchingheritage.org/explore/outdoor-historical-park/", ["matador half dugout", "6666 barn"]],
  ["https://ranchingheritage.org/explore/outdoor-historical-park/matador-half-dugout/", ["c. 1888", "bunkhouse", "matador"]],
  ["https://ranchingheritage.org/explore/outdoor-historical-park/6666-barn/", ["c. 1908", "burk burnett", "6666"]],
  ["https://ranchingheritage.org/explore/museum-exhibits/", ["60 years of vision, 50 years of impact", "march 2027", "from cow trails to highways", "september 2027", "the last chief, the first statesman", "september 2028"]],
  ["https://www.treetexas.com/blank-6", ["inside angelina county", "outside of angelina county", "$3 per person"]],
  ["https://www.texasforestry.org/programs/texas-forestry-museum", ["museum", "no admission"]],
]);
let failed = 0;
let museumAlternativeVerified = 0;
const blockedMuseumSourceUrls = [];
const legacyMuseumUrl = (url) => url.startsWith("https://www.treetexas.com/");
for (const url of [...new Set(sources)]) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(18000), headers: { "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36", "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "accept-language": "en-US,en;q=0.9" } });
    if (!response.ok) {
      if (response.status === 403 && legacyMuseumUrl(url)) {
        // A bot-block from the operator is not evidence that visitor details
        // changed. Never mark those individual pages as verified; require a
        // separate live source to remain reachable and flag manual recheck.
        console.warn("::warning::Operator legacy Wix URL blocks this GitHub runner (403); manual fee/access verification still required: " + url);
        blockedMuseumSourceUrls.push(url);
        await response.body?.cancel();
        continue;
      }
      console.error("REVIEW NEEDED: HTTP", response.status, url);
      failed++;
      await response.body?.cancel();
      continue;
    }
    const expected = checks.get(url) ?? [];
    if (expected.length) {
      const html = await response.text();
      const text = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ").replace(/<[^>]*>/g, " ").replace(/&(?:nbsp|amp);/gi, " ").replace(/\s+/g, " ").toLowerCase();
      const missing = expected.filter((item) => !text.includes(item));
      if (missing.length) {
        console.error("REVIEW NEEDED: operator facts changed or site markup changed", url, "missing:", missing.join(", "));
        failed++;
        continue;
      }
    } else {
      await response.body?.cancel();
    }
    if (url === "https://treetexas.com/" || url === "https://www.texasforestry.org/programs/texas-forestry-museum") museumAlternativeVerified++;
    console.log("OK", response.status, url, expected.length ? "(checked core facts)" : "(reachable only)");
  } catch (error) {
    console.error("REVIEW NEEDED", url, error.message);
    failed++;
  }
}
if (blockedMuseumSourceUrls.length) {
  console.warn("MANUAL FOLLOW-UP: museum legacy Wix operator pages could not be rechecked from GitHub runner:", blockedMuseumSourceUrls.join(", "));
  if (!museumAlternativeVerified) {
    console.error("REVIEW NEEDED: no reachable independent operator/association replacement for blocked museum sources.");
    failed++;
  }
}
if (failed) {
  console.error(failed + " official source(s) need editorial review; never automatically rewrite facts.");
  process.exitCode = 1;
}
