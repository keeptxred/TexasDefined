import { createLazyFileRoute } from '@tanstack/react-router';
import { type FormEvent, useEffect, useMemo, useState } from 'react';

import { Container } from '@/components/layout/Container';
import { createAdvertiserAgreementOffer } from '@/data/advertiser-agreement.functions';
import { getAdvertiserLeadDashboard, setAdvertiserLeadStatus } from '@/data/advertiser-leads.functions';
import type { AdvertiserLead, AdvertiserLeadDashboard, AdvertiserLeadStatus } from '@/data/advertiser-leads.types';
import { promoteSportsPartnerLeadToSponsor } from '@/data/sports-partner-promotion.functions';

const SESSION_KEY = 'texasdefined:sports-partner-admin-key';
const statuses: AdvertiserLeadStatus[] = [
  'new', 'reviewing', 'contacted', 'approved', 'agreement_sent', 'agreement_signed',
  'awaiting_payment', 'paid', 'assets_needed', 'scheduled', 'live', 'completed', 'declined', 'closed',
];

export const Route = createLazyFileRoute('/admin/sports-partners')({ component: AdvertiserLeadsPage });

function AdvertiserLeadsPage() {
  const [accessKey, setAccessKey] = useState('');
  const [dashboard, setDashboard] = useState<AdvertiserLeadDashboard | null>(null);
  const [loading, setLoading] = useState(false);
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);
  const [promotingLeadId, setPromotingLeadId] = useState<string | null>(null);
  const [agreementLeadId, setAgreementLeadId] = useState<string | null>(null);
  const [generatingAgreementLeadId, setGeneratingAgreementLeadId] = useState<string | null>(null);
  const [generatedAgreementUrl, setGeneratedAgreementUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function unlock(key: string) {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const result = await getAdvertiserLeadDashboard({ data: { accessKey: key } });
      setDashboard(result);
      sessionStorage.setItem(SESSION_KEY, key);
    } catch (cause) {
      console.error('Advertiser lead access failed', cause);
      setDashboard(null);
      sessionStorage.removeItem(SESSION_KEY);
      setError('Access denied or the advertiser lead service is temporarily unavailable.');
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

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessKey.trim()) return;
    await unlock(accessKey.trim());
  }

  async function refresh(key: string) {
    const refreshed = await getAdvertiserLeadDashboard({ data: { accessKey: key } });
    setDashboard(refreshed);
  }

  async function updateStatus(leadId: string, status: AdvertiserLeadStatus) {
    if (!dashboard) return;
    const key = sessionStorage.getItem(SESSION_KEY) || accessKey;
    setUpdatingLeadId(leadId);
    setError('');
    setSuccess('');
    try {
      await setAdvertiserLeadStatus({ data: { accessKey: key, leadId, status } });
      await refresh(key);
    } catch (cause) {
      console.error('Advertiser lead status update failed', cause);
      setError('The advertiser status could not be updated. Unlock the dashboard again if your session expired.');
    } finally {
      setUpdatingLeadId(null);
    }
  }

  async function promoteLead(leadId: string) {
    if (!dashboard) return;
    const key = sessionStorage.getItem(SESSION_KEY) || accessKey;
    setPromotingLeadId(leadId);
    setError('');
    setSuccess('');
    try {
      const result = await promoteSportsPartnerLeadToSponsor({ data: { accessKey: key, leadId } });
      await refresh(key);
      setSuccess(`${result.companyName} was promoted to a sports sponsor prospect. Review it in Sports Sponsorships before creating a live sports placement.`);
    } catch (cause) {
      console.error('Sports partner lead promotion failed', cause);
      setError(cause instanceof Error ? cause.message : 'The lead could not be promoted to a sports sponsor prospect.');
    } finally {
      setPromotingLeadId(null);
    }
  }

  async function generateAgreement(event: FormEvent<HTMLFormElement>, lead: AdvertiserLead) {
    event.preventDefault();
    const key = sessionStorage.getItem(SESSION_KEY) || accessKey;
    const form = new FormData(event.currentTarget);
    setGeneratingAgreementLeadId(lead.id);
    setGeneratedAgreementUrl('');
    setError('');
    setSuccess('');
    try {
      const tier = String(form.get('tier') || lead.requestedTier || 'growth') as 'local' | 'growth' | 'premier' | 'custom';
      const billingCycle = String(form.get('billingCycle') || lead.billingCycle || 'monthly') as 'monthly' | 'annual';
      const customPriceDollars = String(form.get('customPriceDollars') || '').trim();
      const result = await createAdvertiserAgreementOffer({ data: {
        accessKey: key,
        inquiryId: lead.id,
        tier,
        billingCycle,
        legalName: String(form.get('legalName') || ''),
        businessName: String(form.get('businessName') || ''),
        billingEmail: String(form.get('billingEmail') || ''),
        billingAddress: String(form.get('billingAddress') || ''),
        companyWebsite: String(form.get('companyWebsite') || ''),
        campaignStartDate: String(form.get('campaignStartDate') || ''),
        campaignEndDate: String(form.get('campaignEndDate') || ''),
        negotiatedAdditions: String(form.get('negotiatedAdditions') || ''),
        paymentTerms: String(form.get('paymentTerms') || ''),
        customPriceCents: customPriceDollars ? Math.round(Number(customPriceDollars) * 100) : null,
        expiresInDays: Number(form.get('expiresInDays') || 14),
        createdBy: 'TexasDefined advertiser admin',
      } });
      const absolute = `${window.location.origin}${result.agreementUrl}`;
      setGeneratedAgreementUrl(absolute);
      await refresh(key);
      setSuccess(`Private agreement link created for ${lead.company}. No email was sent.`);
    } catch (cause) {
      console.error('Agreement link generation failed', cause);
      setError(cause instanceof Error ? cause.message : 'The private agreement link could not be created.');
    } finally {
      setGeneratingAgreementLeadId(null);
    }
  }

  function lock() {
    sessionStorage.removeItem(SESSION_KEY);
    setAccessKey('');
    setDashboard(null);
    setAgreementLeadId(null);
    setGeneratedAgreementUrl('');
    setError('');
    setSuccess('');
  }

  return <Container className="py-12 sm:py-16">
    <main className="mx-auto max-w-7xl">
      <header className="border-b border-border pb-8">
        <p className="eyebrow text-primary">TexasDefined Operations</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1 className="font-display text-4xl sm:text-6xl">Advertiser & Partner Leads</h1>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Review all commercial inquiries, move them through the advertiser lifecycle, generate private one-time agreement links for approved prospects, and preserve the existing sports-sponsor promotion workflow for sports-travel leads. Agreement generation does not send email or begin outreach.</p>
          </div>
          {dashboard ? <button type="button" onClick={lock} className="min-h-11 border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">Lock dashboard</button> : null}
        </div>
      </header>

      {!dashboard ? <section className="mt-10 max-w-xl border-y border-border py-8" aria-labelledby="unlock-heading">
        <p className="eyebrow text-primary">Protected advertiser data</p>
        <h2 id="unlock-heading" className="mt-2 font-display text-3xl">Unlock advertiser operations</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">Lead names, emails, phones and commercial details are not loaded with this page. Enter the existing partner-admin key to request them from the server. The key is kept only for this browser session.</p>
        <form onSubmit={submit} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold" htmlFor="sportsPartnerAccessKey">Admin access key
            <input id="sportsPartnerAccessKey" type="password" autoComplete="current-password" value={accessKey} onChange={(event) => setAccessKey(event.target.value)} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" required minLength={20} maxLength={200} />
          </label>
          <button type="submit" disabled={loading} className="min-h-11 justify-self-start bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{loading ? 'Unlocking…' : 'Unlock advertiser dashboard'}</button>
        </form>
        {error ? <p className="mt-4 text-sm font-semibold text-destructive" role="alert">{error}</p> : null}
      </section> : <LeadDashboard
        dashboard={dashboard}
        updatingLeadId={updatingLeadId}
        promotingLeadId={promotingLeadId}
        generatingAgreementLeadId={generatingAgreementLeadId}
        agreementLeadId={agreementLeadId}
        generatedAgreementUrl={generatedAgreementUrl}
        onStatusChange={updateStatus}
        onPromote={promoteLead}
        onAgreementToggle={(leadId) => { setAgreementLeadId((current) => current === leadId ? null : leadId); setGeneratedAgreementUrl(''); }}
        onGenerateAgreement={generateAgreement}
        onCopyAgreement={async () => { if (generatedAgreementUrl) await navigator.clipboard.writeText(generatedAgreementUrl); }}
        error={error}
        success={success}
      />}
    </main>
  </Container>;
}

