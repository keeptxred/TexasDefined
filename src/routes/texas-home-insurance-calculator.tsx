import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description =
  'Use this Texas homeowners insurance calculator without personal information. Estimate annual cost from replacement cost, an estimated base rate, wind or flood coverage, and deductible assumptions.';

export const Route = createFileRoute('/texas-home-insurance-calculator')({
  head: () =>
    buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-home-insurance-calculator',
      title: 'Texas Homeowners Insurance Calculator | No Personal Info',
      description,
      featureList: [
        'Estimate homeowners insurance without personal information',
        'Start with the home replacement cost',
        'Adjust the estimated base insurance rate',
        'Add possible wind or flood coverage',
      ],
    }),
});
