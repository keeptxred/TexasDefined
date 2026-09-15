import { prepareDestinationForDelivery } from "@/lib/editorial-image-delivery";
import {
  CANONICAL_PRIMARY_REGIONS,
  TEXAS_METROS,
  TEXAS_SUBREGIONS,
  canonicalPrimaryRegion,
  isCanonicalPrimaryRegionId,
} from "./canonical-geography";
import {
  TEXAS_PLACE_GEOGRAPHY,
  withCanonicalDestinationGeography,
} from "./geography-knowledge-graph";
import {
  CANONICAL_REGION_PRESENTATIONS,
  canonicalRegionPresentation,
} from "./canonical-region-presentation";

export function loadCanonicalRegionsIndexServer() {
  return CANONICAL_REGION_PRESENTATIONS.map((presentation) => {
    const region = canonicalPrimaryRegion(presentation.id);
    return {
      region,
      presentation,
      subregionCount: TEXAS_SUBREGIONS.filter((item) => item.primaryRegionId === region.id).length,
      metroCount: TEXAS_METROS.filter((item) => item.primaryRegionId === region.id).length,
      placeCount: TEXAS_PLACE_GEOGRAPHY.filter((item) => item.primaryRegionId === region.id).length,
    };
  });
}

export async function loadCanonicalRegionPageServer(regionId: string) {
  if (!isCanonicalPrimaryRegionId(regionId)) return null;

  const region = canonicalPrimaryRegion(regionId);
  const presentation = canonicalRegionPresentation(region.id);
  const subregions = TEXAS_SUBREGIONS.filter((item) => item.primaryRegionId === region.id);
  const metros = TEXAS_METROS.filter((item) => item.primaryRegionId === region.id);
  const places = TEXAS_PLACE_GEOGRAPHY.filter((item) => item.primaryRegionId === region.id);
  const countySlugs = [...new Set(places.flatMap((place) => place.countySlugs ?? []))].sort();
  const adjacent = region.adjacentRegionIds.map((id) => canonicalPrimaryRegion(id));

  const { listResolvedDestinations } = await import("./destination-query-runtime");
  const catalog = await listResolvedDestinations({ limit: 5000 });
  const destinations = catalog
    .map(prepareDestinationForDelivery)
    .map(withCanonicalDestinationGeography)
    .filter((destination) => destination.geography?.primaryRegionId === region.id)
    .map((destination) => ({
      slug: destination.slug,
      name: destination.name,
      category: destination.category,
      summary: destination.summary,
      county: destination.county,
      hero: destination.hero,
    }));

  return {
    region,
    presentation,
    subregions,
    metros,
    places,
    countySlugs,
    destinations,
    adjacent,
    allRegions: CANONICAL_PRIMARY_REGIONS,
  };
}
