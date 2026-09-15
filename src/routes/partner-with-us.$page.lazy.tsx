import { createLazyFileRoute } from '@tanstack/react-router';

import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import {
  ADVERTISING_BILLING_POLICY,
  ADVERTISING_PAYMENT_METHODS,
  ADVERTISING_TIERS,
  formatAdvertisingPrice,
} from '@/data/advertising-program';

export const Route = createLazyFileRoute('/partner-with-us/$page')({ component: PartnerInfoPage });

function PartnerInfoPage() {
  const { page } = Route.useParams();
  if (page === 'billing') return <BillingPage />;
  if (page === 'terms') return <TermsPage />;
  return <ShowcasePage />;
}

function BillingPage() {
  return <>
    <DepartmentHero current="Advertiser Billing" eyebrow="Texas Defined partnerships" title="Professional payment options without a custom card vault" description="Texas Defined uses Stripe-hosted payment and invoice experiences so advertisers can pay securely by card, supported bank methods or approved invoice terms." tone="surface" />
    <Container className="py-12 sm:py-16">
      <section className="grid gap-8 lg:grid-cols-3">
        {ADVERTISING_PAYMENT_METHODS.map((method) => <article key={method.name} className="border-t-2 border-foreground pt-5"><h2 className="font-display text-3xl">{method.name}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{method.detail}</p></article>)}
      </section>

      <section className="mt-14 border-y border-border py-10">
        <p className="eyebrow text-primary">How billing works</p>
        <h2 className="mt-2 font-display text-4xl">From approved campaign to paid invoice</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            ['01', 'Confirm scope', 'Texas Defined and the advertiser confirm package, surfaces, campaign dates, creative needs and any approved add-ons.'],
            ['02', 'Sign agreement', 'The applicable package agreement or custom order form is completed before campaign delivery begins.'],
            ['03', 'Collect payment', 'Prepaid advertisers receive a secure Stripe payment path. Approved invoice customers receive a Stripe-hosted invoice with the agreed due date.'],
            ['04', 'Launch after clearance', 'Campaign delivery begins only after required payment, approved credit terms or an accepted purchase order is in place.'],
          ].map(([number, title, body]) => <li key={number} className="border-t border-border pt-4"><p className="eyebrow text-muted-foreground">{number}</p><h3 className="mt-2 font-display text-2xl">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></li>)}
        </ol>
      </section>

      <section className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div><p className="eyebrow text-primary">Published billing policy</p><h2 className="mt-2 font-display text-4xl">Default commercial terms</h2></div>
        <div className="space-y-5 text-sm leading-7 text-muted-foreground">
          <p><strong className="text-foreground">Monthly plans.</strong> {ADVERTISING_BILLING_POLICY.monthly}</p>
          <p><strong className="text-foreground">Annual plans.</strong> {ADVERTISING_BILLING_POLICY.annual}</p>
          <p><strong className="text-foreground">Invoices.</strong> {ADVERTISING_BILLING_POLICY.invoice}</p>
          <p><strong className="text-foreground">Performance.</strong> {ADVERTISING_BILLING_POLICY.noGuarantee}</p>
          <p><strong className="text-foreground">Net terms.</strong> New advertisers are prepaid by default. Net 15 can be approved for established business accounts. Net 30 is reserved for accounts whose procurement process reasonably requires it and is not automatic.</p>
          <p><strong className="text-foreground">Purchase orders.</strong> A PO may be referenced on an invoice when the advertiser requires one, but a PO does not override the signed agreement unless Texas Defined accepts that change in writing.</p>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10">
        <p className="eyebrow text-primary">Package reference</p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm"><thead><tr className="border-b border-border"><th className="py-3 pr-4">Plan</th><th className="px-4 py-3">Monthly</th><th className="px-4 py-3">Annual</th><th className="px-4 py-3">Monthly initial term</th></tr></thead><tbody>{ADVERTISING_TIERS.map((tier) => <tr key={tier.id} className="border-b border-border/70"><th className="py-4 pr-4 font-display text-xl">{tier.name}</th><td className="px-4 py-4">{formatAdvertisingPrice(tier.monthlyCents)}</td><td className="px-4 py-4">{formatAdvertisingPrice(tier.annualCents)}</td><td className="px-4 py-4 text-muted-foreground">3 months</td></tr>)}</tbody></table>
        </div>
        <div className="mt-8 flex flex-wrap gap-4"><a href="/partner-with-us" className="bg-foreground px-5 py-3 text-sm font-semibold text-background">Compare packages</a><a href="/partner-with-us/terms" className="border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Read advertising terms</a></div>
      </section>
    </Container>
  </>;
}

