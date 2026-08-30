import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { OfficialHomeownershipCostCalculator } from '@/components/calculators/OfficialHomeownershipCostCalculator';
import type { LocalHomeownershipCostProfile } from '@/data/local-homeownership-cost';

export function LocalHomeownershipCostPage({ profile }: { profile: LocalHomeownershipCostProfile }) {
  const affordabilityPath = `/texas-home-affordability-calculator/${profile.slug}`;

  return (
    <CalculatorPage eyebrow={`${profile.name} ownership budget`} title={profile.ownershipTitle} description={profile.ownershipDescription}>
      <nav aria-label="Breadcrumb" className="mb-8 border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <a href="/">Front page</a><span className="mx-2">/</span><a href="/texas-homeownership-cost-calculator">Homeownership costs</a><span className="mx-2">/</span><span>{profile.name}</span>
      </nav>

      <div className="max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
        <p>{profile.ownershipIntro}</p>
        <p>{profile.housingContext}</p>
      </div>

      <OfficialHomeownershipCostCalculator />

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="local-ownership-plan-heading">
        <p className="eyebrow text-primary">Make the budget address-specific</p>
        <h2 id="local-ownership-plan-heading" className="mt-3 font-display text-3xl">What to verify for a {profile.name} ownership-cost comparison</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {profile.planningPoints.map((point, index) => (
            <div key={point} className="border border-border p-5">
              <span className="eyebrow text-primary">Check {index + 1}</span>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{point}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="local-ownership-next-heading">
        <p className="eyebrow text-primary">Verify the biggest assumptions</p>
        <h2 id="local-ownership-next-heading" className="mt-3 font-display text-3xl">Connect the monthly total to local property and relocation research</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <a href={profile.propertyTaxHref} className="border border-border p-5 hover:border-primary/60"><strong className="font-display text-xl">{profile.propertyTaxLabel}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Build the property-tax line from the parcel's county, school, city and applicable special districts.</span></a>
          <a href={affordabilityPath} className="border border-border p-5 hover:border-primary/60"><strong className="font-display text-xl">{profile.name} affordability calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Work backward from income, debt, down payment and recurring housing costs to a possible price range.</span></a>
          <a href="/texas-home-insurance-calculator" className="border border-border p-5 hover:border-primary/60"><strong className="font-display text-xl">Home-insurance calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Create a planning estimate, then replace it with an address-specific insurer quote.</span></a>
          <a href={profile.relocationHref} className="border border-border p-5 hover:border-primary/60"><strong className="font-display text-xl">{profile.relocationLabel}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Research commute, utilities, jurisdiction, schools and other recurring costs outside the mortgage.</span></a>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="local-ownership-faq-heading">
        <p className="eyebrow text-primary">Common questions</p>
        <h2 id="local-ownership-faq-heading" className="mt-3 font-display text-3xl">{profile.name} homeownership cost FAQ</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {profile.ownershipFaqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <h3 className="font-display text-2xl">{faq.question}</h3>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">This is a planning calculator, not a mortgage quote, tax statement, insurance quote, appraisal or maintenance inspection. Verify the exact property, financing terms and recurring ownership costs before making a financial commitment.</p>
    </CalculatorPage>
  );
}
