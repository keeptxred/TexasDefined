import type { Article } from "../types";

let gatewayArticlesPromise: Promise<Article[]> | null = null;

export function loadTexasGatewayArticles(): Promise<Article[]> {
  gatewayArticlesPromise ??= Promise.all([
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
  ]).then((batches) => batches.flat());

  return gatewayArticlesPromise;
}

export async function loadTexasGatewayArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined") return null;
  const articles = await loadTexasGatewayArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}
