import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { MovingCostCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Estimate transportation, packing, travel, deposits and a contingency reserve for a move to Texas.';
export const Route=createFileRoute('/texas-moving-cost-calculator')({head:()=>({meta:buildMeta(texasDefinedBrand,{title:'Texas Moving Cost Calculator',description}),links:[canonicalLink(texasDefinedBrand,'/texas-moving-cost-calculator')]}),component:()=> <CalculatorPage eyebrow="Texas relocation planning" title="Texas Moving Cost Calculator" description={description}><MovingCostCalculator /></CalculatorPage>});
