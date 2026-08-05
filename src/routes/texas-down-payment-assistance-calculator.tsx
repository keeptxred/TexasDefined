import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { DownPaymentAssistanceCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Estimate an illustrative Texas down-payment-assistance amount, closing costs, total cash need, and remaining buyer cash gap.';
export const Route=createFileRoute('/texas-down-payment-assistance-calculator')({head:()=>({meta:buildMeta(texasDefinedBrand,{title:'Texas Down Payment Assistance Calculator',description}),links:[canonicalLink(texasDefinedBrand,'/texas-down-payment-assistance-calculator')]}),component:()=> <CalculatorPage eyebrow="Texas Home Buying" title="Texas Down Payment Assistance Calculator" description={description}><DownPaymentAssistanceCalculator/></CalculatorPage>});
