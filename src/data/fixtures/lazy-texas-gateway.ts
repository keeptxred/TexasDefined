import type { Article } from "../types";
import { texasGatewayBatch1Enrichment } from "./texas-gateway-batch1-enrichment";
import { texasGatewayBatch3AuthorityEnrichment } from "./texas-gateway-batch3-authority-enrichment";
import { texasGatewayBatch3CulturalEnrichment } from "./texas-gateway-batch3-cultural-enrichment";
import { texasGatewayBatch3SeasonalEnrichment } from "./texas-gateway-batch3-seasonal-enrichment";
import { texasGatewayBatch4AuthorityEnrichment } from "./texas-gateway-batch4-authority-enrichment";
import { texasGatewayBatch4CulturalEnrichment } from "./texas-gateway-batch4-cultural-enrichment";
import { texasGatewayBatch5CulturalEnrichment } from "./texas-gateway-batch5-cultural-enrichment";
import { texasGatewayBatch5TravelEnrichment } from "./texas-gateway-batch5-travel-enrichment";
import { texasGatewayBatch5WeatherEnrichment } from "./texas-gateway-batch5-weather-enrichment";
import { texasGatewayBatch6AuthorityEnrichment } from "./texas-gateway-batch6-authority-enrichment";
import { texasGatewayBatch6CulturalEnrichment } from "./texas-gateway-batch6-cultural-enrichment";
import { texasGatewayBatch6TravelEnrichment } from "./texas-gateway-batch6-travel-enrichment";
import { texasGatewayBatch7AuthorityEnrichment } from "./texas-gateway-batch7-authority-enrichment";
import { texasGatewayBatch7RegionalEnrichment } from "./texas-gateway-batch7-regional-enrichment";
import { texasGatewayBatch8CoreEnrichment } from "./texas-gateway-batch8-core-enrichment";
import { texasGatewayBatch8SecondaryEnrichment } from "./texas-gateway-batch8-secondary-enrichment";
import { texasGatewayBatch8TertiaryEnrichment } from "./texas-gateway-batch8-tertiary-enrichment";
import { texasGatewayBatch9CoreEnrichment } from "./texas-gateway-batch9-core-enrichment";
import { texasGatewayBatch9SecondaryEnrichment } from "./texas-gateway-batch9-secondary-enrichment";
import { texasGatewayBatch10OriginEnrichment } from "./texas-gateway-batch10-origin-enrichment";
import { texasGatewayBatch10DurationEnrichment } from "./texas-gateway-batch10-duration-enrichment";
import { texasGatewayBatch10FormatEnrichment } from "./texas-gateway-batch10-format-enrichment";
import { texasGatewayBatch11GeneralEnrichment } from "./texas-gateway-batch11-general-enrichment";
import { texasGatewayBatch11RadiusEnrichment } from "./texas-gateway-batch11-radius-enrichment";
import { texasGatewayBatch12FlexibleEnrichment } from "./texas-gateway-batch12-flexible-enrichment";
import { texasGatewayBatch12SeasonFamilyEnrichment } from "./texas-gateway-batch12-season-family-enrichment";
import { texasGatewayBatch13FlexibleEnrichment } from "./texas-gateway-batch13-flexible-enrichment";
import { texasGatewayBatch13ScenicEnrichment } from "./texas-gateway-batch13-scenic-enrichment";
import { texasGatewayBatch13StargazingEnrichment } from "./texas-gateway-batch13-stargazing-enrichment";
import { texasGatewayBatch14To16DistinctEnrichment } from "./texas-gateway-batch14-16-distinct-enrichment";
import { isTexasGatewayIndexReadyArticle } from "./texas-gateway-index-readiness";

const GATEWAY_LINK_ALIASES: Record<string, string> = {
  "/lakes-rivers": "/explore/lakes-rivers",
  "/major-springs": "/explore/major-springs",
  "/state-parks": "/explore/state-parks",
  "/national-parks": "/explore/national-parks",
  "/caverns": "/explore/caverns",
  "/beaches-coast": "/explore/beaches-coast",
  "/historic-sites": "/explore/historic-sites",
  "/road-trips": "/explore/road-trips",
  "/small-towns": "/explore/small-towns",
  "/food-bbq": "/explore/food-bbq",
  "/outdoors": "/explore/outdoors",
  "/explore/texas-camping-guide": "/best-places-to-go-camping-in-texas",
};

const JACOBS_WELL_OLD = "Jacob's Well area when open for swimming";
const JACOBS_WELL_CURRENT = "Jacob's Well Natural Area; swimming is currently closed";

