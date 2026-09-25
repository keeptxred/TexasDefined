import { useMemo, useState, type ReactNode } from 'react';
import {
  BreakdownChart,
  BreakdownTable,
  CalculatorActions,
  CalculatorResult,
  CurrencyInput,
  MethodologyPanel,
  NumberInput,
  PercentageInput,
  ResultGrid,
  formatMoney,
  useCalculatorPersistence,
  readCalculatorStateFromUrl,
  type CalculatorState,
} from '@/components/property/PropertyCalculatorFramework';
import { calculateAffordability } from '@/lib/financial/affordability';
import { calculateMortgage } from '@/lib/financial/mortgage';
import { calculateCostOfLiving, calculateHomeInsurance, calculateMovingBudget, calculateSalaryPlanning, calculateUtilities } from '@/lib/financial/planning';
import { issueMap } from '@/lib/financial/validation';
import { estimateRentVsBuy } from '@/lib/rent-vs-buy';

const money = formatMoney;

function Workspace<T extends CalculatorState>({ storageKey, state, onRestore, defaults, children, note }: { storageKey: string; state: T; onRestore: (state: T) => void; defaults: T; children: ReactNode; note: string }) {
  const persistence = useCalculatorPersistence({ storageKey, state, onRestore });
  return <>
    <section className="mt-10 grid gap-5 border-y border-border py-7 sm:grid-cols-2 lg:grid-cols-3">{children}</section>
    <p className="mt-6 border-b border-border pb-6 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Planning estimate.</strong> {note}</p>
    <CalculatorActions onSave={persistence.save} onRestore={persistence.restore} onShare={persistence.share} onPrint={persistence.print} status={persistence.status} onReset={() => onRestore(defaults)}/>
  </>;
}

function Results({ values }: { values: Array<[string, string, string?]> }) {
  return <section className="mt-8" aria-live="polite" aria-atomic="true"><h2 className="sr-only">Updated estimate</h2><div className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">{values.map(([label, value, note]) => <CalculatorResult key={label} label={label} value={value} note={note}/>)}</div></section>;
}

type MortgageState = { price: number; down: number; rate: number; years: number; tax: number; insurance: number; pmi: number; hoa: number };
const MORTGAGE_DEFAULTS: MortgageState = { price: 400000, down: 80000, rate: 6.5, years: 30, tax: 2.1, insurance: 2400, pmi: 0, hoa: 0 };

export function MortgageCalculator() {
  const [state, setState] = useState(() => readCalculatorStateFromUrl(MORTGAGE_DEFAULTS));
  const set = <K extends keyof MortgageState>(key: K, value: MortgageState[K]) => setState((current) => ({ ...current, [key]: value }));
  const result = useMemo(() => calculateMortgage({ homePrice: state.price, downPayment: state.down, annualRatePercent: state.rate, termYears: state.years, propertyTaxRatePercent: state.tax, annualInsurance: state.insurance, monthlyPmi: state.pmi, monthlyHoa: state.hoa }), [state]);
  const errors = issueMap(result.issues);
  const breakdown = [
    { label: 'Principal & interest', value: result.monthlyPrincipalInterest },
    { label: 'Property taxes', value: result.monthlyPropertyTax },
    { label: 'Homeowners insurance', value: result.monthlyInsurance },
    { label: 'PMI / mortgage insurance', value: result.monthlyPmi },
    { label: 'HOA', value: result.monthlyHoa },
  ];
  return <>
    <Workspace storageKey="texasdefined:mortgage-basic:v2" state={state} onRestore={setState} defaults={MORTGAGE_DEFAULTS} note="Your real payment may also include special-district charges, escrow adjustments, utilities, maintenance and closing costs.">
      <CurrencyInput label="Home price" value={state.price} onChange={(v) => set('price', v)} step={1000} error={errors.homePrice}/>
      <CurrencyInput label="Down payment" value={state.down} onChange={(v) => set('down', v)} step={1000} max={state.price} error={errors.downPayment}/>
      <PercentageInput label="Interest rate" value={state.rate} onChange={(v) => set('rate', v)} step={0.01} max={100} error={errors.annualRatePercent}/>
      <NumberInput label="Loan term" value={state.years} onChange={(v) => set('years', v)} min={1} max={50} suffix="years" error={errors.termYears}/>
      <PercentageInput label="Property-tax rate" value={state.tax} onChange={(v) => set('tax', v)} step={0.01} max={20} error={errors.propertyTaxRatePercent}/>
      <CurrencyInput label="Annual insurance" value={state.insurance} onChange={(v) => set('insurance', v)} step={100}/>
      <CurrencyInput label="Monthly PMI / mortgage insurance" value={state.pmi} onChange={(v) => set('pmi', v)} step={25}/>
      <CurrencyInput label="Monthly HOA" value={state.hoa} onChange={(v) => set('hoa', v)} step={25}/>
    </Workspace>
    <Results values={[['Loan amount', money(result.loanAmount)], ['Principal & interest', money(result.monthlyPrincipalInterest) + '/mo'], ['Estimated housing payment', money(result.monthlyHousingPayment) + '/mo'], ['Lifetime interest', money(result.totalInterest)]]}/>
    <div className="mt-10 grid gap-8 lg:grid-cols-2"><BreakdownChart items={breakdown}/><BreakdownTable items={breakdown} total={result.monthlyHousingPayment} totalLabel="Monthly housing payment"/></div>
  </>;
}

