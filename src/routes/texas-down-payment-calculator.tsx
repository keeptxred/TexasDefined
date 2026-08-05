import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { DownPaymentCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Estimate a Texas home down payment, closing costs, reserve target, loan amount, and total cash needed.';
export const Route=createFileRoute('/texas-down-payment-calculator')({head:()=>({meta:buildMeta(texasDefinedBrand,{title:'Texas Down Payment Calculator',description}),links:[canonicalLink(texasDefinedBrand,'/texas-down-payment-calculator')]}),component:()=> <CalculatorPage eyebrow="Texas Home Buying" title="Texas Down Payment Calculator" description={description}><DownPaymentCalculator/></CalculatorPage>});
