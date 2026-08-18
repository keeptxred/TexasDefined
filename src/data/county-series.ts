import { createServerFn } from "@tanstack/react-start";
import type { Article } from "@/data/types";

export type CountySeriesProfile = {
  countySlug: string;
  articleSlug: string;
  loadArticle: () => Promise<Article>;
};

const COUNTY_SLUGS = new Set(
  "brewster|presidio|jeff-davis|culberson|hudspeth|el-paso|reeves|pecos|ward|winkler|andrews|ector|randall|tom-green|midland|galveston|gillespie|bexar|travis|harris|fort-bend|montgomery|brazoria|dallas|tarrant|collin|denton|williamson|hays|comal|bell|mclennan|brazos|bastrop|lee|fayette|washington|austin|colorado|wharton|matagorda|jackson|lavaca|calhoun|victoria|goliad|refugio|aransas|san-patricio|nueces|kleberg|kenedy|willacy|cameron|hidalgo|starr|zapata|webb|maverick|kinney|val-verde|edwards|real|uvalde|zavala|dimmit|la-salle".split("|"),
);

const loadCountySeriesArticleServerFn = createServerFn({ method: "GET" })
  .inputValidator((data: { countySlug: string }) => data)
  .handler(async ({ data }) => {
    const { loadCountySeriesArticleServer } = await import("./county-series.server");
    return loadCountySeriesArticleServer(data.countySlug);
  });

export function hasCountySeriesProfile(countySlug: string) {
  return COUNTY_SLUGS.has(countySlug);
}

export function loadCountySeriesArticle(countySlug: string): Promise<Article | null> {
  return loadCountySeriesArticleServerFn({ data: { countySlug } });
}

export function countySlugForLegacyArticle(articleSlug: string) {
  const match = articleSlug.match(/^(.+?)-county-/);
  const countySlug = match?.[1] ?? null;
  return countySlug && COUNTY_SLUGS.has(countySlug) ? countySlug : null;
}

export function isLegacyCountySeriesArticle(articleSlug: string) {
  return countySlugForLegacyArticle(articleSlug) !== null;
}
