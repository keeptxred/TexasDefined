import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { HomeInsuranceCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';
const description='Estimate an illustrative Texas homeowners-insurance premium from replacement cost, base rate and optional wind or flood additions.';
export const Route=createFileRoute('/texas-home-insurance-calculator')({head:()=>buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-home-insurance-calculator',
      title:'Texas Home Insurance Calculator',description,
      featureList:['Estimate an illustrative homeowners-insurance premium','Use replacement cost and a base rate','Add optional wind costs','Add optional flood costs'],
    }),component:()=> <CalculatorPage eyebrow="Texas home planning" title="Texas Home Insurance Calculator" description={description}><HomeInsuranceCalculator /></CalculatorPage>});
