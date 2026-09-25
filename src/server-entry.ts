import server from "./server";
import { texasBrandLocatorApiResponse } from "./lib/texas-brand-locator-api.server";
import { texasDefinedGovernmentAiResponse } from "./lib/texas-defined-government-ai.server";
import { texasDefinedAiResponse } from "./lib/texas-defined-ai.server";
import { texasDefinedOutcomeAnalyticsResponse } from "./lib/texas-defined-outcome-analytics.server";
import {
  syncTexasDefinedEventOffers,
  texasDefinedEventOffersResponse,
} from "./lib/texas-defined-event-offers.server";

const LEGACY_PITMASTERS_SLUG = "live-2026-07-07-texas-pitmasters-to-feature-in-new-food-network-competition-series-v3wglp";
const PITMASTERS_CANONICAL_PATH = "/article/texas-pitmasters-food-network-competition";

const SEO_CANONICAL_REDIRECTS: Record<string, string> = {
  "/texas-vs/california": "/article/texas-vs-california-differences",
  "/texas-vs/florida": "/article/texas-vs-florida-differences",
  [`/article/${LEGACY_PITMASTERS_SLUG}`]: PITMASTERS_CANONICAL_PATH,
  [`/news/${LEGACY_PITMASTERS_SLUG}`]: PITMASTERS_CANONICAL_PATH,
};

export default {
  async scheduled(_controller: unknown, env: unknown, ctx: { waitUntil?: (promise: Promise<unknown>) => void }) {
    const syncPromise = syncTexasDefinedEventOffers(env as Record<string, unknown>, "cloudflare-cron").then((result) => {
      console.log(`[EventOffers] synced ${result.totalPersisted} rows`, JSON.stringify(result.summaries));
      return result;
    }).catch((error) => {
      console.error("[EventOffers] scheduled sync failed", error);
    });
    ctx?.waitUntil?.(syncPromise);
  },

  async fetch(request: Request, env: unknown, ctx: unknown) {
    const eventOffersResponse = await texasDefinedEventOffersResponse(request, env as Record<string, unknown>);
    if (eventOffersResponse) return eventOffersResponse;

    const outcomeAnalyticsResponse = await texasDefinedOutcomeAnalyticsResponse(request, env);
    if (outcomeAnalyticsResponse) return outcomeAnalyticsResponse;

    const brandLocatorResponse = await texasBrandLocatorApiResponse(request);
    if (brandLocatorResponse) return brandLocatorResponse;

    const governmentAiResponse = await texasDefinedGovernmentAiResponse(request, env);
    if (governmentAiResponse) return governmentAiResponse;

    const aiResponse = await texasDefinedAiResponse(request, env);
    if (aiResponse) return aiResponse;

    if (request.method === "GET" || request.method === "HEAD") {
      const url = new URL(request.url);
      const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "").toLowerCase() : url.pathname;
      const canonicalPath = SEO_CANONICAL_REDIRECTS[path];
      if (canonicalPath) {
        url.protocol = "https:";
        url.hostname = "texasdefined.com";
        url.port = "";
        url.pathname = canonicalPath;
        return Response.redirect(url.toString(), 301);
      }
    }

    return server.fetch(request, env, ctx);
  },
};
