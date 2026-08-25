import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Estimate a Texas mortgage payment with down payment, principal, interest, official local property-tax rates and homeowners insurance in one monthly housing-cost view.';

export const Route = createFileRoute('/texas-mortgage-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-mortgage-calculator',
    title: 'Texas Mortgage Calculator | Taxes & Insurance',
    description,
    featureList: [
      'Estimate principal and interest',
      'Load official Texas property-tax rates',
      'Include homeowners insurance',
      'Compare the full monthly housing estimate',
    ],
  }),
});
