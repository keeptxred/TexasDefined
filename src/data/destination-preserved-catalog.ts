import { aquariumMarineDestinations } from "./aquarium-marine-destinations";
import { topAttractionDestinations } from "./destination-curation-top-attractions";
import { topAttractionExpansionDestinations } from "./destination-curation-top-attractions-fallbacks";
import { isDestinationPhotoPlaceholder } from "./explore-hero-reconciliation";
import { legacyExploreDestinations } from "./fixtures/legacy-explore";
import { legacyLakeDestinations } from "./fixtures/legacy-lakes";
import { historicSiteDestinations } from "./historic-sites";
import { militaryHistoryDestinations } from "./military-history-destinations";
import { militaryMuseumDestinations } from "./military-museum-destinations";
import { austinMuseumDestinations } from "./museum-expansion-austin";
import { dfwMuseumDestinations } from "./museum-expansion-dfw";
import { georgeWBushMuseumDestinations } from "./museum-expansion-george-w-bush";
import { houstonGalvestonMuseumDestinations } from "./museum-expansion-houston-galveston";
import { sanAntonioMuseumDestinations } from "./museum-expansion-san-antonio";
import { sanAntonioContemporaryMuseumDestinations } from "./museum-expansion-san-antonio-contemporary";
import { statewideMuseumExpansionDestinations } from "./museum-expansion-statewide";
import { statewideMuseumExpansionWave2Destinations } from "./museum-expansion-statewide-wave2";
import { statewideMuseumExpansionWave3Destinations } from "./museum-expansion-statewide-wave3";
import { statewideMuseumExpansionWave4Destinations } from "./museum-expansion-statewide-wave4";
import { statewideMuseumExpansionWave5Destinations } from "./museum-expansion-statewide-wave5";
import { statewideMuseumExpansionWave6Destinations } from "./museum-expansion-statewide-wave6";
import { wacoMuseumDestinations } from "./museum-expansion-waco";
import type { Destination } from "./types";

const newBraunfelsSeasonalFallback: Destination = {
  id: "preserved-new-braunfels",
  brandId: "texasdefined",
  slug: "new-braunfels",
  name: "New Braunfels",
  summary: "A German-Texan Hill Country city built around the Comal and Guadalupe rivers, with tubing, historic neighborhoods, Gruene and strong access to Canyon Lake.",
  category: "small-towns",
  region: "hill-country",
  nearestTown: "New Braunfels",
  county: "Comal County",
  coordinates: { lat: 29.703, lng: -98.124 },
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Comal-county-courthouse2016-2(new-braunfels).jpg?width=1600",
    alt: "Historic Comal County Courthouse in downtown New Braunfels, Texas",
    width: 1600,
    height: 1128,
    credit: "Darrylpearson · Wikimedia Commons · CC BY-SA 4.0",
  },
  bestSeason: "Late spring through early fall for river recreation; fall through spring for town exploring",
  entryNote: "River rules, flows and tubing access change with weather and season. Check current city and outfitter information before planning a float.",
  highlights: ["Comal River", "Guadalupe River", "Gruene Historic District", "German-Texan heritage"],
  body: [
    "New Braunfels is defined by water as much as history. The Comal runs directly through town, while the Guadalupe creates a larger recreation corridor nearby.",
    "Gruene adds preserved architecture, live music and dining, and the city's German-Texan roots remain visible in festivals, food and historic sites.",
    "Check river conditions and local rules before arrival, especially after heavy rain or during peak summer weekends when parking and shuttle logistics matter.",
  ],
  officialUrl: "https://www.playinnewbraunfels.com/",
  sourceCheckedAt: "2026-08-24",
};

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
  aquariumMarineDestinations,
  topAttractionDestinations,
  topAttractionExpansionDestinations,
  legacyExploreDestinations,
  legacyLakeDestinations,
  historicSiteDestinations,
  militaryHistoryDestinations,
  militaryMuseumDestinations,
  houstonGalvestonMuseumDestinations,
  dfwMuseumDestinations,
  georgeWBushMuseumDestinations,
  austinMuseumDestinations,
  sanAntonioMuseumDestinations,
  sanAntonioContemporaryMuseumDestinations,
  wacoMuseumDestinations,
  statewideMuseumExpansionDestinations,
  statewideMuseumExpansionWave2Destinations,
  statewideMuseumExpansionWave3Destinations,
  statewideMuseumExpansionWave4Destinations,
  statewideMuseumExpansionWave5Destinations,
  statewideMuseumExpansionWave6Destinations,
  [newBraunfelsSeasonalFallback],
);
