import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const outputPath = path.resolve("src/data/camping/official-alerts.generated.ts");
const day = new Date().toISOString().slice(0, 10);
const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const monthNumber = name => monthNames.findIndex(month => month.slice(0,3).toLowerCase() === name.slice(0,3).toLowerCase());
const isoDate = (year, month, day) => year + "-" + String(month+1).padStart(2,"0") + "-" + String(day).padStart(2,"0");
function datedSourceAnchor(text, park) {
  const section = park === "enchanted-rock-state-natural-area" ? "Trail Closures" : "Burn Ban";
  const part = text.split(section)[1] ?? "";
  const date = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.\s*(\d{1,2}),\s*(20\d{2})\b/i.exec(part.slice(0, 140));
  return date ? { month:monthNumber(date[1]), year:Number(date[3]) } : null;
}
function parseTPWDClosures(text, park) {
  const anchor = datedSourceAnchor(text, park);
  const section = text.split("The park will be closed on the following dates:")[1]
    ?.split(park === "brazos-bend-state-park" ? "The group camp area" : "Only permitted hunters will be allowed")[0] ?? "";
  if (!anchor || !section || !/Only permitted hunters will be allowed on these dates/i.test(text)) return null;
  const syntax = park === "enchanted-rock-state-natural-area"
    ? /12:30 p\.m\.\s+on\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.\s*(\d{1,2})\s+to\s+2 p\.m\.\s+on\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.\s*(\d{1,2})/gi
    : /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.\s*(\d{1,2})\s+to\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.\s*(\d{1,2})/gi;
  const found = [...section.matchAll(syntax)];
  // Parse EVERY closing interval; don't quietly publish a partial schedule.
  const markerCount = park === "enchanted-rock-state-natural-area"
    ? (section.match(/12:30 p\.m\.\s+on/gi) ?? []).length
    : (section.match(/\bto\b/gi) ?? []).length;
  if (found.length < 1 || found.length > 12 || markerCount !== found.length ||
      /\b(?:cancelled|canceled|reopened|no longer closed)\b/i.test(section)) return null;
  const result = [];
  let previousMonth = anchor.month, year = anchor.year, previousISO = null;
  for (const match of found) {
    const startMonth = monthNumber(match[1]), startDay = Number(match[2]);
    const endMonth = monthNumber(match[3]), endDay = Number(match[4]);
    if ([startMonth,endMonth].some(x=>x<0) || startDay < 1 || endDay < 1) return null;
    // A previous-year list stays expired even when the calendar advances:
    // source-stamped year controls assignment, never today's local year.
    const advanceMonths = (startMonth - previousMonth + 12) % 12;
    if (advanceMonths > 6) return null;
    if (startMonth < previousMonth) year++;
    const endYear = year + (endMonth < startMonth ? 1 : 0);
    const startISO = isoDate(year,startMonth,startDay), endISO = isoDate(endYear,endMonth,endDay);
    const span = (Date.parse(endISO+"T00:00:00Z")-Date.parse(startISO+"T00:00:00Z"))/86400000;
    if (!Number.isInteger(span) || span < 0 || span > 20 || (previousISO && startISO <= previousISO)) return null;
    const label = year !== endYear
      ? monthNames[startMonth] + " " + startDay + ", " + year + "–" + monthNames[endMonth] + " " + endDay + ", " + endYear
      : startMonth === endMonth
        ? monthNames[startMonth] + " " + startDay + "–" + endDay + ", " + year
        : monthNames[startMonth] + " " + startDay + "–" + monthNames[endMonth] + " " + endDay + ", " + year;
    result.push({start:startISO,end:endISO,label});
    previousISO = startISO;
    previousMonth = startMonth;
  }
  return result;
}
const sources = [
  {
    destinationSlug: "goose-island-state-park", parkName: "Goose Island State Park",
    sourceUrl: "https://tpwd.texas.gov/state-parks/goose-island/alert",
    required: [/Water Outage/i, /Oct\.\s*23,\s*2026\s*-\s*Water is out at the Bayfront camping area/i, /Burn Ban/i, /park is under a burn ban/i, /Construction Alerts/i, /Expect intermittent closures for sites 1\s*-\s*24/i],
    notice: "Bayfront camping-area water outage reported October 23, 2026. Fill fresh-water tanks before arriving; TPWD also reports a burn ban and possible intermittent campsite disruptions.",
  },
  {
    destinationSlug: "enchanted-rock-state-natural-area", parkName: "Enchanted Rock State Natural Area",
    sourceUrl: "https://tpwd.texas.gov/state-parks/enchanted-rock/alert",
    required: [/Park Closures/i, /backcountry trails may have intermittent closures/i],
    notice: (text, asOf = day) => {
      const remaining = (parseTPWDClosures(text,"enchanted-rock-state-natural-area") || []).filter(w => w.end >= asOf).map(w => w.label);
      return remaining.length ? "TPWD lists scheduled park closures for " + remaining.join("; ") + ". Backcountry trails may close intermittently." : "Previously listed closure windows have elapsed. Check TPWD for the latest access and backcountry-trail restrictions.";
    },
  },
  {
    destinationSlug: "big-bend-national-park", parkName: "Big Bend National Park",
    sourceUrl: "https://www.nps.gov/bibe/planyourvisit/conditions.htm",
    required: [/weather-related road closures/i, /paved road between Cottonwood Campground and Santa Elena Canyon/i, /Hot Springs Road beyond the overflow parking area/i, /Paint Gap Road/i, /River Road West to Glenn Springs Road/i, /Black Gap Road is c\s*los/i],
    notice: "NPS reports weather-related closures of the paved road between Cottonwood Campground and Santa Elena Canyon, Hot Springs Road beyond overflow parking, Paint Gap Road, River Road West to Glenn Springs Road, and Black Gap Road. Verify current access before planning a backcountry drive.",
  },
  {
    destinationSlug: "brazos-bend-state-park", parkName: "Brazos Bend State Park",
    sourceUrl: "https://tpwd.texas.gov/state-parks/brazos-bend/alert",
    required: [/Burn Ban/i, /No wood fires allowed/i, /You may use charcoal or containerized stoves/i],
    notice: (text, asOf = day) => {
      const futureClosures = (parseTPWDClosures(text,"brazos-bend-state-park") || []).filter(window => window.end >= asOf);
      if (futureClosures.length === 0) return "TPWD reports a wood-fire burn ban; charcoal or containerized fuel cooking is allowed. Check park alerts for the latest closures and access conditions.";
      return "TPWD reports a wood-fire burn ban (charcoal or containerized fuel cooking allowed). The park lists closures " + futureClosures.map(w => w.label).join(" and ") + "; only permitted hunters may enter during those closures. Check the current park notice before booking.";
    },
  },
  {
    destinationSlug: "palo-pinto-mountains-state-park", parkName: "Palo Pinto Mountains State Park",
    sourceUrl: "https://tpwd.texas.gov/state-parks/palo-pinto-mountains/park-alert",
    required: [/Visiting the Park/i, /final touches are ongoing/i, /may reach capacity on weekends and holidays/i],
    notice: "TPWD says final construction work is ongoing. Follow posted safety signs; weekend and holiday capacity may be reached, so reserve entry before visiting.",
  },
];
// All source-listed park-wide closure windows must parse and retain their
// original date meaning, including year rollovers, or no dated claim ships.
function isVerified(source, text, asOf = day) {
  if (!source.required.every(pattern => pattern.test(text))) return false;
  if (source.destinationSlug === "enchanted-rock-state-natural-area")
    return parseTPWDClosures(text,source.destinationSlug) !== null;
  if (source.destinationSlug === "big-bend-national-park") {
    if (/\b(?:Paint Gap Road|Hot Springs Road|Black Gap Road|River Road West|Cottonwood Campground and Santa Elena Canyon)\s+(?:has\s+)?(?:reopened|is\s+open)\b/i.test(text)) return false;
  }
  if (source.destinationSlug === "brazos-bend-state-park")
    return parseTPWDClosures(text,source.destinationSlug) !== null;
  return true;
}

