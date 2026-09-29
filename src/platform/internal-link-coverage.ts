export type InternalLinkSurfaceStatus = 'active' | 'partial' | 'not-applicable' | 'planned';

export type InternalLinkSurface = {
  id: string;
  routePattern: string;
  family: 'articles' | 'destinations' | 'guides' | 'entities' | 'directories' | 'events' | 'fishing' | 'relocation' | 'commerce' | 'admin';
  status: InternalLinkSurfaceStatus;
  implementation?: string;
  pageBudget?: number;
  notes: string;
};

/**
 * Sitewide semantic-link coverage inventory.
 *
 * Keep this list tied to real, current routes. A surface may be marked active
 * only when its rendered experience contains intentional contextual or
 * navigational links to other canonical Texas Defined authority pages.
 * Redirect-only aliases belong to their canonical destination family and
 * should not be counted as separate coverage.
 */
export const INTERNAL_LINK_SURFACES: InternalLinkSurface[] = [
  { id:'articles', routePattern:'/article/$slug', family:'articles', status:'active', implementation:'ArticleBody + AutoEntityLinks', pageBudget:12, notes:'Paragraph and list text share a page-wide linked-entity set, with editorial provenance and related discovery.' },
  { id:'destinations', routePattern:'/destination/$slug', family:'destinations', status:'active', implementation:'AutoEntityLinks + DestinationRelationships', pageBudget:10, notes:'Canonical destination pages connect body copy, nearby places, relationship modules and planning pathways while excluding the current entity.' },
  { id:'property-tax-guides', routePattern:'/learn/* and /do/* property-tax cluster', family:'guides', status:'active', implementation:'PropertyTaxGuidePage', pageBudget:12, notes:'Shared guide templates connect intros, action steps, canonical county tax authority and official-resource pathways.' },
  { id:'entity-pages', routePattern:'/$kind/$slug', family:'entities', status:'active', implementation:'AutoEntityLinks + related entity modules', pageBudget:8, notes:'Knowledge-graph entity pages connect descriptions and relationship sections while preventing self-links; county entities receive additional local-authority modules.' },
  { id:'county-guides', routePattern:'/county and /county/$slug', family:'entities', status:'active', implementation:'CountyIndexPage + canonical county entity guides', notes:'The statewide county index links all 254 canonical county guides; county guides connect communities, property/service resources and related Texas authority pages.' },
  { id:'city-directory', routePattern:'/browse/cities', family:'directories', status:'active', implementation:'TexasPlaceDirectory', notes:'Each city row connects relocation research, its canonical county guide, salary comparison and cost-of-living tools rather than ending at a generic directory.' },
  { id:'county-directory', routePattern:'/browse/counties', family:'directories', status:'active', implementation:'TexasPlaceDirectory', notes:'All 254 county directory records link to canonical county references and official county resources, with broader planning pathways below the directory.' },
  { id:'event-guides', routePattern:'/event/$slug', family:'events', status:'active', implementation:'Major event authority related links', notes:'Major event guides expose sourced related-guide pathways and county context alongside official event sources and verified planning details.' },
  { id:'events-hub', routePattern:'/events', family:'events', status:'active', implementation:'EventsPage', notes:'The statewide events hub links major event guides, county discovery, event-type authority pages and adjacent Texas planning surfaces.' },
  { id:'guide-index', routePattern:'/guides', family:'guides', status:'active', implementation:'Guidebook index', notes:'Guide cards and contextual pathways intentionally route readers into canonical guide, destination, service and explanation clusters.' },
  { id:'fishing-hub', routePattern:'/fishing', family:'fishing', status:'active', implementation:'FishingHub', notes:'The fishing hub links lake guides, species, techniques, seasons, reports, access, regulations, guides and planning tools through crawlable contextual links.' },
  { id:'fishing-lake-guides', routePattern:'/fishing/lakes/$slug and section routes', family:'fishing', status:'active', implementation:'ShowcaseLakeGuide', notes:'Complete lake guides cross-link species, techniques, reports, guide sections, nearby lakes, access, regulations and verified services without paid ranking.' },
  { id:'fishing-species-guides', routePattern:'/fishing/species/$slug', family:'fishing', status:'active', implementation:'FishingSpeciesProfile', notes:'Species guides link verified lake relationships, technique applications, related species, reports, regulations and the lake finder.' },
  { id:'fishing-technique-guides', routePattern:'/fishing/techniques/$slug', family:'fishing', status:'active', implementation:'FishingTechniqueProfile', notes:'Technique guides link verified lake applications, target species, related techniques, habitat guides, reports and regulations.' },
  { id:'relocation-hub', routePattern:'/moving-to-texas', family:'relocation', status:'active', implementation:'MovingToTexasPage', notes:'The relocation hub links origin-state comparisons, city-pair comparisons, city guides, counties, jobs, calculators, data and first-month tools.' },
  { id:'relocation-state-comparisons', routePattern:'/texas-vs/$state', family:'relocation', status:'active', implementation:'TexasVsStatePage', notes:'State comparisons link official sources, related state comparisons, Texas city/county discovery and relocation calculators/checklists.' },
  { id:'relocation-city-comparisons', routePattern:'/compare-texas-cities/$pair', family:'relocation', status:'active', implementation:'CityPairPage', notes:'Major Texas city-pair pages link both metro guides, household-budget tools, related city matchups, counties, city discovery and the relocation hub.' },
  { id:'shop', routePattern:'/shop/*', family:'commerce', status:'not-applicable', notes:'Product descriptions are excluded from automatic editorial entity linking; commerce navigation is governed separately.' },
  { id:'admin', routePattern:'/admin/*', family:'admin', status:'not-applicable', notes:'Administrative pages are noindex and excluded from public editorial authority coverage.' },
];

export function internalLinkCoverageSummary() {
  const byStatus = INTERNAL_LINK_SURFACES.reduce<Record<InternalLinkSurfaceStatus, number>>((counts, surface) => {
    counts[surface.status] += 1;
    return counts;
  }, { active:0, partial:0, 'not-applicable':0, planned:0 });
  const eligible = INTERNAL_LINK_SURFACES.filter((surface) => !['not-applicable'].includes(surface.status));
  const active = eligible.filter((surface) => surface.status === 'active');
  return {
    totalSurfaces: INTERNAL_LINK_SURFACES.length,
    eligibleSurfaces: eligible.length,
    activeSurfaces: active.length,
    coveragePercent: eligible.length ? Math.round((active.length / eligible.length) * 100) : 100,
    byStatus,
  };
}
