import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(file, "utf8");
const route = read("src/routes/destination.davis-hill-state-park.tsx");
const page = read("src/routes/destination.davis-hill-state-park.lazy.tsx");
const legacyRoute = read("src/routes/state-park.$slug.tsx");
const curation = read("src/data/destination-curation-batch12.ts");
const unavailable = read("src/data/destination-availability.ts");
const heroMap = read("src/data/state-park-hero-map.ts");
const sitemap = read("src/routes/sitemap[.]xml.ts");

const contains = (value, expected, label) => assert.ok(value.includes(expected), label + ": missing " + expected);
const excludes = (value, expected, label) => assert.ok(!value.includes(expected), label + ": forbidden " + expected);

contains(route, 'createFileRoute("/destination/davis-hill-state-park")', "canonical static route");
contains(route, 'canonicalPath: path', "canonical SEO");
contains(route, 'dateModified: "2026-10-10"', "schema freshness");
contains(route, "citation: sources.map", "verifiable citations");
contains(page, 'createLazyFileRoute("/destination/davis-hill-state-park")', "lazy detailed page");
contains(page, "Public access: not open for ordinary visits", "explicit access warning");
contains(page, 'role="note"', "accessible status notice");
contains(page, 'to="/county/liberty"', "county link");
contains(page, 'to="/article/texas-rivers-explained"', "river context link");
contains(page, 'to="/explore/state-parks"', "state park context link");
contains(page, 'to="/destination/davis-mountains-state-park"', "name disambiguation");
contains(page, "not a developed, routinely accessible state park", "unavailable description");
for (const key of ["future-parks", "2022/0324/agenda", "2022/0324/transcripts", "texas-state-parks-on-the-horizon", "wanderlist-future-state-parks", "2025/0821/agenda"]) {
  contains(page, key, "primary sourcing");
}
for (const key of ["DestinationVisitPlanner", "DestinationViatorBooking", "CityPassContextualCallout", "MapPreview", "Book now"]) {
  excludes(page, key, "unavailable park must not be sold as a visit");
}
contains(legacyRoute, 'statusCode: 301', "existing legacy redirect");
contains(legacyRoute, 'href: ' + String.fromCharCode(96) + '/destination/', "legacy redirect target");
contains(sitemap, '{ path: "/destination/davis-hill-state-park", lastmod: "2026-10-10" }', "sitemap inclusion");
contains(unavailable, '"davis-hill-state-park"', "unavailable trip-planner exclusion");
for (const key of ['nearestTown:"Tarkington Prairie"', 'county:"Liberty"', 'region:"piney-woods"', 'sourceCheckedAt:"2026-10-10"', 'coordinates:{lat:30.31684,lng:-94.8226}', "No ordinary public access", 'address:undefined', 'reservationUrl:undefined']) {
  contains(curation, key, "corrected catalog");
}
const specific = curation.slice(curation.indexOf('"davis-hill-state-park"'));
for (const key of ['nearestTown:"Fort Davis"', 'Historic park-system context', 'West Texas landscape']) {
  excludes(specific, key, "obsolete Davis Hill facts");
}
excludes(heroMap, '"davis-hill-state-park"', "unverified/misidentified photo override");
console.log("Davis Hill route, access, content, sitemap, legacy redirect, and photo guards verified.");
