import fs from "node:fs";

/**
 * Validates the infrastructure for bidirectional place/activity navigation.
 * No fixed eleven-park or six-guide cap: future subject-qualified additions
 * are required to be reciprocal and to point to real canonical routes.
 */
const read = (path) => fs.readFileSync(path, "utf8");
const mapSource = read("src/data/specialist-guide-destination-links.ts");
const destinationRoute = read("src/routes/destination.$slug.tsx");
const reverseComponent = read("src/components/editorial/SpecialistGuideDestinationLinks.tsx");
const parks = read("src/data/state-park-hero-map.ts");
const errors = [];
const mapChunk = mapSource.split("const SPECIALIST_LINKS:")[1]?.split("export function specialistGuidesForDestination")[0] || "";
const headings = [...mapChunk.matchAll(/^  "([^"]+)": \[/gm)];
const seen = new Set();
const guideHrefs = new Set();
let edgeCount = 0;
for (let i=0;i<headings.length;i++) {
  const park = headings[i][1];
  const body = mapChunk.slice(headings[i].index, headings[i+1]?.index ?? mapChunk.length);
  if (!parks.includes(`"${park}":`)) errors.push("Unrecognized canonical park asset/destination slug: " + park);
  for (const link of body.matchAll(/\{ href: "(\/[^"]+)", label: "([^"]+)", context: "([^"]+)" \}/g)) {
    const [,href,label,context] = link;
    const key = park + "=>" + href;
    if (seen.has(key)) errors.push("Repeated destination→guide relationship " + key);
    seen.add(key);
    if (context.trim().length < 25 || label.trim().length < 5) errors.push("Thin contextual explanation " + key);
    if (href.startsWith("/article/")) errors.push("Staged comparisons cannot appear in published guide crosslinks " + key);
    if (!fs.existsSync(`src/routes/${href.slice(1)}.tsx`)) errors.push("Specialist guide route is not canonical or absent " + key);
    guideHrefs.add(href);
    edgeCount++;
  }
}
if (!destinationRoute.includes("specialistGuidesForDestination(destination.slug)")) errors.push("Destination template does not render specialist guide links");
if (!reverseComponent.includes("destinationsForSpecialistGuide(guideHref)")) errors.push("Reverse links are not derived from the same source");
if (!mapSource.includes("guides.filter((guide) => guide.href === href)")) errors.push("Reverse map does not filter by exact activity-guide route");
for(const href of guideHrefs) {
  const guidePath = `src/routes/${href.slice(1)}.lazy.tsx`;
  if (!fs.existsSync(guidePath)) { errors.push("No visible guide renderer for " + href); continue; }
  if (!read(guidePath).includes(`<SpecialistGuideDestinationLinks guideHref="${href}" />`)) errors.push("Guide is missing linked-back place panel: " + href);
}
if (!headings.length || !edgeCount) errors.push("Sitewide crosslink registry unexpectedly empty");
if (errors.length) {
  console.error("Specialist activity/place relationship audit failed:\n" + errors.map(e=>" - "+e).join("\n"));
  process.exit(1);
}
console.log(`PASS: ${headings.length} activity-relevant park destination pages and ${guideHrefs.size} specialist guide routes share ${edgeCount} reciprocal relationships without duplicate or staged links; no fixed growth cap.`);
