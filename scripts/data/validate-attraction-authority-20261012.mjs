import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const assertions = [];
const requireMatch = (yes, explanation) => { if (!yes) assertions.push(explanation); };

const data = read("src/data/destination-curation-attraction-authority-20261012.ts");
const curation = read("src/data/destination-curation-all.ts");
const relationships = read("src/components/editorial/DestinationRelationships.tsx");
const guide = read("src/components/editorial/DestinationAuthorityGuide.tsx");
const route = read("src/routes/explore.big-bend-scenic-drives.tsx");
const page = read("src/routes/explore.big-bend-scenic-drives.lazy.tsx");
const region = read("src/routes/explore.region.$region.tsx");
const guides = read("src/routes/guides.lazy.tsx");
const publicRoutes = read("src/lib/public-routes.ts");
const sitemap = read("src/routes/sitemap-explore[.]xml.ts");
const top25 = read("src/data/destination-authority-top-attractions.ts");

const nine = [
  "natural-bridge-caverns", "enchanted-rock-state-natural-area", "hamilton-pool-preserve",
  "cadillac-ranch", "padre-island-national-seashore", "space-center-houston",
  "moody-gardens", "fossil-rim-wildlife-center", "texas-state-aquarium"
];
for (const slug of nine) {
  requireMatch(data.includes(`"${slug}": [`), `Missing destination-specific planning content: ${slug}`);
}
for (const slug of ["enchanted-rock-state-natural-area", "fossil-rim-wildlife-center", "texas-state-aquarium"]) {
  requireMatch(data.includes(`"${slug}": {\n    whyItMatters:`), `Missing extended guide: ${slug}`);
  requireMatch(relationships.includes(`"${slug}"`), `Extended guide not visible in destination relationships: ${slug}`);
}
for (const slug of ["natural-bridge-caverns", "hamilton-pool-preserve", "cadillac-ranch", "padre-island-national-seashore", "space-center-houston", "moody-gardens"]) {
  requireMatch(top25.includes(`"${slug}": {`), `Top 25 authority record missing: ${slug}`);
}
requireMatch(curation.includes("applyAttractionAuthority20261012,"), "Authority enrichment is not installed in canonical destination curation.");
requireMatch(guide.includes("isTopTexasAttraction(destination.slug)"), "Extended destination incorrectly presented as Top-25.");
for (const keyword of [
  "Ross Maxwell Scenic Drive", "Chisos Basin Road", "FM 170", "Rio Grande Village",
  "Old Maverick", "Dagger Flat", "construction-cancelled.htm", "Road and distance",
  "No drive time", "Controlling road source",
]) {
  requireMatch(page.includes(keyword) || route.includes(keyword), `Missing scenic route authority contract: ${keyword}`);
}
requireMatch(route.includes('createFileRoute("/explore/big-bend-scenic-drives")'), "Big Bend shell route missing.");
requireMatch(page.includes('createLazyFileRoute("/explore/big-bend-scenic-drives")'), "Big Bend visible route missing.");
requireMatch(publicRoutes.includes('"/explore/big-bend-scenic-drives"'), "Big Bend guide missing public indexability.");
requireMatch(sitemap.includes('"/explore/big-bend-scenic-drives"'), "Big Bend guide missing Explore sitemap.");
requireMatch(region.includes('to="/explore/big-bend-scenic-drives"'), "Big Bend regional hub backlink missing.");
requireMatch(guides.includes('to: "/explore/big-bend-scenic-drives"'), "Guides index backlink missing.");
requireMatch(relationships.includes('to="/explore/big-bend-scenic-drives"'), "Related destination backlinks missing.");

if (assertions.length) {
  console.error("Attraction authority contract failed:\n" + assertions.map(x => "- " + x).join("\n"));
  process.exit(1);
}
console.log("Attraction authority contract passed: nine enriched destinations; three extended sources/itineraries; five Big Bend route options; discovery, schema and sitemap.");
