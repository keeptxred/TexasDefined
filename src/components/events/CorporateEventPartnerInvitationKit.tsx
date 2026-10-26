import { useState } from 'react';
import { corporateEventProviders } from '@/data/corporate-events';
import { corporateEventPublicOperatorChannel } from '@/data/corporate-event-public-operator-channels';
import {
  prepareCorporateEventPartnerInvitation,
  type CorporateEventInvitationPurpose,
} from '@/data/corporate-event-partner-invitation';

export function CorporateEventPartnerInvitationKit() {
  const [city, setCity] = useState('Houston');
  const [venueSlug, setVenueSlug] = useState('');
  const [purpose, setPurpose] = useState<CorporateEventInvitationPurpose>('group-packages');
  const [message, setMessage] = useState('');
  const cities = [...new Set(corporateEventProviders.map(p => p.city))].sort((a,b) => a.localeCompare(b));
  const filtered = corporateEventProviders
    .filter(p => city === 'all' || p.city === city)
    .sort((a,b) => a.name.localeCompare(b.name));
  const provider = filtered.find(p => p.slug === venueSlug) ?? filtered[0] ?? null;
  const draft = provider ? prepareCorporateEventPartnerInvitation(provider, purpose) : null;
  // Verified public operator path opens only on an explicit staff click.
  // No planner contact information or drafted message is transmitted.
  const officialChannel = provider ? corporateEventPublicOperatorChannel(provider.slug) : null;

  async function copyDraft() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText('Subject: ' + draft.subject + '\n\n' + draft.body);
      setMessage('Invitation copied for your separate, manual review. This did not send an email or contact the venue.');
    } catch {
      setMessage('Clipboard unavailable. Select the draft text below to copy it manually. No email was sent.');
    }
  }

  return <section aria-labelledby="corporate-outreach-kit-title" className="mt-10 border-t border-border pt-9">
    <p className="eyebrow text-primary">Manual business development</p>
    <h2 id="corporate-outreach-kit-title" className="mt-2 font-display text-3xl">Invite verified venues to collaborate</h2>
    <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
      Prepare a source-grounded message to a real Texas event venue. This tool never guesses an email address, contacts businesses,
      records an outreach event, approves discounts, or represents a venue as a TexasDefined partner. Use the venue's official
      website to independently find the right business contact before sending anything yourself.
    </p>
    <div className="mt-5 grid gap-4 sm:grid-cols-3">
      <label className="grid gap-2 text-sm font-semibold">Venue city
        <select value={city} onChange={e => { setCity(e.target.value); setVenueSlug(''); setMessage(''); }}
          className="min-h-11 border border-border bg-background px-3 py-2 font-normal">
          <option value="all">All Texas venue cities</option>
          {cities.map(value => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold">Sourced venue
        <select value={provider?.slug ?? ''} onChange={e => { setVenueSlug(e.target.value); setMessage(''); }}
          className="min-h-11 border border-border bg-background px-3 py-2 font-normal">
          {filtered.map(value => <option key={value.slug} value={value.slug}>{value.name}</option>)}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold">First-contact goal
        <select value={purpose} onChange={e => { setPurpose(e.target.value as CorporateEventInvitationPurpose); setMessage(''); }}
          className="min-h-11 border border-border bg-background px-3 py-2 font-normal">
          <option value="group-packages">Verify corporate group packages</option>
          <option value="commercial-opportunities">Explore voluntary sponsorship or offers</option>
        </select>
      </label>
    </div>
    {draft && provider ? <>
      <div className="mt-5 flex flex-wrap gap-3 text-sm">
        <a className="inline-flex min-h-11 items-center border border-border px-4 font-semibold"
          href={officialChannel?.url ?? draft.officialUrl} target="_blank" rel="noopener noreferrer">{officialChannel ? 'Official venue event inquiry page ↗' : 'Official venue contact website ↗'}</a>
        <a className="inline-flex min-h-11 items-center border border-border px-4 font-semibold"
          href={draft.sourceUrl} target="_blank" rel="noopener noreferrer">Published source evidence ↗</a>
      </div>
      <label className="mt-5 grid gap-2 text-sm font-semibold">Invitation draft — staff review only; not sent
        <textarea readOnly rows={18} value={'Subject: ' + draft.subject + '\n\n' + draft.body}
          className="w-full resize-y border border-border bg-background p-4 text-sm font-normal leading-6" />
      </label>
      <button type="button" onClick={() => void copyDraft()}
        className="mt-4 min-h-11 border border-primary px-5 text-sm font-semibold text-primary">
        Copy unsent invitation
      </button>
      {message ? <p role="status" className="mt-3 text-sm text-muted-foreground">{message}</p> : null}
    </> : <p className="mt-5 text-sm text-muted-foreground">No sourced venues are available for this city.</p>}
    <details className="mt-6 border border-border p-5">
      <summary className="cursor-pointer text-base font-semibold">Before approving a real partner agreement or promo code</summary>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
        <li>Verify the authorized representative through the operator's official website or established phone channel.</li>
        <li>Confirm actual group capacity, date-specific availability, costs, accessibility, deposits and cancellation policies from current official terms.</li>
        <li>Get separately signed and dated permission for each scope: offers, quote forwarding, sponsorship, payment or commission arrangements.</li>
        <li>Confirm code eligibility, dates, redemption links and disclosures; never invent affiliate rates or publish unapproved discounts.</li>
        <li>Keep editorial rankings independent of sponsorship. Never forward a planner's contact information without that planner's specific opt-in.</li>
        <li>Record actual outreach, quotes, bookings and received cash only after independent supporting evidence exists.</li>
      </ul>
    </details>
  </section>;
}
