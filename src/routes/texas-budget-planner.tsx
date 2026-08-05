import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { BudgetCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Build a simple Texas household budget using take-home income, housing, transportation, food, utilities, debt, and savings.';
export const Route=createFileRoute('/texas-budget-planner')({head:()=>({meta:buildMeta(texasDefinedBrand,{title:'Texas Budget Planner',description}),links:[canonicalLink(texasDefinedBrand,'/texas-budget-planner')]}),component:()=> <CalculatorPage eyebrow="Texas Household Planning" title="Texas Budget Planner" description={description}><BudgetCalculator/></CalculatorPage>});
