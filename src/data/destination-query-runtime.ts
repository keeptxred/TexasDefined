import { isOfficialTexasNpsDestination } from "./texas-national-park-service-directory";
import { isTexasStateParkDestination } from "./state-park-authority";
import { abileneAreaDestinationFallbacks } from "./abilene-area-destinations";
import { enrichAquariumMarineDestination } from "./aquarium-marine-destinations";
import { enrichCavernAreaGuide } from "./cavern-area-guides";
import { filterCurrentlyVisitableDestinations } from "./destination-availability";
import { filterSeoReadyDestinations, isSeoReadyDestination } from "./destination-audit";
import { applyAllCuratedDestination, applyAllCuratedDestinations } from "./destination-curation-all";
import { preservedExploreDestinations } from "./destination-preserved-catalog";
import { enforceFredericksburgJohnsonCityHeritageAuthority } from "./fredericksburg-johnson-city-heritage-destinations";
import { enrichMuseumMedia } from "./museum-authority-heroes";
import { improveDestinationCatalog, improveDestinationQuality } from "./destination-quality";
import { fetchCoreExploreDestination, fetchCoreExploreDestinations } from "./explore-core-remote";
import { applyDestinationHeroOverride, isDestinationPhotoPlaceholder, reconcileDestinationHeroes } from "./explore-hero-reconciliation";
import { applyExploreHeroAsset, applyExploreHeroAssets } from "./explore-heroes";
import { fetchExploreDestination, fetchExploreDestinations } from "./explore-remote";
import { enrichRemainingHistoricSiteAreaGuide } from "./historic-site-area-guides-extra";
import { enrichHistoricSiteCatalog, enrichHistoricSiteDestination } from "./historic-site-enrichment";
import { applyMagoffinHomeAuthority } from "./magoffin-home-authority";
import { enrichHistoricSiteEvergreenLinks } from "./historic-site-evergreen-links";
import { enrichTexasHistoricSiteAuthority } from "./historic-site-authority-2026";
import { enrichFullHistoricSiteAuthority } from "./historic-site-authority-full-catalog";
import { enrichResearchedHistoricSiteDepth } from "./historic-site-depth-all";
import { applyHistoricVisitorUpgrades20261019 } from "./historic-site-visitor-upgrades-20261019";
import { applyHistoricSiteFactCorrections } from "./historic-site-fact-corrections";
import { enrichHistoricSiteRemoteHero } from "./historic-site-remote-heroes";
import { enrichNationalCemeteryDestination } from "./national-cemetery-enrichment";
import { filterDestinationsByScope } from "./destination-query-scope";
import { correctDestinationTravelRegion } from "./destination-region-consistency";
import { applyTownAuthority } from "./town-authority-network";
import { platform, scope } from "./index";
import { applyStateParkHeroAsset, applyStateParkHeroAssets, recoverUniqueParkHeroesAfterGlobalReconciliation } from "./state-park-heroes";
import type { Destination, Slug } from "./types";
import type { DestinationQuery } from "./repositories";
import { selectSwimmingHoleAndTubingDestinations } from "./water-recreation";

const WATER_COLLECTION = "swimming-holes-river-tubing";
const RV_COLLECTION = "rv-parks";
const CAVERN_COLLECTION = "caverns";
const WACO_CURATED_ATTRACTION_SLUGS = new Set<Slug>([
  "cottonland-castle",
  "waco-suspension-bridge",
  "cameron-park-waco",
  "cameron-park-zoo",
]);
const REMOTE_DESTINATION_TIMEOUT_MS = 3_000;

type RemoteCatalogResult = {
  destinations: Destination[];
  failed: boolean;
};

