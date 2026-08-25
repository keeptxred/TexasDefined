import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Estimate Texas buyer and seller closing costs, credits and cash needed at closing before you make an offer or price a sale.';

export const Route = createFileRoute('/texas-closing-cost-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-closing-cost-calculator',
    title: 'Texas Closing Cost Calculator | Buyer & Seller Estimate',
    description,
    featureList: [
      'Estimate buyer closing costs',
      'Estimate seller closing costs',
      'Account for negotiated credits',
      'See possible seller proceeds before mortgage payoff',
    ],
  }),
});
