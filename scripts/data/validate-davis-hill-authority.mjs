import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const head = read("src/routes/destination.davis-hill-state-park.tsx");
const guide = read("src/routes/destination.davis-hill-state-park.lazy.tsx");
const indexed = read("src/routes/sitemap[.]xml.ts");
const curation = read("src/data/destination-curation-batch12.ts");
const map = read("src/data/state-park-hero-map.ts");
const availability = read("src/data/destination-availability.ts");
const parksHub = read("src/routes/explore.$category.lazy.tsx");
const redirect = read("src/routes/state-park.$slug.tsx");
const required = (text, needle) => assert.ok(text.includes(needle), "Davis Hill authority missing: " + needle);

required(head, 'createFileRoute("/destination/davis-hill-state-park")');
required(head, "canonicalLink(texasDefinedBrand, canonicalPath)");
required(guide, 'createLazyFileRoute("/destination/davis-hill-state-park")');
required(guide, "Public access: not open for ordinary visits");
required(guide, 'type="application/ld+json"');
required(guide, "citation: sources.map");
required(guide, "2026-10-20");
required(guide, "Trinity River");
required(guide, "General James Davis");
required(guide, 'to="/county/liberty"');
required(guide, 'to="/destination/davis-mountains-state-park"');
for(const fragment of ["park-information/future-parks","2022/0324/agenda", "texas-state-parks-on-the-horizon", "20230502b"]) required(guide, fragment);
for(const fragment of ["DestinationVisitPlanner", "DestinationViatorBooking", "CityPassContextualCallout", "MapPreview", "<main>"]) {
  assert.ok(!guide.includes(fragment), "Davis Hill must not imply public access: " + fragment);
}
required(indexed, '{ path: "/destination/davis-hill-state-park", lastmod: "2026-10-20" }');
required(curation, 'nearestTown:"Tarkington Prairie"');
required(curation, 'county:"Liberty"');
required(curation, 'reservationUrl:undefined');
required(availability, '"davis-hill-state-park"');
required(parksHub, 'to="/destination/davis-hill-state-park"');
required(redirect, 'statusCode: 301');
assert.ok(!map.includes('"davis-hill-state-park"'), "Unverified photo still mapped as Davis Hill");

console.log("Davis Hill canonical route, date, links, sources, accessibility, sitemap, and image safeguards validated.");
