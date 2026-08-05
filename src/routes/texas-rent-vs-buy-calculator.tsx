import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { RentVsBuyCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Compare simplified long-term renting and buying costs for a Texas household.';
export const Route=createFileRoute('/texas-rent-vs-buy-calculator')({head:()=>({meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/texas-rent-vs-buy-calculator',
      title:'Texas Rent vs Buy Calculator',description}),
    links: [canonicalLink(texasDefinedBrand, '/texas-rent-vs-buy-calculator')]}),component:()=> <CalculatorPage eyebrow="Texas housing decision" title="Texas Rent vs Buy Calculator" description={description}><RentVsBuyCalculator /></CalculatorPage>});
