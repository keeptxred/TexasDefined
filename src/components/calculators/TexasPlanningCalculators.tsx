import { useMemo, useState } from 'react';

import {
  AdvancedInputs,
  CurrencyInput,
  FinancialCalculatorScaffold,
  FinancialInput,
  FinancialSelect,
  PercentageInput,
  formatCalculatorMoney,
  readCalculatorUrlState,
} from '@/components/calculators/FinancialCalculatorUI';
import { estimateAffordability } from '@/lib/financial/affordability';
import { estimateHomeInsurance } from '@/lib/financial/insurance';
import { estimateMortgage, mortgageSensitivity } from '@/lib/financial/mortgage';
import { estimateUtilities } from '@/lib/financial/utilities';
import { estimateCostOfLiving, estimateMovingCost } from '@/lib/financial/household';
import { estimatePayroll2026, type FilingStatus } from '@/lib/financial/payroll';
import { readTexasPlanningScenario } from '@/lib/financial/planningScenario';
import { estimateRentVsBuy } from '@/lib/rent-vs-buy';

const money = formatCalculatorMoney;

export function MortgageCalculator() {
  const defaults = { price: 400000, down: 80000, rate: 6.5, years: 30, tax: 2.1, insurance: 2400, pmi: 0, hoa: 0, specialDistrict: 0, utilities: 350, maintenance: 400, extraPrincipal: 0 };
  const [state, setState] = useState(() => readCalculatorUrlState(defaults));
  const set = (key: keyof typeof state, value: number) => setState((current) => ({ ...current, [key]: value }));
  const input = useMemo(() => ({ homePrice: state.price, downPayment: state.down, annualInterestRate: state.rate, loanTermYears: state.years, annualPropertyTaxRate: state.tax, annualHomeInsurance: state.insurance, annualPmi: state.pmi, monthlyHoa: state.hoa, monthlySpecialDistrict: state.specialDistrict, monthlyUtilities: state.utilities, monthlyMaintenance: state.maintenance, extraPrincipal: state.extraPrincipal }), [state]);
  const result = useMemo(() => estimateMortgage(input), [input]);
  const sensitivity = useMemo(() => mortgageSensitivity(input), [input]);
  return <FinancialCalculatorScaffold storageKey="texasdefined:mortgage-scenario" state={state} defaults={defaults} onRestore={setState}
    note="Your real payment may also include lender-specific mortgage insurance, escrow adjustments, HOA dues, special-district charges and closing costs."
    issues={result.issues}
    results={[
      { label: 'Estimated monthly ownership cost', value: money(result.monthlyOwnershipCost) + '/mo', emphasis: true },
      { label: 'Loan amount', value: money(result.loanAmount) },
      { label: 'Principal & interest', value: money(result.monthlyPrincipalInterest) + '/mo' },
      { label: 'Property taxes', value: money(result.monthlyPropertyTax) + '/mo' },
      { label: 'Interest over modeled payoff', value: money(result.amortization.interestPaid) },
    ]}
    summary={{ 'Monthly ownership': money(result.monthlyOwnershipCost) + '/mo', 'Loan amount': money(result.loanAmount), 'Rate': state.rate.toFixed(2) + '%' }}
    breakdown={[
      { label: 'Principal & interest', value: result.monthlyPrincipalInterest },
      { label: 'Property taxes', value: result.monthlyPropertyTax },
      { label: 'Homeowners insurance', value: result.monthlyHomeInsurance },
      { label: 'Mortgage insurance', value: result.monthlyPmi },
      { label: 'HOA', value: result.monthlyHoa },
      { label: 'Special districts', value: result.monthlySpecialDistrict },
      { label: 'Utilities', value: result.monthlyUtilities },
      { label: 'Maintenance', value: result.monthlyMaintenance },
    ]}
    sensitivity={sensitivity}
    methodology={{ formula: 'Principal and interest use one shared fixed-rate amortization engine; recurring ownership costs are added separately.', assumptions: ['Interest is modeled as a fixed annual nominal rate.', 'Property tax is a planning estimate until parcel-specific taxable values and districts are verified.', 'Extra principal changes the payoff schedule but not taxes or insurance.'] }}>
    <CurrencyInput label="Home price" value={state.price} onChange={(v) => set('price', v)} step={1000}/>
    <CurrencyInput label="Down payment" value={state.down} onChange={(v) => set('down', v)} step={1000}/>
    <PercentageInput label="Interest rate" value={state.rate} onChange={(v) => set('rate', v)} step={0.01} max={30}/>
    <FinancialInput label="Loan term" value={state.years} onChange={(v) => set('years', v)} suffix="years" min={1} max={50}/>
    <div className="sm:col-span-2 lg:col-span-3"><AdvancedInputs>
      <PercentageInput label="Property-tax rate" value={state.tax} onChange={(v) => set('tax', v)} step={0.01} max={20}/>
      <CurrencyInput label="Annual insurance" value={state.insurance} onChange={(v) => set('insurance', v)} step={100}/>
      <CurrencyInput label="Annual mortgage insurance / PMI" value={state.pmi} onChange={(v) => set('pmi', v)} step={100}/>
      <CurrencyInput label="Monthly HOA" value={state.hoa} onChange={(v) => set('hoa', v)} step={25}/>
      <CurrencyInput label="Monthly special-district cost" value={state.specialDistrict} onChange={(v) => set('specialDistrict', v)} step={25}/>
      <CurrencyInput label="Monthly utilities" value={state.utilities} onChange={(v) => set('utilities', v)} step={25}/>
      <CurrencyInput label="Monthly maintenance" value={state.maintenance} onChange={(v) => set('maintenance', v)} step={25}/>
      <CurrencyInput label="Extra principal" value={state.extraPrincipal} onChange={(v) => set('extraPrincipal', v)} step={25}/>
    </AdvancedInputs></div>
  </FinancialCalculatorScaffold>;
}

