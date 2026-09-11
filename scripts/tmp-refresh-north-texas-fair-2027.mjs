import fs from 'node:fs';

const replaceBlock = (path, slug, nextSlug, replacement) => {
  const text = fs.readFileSync(path, 'utf8');
  const startMarker = `  {\n    slug: "${slug}",`;
  const endMarker = `  {\n    slug: "${nextSlug}",`;
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker, start);
  if (start < 0 || end < 0) throw new Error(`Could not isolate ${slug} in ${path}`);
  const current = text.slice(start, end);
  if (!current.includes('startDate: "2026-08-21"') || !current.includes('endDate: "2026-08-30"')) {
    throw new Error(`Unexpected current dates for ${slug} in ${path}`);
  }
  fs.writeFileSync(path, text.slice(0, start) + replacement + text.slice(end));
};

replaceBlock('src/data/major-event-expanded-authority-tranche13.server.ts', 'north-texas-fair-rodeo', 'austin-chronicle-hot-sauce-festival', `  {
    slug: "north-texas-fair-rodeo",
    name: "North Texas Fair & Rodeo",
    city: "Denton",
    countySlug: "denton",
    countyName: "Denton County",
    region: "prairies-lakes",
    category: "rodeo",
    startDate: "2027-08-20",
    endDate: "2027-08-29",
    dateNote: "The organizer has published the 99th annual North Texas Fair & Rodeo for August 20-29, 2027. Recheck the official schedule before traveling because nightly rodeo, concert and attraction details can change.",
    venue: "North Texas Fair & Rodeo grounds",
    officialUrl: "https://ntfair.com/",
    sourceCheckedAt: "2026-09-11",
    whyItMatters: "The North Texas Fair & Rodeo gives Denton a ten-night late-summer destination built around rodeo competition, country music, livestock shows, family attractions and a community-supported fair tradition.",
    planningSections: [
      { title: "Start with the confirmed 2027 dates", body: "The organizer lists the 99th annual fair for August 20-29, 2027. Use that ten-day window for lodging and trip planning, then check the official schedule before choosing a specific night because the rodeo and entertainment lineup changes across the run." },
      { title: "Wait for the 2027 nightly program before choosing tickets", body: "The organizer has published the 2027 fair dates, but year-specific concert, rodeo-night and attraction details can change. Do not rely on the completed 2026 lineup or prices when planning the 2027 trip." },
      { title: "Use Denton as the trip base", body: "The fair works naturally with a Denton visit. Build dining, downtown and other Denton County stops around the fixed event time instead of making separate cross-region trips." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-denton", label: "Explore Denton County", description: "Build a broader North Texas itinerary around the fair." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas rodeos and county fairs." },
    ],
    sources: [
      { label: "North Texas Fair & Rodeo official 2027 event page", url: "https://ntfair.com/" },
    ],
  },
`);

const schemaPath = 'src/data/major-event-schema-enrichment-batch3.server.ts';
const schemaText = fs.readFileSync(schemaPath, 'utf8');
const schemaStartMarker = '  {\n    slug: "north-texas-fair-rodeo",';
const schemaEndMarker = '  {\n    slug: "austin-chronicle-hot-sauce-festival",';
const schemaStart = schemaText.indexOf(schemaStartMarker);
const schemaEnd = schemaText.indexOf(schemaEndMarker, schemaStart);
if (schemaStart < 0 || schemaEnd < 0) throw new Error('Could not isolate North Texas Fair schema enrichment');
const currentSchema = schemaText.slice(schemaStart, schemaEnd);
if (!currentSchema.includes('official 2026 ticket pricing') || !currentSchema.includes('Braxton Keith')) {
  throw new Error('Expected 2026 North Texas Fair schema details were not present');
}
const schemaReplacement = `  {
    slug: "north-texas-fair-rodeo",
    organizer: organization("North Texas State Fair Association, Inc.", "https://ntfair.com/"),
    sources: [
      { label: "North Texas Fair & Rodeo official 2027 event page", url: "https://ntfair.com/" },
    ],
    verifiedAt: "2026-09-11",
  },
`;
fs.writeFileSync(schemaPath, schemaText.slice(0, schemaStart) + schemaReplacement + schemaText.slice(schemaEnd));

for (const path of ['src/data/major-event-expanded-authority-tranche13.server.ts', schemaPath]) {
  const text = fs.readFileSync(path, 'utf8');
  const start = text.indexOf('slug: "north-texas-fair-rodeo"');
  const end = text.indexOf('slug: "austin-chronicle-hot-sauce-festival"', start);
  const block = text.slice(start, end);
  if (block.includes('2026-08-21') || block.includes('2026-08-30') || block.includes('official 2026') || block.includes('Braxton Keith')) {
    throw new Error(`Stale 2026 North Texas Fair data remains in ${path}`);
  }
}
