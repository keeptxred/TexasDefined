import { useMemo, useState } from 'react';
import { OfficialTaxRateAssist } from '@/components/property/OfficialTaxRateAssist';
import {
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
  useCalculatorScenarios,
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
  pool: number;
  landscaping: number;
  other: number;
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
  pool: 0,
  landscaping: 0,
  other: 0,
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
    monthlyPool: state.pool,
    monthlyLandscaping: state.landscaping,
    monthlyOther: state.other,
    extraMonthlyPrincipal: state.extraPrincipal,
  }), [state]);
  const errors = issueMap(result.issues);

  const persistence = useCalculatorPersistence({
    storageKey: 'texasdefined:mortgage:v3',
    state,
    onRestore: setState,
  });
  const scenarioStore = useCalculatorScenarios({ storageKey: 'texasdefined:mortgage-scenarios:v2', state, max: 3 });

  const housingBreakdown = [
    { label: 'Principal & interest', value: result.monthlyPrincipalInterest },
    { label: 'Property taxes', value: result.monthlyPropertyTax, note: `${state.rateYear} selected-rate scenario when official rates are applied` },
    { label: 'Homeowners insurance', value: result.monthlyInsurance },
    { label: 'PMI / mortgage insurance', value: result.monthlyPmi },
    { label: 'HOA', value: result.monthlyHoa },
    { label: 'Special districts / assessments', value: result.monthlySpecialDistricts },
  ];

  const ownershipExtras = [
    { label: 'Extra principal', value: result.monthlyExtraPrincipal },
    { label: 'Utilities', value: result.monthlyUtilities },
    { label: 'Maintenance cushion', value: result.monthlyMaintenance },
    { label: 'Pool', value: result.monthlyPool },
    { label: 'Landscaping', value: result.monthlyLandscaping },
    { label: 'Other recurring ownership costs', value: result.monthlyOther },
  ];

  const higherRate = calculateMortgage({ homePrice: state.price, downPayment: state.down, annualRatePercent: state.rate + 0.5, termYears: state.years, propertyTaxRatePercent: state.propertyTaxRate, annualInsurance: state.insurance, monthlyPmi: state.pmi, monthlyHoa: state.hoa, monthlySpecialDistricts: state.specialDistricts }).monthlyHousingPayment;
  const ownershipSearch = new URLSearchParams({
    homeValue: String(state.price),
    mortgage: String(result.monthlyPrincipalInterest + result.monthlyExtraPrincipal),
    taxes: String(result.monthlyPropertyTax),
    insurance: String(result.monthlyInsurance),
    pmi: String(result.monthlyPmi),
    hoa: String(result.monthlyHoa),
    specialDistricts: String(result.monthlySpecialDistricts),
    maintenance: String(result.monthlyMaintenance),
    utilities: String(result.monthlyUtilities),
    pool: String(result.monthlyPool),
    landscaping: String(result.monthlyLandscaping),
    other: String(result.monthlyOther),
  }).toString();
  const rentBuySearch = new URLSearchParams({
    price: String(state.price),
    down: String(state.down),
    mortgageRate: String(state.rate),
    loanYears: String(state.years),
    propertyTaxRate: String(state.propertyTaxRate),
    homeInsurance: String(state.insurance),
    hoa: String(state.hoa),
  }).toString();

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
        <CurrencyInput label="Monthly pool costs" value={state.pool} onChange={(value) => update('pool', value)} step={25}/>
        <CurrencyInput label="Monthly landscaping" value={state.landscaping} onChange={(value) => update('landscaping', value)} step={25}/>
        <CurrencyInput label="Other recurring ownership costs" value={state.other} onChange={(value) => update('other', value)} step={25}/>
        <CurrencyInput label="Extra principal each month" value={state.extraPrincipal} onChange={(value) => update('extraPrincipal', value)} step={25}/>
      </div> : null}

      <div className="mt-6">
        <OfficialTaxRateAssist countySlug={state.county} title="Fill the mortgage property-tax rate from official local rates" onApply={(rates) => setState((current) => ({ ...current, propertyTaxRate: rates.combinedRate, rateYear: rates.year }))}/>
      </div>
      <p className="mt-6 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Planning estimate.</strong> The basic result includes principal, interest, property tax and homeowners insurance. Advanced mode adds PMI, HOA, special-district charges, utilities, maintenance, pool, landscaping, other recurring ownership costs and extra principal. Verify the exact parcel, lender terms, insurance quote, exemptions and taxing-unit membership before relying on the result.</p>
    </section>

    <CalculatorActions onSave={persistence.save} onRestore={persistence.restore} onShare={persistence.share} onPrint={persistence.print} status={persistence.status} onReset={() => setState({ ...DEFAULTS, county: defaultCountySlug })}/>

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
        {ownershipExtras.some((item) => item.value > 0) ? <div className="border-t border-border pt-4"><BreakdownTable items={ownershipExtras} total={result.monthlyExtraPrincipal + result.monthlyUtilities + result.monthlyMaintenance + result.monthlyPool + result.monthlyLandscaping + result.monthlyOther} totalLabel="Ownership costs beyond housing payment"/></div> : null}
        </div>
      </div>
    </section>

    <section className="mt-10 border-t border-border pt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="eyebrow text-primary">Compare properties or financing</p><h3 className="mt-2 font-display text-2xl">Scenario comparison</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Save up to three current input sets, then reload any scenario to keep editing it. Comparisons use the same shared mortgage engine.</p></div>
        <div className="flex flex-wrap gap-3 print:hidden"><button type="button" className="border-b border-primary py-3 text-sm font-semibold text-primary" disabled={scenarioStore.atLimit} onClick={scenarioStore.addCurrent}>Add current scenario</button>{scenarioStore.scenarios.length ? <button type="button" className="border-b border-primary py-3 text-sm font-semibold text-primary" onClick={scenarioStore.clear}>Clear comparisons</button> : null}</div>
      </div>
      {scenarioStore.scenarios.length ? <div className="mt-6 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border"><th className="py-3 text-left">Scenario</th><th className="py-3 text-right">Home price</th><th className="py-3 text-right">Rate</th><th className="py-3 text-right">Housing payment</th><th className="py-3 text-right">Ownership scenario</th><th className="py-3 text-right print:hidden">Action</th></tr></thead><tbody className="divide-y divide-border">{scenarioStore.scenarios.map((scenario) => { const estimate = calculateMortgage({ homePrice: scenario.state.price, downPayment: scenario.state.down, annualRatePercent: scenario.state.rate, termYears: scenario.state.years, propertyTaxRatePercent: scenario.state.propertyTaxRate, annualInsurance: scenario.state.insurance, monthlyPmi: scenario.state.pmi, monthlyHoa: scenario.state.hoa, monthlySpecialDistricts: scenario.state.specialDistricts, monthlyUtilities: scenario.state.utilities, monthlyMaintenance: scenario.state.maintenance, monthlyPool: scenario.state.pool, monthlyLandscaping: scenario.state.landscaping, monthlyOther: scenario.state.other, extraMonthlyPrincipal: scenario.state.extraPrincipal }); return <tr key={scenario.id}><th scope="row" className="py-3 text-left">{scenario.label}</th><td className="py-3 text-right">{formatMoney(scenario.state.price)}</td><td className="py-3 text-right">{scenario.state.rate.toFixed(2)}%</td><td className="py-3 text-right font-semibold">{formatMoney(estimate.monthlyHousingPayment)}</td><td className="py-3 text-right font-semibold">{formatMoney(estimate.monthlyOwnershipCost)}</td><td className="py-3 text-right print:hidden"><button type="button" className="font-semibold text-primary underline underline-offset-4" onClick={() => setState(scenario.state)}>Load</button><button type="button" className="ml-4 text-muted-foreground underline underline-offset-4" onClick={() => scenarioStore.remove(scenario.id)}>Remove</button></td></tr>; })}</tbody></table></div> : <p className="mt-5 text-sm text-muted-foreground">No comparison scenarios saved yet.</p>}
    </section>

    <details className="mt-10 border-y border-border py-5">
      <summary className="cursor-pointer font-display text-xl font-semibold">Amortization schedule</summary>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-sm"><thead><tr className="border-b border-border text-left"><th className="py-2 pr-4">Month</th><th className="py-2 pr-4">Interest</th><th className="py-2 pr-4">Principal</th><th className="py-2 pr-4">Extra principal</th><th className="py-2 text-right">Balance</th></tr></thead><tbody className="divide-y divide-border">{result.amortization.map((row) => <tr key={row.month}><td className="py-2 pr-4">{row.month}</td><td className="py-2 pr-4">{formatMoney(row.interest)}</td><td className="py-2 pr-4">{formatMoney(row.principal)}</td><td className="py-2 pr-4">{formatMoney(row.extraPrincipal)}</td><td className="py-2 text-right">{formatMoney(row.endingBalance)}</td></tr>)}</tbody></table>
      </div>
    </details>

    <section className="mt-10 border-t border-border pt-8">
      <p className="eyebrow text-primary">Continue this exact scenario</p>
      <h3 className="mt-2 font-display text-2xl">Carry the numbers into the next decision</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <a className="border border-border p-5 hover:border-primary" href={`/texas-homeownership-cost-calculator?${ownershipSearch}`}><strong className="font-display text-xl">Full homeownership budget</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Carry the mortgage cash outflow, home value, taxes, insurance, PMI, HOA, special districts, maintenance, utilities, pool, landscaping and other recurring costs into the ownership-cost tool.</span></a>
        <a className="border border-border p-5 hover:border-primary" href={`/texas-rent-vs-buy-calculator?${rentBuySearch}`}><strong className="font-display text-xl">Rent versus buy</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Carry the purchase, financing, tax, insurance and HOA assumptions into the longer-term comparison.</span></a>
      </div>
    </section>

    <MethodologyPanel>
      <p>Principal and interest use the standard fixed-rate amortization equation. The same shared mortgage engine also powers TexasDefined rent-versus-buy calculations so identical loan inputs produce identical loan payments.</p>
      <p>Property tax is calculated from the entered home price and rate unless an official local-rate scenario is applied. Official rates still require parcel-level verification because exemptions, taxable values and special-district membership can differ.</p>
      <p>All displayed values are planning estimates. User-entered insurance, PMI, HOA, utilities, maintenance, pool, landscaping, other recurring costs and assessment amounts are not presented as market averages.</p>
    </MethodologyPanel>
  </>;
}
