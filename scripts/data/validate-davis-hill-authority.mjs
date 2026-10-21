import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const head = read("src/routes/destination.$slug.tsx");
const resolver = read("src/data/destination-query-runtime.ts");
const fallback = read("src/data/davis-hill-authority-fallback.ts");
const guide = read("src/components/editorial/DavisHillAuthority.tsx");
const indexed = read("src/routes/sitemap[.]xml.ts");
const curation = read("src/data/destination-curation-batch12.ts");
const map = read("src/data/state-park-hero-map.ts");
const availability = read("src/data/destination-availability.ts");
const parksHub = read("src/routes/explore.$category.lazy.tsx");
const redirect = read("src/routes/state-park.$slug.tsx");
const required = (text, needle) => assert.ok(text.includes(needle), "Davis Hill authority missing: " + needle);

required(head, 'createFileRoute("/destination/$slug")');
required(head, 'destination.slug === "davis-hill-state-park"');
required(head, 'const indexable = audit.readyForIndexing && (isPrimaryTripPlannerDestination(destination) || isHistoricalMuseumReference);');
required(head, 'import("@/components/editorial/DavisHillAuthority")');
required(resolver, 'slug === "davis-hill-state-park"');
required(fallback, 'brandId:"texasdefined"');
required(fallback, '/images/state-parks/davis-hill-conservation-landscape.svg');
required(curation, '/images/state-parks/davis-hill-conservation-landscape.svg');
const landscape = read("public/images/state-parks/davis-hill-conservation-landscape.svg");
const geology = read("public/images/state-parks/davis-hill-salt-dome-concept.svg");
required(landscape, '<svg xmlns="http://www.w3.org/2000/svg"');
required(geology, '<svg xmlns="http://www.w3.org/2000/svg"');
required(guide, '<img');
required(guide, 'src="/images/state-parks/davis-hill-conservation-landscape.svg"');
required(guide, 'loading="eager"');
required(guide, 'src="/images/state-parks/davis-hill-salt-dome-concept.svg"');
assert.ok(guide.indexOf('src="/images/state-parks/davis-hill-conservation-landscape.svg"') < guide.indexOf('src="/images/state-parks/davis-hill-salt-dome-concept.svg"'), "Hero must precede the inline geology image");
required(guide, '/images/state-parks/davis-hill-salt-dome-concept.svg');
required(head, '"battleship-texas", "davis-hill-state-park"');
required(head, "canonicalLink(texasDefinedBrand, canonicalPath)");
required(guide, "export default function DavisHillAuthorityPage()");
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
