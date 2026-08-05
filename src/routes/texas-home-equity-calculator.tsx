import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { HomeEquityCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';
const description='Estimate current Texas home equity, combined loan-to-value, and illustrative available equity.';
export const Route=createFileRoute('/texas-home-equity-calculator')({head:()=>buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-home-equity-calculator',
      title:'Texas Home Equity Calculator',description,
      featureList:['Estimate current home equity','Estimate combined loan-to-value','Estimate illustrative available equity'],
    }),component:()=> <CalculatorPage eyebrow="Texas Homeownership" title="Texas Home Equity Calculator" description={description}><HomeEquityCalculator/></CalculatorPage>});
