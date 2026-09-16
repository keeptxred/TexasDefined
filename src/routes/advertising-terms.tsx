import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { ADVERTISING_AGREEMENT_VERSION, advertiserTiers, agreementClauses } from '@/data/advertising-program';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/advertising-terms';
const description = 'Texas Defined standard advertising and sponsorship terms, package schedules and electronic agreement reference.';

export const Route = createFileRoute('/advertising-terms')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Advertising & Sponsorship Terms',
      description,
      robots: 'noindex, follow',
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: AdvertisingTermsPage,
});

function AdvertisingTermsPage() {
  return <main>
    <Container className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Advertising terms</p>
      <h1 className="mt-3 max-w-4xl font-display text-4xl">Texas Defined advertising and sponsorship agreement reference.</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Agreement version {ADVERTISING_AGREEMENT_VERSION}. This page is a readable reference to the standard commercial terms. The selected package schedule, approved order form and recorded electronic acceptance control the specific campaign.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {advertiserTiers.map((tier) => <article key={tier.id} className="border-t border-border pt-4"><div className="flex flex-wrap items-baseline justify-between gap-2"><h2 className="font-display text-2xl">{tier.name}</h2><p className="text-sm font-bold text-primary">{tier.monthlyPrice == null ? 'Custom quote' : `$${tier.monthlyPrice.toLocaleString()}/month · $${tier.annualPrice?.toLocaleString()}/year`}</p></div><p className="mt-2 text-sm leading-6 text-muted-foreground">{tier.commitment}</p><ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">{tier.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul></article>)}
      </div>

      <div className="mt-12 max-w-4xl">
        <h2 className="font-display text-3xl">Standard agreement clauses</h2>
        <div className="mt-6 space-y-3">{agreementClauses.map((clause, index) => <details key={clause.heading} open={index < 3} className="border-b border-border pb-3"><summary className="cursor-pointer py-2 font-semibold text-foreground">{clause.heading}</summary><p className="pb-2 text-sm leading-7 text-muted-foreground">{clause.body}</p></details>)}</div>
        <p className="mt-6 text-sm leading-7 text-muted-foreground">A campaign is not activated merely by viewing these terms. Texas Defined must approve the advertiser, accept the order and confirm required billing before commercial placement begins.</p>
        <div className="mt-8 flex flex-wrap gap-3"><a href="/partner-with-us#agreement" className="border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Review and accept a package</a><a href="/advertising-billing" className="border border-border px-5 py-3 text-sm font-semibold text-foreground">Review billing details</a></div>
      </div>
    </Container>
  </main>;
}