function LeadDashboard({ dashboard, updatingLeadId, promotingLeadId, generatingAgreementLeadId, agreementLeadId, generatedAgreementUrl, onStatusChange, onPromote, onAgreementToggle, onGenerateAgreement, onCopyAgreement, error, success }: {
  dashboard: AdvertiserLeadDashboard;
  updatingLeadId: string | null;
  promotingLeadId: string | null;
  generatingAgreementLeadId: string | null;
  agreementLeadId: string | null;
  generatedAgreementUrl: string;
  onStatusChange: (leadId: string, status: AdvertiserLeadStatus) => Promise<void>;
  onPromote: (leadId: string) => Promise<void>;
  onAgreementToggle: (leadId: string) => void;
  onGenerateAgreement: (event: FormEvent<HTMLFormElement>, lead: AdvertiserLead) => Promise<void>;
  onCopyAgreement: () => Promise<void>;
  error: string;
  success: string;
}) {
  const activePipeline = useMemo(() => dashboard.leads.filter((lead) => !['completed', 'declined', 'closed'].includes(lead.status)).length, [dashboard.leads]);

  return <>
    <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
      <Metric label="Visible leads" value={dashboard.leads.length} />
      <Metric label="Active pipeline" value={activePipeline} />
      <Metric label="New" value={dashboard.statusCounts.new} />
      <Metric label="Approved" value={dashboard.statusCounts.approved} />
      <Metric label="Signed" value={dashboard.statusCounts.agreement_signed} />
      <Metric label="Paid" value={dashboard.statusCounts.paid} />
      <Metric label="Live" value={dashboard.statusCounts.live} />
    </section>

    {dashboard.truncated ? <p className="mt-5 border-l-2 border-primary pl-4 text-sm text-muted-foreground">Showing the latest {dashboard.limit} inquiries. Older records remain in Supabase.</p> : null}
    {error ? <p className="mt-5 text-sm font-semibold text-destructive" role="alert">{error}</p> : null}
    {success ? <p className="mt-5 border-l-2 border-primary pl-4 text-sm font-semibold text-foreground" role="status">{success}</p> : null}

    <section className="mt-10 grid gap-8 lg:grid-cols-[18rem_1fr]">
      <aside>
        <p className="eyebrow text-primary">Lead sources</p>
        <h2 className="mt-2 font-display text-3xl">What is generating interest</h2>
        <div className="mt-5 border-t border-border">
          {dashboard.sourceCounts.length ? dashboard.sourceCounts.slice(0, 24).map((source) => <div key={source.sourcePath} className="border-b border-border py-3">
            <strong className="block text-sm">{sourceLabel(source.sourcePath)}</strong>
            <span className="mt-1 block text-xs text-muted-foreground">{source.count} lead{source.count === 1 ? '' : 's'}</span>
          </div>) : <p className="py-4 text-sm text-muted-foreground">No advertiser inquiries yet.</p>}
        </div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">Generated {formatDateTime(dashboard.generatedAt)}. Source attribution is recorded with each inquiry.</p>
      </aside>

      <div>
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div><p className="eyebrow text-primary">Inquiry queue</p><h2 className="mt-2 font-display text-3xl">Advertiser opportunities</h2></div>
        </div>
        {dashboard.leads.length ? <div>{dashboard.leads.map((lead) => <article key={lead.id} className="border-b border-border py-7">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h3 className="font-display text-2xl">{lead.company}</h3>
                <span className="border border-border px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em]">{statusLabel(lead.status)}</span>
                <span className="border border-border px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{lead.partnershipType}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{lead.contactName} · <a className="font-semibold text-primary hover:underline" href={`mailto:${lead.email}`}>{lead.email}</a>{lead.phone ? ` · ${lead.phone}` : ''}</p>
              {lead.website ? <a className="mt-2 inline-block text-sm font-semibold text-primary hover:underline" href={lead.website} target="_blank" rel="noreferrer">Open company website ↗</a> : null}
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                <span>Package: {lead.requestedTier ? title(lead.requestedTier) : 'Not selected'}</span>
                <span>Billing: {lead.billingCycle ? title(lead.billingCycle) : 'Not selected'}</span>
                {lead.targetTexasLocations ? <span>Texas targets: {lead.targetTexasLocations}</span> : null}
                {lead.desiredStartDate ? <span>Desired start: {lead.desiredStartDate}</span> : null}
              </div>
            </div>
            <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground" htmlFor={`status-${lead.id}`}>Status
              <select id={`status-${lead.id}`} value={lead.status} disabled={updatingLeadId === lead.id || promotingLeadId === lead.id || generatingAgreementLeadId === lead.id} onChange={(event) => void onStatusChange(lead.id, event.target.value as AdvertiserLeadStatus)} className="min-h-10 border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground disabled:opacity-60">
                {statuses.map((status) => <option key={status} value={status}>{statusLabel(status)}</option>)}
              </select>
            </label>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Objectives</p><p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-foreground">{lead.objectives}</p></div>
            {lead.notes ? <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Notes</p><p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-foreground">{lead.notes}</p></div> : null}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 text-xs text-muted-foreground">
            <span>Received {formatDateTime(lead.createdAt)}</span>
            {sourceHref(lead.sourcePath) ? <a className="font-semibold text-primary hover:underline" href={sourceHref(lead.sourcePath)!}>{sourceLabel(lead.sourcePath)} →</a> : <span>{sourceLabel(lead.sourcePath)}</span>}
            {lead.partnershipType === 'sports-travel' && lead.website ? <button type="button" disabled={promotingLeadId === lead.id || updatingLeadId === lead.id} onClick={() => void onPromote(lead.id)} className="min-h-10 border border-border px-3 py-2 font-semibold text-foreground hover:border-primary hover:text-primary disabled:opacity-60">{promotingLeadId === lead.id ? 'Promoting…' : 'Promote to sports sponsor prospect'}</button> : null}
            {!['declined', 'completed', 'closed'].includes(lead.status) ? <button type="button" onClick={() => onAgreementToggle(lead.id)} className="min-h-10 border border-primary px-3 py-2 font-semibold text-primary hover:bg-primary hover:text-primary-foreground">{agreementLeadId === lead.id ? 'Close agreement form' : 'Prepare private agreement link'}</button> : null}
            {lead.advertiserAgreementId ? <span className="font-semibold text-foreground">Signed agreement on file</span> : null}
          </div>

          {agreementLeadId === lead.id ? <AgreementOfferForm lead={lead} generating={generatingAgreementLeadId === lead.id} generatedAgreementUrl={generatedAgreementUrl} onGenerate={onGenerateAgreement} onCopy={onCopyAgreement} /> : null}
        </article>)}</div> : <p className="py-8 text-sm text-muted-foreground">No advertiser partnership inquiries have been submitted yet.</p>}
      </div>
    </section>
  </>;
}

function AgreementOfferForm({ lead, generating, generatedAgreementUrl, onGenerate, onCopy }: {
  lead: AdvertiserLead;
  generating: boolean;
  generatedAgreementUrl: string;
  onGenerate: (event: FormEvent<HTMLFormElement>, lead: AdvertiserLead) => Promise<void>;
  onCopy: () => Promise<void>;
}) {
  const defaultTier = lead.requestedTier || 'growth';
  const defaultBilling = lead.billingCycle || 'monthly';
  const defaultPaymentTerms = defaultBilling === 'annual'
    ? 'Annual sponsorship is prepaid in full before campaign activation.'
    : 'Recurring sponsorship is billed monthly in advance; the initial monthly term is three months.';
  return <div className="mt-6 border border-border bg-surface p-5">
    <p className="eyebrow text-primary">Approved advertiser agreement</p>
    <h4 className="mt-2 font-display text-2xl">Create a one-time private signing link</h4>
    <p className="mt-2 text-sm leading-6 text-muted-foreground">Creating this link revokes any earlier active agreement link for this inquiry and moves the lead to Agreement Sent. It does not email the prospect.</p>
    <form onSubmit={(event) => void onGenerate(event, lead)} className="mt-6 grid gap-4 md:grid-cols-2">
      <AdminField label="Advertiser legal name" name="legalName" defaultValue={lead.company} required />
      <AdminField label="Business / trade name" name="businessName" defaultValue={lead.company} required />
      <AdminField label="Billing email" name="billingEmail" type="email" defaultValue={lead.email} required />
      <AdminField label="Company website" name="companyWebsite" type="url" defaultValue={lead.website || ''} />
      <label className="grid gap-2 text-sm font-semibold">Package<select name="tier" defaultValue={defaultTier} className="min-h-11 border border-border bg-background px-3 py-2 font-normal"><option value="local">Local Partner</option><option value="growth">Growth Partner</option><option value="premier">Premier Partner</option><option value="custom">Custom Partnership</option></select></label>
      <label className="grid gap-2 text-sm font-semibold">Billing<select name="billingCycle" defaultValue={defaultBilling} className="min-h-11 border border-border bg-background px-3 py-2 font-normal"><option value="monthly">Monthly</option><option value="annual">Annual</option></select></label>
      <AdminField label="Campaign start" name="campaignStartDate" type="date" defaultValue={lead.desiredStartDate || ''} />
      <AdminField label="Campaign end (optional)" name="campaignEndDate" type="date" />
      <AdminField label="Custom price in dollars (custom package only)" name="customPriceDollars" type="number" />
      <AdminField label="Link expires in days" name="expiresInDays" type="number" defaultValue="14" required />
      <label className="grid gap-2 text-sm font-semibold md:col-span-2">Billing / notice address<textarea name="billingAddress" rows={3} minLength={10} maxLength={500} required className="border border-border bg-background px-3 py-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-semibold md:col-span-2">Payment terms<textarea name="paymentTerms" rows={3} minLength={2} maxLength={1000} defaultValue={defaultPaymentTerms} required className="border border-border bg-background px-3 py-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-semibold md:col-span-2">Negotiated additions / order terms<textarea name="negotiatedAdditions" rows={4} maxLength={5000} className="border border-border bg-background px-3 py-3 font-normal" placeholder="Approved placement details, PO/reference, category exclusivity add-on, campaign-specific deliverables or other negotiated additions." /></label>
      <button type="submit" disabled={generating} className="min-h-11 justify-self-start border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{generating ? 'Creating…' : 'Create private agreement link'}</button>
    </form>
    {generatedAgreementUrl ? <div className="mt-6 border-t border-border pt-5"><p className="text-sm font-semibold">Private link created — no email sent</p><div className="mt-3 flex flex-col gap-3 sm:flex-row"><input readOnly value={generatedAgreementUrl} className="min-h-11 flex-1 border border-border bg-background px-3 py-2 text-xs" aria-label="Generated private agreement URL" /><button type="button" onClick={() => void onCopy()} className="min-h-11 border border-border px-4 py-2 text-sm font-semibold">Copy link</button></div><p className="mt-2 text-xs leading-5 text-muted-foreground">Hold this link until the outreach-readiness gate is complete. Anyone with the active link can view and sign the approved agreement until it expires or is revoked.</p></div> : null}
  </div>;
}

function Metric({ label, value }: { label: string; value: number }) {
  return <article className="border-t border-border pt-3"><strong className="font-display text-3xl">{value}</strong><span className="mt-1 block text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</span></article>;
}

function AdminField({ label, name, type = 'text', defaultValue, required = false }: { label: string; name: string; type?: string; defaultValue?: string; required?: boolean }) {
  return <label className="grid gap-2 text-sm font-semibold">{label}<input name={name} type={type} defaultValue={defaultValue} required={required} className="min-h-11 border border-border bg-background px-3 py-2 font-normal" /></label>;
}

function sourceHref(sourcePath: string) {
  return sourcePath === '/sports-venues' || sourcePath.startsWith('/sports-venue/') || sourcePath === '/things-unique-to-texas/texas-brands' ? sourcePath : null;
}

function sourceLabel(sourcePath: string) {
  if (sourcePath === '/sports-venues') return 'Statewide sports venue directory';
  if (sourcePath.startsWith('/sports-venue/')) return `${title(sourcePath.replace('/sports-venue/', ''))} venue guide`;
  if (sourcePath === '/things-unique-to-texas/texas-brands') return 'Texas Brands directory';
  if (sourcePath === '/partner-with-us') return 'Partner With Us page';
  return sourcePath;
}

function statusLabel(status: AdvertiserLeadStatus) {
  return status.split('_').map(title).join(' ');
}

function title(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
}
