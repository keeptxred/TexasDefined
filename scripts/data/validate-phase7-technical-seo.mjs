import { texasDefinedBrand } from '../../src/brand/texasdefined.ts';
import { buildMeta } from '../../src/lib/seo.ts';

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
for (const [canonicalPath, expectedTitle] of targets) {
  const meta = buildMeta(texasDefinedBrand, {
    canonicalPath,
    title: 'Deliberately overlong fallback title that should never survive the Phase 7 audited override table for this canonical URL',
    description: canonicalPath === '/explore/road-trips'
      ? 'Short fallback description.'
      : 'A technically valid fallback description used only to exercise the Phase 7 title override contract on this audited canonical URL.',
  });
  const title = meta.find((entry) => 'title' in entry)?.title ?? '';
  const description = meta.find((entry) => entry.name === 'description')?.content ?? '';
  const expectedFullTitle = texasDefinedBrand.seo.titleTemplate.replace('%s', expectedTitle);
  if (title !== expectedFullTitle) failures.push(`${canonicalPath}: expected title ${expectedFullTitle}, got ${title}`);
  if (title.length < 30 || title.length > 60) failures.push(`${canonicalPath}: title length ${title.length} is outside 30–60 chars`);
  if (description.length > 160) failures.push(`${canonicalPath}: description exceeds 160 chars`);
  if (canonicalPath === '/explore/road-trips' && description.length < 100) failures.push(`${canonicalPath}: road-trip description is still too short (${description.length})`);
}

if (failures.length) {
  console.error('Phase 7 technical SEO validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Phase 7 technical SEO validation passed for ${targets.length} audited canonical URLs.`);
