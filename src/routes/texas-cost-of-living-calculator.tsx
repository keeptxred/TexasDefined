import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { CostOfLivingCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Translate current household spending into a Texas-area estimate using adjustable cost-of-living indexes.';
export const Route=createFileRoute('/texas-cost-of-living-calculator')({head:()=>({meta:buildMeta(texasDefinedBrand,{title:'Texas Cost of Living Calculator',description}),links:[canonicalLink(texasDefinedBrand,'/texas-cost-of-living-calculator')]}),component:()=> <CalculatorPage eyebrow="Texas relocation planning" title="Texas Cost of Living Calculator" description={description}><CostOfLivingCalculator /></CalculatorPage>});
