import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { HomeownershipCostCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Estimate the full monthly and annual cost of Texas homeownership, including mortgage, taxes, insurance, maintenance, HOA fees, and utilities.';
export const Route=createFileRoute('/texas-homeownership-cost-calculator')({head:()=>({meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/texas-homeownership-cost-calculator',
      title:'Texas Homeownership Cost Calculator',description}),
    links: [canonicalLink(texasDefinedBrand, '/texas-homeownership-cost-calculator')]}),component:()=> <CalculatorPage eyebrow="Texas Homeownership" title="Texas Homeownership Cost Calculator" description={description}><HomeownershipCostCalculator/></CalculatorPage>});
