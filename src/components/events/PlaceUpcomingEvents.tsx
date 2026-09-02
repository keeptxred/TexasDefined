import type { PlaceUpcomingEventLink } from "@/data/event-place-links.server";

interface PlaceUpcomingEventsProps {
  entityKind: string;
  entityName: string;
  events: PlaceUpcomingEventLink[];
}

export function PlaceUpcomingEvents({ entityKind, entityName, events }: PlaceUpcomingEventsProps) {
  if (!events.length || !["city", "county", "metro-area"].includes(entityKind)) return null;

  const placeLabel = entityKind === "county" && !/ County$/i.test(entityName) ? `${entityName} County` : entityName;

  return <section className="border-b border-border py-10">
    <div className="grid gap-6 lg:grid-cols-[14rem_1fr] lg:items-start">
      <div>
        <p className="eyebrow text-primary">Upcoming events</p>
        <h2 className="mt-2 font-display text-3xl">Events in {placeLabel}</h2>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">Source-verified recurring events with permanent Texas Defined planning guides.</p>
      </div>
      <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
        {events.map((event) => <a key={event.href} href={event.href} className="group bg-background p-5">
          <span className="eyebrow text-primary">{eventCategoryLabel(event.category)}</span>
          <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{event.name}</strong>
          <span className="mt-3 block text-sm leading-6 text-muted-foreground">{event.detail}</span>
          <span className="mt-4 block text-sm font-semibold text-primary">Plan the event →</span>
        </a>)}
      </div>
    </div>
  </section>;
}

function eventCategoryLabel(category: PlaceUpcomingEventLink["category"]) {
  const labels: Record<PlaceUpcomingEventLink["category"], string> = {
    music: "Live music",
    food: "Food & drink",
    rodeo: "Rodeo & western",
    seasonal: "Seasonal tradition",
    sport: "Sports event",
    culture: "Arts & culture",
  };
  return labels[category];
}
