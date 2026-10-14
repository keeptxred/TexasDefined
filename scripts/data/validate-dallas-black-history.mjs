#!/usr/bin/env node
/**
 * Dallas African American heritage release contract. No external dependencies.
 * Verifies the researched destination network, auditable sources, visible FAQs,
 * on-page reciprocal linking, hub and registration.
 */
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(file, "utf8");
const registry = read("src/data/dallas-black-history-research.ts");
const places = read("src/data/dallas-black-history-destinations.ts");
const preserved = read("src/data/destination-preserved-catalog.ts");
const template = read("src/routes/destination.$slug.tsx");
const panel = read("src/components/editorial/DallasBlackHistoryAuthority.tsx");
const hub = read("src/routes/dallas-black-history.tsx");
const hubContent = read("src/components/editorial/DallasBlackHistoryPage.tsx");
const historicSitesGuide = read("public/content/explore-category-authority/historic-sites.html");
const failures = [];

const slugs = [
  "african-american-museum-dallas-fair-park",
  "booker-t-washington-high-school-dallas",
  "deep-ellum",
  "freedmans-cemetery-memorial-dallas",
  "juanita-craft-civil-rights-house-dallas",
  "st-paul-united-methodist-church-dallas",
  "queen-city-heights-historic-district-dallas",
  "tenth-street-historic-district-oak-cliff"
];
const previous = new Set(["african-american-museum-dallas-fair-park", "deep-ellum"]);

for (const slug of slugs) {
  if (!registry.includes(`slug: "${slug}"`)) failures.push(`Research dossier missing ${slug}`);
  if (!previous.has(slug) && !places.includes(`slug: "${slug}"`)) failures.push(`Destination missing ${slug}`);
}
const profiles = [...registry.matchAll(/slug: "([a-z0-9-]+)", shortName:/g)].map((match) => match[1]);
if (profiles.length !== 8 || new Set(profiles).size !== 8)
  failures.push(`Exactly 8 unique research profiles expected; got ${profiles.length}`);
if ((places.match(/\n    slug: "/g) || []).length !== 6)
  failures.push("Exactly six new distinct destination definitions expected.");
if (!preserved.includes("dallasBlackHistoryDestinations,") || !preserved.includes('from "./dallas-black-history-destinations"'))
  failures.push("Explore catalog must import and register six destinations.");
if (!template.includes("<DallasBlackHistoryAuthority slug={destination.slug} />"))
  failures.push("Destination route must show research and FAQs.");
if (!template.includes("dallasHeritage?.sources") || !template.includes('"FAQPage"'))
  failures.push("Page must include citations and FAQ structured data.");
const craftLegacyHost = "https://dallas.gov/departments/sustainabledevelopment/historicpreservation/HP%20Documents/Landmark%20Structures/Juanita%20Craft%20House%20Landmark%20Nomination.pdf";
const craftNominationStableHost = "https://www.dallascityhall.com/departments/sustainabledevelopment/historicpreservation/HP%20Documents/Landmark%20Structures/Juanita%20Craft%20House%20Landmark%20Nomination.pdf";
if (registry.includes(craftLegacyHost) || !registry.includes(craftNominationStableHost))
  failures.push("City of Dallas Craft landmark nomination must use the tested, TLS-reachable official www.dallascityhall.com hostname.");
for (const year of ["1925", "1926", "1930"]) {
  if (!registry.includes(year)) failures.push(`Juanita Craft construction-year discrepancy missing ${year}`);
}
if (!panel.includes("dallasBlackHistoryResearch.filter") || !panel.includes("profile.sources.map") || !panel.includes("profile.faqs.map"))
  failures.push("Visible panel must show other sites, cited sources, and FAQs.");
if (!panel.includes('href="/dallas-black-history"'))
  failures.push("Each place must link to the hub.");
if (!hub.includes('createFileRoute("/dallas-black-history")') || !hub.includes("landmarks.map") || !hubContent.includes("dallasBlackHistoryResearch.find"))
  failures.push("Public authority hub and ItemList must exist.");
if (!places.includes('const cemeteryPhoto = commons(') || !places.includes('2016 exhibit photograph", true)') || !places.includes('2016 marker photograph", true)')) failures.push('Dallas heritage Commons originals must avoid failing 1600px thumbnail redirects for cemetery and Tenth Street images.');
if (!places.includes("Wikimedia Commons") || !places.includes("CC BY-SA"))
  failures.push("Licensed heroes and credits must be retained.");
for (const phrase of ["1861", "1869", "1,157", "1924", "1927", "182", "185", "National Register", "accessible"]) {
  if (![registry, places, hub].some((src) => src.toLowerCase().includes(phrase.toLowerCase()))) {
    failures.push(`Evidence or visitor claim guard missing: ${phrase}`);
  }
}
for (const section of registry.split('slug: "').slice(1)) {
  if (!section.includes("sources: [") || !section.includes("faqs: [") || !section.includes("sections: ["))
    failures.push("One heritage dossier lacks sections, FAQ, or source ledger.");
}
if (!historicSitesGuide.includes('href="/dallas-black-history"') || !historicSitesGuide.includes("Dallas Black History — eight heritage destinations"))
  failures.push("Historic Sites & Museums authority directory must contextually link to the Dallas Black History collection.");
if (failures.length) {
  console.error("Dallas Black History release contract FAILED:\n" + failures.map((e) => " - " + e).join("\n"));
  process.exit(1);
}
console.log("Dallas Black History release contract PASSED: 8 research profiles, 6 new destinations, 8 reciprocal-link panels, hub, source and FAQ schema.");
