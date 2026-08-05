import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { ClosingCostCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';
const description='Estimate illustrative Texas buyer and seller closing costs, credits, and seller proceeds before mortgage payoff.';
export const Route=createFileRoute('/texas-closing-cost-calculator')({head:()=>buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-closing-cost-calculator',
      title:'Texas Closing Cost Calculator',description,
      featureList:['Estimate illustrative buyer closing costs','Estimate illustrative seller closing costs','Account for credits','Estimate seller proceeds before mortgage payoff'],
    }),component:()=> <CalculatorPage eyebrow="Texas Real Estate" title="Texas Closing Cost Calculator" description={description}><ClosingCostCalculator/></CalculatorPage>});
