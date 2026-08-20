import { topAttractionDestinations } from "./destination-curation-top-attractions";
import { topAttractionExpansionDestinations } from "./destination-curation-top-attractions-fallbacks";
import { isDestinationPhotoPlaceholder } from "./explore-hero-reconciliation";
import { legacyExploreDestinations } from "./fixtures/legacy-explore";
import { legacyLakeDestinations } from "./fixtures/legacy-lakes";
import { historicSiteDestinations } from "./historic-sites";
import { militaryHistoryDestinations } from "./military-history-destinations";
import type { Destination } from "./types";

function mergePreservedDestinations(...groups: Destination[][]): Destination[] {
  const merged = new Map<string, Destination>();
  for (const group of groups) {
    for (const destination of group) {
      if (!destination.slug) continue;
      const existing = merged.get(destination.slug);
      if (!existing) {
        merged.set(destination.slug, destination);
        continue;
      }
      const existingHasPlaceholder = isDestinationPhotoPlaceholder(existing.hero?.src);
      const incomingHasRealPhoto = !isDestinationPhotoPlaceholder(destination.hero?.src);
      if (existingHasPlaceholder && incomingHasRealPhoto) {
        merged.set(destination.slug, { ...existing, hero: destination.hero });
      }
    }
  }
  return [...merged.values()];
}

/**
 * Checked-in destination catalog used whenever remote Explore data is absent.
 * Keep runtime destination resolution, search and the Explore sitemap on this
 * single source so Google discovery cannot drift from pages the app can serve.
 * Top-25 expansion fallbacks are explicit here instead of relying on the
 * curation module's import-time mutation of topAttractionDestinations.
 */
export const preservedExploreDestinations = mergePreservedDestinations(
  topAttractionDestinations,
  topAttractionExpansionDestinations,
  legacyExploreDestinations,
  legacyLakeDestinations,
  historicSiteDestinations,
  militaryHistoryDestinations,
);