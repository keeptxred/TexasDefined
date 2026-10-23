import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { getCorporateEventOperations } from '@/data/corporate-events.admin.functions';
import { prepareCorporateEventQuoteDraft } from '@/data/corporate-event-quote.functions';
import { corporateEventProviders } from '@/data/corporate-events';

type Planner = {
  id: string;
  status: string;
  company: string;
  group_size: number;
  city: string;
  provider_slugs: string[];
  allow_provider_outreach?: boolean;
  provider_outreach_consented_at?: string | null;
};
type Snapshot = { leads: Planner[] };
type QuoteDraft = {
  subject: string;
  brief: string;
  providerName: string;
  verifiedOfficialUrl: string;
  sent: false;
};

export function CorporateEventQuotePrepPanel({ accessKey }: { accessKey: string }) {
  const [leads, setLeads] = useState<Planner[]>([]);
  const [selectedLead, setSelectedLead] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [draft, setDraft] = useState<QuoteDraft | null>(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let alive = true;
    getCorporateEventOperations({ data: { accessKey } })
      .then((value) => {
        if (!alive) return;
        const snapshot = value as Snapshot;
        setLeads(snapshot.leads.filter((lead) =>
          lead.allow_provider_outreach === true
          && Boolean(lead.provider_outreach_consented_at)
          && Array.isArray(lead.provider_slugs)
          && lead.provider_slugs.length > 0
          && !['spam', 'closed'].includes(lead.status),
        ));
      })
      .catch(() => { if (alive) setError('Quote preparation could not load authorized planner requests.'); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [accessKey]);

  const currentLead = useMemo(() => leads.find((lead) => lead.id === selectedLead), [leads, selectedLead]);
  const selectedVenueNames = (currentLead?.provider_slugs ?? []).map((slug) => ({
    slug, label: corporateEventProviders.find((p) => p.slug === slug)?.name ?? slug,
  }));

  async function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedLead || !selectedProvider) return;
    setWorking(true);
    setDraft(null);
    setError('');
    setMessage('');
    try {
      const result = await prepareCorporateEventQuoteDraft({ data: {
        accessKey, leadId: selectedLead, providerSlug: selectedProvider,
      } });
      setDraft(result as QuoteDraft);
      setMessage('Manual draft prepared. Nothing was emailed or shared.');
    } catch {
      setError('Draft blocked. Check sharing consent, event date, provider shortlist, and a uniquely approved partner whose HTTPS domain matches the official venue website.');
    } finally {
      setWorking(false);
    }
  }

  async function copyDraft() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText('Subject: ' + draft.subject + '\n\n' + draft.brief);
      setMessage('Draft copied privately. Verify the recipient through the official venue before manually sending. No email was sent.');
    } catch {
      setError('Clipboard unavailable. Select the read-only draft below to copy manually.');
    }
  }

  return <section aria-labelledby="corp-quote-prep-title" className="mt-10 border-t border-border pt-8">
    <p className="eyebrow text-primary">Staff-only · no automatic sharing</p>
    <h2 id="corp-quote-prep-title" className="mt-2 font-display text-3xl">Prepare an approved partner quote request</h2>
    <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Only planners who separately authorized contact with their shortlisted venues are eligible. The server rechecks consent, venue selection, a current event date and a uniquely approved partner matching the source-verified official website. Draft text is for human review; this tool never emails a venue.</p>

    {loading ? <p role="status" className="mt-5 text-sm">Checking consented requests…</p> : null}
    {!loading && !leads.length ? <p className="mt-5 border border-border bg-surface p-4 text-sm text-muted-foreground">No active company-event requests with valid optional venue-sharing consent. There is nothing to forward.</p> : null}

    {leads.length > 0 ? <form className="mt-5 grid gap-4 border border-border bg-surface p-5 sm:grid-cols-2" onSubmit={(event) => void prepare(event)}>
      <label className="block text-sm font-semibold">Opted-in planner request
        <select required value={selectedLead} onChange={(event) => { setSelectedLead(event.target.value); setSelectedProvider(''); setDraft(null); }}
          className="mt-2 min-h-11 w-full border border-border bg-background px-3 font-normal">
          <option value="">Choose a consented request</option>
          {leads.map((lead) => <option key={lead.id} value={lead.id}>{lead.company} · {lead.group_size} guests · {lead.city}</option>)}
        </select>
      </label>
      <label className="block text-sm font-semibold">Planner-shortlisted venue
        <select required value={selectedProvider} onChange={(event) => { setSelectedProvider(event.target.value); setDraft(null); }}
          disabled={!currentLead} className="mt-2 min-h-11 w-full border border-border bg-background px-3 font-normal disabled:opacity-50">
          <option value="">Select only from the planner's shortlist</option>
          {selectedVenueNames.map((venue) => <option key={venue.slug} value={venue.slug}>{venue.label}</option>)}
        </select>
      </label>
      <p className="text-xs leading-6 text-muted-foreground sm:col-span-2">A business application marked approved is not enough: an exact venue-name and verified official HTTPS domain match are required to prepare a draft. Use the private applications panel to review partners first.</p>
      <button type="submit" disabled={working || !selectedLead || !selectedProvider}
        className="min-h-11 border border-primary px-4 text-sm font-semibold text-primary disabled:opacity-50 sm:col-span-2">
        {working ? 'Verifying request…' : 'Prepare manual quote-request draft (not sent)'}
      </button>
    </form> : null}
    {error ? <p role="alert" className="mt-4 text-sm text-destructive">{error}</p> : null}
    {message ? <p role="status" className="mt-4 text-sm">{message}</p> : null}
    {draft ? <div className="mt-6 border border-border bg-background p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Private review draft — not sent</p>
      <h3 className="mt-2 text-lg font-semibold">{draft.subject}</h3>
      <p className="mt-2 text-xs text-muted-foreground">Verified venue: {draft.providerName} · <a className="underline" href={draft.verifiedOfficialUrl} rel="noopener noreferrer" target="_blank">Official website ↗</a></p>
      <p className="mt-2 text-xs leading-6 text-muted-foreground">Check the exact recipient using official venue contact channels and review every planner note before sending manually. No automatic referral or booking has occurred.</p>
      <button type="button" onClick={() => void copyDraft()} className="mt-4 min-h-11 border border-primary px-4 text-sm font-semibold text-primary">Copy for manual review</button>
      <textarea readOnly value={'Subject: ' + draft.subject + '\n\n' + draft.brief}
        aria-label="Restricted manually prepared partner quote request"
        className="mt-4 h-72 w-full resize-y border border-border bg-surface p-3 text-sm" />
    </div> : null}
  </section>;
}
