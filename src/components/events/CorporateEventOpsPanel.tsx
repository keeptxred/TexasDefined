import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  changeCorporateEventApplicationStatus, changeCorporateEventLeadStatus,
  changeCorporateEventOfferStatus, draftCorporateEventOffer, getCorporateEventOperations,
} from '@/data/corporate-events.admin.functions';
import { corporateEventProviders } from '@/data/corporate-events';

type LeadStatus = 'new' | 'reviewing' | 'contacted' | 'closed' | 'spam';
type ApplicationStatus = 'pending' | 'reviewing' | 'approved' | 'rejected' | 'spam';
type OfferStatus = 'draft' | 'approved' | 'paused' | 'expired';
type Lead = {
  id: string; created_at: string; status: LeadStatus;
  contact_name: string; email: string; company: string; phone: string | null;
  city: string; group_size: number; event_category: string;
  event_date: string | null; budget_per_person: number | null;
  provider_slugs: string[]; notes: string | null;
  allow_provider_outreach: boolean; provider_outreach_consented_at: string | null;
};
type Application = {
  id: string; created_at: string; status: ApplicationStatus;
  contact_name: string; email: string; phone: string | null;
  business_name: string; city: string; website: string;
  published_capacity: number | null; proposal: string | null;
  proposed_promo_code: string | null; notes: string | null;
};
type Offer = {
  id: string; created_at: string; status: OfferStatus;
  partner_application_id: string; provider_slug: string; title: string;
  benefit: string; code: string | null; redemption_url: string;
  starts_on: string; ends_on: string;
  reviewed_by: string | null; reviewed_at: string | null;
};
type Snapshot = {
  generatedAt: string; leads: Lead[]; applications: Application[]; offers: Offer[];
  truncated: { leads: boolean; applications: boolean; offers: boolean };
};
const leadStatuses: LeadStatus[] = ['new', 'reviewing', 'contacted', 'closed', 'spam'];
const applicationStatuses: ApplicationStatus[] = ['pending', 'reviewing', 'approved', 'rejected', 'spam'];
const offerStatuses: OfferStatus[] = ['draft', 'approved', 'paused', 'expired'];
const input = 'min-h-10 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm';
const action = 'min-h-10 border border-primary px-4 py-2 text-sm font-semibold text-primary disabled:opacity-50';
const fmt = (value: string) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const usd = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

