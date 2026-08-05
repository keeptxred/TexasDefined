import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { RentVsBuyCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';
const description='Compare simplified long-term renting and buying costs for a Texas household.';
export const Route=createFileRoute('/texas-rent-vs-buy-calculator')({head:()=>buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-rent-vs-buy-calculator',
      title:'Texas Rent vs Buy Calculator',description,
      featureList:['Compare simplified renting and buying costs','Model a Texas household decision','Compare long-term housing costs'],
    }),component:()=> <CalculatorPage eyebrow="Texas housing decision" title="Texas Rent vs Buy Calculator" description={description}><RentVsBuyCalculator /></CalculatorPage>});
