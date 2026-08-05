import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { UtilityCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Estimate monthly and annual Texas electricity, water, gas, internet and waste-service costs.';
export const Route=createFileRoute('/texas-utility-cost-calculator')({head:()=>({meta:buildMeta(texasDefinedBrand,{title:'Texas Utility Cost Calculator',description}),links:[canonicalLink(texasDefinedBrand,'/texas-utility-cost-calculator')]}),component:()=> <CalculatorPage eyebrow="Texas household planning" title="Texas Utility Cost Calculator" description={description}><UtilityCalculator /></CalculatorPage>});
