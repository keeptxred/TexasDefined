import fs from 'node:fs';

const seoSource = fs.readFileSync('src/lib/seo.ts', 'utf8');
const fredericksburgChurchRoute = fs.readFileSync('src/routes/explore.painted-churches.$slug.tsx', 'utf8');
const fishingSpeciesServer = fs.readFileSync('src/data/fishing/species-guide-data.server.ts', 'utf8');
const stateFairRoute = fs.readFileSync('src/routes/texas-state-fair.tsx', 'utf8');
const texasFactsRoute = fs.readFileSync('src/routes/texas-facts.tsx', 'utf8');
const texasFactsData = fs.readFileSync('src/data/texas-essential-facts.ts', 'utf8');
const brandSuffix = ' | Texas Defined';
const targets = [
  ['/county/bexar', 'Bexar County, Texas Guide'],
  ['/explore', 'Explore Texas: Places, Road Trips & Outdoors'],
  ['/explore/top-attractions', 'Top 25 Texas Attractions'],
  ['/explore/road-trips', 'Texas Road Trips & Scenic Drives'],
  ['/texas-history', 'Texas History: People, Places & Stories'],
  ['/texas-explained', 'Texas Explained: How the State Works'],
  ['/texas-closing-cost-calculator', 'Texas Closing Cost Calculator'],
  ['/texas-property-tax-estimator', 'Texas Property Tax Estimator'],
  ['/texas-home-equity-calculator', 'Texas Home Equity Calculator'],
  ['/texas-moving-cost-calculator', 'Texas Moving Cost Calculator: Move Budget'],
  ['/property-tax-calculators', 'Texas Property Tax Calculators'],
  ['/fishing', 'Texas Fishing Guide | Lakes & Species'],
  ['/sports-venues', 'Texas Stadiums & Sports Venues'],
  ['/events', 'Texas Events & Festivals'],
  ['/destination/palo-duro-canyon-state-park', 'Palo Duro Canyon State Park Guide'],
  ['/texas-vs/california', 'Texas vs California: Cost & Living'],
  ['/article/texas-wildlife-guide', 'Texas Wildlife Guide: Animals & Habitats'],
  ['/article/texas-farm-to-market-roads-explained', 'Texas Farm-to-Market Roads Explained'],
  ['/article/beginners-guide-ordering-texas-barbecue', 'How to Order Texas Barbecue'],
];

const gscIntentTargets = [
  [
    '/explore/landscapes/where-does-texas-turn-into-desert',
    'Where Does Texas Turn Into Desert? Texas Regions Explained',
    'See where Texas shifts from plains and Hill Country into Chihuahuan Desert landscapes, and how elevation, rainfall and geography define the transition.',
  ],
  [
    '/article/texas-regions-explained',
    'Texas Landforms & Regions: Mountains, Plains, Coast & More',
    'Explore Texas landforms and regions, from the Hill Country and Piney Woods to the Gulf Coast, High Plains, Big Bend mountains, basins and South Texas.',
  ],
  [
    '/article/texas-septic-systems-homeowner-guide',
    'Texas Septic System Design & OSSF Guide',
    'Texas septic system design guide covering OSSF site evaluation, permits, conventional and aerobic systems, drainfields, approved plans and homeowner maintenance.',
  ],
  [
    '/article/texas-rio-grande-river-guide',
    'Rio Grande in Texas: Basin, Border, Reservoirs & River Guide',
    "Guide to the Rio Grande in Texas, from desert canyons and the border to Amistad, Falcon, water treaties, irrigation and the river's Gulf outlet.",
  ],
  [
    '/article/texas-major-cities-regional-differences',
    'Major Texas Cities Compared: Houston, DFW, Austin & San Antonio',
    'Compare Houston, Dallas-Fort Worth, Austin, San Antonio and Texas regions on climate, culture, jobs, driving and daily life before choosing where to live.',
  ],
  [
    '/article/texas-lakes-reservoirs-explained',
    'Texas Lakes & Reservoirs: Major Water Systems Explained',
    'Learn why most Texas lakes are reservoirs, how dams reshape rivers, and how Lake Travis, Texoma, Canyon Lake and other systems store water.',
  ],
  [
    '/article/texas-national-parks-big-bend-guadalupe-guide',
    'Big Bend & Guadalupe Mountains National Parks: Texas Guide',
    'Compare Big Bend National Park and Guadalupe Mountains National Park in Texas, including landscapes, hiking, access, seasons and which park fits your trip.',
  ],
];

