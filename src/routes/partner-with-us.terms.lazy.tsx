import { createLazyFileRoute } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import { ADVERTISING_AGREEMENT_VERSION, advertiserTiers, agreementClauses } from '@/data/advertising-program';

export const Route = createLazyFileRoute('/partner-with-us/terms')({ component: AdvertisingTermsPage });

function AdvertisingTermsPage() {
  return <main>
    <Container className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Advertising terms</p>
      <h1 className="mt-3 max-w-4xl font-display text-4xl">Texas Defined advertising and sponsorship terms.</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Agreement version {ADVERTISING_AGREEMENT_VERSION}. These standard commercial terms work with the selected package schedule and any approved order form or insertion order. The agreement is prepared for later attorney review; Texas Defined does not represent that it has been reviewed by counsel.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {advertiserTiers.map((tier) => <article key={tier.id} className="border-t border-border pt-4"><div className="flex flex-wrap items-baseline justify-between gap-2"><h2 className="font-display text-2xl">{tier.name}</h2><p className="text-sm font-bold text-primary">{tier.monthlyPrice == null ? 'Custom quote' : `$${tier.monthlyPrice.toLocaleString()}/month · $${tier.annualPrice?.toLocaleString()}/year`}</p></div><p className="mt-2 text-sm leading-6 text-muted-foreground">{tier.commitment}</p><ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">{tier.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul></article>)}
      </div>

      <section className="mt-12 max-w-4xl">
        <h2 className="font-display text-3xl">Standard agreement clauses</h2>
        <div className="mt-6 space-y-3">{agreementClauses.map((clause, index) => <details key={clause.heading} open={index < 3} className="border-b border-border pb-3"><summary className="cursor-pointer py-2 font-semibold text-foreground">{clause.heading}</summary><p className="pb-2 text-sm leading-7 text-muted-foreground">{clause.body}</p></details>)}</div>
        <p className="mt-6 text-sm leading-7 text-muted-foreground">Advertising purchases placements and services, not editorial influence. Texas Defined does not guarantee traffic, clicks, leads, bookings, sales, rankings or other performance unless a signed order expressly states a delivery quantity.</p>
        <div className="mt-8 flex flex-wrap gap-3"><a href="/partner-with-us/agreement" className="border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Review agreement acceptance</a><a href="/partner-with-us/billing" className="border border-border px-5 py-3 text-sm font-semibold text-foreground">Review billing</a><a href="/partner-with-us/examples" className="border border-border px-5 py-3 text-sm font-semibold text-foreground">See examples</a></div>
      </section>
    </Container>
  </main>;
}