type AffordabilityState = { income: number; debt: number; down: number; rate: number; taxInsurance: number; ratio: number };
const AFFORDABILITY_DEFAULTS: AffordabilityState = { income: 120000, debt: 800, down: 60000, rate: 6.5, taxInsurance: 900, ratio: 28 };

export function AffordabilityCalculator() {
  const [state, setState] = useState(() => readCalculatorStateFromUrl(AFFORDABILITY_DEFAULTS));
  const set = <K extends keyof AffordabilityState>(key: K, value: AffordabilityState[K]) => setState((current) => ({ ...current, [key]: value }));
  const result = useMemo(() => calculateAffordability({ annualIncome: state.income, monthlyDebt: state.debt, downPayment: state.down, annualRatePercent: state.rate, monthlyTaxesInsuranceHoa: state.taxInsurance, maxHousingRatioPercent: state.ratio }), [state]);
  const errors = issueMap(result.issues);
  return <>
    <Workspace storageKey="texasdefined:affordability:v2" state={state} onRestore={setState} defaults={AFFORDABILITY_DEFAULTS} note="This is a planning ratio, not a lender decision. Lenders use their own debt-to-income rules, credit standards, reserves and loan-program limits.">
      <CurrencyInput label="Annual household income" value={state.income} onChange={(v) => set('income', v)} step={1000} error={errors.annualIncome}/>
      <CurrencyInput label="Monthly non-housing debt" value={state.debt} onChange={(v) => set('debt', v)} step={50} error={errors.monthlyDebt}/>
      <CurrencyInput label="Available down payment" value={state.down} onChange={(v) => set('down', v)} step={1000}/>
      <PercentageInput label="Interest rate" value={state.rate} onChange={(v) => set('rate', v)} step={0.01} max={100}/>
      <CurrencyInput label="Monthly taxes, insurance & HOA" value={state.taxInsurance} onChange={(v) => set('taxInsurance', v)} step={50}/>
      <PercentageInput label="Planning housing ratio" value={state.ratio} onChange={(v) => set('ratio', v)} step={1} max={100} help="Editable planning assumption; it is not a lender approval threshold."/>
    </Workspace>
    <Results values={[['Gross monthly income', money(result.grossMonthlyIncome)], ['Target housing budget', money(result.housingBudget) + '/mo'], ['P&I budget', money(result.principalInterestBudget) + '/mo'], ['Possible home price', money(result.possibleHomePrice)]]}/>
    <MethodologyPanel><p>The calculator works backward from the entered planning housing ratio, subtracts entered monthly debt and recurring taxes/insurance/HOA, then uses the same shared fixed-rate mortgage engine as the mortgage calculator.</p><p>Change the planning ratio to pressure-test the result rather than treating the default as a lending rule.</p></MethodologyPanel>
  </>;
}

