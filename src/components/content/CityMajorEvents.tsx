import { TexasEventCarousel, type TexasEventCarouselItem } from "@/components/editorial/TexasEventCarousel";

export function CityMajorEvents({
  cityName,
  events,
}: {
  cityName: string;
  events: readonly TexasEventCarouselItem[];
}) {
  if (!events.length) return null;

  return <div className="border-b border-border py-12">
    <TexasEventCarousel
      events={events}
      eyebrow="Major annual events"
      title={`Events worth planning around in ${cityName}`}
      viewAllHref={`/events?location=${encodeURIComponent(cityName)}`}
      emptyMessage={`No source-verified upcoming event guides are available for ${cityName} yet.`}
    />
  </div>;
}
