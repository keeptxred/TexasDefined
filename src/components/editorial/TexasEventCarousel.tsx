import { useId, useRef, type KeyboardEvent } from "react";

import type { TexasEventRecord } from "@/data/events/texas-event-record";

type TexasEventCarouselItem = TexasEventRecord & {
  categoryLabel: string;
  dateLabel: string;
  locationLabel: string;
  guideLabel: string;
  statusLabel: string;
  lastVerifiedLabel: string;
};

interface TexasEventCarouselProps {
  events: readonly TexasEventCarouselItem[];
  title?: string;
  eyebrow?: string;
  viewAllHref?: string;
  emptyMessage?: string;
}

export function TexasEventCarousel({ events, title = "Upcoming events", eyebrow = "On the calendar", viewAllHref = "/events", emptyMessage = "No source-verified upcoming events are available for this view yet." }: TexasEventCarouselProps) {
  const headingId = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: -1 | 1) => viewportRef.current?.scrollBy({ left: direction * Math.max(280, viewportRef.current.clientWidth * 0.9), behavior: "smooth" });
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); scroll(event.key === "ArrowLeft" ? -1 : 1); }
  };

  return <section className="ec" aria-labelledby={headingId}>
    <div className="ec-h"><div><p className="eyebrow ec-e">{eyebrow}</p><h2 id={headingId} className="ec-t">{title}</h2></div><div className="ec-a"><a href={viewAllHref} className="ec-l">View all events</a>{events.length > 1 && <div className="ec-c" aria-label="Event carousel controls"><button type="button" onClick={() => scroll(-1)} className="ec-b" aria-label="Previous events">←</button><button type="button" onClick={() => scroll(1)} className="ec-b" aria-label="Next events">→</button></div>}</div></div>
    {events.length ? <div ref={viewportRef} className="ec-v" tabIndex={0} role="region" aria-roledescription="carousel" aria-label={`${title} carousel`} onKeyDown={onKeyDown}>
      {events.map((event, index) => <article key={event.id} className="ec-card" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${events.length}: ${event.title}`}>
        {event.image?.displayAllowed && <><img src={event.image.url} alt={event.image.alt} className="ec-img" loading="lazy" decoding="async" /><p className="ec-cr">Photo: {event.image.credit ?? "licensed source"} · <a href={event.image.sourceUrl} target="_blank" rel="noreferrer noopener">source ↗</a>{event.image.licenseName && <> · {event.image.licenseUrl ? <a href={event.image.licenseUrl} target="_blank" rel="noreferrer noopener">{event.image.licenseName}</a> : event.image.licenseName}</>}</p></>}
        <div className="ec-body"><p className="eyebrow ec-e">{event.categoryLabel} · {event.dateLabel}</p><h3 className="ec-name"><a href={event.guidePath}>{event.title}</a></h3><p className="ec-loc">{event.locationLabel}</p>{event.statusLabel && <p className="ec-status">{event.statusLabel}</p>}<div className="ec-links"><a href={event.guidePath} className="ec-l">{event.guideLabel}</a><a href={event.officialEventUrl} target="_blank" rel="noreferrer noopener" className="ec-l">Official event site ↗</a>{event.venuePath && <a href={event.venuePath} className="ec-l">Venue guide</a>}</div><p className="ec-note">Last verified {event.lastVerifiedLabel}. Confirm event-day details with the official source before traveling.</p></div>
      </article>)}
    </div> : <p className="ec-empty">{emptyMessage}</p>}
  </section>;
}
