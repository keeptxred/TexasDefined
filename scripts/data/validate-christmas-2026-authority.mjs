import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const authority = read("src/data/major-event-expanded-authority-tranche57.server.ts");
const resolver = read("src/data/major-event-page.server.ts");
const registry = read("src/data/major-event-supplemental-registry.server.ts");
const links = read("src/data/fixtures/seasonal-authority-links.ts");
const legacy = read("src/data/major-event-expanded-authority-tranche35.server.ts");
const issues = [];
const required = [
  "grapevine-christmas-capital-of-texas",
  "austin-trail-of-lights",
  "santas-wonderland-college-station",
  "houston-zoo-lights",
  "moody-gardens-ice-land",
  "holiday-at-the-dallas-arboretum",
  "galaxy-lights-space-center-houston",
  "concho-christmas-tour-of-lights",
  "main-street-bethlehem-burnet",
];
for (const slug of required) {
  if (!authority.includes(`slug: "${slug}"`)) issues.push(`Missing dedicated 2026 authority: ${slug}`);
  if (!registry.includes(`"${slug}"`)) issues.push(`Missing calendar/sitemap registration: ${slug}`);
  if (!links.includes(`"/event/${slug}"`)) issues.push(`Missing Christmas hub internal link: ${slug}`);
}
if (!legacy.includes('slug: "ford-holiday-river-parade"')) issues.push("Existing Ford River Parade authority must be preserved");
if (!links.includes('"/event/ford-holiday-river-parade"')) issues.push("Existing Ford River Parade missing Christmas hub link");
if (!resolver.includes('getExpandedMajorEventAuthorityTranche57Server(slug)')) issues.push("Christmas authority resolver not wired");
for (const [path,marker] of [
  ["src/routes/holiday.magical-winter-lights.tsx","2026–27 dates not yet verified"],
  ["src/routes/holiday.enchant-christmas-arlington.tsx","No 2026 Arlington/Dallas event announced"],
]) {
  const page = read(path);
  if (!page.includes(marker)) issues.push(`Unverified Texas event improperly represented: ${path}`);
  if (page.includes('startDate:') || page.includes('"@type": "Event"')) issues.push(`Unverified Texas event has scheduled schema: ${path}`);
}
for (const slug of ["magical-winter-lights", "enchant-christmas-arlington"]) {
  if (!links.includes(`"/holiday/${slug}"`)) issues.push(`Missing historic-status hub link: ${slug}`);
  if (registry.includes(`"${slug}"`)) issues.push(`Unverified 2026 event added to live calendar: ${slug}`);
}
for (const url of ["https://www.houstonzoo.org/events/zoolights/","https://austintrailoflights.org/event-faqs","https://www.moodygardens.com/holiday-season/ice-land","https://www.fbcburnet.org/main-street-bethlehem"]) {
  if (!authority.includes(url)) issues.push(`Missing organizer citation: ${url}`);
}
if (!authority.includes('startDate: "2026-12-04"') || !authority.includes('startDate: "2026-12-11"')) issues.push("Bethlehem two-weekend date windows missing");
if (!authority.includes("ChristmasAuthorityRecord")) issues.push("Christmas typed occurrence windows missing");
if (issues.length) {
  console.error(issues.join("\n"));
  process.exitCode = 1;
} else console.log("Christmas 2026–27 authority coverage validated: 10 confirmed event pages, 2 evergreen status pages.");
