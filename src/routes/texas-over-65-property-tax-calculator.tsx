import { createFileRoute, Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { OfficialTaxRateAssist } from '@/components/property/OfficialTaxRateAssist';
import {
  CalculatorActions,
  CalculatorResult,
  CalculatorSection,
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

const canonicalPath = '/texas-over-65-property-tax-calculator';
const description = 'Estimate Texas property taxes for an age-65-or-older homeowner using current school homestead exemptions, an entered school-tax ceiling and finalized local taxing-unit rates.';
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
const SCHOOL_GENERAL_HOMESTEAD_EXEMPTION = 140000;
const SCHOOL_AGE_65_EXEMPTION = 60000;
const DEFAULT_SCHOOL_EXEMPTIONS = SCHOOL_GENERAL_HOMESTEAD_EXEMPTION + SCHOOL_AGE_65_EXEMPTION;

const faqs = [
  {
    question: 'How much is the Texas over-65 school property-tax exemption?',
    answer: 'A qualifying residence homestead currently receives the $140,000 general school-district homestead exemption plus an additional $60,000 school-district exemption for a homeowner who is age 65 or older. Local taxing units may offer additional exemptions.',
  },
  {
    question: 'Does turning 65 freeze all Texas property taxes?',
    answer: 'No. The mandatory age-65 tax ceiling applies to qualifying school-district taxes. Other taxing units can have different exemptions or locally adopted limitations, and improvements can change a ceiling.',
  },
  {
    question: 'What number should I enter for the school-tax ceiling?',
    answer: 'Use the actual ceiling shown in the property or appraisal-district records. The ceiling is property-specific, so this calculator does not invent a default ceiling.',
  },
  {
    question: 'Can an age-65 school tax ceiling move to another Texas homestead?',
    answer: 'Texas law can allow a proportional school-tax ceiling transfer to another qualifying residence homestead. The new appraisal district should verify and calculate the transferred limitation.',
  },
] as const;

type State = {
  homeValue: number;
  schoolRate: number;
  otherRate: number;
  schoolExemption: number;
  otherExemption: number;
  schoolCeiling: number;
  county: string;
  rateYear: number;
};

const DEFAULTS: State & CalculatorState = {
  homeValue: 400000,
  schoolRate: 1,
  otherRate: 1.2,
  schoolExemption: DEFAULT_SCHOOL_EXEMPTIONS,
  otherExemption: 0,
  schoolCeiling: 0,
  county: '',
  rateYear: 2025,
};

export const Route = createFileRoute('/texas-over-65-property-tax-calculator')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Over-65 Property Tax Calculator | Exemption & School Tax Freeze',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          '@id': `${pageUrl}#calculator`,
          name: 'Texas Over-65 Property Tax Calculator',
          description,
          url: pageUrl,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Any',
          featureList: [
            'Use the current statewide school homestead exemptions for a qualifying age-65 homeowner',
            'Enter the property-specific school-tax ceiling',
            'Load finalized local taxing-unit rates',
            'Keep school taxes and other local taxes separate',
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        },
      ],
    })],
  }),
  component: Page,
});

const tax = (value: number, rate: number) => Math.max(0, value) * Math.max(0, rate) / 100;

