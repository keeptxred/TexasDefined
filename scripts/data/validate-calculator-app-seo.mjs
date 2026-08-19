import fs from 'node:fs';

const helper = fs.readFileSync('src/lib/calculator-seo.ts', 'utf8');
const component = fs.readFileSync('src/components/calculators/CalculatorPage.tsx', 'utf8');
const routes = [
  ['Mortgage', 'src/routes/texas-mortgage-calculator.tsx'],
  ['Affordability', 'src/routes/texas-home-affordability-calculator.tsx'],
  ['Closing cost', 'src/routes/texas-closing-cost-calculator.tsx'],
  ['Home insurance', 'src/routes/texas-home-insurance-calculator.tsx'],
  ['Moving cost', 'src/routes/texas-moving-cost-calculator.tsx'],
  ['Rent versus buy', 'src/routes/texas-rent-vs-buy-calculator.tsx'],
  ['Cost of living', 'src/routes/texas-cost-of-living-calculator.tsx'],
  ['Utility cost', 'src/routes/texas-utility-cost-calculator.tsx'],
  ['Salary', 'src/routes/texas-salary-calculator.tsx'],
  ['Budget planner', 'src/routes/texas-budget-planner.tsx'],
  ['Down payment', 'src/routes/texas-down-payment-calculator.tsx'],
  ['Refinance', 'src/routes/texas-refinance-savings-calculator.tsx'],
  ['Down payment assistance', 'src/routes/texas-down-payment-assistance-calculator.tsx'],
  ['Home equity', 'src/routes/texas-home-equity-calculator.tsx'],
  ['Home equity growth', 'src/routes/texas-home-equity-growth-calculator.tsx'],
  ['Homeownership cost', 'src/routes/texas-homeownership-cost-calculator.tsx'],
  ['Mortgage payoff', 'src/routes/texas-mortgage-payoff-calculator.tsx'],
  ['Salary comparison', 'src/routes/texas-salary-comparison-by-city.tsx'],
];
const failures = [];

for (const feature of [
  "'@type': 'WebPage'",
  "'@id': `${pageUrl}#page`",
  "mainEntity: { '@id': `${pageUrl}#application` }",
  "breadcrumb: { '@id': `${pageUrl}#breadcrumb` }",
  "'@type': 'WebApplication'",
  "mainEntityOfPage: { '@id': `${pageUrl}#page` }",
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

const deepCalculatorContracts = [
  ['Mortgage payoff', 'src/routes/texas-mortgage-payoff-calculator.tsx', [
    'Texas Mortgage Payoff Calculator | Extra Payment Scenarios',
    'Extra principal changes the balance that future interest uses',
    'Pay extra, refinance, or keep the current schedule?',
    'Texas mortgage payoff calculator FAQ',
    'to="/texas-refinance-savings-calculator"',
    'to="/article/should-you-refinance-texas-mortgage"',
    'to="/texas-homeownership-cost-calculator"',
    'https://www.consumerfinance.gov/ask-cfpb/how-does-paying-down-a-mortgage-work-en-1943/',
    'https://www.consumerfinance.gov/ask-cfpb/what-is-a-payoff-amount-and-is-it-the-same-as-my-current-balance-en-205/',
    'https://www.consumerfinance.gov/ask-cfpb/what-is-a-prepayment-penalty-en-1957/',
  ]],
  ['Down payment', 'src/routes/texas-down-payment-calculator.tsx', [
    'Texas Down Payment Calculator | Cash Needed to Buy a Home',
    'Keep the down payment, closing costs and reserves in one plan',
    'Connect the cash requirement to the payment you can carry',
    'Texas down payment calculator FAQ',
    'to="/article/texas-house-down-payment-guide"',
    'to="/texas-closing-cost-calculator"',
    'to="/texas-home-affordability-calculator"',
    'https://www.hud.gov/buying/loans',
    'https://www.va.gov/housing-assistance/home-loans/loan-types/purchase-loan/',
    'https://welcomehome.tdhca.texas.gov/',
  ]],
  ['Homeownership cost', 'src/routes/texas-homeownership-cost-calculator.tsx', [
    'Texas Homeownership Cost Calculator | Beyond the Mortgage',
    'The mortgage payment is only one part of owning the house',
    'Verify the biggest ownership-cost assumptions separately',
    'Texas homeownership cost calculator FAQ',
    'to="/texas-utility-cost-calculator"',
    'to="/texas-home-insurance-calculator"',
    'to="/article/true-cost-of-owning-a-home-in-texas"',
    'to="/article/muds-pids-hoas-special-districts-texas"',
  ]],
];
for (const [label, filename, markers] of deepCalculatorContracts) {
  const route = fs.readFileSync(filename, 'utf8');
  for (const marker of markers) if (!route.includes(marker)) failures.push(`${label} calculator indexing-depth contract missing ${marker}.`);
}

if (failures.length) {
  console.error('Calculator application SEO validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Calculator WebPage, WebApplication, canonical relationship, breadcrumb, and priority home-finance indexing-depth validation passed.');