type RentBuyState = { rent: number; rentGrowth: number; rentersInsurance: number; price: number; down: number; mortgageRate: number; loanYears: number; propertyTaxRate: number; homeInsurance: number; maintenanceRate: number; hoa: number; buyerClosingRate: number; sellerClosingRate: number; years: number; appreciation: number };
const RENT_BUY_DEFAULTS: RentBuyState = { rent: 2200, rentGrowth: 3, rentersInsurance: 25, price: 400000, down: 80000, mortgageRate: 6.5, loanYears: 30, propertyTaxRate: 2.1, homeInsurance: 2400, maintenanceRate: 1, hoa: 0, buyerClosingRate: 3, sellerClosingRate: 6, years: 7, appreciation: 3 };

export function RentVsBuyCalculator() {
  const [state, setState] = useState(() => readCalculatorStateFromUrl(RENT_BUY_DEFAULTS));
  const set = <K extends keyof RentBuyState>(key: K, value: RentBuyState[K]) => setState((current) => ({ ...current, [key]: value }));
  const result = useMemo(() => estimateRentVsBuy({ monthlyRent: state.rent, annualRentGrowthRate: state.rentGrowth, monthlyRentersInsurance: state.rentersInsurance, homePrice: state.price, downPayment: state.down, mortgageRate: state.mortgageRate, loanTermYears: state.loanYears, propertyTaxRate: state.propertyTaxRate, annualHomeInsurance: state.homeInsurance, annualMaintenanceRate: state.maintenanceRate, monthlyHoa: state.hoa, buyerClosingCostRate: state.buyerClosingRate, sellerClosingCostRate: state.sellerClosingRate, comparisonYears: state.years, annualAppreciationRate: state.appreciation }), [state]);
  const differenceLabel = result.difference > 0 ? `${money(Math.abs(result.difference))} lower for buying` : result.difference < 0 ? `${money(Math.abs(result.difference))} lower for renting` : 'About even';
  const comparison = [{ label: 'Renting cost', value: result.renterCost }, { label: 'Buying net cost', value: result.ownerNetCost }];
  return <>
    <Workspace storageKey="texasdefined:rent-vs-buy:v2" state={state} onRestore={setState} defaults={RENT_BUY_DEFAULTS} note="This scenario amortizes the mortgage month by month and includes rent growth, renters insurance, property taxes, homeowners insurance, maintenance, HOA dues, buyer closing costs and selling costs.">
      <CurrencyInput label="Monthly rent" value={state.rent} onChange={(v) => set('rent', v)} step={50}/>
      <PercentageInput label="Annual rent growth" value={state.rentGrowth} onChange={(v) => set('rentGrowth', v)} step={0.1} max={100}/>
      <CurrencyInput label="Renters insurance" value={state.rentersInsurance} onChange={(v) => set('rentersInsurance', v)} step={5}/>
      <CurrencyInput label="Home price" value={state.price} onChange={(v) => set('price', v)} step={1000}/>
      <CurrencyInput label="Down payment" value={state.down} onChange={(v) => set('down', v)} step={1000} max={state.price}/>
      <PercentageInput label="Mortgage rate" value={state.mortgageRate} onChange={(v) => set('mortgageRate', v)} step={0.01} max={100}/>
      <NumberInput label="Loan term" value={state.loanYears} onChange={(v) => set('loanYears', v)} min={1} max={50} suffix="years"/>
      <PercentageInput label="Property-tax rate" value={state.propertyTaxRate} onChange={(v) => set('propertyTaxRate', v)} step={0.01} max={20}/>
      <CurrencyInput label="Annual home insurance" value={state.homeInsurance} onChange={(v) => set('homeInsurance', v)} step={100}/>
      <PercentageInput label="Annual maintenance" value={state.maintenanceRate} onChange={(v) => set('maintenanceRate', v)} step={0.1} max={100}/>
      <CurrencyInput label="Monthly HOA" value={state.hoa} onChange={(v) => set('hoa', v)} step={25}/>
      <PercentageInput label="Buyer closing costs" value={state.buyerClosingRate} onChange={(v) => set('buyerClosingRate', v)} step={0.1} max={100}/>
      <PercentageInput label="Selling costs" value={state.sellerClosingRate} onChange={(v) => set('sellerClosingRate', v)} step={0.1} max={100}/>
      <NumberInput label="Comparison period" value={state.years} onChange={(v) => set('years', v)} min={1} max={50} suffix="years"/>
      <PercentageInput label="Annual appreciation" value={state.appreciation} onChange={(v) => set('appreciation', v)} step={0.1} max={100}/>
    </Workspace>
    <Results values={[['Starting mortgage P&I', money(result.monthlyPrincipalInterest) + '/mo'], ['Rent paid', money(result.renterCost)], ['Owner cash outflow', money(result.ownerCashOutflow)], ['Remaining loan', money(result.remainingLoanBalance)], ['Net sale equity', money(result.endingSaleEquity)], ['Owner net cost', money(result.ownerNetCost)], ['Estimated difference', differenceLabel]]}/>
    <div className="mt-10"><BreakdownChart items={comparison}/></div>
    <MethodologyPanel><p>The mortgage payment comes from the same shared mortgage engine used by TexasDefined mortgage calculators. The model then amortizes the loan month by month while applying the entered rent growth, appreciation, taxes, insurance, maintenance, HOA and transaction-cost assumptions.</p><p>It does not model tax deductions, investment returns on unused cash or every transaction-specific fee.</p></MethodologyPanel>
  </>;
}

