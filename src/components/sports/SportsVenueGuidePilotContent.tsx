import { useEffect } from "react";

import type { TexasEventCarouselItem } from "@/components/editorial/TexasEventCarousel";
import { canonicalImageReference, imageReferencesMatch } from "@/data/image-reference-identity";
import type { TexasEntityRecord } from "@/data/knowledge-graph/types";
import type { ParkingMapAsset } from "@/data/parking-map-model";
import { getSportsVenueEnrichmentAll } from "@/data/sports-venue-enrichment-all";
import { getSportsVenueGuideGalaxy } from "@/data/sports-venue-guide-galaxy";
import { getSportsVenueGuidePilot } from "@/data/sports-venue-guide-pilots";
import { getSportsVenueGuideWave4 } from "@/data/sports-venue-guide-wave4";
import { getSportsVenueGuideWave5 } from "@/data/sports-venue-guide-wave5";
import { getSportsVenueGuideWave6 } from "@/data/sports-venue-guide-wave6";
import { getSportsVenueGuideWave7 } from "@/data/sports-venue-guide-wave7";
import { getSportsVenuePhoto } from "@/data/sports-venue-images-all";
import type { SportsVenueLanding } from "@/data/sports-venue-landings";
import type { PublicSportsSponsorPlacement } from "@/data/sports-sponsorship.types";

import { SportsVenueGuidePage } from "./SportsVenueGuidePage";

type StayNearbyWindow = Window & {
  TexasDefinedStayNearby?: {
    refresh?: () => void;
  };
};

export function SportsVenueGuidePilotContent({
  slug,
  entity,
  parkingMap,
  nearbyAttractions,
  upcomingEvents,
  eventCalendarHref,
  landingLinks,
  sponsorPlacement,
}: {
  slug: string;
  entity: TexasEntityRecord;
  parkingMap?: ParkingMapAsset;
  nearbyAttractions: readonly TexasEntityRecord[];
  upcomingEvents: readonly TexasEventCarouselItem[];
  eventCalendarHref: string;
  landingLinks?: readonly SportsVenueLanding[];
  sponsorPlacement?: PublicSportsSponsorPlacement | null;
}) {
  const guide = getSportsVenueGuideGalaxy(slug) ?? getSportsVenueGuideWave7(slug) ?? getSportsVenueGuideWave6(slug) ?? getSportsVenueGuideWave5(slug) ?? getSportsVenueGuideWave4(slug) ?? getSportsVenueGuidePilot(slug);

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
  const seenEventImageKeys = new Set<string>();
  const venueEvents: readonly TexasEventCarouselItem[] = upcomingEvents.map((event) => {
    if (!event.image) return event;

    const isDistinctFromVenueHero = !photo || (
      event.image?.url !== photo.imageUrl
      && event.image?.sourceUrl !== photo.sourcePage
      && !imageReferencesMatch(
        [event.image?.url, event.image?.sourceUrl],
        [photo.imageUrl, photo.sourcePage],
      )
    );
    const repeatsVenueHero = !isDistinctFromVenueHero;
    const imageKey = canonicalImageReference(event.image.url);
    const repeatsEventImage = Boolean(imageKey && seenEventImageKeys.has(imageKey));

    if (!repeatsVenueHero && !repeatsEventImage) {
      if (imageKey) seenEventImageKeys.add(imageKey);
      return event;
    }

    const { image: _duplicateVenueImage, ...eventWithoutDuplicateVenueImage } = event;
    return eventWithoutDuplicateVenueImage;
  });

  return (
    <SportsVenueGuidePage
      entity={verifiedEntity}
      guide={guide}
      enrichment={enrichment}
      photo={photo}
      parkingMap={parkingMap}
      nearbyAttractions={nearbyAttractions}
      upcomingEvents={venueEvents}
      eventCalendarHref={eventCalendarHref}
      landingLinks={landingLinks}
      sponsorPlacement={sponsorPlacement}
    />
  );
}

export default SportsVenueGuidePilotContent;