function Page() {
  const initial = useUrlStateDefaults(DEFAULTS);
  const [state, setState] = useState<State>({
    homeValue: Number(initial.homeValue),
    schoolRate: Number(initial.schoolRate),
    otherRate: Number(initial.otherRate),
    schoolExemption: Number(initial.schoolExemption),
    otherExemption: Number(initial.otherExemption),
    schoolCeiling: Number(initial.schoolCeiling),
    county: String(initial.county),
    rateYear: Number(initial.rateYear),
  });
  const set = (key: keyof State, value: number | string) => setState((current) => ({ ...current, [key]: value } as State));
  const result = useMemo(() => {
    const school = tax(Math.max(0, state.homeValue - state.schoolExemption), state.schoolRate);
    const capped = state.schoolCeiling > 0 ? Math.min(school, state.schoolCeiling) : school;
    const other = tax(Math.max(0, state.homeValue - state.otherExemption), state.otherRate);
    const noExemptions = tax(state.homeValue, state.schoolRate + state.otherRate);
    const total = capped + other;
    return {
      school,
      capped,
      other,
      total,
      savings: Math.max(0, noExemptions - total),
      monthly: total / 12,
    };
  }, [state]);
  const persistence = useCalculatorPersistence({
    storageKey: 'texasdefined:over65-calculator',
    state,
    onRestore: (saved) => setState({
      homeValue: Number(saved.homeValue),
      schoolRate: Number(saved.schoolRate),
      otherRate: Number(saved.otherRate),
      schoolExemption: Number(saved.schoolExemption),
      otherExemption: Number(saved.otherExemption),
      schoolCeiling: Number(saved.schoolCeiling),
      county: String(saved.county),
      rateYear: Number(saved.rateYear),
    }),
  });

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <article className="mx-auto max-w-6xl">
      <nav className="border-b border-border pb-4 text-xs uppercase tracking-[.14em] text-muted-foreground">
        <Link to="/property">Property</Link><span className="mx-2">/</span><Link to="/property-tax-calculators">Calculators</Link><span className="mx-2">/</span>Age 65+
      </nav>

      <header className="border-b border-border py-10">
        <p className="eyebrow text-primary">Exemption + school tax ceiling</p>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl">Texas over-65 property-tax calculator</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
          Model a qualifying age-65 residence-homestead scenario using the current statewide school exemptions, the property&apos;s actual school-tax ceiling and finalized local taxing-unit rates.
        </p>
      </header>

      <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-3">
        <div>
          <p className="eyebrow text-primary">Current statewide school exemptions</p>
          <p className="mt-3 font-display text-4xl">{formatMoney(DEFAULT_SCHOOL_EXEMPTIONS)}</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            For a qualifying residence homestead: {formatMoney(SCHOOL_GENERAL_HOMESTEAD_EXEMPTION)} general school exemption + {formatMoney(SCHOOL_AGE_65_EXEMPTION)} additional age-65 exemption.
          </p>
        </div>
        <div className="lg:col-span-2">
          <h2 className="font-display text-3xl">The school tax ceiling is not the exemption</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            The exemptions reduce taxable value. Separately, a qualifying age-65 homeowner receives a school-district tax ceiling that generally limits the school tax on that homestead. The ceiling is based on the property&apos;s own tax history, so TexasDefined leaves it at zero until you enter the verified amount.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <Link to="/learn/over-65-property-tax-guide" className="text-primary underline underline-offset-4">Read the full age-65 property-tax guide →</Link>
            <a href="https://comptroller.texas.gov/taxes/property-tax/exemptions/" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">Texas Comptroller exemption guidance →</a>
          </div>
        </div>
      </section>

      <CalculatorSection eyebrow="Location" title="Load the latest finalized local taxing-unit rates">
        <CountySelector value={state.county} onChange={(value) => set('county', value)} />
        <OfficialTaxRateAssist
          countySlug={state.county}
          onApply={(rates) => setState((current) => ({
            ...current,
            schoolRate: rates.schoolRate,
            otherRate: rates.otherRate,
            rateYear: rates.year,
          }))}
        />
      </CalculatorSection>

      <CalculatorSection eyebrow="Inputs" title="Enter the property-specific exemption and ceiling scenario">
        <div className="grid gap-5 md:grid-cols-3">
          <CurrencyInput label="Home value" value={state.homeValue} onChange={(value) => set('homeValue', value)} />
          <PercentageInput label="School tax rate" value={state.schoolRate} onChange={(value) => set('schoolRate', value)} step={.001} />
          <PercentageInput label="Other local rates" value={state.otherRate} onChange={(value) => set('otherRate', value)} step={.001} />
          <CurrencyInput label="Total school exemptions" value={state.schoolExemption} onChange={(value) => set('schoolExemption', value)} />
          <CurrencyInput label="Other local exemptions" value={state.otherExemption} onChange={(value) => set('otherExemption', value)} />
          <CurrencyInput label="Verified school-tax ceiling (0 if unknown)" value={state.schoolCeiling} onChange={(value) => set('schoolCeiling', value)} />
        </div>
      </CalculatorSection>

      <section className="border-y border-border py-10">
        <ResultGrid>
          <CalculatorResult label="Estimated school tax" value={formatMoney(result.capped)} note={`${state.rateYear} rate scenario`} />
          <CalculatorResult label="Estimated total annual tax" value={formatMoney(result.total)} />
          <CalculatorResult label="Estimated monthly tax" value={formatMoney(result.monthly)} />
        </ResultGrid>
        <ResultGrid>
          <CalculatorResult label="Illustrative savings vs no exemptions" value={formatMoney(result.savings)} />
          <CalculatorResult label="School tax before ceiling" value={formatMoney(result.school)} />
          <CalculatorResult label="Other local tax" value={formatMoney(result.other)} />
        </ResultGrid>
      </section>

      <div className="mt-8">
        <CalculatorActions
          onSave={persistence.save}
          onRestore={persistence.restore}
          onShare={persistence.share}
          onPrint={persistence.print}
          status={persistence.status}
        />
      </div>

      <section className="mt-12 border-t border-border pt-10">
        <p className="eyebrow text-primary">How the ceiling works</p>
        <h2 className="mt-3 font-display text-3xl">A school tax freeze does not freeze every line of the bill</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>The Texas Comptroller describes the age-65 protection as a school tax ceiling. If the normally calculated school tax falls below the ceiling, the lower amount applies. Improvements beyond ordinary repairs can increase the ceiling.</p>
          <p>Counties, cities and junior-college districts can have their own locally adopted age-65 limitations or exemptions. This calculator therefore keeps school and other local taxes separate and lets you enter other exemptions instead of assuming every taxing unit treats the property the same way.</p>
          <p>If you move to another Texas homestead, the law can allow a proportional transfer of the school-tax limitation. A qualifying surviving spouse can also continue certain protections. Those rules require property-specific verification through the appraisal district.</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <a href="https://comptroller.texas.gov/taxes/property-tax/docs/96-1425.pdf" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">Texas Comptroller: Property Tax Basics →</a>
          <Link to="/learn/appraisal-districts" className="text-primary underline underline-offset-4">Find the appraisal district →</Link>
          <Link to="/do/homestead-exemption" className="text-primary underline underline-offset-4">Homestead exemption steps →</Link>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="over65-faq-heading">
        <p className="eyebrow text-primary">Common questions</p>
        <h2 id="over65-faq-heading" className="mt-3 font-display text-3xl">Texas age-65 property-tax FAQ</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {faqs.map((faq) => <div key={faq.question} className="py-6">
            <h3 className="font-display text-2xl">{faq.question}</h3>
            <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p>
          </div>)}
        </div>
      </section>

      <p className="mt-8 text-sm leading-6 text-muted-foreground">
        This is a planning calculator, not a tax bill or eligibility determination. Use the actual ceiling, exemptions and taxing units applicable to the property. The appraisal district determines exemption eligibility, and additions, improvements, ownership changes and transfers can affect treatment.
      </p>
    </article>
  </Container>;
}
