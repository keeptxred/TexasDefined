import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description =
  'Estimate Texas utility costs by adding electricity, water, natural gas, internet and trash bills. Use the calculator for a monthly or annual home-utility estimate.';

export const Route = createFileRoute('/texas-utility-cost-calculator')({
  head: () =>
    buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-utility-cost-calculator',
      title: 'Texas Utility Cost Calculator | Estimate Electric, Gas & Water Bills',
      description,
      featureList: [
        'Estimate Texas electricity costs',
        'Add water and natural gas bills',
        'Include internet and trash service',
        'See monthly and annual utility totals',
      ],
    }),
});
