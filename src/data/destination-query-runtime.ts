import { enrichAquariumMarineDestination } from "./aquarium-marine-destinations";
import { filterCurrentlyVisitableDestinations } from "./destination-availability";
import { filterSeoReadyDestinations } from "./destination-audit";
import { applyAllCuratedDestination, applyAllCuratedDestinations } from "./destination-curation-all";
import { preservedExploreDestinations } from "./destination-preserved-catalog";
import { improveDestinationCatalog, improveDestinationQuality } from "./destination-quality";
import { fetchCoreExploreDestination, fetchCoreExploreDestinations } from "./explore-core-remote";
import { applyDestinationHeroOverride, isDestinationPhotoPlaceholder, reconcileDestinationHeroes } from "./explore-hero-reconciliation";
import { applyExploreHeroAsset, applyExploreHeroAssets } from "./explore-heroes";
import { fetchExploreDestination, fetchExploreDestinations } from "./explore-remote";
import { enrichRemainingHistoricSiteAreaGuide } from "./historic-site-area-guides-extra";
import { enrichHistoricSiteCatalog, enrichHistoricSiteDestination } from "./historic-site-enrichment";
import { enrichHistoricSiteEvergreenLinks } from "./historic-site-evergreen-links";
import { applyHistoricSiteFactCorrections } from "./historic-site-fact-corrections";
import { enrichHistoricSiteRemoteHero } from "./historic-site-remote-heroes";
import { enrichNationalCemeteryDestination } from "./national-cemetery-enrichment";
import { platform, scope } from "./index";
import { applyStateParkHeroAsset, applyStateParkHeroAssets } from "./state-park-heroes";
import type { Destination, Slug } from "./types";
import type { DestinationQuery } from "./repositories";

function featuredFallback(destinations: Destination[], limit = 6) {
  return [...destinations]
    .sort((left, right) => {
      const leftScore = Number(Boolean(left.hero.credit)) + Number(Boolean(left.officialUrl)) + Number(Boolean(left.sourceCheckedAt)) + Math.min(left.highlights.length, 3);
      const rightScore = Number(Boolean(right.hero.credit)) + Number(Boolean(right.officialUrl)) + Number(Boolean(right.sourceCheckedAt)) + Math.min(right.highlights.length, 3);
      return rightScore - leftScore || left.name.localeCompare(right.name);
    })
    .slice(0, limit);
}

function mergeDestinations(...groups: Destination[][]): Destination[] {
  const merged = new Map<string, Destination>();
  for (const group of groups) {
    for (const destination of group) {
      if (!destination.slug) continue;
      const existing = merged.get(destination.slug);
      if (!existing) { merged.set(destination.slug, destination); continue; }
      const existingHasPlaceholder = isDestinationPhotoPlaceholder(existing.hero?.src);
      const incomingHasRealPhoto = !isDestinationPhotoPlaceholder(destination.hero?.src);
      if (existingHasPlaceholder && incomingHasRealPhoto) merged.set(destination.slug, { ...existing, hero: destination.hero });
    }
  }
  return [...merged.values()];
}

function preservedFor(query: Omit<DestinationQuery, "brandId">): Destination[] {
  let rows = preservedExploreDestinations;
  if (query.category) rows = rows.filter((destination) => destination.category === query.category);
  if (query.featured !== undefined) rows = rows.filter((destination) => Boolean(destination.featured) === query.featured);
  return query.limit ? rows.slice(0, query.limit) : rows;
}

function finishHistoricSiteEnrichment(destination: Destination) {
  return enrichNationalCemeteryDestination(
    applyHistoricSiteFactCorrections(
      enrichHistoricSiteEvergreenLinks(
        enrichHistoricSiteRemoteHero(
          enrichRemainingHistoricSiteAreaGuide(enrichHistoricSiteDestination(destination)),
        ),
      ),
    ),
  );
}

function applyResolvedHero(destination: Destination) {
  return enrichAquariumMarineDestination(
    finishHistoricSiteEnrichment(
      improveDestinationQuality(
        applyAllCuratedDestination(
          applyExploreHeroAsset(
            applyStateParkHeroAsset(
              applyDestinationHeroOverride(destination),
            ),
          ),
        ),
      ),
    ),
  );
}

function reconcileExploreCatalog(destinations: Destination[]) {
  const curated = improveDestinationCatalog(applyAllCuratedDestinations(reconcileDestinationHeroes(applyExploreHeroAssets(applyStateParkHeroAssets(destinations)))));
  const improved = enrichHistoricSiteCatalog(curated)
    .map(enrichRemainingHistoricSiteAreaGuide)
    .map(enrichHistoricSiteRemoteHero)
    .map(enrichHistoricSiteEvergreenLinks)
    .map(applyHistoricSiteFactCorrections)
    .map(enrichNationalCemeteryDestination)
    .map(enrichAquariumMarineDestination);
  return filterSeoReadyDestinations(filterCurrentlyVisitableDestinations(improved));
}

export async function listResolvedDestinations(params: Omit<DestinationQuery, "brandId"> = {}) {
  const options = { featured: params.featured, category: params.category, limit: params.limit };
  let enriched: Destination[] = [];
  let core: Destination[] = [];
  try {
    enriched = await fetchExploreDestinations(options);
    if (params.featured && !enriched.length) {
      const catalog = await fetchExploreDestinations({ category: params.category, limit: 5000 });
      enriched = featuredFallback(catalog, params.limit ?? 6);
    }
  } catch (error) { console.error("Explore enrichment unavailable; merging core and preserved catalogs", error); }
  try {
    core = await fetchCoreExploreDestinations(options);
    if (params.featured && !core.length) {
      const catalog = await fetchCoreExploreDestinations({ category: params.category, limit: 5000 });
      core = featuredFallback(catalog, params.limit ?? 6);
    }
  } catch (error) { console.error("Core Explore remote catalog unavailable; merging preserved catalog", error); }
  const local = await platform.destinations.list({ ...scope, ...params });
  const preserved = preservedFor(params);
  const merged = reconcileExploreCatalog(mergeDestinations(enriched, core, preserved, local));
  const scoped = params.category ? merged.filter((destination) => destination.category === params.category) : merged;
  if (params.featured) return featuredFallback(scoped, params.limit ?? 6);
  return params.limit ? scoped.slice(0, params.limit) : scoped;
}

export async function getResolvedDestination(slug: Slug) {
  try { const enriched = await fetchExploreDestination(slug); if (enriched) return applyResolvedHero(enriched); }
  catch (error) { console.error("Explore destination enrichment unavailable; retrying core remote record", error); }
  try { const core = await fetchCoreExploreDestination(slug); if (core) return applyResolvedHero(core); }
  catch (error) { console.error("Core Explore remote destination unavailable; retrying preserved catalog", error); }
  const preserved = preservedExploreDestinations.find((destination) => destination.slug === slug);
  if (preserved) return applyResolvedHero(preserved);
  const local = await platform.destinations.getBySlug(scope, slug);
  return local ? applyResolvedHero(local) : local;
}

export async function listResolvedDestinationSearchCatalog() {
  let enriched: Destination[] = [];
  let core: Destination[] = [];
  try { enriched = await fetchExploreDestinations({ limit: 5000 }); }
  catch (error) { console.error("Enriched destination search index unavailable; merging core and preserved catalogs", error); }
  try { core = await fetchCoreExploreDestinations({ limit: 5000 }); }
  catch (coreError) { console.error("Core remote destination search index unavailable; retaining preserved destinations", coreError); }
  return reconcileExploreCatalog(mergeDestinations(enriched, core, preservedExploreDestinations));
}
