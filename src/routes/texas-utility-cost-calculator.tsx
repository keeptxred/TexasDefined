import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { UtilityCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';
const description='Estimate monthly and annual Texas electricity, water, gas, internet and waste-service costs.';
export const Route=createFileRoute('/texas-utility-cost-calculator')({head:()=>buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-utility-cost-calculator',
      title:'Texas Utility Cost Calculator',description,
      featureList:['Estimate electricity costs','Estimate water and gas costs','Estimate internet and waste-service costs','Compare monthly and annual utility totals'],
    }),component:()=> <CalculatorPage eyebrow="Texas household planning" title="Texas Utility Cost Calculator" description={description}><UtilityCalculator /></CalculatorPage>});
