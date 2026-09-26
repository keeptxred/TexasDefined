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
  ResultGrid,
  formatMoney,
  useCalculatorPersistence,
  useUrlStateDefaults,
} from '@/components/property/PropertyCalculatorFramework';
import { calculateHomeownershipCost } from '@/lib/financial/homeownership';
import { calculatePropertyTax } from '@/lib/financial/property-tax';

type OwnershipState = {
  homeValue: number;
  mortgage: number;
  taxes: number;
  insurance: number;
  pmi: number;
  hoa: number;
  specialDistricts: number;
  maintenance: number;
  utilities: number;
  pool: number;
  landscaping: number;
  other: number;
  county: string;
  rateYear: number;
};

const DEFAULTS: OwnershipState = { homeValue: 400000, mortgage: 2400, taxes: 700, insurance: 250, pmi: 0, hoa: 100, specialDistricts: 0, maintenance: 400, utilities: 350, pool: 0, landscaping: 0, other: 0, county: '', rateYear: 2025 };

export function OfficialHomeownershipCostCalculator() {
  const urlDefaults = useUrlStateDefaults(DEFAULTS);
  const [state, setState] = useState<OwnershipState>(urlDefaults);
  const [advanced, setAdvanced] = useState(false);
  const update = <K extends keyof OwnershipState>(key: K, value: OwnershipState[K]) => setState((current) => ({ ...current, [key]: value }));
  const result = useMemo(() => calculateHomeownershipCost({
    mortgage: state.mortgage,
    propertyTaxes: state.taxes,
    insurance: state.insurance,
    pmi: state.pmi,
    hoa: state.hoa,
    specialDistricts: state.specialDistricts,
    maintenance: state.maintenance,
    utilities: state.utilities,
    pool: state.pool,
    landscaping: state.landscaping,
    other: state.other,
  }), [state]);
  const persistence = useCalculatorPersistence({ storageKey: 'texasdefined:homeownership:v2', state, onRestore: setState });
  const breakdown = [
    { label: 'Mortgage', value: result.breakdown.mortgage },
    { label: 'Property taxes', value: result.breakdown.propertyTaxes, note: `${state.rateYear} scenario when official rates are applied` },
    { label: 'Insurance', value: result.breakdown.insurance },
    { label: 'PMI / mortgage insurance', value: result.breakdown.pmi },
    { label: 'HOA', value: result.breakdown.hoa },
    { label: 'Special districts / assessments', value: result.breakdown.specialDistricts },
    { label: 'Maintenance cushion', value: result.breakdown.maintenance },
    { label: 'Utilities', value: result.breakdown.utilities },
    { label: 'Pool', value: result.breakdown.pool },
    { label: 'Landscaping', value: result.breakdown.landscaping },
    { label: 'Other recurring costs', value: result.breakdown.other },
  ];

  return <>
    <section className="mt-10 border-y border-border py-7">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <CurrencyInput label="Home value used for tax estimate" value={state.homeValue} onChange={(value) => update('homeValue', value)} step={1000}/>
        <CurrencyInput label="Mortgage" value={state.mortgage} onChange={(value) => update('mortgage', value)}/>
        <CurrencyInput label="Property taxes" value={state.taxes} onChange={(value) => update('taxes', value)}/>
        <CurrencyInput label="Insurance" value={state.insurance} onChange={(value) => update('insurance', value)}/>
        <CurrencyInput label="Maintenance cushion" value={state.maintenance} onChange={(value) => update('maintenance', value)}/>
        <CurrencyInput label="Utilities" value={state.utilities} onChange={(value) => update('utilities', value)}/>
        <CountySelector value={state.county} onChange={(value) => update('county', value)}/>
      </div>
      <CalculatorModeToggle advanced={advanced} onChange={setAdvanced}/>
      {advanced ? <div className="mt-6 grid gap-5 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-3">
        <CurrencyInput label="PMI / mortgage insurance" value={state.pmi} onChange={(value) => update('pmi', value)}/>
        <CurrencyInput label="HOA and other association fees" value={state.hoa} onChange={(value) => update('hoa', value)}/>
        <CurrencyInput label="Special districts / assessments" value={state.specialDistricts} onChange={(value) => update('specialDistricts', value)}/>
        <CurrencyInput label="Pool" value={state.pool} onChange={(value) => update('pool', value)}/>
        <CurrencyInput label="Landscaping" value={state.landscaping} onChange={(value) => update('landscaping', value)}/>
        <CurrencyInput label="Other recurring costs" value={state.other} onChange={(value) => update('other', value)}/>
      </div> : null}
      <div className="mt-6"><OfficialTaxRateAssist countySlug={state.county} title="Estimate monthly property taxes from official local rates" onApply={(rates) => setState((current) => ({ ...current, taxes: calculatePropertyTax(current.homeValue, rates.combinedRate) / 12, rateYear: rates.year }))}/></div>
      <p className="mt-6 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Build the full ownership budget.</strong> Add recurring costs that apply to the property instead of treating the mortgage payment as the cost of owning the home.</p>
    </section>
    <CalculatorActions onSave={persistence.save} onRestore={persistence.restore} onShare={persistence.share} onPrint={persistence.print} status={persistence.status} onReset={() => setState(DEFAULTS)}/>
    <section className="mt-8" aria-live="polite" aria-atomic="true">
      <ResultGrid>
        <CalculatorResult label="Monthly ownership cost" value={formatMoney(result.monthly)} note="All entered recurring ownership costs"/>
        <CalculatorResult label="Annual ownership cost" value={formatMoney(result.annual)}/>
        <CalculatorResult label="Monthly property-tax input" value={formatMoney(state.taxes)}/>
      </ResultGrid>
    </section>
    <section className="mt-10 grid gap-8 lg:grid-cols-2">
      <div><h3 className="font-display text-2xl">Where the monthly budget goes</h3><div className="mt-5"><BreakdownChart items={breakdown}/></div></div>
      <div><h3 className="font-display text-2xl">Detailed monthly breakdown</h3><div className="mt-5"><BreakdownTable items={breakdown} total={result.monthly} totalLabel="Monthly ownership cost"/></div></div>
    </section>
    <MethodologyPanel>
      <p>The ownership total is the sum of the recurring monthly amounts you enter. It deliberately keeps financing, taxes, insurance, association charges, maintenance, utilities and property-specific extras visible instead of hiding them inside one estimate.</p>
      <p>The official tax-rate helper can calculate the property-tax line from the entered home value and selected finalized local rates. Verify exemptions, taxable values and exact taxing-unit membership for the parcel.</p>
    </MethodologyPanel>
  </>;
}
