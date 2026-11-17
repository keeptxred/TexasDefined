import { readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync(new URL("../../docs/editorial/attraction-approval-2026-11-17/attraction-source-verification.json", import.meta.url), "utf8"));
const sources = manifest.attractions.flatMap((entry) => entry.sources.map((source) => source.fetchUrl));
// Forestry has its own museum manifest and 30-day review entry; monitor the
// operator's separate priced adult-tour form here as well.
sources.push("https://www.treetexas.com/visit-us", "https://www.treetexas.com/blank-6");
const checks = new Map([
  ["https://tpwd.texas.gov/fishing/tffc/hours-and-fees/", ["spring and summer hours", "fall and winter hours", "$5.50", "$4.50", "$3.50", "pets are not allowed"]],
  ["https://tpwd.texas.gov/fishing/tffc/exhibits/", ["tram tour", "summer 2027"]],
  ["https://ranchingheritage.org/about-us/visit/", ["free admission", "only service animals allowed"]],
  ["https://ranchingheritage.org/learn/adult-group-visits/", ["more than 20", "two weeks", "$50 fee"]],
  ["https://www.treetexas.com/blank-6", ["inside angelina county", "outside of angelina county", "$3 per person"]],
]);
let failed = 0;
for (const url of [...new Set(sources)]) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(18000), headers: { "user-agent": "TexasDefinedEditorialSourceCheck/1.0 (+https://texasdefined.com)" } });
    if (!response.ok) {
      console.error("REVIEW NEEDED: HTTP", response.status, url);
      failed++;
      await response.body?.cancel();
      continue;
    }
    const expected = checks.get(url) ?? [];
    if (expected.length) {
      const html = await response.text();
      const text = html.replace(/<script\\b[^>]*>[\\s\\S]*?<\\/script>/gi, " ").replace(/<style\\b[^>]*>[\\s\\S]*?<\\/style>/gi, " ").replace(/<[^>]*>/g, " ").replace(/&(?:nbsp|amp);/gi, " ").replace(/\\s+/g, " ").toLowerCase();
      const missing = expected.filter((item) => !text.includes(item));
      if (missing.length) {
        console.error("REVIEW NEEDED: operator facts changed or site markup changed", url, "missing:", missing.join(", "));
        failed++;
        continue;
      }
    } else {
      await response.body?.cancel();
    }
    console.log("OK", response.status, url, expected.length ? "(checked core facts)" : "(reachable only)");
  } catch (error) {
    console.error("REVIEW NEEDED", url, error.message);
    failed++;
  }
}
if (failed) {
  console.error(failed + " official source(s) need editorial review; never automatically rewrite facts.");
  process.exitCode = 1;
}
