import { type FormEvent, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';

import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import {
  advertiserProgramRules,
  advertiserTiers,
  oneTimeCampaigns,
  type AdvertiserBillingCycle,
  type AdvertiserTierId,
} from '@/data/advertising-program';
import { submitPartnerInquiry } from '@/data/partner-inquiry.functions';

const description = 'Compare Texas Defined advertising and sponsorship packages, see realistic sample placements, review billing and contract terms, and request a partnership proposal.';

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
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  function chooseTier(tier: AdvertiserTierId) {
    setSelectedTier(tier);
    window.setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  }

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    const form = new FormData(event.currentTarget);
    try {
      await submitPartnerInquiry({ data: {
        contactName: String(form.get('contactName') || ''),
        email: String(form.get('email') || ''),
        company: String(form.get('company') || ''),
        website: String(form.get('website') || ''),
        partnershipType: String(form.get('partnershipType') || 'other') as typeof partnershipOptions[number][0],
        requestedTier: selectedTier,
        billingCycle,
        message: String(form.get('message') || ''),
        sourcePath: search.sourcePath,
        addressLine2: String(form.get('addressLine2') || ''),
      } });
      setStatus('sent');
    } catch (error) {
      console.error('Partner inquiry submission failed', error);
      setErrorMessage('Your inquiry could not be submitted. Please check the form and try again.');
      setStatus('error');
    }
  }

  return <>
    <DepartmentHero current="Advertise & Partner" eyebrow="Texas Defined commercial partnerships" title="Reach Texans when they are deciding where to go, stay, move, buy and explore" description={description} tone="surface" />

    <Container className="py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div><p className="eyebrow text-primary">Useful alignment</p><h2 className="mt-3 font-display text-4xl leading-tight">A professional sponsorship program, not a link marketplace.</h2></div>
        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
          <p>Texas Defined builds practical Texas travel, events, destinations, relocation, home, sports-travel and local-life resources. Approved commercial partners can appear where their service is a natural next step for the reader.</p>
          <p>Every paid relationship is disclosed. Advertising does not buy editorial coverage, rankings, reviews, recommendations or factual conclusions. Texas Defined does not guarantee traffic, clicks, leads, bookings, sales or search rankings.</p>
          <div className="flex flex-wrap gap-3 pt-2 text-sm font-semibold"><a href="#pricing" className="border border-primary bg-primary px-5 py-3 text-primary-foreground">Compare packages</a><a href="/partner-with-us/examples" className="border border-border px-5 py-3 text-foreground">See placement examples</a><a href="#contact" className="border border-border px-5 py-3 text-foreground">Request information</a></div>
        </div>
      </div>
    </Container>

    <section id="pricing" className="scroll-mt-24 border-y border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div><p className="eyebrow text-primary">Packages & pricing</p><h2 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">Choose the footprint that matches your Texas audience.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Local, Growth and Premier monthly plans begin with a three-month commitment. Annual pricing is charged annually in advance and effectively includes two months free.</p></div>
          <div className="inline-flex self-start border border-border bg-background p-1" role="group" aria-label="Pricing billing cycle">
            {(['monthly', 'annual'] as const).map((cycle) => <button key={cycle} type="button" aria-pressed={billingCycle === cycle} onClick={() => setBillingCycle(cycle)} className={`px-4 py-2 text-sm font-semibold capitalize ${billingCycle === cycle ? 'bg-foreground text-background' : 'text-muted-foreground'}`}>{cycle}</button>)}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {advertiserTiers.map((tier) => {
            const selected = tier.id === selectedTier;
            const highlighted = tier.id === 'growth';
            const annualSavings = tier.monthlyPrice != null && tier.annualPrice != null ? (tier.monthlyPrice * 12) - tier.annualPrice : null;
            return <article key={tier.id} className={`flex h-full flex-col border p-6 ${highlighted ? 'border-primary bg-background shadow-sm' : 'border-border bg-background'}`}>
              <div className="flex items-start justify-between gap-3"><div><p className="eyebrow text-primary">{highlighted ? 'Popular starting point' : 'Texas Defined partner'}</p><h3 className="mt-2 font-display text-3xl">{tier.name}</h3></div>{selected ? <span className="border border-primary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">Selected</span> : null}</div>
              <p className="mt-4 text-3xl font-bold">{tier.monthlyPrice == null ? 'Custom quote' : billingCycle === 'annual' ? money(tier.annualPrice ?? 0) : money(tier.monthlyPrice)}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{tier.monthlyPrice == null ? 'Proposal based' : billingCycle === 'annual' ? 'charged per year' : 'charged per month'}</p>
              {billingCycle === 'annual' && annualSavings != null ? <p className="mt-2 text-xs font-semibold text-primary">Save {money(annualSavings)} vs. 12 monthly payments</p> : null}
              <p className="mt-5 text-sm leading-6 text-muted-foreground">{tier.shortDescription}</p>
              <p className="mt-4 text-xs leading-6 text-muted-foreground"><strong className="text-foreground">Best for:</strong> {tier.bestFor}</p>
              <ul className="mt-5 flex-1 space-y-3 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">{tier.features.map((feature) => <li key={feature} className="flex gap-2"><span aria-hidden="true" className="text-primary">✓</span><span>{feature}</span></li>)}</ul>
              <button type="button" onClick={() => chooseTier(tier.id)} className={`mt-6 min-h-11 w-full border px-4 py-3 text-sm font-semibold ${selected ? 'border-foreground bg-foreground text-background' : 'border-primary text-primary'}`}>{tier.id === 'custom' ? 'Request custom proposal' : `Choose ${tier.name}`}</button>
            </article>;
          })}
        </div>

        <div className="mt-10 overflow-x-auto border-y border-border bg-background" tabIndex={0} aria-label="Package comparison table; scroll horizontally on smaller screens">
          <table className="w-full min-w-[760px] text-left text-sm"><thead><tr className="border-b border-border"><th className="p-4 font-display text-xl">Compare</th>{advertiserTiers.map((tier) => <th key={tier.id} scope="col" className="p-4 font-display text-xl">{tier.name}</th>)}</tr></thead><tbody className="text-muted-foreground">
            <ComparisonRow label="Monthly" values={advertiserTiers.map((tier) => tier.monthlyPrice == null ? 'Quote' : money(tier.monthlyPrice))} />
            <ComparisonRow label="Annual" values={advertiserTiers.map((tier) => tier.annualPrice == null ? 'Quote' : money(tier.annualPrice))} />
            <ComparisonRow label="Initial monthly term" values={['3 months', '3 months', '3 months', 'Order form']} />
            <ComparisonRow label="Sponsored placements" values={['1', 'Up to 3', 'Up to 6', 'Custom']} />
            <ComparisonRow label="Featured hub placement" values={['—', '1', 'Up to 2', 'Custom']} />
            <ComparisonRow label="Creative refresh" values={['Quarterly', 'Quarterly', 'Monthly', 'Custom']} />
            <ComparisonRow label="Performance report" values={['Monthly', 'Monthly', 'Detailed monthly', 'Custom']} />
            <ComparisonRow label="Social mentions" values={['—', 'Up to 1/month when available', 'Up to 2/month', 'Custom']} />
            <ComparisonRow label="Sponsored feature" values={['—', '—', 'Up to 1/quarter', 'Negotiated']} />
          </tbody></table>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">{oneTimeCampaigns.map((campaign) => <article key={campaign.name} className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">One-time option</p><h3 className="mt-2 font-display text-2xl">{campaign.name}</h3><p className="mt-2 font-bold">{campaign.price}</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{campaign.description}</p></article>)}</div>
      </Container>
    </section>

    <Container className="py-12 sm:py-16">
      <div className="grid gap-8 md:grid-cols-3">
        <article className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">See it</p><h2 className="mt-2 font-display text-3xl">Placement examples</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">See demonstration-only event, destination, relocation, sports, RV, hub and sponsored-feature treatments on desktop and mobile.</p><a href="/partner-with-us/examples" className="mt-5 inline-block border-b border-primary text-sm font-semibold">View examples →</a></article>
        <article className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">Know the rules</p><h2 className="mt-2 font-display text-3xl">Commercial terms</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Review eligibility, creative standards, disclosures, placement flexibility, cancellation, make-goods and editorial independence.</p><a href="/partner-with-us/terms" className="mt-5 inline-block border-b border-primary text-sm font-semibold">Review terms →</a></article>
        <article className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">Payment</p><h2 className="mt-2 font-display text-3xl">Billing & payment</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Review prepayment, monthly and annual billing, cards, eligible ACH, Stripe invoices, Net 15 and approved Net 30 terms.</p><a href="/partner-with-us/billing" className="mt-5 inline-block border-b border-primary text-sm font-semibold">Review billing →</a></article>
      </div>
    </Container>

    <section className="border-y border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-primary">How it works</p><h2 className="mt-3 max-w-4xl font-display text-4xl">Review first. Agreement and payment follow approval.</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{['Choose a package and submit the inquiry.', 'Texas Defined reviews the business and contextual fit.', 'Approved advertiser reviews and signs the versioned agreement.', 'Texas Defined issues the approved Stripe payment or invoice step and collects assets.', 'Campaign is scheduled, disclosed, launched and reported.'].map((step, index) => <li key={step} className="border-t border-border pt-4 text-sm leading-7 text-muted-foreground"><span className="font-bold text-primary">0{index + 1}</span><p className="mt-2">{step}</p></li>)}</ol>
        <p className="mt-7 text-sm text-muted-foreground">Approved advertisers can use the <a href="/partner-with-us/agreement" className="font-semibold text-foreground underline underline-offset-4">electronic agreement route</a>. Submitting an agreement never bypasses Texas Defined review or payment requirements.</p>
      </Container>
    </section>

    <Container className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Program standards</p><h2 className="mt-3 max-w-4xl font-display text-4xl">What every advertiser should know before signing.</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">{advertiserProgramRules.map((rule, index) => <div key={rule} className="border-t border-border pt-4"><p className="eyebrow text-muted-foreground">0{index + 1}</p><p className="mt-2 text-sm leading-7 text-muted-foreground">{rule}</p></div>)}</div>
    </Container>

    <section id="contact" className="scroll-mt-24 border-t border-border">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <section><p className="eyebrow text-primary">Request review</p><h2 className="mt-3 font-display text-4xl">Start with an inquiry, not an anonymous purchase.</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Your selected package and billing preference are included with the inquiry. Texas Defined reviews fit before sending an agreement or payment request.</p><div className="mt-8 border-y border-border py-6"><p className="font-semibold">Currently selected</p><p className="mt-2 text-sm text-muted-foreground">{advertiserTiers.find((tier) => tier.id === selectedTier)?.name} · {billingCycle === 'annual' ? 'Annual billing' : 'Monthly billing'}</p></div></section>
          <section aria-labelledby="partnership-form-heading">
            <h3 id="partnership-form-heading" className="font-display text-3xl">Request information / proposal</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Business and sponsorship inquiries are stored privately for Texas Defined to review.</p>
            {search.partnershipType === 'sports-travel' ? <p className="mt-4 border-l-2 border-primary pl-4 text-sm leading-6 text-muted-foreground">Sports-travel partnership is preselected because you arrived from a Texas Defined sports venue resource.</p> : null}
            {search.partnershipType === 'brand-retail' ? <p className="mt-4 border-l-2 border-primary pl-4 text-sm leading-6 text-muted-foreground">Texas brand / grocery / retail is preselected because you arrived from the Texas Brands directory. Inclusion and editorial treatment are not for sale.</p> : null}
            {status === 'sent' ? <div className="mt-7 border-y border-border py-6" role="status"><p className="font-semibold">Inquiry received.</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Texas Defined will review the business and proposed fit before any agreement or payment step is issued.</p></div> : null}
            <form onSubmit={submitInquiry} className="mt-8 grid gap-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2"><Field label="Your name" name="contactName" autoComplete="name" required /><Field label="Work email" name="email" type="email" autoComplete="email" required /></div>
              <div className="grid gap-5 sm:grid-cols-2"><Field label="Company or organization" name="company" autoComplete="organization" required /><Field label="Website" name="website" type="url" autoComplete="url" placeholder="https://" /></div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold" htmlFor="requestedTier">Package interest<select id="requestedTier" value={selectedTier} onChange={(event) => setSelectedTier(event.target.value as AdvertiserTierId)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal text-foreground"><option value="local">Local Partner</option><option value="growth">Growth Partner</option><option value="premier">Premier Partner</option><option value="custom">Custom Partnership</option></select></label>
                <label className="grid gap-2 text-sm font-semibold" htmlFor="billingCycle">Billing preference<select id="billingCycle" value={billingCycle} onChange={(event) => setBillingCycle(event.target.value as AdvertiserBillingCycle)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal text-foreground"><option value="monthly">Monthly</option><option value="annual">Annual</option></select></label>
              </div>
              <label className="grid gap-2 text-sm font-semibold" htmlFor="partnershipType">Business / partnership type<select key={search.partnershipType ?? 'other'} id="partnershipType" name="partnershipType" className="min-h-11 border border-border bg-background px-3 py-2 font-normal text-foreground" defaultValue={search.partnershipType ?? 'other'} required>{partnershipOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
              <label className="grid gap-2 text-sm font-semibold" htmlFor="message">What would you like to accomplish?<textarea id="message" name="message" minLength={20} maxLength={5000} rows={7} required className="border border-border bg-background px-3 py-3 font-normal text-foreground" placeholder="Tell us what you offer, the Texas audience you serve, desired geography or section, timing and campaign goals." /></label>
              <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor="addressLine2">Address line 2</label><input id="addressLine2" name="addressLine2" tabIndex={-1} autoComplete="off" /></div>
              {status === 'error' ? <p className="text-sm font-semibold text-destructive" role="alert">{errorMessage}</p> : null}
              <button type="submit" disabled={status === 'sending'} className="min-h-11 justify-self-start border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{status === 'sending' ? 'Submitting…' : 'Submit partnership inquiry'}</button>
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