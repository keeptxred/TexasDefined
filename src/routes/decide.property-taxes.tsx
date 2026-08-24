import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

export const description = 'Get a quick annual and monthly estimate using a taxable value and combined local rate for an address.';
const canonicalPath = '/decide/property-taxes';

export const Route = createFileRoute('/decide/property-taxes')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath,
    title: 'Estimate Your Property Taxes',
    description,
    featureList: [
      'Estimate annual property taxes from taxable value',
      'Estimate monthly property-tax cost',
      'Link to detailed exemption calculators when taxing units differ',
    ],
  }),
});
