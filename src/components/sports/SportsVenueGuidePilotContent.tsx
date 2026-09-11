import type { TexasEntityRecord } from "@/data/knowledge-graph/types";
import { getSportsVenueEnrichmentAll } from "@/data/sports-venue-enrichment-all";
import { getSportsVenueGuidePilot } from "@/data/sports-venue-guide-pilots";
import { getSportsVenuePhoto } from "@/data/sports-venue-images";

import { SportsVenueGuidePage } from "./SportsVenueGuidePage";

export default function SportsVenueGuidePilotContent({
  slug,
  entity,
  nearbyAttractions,
}: {
  slug: string;
  entity: TexasEntityRecord;
  nearbyAttractions: readonly TexasEntityRecord[];
}) {
  const guide = getSportsVenueGuidePilot(slug);
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

  return (
    <SportsVenueGuidePage
      entity={verifiedEntity}
      guide={guide}
      enrichment={enrichment}
      photo={getSportsVenuePhoto(slug)}
      nearbyAttractions={nearbyAttractions}
    />
  );
}
