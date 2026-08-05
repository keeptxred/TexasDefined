import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { BudgetCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';
const description='Build a simple Texas household budget using take-home income, housing, transportation, food, utilities, debt, and savings.';
export const Route=createFileRoute('/texas-budget-planner')({head:()=>buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-budget-planner',
      title:'Texas Budget Planner',description,
      featureList:['Build a household budget','Account for take-home income','Plan housing, transportation, food and utilities','Include debt payments and savings'],
    }),component:()=> <CalculatorPage eyebrow="Texas Household Planning" title="Texas Budget Planner" description={description}><BudgetCalculator/></CalculatorPage>});
