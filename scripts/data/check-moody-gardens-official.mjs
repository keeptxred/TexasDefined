/**
 * Bounded Moody Gardens operator-source monitor.
 * Match specific visitor facts, not generic words elsewhere in site navigation.
 * Never silently update an editorial check date or crawl unrelated pages.
 */
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export const targetSources = [
  {
    name: "Discovery Pyramid / Galveston Children's Museum",
    url: "https://www.moodygardens.com/attractions/discovery-pyramid",
    markers: ["Galveston Children's Museum", "Audience Recognition Theater"],
    requiresOpenMuseum: true,
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

const namedEntities = {
  nbsp: " ", amp: "&", quot: '"', apos: "'", rsquo: "'", lsquo: "'",
  ndash: "-", mdash: "-", ldquo: '"', rdquo: '"',
};

export function operatorVisibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, " ")
    .replace(/<head\b[^>]*>[\s\S]*?<\/head\s*>/gi, " ")
    .replace(/<!--([\s\S]*?)-->/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&([a-z]+);/gi, (original, name) => namedEntities[name.toLowerCase()] ?? original)
    .replace(/&#(?:x([0-9a-f]+)|([0-9]+));/gi, (original, hex, decimal) => {
      const value = parseInt(hex ?? decimal, hex ? 16 : 10);
      return value > 0 && value <= 0x10ffff ? String.fromCodePoint(value) : original;
    })
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function validateOperatorEvidence(source, html) {
  const readable = operatorVisibleText(html).toLowerCase();
  const errors = source.markers
    .filter((marker) => !readable.includes(marker.toLowerCase()))
    .map((marker) => source.name + ": missing operator marker " + marker);

  if (source.requiresOpenMuseum) {
    const subject = "galveston children's museum";
    const aroundMuseum = [];
    let position = readable.indexOf(subject);
    while (position >= 0) {
      aroundMuseum.push(readable.slice(position, position + 330));
      position = readable.indexOf(subject, position + subject.length);
    }
    if (!aroundMuseum.some((text) => /\b(now open|open daily)\b/.test(text))) {
      errors.push(source.name + ": the operator no longer clearly identifies the children's museum as open");
    }
    if (aroundMuseum.some((text) => /\btemporarily closed\b|\bscheduled to reopen\b/.test(text))) {
      errors.push(source.name + ": conflicting closure language near the children's museum");
    }
  }
  return errors;
}

export function validateEditorialReview(curation, now = Date.now()) {
  const issues = [];
  const checkedAt = curation.match(/sourceCheckedAt: "(\d{4}-\d{2}-\d{2})"/)?.[1];
  if (!checkedAt) return ["Moody Gardens editorial source-review date is absent."];
  const ageDays = (now - Date.parse(checkedAt + "T00:00:00Z")) / 86400000;
  if (ageDays < -1 || ageDays > 30) {
    issues.push("Moody Gardens editorial review is " + Math.floor(ageDays) + " days old; recheck the operator's facts before changing the review date.");
  }

  // Timed seasonal advice must be re-researched after the dated holiday ends.
  // A healthy source-marker check cannot make an expired recommendation current.
  if (now >= Date.parse("2027-01-03T00:00:00Z")
      && /Holiday in the Gardens is scheduled from November 21, 2026/.test(curation)) {
    issues.push("Moody Gardens seasonal copy still recommends the 2026-27 holiday dates after that season ended.");
  }
  return issues;
}

export async function runMoodyGardensMonitor() {
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
      const html = await response.text();
      const issues = validateOperatorEvidence(source, html);
      failures.push(...issues);
      if (!issues.length) console.log("Verified operator facts: " + source.name);
    } catch (error) {
      failures.push(source.name + ": source not verifiable: " + String(error));
    }
  }

  const curation = readFileSync("src/data/destination-curation-moody-gardens.ts", "utf8");
  failures.push(...validateEditorialReview(curation));
  if (failures.length) {
    console.error("Moody Gardens source review needed:\n" + failures.map((item) => "- " + item).join("\n"));
    process.exitCode = 1;
  } else {
    console.log("Moody Gardens official-source check passed; editorial review date not modified.");
  }
  return failures;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await runMoodyGardensMonitor();
}
