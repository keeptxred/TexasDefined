import fs from "node:fs";

const failures = [];
const read = (path) => fs.readFileSync(path, "utf8");

const lazy = read("src/data/fixtures/lazy-standalone-evergreen.ts");
const history = read("src/routes/texas-history.lazy.tsx");
const brazoria = read("src/data/fixtures/brazoria-plantations-slavery-emancipation-history.ts");
const sallie = read("src/data/fixtures/sallie-hogg-texas-legacy.ts");
const ima = read("src/data/fixtures/ima-hogg-texas-legacy.ts");
const family = read("src/data/fixtures/hogg-family-texas-legacy.ts");
const will = read("src/data/fixtures/will-hogg-texas-legacy.ts");
const foundation = read("src/data/fixtures/hogg-foundation-mental-health-texas-history.ts");
const riverOaks = read("src/data/fixtures/river-oaks-hogg-brothers-houston-planning-history.ts");
const trail = read("src/data/fixtures/hogg-family-heritage-trail-texas.ts");
const james = read("src/data/texas-icons-research-history-7.server.ts");
const iconTypes = read("src/data/texas-icons-types.ts");
const iconRoute = read("src/routes/texas-icons_.$slug.tsx");
const destinations = read("src/data/hogg-legacy-destinations.ts");
const destinationCatalog = read("src/data/destination-preserved-catalog.ts");

for (const [slug, source, exportName] of [
  ["sallie-hogg-texas-legacy", sallie, "sallieHoggTexasLegacyArticle"],
  ["ima-hogg-texas-legacy", ima, "imaHoggTexasLegacyArticle"],
  ["hogg-family-texas-legacy", family, "hoggFamilyTexasLegacyArticle"],
  ["will-hogg-texas-legacy", will, "willHoggTexasLegacyArticle"],
  ["hogg-foundation-mental-health-texas-history", foundation, "hoggFoundationMentalHealthHistoryArticle"],
  ["river-oaks-hogg-brothers-houston-planning-history", riverOaks, "riverOaksHoggBrothersPlanningHistoryArticle"],
  ["hogg-family-heritage-trail-texas", trail, "hoggFamilyHeritageTrailTexasArticle"],
]) {
  if (!source.includes(`slug: "${slug}"`)) failures.push(`Missing Hogg authority slug: ${slug}`);
  if (!source.includes(`export const ${exportName}`)) failures.push(`Missing Hogg authority export: ${exportName}`);
  if (!source.includes('category: "texas-history"')) failures.push(`Hogg authority page must remain in texas-history: ${slug}`);
  if (!source.includes("sourceName:") || !source.includes("sourceUrl:")) failures.push(`Hogg authority page must retain source attribution: ${slug}`);
  if (!lazy.includes(`slug: "${slug}"`)) failures.push(`Hogg authority page is missing repository stub: ${slug}`);
  if (!lazy.includes(`import("./${slug}")`)) failures.push(`Hogg authority page is not lazy-loaded: ${slug}`);
  if (!history.includes(`slug: "${slug}"`)) failures.push(`Hogg authority page is missing Texas History discovery: ${slug}`);
}
for (const token of [
  "/texas-icons/james-hogg",
  "/destination/varner-hogg-plantation",
  "/article/hogg-family-texas-legacy",
  "/article/sallie-hogg-texas-legacy",
  "/destination/governor-jim-hogg-city-park-quitman",
  "/article/ima-hogg-texas-legacy",
  "/article/will-hogg-texas-legacy",
  "/article/hogg-foundation-mental-health-texas-history",
  "/article/river-oaks-hogg-brothers-houston-planning-history",
  "/destination/hogg-building-houston",
  "/article/hogg-family-heritage-trail-texas",
  "/destination/oakwood-cemetery-austin",
  "/destination/bayou-bend-collection-gardens",
  "/destination/winedale-historical-center",
]) {
  if (!ima.includes(token) && !family.includes(token) && !brazoria.includes(token)) failures.push(`Hogg authority cross-link missing: ${token}`);
}
for (const name of ["Will", "Ima", "Mike", "Tom"]) {
  if (!family.includes(name)) failures.push(`Hogg family page is missing child reference: ${name}`);
}
if (!will.includes("William Clifford 'Will' Hogg") || !will.includes("River Oaks") || !will.includes("Hogg Foundation for Mental Health")) failures.push("Will Hogg authority page must retain biography, River Oaks and Hogg Foundation context.");
if (!will.includes("https://www.tshaonline.org/handbook/entries/hogg-william-clifford")) failures.push("Will Hogg authority page must retain its Handbook of Texas source.");
if (!foundation.includes("https://hogg.utexas.edu/about/history") || !foundation.includes("established at The University of Texas at Austin in 1940") || !foundation.includes("Will Hogg endowment was transferred")) failures.push("Hogg Foundation authority page must retain official-source founding chronology.");
if (!foundation.includes("administrative unit of The University of Texas at Austin") || !foundation.includes("community-level change")) failures.push("Hogg Foundation authority page must retain present-day institutional context.");
if (!james.includes('relatedLinks: [') || !james.includes('/article/hogg-family-texas-legacy') || !james.includes('/article/sallie-hogg-texas-legacy') || !james.includes('/article/hogg-foundation-mental-health-texas-history') || !james.includes('/destination/governor-jim-hogg-city-park-quitman')) failures.push("James Hogg profile must retain reciprocal family-authority links.");
if (!iconTypes.includes("relatedLinks?: readonly") || !iconRoute.includes("Continue the story") || !iconRoute.includes("profile.relatedLinks")) failures.push("Texas Icons related-reading renderer must remain available for reciprocal authority links.");
for (const slug of ["bayou-bend-collection-gardens", "winedale-historical-center", "governor-jim-hogg-city-park-quitman", "jim-hogg-park-rusk", "hogg-building-houston", "oakwood-cemetery-austin"]) {
  if (!destinations.includes(`slug: "${slug}"`)) failures.push(`Missing Hogg legacy destination: ${slug}`);
  if (!destinationCatalog.includes("hoggLegacyDestinations")) failures.push("Hogg legacy destinations must remain registered in the preserved destination catalog.");
}
for (const marker of [
  "Postoak · Public domain · Wikimedia Commons",
  "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  'officialUrl: "https://www.mfah.org/visit/bayou-bend"',
  'officialUrl: "https://briscoecenter.org/visit/winedale/"',
  'officialUrl: "https://www.quitmantx.org/parks"',
  "Texas State Library and Archives Commission / State Publishing Company (1905) · Public domain · Wikimedia Commons",
  'officialUrl: "https://redc.rusktx.org/recreation-and-entertainment/"',
  "The Book of Texas (1916) / Houston Public Library · Public domain · Wikimedia Commons",
  "Ed Uthman · CC BY 3.0 · Wikimedia Commons",
  'officialUrl: "https://www.wyndhamhotels.com/wyndham/houston-texas/the-district-at-hogg-palace-a-wyndham-hotel/overview"',
  'officialUrl: "https://www.austintexas.gov/parks/locations/oakwood-cemetery-chapel"',
  "Oleg Yunakov · CC BY-SA 4.0 · Wikimedia Commons",
]) if (!destinations.includes(marker)) failures.push(`Hogg legacy destination governance marker missing: ${marker}`);

