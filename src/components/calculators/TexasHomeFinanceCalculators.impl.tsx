import { useMemo, useState } from 'react';

import {
  AdvancedInputs,
  CurrencyInput,
  FinancialCalculatorScaffold,
  FinancialInput,
  PercentageInput,
  formatCalculatorMoney,
  readCalculatorUrlState,
} from '@/components/calculators/FinancialCalculatorUI';
import { estimateClosingCosts } from '@/lib/financial/closingCosts';
import { estimateHomeownership } from '@/lib/financial/homeownership';
import {
  estimateBudget,
  estimateDownPayment,
  estimateDownPaymentAssistance,
  estimateHomeEquity,
  estimateHomeEquityGrowth,
  estimateMortgagePayoff,
  estimateRefinance,
  estimateSalaryComparison,
} from '@/lib/financial/household';

const money = formatCalculatorMoney;

export function DownPaymentCalculator() {
  const defaults = { price: 400000, percent: 20, closing: 3, reserve: 10000 };
  const [state, setState] = useState(() => readCalculatorUrlState(defaults));
  const set = (key: keyof typeof state, value: number) => setState((current) => ({ ...current, [key]: value }));
  const r = useMemo(() => estimateDownPayment({ homePrice: state.price, downPaymentPercent: state.percent, closingCostPercent: state.closing, reserve: state.reserve }), [state]);
  return <FinancialCalculatorScaffold storageKey="texasdefined:down-payment-calculator" state={state} defaults={defaults} onRestore={setState}
    note="Your final cash needed may also include lender credits, prepaid taxes and insurance, earnest money and program rules."
    issues={r.issues}
    results={[{ label: 'Estimated cash needed', value: money(r.cashNeeded), emphasis: true }, { label: 'Down payment', value: money(r.downPayment) }, { label: 'Closing costs', value: money(r.closingCosts) }, { label: 'Estimated loan', value: money(r.loanAmount) }]}
    summary={{ 'Cash needed': money(r.cashNeeded), 'Down payment': money(r.downPayment), 'Loan amount': money(r.loanAmount) }}
    breakdown={[{ label: 'Down payment', value: r.downPayment }, { label: 'Closing costs', value: r.closingCosts }, { label: 'Emergency cushion', value: state.reserve }]}
    methodology={{ formula: 'Cash needed equals down payment plus estimated closing costs plus the reserve you choose to keep available.', assumptions: ['Down payment and closing costs are percentages of home price.', 'Prepaids, credits and program-specific requirements may change final cash to close.'] }}>
    <CurrencyInput label="Home price" value={state.price} onChange={(v) => set('price', v)} step={1000}/>
    <PercentageInput label="Down payment" value={state.percent} onChange={(v) => set('percent', v)} step={0.5} max={100}/>
    <PercentageInput label="Closing costs" value={state.closing} onChange={(v) => set('closing', v)} step={0.1} max={20}/>
    <CurrencyInput label="Emergency cushion" value={state.reserve} onChange={(v) => set('reserve', v)} step={500}/>
  </FinancialCalculatorScaffold>;
}

