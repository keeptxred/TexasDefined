import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Estimate a Texas move by combining transportation or movers, packing, travel, deposits, utility setup and a contingency so the first month is not built around the truck price alone.';

export const Route = createFileRoute('/texas-moving-cost-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-moving-cost-calculator',
    title: 'Texas Moving Cost Calculator | Plan the Full Move Budget',
    description,
    featureList: ['Estimate transportation and moving help', 'Add packing and travel costs', 'Include deposits and setup expenses', 'Leave room for the unexpected'],
  }),
});
