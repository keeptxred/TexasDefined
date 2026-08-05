import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { SalaryComparisonCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Compare an existing salary with an illustrative equivalent salary in a Texas city using cost-of-living indexes.';
export const Route=createFileRoute('/texas-salary-comparison-by-city')({head:()=>({meta:buildMeta(texasDefinedBrand,{title:'Texas Salary Comparison by City',description}),links:[canonicalLink(texasDefinedBrand,'/texas-salary-comparison-by-city')]}),component:()=> <CalculatorPage eyebrow="Texas Relocation Planning" title="Texas Salary Comparison by City" description={description}><SalaryComparisonCalculator/></CalculatorPage>});