export function ClosingCostCalculator() {
  const defaults = { price: 400000, buyer: 3, seller: 7, credits: 0, prepaids: 0 };
  const [state, setState] = useState(() => readCalculatorUrlState(defaults));
  const set = (key: keyof typeof state, value: number) => setState((current) => ({ ...current, [key]: value }));
  const r = useMemo(() => estimateClosingCosts({ salePrice: state.price, buyerCostPercent: state.buyer, sellerCostPercent: state.seller, sellerCredits: state.credits, buyerPrepaids: state.prepaids }), [state]);
  return <FinancialCalculatorScaffold storageKey="texasdefined:closing-cost-calculator" state={state} defaults={defaults} onRestore={setState}
    note="Title, lender, survey, appraisal, prepaid bills, negotiated credits and agent charges vary by sale and contract."
    issues={r.issues}
    results={[{ label: 'Buyer costs after credits', value: money(r.buyerCostsAfterCredits), emphasis: true }, { label: 'Buyer costs before credits', value: money(r.buyerCostsBeforeCredits) }, { label: 'Seller costs including credits', value: money(r.sellerCosts) }, { label: 'Seller amount before loan payoff', value: money(r.sellerNetBeforeLoanPayoff) }]}
    summary={{ 'Buyer after credits': money(r.buyerCostsAfterCredits), 'Seller costs': money(r.sellerCosts), 'Sale price': money(state.price) }}
    methodology={{ formula: 'Buyer and seller planning costs are calculated separately from the sale price. Seller credits reduce eligible buyer costs and increase seller outflow.', assumptions: ['Percentage inputs are planning assumptions, not a settlement statement.', 'Prepaids are modeled separately from percentage closing-cost estimates.'] }}>
    <CurrencyInput label="Sale price" value={state.price} onChange={(v) => set('price', v)} step={1000}/>
    <PercentageInput label="Buyer cost estimate" value={state.buyer} onChange={(v) => set('buyer', v)} step={0.1} max={20}/>
    <PercentageInput label="Seller cost estimate" value={state.seller} onChange={(v) => set('seller', v)} step={0.1} max={20}/>
    <CurrencyInput label="Seller credits for the buyer" value={state.credits} onChange={(v) => set('credits', v)} step={500}/>
    <CurrencyInput label="Buyer prepaids / escrow setup" value={state.prepaids} onChange={(v) => set('prepaids', v)} step={500}/>
  </FinancialCalculatorScaffold>;
}

export function HomeEquityCalculator() {
  const defaults = { value: 500000, balance: 280000, maxLtv: 80 };
  const [state, setState] = useState(() => readCalculatorUrlState(defaults));
  const set = (key: keyof typeof state, value: number) => setState((current) => ({ ...current, [key]: value }));
  const r = useMemo(() => estimateHomeEquity({ homeValue: state.value, loanBalance: state.balance, maxLtvPercent: state.maxLtv }), [state]);
  return <FinancialCalculatorScaffold storageKey="texasdefined:home-equity-calculator" state={state} defaults={defaults} onRestore={setState}
    note="What you can actually borrow depends on lender approval, Texas homestead rules, other loans tied to the home, closing costs and product limits."
    issues={r.issues}
    results={[{ label: 'Current equity', value: money(r.equity), emphasis: true }, { label: 'Share of home value still owed', value: r.ltvPercent.toFixed(1) + '%' }, { label: 'Possible equity available to borrow', value: money(r.availableEquity) }]}
    summary={{ 'Current equity': money(r.equity), 'LTV': r.ltvPercent.toFixed(1) + '%', 'Possible available equity': money(r.availableEquity) }}
    methodology={{ formula: 'Current equity is home value minus debt. Possible available equity is the selected maximum loan-to-value amount minus current debt.', assumptions: ['This does not determine legal or lender eligibility.', 'Home value and loan balance should be updated with the best current information available.'] }}>
    <CurrencyInput label="Estimated home value" value={state.value} onChange={(v) => set('value', v)} step={1000}/>
    <CurrencyInput label="Total owed on the home" value={state.balance} onChange={(v) => set('balance', v)} step={1000}/>
    <PercentageInput label="Maximum share of home value that can be owed" value={state.maxLtv} onChange={(v) => set('maxLtv', v)} step={1} max={100}/>
  </FinancialCalculatorScaffold>;
}