export function AffordabilityCalculator() {
  const [defaults] = useState(() => {
    const plan = readTexasPlanningScenario();
    const homePrice = plan.homePrice ?? 400000;
    const monthlyTaxes = plan.annualPropertyTaxRate !== undefined ? homePrice * plan.annualPropertyTaxRate / 100 / 12 : 650;
    const monthlyInsurance = plan.annualHomeInsurance !== undefined ? plan.annualHomeInsurance / 12 : 250;
    return {
      income: plan.annualHouseholdIncome ?? 120000,
      debt: plan.monthlyNonHousingDebt ?? 800,
      down: plan.downPayment ?? 60000,
      rate: plan.annualInterestRate ?? 6.5,
      taxInsurance: monthlyTaxes + monthlyInsurance + (plan.monthlyHoa ?? 0) + (plan.monthlySpecialDistrict ?? 0),
      ratio: 28,
      years: plan.loanTermYears ?? 30,
    };
  });
  const [state, setState] = useState(() => readCalculatorUrlState(defaults));
  const set = (key: keyof typeof state, value: number) => setState((current) => ({ ...current, [key]: value }));
  const result = useMemo(() => estimateAffordability({ annualHouseholdIncome: state.income, monthlyNonHousingDebt: state.debt, downPayment: state.down, annualInterestRate: state.rate, monthlyTaxesInsuranceHoa: state.taxInsurance, targetHousingRatioPercent: state.ratio, loanTermYears: state.years }), [state]);
  return <FinancialCalculatorScaffold storageKey="texasdefined:affordability-calculator" state={state} defaults={defaults} onRestore={setState}
    note="Lenders use their own debt-to-income rules, credit standards, reserve requirements and loan-program limits. Treat the result as a scenario, not an approval target."
    issues={result.issues}
    results={[
      { label: 'Possible home price', value: money(result.possibleHomePrice), emphasis: true },
      { label: 'Gross monthly income', value: money(result.grossMonthlyIncome) },
      { label: 'Target housing budget', value: money(result.targetHousingBudget) + '/mo' },
      { label: 'P&I budget after recurring costs', value: money(result.principalInterestBudget) + '/mo' },
      { label: 'Possible loan amount', value: money(result.possibleLoanAmount) },
    ]}
    summary={{ 'Possible home price': money(result.possibleHomePrice), 'Housing budget': money(result.targetHousingBudget) + '/mo', 'Rate': state.rate.toFixed(2) + '%' }}
    sharedScenario={{ annualHouseholdIncome: state.income, monthlyNonHousingDebt: state.debt, downPayment: state.down, annualInterestRate: state.rate, loanTermYears: state.years }}
    methodology={{ formula: 'The calculator applies the selected housing-budget ratio to gross monthly income, subtracts recurring non-housing debt and housing costs, then converts the remaining principal-and-interest budget into a fixed-rate loan amount.', assumptions: ['Default target housing ratio is 28% but is editable.', 'Taxes, insurance and HOA are entered as one recurring monthly planning amount.', 'A lender may use different DTI, reserve, credit and program rules.'] }}>
    <CurrencyInput label="Annual household income" value={state.income} onChange={(v) => set('income', v)} step={1000}/>
    <CurrencyInput label="Monthly non-housing debt" value={state.debt} onChange={(v) => set('debt', v)} step={50}/>
    <CurrencyInput label="Available down payment" value={state.down} onChange={(v) => set('down', v)} step={1000}/>
    <PercentageInput label="Interest rate" value={state.rate} onChange={(v) => set('rate', v)} step={0.01} max={30}/>
    <CurrencyInput label="Monthly taxes & insurance" value={state.taxInsurance} onChange={(v) => set('taxInsurance', v)} step={50}/>
    <div className="sm:col-span-2 lg:col-span-3"><AdvancedInputs>
      <PercentageInput label="Target housing ratio" value={state.ratio} onChange={(v) => set('ratio', v)} step={0.5} max={60}/>
      <FinancialInput label="Loan term" value={state.years} onChange={(v) => set('years', v)} suffix="years" min={1} max={50}/>
    </AdvancedInputs></div>
  </FinancialCalculatorScaffold>;
}

