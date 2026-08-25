import fs from 'node:fs';

const seoSource = fs.readFileSync('src/lib/seo.ts', 'utf8');
const brandSuffix = ' | Texas Defined';
const targets = [
  ['/county/bexar', 'Bexar County, Texas Guide'],
  ['/explore/road-trips', 'Texas Road Trips & Scenic Drives'],
  ['/texas-closing-cost-calculator', 'Texas Closing Cost Calculator'],
  ['/texas-property-tax-estimator', 'Texas Property Tax Estimator'],
  ['/texas-home-equity-calculator', 'Texas Home Equity Calculator'],
  ['/texas-moving-cost-calculator', 'Texas Moving Cost Calculator'],
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

console.log(`Phase 7 technical SEO validation passed for ${targets.length} audited canonical URLs.`);
