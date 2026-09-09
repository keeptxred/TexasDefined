import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

export const Route = createFileRoute('/texas-home-insurance-calculator')({
  head: () =>
    buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-home-insurance-calculator',
      title: 'Texas Homeowners Insurance Calculator | No Personal Info',
      description:
        'Estimate Texas homeowners insurance from replacement cost, rate assumptions, wind or flood coverage, and deductibles—without entering your name, email, phone number, or street address.',
      featureList: [
        'Estimate homeowners insurance without personal information',
        'Start with the home replacement cost',
        'Adjust the estimated base insurance rate',
        'Add possible wind or flood coverage',
      ],
    }),
});