export function RentVsBuyCalculator() {
  const [defaults] = useState(() => {
    const plan = readTexasPlanningScenario();
    return {
      rent: 2200,
      rentGrowth: 3,
      rentersInsurance: 25,
      price: plan.homePrice ?? 400000,
      down: plan.downPayment ?? 80000,
      mortgageRate: plan.annualInterestRate ?? 6.5,
      loanYears: plan.loanTermYears ?? 30,
      propertyTaxRate: plan.annualPropertyTaxRate ?? 2.1,
      homeInsurance: plan.annualHomeInsurance ?? 2400,
      maintenanceRate: 1,
      hoa: plan.monthlyHoa ?? 0,
      buyerClosingRate: 3,
      sellerClosingRate: 6,
      years: 7,
      appreciation: 3,
    };
  });
  const [state, setState] = useState(() => readCalculatorUrlState(defaults));
  const set = (key: keyof typeof state, value: number) => setState((current) => ({ ...current, [key]: value }));
  const result = useMemo(() => estimateRentVsBuy({
    monthlyRent: state.rent,
    annualRentGrowthRate: state.rentGrowth,
    monthlyRentersInsurance: state.rentersInsurance,
    homePrice: state.price,
    downPayment: state.down,
    mortgageRate: state.mortgageRate,
    loanTermYears: state.loanYears,
    propertyTaxRate: state.propertyTaxRate,
    annualHomeInsurance: state.homeInsurance,
    annualMaintenanceRate: state.maintenanceRate,
    monthlyHoa: state.hoa,
    buyerClosingCostRate: state.buyerClosingRate,
    sellerClosingCostRate: state.sellerClosingRate,
    comparisonYears: state.years,
    annualAppreciationRate: state.appreciation,
  }), [state]);
  const differenceLabel = result.difference > 0 ? money(Math.abs(result.difference)) + ' lower for buying' : result.difference < 0 ? money(Math.abs(result.difference)) + ' lower for renting' : 'About even';
  return <FinancialCalculatorScaffold storageKey="texasdefined:rent-vs-buy-calculator" state={state} defaults={defaults} onRestore={setState}
    note="This scenario amortizes the mortgage month by month and includes rent growth, renters insurance, property taxes, homeowners insurance, maintenance, HOA dues, buyer closing costs and selling costs. It does not model tax deductions, mortgage insurance, special-district charges or returns on invested cash."
    issues={[]}
    results={[
      { label: 'Estimated difference', value: differenceLabel, emphasis: true },
      { label: 'Starting mortgage P&I', value: money(result.monthlyPrincipalInterest) + '/mo' },
      { label: 'Rent paid', value: money(result.renterCost) },
      { label: 'Owner cash outflow', value: money(result.ownerCashOutflow) },
      { label: 'Remaining loan', value: money(result.remainingLoanBalance) },
      { label: 'Net sale equity', value: money(result.endingSaleEquity) },
      { label: 'Owner net cost', value: money(result.ownerNetCost) },
    ]}
    summary={{ 'Estimated difference': differenceLabel, 'Rent cost': money(result.renterCost), 'Owner net cost': money(result.ownerNetCost) }}
    sharedScenario={{ homePrice: state.price, downPayment: state.down, annualInterestRate: state.mortgageRate, loanTermYears: state.loanYears, annualPropertyTaxRate: state.propertyTaxRate, annualHomeInsurance: state.homeInsurance, monthlyHoa: state.hoa }}
    methodology={{ formula: 'Rent grows monthly from the annual rent-growth assumption. The ownership path uses the same shared fixed-rate mortgage payment engine as the mortgage calculator, amortizes principal monthly, adds property tax, insurance, maintenance and HOA, then subtracts estimated net sale equity.', assumptions: ['Home appreciation and rent growth compound monthly from the entered annual rates.', 'Buyer and seller closing costs are percentage planning assumptions.', 'Returns on invested cash, income-tax effects and mortgage insurance are not modeled.'] }}>
    <CurrencyInput label="Monthly rent" value={state.rent} onChange={(v) => set('rent', v)} step={50}/>
    <CurrencyInput label="Home price" value={state.price} onChange={(v) => set('price', v)} step={1000}/>
    <CurrencyInput label="Down payment" value={state.down} onChange={(v) => set('down', v)} step={1000}/>
    <PercentageInput label="Mortgage rate" value={state.mortgageRate} onChange={(v) => set('mortgageRate', v)} step={0.01} max={30}/>
    <div className="sm:col-span-2 lg:col-span-3"><AdvancedInputs>
      <PercentageInput label="Annual rent growth" value={state.rentGrowth} onChange={(v) => set('rentGrowth', v)} step={0.1}/>
      <CurrencyInput label="Renters insurance" value={state.rentersInsurance} onChange={(v) => set('rentersInsurance', v)} step={5} suffix="/mo"/>
      <FinancialInput label="Loan term" value={state.loanYears} onChange={(v) => set('loanYears', v)} suffix="years" min={1} max={50}/>
      <PercentageInput label="Property-tax rate" value={state.propertyTaxRate} onChange={(v) => set('propertyTaxRate', v)} step={0.01} max={20}/>
      <CurrencyInput label="Annual home insurance" value={state.homeInsurance} onChange={(v) => set('homeInsurance', v)} step={100}/>
      <PercentageInput label="Annual maintenance" value={state.maintenanceRate} onChange={(v) => set('maintenanceRate', v)} step={0.1}/>
      <CurrencyInput label="Monthly HOA" value={state.hoa} onChange={(v) => set('hoa', v)} step={25}/>
      <PercentageInput label="Buyer closing costs" value={state.buyerClosingRate} onChange={(v) => set('buyerClosingRate', v)} step={0.1} max={20}/>
      <PercentageInput label="Selling costs" value={state.sellerClosingRate} onChange={(v) => set('sellerClosingRate', v)} step={0.1} max={20}/>
      <FinancialInput label="Comparison period" value={state.years} onChange={(v) => set('years', v)} suffix="years" min={1} max={50}/>
      <PercentageInput label="Annual appreciation" value={state.appreciation} onChange={(v) => set('appreciation', v)} step={0.1}/>
    </AdvancedInputs></div>
  </FinancialCalculatorScaffold>;
}

