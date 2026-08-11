import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { HomeInsuranceCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description =
  'Estimate Texas homeowners insurance costs without entering personal information. Use replacement cost, an estimated base rate, and optional wind or flood coverage to build a planning estimate.';

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
      title: 'Texas Homeowners Insurance Calculator | Estimate Home Insurance Cost',
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
      title="Texas homeowners insurance calculator"
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
