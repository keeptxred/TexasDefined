import fs from "node:fs";

const route = fs.readFileSync("src/routes/event.$slug.tsx", "utf8");
const server = fs.readFileSync("src/data/major-event-page.server.ts", "utf8");
const failures = [];

const serverBuildsCanonicalCountyLinks = server.includes('event.countySlug ? `/county/${event.countySlug}` : null');
const routeCanonicalizesLegacyCountyLinks = [
  "canonicalizeMajorEventCountyLinks",
  '/href="\\/browse\\/counties#county-([a-z0-9-]+)"/g',
  '\'href="/county/$1"\'',
  "html: canonicalizeMajorEventCountyLinks(page.html)",
].every((marker) => route.includes(marker));

if (!serverBuildsCanonicalCountyLinks && !routeCanonicalizesLegacyCountyLinks) {
  failures.push("Dedicated event guides must route county discovery to canonical /county/:slug authority pages.");
}
if (server.includes("/browse/counties#county-") && !routeCanonicalizesLegacyCountyLinks) {
  failures.push("Legacy event county directory anchors remain in server HTML without a canonical route-boundary rewrite.");
}

if (failures.length) {
  console.error("Event county authority-link validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Major-event county discovery resolves to canonical county authority pages.");
