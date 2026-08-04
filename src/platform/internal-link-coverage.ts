export type InternalLinkSurfaceStatus = 'active' | 'partial' | 'not-applicable' | 'planned';

export type InternalLinkSurface = {
  id: string;
  routePattern: string;
  family: 'articles' | 'destinations' | 'guides' | 'entities' | 'directories' | 'commerce' | 'admin';
  status: InternalLinkSurfaceStatus;
  implementation?: string;
  pageBudget?: number;
  notes: string;
};

export const INTERNAL_LINK_SURFACES: InternalLinkSurface[] = [
  { id:'articles', routePattern:'/article/$slug', family:'articles', status:'active', implementation:'ArticleBody + AutoEntityLinks', pageBudget:12, notes:'Paragraph and list text share a page-wide linked-entity set.' },
  { id:'destinations', routePattern:'/destination/$slug', family:'destinations', status:'active', implementation:'AutoEntityLinks', pageBudget:10, notes:'Body, highlights and nearest-town text exclude the current entity.' },
  { id:'property-tax-guides', routePattern:'/learn/* and /do/* property-tax cluster', family:'guides', status:'active', implementation:'PropertyTaxGuidePage', pageBudget:12, notes:'Shared guide template links intros, paragraphs and action steps.' },
  { id:'entity-pages', routePattern:'/$kind/$slug', family:'entities', status:'active', implementation:'AutoEntityLinks', pageBudget:8, notes:'Descriptions link related entities and prevent self-links.' },
  { id:'county-directory', routePattern:'/browse/counties', family:'directories', status:'not-applicable', notes:'Directory cards already contain intentional canonical links.' },
  { id:'city-directory', routePattern:'/browse/cities', family:'directories', status:'not-applicable', notes:'Directory cards already contain intentional canonical links.' },
  { id:'guide-index', routePattern:'/guides', family:'guides', status:'not-applicable', notes:'Index cards already provide explicit destination links.' },
  { id:'shop', routePattern:'/shop/*', family:'commerce', status:'not-applicable', notes:'Product descriptions are excluded from automatic editorial entity linking.' },
  { id:'admin', routePattern:'/admin/*', family:'admin', status:'not-applicable', notes:'Administrative pages are noindex and excluded from editorial linking.' },
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
