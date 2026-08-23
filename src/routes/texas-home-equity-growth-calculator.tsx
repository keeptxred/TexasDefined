import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Explore how a Texas home value, mortgage balance and equity could change over time under adjustable appreciation and loan-paydown assumptions. The result is a scenario, not a forecast.';

export const Route = createFileRoute('/texas-home-equity-growth-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-home-equity-growth-calculator',
    title: 'Texas Home Equity Growth Calculator | Future Scenarios',
    description,
    featureList: [
      'Explore a possible future home value',
      'Follow the mortgage balance over time',
      'See how equity could change',
      'Adjust appreciation and loan-paydown assumptions',
      'Compare conservative and higher-growth scenarios',
    ],
  }),
});
