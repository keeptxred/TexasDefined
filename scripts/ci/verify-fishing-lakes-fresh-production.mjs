/**
 * Fail-closed public HTML proof for the 72-lake directory release.
 * Verify ordinary (non-cache-busted) visitor URLs on both Cloudflare origins.
 * Existing live-Chrome acceptance separately validates hydration and mobile UX.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ORIGINS = [
  "https://texasdefined.com",
  "https://texasdefined-site.freddy-coppola.workers.dev",
];
const REPORT_PATH = ".artifacts/fishing-lakes-fresh-release.json";
const DIRECTORY = "/fishing/lakes";
const FALCON = "/fishing/lakes/falcon-international-reservoir";

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&(?:nbsp|#160);/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ").trim();
}

function metaCheck(html, tagName, test) {
  return [...html.matchAll(new RegExp("<" + tagName + "\\b[^>]*>", "gi"))]
    .some(([tag]) => test(tag));
}

export function checkFishingReleaseHtml(html, contentType = "text/html", kind = "directory") {
  const source = typeof html === "string" ? html : "";
  const text = visibleText(source);
  const checks = {
    html200Content: /<html\b/i.test(source) && /text\/html/i.test(contentType),
    indexable: !metaCheck(source, "meta", tag =>
      /name=["']robots["']/i.test(tag) && /(?:noindex|none)/i.test(tag)),
  };
  if (kind === "directory") {
    const lakeLinks = [...source.matchAll(/href=["']\/fishing\/lakes\/([a-z0-9-]+)["']/gi)]
      .map((match) => match[1]);
    checks.canonical = metaCheck(source, "link", tag =>
      /rel=["']canonical["']/i.test(tag) &&
      /href=["']https:\/\/texasdefined\.com\/fishing\/lakes["']/i.test(tag));
    checks.title = /Texas fishing lakes/i.test(text);
    checks.helpfulIntro = text.includes("Find the right Texas fishing lake");
    checks.allGuideLinks = new Set(lakeLinks).size === 72;
    checks.completeStatus = /Showing\s+72\s+of\s+72\s+lake guides/i.test(text);
    checks.itemList72 = /["']numberOfItems["']\s*:\s*72\b/i.test(source);
    checks.progressiveCards = text.includes("Show 12 more lake cards");
    checks.crawlableIndex = source.includes("All matching fishing lake guides");
    checks.oldDefensiveIntroGone = !text.includes("72 complete Texas fishing lake guides are published");
  } else if (kind === "falcon") {
    checks.canonical = metaCheck(source, "link", tag =>
      /rel=["']canonical["']/i.test(tag) &&
      /href=["']https:\/\/texasdefined\.com\/fishing\/lakes\/falcon-international-reservoir["']/i.test(tag));
    checks.falconIdentity = text.includes("Falcon International Reservoir");
    checks.garUngraded = text.includes("Not graded by TPWD");
    checks.qualityExplanation = /TPWD documents alligator gar/i.test(text);
  } else {
    throw new Error("Unknown fishing release verification kind: " + kind);
  }
  return { checks, failures: Object.entries(checks)
    .filter(([, passed]) => !passed).map(([name]) => name) };
}

export async function verifyFishingRelease({
  fetchImpl = fetch,
  origins = ORIGINS,
  attempts = 3,
  reportPath = REPORT_PATH,
} = {}) {
  const report = {
    checkedAt: new Date().toISOString(),
    commitSha: process.env.GITHUB_SHA || null,
    purpose: "Ordinary visitor HTML, not a cached search snippet or cache-busted replacement URL",
    results: [],
    state: "unverified",
  };
  for (const origin of origins) {
    for (const [path, kind] of [[DIRECTORY, "directory"], [FALCON, "falcon"]]) {
      let pass = false;
      for (let attempt = 1; attempt <= attempts; attempt++) {
        const url = origin + path;
        const result = { url, kind, attempt, status: null, failures: [], checks: {} };
        try {
          const response = await fetchImpl(url, {
            redirect: "manual",
            signal: AbortSignal.timeout(20000),
            headers: {
              "User-Agent": "TexasDefined-FishingLakes-LiveProof/1.0",
              "Accept": "text/html",
            },
          });
          result.status = response.status;
          result.cacheStatus = response.headers.get("cf-cache-status") || null;
          if (response.status !== 200 || response.headers.get("cf-mitigated") === "challenge") {
            result.failures.push("public-http-200");
          } else {
            const html = await response.text();
            const observed = checkFishingReleaseHtml(html, response.headers.get("content-type") || "", kind);
            result.failures.push(...observed.failures);
            result.checks = observed.checks;
            result.bytes = Buffer.byteLength(html, "utf8");
          }
        } catch (error) {
          result.failures.push("fetch-failed");
          result.error = String(error);
        }
        report.results.push(result);
        if (result.failures.length === 0) { pass = true; break; }
        if (attempt < attempts) await new Promise(resolve => setTimeout(resolve, 750));
      }
      if (!pass) report.state = "failed";
    }
  }
  if (report.state !== "failed") report.state = "verified";
  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(reportPath, JSON.stringify(report, null, 2) + "\n");
  if (report.state !== "verified") {
    const failures = report.results.filter(item => item.failures.length);
    throw new Error("Public fishing release failed: " +
      failures.map(item => item.url + " [" + item.failures.join(",") + "]").join("; "));
  }
  console.log("Fishing lakes public release verified: 72 linked guides, 12-card browsing, canonical/indexable markup and ungraded Falcon gar on both public origins.");
  return report;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await verifyFishingRelease();
}
