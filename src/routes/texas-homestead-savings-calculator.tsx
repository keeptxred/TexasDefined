import { createFileRoute, Link } from '@tanstack/react-router';
import { useCallback, useMemo, useState } from 'react';

import { texasDefinedBrand } from '@/brand/texasdefined';
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
const description = 'Estimate how a Texas residence homestead exemption can change annual property taxes and monthly tax escrow using separate school-district and other local tax rates.';
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
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Homestead Exemption Savings Calculator',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          '@id': `${pageUrl}#calculator`,
          name: 'Texas Homestead Exemption Savings Calculator',
          description,
          url: pageUrl,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Any',
          isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl(texasDefinedBrand, '/') },
            { '@type': 'ListItem', position: 2, name: 'Property', item: absoluteUrl(texasDefinedBrand, '/property') },
            { '@type': 'ListItem', position: 3, name: 'Property-tax calculators', item: absoluteUrl(texasDefinedBrand, '/property-tax-calculators') },
            { '@type': 'ListItem', position: 4, name: 'Homestead savings calculator', item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: HomesteadSavingsCalculator,
});

const tax = (value: number, rate: number) => Math.max(0, value) * Math.max(0, rate) / 100;

function HomesteadSavingsCalculator() {
  const initial = useUrlStateDefaults(DEFAULTS);
  const [state, setState] = useState<HomesteadState>(initial);

  const updateNumber = useCallback((key: 'homeValue' | 'schoolRate' | 'otherRate' | 'schoolExemption' | 'otherExemption', value: number) => {
    setState((current) => ({ ...current, [key]: value }));
  }, []);

  const updateCounty = useCallback((county: string) => {
    setState((current) => ({ ...current, county }));
  }, []);

  const results = useMemo(() => {
    const value = Math.max(0, state.homeValue);
    const schoolRate = Math.max(0, state.schoolRate);
    const otherRate = Math.max(0, state.otherRate);
    const schoolExemption = Math.min(value, Math.max(0, state.schoolExemption));
    const otherExemption = Math.min(value, Math.max(0, state.otherExemption));

    const beforeSchool = tax(value, schoolRate);
    const beforeOther = tax(value, otherRate);
    const afterSchool = tax(value - schoolExemption, schoolRate);
    const afterOther = tax(value - otherExemption, otherRate);
    const before = beforeSchool + beforeOther;
    const after = afterSchool + afterOther;
    const annualSavings = Math.max(0, before - after);

    return {
      combinedRate: schoolRate + otherRate,
      taxableSchoolValue: Math.max(0, value - schoolExemption),
      taxableOtherValue: Math.max(0, value - otherExemption),
      before,
      after,
      annualSavings,
      monthlySavings: annualSavings / 12,
      monthlyTaxAfter: after / 12,
    };
  }, [state]);

  const persistence = useCalculatorPersistence<HomesteadState>({
    storageKey: 'texasdefined:homestead-savings-calculator',
    state,
    onRestore: setState,
  });

  return (
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span>
          <Link to="/property">Property</Link><span aria-hidden="true" className="mx-2">/</span>
          <Link to="/property-tax-calculators">Calculators</Link><span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">Homestead savings</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Property-tax calculator</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas homestead exemption savings calculator</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">Estimate the difference between taxes before and after residence-homestead exemptions using the rates that actually apply to the property.</p>
          </div>
          <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">The statewide school-district residence-homestead exemption is entered separately because it does not automatically reduce the taxable value used by every other local taxing unit.</p>
        </header>

        <CalculatorSection eyebrow="Inputs" title="Enter the property and tax rates" copy="Use the appraisal record and adopted rates for the exact property. Local optional exemptions can differ by taxing unit.">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <CurrencyInput label="Home value" value={state.homeValue} onChange={(value) => updateNumber('homeValue', value)} />
            <PercentageInput label="School-district tax rate" value={state.schoolRate} onChange={(value) => updateNumber('schoolRate', value)} step={0.001} />
            <PercentageInput label="Other local tax rates combined" value={state.otherRate} onChange={(value) => updateNumber('otherRate', value)} step={0.001} />
            <CurrencyInput label="School homestead exemption" value={state.schoolExemption} onChange={(value) => updateNumber('schoolExemption', value)} />
            <CurrencyInput label="Other local exemptions" value={state.otherExemption} onChange={(value) => updateNumber('otherExemption', value)} />
            <CountySelector value={state.county} onChange={updateCounty} />
          </div>
          <CalculatorCountyLink countySlug={state.county} />
        </CalculatorSection>

        <section className="border-y border-border py-10">
          <p className="eyebrow text-primary">Estimated result</p>
          <h2 className="mt-2 font-display text-3xl">What the exemption changes</h2>
          <ResultGrid>
            <CalculatorResult label="Annual savings" value={formatMoney(results.annualSavings)} />
            <CalculatorResult label="Monthly savings" value={formatMoney(results.monthlySavings)} />
            <CalculatorResult label="Estimated monthly tax after exemptions" value={formatMoney(results.monthlyTaxAfter)} />
          </ResultGrid>
          <div className="mt-8">
            <ComparisonBars items={[{ label: 'Before exemptions', value: results.before }, { label: 'After exemptions', value: results.after }]} />
          </div>
        </section>

        <CalculatorSection eyebrow="Taxable value" title="See the two taxable-value scenarios" copy="The school exemption and other local exemptions are modeled separately to avoid applying one exemption to taxing units that may not grant it.">
          <ResultGrid>
            <CalculatorResult label="Combined entered tax rate" value={`${results.combinedRate.toFixed(3)}%`} />
            <CalculatorResult label="School taxable value" value={formatMoney(results.taxableSchoolValue)} />
            <CalculatorResult label="Other local taxable value" value={formatMoney(results.taxableOtherValue)} />
          </ResultGrid>
        </CalculatorSection>

        <CalculatorActions onSave={persistence.save} onRestore={persistence.restore} onShare={persistence.share} onPrint={persistence.print} status={persistence.status} />

        <section className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
          <Link to="/do/homestead-exemption" className="border-b border-border pb-5"><span className="eyebrow text-primary">Eligibility</span><strong className="mt-2 block font-display text-2xl">Texas homestead exemption guide →</strong></Link>
          <Link to="/learn/property-taxes" className="border-b border-border pb-5"><span className="eyebrow text-primary">How it fits together</span><strong className="mt-2 block font-display text-2xl">Texas property-tax guide →</strong></Link>
        </section>

        <section className="mt-8 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
          <p>This is a planning estimate, not a tax bill or eligibility determination. Confirm exemptions with the appraisal district and rates with the taxing units serving the property.</p>
          <a className="mt-3 inline-block font-semibold text-primary underline decoration-primary/50 underline-offset-4" href="https://comptroller.texas.gov/taxes/property-tax/exemptions/" target="_blank" rel="noreferrer noopener">Texas Comptroller residence-homestead exemption guidance ↗</a>
        </section>
      </article>
    </Container>
  );
}
