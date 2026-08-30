import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { getHomeownershipCostHubPage } from '@/data/homeownership-cost-hub-page';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Combine a Texas mortgage, property taxes, homeowners insurance, maintenance, utilities, HOA or district costs and other recurring expenses into a fuller homeownership budget, with official local property-tax rate autofill.';

export const Route = createFileRoute('/texas-homeownership-cost-calculator')({
  loader: async () => ({ hub: await getHomeownershipCostHubPage() }),
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-homeownership-cost-calculator',
    title: 'Texas Homeownership Cost Calculator | Beyond the Mortgage',
    description,
    featureList: [
      'Estimate monthly ownership costs',
      'Load official local property-tax rates',
      'Estimate the annual total',
      'Include mortgage, taxes and insurance',
      'Include maintenance, utilities and neighborhood fees',
    ],
  }),
});