// Synthetic source fragments deliberately exercise the exact official-source
// wording contract without touching the network or date-stamping snapshots.
const REVIEW_NOTICE = "The previously recorded advisory could not be verified verbatim. Check the park\'s current official alerts before travel; no resolution is assumed.";
const sourceOutcome = (source, text, asOf = day) => {
  const confirmed = isVerified(source, text, asOf);
  return { status: confirmed ? "confirmed" : "needs-review", notice: confirmed
    ? (typeof source.notice === "function" ? source.notice(text, asOf) : source.notice)
    : REVIEW_NOTICE };
};

// Preserve published alert order on a no-op source check. Without this,
 // unchanged records generate spurious bot PRs simply by changing array order.
function preserveExistingOrder(rows, prior) {
  const order = new Map(prior.map((item, index) => [item.destinationSlug, index]));
  return [...rows].sort((a,b) => {
    const ai = order.get(a.destinationSlug) ?? Number.MAX_SAFE_INTEGER;
    const bi = order.get(b.destinationSlug) ?? Number.MAX_SAFE_INTEGER;
    return ai - bi;
  });
}
if (process.argv.includes("--self-test")) {
  const ordered = preserveExistingOrder([
    {destinationSlug:"goose"}, {destinationSlug:"big"}, {destinationSlug:"palo"}
  ], [{destinationSlug:"goose"}, {destinationSlug:"palo"}, {destinationSlug:"big"}]);
  assert.deepEqual(ordered.map(row => row.destinationSlug), ["goose","palo","big"],
    "no-op source checks must retain the published array order");
  const fixtures = [
    "Park Alerts Burn Ban Aug. 11, 2026 - The park is under a burn ban. Water Outage Oct. 23, 2026 - Water is out at the Bayfront camping area. Construction Alerts Expect intermittent closures for sites 1 - 24",
    "Park Alerts Trail Closures Oct. 20, 2026 - The backcountry trails may have intermittent closures. Park Closures The park will be closed on the following dates: 12:30 p.m. on Oct. 12 to 2 p.m. on Oct. 16 12:30 p.m. on Nov. 2 to 2 p.m. on Nov. 6 12:30 p.m. on Nov. 30 to 2 p.m. on Dec. 4 12:30 p.m. on Jan. 25 to 2 p.m. on Jan. 29 Only permitted hunters will be allowed on these dates",
    "Alerts & Conditions weather-related road closures. The paved road between Cottonwood Campground and Santa Elena Canyon. Hot Springs Road beyond the overflow parking area. Paint Gap Road River Road West to Glenn Springs Road Black Gap Road is c losed",
    "Park Alerts Burn Ban Aug. 28, 2026 - The park is under a burn ban. No wood fires allowed. You may use charcoal or containerized stoves. Park Closures The park will be closed on the following dates: Nov. 17 to Nov. 19 Dec. 15 to Dec. 17 Only permitted hunters will be allowed on these dates",
    "Park Alert Visiting the Park: final touches are ongoing. The park may reach capacity on weekends and holidays",
  ];
  for (let i = 0; i < sources.length; i++) {
    assert.equal(isVerified(sources[i], fixtures[i], "2026-10-28"), true, sources[i].parkName + " fixture");
  }
  assert.equal(isVerified(sources[0], fixtures[0].replace("Oct. 23, 2026", "Oct. 25, 2026")), false, "changed dated outage must get review");
  assert.equal(isVerified(sources[0], fixtures[0].replace("under a burn ban", "not under a burn ban")), false, "burn ban withdrawal is not confirmed");
  assert.equal(isVerified(sources[1], fixtures[1].replace("on Nov. 30", "on Nov. 30").replace("12:30 p.m. on Nov. 30", "12:30 p.m. on Nov. 8 to 2 p.m. on Nov. 10 12:30 p.m. on Nov. 30")), true, "new source-supported closure is parsed safely");
  assert.equal(isVerified(sources[1], fixtures[1].replace("to 2 p.m. on Nov. 6", "through Nov. 6")), false, "unrecognized new closure format needs review");
  assert.equal(isVerified(sources[2], fixtures[2].replace("Paint Gap Road", "Paint Gap Road reopened")), false, "reopened access is not a confirmed closure");
  assert.equal(isVerified(sources[2], fixtures[2].replace("Paint Gap Road", "Reopened side road")), false, "removed road closure triggers review");
  assert.equal(isVerified(sources[3], fixtures[3].replace("Only permitted hunters will be allowed on these dates", "")), false, "hunting access claim requires source");
  const enchanted = sources[1].notice(fixtures[1], "2026-11-07");
  assert(!enchanted.includes("November 2–6"), "elapsed November closure must expire");
  assert(enchanted.includes("November 30–December 4"), "still upcoming closure must remain");
  const brazos = sources[3].notice(fixtures[3], "2026-11-20");
  assert(!brazos.includes("November 17–19"), "elapsed Brazos closure must expire");
  assert(brazos.includes("December 15–17"), "later Brazos closure must remain");
  const dynamicEnchanted = sources[1].notice(fixtures[1].replace("12:30 p.m. on Nov. 30", "12:30 p.m. on Nov. 8 to 2 p.m. on Nov. 10 12:30 p.m. on Nov. 30"), "2026-11-07");
  assert(dynamicEnchanted.includes("November 8–10, 2026"), "new TPWD closure is published from source text without editing code");
  const staleGooseIsland = sourceOutcome(sources[0], fixtures[0].replace("Oct. 23, 2026", "Oct. 25, 2026"));
  assert.equal(staleGooseIsland.status, "needs-review");
  assert.equal(staleGooseIsland.notice, REVIEW_NOTICE);
  assert(!staleGooseIsland.notice.includes("water outage reported"), "stale date-specific advisory must not remain visible");
  const stillConfirmed = sourceOutcome(sources[0], fixtures[0]);
  assert.equal(stillConfirmed.status, "confirmed");
  assert(stillConfirmed.notice.includes("water outage"), "confirmed source retains authoritative notice");
  console.log("Camping advisories: 5 positive source fixtures; changed dates, new closures, withdrawn restrictions, safe downgrades and date rollovers guarded.");
  process.exit(0);
}

