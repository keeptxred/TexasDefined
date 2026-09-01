import fs from 'node:fs';

const partnerRoute = fs.readFileSync('src/routes/partner-with-us.tsx', 'utf8');
const partnerUi = fs.readFileSync('src/routes/partner-with-us.lazy.tsx', 'utf8');
const inquiry = fs.readFileSync('src/data/partner-inquiry.functions.ts', 'utf8');
const cta = fs.readFileSync('src/components/partners/HousingPartnerCta.tsx', 'utf8');
const shared = fs.readFileSync('src/components/calculators/LocalHomeAffordabilityPage.tsx', 'utf8');
const insurance = fs.readFileSync('src/components/calculators/LocalHomeInsurancePage.tsx', 'utf8');
const mortgage = fs.readFileSync('src/components/calculators/LocalMortgagePage.tsx', 'utf8');
const ownership = fs.readFileSync('src/components/calculators/LocalHomeownershipCostPage.tsx', 'utf8');

const failures = [];

for (const marker of [
  "'insurance'",
  "'mortgage'",
  "'real-estate'",
  '/^\\/texas-mortgage-calculator',
  '/^\\/texas-home-insurance-calculator',
  '/^\\/texas-home-affordability-calculator',
  '/^\\/texas-homeownership-cost-calculator',
  'sanitizePartnershipType',
  'sanitizePartnerSource',
]) {
  if (!partnerRoute.includes(marker)) failures.push(`Partner route housing funnel missing ${marker}`);
}

for (const marker of [
  'Housing & relocation partnerships',
  'Payment cannot buy favorable rankings, calculator inputs, factual conclusions, editorial coverage',
  'Texas Defined does not sell or pass calculator inputs to partners',
  'business-to-business submissions only',
  'does not activate a paid housing placement merely because an inquiry is submitted',
  'no calculator inputs or reader financial data are attached',
]) {
  if (!partnerUi.includes(marker)) failures.push(`Partner UI commercial-separation contract missing ${marker}`);
}

for (const marker of [
  'partnerSourcePattern',
  'texas-(?:mortgage|home-insurance|home-affordability|homeownership-cost)-calculator',
  "partnershipType: z.enum(['insurance', 'mortgage', 'real-estate'",
  'addressLine2',
]) {
  if (!inquiry.includes(marker)) failures.push(`Partner inquiry validation missing ${marker}`);
}

for (const marker of [
  "type HousingPartnerType = 'insurance' | 'mortgage' | 'real-estate'",
  'Partnership standards & inquiry',
  'cannot change calculator results, editorial rankings or factual conclusions',
  'Reader calculator inputs are not attached to this business inquiry',
]) {
  if (!cta.includes(marker)) failures.push(`Housing partner CTA safety contract missing ${marker}`);
}

for (const marker of [
  'HousingPartnerCta',
  "partnershipType: 'insurance' | 'mortgage' | 'real-estate'",
  '{props.partner ? <HousingPartnerCta {...props.partner} /> : null}',
  "partnershipType: 'real-estate'",
]) {
  if (!shared.includes(marker)) failures.push(`Shared local housing planner partner boundary missing ${marker}`);
}
if (!insurance.includes("partnershipType: 'insurance'")) failures.push('Local home-insurance pages must preselect the insurance business category.');
if (!mortgage.includes("partnershipType: 'mortgage'")) failures.push('Local mortgage pages must preselect the mortgage business category.');
if (!ownership.includes("partnershipType: 'real-estate'")) failures.push('Local ownership-cost pages must preselect the real-estate business category.');

const prohibited = [
  "'@type': 'FinancialProduct'",
  "'@type': 'Offer'",
  'guaranteed leads',
  'guaranteed approval',
  'sell calculator inputs',
];
for (const marker of prohibited) {
  if ([partnerRoute, partnerUi, inquiry, cta, shared, insurance, mortgage, ownership].some((source) => source.includes(marker))) {
    failures.push(`Housing partnership surfaces include prohibited commercial claim/schema marker: ${marker}`);
  }
}

if (failures.length) {
  console.error('Housing partner funnel validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Housing partner funnel validation passed: insurance, mortgage and real-estate business inquiries are source-scoped, B2B-only, calculator-data-isolated and editorially separated from housing planning results.');