export function CostOfLivingCalculator() {
  const defaults = { current: 6000, currentIndex: 100, texasIndex: 94 };
  const [state, setState] = useState(() => readCalculatorUrlState(defaults));
  const set = (key: keyof typeof state, value: number) => setState((current) => ({ ...current, [key]: value }));
  const result = useMemo(() => estimateCostOfLiving({ currentMonthlySpending: state.current, currentIndex: state.currentIndex, targetIndex: state.texasIndex }), [state]);
  return <FinancialCalculatorScaffold storageKey="texasdefined:cost-of-living-calculator" state={state} defaults={defaults} onRestore={setState}
    note="Cost indexes vary by provider, metro area, household size and spending habits. Replace the defaults with the best local numbers you can find and use local budget pages for category-by-category comparisons."
    issues={result.issues}
    results={[
      { label: 'Texas equivalent', value: money(result.equivalentMonthlySpending) + '/mo', emphasis: true },
      { label: 'Monthly difference', value: money(result.monthlyDifference) },
      { label: 'Annual difference', value: money(result.annualDifference) },
    ]}
    summary={{ 'Target equivalent': money(result.equivalentMonthlySpending) + '/mo', 'Annual difference': money(result.annualDifference) }}
    methodology={{ formula: 'Equivalent spending scales the current monthly budget by the ratio between the target and current cost indexes.', assumptions: ['Indexes are broad comparison inputs, not address-level prices.', 'Use the local cost-of-living pages when you have category-specific housing, transportation, utility, insurance, food and household numbers.'] }}>
    <CurrencyInput label="Current monthly spending" value={state.current} onChange={(v) => set('current', v)} step={100}/>
    <FinancialInput label="Current-area index" value={state.currentIndex} onChange={(v) => set('currentIndex', v)} step={0.1} min={1}/>
    <FinancialInput label="Texas-area index" value={state.texasIndex} onChange={(v) => set('texasIndex', v)} step={0.1} min={1}/>
  </FinancialCalculatorScaffold>;
}

