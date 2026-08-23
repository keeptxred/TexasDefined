import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Compare a current Texas mortgage with a possible refinance, including payment change, estimated closing costs, a simple break-even period and the effect of changing the loan term.';

export const Route = createFileRoute('/texas-refinance-savings-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-refinance-savings-calculator',
    title: 'Texas Refinance Calculator | Savings & Break-Even Estimate',
    description,
    featureList: [
      'Compare your current loan with a refinance',
      'Estimate the monthly payment difference',
      'Estimate when closing costs may be recovered',
      'Compare the old and new repayment terms',
    ],
  }),
});
