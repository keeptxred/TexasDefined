import type { Article } from "@/data/types";
import { COUNTY_SERIES_PROFILES } from "@/data/county-series-profiles";
import { COUNTY_SERIES_PROFILES_CONTINUED } from "@/data/county-series-profiles-continued";

const articlePromiseCache = new Map<string, Promise<Article | null>>();
const countySeriesProfiles = [...COUNTY_SERIES_PROFILES, ...COUNTY_SERIES_PROFILES_CONTINUED];

export function loadCountySeriesArticleServer(countySlug: string): Promise<Article | null> {
  const cached = articlePromiseCache.get(countySlug);
  if (cached) return cached;

  const countyProfile = countySeriesProfiles.find((item) => item.countySlug === countySlug);
  const promise = countyProfile?.loadArticle() ?? Promise.resolve(null);
  articlePromiseCache.set(countySlug, promise);
  return promise;
}
