// Verify the visitor-visible 2026 Polar Express booking guide, not a homepage
// health check or hydrated app bundle. Runs inside the existing protected
// GitHub Actions production workflow, after direct and canonical health pass.
// Dates are source-attributed to Palestine's 2026 city calendar, not seat guarantees.
const origin = String(process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const route = "/event/polar-express-palestine";
const today = new Date().toISOString().slice(0, 10);
const runKey = encodeURIComponent([process.env.GITHUB_SHA || "local", process.env.GITHUB_RUN_ID || "manual"].join("-"));
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

if (today < "2026-10-26" || today > "2027-01-05") {
  console.log("Palestine 2026 release guard not applicable outside the 2026 Christmas publication window.");
  process.exit(0);
}

const expected = [
  ['correct 2026 booking range start', "November 13, 2026"],
  ['correct 2026 booking range end', "December 28, 2026"],
  ['source provenance for superseded date range', "older 2024/2025 content"],
  ['dated 2026 calendar not seat inventory', "not confirmed ticket inventory"],
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

function verifyHtml(html, label) {
  const missing = expected.filter(([description, marker]) => !html.includes(marker)).map(([description]) => description);
  const forbidden = [
    ["superseded 2017 venue photo", "Palestine_August_2017_55_"],
    ["superseded unqualified date statement", "Scheduled November 14–December 27, 2026."],
    ["superseded unexplained schedule conflict", "2026 date sources conflict:"],
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
