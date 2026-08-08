import { createFileRoute, Link } from '@tanstack/react-router';
import { useCallback, useMemo, useState } from 'react';

import { texasDefinedBrand } from '@/brand/texasdefined';
import {
  CalculatorActions,
  CalculatorCountyLink,
  CalculatorResult,
  CalculatorSection,
  ComparisonBars,
  CountySelector,
  CurrencyInput,
  PercentageInput,
  ResultGrid,
  formatMoney,
  useCalculatorPersistence,
  useUrlStateDefaults,
  type CalculatorState,
} from '@/components/property/PropertyCalculatorFramework';
import { Container } from '@/components/layout/Container';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-property-tax-protest-savings-calculator';
const description = 'Estimate potential Texas property-tax savings from a successful appraisal protest using proposed value, target value and the combined tax rate for the property.';
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

type ProtestState = {
  proposedValue: number;
  targetValue: number;
  taxRate: number;
  confidence: number;
  county: string;
};

const DEFAULTS: ProtestState & CalculatorState = {
  proposedValue: 450000,
  targetValue: 410000,
  taxRate: 2.2,
  confidence: 50,
  county: '',
};

export const Route = createFileRoute('/texas-property-tax-protest-savings-calculator')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Property Tax Protest Savings Calculator',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          '@id': `${pageUrl}#calculator`,
          name: 'Texas Property Tax Protest Savings Calculator',
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
            { '@type': 'ListItem', position: 4, name: 'Protest savings calculator', item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: ProtestSavingsCalculator,
});

const tax = (value: number, rate: number) => Math.max(0, value) * Math.max(0, rate) / 100;

