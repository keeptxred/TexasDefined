import { useEffect, useState, type FormEvent } from 'react';
import { attestCorporateEventOutcome, getCorporateEventOutcomes } from '@/data/corporate-event-outcomes.functions';
import { corporateEventProviders } from '@/data/corporate-events';
import { getCorporateEventOperations } from '@/data/corporate-events.admin.functions';

const types = [
  ['quote_requested', 'Quote request actually sent'],
  ['quote_received', 'Written quote actually received'],
  ['referral_sent', 'Referral actually delivered'],
  ['booking_confirmed', 'Venue booking independently confirmed'],
  ['booking_cancelled', 'Venue booking cancelled'],
  ['dispute_opened', 'Real dispute opened'],
  ['dispute_resolved', 'Real dispute resolved'],
  ['revenue_verified', 'Actual received revenue reconciled'],
] as const;
type OutcomeType = typeof types[number][0];
type OutcomeRecord = {
  id: string; planner_request_id: string; venue_slug: string | null;
  outcome_type: OutcomeType; occurred_at: string; recorded_at: string;
  evidence_reference: string; amount_cents: number | null;
};
type Snapshot = {
  events: OutcomeRecord[];
  counts: Partial<Record<OutcomeType, number>>;
  verifiedReceivedCents: number;
  truncated: boolean;
  limitedToRecentRows: number;
};
type Planner = {
  id: string; company: string; group_size: number; city: string;
  provider_slugs: string[]; allow_provider_outreach: boolean;
  provider_outreach_consented_at: string | null; status: string;
};
const usd = (cents: number) => new Intl.NumberFormat('en-US',
  { style: 'currency', currency: 'USD' }).format(cents / 100);
const pretty = (iso: string) => new Date(iso).toLocaleString('en-US',
  { dateStyle: 'medium', timeStyle: 'short' });
const field = 'mt-2 min-h-11 w-full border border-border bg-background px-3 py-2 text-sm';

