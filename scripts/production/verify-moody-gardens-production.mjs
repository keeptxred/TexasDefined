import { normalizeMoodyGardensTextEntities } from "./moody-gardens-html-entities.mjs";

const targets = [
  ["direct-worker", "https://texasdefined-site.freddy-coppola.workers.dev/destination/moody-gardens"],
  ["canonical-domain", "https://texasdefined.com/destination/moody-gardens"],
];

const customMarker = "How to visit Moody Gardens without wasting time or ticket money";
const affiliateMarker = "Tours & bookable experiences";
const imageMarkers = [
  "Moody_Gardens_Aquarium_Pyramid_HDR_Galveston_(6971130700).jpg",
  "Moody_Gardens_Rainforest_Pyramid_(14248736931).jpg",
  "Discovery_Pyramid_Moody_Gardens.jpg",
  "The_Moody_Gardens_Hotel_pool_at_night_6-10.jpg",
];
const requiredFreshnessMarkers = [
  "Moody Gardens: address, admission and timing",
  "Aquarium, Rainforest or Discovery: how to choose",
  "Galveston Children",
  "November 9, 2026",
  "price the exact attractions you will visit",
  "wheelchairs",
  "accessibility",
  "combined Aquarium + Rainforest ticket",
  "9 to 10 AM is reserved for museum members",
  "a ticket that includes Galveston Children's Museum admission",
  "separate museum admission",
  "Thanksgiving Day",
  "galvestoncm.org/general-info-admission",
  "GCM members",
  "Museum-only cost example",
  "$15 per person",
  "$60 before discounts",
  "Everybody Plays",
  "SNAP or Medicaid benefits",
  "special events are excluded",
  "10 AM to 5 PM",
  "Jellyfish Gallery",
  "Flower Garden Banks",
  "Nightfall",
  "Our Town",
  "Room to Grow",
  "20,000 Leagues Under the Sea",
  "galvestoncm.org/exhibits",
  "Galveston Bay ecosystems",
  "This guide was substantively updated on",
  "Holiday day-of attraction calendar",
  "Official day-by-day attraction and holiday hours",
  "November 24, 2026",
];
const staleClosureMarkers = [
  "children's museum entry is included with a Moody Gardens ticket",
  "included ticket admission",
  "Discovery Museum is temporarily closed",
  "Discovery Museum scheduled to reopen",
  "Discovery Museum programming and special exhibitions may be separately ticketed or unavailable",
  "Closed now; scheduled to reopen",
  "Temporarily closed as of October 25",
  "scheduled to reopen in November 2026",
];
const forbiddenMarkers = [
  "What to know about Moody Gardens",
  "More from Beaches & Coast",
  "Tours & bookable experiences",
  ...staleClosureMarkers,
  "Discovery Museum closure guidance",
  "The Rainforest Pyramid, Discovery Museum, theaters, seasonal attractions",
  "Independent Texas Defined research",
  "Why this place matters",
  "Our trip-planning assessment",
  "Things to do and see",
];

const earlyClosingMarker = "Monday, Nov. 16: attractions close early";
const earlyClosingNoticeActive = Date.now() >= Date.parse("2026-11-13T00:00:00Z")
  && Date.now() < Date.parse("2026-11-17T06:00:00Z");

