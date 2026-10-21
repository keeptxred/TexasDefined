import { useBrand } from "@/brand/context";
import { majorEventIndexRecords } from "@/data/major-event-index";
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

const permanentEventGuideSlugs = new Set([
  ...majorEventIndexRecords.map((event) => event.slug),
  "viva-el-paso",
  "texas-outdoor-musical",
]);
const legacyGuideSlugs: Record<string, string> = {
  "houston-livestock-rodeo": "houston-livestock-show-rodeo",
  "wurstfest-new-braunfels": "wurstfest",
};

function canonicalEventGuideSlug(slug: string): string | null {
  // Generated event instances append a date; send readers to the evergreen guide.
  const baseSlug = slug.replace(/-\d{4}-\d{2}-\d{2}$/, "");
  const canonical = legacyGuideSlugs[baseSlug] ?? baseSlug;
  return permanentEventGuideSlugs.has(canonical) ? canonical : null;
}

export function EventCard({ event, regionLabel }: { event: TexasEvent; regionLabel?: string | undefined }) {
  const brand = useBrand();
  const venueGuide = resolveSportsVenueEventLink(event.venue);
  const guideSlug = canonicalEventGuideSlug(event.slug);

  return (
    <article className="grid gap-4 border-t border-border py-7 sm:grid-cols-[9rem_1fr] sm:gap-7">
      <div>
        <p className="eyebrow text-primary">{EVENT_LABELS[event.category]}</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{formatDateRange(event.startDate, event.endDate, brand.identity.locale)}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.1em] text-muted-foreground">{event.city}{regionLabel ? ` · ${regionLabel}` : ""}</p>
      </div>
      <div>
        <h3 className="font-display text-2xl leading-tight">{event.name}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{event.blurb}</p>
        {venueGuide && <p className="mt-4 text-sm text-muted-foreground">Venue: <a href={venueGuide.href} className="border-b border-primary text-primary">{venueGuide.venueName} guide →</a></p>}
        <div className="flex flex-wrap gap-5">
          {guideSlug && <a href={`/event/${guideSlug}`} className="eyebrow mt-5 inline-flex border-b border-primary pb-1 text-primary">Texas Defined visitor guide →</a>}
          {event.officialUrl && <a href={event.officialUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-flex border-b border-primary pb-1 text-primary">Official event site ↗</a>}
          {venueGuide && <a href={venueGuide.href} className="eyebrow mt-5 inline-flex border-b border-primary pb-1 text-primary">Plan the venue →</a>}
        </div>
      </div>
    </article>
  );
}
