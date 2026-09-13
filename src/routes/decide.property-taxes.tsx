import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

export const description = 'Estimate your 2026 Texas property tax bill from taxable value and local rates, then find homestead, senior and veteran relief tools.';
const canonicalPath = '/decide/property-taxes';

export const propertyTaxFaqs = [
  {
    question: 'How do I calculate property taxes in Texas?',
    answer: 'Multiply the taxable value used by each taxing unit by that unit’s adopted tax rate, then add the resulting amounts. A combined rate can provide a quick estimate, but the most accurate estimate uses each taxing unit separately.',
  },
  {
    question: 'Does Texas have a homestead exemption?',
    answer: 'Yes. Eligible homeowners can receive a residence homestead exemption, and some taxing units offer additional exemptions. The exemption lowers taxable value rather than changing the market value of the home.',
  },
  {
    question: 'How much can a Texas homestead exemption save?',
    answer: 'Savings depend on the exemption amount and the tax rates that apply to the property. Because taxing units can apply different exemptions and rates, the savings should be estimated for each unit separately.',
  },
  {
    question: 'Do seniors get property tax relief in Texas?',
    answer: 'Texans age 65 or older may qualify for additional homestead exemptions, school-tax ceilings, installment options and certain deferral protections, depending on eligibility and the taxing unit.',
  },
  {
    question: 'Why are Texas property taxes higher than in some states?',
    answer: 'Texas relies heavily on local property taxes to fund schools and local governments and does not levy an individual state income tax. Actual bills vary widely by taxable value, exemptions and local tax rates.',
  },
] as const;

export const Route = createFileRoute('/decide/property-taxes')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath,
    title: 'Texas Property Tax Calculator 2026 | Estimate Your Bill',
    description,
    breadcrumbParent: { name: 'Property', path: '/property' },
    faqs: propertyTaxFaqs,
    featureList: [
      'Estimate annual property taxes from taxable value',
      'Estimate monthly property-tax cost',
      'Link to detailed exemption calculators when taxing units differ',
    ],
  }),
});
