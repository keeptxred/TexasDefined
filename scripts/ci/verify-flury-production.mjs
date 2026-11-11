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
      "Did Praha’s palm trees find their way into Flury’s paintings?",
      "Praha, High Hill and Moravia: three different painting campaigns",
      "the proposed local inspiration remains a hypothesis",
      "botanical and inter-church research sources cross-checked November 11, 2026",
      "https://w3.biosci.utexas.edu/prc/Sabal/Praha-hist.html",
      "https://npgallery.nps.gov/AssetDetail/NRIS/83003138",
      "A church made by more than one pair of hands",
      "After 1901 · Father Louis Netardus",
      "Later 20th century · Gene A. Mikulik",
      "June 21, 1983",
      "Texas Defined History",
      "Published sources and archive catalogs cross-checked November 10, 2026",
      "Godfrey Flury Collection, 1887–1981",
      "Smithsonian Archives of American Art",
      "Godfrey Flury Scrapbook",
      "Became a naturalized United States citizen",
      "1929–1934",
      "mechanical engineering",
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

// Check both the exact user-facing URL and an uncached origin response.
// A cache-busted pass must not conceal a stale public page seen by readers or crawlers.
const variants = [
  { name: "clean URL", bust: false },
  { name: "cache-busted URL", bust: true },
];
const failures = [];
for (const origin of origins) {
  for (const page of pages) {
    for (const variant of variants) {
    const url = new URL(page.path, origin);
    if (variant.bust) url.searchParams.set("td_verify", unique);
    let report = { origin, path: page.path, variant: variant.name, status: null, cache: null, passed: false };
    try {
      const response = await fetch(url, {
        redirect: "follow",
        ...(variant.bust ? { cache: "no-store" } : {}),
        signal: AbortSignal.timeout(25_000),
        headers: variant.bust
          ? {
              "user-agent": "TexasDefined-Flury-Live-Acceptance/1.0",
              "cache-control": "no-cache, no-store, max-age=0",
              pragma: "no-cache",
            }
          : { accept: "text/html" },
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
}

const fluryLoc = "<loc>https://texasdefined.com/explore/painted-churches/people/gottfried-flury</loc>";
for (const origin of origins) {
  for (const variant of variants) {
  const url = new URL("/sitemap-explore.xml", origin);
  if (variant.bust) url.searchParams.set("td_verify", unique);
  try {
    const response = await fetch(url, {
      ...(variant.bust ? { cache: "no-store" } : {}),
      signal: AbortSignal.timeout(25_000),
      headers: variant.bust
        ? { "user-agent": "TexasDefined-Flury-Live-Acceptance/1.0", "cache-control": "no-cache" }
        : { accept: "application/xml" },
    });
    const xml = await response.text();
    const start = xml.indexOf(fluryLoc);
    const ending = start >= 0 ? xml.indexOf("</url>", start) : -1;
    const entryXml = start >= 0 && ending > start ? xml.slice(start, ending) : "";
    const accurateLastmod = entryXml.includes("<lastmod>2026-11-11</lastmod>");
    const report = {
      origin,
      path: "/sitemap-explore.xml",
      variant: variant.name,
      status: response.status,
      fluryListed: start >= 0,
      accurateLastmod,
      passed: response.ok && start >= 0 && accurateLastmod
        && response.headers.get("cf-mitigated") !== "challenge",
    };
    console.log(JSON.stringify(report));
    if (!report.passed) failures.push(report);
  } catch (error) {
    const report = {
      origin,
      path: "/sitemap-explore.xml",
      variant: variant.name,
      error: error instanceof Error ? error.message : String(error),
      passed: false,
    };
    failures.push(report);
    console.log(JSON.stringify(report));
  }
  }
}

const summary = `## Gottfried Flury live authority acceptance\n\nValidated ${pages.length} pages and the Flury sitemap entry on ${origins.length} origins in ${variants.length} cache modes (${(pages.length + 1) * origins.length * variants.length} HTTP checks). ${failures.length ? `**FAIL (${failures.length})**` : "**PASS**"}\n\nNo cache purge, browser-rendering session, or Cloudflare authorization calls were made.\n`;
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
if (failures.length) {
  console.error(`::error title=Flury authority production mismatch::${failures.length} of ${(pages.length + 1) * origins.length * variants.length} HTTP checks failed. See JSON checks above for exact missing/obsolete markers.`);
  process.exitCode = 1;
}
