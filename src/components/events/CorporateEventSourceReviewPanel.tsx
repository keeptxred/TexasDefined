import { corporateEventSourceReviewSchedule } from '@/data/corporate-event-source-review';

/**
 * A read-only editorial review queue. It does not fetch venue URLs, update
 * source evidence, change capacity, or approve a partner. Staff must check
 * the official source independently and commit a documented directory update.
 */
export function CorporateEventSourceReviewPanel() {
  const queue = corporateEventSourceReviewSchedule();
  const next = queue.items.slice(0, 24);
  return <section aria-labelledby="corporate-source-review-title" className="mt-10 border-t border-border pt-9">
    <p className="eyebrow text-primary">Editorial source governance</p>
    <h2 id="corporate-source-review-title" className="mt-3 font-display text-3xl">Venue details to reverify</h2>
    <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
      This queue uses each listing's last editorial verification date, not web scraping or a claim of current availability. Published prices, simultaneous capacity, closures and accessibility needs can change. Open the cited source, check all listed facts, and update the venue record with the date of an actual completed review. Do not advance a review date just by opening this page.
    </p>
    <dl className="mt-5 grid gap-3 sm:grid-cols-4">
      {([
        ['Directory entries', queue.total],
        ['Due or overdue', queue.overdue],
        ['Due within 14 days', queue.dueSoon],
        ['Invalid/future review evidence', queue.unverifiable],
      ] as const).map(([label, count]) =>
        <div key={label} className="border border-border p-4">
          <dt className="text-xs text-muted-foreground">{label}</dt>
          <dd className="mt-1 font-display text-2xl">{count}</dd>
        </div>)}
    </dl>
    <p className="mt-3 text-xs leading-6 text-muted-foreground">
      Calculated as of {queue.asOf} (Texas date). Next scheduled review: {queue.nextReviewDueOn ?? 'date unverified'}. Entries with a published starting price are due 30 days after the last checked source; other listings are due after 60 days. These are editorial review deadlines, not asserted venue facts.
    </p>
    <div className="mt-6 space-y-3">
      {next.map(item => <article key={item.provider.slug} className="border border-border p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold">{item.provider.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{item.provider.city} · {item.provider.area} · Last checked {item.lastVerifiedOn} · Due {item.dueOn}</p>
          </div>
          <span className="inline-flex min-h-8 items-center border border-border px-3 text-xs font-semibold">
            {item.status === 'unverifiable' ? 'Review evidence required' : item.status === 'overdue' ? 'Overdue'
              : item.status === 'due-soon' ? 'Due soon' : 'Scheduled'}
          </span>
        </div>
        <p className="mt-3 text-xs leading-6 text-muted-foreground">
          Latest directory claim: {item.provider.capacityDetail} ·
          {item.provider.startingPricePerPerson == null
            ? ' Pricing not published; quote required.'
            : ' Published starting price $' + item.provider.startingPricePerPerson + '/person; not an actual quote.'}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <a href={item.provider.sourceUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center border border-primary px-3 font-semibold text-primary">
            Check cited official source ↗
          </a>
          <a href={item.provider.officialUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center border border-border px-3 font-semibold">
            Official venue ↗
          </a>
        </div>
        <details className="mt-3">
          <summary className="cursor-pointer py-2 text-sm font-semibold">Official-source review checklist</summary>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-sm leading-6 text-muted-foreground">
            {item.reviewTopics.map(topic => <li key={topic}>{topic}</li>)}
          </ul>
        </details>
      </article>)}
    </div>
    {queue.total > next.length ? <p className="mt-4 text-sm text-muted-foreground">Showing the next {next.length} of {queue.total} editorial records; the due-date order is deterministic. This preview is intentionally capped to protect staff page performance.</p> : null}
    <p className="mt-4 text-xs leading-6 text-muted-foreground">No source verification, room availability, accessibility accommodation or corporate price has been established by viewing this queue. Listings remain independent editorial content and are not paid rankings.</p>
  </section>;
}
