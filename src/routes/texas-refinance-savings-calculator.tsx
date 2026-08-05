import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { RefinanceCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Compare an existing Texas mortgage with a proposed refinance using monthly savings and break-even timing.';
export const Route=createFileRoute('/texas-refinance-savings-calculator')({head:()=>({meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/texas-refinance-savings-calculator',
      title:'Texas Refinance Savings Calculator',description}),
    links: [canonicalLink(texasDefinedBrand, '/texas-refinance-savings-calculator')]}),component:()=> <CalculatorPage eyebrow="Texas Mortgage Planning" title="Texas Refinance Savings Calculator" description={description}><RefinanceCalculator/></CalculatorPage>});