type CostState = { current: number; currentIndex: number; texasIndex: number };
const COST_DEFAULTS: CostState = { current: 6000, currentIndex: 100, texasIndex: 94 };
export function CostOfLivingCalculator() {
  const [state, setState] = useState(() => readCalculatorStateFromUrl(COST_DEFAULTS)); const set = <K extends keyof CostState>(k: K, v: CostState[K]) => setState((s) => ({ ...s, [k]: v }));
  const result = useMemo(() => calculateCostOfLiving({ currentMonthlySpending: state.current, currentAreaIndex: state.currentIndex, targetAreaIndex: state.texasIndex }), [state]);
  return <><Workspace storageKey="texasdefined:cost-of-living:v2" state={state} onRestore={setState} defaults={COST_DEFAULTS} note="Cost indexes vary by provider, metro area, household size and spending habits. Replace defaults with the best comparable data available for your household."><CurrencyInput label="Current monthly spending" value={state.current} onChange={(v) => set('current', v)} step={100}/><NumberInput label="Current-area index" value={state.currentIndex} onChange={(v) => set('currentIndex', v)} step={0.1}/><NumberInput label="Texas-area index" value={state.texasIndex} onChange={(v) => set('texasIndex', v)} step={0.1}/></Workspace><Results values={[['Texas equivalent', money(result.equivalentMonthly) + '/mo'], ['Monthly difference', money(result.monthlyDifference)], ['Annual difference', money(result.annualDifference)]]}/></>;
}

