import fs from "node:fs";
import assert from "node:assert/strict";

/** Narrow, deterministic contract: exact hotel guide, rights, discoverability and honest monetization. */
const read = (path) => fs.readFileSync(path, "utf8");
const guide = read("src/data/hotel-paso-del-norte-authority.ts");
const catalog = read("src/data/destination-preserved-catalog.ts");
const city = read("src/data/city-authority-profiles.ts");
const county = read("src/data/county-visitor-places.ts");
const pairings = read("src/data/destination-curated-pairings.ts");
const rights = read("src/data/heritage-photo-license-links.ts");
const route = read("src/routes/destination.$slug.tsx");
const html = read("public/stay-affiliate-options.js");
const nearbyHistoricSites = read("src/data/historic-sites.ts");
const historicAssessment = read("src/data/historic-site-authority-full-catalog.ts");
const historicEnrichment = read("src/data/historic-site-enrichment.ts");

const contains = (source, value, context) => assert.ok(source.includes(value), context + ": missing " + value);
const path = "/destination/hotel-paso-del-norte";

for (const phrase of [
  'slug: "hotel-paso-del-norte"', 'sourceCheckedAt: "2026-10-17"',
  "National Register", "79002933", "1912", "1979", "2020",
  "Trost", "Dome Bar", "10 Henry Trost Court",
  "115 El Paso Street", "Tiffany-style", "Magoffin Home",
  "Plaza Theatre", "El Paso Museum of Art", "reservationUrl: marriott",
  "gallery:", "visitor", "accessibility",
]) contains(guide, phrase, "authority guide");

for (const host of ["atlas.thc.texas.gov", "npgallery.nps.gov", "marriott.com", "visitelpaso.com", "hotelpdn.com", "commons.wikimedia.org"]) contains(guide, host, "primary evidence");
assert.ok((guide.match(/thcFaq\(/g) || []).length >= 10, "at least ten sourced visitor FAQs");
assert.ok((guide.match(/thcSource\(/g) || []).length >= 10, "at least ten source and image records");
assert.ok((guide.match(/\n    "[^"]{100,}"/g) || []).length >= 11, "substantive multi-paragraph history and practical context");
contains(guide, "CC0 1.0", "distinct licensed hero");
contains(guide, "U.S. public domain", "archival exterior");
contains(guide, "University of Houston Libraries", "postcard rights");
assert.ok(!/anrdoezrs\.net|www\.hotels\.com\/ho\d+/.test(guide), "never fabricate property-specific commission destinations");

contains(catalog, 'import { hotelPasoDelNorteAuthorityDestination }', "preserved destination catalog");
contains(catalog, "[hotelPasoDelNorteAuthorityDestination]", "published destination catalog");
contains(city, "href: '/destination/hotel-paso-del-norte'", "El Paso city inbound link");
contains(county, '"relatedGuideHref": "/destination/hotel-paso-del-norte"', "El Paso county inbound link");
contains(pairings, '"hotel-paso-del-norte": ["el-paso-museum-of-art"', "nearby interlinked guides");
contains(rights, '"/destination/hotel-paso-del-norte": {', "photo rights");
contains(rights, "Tiffany_glass_dome,_Camino_Real_Hotel_", "exact Commons provenance");
contains(route, '"hotel-paso-del-norte": "Hotel Paso del Norte El Paso: History & Stay Guide"', "SEO title");
contains(route, 'isHotelPasoDelNorte ? ["Hotel", "TouristAttraction"]', "Hotel schema typing");
contains(route, 'isHotelPasoDelNorte ? "10 Henry Trost Ct"', "schema physical address");
contains(route, 'postalCode: "79901"', "schema postal code");
contains(route, "Historical photographs of {destination.name}", "no recycled Battleship gallery heading");
contains(html, "Hotels.com", "existing hotel comparison opportunities");
contains(guide, "The historic home is closed through 2027 for restoration", "Magoffin nearby closure advisory");
contains(guide, "https://thc.texas.gov/historic-sites/magoffin-home", "Magoffin authoritative closure source");
contains(nearbyHistoricSites, 'site.slug === "magoffin-home" ? {', "specific Magoffin photograph");
contains(nearbyHistoricSites, "Magoffin%20home%202009.jpg", "exact Magoffin photographic file");
contains(nearbyHistoricSites, "CC BY 4.0", "image attribution");
contains(nearbyHistoricSites, "historic home is closed through 2027", "Magoffin destination visitor alert");
contains(historicAssessment, "The historic house is closed for restoration through 2027", "Magoffin realistic visit estimate");
contains(historicEnrichment, "The historic house is closed through 2027 for restoration", "Magoffin nearby trip closure notice");
contains(rights, '"/destination/magoffin-home": {', "Magoffin photographer and license source");

console.log("Hotel Paso del Norte authority acceptance: source, copy, rights, schema, county/city links, affiliate gates validated.");
