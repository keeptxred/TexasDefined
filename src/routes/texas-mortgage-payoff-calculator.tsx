import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { MortgagePayoffCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Estimate how extra principal payments could change a Texas mortgage payoff date and remaining interest.';
export const Route=createFileRoute('/texas-mortgage-payoff-calculator')({head:()=>({meta:buildMeta(texasDefinedBrand,{title:'Texas Mortgage Payoff Calculator',description}),links:[canonicalLink(texasDefinedBrand,'/texas-mortgage-payoff-calculator')]}),component:()=> <CalculatorPage eyebrow="Texas Mortgage Planning" title="Texas Mortgage Payoff Calculator" description={description}><MortgagePayoffCalculator/></CalculatorPage>});