type SalaryState = { salary: number; federal: number; benefits: number; other: number };
const SALARY_DEFAULTS: SalaryState = { salary: 90000, federal: 16, benefits: 6, other: 0 };
export function SalaryCalculator() {
  const [state, setState] = useState(() => readCalculatorStateFromUrl(SALARY_DEFAULTS)); const set = <K extends keyof SalaryState>(k: K, v: SalaryState[K]) => setState((s) => ({ ...s, [k]: v }));
  const result = useMemo(() => calculateSalaryPlanning({ annualGrossSalary: state.salary, estimatedFederalPercent: state.federal, benefitsRetirementPercent: state.benefits, otherDeductionsPercent: state.other }), [state]);
  return <><Workspace storageKey="texasdefined:salary:v2" state={state} onRestore={setState} defaults={SALARY_DEFAULTS} note="Texas has no individual state income tax. This remains a planning estimator: the federal field is user-entered rather than a tax-return or withholding calculation."><CurrencyInput label="Annual gross salary" value={state.salary} onChange={(v) => set('salary', v)} step={1000}/><PercentageInput label="Estimated federal rate" value={state.federal} onChange={(v) => set('federal', v)} step={0.1} max={100}/><PercentageInput label="Benefits & retirement" value={state.benefits} onChange={(v) => set('benefits', v)} step={0.1} max={100}/><PercentageInput label="Other deductions" value={state.other} onChange={(v) => set('other', v)} step={0.1} max={100}/></Workspace><Results values={[['Estimated deductions', money(result.deductions)], ['Annual take-home', money(result.annualTakeHome)], ['Monthly take-home', money(result.monthlyTakeHome)]]}/><MethodologyPanel><p>The current paycheck estimator intentionally labels the federal rate as an input rather than pretending to reproduce a tax return. Payroll tax uses the existing 7.65% planning assumption. A future tax-year-specific withholding engine should version statutory thresholds by year before replacing this model.</p></MethodologyPanel></>;
}

type MovingState = { distance: number; bedrooms: number; writtenEstimate: number; packing: number; travel: number; storage: number; deposits: number; contingency: number };
const MOVING_DEFAULTS: MovingState = { distance: 500, bedrooms: 3, writtenEstimate: 0, packing: 1200, travel: 800, storage: 0, deposits: 1500, contingency: 15 };
export function MovingCostCalculator() {
  const [state, setState] = useState(() => readCalculatorStateFromUrl(MOVING_DEFAULTS)); const set = <K extends keyof MovingState>(k: K, v: MovingState[K]) => setState((s) => ({ ...s, [k]: v }));
  const result = useMemo(() => calculateMovingBudget({ distanceMiles: state.distance, bedrooms: state.bedrooms, writtenEstimate: state.writtenEstimate, packing: state.packing, travelLodging: state.travel, storage: state.storage, depositsSetup: state.deposits, contingencyPercent: state.contingency }), [state]);
  return <><Workspace storageKey="texasdefined:moving:v2" state={state} onRestore={setState} defaults={MOVING_DEFAULTS} note="Use a written mover or truck estimate when available. The built-in transportation baseline is a budgeting heuristic, not a Texas market average or quote."><NumberInput label="Move distance" value={state.distance} onChange={(v) => set('distance', v)} suffix="miles"/><NumberInput label="Bedrooms" value={state.bedrooms} onChange={(v) => set('bedrooms', v)} min={0} max={20}/><CurrencyInput label="Written mover or truck estimate" value={state.writtenEstimate} onChange={(v) => set('writtenEstimate', v)} step={100}/><CurrencyInput label="Packing & supplies" value={state.packing} onChange={(v) => set('packing', v)} step={100}/><CurrencyInput label="Travel & temporary lodging" value={state.travel} onChange={(v) => set('travel', v)} step={100}/><CurrencyInput label="Storage" value={state.storage} onChange={(v) => set('storage', v)} step={100}/><CurrencyInput label="Deposits & setup" value={state.deposits} onChange={(v) => set('deposits', v)} step={100}/><PercentageInput label="Contingency" value={state.contingency} onChange={(v) => set('contingency', v)} step={1} max={100}/></Workspace><Results values={[['Transportation', money(result.transportation), result.usesWrittenEstimate ? 'Using your written estimate.' : 'Using the planning baseline.'], ['Move subtotal', money(result.subtotal)], ['Contingency', money(result.contingency)], ['Target moving budget', money(result.total)]]}/></>;
}

