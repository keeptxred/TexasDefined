import { useEffect } from "react";

import type { TexasEventCarouselItem } from "@/components/editorial/TexasEventCarousel";
import { canonicalImageReference, imageReferencesMatch } from "@/data/image-reference-identity";
import type { TexasEntityRecord } from "@/data/knowledge-graph/types";
import type { ParkingMapAsset } from "@/data/parking-map-model";
import { getSportsVenueEnrichmentAll, getSportsVenueQualityProfileAll } from "@/data/sports-venue-enrichment-all";
import { getSportsVenueGuideGalaxy } from "@/data/sports-venue-guide-galaxy";
import { getSportsVenueGuidePilot } from "@/data/sports-venue-guide-pilots";
import { getSportsVenueGuideWave4 } from "@/data/sports-venue-guide-wave4";
import { getSportsVenueGuideWave5 } from "@/data/sports-venue-guide-wave5";
import { getSportsVenueGuideWave6 } from "@/data/sports-venue-guide-wave6";
import { getSportsVenueGuideWave7 } from "@/data/sports-venue-guide-wave7";
import { getSportsVenuePhoto } from "@/data/sports-venue-images-all";
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
  sponsorPlacement,
}: {
  slug: string;
  entity: TexasEntityRecord;
  parkingMap?: ParkingMapAsset;
  nearbyAttractions: readonly TexasEntityRecord[];
  upcomingEvents: readonly TexasEventCarouselItem[];
  eventCalendarHref: string;
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

  const qualityProfile = getSportsVenueQualityProfileAll(slug);
  const visitorFacts = qualityProfile?.visitorFacts;
  const effectiveGuide = {
    ...guide,
    address: guide.address ?? visitorFacts?.address,
    capacity: guide.capacity ?? visitorFacts?.capacity,
    opened: guide.opened ?? visitorFacts?.opened,
    homeTeam: guide.homeTeam ?? (visitorFacts?.homeTeams.length ? visitorFacts.homeTeams.join(" · ") : undefined),
    playingSurface: guide.playingSurface ?? visitorFacts?.playingSurface,
    leagueOrConference: guide.leagueOrConference ?? visitorFacts?.leagueOrConference,
    accessibility: guide.accessibility ?? visitorFacts?.accessibility,
    bagPolicy: guide.bagPolicy ?? visitorFacts?.bagAndEntry,
    reviewedAt: guide.reviewedAt ?? qualityProfile?.sourceReview.reviewedAt,
  };
  const rawEnrichment = getSportsVenueEnrichmentAll(slug);
  const qualitySources = qualityProfile?.sourceReview.authoritativeSources ?? [];
  const enrichment = rawEnrichment
    ? {
        ...rawEnrichment,
        planningLinks: [...rawEnrichment.planningLinks, ...qualitySources]
          .filter((link, index, links) => links.findIndex((candidate) => candidate.url === link.url) === index)
          .filter(
            (link) => !/facility (?:facts|page)/i.test(link.label) || link.url === effectiveGuide.officialUrl,
          ),
      }
    : undefined;
  const verifiedEntity =
    effectiveGuide.officialUrl && entity.officialUrl !== effectiveGuide.officialUrl
      ? { ...entity, officialUrl: effectiveGuide.officialUrl }
      : entity;
  const photo = getSportsVenuePhoto(slug);
  const renderedPhoto = photo
    ? {
        ...photo,
        imageUrl: `/api/sports-venue-hero?slug=${encodeURIComponent(slug)}`,
      }
    : photo;
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
      guide={effectiveGuide}
      enrichment={enrichment}
      photo={renderedPhoto}
      parkingMap={parkingMap}
      nearbyAttractions={nearbyAttractions}
      upcomingEvents={venueEvents}
      eventCalendarHref={eventCalendarHref}
      sponsorPlacement={sponsorPlacement}
    />
  );
}

export default SportsVenueGuidePilotContent;