const normalize = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]*>/g, " ").replace(/&nbsp;|&#160;/gi, " ")
  .replace(/&amp;/gi, "&").replace(/\s+/g, " ").trim();
// Keep the page's verification date stable on successful no-op checks. The
// workflow logs/artifact record every check; the published page changes only
// when the actual notice or confidence status changes.
const oldFile = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";
const priorMatch = oldFile.match(/export const CAMPING_OPERATIONAL_ALERTS = (\[[\s\S]*?\]) as const;/);
const oldAlerts = priorMatch ? JSON.parse(priorMatch[1]) : [];
const rows = [];
for (const source of sources) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  let html;
  try {
    const res = await fetch(source.sourceUrl, { signal: controller.signal, headers: { "user-agent": "TexasDefined Camping Source Monitor (editorial verification)" } });
    if (!res.ok) throw new Error("HTTP " + res.status);
    html = await res.text();
  } finally { clearTimeout(timer); }
  const text = normalize(html);
  const expectedHeading = source.sourceUrl.includes("nps.gov") ? /Alerts & Conditions/i : /Park Alerts?/i;
  if (!expectedHeading.test(text) || text.length < 500) throw new Error("Invalid official alert page: " + source.sourceUrl);
  const { status, notice } = sourceOutcome(source, text, day);
  const previous = oldAlerts.find(old => old.destinationSlug === source.destinationSlug);
  const unchanged = previous && previous.parkName === source.parkName
    && previous.sourceUrl === source.sourceUrl && previous.notice === notice && previous.status === status;
  rows.push({ destinationSlug: source.destinationSlug, parkName: source.parkName, sourceUrl: source.sourceUrl,
    notice, checkedAt: unchanged ? previous.checkedAt : day, status });
  console.log(source.parkName + ": " + (status === "confirmed" ? "confirmed" : "changed — needs review"));
}
const output = "/** Generated from official TPWD alert pages; do not manually restamp verified dates. */\nexport const CAMPING_OPERATIONAL_ALERTS = " + JSON.stringify(preserveExistingOrder(rows, oldAlerts), null, 2) + " as const;\n";
if (process.argv.includes("--write")) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  if (!fs.existsSync(outputPath) || fs.readFileSync(outputPath, "utf8") !== output) fs.writeFileSync(outputPath, output);
} else {
  console.log(JSON.stringify(rows, null, 2));
}
if (rows.some(row => row.status === "needs-review")) {
  // A reachable, valid official page that no longer supports the recorded
  // assertion is enough evidence to withdraw that assertion, NOT enough to
  // claim a park reopened. Publish a linked, generic needs-review notice.
  console.warn("One or more official sources changed: publish a safety downgrade and open a review issue.");
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, "needs_review=true\n");
}