type UtilityState = { electric: number; water: number; gas: number; internet: number; trash: number; other: number };
const UTILITY_DEFAULTS: UtilityState = { electric: 190, water: 85, gas: 45, internet: 75, trash: 35, other: 0 };
export function UtilityCalculator() {
  const [state, setState] = useState(() => readCalculatorStateFromUrl(UTILITY_DEFAULTS)); const set = <K extends keyof UtilityState>(k: K, v: UtilityState[K]) => setState((s) => ({ ...s, [k]: v }));
  const result = useMemo(() => calculateUtilities({ electricity: state.electric, waterSewer: state.water, naturalGas: state.gas, internet: state.internet, trash: state.trash, other: state.other }), [state]);
  const breakdown = [{ label: 'Electricity', value: result.breakdown.electricity }, { label: 'Water & sewer', value: result.breakdown.waterSewer }, { label: 'Natural gas', value: result.breakdown.naturalGas }, { label: 'Internet', value: result.breakdown.internet }, { label: 'Trash & recycling', value: result.breakdown.trash }, { label: 'Other', value: result.breakdown.other }];
  return <><Workspace storageKey="texasdefined:utilities:v2" state={state} onRestore={setState} defaults={UTILITY_DEFAULTS} note="Real bills vary with weather, providers, household size, home efficiency, local fees and the electricity plan you choose."><CurrencyInput label="Electricity" value={state.electric} onChange={(v) => set('electric', v)}/><CurrencyInput label="Water & sewer" value={state.water} onChange={(v) => set('water', v)}/><CurrencyInput label="Natural gas" value={state.gas} onChange={(v) => set('gas', v)}/><CurrencyInput label="Internet" value={state.internet} onChange={(v) => set('internet', v)}/><CurrencyInput label="Trash & recycling" value={state.trash} onChange={(v) => set('trash', v)}/><CurrencyInput label="Other utilities" value={state.other} onChange={(v) => set('other', v)}/></Workspace><Results values={[['Monthly utilities', money(result.monthly)], ['Annual utilities', money(result.annual)]]}/><div className="mt-10 grid gap-8 lg:grid-cols-2"><BreakdownChart items={breakdown}/><BreakdownTable items={breakdown} total={result.monthly} totalLabel="Monthly utilities"/></div></>;
}

type InsuranceState = { replacement: number; baseRate: number; windFlood: number; deductibleCredit: number };
const INSURANCE_DEFAULTS: InsuranceState = { replacement: 350000, baseRate: 0.75, windFlood: 1200, deductibleCredit: 0 };
export function HomeInsuranceCalculator() {
  const [state, setState] = useState(() => readCalculatorStateFromUrl(INSURANCE_DEFAULTS)); const set = <K extends keyof InsuranceState>(k: K, v: InsuranceState[K]) => setState((s) => ({ ...s, [k]: v }));
  const result = useMemo(() => calculateHomeInsurance({ replacementCost: state.replacement, baseRatePercent: state.baseRate, windFloodAdditions: state.windFlood, deductibleDiscountCredit: state.deductibleCredit }), [state]);
  return <><Workspace storageKey="texasdefined:home-insurance:v2" state={state} onRestore={setState} defaults={INSURANCE_DEFAULTS} note="Homeowners, windstorm and flood coverage may be separate. Insurers also look at location, roof age, claims history, construction, coverage and deductibles."><CurrencyInput label="Replacement cost" value={state.replacement} onChange={(v) => set('replacement', v)} step={1000}/><PercentageInput label="Estimated base rate" value={state.baseRate} onChange={(v) => set('baseRate', v)} step={0.01} max={100}/><CurrencyInput label="Wind/flood additions" value={state.windFlood} onChange={(v) => set('windFlood', v)} step={100}/><CurrencyInput label="Deductible/discount credit" value={state.deductibleCredit} onChange={(v) => set('deductibleCredit', v)} step={100}/></Workspace><Results values={[['Base premium', money(result.basePremium)], ['Annual estimate', money(result.annual)], ['Monthly equivalent', money(result.monthly)]]}/></>;
}
