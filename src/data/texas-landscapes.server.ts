import { texasLandscapeGuides, texasLandscapes } from './texas-landscapes';

export function loadTexasLandscapePageServer(slug: string) {
  return texasLandscapes.find((item) => item.slug === slug)
    ?? texasLandscapeGuides.find((item) => item.slug === slug)
    ?? null;
}
