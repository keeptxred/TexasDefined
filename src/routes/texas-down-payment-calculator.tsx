import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { DownPaymentCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';
const description='Estimate a Texas home down payment, closing costs, reserve target, loan amount, and total cash needed.';
export const Route=createFileRoute('/texas-down-payment-calculator')({head:()=>buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-down-payment-calculator',
      title:'Texas Down Payment Calculator',description,
      featureList:['Estimate a home down payment','Estimate closing costs','Set a reserve target','Estimate loan amount and total cash needed'],
    }),component:()=> <CalculatorPage eyebrow="Texas Home Buying" title="Texas Down Payment Calculator" description={description}><DownPaymentCalculator/></CalculatorPage>});