export function SalaryCalculator() {
  const defaults = { salary: 90000, filingStatus: 'single', retirement: 6, pretaxBenefits: 0, afterTax: 0 };
  const [state, setState] = useState(() => readCalculatorUrlState(defaults));
  const setNumber = (key: 'salary' | 'retirement' | 'pretaxBenefits' | 'afterTax', value: number) => setState((current) => ({ ...current, [key]: value }));
  const result = useMemo(() => estimatePayroll2026({
    annualSalary: state.salary,
    filingStatus: state.filingStatus as FilingStatus,
    retirementPercent: state.retirement,
    annualPretaxBenefits: state.pretaxBenefits,
    annualAfterTaxDeductions: state.afterTax,
  }), [state]);
  const breakdown = [
    { label: 'Federal income tax', value: result.federalIncomeTax / 12 },
    { label: 'Social Security', value: result.socialSecurityTax / 12 },
    { label: 'Medicare', value: result.medicareTax / 12 },
    { label: 'Additional Medicare', value: result.additionalMedicareTax / 12 },
    { label: 'Retirement', value: result.retirementContribution / 12 },
    { label: 'Pre-tax benefits', value: result.pretaxBenefits / 12 },
    { label: 'After-tax deductions', value: result.afterTaxDeductions / 12 },
  ];
  return <FinancialCalculatorScaffold storageKey="texasdefined:salary-calculator" state={state} defaults={defaults} onRestore={setState}
    note="Texas has no individual state income tax. This 2026 planning model applies published federal brackets and the standard deduction, Social Security up to the 2026 wage base, Medicare and Additional Medicare withholding; credits, dependents, special deductions and individual tax situations can still change actual take-home pay."
    issues={result.issues}
    results={[
      { label: 'Monthly take-home', value: money(result.monthlyTakeHome), emphasis: true },
      { label: 'Annual take-home', value: money(result.annualTakeHome) },
      { label: 'Federal income tax', value: money(result.federalIncomeTax) },
      { label: 'Social Security', value: money(result.socialSecurityTax) },
      { label: 'Medicare', value: money(result.medicareTax + result.additionalMedicareTax) },
      { label: 'Texas individual state income tax', value: '$0' },
    ]}
    summary={{ 'Monthly take-home': money(result.monthlyTakeHome), 'Annual take-home': money(result.annualTakeHome), 'Federal income tax': money(result.federalIncomeTax), 'Texas income tax': '$0' }}
    breakdown={breakdown}
    methodology={{ formula: 'For tax year 2026, the engine subtracts the applicable standard deduction and modeled pre-tax deductions, applies the published marginal federal tax brackets, then applies employee Social Security and Medicare rules before user-entered after-tax deductions.', assumptions: ['Federal income tax is an annual planning estimate before credits and special deductions, not a W-4 withholding calculation or tax return.', 'Retirement deferrals reduce federal taxable income but remain subject to FICA in this model.', 'Entered pre-tax benefits are modeled as cafeteria-plan deductions that reduce federal taxable income and FICA wages.', 'Additional Medicare withholding is modeled above the employer withholding threshold of $200,000.'], sources: ['IRS Revenue Procedure 2025-32 / 2026 inflation adjustments: tax brackets and standard deductions.', 'IRS Publication 15 (2026): 6.2% employee Social Security, $184,500 wage base, 1.45% Medicare and 0.9% Additional Medicare withholding over $200,000.', 'Texas individual state income tax: $0.'] }}>
    <CurrencyInput label="Annual gross salary" value={state.salary} onChange={(v) => setNumber('salary', v)} step={1000}/>
    <FinancialSelect label="Filing status" value={state.filingStatus} onChange={(value) => setState((current) => ({ ...current, filingStatus: value }))} options={[
      { value: 'single', label: 'Single' },
      { value: 'married_jointly', label: 'Married filing jointly' },
      { value: 'head_of_household', label: 'Head of household' },
      { value: 'married_separately', label: 'Married filing separately' },
    ]}/>
    <PercentageInput label="Pre-tax retirement contribution" value={state.retirement} onChange={(v) => setNumber('retirement', v)} step={0.1} max={100}/>
    <div className="sm:col-span-2 lg:col-span-3"><AdvancedInputs>
      <CurrencyInput label="Annual pre-tax benefits" value={state.pretaxBenefits} onChange={(v) => setNumber('pretaxBenefits', v)} step={100}/>
      <CurrencyInput label="Annual after-tax deductions" value={state.afterTax} onChange={(v) => setNumber('afterTax', v)} step={100}/>
    </AdvancedInputs></div>
  </FinancialCalculatorScaffold>;
}

