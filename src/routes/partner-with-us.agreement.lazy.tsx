import { type FormEvent, useEffect, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import { loadAdvertiserAgreement, submitAdvertiserAgreement } from '@/data/advertiser-agreement.functions';
import { getAdvertiserTier, type AdvertiserBillingCycle, type AdvertiserTierId } from '@/data/advertising-program';

export const Route = createLazyFileRoute('/partner-with-us/agreement')({ component: AdvertiserAgreementPage });

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error';
type LoadStatus = 'idle' | 'loading' | 'ready' | 'error';
type AgreementOffer = {
  legalName: string;
  businessName: string;
  contactEmail: string;
  billingEmail: string;
  billingAddress: string;
  companyWebsite: string | null;
  tier: AdvertiserTierId;
  billingCycle: AdvertiserBillingCycle;
  publishedPriceCents: number | null;
  campaignStartDate: string | null;
  campaignEndDate: string | null;
  negotiatedAdditions: string | null;
  paymentTerms: string;
  expiresAt: string;
  agreementVersion: string;
  agreementSnapshot: string;
};

function money(cents: number | null) {
  if (cents == null) return 'Custom quote';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

function AdvertiserAgreementPage() {
  const search = Route.useSearch();
  const token = search.token ?? '';
  const [offer, setOffer] = useState<AgreementOffer | null>(null);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>(token ? 'loading' : 'idle');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let cancelled = false;
    if (!token) {
      setOffer(null);
      setLoadStatus('idle');
      return () => { cancelled = true; };
    }
    setLoadStatus('loading');
    setErrorMessage('');
    loadAdvertiserAgreement({ data: { token } })
      .then((result) => {
        if (cancelled) return;
        setOffer(result as AgreementOffer);
        setLoadStatus('ready');
      })
      .catch((error) => {
        if (cancelled) return;
        setOffer(null);
        setLoadStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Agreement link could not be verified.');
      });
    return () => { cancelled = true; };
  }, [token]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || !offer) return;
    setStatus('sending');
    setErrorMessage('');
    const form = new FormData(event.currentTarget);
    try {
      await submitAdvertiserAgreement({ data: {
        token,
        signerName: String(form.get('signerName') || ''),
        signerTitle: String(form.get('signerTitle') || ''),
        signerEmail: String(form.get('signerEmail') || ''),
        typedSignature: String(form.get('typedSignature') || ''),
        authorityConfirmed: form.get('authorityConfirmed') === 'on',
        esignConsent: form.get('esignConsent') === 'on',
        addressLine2: String(form.get('addressLine2') || ''),
      } });
      setStatus('sent');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Agreement acceptance could not be submitted.');
      setStatus('error');
    }
  }

  const selectedTier = offer ? getAdvertiserTier(offer.tier) : null;

  return <main>
    <Container className="py-12 sm:py-16">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div><p className="eyebrow text-primary">Approved advertiser workflow</p><h1 className="mt-3 max-w-4xl font-display text-4xl">Review and electronically accept the Texas Defined advertiser agreement.</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Electronic acceptance is available only through an active private link issued after Texas Defined review. The signed record captures the approved order terms, signer identity, acceptance timestamp, agreement version and immutable agreement snapshot.</p></div>
        <button type="button" onClick={() => window.print()} className="border border-border px-4 py-2 text-sm font-semibold">Print / save agreement</button>
      </div>

      {!token ? <div className="mt-10 border-y border-border py-8"><h2 className="font-display text-3xl">Private agreement link required</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">This page does not provide a public self-signing form. Approved advertisers receive a unique, expiring agreement link from Texas Defined.</p></div> : null}
      {loadStatus === 'loading' ? <p className="mt-10 text-sm text-muted-foreground" role="status">Verifying private agreement link…</p> : null}
      {loadStatus === 'error' ? <div className="mt-10 border-y border-border py-8" role="alert"><h2 className="font-display text-3xl">Agreement link unavailable</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{errorMessage}</p></div> : null}

      {offer && selectedTier && status !== 'sent' ? <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <section>
          <p className="eyebrow text-primary">Approved order</p><h2 className="mt-3 font-display text-3xl">{offer.businessName}</h2>
          <dl className="mt-6 grid gap-4 border-y border-border py-5 text-sm sm:grid-cols-2">
            <Detail label="Legal advertiser" value={offer.legalName} />
            <Detail label="Package" value={selectedTier.name} />
            <Detail label="Billing" value={offer.billingCycle === 'annual' ? 'Annual prepaid' : 'Monthly in advance'} />
            <Detail label="Approved price" value={money(offer.publishedPriceCents)} />
            <Detail label="Campaign start" value={offer.campaignStartDate || 'Scheduled after payment/assets'} />
            <Detail label="Campaign end" value={offer.campaignEndDate || 'Per package term/order'} />
            <Detail label="Billing email" value={offer.billingEmail} />
            <Detail label="Agreement version" value={offer.agreementVersion} />
          </dl>
          <div className="mt-6"><h3 className="font-semibold">Payment terms</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{offer.paymentTerms}</p></div>
          <div className="mt-6"><h3 className="font-semibold">Negotiated additions</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{offer.negotiatedAdditions || 'None.'}</p></div>
          <details className="mt-7 border border-border p-4" open><summary className="cursor-pointer font-semibold">Full agreement and approved order snapshot</summary><pre className="mt-4 whitespace-pre-wrap text-xs leading-6 text-muted-foreground">{offer.agreementSnapshot}</pre></details>
          <p className="mt-4 text-xs leading-6 text-muted-foreground">This link expires {new Date(offer.expiresAt).toLocaleString()}. A replacement link invalidates prior active links for this inquiry.</p>
        </section>

        <section>
          <h2 className="font-display text-3xl">Electronic acceptance</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">By submitting, the authorized signer accepts the exact agreement and approved order snapshot shown on this page. Package, price and negotiated terms cannot be changed from this signing form.</p>
          <form onSubmit={submit} className="mt-7 grid gap-5" noValidate>
            <Field label="Authorized signer full legal name" name="signerName" autoComplete="name" required />
            <Field label="Signer title" name="signerTitle" autoComplete="organization-title" required />
            <Field label="Signer email" name="signerEmail" type="email" autoComplete="email" defaultValue={offer.contactEmail} required />
            <Field label="Type your full legal name as your electronic signature" name="typedSignature" autoComplete="name" required />
            <label className="flex gap-3 text-sm leading-6 text-muted-foreground"><input type="checkbox" name="authorityConfirmed" required className="mt-1 h-4 w-4" /><span>I confirm I am authorized to bind {offer.legalName} to this agreement.</span></label>
            <label className="flex gap-3 text-sm leading-6 text-muted-foreground"><input type="checkbox" name="esignConsent" required className="mt-1 h-4 w-4" /><span>I agree to use an electronic signature and electronic records and intend my typed name and submission to serve as my signature.</span></label>
            <div className="sr-only" aria-hidden="true"><label htmlFor="addressLine2">Address line 2</label><input id="addressLine2" name="addressLine2" tabIndex={-1} autoComplete="off" /></div>
            {status === 'error' ? <p role="alert" className="text-sm font-semibold text-destructive">{errorMessage}</p> : null}
            <button type="submit" disabled={status === 'sending'} className="min-h-11 justify-self-start border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{status === 'sending' ? 'Recording acceptance…' : 'Accept & sign electronically'}</button>
          </form>
        </section>
      </div> : null}

      {status === 'sent' ? <div className="mt-10 border-y border-border py-8" role="status"><h2 className="font-display text-3xl">Agreement acceptance recorded.</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">This one-time signing link has been consumed. Texas Defined will complete publisher review and provide the approved Stripe payment, subscription or invoice step before campaign activation.</p></div> : null}
    </Container>
  </main>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</dt><dd className="mt-1 font-medium text-foreground">{value}</dd></div>;
}

function Field({ label, name, type = 'text', autoComplete, defaultValue, required = false }: { label: string; name: string; type?: string; autoComplete?: string; defaultValue?: string; required?: boolean }) {
  return <label className="grid gap-2 text-sm font-semibold" htmlFor={name}>{label}<input id={name} name={name} type={type} autoComplete={autoComplete} defaultValue={defaultValue} required={required} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" /></label>;
}
