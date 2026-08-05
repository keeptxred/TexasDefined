import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { DownPaymentAssistanceCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';
const description='Estimate an illustrative Texas down-payment-assistance amount, closing costs, total cash need, and remaining buyer cash gap.';
export const Route=createFileRoute('/texas-down-payment-assistance-calculator')({head:()=>buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-down-payment-assistance-calculator',
      title:'Texas Down Payment Assistance Calculator',description,
      featureList:['Estimate illustrative assistance','Estimate closing costs','Estimate total cash needed','Estimate the remaining buyer cash gap'],
    }),component:()=> <CalculatorPage eyebrow="Texas Home Buying" title="Texas Down Payment Assistance Calculator" description={description}><DownPaymentAssistanceCalculator/></CalculatorPage>});
