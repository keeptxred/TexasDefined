import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Estimate a Texas home-price range using income, monthly debts, down payment, interest rate, property taxes and homeowners insurance.';

export const Route = createFileRoute('/texas-home-affordability-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-home-affordability-calculator',
    title: 'Texas Home Affordability Calculator | Estimate a Home-Price Range',
    description,
    featureList: [
      'Explore a possible home-price range',
      'Account for income and monthly debt',
      'Include your down payment and interest rate',
      'Include property taxes and homeowners insurance',
    ],
  }),
});
