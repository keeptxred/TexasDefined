import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { RefinanceCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Compare your current mortgage with a possible refinance, including the payment change and how long it may take to recover the closing costs.';

export const Route = createFileRoute('/texas-refinance-savings-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-refinance-savings-calculator',
    title: 'See whether refinancing may be worth it',
    description,
    featureList: [
      'Compare your current loan with a refinance',
      'Estimate the monthly payment difference',
      'See when the closing costs may be recovered',
    ],
  }),
  component: () => (
    <CalculatorPage eyebrow="Before you replace the loan" title="See whether refinancing may be worth it" description={description}>
      <RefinanceCalculator />
    </CalculatorPage>
  ),
});
