import server from "./server";
import { texasBrandLocatorApiResponse } from "./lib/texas-brand-locator-api.server";
import { texasDefinedGovernmentAiResponse } from "./lib/texas-defined-government-ai.server";
import { texasDefinedAiResponse } from "./lib/texas-defined-ai.server";
import { texasDefinedNewsletterApiResponse } from "./lib/texas-defined-newsletter-api.server";
import { texasDefinedOutcomeAnalyticsResponse } from "./lib/texas-defined-outcome-analytics.server";

const LEGACY_PITMASTERS_SLUG = "live-2026-07-07-texas-pitmasters-to-feature-in-new-food-network-competition-series-v3wglp";
const PITMASTERS_CANONICAL_PATH = "/article/texas-pitmasters-food-network-competition";
const WORKER_VERSION_HEADER = "x-texasdefined-worker-version";

const SEO_CANONICAL_REDIRECTS: Record<string, string> = {
  "/texas-vs/california": "/article/texas-vs-california-differences",
  "/texas-vs/florida": "/article/texas-vs-florida-differences",
  "/article/texas-lake-reservoirs-explained": "/article/texas-lakes-reservoirs-explained",
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

type WorkerVersionMetadata = {
  id?: string;
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

function withWorkerVersionHeader(response: Response, env: unknown) {
  if (typeof env !== "object" || env === null) return response;
  const metadata = Reflect.get(env, "CF_VERSION_METADATA") as WorkerVersionMetadata | undefined;
  const versionId = typeof metadata?.id === "string" ? metadata.id.trim() : "";
  if (!versionId) return response;

  const headers = new Headers(response.headers);
  headers.set(WORKER_VERSION_HEADER, versionId);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * Complete or bounded-cancel a rejected Network POST body before a 503/429.
 * On Workers/Miniflare an unread request stream can poison the proxy bridge,
 * causing unrelated later requests to fail despite a correctly returned 503.
 * Do not read arbitrary uploads into RAM; 64 KiB is a strict maximum.
 */
async function drainRejectedNetworkPost(request:Request):Promise<void>{
 if(request.method!=='POST'||!request.body)return;
 const reader=request.body.getReader();
 let size=0;
 try{
  while(true){
   const next=await reader.read();
   if(next.done)return;
   size+=next.value.byteLength;
   if(size>65536){await reader.cancel();return}
  }
 }catch{try{await reader.cancel()}catch{}}
}

export default {
  async scheduled(_event: unknown, env: unknown, ctx: {waitUntil?: (promise: Promise<unknown>) => void}) {
    // Cron is not exposed over HTTP; the complete Network release must be
    // explicitly armed before any notification is claimed or sent.
    const run=async()=>{
      // Reporting maintenance is independent of Microsoft Graph. No failed
      // mailbox scope or token acquisition may prevent bounded expiration of
      // 35-day private business counter history.
      const scopedEnv=env as Record<string,string|undefined>;
      const {networkCustomerLaunchArmed}=await import("./data/network-atomic-launch-readiness.server");
      if(networkCustomerLaunchArmed(scopedEnv)){
        try{
          const {supabaseAdmin}=await import("./integrations/supabase/client.server");
          const db=supabaseAdmin as unknown as {rpc:(name:string)=>
            Promise<{data:unknown;error:unknown}>};
          const pruning=await db.rpc("prune_texasdefined_network_profile_metrics");
          if(pruning.error || typeof pruning.data!=="number" ||
             !Number.isInteger(pruning.data)||pruning.data<0||pruning.data>5000)
             throw Error("Network aggregate retention RPC failed");
          if(pruning.data)console.info("[network-cron] expired aggregate metric rows",pruning.data);
        }catch{
          // Fail loudly but do NOT hold customer notification reconciliation
          // hostage to the independent metrics cleanup operation.
          console.error("[network-cron] private aggregate retention failed; operator verification needed");
        }
      }
      const {runNetworkNotificationCronOnWorker}=await import("./data/network-notification-cron.server");
      const result=await runNetworkNotificationCronOnWorker(
        env as Record<string,string|undefined>,
      );
      if(result)console.info("[network-cron] processed",{
        claimed:result.claimed,verified:result.verified,
        unconfirmed:result.unconfirmed,rejected:result.rejected,
      });
    };
    const operation=run().catch(()=>{
      console.error("[network-cron] provider or claim operation failed; no automatic resend");
      throw Error("Network notification scheduled job did not complete");
    });
    if(typeof ctx?.waitUntil==='function')ctx.waitUntil(operation);
    else await operation;
  },
  async fetch(request: Request, env: unknown, ctx: unknown) {
    // Validate the ACTUAL host before ANY dynamic handler, including TanStack
    // server-function RPCs whose paths do not identify their Network origin.
    // Staging configuration inadvertently deployed on texasdefined.com must
    // fail closed for all requests, not just visibly named Network routes.
    const customerPath=new URL(request.url).pathname;
    if(env && typeof env==='object' &&
       Reflect.get(env,"NETWORK_ISOLATED_STAGING")==="true"){
      const {networkRequestHostAllowed}=await import("./data/network-atomic-launch-readiness.server");
      if(!networkRequestHostAllowed(env as Record<string,string|undefined>,request.url)){
        await drainRejectedNetworkPost(request);
        return new Response("Isolated Network staging origin mismatch",{status:503,
          headers:{"Cache-Control":"no-store"}});
      }
    }
    if(customerPath.startsWith("/api/public/network-")
      &&customerPath!=="/api/public/network-billing"
      &&customerPath!=="/api/public/network-checkout"){
      const {networkCustomerLaunchArmed}=await import("./data/network-atomic-launch-readiness.server");
      if(!networkCustomerLaunchArmed(env as Record<string,string|undefined>)){
        await drainRejectedNetworkPost(request);
        return new Response("Network customer launch not accepted",{status:503,
          headers:{"Cache-Control":"no-store"}});
      }
    }
    if(request.method==="POST" && customerPath==="/api/public/network-metrics"){
      // Counters are aggregate but otherwise publicly writable. Enforce a
      // dedicated edge rate limiter, not the 3/min application/billing budget.
      const limiter=env&&typeof env==='object'
        ? Reflect.get(env,"TEXAS_DEFINED_NETWORK_METRICS_RATE_LIMITER"):null;
      const limit=limiter&&typeof limiter==='object'?Reflect.get(limiter,"limit"):null;
      if(typeof limit!=="function"){
        await drainRejectedNetworkPost(request);
        return new Response("Metrics unavailable",{status:503});
      }
      const identity=request.headers.get("cf-connecting-ip")||"unknown";
      const result=await Reflect.apply(limit,limiter,[{key:"network-metrics:"+identity}]);
      if(!result?.success){
        await drainRejectedNetworkPost(request);
        return new Response("Metrics rate limit reached",{status:429});
      }
    }
    if (request.method === "POST" && ["/api/public/network-application", "/api/public/network-checkout", "/api/public/network-billing"].includes(new URL(request.url).pathname)) {
      const limiter = typeof env === "object" && env !== null ? Reflect.get(env, "TEXAS_DEFINED_NETWORK_RATE_LIMITER") : null;
      if (!limiter || typeof limiter !== "object"){await drainRejectedNetworkPost(request);return new Response("Service temporarily unavailable", { status: 503 });}
      const check = Reflect.get(limiter, "limit");
      if (typeof check !== "function"){await drainRejectedNetworkPost(request);return new Response("Service temporarily unavailable", { status: 503 });}
      const rate = await Reflect.apply(check, limiter, [{ key: new URL(request.url).pathname + ":" + (request.headers.get("cf-connecting-ip") || "unknown") }]);
      if (!rate?.success){await drainRejectedNetworkPost(request);return new Response("Too many requests", { status: 429 });}
    }
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

    return withWorkerVersionHeader(await server.fetch(request, env, ctx), env);
  },
};