export function MovingCostCalculator() {
  const defaults = { distance: 500, homeSize: 3, packing: 1200, travel: 800, deposits: 1500 };
  const [state, setState] = useState(() => readCalculatorUrlState(defaults));
  const set = (key: keyof typeof state, value: number) => setState((current) => ({ ...current, [key]: value }));
  const result = useMemo(() => estimateMovingCost({ distanceMiles: state.distance, bedrooms: state.homeSize, packing: state.packing, travel: state.travel, deposits: state.deposits }), [state]);
  return <FinancialCalculatorScaffold storageKey="texasdefined:moving-cost-basic" state={state} defaults={defaults} onRestore={setState}
    note="Get written quotes and ask about coverage, stairs, long carries, storage, timing and anything the mover will not transport."
    issues={result.issues}
    results={[{ label: 'Estimated total', value: money(result.total), emphasis: true }, { label: 'Estimated transport', value: money(result.transportation) }, { label: 'With contingency', value: money(result.total) }]}
    summary={{ 'Moving budget': money(result.total), 'Transportation': money(result.transportation) }}
    methodology={{ formula: 'When no written estimate is supplied, the planning baseline is $900 + $2.25 per mile + $650 per bedroom, plus entered packing, travel and setup costs and a contingency.', assumptions: ['The built-in transportation baseline is a budgeting heuristic, not a market average or mover quote.'] }}>
    <FinancialInput label="Move distance" value={state.distance} onChange={(v) => set('distance', v)} suffix="miles"/>
    <FinancialInput label="Bedrooms" value={state.homeSize} onChange={(v) => set('homeSize', v)}/>
    <CurrencyInput label="Packing & supplies" value={state.packing} onChange={(v) => set('packing', v)} step={100}/>
    <CurrencyInput label="Travel costs" value={state.travel} onChange={(v) => set('travel', v)} step={100}/>
    <CurrencyInput label="Deposits & setup" value={state.deposits} onChange={(v) => set('deposits', v)} step={100}/>
  </FinancialCalculatorScaffold>;
}

