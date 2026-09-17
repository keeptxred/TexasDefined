import { createLazyFileRoute } from '@tanstack/react-router';
import { type FormEvent, useEffect, useMemo, useState } from 'react';

import { Container } from '@/components/layout/Container';
import {
  getAdvertiserOperationsDashboard,
  updateAdvertiserOperations,
  updateAdvertiserPublisherDecision,
} from '@/data/advertiser-operations.functions';
import type {
  AdvertiserAgreementStatus,
  AdvertiserDisclosureStatus,
  AdvertiserInvoiceStatus,
  AdvertiserOperationsDashboard,
  AdvertiserOperationsRecord,
  AdvertiserPaymentStatus,
} from '@/data/advertiser-operations.types';

const SESSION_KEY = 'texasdefined:sports-partner-admin-key';
const paymentStatuses: AdvertiserPaymentStatus[] = ['not_started', 'pending', 'paid', 'past_due', 'waived', 'refunded', 'failed'];
const invoiceStatuses: AdvertiserInvoiceStatus[] = ['not_created', 'draft', 'open', 'paid', 'void', 'uncollectible'];
const disclosureStatuses: AdvertiserDisclosureStatus[] = ['pending', 'approved', 'live', 'not_applicable'];

export const Route = createLazyFileRoute('/admin/advertisers')({ component: AdvertiserOperationsPage });

function AdvertiserOperationsPage() {
  const [accessKey, setAccessKey] = useState('');
  const [publisherName, setPublisherName] = useState('');
  const [dashboard, setDashboard] = useState<AdvertiserOperationsDashboard | null>(null);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function refresh(key: string) {
    const result = await getAdvertiserOperationsDashboard({ data: { accessKey: key } });
    setDashboard(result);
    return result;
  }

  async function unlock(key: string) {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await refresh(key);
      sessionStorage.setItem(SESSION_KEY, key);
    } catch (cause) {
      console.error('Advertiser operations access failed', cause);
      setDashboard(null);
      sessionStorage.removeItem(SESSION_KEY);
      setError('Access denied or advertiser operations are temporarily unavailable.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const storedKey = sessionStorage.getItem(SESSION_KEY);
    if (!storedKey) return;
    setAccessKey(storedKey);
    void unlock(storedKey);
  }, []);

  function currentKey() {
    return sessionStorage.getItem(SESSION_KEY) || accessKey.trim();
  }

  async function runAction(id: string, action: (key: string) => Promise<unknown>, message: string) {
    const key = currentKey();
    setBusyId(id);
    setError('');
    setSuccess('');
    try {
      await action(key);
      await refresh(key);
      setSuccess(message);
    } catch (cause) {
      console.error('Advertiser operation failed', cause);
      setError(cause instanceof Error ? cause.message : 'The advertiser operation could not be completed.');
    } finally {
      setBusyId(null);
    }
  }

  async function submitUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (accessKey.trim()) await unlock(accessKey.trim());
  }

  async function decide(agreementId: string, decision: 'accepted' | 'declined' | 'void') {
    await runAction(agreementId, (key) => updateAdvertiserPublisherDecision({ data: {
      accessKey: key,
      agreementId,
      decision,
      publisherName,
    } }), decision === 'accepted' ? 'Agreement accepted by Texas Defined.' : decision === 'declined' ? 'Agreement declined.' : 'Agreement voided.');
  }

  async function saveOperations(event: FormEvent<HTMLFormElement>, agreementId: string) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await runAction(agreementId, (key) => updateAdvertiserOperations({ data: {
      accessKey: key,
      agreementId,
      paymentStatus: String(data.get('paymentStatus')) as AdvertiserPaymentStatus,
      invoiceStatus: String(data.get('invoiceStatus')) as AdvertiserInvoiceStatus,
      campaignStartDate: String(data.get('campaignStartDate') || ''),
      campaignEndDate: String(data.get('campaignEndDate') || ''),
      destinationUrl: String(data.get('destinationUrl') || ''),
      assets: toLines(data.get('assets')),
      placementLocations: toLines(data.get('placementLocations')),
      disclosureStatus: String(data.get('disclosureStatus')) as AdvertiserDisclosureStatus,
      internalNotes: String(data.get('internalNotes') || ''),
      stripeCustomerId: String(data.get('stripeCustomerId') || ''),
      stripeInvoiceId: String(data.get('stripeInvoiceId') || ''),
      stripeSubscriptionId: String(data.get('stripeSubscriptionId') || ''),
    } }), 'Advertiser billing, assets and campaign operations were updated.');
  }

  function lock() {
    sessionStorage.removeItem(SESSION_KEY);
    setAccessKey('');
    setPublisherName('');
    setDashboard(null);
    setError('');
    setSuccess('');
  }

  return <Container className="py-12 sm:py-16">
    <main className="mx-auto max-w-7xl">
      <header className="border-b border-border pb-8">
        <p className="eyebrow text-primary">TexasDefined Operations</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1 className="font-display text-4xl sm:text-6xl">Advertiser Operations</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Review signed advertiser agreements, record Texas Defined acceptance, track Stripe billing state, collect asset references, schedule campaign dates and document approved placement locations. Signed agreement identity, pricing, signature and snapshot fields remain immutable.</p>
          </div>
          {dashboard ? <button type="button" onClick={lock} className="min-h-11 border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">Lock advertiser console</button> : null}
        </div>
      </header>

      {!dashboard ? <section className="mt-10 max-w-xl border-y border-border py-8" aria-labelledby="advertiser-unlock-heading">
        <p className="eyebrow text-primary">Protected advertiser data</p>
        <h2 id="advertiser-unlock-heading" className="mt-2 font-display text-3xl">Unlock advertiser operations</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">Agreement names, emails, billing records and campaign operations are not loaded with this page. Enter the existing Texas Defined commercial-operations admin key to request them from the server. The key is kept only for this browser session.</p>
        <form onSubmit={submitUnlock} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold" htmlFor="advertiserOperationsAccessKey">Admin access key
            <input id="advertiserOperationsAccessKey" type="password" autoComplete="current-password" value={accessKey} onChange={(event) => setAccessKey(event.target.value)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" required minLength={20} maxLength={200} />
          </label>
          <button type="submit" disabled={loading} className="min-h-11 justify-self-start bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{loading ? 'Unlocking…' : 'Unlock advertiser console'}</button>
        </form>
        {error ? <p className="mt-4 text-sm font-semibold text-destructive" role="alert">{error}</p> : null}
      </section> : <AdvertiserDashboard
        dashboard={dashboard}
        publisherName={publisherName}
        setPublisherName={setPublisherName}
        busyId={busyId}
        error={error}
        success={success}
        onDecision={decide}
        onSave={saveOperations}
      />}
    </main>
  </Container>;
}

