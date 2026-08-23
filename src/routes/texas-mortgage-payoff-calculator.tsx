import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Estimate how extra principal payments could change a mortgage payoff date and the interest left to pay, then compare that plan with refinancing or keeping the current schedule.';

export const Route = createFileRoute('/texas-mortgage-payoff-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-mortgage-payoff-calculator',
    title: 'Texas Mortgage Payoff Calculator | Extra Payment Scenarios',
    description,
    featureList: [
      'Estimate when the mortgage could be paid off',
      'Try different extra-principal amounts',
      'Compare remaining interest',
      'Pressure-test payoff against refinance alternatives',
    ],
  }),
});