export function UtilityCalculator() {
  const defaults = { electric: 190, water: 85, gas: 45, internet: 75, trash: 35, other: 0, summerIncrease: 30 };
  const [state, setState] = useState(() => readCalculatorUrlState(defaults));
  const set = (key: keyof typeof state, value: number) => setState((current) => ({ ...current, [key]: value }));
  const result = useMemo(() => estimateUtilities({ electricity: state.electric, waterSewer: state.water, naturalGas: state.gas, internet: state.internet, trashRecycling: state.trash, other: state.other, summerElectricityIncreasePercent: state.summerIncrease }), [state]);
  const breakdown = [
    { label: 'Electricity', value: state.electric },
    { label: 'Water & sewer', value: state.water },
    { label: 'Natural gas', value: state.gas },
    { label: 'Internet', value: state.internet },
    { label: 'Trash & recycling', value: state.trash },
    { label: 'Other', value: state.other },
  ];
  return <FinancialCalculatorScaffold storageKey="texasdefined:utility-cost-calculator" state={state} defaults={defaults} onRestore={setState}
    note="Real bills vary with weather, providers, household size, home efficiency, local fees and the electricity plan you choose."
    issues={result.issues}
    results={[
      { label: 'Monthly utilities', value: money(result.monthlyBase), emphasis: true },
      { label: 'Annual utilities', value: money(result.annualBase) },
      { label: 'Summer stress month', value: money(result.summerStressMonthly) },
      { label: 'Annual with three stress months', value: money(result.annualWithThreeSummerMonths) },
    ]}
    summary={{ 'Monthly utilities': money(result.monthlyBase), 'Annual utilities': money(result.annualBase) }}
    breakdown={breakdown}
    methodology={{ formula: 'Monthly utility categories are totaled directly. The optional summer stress case increases only electricity for three modeled months.', assumptions: ['The summer electricity increase defaults to 30% and is editable.', 'Provider charges, weather and household behavior can materially change bills.'] }}>
    <CurrencyInput label="Electricity" value={state.electric} onChange={(v) => set('electric', v)}/>
    <CurrencyInput label="Water & sewer" value={state.water} onChange={(v) => set('water', v)}/>
    <CurrencyInput label="Natural gas" value={state.gas} onChange={(v) => set('gas', v)}/>
    <CurrencyInput label="Internet" value={state.internet} onChange={(v) => set('internet', v)}/>
    <CurrencyInput label="Trash & recycling" value={state.trash} onChange={(v) => set('trash', v)}/>
    <div className="sm:col-span-2 lg:col-span-3"><AdvancedInputs>
      <CurrencyInput label="Other utilities" value={state.other} onChange={(v) => set('other', v)}/>
      <PercentageInput label="Summer electricity increase" value={state.summerIncrease} onChange={(v) => set('summerIncrease', v)} step={1}/>
    </AdvancedInputs></div>
  </FinancialCalculatorScaffold>;
}

export function HomeInsuranceCalculator() {
  const defaults = { replacement: 350000, baseRate: 0.75, windFlood: 1200, deductibleCredit: 0 };
  const [state, setState] = useState(() => readCalculatorUrlState(defaults));
  const set = (key: keyof typeof state, value: number) => setState((current) => ({ ...current, [key]: value }));
  const result = useMemo(() => estimateHomeInsurance({ replacementCost: state.replacement, baseRatePercent: state.baseRate, annualWindFloodAdditions: state.windFlood, annualCredits: state.deductibleCredit }), [state]);
  return <FinancialCalculatorScaffold storageKey="texasdefined:home-insurance-calculator" state={state} defaults={defaults} onRestore={setState}
    note="Homeowners, windstorm and flood coverage may be separate. Insurers also look at location, roof age, claims history, construction, coverage limits and deductibles."
    issues={result.issues}
    results={[
      { label: 'Annual estimate', value: money(result.annualPremium), emphasis: true },
      { label: 'Monthly equivalent', value: money(result.monthlyPremium) },
      { label: 'Base premium', value: money(result.basePremium) },
    ]}
    summary={{ 'Annual estimate': money(result.annualPremium), 'Monthly equivalent': money(result.monthlyPremium) }}
    methodology={{ formula: 'The planning model multiplies replacement cost by an editable base-rate assumption, then adds annual wind/flood amounts and subtracts entered credits.', assumptions: ['This is not an insurer rating model or quote.', 'Windstorm and flood coverage may be separate policies.', 'Replacement cost is not the same as market value.'], sources: ['Use Texas Department of Insurance and HelpInsure resources linked on the surrounding page to move from planning assumptions to real policy research.'] }}>
    <CurrencyInput label="Replacement cost" value={state.replacement} onChange={(v) => set('replacement', v)} step={1000}/>
    <PercentageInput label="Estimated base rate" value={state.baseRate} onChange={(v) => set('baseRate', v)} step={0.01} max={10}/>
    <CurrencyInput label="Wind/flood additions" value={state.windFlood} onChange={(v) => set('windFlood', v)} step={100}/>
    <CurrencyInput label="Deductible/discount credit" value={state.deductibleCredit} onChange={(v) => set('deductibleCredit', v)} step={100}/>
  </FinancialCalculatorScaffold>;
}
