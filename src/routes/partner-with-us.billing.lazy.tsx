import { createLazyFileRoute } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import { advertiserProgramRules, advertiserTiers, advertisingPaymentMethods } from '@/data/advertising-program';

export const Route = createLazyFileRoute('/partner-with-us/billing')({ component: AdvertisingBillingPage });

function AdvertisingBillingPage() {
  return <main>
    <Container className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Advertiser billing</p>
      <h1 className="mt-3 max-w-4xl font-display text-4xl">Straightforward payment and invoice terms for Texas Defined partners.</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Texas Defined uses its existing Stripe environment for advertiser billing. New advertisers prepay by default. Monthly sponsorships are billed in advance; annual plans are billed annually in advance. Approved invoice customers normally use Net 15, with Net 30 reserved for approved organizations whose procurement process requires it.</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {advertisingPaymentMethods.map((method) => <article key={method.name} className="border-t-2 border-foreground pt-5"><h2 className="font-display text-2xl">{method.name}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{method.description}</p></article>)}
      </div>

      <section className="mt-10 border-y border-border py-6">
        <h2 className="font-display text-3xl">Standard package billing</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {advertiserTiers.map((tier) => <article key={tier.id} className="border-t border-border pt-4"><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="font-display text-2xl">{tier.name}</h3><p className="text-sm font-bold text-primary">{tier.monthlyPrice == null ? 'Custom quote' : `$${tier.monthlyPrice.toLocaleString()}/month · $${tier.annualPrice?.toLocaleString()}/year`}</p></div><p className="mt-2 text-sm leading-6 text-muted-foreground">{tier.commitment}</p></article>)}
        </div>
      </section>

      <section className="mt-10 max-w-4xl">
        <h2 className="font-display text-3xl">Billing policy</h2>
        <div className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">{advertiserProgramRules.map((rule) => <p key={rule}>{rule}</p>)}</div>
        <div className="mt-6 space-y-3 text-sm leading-7 text-muted-foreground">
          <p><strong className="text-foreground">One-time campaigns under $2,500:</strong> 100% prepaid unless invoice credit is approved.</p>
          <p><strong className="text-foreground">Invoices:</strong> approved accounts may receive a Stripe Hosted Invoice Page with due date, memo, reference or purchase-order information where applicable.</p>
          <p><strong className="text-foreground">Late or incomplete payment:</strong> a campaign does not begin, or may be paused, until required payment or an approved purchasing arrangement is received.</p>
          <p><strong className="text-foreground">Receipts and confirmations:</strong> payment confirmations and receipts are provided through the configured Stripe billing workflow.</p>
          <p><strong className="text-foreground">Billing questions:</strong> admin@texasdefined.com.</p>
        </div>
        <p className="mt-6 text-sm leading-7 text-muted-foreground">Texas Defined does not store raw card or bank-account numbers. Payment collection is intended to occur on Stripe-hosted payment surfaces.</p>
        <div className="mt-8 flex flex-wrap gap-3"><a href="/partner-with-us#pricing" className="border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Compare packages</a><a href="/partner-with-us/terms" className="border border-border px-5 py-3 text-sm font-semibold text-foreground">Review terms</a><a href="/partner-with-us/examples" className="border border-border px-5 py-3 text-sm font-semibold text-foreground">See examples</a></div>
      </section>
    </Container>
  </main>;
}
