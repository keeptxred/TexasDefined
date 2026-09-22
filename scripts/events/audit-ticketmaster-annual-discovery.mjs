import fs from "node:fs/promises";
import path from "node:path";
import { fetchTexasEvents } from "./ticketmaster-discovery.mjs";

const root = process.cwd();
const dataDir = path.join(root, "src", "data");
const outputPath = process.env.TICKETMASTER_ANNUAL_AUDIT_OUTPUT
  || path.join(root, "tmp", "ticketmaster-annual-discovery.json");
const trackingBase = process.env.TICKETMASTER_IMPACT_BASE_URL;
const horizonDays = Number.parseInt(process.env.TICKETMASTER_ANNUAL_AUDIT_DAYS || "365", 10);

const candidatePattern = /\b(festival|fest\b|fair\b|rodeo|roundup|parade|marathon|half marathon|10k\b|5k\b|championship|tournament|convention|expo\b|show\b|market\b|oktoberfest|christmas|holiday|mardi gras|fiesta|jubilee|celebration|powwow|gathering|balloon|airshow|air show|comic con|renaissance|art car|wine|beer|bbq|barbecue|cook-?off|cookoff|stock show|livestock|auto show|boat show|quilt|state fair|county fair)\b/i;
const obviousChildPattern = /\b(aftershow|after show|meet & greet|m&g|add-on|parking only|vip upgrade|movie night|drag show|puppet show|one man show)\b/i;
const unavailableStatuses = new Set(["cancelled", "postponed", "rescheduled"]);

function normalizeName(value) {
  return value
    .toLocaleLowerCase("en-US")
    .replace(/[’']/g, "")
    .replace(/\b20\d{2}\b/g, "")
    .replace(/\b\d+(st|nd|rd|th)\s+annual\b/gi, "")
    .replace(/\bannual\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function familyName(value) {
  return value
    .replace(/\b20\d{2}\b/g, "")
    .replace(/\b\d+(st|nd|rd|th)\s+annual\b/gi, "")
    .replace(/\bannual\b/gi, "")
    .replace(/\s*[-–—:]\s*(day\s*\d+|friday|saturday|sunday|weekend\s*\d+|session\s*\d+|night\s*\d+|prelims|finals|general admission|early bird).*$/i, "")
    .replace(/\s+(featuring|feat\.?|presented by)\b.*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return normalizeName(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function loadAuthorityIndex() {
  const files = (await fs.readdir(dataDir))
    .filter((name) =>
      name === "major-event-authority.server.ts"
      || name === "major-event-expanded-authority.server.ts"
      || /^major-event-expanded-authority-tranche\d+\.server\.ts$/.test(name),
    );
  const records = [];
  for (const file of files) {
    const source = await fs.readFile(path.join(dataDir, file), "utf8");
    const pattern = /\bslug:\s*"([^"]+)"[\s\S]{0,260}?\bname:\s*"([^"]+)"[\s\S]{0,260}?\bcity:\s*"([^"]+)"/g;
    for (const match of source.matchAll(pattern)) {
      records.push({ slug: match[1], name: match[2], city: match[3] });
    }
  }
  return records;
}

function findExistingGuide(authorityRecords, family, city) {
  const familyKey = normalizeName(family);
  const cityKey = city.toLocaleLowerCase("en-US");
  const candidateSlug = slugify(family);
  const exactSlug = authorityRecords.find((record) => record.slug === candidateSlug);
  if (exactSlug) return `/event/${exactSlug.slug}`;
  const exactNameCity = authorityRecords.find((record) =>
    normalizeName(record.name) === familyKey
    && record.city.toLocaleLowerCase("en-US") === cityKey,
  );
  if (exactNameCity) return `/event/${exactNameCity.slug}`;
  return null;
}

const catalog = await fetchTexasEvents({
  apiKey: process.env.TICKETMASTER_API_KEY,
  trackingBase,
  horizonDays,
});
const authorityRecords = await loadAuthorityIndex();

const rows = catalog.events.filter((event) =>
  !unavailableStatuses.has(event.status)
  && candidatePattern.test(event.name)
  && !obviousChildPattern.test(event.name),
);

const families = new Map();
for (const event of rows) {
  const family = familyName(event.name);
  const key = `${normalizeName(family)}|${event.city.toLocaleLowerCase("en-US")}`;
  const current = families.get(key) ?? {
    family,
    city: event.city,
    rows: 0,
    dates: new Set(),
    venues: new Set(),
    segments: new Set(),
    genres: new Set(),
    examples: [],
    explicitAnnual: false,
  };
  current.rows += 1;
  current.dates.add(event.startDate);
  if (event.venue) current.venues.add(event.venue);
  if (event.segment) current.segments.add(event.segment);
  if (event.genre) current.genres.add(event.genre);
  if (current.examples.length < 4) current.examples.push(event.name);
  if (/\bannual\b/i.test(event.name)) current.explicitAnnual = true;
  families.set(key, current);
}

const candidates = [...families.values()]
  .map((family) => {
    const existingGuide = findExistingGuide(authorityRecords, family.family, family.city);
    return {
      family: family.family,
      city: family.city,
      rows: family.rows,
      dates: [...family.dates].sort(),
      venues: [...family.venues].sort(),
      segments: [...family.segments].sort(),
      genres: [...family.genres].sort(),
      examples: family.examples,
      explicitAnnual: family.explicitAnnual,
      existingGuide,
      needsAuthorityReview: !existingGuide,
    };
  })
  .sort((left, right) =>
    Number(right.needsAuthorityReview) - Number(left.needsAuthorityReview)
    || Number(right.explicitAnnual) - Number(left.explicitAnnual)
    || right.rows - left.rows
    || left.dates[0].localeCompare(right.dates[0])
    || left.family.localeCompare(right.family),
  );

const report = {
  generatedAt: new Date().toISOString(),
  ticketmasterFetchedAt: catalog.fetchedAt,
  horizonDays,
  totalTexasEvents: catalog.events.length,
  highSignalRows: rows.length,
  candidateFamilies: candidates.length,
  uncoveredCandidateFamilies: candidates.filter((candidate) => candidate.needsAuthorityReview).length,
  policy: "Discovery only. A Ticketmaster listing or annual-sounding name does not establish recurrence. Verify organizer history/current occurrence before creating a permanent authority page.",
  candidates,
};

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(`TICKETMASTER_ANNUAL_DISCOVERY=${JSON.stringify({
  horizonDays,
  totalTexasEvents: report.totalTexasEvents,
  highSignalRows: report.highSignalRows,
  candidateFamilies: report.candidateFamilies,
  uncoveredCandidateFamilies: report.uncoveredCandidateFamilies,
  outputPath: path.relative(root, outputPath),
})}`);
