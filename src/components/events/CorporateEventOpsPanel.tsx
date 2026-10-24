import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  changeCorporateEventApplicationStatus, changeCorporateEventLeadStatus,
  changeCorporateEventOfferStatus, draftCorporateEventOffer, getCorporateEventOperations,
  verifyCorporateEventCommercialAgreement,
} from '@/data/corporate-events.admin.functions';
import { corporateEventProviders } from '@/data/corporate-events';
import { corporateEventTexasToday } from '@/data/corporate-event-dates';
import { summarizeCorporateEventResponseTimes, isCorporateEventLeadOverdue } from '@/data/corporate-event-response-sla';
import { findCorporatePlannerDuplicates } from '@/data/corporate-event-duplicate-review';

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
  first_contacted_at: string | null;
};
type Application = {
  id: string; created_at: string; status: ApplicationStatus;
  contact_name: string; email: string; phone: string | null;
  business_name: string; city: string; website: string;
  published_capacity: number | null; proposal: string | null;
  proposed_promo_code: string | null; notes: string | null;
  identity_verified_at: string | null; identity_verified_by: string | null; identity_verification_note: string | null;
  commercial_agreement_verified_at: string | null; commercial_agreement_verified_by: string | null;
  commercial_agreement_reference: string | null; commercial_agreement_covers_offers: boolean;
  commercial_agreement_covers_quote_routing: boolean; commercial_agreement_expires_on: string | null;
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
  offerClickStats: { outboundClicks30Days: number; truncated: boolean; byOffer: {offerId: string; clicks: number}[] };
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

  const duplicateLeads = useMemo(() => findCorporatePlannerDuplicates(data?.leads ?? []), [data]);
  const responseMetrics = useMemo(() => summarizeCorporateEventResponseTimes(data?.leads ?? []), [data]);
  const counts = useMemo(() => ({
    leads: data?.leads.filter((item) => !['closed', 'spam'].includes(item.status)).length ?? 0,
    applications: data?.applications.filter((item) => !['rejected', 'spam'].includes(item.status)).length ?? 0,
    offers: data?.offers.filter((item) => item.status === 'approved' && item.ends_on >= corporateEventTexasToday()).length ?? 0,
  }), [data]);

  async function updateLead(id: string, status: LeadStatus) {
    if (status === 'contacted' && !window.confirm('Confirm that you actually contacted this planner through an authorized business channel. This only records the first-contact time; TexasDefined will NOT send an email automatically.')) return;
    setBusy(id); setError(''); setMessage('');
    try {
      await changeCorporateEventLeadStatus({ data: { accessKey, id, status } });
      await refresh();
      setMessage('Planner request status updated. No email was sent.');
    } catch { setError('Could not update planner request.'); }
    finally { setBusy(''); }
  }
  async function updateApplication(id: string, status: ApplicationStatus) {
    let verificationNote = '';
    let verifiedIdentity = false;
    if (status === 'approved') {
      if (!window.confirm('Have you independently verified that this applicant represents this business through an official published business contact channel? Approval does NOT publish any discount.')) return;
      const evidence = window.prompt('Record how you independently verified the business and applicant. Include the method and contact channel, but not passwords or other sensitive information (20–500 characters):', '');
      if (!evidence || evidence.trim().length < 20 || evidence.trim().length > 500) {
        setError('Approval requires written evidence (20–500 characters) of independent business identity verification.');
        return;
      }
      verificationNote = evidence.trim();
      verifiedIdentity = true;
    }
    setBusy(id); setError(''); setMessage('');
    try {
      await changeCorporateEventApplicationStatus({ data: { accessKey, id, status, verifiedIdentity, verificationNote } });
      await refresh();
      setMessage('Business application status updated. A listing was not published.');
    } catch { setError('Could not update business application. Approval requires documented independent verification.'); }
    finally { setBusy(''); }
  }
  async function verifyAgreement(application: Application) {
    if (!window.confirm('Did you independently review an actual signed agreement, verify the contracting business and authorized signatory, and retain the terms securely outside this tool? Do NOT proceed for a proposed or unsigned agreement.')) return;
    const evidence = window.prompt('Private signed-agreement reference and verification method (20–500 characters). Do not paste the contract, personal data or payment terms:', '');
    if (!evidence || evidence.trim().length < 20 || evidence.trim().length > 500) {
      setError('A reference to independently verified signed terms is required.');
      return;
    }
    const coversOffers = window.confirm('Do the verified signed terms EXPLICITLY authorize published commercial promotions? OK = yes; Cancel = no.');
    const coversQuoteRouting = window.confirm('Do the verified signed terms EXPLICITLY authorize corporate group inquiry forwarding to this partner? OK = yes; Cancel = no.');
    if (!coversOffers && !coversQuoteRouting) {
      setError('At least one explicit signed-agreement permission is required. No approval recorded.');
      return;
    }
    const expiresInput = window.prompt('Signed agreement expiration date (YYYY-MM-DD), or leave blank ONLY if the agreement has no specified expiration:', '');
    if (expiresInput === null) return;
    const expiresOn = expiresInput.trim() || null;
    if (expiresOn && !/^\\d{4}-\\d{2}-\\d{2}$/.test(expiresOn)) {
      setError('Use YYYY-MM-DD for the genuine signed-agreement expiry date.');
      return;
    }
    setBusy(application.id); setError(''); setMessage('');
    try {
      await verifyCorporateEventCommercialAgreement({ data: {
        accessKey, applicationId: application.id, verifiedSignedAgreement: true,
        verificationReference: evidence.trim(), coversOffers, coversQuoteRouting, expiresOn,
      } });
      await refresh();
      setMessage('Staff signed-agreement verification recorded privately. No offer approved, lead forwarded or email sent.');
    } catch { setError('Signed agreement verification could not be recorded. Confirm business identity and current contract permissions.'); }
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
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Metric title="Open planner requests" value={counts.leads} />
        <Metric title="Awaiting first contact >48h" value={responseMetrics.overdueFirstContact} />
        <Metric title="Business applications" value={counts.applications} />
        <Metric title="Current approved offers" value={counts.offers} />
        <Metric title="Offer outbound clicks (30d)" value={data.offerClickStats.outboundClicks30Days} />
        <Metric title="Potential repeat planner requests" value={duplicateLeads.size} />
      </div>
      <p className="mt-3 text-xs leading-6 text-muted-foreground">Internal response target is 48 hours; {responseMetrics.awaitingFirstContact} visible request(s) remain without a recorded first contact, {responseMetrics.contactedWithinTarget} have contact documented within 48 hours, and {responseMetrics.contactedAfterTarget} after that target. These are staff-recorded actions, not email delivery receipts. Only the most recent 120 requests are shown here.</p>
      <p className="mt-3 text-xs leading-6 text-muted-foreground">Aggregated offer outbound link activations, not unique visitors, bookings or revenue. No click-level visitor identity is retained.{data.offerClickStats.truncated ? " More than 1,000 daily offer records exist; this is a partial lower-bound count." : ""}</p>
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
            {duplicateLeads.has(lead.id) ? <p className="mt-3 border border-border bg-surface p-3 text-xs leading-6">
              Possible repeat request: {duplicateLeads.get(lead.id)?.similarCount} other matching submission(s) within 48 hours. Confirm directly with the planner before merging work, contacting twice, or marking anything as spam. Nothing was automatically deleted.
            </p> : null}
            {lead.provider_slugs?.length ? <p className="mt-3 text-sm text-muted-foreground">Preferred venues: {lead.provider_slugs.join(', ')}</p> : null}
            <p className={'mt-3 border px-3 py-2 text-xs leading-6 ' + (lead.allow_provider_outreach ? 'border-primary text-foreground' : 'border-border text-muted-foreground')}>
              {lead.allow_provider_outreach
                ? 'Optional sharing approved for the selected venues only, recorded ' + (lead.provider_outreach_consented_at ? fmt(lead.provider_outreach_consented_at) : 'without a readable timestamp') + '. Review venue identity and partner terms before taking any manual outreach action. No message was sent by this system.'
                : 'No venue-sharing consent. Do not forward this planner’s personal contact details to businesses.'}
            </p>
            {isCorporateEventLeadOverdue(lead) ? <p className="mt-3 border border-border bg-surface p-3 text-xs font-semibold text-foreground">
              Follow-up priority: more than 48 hours since this planner's request without a recorded first contact.
            </p> : null}
            {lead.first_contacted_at ? <p className="mt-2 text-xs text-muted-foreground">
              Staff-recorded first contact: {fmt(lead.first_contacted_at)}. This records operator confirmation, not proof of delivery.
            </p> : null}
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
            {app.identity_verified_at ? <p className="mt-4 border border-border bg-surface p-3 text-xs leading-6 text-muted-foreground">
              Internal business identity verification: {fmt(app.identity_verified_at)} by {app.identity_verified_by}. Evidence: {app.identity_verification_note || 'No evidence recorded'}.
              Approval does not publish a listing, commission agreement or customer discount.
            </p> : null}
            {app.proposal ? <p className="mt-4 whitespace-pre-wrap text-sm leading-7">Group package: {app.proposal}</p> : null}
            {app.proposed_promo_code ? <p className="mt-3 text-sm">Proposed code (not live): <code>{app.proposed_promo_code}</code></p> : null}
            {app.notes ? <p className="mt-3 whitespace-pre-wrap text-sm leading-7">Submitted terms: {app.notes}</p> : null}
            {app.status === 'approved' ? <div className="mt-5 border-t border-border pt-4">
              <p className="mb-3 text-xs leading-6 text-muted-foreground">Signed commercial terms are verified separately from business identity. Never mark an unsigned proposal or unverified discount as contracted.</p>
              {app.commercial_agreement_verified_at
                ? <p className="mb-3 text-xs leading-6 text-muted-foreground">
                  Internal agreement check: {fmt(app.commercial_agreement_verified_at)} · offers {app.commercial_agreement_covers_offers ? 'permitted' : 'not permitted'} · quote routing {app.commercial_agreement_covers_quote_routing ? 'permitted' : 'not permitted'} · expiry {app.commercial_agreement_expires_on || 'no expiry recorded'}. Private reference: {app.commercial_agreement_reference || 'missing'}.
                </p>
                : <p className="mb-3 text-xs font-semibold text-muted-foreground">No signed partner agreement verified. Commercial offers and quote drafts stay blocked.</p>}
              <button type="button" className={action} disabled={busy === app.id}
                onClick={() => void verifyAgreement(app)}>Record independently verified signed agreement</button>
              <div className="mt-4" />
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
                <p className="mt-3 text-xs text-muted-foreground">Recorded outbound link activations (30d): {data.offerClickStats.byOffer.find((entry) => entry.offerId === offer.id)?.clicks ?? 0}. Not attributable conversions.</p>
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
