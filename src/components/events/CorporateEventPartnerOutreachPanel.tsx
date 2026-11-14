import { useEffect, useState, type FormEvent } from 'react';
import { corporateEventProviders } from '@/data/corporate-events';
import { attestCorporateVenueOutreach, getCorporateVenueOutreach } from '@/data/corporate-event-partner-outreach.functions';

type OutreachEvent = {
  id: string; provider_slug: string; contact_kind: string; occurred_at: string;
  evidence_key: string; evidence_reference: string; followup_on: string | null; recorded_at: string;
};
type OutreachSnapshot = {
  events: OutreachEvent[]; truncated: boolean; maxDisplayed: number;
  followupsDueInVisibleRows: number; dueFollowupEventIds: string[];
  dueFollowupEvents: OutreachEvent[]; followupsDueInReviewedHistory: number;
  followupHistoryExhaustive: boolean; followupHistoryRecordsReviewed: number;
  today: string; disclosure: string;
};
const kinds = [
  {value:'initial_contact',label:'First actual venue contact'},
  {value:'partner_reply',label:'Received real business reply'},
  {value:'meeting_held',label:'Business meeting actually held'},
  {value:'package_received',label:'Received actual written group package'},
  {value:'declined',label:'Venue declined participation'},
] as const;
const PAGE_SIZE = 20;

