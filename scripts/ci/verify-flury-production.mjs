import { appendFileSync } from "node:fs";

const origins = [
  "https://texasdefined.com",
  "https://texasdefined-site.freddy-coppola.workers.dev",
];
const unique = [process.env.GITHUB_SHA || "local", process.env.GITHUB_RUN_ID || "manual", Date.now()].join("-");
const pages = [
  {
    path: "/explore/painted-churches/people/gottfried-flury",
    mustInclude: [
      "Who was Gottfried (Godfrey) Flury?",
      "Documented versus uncertain work",
      "The painted interior at Praha",
      "Key dates in Flury’s life and legacy",
      "March 24, 2018",
      "The shared decorative vocabulary",
      "A church made by more than one pair of hands",
      "After 1901 · Father Louis Netardus",
      "Later 20th century · Gene A. Mikulik",
      "June 21, 1983",
      "Texas Defined History",
      "Published sources cross-checked November 9, 2026",
      "https://atlas.thc.texas.gov/Details?atlasnumber=2083003138",
      "/corrections-policy",
      "https://www.tshaonline.org/handbook/entries/flury-godfrey",
      "1864-07-06",
      "1936-10-28",
    ],
    mustExclude: [
      "How Texas Defined handles attribution",
      "How Flury’s career unfolded",
      "These photographs show St. Mary’s as it appears today",
      "Gottfried Flury is associated with the decorative painting of St. Mary",
    ],
  },
  {
    path: "/editorial-policy",
    mustInclude: [
      "How Texas Defined handles attribution",
      "Those roles are not interchangeable",
      "Policy last reviewed November 3, 2026",
    ],
    mustExclude: [],
  },
];

const failures = [];
for (const origin of origins) {
  for (const page of pages) {
    const url = new URL(page.path, origin);
    url.searchParams.set("td_verify", unique);
    let report = { origin, path: page.path, status: null, cache: null, passed: false };
    try {
      const response = await fetch(url, {
        redirect: "follow",
        cache: "no-store",
        signal: AbortSignal.timeout(25_000),
        headers: {
          "user-agent": "TexasDefined-Flury-Live-Acceptance/1.0",
          "cache-control": "no-cache, no-store, max-age=0",
          pragma: "no-cache",
        },
      });
      const body = await response.text();
      const missing = page.mustInclude.filter((marker) => !body.includes(marker));
      const stale = page.mustExclude.filter((marker) => body.includes(marker));
      const canonical = `https://texasdefined.com${page.path}`;
      const hasCanonical = body.includes(canonical);
      const robotsBlocked = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(body)
        || /noindex/i.test(response.headers.get("x-robots-tag") || "");
      const challenged = response.headers.get("cf-mitigated") === "challenge";
      report = {
        ...report,
        status: response.status,
        cache: response.headers.get("cf-cache-status"),
        age: response.headers.get("age"),
        htmlBytes: body.length,
        canonical: hasCanonical,
        missing,
        stale,
        challenged,
        robotsBlocked,
        passed: response.ok && !challenged && !robotsBlocked && hasCanonical && !missing.length && !stale.length,
      };
      if (!report.passed) failures.push(report);
    } catch (error) {
      report.error = error instanceof Error ? error.message : String(error);
      failures.push(report);
    }
    console.log(JSON.stringify(report));
  }
}
const summary = `## Gottfried Flury live authority acceptance\n\nValidated ${pages.length} pages on ${origins.length} origins. ${failures.length ? `**FAIL (${failures.length})**` : "**PASS**"}\n\nNo cache purge, browser-rendering session, or Cloudflare authorization calls were made.\n`;
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
if (failures.length) {
  console.error(`::error title=Flury authority production mismatch::${failures.length} of ${pages.length * origins.length} HTTP checks failed. See JSON checks above for exact missing/obsolete markers.`);
  process.exitCode = 1;
}
