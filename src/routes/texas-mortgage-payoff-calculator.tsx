import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { MortgagePayoffCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';
const description='Estimate how extra principal payments could change a Texas mortgage payoff date and remaining interest.';
export const Route=createFileRoute('/texas-mortgage-payoff-calculator')({head:()=>buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-mortgage-payoff-calculator',
      title:'Texas Mortgage Payoff Calculator',description,
      featureList:['Estimate a mortgage payoff date','Model extra principal payments','Estimate remaining interest'],
    }),component:()=> <CalculatorPage eyebrow="Texas Mortgage Planning" title="Texas Mortgage Payoff Calculator" description={description}><MortgagePayoffCalculator/></CalculatorPage>});
