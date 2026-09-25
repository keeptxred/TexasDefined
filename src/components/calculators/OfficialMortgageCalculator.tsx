import { useMemo, useState } from 'react';

import { OfficialTaxRateAssist } from '@/components/property/OfficialTaxRateAssist';
import { CountySelector } from '@/components/property/PropertyCalculatorFramework';
import {
  AdvancedInputs,
  CurrencyInput,
  FinancialCalculatorScaffold,
  FinancialInput,
  PercentageInput,
  formatCalculatorMoney,
  readCalculatorUrlState,
} from '@/components/calculators/FinancialCalculatorUI';
import { estimateMortgage, mortgageSensitivity } from '@/lib/financial/mortgage';

const DEFAULTS = {
  homePrice: 400000,
  downPayment: 80000,
  interestRate: 6.5,
  years: 30,
  propertyTaxRate: 2.1,
  annualInsurance: 2400,
  annualPmi: 0,
  monthlyHoa: 0,
  monthlySpecialDistrict: 0,
  monthlyUtilities: 350,
  monthlyMaintenance: 400,
  extraPrincipal: 0,
  county: '',
  rateYear: 2025,
};

export function OfficialMortgageCalculator({ defaultCountySlug = '' }: { defaultCountySlug?: string }) {
  const [state, setState] = useState(() => readCalculatorUrlState({ ...DEFAULTS, county: defaultCountySlug || DEFAULTS.county }));
  const set = <K extends keyof typeof state>(key: K, value: (typeof state)[K]) => setState((current) => ({ ...current, [key]: value }));

  const input = useMemo(() => ({
    homePrice: state.homePrice,
    downPayment: state.downPayment,
    annualInterestRate: state.interestRate,
    loanTermYears: state.years,
    annualPropertyTaxRate: state.propertyTaxRate,
    annualHomeInsurance: state.annualInsurance,
    annualPmi: state.annualPmi,
    monthlyHoa: state.monthlyHoa,
    monthlySpecialDistrict: state.monthlySpecialDistrict,
    monthlyUtilities: state.monthlyUtilities,
    monthlyMaintenance: state.monthlyMaintenance,
    extraPrincipal: state.extraPrincipal,
  }), [state]);

  const result = useMemo(() => estimateMortgage(input), [input]);
  const sensitivity = useMemo(() => mortgageSensitivity(input), [input]);
  const breakdown = [
    { label: 'Principal & interest', value: result.monthlyPrincipalInterest },
    { label: 'Property taxes', value: result.monthlyPropertyTax },
    { label: 'Homeowners insurance', value: result.monthlyHomeInsurance },
    { label: 'Mortgage insurance', value: result.monthlyPmi },
    { label: 'HOA', value: result.monthlyHoa },
    { label: 'Special districts', value: result.monthlySpecialDistrict },
    { label: 'Utilities', value: result.monthlyUtilities },
    { label: 'Maintenance', value: result.monthlyMaintenance },
  ];

  return (
    <FinancialCalculatorScaffold
      storageKey="texasdefined:mortgage-calculator"
      state={state}
      defaults={{ ...DEFAULTS, county: defaultCountySlug || DEFAULTS.county }}
      onRestore={setState}
      note="Your real payment may also include lender-specific mortgage insurance, escrow adjustments, assessments and closing costs. Use the exact parcel and lender documents before making a financial commitment."
      issues={result.issues}
      results={[
        { label: 'Estimated monthly ownership cost', value: formatCalculatorMoney(result.monthlyOwnershipCost) + '/mo', emphasis: true },
        { label: 'Housing payment before utilities/maintenance', value: formatCalculatorMoney(result.monthlyHousingPayment) + '/mo' },
        { label: 'Loan amount', value: formatCalculatorMoney(result.loanAmount) },
        { label: 'Principal & interest', value: formatCalculatorMoney(result.monthlyPrincipalInterest) + '/mo' },
        { label: 'Interest over modeled payoff', value: formatCalculatorMoney(result.amortization.interestPaid), note: result.amortization.payoffMonths + ' modeled payments with the current extra-principal setting.' },
        { label: 'Property taxes', value: formatCalculatorMoney(result.monthlyPropertyTax) + '/mo', note: state.rateYear + ' selected-rate scenario when official rates are applied.' },
      ]}
      summary={{
        'Monthly ownership': formatCalculatorMoney(result.monthlyOwnershipCost) + '/mo',
        'Housing payment': formatCalculatorMoney(result.monthlyHousingPayment) + '/mo',
        'Loan amount': formatCalculatorMoney(result.loanAmount),
        'Rate': state.interestRate.toFixed(2) + '%',
      }}
      breakdown={breakdown}
      sensitivity={sensitivity}
      methodology={{
        formula: 'Principal and interest use the standard fixed-rate amortization formula. Property taxes, insurance, mortgage insurance, HOA and selected district costs are added as recurring housing costs; utilities and maintenance are shown as ownership costs.',
        assumptions: [
          'The interest rate is treated as a fixed annual nominal rate for the selected term.',
          'Property-tax calculations use the entered or selected rate against the home price as a planning proxy; taxable values and exemptions can differ by taxing unit.',
          'Extra principal shortens the modeled payoff schedule but does not change taxes, insurance or other recurring ownership costs.',
        ],
        sources: ['Texas Comptroller finalized local taxing-unit rates when loaded through the official-rate assistant.', 'All other values remain user-entered planning assumptions unless explicitly labeled otherwise.'],
      }}
    >
      <CurrencyInput label="Home price" value={state.homePrice} onChange={(value) => set('homePrice', value)} step={1000} />
      <CurrencyInput label="Down payment" value={state.downPayment} onChange={(value) => set('downPayment', value)} step={1000} />
      <PercentageInput label="Interest rate" value={state.interestRate} onChange={(value) => set('interestRate', value)} step={0.01} max={30} />
      <FinancialInput label="Loan term" value={state.years} onChange={(value) => set('years', value)} step={1} min={1} max={50} suffix="years" />
      <CountySelector value={state.county} onChange={(value) => set('county', value)} />
      <div className="sm:col-span-2 lg:col-span-3">
        <OfficialTaxRateAssist countySlug={state.county} title="Fill the property-tax rate from official local rates" onApply={(rates) => setState((current) => ({ ...current, propertyTaxRate: rates.combinedRate, rateYear: rates.year }))} />
      </div>
      <div className="sm:col-span-2 lg:col-span-3">
        <AdvancedInputs>
          <PercentageInput label="Property-tax rate" value={state.propertyTaxRate} onChange={(value) => set('propertyTaxRate', value)} step={0.001} max={20} helper="Use the parcel's actual taxing-unit stack when available." />
          <CurrencyInput label="Annual homeowners insurance" value={state.annualInsurance} onChange={(value) => set('annualInsurance', value)} step={100} />
          <CurrencyInput label="Annual mortgage insurance / PMI" value={state.annualPmi} onChange={(value) => set('annualPmi', value)} step={100} />
          <CurrencyInput label="Monthly HOA" value={state.monthlyHoa} onChange={(value) => set('monthlyHoa', value)} step={25} />
          <CurrencyInput label="Monthly district / assessment cost" value={state.monthlySpecialDistrict} onChange={(value) => set('monthlySpecialDistrict', value)} step={25} />
          <CurrencyInput label="Monthly utilities" value={state.monthlyUtilities} onChange={(value) => set('monthlyUtilities', value)} step={25} />
          <CurrencyInput label="Monthly maintenance cushion" value={state.monthlyMaintenance} onChange={(value) => set('monthlyMaintenance', value)} step={25} />
          <CurrencyInput label="Extra principal each month" value={state.extraPrincipal} onChange={(value) => set('extraPrincipal', value)} step={25} />
        </AdvancedInputs>
      </div>
    </FinancialCalculatorScaffold>
  );
}
