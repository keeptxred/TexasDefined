import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import {
  salaryDescription,
  salaryFaqs,
  salarySeoTitle,
} from '@/data/calculator-query-alignment';
import { buildCalculatorHead } from '@/lib/calculator-seo';

export const Route = createFileRoute('/texas-salary-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-salary-calculator',
    title: salarySeoTitle,
    description: salaryDescription,
    featureList: [
      'Estimate Texas take-home pay',
      'Account for federal income tax',
      'Include Social Security and Medicare',
      'Add benefits, retirement contributions and other deductions',
      'Compare annual, monthly and per-paycheck cash flow',
    ],
    faqs: salaryFaqs,
    breadcrumbParent: { name: 'Financial Tools', path: '/decide/financial-tools' },
    applicationCategory: 'FinanceApplication',
  }),
});