export function HomeEquityGrowthCalculator() {
  const defaults = { value: 400000, balance: 320000, appreciation: 3, annualPaydown: 6000, years: 10 };
  const [state, setState] = useState(() => readCalculatorUrlState(defaults));
  const set = (key: keyof typeof state, value: number) => setState((current) => ({ ...current, [key]: value }));
  const r = useMemo(() => estimateHomeEquityGrowth({ homeValue: state.value, loanBalance: state.balance, annualAppreciationPercent: state.appreciation, annualPaydown: state.annualPaydown, years: state.years }), [state]);
  return <FinancialCalculatorScaffold storageKey="texasdefined:home-equity-growth-calculator" state={state} defaults={defaults} onRestore={setState}
    note="Home values and loan balances can change. This quick estimate uses an annual paydown input rather than your exact amortization schedule and does not include selling costs."
    issues={r.issues}
    results={[{ label: 'Estimated equity', value: money(r.futureEquity), emphasis: true }, { label: 'Future home value', value: money(r.futureHomeValue) }, { label: 'Estimated loan balance', value: money(r.futureLoanBalance) }, { label: 'Equity gained', value: money(r.equityGained) }]}
    summary={{ 'Future equity': money(r.futureEquity), 'Equity gained': money(r.equityGained), 'Years': String(state.years) }}
    methodology={{ formula: 'Home value compounds at the entered annual appreciation rate while the loan balance falls by the entered annual paydown amount.', assumptions: ['This is a simplified planning model, not an exact mortgage amortization schedule.', 'Future appreciation is uncertain.'] }}>
    <CurrencyInput label="Current home value" value={state.value} onChange={(v) => set('value', v)} step={1000}/>
    <CurrencyInput label="Current loan balance" value={state.balance} onChange={(v) => set('balance', v)} step={1000}/>
    <PercentageInput label="Expected yearly home-value growth" value={state.appreciation} onChange={(v) => set('appreciation', v)} step={0.1}/>
    <CurrencyInput label="Loan balance paid down each year" value={state.annualPaydown} onChange={(v) => set('annualPaydown', v)} step={500}/>
    <FinancialInput label="Years ahead" value={state.years} onChange={(v) => set('years', v)} suffix="years" min={0} max={50}/>
  </FinancialCalculatorScaffold>;
}

export function MortgagePayoffCalculator() {
  const defaults = { balance: 300000, rate: 6.5, payment: 2000, extra: 300 };
  const [state, setState] = useState(() => readCalculatorUrlState(defaults));
  const set = (key: keyof typeof state, value: number) => setState((current) => ({ ...current, [key]: value }));
  const r = useMemo(() => estimateMortgagePayoff({ loanBalance: state.balance, annualInterestRate: state.rate, regularPayment: state.payment, extraPayment: state.extra }), [state]);
  const payoff = Number.isFinite(r.payoffMonths) ? Math.floor(r.payoffMonths / 12) + ' yr ' + (r.payoffMonths % 12) + ' mo' : 'Payment too low';
  return <FinancialCalculatorScaffold storageKey="texasdefined:mortgage-payoff-calculator" state={state} defaults={defaults} onRestore={setState}
    note="Taxes and insurance are not included. Check for early-payoff restrictions and make sure extra money is applied directly to principal."
    issues={r.issues}
    results={[{ label: 'Estimated payoff', value: payoff, emphasis: true }, { label: 'Estimated interest still to pay', value: Number.isFinite(r.interestPaid) ? money(r.interestPaid) : 'Payment too low' }, { label: 'Total monthly principal/interest payment', value: money(state.payment + state.extra) }]}
    summary={{ 'Estimated payoff': payoff, 'Interest remaining': Number.isFinite(r.interestPaid) ? money(r.interestPaid) : 'Payment too low' }}
    methodology={{ formula: 'Each month the model adds interest to the remaining balance and subtracts the regular plus extra payment until the loan reaches zero.', assumptions: ['The interest rate remains fixed.', 'Taxes, insurance and servicing changes are outside this payoff model.'] }}>
    <CurrencyInput label="Loan balance" value={state.balance} onChange={(v) => set('balance', v)} step={1000}/>
    <PercentageInput label="Interest rate" value={state.rate} onChange={(v) => set('rate', v)} step={0.01} max={30}/>
    <CurrencyInput label="Regular loan payment" value={state.payment} onChange={(v) => set('payment', v)} step={50}/>
    <CurrencyInput label="Extra amount paid each month" value={state.extra} onChange={(v) => set('extra', v)} step={50}/>
  </FinancialCalculatorScaffold>;
}

