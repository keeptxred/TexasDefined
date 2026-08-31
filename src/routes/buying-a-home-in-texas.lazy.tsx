import { createLazyFileRoute, Link } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import {
  TEXAS_HOMEBUYER_CITY_PATHS,
  TEXAS_HOMEBUYER_DESCRIPTION,
  TEXAS_HOMEBUYER_FAQS,
  TEXAS_HOMEBUYER_SOURCES,
  TEXAS_HOMEBUYER_STEPS,
  TEXAS_HOMEBUYER_TOOLS,
} from '@/data/texas-homebuyer-journey';

export const Route = createLazyFileRoute('/buying-a-home-in-texas')({ component: Page });

function Page() {
  return (
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/">Front page</Link><span className="mx-2">/</span><Link to="/property">Property</Link><span className="mx-2">/</span><span>Buying a home</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Texas homebuyer journey</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Buying a home in Texas</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{TEXAS_HOMEBUYER_DESCRIPTION}</p>
          </div>
          <p className="border-l border-border pl-6 text-sm leading-7 text-muted-foreground">Treat the purchase as two budgets: the cash required to reach closing and the recurring cost of owning the exact property after closing. Keep a reserve outside both.</p>
        </header>

        <section className="border-b border-border py-10" aria-labelledby="homebuyer-tools-heading">
          <p className="eyebrow text-primary">Run the numbers</p>
          <h2 id="homebuyer-tools-heading" className="mt-2 font-display text-4xl">Build the complete Texas home-purchase budget</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These tools answer different parts of the same decision. Use them together, then replace assumptions with the exact lender, tax, insurance and property information as it becomes available.</p>
          <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {TEXAS_HOMEBUYER_TOOLS.map(([title, href, copy]) => (
              <a key={href} href={href} className="group bg-background p-5">
                <strong className="font-display text-2xl group-hover:text-primary">{title}</strong>
                <span className="mt-3 block text-sm leading-6 text-muted-foreground">{copy}</span>
                <span className="eyebrow mt-5 inline-block text-primary">Open tool →</span>
              </a>
            ))}
          </div>
        </section>

        <section className="border-b border-border py-10" aria-labelledby="homebuyer-steps-heading">
          <p className="eyebrow text-primary">From budget to keys</p>
          <h2 id="homebuyer-steps-heading" className="mt-2 font-display text-4xl">A nine-step Texas homebuyer planning sequence</h2>
          <ol className="mt-7 divide-y divide-border border-y border-border">
            {TEXAS_HOMEBUYER_STEPS.map(([name, text], index) => (
              <li id={`step-${index + 1}`} key={name} className="grid gap-4 py-6 sm:grid-cols-[4rem_1fr]">
                <span className="font-display text-4xl text-primary">{String(index + 1).padStart(2, '0')}</span>
                <div><h3 className="font-display text-2xl">{name}</h3><p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">{text}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-2" aria-labelledby="homebuyer-cash-heading">
          <div>
            <p className="eyebrow text-primary">Cash to close</p>
            <h2 id="homebuyer-cash-heading" className="mt-2 font-display text-3xl">Do not confuse the down payment with the total cash plan</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
              <p>The down payment is only one part of the upfront budget. Closing charges, prepaids, escrow deposits, moving expenses and the cash you want left after closing belong in the same plan.</p>
              <p>Assistance or negotiated credits can reduce parts of the transaction, but count them only after the current program or contract terms are verified. Keep emergency and repair reserves separate from money committed to the closing table.</p>
            </div>
          </div>
          <div>
            <p className="eyebrow text-primary">Monthly ownership</p>
            <h2 className="mt-2 font-display text-3xl">The mortgage is not the complete monthly cost</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
              <p>Compare principal and interest with parcel-specific property taxes, homeowners insurance, mortgage insurance when applicable, HOA or district charges, utilities and maintenance.</p>
              <p>Two homes with the same purchase price can carry different monthly costs because the addresses can sit in different taxing units, insurance-risk contexts, utility territories and neighborhood arrangements.</p>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-10" aria-labelledby="homebuyer-local-heading">
          <p className="eyebrow text-primary">Make it local</p>
          <h2 id="homebuyer-local-heading" className="mt-2 font-display text-4xl">Start with a city, then verify the exact property</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Texas Defined's local affordability pages connect the statewide math to local property-tax, insurance, mortgage and ownership-cost research without publishing unsupported city-average purchase prices.</p>
          <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {TEXAS_HOMEBUYER_CITY_PATHS.map(([name, href]) => <a key={href} href={href} className="group bg-background p-5"><strong className="font-display text-2xl group-hover:text-primary">{name}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Local home-affordability planning →</span></a>)}
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[16rem_1fr]" aria-labelledby="homebuyer-first-heading">
          <div><p className="eyebrow text-primary">First home?</p><h2 id="homebuyer-first-heading" className="mt-2 font-display text-3xl">Check current assistance separately</h2></div>
          <div className="max-w-3xl text-sm leading-7 text-muted-foreground">
            <p>Texas homebuyer programs can have changing eligibility rules, funding, approved lenders, purchase-price limits and repayment structures. Do not hard-code an old assistance amount into the home budget.</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 font-semibold">
              <Link to="/texas-first-time-homebuyer-programs" className="text-primary underline underline-offset-4">Texas first-time homebuyer programs →</Link>
              <Link to="/texas-down-payment-assistance-calculator" className="text-primary underline underline-offset-4">Model possible assistance →</Link>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-10" aria-labelledby="homebuyer-sources-heading">
          <p className="eyebrow text-primary">Official research layer</p>
          <h2 id="homebuyer-sources-heading" className="mt-2 font-display text-4xl">Replace estimates with primary sources as the purchase gets real</h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {TEXAS_HOMEBUYER_SOURCES.map(([name, href]) => <a key={href} href={href} target="_blank" rel="noreferrer noopener" className="flex items-center justify-between gap-4 py-4 text-sm font-semibold hover:text-primary"><span>{name}</span><span aria-hidden="true">↗</span></a>)}
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">For a specific transaction, the lender disclosures, appraisal and tax records, insurer quote, title work, contract and closing documents control. This guide organizes the research; it does not replace those documents or professional advice.</p>
        </section>

        <section className="py-10" aria-labelledby="homebuyer-faq-heading">
          <p className="eyebrow text-primary">Common questions</p>
          <h2 id="homebuyer-faq-heading" className="mt-2 font-display text-4xl">Buying a home in Texas FAQ</h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {TEXAS_HOMEBUYER_FAQS.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}
          </div>
        </section>
      </article>
    </Container>
  );
}
