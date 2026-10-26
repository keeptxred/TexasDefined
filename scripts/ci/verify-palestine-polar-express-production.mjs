import { readFileSync } from "node:fs";

// Verify the visitor-visible source-confirmed Polar Express guide, not a homepage
// health check or hydrated app bundle. Runs inside the existing protected
// GitHub Actions production workflow, after direct and canonical health pass.
// Dates are source-attributed to Palestine's 2026 city calendar, not seat guarantees.
const origin = String(process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const route = "/event/polar-express-palestine";
const today = new Date().toISOString().slice(0, 10);
const runKey = encodeURIComponent([process.env.GITHUB_SHA || "local", process.env.GITHUB_RUN_ID || "manual"].join("-"));
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

if (today < "2026-10-26" || today > "2027-12-31") {
  console.log("Palestine 2026 release guard not applicable outside the 2026 Christmas publication window.");
  process.exit(0);
}

const expected = [
  ['correct 2026 booking range start', "November 13, 2026"],
  ['correct 2026 booking range end', "December 28, 2026"],
  ['organizer-published 2026 calendar', "Texas State Railroad’s official November and December 2026 calendars"],
  ['dated schedule is not live inventory', "not guaranteed available seats"],
  ['November 13 published times', "Nov 13: 5:30 and 7:00 PM"],
  ['December 28 published times', "Dec 28: 3:00, 4:30, 6:00 and 7:30 PM"],
  ['December 18 included', "18–23, 26–28"],
  ['actual operating dates (not every day)', "Nov 13–15, 19–24, 27–29"],
  ['prominent booking section', 'data-polar-express-2026-schedule="true"'],
  ['organizer booking CTA', 'data-event-official-ticket-cta="true"'],
  ['official 2026 booking URL', "https://texasstaterailroad.net/the-polar-express/"],
  ['correct Palestine hotel search destination', "de1634643/hotels-palestine-texas/"],
  ['CJ affiliate disclosure', 'data-commercial-partner="hotels.com"'],
  ['2015 licensed historical Polar Express photograph', "Southern_Pine_Lumber_Co._No._28"],
  ['photographer attribution', "Michael Gras"],
  ['photo licensing', "CC BY 2.0"],
  ['diesel not mistaken for 2026 steam', "diesel locomotive"],
  ['refund rules', "$20"],
  ['boarding timing', "45 minutes"],
  ['Christmas event calendar cross-link', "/events/christmas-events"],
];

// A valid after-2026 page must not be rejected for omitting last year’s train schedule.
const manifest = JSON.parse(readFileSync("src/data/generated/palestine-polar-express-season.json", "utf8"));
if (manifest.year === 2027 && manifest.status === "verified") {
  expected.splice(0, expected.length,
    ["2027 source verified", 'data-polar-express-season-verified="2027"'],
    ["2027 timetable visible", "Official 2027 train departure calendar"],
    ["start date from verified calendar", manifest.startDate],
    ["end date from verified calendar", manifest.endDate],
    ["not claiming ticket availability", "not an indication that tickets remain available"],
    ["organizer URL", "https://texasstaterailroad.net/the-polar-express/"],
    ["Palestine Hotels.com affiliate", "de1634643/hotels-palestine-texas/"],
    ["historical image credit", "Michael Gras"],
    ["Christmas event calendar", "/events/christmas-events"]);
} else if (today > "2026-12-28") {
  expected.splice(0, expected.length,
    ["no 2027 dates invented", 'data-polar-express-season-pending="true"'],
    ["unannounced 2027 date label", "2027 schedule not yet announced"],
    ["no future train dates claimed", "2027 departure calendar not yet announced"],
    ["official railroad booking site", "https://texasstaterailroad.net/the-polar-express/"],
    ["Palestine Hotels.com affiliate", "de1634643/hotels-palestine-texas/"],
    ["historical image credit", "Michael Gras"],
    ["Christmas event calendar", "/events/christmas-events"]);
}
function verifyHtml(html, label) {
  const missing = expected.filter(([description, marker]) => !html.includes(marker)).map(([description]) => description);
  if (!html.includes('data-polar-express-editorial-intro="true"')) missing.push("Editorial header missing");
  if (!html.includes('data-polar-express-editorial-essentials="true"')) missing.push("Editorial visit essentials missing");
  if (!html.includes("Where to board") || !html.includes("Allow enough time")) missing.push("Concise reader-first visitor details missing");
  if (html.includes('data-major-event-snapshot="true"')) missing.push("Repetitive four-card dashboard still visible");
  if (html.includes("/event/polar-express-palestine-2026") || html.includes("/event/polar-express-palestine-2027")) missing.push("Year-specific event URL found");
  if (today > "2026-12-28" && manifest.year !== 2027 && html.includes('data-polar-express-2026-schedule="true"')) missing.push("Expired 2026 booking panel still shown");
  const forbidden = [
    ["superseded 2017 venue photo", "Palestine_August_2017_55_"],
    ["superseded unqualified date statement", "Scheduled November 14–December 27, 2026."],
    ["superseded unexplained schedule conflict", "2026 date sources conflict:"],
    ["superseded city-only authority", "City calendar:"],
    ["superseded old-season dates", "An older railroad page shows November 14–December 27"],
  ].filter(([, marker]) => html.includes(marker)).map(([description]) => description);
  const canonical = (html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i) || [])[0] || "";
  if (!canonical.includes('href="' + origin + route + '"') &&
      !canonical.includes("href='" + origin + route + "'")) missing.push("canonical tag points to correct clean URL");
  const h1 = (html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || "";
  if (!h1.includes("POLAR EXPRESS")) missing.push("server-rendered Polar Express heading");
  if (!html.includes('application/ld+json') || !html.includes('BreadcrumbList')) missing.push("BreadcrumbList structured data");
  if (/data-ad-slot=|<ins\b[^>]*adsbygoogle/i.test(html)) forbidden.push("unapproved AdSense display ad");
  if (missing.length || forbidden.length) {
    throw Error(label + ": missing [" + missing.join("; ") + "]; forbidden [" + forbidden.join("; ") + "]");
  }
}

async function retrieve(url, label) {
  const response = await fetch(url, {
    redirect: "follow",
    cache: "no-store",
    signal: AbortSignal.timeout(25000),
    headers: { "user-agent": "TexasDefined-PolarExpress-Palestine-Live-Verifier/1.0" },
  });
  if (!response.ok || response.headers.get("cf-mitigated") === "challenge") {
    throw Error(label + ": HTTP " + response.status + " or Cloudflare challenge");
  }
  const html = await response.text();
  verifyHtml(html, label);
  return {
    status: response.status,
    bytes: html.length,
    cacheStatus: response.headers.get("cf-cache-status") || "unknown",
    age: response.headers.get("age") || null,
  };
}

let failure = "not attempted";
for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    // The canonical page matters for Google and visitors. The fresh request
    // distinguishes a cached old response from a stale deployed Worker.
    const canonical = await retrieve(origin + route, "canonical");
    const fresh = await retrieve(origin + route + "?verify-polar-express=" + runKey + "-" + attempt, "uncached");
    console.log("PASS Palestine Polar Express 2026 canonical + uncached production HTML: " + JSON.stringify({ canonical, fresh }));
    process.exit(0);
  } catch (error) {
    failure = error instanceof Error ? error.message : String(error);
    console.error("Palestine production attempt " + attempt + " failed: " + failure);
    if (attempt < 3) await pause(5000);
  }
}
throw Error("Palestine 2026 production release verification failed at " + origin + route + ": " + failure);