export function RefinanceCalculator() {
  const defaults = { balance: 300000, oldRate: 7, newRate: 6, years: 30, costs: 7000 };
  const [state, setState] = useState(() => readCalculatorUrlState(defaults));
  const set = (key: keyof typeof state, value: number) => setState((current) => ({ ...current, [key]: value }));
  const r = useMemo(() => estimateRefinance({ loanBalance: state.balance, currentRate: state.oldRate, newRate: state.newRate, newTermYears: state.years, refinanceCosts: state.costs }), [state]);
  const breakEven = Number.isFinite(r.breakEvenMonths) ? Math.ceil(r.breakEvenMonths) + ' months' : 'No monthly savings';
  return <FinancialCalculatorScaffold storageKey="texasdefined:refinance-calculator" state={state} defaults={defaults} onRestore={setState}
    note="Compare total loan cost, a restarted term, cash needed at closing, taxes, insurance and mortgage insurance—not just the monthly payment."
    issues={r.issues}
    results={[{ label: 'Monthly savings', value: money(r.monthlySavings), emphasis: true }, { label: 'Current payment', value: money(r.currentPayment) + '/mo' }, { label: 'New payment', value: money(r.newPayment) + '/mo' }, { label: 'Months until savings cover refinance cost', value: breakEven }]}
    summary={{ 'Monthly savings': money(r.monthlySavings), 'Break-even': breakEven, 'New payment': money(r.newPayment) + '/mo' }}
    methodology={{ formula: 'Both current and proposed payments use the same canonical fixed-rate mortgage engine. Break-even divides refinance costs by positive monthly payment savings.', assumptions: ['The comparison uses the same entered remaining balance and selected new term for payment comparison.', 'Taxes, insurance, mortgage insurance and changes in loan term economics must be reviewed separately.'] }}>
    <CurrencyInput label="Loan balance" value={state.balance} onChange={(v) => set('balance', v)} step={1000}/>
    <PercentageInput label="Current rate" value={state.oldRate} onChange={(v) => set('oldRate', v)} step={0.01} max={30}/>
    <PercentageInput label="New rate" value={state.newRate} onChange={(v) => set('newRate', v)} step={0.01} max={30}/>
    <FinancialInput label="New loan length" value={state.years} onChange={(v) => set('years', v)} suffix="years" min={1} max={50}/>
    <CurrencyInput label="Refinance costs" value={state.costs} onChange={(v) => set('costs', v)} step={500}/>
  </FinancialCalculatorScaffold>;
}

export function HomeownershipCostCalculator() {
  const defaults = { mortgage: 2400, taxes: 700, insurance: 250, mortgageInsurance: 0, hoa: 100, specialDistrict: 0, maintenance: 400, utilities: 350, poolLandscape: 0 };
  const [state, setState] = useState(() => readCalculatorUrlState(defaults));
  const set = (key: keyof typeof state, value: number) => setState((current) => ({ ...current, [key]: value }));
  const r = useMemo(() => estimateHomeownership({ mortgagePrincipalInterest: state.mortgage, propertyTaxes: state.taxes, homeownersInsurance: state.insurance, mortgageInsurance: state.mortgageInsurance, hoaFees: state.hoa, specialDistrictCosts: state.specialDistrict, maintenance: state.maintenance, utilities: state.utilities, poolLandscape: state.poolLandscape }), [state]);
  return <FinancialCalculatorScaffold storageKey="texasdefined:homeownership-basic" state={state} defaults={defaults} onRestore={setState}
    note="Add special assessments, local district charges, flood or wind coverage, repairs and larger home projects when they apply."
    issues={r.issues}
    results={[{ label: 'Monthly ownership cost', value: money(r.monthlyOwnership), emphasis: true }, { label: 'Annual ownership cost', value: money(r.annualOwnership) }, { label: 'Housing payment before maintenance/utilities', value: money(r.monthlyHousing) }]}
    summary={{ 'Monthly ownership': money(r.monthlyOwnership), 'Annual ownership': money(r.annualOwnership) }}
    breakdown={r.breakdown}
    methodology={{ formula: 'The shared homeownership engine totals recurring financing, tax, insurance, association, district, maintenance, utility and optional pool/landscape inputs.', assumptions: ['All inputs are monthly planning amounts.', 'One-time repairs and capital projects are not automatically included.'] }}>
    <CurrencyInput label="Mortgage" value={state.mortgage} onChange={(v) => set('mortgage', v)}/>
    <CurrencyInput label="Property taxes" value={state.taxes} onChange={(v) => set('taxes', v)}/>
    <CurrencyInput label="Insurance" value={state.insurance} onChange={(v) => set('insurance', v)}/>
    <CurrencyInput label="HOA and other fees" value={state.hoa} onChange={(v) => set('hoa', v)}/>
    <CurrencyInput label="Maintenance cushion" value={state.maintenance} onChange={(v) => set('maintenance', v)}/>
    <CurrencyInput label="Utilities" value={state.utilities} onChange={(v) => set('utilities', v)}/>
    <div className="sm:col-span-2 lg:col-span-3"><AdvancedInputs>
      <CurrencyInput label="Mortgage insurance / PMI" value={state.mortgageInsurance} onChange={(v) => set('mortgageInsurance', v)}/>
      <CurrencyInput label="MUD/PID/special-district costs" value={state.specialDistrict} onChange={(v) => set('specialDistrict', v)}/>
      <CurrencyInput label="Pool / landscaping" value={state.poolLandscape} onChange={(v) => set('poolLandscape', v)}/>
    </AdvancedInputs></div>
  </FinancialCalculatorScaffold>;
}