function ProtestSavingsCalculator() {
  const initial = useUrlStateDefaults(DEFAULTS);
  const [state, setState] = useState<ProtestState>({
    proposedValue: Number(initial.proposedValue),
    targetValue: Number(initial.targetValue),
    taxRate: Number(initial.taxRate),
    confidence: Number(initial.confidence),
    county: String(initial.county),
  });

  const update = useCallback(<K extends keyof ProtestState>(key: K, value: ProtestState[K]) => {
    setState((current) => ({ ...current, [key]: value }));
  }, []);

  const results = useMemo(() => {
    const proposedValue = Math.max(0, state.proposedValue);
    const targetValue = Math.max(0, Math.min(state.targetValue, proposedValue));
    const taxRate = Math.max(0, state.taxRate);
    const reduction = Math.max(0, proposedValue - targetValue);
    const annualSavings = tax(reduction, taxRate);
    const monthlySavings = annualSavings / 12;
    const percentReduction = proposedValue > 0 ? (reduction / proposedValue) * 100 : 0;
    const expectedSavings = annualSavings * Math.max(0, Math.min(100, state.confidence)) / 100;

    let message = 'Use the probability slider only as your own planning assumption; Texas appraisal districts and ARBs do not publish a universal success probability for an individual protest.';
    if (state.confidence >= 75) message = 'Your planning scenario assumes a high likelihood of reaching the target value. Treat the expected-savings figure as a scenario, not a prediction.';
    else if (state.confidence <= 25) message = 'Your planning scenario assumes a low likelihood of reaching the target value. The full-savings figure still shows the tax effect if the target value were achieved.';

    return { reduction, annualSavings, monthlySavings, percentReduction, expectedSavings, message, targetValue };
  }, [state]);

  const persistence = useCalculatorPersistence({
    storageKey: 'texasdefined:property-tax-protest-savings-calculator',
    state,
    onRestore: (saved) => setState({
      proposedValue: Number(saved.proposedValue),
      targetValue: Number(saved.targetValue),
      taxRate: Number(saved.taxRate),
      confidence: Number(saved.confidence),
      county: String(saved.county),
    }),
  });

  return (
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span>
          <Link to="/property">Property</Link><span aria-hidden="true" className="mx-2">/</span>
          <Link to="/property-tax-calculators">Calculators</Link><span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">Protest savings</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Property-tax calculator</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas property-tax protest savings calculator</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">Estimate the tax impact of reducing a proposed appraisal value to a target value. This measures the potential tax savings, not whether a protest will succeed.</p>
          </div>
          <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">Use the combined adopted rate for the exact property. Exemptions, ceilings and special appraisal can make an actual tax bill differ from a simple value-times-rate estimate.</p>
        </header>

        <CalculatorSection eyebrow="Inputs" title="Set the protest scenario" copy="Use the proposed value from the appraisal notice, a supportable target value, and the combined tax rate serving the property.">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <CurrencyInput label="Proposed appraised value" value={state.proposedValue} onChange={(value) => update('proposedValue', value)} />
            <CurrencyInput label="Target value" value={state.targetValue} onChange={(value) => update('targetValue', value)} />
            <PercentageInput label="Combined tax rate" value={state.taxRate} onChange={(value) => update('taxRate', value)} step={0.001} />
            <CountySelector value={state.county} onChange={(value) => update('county', value)} />
          </div>
          <CalculatorCountyLink countySlug={state.county} />
        </CalculatorSection>

        <section className="border-y border-border py-10">
          <p className="eyebrow text-primary">Potential tax effect</p>
          <h2 className="mt-2 font-display text-3xl">If the target value is achieved</h2>
          <ResultGrid>
            <CalculatorResult label="Value reduction" value={formatMoney(results.reduction)} />
            <CalculatorResult label="Estimated annual savings" value={formatMoney(results.annualSavings)} />
            <CalculatorResult label="Estimated monthly savings" value={formatMoney(results.monthlySavings)} />
          </ResultGrid>
          <div className="mt-8">
            <ComparisonBars items={[{ label: 'Proposed value', value: state.proposedValue }, { label: 'Target value', value: results.targetValue }]} />
          </div>
        </section>

        <CalculatorSection eyebrow="Planning assumption" title="Probability-weighted scenario" copy="This does not estimate legal or procedural odds. Set your own planning assumption if you want a conservative expected-value view.">
          <label className="block border-t border-border pt-4 text-sm font-semibold">
            <span className="flex items-center justify-between gap-4"><span>Assumed chance of reaching target</span><span className="font-normal text-muted-foreground">{state.confidence.toFixed(0)}%</span></span>
            <input className="mt-4 w-full accent-current" type="range" min="0" max="100" step="5" value={state.confidence} onChange={(event) => update('confidence', Number(event.target.value))} />
          </label>
          <ResultGrid>
            <CalculatorResult label="Target reduction" value={`${results.percentReduction.toFixed(1)}%`} />
            <CalculatorResult label="Probability-weighted annual savings" value={formatMoney(results.expectedSavings)} />
            <CalculatorResult label="Full annual savings" value={formatMoney(results.annualSavings)} />
          </ResultGrid>
          <p className="text-sm leading-6 text-muted-foreground">{results.message}</p>
        </CalculatorSection>

        <CalculatorActions onSave={persistence.save} onRestore={persistence.restore} onShare={persistence.share} onPrint={persistence.print} status={persistence.status} />

        <section className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
          <Link to="/do/property-tax-protest" className="border-b border-border pb-5"><span className="eyebrow text-primary">Prepare the case</span><strong className="mt-2 block font-display text-2xl">Texas property-tax protest guide →</strong></Link>
          <Link to="/learn/property-tax-appeals-arbitration" className="border-b border-border pb-5"><span className="eyebrow text-primary">After the ARB</span><strong className="mt-2 block font-display text-2xl">Appeals and arbitration guide →</strong></Link>
        </section>

        <p className="mt-8 text-sm leading-6 text-muted-foreground">This calculator estimates the tax effect of a value change. It does not predict whether an appraisal district, ARB, arbitrator or court will agree with a requested value.</p>
      </article>
    </Container>
  );
}
