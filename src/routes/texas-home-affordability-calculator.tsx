import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { AffordabilityCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Estimate an illustrative Texas home-price range from income, debt, down payment, rate, taxes and insurance.';
export const Route=createFileRoute('/texas-home-affordability-calculator')({head:()=>({meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/texas-home-affordability-calculator',
      title:'Texas Home Affordability Calculator',description}),
    links: [canonicalLink(texasDefinedBrand, '/texas-home-affordability-calculator')]}),component:()=> <CalculatorPage eyebrow="Texas home planning" title="Texas Home Affordability Calculator" description={description}><AffordabilityCalculator /></CalculatorPage>});