const failures = [];
for (const [label, rawUrl] of targets) {
  const url = new URL(rawUrl);
  url.searchParams.set("production_acceptance", process.env.GITHUB_SHA || Date.now().toString());
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "cache-control": "no-cache",
      pragma: "no-cache",
      "user-agent": "TexasDefined-production-acceptance/1.0",
    },
  });
  const html = await response.text();
  const decodedVisitorCopy = normalizeMoodyGardensTextEntities(html);
  // The date-bounded SSR alert must not be cached beyond midnight on Nov. 16.
  // Checking both origins catches independent CDN/browser cache regressions.
  if (Date.now() < Date.parse("2026-11-18T06:00:00Z")
      && Date.now() >= Date.parse("2026-11-13T00:00:00Z")) {
    const cacheControl = response.headers.get("cache-control")?.toLowerCase() ?? "";
    if (!cacheControl.includes("no-store")) {
      failures.push(`${label}: Moody Gardens time-sensitive HTML is not protected by no-store; cache-control=${cacheControl || "missing"}`);
    }
    const cacheState = response.headers.get("cf-cache-status")?.toUpperCase() ?? "";
    if (cacheState === "HIT") {
      failures.push(`${label}: Moody Gardens time-sensitive HTML was served from an old Cloudflare cache`);
    }
  }
  if (!response.ok) failures.push(`${label}: HTTP ${response.status}`);
  if (!html.includes(customMarker)) failures.push(`${label}: custom Moody Gardens planning section missing`);
  const customIndex = html.indexOf(customMarker);
  const affiliateIndex = html.indexOf(affiliateMarker);
  if (affiliateIndex >= 0 && customIndex >= affiliateIndex) failures.push(`${label}: Moody Gardens editorial must render before Viator affiliate content`);
  for (const imageMarker of imageMarkers) {
    if (!html.includes(imageMarker)) failures.push(`${label}: Moody Gardens image card missing asset ${imageMarker}`);
  }
  for (const marker of requiredFreshnessMarkers) {
    if (!decodedVisitorCopy.includes(marker)) failures.push(`${label}: missing current visitor-fact marker: ${marker}`);
  }
  for (const marker of forbiddenMarkers) {
    if (decodedVisitorCopy.includes(marker)) failures.push(`${label}: stale/duplicate authority claim: ${marker}`);
  }
  if (earlyClosingNoticeActive && !html.includes(earlyClosingMarker)) {
    failures.push(`${label}: Nov. 16 early-closing notice missing while the operator alert is active`);
  }
  if (!earlyClosingNoticeActive && html.includes(earlyClosingMarker)) {
    failures.push(`${label}: expired Nov. 16 early-closing notice remains published`);
  }
  if (Date.now() >= Date.parse("2026-11-13T00:00:00Z")
      && Date.now() < Date.parse("2026-11-18T06:00:00Z")) {
    // A query-string can bypass stale edge HTML even if a real user still
    // receives an obsolete cached document. Recheck the ordinary public URL
    // on both sides of the Nov. 17 00:00 CST notice-expiry boundary.
    const ordinary = await fetch(rawUrl, {
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
      headers: { "user-agent": "TexasDefined-ordinary-public-HTML/1.0" },
    });
    const ordinaryHtml = await ordinary.text();
    const ordinaryNoticeCorrect = earlyClosingNoticeActive
      ? ordinaryHtml.includes(earlyClosingMarker)
      : !ordinaryHtml.includes(earlyClosingMarker);
    if (!ordinary.ok || !ordinaryNoticeCorrect) {
      failures.push(`${label}: ordinary URL serves the wrong Nov. 16 alert state for the current event window (HTTP ${ordinary.status})`);
    }
    const ordinaryCacheControl = ordinary.headers.get("cache-control")?.toLowerCase() ?? "";
    if (!ordinaryCacheControl.includes("no-store") || ordinary.headers.get("cf-cache-status")?.toUpperCase() === "HIT") {
      failures.push(`${label}: ordinary URL may serve stale notice HTML; cache-control=${ordinaryCacheControl || "missing"}; cf-cache-status=${ordinary.headers.get("cf-cache-status") || "missing"}`);
    }
  }
  // The original Nov. 9 operator review remains visible, but real editorial
  // additions on Nov. 14 must have their own accurately dated WebPage markup.
  const currentSchemaDate = /"dateModified":"(\d{4}-\d{2}-\d{2})"/.exec(html)?.[1];
  if (currentSchemaDate !== "2026-11-24") {
    failures.push(`${label}: WebPage dateModified must reflect Nov. 24 substantive holiday change, found ${currentSchemaDate ?? "missing"}`);
  }
  const canonicalLink = (html.match(/<link\b[^>]*>/gi) ?? [])
    .find((tag) => /\brel=["']canonical["']/i.test(tag));
  const canonicalHref = canonicalLink?.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? "";
  if (canonicalHref !== "https://texasdefined.com/destination/moody-gardens") {
    failures.push(`${label}: missing or wrong self-canonical: ${canonicalHref || "missing"}`);
  }
  const robotsMeta = (html.match(/<meta\b[^>]*>/gi) ?? [])
    .find((tag) => /\bname=["']robots["']/i.test(tag));
  if (robotsMeta && /\bnoindex\b/i.test(robotsMeta)) {
    failures.push(`${label}: unexpected noindex on a certified authority destination`);
  }
  const title = /<title[^>]*>([^<]+)<\/title>/i.exec(html)?.[1] ?? "";
  if (!title.includes("Moody Gardens Galveston")) {
    failures.push(`${label}: missing descriptive destination title`);
  }
  console.log(`Moody Gardens production acceptance: ${label} HTTP ${response.status}; bytes=${html.length}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("Moody Gardens production acceptance passed.");
