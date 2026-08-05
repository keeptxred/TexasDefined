import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { CostOfLivingCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';
const description='Translate current household spending into a Texas-area estimate using adjustable cost-of-living indexes.';
export const Route=createFileRoute('/texas-cost-of-living-calculator')({head:()=>buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-cost-of-living-calculator',
      title:'Texas Cost of Living Calculator',description,
      featureList:['Translate current household spending','Use adjustable cost-of-living indexes','Estimate a Texas-area household budget'],
    }),component:()=> <CalculatorPage eyebrow="Texas relocation planning" title="Texas Cost of Living Calculator" description={description}><CostOfLivingCalculator /></CalculatorPage>});
