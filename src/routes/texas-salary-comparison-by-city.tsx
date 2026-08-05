import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { SalaryComparisonCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';
const description='Compare an existing salary with an illustrative equivalent salary in a Texas city using cost-of-living indexes.';
export const Route=createFileRoute('/texas-salary-comparison-by-city')({head:()=>buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-salary-comparison-by-city',
      title:'Texas Salary Comparison by City',description,
      featureList:['Compare an existing salary','Estimate an illustrative equivalent salary','Use Texas city cost-of-living indexes'],
    }),component:()=> <CalculatorPage eyebrow="Texas Relocation Planning" title="Texas Salary Comparison by City" description={description}><SalaryComparisonCalculator/></CalculatorPage>});
