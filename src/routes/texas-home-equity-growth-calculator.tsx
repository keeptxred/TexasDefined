import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { HomeEquityGrowthCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Project Texas home value, mortgage balance, and equity growth using appreciation and principal-paydown assumptions.';
export const Route=createFileRoute('/texas-home-equity-growth-calculator')({head:()=>({meta:buildMeta(texasDefinedBrand,{title:'Texas Home Equity Growth Calculator',description}),links:[canonicalLink(texasDefinedBrand,'/texas-home-equity-growth-calculator')]}),component:()=> <CalculatorPage eyebrow="Texas Homeownership" title="Texas Home Equity Growth Calculator" description={description}><HomeEquityGrowthCalculator/></CalculatorPage>});
