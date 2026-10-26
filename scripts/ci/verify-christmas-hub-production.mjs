import { readFileSync } from "node:fs";

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
];

// Read the exact manifest used by the production build. Events automatically
// disappear after their final verified date; a fixed count or fixed list of
// expired events would make an otherwise healthy December deploy fail.
const source = readFileSync("src/data/events/christmas-community-2026.server.ts", "utf8");
const start = source.indexOf("const verifiedOccurrences");
const end = source.indexOf("\n];", start);
if (start < 0 || end <= start) throw new Error("Christmas source manifest boundaries missing");
const literal = source.slice(source.indexOf("= [", start) + 2, end + 2).trim();
const allCommunityEvents = JSON.parse(literal);
const remainingCommunityEvents = allCommunityEvents.filter((event) =>
  (event.endDate ?? event.startDate) >= date
);
const expectedActiveCommunityCount = remainingCommunityEvents.length;
if (!expectedActiveCommunityCount) throw new Error("2026 Christmas dates expired earlier than expected");

// A small representative sample proves recent source batches survived the
// deployment. The date filter prevents already-completed nights from failing
// later release checks.
const sampleSlugs = [
  "southlake-home-for-the-holidays-2026",
  "livingston-christmas-train-village-2026-5",
  "clearlake-65th-christmas-boat-lane-parade-2026",
  "pearland-hometown-christmas-parade-2026",
];
const expectedLiveWitnesses = remainingCommunityEvents.filter((event) =>
  sampleSlugs.includes(event.slug)
);
if (expectedLiveWitnesses.length === 0 && date <= "2026-12-27") {
  throw new Error("Christmas release witness dates missing from source manifest");
}

// Verify the same concerts and actual ticket destinations the visitor sees,
// not just the evergreen community-calendar section. Each expected marker stops
// applying after that event's FINAL scheduled day in Texas. This prevents a
// healthy post-Christmas page from failing future production deployments.
const performanceEvidence = [
  { through: "2026-12-27", marker: "Holiday events and concerts in Texas (2026)", label: "2026 concerts section" },
  { through: "2026-11-29", marker: "How the Grinch Stole Christmas", label: "Dallas Grinch extended run" },
  { through: "2026-12-05", marker: "A Drummer Boy Christmas", label: "Fort Worth KING + COUNTRY" },
  { through: "2026-12-11", marker: "0C00653DBA7FA947", label: "Dec 11 Bruton exact Ticketmaster link" },
  { through: "2026-12-20", marker: "etix.com/ticket/v/32639/crighton-theatre", label: "Conroe Crighton Etix source" },
  { through: "2026-12-16", marker: "Pentatonix: Christmas in the City Tour", label: "Fort Worth Pentatonix" },
  { through: "2026-12-17", marker: "0C00653DB901A616", label: "Dec 17 Bruton exact Ticketmaster link" },
  { through: "2026-12-20", marker: "A Very Merry Symphony", label: "Cedar Park Austin Symphony" },
  { through: "2026-12-20", marker: "A Celtic Christmas by A Taste of Ireland", label: "McAllen Celtic Christmas" },
  { through: "2026-12-22", marker: "House of Blues Houston", label: "Houston Grand Ol Christmas" },
  { through: "2026-12-23", marker: "0C0064CA0668F4BE", label: "Dallas Grand Ol exact Ticketmaster link" },
  { through: "2026-12-24", marker: "Cirque Musica Holiday Wonderland", label: "Cedar Park Cirque Musica" },
  { through: "2026-12-27", marker: "Alley Theatre", label: "Houston A Christmas Carol final run" },
];
const activePerformances = performanceEvidence.filter(({ through }) => date <= through);

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
  // Check rendered visitor text, not a hydration script that could contain
  // unreleased data while stale HTML stays in the cache.
  const visible = html
    .replace(/<script\\b[^>]*>[\\s\\S]*?<\\/script>/gi, " ")
    .replace(/<style\\b[^>]*>[\\s\\S]*?<\\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\\s+/g, " ");
  const countEvidence = `${expectedActiveCommunityCount.toLocaleString("en-US")} verified community Christmas calendar entries`;
  const countMismatch = !visible.includes(countEvidence);
  const missingSourceEvents = expectedLiveWitnesses
    .filter((event) => !visible.includes(event.title))
    .map((event) => event.slug);
  const missingShows = activePerformances.filter(({ marker }) => !html.includes(marker)).map(({ label }) => label);
  if (missing.length || countMismatch || missingSourceEvents.length || missingShows.length) {
    throw new Error(
      `Stale Christmas HTML; source count ${countMismatch ? `expected ${countEvidence}` : "matched"}; ` +
      `missing community markers: ${missing.join("; ") || "none"}; ` +
      `missing dated events: ${missingSourceEvents.join("; ") || "none"}; ` +
      `missing concerts/tickets: ${missingShows.join("; ") || "none"}`
    );
  }
  // Publisher account verification may exist pre-approval; an actual ad unit must not.
  if (/<ins\b[^>]*class=["'][^"']*adsbygoogle\b/i.test(html) || /data-ad-slot=/.test(html)) {
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
    console.log(`Verified Christmas 2026 live canonical and uncached page; ${expectedActiveCommunityCount} active dated community events, ${expectedLiveWitnesses.length} recent source witnesses, ${required.length} fixed editorial/sponsor markers and ${activePerformances.length} date-scoped concert/ticket markers, no active AdSense display unit. Canonical ${JSON.stringify(canonical)}, fresh ${JSON.stringify(cacheBusted)}.`);
    process.exit(0);
  } catch (error) {
    lastFailure = error instanceof Error ? error.message : String(error);
    console.warn(`Christmas production attempt ${attempt} not ready: ${lastFailure}`);
  }
  if (attempt < 4) await sleep(5_000);
}
console.error(`Christmas 2026 production verification FAILED at ${origin}${route}: ${lastFailure}`);
process.exit(1);
