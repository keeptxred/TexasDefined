import { useEffect } from "react";

import type { TexasEventCarouselItem } from "@/components/editorial/TexasEventCarousel";
import type { TexasEntityRecord } from "@/data/knowledge-graph/types";
import { getSportsVenueEnrichmentAll } from "@/data/sports-venue-enrichment-all";
import { getSportsVenueGuidePilot } from "@/data/sports-venue-guide-pilots";
import { getSportsVenueGuideWave4 } from "@/data/sports-venue-guide-wave4";
import { getSportsVenuePhoto } from "@/data/sports-venue-images";

import { SportsVenueGuidePage } from "./SportsVenueGuidePage";

type StayNearbyWindow = Window & {
  TexasDefinedStayNearby?: {
    refresh?: () => void;
  };
};

export default function SportsVenueGuidePilotContent({
  slug,
  entity,
  nearbyAttractions,
  upcomingEvents,
  eventCalendarHref,
}: {
  slug: string;
  entity: TexasEntityRecord;
  nearbyAttractions: readonly TexasEntityRecord[];
  upcomingEvents: readonly TexasEventCarouselItem[];
  eventCalendarHref: string;
}) {
  const guide = getSportsVenueGuideWave4(slug) ?? getSportsVenueGuidePilot(slug);

  useEffect(() => {
    const slot = document.querySelector("[data-stay-nearby-slot]");
    const surface = document.getElementById("expedia-travel-surface");
    if (slot && surface && surface.parentElement !== slot) surface.remove();
    (window as StayNearbyWindow).TexasDefinedStayNearby?.refresh?.();
  }, [slug]);

  if (!guide) return null;

  const rawEnrichment = getSportsVenueEnrichmentAll(slug);
  const enrichment = rawEnrichment
    ? {
        ...rawEnrichment,
        planningLinks: rawEnrichment.planningLinks.filter(
          (link) => !/facility (?:facts|page)/i.test(link.label) || link.url === guide.officialUrl,
        ),
      }
    : undefined;
  const verifiedEntity =
    guide.officialUrl && entity.officialUrl !== guide.officialUrl
      ? { ...entity, officialUrl: guide.officialUrl }
      : entity;
  const photo = getSportsVenuePhoto(slug);
  const venueEvents: readonly TexasEventCarouselItem[] = photo
    ? upcomingEvents.map((event) => {
        if (event.image?.url !== photo.imageUrl) return event;
        const { image: _duplicateVenueImage, ...eventWithoutDuplicateVenueImage } = event;
        return eventWithoutDuplicateVenueImage;
      })
    : upcomingEvents;

  return (
    <SportsVenueGuidePage
      entity={verifiedEntity}
      guide={guide}
      enrichment={enrichment}
      photo={photo}
      nearbyAttractions={nearbyAttractions}
      upcomingEvents={venueEvents}
      eventCalendarHref={eventCalendarHref}
    />
  );
}
