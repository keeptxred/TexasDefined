import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { MortgageCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Estimate a Texas mortgage payment with principal, interest, property taxes and homeowners insurance.';
export const Route=createFileRoute('/texas-mortgage-calculator')({head:()=>({meta:buildMeta(texasDefinedBrand,{title:'Texas Mortgage Calculator',description}),links:[canonicalLink(texasDefinedBrand,'/texas-mortgage-calculator')]}),component:()=> <CalculatorPage eyebrow="Texas home planning" title="Texas Mortgage Calculator" description={description}><MortgageCalculator /></CalculatorPage>});
