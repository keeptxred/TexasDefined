import { readFileSync } from "node:fs";

const source = readFileSync("src/data/texas-water-parks.ts", "utf8");
const hub = readFileSync("src/routes/explore.water-parks.index.tsx", "utf8");
const detail = readFileSync("src/routes/explore.water-parks.$slug.tsx", "utf8");
const sitemap = readFileSync("src/routes/sitemap-explore[.]xml.ts", "utf8");
const explore = readFileSync("src/routes/explore.index.lazy.tsx", "utf8");
const match = source.match(/export const texasWaterParks: WaterParkGuide\[\] = (\[[\s\S]*?\]);\nexport const texasWaterParksBySlug/);
if (!match) throw new Error("Canonical Texas water-park source registry is missing.");
const parks = JSON.parse(match[1]);
if (parks.length < 56) throw new Error(`Water-park census unexpectedly dropped from 56 to ${parks.length} sources.`);
const slugs = new Set();
const names = new Set();
for (const park of parks) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(park.slug)) throw new Error(`Bad water-park slug: ${park.slug}`);
  if (slugs.has(park.slug)) throw new Error(`Duplicate water-park slug: ${park.slug}`);
  slugs.add(park.slug);
  if (names.has(park.name)) throw new Error(`Duplicate named water-park venue: ${park.name}`);
  names.add(park.name);
  if (!park.city || !park.region || !park.setting || !park.kind || !park.admission) throw new Error(`Incomplete park: ${park.slug}`);
  if (!park.summary || park.summary.length < 55 || !park.distinctiveNote || park.distinctiveNote.length < 55) {
    throw new Error(`Missing visitor-specific facts: ${park.slug}`);
  }
  if (!/^https:\/\/[a-z0-9.-]+\//i.test(park.officialUrl)) throw new Error(`Park lacks HTTPS official source: ${park.slug}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(park.reviewedAt)) throw new Error(`Source review date invalid: ${park.slug}`);
}
for (const closed of ["hurricane-alley-corpus-christi", "splashtown-san-antonio", "water-park-at-the-villages-flint"]) {
  if (slugs.has(closed)) throw new Error(`Closed or unverified park published as open: ${closed}`);
}
for (const anchor of ['"/explore/water-parks"', 'texasWaterParks.map((park) => `/explore/water-parks/']) {
  if (!sitemap.includes(anchor)) throw new Error(`Sitemap missing park route coverage: ${anchor}`);
}
if ((sitemap.match(/texasWaterParks\.map/g) ?? []).length < 2) throw new Error("Both primary and fallback explore sitemaps must include waterpark guides.");
if (!hub.includes('"@type": "ItemList"') || !hub.includes("useState") || !hub.includes("actively researched collection")) throw new Error("Directory must preserve schema, filtering and census completeness disclosure.");
if (!detail.includes('"@type": "TouristAttraction"') || !detail.includes('park.officialUrl') || !detail.includes('park.distinctiveNote')) throw new Error("Per-park pages require operator facts and tourist attraction schema.");
if (!explore.includes('to="/explore/water-parks"')) throw new Error("Explore landing must link to the new water-park hub.");
console.log(`Texas water-park guide contract passed: ${parks.length} unique official-source facilities, primary/fallback sitemaps, venue pages and truthful census scope.`);
