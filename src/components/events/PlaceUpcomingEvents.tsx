import type { PlaceUpcomingEventPayload } from "@/data/event-place-links";

interface PlaceUpcomingEventsProps {
  entityKind: string;
  entityName: string;
  events: PlaceUpcomingEventPayload;
}

export function PlaceUpcomingEvents({ entityKind, events }: PlaceUpcomingEventsProps) {
  if (!events.count || !["city", "county", "metro-area"].includes(entityKind)) return null;
  return <div dangerouslySetInnerHTML={{ __html: events.html }} />;
}