function TermsPage() {
  const sections = [
    ['1. Advertiser approval', 'Texas Defined may accept or decline any advertiser, campaign, creative, destination URL or category. Payment does not require Texas Defined to publish material that violates its standards, applicable law, platform rules or reader-trust requirements.'],
    ['2. Editorial independence', 'Advertising and sponsorship do not purchase editorial coverage, favorable rankings, reviews, recommendations, factual changes or influence over independent editorial conclusions. Sponsored material is separated and labeled.'],
    ['3. Campaign scope', 'The signed agreement, order form or accepted proposal identifies the package, approved surfaces, campaign dates, creative responsibilities, billing cadence and any add-ons. Placement locations can be adjusted when necessary to preserve site usability, provided the advertiser receives substantially equivalent contracted delivery.'],
    ['4. Creative and destination requirements', 'Advertisers must provide accurate, lawful creative and destination pages. Texas Defined may request edits for clarity, disclosure, technical quality, mobile rendering, accessibility or brand safety. Advertisers must have rights to all supplied logos, images, trademarks and copy.'],
    ['5. Disclosures and link treatment', 'Paid placements are identified as sponsored, advertisement, presented by or similar clear commercial language. Paid outbound links may use sponsored, nofollow, noopener or noreferrer attributes as appropriate.'],
    ['6. Billing and payment', 'Monthly plans are billed in advance and begin with a three-month initial commitment. Annual plans are prepaid for twelve months at the published annual rate. One-time campaigns are prepaid unless approved invoice terms or a purchase-order process is documented in writing.'],
    ['7. Invoice terms', 'Net 15 or Net 30 terms apply only when Texas Defined explicitly approves them. Late or materially overdue balances may pause campaign delivery without extending credit automatically. Reasonable collection costs may be pursued where permitted by law and the signed agreement.'],
    ['8. No performance guarantee', 'Texas Defined does not guarantee impressions, clicks, leads, bookings, conversions, sales, search rankings, social reach or any other business result unless a separate written order expressly states a guaranteed delivery metric.'],
    ['9. Reporting', 'Where reporting is included, Texas Defined provides the metrics reasonably available from its own systems for the contracted placements. Third-party platform metrics can differ because of attribution, blockers, privacy settings, bot filtering and measurement methodology.'],
    ['10. Make-goods', 'If Texas Defined materially fails to deliver an agreed placement or scheduled sponsored service for reasons within its control, its primary remedy is a reasonable make-good, replacement placement, extension or credit proportionate to the undelivered portion.'],
    ['11. Cancellation', 'Monthly plans may be cancelled after the initial three-month term with the notice stated in the signed agreement. Annual plans are committed for the purchased term and are not refundable after launch except for uncured material breach or written mutual agreement.'],
    ['12. Sponsored content', 'Sponsored features remain clearly labeled commercial material. Texas Defined can edit for style, accuracy, disclosure, legal risk and reader clarity, and can refuse claims that cannot be reasonably substantiated. Sponsored content does not alter independent editorial coverage.'],
    ['13. Compliance', 'Advertisers are responsible for the truthfulness and legality of their claims, required licenses, regulated-industry disclosures, sweepstakes or promotional rules, privacy practices and compliance obligations associated with the promoted product or service.'],
    ['14. Intellectual property', 'Each party keeps ownership of its pre-existing intellectual property. Advertisers grant Texas Defined a limited license during the campaign to display approved advertiser materials for contracted delivery and reasonable campaign reporting or archival proof.'],
    ['15. Service interruptions', 'Neither party is responsible for delay caused by events outside reasonable control, including major outages, natural disasters, government action, platform disruption or force majeure. The parties will work in good faith on rescheduling or a proportionate make-good where practical.'],
    ['16. Written agreement controls', 'If these public terms conflict with a signed package agreement, custom order form or amendment, the signed document controls for that campaign. Material changes must be agreed in writing.'],
  ];
  return <>
    <DepartmentHero current="Advertising Terms" eyebrow="Texas Defined partnerships" title="Clear commercial rules before a campaign starts" description="These public terms summarize the standards behind Texas Defined advertising and sponsorships. A signed tier agreement or custom order form controls the specific campaign." tone="surface" />
    <Container className="py-12 sm:py-16">
      <div className="max-w-4xl">
        <p className="text-sm leading-7 text-muted-foreground">Effective September 15, 2026. These terms are designed to keep payment expectations, disclosures and editorial boundaries clear. Texas Defined may update public terms prospectively; an already signed agreement is not retroactively changed unless the parties agree in writing.</p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {sections.map(([title, body]) => <section key={title} className="border-t border-border pt-5"><h2 className="font-display text-2xl">{title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></section>)}
        </div>
        <section className="mt-12 border-y border-border py-8"><h2 className="font-display text-3xl">Questions or procurement requirements?</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Contact <a href="mailto:admin@texasdefined.com" className="border-b border-primary text-primary">admin@texasdefined.com</a> before signing if your organization requires a vendor form, W-9, purchase order, alternate invoice terms or custom contract language.</p><div className="mt-6 flex flex-wrap gap-4"><a href="/partner-with-us" className="bg-foreground px-5 py-3 text-sm font-semibold text-background">Compare plans</a><a href="/partner-with-us/contract/growth" className="border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">View sample agreement</a></div></section>
      </div>
    </Container>
  </>;
}

function ShowcasePage() {
  return <>
    <DepartmentHero current="Placement Showcase" eyebrow="Texas Defined advertiser preview" title="See how sponsorship appears without disguising it as editorial" description="The examples below use a fictional advertiser and demo copy. They show representative placement treatments, disclosure language and responsive behavior; final campaigns are matched to appropriate real TexasDefined surfaces." tone="surface" />
    <Container className="py-12 sm:py-16">
      <div className="border border-primary bg-primary/5 p-5 text-sm leading-7"><strong>Demo only.</strong> “Sample Texas Partner” is a fictional advertiser used solely to preview layout. No commercial relationship is implied.</div>

      <section className="mt-12">
        <p className="eyebrow text-primary">Example 1 · article / guide placement</p>
        <h2 className="mt-2 font-display text-4xl">Sponsored module inside a useful guide</h2>
        <div className="mt-6 border border-border bg-background shadow-sm">
          <div className="border-b border-border px-6 py-5 sm:px-10"><p className="eyebrow text-muted-foreground">Texas Defined · Weekend Guide</p><h3 className="mt-2 max-w-3xl font-display text-4xl">A cooler-weather Hill Country weekend: what to do, where to stop and how to plan the drive</h3></div>
          <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-5 text-sm leading-7 text-muted-foreground"><p>Texas Defined editorial copy continues here. The guide explains timing, route logistics, seasonal considerations and verified visitor information before any commercial module appears.</p><p>The sponsored unit is visually separated, clearly labeled and relevant to the reader's planning task.</p><SponsoredCard compact={false} /><p>Editorial coverage resumes after the commercial unit. The sponsor does not determine rankings, factual conclusions or the surrounding recommendations.</p></div>
            <aside className="border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-6"><p className="eyebrow text-muted-foreground">Plan your trip</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Weather, official park links, nearby towns and practical planning details remain editorial resources.</p></aside>
          </div>
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-12">
        <p className="eyebrow text-primary">Example 2 · hub featured partner</p>
        <h2 className="mt-2 font-display text-4xl">Featured partner unit on a relevant directory or hub</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <article className="border border-border p-5"><p className="eyebrow text-muted-foreground">Editorial resource</p><h3 className="mt-2 font-display text-2xl">State park planning</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Independent planning content and official links.</p></article>
          <article className="border-2 border-primary p-5"><p className="eyebrow text-primary">Featured partner · Sponsored</p><div className="mt-4 flex h-20 items-center justify-center border border-dashed border-primary/50 bg-primary/5 font-display text-2xl">Sample Texas Partner</div><h3 className="mt-4 font-display text-2xl">A nearby place to stay after the trail</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Short approved sponsor message tied to the reader's destination intent.</p><span className="mt-4 inline-block text-sm font-semibold text-primary">Explore lodging →</span></article>
          <article className="border border-border p-5"><p className="eyebrow text-muted-foreground">Editorial resource</p><h3 className="mt-2 font-display text-2xl">Driving & access</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Road conditions, parking and official access information.</p></article>
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-12">
        <p className="eyebrow text-primary">Example 3 · sponsored feature</p>
        <h2 className="mt-2 font-display text-4xl">Clearly labeled commercial storytelling</h2>
        <article className="mt-6 border-y-2 border-foreground py-8">
          <p className="eyebrow text-primary">Sponsored feature · Paid for by Sample Texas Partner</p>
          <h3 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Five ways to make a long Texas road-trip weekend easier</h3>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">A sponsored feature can tell a useful brand story, but the commercial relationship is disclosed before the headline and the piece does not masquerade as independent Texas Defined reporting.</p>
          <div className="mt-6 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Disclosure:</strong> This is paid sponsored content created with Sample Texas Partner. Texas Defined's independent editorial coverage, rankings and factual conclusions are not for sale.</div>
        </article>
      </section>

      <section className="mt-14 border-t border-border pt-12">
        <p className="eyebrow text-primary">Example 4 · sponsored social amplification</p>
        <h2 className="mt-2 font-display text-4xl">Social support stays disclosed too</h2>
        <div className="mt-6 max-w-xl border border-border p-6"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Sponsored</p><p className="mt-3 font-display text-2xl">Planning a fall Texas weekend?</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Sample post copy can point readers to a relevant sponsored destination or campaign page while clearly identifying the commercial relationship.</p><div className="mt-5 flex h-40 items-center justify-center border border-dashed border-border bg-muted/30 text-sm font-semibold text-muted-foreground">Advertiser-approved creative preview</div></div>
      </section>

      <section className="mt-14 border-y border-border py-10"><div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><h2 className="font-display text-3xl">Ready to compare packages?</h2><p className="mt-2 text-sm leading-7 text-muted-foreground">Placement availability depends on relevance, inventory, season and campaign fit. Texas Defined confirms the actual surfaces before a contract is signed.</p></div><a href="/partner-with-us" className="bg-foreground px-5 py-3 text-center text-sm font-semibold text-background">View partner plans</a></div></section>
    </Container>
  </>;
}

function SponsoredCard({ compact }: { compact: boolean }) {
  return <aside className={`border-l-4 border-primary bg-primary/5 ${compact ? 'p-4' : 'p-6'}`} aria-label="Sponsored example">
    <p className="eyebrow text-primary">Sponsored · Sample Texas Partner</p>
    <div className="mt-4 grid gap-5 sm:grid-cols-[120px_1fr] sm:items-center"><div className="flex h-24 items-center justify-center border border-dashed border-primary/50 bg-background text-center text-xs font-semibold text-muted-foreground">Advertiser logo / creative</div><div><h4 className="font-display text-2xl">Stay close to the places you came to explore</h4><p className="mt-2 text-sm leading-6 text-muted-foreground">A concise advertiser-approved message that is useful to the page's audience and visually separated from editorial copy.</p><span className="mt-3 inline-block text-sm font-semibold text-primary">Visit Sample Texas Partner →</span></div></div>
  </aside>;
}
