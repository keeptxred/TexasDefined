import { createFileRoute, Link } from '@tanstack/react-router';
import { useCallback, useMemo, useState } from 'react';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { OfficialTaxRateAssist } from '@/components/property/OfficialTaxRateAssist';
import {
  CalculatorActions,
  CalculatorCountyLink,
  CalculatorResult,
  CalculatorSection,
  ComparisonBars,
  CurrencyInput,
  CountySelector,
  PercentageInput,
  ResultGrid,
  formatMoney,
  useCalculatorPersistence,
  useUrlStateDefaults,
  type CalculatorState,
} from '@/components/property/PropertyCalculatorFramework';
import { Container } from '@/components/layout/Container';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-homestead-savings-calculator';
const description = 'Use the Texas homestead exemption calculator to estimate annual property-tax savings and monthly tax impact with separate school-district and other local exemptions and rates.';
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

interface HomesteadState extends CalculatorState {
  homeValue: number;
  schoolRate: number;
  otherRate: number;
  schoolExemption: number;
  otherExemption: number;
  county: string;
}

const DEFAULTS: HomesteadState = {
  homeValue: 400000,
  schoolRate: 1.0,
  otherRate: 1.2,
  schoolExemption: 140000,
  otherExemption: 0,
  county: '',
};

export const Route = createFileRoute('/texas-homestead-savings-calculator')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Homestead Exemption Calculator | Estimate Tax Savings', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebApplication', '@id': `${pageUrl}#calculator`, name: 'Texas Homestead Exemption Calculator', description, url: pageUrl, applicationCategory: 'FinanceApplication', operatingSystem: 'Any', isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` } },
        { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl(texasDefinedBrand, '/') },
          { '@type': 'ListItem', position: 2, name: 'Property', item: absoluteUrl(texasDefinedBrand, '/property') },
          { '@type': 'ListItem', position: 3, name: 'Property-tax calculators', item: absoluteUrl(texasDefinedBrand, '/property-tax-calculators') },
          { '@type': 'ListItem', position: 4, name: 'Homestead exemption calculator', item: pageUrl },
        ] },
      ],
    })],
  }),
  component: HomesteadSavingsCalculator,
});

const tax = (value: number, rate: number) => Math.max(0, value) * Math.max(0, rate) / 100;

function HomesteadSavingsCalculator() {
  const initial = useUrlStateDefaults(DEFAULTS);
  const [state, setState] = useState<HomesteadState>(initial);
  const [officialYear, setOfficialYear] = useState<number | null>(null);

  const updateNumber = useCallback((key: 'homeValue' | 'schoolRate' | 'otherRate' | 'schoolExemption' | 'otherExemption', value: number) => setState((current) => ({ ...current, [key]: value })), []);
  const updateCounty = useCallback((county: string) => { setState((current) => ({ ...current, county })); setOfficialYear(null); }, []);

  const results = useMemo(() => {
    const value = Math.max(0, state.homeValue);
    const schoolRate = Math.max(0, state.schoolRate);
    const otherRate = Math.max(0, state.otherRate);
    const schoolExemption = Math.min(value, Math.max(0, state.schoolExemption));
    const otherExemption = Math.min(value, Math.max(0, state.otherExemption));
    const beforeSchool = tax(value, schoolRate), beforeOther = tax(value, otherRate);
    const afterSchool = tax(value - schoolExemption, schoolRate), afterOther = tax(value - otherExemption, otherRate);
    const before = beforeSchool + beforeOther, after = afterSchool + afterOther;
    const annualSavings = Math.max(0, before - after);
    return { combinedRate: schoolRate + otherRate, taxableSchoolValue: Math.max(0, value - schoolExemption), taxableOtherValue: Math.max(0, value - otherExemption), before, after, annualSavings, monthlySavings: annualSavings / 12, monthlyTaxAfter: after / 12 };
  }, [state]);

  const persistence = useCalculatorPersistence<HomesteadState>({ storageKey: 'texasdefined:homestead-savings-calculator', state, onRestore: setState });

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16"><article className="mx-auto max-w-6xl">
    <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span className="mx-2">/</span><Link to="/property">Property</Link><span className="mx-2">/</span><Link to="/property-tax-calculators">Calculators</Link><span className="mx-2">/</span><span>Homestead exemption</span></nav>
    <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end"><div><p className="eyebrow text-primary">Property-tax calculator</p><h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas homestead exemption calculator</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">Estimate the tax savings from residence-homestead exemptions using the school and other local tax rates that actually apply to the property.</p></div><p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">School and other local exemptions stay separate because one exemption does not automatically reduce taxable value for every taxing unit.</p></header>
    <CalculatorSection eyebrow="Inputs" title="Enter the property and tax rates" copy="Choose the county to load finalized Comptroller-reported rates, then select the actual city, ISD and special districts serving the parcel."><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"><CurrencyInput label="Home value" value={state.homeValue} onChange={(value) => updateNumber('homeValue', value)} /><PercentageInput label="School-district tax rate" value={state.schoolRate} onChange={(value) => updateNumber('schoolRate', value)} step={0.001} /><PercentageInput label="Other local tax rates combined" value={state.otherRate} onChange={(value) => updateNumber('otherRate', value)} step={0.001} /><CurrencyInput label="School homestead exemption" value={state.schoolExemption} onChange={(value) => updateNumber('schoolExemption', value)} /><CurrencyInput label="Other local exemptions" value={state.otherExemption} onChange={(value) => updateNumber('otherExemption', value)} /><CountySelector value={state.county} onChange={updateCounty} /></div><OfficialTaxRateAssist countySlug={state.county} onApply={(rates) => { setState((current) => ({ ...current, schoolRate: rates.schoolRate, otherRate: rates.otherRate })); setOfficialYear(rates.year); }} /><CalculatorCountyLink countySlug={state.county} />{officialYear ? <p className="text-xs text-muted-foreground">Rate inputs were filled from the {officialYear} finalized Comptroller dataset; exemptions remain your parcel-specific inputs.</p> : null}</CalculatorSection>
    <section className="border-y border-border py-10"><p className="eyebrow text-primary">Estimated result</p><h2 className="mt-2 font-display text-3xl">What the exemption changes</h2><ResultGrid><CalculatorResult label="Annual savings" value={formatMoney(results.annualSavings)} /><CalculatorResult label="Monthly savings" value={formatMoney(results.monthlySavings)} /><CalculatorResult label="Estimated monthly tax after exemptions" value={formatMoney(results.monthlyTaxAfter)} /></ResultGrid><div className="mt-8"><ComparisonBars items={[{ label: 'Before exemptions', value: results.before }, { label: 'After exemptions', value: results.after }]} /></div></section>
    <CalculatorSection eyebrow="Taxable value" title="See the two taxable-value scenarios"><ResultGrid><CalculatorResult label="Combined entered tax rate" value={`${results.combinedRate.toFixed(3)}%`} /><CalculatorResult label="School taxable value" value={formatMoney(results.taxableSchoolValue)} /><CalculatorResult label="Other local taxable value" value={formatMoney(results.taxableOtherValue)} /></ResultGrid></CalculatorSection>
    <CalculatorActions onSave={persistence.save} onRestore={persistence.restore} onShare={persistence.share} onPrint={persistence.print} status={persistence.status} />
    <section className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4"><Link to="/do/homestead-exemption" className="border-b border-border pb-5"><span className="eyebrow text-primary">Eligibility</span><strong className="mt-2 block font-display text-2xl">Texas homestead exemption guide →</strong></Link><Link to="/learn/property-taxes" className="border-b border-border pb-5"><span className="eyebrow text-primary">How it fits together</span><strong className="mt-2 block font-display text-2xl">Texas property-tax guide →</strong></Link><a href="/property-tax-calculator/harris-county" className="border-b border-border pb-5"><span className="eyebrow text-primary">Local rates</span><strong className="mt-2 block font-display text-2xl">Harris County tax calculator →</strong></a><a href="/property-tax-calculator/collin-county" className="border-b border-border pb-5"><span className="eyebrow text-primary">Local rates</span><strong className="mt-2 block font-display text-2xl">Collin County tax calculator →</strong></a></section>
    <p className="mt-8 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">This is a planning estimate, not a tax bill or eligibility determination. Confirm exemptions with the appraisal district and the exact parcel jurisdictions before relying on the result.</p>
  </article></Container>;
}
