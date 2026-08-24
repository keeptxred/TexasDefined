import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Estimate current Texas home equity from an assumed property value and mortgage balances, then use that estimate as a planning input rather than a promise of how much you can borrow.';

export const Route = createFileRoute('/texas-home-equity-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-home-equity-calculator',
    title: 'Texas Home Equity Calculator | Estimate Equity & LTV',
    description,
    featureList: [
      'Estimate the equity in your home',
      'Compare secured loans with estimated home value',
      'See an estimated loan-to-value position',
      'Separate equity from borrowing eligibility',
    ],
  }),
});
