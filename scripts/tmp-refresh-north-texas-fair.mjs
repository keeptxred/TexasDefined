import fs from 'node:fs';

const replaceBlock = (path, slug, nextSlug, replacement) => {
  const text = fs.readFileSync(path, 'utf8');
  const startMarker = `  {\n    slug: "${slug}",`;
  const endMarker = `  {\n    slug: "${nextSlug}",`;
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker, start);
  if (start < 0 || end < 0) throw new Error(`Could not isolate ${slug} in ${path}`);
  fs.writeFileSync(path, text.slice(0, start) + replacement + text.slice(end));
};

const indexPath = 'src/data/major-event-index.ts';
const indexLines = fs.readFileSync(indexPath, 'utf8').split('\n');
const matches = indexLines.map((line, i) => line.includes('slug: "north-texas-fair-rodeo"') ? i : -1).filter(i => i >= 0);
if (matches.length !== 1) throw new Error(`Expected one North Texas Fair index row, found ${matches.length}`);
indexLines[matches[0]] = '  { slug: "north-texas-fair-rodeo", name: "North Texas Fair & Rodeo", city: "Denton", countySlug: "denton", countyName: "Denton County", region: "prairies-lakes", category: "rodeo", startDate: "2027-08-20", endDate: "2027-08-29", dateNote: "The organizer has published the 99th annual North Texas Fair & Rodeo for August 20-29, 2027. Recheck the official schedule before traveling because nightly rodeo, concert and attraction details can change.", venue: "North Texas Fair & Rodeo grounds", officialUrl: "https://ntfair.com/", sourceCheckedAt: "2026-09-11" },';
fs.writeFileSync(indexPath, indexLines.join('\n'));

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

replaceBlock('src/data/major-event-schema-enrichment-batch3.server.ts', 'north-texas-fair-rodeo', 'austin-chronicle-hot-sauce-festival', `  {
    slug: "north-texas-fair-rodeo",
    organizer: organization("North Texas State Fair Association, Inc.", "https://ntfair.com/"),
    sources: [
      { label: "North Texas Fair & Rodeo official 2027 event page", url: "https://ntfair.com/" },
    ],
    verifiedAt: "2026-09-11",
  },
`);
