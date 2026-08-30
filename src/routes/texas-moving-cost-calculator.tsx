import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { movingCostDescription, movingCostFaqs, movingCostSeoTitle } from '@/data/moving-cost-calculator';
import { buildCalculatorHead } from '@/lib/calculator-seo';

export const Route = createFileRoute('/texas-moving-cost-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-moving-cost-calculator',
    title: movingCostSeoTitle,
    description: movingCostDescription,
    featureList: [
      'Estimate a rough transportation baseline from move distance and bedrooms',
      'Replace the baseline with a written mover or truck estimate',
      'Add packing, travel, storage, deposits and setup expenses',
      'Choose a contingency percentage for the unexpected',
      'Compare one-time moving costs with recurring Texas household costs',
    ],
    faqs: movingCostFaqs,
    breadcrumbParent: { name: 'Moving to Texas', path: '/moving-to-texas' },
    applicationCategory: 'FinanceApplication',
  }),
});
