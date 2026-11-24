/**
 * Statewide holiday-event coverage inventory; not an event-date inference engine.
 * Scheduled Actions produces a county-by-county source research queue. Annual
 * guide dates remain historical until a new organizer-confirmed edition is merged.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const HOLIDAY_RE = /christmas|holiday|yule|yuletide|santa|winter[- ]lights|tree[- ]light|gusherville|north[- ]pole|bethlehem|polar[- ]express|menorah|hanukkah/i;
const SECONDARY_COUNTIES = { "christmas-in-gusherville": ["upshur"] };

function parse(root, relative) {
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) return null;
  return ts.createSourceFile(relative, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
const propName = (node) => ts.isIdentifier(node) || ts.isStringLiteral(node) ? node.text : undefined;
const valueOf = (node, constants) => {
  while (node && (ts.isAsExpression(node) || ts.isParenthesizedExpression(node) ||
    ts.isSatisfiesExpression(node))) node = node.expression;
  if (!node) return undefined;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isIdentifier(node)) return constants.get(node.text);
  return undefined;
};
const field = (node, key, constants) => {
  const found = node.properties.find((prop) => ts.isPropertyAssignment(prop) && propName(prop.name) === key);
  return found ? valueOf(found.initializer, constants) : undefined;
};
function findLiteralConstants(ast) {
  const constants = new Map();
  const walk = (node) => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      const val = valueOf(node.initializer, constants);
      if (val !== undefined) constants.set(node.name.text, val);
    }
    ts.forEachChild(node, walk);
  };
  walk(ast);
  return constants;
}
function getCounties(root) {
  const ast = parse(root, "src/data/texas-places.ts");
  if (!ast) throw new Error("Missing canonical Texas county list");
  let names;
  const walk = (node) => {
    if (ts.isVariableDeclaration(node) && node.name.getText(ast) === "COUNTY_NAMES"
      && node.initializer && ts.isCallExpression(node.initializer)
      && ts.isPropertyAccessExpression(node.initializer.expression)) {
      const receiver = node.initializer.expression.expression;
      if (ts.isNoSubstitutionTemplateLiteral(receiver) || ts.isStringLiteral(receiver))
        names = receiver.text.split("|");
    }
    ts.forEachChild(node, walk);
  };
  walk(ast);
  if (!names) throw new Error("Canonical county names could not be parsed");
  const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return names.map(name => ({ name, slug: slug(name) }));
}

function listSources(root) {
  const data = path.join(root, "src/data");
  const eventsDir = path.join(data, "events");
  const christmasCalendars = fs.readdirSync(eventsDir)
    .filter(name => /^christmas-community-\d{4}(?:-[a-z0-9-]+)?\.server\.ts$/.test(name))
    .sort()
    .map(name => "src/data/events/" + name);
  if (!christmasCalendars.length) throw new Error("No year-qualified Christmas community calendar sources found");
  return [
    "src/data/major-event-index.ts",
    ...fs.readdirSync(data).filter(name => /^major-event-expanded-authority-tranche\d+\.server\.ts$/.test(name))
      .sort()
      .map(name => "src/data/" + name),
    ...christmasCalendars,
  ];
}
function extractHolidayRows(root, source) {
  const ast = parse(root, source);
  if (!ast) throw new Error("Expected holiday source file missing: " + source);
  const constants = findLiteralConstants(ast);
  const rows = [];
  const christmasCalendar = /\/christmas-community-\d{4}(?:-[a-z0-9-]+)?\.server\.ts$/.test(source);
  const walk = (node) => {
    if (ts.isObjectLiteralExpression(node)) {
      const slug = field(node, "slug", constants);
      const countySlug = field(node, "countySlug", constants);
      const date = field(node, "startDate", constants);
      const name = field(node, "name", constants) || field(node, "title", constants) || slug;
      const url = field(node, "officialUrl", constants) || field(node, "officialEventUrl", constants);
      if (slug && countySlug && date && url && /^\d{4}-\d{2}-\d{2}$/.test(date)
        && (christmasCalendar || HOLIDAY_RE.test(slug + " " + name))) {
        rows.push({
          slug, name, countySlug, startDate: date,
          endDate: field(node, "endDate", constants) || date,
          officialUrl: url, source,
        });
      }
    }
    ts.forEachChild(node, walk);
  };
  walk(ast);
  return rows;
}
function texasDay(now) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = kind => parts.find(item => item.type === kind)?.value || "00";
  return part("year") + "-" + part("month") + "-" + part("day");
}

export function auditCountyHolidayCoverage(root = ROOT, now = new Date(), expectedCountyCount = 254) {
  const counties = getCounties(root);
  if (counties.length !== expectedCountyCount ||
      new Set(counties.map(c => c.slug)).size !== expectedCountyCount) {
    throw new Error("County inventory incomplete: " + counties.length + " instead of " + expectedCountyCount);
  }
  const today = texasDay(now);
  const byCounty = new Map(counties.map(({ name, slug }) => [slug, {
    slug, name, lastConfirmed: [], upcoming: [],
  }]));
  const seen = new Set();
  for (const source of listSources(root)) {
    for (const row of extractHolidayRows(root, source)) {
      const countiesForEvent = [row.countySlug, ...(SECONDARY_COUNTIES[row.slug] || [])];
      for (const county of countiesForEvent) {
        const target = byCounty.get(county);
        if (!target) throw new Error("Unrecognized holiday event county " + county + " for " + row.slug);
        const key = county + ":" + row.slug + ":" + row.startDate;
        if (seen.has(key)) continue;
        seen.add(key);
        const item = {
          slug: row.slug, name: row.name, lastConfirmedStart: row.startDate,
          lastConfirmedEnd: row.endDate, officialUrl: row.officialUrl,
          source: row.source,
        };
        if (row.endDate >= today) target.upcoming.push(item);
        else target.lastConfirmed.push(item);
      }
    }
  }
  const sorted = [...byCounty.values()].sort((a, b) => a.name.localeCompare(b.name));
  for (const county of sorted) {
    county.upcoming.sort((a, b) => a.lastConfirmedStart.localeCompare(b.lastConfirmedStart));
    county.lastConfirmed.sort((a, b) => b.lastConfirmedStart.localeCompare(a.lastConfirmedStart));
    county.status = county.upcoming.length ? "upcoming-verified"
      : county.lastConfirmed.length ? "historical-next-date-pending"
      : "holiday-source-discovery-needed";
  }
  const missing = sorted.filter(c => c.status === "holiday-source-discovery-needed");
  const pending = sorted.filter(c => c.status === "historical-next-date-pending");
  const current = sorted.filter(c => c.status === "upcoming-verified");
  return {
    generatedAt: now.toISOString(), texasDate: today,
    policy: "Read-only research backlog. Source URL reachability is not date verification. Do not invent dates or auto-publish unverified events.",
    summary: {
      counties: sorted.length,
      withUpcomingVerified: current.length,
      withHistoricalOnly: pending.length,
      withoutVerifiedHolidayEvidence: missing.length,
    },
    counties: sorted,
  };
}

export function formatCountyHolidayIssue(report) {
  const lines = [
    "## County holiday event coverage — all 254 counties",
    "",
    "Generated " + report.generatedAt + " (Texas date " + report.texasDate + ").",
    "**The public county pages already link verified upcoming events and permanent annual guides.**",
    "**This scheduled inventory is a research backlog, not a claim that dates have been verified.**",
    "Source checks must establish the next year's date, organizer and location before changing a published calendar.",
    "",
    "Counties: " + report.summary.counties
      + "; with upcoming verified events: " + report.summary.withUpcomingVerified
      + "; with only past editions: " + report.summary.withHistoricalOnly
      + "; without holiday evidence: " + report.summary.withoutVerifiedHolidayEvidence + ".",
    "",
    "### Research new official city / chamber / tourism calendars for these counties",
    ...report.counties.filter(c => c.status === "holiday-source-discovery-needed")
      .map(c => "- [ ] [" + c.name + " County](https://texasdefined.com/county/" + c.slug
        + ") — no indexed holiday event yet; seek organizer first-party dates, venue and eligible county attribution"),
    "",
    "### Verify next year's dates for established traditions",
    ...report.counties.filter(c => c.status === "historical-next-date-pending")
      .map(c => "- [ ] [" + c.name + " County](https://texasdefined.com/county/" + c.slug
        + ") — most recent: " + c.lastConfirmed.slice(0, 2)
          .map(e => e.name + " (" + e.lastConfirmedStart + ")").join("; ")),
    "",
    "### Verified future holiday events currently represented",
    ...report.counties.filter(c => c.status === "upcoming-verified")
      .map(c => "- [x] " + c.name + " County — " + c.upcoming.length + " upcoming verified occurrence(s)"),
    "",
    "Do not close until every county has been researched against local first-party sources. Counties without a public event should be explicitly marked 'no verified event' rather than padded with a fabricated listing. Recheck at least weekly during the fall/holiday season; the existing daily event source workflow governs all registered permanent guides.",
  ];
  const output = lines.join("\n");
  if (Buffer.byteLength(output) > 60000) throw new Error("County research issue would exceed GitHub body size");
  return output;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = auditCountyHolidayCoverage();
  const output = process.argv[2] || path.join(ROOT, ".artifacts/county-holiday-coverage.json");
  fs.mkdirSync(path.dirname(path.resolve(output)), { recursive: true });
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + "\n");
  const issue = formatCountyHolidayIssue(report);
  fs.writeFileSync(output.replace(/\.json$/, ".md"), issue + "\n");
  console.log(JSON.stringify(report.summary));
}
