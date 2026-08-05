import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { HomeEquityGrowthCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';
const description='Project Texas home value, mortgage balance, and equity growth using appreciation and principal-paydown assumptions.';
export const Route=createFileRoute('/texas-home-equity-growth-calculator')({head:()=>buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-home-equity-growth-calculator',
      title:'Texas Home Equity Growth Calculator',description,
      featureList:['Project home value','Project mortgage balance','Estimate equity growth','Adjust appreciation and principal-paydown assumptions'],
    }),component:()=> <CalculatorPage eyebrow="Texas Homeownership" title="Texas Home Equity Growth Calculator" description={description}><HomeEquityGrowthCalculator/></CalculatorPage>});
