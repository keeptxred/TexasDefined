import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { MovingCostCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';
const description='Estimate transportation, packing, travel, deposits and a contingency reserve for a move to Texas.';
export const Route=createFileRoute('/texas-moving-cost-calculator')({head:()=>buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-moving-cost-calculator',
      title:'Texas Moving Cost Calculator',description,
      featureList:['Estimate transportation costs','Estimate packing and travel costs','Include deposits','Include a contingency reserve'],
    }),component:()=> <CalculatorPage eyebrow="Texas relocation planning" title="Texas Moving Cost Calculator" description={description}><MovingCostCalculator /></CalculatorPage>});
