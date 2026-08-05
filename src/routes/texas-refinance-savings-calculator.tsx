import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { RefinanceCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';
const description='Compare an existing Texas mortgage with a proposed refinance using monthly savings and break-even timing.';
export const Route=createFileRoute('/texas-refinance-savings-calculator')({head:()=>buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-refinance-savings-calculator',
      title:'Texas Refinance Savings Calculator',description,
      featureList:['Compare an existing mortgage with a proposed refinance','Estimate monthly savings','Estimate break-even timing'],
    }),component:()=> <CalculatorPage eyebrow="Texas Mortgage Planning" title="Texas Refinance Savings Calculator" description={description}><RefinanceCalculator/></CalculatorPage>});
