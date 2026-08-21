import { texasLandscapeCatalog, texasLandscapeGuideCatalog } from './texas-landscape-catalog';
import { texasLandscapeGuides, texasLandscapes } from './texas-landscapes';

export function loadTexasLandscapeHubServer() {
  return {
    landscapes: texasLandscapeCatalog,
    guides: texasLandscapeGuideCatalog,
  };
}

export function loadTexasLandscapePageServer(slug: string) {
  const item = texasLandscapes.find((entry) => entry.slug === slug)
    ?? texasLandscapeGuides.find((entry) => entry.slug === slug)
    ?? null;

  if (!item) return null;

  return {
    item,
    nearby: 'name' in item
      ? texasLandscapeCatalog
        .filter((landscape) => landscape.slug !== item.slug)
        .slice(0, 6)
        .map(({ slug: nearbySlug, name, dek }) => ({ slug: nearbySlug, name, dek }))
      : [],
  };
}
