/**
 * Bounded Moody Gardens operator-source freshness monitor.
 * This verifies specific published facts; it does NOT claim a human page audit,
 * change any page-review dates, scrape pricing or run a sitewide crawl.
 */
import { readFileSync } from "node:fs";

const targetSources = [
  {
    name: "Discovery Pyramid / Galveston Children's Museum",
    url: "https://www.moodygardens.com/attractions/discovery-pyramid",
    markers: ["Galveston Children's Museum", "now open", "Audience Recognition Theater"],
  },
  {
    name: "Admissions and visitor FAQ",
    url: "https://www.moodygardens.com/visitor-info/faq",
    markers: ["Value Pass", "self-parking", "children", "picnic"],
  },
  {
    name: "Accessibility",
    url: "https://www.moodygardens.com/visitor-info/accessibility",
    markers: ["wheelchairs", "captioning", "Rainforest Pyramid"],
  },
  {
    name: "Daily hours",
    url: "https://www.moodygardens.com/visitor-info/hours",
    markers: ["Aquarium Pyramid", "Rainforest Pyramid", "Discovery"],
  },
];

const failures = [];
for (const source of targetSources) {
  try {
    const response = await fetch(source.url, {
      signal: AbortSignal.timeout(20000),
      headers: { "user-agent": "TexasDefined-authority-verification/1.0" },
    });
    if (!response.ok) {
      failures.push(source.name + ": HTTP " + response.status);
      continue;
    }
    const raw = await response.text();
    // The operator's static HTML is sufficient for a conservative marker check.
    // If it becomes client-rendered or blocks the runner, flag for human review.
    const readable = raw.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").toLowerCase();
    const absent = source.markers.filter((marker) => !readable.includes(marker.toLowerCase()));
    if (absent.length) failures.push(source.name + ": operator language changed or not available: " + absent.join(", "));
    else console.log("Confirmed operator markers: " + source.name);
  } catch (error) {
    failures.push(source.name + ": official site not verifiable: " + String(error));
  }
}

const curation = readFileSync("src/data/destination-curation-moody-gardens.ts", "utf8");
const checkedAt = curation.match(/sourceCheckedAt: "(\d{4}-\d{2}-\d{2})"/)?.[1];
if (!checkedAt) {
  failures.push("Editorial source-review date is absent.");
} else {
  const ageDays = (Date.now() - Date.parse(checkedAt + "T00:00:00Z")) / 86400000;
  if (ageDays < -1 || ageDays > 30) {
    failures.push("Editorial source review is " + Math.floor(ageDays) + " days old; re-check the guide against operator facts without auto-stamping a false review date.");
  }
}

if (failures.length) {
  console.error("Moody Gardens requires targeted source review:\n" + failures.map((f) => "- " + f).join("\n"));
  process.exitCode = 1;
} else {
  console.log("Moody Gardens bounded official-source check passed; no page data was altered.");
}