async function withDestinationRemoteTimeout<T>(
  label: string,
  operation: Promise<T> | ((signal: AbortSignal) => Promise<T>),
): Promise<T> {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      typeof operation === "function" ? operation(controller.signal) : operation,
      new Promise<T>((_resolve, reject) => {
        timer = setTimeout(() => {
          // Multi-page callers must stop scheduling additional remote reads
          // once the caller has fallen back. Each in-flight fetch retains
          // its own shorter AbortSignal.timeout transport limit.
          controller.abort();
          reject(new Error(`${label} timed out after ${REMOTE_DESTINATION_TIMEOUT_MS}ms`));
        }, REMOTE_DESTINATION_TIMEOUT_MS);
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
  rows = filterDestinationsByScope(rows, query);
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

async function loadWacoDestinationExpansion(): Promise<Destination[]> {
  // Waco's researched attraction dossiers are loaded when queried, not in
  // the shared initial Explore client catalog.
  const { wacoViatorAttractionDestinations } = await import("./waco-viator-attraction-destinations");
  return wacoViatorAttractionDestinations;
}

async function wacoPreservedFor(query: Omit<DestinationQuery, "brandId">): Promise<Destination[]> {
  return filterPreservedDestinations(await loadWacoDestinationExpansion(), query);
}

async function enhanceWacoMuseumDestinations(rows: Destination[]): Promise<Destination[]> {
  if (!rows.some(({ slug }) => slug === "dr-pepper-museum-waco" || slug === "texas-ranger-hall-of-fame-museum-waco")) return rows;
  const { applyWacoMuseumAuthority } = await import("./waco-museum-authority-upgrades");
  return rows.map(applyWacoMuseumAuthority);
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
): Promise<RemoteCatalogResult> {
  try {
    let destinations = await withDestinationRemoteTimeout("Explore enrichment", (signal) => fetchExploreDestinations({ ...options, signal }));
    if (params.featured && !destinations.length) {
      const catalog = await withDestinationRemoteTimeout("Explore featured fallback catalog", (signal) => fetchExploreDestinations({ category: params.category, limit: 5000, signal }));
      destinations = featuredFallback(catalog, params.limit ?? 6);
    }
    return { destinations, failed: false };
  } catch (error) {
    console.error("Explore enrichment unavailable; merging core and preserved catalogs", error);
    return { destinations: [], failed: true };
  }
}

async function loadCoreCatalog(
  options: { featured?: boolean; category?: DestinationQuery["category"]; limit?: number },
  params: Omit<DestinationQuery, "brandId">,
): Promise<Destination[]> {
  try {
    let core = await withDestinationRemoteTimeout("Core Explore catalog", (signal) => fetchCoreExploreDestinations({ ...options, signal }));
    if (params.featured && !core.length) {
      const catalog = await withDestinationRemoteTimeout("Core Explore featured fallback catalog", (signal) => fetchCoreExploreDestinations({ category: params.category, limit: 5000, signal }));
      core = featuredFallback(catalog, params.limit ?? 6);
    }
    return core;
  } catch (error) {
    console.error("Core Explore remote catalog unavailable; merging preserved catalog", error);
    return [];
  }
}

function finishHistoricSiteEnrichment(destination: Destination) {
  const enriched = enrichNationalCemeteryDestination(
    applyHistoricSiteFactCorrections(
      enrichHistoricSiteEvergreenLinks(
        enrichHistoricSiteRemoteHero(
          enrichRemainingHistoricSiteAreaGuide(enrichHistoricSiteDestination(destination)),
        ),
      ),
    ),
  );
  return applyHistoricVisitorUpgrades20261019(enrichResearchedHistoricSiteDepth(enrichFullHistoricSiteAuthority(enrichTexasHistoricSiteAuthority(enriched))));
}

function applyResolvedHero(destination: Destination) {
  const curated = enforceFredericksburgJohnsonCityHeritageAuthority(applyTownAuthority(enrichMuseumMedia(normalizeDestinationCounty(
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
  ))));
  // Specialized editorial curators may reintroduce older remote JPEG heroes.
  // Resolve the approved exact-place local park photograph after all curators.
  return applyStateParkHeroAsset(curated);
}

function resolveSeoReadyDestination(destination?: Destination | null) {
  if (!destination) return undefined;
  const resolved = applyMagoffinHomeAuthority(correctDestinationTravelRegion(applyResolvedHero(destination)));
  return isSeoReadyDestination(resolved) ? resolved : undefined;
}

function reconcileExploreCatalog(destinations: Destination[]) {
  const aquariumEnriched = recoverUniqueParkHeroesAfterGlobalReconciliation(
    reconcileDestinationHeroes(applyExploreHeroAssets(applyStateParkHeroAssets(destinations))),
  ).map(enrichAquariumMarineDestination);
  const curated = improveDestinationCatalog(applyAllCuratedDestinations(aquariumEnriched));
  const historicEnriched = enrichHistoricSiteCatalog(curated)
    .map(enrichRemainingHistoricSiteAreaGuide)
    .map(enrichHistoricSiteRemoteHero)
    .map(enrichHistoricSiteEvergreenLinks)
    .map(applyHistoricSiteFactCorrections)
    .map(enrichNationalCemeteryDestination)
    .map(enrichTexasHistoricSiteAuthority)
    .map(enrichFullHistoricSiteAuthority)
    .map(enrichResearchedHistoricSiteDepth)
    .map(applyHistoricVisitorUpgrades20261019)
    .map(enrichCavernAreaGuide)
    .map(normalizeDestinationCounty)
    // Remote Explore results can still carry missing-image placeholders. Apply
    // subject-specific museum media before town/corridor authority overlays,
    // preserving their existing precedence and historic-site protections.
    .map(enrichMuseumMedia)
    .map(applyTownAuthority)
    .map(enforceFredericksburgJohnsonCityHeritageAuthority);
  const improved = historicEnriched.map(applyMagoffinHomeAuthority);
  // The collection renderer must apply the same post-curation exact-place rule
  // as the single destination page, not merely the preliminary photo map.
  return filterSeoReadyDestinations(filterCurrentlyVisitableDestinations(
    improved.map((destination) => applyStateParkHeroAsset(correctDestinationTravelRegion(destination))),
  ));
}

export async function listResolvedDestinations(params: Omit<DestinationQuery, "brandId"> = {}) {
  // A TPWD park may be editorially categorized as coastal, history, lake or outdoors.
  // Select from the already-filtered full catalog, never include RV-business aliases or closed parks.
  if (params.category === "state-parks") {
    const parks = filterDestinationsByScope(
      (await listResolvedDestinations()).filter(isTexasStateParkDestination),
      { region: params.region },
    ).sort((a, b) => a.name.localeCompare(b.name));
    if (params.featured) return featuredFallback(parks, params.limit ?? 6);
    return params.limit ? parks.slice(0, params.limit) : parks;
  }

  // NPS administers historic sites, seashores, monuments, rivers and trails in
  // multiple editorial categories. Keep this directory strictly NPS-owned.
  // Do not re-run the virtual category scope filter on those original records.
  if (params.category === "national-parks") {
    const destinations = filterDestinationsByScope(
      (await listResolvedDestinations()).filter(isOfficialTexasNpsDestination),
      { region: params.region },
    ).sort((a, b) => a.name.localeCompare(b.name));
    if (params.featured) return featuredFallback(destinations, params.limit ?? 6);
    return params.limit ? destinations.slice(0, params.limit) : destinations;
  }

  if (params.category === WATER_COLLECTION) {
    // This is a VIRTUAL cross-category collection: qualifying towns, state
    // parks and rivers retain their real categories. Reapplying the virtual
    // slug as an exact category filter drops EVERY selected destination.
    // Only the optional geographic region belongs in the final scope gate.
    const destinations = filterDestinationsByScope(
      selectSwimmingHoleAndTubingDestinations(await listResolvedDestinations()),
      { region: params.region },
    );
    if (params.featured) return featuredFallback(destinations, params.limit ?? 6);
    return params.limit ? destinations.slice(0, params.limit) : destinations;
  }

  if (params.category === RV_COLLECTION) {
    const { listRvParkDestinations } = await import("./rv-parks");
    const destinations = filterDestinationsByScope((await listRvParkDestinations()).map(normalizeDestinationCounty), params);
    if (params.featured) return featuredFallback(destinations, params.limit ?? 6);
    return params.limit ? destinations.slice(0, params.limit) : destinations;
  }

  const options = { featured: params.featured, category: params.category, limit: params.limit };
  const [enrichedResult, cavernPreserved] = await Promise.all([
    loadEnrichedCatalog(options, params),
    cavernPreservedFor(params),
  ]);
  const enriched = enrichedResult.destinations;
  // The enriched Explore source is authoritative. A successful empty response is
  // still authoritative; only an actual request failure activates the core view.
  const core = enrichedResult.failed ? await loadCoreCatalog(options, params) : [];
  const local = await platform.destinations.list({ ...scope, ...params });
  const preserved = preservedFor(params);
  const abilenePreserved = abilenePreservedFor(params);
  const [cityPassPreserved, wacoPreserved] = await Promise.all([cityPassPreservedFor(params), wacoPreservedFor(params)]);
  const baseReady = reconcileExploreCatalog(mergeDestinations(wacoPreserved, enriched, core, preserved, local));
  const primaryReady = reconcileExploreCatalog(mergeDestinations(
    baseReady,
    abilenePreserved,
    cavernPreserved,
    cityPassPreserved,
    wacoPreserved,
  ));
  const fallbackReady = reconcileExploreCatalog(mergeDestinations(
    abilenePreserved,
    preserved,
    local,
    cavernPreserved,
    cityPassPreserved,
    wacoPreserved,
  ));
  const merged = mergeReadyCatalogs(primaryReady, fallbackReady);
  const scoped = await enhanceWacoMuseumDestinations(filterDestinationsByScope(merged, params));
  if (params.featured) return featuredFallback(scoped, params.limit ?? 6);
  return params.limit ? scoped.slice(0, params.limit) : scoped;
}

async function getResolvedDestinationBase(slug: Slug) {
  if (slug === "davis-hill-state-park") return (await import("./davis-hill-authority-fallback")).davisHillFallback;
  // These four research-verified local authority records outrank a stale or
  // thin remote row sharing the same slug. Other destinations avoid the import.
  if (WACO_CURATED_ATTRACTION_SLUGS.has(slug)) {
    const curated = (await loadWacoDestinationExpansion()).find((destination) => destination.slug === slug);
    const readyCurated = resolveSeoReadyDestination(curated);
    if (readyCurated) return readyCurated;
  }
  const weakCandidates: Destination[] = [];
  let enrichedFailed = false;
  const enriched = await withDestinationRemoteTimeout("Explore destination enrichment", fetchExploreDestination(slug))
    .catch((error) => {
      enrichedFailed = true;
      console.error("Explore destination enrichment unavailable; checking other destination sources", error);
      return null;
    });
  const readyEnriched = resolveSeoReadyDestination(enriched);
  if (readyEnriched) return readyEnriched;
  if (enriched) weakCandidates.push(enriched);

  const explicitAbileneFallback = abileneAreaDestinationFallbacks.find((destination) => destination.slug === slug);
  const readyAbileneFallback = resolveSeoReadyDestination(explicitAbileneFallback);
  if (readyAbileneFallback) return readyAbileneFallback;

  const { getRvParkDestination } = await import("./rv-parks");
  const rvPark = await getRvParkDestination(slug);
  if (rvPark) return correctDestinationTravelRegion(applyResolvedHero(rvPark));

  const preserved = preservedExploreDestinations.find((destination) => destination.slug === slug);
  const readyPreserved = resolveSeoReadyDestination(preserved);
  if (readyPreserved) return readyPreserved;

  const wacoPreserved = WACO_CURATED_ATTRACTION_SLUGS.has(slug)
    ? (await loadWacoDestinationExpansion()).find((destination) => destination.slug === slug)
    : undefined;
  const readyWacoPreserved = resolveSeoReadyDestination(wacoPreserved);
  if (readyWacoPreserved) return readyWacoPreserved;

  const cavernPreserved = (await loadPublicCavernDestinationFallbacks()).find((destination) => destination.slug === slug);
  const readyCavernPreserved = resolveSeoReadyDestination(cavernPreserved);
  if (readyCavernPreserved) return readyCavernPreserved;

  const cityPassPreserved = (await loadCityPassDestinationExpansion()).find((destination) => destination.slug === slug);
  const readyCityPassPreserved = resolveSeoReadyDestination(cityPassPreserved);
  if (readyCityPassPreserved) return readyCityPassPreserved;

  const local = await platform.destinations.getBySlug(scope, slug);
  const readyLocal = resolveSeoReadyDestination(local);
  if (readyLocal) return readyLocal;

  // The core/public view is an outage fallback. Do not duplicate a successful
  // empty rich lookup, and prefer local/preserved sources before retrying the
  // same shared Supabase project during an outage.
  if (enrichedFailed) {
    const core = await withDestinationRemoteTimeout("Core Explore destination", fetchCoreExploreDestination(slug))
      .catch((error) => {
        console.error("Core Explore remote destination unavailable; retaining local fallbacks", error);
        return null;
      });
    const readyCore = resolveSeoReadyDestination(core);
    if (readyCore) return readyCore;
    if (core) weakCandidates.push(core);
  }

  const fallback = preserved ?? wacoPreserved ?? cavernPreserved ?? cityPassPreserved;
  if (fallback) return correctDestinationTravelRegion(applyResolvedHero(fallback));
  if (!local && weakCandidates.length) return correctDestinationTravelRegion(applyResolvedHero(weakCandidates[0]));
  return local ? correctDestinationTravelRegion(applyResolvedHero(local)) : local;
}

export async function getResolvedDestination(slug: Slug) {
  const resolved = await getResolvedDestinationBase(slug);
  if (!resolved) return resolved;
  return (await enhanceWacoMuseumDestinations([resolved]))[0];
}

export async function listResolvedDestinationSearchCatalog() {
  let enrichedFailed = false;
  const [enriched, cavernFallbacks, cityPassFallbacks, wacoFallbacks] = await Promise.all([
    withDestinationRemoteTimeout("Explore destination search catalog", (signal) => fetchExploreDestinations({ limit: 5000, signal }))
      .catch((error) => {
        enrichedFailed = true;
        console.error("Enriched destination search index unavailable; merging core and preserved catalogs", error);
        return [] as Destination[];
      }),
    loadPublicCavernDestinationFallbacks(),
    loadCityPassDestinationExpansion(),
    loadWacoDestinationExpansion(),
  ]);
  const core = enrichedFailed
    ? await withDestinationRemoteTimeout("Core destination search catalog", (signal) => fetchCoreExploreDestinations({ limit: 5000, signal }))
      .catch((error) => {
        console.error("Core remote destination search index unavailable; retaining preserved destinations", error);
        return [] as Destination[];
      })
    : [];
  const preservedSearchCatalog = reconcileExploreCatalog(mergeDestinations(wacoFallbacks, enriched, core, preservedExploreDestinations));
  const primaryReady = reconcileExploreCatalog(mergeDestinations(
    preservedSearchCatalog,
    abileneAreaDestinationFallbacks,
    cavernFallbacks,
    cityPassFallbacks,
    wacoFallbacks,
  ));
  const fallbackReady = reconcileExploreCatalog(mergeDestinations(
    abileneAreaDestinationFallbacks,
    preservedExploreDestinations,
    cavernFallbacks,
    cityPassFallbacks,
    wacoFallbacks,
  ));
  return enhanceWacoMuseumDestinations(reconcileExploreCatalog(mergeReadyCatalogs(primaryReady, fallbackReady)));
}