export function BudgetCalculator() {
  const defaults = { income: 7000, housing: 2400, transport: 900, food: 900, utilities: 450, debt: 600, savings: 700 };
  const [state, setState] = useState(() => readCalculatorUrlState(defaults));
  const set = (key: keyof typeof state, value: number) => setState((current) => ({ ...current, [key]: value }));
  const r = useMemo(() => estimateBudget({ monthlyIncome: state.income, housing: state.housing, transportation: state.transport, food: state.food, utilities: state.utilities, debt: state.debt, savings: state.savings }), [state]);
  return <FinancialCalculatorScaffold storageKey="texasdefined:budget-planner" state={state} defaults={defaults} onRestore={setState}
    note="Use your real take-home income and remember irregular bills, healthcare, childcare, insurance, taxes and annual expenses."
    issues={r.issues}
    results={[{ label: 'Left over', value: money(r.remaining), emphasis: true }, { label: 'Planned spending', value: money(r.plannedSpending) }, { label: 'Share of income going to savings', value: r.savingsRatePercent.toFixed(1) + '%' }]}
    summary={{ 'Left over': money(r.remaining), 'Planned spending': money(r.plannedSpending), 'Savings rate': r.savingsRatePercent.toFixed(1) + '%' }}
    breakdown={[{ label: 'Housing', value: state.housing }, { label: 'Transportation', value: state.transport }, { label: 'Food', value: state.food }, { label: 'Utilities', value: state.utilities }, { label: 'Debt payments', value: state.debt }, { label: 'Savings', value: state.savings }]}
    methodology={{ formula: 'The budget adds planned monthly spending categories and subtracts them from monthly take-home income.', assumptions: ['Savings is treated as a planned use of cash.', 'Irregular annual costs should be converted to a monthly allowance and added to the appropriate category.'] }}>
    <CurrencyInput label="Monthly take-home income" value={state.income} onChange={(v) => set('income', v)}/>
    <CurrencyInput label="Housing" value={state.housing} onChange={(v) => set('housing', v)}/>
    <CurrencyInput label="Transportation" value={state.transport} onChange={(v) => set('transport', v)}/>
    <CurrencyInput label="Food" value={state.food} onChange={(v) => set('food', v)}/>
    <CurrencyInput label="Utilities" value={state.utilities} onChange={(v) => set('utilities', v)}/>
    <CurrencyInput label="Debt payments" value={state.debt} onChange={(v) => set('debt', v)}/>
    <CurrencyInput label="Savings goal" value={state.savings} onChange={(v) => set('savings', v)}/>
  </FinancialCalculatorScaffold>;
}

