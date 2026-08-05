import fs from 'node:fs';

const helper = fs.readFileSync('src/lib/calculator-seo.ts', 'utf8');
const component = fs.readFileSync('src/components/calculators/CalculatorPage.tsx', 'utf8');
const routes = [
  ['Mortgage', 'src/routes/texas-mortgage-calculator.tsx'],
  ['Affordability', 'src/routes/texas-home-affordability-calculator.tsx'],
  ['Closing cost', 'src/routes/texas-closing-cost-calculator.tsx'],
];
const failures = [];

for (const feature of [
  "'@type': 'WebApplication'",
  "applicationCategory: 'FinanceApplication'",
  "operatingSystem: 'Any'",
  "browserRequirements: 'Requires JavaScript'",
  "'@type': 'BreadcrumbList'",
  'featureList: options.featureList',
  "isPartOf: { '@id': `${siteUrl}/#website` }",
]) {
  if (!helper.includes(feature)) failures.push(`Calculator SEO helper missing ${feature}.`);
}

for (const feature of ['aria-label="Breadcrumb"', 'to="/decide/financial-tools"', 'aria-current="page"']) {
  if (!component.includes(feature)) failures.push(`Calculator page breadcrumb missing ${feature}.`);
}

for (const [label, filename] of routes) {
  const route = fs.readFileSync(filename, 'utf8');
  for (const feature of ['buildCalculatorHead', 'featureList:']) {
    if (!route.includes(feature)) failures.push(`${label} calculator missing ${feature}.`);
  }
  if (route.includes('aggregateRating:') || route.includes('offers:')) {
    failures.push(`${label} calculator must not invent ratings or offers.`);
  }
}

if (failures.length) {
  console.error('Calculator application SEO validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Calculator WebApplication and breadcrumb validation passed.');
