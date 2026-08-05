import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { HomeInsuranceCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Estimate an illustrative Texas homeowners-insurance premium from replacement cost, base rate and optional wind or flood additions.';
export const Route=createFileRoute('/texas-home-insurance-calculator')({head:()=>({meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/texas-home-insurance-calculator',
      title:'Texas Home Insurance Calculator',description}),
    links: [canonicalLink(texasDefinedBrand, '/texas-home-insurance-calculator')]}),component:()=> <CalculatorPage eyebrow="Texas home planning" title="Texas Home Insurance Calculator" description={description}><HomeInsuranceCalculator /></CalculatorPage>});
