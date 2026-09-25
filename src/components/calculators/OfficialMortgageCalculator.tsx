import { useMemo, useState } from 'react';
import { OfficialTaxRateAssist } from '@/components/property/OfficialTaxRateAssist';
import {
  BreakdownChart,
  BreakdownTable,
  CalculatorActions,
  CalculatorModeToggle,
  CalculatorResult,
  CountySelector,
  CurrencyInput,
  MethodologyPanel,
  NumberInput,
  PercentageInput,
  ResultGrid,
  formatMoney,
  useCalculatorPersistence,
  useUrlStateDefaults,
} from '@/components/property/PropertyCalculatorFramework';
import { calculateMortgage } from '@/lib/financial/mortgage';
import { issueMap } from '@/lib/financial/validation';

type MortgageState = {
  price: number;
  down: number;
  rate: number;
  years: number;
  propertyTaxRate: number;
  insurance: number;
  pmi: number;
  hoa: number;
  specialDistricts: number;
  utilities: number;
  maintenance: number;
  extraPrincipal: number;
  county: string;
  rateYear: number;
};

const DEFAULTS: MortgageState = {
  price: 400000,
  down: 80000,
  rate: 6.5,
  years: 30,
  propertyTaxRate: 2.1,
  insurance: 2400,
  pmi: 0,
  hoa: 0,
  specialDistricts: 0,
  utilities: 0,
  maintenance: 0,
  extraPrincipal: 0,
  county: '',
  rateYear: 2025,
};

