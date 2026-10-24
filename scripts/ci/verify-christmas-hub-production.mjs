// Fail closed if a successful Cloudflare upload leaves the 2026 Christmas
// calendar hidden behind stale HTML or an older edition of the site.
// Run only inside the already-protected production GitHub Actions workflow.
const origin = (process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const route = "/events/christmas-events";
const runKey = encodeURIComponent([process.env.GITHUB_SHA || "local", process.env.GITHUB_RUN_ID || "manual"].join("-"));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const now = new Date();
const dateParts = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
}).formatToParts(now);
const date = ["year", "month", "day"].map((k) => dateParts.find((p) => p.type === k)?.value).join("-");

if (date < "2026-10-23" || date > "2027-01-01") {
  console.log(`Christmas 2026 source-window production check not applicable on ${date}.`);
  process.exit(0);
}

const required = [
  "Source-verified local traditions",
  "Christmas lights, parades and community festivals",
  "Official event schedule",
  "Christmas travel sponsorships",
  "Flower Mound Christmas Parade and Tree Lighting",
  "A Pineywoods Christmas",
  "College Station Christmas in the Park",
  "verified community Christmas calendar entries",
];

async function check(url) {
  const response = await fetch(url, {
    redirect: "follow", cache: "no-store", signal: AbortSignal.timeout(25_000),
    headers: { "user-agent": "TexasDefined-Christmas-Production-Smoke/1.0" },
  });
  if (!response.ok || response.headers.get("cf-mitigated") === "challenge") {
    throw new Error(`Non-successful Christmas route: HTTP ${response.status}`);
  }
  const html = await response.text();
  const missing = required.filter((s) => !html.includes(s));
  if (missing.length) throw new Error(`Stale Christmas HTML; missing: ${missing.join("; ")}`);
  // Publisher account verification may exist pre-approval; an actual ad unit must not.
  if (/<ins\\b[^>]*class=["'][^"']*adsbygoogle\\b/i.test(html) || /data-ad-slot=/.test(html)) {
    throw new Error("Unapproved display ad unit found on Christmas page");
  }
  return { status: response.status, bytes: html.length, cache: response.headers.get("cf-cache-status") || "unknown" };
}

let lastFailure = "unattempted";
for (let attempt = 1; attempt <= 4; attempt += 1) {
  try {
    // Verify both the real visitor URL and a cache-busted HTML request.
    const canonical = await check(`${origin}${route}`);
    const cacheBusted = await check(`${origin}${route}?verify-christmas-release=${runKey}-${attempt}`);
    console.log(`Verified Christmas 2026 live canonical and uncached page; ${required.length} editorial/sponsor/date markers, no AdSense script. Canonical ${JSON.stringify(canonical)}, fresh ${JSON.stringify(cacheBusted)}.`);
    process.exit(0);
  } catch (error) {
    lastFailure = error instanceof Error ? error.message : String(error);
    console.warn(`Christmas production attempt ${attempt} not ready: ${lastFailure}`);
  }
  if (attempt < 4) await sleep(5_000);
}
console.error(`Christmas 2026 production verification FAILED at ${origin}${route}: ${lastFailure}`);
process.exit(1);
