import { useMemo, useState } from 'react';

import { OfficialTaxRateAssist } from '@/components/property/OfficialTaxRateAssist';
import { CountySelector } from '@/components/property/PropertyCalculatorFramework';
import {
  AdvancedInputs,
  CurrencyInput,
  FinancialCalculatorScaffold,
  formatCalculatorMoney,
  readCalculatorUrlState,
} from '@/components/calculators/FinancialCalculatorUI';
import { estimateHomeownership } from '@/lib/financial/homeownership';

const DEFAULTS = {
  homeValue: 400000,
  mortgage: 2400,
  taxes: 700,
  insurance: 250,
  mortgageInsurance: 0,
  hoa: 100,
  specialDistrict: 0,
  maintenance: 400,
  utilities: 350,
  poolLandscape: 0,
  county: '',
  rateYear: 2025,
};

export function OfficialHomeownershipCostCalculator() {
  const [state, setState] = useState(() => readCalculatorUrlState(DEFAULTS));
  const set = <K extends keyof typeof state>(key: K, value: (typeof state)[K]) => setState((current) => ({ ...current, [key]: value }));
  const result = useMemo(() => estimateHomeownership({
    mortgagePrincipalInterest: state.mortgage,
    propertyTaxes: state.taxes,
    homeownersInsurance: state.insurance,
    mortgageInsurance: state.mortgageInsurance,
    hoaFees: state.hoa,
    specialDistrictCosts: state.specialDistrict,
    maintenance: state.maintenance,
    utilities: state.utilities,
    poolLandscape: state.poolLandscape,
  }), [state]);

  return (
    <FinancialCalculatorScaffold
      storageKey="texasdefined:homeownership-cost-calculator"
      state={state}
      defaults={DEFAULTS}
      onRestore={setState}
      note="The mortgage payment is only one part of owning the house. Add special assessments, flood or wind coverage, repairs, pool or landscape service and other recurring costs when they apply."
      issues={result.issues}
      results={[
        { label: 'Monthly ownership cost', value: formatCalculatorMoney(result.monthlyOwnership) + '/mo', emphasis: true, note: 'Includes every recurring category entered below.' },
        { label: 'Annual ownership cost', value: formatCalculatorMoney(result.annualOwnership) },
        { label: 'Housing payment before maintenance/utilities', value: formatCalculatorMoney(result.monthlyHousing) + '/mo' },
        { label: 'Monthly property-tax input', value: formatCalculatorMoney(state.taxes), note: 'Uses a ' + state.rateYear + ' scenario when official rates are applied.' },
      ]}
      summary={{
        'Monthly ownership': formatCalculatorMoney(result.monthlyOwnership) + '/mo',
        'Annual ownership': formatCalculatorMoney(result.annualOwnership),
        'Property tax': formatCalculatorMoney(state.taxes) + '/mo',
      }}
      breakdown={result.breakdown}
      methodology={{
        formula: 'TexasDefined totals the recurring monthly costs you enter and separates core housing payment costs from maintenance, utilities and optional pool or landscape costs.',
        assumptions: [
          'Every field is monthly except home value.',
          'The official-rate helper estimates a monthly property-tax input from home value and selected taxing-unit rates; taxable values and exemptions may differ.',
          'Maintenance and utilities are planning allowances, not provider quotes.',
        ],
        sources: ['Texas Comptroller finalized local taxing-unit rates when loaded through the official-rate assistant.', 'Mortgage, insurance, HOA, maintenance, utility and pool/landscape values are user-entered.'],
      }}
    >
      <CurrencyInput label="Home value used for tax estimate" value={state.homeValue} onChange={(value) => set('homeValue', value)} step={1000} />
      <CurrencyInput label="Mortgage principal & interest" value={state.mortgage} onChange={(value) => set('mortgage', value)} step={25} />
      <CurrencyInput label="Property taxes" value={state.taxes} onChange={(value) => set('taxes', value)} step={25} />
      <CurrencyInput label="Homeowners insurance" value={state.insurance} onChange={(value) => set('insurance', value)} step={25} />
      <CountySelector value={state.county} onChange={(value) => set('county', value)} />
      <div className="sm:col-span-2 lg:col-span-3">
        <OfficialTaxRateAssist countySlug={state.county} title="Estimate monthly property taxes from official local rates" onApply={(rates) => setState((current) => ({ ...current, taxes: Math.max(0, current.homeValue) * rates.combinedRate / 100 / 12, rateYear: rates.year }))} />
      </div>
      <div className="sm:col-span-2 lg:col-span-3">
        <AdvancedInputs>
          <CurrencyInput label="Mortgage insurance / PMI" value={state.mortgageInsurance} onChange={(value) => set('mortgageInsurance', value)} step={25} />
          <CurrencyInput label="HOA and other fees" value={state.hoa} onChange={(value) => set('hoa', value)} step={25} />
          <CurrencyInput label="MUD/PID/special-district costs" value={state.specialDistrict} onChange={(value) => set('specialDistrict', value)} step={25} />
          <CurrencyInput label="Maintenance cushion" value={state.maintenance} onChange={(value) => set('maintenance', value)} step={25} />
          <CurrencyInput label="Utilities" value={state.utilities} onChange={(value) => set('utilities', value)} step={25} />
          <CurrencyInput label="Pool / landscaping" value={state.poolLandscape} onChange={(value) => set('poolLandscape', value)} step={25} />
        </AdvancedInputs>
      </div>
    </FinancialCalculatorScaffold>
  );
}
