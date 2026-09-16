import { type FormEvent, useMemo, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import { submitAdvertiserAgreement } from '@/data/advertiser-agreement.functions';
import {
  ADVERTISING_AGREEMENT_VERSION,
  advertiserAgreementSnapshot,
  advertiserPriceLabel,
  agreementClauses,
  getAdvertiserTier,
  type AdvertiserBillingCycle,
  type AdvertiserTierId,
} from '@/data/advertising-program';

export const Route = createLazyFileRoute('/partner-with-us/agreement')({ component: AdvertiserAgreementPage });

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error';

function AdvertiserAgreementPage() {
  const search = Route.useSearch();
  const [tier, setTier] = useState<AdvertiserTierId>(search.tier ?? 'growth');
  const [billing, setBilling] = useState<AdvertiserBillingCycle>(search.billing ?? 'monthly');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const selectedTier = useMemo(() => getAdvertiserTier(tier), [tier]);
  const snapshot = useMemo(() => advertiserAgreementSnapshot(tier, billing), [tier, billing]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    const form = new FormData(event.currentTarget);
    try {
      await submitAdvertiserAgreement({ data: {
        tier,
        billingCycle: billing,
        legalName: String(form.get('legalName') || ''),
        businessName: String(form.get('businessName') || ''),
        signerName: String(form.get('signerName') || ''),
        signerTitle: String(form.get('signerTitle') || ''),
        signerEmail: String(form.get('signerEmail') || ''),
        billingEmail: String(form.get('billingEmail') || ''),
        billingAddress: String(form.get('billingAddress') || ''),
        companyWebsite: String(form.get('companyWebsite') || ''),
        requestedStart: String(form.get('requestedStart') || ''),
        campaignNotes: String(form.get('campaignNotes') || ''),
        typedSignature: String(form.get('typedSignature') || ''),
        authorityConfirmed: form.get('authorityConfirmed') === 'on',
        esignConsent: form.get('esignConsent') === 'on',
        agreementVersion: ADVERTISING_AGREEMENT_VERSION,
        sourcePath: '/partner-with-us/agreement',
        addressLine2: String(form.get('addressLine2') || ''),
      } });
      setStatus('sent');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Agreement acceptance could not be submitted.');
      setStatus('error');
    }
  }

  return <main>
    <Container className="py-12 sm:py-16">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div><p className="eyebrow text-primary">Approved advertiser workflow</p><h1 className="mt-3 max-w-4xl font-display text-4xl">Review and electronically accept the Texas Defined advertiser agreement.</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Agreement version {ADVERTISING_AGREEMENT_VERSION}. Submission records the selected package, price, signer identity, acceptance timestamp and an immutable fingerprint of the exact agreement snapshot. Texas Defined must still approve the advertiser and billing before activation.</p></div>
        <button type="button" onClick={() => window.print()} className="border border-border px-4 py-2 text-sm font-semibold">Print / save agreement</button>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
        <section>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold" htmlFor="tier">Package<select id="tier" value={tier} onChange={(event) => setTier(event.target.value as AdvertiserTierId)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal"><option value="local">Local Partner</option><option value="growth">Growth Partner</option><option value="premier">Premier Partner</option><option value="custom">Custom / Integrated</option></select></label>
            <label className="grid gap-2 text-sm font-semibold" htmlFor="billing">Billing<select id="billing" value={billing} onChange={(event) => setBilling(event.target.value as AdvertiserBillingCycle)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal"><option value="monthly">Monthly</option><option value="annual">Annual</option></select></label>
          </div>
          <div className="mt-6 border-y border-border py-5"><div className="flex flex-wrap items-baseline justify-between gap-3"><h2 className="font-display text-3xl">{selectedTier.name}</h2><p className="font-bold text-primary">{advertiserPriceLabel(selectedTier, billing)}</p></div><p className="mt-2 text-sm leading-6 text-muted-foreground">{selectedTier.commitment}</p><ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">{selectedTier.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul></div>
          <div className="mt-7 space-y-3">{agreementClauses.map((clause, index) => <details key={clause.heading} open={index < 3} className="border-b border-border pb-3"><summary className="cursor-pointer py-2 font-semibold">{clause.heading}</summary><p className="pb-2 text-sm leading-7 text-muted-foreground">{clause.body}</p></details>)}</div>
          <details className="mt-6 border border-border p-4"><summary className="cursor-pointer font-semibold">Exact agreement snapshot</summary><pre className="mt-4 whitespace-pre-wrap text-xs leading-6 text-muted-foreground">{snapshot}</pre></details>
        </section>

        <section>
          <h2 className="font-display text-3xl">Electronic acceptance</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Use this form only after Texas Defined has approved the advertiser to proceed. The typed signature must match the authorized signer name.</p>
          {status === 'sent' ? <div className="mt-6 border-y border-border py-6" role="status"><p className="font-semibold">Agreement acceptance recorded.</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Print or save this page for your records. Texas Defined will complete publisher review and then provide the approved Stripe payment, subscription or invoice step.</p></div> : null}
          <form onSubmit={submit} className="mt-7 grid gap-5" noValidate>
            <Field label="Advertiser legal name" name="legalName" autoComplete="organization" required />
            <Field label="Business / trade name" name="businessName" autoComplete="organization" required />
            <div className="grid gap-5 sm:grid-cols-2"><Field label="Authorized signer" name="signerName" autoComplete="name" required /><Field label="Signer title" name="signerTitle" autoComplete="organization-title" required /></div>
            <Field label="Signer email" name="signerEmail" type="email" autoComplete="email" required />
            <Field label="Billing email" name="billingEmail" type="email" autoComplete="email" required />
            <label className="grid gap-2 text-sm font-semibold" htmlFor="billingAddress">Billing / notice address<textarea id="billingAddress" name="billingAddress" rows={3} minLength={10} maxLength={500} required className="border border-border bg-background px-3 py-3 font-normal" /></label>
            <Field label="Company website" name="companyWebsite" type="url" autoComplete="url" placeholder="https://" />
            <Field label="Requested campaign start" name="requestedStart" type="date" />
            <label className="grid gap-2 text-sm font-semibold" htmlFor="campaignNotes">Order details / campaign notes<textarea id="campaignNotes" name="campaignNotes" rows={4} maxLength={2500} className="border border-border bg-background px-3 py-3 font-normal" placeholder="Markets, placement requests, PO/reference, destination URL or approved custom scope." /></label>
            <Field label="Type your full legal name as your electronic signature" name="typedSignature" autoComplete="name" required />
            <label className="flex gap-3 text-sm leading-6 text-muted-foreground"><input type="checkbox" name="authorityConfirmed" required className="mt-1 h-4 w-4" /><span>I confirm I am authorized to sign for the advertiser named above.</span></label>
            <label className="flex gap-3 text-sm leading-6 text-muted-foreground"><input type="checkbox" name="esignConsent" required className="mt-1 h-4 w-4" /><span>I accept the agreement and intend my typed name and submission to serve as my electronic signature and consent to electronic records.</span></label>
            <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor="addressLine2">Address line 2</label><input id="addressLine2" name="addressLine2" tabIndex={-1} autoComplete="off" /></div>
            {status === 'error' ? <p role="alert" className="text-sm font-semibold text-destructive">{errorMessage}</p> : null}
            <button type="submit" disabled={status === 'sending'} className="min-h-11 justify-self-start border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{status === 'sending' ? 'Recording acceptance…' : 'Accept & sign electronically'}</button>
          </form>
        </section>
      </div>
    </Container>
  </main>;
}

function Field({ label, name, type = 'text', autoComplete, placeholder, required = false }: { label: string; name: string; type?: string; autoComplete?: string; placeholder?: string; required?: boolean }) {
  return <label className="grid gap-2 text-sm font-semibold" htmlFor={name}>{label}<input id={name} name={name} type={type} autoComplete={autoComplete} placeholder={placeholder} required={required} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" /></label>;
}