const exactQuerySourceTargets = [
  {
    label: '/explore/painted-churches/fredericksburg-st-marys-catholic-church',
    source: fredericksburgChurchRoute,
    tokens: [
      'params.slug === "fredericksburg-st-marys-catholic-church"',
      `"St. Mary's Catholic Church Fredericksburg TX"`,
      `"Historic St. Mary's Catholic Church in Fredericksburg, Texas: 1906 Gothic Revival architecture, painted interior, German Catholic history and visitor planning."`,
    ],
  },
  {
    label: '/fishing/species/blue-catfish',
    source: fishingSpeciesServer,
    tokens: [
      'canonicalPath === "/fishing/species/blue-catfish"',
      '"Blue Catfish in Texas: Fishing Guide"',
      '"Blue catfish in Texas: verified lake relationships, seasonal patterns and source-backed fishing techniques without live-bite or sponsor-ranking claims."',
    ],
  },
  {
    label: '/texas-state-fair',
    source: stateFairRoute,
    tokens: [
      '"State Fair of Texas 2026: Dates & Guide"',
      '"State Fair of Texas 2026 runs Sept. 25–Oct. 18 at Fair Park in Dallas. Plan tickets, hours, DART, parking, food, rides, Big Tex and daily events."',
      'startDate: "2026-09-25"',
      'endDate: "2026-10-18"',
    ],
  },
];

const failures = [];
if (!seoSource.includes('brand.identity.id === "texasdefined" && page.canonicalPath')) {
  failures.push('Phase 7 metadata overrides are no longer scoped to TexasDefined canonical paths.');
}
if (!seoSource.includes('technicalOverride?.title ?? page.title')) failures.push('Phase 7 title override is not wired into buildMeta.');
if (!seoSource.includes('technicalOverride?.description ?? page.description')) failures.push('Phase 7 description override is not wired into buildMeta.');

for (const [canonicalPath, expectedTitle] of targets) {
  const escapedPath = canonicalPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedTitle = expectedTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const overridePattern = new RegExp(`"${escapedPath}"\\s*:\\s*\\{[\\s\\S]*?title\\s*:\\s*"${escapedTitle}"`);
  if (!overridePattern.test(seoSource)) failures.push(`${canonicalPath}: expected audited title override is missing.`);
  const fullTitle = `${expectedTitle}${brandSuffix}`;
  if (fullTitle.length < 30 || fullTitle.length > 60) failures.push(`${canonicalPath}: final title length ${fullTitle.length} is outside 30–60 chars.`);
}

for (const [canonicalPath, expectedTitle, expectedDescription] of gscIntentTargets) {
  const escapedPath = canonicalPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedTitle = expectedTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedDescription = expectedDescription.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const overridePattern = new RegExp(
    `"${escapedPath}"\\s*:\\s*\\{[\\s\\S]*?title\\s*:\\s*"${escapedTitle}"[\\s\\S]*?description\\s*:\\s*["']${escapedDescription}["']`,
  );
  if (!overridePattern.test(seoSource)) failures.push(`${canonicalPath}: expected GSC intent title/description override is missing.`);
}

for (const target of exactQuerySourceTargets) {
  for (const token of target.tokens) {
    if (!target.source.includes(token)) failures.push(`${target.label}: expected exact-query intent marker is missing: ${token}`);
  }
}

for (const token of [
  "const canonicalPath = '/texas-facts';",
  "const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);",
  "'@type': 'CollectionPage'",
  "'@type': 'ItemList'",
  "'@type': 'BreadcrumbList'",
  "name: '100 Essential Facts About Texas'",
  "name: 'Texas Facts', item: pageUrl",
  'citation: item.sources.map((source) => source.url)',
]) {
  if (!texasFactsRoute.includes(token)) failures.push(`/texas-facts: provenance-backed page schema marker is missing: ${token}`);
}
for (const forbiddenType of ['FAQPage', 'ClaimReview']) {
  if (texasFactsRoute.includes(`'@type': '${forbiddenType}'`) || texasFactsRoute.includes(`\"@type\": \"${forbiddenType}\"`)) {
    failures.push(`/texas-facts: ${forbiddenType} schema must not be emitted by the sourced reference collection.`);
  }
}

for (const token of [
  "Cotton has shaped Texas agriculture for generations, with the High Plains developing into one of the state\\'s defining cotton-growing regions.",
  'Cattle ranching has shaped Texas agriculture, land use and cultural identity for centuries.',
]) {
  if (!texasFactsData.includes(token)) failures.push(`/texas-facts: durable agriculture wording is missing: ${token}`);
}
for (const staleRankingClaim of [
  'leading U.S. cotton-producing state in most years',
  'largest cattle inventory of any U.S. state',
]) {
  if (texasFactsData.includes(staleRankingClaim)) failures.push(`/texas-facts: time-sensitive ranking claim must not remain in the durable-facts collection: ${staleRankingClaim}`);
}

const roadTripsMatch = seoSource.match(/"\/explore\/road-trips"\s*:\s*\{[\s\S]*?description\s*:\s*"([^"]+)"/);
const roadTripsDescription = roadTripsMatch?.[1] ?? '';
if (roadTripsDescription.length < 100 || roadTripsDescription.length > 160) {
  failures.push(`/explore/road-trips: description length ${roadTripsDescription.length} is outside 100–160 chars.`);
}

if (failures.length) {
  console.error('Phase 7 technical SEO validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Phase 7 technical SEO validation passed for ${targets.length} audited canonical URLs, ${gscIntentTargets.length} current GSC intent overrides, ${exactQuerySourceTargets.length} exact-query source targets, the provenance-backed Texas Facts CollectionPage/ItemList boundary and durable Texas agriculture facts.`);
