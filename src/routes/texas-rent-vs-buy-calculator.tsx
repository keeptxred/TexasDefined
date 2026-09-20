import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Compare renting and buying in Texas across a chosen time horizon, including the ownership costs and flexibility tradeoffs that a simple monthly rent-versus-mortgage comparison misses.';

export const Route = createFileRoute('/texas-rent-vs-buy-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-rent-vs-buy-calculator',
    title: 'Texas Rent vs Buy Calculator | Compare the Longer-Term Cost',
    description,
    featureList: ['Amortize a fixed-rate mortgage month by month', 'Model rent growth and renters insurance', 'Include property taxes, homeowners insurance, maintenance and HOA dues', 'Account for buyer closing and selling costs', 'Compare remaining loan balance, sale equity and net cost over the same time horizon'],
  }),
});
