import type { Article } from "@/data/types";
import { COUNTY_SERIES_PROFILES } from "@/data/county-series-profiles";
import { COUNTY_SERIES_PROFILES_CONTINUED } from "@/data/county-series-profiles-continued";
import { COUNTY_SERIES_PROFILES_NORTHEAST } from "@/data/county-series-profiles-northeast";
import { COUNTY_SERIES_PROFILES_ROLLING_PLAINS } from "@/data/county-series-profiles-rolling-plains";
import { COUNTY_SERIES_PROFILES_SOUTH_PLAINS } from "@/data/county-series-profiles-south-plains";

const articlePromiseCache = new Map<string, Promise<Article | null>>();
const countySeriesProfiles = [
  // Later regional enrichment batches intentionally take precedence over older
  // compatibility profiles when the same county has been expanded again.
  ...COUNTY_SERIES_PROFILES_SOUTH_PLAINS,
  ...COUNTY_SERIES_PROFILES_ROLLING_PLAINS,
  ...COUNTY_SERIES_PROFILES_NORTHEAST,
  ...COUNTY_SERIES_PROFILES_CONTINUED,
  ...COUNTY_SERIES_PROFILES,
];

export function loadCountySeriesArticleServer(countySlug: string): Promise<Article | null> {
  const cached = articlePromiseCache.get(countySlug);
  if (cached) return cached;

  const countyProfile = countySeriesProfiles.find((item) => item.countySlug === countySlug);
  const promise = countyProfile?.loadArticle() ?? Promise.resolve(null);
  articlePromiseCache.set(countySlug, promise);
  return promise;
}
