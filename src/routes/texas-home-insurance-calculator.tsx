import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

export const Route = createFileRoute('/texas-home-insurance-calculator')({
  head: () =>
    buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-home-insurance-calculator',
      title: 'Texas Homeowners Insurance Calculator | No Personal Info',
      description:
        'Estimate a Texas homeowners insurance planning scenario from replacement cost and a TDI-grounded statewide baseline, then adjust wind, flood and discount assumptions without entering your name, email, phone number, or street address.',
      featureList: [
        'Estimate homeowners insurance without personal information',
        'Start with the home replacement cost',
        'Use a Texas Department of Insurance statewide baseline',
        'Add possible wind or flood coverage',
      ],
    }),
});
