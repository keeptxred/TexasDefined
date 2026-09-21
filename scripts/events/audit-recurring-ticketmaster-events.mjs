import fs from "node:fs";

const snapshotPath = "src/data/generated/ticketmaster-events.json";
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));

const candidatePattern = /\b(festival|fest\b|fair\b|rodeo|roundup|parade|marathon|championship|convention|expo\b|oktoberfest|fiesta|jubilee|powwow|gathering|balloon|comic con|car show|auto show|market)\b/i;
const obviousChildPattern = /\b(touring|concert|movie night|drag show|puppet show|aftershow|fest nights|add-on|meet & greet|m&g|one man show)\b/i;

function familyName(value) {
  return value
    .replace(/\b20\d{2}\b/g, "")
    .replace(/\b\d+(st|nd|rd|th)\s+annual\b/ig, "")
    .replace(/\bannual\b/ig, "")
    .replace(/\s*[-–—:]\s*(day\s*\d+|friday|saturday|sunday|weekend\s*\d+|session\s*\d+|prelims|finals).*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

const rows = snapshot.events.filter((event) =>
  candidatePattern.test(event.name) && !obviousChildPattern.test(event.name),
);

const families = new Map();
for (const event of rows) {
  const name = familyName(event.name);
  const key = `${name.toLocaleLowerCase("en-US")}|${event.city.toLocaleLowerCase("en-US")}`;
  const family = families.get(key) ?? {
    name,
    city: event.city,
    rows: 0,
    dates: new Set(),
    venues: new Set(),
    examples: [],
  };
  family.rows += 1;
  family.dates.add(event.startDate);
  if (event.venue) family.venues.add(event.venue);
  if (family.examples.length < 3) family.examples.push(event.name);
  families.set(key, family);
}

const output = [...families.values()]
  .map((family) => ({
    ...family,
    dates: [...family.dates].sort(),
    venues: [...family.venues].sort(),
  }))
  .sort((left, right) => left.dates[0].localeCompare(right.dates[0]) || left.name.localeCompare(right.name));

console.log(JSON.stringify({
  fetchedAt: snapshot.fetchedAt,
  totalTicketmasterRows: snapshot.events.length,
  highSignalRows: rows.length,
  candidateFamilies: output.length,
  families: output,
}, null, 2));
