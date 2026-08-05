import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { MortgageCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';
const description='Estimate a Texas mortgage payment with principal, interest, property taxes and homeowners insurance.';
export const Route=createFileRoute('/texas-mortgage-calculator')({head:()=>buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-mortgage-calculator',
      title:'Texas Mortgage Calculator',description,
      featureList:['Estimate principal and interest','Include Texas property taxes','Include homeowners insurance','Compare monthly housing costs'],
    }),component:()=> <CalculatorPage eyebrow="Texas home planning" title="Texas Mortgage Calculator" description={description}><MortgageCalculator /></CalculatorPage>});
