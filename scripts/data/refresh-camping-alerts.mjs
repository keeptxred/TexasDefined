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
    required: [/Water Outage/i, /Water is out at the Bayfront camping area/i],
    notice: "Bayfront camping-area water outage reported October 23, 2026. Fill fresh-water tanks before arriving; TPWD also reports a burn ban and possible intermittent campsite disruptions.",
  },
  {
    destinationSlug: "enchanted-rock-state-natural-area", parkName: "Enchanted Rock State Natural Area",
    sourceUrl: "https://tpwd.texas.gov/state-parks/enchanted-rock/alert",
    required: [/Park Closures/i, /backcountry trails may have intermittent closures/i],
    notice: text => {
      const remaining = windows.filter(w => w.end >= day && w.pattern.test(text)).map(w => w.label);
      return remaining.length ? "TPWD lists scheduled park closures for " + remaining.join("; ") + ". Backcountry trails may close intermittently." : "Previously listed closure windows have elapsed. Check TPWD for the latest access and backcountry-trail restrictions.";
    },
  },
  {
    destinationSlug: "palo-pinto-mountains-state-park", parkName: "Palo Pinto Mountains State Park",
    sourceUrl: "https://tpwd.texas.gov/state-parks/palo-pinto-mountains/park-alert",
    required: [/Visiting the Park/i, /final touches are ongoing/i, /may reach capacity on weekends and holidays/i],
    notice: "TPWD says final construction work is ongoing. Follow posted safety signs; weekend and holiday capacity may be reached, so reserve entry before visiting.",
  },
];
const normalize = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]*>/g, " ").replace(/&nbsp;|&#160;/gi, " ")
  .replace(/&amp;/gi, "&").replace(/\s+/g, " ").trim();
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
  if (!/Park Alerts?|Park Alert/i.test(text) || text.length < 700) throw new Error("Invalid official alert page: " + source.sourceUrl);
  const confirmed = source.required.every(re => re.test(text))
    && (source.destinationSlug !== "enchanted-rock-state-natural-area"
      || windows.some(w => w.end >= day && w.pattern.test(text)));
  const notice = confirmed ? (typeof source.notice === "function" ? source.notice(text) : source.notice)
    : "The previously recorded advisory could not be verified verbatim. Check the park's current official alerts before travel; no resolution is assumed.";
  rows.push({ destinationSlug: source.destinationSlug, parkName: source.parkName, sourceUrl: source.sourceUrl,
    notice, checkedAt: day, status: confirmed ? "confirmed" : "needs-review" });
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