export function CorporateEventOpsPanel({ accessKey }: { accessKey: string }) {
  const [data, setData] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [openedApplication, setOpenedApplication] = useState<string | null>(null);
  const [showSpam, setShowSpam] = useState(false);
  const [tab, setTab] = useState<'leads' | 'applications' | 'offers'>('leads');

  async function refresh() {
    const result = await getCorporateEventOperations({ data: { accessKey } });
    setData(result as Snapshot);
    return result;
  }

  useEffect(() => {
    let mounted = true;
    setData(null);
    setLoading(true);
    getCorporateEventOperations({ data: { accessKey } })
      .then((result) => { if (mounted) setData(result as Snapshot); })
      .catch(() => { if (mounted) setError('The corporate events inbox could not be unlocked.'); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [accessKey]);

  const counts = useMemo(() => ({
    leads: data?.leads.filter((item) => !['closed', 'spam'].includes(item.status)).length ?? 0,
    applications: data?.applications.filter((item) => !['rejected', 'spam'].includes(item.status)).length ?? 0,
    offers: data?.offers.filter((item) => item.status === 'approved' && item.ends_on >= new Date().toISOString().slice(0, 10)).length ?? 0,
  }), [data]);

  async function updateLead(id: string, status: LeadStatus) {
    setBusy(id); setError(''); setMessage('');
    try {
      await changeCorporateEventLeadStatus({ data: { accessKey, id, status } });
      await refresh();
      setMessage('Planner request status updated. No email was sent.');
    } catch { setError('Could not update planner request.'); }
    finally { setBusy(''); }
  }
  async function updateApplication(id: string, status: ApplicationStatus) {
    setBusy(id); setError(''); setMessage('');
    try {
      await changeCorporateEventApplicationStatus({ data: { accessKey, id, status } });
      await refresh();
      setMessage('Business application status updated. A listing was not published.');
    } catch { setError('Could not update business application.'); }
    finally { setBusy(''); }
  }
  async function updateOffer(id: string, status: OfferStatus) {
    if (status === 'approved' && !window.confirm('Approve this verified offer after reviewing its dates, business identity, code and redemption terms?')) return;
    setBusy(id); setError(''); setMessage('');
    try {
      await changeCorporateEventOfferStatus({ data: { accessKey, id, status } });
      await refresh();
      setMessage('Offer state updated in the internal approval ledger. No email was sent.');
    } catch { setError('Offer could not be updated. Confirm business approval, validity and start/end dates.'); }
    finally { setBusy(''); }
  }
  async function submitOffer(event: FormEvent<HTMLFormElement>, application: Application) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(application.id); setError(''); setMessage('');
    try {
      await draftCorporateEventOffer({ data: {
        accessKey,
        applicationId: application.id,
        providerSlug: String(form.get('providerSlug') || ''),
        title: String(form.get('title') || ''),
        benefit: String(form.get('benefit') || ''),
        code: String(form.get('code') || '') || null,
        redemptionUrl: String(form.get('redemptionUrl') || ''),
        startsOn: String(form.get('startsOn') || ''),
        endsOn: String(form.get('endsOn') || ''),
      } });
      await refresh();
      setOpenedApplication(null);
      setTab('offers');
      setMessage('Offer saved as a DRAFT for separate review. It has not been published.');
    } catch { setError('Draft offer failed. The business must be approved, match a verified provider name, and use its official HTTPS domain.'); }
    finally { setBusy(''); }
  }

  return <section id="corporate-event-ops" className="mt-12 border-t-2 border-primary pt-10">
    <p className="eyebrow text-primary">Protected TexasDefined marketplace operations</p>
    <h2 className="mt-3 font-display text-3xl sm:text-4xl">Corporate events inquiries and partner approvals</h2>
    <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">This private console uses the existing authorized operations access key. Reviewing a lead, approving a business, or drafting an offer does not contact the applicant, guarantee a listing, authorize sharing personal data or activate a public promotion.</p>

    {loading ? <p role="status" className="mt-5 text-sm">Loading private event operations…</p> : null}
    {error ? <p role="alert" className="mt-4 border border-destructive p-4 text-sm">{error}</p> : null}
    {message ? <p role="status" className="mt-4 border border-border bg-surface p-4 text-sm">{message}</p> : null}
    {data ? <>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Metric title="Open planner requests" value={counts.leads} />
        <Metric title="Business applications" value={counts.applications} />
        <Metric title="Current approved offers" value={counts.offers} />
      </div>
      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Corporate event review queues">
        {(['leads', 'applications', 'offers'] as const).map((key) =>
          <button key={key} role="tab" aria-selected={tab === key} onClick={() => setTab(key)} type="button"
            className={'min-h-11 border px-4 text-sm font-semibold capitalize ' + (tab === key ? 'border-primary bg-primary text-primary-foreground' : 'border-border')}>
            {key} ({data[key].length})
          </button>
        )}
        <button type="button" className={action} disabled={Boolean(busy)} onClick={() => { setError(''); setLoading(true); void refresh().catch(() => setError('Refresh failed.')).finally(() => setLoading(false)); }}>Refresh inbox</button>
      </div>
      {data.truncated[tab] ? <p className="mt-3 text-sm text-muted-foreground">Only the most recent 120 records are displayed here. Older records remain in Supabase for authorized review.</p> : null}
      <label className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={showSpam} onChange={(event) => setShowSpam(event.target.checked)} />Include archived / spam / rejected records</label>
      {tab === 'leads' ? <div className="mt-5 space-y-4" role="tabpanel">
        {data.leads.filter((lead) => showSpam || !['spam', 'closed'].includes(lead.status)).map((lead) =>
          <article key={lead.id} className="border border-border p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="eyebrow text-primary">{lead.group_size} guests · {lead.event_category.replaceAll('-', ' ')} · {lead.city}</p>
                <h3 className="mt-2 font-display text-xl">{lead.company} — {lead.contact_name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{fmt(lead.created_at)} · {lead.event_date ? 'Event ' + lead.event_date : 'Date flexible'} · {lead.budget_per_person ? usd(lead.budget_per_person) + ' per person' : 'Budget not specified'}</p>
                <div className="mt-2 flex flex-wrap gap-4 text-sm"><a href={'mailto:' + lead.email} className="text-primary underline">{lead.email}</a>{lead.phone ? <span>{lead.phone}</span> : null}</div>
              </div>
              <label className="text-xs font-semibold">Status<select disabled={busy === lead.id} value={lead.status} onChange={(event) => void updateLead(lead.id, event.target.value as LeadStatus)} className={'ml-2 ' + input}>
                {leadStatuses.map((state) => <option key={state} value={state}>{state}</option>)}
              </select></label>
            </div>
            {lead.provider_slugs?.length ? <p className="mt-3 text-sm text-muted-foreground">Preferred venues: {lead.provider_slugs.join(', ')}</p> : null}
            <p className={'mt-3 border px-3 py-2 text-xs leading-6 ' + (lead.allow_provider_outreach ? 'border-primary text-foreground' : 'border-border text-muted-foreground')}>
              {lead.allow_provider_outreach
                ? 'Optional sharing approved for the selected venues only, recorded ' + (lead.provider_outreach_consented_at ? fmt(lead.provider_outreach_consented_at) : 'without a readable timestamp') + '. Review venue identity and partner terms before taking any manual outreach action. No message was sent by this system.'
                : 'No venue-sharing consent. Do not forward this planner’s personal contact details to businesses.'}
            </p>
            {lead.notes ? <p className="mt-3 whitespace-pre-wrap border-t border-border pt-3 text-sm leading-7">{lead.notes}</p> : null}
          </article>
        )}
        {!data.leads.length ? <p className="border border-dashed border-border p-6 text-sm text-muted-foreground">No planner inquiries received yet.</p> : null}
      </div> : null}

      {tab === 'applications' ? <div className="mt-5 space-y-4" role="tabpanel">
        {data.applications.filter((app) => showSpam || !['spam', 'rejected'].includes(app.status)).map((app) =>
          <article key={app.id} className="border border-border p-4 sm:p-5">
            <div className="flex flex-wrap justify-between gap-4">
              <div><p className="eyebrow text-primary">{app.city} · {app.published_capacity ? 'Group capacity up to ' + app.published_capacity : 'Capacity not specified'}</p>
                <h3 className="mt-2 font-display text-xl">{app.business_name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{app.contact_name} · Submitted {fmt(app.created_at)}</p>
                <p className="mt-2 flex flex-wrap gap-3 text-sm"><a className="text-primary underline" href={'mailto:' + app.email}>{app.email}</a>{app.phone || null}</p>
                <a href={app.website} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex text-sm text-primary underline">Official website ↗</a>
              </div>
              <label className="text-xs font-semibold">Status<select disabled={busy === app.id} className={'ml-2 ' + input} value={app.status} onChange={(event) => void updateApplication(app.id, event.target.value as ApplicationStatus)}>
                {applicationStatuses.map((state) => <option key={state} value={state}>{state}</option>)}
              </select></label>
            </div>
            {app.proposal ? <p className="mt-4 whitespace-pre-wrap text-sm leading-7">Group package: {app.proposal}</p> : null}
            {app.proposed_promo_code ? <p className="mt-3 text-sm">Proposed code (not live): <code>{app.proposed_promo_code}</code></p> : null}
            {app.notes ? <p className="mt-3 whitespace-pre-wrap text-sm leading-7">Submitted terms: {app.notes}</p> : null}
            {app.status === 'approved' ? <div className="mt-5 border-t border-border pt-4">
              <button type="button" onClick={() => setOpenedApplication(openedApplication === app.id ? null : app.id)} className={action}>
                {openedApplication === app.id ? 'Close offer form' : 'Prepare a draft offer'}
              </button>
              {openedApplication === app.id ? <form onSubmit={(event) => void submitOffer(event, app)} className="mt-5 grid gap-4 border border-border bg-surface p-4 md:grid-cols-2">
                <label className="text-sm font-semibold">Existing source-verified listing<select name="providerSlug" required className={'mt-2 ' + input}>
                  <option value="">Select business listing</option>
                  {corporateEventProviders.map((provider) => <option key={provider.slug} value={provider.slug}>{provider.name}</option>)}
                </select></label>
                <label className="text-sm font-semibold">Draft title<input name="title" required minLength={5} maxLength={160} className={'mt-2 ' + input} /></label>
                <label className="text-sm font-semibold md:col-span-2">Actual group benefit<textarea name="benefit" required minLength={10} maxLength={500} rows={2} className={'mt-2 ' + input} /></label>
                <label className="text-sm font-semibold">Proposed code (optional)<input name="code" defaultValue={app.proposed_promo_code || ''} maxLength={60} className={'mt-2 ' + input} /></label>
                <label className="text-sm font-semibold">HTTPS redemption URL<input type="url" name="redemptionUrl" required defaultValue={app.website} className={'mt-2 ' + input} /></label>
                <label className="text-sm font-semibold">Start date<input type="date" name="startsOn" required className={'mt-2 ' + input} /></label>
                <label className="text-sm font-semibold">End date<input type="date" name="endsOn" required className={'mt-2 ' + input} /></label>
                <p className="md:col-span-2 text-xs leading-6 text-muted-foreground">This form saves a DRAFT only. Business identity and verified listing name must match, and redemption must use the business's approved HTTPS domain. A separate review is required before offer approval.</p>
                <button type="submit" disabled={busy === app.id} className={'md:col-span-2 ' + action}>{busy === app.id ? 'Saving draft…' : 'Save internal draft offer'}</button>
              </form> : null}
            </div> : null}
          </article>
        )}
        {!data.applications.length ? <p className="border border-dashed border-border p-6 text-sm text-muted-foreground">No business applications received yet.</p> : null}
      </div> : null}

      {tab === 'offers' ? <div className="mt-5 space-y-4" role="tabpanel">
        {data.offers.filter((offer) => showSpam || !['expired'].includes(offer.status)).map((offer) =>
          <article key={offer.id} className="border border-border p-4 sm:p-5">
            <div className="flex flex-wrap justify-between gap-4">
              <div><p className="eyebrow text-primary">{offer.provider_slug} · {offer.starts_on} to {offer.ends_on}</p><h3 className="mt-2 font-display text-xl">{offer.title}</h3>
                <p className="mt-2 text-sm leading-7">{offer.benefit}</p>
                {offer.code ? <p className="mt-2 text-sm">Code: <code>{offer.code}</code></p> : null}
                <a href={offer.redemption_url} className="mt-2 block text-sm text-primary underline" target="_blank" rel="noopener noreferrer">Review redemption URL ↗</a>
                {offer.reviewed_at ? <p className="mt-3 text-xs text-muted-foreground">Approved {fmt(offer.reviewed_at)} by {offer.reviewed_by}</p> : null}
              </div>
              <label className="text-xs font-semibold">Review state<select disabled={busy === offer.id} className={'ml-2 ' + input} value={offer.status} onChange={(event) => void updateOffer(offer.id, event.target.value as OfferStatus)}>
                {offerStatuses.map((state) => <option key={state} value={state}>{state}</option>)}
              </select></label>
            </div>
          </article>
        )}
        {!data.offers.length ? <p className="border border-dashed border-border p-6 text-sm text-muted-foreground">No reviewed offers. Proposals remain private until approval and are not automatically placed in public listings.</p> : null}
      </div> : null}
    </> : null}
  </section>;
}

function Metric({ title, value }: { title: string; value: number }) {
  return <article className="border border-border bg-surface p-4"><p className="text-xs uppercase tracking-[.11em] text-muted-foreground">{title}</p><p className="mt-2 font-display text-3xl">{value}</p></article>;
}
