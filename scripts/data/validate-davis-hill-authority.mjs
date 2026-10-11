import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const route = read("src/routes/destination.$slug.tsx");
const article = read("src/components/editorial/DavisHillAuthority.tsx");
const fallback = read("src/data/davis-hill-authority-fallback.ts");
const curation = read("src/data/destination-curation-batch12.ts");
const unavailable = read("src/data/destination-availability.ts");
const photoMap = read("src/data/state-park-hero-map.ts");
const sitemap = read("src/routes/sitemap[.]xml.ts");
const explore = read("src/routes/explore.$category.lazy.tsx");
const redirect = read("src/routes/state-park.$slug.tsx");
const has = (src, match, why) => assert.ok(src.includes(match), why + ": missing " + match);
const lacks = (src, match, why) => assert.ok(!src.includes(match), why + ": forbidden " + match);

assert.ok(!existsSync("src/routes/destination.davis-hill-state-park.tsx"), "Extra eager route reintroduced");
assert.ok(!existsSync("src/routes/destination.davis-hill-state-park.lazy.tsx"), "Duplicate route reintroduced");
has(route, 'params.slug === "davis-hill-state-park"', "static research fallback");
has(route, 'import("@/data/davis-hill-authority-fallback")', "deterministic offline destination");
has(route, 'import("@/components/editorial/DavisHillAuthority")', "lazy researched article");
has(route, 'robots: "index, follow, max-image-preview:large"', "indexable source-backed page");
has(route, 'canonicalLink(texasDefinedBrand, canonicalPath)', "proper canonical metadata");
has(article, "export default function DavisHillAuthorityPage()", "authority component");
has(article, "Public access: not open for ordinary visits", "prominent status");
has(article, 'role="note"', "accessible nonvisitor warning");
has(article, 'type="application/ld+json"', "JSON-LD");
has(article, "citation: sources.map", "original source citations");
has(article, "dateModified: \"2026-10-10\"", "review date");
has(article, 'to="/county/liberty"', "Liberty county cross link");
has(article, 'to="/article/texas-rivers-explained"', "Trinity river research link");
has(article, 'to="/explore/state-parks"', "parks hub link");
has(article, 'to="/destination/davis-mountains-state-park"', "Davis Mountains disambiguation");
has(explore, 'to="/destination/davis-hill-state-park"', "reciprocal state parks hub link");
for(const src of [
  "park-information/future-parks",
  "2022/0324/agenda",
  "2022/0324/transcripts",
  "texas-state-parks-on-the-horizon",
  "wanderlist-future-state-parks",
  "2025/0821/agenda",
]) has(article, src, "primary TPWD documentation");
for(const forbidden of ["DestinationViatorBooking", "DestinationVisitPlanner", "MapPreview", "CityPassContextualCallout", "Book now", "<main>"]) lacks(article, forbidden, "closed-site UX should avoid generic amenities");
has(fallback, 'county: "Liberty"', "correct county");
has(fallback, 'brandId: "texasdefined"', "destination brand");
has(fallback, 'region: "piney-woods"', "correct region");
has(fallback, 'category: "state-parks"', "correct category");
has(fallback, "Not open for routine public visits", "access condition");
has(curation, 'nearestTown:"Tarkington Prairie"', "correct imported catalog");
has(curation, 'county:"Liberty"', "correct imported county");
has(curation, 'reservationUrl:undefined', "prevent fake bookings");
has(unavailable, '"davis-hill-state-park"', "excluded from public trip planner");
lacks(photoMap, '"davis-hill-state-park"', "unverified park photo");
has(sitemap, '{ path: "/destination/davis-hill-state-park", lastmod: "2026-10-10" }', "indexed authoritative guide");
has(redirect, "statusCode: 301", "legacy permanent redirect");

console.log("Davis Hill authority content, source links, non-visitor status, dynamic route SEO, legacy redirect, reciprocal navigation, sitemap and photo integrity verified.");
