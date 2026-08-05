import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { SalaryCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Estimate Texas take-home pay after adjustable federal, payroll, benefit and other deductions.';
export const Route=createFileRoute('/texas-salary-calculator')({head:()=>({meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/texas-salary-calculator',
      title:'Texas Salary Calculator',description}),
    links: [canonicalLink(texasDefinedBrand, '/texas-salary-calculator')]}),component:()=> <CalculatorPage eyebrow="Texas income planning" title="Texas Salary Calculator" description={description}><SalaryCalculator /></CalculatorPage>});