export function DownPaymentAssistanceCalculator() {
  const defaults = { price: 300000, required: 3.5, assistance: 4, closing: 3, cash: 15000 };
  const [state, setState] = useState(() => readCalculatorUrlState(defaults));
  const set = (key: keyof typeof state, value: number) => setState((current) => ({ ...current, [key]: value }));
  const r = useMemo(() => estimateDownPaymentAssistance({ homePrice: state.price, requiredDownPercent: state.required, assistancePercent: state.assistance, closingCostPercent: state.closing, cashAvailable: state.cash }), [state]);
  return <FinancialCalculatorScaffold storageKey="texasdefined:down-payment-assistance-calculator" state={state} defaults={defaults} onRestore={setState}
    note="Programs can have income, credit, property, occupancy, lender, repayment and location requirements. This estimate cannot determine eligibility."
    issues={r.issues}
    results={[{ label: 'Remaining cash gap', value: money(r.remainingCashGap), emphasis: true }, { label: 'Required down payment', value: money(r.requiredDown) }, { label: 'Potential assistance', value: money(r.assistance) }, { label: 'Estimated closing costs', value: money(r.closingCosts) }, { label: 'Total cash needed', value: money(r.totalCashNeed) }]}
    summary={{ 'Remaining cash gap': money(r.remainingCashGap), 'Potential assistance': money(r.assistance), 'Total cash needed': money(r.totalCashNeed) }}
    methodology={{ formula: 'The model compares required down payment plus estimated closing costs against entered assistance and cash available.', assumptions: ['Assistance is modeled as a percentage of home price for planning only.', 'Program eligibility, repayability and lender rules are not determined here.'] }}>
    <CurrencyInput label="Home price" value={state.price} onChange={(v) => set('price', v)} step={1000}/>
    <PercentageInput label="Required down payment" value={state.required} onChange={(v) => set('required', v)} step={0.1} max={100}/>
    <PercentageInput label="Possible assistance" value={state.assistance} onChange={(v) => set('assistance', v)} step={0.1} max={100}/>
    <PercentageInput label="Closing costs" value={state.closing} onChange={(v) => set('closing', v)} step={0.1} max={20}/>
    <CurrencyInput label="Cash you have available" value={state.cash} onChange={(v) => set('cash', v)} step={500}/>
  </FinancialCalculatorScaffold>;
}

export function SalaryComparisonCalculator() {
  const defaults = { salary: 90000, currentIndex: 100, targetIndex: 92 };
  const [state, setState] = useState(() => readCalculatorUrlState(defaults));
  const set = (key: keyof typeof state, value: number) => setState((current) => ({ ...current, [key]: value }));
  const r = useMemo(() => estimateSalaryComparison({ salary: state.salary, currentIndex: state.currentIndex, targetIndex: state.targetIndex }), [state]);
  return <FinancialCalculatorScaffold storageKey="texasdefined:salary-comparison-calculator" state={state} defaults={defaults} onRestore={setState}
    note="Cost indexes are broad estimates and cannot capture taxes, benefits, housing choices, commutes, family size or personal spending."
    issues={r.issues}
    results={[{ label: 'Comparable target salary', value: money(r.comparableSalary), emphasis: true }, { label: 'Salary difference', value: money(r.salaryDifference) }, { label: 'Change in what your salary can buy', value: r.purchasingPowerChangePercent.toFixed(1) + '%' }]}
    summary={{ 'Comparable salary': money(r.comparableSalary), 'Salary difference': money(r.salaryDifference) }}
    methodology={{ formula: 'The salary comparison scales current salary by the ratio between target and current cost indexes.', assumptions: ['Cost indexes are broad comparison inputs.', 'Taxes, benefits and household-specific spending are not inferred.'] }}>
    <CurrencyInput label="Current salary" value={state.salary} onChange={(v) => set('salary', v)} step={1000}/>
    <FinancialInput label="Current city cost index" value={state.currentIndex} onChange={(v) => set('currentIndex', v)} step={0.1} min={1}/>
    <FinancialInput label="Target city cost index" value={state.targetIndex} onChange={(v) => set('targetIndex', v)} step={0.1} min={1}/>
  </FinancialCalculatorScaffold>;
}
