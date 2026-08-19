import type { Article } from "@/data/types";
import { COUNTY_SERIES_PROFILES } from "@/data/county-series-profiles";

const articlePromiseCache = new Map<string, Promise<Article | null>>();

export function loadCountySeriesArticleServer(countySlug: string): Promise<Article | null> {
  const cached = articlePromiseCache.get(countySlug);
  if (cached) return cached;

  if (countySlug === "johnson") {
    const promise = import("@/data/fixtures/johnson-county-cleburne-chisholm-trail-railroad-prairies")
      .then((module) => module.johnsonCountyCleburneChisholmTrailRailroadPrairiesArticle);
    articlePromiseCache.set(countySlug, promise);
    return promise;
  }

  const countyProfile = COUNTY_SERIES_PROFILES.find((item) => item.countySlug === countySlug);
  const promise = countyProfile?.loadArticle() ?? Promise.resolve(null);
  articlePromiseCache.set(countySlug, promise);
  return promise;
}