const normalizeGatewayArticle = (article: Article): Article => {
  const enrichment: Partial<Article> | undefined = texasGatewayBatch1Enrichment[article.slug]
    ?? texasGatewayBatch3CulturalEnrichment[article.slug]
    ?? texasGatewayBatch3AuthorityEnrichment[article.slug]
    ?? texasGatewayBatch3SeasonalEnrichment[article.slug]
    ?? texasGatewayBatch4CulturalEnrichment[article.slug]
    ?? texasGatewayBatch4AuthorityEnrichment[article.slug]
    ?? texasGatewayBatch5CulturalEnrichment[article.slug]
    ?? texasGatewayBatch5TravelEnrichment[article.slug]
    ?? texasGatewayBatch5WeatherEnrichment[article.slug]
    ?? texasGatewayBatch6CulturalEnrichment[article.slug]
    ?? texasGatewayBatch6TravelEnrichment[article.slug]
    ?? texasGatewayBatch6AuthorityEnrichment[article.slug]
    ?? texasGatewayBatch7RegionalEnrichment[article.slug]
    ?? texasGatewayBatch7AuthorityEnrichment[article.slug]
    ?? texasGatewayBatch8CoreEnrichment[article.slug]
    ?? texasGatewayBatch8SecondaryEnrichment[article.slug]
    ?? texasGatewayBatch8TertiaryEnrichment[article.slug]
    ?? texasGatewayBatch9CoreEnrichment[article.slug]
    ?? texasGatewayBatch9SecondaryEnrichment[article.slug]
    ?? texasGatewayBatch10OriginEnrichment[article.slug]
    ?? texasGatewayBatch10DurationEnrichment[article.slug]
    ?? texasGatewayBatch10FormatEnrichment[article.slug]
    ?? texasGatewayBatch11RadiusEnrichment[article.slug]
    ?? texasGatewayBatch11GeneralEnrichment[article.slug]
    ?? texasGatewayBatch12FlexibleEnrichment[article.slug]
    ?? texasGatewayBatch12SeasonFamilyEnrichment[article.slug]
    ?? texasGatewayBatch13FlexibleEnrichment[article.slug]
    ?? texasGatewayBatch13StargazingEnrichment[article.slug]
    ?? texasGatewayBatch13ScenicEnrichment[article.slug]
    ?? texasGatewayBatch14To16DistinctEnrichment[article.slug];
  const swimmingGuide = article.id === "gateway-b8-swimming";
  const internalLinks = [...(article.internalLinks ?? []), ...(enrichment?.internalLinks ?? [])]
    .map((link) => ({
      ...link,
      href: swimmingGuide && link.href === "/explore" ? "/explore/swimming-holes-river-tubing" : GATEWAY_LINK_ALIASES[link.href] ?? link.href,
    }))
    .filter((link, index, links) => links.findIndex((candidate) => candidate.href === link.href) === index);

  return {
    ...article,
    body: [
      ...article.body.map((block) =>
        block.type === "list"
          ? {
              ...block,
              items: block.items.map((item) => item === JACOBS_WELL_OLD ? JACOBS_WELL_CURRENT : item),
            }
          : block,
      ),
      ...(enrichment?.body ?? []),
    ],
    internalLinks,
    relatedCollections: [...new Set([...article.relatedCollections, ...(enrichment?.relatedCollections ?? [])])],
    relatedDestinations: [...new Set([...article.relatedDestinations, ...(enrichment?.relatedDestinations ?? [])])],
    sourceName: enrichment?.sourceName ?? article.sourceName,
    sourceUrl: enrichment?.sourceUrl ?? article.sourceUrl,
  };
};

let allGatewayArticlesPromise: Promise<Article[]> | null = null;

function loadAllTexasGatewayArticles(): Promise<Article[]> {
  allGatewayArticlesPromise ??= Promise.all([
    import("./texas-gateway-articles").then((module) => module.texasGatewayArticles),
    import("./texas-gateway-articles-batch2").then((module) => module.texasGatewayArticlesBatch2),
    import("./texas-gateway-lifestyle-batch3").then((module) => module.texasGatewayLifestyleBatch3),
    import("./texas-gateway-lifestyle-batch4").then((module) => module.texasGatewayLifestyleBatch4Articles),
    import("./texas-gateway-lifestyle-batch5").then((module) => module.texasGatewayLifestyleBatch5Articles),
    import("./texas-gateway-lifestyle-batch6").then((module) => module.texasGatewayLifestyleBatch6Articles),
    import("./texas-gateway-regional-batch7").then((module) => module.texasGatewayRegionalBatch7Articles),
    import("./texas-gateway-bestof-batch8").then((module) => module.texasGatewayBestOfBatch8Articles),
    import("./texas-gateway-bestof-batch9").then((module) => module.texasGatewayBestOfBatch9Articles),
    import("./texas-gateway-itinerary-batch10").then((module) => module.texasGatewayItineraryBatch10Articles),
    import("./texas-gateway-decision-batch11").then((module) => module.texasGatewayDecisionBatch11Articles),
    import("./texas-gateway-decision-batch12").then((module) => module.texasGatewayDecisionBatch12Articles),
    import("./texas-gateway-decision-batch13").then((module) => module.texasGatewayDecisionBatch13Articles),
    import("./texas-gateway-occasion-batch14").then((module) => module.texasGatewayOccasionBatch14Articles),
    import("./texas-gateway-monthly-batch15").then((module) => module.texasGatewayMonthlyBatch15Articles),
    import("./texas-gateway-identity-batch16").then((module) => module.texasGatewayIdentityBatch16Articles),
  ]).then((batches) => batches.flat().map(normalizeGatewayArticle));

  return allGatewayArticlesPromise;
}

/**
 * Public discovery loader used by article lists, internal search and sitemap
 * generation. Staged gateway drafts are intentionally excluded here.
 */
export async function loadTexasGatewayArticles(): Promise<Article[]> {
  const articles = await loadAllTexasGatewayArticles();
  return articles.filter(isTexasGatewayIndexReadyArticle);
}

/** Direct article resolution keeps staged drafts reachable for editorial QA. */
export async function loadTexasGatewayArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined") return null;
  const articles = await loadAllTexasGatewayArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}