if (!sallie.includes("https://www.tshaonline.org/handbook/entries/hogg-sarah-ann-stinson-sallie") || !sallie.includes("Governor Jim Hogg City Park") || !sallie.includes("public-service values")) failures.push("Sallie Hogg authority page must retain TSHA sourcing, Quitman place context and family public-service legacy.");
if (!family.includes('/article/sallie-hogg-texas-legacy') || !family.includes('/destination/governor-jim-hogg-city-park-quitman')) failures.push("Hogg family authority page must retain Sallie and Quitman reciprocal links.");
if (!family.includes('/destination/jim-hogg-park-rusk') || !family.includes("Mike and Tom carried parts of the family legacy in quieter ways") || !family.includes("Ima, Tom and Mike presented their father's Rusk birthplace property")) failures.push("Hogg family authority page must retain the Rusk birthplace and sourced Mike/Tom contribution section.");
if (!ima.includes('/destination/jim-hogg-park-rusk')) failures.push("Ima Hogg authority page must retain the Rusk birthplace-preservation link.");
if (!james.includes('/destination/jim-hogg-park-rusk') || !james.includes('href: "/destination/jim-hogg-park-rusk"')) failures.push("James Hogg profile must retain Rusk birthplace destination links.");
if (!destinations.includes("Ima Hogg, Thomas E. 'Tom' Hogg and Michael 'Mike' Hogg presented the family property") || !destinations.includes("coordinates: { lat: 31.8047, lng: -95.1259 }")) failures.push("Jim Hogg Park destination must retain the sibling-donation history and verified Rusk coordinates.");
if (!ima.includes('/article/sallie-hogg-texas-legacy') || !ima.includes('/destination/governor-jim-hogg-city-park-quitman')) failures.push("Ima Hogg authority page must retain reciprocal Sallie and Quitman links.");
if (!will.includes('/article/sallie-hogg-texas-legacy') || !will.includes('/destination/governor-jim-hogg-city-park-quitman')) failures.push("Will Hogg authority page must retain reciprocal Sallie and Quitman links.");
if (!foundation.includes('/article/sallie-hogg-texas-legacy')) failures.push("Hogg Foundation authority page must retain the reciprocal Sallie Hogg link.");
if (!trail.includes("This is not a one-day route") || !trail.includes("Oakwood Cemetery") || !trail.includes("Varner-Hogg Plantation") || !trail.includes("Bayou Bend") || !trail.includes("Winedale")) failures.push("Hogg Heritage Trail must retain multi-day planning context and the core place sequence.");
for (const slug of ["jim-hogg-park-rusk", "governor-jim-hogg-city-park-quitman", "oakwood-cemetery-austin", "winedale-historical-center", "bayou-bend-collection-gardens", "varner-hogg-plantation"]) {
  if (!trail.includes(`"${slug}"`)) failures.push(`Hogg Heritage Trail is missing related destination: ${slug}`);
}
if (!destinations.includes("Hogg family plot with documented burials of Sallie, Will and Ima Hogg") || !destinations.includes("City of Austin Parks and Recreation") || !destinations.includes("coordinates: { lat: 30.276311, lng: -97.728272 }")) failures.push("Oakwood Cemetery destination must retain Hogg burial context, City of Austin management and verified coordinates.");
for (const [label, source] of [["family", family], ["Sallie", sallie], ["Ima", ima], ["Will", will], ["Foundation", foundation], ["James", james]]) {
  if (!source.includes("/article/hogg-family-heritage-trail-texas")) failures.push(`${label} Hogg authority surface must link to the Hogg Family Heritage Trail.`);
}
if (!family.includes('"oakwood-cemetery-austin"') || !sallie.includes('"oakwood-cemetery-austin"') || !ima.includes('"oakwood-cemetery-austin"') || !will.includes('"oakwood-cemetery-austin"')) failures.push("Hogg family, Sallie, Ima and Will profiles must retain Oakwood Cemetery as a related destination.");
if (!riverOaks.includes("https://www.tshaonline.org/handbook/entries/river-oaks-houston") || !riverOaks.includes("excluded Black residents, Jewish residents and other minorities") || !riverOaks.includes("Shelley v. Kraemer")) failures.push("River Oaks authority page must retain official sourcing and exclusionary-covenant context.");
if (!riverOaks.includes('/destination/hogg-building-houston') || !riverOaks.includes('/destination/bayou-bend-collection-gardens')) failures.push("River Oaks authority page must retain reciprocal Hogg-place links.");
if (!will.includes('/article/river-oaks-hogg-brothers-houston-planning-history') || !will.includes('/destination/hogg-building-houston')) failures.push("Will Hogg authority page must retain River Oaks and Hogg Building links.");
if (!family.includes('/article/river-oaks-hogg-brothers-houston-planning-history') || !family.includes('/destination/hogg-building-houston')) failures.push("Hogg family authority page must retain River Oaks and Hogg Building links.");
if (!destinations.includes("National Register of Historic Places and Recorded Texas Historic Landmark") || !destinations.includes("The District at Hogg Palace, A Wyndham Hotel")) failures.push("Hogg Building destination must retain landmark and current-use context.");
if (!ima.includes("Hogg Foundation for Mental Health") || !family.includes("Hogg Foundation for Mental Health")) failures.push("Hogg Foundation context must remain on both authority pages.");
if (!ima.includes("Bayou Bend") || !family.includes("Bayou Bend")) failures.push("Bayou Bend context must remain on both authority pages.");
if (!brazoria.includes("/article/hogg-family-texas-legacy") || !brazoria.includes("/article/ima-hogg-texas-legacy")) failures.push("Varner-Hogg supporting article must link to both Hogg authority pages.");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("Hogg family authority validation passed.");
