import { abileneAreaDestinationFallbacks } from "./abilene-area-destinations";
import { enrichAquariumMarineDestination } from "./aquarium-marine-destinations";
import { enrichCavernAreaGuide } from "./cavern-area-guides";
import { filterCurrentlyVisitableDestinations } from "./destination-availability";
import { filterSeoReadyDestinations, isSeoReadyDestination } from "./destination-audit";
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
import { selectSwimmingHoleAndTubingDestinations } from "./water-recreation";

const WATER_COLLECTION = "swimming-holes-river-tubing";
const RV_COLLECTION = "rv-parks";
const CAVERN_COLLECTION = "caverns";
const REMOTE_DESTINATION_TIMEOUT_MS = 3_000;

async function withDestinationRemoteTimeout<T>(label: string, operation: Promise<T>): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      operation,
      new Promise<T>((_resolve, reject) => {
        timer = setTimeout(() => reject(new Error(`${label} timed out after ${REMOTE_DESTINATION_TIMEOUT_MS}ms`)), REMOTE_DESTINATION_TIMEOUT_MS);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

function featuredFallback(destinations: Destination[], limit = 6) {
  return [...destinations]
    .sort((left, right) => {
      const leftScore = Number(Boolean(left.hero.credit)) + Number(Boolean(left.officialUrl)) + Number(Boolean(left.sourceCheckedAt)) + Math.min(left.highlights.length, 3);
      const rightScore = Number(Boolean(right.hero.credit)) + Number(Boolean(right.officialUrl)) + Number(Boolean(right.sourceCheckedAt)) + Math.min(right.highlights.length, 3);
      return rightScore - leftScore || left.name.localeCompare(right.name);
    })
    .slice(0, limit);
}

function normalizeDestinationCounty(destination: Destination): Destination {
  const county = destination.county?.replace(/\s+County$/i, "").trim();
  if (!county || county === destination.county) return destination;
  return { ...destination, county };
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

function mergeReadyCatalogs(primary: Destination[], fallback: Destination[]): Destination[] {
  const slugs = new Set(primary.map((destination) => destination.slug));
  return [...primary, ...fallback.filter((destination) => destination.slug && !slugs.has(destination.slug))];
}

function filterPreservedDestinations(rows: Destination[], query: Omit<DestinationQuery, "brandId">): Destination[] {
  if (query.category) rows = rows.filter((destination) => destination.category === query.category);
  if (query.featured !== undefined) rows = rows.filter((destination) => Boolean(destination.featured) === query.featured);
  return query.limit ? rows.slice(0, query.limit) : rows;
}

function preservedFor(query: Omit<DestinationQuery, "brandId">): Destination[] {
  return filterPreservedDestinations(preservedExploreDestinations, query);
}

function abilenePreservedFor(query: Omit<DestinationQuery, "brandId">): Destination[] {
  return filterPreservedDestinations(abileneAreaDestinationFallbacks, query);
}

async function loadCityPassDestinationExpansion(): Promise<Destination[]> {
  const { cityPassDestinationExpansion } = await import("./citypass-destination-expansion");
  return cityPassDestinationExpansion;
}

async function cityPassPreservedFor(query: Omit<DestinationQuery, "brandId">): Promise<Destination[]> {
  return filterPreservedDestinations(await loadCityPassDestinationExpansion(), query);
}

async function loadPublicCavernDestinationFallbacks(): Promise<Destination[]> {
  const [{ publicCavernDestinationFallbacks }, { cavernExpansionDestinations }] = await Promise.all([
    import("./public-cavern-destinations"),
    import("./cavern-destination-expansion"),
  ]);
  return mergeDestinations(publicCavernDestinationFallbacks, cavernExpansionDestinations);
}

async function cavernPreservedFor(query: Omit<DestinationQuery, "brandId">): Promise<Destination[]> {
  if (query.category && query.category !== CAVERN_COLLECTION) return [];
  return filterPreservedDestinations(await loadPublicCavernDestinationFallbacks(), query);
}

async function loadEnrichedCatalog(
  options: { featured?: boolean; category?: DestinationQuery["category"]; limit?: number },
  params: Omit<DestinationQuery, "brandId">,
): Promise<Destination[]> {
  try {
    let enriched = await withDestinationRemoteTimeout("Explore enrichment", fetchExploreDestinations(options));
    if (params.featured && !enriched.length) {
      const catalog = await withDestinationRemoteTimeout("Explore featured fallback catalog", fetchExploreDestinations({ category: params.category, limit: 5000 }));
      enriched = featuredFallback(catalog, params.limit ?? 6);
    }
    return enriched;
  } catch (error) {
    console.error("Explore enrichment unavailable; merging core and preserved catalogs", error);
    return [];
  }
}

async function loadCoreCatalog(
  options: { featured?: boolean; category?: DestinationQuery["category"]; limit?: number },
  params: Omit<DestinationQuery, "brandId">,
): Promise<Destination[]> {
  try {
    let core = await withDestinationRemoteTimeout("Core Explore catalog", fetchCoreExploreDestinations(options));
    if (params.featured && !core.length) {
      const catalog = await withDestinationRemoteTimeout("Core Explore featured fallback catalog", fetchCoreExploreDestinations({ category: params.category, limit: 5000 }));
      core = featuredFallback(catalog, params.limit ?? 6);
    }
    return core;
  } catch (error) {
    console.error("Core Explore remote catalog unavailable; merging preserved catalog", error);
    return [];
  }
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
  return normalizeDestinationCounty(
    enrichCavernAreaGuide(
      finishHistoricSiteEnrichment(
        improveDestinationQuality(
          applyAllCuratedDestination(
            enrichAquariumMarineDestination(
              applyExploreHeroAsset(
                applyStateParkHeroAsset(
                  applyDestinationHeroOverride(destination),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

function resolveSeoReadyDestination(destination?: Destination | null) {
  if (!destination) return undefined;
  const resolved = applyResolvedHero(destination);
  return isSeoReadyDestination(resolved) ? resolved : undefined;
}

function reconcileExploreCatalog(destinations: Destination[]) {
  const aquariumEnriched = reconcileDestinationHeroes(applyExploreHeroAssets(applyStateParkHeroAssets(destinations)))
    .map(enrichAquariumMarineDestination);
  const curated = improveDestinationCatalog(applyAllCuratedDestinations(aquariumEnriched));
  const improved = enrichHistoricSiteCatalog(curated)
    .map(enrichRemainingHistoricSiteAreaGuide)
    .map(enrichHistoricSiteRemoteHero)
    .map(enrichHistoricSiteEvergreenLinks)
    .map(applyHistoricSiteFactCorrections)
    .map(enrichNationalCemeteryDestination)
    .map(enrichCavernAreaGuide)
    .map(normalizeDestinationCounty);
  return filterSeoReadyDestinations(filterCurrentlyVisitableDestinations(improved));
}

export async function listResolvedDestinations(params: Omit<DestinationQuery, "brandId"> = {}) {
  if (params.category === WATER_COLLECTION) {
    const destinations = selectSwimmingHoleAndTubingDestinations(await listResolvedDestinations());
    if (params.featured) return featuredFallback(destinations, params.limit ?? 6);
    return params.limit ? destinations.slice(0, params.limit) : destinations;
  }

  if (params.category === RV_COLLECTION) {
    const { listRvParkDestinations } = await import("./rv-parks");
    const destinations = (await listRvParkDestinations()).map(normalizeDestinationCounty);
    if (params.featured) return featuredFallback(destinations, params.limit ?? 6);
    return params.limit ? destinations.slice(0, params.limit) : destinations;
  }

  const options = { featured: params.featured, category: params.category, limit: params.limit };
  const [enriched, core, cavernPreserved] = await Promise.all([
    loadEnrichedCatalog(options, params),
    loadCoreCatalog(options, params),
    cavernPreservedFor(params),
  ]);
  const local = await platform.destinations.list({ ...scope, ...params });
  const preserved = preservedFor(params);
  const abilenePreserved = abilenePreservedFor(params);
  const cityPassPreserved = await cityPassPreservedFor(params);
  const baseReady = reconcileExploreCatalog(mergeDestinations(enriched, core, preserved, local));
  const primaryReady = reconcileExploreCatalog(mergeDestinations(
    baseReady,
    abilenePreserved,
    cavernPreserved,
    cityPassPreserved,
  ));
  const fallbackReady = reconcileExploreCatalog(mergeDestinations(
    abilenePreserved,
    preserved,
    local,
    cavernPreserved,
    cityPassPreserved,
  ));
  const merged = mergeReadyCatalogs(primaryReady, fallbackReady);
  const scoped = params.category ? merged.filter((destination) => destination.category === params.category) : merged;
  if (params.featured) return featuredFallback(scoped, params.limit ?? 6);
  return params.limit ? scoped.slice(0, params.limit) : scoped;
}

export async function getResolvedDestination(slug: Slug) {
  const enrichedPromise = withDestinationRemoteTimeout("Explore destination enrichment", fetchExploreDestination(slug))
    .catch((error) => {
      console.error("Explore destination enrichment unavailable; checking other destination sources", error);
      return null;
    });
  const corePromise = withDestinationRemoteTimeout("Core Explore destination", fetchCoreExploreDestination(slug))
    .catch((error) => {
      console.error("Core Explore remote destination unavailable; checking preserved catalog", error);
      return null;
    });

  const weakCandidates: Destination[] = [];
  const enriched = await enrichedPromise;
  const readyEnriched = resolveSeoReadyDestination(enriched);
  if (readyEnriched) return readyEnriched;
  if (enriched) weakCandidates.push(enriched);

  const explicitAbileneFallback = abileneAreaDestinationFallbacks.find((destination) => destination.slug === slug);
  const readyAbileneFallback = resolveSeoReadyDestination(explicitAbileneFallback);
  if (readyAbileneFallback) return readyAbileneFallback;

  const core = await corePromise;
  const readyCore = resolveSeoReadyDestination(core);
  if (readyCore) return readyCore;
  if (core) weakCandidates.push(core);

  const { getRvParkDestination } = await import("./rv-parks");
  const rvPark = await getRvParkDestination(slug);
  if (rvPark) return applyResolvedHero(rvPark);

  const preserved = preservedExploreDestinations.find((destination) => destination.slug === slug);
  const readyPreserved = resolveSeoReadyDestination(preserved);
  if (readyPreserved) return readyPreserved;

  const cavernPreserved = (await loadPublicCavernDestinationFallbacks()).find((destination) => destination.slug === slug);
  const readyCavernPreserved = resolveSeoReadyDestination(cavernPreserved);
  if (readyCavernPreserved) return readyCavernPreserved;

  const cityPassPreserved = (await loadCityPassDestinationExpansion()).find((destination) => destination.slug === slug);
  const readyCityPassPreserved = resolveSeoReadyDestination(cityPassPreserved);
  if (readyCityPassPreserved) return readyCityPassPreserved;

  const local = await platform.destinations.getBySlug(scope, slug);
  const readyLocal = resolveSeoReadyDestination(local);
  if (readyLocal) return readyLocal;

  const fallback = preserved ?? cavernPreserved ?? cityPassPreserved;
  if (fallback) return applyResolvedHero(fallback);
  if (!local && weakCandidates.length) return applyResolvedHero(weakCandidates[0]);
  return local ? applyResolvedHero(local) : local;
}

export async function listResolvedDestinationSearchCatalog() {
  const [enriched, core, cavernFallbacks, cityPassFallbacks] = await Promise.all([
    withDestinationRemoteTimeout("Explore destination search catalog", fetchExploreDestinations({ limit: 5000 }))
      .catch((error) => {
        console.error("Enriched destination search index unavailable; merging core and preserved catalogs", error);
        return [] as Destination[];
      }),
    withDestinationRemoteTimeout("Core destination search catalog", fetchCoreExploreDestinations({ limit: 5000 }))
      .catch((error) => {
        console.error("Core remote destination search index unavailable; retaining preserved destinations", error);
        return [] as Destination[];
      }),
    loadPublicCavernDestinationFallbacks(),
    loadCityPassDestinationExpansion(),
  ]);
  const preservedSearchCatalog = reconcileExploreCatalog(mergeDestinations(enriched, core, preservedExploreDestinations));
  const primaryReady = reconcileExploreCatalog(mergeDestinations(
    preservedSearchCatalog,
    abileneAreaDestinationFallbacks,
    cavernFallbacks,
    cityPassFallbacks,
  ));
  const fallbackReady = reconcileExploreCatalog(mergeDestinations(
    abileneAreaDestinationFallbacks,
    preservedExploreDestinations,
    cavernFallbacks,
    cityPassFallbacks,
  ));
  return reconcileExploreCatalog(mergeReadyCatalogs(primaryReady, fallbackReady));
}
