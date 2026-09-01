import './validate-local-cost-of-living-seo.mjs';
import fs from 'node:fs';

const readRouteSurface = (file) => {
  const eagerSource = fs.readFileSync(file, 'utf8');
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  return fs.existsSync(lazyFile) ? `${eagerSource}\n${fs.readFileSync(lazyFile, 'utf8')}` : eagerSource;
};

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
  const route = readRouteSurface(filename);
  for (const feature of ['buildCalculatorHead', 'featureList:']) {
    if (!route.includes(feature)) failures.push(`${label} calculator missing ${feature}.`);
  }
  if (route.includes('aggregateRating:') || route.includes('offers:')) failures.push(`${label} calculator must not invent ratings or offers.`);
}

const deepCalculatorContracts = [
  ['Mortgage payoff', 'src/routes/texas-mortgage-payoff-calculator.tsx', [
    'Texas Mortgage Payoff Calculator | Extra Payment Scenarios', 'Extra principal changes the balance that future interest uses', 'Texas mortgage payoff calculator FAQ',
    'to="/texas-refinance-savings-calculator"', 'to="/article/should-you-refinance-texas-mortgage"', 'to="/texas-homeownership-cost-calculator"',
    'https://www.consumerfinance.gov/ask-cfpb/how-does-paying-down-a-mortgage-work-en-1943/', 'https://www.consumerfinance.gov/ask-cfpb/what-is-a-payoff-amount-and-is-it-the-same-as-my-current-balance-en-205/',
  ]],
  ['Down payment', 'src/routes/texas-down-payment-calculator.tsx', [
    'Texas Down Payment Calculator | Cash Needed to Buy a Home', 'Keep the down payment, closing costs and reserves in one plan', 'Texas down payment calculator FAQ',
    'to="/article/texas-house-down-payment-guide"', 'to="/texas-closing-cost-calculator"', 'to="/texas-home-affordability-calculator"', 'https://welcomehome.tdhca.texas.gov/',
  ]],
  ['Refinance', 'src/routes/texas-refinance-savings-calculator.tsx', [
    'Texas Refinance Calculator | Savings & Break-Even Estimate', 'Compare break-even and the repayment clock together', 'Texas refinance calculator FAQ',
    'to="/article/should-you-refinance-texas-mortgage"', 'to="/texas-mortgage-payoff-calculator"', 'https://www.consumerfinance.gov/owning-a-home/compare/',
  ]],
  ['Home equity', 'src/routes/texas-home-equity-calculator.tsx', [
    'Texas Home Equity Calculator | Estimate Equity & LTV', 'Treat home equity as an estimate, not an available credit line', 'Texas home equity calculator FAQ',
    'to="/article/texas-home-equity-heloc-guide"', 'to="/texas-home-equity-growth-calculator"', 'to="/texas-mortgage-payoff-calculator"',
  ]],
  ['Home equity growth', 'src/routes/texas-home-equity-growth-calculator.tsx', [
    'Texas Home Equity Growth Calculator | Future Scenarios', 'Future equity depends on two moving numbers', 'Texas home equity growth calculator FAQ',
    'to="/texas-home-equity-calculator"', 'to="/texas-mortgage-payoff-calculator"', 'to="/article/texas-home-equity-heloc-guide"',
  ]],
  ['Moving cost', 'src/routes/texas-moving-cost-calculator.tsx', [
    'Texas Moving Cost Calculator | Plan the Full Move Budget', 'The move costs more than transportation', 'Texas moving cost calculator FAQ',
    'to="/moving-to-texas"', 'to="/moving-to-texas-checklist"', 'to="/texas-cost-of-living-calculator"',
  ]],
  ['Rent versus buy', 'src/routes/texas-rent-vs-buy-calculator.tsx', [
    'Texas Rent vs Buy Calculator | Compare the Longer-Term Cost', 'Rent and mortgage are not the only two numbers', 'Texas rent vs buy calculator FAQ',
    'to="/article/renting-vs-buying-in-texas"', 'to="/texas-homeownership-cost-calculator"', 'to="/texas-closing-cost-calculator"',
  ]],
  ['Budget planner', 'src/routes/texas-budget-planner.tsx', [
    'Texas Budget Planner | Monthly Household Income & Expenses', 'A useful budget includes the bills that do not arrive every month', 'Texas household budget planner FAQ',
    'to="/texas-salary-calculator"', 'to="/texas-utility-cost-calculator"', 'to="/texas-homeownership-cost-calculator"',
  ]],
  ['Salary comparison', 'src/routes/texas-salary-comparison-by-city.tsx', [
    'Texas Salary Comparison by City | Cost-Adjusted Pay Estimate', 'A citywide index cannot see your housing or commute', 'Texas salary comparison FAQ',
    'to="/texas-salary-calculator"', 'to="/texas-budget-planner"', 'to="/moving-to-texas"',
  ]],
  ['Cost of living', 'src/routes/texas-cost-of-living-calculator.tsx', [
    'Texas Cost of Living Calculator | Compare Household Budgets', 'Build the comparison around the household you actually have', 'Texas cost of living calculator FAQ',
    'to="/texas-salary-comparison-by-city"', 'to="/texas-budget-planner"', 'to="/moving-to-texas"',
  ]],
  ['Down payment assistance', 'src/routes/texas-down-payment-assistance-calculator.tsx', [
    'Texas Down Payment Assistance Calculator | Cash-to-Close Scenario', 'Assistance changes cash to close, not the need to verify the program', 'Texas down payment assistance calculator FAQ',
    'to="/article/texas-house-down-payment-guide"', 'to="/texas-down-payment-calculator"', 'to="/texas-home-affordability-calculator"', 'https://welcomehome.tdhca.texas.gov/',
  ]],
];
for (const [label, filename, markers] of deepCalculatorContracts) {
  const route = readRouteSurface(filename);
  for (const marker of markers) if (!route.includes(marker)) failures.push(`${label} calculator indexing-depth contract missing ${marker}.`);
}

const ownershipRoute = readRouteSurface('src/routes/texas-homeownership-cost-calculator.tsx');
const ownershipServer = fs.readFileSync('src/data/homeownership-cost-hub-page.server.ts', 'utf8');
for (const marker of ['Texas Homeownership Cost Calculator | Beyond the Mortgage', 'getHomeownershipCostHubPage', 'hub.stack.paragraphs.map', 'hub.links.cards.map', 'hub.faq.items.map']) {
  if (!ownershipRoute.includes(marker)) failures.push(`Homeownership cost calculator route/render contract missing ${marker}.`);
}
for (const marker of [
  'The mortgage payment is only one part of owning the house',
  'Texas homeownership cost calculator FAQ',
  '/texas-utility-cost-calculator',
  '/texas-home-insurance-calculator',
  '/article/true-cost-of-owning-a-home-in-texas',
  '/article/muds-pids-hoas-special-districts-texas',
]) {
  if (!ownershipServer.includes(marker)) failures.push(`Homeownership cost calculator server-owned indexing-depth contract missing ${marker}.`);
}

if (failures.length) {
  console.error('Calculator application SEO validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Calculator WebPage, WebApplication, canonical relationship, breadcrumb, and priority calculator indexing-depth validation passed, including server-owned homeownership depth.');