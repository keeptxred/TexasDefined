import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { ClosingCostCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Estimate illustrative Texas buyer and seller closing costs, credits, and seller proceeds before mortgage payoff.';
export const Route=createFileRoute('/texas-closing-cost-calculator')({head:()=>({meta:buildMeta(texasDefinedBrand,{title:'Texas Closing Cost Calculator',description}),links:[canonicalLink(texasDefinedBrand,'/texas-closing-cost-calculator')]}),component:()=> <CalculatorPage eyebrow="Texas Real Estate" title="Texas Closing Cost Calculator" description={description}><ClosingCostCalculator/></CalculatorPage>});
