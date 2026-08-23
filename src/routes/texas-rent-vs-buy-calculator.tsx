import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Compare renting and buying in Texas across a chosen time horizon, including the ownership costs and flexibility tradeoffs that a simple monthly rent-versus-mortgage comparison misses.';

export const Route = createFileRoute('/texas-rent-vs-buy-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-rent-vs-buy-calculator',
    title: 'Texas Rent vs Buy Calculator | Compare the Longer-Term Cost',
    description,
    featureList: ['Compare renting and buying side by side', 'Account for recurring ownership costs', 'Explore how the answer changes over time', 'Test different home-value assumptions'],
  }),
});
