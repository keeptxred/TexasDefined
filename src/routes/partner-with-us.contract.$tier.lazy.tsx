import { createLazyFileRoute } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import {
  ADVERTISING_TIER_BY_ID,
  formatAdvertisingPrice,
  type AdvertisingTierId,
} from '@/data/advertising-program';

export const Route = createLazyFileRoute('/partner-with-us/contract/$tier')({ component: AdvertisingAgreementPage });

function AdvertisingAgreementPage() {
  const { tier: tierId } = Route.useParams();
  const tier = ADVERTISING_TIER_BY_ID[tierId as AdvertisingTierId] ?? ADVERTISING_TIER_BY_ID.local;

  return <Container className="py-10 sm:py-14 print:max-w-none print:px-0">
    <main className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div><p className="eyebrow text-primary">Agreement preview</p><p className="mt-1 text-sm text-muted-foreground">Final execution copy must identify the advertiser, campaign dates, selected billing cadence and Publisher legal entity.</p></div>
        <div className="flex flex-wrap gap-3"><a href="/partner-with-us" className="border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">Back to plans</a><button type="button" onClick={() => window.print()} className="bg-foreground px-4 py-2 text-sm font-semibold text-background">Print / save PDF</button></div>
      </div>

      <article className="border border-border bg-background p-6 sm:p-10 print:border-0 print:p-0">
        <header className="border-b-2 border-foreground pb-7">
          <p className="eyebrow text-primary">Texas Defined</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">{tier.name} Advertising & Sponsorship Agreement</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Version dated September 15, 2026 · TexasDefined.com</p>
        </header>

        <section className="mt-8 grid gap-5 sm:grid-cols-2">
          <ContractField label="Advertiser legal name" />
          <ContractField label="Advertiser contact name / title" />
          <ContractField label="Advertiser billing email" />
          <ContractField label="Advertiser website" />
          <ContractField label="Campaign start date" />
          <ContractField label="Campaign end / renewal date" />
        </section>

        <section className="mt-9 border-y border-border py-7">
          <h2 className="font-display text-3xl">1. Parties and agreement structure</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">This Advertising & Sponsorship Agreement (the “Agreement”) is between the advertiser identified above (“Advertiser”) and the legal entity identified as the seller or Publisher on the applicable Texas Defined invoice, order form or countersignature block, doing business as TexasDefined.com (“Publisher”). The Agreement includes this document, Schedule A below, the then-current Texas Defined Advertising & Sponsorship Terms provided before execution, and any written order form or amendment signed by both parties. If documents conflict, a later signed order form or amendment controls for the affected campaign.</p>
        </section>

        <section className="mt-8">
          <p className="eyebrow text-primary">Schedule A · package and commercial terms</p>
          <h2 className="mt-2 font-display text-3xl">{tier.name}</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="border-t border-border pt-4"><p className="text-sm font-semibold">Monthly option</p><p className="mt-1 font-display text-3xl">{formatAdvertisingPrice(tier.monthlyCents)} / month</p><p className="mt-2 text-xs leading-6 text-muted-foreground">Initial three-month commitment. Billed in advance. Continues month-to-month after the initial term unless cancelled under Section 8.</p></div>
            <div className="border-t border-border pt-4"><p className="text-sm font-semibold">Annual option</p><p className="mt-1 font-display text-3xl">{formatAdvertisingPrice(tier.annualCents)} / year</p><p className="mt-2 text-xs leading-6 text-muted-foreground">Twelve-month term, prepaid. Annual pricing is approximately two months less than twelve monthly payments.</p></div>
          </div>
          <div className="mt-5 grid gap-3 text-sm"><p>Billing cadence selected: ☐ Monthly &nbsp;&nbsp;&nbsp; ☐ Annual</p><p>Approved invoice terms, if any: ☐ Prepaid &nbsp;&nbsp;&nbsp; ☐ Net 15 &nbsp;&nbsp;&nbsp; ☐ Net 30 &nbsp;&nbsp;&nbsp; ☐ Other: ____________________</p><p>PO / procurement reference, if required: ______________________________________________</p></div>
          <h3 className="mt-7 font-display text-2xl">Included deliverables</h3>
          <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted-foreground">{tier.bullets.map((bullet) => <li key={bullet} className="flex gap-3"><span className="font-bold text-primary">✓</span><span>{bullet}</span></li>)}</ul>
          <div className="mt-6 grid gap-3 text-sm leading-7"><p><strong>Approved campaign surfaces / URLs:</strong> ____________________________________________________________</p><p><strong>Approved creative / message notes:</strong> ___________________________________________________________</p><p><strong>Approved add-ons or exclusivity:</strong> ____________________________________________________________</p></div>
        </section>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <AgreementSection number="2" title="Editorial independence">Advertiser acknowledges that payment does not purchase or influence independent editorial coverage, rankings, reviews, recommendations, factual conclusions or inclusion in editorial lists. Publisher retains final editorial control over all independent Texas Defined content. Sponsored material will be separated and clearly disclosed.</AgreementSection>
          <AgreementSection number="3" title="Creative approval and compliance">Advertiser will provide truthful, lawful materials and owns or controls the rights needed for supplied logos, images, trademarks, claims and copy. Publisher may reject, pause or require changes to material for accuracy, disclosure, accessibility, technical quality, reader safety, legal compliance or brand standards.</AgreementSection>
          <AgreementSection number="4" title="Placement and delivery">Publisher will use commercially reasonable efforts to deliver the Schedule A placements during the campaign term. Exact page position can change with responsive layout, site design, inventory and editorial usability. Any material substitution must provide substantially equivalent sponsored value or a reasonable make-good.</AgreementSection>
          <AgreementSection number="5" title="Disclosures and links">Publisher may label paid placements “Sponsored,” “Advertisement,” “Presented by,” or similarly clear commercial language. Paid outbound links may use sponsored, nofollow, noopener, noreferrer or other attributes Publisher considers appropriate for security, disclosure and search-engine compliance.</AgreementSection>
          <AgreementSection number="6" title="Billing and payment">Monthly fees are billed in advance. Annual fees are prepaid. One-time or custom charges are prepaid unless Publisher explicitly approves invoice terms in writing. Advertiser is responsible for accurate billing information and any taxes legally chargeable on the advertising service. Publisher may pause delivery on materially overdue balances.</AgreementSection>
          <AgreementSection number="7" title="No performance guarantee">Unless a signed order form states a specific guaranteed metric, Publisher does not guarantee impressions, clicks, leads, bookings, sales, conversions, social reach, search rankings or other business outcomes. Reports use metrics reasonably available from Publisher systems and may differ from third-party attribution.</AgreementSection>
          <AgreementSection number="8" title="Term, renewal and cancellation">Monthly plans have a three-month initial commitment and then continue month-to-month. After the initial term, either party may end a monthly plan with 30 days’ written notice. Annual plans run for twelve months and are non-cancellable after launch except for uncured material breach or written mutual agreement. Renewal beyond the purchased term requires continued billing or written renewal.</AgreementSection>
          <AgreementSection number="9" title="Make-goods and service credits">If Publisher materially fails to deliver an agreed placement or sponsored service for reasons within its reasonable control, Advertiser’s primary remedy is a reasonable replacement placement, extension, rescheduling or credit proportionate to the undelivered portion. Cash refunds are reserved for situations where a reasonable make-good is not practical or where required by law.</AgreementSection>
          <AgreementSection number="10" title="Sponsored features and social">Any included sponsored feature or social amplification is commercial content and will be disclosed. Publisher may edit sponsored copy for style, clarity, substantiation, legal risk and reader trust. Production dates are scheduled mutually and unused included sponsored content does not automatically roll over indefinitely beyond the agreement term.</AgreementSection>
          <AgreementSection number="11" title="Intellectual property">Each party retains ownership of its pre-existing intellectual property. Advertiser grants Publisher a non-exclusive, limited, worldwide license during the campaign to reproduce, resize, format and display approved advertiser materials for contracted delivery, campaign administration, reasonable reporting and archival proof of performance.</AgreementSection>
          <AgreementSection number="12" title="Confidential information">Non-public pricing exceptions, campaign strategy, credentials, customer lists and other information clearly identified or reasonably understood as confidential will be protected using reasonable care and used only for the relationship, except where disclosure is required by law or the information becomes public without breach.</AgreementSection>
          <AgreementSection number="13" title="Representations and responsibility">Each party represents that it has authority to enter the Agreement. Advertiser is responsible for claims about its products and services, required licenses, regulated-industry disclosures, offer terms, privacy practices and promotion rules. Each party remains responsible for its own negligence, willful misconduct and legal compliance.</AgreementSection>
          <AgreementSection number="14" title="Limitation of liability">To the maximum extent permitted by law, neither party is liable for indirect, incidental, special, punitive or consequential damages arising from this Agreement. Except for unpaid fees, misuse of intellectual property, confidentiality obligations, indemnity obligations, fraud, willful misconduct or liabilities that cannot legally be limited, each party’s aggregate liability will not exceed the fees paid or payable under this Agreement during the six months preceding the event giving rise to the claim.</AgreementSection>
          <AgreementSection number="15" title="Indemnification">Advertiser will defend and indemnify Publisher against third-party claims arising from Advertiser-supplied creative, claims, offers, products, services or infringement allegations, except to the extent caused by Publisher’s unauthorized material alteration or misconduct. Publisher will promptly notify Advertiser of covered claims and reasonably cooperate in the defense.</AgreementSection>
          <AgreementSection number="16" title="Force majeure">Neither party is liable for delay caused by events beyond reasonable control, including major outages, platform disruption, severe weather, natural disaster, government action, labor disruption or similar events. The parties will work in good faith to reschedule affected delivery or provide a proportionate make-good where practical.</AgreementSection>
          <AgreementSection number="17" title="Governing law and notices">The Agreement is governed by Texas law, without regard to conflict-of-law principles. Unless applicable law requires otherwise, disputes will be brought in a state or federal court with jurisdiction in Harris County, Texas. Commercial notices to Publisher may be sent to admin@texasdefined.com; notices to Advertiser go to the billing or legal contact above.</AgreementSection>
          <AgreementSection number="18" title="Entire agreement; electronic signatures">This Agreement and its incorporated documents are the entire agreement for the package and replace prior discussions about the same campaign. Amendments must be in writing. Counterparts and electronic signatures are treated as originals to the extent permitted by law.</AgreementSection>
        </div>

        <section className="mt-12 border-t-2 border-foreground pt-8">
          <h2 className="font-display text-3xl">Acceptance</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">By signing below, each signer represents that they are authorized to bind the identified party and accepts the Agreement, Schedule A and incorporated commercial terms.</p>
          <div className="mt-9 grid gap-10 sm:grid-cols-2">
            <SignatureBlock party="ADVERTISER" />
            <SignatureBlock party="PUBLISHER / TEXAS DEFINED" />
          </div>
        </section>
      </article>
    </main>
  </Container>;
}

function ContractField({ label }: { label: string }) {
  return <div className="border-b border-foreground pb-2"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">{label}</p><p className="mt-5">&nbsp;</p></div>;
}

function AgreementSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <section className="border-t border-border pt-5"><h2 className="font-display text-2xl">{number}. {title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{children}</p></section>;
}

function SignatureBlock({ party }: { party: string }) {
  return <div><p className="eyebrow text-primary">{party}</p><div className="mt-10 space-y-6 text-sm"><p className="border-b border-foreground pb-2">Signature</p><p className="border-b border-foreground pb-2">Printed name and title</p><p className="border-b border-foreground pb-2">Legal entity</p><p className="border-b border-foreground pb-2">Date</p></div></div>;
}