export function OfficialMortgageCalculator({ defaultCountySlug = '' }: { defaultCountySlug?: string }) {
  const urlDefaults = useUrlStateDefaults({ ...DEFAULTS, county: defaultCountySlug || DEFAULTS.county });
  const [state, setState] = useState<MortgageState>(urlDefaults);
  const [advanced, setAdvanced] = useState(false);
  const update = <K extends keyof MortgageState>(key: K, value: MortgageState[K]) => setState((current) => ({ ...current, [key]: value }));

  const result = useMemo(() => calculateMortgage({
    homePrice: state.price,
    downPayment: state.down,
    annualRatePercent: state.rate,
    termYears: state.years,
    propertyTaxRatePercent: state.propertyTaxRate,
    annualInsurance: state.insurance,
    monthlyPmi: state.pmi,
    monthlyHoa: state.hoa,
    monthlySpecialDistricts: state.specialDistricts,
    monthlyUtilities: state.utilities,
    monthlyMaintenance: state.maintenance,
    extraMonthlyPrincipal: state.extraPrincipal,
  }), [state]);
  const errors = issueMap(result.issues);

  const persistence = useCalculatorPersistence({
    storageKey: 'texasdefined:mortgage:v2',
    state,
    onRestore: setState,
  });

  const housingBreakdown = [
    { label: 'Principal & interest', value: result.monthlyPrincipalInterest },
    { label: 'Property taxes', value: result.monthlyPropertyTax, note: `${state.rateYear} selected-rate scenario when official rates are applied` },
    { label: 'Homeowners insurance', value: result.monthlyInsurance },
    { label: 'PMI / mortgage insurance', value: result.monthlyPmi },
    { label: 'HOA', value: result.monthlyHoa },
    { label: 'Special districts / assessments', value: result.monthlySpecialDistricts },
  ];

  const ownershipExtras = [
    { label: 'Utilities', value: result.monthlyUtilities },
    { label: 'Maintenance cushion', value: result.monthlyMaintenance },
  ];

  const higherRate = calculateMortgage({ homePrice: state.price, downPayment: state.down, annualRatePercent: state.rate + 0.5, termYears: state.years, propertyTaxRatePercent: state.propertyTaxRate, annualInsurance: state.insurance, monthlyPmi: state.pmi, monthlyHoa: state.hoa, monthlySpecialDistricts: state.specialDistricts }).monthlyHousingPayment;
  const lowerPrice = calculateMortgage({ homePrice: Math.max(0, state.price - 25000), downPayment: Math.min(state.down, Math.max(0, state.price - 25000)), annualRatePercent: state.rate, termYears: state.years, propertyTaxRatePercent: state.propertyTaxRate, annualInsurance: state.insurance, monthlyPmi: state.pmi, monthlyHoa: state.hoa, monthlySpecialDistricts: state.specialDistricts }).monthlyHousingPayment;

  return <>
    <section className="mt-10 border-y border-border py-7">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <CurrencyInput label="Home price" value={state.price} onChange={(value) => update('price', value)} step={1000} error={errors.homePrice}/>
        <CurrencyInput label="Down payment" value={state.down} onChange={(value) => update('down', value)} step={1000} max={state.price} error={errors.downPayment}/>
        <PercentageInput label="Interest rate" value={state.rate} onChange={(value) => update('rate', value)} step={0.01} max={100} error={errors.annualRatePercent}/>
        <NumberInput label="Loan term" value={state.years} onChange={(value) => update('years', value)} step={1} min={1} max={50} suffix="years" error={errors.termYears}/>
        <CountySelector value={state.county} onChange={(value) => update('county', value)}/>
      </div>

      <CalculatorModeToggle advanced={advanced} onChange={setAdvanced}/>
      {advanced ? <div className="mt-6 grid gap-5 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-3">
        <PercentageInput label="Property-tax rate" value={state.propertyTaxRate} onChange={(value) => update('propertyTaxRate', value)} step={0.001} max={20} error={errors.propertyTaxRatePercent} help="Use the official local-rate helper below when you know the taxing units."/>
        <CurrencyInput label="Annual homeowners insurance" value={state.insurance} onChange={(value) => update('insurance', value)} step={100}/>
        <CurrencyInput label="Monthly PMI / mortgage insurance" value={state.pmi} onChange={(value) => update('pmi', value)} step={25}/>
        <CurrencyInput label="Monthly HOA" value={state.hoa} onChange={(value) => update('hoa', value)} step={25}/>
        <CurrencyInput label="Monthly special districts / assessments" value={state.specialDistricts} onChange={(value) => update('specialDistricts', value)} step={25}/>
        <CurrencyInput label="Monthly utilities" value={state.utilities} onChange={(value) => update('utilities', value)} step={25}/>
        <CurrencyInput label="Monthly maintenance cushion" value={state.maintenance} onChange={(value) => update('maintenance', value)} step={25}/>
        <CurrencyInput label="Extra principal each month" value={state.extraPrincipal} onChange={(value) => update('extraPrincipal', value)} step={25}/>
      </div> : null}

      <div className="mt-6">
        <OfficialTaxRateAssist countySlug={state.county} title="Fill the mortgage property-tax rate from official local rates" onApply={(rates) => setState((current) => ({ ...current, propertyTaxRate: rates.combinedRate, rateYear: rates.year }))}/>
      </div>
      <p className="mt-6 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Planning estimate.</strong> The basic result includes principal, interest, property tax and homeowners insurance. Advanced mode adds PMI, HOA, special-district charges, utilities, maintenance and extra principal. Verify the exact parcel, lender terms, insurance quote, exemptions and taxing-unit membership before relying on the result.</p>
    </section>

    <CalculatorActions {...persistence} onReset={() => setState({ ...DEFAULTS, county: defaultCountySlug })}/>

    <section className="mt-8" aria-live="polite" aria-atomic="true">
      <ResultGrid>
        <CalculatorResult label="Loan amount" value={formatMoney(result.loanAmount)}/>
        <CalculatorResult label="Monthly housing payment" value={`${formatMoney(result.monthlyHousingPayment)}/mo`} note="P&I + taxes + insurance + PMI + HOA + special districts"/>
        <CalculatorResult label="Full ownership scenario" value={`${formatMoney(result.monthlyOwnershipCost)}/mo`} note="Adds entered utilities and maintenance"/>
      </ResultGrid>
      <ResultGrid>
        <CalculatorResult label="Lifetime loan interest" value={formatMoney(result.totalInterest)} note={state.extraPrincipal ? 'Reflects entered extra monthly principal.' : 'Scheduled loan payments only.'}/>
        <CalculatorResult label="Estimated payoff" value={`${Math.floor(result.payoffMonths / 12)} yr ${result.payoffMonths % 12} mo`}/>
        <CalculatorResult label="Annual ownership scenario" value={formatMoney(result.annualOwnershipCost)}/>
      </ResultGrid>
    </section>

    <section className="mt-10 grid gap-8 lg:grid-cols-2">
      <div><h3 className="font-display text-2xl">Monthly payment breakdown</h3><div className="mt-5"><BreakdownChart items={housingBreakdown}/></div><div className="mt-6"><BreakdownTable items={housingBreakdown} total={result.monthlyHousingPayment} totalLabel="Monthly housing payment"/></div></div>
      <div><h3 className="font-display text-2xl">What changes the result?</h3><div className="mt-5 space-y-4 text-sm">
        <div className="border-t border-border pt-4"><span className="text-muted-foreground">Interest rate +0.50 percentage points</span><strong className="mt-1 block text-xl">{formatMoney(higherRate)}/mo <span className="text-sm font-normal text-muted-foreground">({higherRate >= result.monthlyHousingPayment ? '+' : ''}{formatMoney(higherRate - result.monthlyHousingPayment)})</span></strong></div>
        <div className="border-t border-border pt-4"><span className="text-muted-foreground">Home price $25,000 lower, same down payment when possible</span><strong className="mt-1 block text-xl">{formatMoney(lowerPrice)}/mo <span className="text-sm font-normal text-muted-foreground">({formatMoney(lowerPrice - result.monthlyHousingPayment)})</span></strong></div>
        {ownershipExtras.some((item) => item.value > 0) ? <div className="border-t border-border pt-4"><BreakdownTable items={ownershipExtras} total={result.monthlyUtilities + result.monthlyMaintenance} totalLabel="Ownership costs beyond housing payment"/></div> : null}
      </div>
    </section>

    <details className="mt-10 border-y border-border py-5">
      <summary className="cursor-pointer font-display text-xl font-semibold">Amortization schedule</summary>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[42rem] text-sm"><thead><tr className="border-b border-border text-left"><th className="py-2 pr-4">Month</th><th className="py-2 pr-4">Interest</th><th className="py-2 pr-4">Principal</th><th className="py-2 pr-4">Extra principal</th><th className="py-2 text-right">Balance</th></tr></thead><tbody className="divide-y divide-border">{result.amortization.map((row) => <tr key={row.month}><td className="py-2 pr-4">{row.month}</td><td className="py-2 pr-4">{formatMoney(row.interest)}</td><td className="py-2 pr-4">{formatMoney(row.principal)}</td><td className="py-2 pr-4">{formatMoney(row.extraPrincipal)}</td><td className="py-2 text-right">{formatMoney(row.endingBalance)}</td></tr>)}</tbody></table>
      </div>
    </details>

    <MethodologyPanel>
      <p>Principal and interest use the standard fixed-rate amortization equation. The same shared mortgage engine also powers TexasDefined rent-versus-buy calculations so identical loan inputs produce identical loan payments.</p>
      <p>Property tax is calculated from the entered home price and rate unless an official local-rate scenario is applied. Official rates still require parcel-level verification because exemptions, taxable values and special-district membership can differ.</p>
      <p>All displayed values are planning estimates. User-entered insurance, PMI, HOA, utilities, maintenance and assessment amounts are not presented as market averages.</p>
    </MethodologyPanel>
  </>;
}
