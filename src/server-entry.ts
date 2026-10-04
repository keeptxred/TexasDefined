import server from "./server";
import { texasBrandLocatorApiResponse } from "./lib/texas-brand-locator-api.server";
import { texasDefinedGovernmentAiResponse } from "./lib/texas-defined-government-ai.server";
import { texasDefinedAiResponse } from "./lib/texas-defined-ai.server";
import { texasDefinedNewsletterApiResponse } from "./lib/texas-defined-newsletter-api.server";
import { texasDefinedOutcomeAnalyticsResponse } from "./lib/texas-defined-outcome-analytics.server";

const LEGACY_PITMASTERS_SLUG = "live-2026-07-07-texas-pitmasters-to-feature-in-new-food-network-competition-series-v3wglp";
const PITMASTERS_CANONICAL_PATH = "/article/texas-pitmasters-food-network-competition";

const SEO_CANONICAL_REDIRECTS: Record<string, string> = {
  "/texas-vs/california": "/article/texas-vs-california-differences",
  "/texas-vs/florida": "/article/texas-vs-florida-differences",
  [`/article/${LEGACY_PITMASTERS_SLUG}`]: PITMASTERS_CANONICAL_PATH,
  [`/news/${LEGACY_PITMASTERS_SLUG}`]: PITMASTERS_CANONICAL_PATH,
};

type AiAnalyticsPoint = {
  blobs?: string[];
  doubles?: number[];
  indexes?: string[];
};

type AiAnalyticsDataset = {
  writeDataPoint: (input: AiAnalyticsPoint) => void;
};

const AI_DEMAND_TERMS = [
  "rv park", "rv", "campground", "camping", "hotel", "lodging", "wedding venue", "golf course",
  "state park", "park", "lake", "river", "beach", "school district", "school", "district", "isd",
  "property tax", "property", "tax", "homestead exemption", "homestead", "mud district", "mud",
  "pid district", "pid", "farm to market road", "ranch to market road", "frontage road", "road",
  "highway", "traffic", "transportation", "barbecue", "bbq", "kolache", "klobasnek", "event",
  "festival", "fishing", "hunting", "hiking", "moving", "retirement", "insurance", "mortgage",
  "restaurant", "buc ee", "heb", "law", "legal", "legislature", "permit", "license", "weather",
  "forecast", "storm", "hurricane", "tornado", "freeze", "heat", "flood", "water", "reservoir",
  "drought", "aquifer", "health", "hospital", "safety", "trip", "travel", "vacation", "weekend",
  "itinerary", "concert", "rodeo", "fair", "ticket", "home", "housing", "neighborhood", "relocation",
  "food", "culture", "history", "historic", "county", "city", "region", "geography", "population",
  "county seat",
] as const;

function privacySafeDemandTerms(value: string) {
  const normalized = value
    .toLowerCase()
    .replace(/h-e-b/g, "heb")
    .replace(/buc[-’']?ee['’]?s/g, "buc ee")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const padded = ` ${normalized} `;
  const matches = AI_DEMAND_TERMS.filter((term) => padded.includes(` ${term} `));
  return matches.length ? matches.slice(0, 24).join(" ") : "general texas";
}

function privacySafeAiEnvironment(env: unknown): unknown {
  if (typeof env !== "object" || env === null) return env;
  const dataset = Reflect.get(env, "TEXAS_DEFINED_AI_ANALYTICS");
  if (typeof dataset !== "object" || dataset === null) return env;
  const writeDataPoint = Reflect.get(dataset, "writeDataPoint");
  if (typeof writeDataPoint !== "function") return env;

  const wrappedDataset: AiAnalyticsDataset = {
    writeDataPoint(input) {
      const blobs = input.blobs ? [...input.blobs] : undefined;
      if (blobs?.length) blobs[0] = privacySafeDemandTerms(blobs[0] ?? "");
      Reflect.apply(writeDataPoint, dataset, [{ ...input, blobs }]);
    },
  };

  return new Proxy(env as object, {
    get(target, property, receiver) {
      if (property === "TEXAS_DEFINED_AI_ANALYTICS") return wrappedDataset;
      return Reflect.get(target, property, receiver);
    },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const newsletterApiResponse = await texasDefinedNewsletterApiResponse(request);
    if (newsletterApiResponse) return newsletterApiResponse;

    const outcomeAnalyticsResponse = await texasDefinedOutcomeAnalyticsResponse(request, env);
    if (outcomeAnalyticsResponse) return outcomeAnalyticsResponse;

    const brandLocatorResponse = await texasBrandLocatorApiResponse(request);
    if (brandLocatorResponse) return brandLocatorResponse;

    const aiEnv = privacySafeAiEnvironment(env);
    const governmentAiResponse = await texasDefinedGovernmentAiResponse(request, aiEnv);
    if (governmentAiResponse) return governmentAiResponse;

    const aiResponse = await texasDefinedAiResponse(request, aiEnv);
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
