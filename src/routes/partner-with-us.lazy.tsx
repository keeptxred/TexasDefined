import { createLazyFileRoute } from '@tanstack/react-router';
import { type FormEvent, useState } from 'react';

import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import {
  ADVERTISING_BILLING_POLICY,
  ADVERTISING_COMPARISON_ROWS,
  ADVERTISING_PAYMENT_METHODS,
  ADVERTISING_TIER_BY_ID,
  ADVERTISING_TIERS,
  ONE_TIME_ADVERTISING_OPTIONS,
  advertisingPrice,
  formatAdvertisingPrice,
  type AdvertisingBillingCadence,
  type AdvertisingTier,
} from '@/data/advertising-program';
import { submitPartnerInquiry } from '@/data/partner-inquiry.functions';

const description = 'Compare Texas Defined advertising and sponsorship packages, billing options and sample placements, then start a clearly disclosed partnership without blurring the editorial line.';

export const Route = createLazyFileRoute('/partner-with-us')({ component: PartnerWithUsPage });

const partnershipOptions = [
  ['insurance', 'Insurance'],
  ['mortgage', 'Mortgage / lending'],
  ['real-estate', 'Real estate'],
  ['moving', 'Moving services'],
  ['travel', 'Travel / tourism'],
  ['sports-travel', 'Sports travel / local visitor business'],
  ['brand-retail', 'Texas brand / grocery / retail'],
  ['sponsorship', 'Advertising / sponsorship'],
  ['other', 'Other'],
] as const;

