import { platform, scope } from '@/data';
import type { Article } from '@/data/types';

/**
 * Canonical binding between the Texas County Series editorial profiles and the
 * county entity pages that own them. County-series content is editorial data;
 * verified Census/government/reference data remains owned by county-profile
 * and local-government-profile.
 *
 * Future Texas County Series runs should add the generated article fixture and
 * one entry here. They must not create a second canonical /article page.
 */
export const COUNTY_EDITORIAL_ARTICLE_SLUGS = {
  brewster: 'brewster-county-big-bend-texas',
  presidio: 'presidio-county-marfa-borderlands-texas',
  'jeff-davis': 'jeff-davis-county-fort-davis-mountains-texas',
  culberson: 'culberson-county-van-horn-guadalupe-mountains-texas',
  hudspeth: 'hudspeth-county-sierra-blanca-salt-flats-texas',
  'el-paso': 'el-paso-county-missions-rio-grande-texas',
  reeves: 'reeves-county-pecos-balmorhea-texas',
  pecos: 'pecos-county-fort-stockton-comanche-springs-texas',
  ward: 'ward-county-monahans-sandhills-texas',
  winkler: 'winkler-county-kermit-wink-oil-texas',
  andrews: 'andrews-county-andrews-oil-shafter-lake-texas',
} as const satisfies Record<string, string>;

export type CountyEditorialSlug = keyof typeof COUNTY_EDITORIAL_ARTICLE_SLUGS;

const COUNTY_BY_ARTICLE_SLUG = Object.fromEntries(
  Object.entries(COUNTY_EDITORIAL_ARTICLE_SLUGS).map(([countySlug, articleSlug]) => [articleSlug, countySlug]),
) as Record<string, string>;

export async function loadCountyEditorial(countySlug: string): Promise<Article | null> {
  const articleSlug = COUNTY_EDITORIAL_ARTICLE_SLUGS[countySlug as CountyEditorialSlug];
  if (!articleSlug) return null;
  return platform.articles.getBySlug(scope, articleSlug);
}

export function countySlugForLegacyArticleSlug(articleSlug: string) {
  return COUNTY_BY_ARTICLE_SLUG[articleSlug] ?? null;
}

export function canonicalizeCountySeriesHref(href: string) {
  const match = href.match(/^\/article\/([^?#/]+)(.*)$/);
  if (!match) return href;
  const countySlug = countySlugForLegacyArticleSlug(match[1]);
  return countySlug ? `/county/${countySlug}${match[2] ?? ''}` : href;
}
