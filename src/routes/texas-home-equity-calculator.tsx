import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { HomeEquityCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Estimate current Texas home equity, combined loan-to-value, and illustrative available equity.';
export const Route=createFileRoute('/texas-home-equity-calculator')({head:()=>({meta:buildMeta(texasDefinedBrand,{title:'Texas Home Equity Calculator',description}),links:[canonicalLink(texasDefinedBrand,'/texas-home-equity-calculator')]}),component:()=> <CalculatorPage eyebrow="Texas Homeownership" title="Texas Home Equity Calculator" description={description}><HomeEquityCalculator/></CalculatorPage>});
