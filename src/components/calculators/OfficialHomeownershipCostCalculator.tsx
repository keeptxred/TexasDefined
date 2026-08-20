import { useMemo, useState } from 'react';
import { OfficialTaxRateAssist } from '@/components/property/OfficialTaxRateAssist';
import { CalculatorResult, CountySelector, CurrencyInput, ResultGrid, formatMoney } from '@/components/property/PropertyCalculatorFramework';

export function OfficialHomeownershipCostCalculator() {
  const [homeValue, setHomeValue] = useState(400000);
  const [mortgage, setMortgage] = useState(2400);
  const [taxes, setTaxes] = useState(700);
  const [insurance, setInsurance] = useState(250);
  const [hoa, setHoa] = useState(100);
  const [maintenance, setMaintenance] = useState(400);
  const [utilities, setUtilities] = useState(350);
  const [county, setCounty] = useState('');
  const [rateYear, setRateYear] = useState(2025);

  const total = useMemo(() => mortgage + taxes + insurance + hoa + maintenance + utilities, [mortgage, taxes, insurance, hoa, maintenance, utilities]);

  return <>
    <section className="mt-10 border-y border-border py-7">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <CurrencyInput label="Home value used for tax estimate" value={homeValue} onChange={setHomeValue} step={1000}/>
        <CurrencyInput label="Mortgage" value={mortgage} onChange={setMortgage}/>
        <CurrencyInput label="Property taxes" value={taxes} onChange={setTaxes}/>
        <CurrencyInput label="Insurance" value={insurance} onChange={setInsurance}/>
        <CurrencyInput label="HOA and other fees" value={hoa} onChange={setHoa}/>
        <CurrencyInput label="Maintenance cushion" value={maintenance} onChange={setMaintenance}/>
        <CurrencyInput label="Utilities" value={utilities} onChange={setUtilities}/>
        <CountySelector value={county} onChange={setCounty}/>
      </div>
      <div className="mt-6">
        <OfficialTaxRateAssist countySlug={county} title="Estimate monthly property taxes from official local rates" onApply={(rates) => { setTaxes(Math.max(0, homeValue) * rates.combinedRate / 100 / 12); setRateYear(rates.year); }}/>
      </div>
      <p className="mt-6 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">A good starting point.</strong> Add special assessments, flood or wind coverage, repairs and larger home projects when they apply. The property-tax line remains editable because exemptions and taxable values can differ by taxing unit.</p>
    </section>
    <section className="mt-8" aria-live="polite" aria-atomic="true">
      <ResultGrid>
        <CalculatorResult label="Monthly ownership cost" value={formatMoney(total)} note={`Property-tax line uses a ${rateYear} scenario when official rates are applied.`}/>
        <CalculatorResult label="Annual ownership cost" value={formatMoney(total * 12)}/>
        <CalculatorResult label="Monthly property-tax input" value={formatMoney(taxes)}/>
      </ResultGrid>
    </section>
  </>;
}
