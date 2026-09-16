import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { advertiserProgramRules, advertiserTiers, advertisingPaymentMethods } from '@/data/advertising-program';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/advertising-billing';
const description = 'Texas Defined advertiser billing, payment methods, invoice terms and recurring partnership billing policies.';

export const Route = createFileRoute('/advertising-billing')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Advertising Billing & Payment',
      description,
      robots: 'noindex, follow',
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: AdvertisingBillingPage,
});

function AdvertisingBillingPage() {
  return <main>
    <Container className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Advertiser billing</p>
      <h1 className="mt-3 max-w-4xl font-display text-4xl">Straightforward payment and invoice terms for Texas Defined partners.</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">This page summarizes the standard billing methods and timing used for approved advertising and sponsorship relationships. A signed order form may add procurement details or approved custom terms.</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {advertisingPaymentMethods.map((method) => <article key={method.name} className="border-t-2 border-foreground pt-5"><h2 className="font-display text-2xl">{method.name}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{method.description}</p></article>)}
      </div>

      <div className="mt-10 border-y border-border py-6">
        <h2 className="font-display text-3xl">Standard package billing</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {advertiserTiers.map((tier) => <article key={tier.id} className="border-t border-border pt-4"><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="font-display text-2xl">{tier.name}</h3><p className="text-sm font-bold text-primary">{tier.monthlyPrice == null ? 'Custom quote' : `$${tier.monthlyPrice.toLocaleString()}/month · $${tier.annualPrice?.toLocaleString()}/year`}</p></div><p className="mt-2 text-sm leading-6 text-muted-foreground">{tier.commitment}</p></article>)}
        </div>
      </div>

      <div className="mt-10 max-w-3xl">
        <h2 className="font-display text-3xl">Billing policy</h2>
        <div className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
          {advertiserProgramRules.map((rule) => <p key={rule}>{rule}</p>)}
        </div>
        <p className="mt-6 text-sm leading-7 text-muted-foreground">Card and eligible bank payments are intended to be collected on Stripe-hosted pages. Texas Defined does not store raw card details. Approved invoice accounts may include purchase-order information and written Net 15 or Net 30 terms.</p>
        <div className="mt-8 flex flex-wrap gap-3"><a href="/partner-with-us#pricing" className="border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Compare packages</a><a href="/advertising-terms" className="border border-border px-5 py-3 text-sm font-semibold text-foreground">Review advertising terms</a></div>
      </div>
    </Container>
  </main>;
}
