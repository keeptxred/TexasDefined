import { countySeasonalLinks } from '@/data/county-seasonal-links';
import { majorEventsForCounty } from '@/data/major-event-authority';
import { formatDateRange } from '@/domain/utils/format';

export function CountySeasonalPlanning({ countySlug, countyName }: { countySlug: string; countyName: string }) {
  const links = countySeasonalLinks(countySlug);
  const events = majorEventsForCounty(countySlug);
  if (!links.length && !events.length) return null;

  return <section className="border-b border-border py-12" aria-labelledby={`county-seasonal-${countySlug}`}>
    <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
      <div>
        <p className="eyebrow text-primary">Seasonal planning</p>
        <h2 id={`county-seasonal-${countySlug}`} className="mt-2 font-display text-4xl">When to plan {countyName}</h2>
      </div>
      <div>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground">Use current seasonal reports, verified annual-event dates and statewide planning guides before building a trip. Conditions and event schedules can change from year to year.</p>

        {events.length ? <div className="mt-8">
          <p className="eyebrow text-primary">Major annual events</p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {events.map((event) => <a key={event.slug} href={`/event/${event.slug}`} className="group border-t border-border pt-5">
              <strong className="block font-display text-2xl leading-tight group-hover:text-primary">{event.name}</strong>
              <span className="mt-2 block text-xs uppercase tracking-[0.1em] text-muted-foreground">{formatDateRange(event.startDate, event.endDate, 'en-US')} · {event.city}</span>
              <span className="mt-3 block text-sm leading-6 text-muted-foreground">{event.summary}</span>
            </a>)}
          </div>
        </div> : null}

        {links.length ? <div className="mt-8">
          {events.length ? <p className="eyebrow text-primary">Seasonal guides</p> : null}
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {links.map((link) => <a key={link.href} href={link.href} className="group border-t border-border pt-5">
              <strong className="block font-display text-2xl leading-tight group-hover:text-primary">{link.label}</strong>
              {link.description ? <span className="mt-3 block text-sm leading-6 text-muted-foreground">{link.description}</span> : null}
            </a>)}
          </div>
        </div> : null}
      </div>
    </div>
  </section>;
}