export function CorporateEventOutcomePanel({ accessKey }: { accessKey: string }) {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [leads, setLeads] = useState<Planner[]>([]);
  const [selectedLead, setSelectedLead] = useState('');
  const [venueSlug, setVenueSlug] = useState('');
  const [kind, setKind] = useState<OutcomeType>('quote_received');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function reload() {
    const [report, operations] = await Promise.all([
      getCorporateEventOutcomes({ data: { accessKey } }),
      getCorporateEventOperations({ data: { accessKey } }),
    ]);
    setSnapshot(report as Snapshot);
    setLeads((operations.leads as Planner[]).filter((lead) =>
      lead.allow_provider_outreach === true
      && Boolean(lead.provider_outreach_consented_at)
      && Array.isArray(lead.provider_slugs)
      && lead.provider_slugs.length > 0
      && lead.status !== 'spam'));
  }

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([
      getCorporateEventOutcomes({ data: { accessKey } }),
      getCorporateEventOperations({ data: { accessKey } }),
    ]).then(([report, operations]) => {
      if (!active) return;
      setSnapshot(report as Snapshot);
      setLeads((operations.leads as Planner[]).filter((lead) =>
        lead.allow_provider_outreach === true
        && Boolean(lead.provider_outreach_consented_at)
        && Array.isArray(lead.provider_slugs)
        && lead.provider_slugs.length > 0
        && lead.status !== 'spam'));
    }).catch(() => { if (active) setError('The restricted outcome report could not be loaded.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [accessKey]);

  const lead = leads.find((item) => item.id === selectedLead);
  const venueOptions = (lead?.provider_slugs || []).map((slug) =>
    ({ slug, title: corporateEventProviders.find((p) => p.slug === slug)?.name ?? slug }));
  const needsMoney = kind === 'revenue_verified';

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formNode = event.currentTarget;
    const form = new FormData(formNode);
    const timestamp = String(form.get('occurredAt') || '');
    const happened = new Date(timestamp);
    const amount = String(form.get('receivedDollars') || '').trim();
    if (!Number.isFinite(happened.getTime()) || happened.getTime() > Date.now()) {
      setError('Enter when the independently evidenced event actually happened, not a future date.');
      return;
    }
    if (needsMoney && !/^\\d{1,7}(?:\\.\\d{1,2})?$/.test(amount)) {
      setError('Enter the actual received USD amount with no more than two decimal places.');
      return;
    }
    const amountCents = needsMoney ? Math.round(Number(amount) * 100) : null;
    if (needsMoney && (!Number.isSafeInteger(amountCents) || (amountCents ?? 0) <= 0)) {
      setError('Only positive, actually received revenue can be reconciled.');
      return;
    }
    if (!selectedLead || !venueSlug || form.get('confirmIndependentEvidence') !== 'on') {
      setError('Choose a consented planner and a venue, then explicitly confirm independent evidence.');
      return;
    }
    setSaving(true); setError(''); setNotice('');
    try {
      await attestCorporateEventOutcome({ data: {
        accessKey, plannerRequestId: selectedLead, venueSlug,
        outcomeType: kind, occurredAt: happened.toISOString(),
        evidenceReference: String(form.get('evidenceReference') || '').trim(),
        amountCents, confirmIndependentEvidence: true,
      } });
      await reload();
      setNotice('Private historical evidence recorded. No venue contacted, booking made, agreement signed, payment collected or funds transferred.');
      formNode.reset();
    } catch {
      setError('Evidence could not be recorded. Verify real-world proof, exact venue consent, signed commercial permission, timing and duplicate references.');
    } finally { setSaving(false); }
  }

  return <section aria-labelledby="corporate-event-outcomes-title" className="mt-12 border-t-2 border-border pt-10">
    <p className="eyebrow text-primary">Restricted staff evidence ledger</p>
    <h2 id="corporate-event-outcomes-title" className="mt-3 font-display text-3xl">Quotes, referrals, bookings and actual revenue</h2>
    <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
      Record only independently confirmed historical outcomes with an internal evidence reference. A planning inquiry, click, draft, quote or reservation request is never counted as a booking or revenue. This console cannot contact partners, charge customers, create reservations or sign agreements.
    </p>
    {loading ? <p role="status" className="mt-4 text-sm">Loading private evidence…</p> : null}
    {snapshot ? <>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <OutcomeMetric label="Written quotes received (recent)" value={snapshot.counts.quote_received ?? 0} />
        <OutcomeMetric label="Bookings independently confirmed (recent)" value={snapshot.counts.booking_confirmed ?? 0} />
        <OutcomeMetric label="Disputes opened (recent)" value={snapshot.counts.dispute_opened ?? 0} />
        <OutcomeMetric label="Recorded received revenue (recent)" value={usd(snapshot.verifiedReceivedCents)} />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Counts are evidence-event totals for the most recent {snapshot.limitedToRecentRows} records, not unique customers or an all-time ledger.
        {snapshot.truncated ? ' Older records are excluded; these are partial figures.' : ''}
        {' '}Revenue is verified received money only; outbound link clicks are reported separately.
      </p>
    </> : null}
    {error ? <p role="alert" className="mt-4 border border-destructive p-4 text-sm">{error}</p> : null}
    {notice ? <p role="status" className="mt-4 border border-border p-4 text-sm">{notice}</p> : null}
    {snapshot && leads.length > 0 ? <form onSubmit={(event) => void submit(event)} className="mt-7 grid gap-4 border border-border bg-surface p-5 sm:grid-cols-2">
      <label className="text-sm font-semibold">Organizer (separately consented) *
        <select required value={selectedLead} onChange={(event) => { setSelectedLead(event.target.value); setVenueSlug(''); }} className={field}>
          <option value="">Choose an actual planner request</option>
          {leads.map((item) => <option key={item.id} value={item.id}>{item.company} · {item.group_size} guests · {item.city}</option>)}
        </select>
      </label>
      <label className="text-sm font-semibold">Explicitly selected venue *
        <select required disabled={!lead} value={venueSlug} onChange={(event) => setVenueSlug(event.target.value)} className={field}>
          <option value="">Select a consented venue</option>
          {venueOptions.map((venue) => <option key={venue.slug} value={venue.slug}>{venue.title}</option>)}
        </select>
      </label>
      <label className="text-sm font-semibold">Actual outcome *
        <select required value={kind} onChange={(event) => setKind(event.target.value as OutcomeType)} className={field}>
          {types.map(([value, title]) => <option value={value} key={value}>{title}</option>)}
        </select>
      </label>
      <label className="text-sm font-semibold">When this actually occurred (local) *
        <input required type="datetime-local" name="occurredAt" className={field} />
      </label>
      {needsMoney ? <label className="text-sm font-semibold sm:col-span-2">Actually received and reconciled USD *
        <input required name="receivedDollars" inputMode="decimal" placeholder="100.00" pattern="\\d+(?:\\.\\d{1,2})?" className={field} />
      </label> : null}
      <label className="text-sm font-semibold sm:col-span-2">Private independent evidence reference (20–500 characters) *
        <textarea required minLength={20} maxLength={500} name="evidenceReference" rows={3} className={field}
          placeholder="Describe the written provider confirmation, settled receipt, or case number. Do not paste passwords, full payment data, or customer correspondence." />
      </label>
      <label className="flex items-start gap-2 text-sm leading-6 sm:col-span-2">
        <input required type="checkbox" name="confirmIndependentEvidence" className="mt-1.5" />
        <span>I personally verified that this event already occurred, have independent evidence on file, and confirmed the planner's selected-venue consent and real signed partner authorization. No action is being taken by entering this record.</span>
      </label>
      <button disabled={saving} type="submit" className="min-h-11 border border-primary px-4 text-sm font-semibold text-primary disabled:opacity-50 sm:col-span-2">
        {saving ? 'Saving evidence…' : 'Record confirmed historical outcome only'}
      </button>
    </form> : snapshot ? <p className="mt-6 border border-border p-4 text-sm text-muted-foreground">
      No eligible organizer records with optional venue-specific sharing consent. Historical records may be reviewed, but new partner outcome attestations remain blocked.
    </p> : null}
    {snapshot?.events.length ? <div className="mt-9">
      <h3 className="font-display text-2xl">Recent private evidence events</h3>
      <div className="mt-4 space-y-3">
        {snapshot.events.map((item) => <article key={item.id} className="border border-border p-4 text-sm">
          <p className="font-semibold">{item.outcome_type.replaceAll('_', ' ')} · {item.venue_slug || 'Unknown venue'}</p>
          <p className="mt-1 text-xs text-muted-foreground">Occurred {pretty(item.occurred_at)} · Recorded {pretty(item.recorded_at)} · Request {item.planner_request_id}</p>
          {item.amount_cents != null ? <p className="mt-2 font-semibold">Actual receipts: {usd(item.amount_cents)}</p> : null}
          <p className="mt-2 whitespace-pre-wrap text-xs text-muted-foreground">Evidence: {item.evidence_reference}</p>
        </article>)}
      </div>
    </div> : null}
  </section>;
}

function OutcomeMetric({ label, value }: { label: string; value: number | string }) {
  return <article className="border border-border p-4"><strong className="font-display text-2xl">{value}</strong>
    <span className="mt-2 block text-xs text-muted-foreground">{label}</span></article>;
}
