import { createServerFn } from "@tanstack/react-start";
import type { Article } from "@/data/types";

export type CountySeriesProfile = {
  countySlug: string;
  articleSlug: string;
  loadArticle: () => Promise<Article>;
};

const hasCountySeriesProfileServerFn = createServerFn({ method: "GET" })
  .inputValidator((data: { countySlug: string }) => data)
  .handler(async ({ data }) => {
    const { hasCountySeriesProfileServer } = await import("./county-series.server");
    return hasCountySeriesProfileServer(data.countySlug);
  });

const loadCountySeriesArticleServerFn = createServerFn({ method: "GET" })
  .inputValidator((data: { countySlug: string }) => data)
  .handler(async ({ data }) => {
    const { loadCountySeriesArticleServer } = await import("./county-series.server");
    return loadCountySeriesArticleServer(data.countySlug);
  });

export function hasCountySeriesProfile(countySlug: string): Promise<boolean> {
  return hasCountySeriesProfileServerFn({ data: { countySlug } });
}

export function loadCountySeriesArticle(countySlug: string): Promise<Article | null> {
  return loadCountySeriesArticleServerFn({ data: { countySlug } });
}

// County-series editorial slugs use a reserved legacy shape. Keep the parser
// lightweight in the browser while the authoritative completion registry stays
// server-only with the actual county profile loaders.
export function countySlugForLegacyArticle(articleSlug: string) {
  const markerIndex = articleSlug.indexOf("-county-");
  if (markerIndex <= 0 || !articleSlug.endsWith("-texas")) return null;
  return articleSlug.slice(0, markerIndex);
}

export function isLegacyCountySeriesArticle(articleSlug: string) {
  return countySlugForLegacyArticle(articleSlug) !== null;
}
