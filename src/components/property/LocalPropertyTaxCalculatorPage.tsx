import { Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { Container } from '@/components/layout/Container';
import { OfficialTaxRateAssist, type AppliedOfficialTaxRates } from '@/components/property/OfficialTaxRateAssist';
import {
  CalculatorActions,
  CalculatorCountyLink,
  CalculatorResult,
  CalculatorSection,
  CountySelector,
  CurrencyInput,
  ResultGrid,
  formatMoney,
  useCalculatorPersistence,
  useUrlStateDefaults,
  type CalculatorState,
} from '@/components/property/PropertyCalculatorFramework';
import type { LocalPropertyTaxProfile } from '@/data/local-property-tax-calculators';

type State = CalculatorState & {
  homeValue: number;
  schoolExemption: number;
  otherExemption: number;
  schoolRate: number;
  otherRate: number;
  county: string;
  rateYear: number;
};

type VerifiedCountyGuide = { href: string; label: string } | null;

export function LocalPropertyTaxCalculatorPage({
  profile,
  verifiedCountyGuide,
}: {
  profile: LocalPropertyTaxProfile;
  verifiedCountyGuide?: VerifiedCountyGuide;
}) {
  const defaults: State = {
    homeValue: 400000,
    schoolExemption: 0,
    otherExemption: 0,
    schoolRate: 0,
    otherRate: 0,
    county: profile.defaultCountySlug,
    rateYear: 2025,
  };
  const initial = useUrlStateDefaults(defaults);
  const [state, setState] = useState<State>({
    homeValue: Number(initial.homeValue),
    schoolExemption: Number(initial.schoolExemption),
    otherExemption: Number(initial.otherExemption),
    schoolRate: Number(initial.schoolRate),
    otherRate: Number(initial.otherRate),
    county: String(initial.county),
    rateYear: Number(initial.rateYear),
  });

  const applyOfficialRates = (rates: AppliedOfficialTaxRates) => {
    setState((current) => ({
      ...current,
      schoolRate: rates.schoolRate,
      otherRate: rates.otherRate,
      rateYear: rates.year,
    }));
  };

  const result = useMemo(() => {
    const value = Math.max(0, state.homeValue);
    const schoolTaxable = Math.max(0, value - Math.max(0, state.schoolExemption));
    const otherTaxable = Math.max(0, value - Math.max(0, state.otherExemption));
    const schoolTax = schoolTaxable * Math.max(0, state.schoolRate) / 100;
    const otherTax = otherTaxable * Math.max(0, state.otherRate) / 100;
    const total = schoolTax + otherTax;
    return {
      schoolTaxable,
      otherTaxable,
      schoolTax,
      otherTax,
      total,
      monthly: total / 12,
      combinedRate: state.schoolRate + state.otherRate,
    };
  }, [state]);

  const persistence = useCalculatorPersistence<State>({
    storageKey: `texasdefined:local-property-tax:${profile.slug}`,
    state,
    onRestore: (saved) => setState({
      homeValue: Number(saved.homeValue),
      schoolExemption: Number(saved.schoolExemption),
      otherExemption: Number(saved.otherExemption),
      schoolRate: Number(saved.schoolRate),
      otherRate: Number(saved.otherRate),
      county: String(saved.county),
      rateYear: Number(saved.rateYear),
    }),
  });

  return (
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/">Front page</Link><span className="mx-2">/</span>
          <Link to="/property-tax-calculators">Property-tax calculators</Link><span className="mx-2">/</span>
          <span>{profile.name}</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">{profile.eyebrow}</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{profile.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{profile.intro}</p>
          </div>
          <p className="border-l border-border pl-6 text-sm leading-7 text-muted-foreground">{profile.jurisdictionNote}</p>
        </header>

        <section className="border-b border-border py-10" aria-labelledby={`${profile.slug}-method-heading`}>
          <p className="eyebrow text-primary">How to get a useful estimate</p>
          <h2 id={`${profile.slug}-method-heading`} className="mt-2 font-display text-4xl">Build the parcel's actual taxing-unit stack</h2>
          <ol className="mt-7 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {profile.planningPoints.map((point, index) => (
              <li key={point} className="bg-background p-6">
                <span className="eyebrow text-primary">0{index + 1}</span>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{point}</p>
              </li>
            ))}
          </ol>
        </section>

        <CalculatorSection eyebrow="Property" title="Set the value, exemptions and county" copy="The county narrows the official taxing-unit list. The exact parcel determines which city, school district and special districts you should select.">
          {profile.counties.length > 1 ? (
            <div className="mb-6 flex flex-wrap gap-2" aria-label={`${profile.name} county shortcuts`}>
              {profile.counties.map((county) => (
                <button
                  key={county.slug}
                  type="button"
                  onClick={() => setState((current) => ({ ...current, county: county.slug }))}
                  className={`border px-3 py-2 text-sm font-semibold ${state.county === county.slug ? 'border-primary text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}
                >
                  {county.name}
                </button>
              ))}
            </div>
          ) : null}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <CurrencyInput label="Appraised / market value" value={state.homeValue} onChange={(homeValue) => setState((current) => ({ ...current, homeValue }))} />
            <CurrencyInput label="School taxable-value exemption" value={state.schoolExemption} onChange={(schoolExemption) => setState((current) => ({ ...current, schoolExemption }))} />
            <CurrencyInput label="Other local exemption" value={state.otherExemption} onChange={(otherExemption) => setState((current) => ({ ...current, otherExemption }))} />
            <CountySelector value={state.county} onChange={(county) => setState((current) => ({ ...current, county }))} />
          </div>
          <OfficialTaxRateAssist countySlug={state.county} onApply={applyOfficialRates} title={`Use official rates for this ${profile.name} scenario`} />
          {verifiedCountyGuide && state.county === profile.defaultCountySlug
            ? <a href={verifiedCountyGuide.href} className="text-sm font-semibold underline decoration-primary/50 underline-offset-4">{verifiedCountyGuide.label} →</a>
            : <CalculatorCountyLink countySlug={state.county} />}
        </CalculatorSection>

        <section className="border-y border-border py-10" aria-labelledby={`${profile.slug}-result-heading`}>
          <p className="eyebrow text-primary">Estimate</p>
          <h2 id={`${profile.slug}-result-heading`} className="mt-2 font-display text-3xl">Estimated annual property tax</h2>
          <ResultGrid>
            <CalculatorResult label="Annual tax" value={formatMoney(result.total)} note={`${state.rateYear} rate scenario`} />
            <CalculatorResult label="Monthly equivalent" value={formatMoney(result.monthly)} />
            <CalculatorResult label="Combined selected rate" value={`${result.combinedRate.toFixed(6)}%`} />
          </ResultGrid>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <CalculatorResult label="School portion" value={formatMoney(result.schoolTax)} note={`Taxable value ${formatMoney(result.schoolTaxable)}`} />
            <CalculatorResult label="County/city/special portion" value={formatMoney(result.otherTax)} note={`Taxable value ${formatMoney(result.otherTaxable)}`} />
          </div>
        </section>

        <div className="mt-8">
          <CalculatorActions onSave={persistence.save} onRestore={persistence.restore} onShare={persistence.share} onPrint={persistence.print} status={persistence.status} />
        </div>

        <section className="mt-12 border-t border-border pt-10" aria-labelledby={`${profile.slug}-faq-heading`}>
          <p className="eyebrow text-primary">Common questions</p>
          <h2 id={`${profile.slug}-faq-heading`} className="mt-2 font-display text-3xl">{profile.name} property-tax calculator FAQ</h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {profile.faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <h3 className="font-display text-2xl">{faq.question}</h3>
                <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-4 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <Link to="/texas-property-tax-estimator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Texas property tax estimator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Start a statewide scenario with any Texas county.</span></Link>
          <Link to="/texas-homestead-savings-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Homestead exemption calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Model entered homestead exemptions against the local rates.</span></Link>
          <Link to="/learn/property-taxes" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">How Texas property taxes work</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Understand taxable value, rates, exemptions, protests and payments.</span></Link>
          <a href={profile.guideHref} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.guideLabel}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Put the property-tax scenario into local relocation context.</span></a>
        </section>

        <CitationTrustPanel
          title={`${profile.name} property-tax sources and methodology`}
          sources={profile.sources.map((source) => ({ name: source.name, url: source.url }))}
          methodology="Texas Defined does not publish a single citywide or countywide combined rate. The calculator starts with the selected county, loads finalized taxing-unit rates reported to the Texas Comptroller, and requires the user to choose the school district, municipality and special districts that actually serve the parcel. Exemptions and taxable values remain user-entered because they are parcel-specific."
          lastVerified="Source links and local jurisdiction guidance checked August 30, 2026. The calculator labels the finalized rate year returned by the official-rate dataset; verify the actual parcel and current tax record before relying on the result."
        />

        <p className="mt-8 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">This is a planning estimate, not a tax statement, appraisal, exemption determination or legal description. The parcel's appraisal record, exemptions, taxing-unit membership and adopted rates control the actual bill.</p>
      </article>
    </Container>
  );
}