/** Staff-only evidence. No user email, quoted offer, vendor API or payments. */
export function CorporateEventPartnerOutreachPanel({ accessKey }: { accessKey: string }) {
  const [snapshot, setSnapshot] = useState<OutreachSnapshot | null>(null);
  const [city, setCity] = useState('Houston');
  const [venueSlug, setVenueSlug] = useState('');
  const [kind, setKind] = useState<(typeof kinds)[number]['value']>('initial_contact');
  const [occurredAt, setOccurredAt] = useState('');
  const [evidenceKey, setEvidenceKey] = useState('');
  const [evidenceReference, setEvidenceReference] = useState('');
  const [followupOn, setFollowupOn] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [show, setShow] = useState<'all' | 'followup' | 'venue'>('all');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const cityOptions = [...new Set(corporateEventProviders.map(provider=>provider.city))]
    .sort((a,b)=>a.localeCompare(b));
  const providers = corporateEventProviders.filter(provider=>provider.city===city)
    .sort((a,b)=>a.name.localeCompare(b.name));
  const provider = providers.find(item=>item.slug===venueSlug) ?? providers[0] ?? null;
  const providerBySlug = new Map(corporateEventProviders.map(item=>[item.slug,item]));

  async function refresh() {
    const result = await getCorporateVenueOutreach({ data: { accessKey } });
    setSnapshot(result as OutreachSnapshot);
  }
  useEffect(()=>{
    let active=true;
    getCorporateVenueOutreach({ data: { accessKey } }).then(data=>{
      if(active) setSnapshot(data as OutreachSnapshot);
    }).catch(()=>{
      if(active) setError('Private venue outreach evidence is unavailable. No contact was recorded.');
    }).finally(()=>{if(active) setLoading(false);});
    return ()=>{active=false;};
  },[accessKey]);

  async function recordActualContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!provider || !confirmed || busy) return;
    const instant = new Date(occurredAt);
    if (!Number.isFinite(instant.getTime())) {
      setError('Enter the actual date and time of a completed venue interaction.'); return;
    }
    setBusy(true);setError('');setMessage('');
    try {
      await attestCorporateVenueOutreach({data:{
        accessKey,venueSlug:provider.slug,contactKind:kind,occurredAt:instant.toISOString(),
        evidenceKey,evidenceReference,followupOn:followupOn||null,
        independentlyVerifiedActualContact:true,
      }});
      await refresh();
      setEvidenceKey('');setEvidenceReference('');setFollowupOn('');setOccurredAt('');
      setConfirmed(false);setPage(0);
      setMessage('Independent real-world venue contact evidence recorded. No invitation was sent, no partner approved and no booking made.');
    }catch{
      setError('Evidence was not saved. Confirm the genuine external reference is unique, the event date is real and the private database is available.');
    }finally{setBusy(false);}
  }

  const dueFollowupIds = new Set(snapshot?.dueFollowupEventIds??[]);
  const sourceRows = show==='followup' ? (snapshot?.dueFollowupEvents??[]) : (snapshot?.events??[]);
  const matching=sourceRows.filter(row=>
    show==='all'
    || (show==='followup' && dueFollowupIds.has(row.id))
    || (show==='venue' && row.provider_slug===provider?.slug));
  const lastPage=Math.max(0,Math.ceil(matching.length/PAGE_SIZE)-1);
  const currentPage=Math.min(page,lastPage);
  const visible=matching.slice(currentPage*PAGE_SIZE,(currentPage+1)*PAGE_SIZE);

  return <section className="mt-10 border-t border-border pt-9" aria-labelledby="corporate-venue-outreach-title">
    <p className="eyebrow text-primary">Verified manual business development</p>
    <h2 id="corporate-venue-outreach-title" className="mt-2 font-display text-3xl">Real venue conversations and follow-ups</h2>
    <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
      Document an interaction only after you actually contacted a venue, received a business reply, held a meeting or received a written package. Copying an unsent invitation is not contact. Only authorized staff can read these private records. An entry does not approve sponsorships, signed agreements, discount codes, referral payments or reservations.
    </p>
    <form className="mt-6 grid gap-4 border border-border p-5" onSubmit={event=>void recordActualContact(event)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">Business city
          <select value={city} onChange={event=>{setCity(event.target.value);setVenueSlug('');setPage(0);}}
            className="min-h-11 border border-border bg-background px-3 py-2 font-normal">
            {cityOptions.map(value=><option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">Actual sourced venue
          <select value={provider?.slug??''} onChange={event=>{setVenueSlug(event.target.value);setPage(0);}}
            className="min-h-11 border border-border bg-background px-3 py-2 font-normal">
            {providers.map(value=><option key={value.slug} value={value.slug}>{value.name}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">Real interaction
          <select value={kind} onChange={event=>setKind(event.target.value as (typeof kinds)[number]['value'])}
            className="min-h-11 border border-border bg-background px-3 py-2 font-normal">
            {kinds.map(value=><option key={value.value} value={value.value}>{value.label}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">Actual event date and time (your local clock)
          <input type="datetime-local" required value={occurredAt} onChange={event=>setOccurredAt(event.target.value)}
            className="min-h-11 border border-border bg-background px-3 py-2 font-normal" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">Actual external message, call-log, meeting or document ID
          <input type="text" required minLength={6} maxLength={120} value={evidenceKey}
            onChange={event=>setEvidenceKey(event.target.value)} placeholder="Enter a genuine, unique external reference"
            className="min-h-11 border border-border bg-background px-3 py-2 font-normal" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">Next manual follow-up day (optional)
          <input type="date" value={followupOn} onChange={event=>setFollowupOn(event.target.value)}
            className="min-h-11 border border-border bg-background px-3 py-2 font-normal" />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold">Where staff can independently verify this interaction
        <textarea value={evidenceReference} onChange={event=>setEvidenceReference(event.target.value)}
          minLength={20} maxLength={500} required rows={3}
          placeholder="Identify the channel and location of actual external evidence. Never paste the message body, customer's personal details, passwords or payment information."
          className="w-full border border-border bg-background p-3 font-normal" />
      </label>
      <label className="flex items-start gap-3 text-sm leading-6">
        <input type="checkbox" required checked={confirmed} onChange={event=>setConfirmed(event.target.checked)} className="mt-1" />
        I independently checked an actual completed venue communication, not a planned outreach or copied draft, and have a real external reference.
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={busy||!provider||!confirmed}
          className="min-h-11 border border-primary px-5 text-sm font-semibold text-primary disabled:opacity-50">
          {busy?'Recording evidence…':'Record actual external contact'}
        </button>
        {provider ? <a href={provider.officialUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center border border-border px-4 text-sm font-semibold">Official business site ↗</a>:null}
      </div>
      {message ? <p role="status" className="text-sm text-muted-foreground">{message}</p>:null}
      {error ? <p role="alert" className="text-sm text-destructive">{error}</p>:null}
    </form>
    <div className="mt-8">
      <h3 className="font-display text-2xl">Recently evidenced business activity</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{snapshot?.disclosure??'Only staff-entered, genuine interactions will appear after the private database is available.'}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        {loading?'Loading private evidence…':`Visible recent records: ${snapshot?.events.length??0}; due venue follow-ups from latest visible interaction: ${snapshot?.followupsDueInVisibleRows??0}; due in reviewed venue history: ${snapshot?.followupsDueInReviewedHistory??0} (${snapshot?.followupHistoryExhaustive?'complete as of this read':'INCOMPLETE history'}; ${snapshot?.followupHistoryRecordsReviewed??0} events reviewed).`}
        {snapshot?.truncated?' Older interactions are outside the recent activity view; due follow-ups are separately checked against older records when the scan is complete.':null}
      </p>
      <label className="mt-4 inline-grid gap-2 text-sm font-semibold">View private contact evidence
        <select value={show} onChange={event=>{setShow(event.target.value as typeof show);setPage(0);}}
          className="min-h-11 border border-border bg-background px-3 py-2 font-normal">
          <option value="all">All recent real interactions</option>
          <option value="followup">Due follow-ups (latest venue interaction across reviewed history)</option>
          <option value="venue">Selected venue only</option>
        </select>
      </label>
      <div className="mt-5 space-y-3">
        {visible.map(row=><article key={row.id} className="border border-border p-4">
          <p className="text-sm font-semibold">{providerBySlug.get(row.provider_slug)?.name??'Directory venue not found'} · {row.contact_kind.replace(/_/g,' ')}</p>
          <p className="mt-1 text-xs text-muted-foreground">Actual interaction: {row.occurred_at} · Follow-up: {row.followup_on??'Not scheduled'}</p>
          <p className="mt-2 text-xs text-muted-foreground">External proof key: {row.evidence_key}</p>
          <p className="mt-1 text-xs leading-6 text-muted-foreground">{row.evidence_reference}</p>
        </article>)}
        {!visible.length&&!loading?<p className="border border-dashed border-border p-5 text-sm text-muted-foreground">No independently recorded venue interactions match this view. No commercial activity is implied.</p>:null}
      </div>
      {matching.length>PAGE_SIZE?<nav aria-label="Venue outreach evidence pages" className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" disabled={currentPage===0} onClick={()=>setPage(currentPage-1)}
          className="min-h-11 border border-border px-4 text-sm disabled:opacity-40">Previous</button>
        <span aria-live="polite" className="text-sm text-muted-foreground">Page {currentPage+1} of {lastPage+1}</span>
        <button type="button" disabled={currentPage>=lastPage} onClick={()=>setPage(currentPage+1)}
          className="min-h-11 border border-border px-4 text-sm disabled:opacity-40">Next</button>
      </nav>:null}
    </div>
  </section>;
}
