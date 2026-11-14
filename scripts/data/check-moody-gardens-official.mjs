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
    markers: ["Galveston Children's Museum", "Audience Recognition Theater", "9 to 10 AM reserved for museum members"],
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
  const checkedTime = Date.parse(checkedAt + "T00:00:00Z");
  if (!Number.isFinite(checkedTime)) return ["Moody Gardens editorial source-review date is invalid."];
  const ageDays = (now - checkedTime) / 86400000;
  if (!Number.isFinite(ageDays) || ageDays < -1 || ageDays > 30) {
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

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * A Friday operator alert must not go unnoticed just because ordinary hours
 * and attraction names still appear on the site. Compare the date and latest
 * entry time against the page's short-lived, separately sourced public notice.
 */
export function validateOperatorEarlyClosureNotice(officialHtml, editorialNotice, now = Date.now()) {
  const readable = operatorVisibleText(officialHtml);
  const index = readable.toLowerCase().indexOf("early closure notice:");
  if (index < 0) {
    // Detect operator retractions while the guide is still promoting a
    // date-specific disruption. The old logic treated a removed announcement
    // as a clean bill of health, even if the outage had been cancelled.
    const startsAt = /startsAt:\s*"(\d{4}-\d{2}-\d{2}T[^"]+)"/.exec(editorialNotice)?.[1];
    const expiresAt = /expiresAt:\s*"(\d{4}-\d{2}-\d{2}T[^"]+)"/.exec(editorialNotice)?.[1];
    const begins = startsAt ? Date.parse(startsAt) : NaN;
    const ends = expiresAt ? Date.parse(expiresAt) : NaN;
    if (Number.isFinite(now) && Number.isFinite(begins) && Number.isFinite(ends)
        && now >= begins && now < ends) {
      return ["Moody Gardens removed its early-closure announcement while TexasDefined still displays a timed advisory; verify whether the operator cancelled or modified the closure."];
    }
    return [];
  }
  const block = readable.slice(index, index + 650);
  const datePattern = new RegExp("\\b(" + monthNames.join("|") + ")\\s+(\\d{1,2}),?\\s+(\\d{4})\\b", "i");
  const matched = datePattern.exec(block);
  if (!matched) return ["Official hours announce an early closure, but the dated disruption could not be verified."];

  const month = monthNames.findIndex((name) => name.toLowerCase() === matched[1].toLowerCase());
  const day = Number(matched[2]);
  const year = Number(matched[3]);
  const date = Date.UTC(year, month, day);
  if (new Date(date).getUTCDate() !== day || !Number.isFinite(date)) {
    return ["Official hours contain an invalid early-closure date."];
  }

  // Do not demand that the guide resurrect an expired operator announcement.
  if (now >= date + 2 * 86400000) return [];

  const nextCalendarDay = new Date(date + 86400000).toISOString().slice(0, 10);
  const operatorLastEntry = /last entry at\s+(\d{1,2})(?::(\d{2}))?\s*([ap])\.?m\.?/i.exec(block);
  const publishedLastEntry = /last entry.{0,80}?\b(\d{1,2})(?::(\d{2}))?\s*([ap])\.?m\.?/i.exec(editorialNotice);
  const timesAgree = operatorLastEntry && publishedLastEntry
    && operatorLastEntry[1] === publishedLastEntry[1]
    && (operatorLastEntry[2] || "00") === (publishedLastEntry[2] || "00")
    && operatorLastEntry[3].toLowerCase() === publishedLastEntry[3].toLowerCase();

  const failures = [];
  if (!editorialNotice.toLowerCase().includes(matched[1].toLowerCase() + " " + day)
      || !editorialNotice.includes(nextCalendarDay)) {
    failures.push("Official hours announce " + matched[0] + " early closing; the time-limited editorial notice is missing or has a different date.");
  }
  if (!timesAgree) {
    failures.push("Official early-closing last-entry time changed or is missing from the editorial notice.");
  }
  return failures;
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
      if (source.url.endsWith("/visitor-info/hours")) {
        let noticeCode = "";
        try {
          noticeCode = readFileSync("src/data/moody-gardens-visit-notice.ts", "utf8");
        } catch {
          // The closure check will fail when the operator has an active notice.
        }
        issues.push(...validateOperatorEarlyClosureNotice(html, noticeCode));
      }
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
