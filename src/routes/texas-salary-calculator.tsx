import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { SalaryCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';
const description='Estimate Texas take-home pay after adjustable federal, payroll, benefit and other deductions.';
export const Route=createFileRoute('/texas-salary-calculator')({head:()=>buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-salary-calculator',
      title:'Texas Salary Calculator',description,
      featureList:['Estimate take-home pay','Adjust federal and payroll deductions','Include benefit deductions','Include other deductions'],
    }),component:()=> <CalculatorPage eyebrow="Texas income planning" title="Texas Salary Calculator" description={description}><SalaryCalculator /></CalculatorPage>});