function AdvertiserDashboard({ dashboard, publisherName, setPublisherName, busyId, error, success, onDecision, onSave }: {
  dashboard: AdvertiserOperationsDashboard;
  publisherName: string;
  setPublisherName: (value: string) => void;
  busyId: string | null;
  error: string;
  success: string;
  onDecision: (agreementId: string, decision: 'accepted' | 'declined' | 'void') => Promise<void>;
  onSave: (event: FormEvent<HTMLFormElement>, agreementId: string) => Promise<void>;
}) {
  const metrics = useMemo(() => ({
    total: dashboard.agreements.length,
    pending: dashboard.agreements.filter((record) => record.status === 'pending_publisher_acceptance').length,
    accepted: dashboard.agreements.filter((record) => record.status === 'accepted').length,
    paid: dashboard.agreements.filter((record) => record.paymentStatus === 'paid').length,
    live: dashboard.agreements.filter((record) => record.disclosureStatus === 'live').length,
  }), [dashboard.agreements]);

  return <>
    <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <Metric label="Agreements" value={metrics.total} />
      <Metric label="Pending acceptance" value={metrics.pending} />
      <Metric label="Accepted" value={metrics.accepted} />
      <Metric label="Paid" value={metrics.paid} />
      <Metric label="Live campaigns" value={metrics.live} />
    </section>

    <section className="mt-8 max-w-xl border-y border-border py-5">
      <label className="grid gap-2 text-sm font-semibold" htmlFor="publisherName">Publisher operator name
        <input id="publisherName" value={publisherName} onChange={(event) => setPublisherName(event.target.value)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" maxLength={120} placeholder="Required when accepting an agreement" />
      </label>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">Recorded only when Texas Defined accepts a pending advertiser agreement.</p>
    </section>

    {dashboard.truncated ? <p className="mt-5 border-l-2 border-primary pl-4 text-sm text-muted-foreground">Showing the latest {dashboard.limit} agreements. Older records remain in Supabase.</p> : null}
    {error ? <p className="mt-5 text-sm font-semibold text-destructive" role="alert">{error}</p> : null}
    {success ? <p className="mt-5 border-l-2 border-primary pl-4 text-sm font-semibold text-foreground" role="status">{success}</p> : null}

    <section className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
        <div><p className="eyebrow text-primary">Agreement queue</p><h2 className="mt-2 font-display text-4xl">Advertiser records</h2></div>
        <p className="text-xs text-muted-foreground">Generated {formatDateTime(dashboard.generatedAt)}</p>
      </div>

      {dashboard.agreements.length ? dashboard.agreements.map((record) => <AgreementCard
        key={record.id}
        record={record}
        busy={busyId === record.id}
        onDecision={onDecision}
        onSave={onSave}
      />) : <p className="py-10 text-sm text-muted-foreground">No advertiser agreements have been submitted yet.</p>}
    </section>
  </>;
}

function AgreementCard({ record, busy, onDecision, onSave }: {
  record: AdvertiserOperationsRecord;
  busy: boolean;
  onDecision: (agreementId: string, decision: 'accepted' | 'declined' | 'void') => Promise<void>;
  onSave: (event: FormEvent<HTMLFormElement>, agreementId: string) => Promise<void>;
}) {
  const formKey = [record.id, record.paymentStatus, record.invoiceStatus, record.disclosureStatus, record.campaignStartDate, record.campaignEndDate, record.destinationUrl, record.assets.join('|'), record.placementLocations.join('|')].join(':');

  return <article className="border-b border-border py-8">
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="eyebrow text-primary">{tierLabel(record.tier)} · {record.billingCycle}</p>
            <h3 className="mt-2 font-display text-3xl">{record.businessName}</h3>
            <p className="mt-2 text-sm font-semibold">{priceLabel(record.publishedPriceCents, record.billingCycle)}</p>
          </div>
          <span className="border border-border px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em]">{statusLabel(record.status)}</span>
        </div>

        <dl className="mt-6 space-y-3 text-sm leading-6">
          <Detail label="Legal name" value={record.legalName} />
          <Detail label="Signer" value={`${record.signerName}, ${record.signerTitle}`} />
          <Detail label="Signer email" value={record.signerEmail} />
          <Detail label="Billing email" value={record.billingEmail} />
          <Detail label="Signer accepted" value={formatDateTime(record.signerAcceptedAt)} />
          <Detail label="Agreement" value={`${record.agreementVersion} · SHA-256 ${record.agreementSnapshotSha256.slice(0, 12)}…`} />
          {record.publisherAcceptedAt ? <Detail label="Publisher accepted" value={`${formatDateTime(record.publisherAcceptedAt)}${record.publisherAcceptedBy ? ` by ${record.publisherAcceptedBy}` : ''}`} /> : null}
          {record.companyWebsite ? <div><dt className="font-semibold">Company website</dt><dd><a href={record.companyWebsite} target="_blank" rel="noreferrer" className="text-primary hover:underline">{record.companyWebsite} ↗</a></dd></div> : null}
          {record.requestedStart ? <Detail label="Requested start" value={record.requestedStart} /> : null}
          {record.campaignNotes ? <Detail label="Signer campaign notes" value={record.campaignNotes} /> : null}
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
          {record.status === 'pending_publisher_acceptance' ? <>
            <button type="button" disabled={busy} onClick={() => void onDecision(record.id, 'accepted')} className="min-h-11 border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60">Accept agreement</button>
            <button type="button" disabled={busy} onClick={() => void onDecision(record.id, 'declined')} className="min-h-11 border border-border px-4 py-2 text-sm font-semibold disabled:opacity-60">Decline</button>
          </> : null}
          {record.status !== 'void' ? <button type="button" disabled={busy} onClick={() => void onDecision(record.id, 'void')} className="min-h-11 border border-border px-4 py-2 text-sm font-semibold text-muted-foreground disabled:opacity-60">Void record</button> : null}
        </div>
      </div>

      <form key={formKey} onSubmit={(event) => onSave(event, record.id)} className="grid gap-5" aria-label={`Operations for ${record.businessName}`}>
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField name="paymentStatus" label="Payment status" defaultValue={record.paymentStatus} values={paymentStatuses} />
          <SelectField name="invoiceStatus" label="Invoice status" defaultValue={record.invoiceStatus} values={invoiceStatuses} />
          <Field name="campaignStartDate" label="Campaign start" type="date" defaultValue={record.campaignStartDate ?? ''} />
          <Field name="campaignEndDate" label="Campaign end" type="date" defaultValue={record.campaignEndDate ?? ''} />
        </div>
        <Field name="destinationUrl" label="Advertiser destination URL" type="url" defaultValue={record.destinationUrl ?? ''} placeholder="https://" />
        <div className="grid gap-5 sm:grid-cols-3">
          <Field name="stripeCustomerId" label="Stripe customer ID" defaultValue={record.stripeCustomerId ?? ''} placeholder="cus_…" />
          <Field name="stripeInvoiceId" label="Stripe invoice ID" defaultValue={record.stripeInvoiceId ?? ''} placeholder="in_…" />
          <Field name="stripeSubscriptionId" label="Stripe subscription ID" defaultValue={record.stripeSubscriptionId ?? ''} placeholder="sub_…" />
        </div>
        <label className="grid gap-2 text-sm font-semibold">Asset references, one per line
          <textarea name="assets" rows={4} defaultValue={record.assets.join('\n')} className="border border-border bg-background px-3 py-2 font-normal" placeholder="Logo URL, creative file reference, approved image URL…" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">Approved placement locations, one per line
          <textarea name="placementLocations" rows={4} defaultValue={record.placementLocations.join('\n')} className="border border-border bg-background px-3 py-2 font-normal" placeholder="/moving-to-texas, /sports-venue/…, event series…" />
        </label>
        <SelectField name="disclosureStatus" label="Disclosure / launch status" defaultValue={record.disclosureStatus} values={disclosureStatuses} />
        <label className="grid gap-2 text-sm font-semibold">Internal campaign notes
          <textarea name="internalNotes" rows={5} maxLength={5000} defaultValue={record.internalNotes ?? ''} className="border border-border bg-background px-3 py-2 font-normal" placeholder="Billing exceptions, asset status, launch dependencies, make-goods or fulfillment notes." />
        </label>
        <p className="text-xs leading-5 text-muted-foreground">Never store card numbers, bank-account numbers or other raw payment credentials here. Stripe IDs and operational references only.</p>
        <button type="submit" disabled={busy} className="min-h-11 justify-self-start bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{busy ? 'Saving…' : 'Save advertiser operations'}</button>
      </form>
    </div>
  </article>;
}

function Metric({ label, value }: { label: string; value: number }) {
  return <article className="border-t border-border pt-3"><strong className="font-display text-3xl">{value}</strong><span className="mt-1 block text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</span></article>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><dt className="font-semibold">{label}</dt><dd className="text-muted-foreground">{value}</dd></div>;
}

function Field({ name, label, type = 'text', defaultValue = '', placeholder }: { name: string; label: string; type?: string; defaultValue?: string; placeholder?: string }) {
  return <label className="grid gap-2 text-sm font-semibold">{label}<input name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" /></label>;
}

function SelectField<T extends string>({ name, label, defaultValue, values }: { name: string; label: string; defaultValue: T; values: readonly T[] }) {
  return <label className="grid gap-2 text-sm font-semibold">{label}<select name={name} defaultValue={defaultValue} className="min-h-11 border border-border bg-background px-3 py-2 font-normal">{values.map((value) => <option key={value} value={value}>{statusLabel(value)}</option>)}</select></label>;
}

function toLines(value: FormDataEntryValue | null) {
  return String(value || '').split('\n').map((item) => item.trim()).filter(Boolean);
}

function tierLabel(value: AdvertiserOperationsRecord['tier']) {
  return value === 'local' ? 'Local Partner' : value === 'growth' ? 'Growth Partner' : value === 'premier' ? 'Premier Partner' : 'Custom Partnership';
}

function priceLabel(cents: number | null, billingCycle: AdvertiserOperationsRecord['billingCycle']) {
  if (cents == null) return 'Custom quote';
  const amount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(cents / 100);
  return `${amount}/${billingCycle === 'annual' ? 'year' : 'month'}`;
}

function statusLabel(value: string) {
  return value.replaceAll('_', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
}
