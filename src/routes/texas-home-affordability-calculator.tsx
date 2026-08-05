import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { AffordabilityCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';
const description='Estimate an illustrative Texas home-price range from income, debt, down payment, rate, taxes and insurance.';
export const Route=createFileRoute('/texas-home-affordability-calculator')({head:()=>buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-home-affordability-calculator',
      title:'Texas Home Affordability Calculator',description,
      featureList:['Estimate an illustrative home-price range','Account for income and monthly debt','Include down payment and interest rate','Include Texas taxes and insurance'],
    }),component:()=> <CalculatorPage eyebrow="Texas home planning" title="Texas Home Affordability Calculator" description={description}><AffordabilityCalculator /></CalculatorPage>});
