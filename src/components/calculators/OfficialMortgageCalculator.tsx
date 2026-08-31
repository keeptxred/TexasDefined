import { useMemo, useState } from 'react';
import { OfficialTaxRateAssist } from '@/components/property/OfficialTaxRateAssist';
import { CalculatorResult, CountySelector, CurrencyInput, PercentageInput, ResultGrid, NumberInput, formatMoney } from '@/components/property/PropertyCalculatorFramework';

export function OfficialMortgageCalculator({ defaultCountySlug = '' }: { defaultCountySlug?: string }) {
  const [price, setPrice] = useState(400000);
  const [down, setDown] = useState(80000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(2.1);
  const [insurance, setInsurance] = useState(2400);
  const [county, setCounty] = useState(defaultCountySlug);
  const [rateYear, setRateYear] = useState(2025);

  const result = useMemo(() => {
    const principal = Math.max(0, price - down);
    const months = Math.max(1, years * 12);
    const monthlyRate = Math.max(0, rate) / 1200;
    const principalInterest = monthlyRate
      ? principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
      : principal / months;
    const taxes = Math.max(0, price) * Math.max(0, propertyTaxRate) / 100 / 12;
    const monthlyInsurance = Math.max(0, insurance) / 12;
    return { principal, principalInterest, taxes, monthlyInsurance, total: principalInterest + taxes + monthlyInsurance };
  }, [price, down, rate, years, propertyTaxRate, insurance]);

  return <>
    <section className="mt-10 border-y border-border py-7">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <CurrencyInput label="Home price" value={price} onChange={setPrice} step={1000}/>
        <CurrencyInput label="Down payment" value={down} onChange={setDown} step={1000}/>
        <PercentageInput label="Interest rate" value={rate} onChange={setRate} step={0.01}/>
        <NumberInput label="Loan term" value={years} onChange={setYears} step={1} suffix="years"/>
        <PercentageInput label="Property-tax rate" value={propertyTaxRate} onChange={setPropertyTaxRate} step={0.001}/>
        <CurrencyInput label="Annual homeowners insurance" value={insurance} onChange={setInsurance} step={100}/>
        <CountySelector value={county} onChange={setCounty}/>
      </div>
      <div className="mt-6">
        <OfficialTaxRateAssist countySlug={county} title="Fill the mortgage property-tax rate from official local rates" onApply={(rates) => { setPropertyTaxRate(rates.combinedRate); setRateYear(rates.year); }}/>
      </div>
      <p className="mt-6 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">A good starting point.</strong> Your real payment may also include mortgage insurance, HOA dues, escrow adjustments and closing costs. Special-district taxes are included only when you select the districts that actually serve the parcel.</p>
    </section>
    <section className="mt-8" aria-live="polite" aria-atomic="true">
      <ResultGrid>
        <CalculatorResult label="Loan amount" value={formatMoney(result.principal)}/>
        <CalculatorResult label="Principal & interest" value={`${formatMoney(result.principalInterest)}/mo`}/>
        <CalculatorResult label="Property taxes" value={`${formatMoney(result.taxes)}/mo`} note={`${rateYear} selected-rate scenario`}/>
      </ResultGrid>
      <ResultGrid>
        <CalculatorResult label="Homeowners insurance" value={`${formatMoney(result.monthlyInsurance)}/mo`}/>
        <CalculatorResult label="Estimated total" value={`${formatMoney(result.total)}/mo`}/>
      </ResultGrid>
    </section>
  </>;
}
