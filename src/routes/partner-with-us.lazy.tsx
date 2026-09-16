import { type FormEvent, useMemo, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';

import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import { submitAdvertiserAgreement } from '@/data/advertiser-agreement.functions';
import {
  ADVERTISING_AGREEMENT_VERSION,
  advertiserPriceLabel,
  advertiserProgramRules,
  advertiserTiers,
  advertisingPaymentMethods,
  agreementClauses,
  getAdvertiserTier,
  oneTimeCampaigns,
  type AdvertiserBillingCycle,
  type AdvertiserTierId,
} from '@/data/advertising-program';
import { submitPartnerInquiry } from '@/data/partner-inquiry.functions';

const description = 'Compare Texas Defined advertising and sponsorship packages, see example placements, review billing and contract terms, and start a clearly disclosed Texas partnership.';

export const Route = createLazyFileRoute('/partner-with-us')({ component: PartnerWithUsPage });

const partnershipOptions = [
  ['insurance', 'Insurance'],
  ['mortgage', 'Mortgage / lending'],
  ['real-estate', 'Real estate'],
  ['moving', 'Moving services'],
  ['travel', 'Travel / tourism'],
  ['sports-travel', 'Sports travel / local visitor business'],
  ['brand-retail', 'Texas brand / grocery / retail'],
  ['sponsorship', 'Sponsorship'],
  ['other', 'Other'],
] as const;

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error';

function money(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function PartnerWithUsPage() {
  const search = Route.useSearch();
  const [billingCycle, setBillingCycle] = useState<AdvertiserBillingCycle>(search.billing ?? 'monthly');
  const [selectedTier, setSelectedTier] = useState<AdvertiserTierId>(search.tier ?? 'growth');
  const [inquiryStatus, setInquiryStatus] = useState<SubmitStatus>('idle');
  const [inquiryError, setInquiryError] = useState('');
  const [agreementStatus, setAgreementStatus] = useState<SubmitStatus>('idle');
  const [agreementError, setAgreementError] = useState('');

  const agreementTier = useMemo(() => getAdvertiserTier(selectedTier), [selectedTier]);

  function chooseTier(tier: AdvertiserTierId) {
    setSelectedTier(tier);
    window.setTimeout(() => document.getElementById('agreement')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  }

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInquiryStatus('sending');
    setInquiryError('');
    const form = new FormData(event.currentTarget);
    try {
      await submitPartnerInquiry({ data: {
        contactName: String(form.get('contactName') || ''),
        email: String(form.get('email') || ''),
        company: String(form.get('company') || ''),
        website: String(form.get('website') || ''),
        partnershipType: String(form.get('partnershipType') || 'other') as typeof partnershipOptions[number][0],
        message: String(form.get('message') || ''),
        sourcePath: search.sourcePath,
        addressLine2: String(form.get('addressLine2') || ''),
      } });
      event.currentTarget.reset();
      setInquiryStatus('sent');
    } catch (error) {
      console.error('Partner inquiry submission failed', error);
      setInquiryError('Your inquiry could not be submitted. Please check the form and try again.');
      setInquiryStatus('error');
    }
  }

  async function submitAgreement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAgreementStatus('sending');
    setAgreementError('');
    const form = new FormData(event.currentTarget);
    try {
      await submitAdvertiserAgreement({ data: {
        tier: selectedTier,
        billingCycle,
        legalName: String(form.get('legalName') || ''),
        signerName: String(form.get('signerName') || ''),
        signerTitle: String(form.get('signerTitle') || ''),
        signerEmail: String(form.get('signerEmail') || ''),
        billingAddress: String(form.get('billingAddress') || ''),
        companyWebsite: String(form.get('companyWebsite') || ''),
        requestedStart: String(form.get('requestedStart') || ''),
        campaignNotes: String(form.get('campaignNotes') || ''),
        typedSignature: String(form.get('typedSignature') || ''),
        authorityConfirmed: form.get('authorityConfirmed') === 'on',
        esignConsent: form.get('esignConsent') === 'on',
        agreementVersion: ADVERTISING_AGREEMENT_VERSION,
        sourcePath: search.sourcePath ?? '/partner-with-us',
        addressLine2: String(form.get('agreementAddressLine2') || ''),
      } });
      event.currentTarget.reset();
      setAgreementStatus('sent');
    } catch (error) {
      console.error('Advertiser agreement submission failed', error);
      setAgreementError(error instanceof Error ? error.message : 'Agreement acceptance could not be submitted.');
      setAgreementStatus('error');
    }
  }

  return <>
    <DepartmentHero current="Advertise & Partner" eyebrow="Texas Defined commercial partnerships" title="Reach Texans when they are deciding where to go, stay, move, buy and explore" description={description} tone="surface" />

    <Container className="py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="eyebrow text-primary">Built for useful alignment</p>
          <h2 className="mt-3 font-display text-4xl leading-tight">A professional sponsorship program, not a link marketplace.</h2>
        </div>
        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
          <p>Texas Defined builds practical Texas travel, events, destinations, relocation, home, sports-travel and local-life resources. Commercial partners can appear beside the pages where their service is a natural next step for the reader.</p>
          <p>Every paid relationship is disclosed. Advertising does not buy editorial coverage, rankings, reviews, recommendations or factual conclusions. We approve each advertiser, placement and destination before a campaign goes live.</p>
          <div className="flex flex-wrap gap-3 pt-2 text-sm font-semibold">
            <a href="#pricing" className="border border-primary bg-primary px-5 py-3 text-primary-foreground">Compare packages</a>
            <a href="#examples" className="border border-border px-5 py-3 text-foreground">See placement examples</a>
            <a href="#contact" className="border border-border px-5 py-3 text-foreground">Request a proposal</a>
          </div>
        </div>
      </div>
    </Container>

    <section id="pricing" className="scroll-mt-24 border-y border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-primary">Packages & pricing</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">Choose the footprint that matches your Texas audience.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Annual pricing is approximately ten months of the monthly rate. Monthly Local, Growth and Premier plans begin with a three-month commitment.</p>
          </div>
          <div className="inline-flex self-start border border-border bg-background p-1" aria-label="Billing cycle">
            {(['monthly', 'annual'] as const).map((cycle) => <button key={cycle} type="button" onClick={() => setBillingCycle(cycle)} className={`px-4 py-2 text-sm font-semibold capitalize ${billingCycle === cycle ? 'bg-foreground text-background' : 'text-muted-foreground'}`}>{cycle}</button>)}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {advertiserTiers.map((tier) => {
            const highlighted = tier.id === 'growth';
            const selected = tier.id === selectedTier;
            return <article key={tier.id} className={`flex h-full flex-col border p-6 ${highlighted ? 'border-primary bg-background shadow-sm' : 'border-border bg-background'}`}>
              <div className="flex items-start justify-between gap-3">
                <div><p className="eyebrow text-primary">{highlighted ? 'Popular starting point' : 'Texas Defined partner'}</p><h3 className="mt-2 font-display text-3xl">{tier.name}</h3></div>
                {selected ? <span className="border border-primary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">Selected</span> : null}
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">{tier.monthlyPrice == null ? 'Custom' : billingCycle === 'annual' ? money(tier.annualPrice ?? 0) : money(tier.monthlyPrice)}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{tier.monthlyPrice == null ? 'Proposal based' : billingCycle === 'annual' ? 'per year' : 'per month'}</p>
              {billingCycle === 'annual' && tier.monthlyPrice != null ? <p className="mt-2 text-xs font-semibold text-primary">Save {money((tier.monthlyPrice * 12) - (tier.annualPrice ?? 0))} vs. monthly</p> : null}
              <p className="mt-5 text-sm leading-6 text-muted-foreground">{tier.shortDescription}</p>
              <p className="mt-4 text-xs leading-6 text-muted-foreground"><strong className="text-foreground">Best for:</strong> {tier.bestFor}</p>
              <ul className="mt-5 flex-1 space-y-3 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
                {tier.features.map((feature) => <li key={feature} className="flex gap-2"><span aria-hidden="true" className="text-primary">✓</span><span>{feature}</span></li>)}
              </ul>
              <button type="button" onClick={() => chooseTier(tier.id)} className={`mt-6 min-h-11 w-full border px-4 py-3 text-sm font-semibold ${selected ? 'border-foreground bg-foreground text-background' : 'border-primary text-primary'}`}>{tier.id === 'custom' ? 'Build a custom proposal' : `Choose ${tier.name}`}</button>
            </article>;
          })}
        </div>

        <div className="mt-10 overflow-x-auto border-y border-border bg-background">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead><tr className="border-b border-border"><th className="p-4 font-display text-xl">Compare</th>{advertiserTiers.map((tier) => <th key={tier.id} className="p-4 font-display text-xl">{tier.name}</th>)}</tr></thead>
            <tbody className="text-muted-foreground">
              <ComparisonRow label="Monthly" values={advertiserTiers.map((tier) => tier.monthlyPrice == null ? 'Quote' : money(tier.monthlyPrice))} />
              <ComparisonRow label="Annual" values={advertiserTiers.map((tier) => tier.annualPrice == null ? 'Quote' : money(tier.annualPrice))} />
              <ComparisonRow label="Initial term" values={['3 months', '3 months', '3 months', 'Order form']} />
              <ComparisonRow label="Sponsored placements" values={['1', 'Up to 3', 'Up to 6', 'Custom']} />
              <ComparisonRow label="Featured hub placement" values={['—', '1', 'Up to 2', 'Custom']} />
              <ComparisonRow label="Creative refresh" values={['Quarterly', 'Quarterly', 'Monthly', 'Custom']} />
              <ComparisonRow label="Performance report" values={['Monthly', 'Monthly', 'Monthly', 'Custom']} />
              <ComparisonRow label="Sponsored feature" values={['—', '—', 'Up to 1 / quarter', 'Negotiated']} />
              <ComparisonRow label="Category exclusivity" values={['—', '—', 'Optional add-on', 'Available']} />
            </tbody>
          </table>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {oneTimeCampaigns.map((campaign) => <article key={campaign.name} className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">One-time option</p><h3 className="mt-2 font-display text-2xl">{campaign.name}</h3><p className="mt-2 font-bold">{campaign.price}</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{campaign.description}</p></article>)}
        </div>
      </Container>
    </section>

    <section id="examples" className="scroll-mt-24">
      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-primary">Placement examples</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Show the advertiser exactly what a partnership can look like.</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">The examples below use a fictional advertiser. Live campaigns are adapted to the partner, the page and the reader context while retaining clear commercial labeling.</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="border border-border bg-surface p-6 sm:p-8">
            <div className="border-b border-border pb-5"><p className="eyebrow text-muted-foreground">Example article</p><h3 className="mt-2 font-display text-3xl">A fall weekend in the Texas Hill Country</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Editorial content continues normally above and below the clearly separated commercial module.</p></div>
            <div className="my-8 border-y-2 border-primary bg-background p-5">
              <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Sponsored · Example advertiser</p><h4 className="mt-2 font-display text-2xl">Lone Star Trail & Stay</h4></div><span className="border border-border px-3 py-1 text-xs text-muted-foreground">Hill Country lodging</span></div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">Planning a Hill Country weekend? Explore cabins, RV sites and locally hosted stays close to the route.</p>
              <span className="mt-5 inline-block bg-foreground px-4 py-2 text-sm font-semibold text-background">Explore stays →</span>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">Editorial content resumes here. Sponsored placement does not change the article recommendation, rankings or factual conclusions.</p>
          </div>

          <div className="space-y-8">
            <div className="border border-border p-6 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Featured partner · Example</p>
              <div className="mt-4 grid gap-5 sm:grid-cols-[120px_1fr]"><div className="aspect-[4/3] bg-surface" aria-hidden="true" /><div><h3 className="font-display text-2xl">Stay near the trail</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">A compact destination module can sit beside a park, event or road-trip planning section when the advertiser is genuinely relevant.</p><span className="mt-4 inline-block border-b border-primary text-sm font-semibold text-primary">View partner →</span></div></div>
            </div>
            <div className="border border-border bg-foreground p-6 text-background sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-background/70">Section sponsor · Example</p>
              <h3 className="mt-3 font-display text-3xl">Texas fall road trips</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-background/75">Presented with support from Lone Star Trail & Stay. Sponsorship is disclosed; Texas Defined retains editorial control of every guide in the collection.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>

    <section id="billing" className="scroll-mt-24 border-y border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div><p className="eyebrow text-primary">Billing & payment</p><h2 className="mt-3 font-display text-4xl">Professional B2B billing without making advertisers learn our shop checkout.</h2></div>
          <div>
            <div className="grid gap-5 sm:grid-cols-3">{advertisingPaymentMethods.map((method) => <article key={method.name} className="border-t-2 border-foreground pt-5"><h3 className="font-display text-2xl">{method.name}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{method.description}</p></article>)}</div>
            <div className="mt-8 border-t border-border pt-6 text-sm leading-7 text-muted-foreground">
              <p><strong className="text-foreground">Default policy:</strong> new advertisers prepay. Approved organizations may receive Net 15 terms; Net 30 can be approved when procurement requirements justify it. Monthly recurring partnerships are billed in advance. Annual partnerships are billed annually in advance.</p>
              <p className="mt-3">Stripe will host card and eligible bank-payment collection. Texas Defined will not store raw card data. Purchase-order details can be reflected on approved invoices.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>

    <section id="standards">
      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-primary">Program standards</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl">What every advertiser should know before signing.</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">{advertiserProgramRules.map((rule, index) => <div key={rule} className="border-t border-border pt-4"><p className="eyebrow text-muted-foreground">0{index + 1}</p><p className="mt-2 text-sm leading-7 text-muted-foreground">{rule}</p></div>)}</div>
      </Container>
    </section>

    <section id="agreement" className="scroll-mt-24 border-y border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <p className="eyebrow text-primary">Agreement & electronic acceptance</p>
            <h2 className="mt-3 font-display text-4xl">Contract for {agreementTier.name}</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Agreement version {ADVERTISING_AGREEMENT_VERSION}. The package schedule changes automatically with the selected tier and billing cycle. Texas Defined must approve the advertiser and accept the order before a campaign becomes active.</p>

            <div className="mt-7 border-y border-border py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3"><p className="font-display text-2xl">{agreementTier.name}</p><p className="font-bold text-primary">{advertiserPriceLabel(agreementTier, billingCycle)}</p></div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{agreementTier.commitment}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">{agreementTier.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>
            </div>

            <div className="mt-6 space-y-3">
              {agreementClauses.map((clause, index) => <details key={clause.heading} open={index < 3} className="border-b border-border pb-3"><summary className="cursor-pointer py-2 font-semibold text-foreground">{clause.heading}</summary><p className="pb-2 text-sm leading-7 text-muted-foreground">{clause.body}</p></details>)}
            </div>
            <p className="mt-5 text-xs leading-6 text-muted-foreground">This is a business agreement template prepared for Texas Defined's advertiser workflow. Before outreach begins, the final contracting entity, business notice address and any counsel-requested revisions should be confirmed.</p>
          </div>

          <div className="border-t-2 border-foreground pt-7 lg:border-t-0 lg:pt-0">
            <p className="eyebrow text-primary">For approved advertisers</p>
            <h3 className="mt-3 font-display text-3xl">Accept the selected agreement</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Submitting this form records the agreement version, selected package, published price, signer details and an agreement snapshot. It does not activate a campaign until Texas Defined accepts the advertiser and billing is completed.</p>

            {agreementStatus === 'sent' ? <div className="mt-6 border-y border-border py-6" role="status"><p className="font-semibold">Agreement acceptance received.</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Texas Defined will review the account and then issue the appropriate Stripe checkout, subscription or invoice instructions.</p></div> : null}

            <form onSubmit={submitAgreement} className="mt-7 grid gap-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold" htmlFor="agreementTier">Package<select id="agreementTier" value={selectedTier} onChange={(event) => setSelectedTier(event.target.value as AdvertiserTierId)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal"><option value="local">Local Partner</option><option value="growth">Growth Partner</option><option value="premier">Premier Partner</option><option value="custom">Custom Partnership</option></select></label>
                <label className="grid gap-2 text-sm font-semibold" htmlFor="agreementBilling">Billing<select id="agreementBilling" value={billingCycle} onChange={(event) => setBillingCycle(event.target.value as AdvertiserBillingCycle)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal"><option value="monthly">Monthly</option><option value="annual">Annual</option></select></label>
              </div>
              <Field label="Advertiser legal name" name="legalName" autoComplete="organization" required />
              <div className="grid gap-5 sm:grid-cols-2"><Field label="Authorized signer" name="signerName" autoComplete="name" required /><Field label="Title" name="signerTitle" autoComplete="organization-title" required /></div>
              <Field label="Signer email" name="signerEmail" type="email" autoComplete="email" required />
              <label className="grid gap-2 text-sm font-semibold" htmlFor="billingAddress">Billing / notice address<textarea id="billingAddress" name="billingAddress" rows={3} minLength={10} maxLength={500} required className="border border-border bg-background px-3 py-3 font-normal" /></label>
              <Field label="Company website" name="companyWebsite" type="url" autoComplete="url" placeholder="https://" />
              <Field label="Requested campaign start" name="requestedStart" type="date" />
              <label className="grid gap-2 text-sm font-semibold" htmlFor="campaignNotes">Campaign notes / order-form details<textarea id="campaignNotes" name="campaignNotes" rows={4} maxLength={2500} className="border border-border bg-background px-3 py-3 font-normal" placeholder="Optional placements, markets, PO requirements or custom scope." /></label>
              <Field label="Type your full legal name as your electronic signature" name="typedSignature" autoComplete="name" required />
              <label className="flex gap-3 text-sm leading-6 text-muted-foreground"><input type="checkbox" name="authorityConfirmed" required className="mt-1 h-4 w-4" /><span>I represent that I am authorized to enter this agreement for the advertiser identified above.</span></label>
              <label className="flex gap-3 text-sm leading-6 text-muted-foreground"><input type="checkbox" name="esignConsent" required className="mt-1 h-4 w-4" /><span>I intend my typed name and submission to serve as my electronic signature and I consent to electronic records for this agreement.</span></label>
              <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor="agreementAddressLine2">Address line 2</label><input id="agreementAddressLine2" name="agreementAddressLine2" tabIndex={-1} autoComplete="off" /></div>
              {agreementStatus === 'error' ? <p className="text-sm font-semibold text-destructive" role="alert">{agreementError}</p> : null}
              <button type="submit" disabled={agreementStatus === 'sending'} className="min-h-11 justify-self-start border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{agreementStatus === 'sending' ? 'Submitting…' : 'Accept & submit agreement'}</button>
            </form>
          </div>
        </div>
      </Container>
    </section>

    <section id="contact" className="scroll-mt-24">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <section>
            <p className="eyebrow text-primary">Start a conversation</p>
            <h2 className="mt-3 font-display text-4xl">Not ready to choose a tier?</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Tell us who you serve and what you want to accomplish. We can recommend a package, a seasonal campaign or a custom structure without changing the editorial line.</p>
            <div className="mt-8 border-y border-border py-6"><p className="font-semibold">Good partnership categories</p><p className="mt-3 text-sm leading-7 text-muted-foreground">Travel and tourism · Hotels and vacation rentals · RV and camping · Events and attractions · Relocation and moving · Home and local services · Texas consumer brands · Sports travel · Restaurants and visitor services.</p></div>
          </section>

          <section aria-labelledby="partnership-form-heading">
            <h3 id="partnership-form-heading" className="font-display text-3xl">Request a proposal</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Business and sponsorship inquiries are stored privately for Texas Defined to review.</p>
            {search.partnershipType === 'sports-travel' ? <p className="mt-4 border-l-2 border-primary pl-4 text-sm leading-6 text-muted-foreground">Sports-travel partnership is preselected because you arrived from a Texas Defined sports venue resource.</p> : null}
            {search.partnershipType === 'brand-retail' ? <p className="mt-4 border-l-2 border-primary pl-4 text-sm leading-6 text-muted-foreground">Texas brand / grocery / retail is preselected because you arrived from the Texas Brands directory. Inclusion and editorial treatment are not for sale.</p> : null}
            {inquiryStatus === 'sent' ? <div className="mt-7 border-y border-border py-6" role="status"><p className="font-semibold">Inquiry received.</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Thank you. Texas Defined can review the details you submitted and follow up using the email address provided.</p></div> : null}

            <form onSubmit={submitInquiry} className="mt-8 grid gap-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2"><Field label="Your name" name="contactName" autoComplete="name" required /><Field label="Work email" name="email" type="email" autoComplete="email" required /></div>
              <div className="grid gap-5 sm:grid-cols-2"><Field label="Company or organization" name="company" autoComplete="organization" required /><Field label="Website" name="website" type="url" autoComplete="url" placeholder="https://" /></div>
              <label className="grid gap-2 text-sm font-semibold" htmlFor="partnershipType">Partnership type<select key={search.partnershipType ?? 'other'} id="partnershipType" name="partnershipType" className="min-h-11 border border-border bg-background px-3 py-2 font-normal text-foreground" defaultValue={search.partnershipType ?? 'other'} required>{partnershipOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
              <label className="grid gap-2 text-sm font-semibold" htmlFor="message">What would you like to explore?<textarea id="message" name="message" minLength={20} maxLength={5000} rows={7} required className="border border-border bg-background px-3 py-3 font-normal text-foreground" placeholder="Tell us what you offer, the Texas audience you serve and the type of partnership you have in mind." /></label>
              <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor="addressLine2">Address line 2</label><input id="addressLine2" name="addressLine2" tabIndex={-1} autoComplete="off" /></div>
              {inquiryStatus === 'error' ? <p className="text-sm font-semibold text-destructive" role="alert">{inquiryError}</p> : null}
              <button type="submit" disabled={inquiryStatus === 'sending'} className="min-h-11 justify-self-start border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{inquiryStatus === 'sending' ? 'Submitting…' : 'Submit partnership inquiry'}</button>
            </form>
          </section>
        </div>
      </Container>
    </section>
  </>;
}

function ComparisonRow({ label, values }: { label: string; values: readonly string[] }) {
  return <tr className="border-b border-border last:border-b-0"><th scope="row" className="p-4 font-semibold text-foreground">{label}</th>{values.map((value, index) => <td key={`${label}-${index}`} className="p-4">{value}</td>)}</tr>;
}

function Field({ label, name, type = 'text', autoComplete, placeholder, required = false }: { label: string; name: string; type?: string; autoComplete?: string; placeholder?: string; required?: boolean }) {
  return <label className="grid gap-2 text-sm font-semibold" htmlFor={name}>{label}<input id={name} name={name} type={type} autoComplete={autoComplete} placeholder={placeholder} required={required} className="min-h-11 border border-border bg-background px-3 py-2 font-normal text-foreground" /></label>;
}
