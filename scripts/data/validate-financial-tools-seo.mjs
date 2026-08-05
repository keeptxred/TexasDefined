import './validate-calculator-app-seo.mjs';
import fs from 'node:fs';

const route = fs.readFileSync('src/routes/decide.financial-tools.tsx', 'utf8');

const required = [
  "'@type': 'CollectionPage'",
  "'@type': 'BreadcrumbList'",
  "'@type': 'ItemList'",
  'numberOfItems: sections.length',
  "mainEntity: { '@id': `${hubUrl}#tools` }",
  "absoluteUrl(texasDefinedBrand, path)",
];

const failures = required
  .filter((feature) => !route.includes(feature))
  .map((feature) => `Financial tools route missing ${feature}`);

if (route.includes("'@type': 'FinancialProduct'")) {
  failures.push('Financial tools hub must not claim FinancialProduct entities.');
}
if (route.includes("'@type': 'Offer'")) {
  failures.push('Financial tools hub must not claim Offer data.');
}

if (failures.length) {
  console.error('Financial tools SEO validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Financial tools structured-data validation passed.');
