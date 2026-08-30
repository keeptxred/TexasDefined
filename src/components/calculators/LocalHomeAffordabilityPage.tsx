import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { AffordabilityCalculator } from '@/components/calculators/TexasPlanningCalculators';
import type { LocalHomeAffordabilityProfile } from '@/data/local-home-affordability';

export function LocalHomeAffordabilityPage({ profile }: { profile: LocalHomeAffordabilityProfile }) {
  return (
    <CalculatorPage eyebrow={profile.eyebrow} title={profile.title} description={profile.description}>
      <nav aria-label="Breadcrumb" className="mb-8 border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <a href="/">Front page</a><span className="mx-2">/</span><a href="/texas-home-affordability-calculator">Home affordability</a><span className="mx-2">/</span><span>{profile.name}</span>
      </nav>

      <div className="max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
        <p>{profile.intro}</p>
        <p>{profile.housingContext}</p>
      </div>

      <AffordabilityCalculator />

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="local-affordability-plan-heading">
        <p className="eyebrow text-primary">Make the estimate local</p>
        <h2 id="local-affordability-plan-heading" className="mt-3 font-display text-3xl">What to verify before calling a {profile.name} home affordable</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {profile.planningPoints.map((point, index) => (
            <div key={point} className="border border-border p-5">
              <span className="eyebrow text-primary">Check {index + 1}</span>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{point}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-4 border-t border-border pt-10 md:grid-cols-2" aria-labelledby="local-affordability-next-heading">
        <div className="md:col-span-2">
          <p className="eyebrow text-primary">Use the exact address</p>
          <h2 id="local-affordability-next-heading" className="mt-3 font-display text-3xl">Replace generic assumptions with local property costs</h2>
        </div>
        <a href={profile.propertyTaxHref} className="border border-border p-5 hover:border-primary/60">
          <strong className="font-display text-2xl">{profile.propertyTaxLabel}</strong>
          <span className="mt-3 block text-sm leading-6 text-muted-foreground">Build a property-tax estimate from the county, school, city and applicable special-district rates for the parcel.</span>
          <span className="eyebrow mt-5 inline-block text-primary">Open tax calculator →</span>
        </a>
        <a href={profile.relocationHref} className="border border-border p-5 hover:border-primary/60">
          <strong className="font-display text-2xl">{profile.relocationLabel}</strong>
          <span className="mt-3 block text-sm leading-6 text-muted-foreground">Compare the address-level factors that sit outside the mortgage payment: commute, utilities, jurisdiction, schools and other recurring costs.</span>
          <span className="eyebrow mt-5 inline-block text-primary">Open relocation guide →</span>
        </a>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="local-affordability-faq-heading">
        <p className="eyebrow text-primary">Common questions</p>
        <h2 id="local-affordability-faq-heading" className="mt-3 font-display text-3xl">{profile.name} home affordability FAQ</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {profile.faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <h3 className="font-display text-2xl">{faq.question}</h3>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">This is a planning calculator, not a lending decision, appraisal, tax statement or insurance quote. Verify the actual property, financing terms and recurring ownership costs before making a financial commitment.</p>
    </CalculatorPage>
  );
}
