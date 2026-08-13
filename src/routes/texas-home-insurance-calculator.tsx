import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { HomeInsuranceCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description =
  'Use this Texas homeowners insurance calculator without personal information. Estimate annual cost from replacement cost, an estimated base rate, wind or flood coverage, and deductible assumptions.';

const faqs = [
  {
    question: 'How can I estimate homeowners insurance in Texas?',
    answer: 'Start with the estimated replacement cost of the home rather than its market value, apply a reasonable annual insurance rate, and then account separately for wind, hail, coastal, or flood coverage that may apply to the property.',
  },
  {
    question: 'Can I use this homeowners insurance calculator without personal information?',
    answer: 'Yes. This calculator is designed for planning and does not require your name, email address, phone number, or street address. The result is an estimate, not an insurance quote.',
  },
  {
    question: 'Is home insurance based on the purchase price of the house?',
    answer: 'Not necessarily. Homeowners insurance commonly focuses on the cost to repair or rebuild the insured structure, which can differ substantially from a home’s purchase price or taxable value.',
  },
  {
    question: 'Does a Texas home insurance estimate include flood insurance?',
    answer: 'Not automatically. Standard homeowners policies generally treat flood coverage separately, so the calculator lets you add a separate flood-cost assumption when it is relevant to your planning.',
  },
  {
    question: 'Why can homeowners insurance costs vary so much across Texas?',
    answer: 'Location, rebuilding cost, roof and construction characteristics, wind and hail exposure, coastal risk, claims history, deductibles, and selected coverage can all materially change the final premium.',
  },
];

export const Route = createFileRoute('/texas-home-insurance-calculator')({
  head: () =>
    buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-home-insurance-calculator',
      title: 'Texas Homeowners Insurance Calculator | No Personal Info',
      description,
      featureList: [
        'Estimate homeowners insurance without personal information',
        'Start with the home replacement cost',
        'Adjust the estimated base insurance rate',
        'Add possible wind or flood coverage',
      ],
    }),
  component: HomeInsuranceCalculatorPage,
});

function HomeInsuranceCalculatorPage() {
  return (
    <CalculatorPage
      eyebrow="Texas homeowners insurance estimator"
      title="Texas homeowners insurance calculator without personal information"
      description={description}
    >
      <HomeInsuranceCalculator />

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="insurance-estimate-heading">
        <p className="eyebrow text-primary">How the estimate works</p>
        <h2 id="insurance-estimate-heading" className="mt-3 font-display text-3xl">Estimate the cost of homeowners insurance before requesting a quote</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>This calculator is meant to answer planning searches such as <strong className="text-foreground">homeowners insurance estimate</strong>, <strong className="text-foreground">home insurance calculator</strong>, <strong className="text-foreground">house insurance estimator</strong>, and <strong className="text-foreground">homeowners insurance cost calculator</strong> without asking for personal information.</p>
          <p>Use the rebuilding or replacement-cost estimate for the home, then test different annual rate assumptions. If wind or flood coverage may be separate for the property, include those costs so the result better reflects the household budget you are evaluating.</p>
          <p>The result is a planning estimate only. Actual premiums depend on the insurer, property, coverage limits, deductibles, underwriting information, and location-specific risks.</p>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="insurance-inputs-heading">
        <p className="eyebrow text-primary">Before you compare quotes</p>
        <h2 id="insurance-inputs-heading" className="mt-3 font-display text-3xl">Gather the property details that can move a Texas home-insurance estimate</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['Replacement cost', 'Estimate what it could cost to rebuild the structure, which may differ from market value or the mortgage balance.'],
            ['Roof and construction', 'Roof age, material, condition and other construction details can affect underwriting and deductibles.'],
            ['Wind, hail and coastal exposure', 'Ask whether wind or hail carries a separate deductible and whether coastal wind coverage must be arranged separately.'],
            ['Flood exposure', 'Treat flood as a separate planning question instead of assuming a standard homeowners policy includes it.'],
            ['Deductibles', 'Convert percentage deductibles into dollars using the dwelling limit so you can compare the risk you retain.'],
            ['Coverage limits', 'Compare quotes using equivalent dwelling, personal-property, liability and additional-living-expense assumptions.'],
          ].map(([title, copy]) => <div key={title} className="border border-border p-5"><strong className="font-display text-xl">{title}</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="insurance-resources-heading">
        <p className="eyebrow text-primary">Texas insurance resources</p>
        <h2 id="insurance-resources-heading" className="mt-3 font-display text-3xl">Go from estimate to research</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link to="/article/$slug" params={{ slug: 'texas-homeowners-insurance-guide' }} className="border border-border p-5 hover:border-primary">
            <strong className="font-display text-xl">Texas homeowners insurance guide</strong>
            <span className="mt-2 block text-sm leading-6 text-muted-foreground">Understand coverage, deductibles, risk factors, and what to compare before shopping.</span>
          </Link>
          <Link to="/$kind/$slug" params={{ kind: 'agency', slug: 'texas-department-insurance' }} className="border border-border p-5 hover:border-primary">
            <strong className="font-display text-xl">Texas Department of Insurance</strong>
            <span className="mt-2 block text-sm leading-6 text-muted-foreground">Open the Texas Defined reference page for the state insurance regulator and official resources.</span>
          </Link>
          <Link to="/texas-homeownership-cost-calculator" className="border border-border p-5 hover:border-primary">
            <strong className="font-display text-xl">Total homeownership cost</strong>
            <span className="mt-2 block text-sm leading-6 text-muted-foreground">Combine insurance with mortgage, taxes, utilities, maintenance, and other ownership costs.</span>
          </Link>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="insurance-risk-heading">
        <p className="eyebrow text-primary">Texas property risk</p>
        <h2 id="insurance-risk-heading" className="mt-3 font-display text-3xl">Understand the conditions behind the number</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link to="/article/$slug" params={{ slug: 'texas-roofs-hail-wind-heat' }} className="border border-border p-5 hover:border-primary">
            <strong className="font-display text-xl">Texas roofs, hail, wind and heat</strong>
            <span className="mt-2 block text-sm leading-6 text-muted-foreground">Use roof age, materials, storm exposure and maintenance realities to understand why two otherwise similar homes can carry different insurance risk.</span>
          </Link>
          <Link to="/article/$slug" params={{ slug: 'texas-hurricane-preparation-homeowners-renters' }} className="border border-border p-5 hover:border-primary">
            <strong className="font-display text-xl">Texas hurricane preparation</strong>
            <span className="mt-2 block text-sm leading-6 text-muted-foreground">Review wind, flood, evacuation and documentation considerations before storm season or a coastal-area home purchase.</span>
          </Link>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="insurance-faq-heading">
        <p className="eyebrow text-primary">Common questions</p>
        <h2 id="insurance-faq-heading" className="mt-3 font-display text-3xl">Home insurance estimate FAQ</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <h3 className="font-display text-2xl">{faq.question}</h3>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </CalculatorPage>
  );
}
