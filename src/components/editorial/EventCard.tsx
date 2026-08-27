import { useBrand } from "@/brand/context";
import { resolveSportsVenueEventLink } from "@/data/sports-venue-event-links";
import type { TexasEvent } from "@/data/types";
import { formatDateRange } from "@/domain/utils/format";

const EVENT_LABELS: Record<TexasEvent["category"], string> = {
  music: "Live Music",
  food: "Food & Drink",
  rodeo: "Rodeo",
  seasonal: "Seasonal",
  sport: "Sports",
  culture: "Arts & Culture",
};

export function EventCard({ event, regionLabel }: { event: TexasEvent; regionLabel?: string | undefined }) {
  const brand = useBrand();
  const venueGuide = resolveSportsVenueEventLink(event.venue);
  const eventGuide = event.id.startsWith("authority:") ? `/event/${event.slug}` : undefined;

  return (
    <article className="grid gap-4 border-t border-border py-7 sm:grid-cols-[9rem_1fr] sm:gap-7">
      <div>
        <p className="eyebrow text-primary">{EVENT_LABELS[event.category]}</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{formatDateRange(event.startDate, event.endDate, brand.identity.locale)}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.1em] text-muted-foreground">{event.city}{regionLabel ? ` · ${regionLabel}` : ""}</p>
      </div>
      <div>
        <h3 className="font-display text-2xl leading-tight">{eventGuide ? <a href={eventGuide} className="hover:text-primary">{event.name}</a> : event.name}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{event.blurb}</p>
        {venueGuide && <p className="mt-4 text-sm text-muted-foreground">Venue: <a href={venueGuide.href} className="border-b border-primary text-primary">{venueGuide.venueName} guide →</a></p>}
        <div className="flex flex-wrap gap-5">
          {eventGuide && <a href={eventGuide} className="eyebrow mt-5 inline-flex border-b border-primary pb-1 text-primary">Plan this event →</a>}
          {event.officialUrl && <a href={event.officialUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-flex border-b border-primary pb-1 text-primary">Official details ↗</a>}
          {venueGuide && <a href={venueGuide.href} className="eyebrow mt-5 inline-flex border-b border-primary pb-1 text-primary">Plan the venue →</a>}
        </div>
      </div>
    </article>
  );
}