function PartnerWithUsPage() {
  const search = Route.useSearch();
  const [cadence, setCadence] = useState<AdvertisingBillingCadence>(search.billing ?? 'monthly');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const selectedTier = search.tier ? ADVERTISING_TIER_BY_ID[search.tier] : undefined;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    const form = new FormData(event.currentTarget);
    const requestedPackage = selectedTier
      ? `Requested package: ${selectedTier.name} (${search.billing ?? cadence})`
      : '';
    const message = [requestedPackage, String(form.get('message') || '')].filter(Boolean).join('\n\n');
    try {
      await submitPartnerInquiry({ data: {
        contactName: String(form.get('contactName') || ''),
        email: String(form.get('email') || ''),
        company: String(form.get('company') || ''),
        website: String(form.get('website') || ''),
        partnershipType: String(form.get('partnershipType') || 'other') as typeof partnershipOptions[number][0],
        message,
        sourcePath: search.sourcePath,
        addressLine2: String(form.get('addressLine2') || ''),
      } });
      event.currentTarget.reset();
      setStatus('sent');
    } catch (error) {
      console.error('Partner inquiry submission failed', error);
      setErrorMessage('Your inquiry could not be submitted. Please check the form and try again.');
      setStatus('error');
    }
  }

  return <>
    <DepartmentHero current="Partner With Us" eyebrow="Texas Defined advertising & partnerships" title="Reach Texans where they are already planning what to do next" description={description} tone="surface" />

    <Container className="py-12 sm:py-16">
      <section className="grid gap-10 border-b border-border pb-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="eyebrow text-primary">Built for useful commercial fit</p>
          <h2 className="mt-3 font-display text-4xl leading-tight">A sponsorship should make the page more useful, not less trustworthy.</h2>
        </div>
        <div className="space-y-5 text-sm leading-7 text-muted-foreground">
          <p>Texas Defined builds practical resources around travel, destinations, events, sports trips, moving, homes, property, outdoor recreation, Texas brands and local life. We work with advertisers when the business is relevant to the reader's next step.</p>
          <p>Paid relationships do not buy editorial coverage, favorable rankings, positive reviews or changes to factual conclusions. Sponsored placements are labeled, commercial links use appropriate sponsored-link attributes, and every advertiser is reviewed before a campaign is accepted.</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="/partner-with-us/showcase" className="border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground">See sample placements</a>
            <a href="/partner-with-us/billing" className="border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">Billing & payment methods</a>
            <a href="/partner-with-us/terms" className="border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">Advertising terms</a>
          </div>
        </div>
      </section>

      <section className="py-12" aria-labelledby="plans-heading">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-primary">Partner plans</p>
            <h2 id="plans-heading" className="mt-2 font-display text-4xl">Choose the reach that fits the campaign</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Plans buy defined placements and services, not guaranteed traffic or sales. Annual pricing covers twelve months at approximately the cost of ten monthly payments.</p>
          </div>
          <div className="inline-flex border border-border p-1" role="group" aria-label="Billing cadence">
            <button type="button" onClick={() => setCadence('monthly')} className={`px-4 py-2 text-sm font-semibold ${cadence === 'monthly' ? 'bg-foreground text-background' : 'text-muted-foreground'}`}>Monthly</button>
            <button type="button" onClick={() => setCadence('annual')} className={`px-4 py-2 text-sm font-semibold ${cadence === 'annual' ? 'bg-foreground text-background' : 'text-muted-foreground'}`}>Annual · save</button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {ADVERTISING_TIERS.map((tier) => <PlanCard key={tier.id} tier={tier} cadence={cadence} />)}
        </div>

        <div className="mt-10 overflow-x-auto border-y border-border py-2">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-4 font-semibold">Included</th>
                {ADVERTISING_TIERS.map((tier) => <th key={tier.id} className="px-3 py-4 font-display text-xl">{tier.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {ADVERTISING_COMPARISON_ROWS.map(([label, local, growth, premier]) => <tr key={label} className="border-b border-border/70 last:border-0">
                <th className="px-3 py-4 font-semibold">{label}</th>
                <td className="px-3 py-4 text-muted-foreground">{local}</td>
                <td className="px-3 py-4 text-muted-foreground">{growth}</td>
                <td className="px-3 py-4 text-muted-foreground">{premier}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-6 text-muted-foreground">Sponsored social support is subject to campaign fit, platform eligibility and mutually approved creative. Category exclusivity is not automatic and is quoted only when inventory permits.</p>
      </section>

      <section className="border-y border-border py-12" aria-labelledby="one-time-heading">
        <p className="eyebrow text-primary">One-time & custom campaigns</p>
        <h2 id="one-time-heading" className="mt-2 font-display text-4xl">Not every campaign needs a subscription</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {ONE_TIME_ADVERTISING_OPTIONS.map((option) => <article key={option.name} className="border-t-2 border-foreground pt-5">
            <div className="flex flex-wrap items-baseline justify-between gap-3"><h3 className="font-display text-2xl">{option.name}</h3><p className="font-semibold text-primary">{option.price}</p></div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{option.detail}</p>
          </article>)}
        </div>
      </section>

      <section className="grid gap-10 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16" aria-labelledby="billing-heading">
        <div>
          <p className="eyebrow text-primary">Professional billing</p>
          <h2 id="billing-heading" className="mt-2 font-display text-4xl">Pay by card, ACH or approved invoice</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">We use Stripe for secure payment collection and invoicing. New advertisers are prepaid by default; established companies, agencies, tourism organizations and other approved accounts can request invoice terms.</p>
          <a href="/partner-with-us/billing" className="mt-5 inline-block border-b border-primary text-sm font-semibold text-primary">Read billing policies and invoice options →</a>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {ADVERTISING_PAYMENT_METHODS.map((method) => <article key={method.name} className="border-t border-border pt-4"><h3 className="font-display text-2xl">{method.name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{method.detail}</p></article>)}
        </div>
      </section>

      <section className="border-y border-border py-12" aria-labelledby="policy-heading">
        <div className="grid gap-8 lg:grid-cols-2">
          <div><p className="eyebrow text-primary">Straightforward terms</p><h2 id="policy-heading" className="mt-2 font-display text-4xl">Know the commercial rules before you commit</h2></div>
          <div className="space-y-4 text-sm leading-7 text-muted-foreground">
            <p><strong className="text-foreground">Monthly:</strong> {ADVERTISING_BILLING_POLICY.monthly}</p>
            <p><strong className="text-foreground">Annual:</strong> {ADVERTISING_BILLING_POLICY.annual}</p>
            <p><strong className="text-foreground">Invoices:</strong> {ADVERTISING_BILLING_POLICY.invoice}</p>
            <p><strong className="text-foreground">Performance:</strong> {ADVERTISING_BILLING_POLICY.noGuarantee}</p>
            <div className="flex flex-wrap gap-4 pt-2"><a href="/partner-with-us/terms" className="border-b border-primary font-semibold text-primary">Full advertising terms</a><a href="/partner-with-us/contract/local" className="border-b border-primary font-semibold text-primary">Review sample agreement</a></div>
          </div>
        </div>
      </section>

      <section id="inquiry" className="scroll-mt-28 py-12" aria-labelledby="partnership-form-heading">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow text-primary">Start a conversation</p>
            <h2 id="partnership-form-heading" className="mt-3 font-display text-4xl">Tell us what you want to accomplish</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Submitting an inquiry does not create a contract or charge your card. Texas Defined reviews fit and inventory first, then confirms the package, agreement and payment path.</p>
            {selectedTier ? <div className="mt-6 border-l-2 border-primary pl-4"><p className="text-sm font-semibold">Selected: {selectedTier.name}</p><p className="mt-1 text-sm text-muted-foreground">{formatAdvertisingPrice(advertisingPrice(selectedTier, search.billing ?? cadence))} {search.billing === 'annual' || (!search.billing && cadence === 'annual') ? 'per year' : 'per month'}</p></div> : null}
            <div className="mt-8 border-t border-border pt-5 text-sm leading-7 text-muted-foreground"><p>Questions before submitting? Business correspondence can be sent to <a className="border-b border-primary text-primary" href="mailto:admin@texasdefined.com">admin@texasdefined.com</a>.</p></div>
          </div>

          <div>
            {search.partnershipType === 'sports-travel' ? <p className="mb-5 border-l-2 border-primary pl-4 text-sm leading-6 text-muted-foreground">Sports-travel partnership is preselected because you arrived from a Texas Defined sports venue resource.</p> : null}
            {search.partnershipType === 'brand-retail' ? <p className="mb-5 border-l-2 border-primary pl-4 text-sm leading-6 text-muted-foreground">Texas brand / grocery / retail is preselected because you arrived from the Texas Brands directory. Inclusion and editorial treatment are not for sale.</p> : null}
            {status === 'sent' ? <div className="mb-7 border-y border-border py-6" role="status"><p className="font-semibold">Inquiry received.</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Thank you. Texas Defined can review the details you submitted and follow up using the email address provided.</p></div> : null}

            <form onSubmit={submit} className="grid gap-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" name="contactName" autoComplete="name" required />
                <Field label="Work email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Company or organization" name="company" autoComplete="organization" required />
                <Field label="Website" name="website" type="url" autoComplete="url" placeholder="https://" />
              </div>
              <label className="grid gap-2 text-sm font-semibold" htmlFor="partnershipType">Partnership type
                <select key={search.partnershipType ?? (selectedTier ? 'sponsorship' : 'other')} id="partnershipType" name="partnershipType" className="min-h-11 border border-border bg-background px-3 py-2 font-normal text-foreground" defaultValue={search.partnershipType ?? (selectedTier ? 'sponsorship' : 'other')} required>
                  {partnershipOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold" htmlFor="message">What would you like to explore?
                <textarea id="message" name="message" minLength={20} maxLength={4800} rows={7} required className="border border-border bg-background px-3 py-3 font-normal text-foreground" placeholder="Tell us what you offer, the Texas audience you serve, the markets or topics you want to reach and the campaign timing you have in mind." />
              </label>
              <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="addressLine2">Address line 2</label><input id="addressLine2" name="addressLine2" tabIndex={-1} autoComplete="off" />
              </div>
              {status === 'error' ? <p className="text-sm font-semibold text-destructive" role="alert">{errorMessage}</p> : null}
              <button type="submit" disabled={status === 'sending'} className="min-h-11 justify-self-start border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">
                {status === 'sending' ? 'Submitting…' : 'Submit partnership inquiry'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Container>
  </>;
}

function PlanCard({ tier, cadence }: { tier: AdvertisingTier; cadence: AdvertisingBillingCadence }) {
  const price = advertisingPrice(tier, cadence);
  const annualSavings = tier.monthlyCents * 12 - tier.annualCents;
  return <article className={`flex h-full flex-col border p-6 ${tier.id === 'growth' ? 'border-primary' : 'border-border'}`}>
    <p className="eyebrow text-primary">{tier.id === 'growth' ? 'Most flexible' : 'Texas Defined partner'}</p>
    <h3 className="mt-2 font-display text-3xl">{tier.name}</h3>
    <p className="mt-3 text-sm leading-6 text-muted-foreground">{tier.tagline}</p>
    <div className="mt-6 border-y border-border py-5">
      <p className="font-display text-4xl">{formatAdvertisingPrice(price)}</p>
      <p className="mt-1 text-xs text-muted-foreground">{cadence === 'annual' ? `per year · save ${formatAdvertisingPrice(annualSavings)}` : 'per month · 3-month initial commitment'}</p>
    </div>
    <p className="mt-5 text-sm leading-6"><strong>Best for:</strong> <span className="text-muted-foreground">{tier.bestFor}</span></p>
    <ul className="mt-5 flex-1 space-y-3 text-sm leading-6 text-muted-foreground">
      {tier.bullets.map((bullet) => <li key={bullet} className="flex gap-3"><span aria-hidden="true" className="font-bold text-primary">✓</span><span>{bullet}</span></li>)}
    </ul>
    <div className="mt-7 grid gap-3">
      <a href={`/partner-with-us?tier=${tier.id}&billing=${cadence}#inquiry`} className="bg-foreground px-4 py-3 text-center text-sm font-semibold text-background">Request {tier.name}</a>
      <a href={`/partner-with-us/contract/${tier.id}`} className="text-center text-sm font-semibold text-primary underline underline-offset-4">Review agreement</a>
    </div>
  </article>;
}

function Field({ label, name, type = 'text', autoComplete, placeholder, required = false }: { label: string; name: string; type?: string; autoComplete?: string; placeholder?: string; required?: boolean }) {
  return <label className="grid gap-2 text-sm font-semibold" htmlFor={name}>{label}<input id={name} name={name} type={type} autoComplete={autoComplete} placeholder={placeholder} required={required} className="min-h-11 border border-border bg-background px-3 py-2 font-normal text-foreground" /></label>;
}
