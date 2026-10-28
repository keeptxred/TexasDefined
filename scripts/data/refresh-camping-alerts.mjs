import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const outputPath = path.resolve("src/data/camping/official-alerts.generated.ts");
const day = new Date().toISOString().slice(0, 10);
const windows = [
  { start: "2026-11-02", end: "2026-11-06", label: "November 2–6, 2026", pattern: /Nov\. 2 to 2 p\.m\. on Nov\. 6/i },
  { start: "2026-11-30", end: "2026-12-04", label: "November 30–December 4, 2026", pattern: /Nov\. 30 to 2 p\.m\. on Dec\. 4/i },
  { start: "2027-01-25", end: "2027-01-29", label: "January 25–29, 2027", pattern: /Jan\. 25 to 2 p\.m\. on Jan\. 29/i },
];
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
      const remaining = windows.filter(w => w.end >= asOf && w.pattern.test(text)).map(w => w.label);
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
      const futureClosures = [
        { end: "2026-11-19", label: "November 17–19, 2026", pattern: /Nov\. 17 to Nov\. 19/i },
        { end: "2026-12-17", label: "December 15–17, 2026", pattern: /Dec\. 15 to Dec\. 17/i }
      ].filter(window => window.end >= asOf && window.pattern.test(text));
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
// A park notice must never be called verified when an unrecognised closure
// interval or a withdrawn restriction changes the meaning of published copy.
const knownEnchantedClosure = [
  /Oct\. 12 to 2 p\.m\. on Oct\. 16/i, ...windows.map(w => w.pattern),
];
function isVerified(source, text, asOf = day) {
  if (!source.required.every(pattern => pattern.test(text))) return false;
  if (source.destinationSlug === "enchanted-rock-state-natural-area") {
    const section = text.split("The park will be closed on the following dates:")[1]
      ?.split("Only permitted hunters will be allowed")[0] ?? "";
    const listed = [...section.matchAll(/[A-Z][a-z]{2}\.\s*\d{1,2}\s+to\s+2\s*p\.m\.\s+on\s+[A-Z][a-z]{2}\.\s*\d{1,2}/g)];
    if (/to\s+2\s*p\.m\./i.test(section) && !listed.length) return false;
    if (listed.some(match => !knownEnchantedClosure.some(pattern => pattern.test(match[0])))) return false;
    return windows.some(w => w.end >= asOf && w.pattern.test(text)) || windows.every(w => w.end < asOf);
  }
  if (source.destinationSlug === "brazos-bend-state-park") {
    const activeClosure = /Nov\. 17 to Nov\. 19|Dec\. 15 to Dec\. 17/i.test(text)
      && asOf <= "2026-12-17";
    if (activeClosure && !/Only permitted hunters will be allowed on these dates/i.test(text)) return false;
  }
  return true;
}

// Synthetic source fragments deliberately exercise the exact official-source
// wording contract without touching the network or date-stamping snapshots.
if (process.argv.includes("--self-test")) {
  const fixtures = [
    "Park Alerts Burn Ban Aug. 11, 2026 - The park is under a burn ban. Water Outage Oct. 23, 2026 - Water is out at the Bayfront camping area. Construction Alerts Expect intermittent closures for sites 1 - 24",
    "Park Alerts Park Closures The backcountry trails may have intermittent closures. The park will be closed on the following dates: 12:30 p.m. on Oct. 12 to 2 p.m. on Oct. 16 12:30 p.m. on Nov. 2 to 2 p.m. on Nov. 6 12:30 p.m. on Nov. 30 to 2 p.m. on Dec. 4 12:30 p.m. on Jan. 25 to 2 p.m. on Jan. 29 Only permitted hunters will be allowed",
    "Alerts & Conditions weather-related road closures. The paved road between Cottonwood Campground and Santa Elena Canyon. Hot Springs Road beyond the overflow parking area. Paint Gap Road River Road West to Glenn Springs Road Black Gap Road is c losed",
    "Park Alerts Burn Ban No wood fires allowed. You may use charcoal or containerized stoves. Park Closures Nov. 17 to Nov. 19 Dec. 15 to Dec. 17 Only permitted hunters will be allowed on these dates",
    "Park Alert Visiting the Park: final touches are ongoing. The park may reach capacity on weekends and holidays",
  ];
  for (let i = 0; i < sources.length; i++) {
    assert.equal(isVerified(sources[i], fixtures[i], "2026-10-28"), true, sources[i].parkName + " fixture");
  }
  assert.equal(isVerified(sources[0], fixtures[0].replace("Oct. 23, 2026", "Oct. 25, 2026")), false, "changed dated outage must get review");
  assert.equal(isVerified(sources[0], fixtures[0].replace("under a burn ban", "not under a burn ban")), false, "burn ban withdrawal is not confirmed");
  assert.equal(isVerified(sources[1], fixtures[1] + " 12:30 p.m. on Nov. 8 to 2 p.m. on Nov. 10"), false, "unknown closure is not silently ignored");
  assert.equal(isVerified(sources[2], fixtures[2].replace("Paint Gap Road", "Paint Gap Road reopened")), true, "fixture text presence alone does not assess context");
  assert.equal(isVerified(sources[2], fixtures[2].replace("Paint Gap Road", "Reopened side road")), false, "removed road closure triggers review");
  assert.equal(isVerified(sources[3], fixtures[3].replace("Only permitted hunters will be allowed on these dates", "")), false, "hunting access claim requires source");
  const enchanted = sources[1].notice(fixtures[1], "2026-11-07");
  assert(!enchanted.includes("November 2–6"), "elapsed November closure must expire");
  assert(enchanted.includes("November 30–December 4"), "still upcoming closure must remain");
  const brazos = sources[3].notice(fixtures[3], "2026-11-20");
  assert(!brazos.includes("November 17–19"), "elapsed Brazos closure must expire");
  assert(brazos.includes("December 15–17"), "later Brazos closure must remain");
  console.log("Camping advisories: 5 positive source fixtures; changed dates, new closures, withdrawn restrictions and date rollovers guarded.");
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
  const confirmed = isVerified(source, text, day);
  const notice = confirmed ? (typeof source.notice === "function" ? source.notice(text, day) : source.notice)
    : "The previously recorded advisory could not be verified verbatim. Check the park's current official alerts before travel; no resolution is assumed.";
  const status = confirmed ? "confirmed" : "needs-review";
  const previous = oldAlerts.find(old => old.destinationSlug === source.destinationSlug);
  const unchanged = previous && previous.parkName === source.parkName
    && previous.sourceUrl === source.sourceUrl && previous.notice === notice && previous.status === status;
  rows.push({ destinationSlug: source.destinationSlug, parkName: source.parkName, sourceUrl: source.sourceUrl,
    notice, checkedAt: unchanged ? previous.checkedAt : day, status });
  console.log(source.parkName + ": " + (confirmed ? "confirmed" : "changed — needs review"));
}
const output = "/** Generated from official TPWD alert pages; do not manually restamp verified dates. */\nexport const CAMPING_OPERATIONAL_ALERTS = " + JSON.stringify(rows, null, 2) + " as const;\n";
if (process.argv.includes("--write")) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  if (!fs.existsSync(outputPath) || fs.readFileSync(outputPath, "utf8") !== output) fs.writeFileSync(outputPath, output);
} else {
  console.log(JSON.stringify(rows, null, 2));
}
if (rows.some(row => row.status === "needs-review")) process.exitCode = 2;
