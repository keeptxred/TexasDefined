import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Estimate how possible Texas down-payment assistance could change the cash needed for a down payment and closing costs, while keeping current program eligibility and repayment terms as a separate verification step.';

export const Route = createFileRoute('/texas-down-payment-assistance-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-down-payment-assistance-calculator',
    title: 'Texas Down Payment Assistance Calculator | Cash-to-Close Scenario',
    description,
    featureList: ['Estimate a possible assistance amount', 'Add closing costs', 'See total cash needed', 'See what may still be left to cover', 'Keep program eligibility separate from the estimate'],
  }),
});
