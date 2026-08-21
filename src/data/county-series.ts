import { createServerFn } from "@tanstack/react-start";
import type { Article } from "@/data/types";

export type CountySeriesProfile = {
  countySlug: string;
  articleSlug: string;
  loadArticle: () => Promise<Article>;
};

// Keep the browser registry intentionally compact. County profile bodies and
// exact legacy article metadata live behind the server loader; the client only
// needs to know which county slugs have completed editorial profiles.
const COUNTY_SLUGS = new Set(
  "brewster|presidio|jeff-davis|culberson|hudspeth|el-paso|reeves|pecos|ward|winkler|andrews|ector|randall|tom-green|midland|galveston|gillespie|bexar|travis|harris|fort-bend|montgomery|brazoria|dallas|tarrant|collin|denton|williamson|hays|comal|bell|mclennan|brazos|bastrop|lee|fayette|washington|austin|colorado|wharton|matagorda|jackson|lavaca|calhoun|victoria|goliad|refugio|aransas|san-patricio|nueces|kleberg|kenedy|willacy|cameron|hidalgo|starr|zapata|webb|maverick|kinney|val-verde|edwards|real|uvalde|zavala|dimmit|la-salle|mcmullen|brooks|jim-hogg|duval|jim-wells|live-oak|atascosa|bee|frio|karnes|wilson|gonzales|guadalupe|dewitt|medina|bandera|kendall|kerr|blanco|burnet|llano|mason|san-saba|lampasas|mills|hamilton|coryell|bosque|erath|comanche|eastland|palo-pinto|hood|somervell|johnson|hill|ellis|navarro|limestone|freestone|leon|madison|grimes|walker|trinity|houston|angelina|nacogdoches|san-augustine|sabine|shelby|panola|rusk|cherokee|smith|gregg|upshur|harrison|marion|cass|bowie|red-river|delta|hopkins|hunt|fannin|wood|rockwall|kaufman|franklin|titus|morris|grayson|montague|camp|anderson|clay|henderson|wichita|foard|baylor|wilbarger|hardeman|childress|motley|archer|garza|dawson|gaines|crosby|terry|lynn".split("|"),
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
  const markerIndex = articleSlug.indexOf("-county-");
  if (markerIndex <= 0 || !articleSlug.endsWith("-texas")) return null;
  const countySlug = articleSlug.slice(0, markerIndex);
  return COUNTY_SLUGS.has(countySlug) ? countySlug : null;
}

export function isLegacyCountySeriesArticle(articleSlug: string) {
  return countySlugForLegacyArticle(articleSlug) !== null;
}
