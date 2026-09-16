import { type FormEvent, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';

import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import { submitAdvertiserAgreement } from '@/data/advertiser-agreement.functions';
import {
  ADVERTISING_AGREEMENT_VERSION,
  advertiserPriceLabel,
  advertiserProgramRules,
  advertiserTiers,
  getAdvertiserTier,
  oneTimeCampaigns,
  type AdvertiserBillingCycle,
  type AdvertiserTierId,
} from '@/data/advertising-program';
import { submitPartnerInquiry } from '@/data/partner-inquiry.functions';

export const Route = createLazyFileRoute('/partner-with-us')({ component: PartnerWithUsPage });

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error';
const partnershipOptions = [
  ['insurance', 'Insurance'], ['mortgage', 'Mortgage / lending'], ['real-estate', 'Real estate'],
  ['moving', 'Moving services'], ['travel', 'Travel / tourism'], ['sports-travel', 'Sports travel / local visitor business'],
  ['brand-retail', 'Texas brand / grocery / retail'], ['sponsorship', 'Sponsorship'], ['other', 'Other'],
] as const;

function money(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function PartnerWithUsPage() {
  const search = Route.useSearch();
  const [billingCycle, setBillingCycle] = useState<AdvertiserBillingCycle>(search.billing ?? 'monthly');
  const [selectedTier, setSelectedTier] = useState<AdvertiserTierId>(search.tier ?? 'growth');
  const [inquiryStatus, setInquiryStatus] = useState<SubmitStatus>('idle');
  const [agreementStatus, setAgreementStatus] = useState<SubmitStatus>('idle');
  const [formError, setFormError] = useState('');
  const agreementTier = getAdvertiserTier(selectedTier);
  const isSportsTravelLead = search.partnershipType === 'sports-travel';

  function chooseTier(tier: AdvertiserTierId) {
    setSelectedTier(tier);
    window.setTimeout(() => document.getElementById('agreement')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  }

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setInquiryStatus('sending'); setFormError('');
    const form = new FormData(event.currentTarget);
    try {
      await submitPartnerInquiry({ data: {
        contactName: String(form.get('contactName') || ''), email: String(form.get('email') || ''),
        company: String(form.get('company') || ''), website: String(form.get('website') || ''),
        partnershipType: String(form.get('partnershipType') || 'other') as typeof partnershipOptions[number][0],
        message: String(form.get('message') || ''), sourcePath: search.sourcePath,
        addressLine2: String(form.get('addressLine2') || ''),
      } });
      event.currentTarget.reset(); setInquiryStatus('sent');
    } catch (error) {
      console.error('Partner inquiry submission failed', error); setFormError('Your inquiry could not be submitted. Please check the form and try again.'); setInquiryStatus('error');
    }
  }

  async function submitAgreement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setAgreementStatus('sending'); setFormError('');
    const form = new FormData(event.currentTarget);
    try {
      await submitAdvertiserAgreement({ data: {
        tier: selectedTier, billingCycle,
        legalName: String(form.get('legalName') || ''), signerName: String(form.get('signerName') || ''),
        signerTitle: String(form.get('signerTitle') || ''), signerEmail: String(form.get('signerEmail') || ''),
        billingAddress: String(form.get('billingAddress') || ''), companyWebsite: String(form.get('companyWebsite') || ''),
        requestedStart: String(form.get('requestedStart') || ''), campaignNotes: String(form.get('campaignNotes') || ''),
        typedSignature: String(form.get('typedSignature') || ''), authorityConfirmed: form.get('authorityConfirmed') === 'on',
        esignConsent: form.get('esignConsent') === 'on', agreementVersion: ADVERTISING_AGREEMENT_VERSION,
        sourcePath: search.sourcePath ?? '/partner-with-us', addressLine2: String(form.get('agreementAddressLine2') || ''),
      } });
      event.currentTarget.reset(); setAgreementStatus('sent');
    } catch (error) {
      console.error('Advertiser agreement submission failed', error); setFormError(error instanceof Error ? error.message : 'Agreement acceptance could not be submitted.'); setAgreementStatus('error');
    }
  }

  return <>
    <DepartmentHero current="Advertise & Partner" eyebrow="Texas Defined commercial partnerships" title="Reach Texans when they are deciding where to go, stay, move, buy and explore" description="Compare transparent packages, review real placement formats, choose monthly or annual billing, and complete a versioned advertising agreement." tone="surface" />

    <Container className="py-12 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div><p className="eyebrow text-primary">Built for useful alignment</p><h2 className="mt-3 font-display text-4xl leading-tight">A professional sponsorship program, not a link marketplace.</h2></div>
        <div className="space-y-5 text-base leading-8 text-muted-foreground"><p>Texas Defined builds practical Texas travel, events, destinations, relocation, home and local-life resources. Commercial partners can appear where their service is a natural next step for the reader.</p><p>Paid relationships do not buy editorial coverage, favorable rankings or changes to factual conclusions. Every advertiser, placement and destination is subject to approval.</p>{isSportsTravelLead ? <p className="border-l-2 border-primary pl-4 text-sm">You came from our sports-travel coverage. Tell us which venue, event, lodging, dining or visitor market you want to support and we will keep that source context with your inquiry.</p> : null}<div className="flex flex-wrap gap-3 pt-2 text-sm font-semibold"><a href="#pricing" className="border border-primary bg-primary px-5 py-3 text-primary-foreground">Compare packages</a><a href="/advertising/examples.html" className="border border-border px-5 py-3 text-foreground">View full placement demo</a><a href="#contact" className="border border-border px-5 py-3 text-foreground">Request a proposal</a></div></div>
      </div>
    </Container>

    <section id="pricing" className="scroll-mt-24 border-y border-border bg-surface"><Container className="py-12 sm:py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><p className="eyebrow text-primary">Packages & pricing</p><h2 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">Choose the footprint that matches your Texas audience.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Annual pricing is approximately ten months of the monthly rate. Monthly Local, Growth and Premier plans begin with a three-month commitment.</p></div><div className="inline-flex self-start border border-border bg-background p-1" aria-label="Billing cycle">{(['monthly','annual'] as const).map((cycle) => <button key={cycle} type="button" onClick={() => setBillingCycle(cycle)} className={`px-4 py-2 text-sm font-semibold capitalize ${billingCycle === cycle ? 'bg-foreground text-background' : 'text-muted-foreground'}`}>{cycle}</button>)}</div></div>
      <div className="mt-10 grid gap-5 lg:grid-cols-4">{advertiserTiers.map((tier) => <article key={tier.id} className={`flex h-full flex-col border bg-background p-6 ${tier.id === 'growth' ? 'border-primary' : 'border-border'}`}><p className="eyebrow text-primary">{tier.id === 'growth' ? 'Popular starting point' : 'Texas Defined partner'}</p><h3 className="mt-2 font-display text-3xl">{tier.name}</h3><p className="mt-4 text-3xl font-bold">{tier.monthlyPrice == null ? 'Custom' : billingCycle === 'annual' ? money(tier.annualPrice ?? 0) : money(tier.monthlyPrice)}</p><p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{tier.monthlyPrice == null ? 'Proposal based' : billingCycle === 'annual' ? 'per year' : 'per month'}</p>{billingCycle === 'annual' && tier.monthlyPrice != null ? <p className="mt-2 text-xs font-semibold text-primary">Save {money((tier.monthlyPrice * 12) - (tier.annualPrice ?? 0))} vs. monthly</p> : null}<p className="mt-4 text-sm leading-6 text-muted-foreground">{tier.shortDescription}</p><ul className="mt-5 flex-1 space-y-2 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">{tier.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul><button type="button" onClick={() => chooseTier(tier.id)} className="mt-6 min-h-11 w-full border border-primary px-4 py-3 text-sm font-semibold text-primary">{tier.id === 'custom' ? 'Build a custom proposal' : `Choose ${tier.name}`}</button></article>)}</div>
      <div className="mt-10 overflow-x-auto border-y border-border bg-background"><table className="w-full min-w-[760px] text-left text-sm"><thead><tr className="border-b border-border"><th className="p-4 font-display text-xl">Compare</th>{advertiserTiers.map((tier) => <th key={tier.id} className="p-4 font-display text-xl">{tier.name}</th>)}</tr></thead><tbody className="text-muted-foreground"><ComparisonRow label="Monthly" values={['$249','$499','$999','Quote']} /><ComparisonRow label="Annual" values={['$2,490','$4,990','$9,990','Quote']} /><ComparisonRow label="Initial term" values={['3 months','3 months','3 months','Order form']} /><ComparisonRow label="Sponsored placements" values={['1','Up to 3','Up to 6','Custom']} /><ComparisonRow label="Featured hub placement" values={['—','1','Up to 2','Custom']} /><ComparisonRow label="Creative refresh" values={['Quarterly','Quarterly','Monthly','Custom']} /><ComparisonRow label="Performance report" values={['Monthly','Monthly','Monthly','Custom']} /><ComparisonRow label="Sponsored feature" values={['—','—','Up to 1 / quarter','Negotiated']} /></tbody></table></div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">{oneTimeCampaigns.map((campaign) => <article key={campaign.name} className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">One-time option</p><h3 className="mt-2 font-display text-2xl">{campaign.name}</h3><p className="mt-2 font-bold">{campaign.price}</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{campaign.description}</p></article>)}</div>
    </Container></section>

    <section id="examples"><Container className="py-12 sm:py-16"><div className="grid gap-8 lg:grid-cols-[1fr_1fr]"><div><p className="eyebrow text-primary">Placement examples</p><h2 className="mt-3 font-display text-4xl">Show the format before anyone buys.</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Our dedicated demonstration uses fictional advertisers to show an in-article lodging module, a featured partner card, a section sponsorship and a time-bound event campaign.</p></div><div className="border-y border-border py-6"><a href="/advertising/examples.html" className="font-display text-2xl underline decoration-primary underline-offset-4">Open the full advertiser placement demonstration →</a><p className="mt-3 text-sm leading-7 text-muted-foreground">The demo is intentionally excluded from search indexing and makes clear that every example business is fictional.</p></div></div></Container></section>

    <section id="billing" className="border-y border-border bg-surface"><Container className="py-12 sm:py-16"><p className="eyebrow text-primary">Billing & payment</p><h2 className="mt-3 font-display text-4xl">Card, bank payment and professional invoicing.</h2><div className="mt-7 grid gap-5 md:grid-cols-3"><Info title="Prepaid by default">New advertisers normally pay before campaign launch. Monthly plans bill in advance; annual plans bill annually in advance.</Info><Info title="Approved invoice terms">Established organizations may be approved for Net 15, or Net 30 when procurement requirements justify it.</Info><Info title="Stripe-hosted payment">Checkout and invoice payment use secure Stripe-hosted pages; Texas Defined does not ask advertisers to email raw card details.</Info></div><div className="mt-7 flex flex-wrap gap-3"><a href="/advertising/billing.html" className="border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Read billing & invoice policy</a><a href="/advertising/terms.html" className="border border-border bg-background px-5 py-3 text-sm font-semibold">Review full contract terms</a></div></Container></section>

    <section id="standards"><Container className="py-12 sm:py-16"><p className="eyebrow text-primary">Program standards</p><h2 className="mt-3 max-w-4xl font-display text-4xl">What every advertiser should know before signing.</h2><div className="mt-8 grid gap-4 sm:grid-cols-2">{advertiserProgramRules.map((rule, index) => <div key={rule} className="border-t border-border pt-4"><p className="eyebrow text-muted-foreground">0{index + 1}</p><p className="mt-2 text-sm leading-7 text-muted-foreground">{rule}</p></div>)}</div></Container></section>

    <section id="agreement" className="scroll-mt-24 border-y border-border bg-surface"><Container className="py-12 sm:py-16"><div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"><div><p className="eyebrow text-primary">Agreement & electronic acceptance</p><h2 className="mt-3 font-display text-4xl">Contract for {agreementTier.name}</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Agreement version {ADVERTISING_AGREEMENT_VERSION}. Your accepted record stores the selected tier, billing cycle, published price and a snapshot of the full agreement. Campaign activation still requires Texas Defined approval and completed billing.</p><div className="mt-7 border-y border-border py-5"><div className="flex flex-wrap items-baseline justify-between gap-3"><p className="font-display text-2xl">{agreementTier.name}</p><p className="font-bold text-primary">{advertiserPriceLabel(agreementTier, billingCycle)}</p></div><p className="mt-2 text-sm leading-6 text-muted-foreground">{agreementTier.commitment}</p></div><div className="mt-6 space-y-3 text-sm leading-7 text-muted-foreground"><p><a className="font-semibold text-primary underline underline-offset-4" href={`/advertising/terms.html#${selectedTier}`}>Read the full base agreement and {agreementTier.name} schedule →</a></p><p><a className="font-semibold text-primary underline underline-offset-4" href="/advertising/billing.html">Review invoice and payment policy →</a></p></div></div><div><h3 className="font-display text-3xl">Accept the selected agreement</h3>{agreementStatus === 'sent' ? <div className="mt-6 border-y border-border py-6" role="status"><p className="font-semibold">Agreement acceptance received.</p><p className="mt-2 text-sm text-muted-foreground">We can now review the account and issue the appropriate checkout, subscription or invoice instructions.</p></div> : null}<form onSubmit={submitAgreement} className="mt-7 grid gap-5" noValidate><div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Package<select value={selectedTier} onChange={(e) => setSelectedTier(e.target.value as AdvertiserTierId)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal"><option value="local">Local Partner</option><option value="growth">Growth Partner</option><option value="premier">Premier Partner</option><option value="custom">Custom Partnership</option></select></label><label className="grid gap-2 text-sm font-semibold">Billing<select value={billingCycle} onChange={(e) => setBillingCycle(e.target.value as AdvertiserBillingCycle)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal"><option value="monthly">Monthly</option><option value="annual">Annual</option></select></label></div><Field label="Advertiser legal name" name="legalName" required /><div className="grid gap-5 sm:grid-cols-2"><Field label="Authorized signer" name="signerName" required /><Field label="Title" name="signerTitle" required /></div><Field label="Signer email" name="signerEmail" type="email" required /><label className="grid gap-2 text-sm font-semibold">Billing / notice address<textarea name="billingAddress" rows={3} minLength={10} maxLength={500} required className="border border-border bg-background px-3 py-3 font-normal" /></label><Field label="Company website" name="companyWebsite" type="url" placeholder="https://" /><Field label="Requested campaign start" name="requestedStart" type="date" /><label className="grid gap-2 text-sm font-semibold">Campaign notes / PO requirements<textarea name="campaignNotes" rows={3} maxLength={2500} className="border border-border bg-background px-3 py-3 font-normal" /></label><Field label="Type your full legal name as your electronic signature" name="typedSignature" required /><label className="flex gap-3 text-sm leading-6 text-muted-foreground"><input type="checkbox" required className="mt-1 h-4 w-4" /><span>I have reviewed the <a href="/advertising/terms.html" className="underline">full Advertising & Sponsorship Agreement</a> and the schedule for the package selected above.</span></label><label className="flex gap-3 text-sm leading-6 text-muted-foreground"><input type="checkbox" name="authorityConfirmed" required className="mt-1 h-4 w-4" /><span>I am authorized to enter this agreement for the advertiser.</span></label><label className="flex gap-3 text-sm leading-6 text-muted-foreground"><input type="checkbox" name="esignConsent" required className="mt-1 h-4 w-4" /><span>I intend my typed name and submission to serve as my electronic signature and consent to electronic records.</span></label><div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true"><input name="agreementAddressLine2" tabIndex={-1} autoComplete="off" /></div>{agreementStatus === 'error' ? <p className="text-sm font-semibold text-destructive" role="alert">{formError}</p> : null}<button type="submit" disabled={agreementStatus === 'sending'} className="min-h-11 justify-self-start border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{agreementStatus === 'sending' ? 'Submitting…' : 'Accept & submit agreement'}</button></form></div></div></Container></section>

    <section id="contact" className="scroll-mt-24"><Container className="py-12 sm:py-16"><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"><div><p className="eyebrow text-primary">Start a conversation</p><h2 className="mt-3 font-display text-4xl">Need a recommendation or custom proposal?</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Tell us who you serve, where in Texas you operate and what you want to accomplish. We can recommend a package without changing the editorial line.</p></div><div><h3 className="font-display text-3xl">Request a proposal</h3>{inquiryStatus === 'sent' ? <p className="mt-5 border-y border-border py-5 font-semibold" role="status">Inquiry received. Texas Defined can review it and follow up using the email provided.</p> : null}<form onSubmit={submitInquiry} className="mt-7 grid gap-5" noValidate><div className="grid gap-5 sm:grid-cols-2"><Field label="Your name" name="contactName" required /><Field label="Work email" name="email" type="email" required /></div><div className="grid gap-5 sm:grid-cols-2"><Field label="Company or organization" name="company" required /><Field label="Website" name="website" type="url" placeholder="https://" /></div><label className="grid gap-2 text-sm font-semibold">Partnership type<select name="partnershipType" className="min-h-11 border border-border bg-background px-3 py-2 font-normal" defaultValue={search.partnershipType ?? 'other'}>{partnershipOptions.map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></label><label className="grid gap-2 text-sm font-semibold">What would you like to explore?<textarea name="message" minLength={20} maxLength={5000} rows={6} required className="border border-border bg-background px-3 py-3 font-normal" /></label><div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true"><input name="addressLine2" tabIndex={-1} autoComplete="off" /></div>{inquiryStatus === 'error' ? <p className="text-sm font-semibold text-destructive" role="alert">{formError}</p> : null}<button type="submit" disabled={inquiryStatus === 'sending'} className="min-h-11 justify-self-start border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{inquiryStatus === 'sending' ? 'Submitting…' : 'Submit partnership inquiry'}</button></form></div></div></Container></section>
  </>;
}

function ComparisonRow({ label, values }: { label: string; values: readonly string[] }) {
  return <tr className="border-b border-border last:border-b-0"><th scope="row" className="p-4 font-semibold text-foreground">{label}</th>{values.map((value,index) => <td key={`${label}-${index}`} className="p-4">{value}</td>)}</tr>;
}

function Info({ title, children }: { title: string; children: string }) {
  return <div className="border-t-2 border-foreground pt-4"><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{children}</p></div>;
}

function Field({ label, name, type = 'text', placeholder, required = false }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return <label className="grid gap-2 text-sm font-semibold">{label}<input name={name} type={type} placeholder={placeholder} required={required} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" /></label>;
}
