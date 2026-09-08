import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import {
  homeInsuranceDescription,
  homeInsuranceFaqs,
  homeInsuranceSeoTitle,
} from '@/data/calculator-query-alignment';
import { buildCalculatorHead } from '@/lib/calculator-seo';

export const Route = createFileRoute('/texas-home-insurance-calculator')({
  head: () =>
    buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-home-insurance-calculator',
      title: homeInsuranceSeoTitle,
      description: homeInsuranceDescription,
      featureList: [
        'Estimate homeowners insurance without personal information',
        'Start with the home replacement cost',
        'Adjust the estimated base insurance rate',
        'Add possible wind or flood coverage',
        'Convert percentage deductibles into dollar amounts',
      ],
      faqs: homeInsuranceFaqs,
      breadcrumbParent: { name: 'Financial Tools', path: '/decide/financial-tools' },
      applicationCategory: 'FinanceApplication',
    }),
});
