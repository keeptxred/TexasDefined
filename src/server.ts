import "./lib/error-capture";
import { LEGACY_EDITORIAL_REDIRECTS } from "./lib/legacy-editorial-redirects";

import { countySlugForLegacyArticle } from "./data/county-series";
import { allowedRemoteImageUrl, REMOTE_IMAGE_PATH } from "./lib/editorial-image-delivery";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { remoteImageRequestHeaders } from "./lib/remote-image-fetch-policy";
import { normalizeViatorMarketProducts, VIATOR_LIVE_DESTINATION_IDS, type ViatorLiveMarketResponse } from "./lib/viator-market-feed";
import { attractionDiscoveryRequestBody, viatorAttractionCandidates, type ViatorAttractionDiscoveryResponse } from "./lib/viator-attraction-discovery";
import { christmasExperienceSearchBody, normalizeChristmasViatorExperiences } from "./lib/viator-seasonal-discovery";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

type ExecutionContextLike = {
  waitUntil?: (promise: Promise<unknown>) => void;
};

type CloudflareCacheStorage = CacheStorage & { default?: Cache };

const ADS_TXT = "google.com, pub-1891256141359926, DIRECT, f08c47fec0942fa0\n";
const BING_VERIFICATION_META =
  '<meta name="msvalidate.01" content="74E5E79AEC351CF6D2577A6FC6A125DF" />';
const REMOTE_IMAGE_REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);
const MAX_REMOTE_IMAGE_REDIRECTS = 4;
const ENTITY_REDIRECTS: Record<string, string> = {
  ...LEGACY_EDITORIAL_REDIRECTS,
  // Previously generated 2027-only Carnival occurrence URLs have no standalone
  // major-Event guide. Their closest published evergreen visitor guide is this hub.
  // Never redirect to a non-existent /event/<yearless-slug> authority page.
  "/event/crystal-beach-mardi-gras-chicken-run-2027": "/events/mardi-gras",
  "/event/jefferson-queen-mab-ball-2027": "/events/mardi-gras",
  "/event/beaumont-lagniappe-mardi-gras-soiree-2027": "/events/mardi-gras",
  "/event/livingston-mardi-gras-gumbo-cookoff-2027": "/events/mardi-gras",
  "/lake/caddo-lake": "/destination/caddo-lake",
  "/state-park/palo-duro-canyon-state-park": "/destination/palo-duro-canyon-state-park",
  "/state-park/enchanted-rock-state-natural-area": "/destination/enchanted-rock-state-natural-area",
  "/national-park/big-bend-national-park": "/destination/big-bend-national-park",
  "/cavern/natural-bridge-caverns": "/destination/natural-bridge-caverns",
  "/beach/padre-island-national-seashore": "/destination/padre-island-national-seashore",
  "/historic-site/the-alamo": "/destination/the-alamo",
  "/destination/courthouse-on-the-square-museum-denton": "/destination/denton-county-courthouse-on-the-square-museum",
  "/destination/xit-museum-dalhart": "/destination/xit-museum",
  "/destination/scurry-county-museum-snyder": "/destination/scurry-county-museum",
  "/destination/old-post-museum-art-center-graham": "/destination/old-post-office-museum-art-center-graham",
  "/destination/white-deer-land-museum-pampa": "/destination/white-deer-land-museum",
  "/sports-venue/nrg-stadium": "/sports-venue/reliant-stadium",
  "/article/best-places-for-fall-colors-in-texas": "/article/best-texas-state-parks-for-fall-colors",
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

function canonicalHostRedirect(request: Request) {
  const url = new URL(request.url);
  if (url.hostname.toLowerCase() !== "www.texasdefined.com") return null;
  url.protocol = "https:";
  url.hostname = "texasdefined.com";
  url.port = "";
  return Response.redirect(url.toString(), 301);
}

export function adsTxtResponse(request: Request): Response | null {
  const url = new URL(request.url);
  if (url.pathname !== "/ads.txt") return null;
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", {
      status: 405,
      headers: { Allow: "GET, HEAD" },
    });
  }

  return new Response(request.method === "HEAD" ? null : ADS_TXT, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=300",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function legacyCountyRedirect(request: Request) {
  const url = new URL(request.url);
  const match = url.pathname.match(/^\/article\/([^/]+)\/?$/);
  if (!match) return null;
  const countySlug = countySlugForLegacyArticle(decodeURIComponent(match[1]));
  if (!countySlug) return null;
  url.pathname = `/county/${countySlug}`;
  return Response.redirect(url.toString(), 301);
}

function canonicalEntityRedirect(request: Request) {
  if (request.method !== "GET" && request.method !== "HEAD") return null;
  const url = new URL(request.url);
  const normalizedPath = url.pathname.length > 1
    ? url.pathname.replace(/\/+$/, "").toLowerCase()
    : url.pathname;
  const canonicalPath = ENTITY_REDIRECTS[normalizedPath];
  if (!canonicalPath) return null;

  url.protocol = "https:";
  url.hostname = "texasdefined.com";
  url.port = "";
  url.pathname = canonicalPath;
  return Response.redirect(url.toString(), 301);
}

async function fetchAllowedRemoteImageOnce(initialUrl: URL) {
  let target = initialUrl;

  for (let redirectCount = 0; redirectCount <= MAX_REMOTE_IMAGE_REDIRECTS; redirectCount += 1) {
    const response = await fetch(target.toString(), {
      method: "GET",
      redirect: "manual",
      headers: remoteImageRequestHeaders(),
    });

    if (!REMOTE_IMAGE_REDIRECT_STATUSES.has(response.status)) return response;
    const location = response.headers.get("location");
    if (!location) return response;
    const next = allowedRemoteImageUrl(new URL(location, target).toString());
    if (!next) return new Response("Remote image redirect blocked", { status: 403 });
    target = next;
  }

  return new Response("Too many remote image redirects", { status: 508 });
}

const RETRYABLE_REMOTE_IMAGE_STATUSES = new Set([408, 429, 500, 502, 503, 504]);

// The remote broker never substitutes a different photo. Retry the same
// rights-checked source on transient upstream throttling before failing closed.
// Cloudflare's per-POP cache still serves verified 200 image bytes normally.
async function fetchAllowedRemoteImage(initialUrl: URL): Promise<Response> {
  let response = await fetchAllowedRemoteImageOnce(initialUrl);
  for (let retry = 1; retry <= 2 && RETRYABLE_REMOTE_IMAGE_STATUSES.has(response.status); retry += 1) {
    const retryAfter = Number(response.headers.get("retry-after"));
    const delay = Number.isFinite(retryAfter) && retryAfter > 0
      ? Math.min(8_000, Math.max(1_000, retryAfter * 1_000))
      : retry * 2_000;
    await response.body?.cancel();
    await new Promise((resolve) => setTimeout(resolve, delay));
    response = await fetchAllowedRemoteImageOnce(initialUrl);
  }
  return response;
}

function cachedHeadResponse(response: Response) {
  return new Response(null, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

const VIATOR_API_BASE = "https://api.viator.com/partner";
const VIATOR_API_PREFIX = "/api/viator";
const MAX_VIATOR_SEARCH_BODY_BYTES = 32_768;
const VIATOR_PRODUCT_CODE_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

function viatorApiKey(env: unknown): string | null {
  if (typeof env !== "object" || env === null) return null;
  const value = Reflect.get(env, "VIATOR_API_KEY");
  return typeof value === "string" && value.length > 0 ? value : null;
}

function viatorEnvironmentValue(env: unknown, name: string): string | null {
  if (typeof env !== "object" || env === null) return null;
  const value = Reflect.get(env, name);
  return typeof value === "string" && value.length > 0 ? value : null;
}

function viatorAffiliateLinkResponse(request: Request, env: unknown): Response {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return viatorError("Method not allowed", 405, "GET, HEAD");
  }

  const pid = viatorEnvironmentValue(env, "VIATOR_AFFILIATE_PID");
  const mcid = viatorEnvironmentValue(env, "VIATOR_AFFILIATE_MCID");
  if (!pid || !mcid) return viatorError("Viator affiliate tracking is unavailable", 503);

  const requestUrl = new URL(request.url);
  const rawTarget = requestUrl.searchParams.get("url");
  if (!rawTarget) return viatorError("A Viator URL is required", 400);

  let target: URL;
  try {
    target = new URL(rawTarget);
  } catch {
    return viatorError("Invalid Viator URL", 400);
  }
  const hostname = target.hostname.toLowerCase();
  if (target.protocol !== "https:" || (hostname !== "viator.com" && !hostname.endsWith(".viator.com"))) {
    return viatorError("Only HTTPS Viator URLs are allowed", 400);
  }

  const campaign = requestUrl.searchParams.get("campaign");
  if (campaign && !/^[A-Za-z0-9-]{1,100}$/.test(campaign)) {
    return viatorError("Invalid campaign code", 400);
  }

  target.searchParams.set("pid", pid);
  target.searchParams.set("mcid", mcid);
  target.searchParams.set("medium", "link");
  if (campaign) target.searchParams.set("campaign", campaign);

  const response = Response.json({ url: target.toString() }, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
  return request.method === "HEAD" ? cachedHeadResponse(response) : response;
}

function viatorError(message: string, status: number, allow?: string): Response {
  const headers = new Headers({
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
  });
  if (allow) headers.set("Allow", allow);
  return Response.json({ error: message }, { status, headers });
}

function viatorHeaders(request: Request, apiKey: string): Headers {
  const locale = request.headers.get("accept-language")?.split(",", 1)[0]?.trim() || "en-US";
  const currency = request.headers.get("accept-currency")?.trim().toUpperCase() || "USD";
  return new Headers({
    Accept: "application/json",
    "Accept-Currency": /^[A-Z]{3}$/.test(currency) ? currency : "USD",
    "Accept-Language": /^[A-Za-z]{2,3}(?:-[A-Za-z]{2})?$/.test(locale) ? locale : "en-US",
    "Content-Type": "application/json",
    "exp-api-key": apiKey,
  });
}

function viatorUpstreamResponse(upstream: Response, cacheControl: string): Response {
  const headers = new Headers({
    "Cache-Control": upstream.ok ? cacheControl : "no-store",
    "Content-Type": upstream.headers.get("content-type") || "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
  });
  const retryAfter = upstream.headers.get("retry-after");
  if (retryAfter) headers.set("Retry-After", retryAfter);
  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
}

/**
 * Live, limited product previews for a verified Texas market. Never ingest the
 * full catalog; refresh via the on-demand search model (20 minute edge cache).
 * Search API data is not a verified price, reservation, or public-site fact.
 */
/**
 * Viator attraction research: one bounded sample per market, one-week edge TTL.
 * This is deliberately not an indexable route or a publishing endpoint. A
 * separate official-source editorial check is required before creating pages.
 */
/** A Christmas-themed supplier SEARCH, not evidence of any dated event. */
async function viatorChristmasExperienceResponse(request: Request, apiKey: string, ctx: unknown, market: string) {
  if (request.method !== "GET") return viatorError("Method not allowed", 405, "GET");
  if (new URL(request.url).search) return viatorError("Unexpected query parameters", 400);
  if (!Object.prototype.hasOwnProperty.call(VIATOR_LIVE_DESTINATION_IDS, market)) return viatorError("Unreviewed market", 404);
  const cache = (globalThis.caches as CloudflareCacheStorage | undefined)?.default;
  const cacheKey = new Request(request.url, { method: "GET" });
  const cached = cache ? await cache.match(cacheKey) : undefined;
  if (cached) return cached;
  try {
    const headers = viatorHeaders(request, apiKey);
    headers.set("Accept", "application/json;version=2.0");
    headers.set("Accept-Language", "en-US");
    headers.set("Accept-Currency", "USD");
    const endpoint = new URL(VIATOR_API_BASE + "/search/freetext");
    endpoint.searchParams.set("campaign-value", `texasdefined-api-${market}`);
    const upstream = await fetch(endpoint.toString(), {
      method: "POST", headers, body: JSON.stringify(christmasExperienceSearchBody(market)),
      redirect: "error", signal: AbortSignal.timeout(8_000),
    });
    if (!upstream.ok) {
      console.warn("[viator-christmas] upstream status", market, upstream.status);
      return viatorError("Holiday experiences are temporarily unavailable", 503);
    }
    const products = normalizeChristmasViatorExperiences(await upstream.json());
    const response = Response.json({
      source:"viator",market,refreshedAt:new Date().toISOString(),products,
      category:"seasonal-experiences-not-calendar-events",
    }, {headers:{
      "Cache-Control":"public, max-age=120, s-maxage=1200",
      "X-Content-Type-Options":"nosniff",
      "X-Robots-Tag":"noindex, nofollow, noarchive",
    }});
    const waitUntil = (ctx as ExecutionContextLike | null | undefined)?.waitUntil;
    if (cache && typeof waitUntil === "function") waitUntil.call(ctx, cache.put(cacheKey, response.clone()));
    return response;
  } catch (error) {
    console.warn("[viator-christmas] search failed", market, error instanceof Error ? error.name : "unknown");
    return viatorError("Holiday experiences are temporarily unavailable", 503);
  }
}

async function viatorAttractionResearchResponse(request: Request, apiKey: string, ctx: unknown, market: string) {
  if (request.method !== "GET") return viatorError("Method not allowed", 405, "GET");
  if (new URL(request.url).search) return viatorError("Unexpected query parameters", 400);
  if (!Object.prototype.hasOwnProperty.call(VIATOR_LIVE_DESTINATION_IDS, market)) {
    return viatorError("Unreviewed Viator destination", 404);
  }
  const headers = new Headers({
    "Cache-Control": "public, max-age=600, s-maxage=604800",
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
  });
  const cache = (globalThis.caches as CloudflareCacheStorage | undefined)?.default;
  const cacheKey = new Request(request.url, { method: "GET" });
  const cached = cache ? await cache.match(cacheKey) : undefined;
  if (cached) return cached;
  try {
    const apiHeaders = viatorHeaders(request, apiKey);
    apiHeaders.set("Accept", "application/json;version=2.0");
    apiHeaders.set("Accept-Language", "en-US");
    const upstream = await fetch(VIATOR_API_BASE + "/attractions/search", {
      method: "POST",
      headers: apiHeaders,
      body: JSON.stringify(attractionDiscoveryRequestBody(market)),
      redirect: "error",
      signal: AbortSignal.timeout(8_000),
    });
    if (!upstream.ok) {
      console.warn("[viator-attractions] upstream status", market, upstream.status);
      return viatorError("Viator attraction discovery unavailable", 503);
    }
    const candidates = viatorAttractionCandidates(await upstream.json(), market);
    const payload: ViatorAttractionDiscoveryResponse = {
      source: "viator", market, checkedAt: new Date().toISOString(),
      candidates, incomplete: true, robots: "noindex",
    };
    const response = Response.json(payload, { headers });
    const waitUntil = (ctx as ExecutionContextLike | null | undefined)?.waitUntil;
    if (cache && typeof waitUntil === "function") {
      waitUntil.call(ctx, cache.put(cacheKey, response.clone()));
    }
    return response;
  } catch (error) {
    console.warn("[viator-attractions] discovery failed", market, error instanceof Error ? error.name : "unknown");
    return viatorError("Viator attraction discovery unavailable", 503);
  }
}

async function viatorMarketFeedResponse(
  request: Request,
  apiKey: string,
  ctx: unknown,
  market: string,
): Promise<Response> {
  if (request.method !== "GET") return viatorError("Method not allowed", 405, "GET");
  const url = new URL(request.url);
  if (url.search) return viatorError("Unexpected query parameters", 400);
  if (!Object.prototype.hasOwnProperty.call(VIATOR_LIVE_DESTINATION_IDS, market)) {
    return viatorError("Unknown verified Viator market", 404);
  }

  const cache = (globalThis.caches as CloudflareCacheStorage | undefined)?.default;
  const cacheKey = new Request(request.url, { method: "GET" });
  const cached = cache ? await cache.match(cacheKey) : undefined;
  if (cached) return cached;

  const endpoint = new URL(VIATOR_API_BASE + "/products/search");
  endpoint.searchParams.set("campaign-value", `texasdefined-api-${market}`);
  const headers = viatorHeaders(request, apiKey);
  headers.set("Accept", "application/json;version=2.0");
  headers.set("Accept-Language", "en-US");
  headers.set("Accept-Currency", "USD");
  try {
    const upstream = await fetch(endpoint.toString(), {
      method: "POST",
      headers,
      body: JSON.stringify({
        filtering: { destination: VIATOR_LIVE_DESTINATION_IDS[market] },
        sorting: { sort: "DEFAULT", order: "DESCENDING" },
        pagination: { start: 1, count: 12 },
        currency: "USD",
      }),
      redirect: "error",
      signal: AbortSignal.timeout(8_000),
    });
    if (!upstream.ok) {
      console.warn("[viator-market-feed] upstream status", market, upstream.status);
      return viatorError("Current Viator inventory is temporarily unavailable", 503);
    }
    const payload = await upstream.json();
    const products = normalizeViatorMarketProducts(payload);
    const result: ViatorLiveMarketResponse = {
      source: "viator",
      market,
      refreshedAt: new Date().toISOString(),
      products,
    };
    const response = Response.json(result, {
      headers: {
        "Cache-Control": "public, max-age=120, s-maxage=1200",
        "Content-Type": "application/json; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      },
    });
    const waitUntil = (ctx as ExecutionContextLike | null | undefined)?.waitUntil;
    if (cache && typeof waitUntil === "function") {
      waitUntil.call(ctx, cache.put(cacheKey, response.clone()));
    }
    return response;
  } catch (error) {
    console.warn("[viator-market-feed] request failed", market, error instanceof Error ? error.name : "unknown");
    return viatorError("Current Viator inventory is temporarily unavailable", 503);
  }
}

async function viatorApiResponse(
  request: Request,
  env: unknown,
  ctx: unknown,
): Promise<Response | null> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith(VIATOR_API_PREFIX + "/")) return null;

  if (url.pathname === VIATOR_API_PREFIX + "/affiliate-link") {
    return viatorAffiliateLinkResponse(request, env);
  }

  const apiKey = viatorApiKey(env);
  if (!apiKey) return viatorError("Viator integration is unavailable", 503);

  const christmasMarketMatch = url.pathname.match(/^\/api\/viator\/market\/([a-z0-9-]+)\/christmas\/?$/);
  if (christmasMarketMatch) return viatorChristmasExperienceResponse(request, apiKey, ctx, christmasMarketMatch[1]);

  const attractionResearchMatch = url.pathname.match(/^\/api\/viator\/market\/([a-z0-9-]+)\/attractions\/?$/);
  if (attractionResearchMatch) return viatorAttractionResearchResponse(request, apiKey, ctx, attractionResearchMatch[1]);

  const marketMatch = url.pathname.match(/^\/api\/viator\/market\/([a-z0-9-]+)\/products\/?$/);
  if (marketMatch) return viatorMarketFeedResponse(request, apiKey, ctx, marketMatch[1]);

  if (url.pathname === VIATOR_API_PREFIX + "/products/search") {
    if (request.method !== "POST") return viatorError("Method not allowed", 405, "POST");
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return viatorError("Content-Type must be application/json", 415);
    }
    const contentLength = Number(request.headers.get("content-length") || "0");
    if (Number.isFinite(contentLength) && contentLength > MAX_VIATOR_SEARCH_BODY_BYTES) {
      return viatorError("Request body is too large", 413);
    }

    const upstream = await fetch(VIATOR_API_BASE + "/products/search", {
      method: "POST",
      headers: viatorHeaders(request, apiKey),
      body: request.body,
      redirect: "error",
    });
    return viatorUpstreamResponse(upstream, "private, max-age=60");
  }

  const match = url.pathname.match(/^\/api\/viator\/products\/([^/]+)\/?$/);
  if (!match) return viatorError("Viator endpoint not found", 404);
  if (request.method !== "GET" && request.method !== "HEAD") {
    return viatorError("Method not allowed", 405, "GET, HEAD");
  }

  const productCode = decodeURIComponent(match[1]);
  if (!VIATOR_PRODUCT_CODE_PATTERN.test(productCode)) {
    return viatorError("Invalid Viator product code", 400);
  }

  const cache = (globalThis.caches as CloudflareCacheStorage | undefined)?.default;
  const cacheKey = new Request(request.url, { method: "GET" });
  const cached = cache ? await cache.match(cacheKey) : undefined;
  if (cached) return request.method === "HEAD" ? cachedHeadResponse(cached) : cached;

  const upstream = await fetch(VIATOR_API_BASE + "/products/" + encodeURIComponent(productCode), {
    method: "GET",
    headers: viatorHeaders(request, apiKey),
    redirect: "error",
  });
  const response = viatorUpstreamResponse(upstream, "public, max-age=300, s-maxage=3600");
  const waitUntil = (ctx as ExecutionContextLike | null | undefined)?.waitUntil;
  if (upstream.ok && cache && typeof waitUntil === "function") {
    waitUntil.call(ctx, cache.put(cacheKey, response.clone()));
  }
  return request.method === "HEAD" ? cachedHeadResponse(response) : response;
}

async function remoteImageResponse(request: Request, ctx: unknown): Promise<Response | null> {
  const requestUrl = new URL(request.url);
  if (requestUrl.pathname !== REMOTE_IMAGE_PATH) return null;
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  }

  const target = allowedRemoteImageUrl(requestUrl.searchParams.get("url") ?? "");
  if (!target) return new Response("Remote image URL not allowed", { status: 400 });

  const cache = (globalThis.caches as CloudflareCacheStorage | undefined)?.default;
  const cacheKey = new Request(request.url, { method: "GET" });
  const cached = cache ? await cache.match(cacheKey) : undefined;
  if (cached) return request.method === "HEAD" ? cachedHeadResponse(cached) : cached;

  const upstream = await fetchAllowedRemoteImage(target);
  if (!upstream.ok) return new Response("Remote image unavailable", { status: upstream.status });
  const contentType = upstream.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("image/")) {
    return new Response("Remote resource is not an image", { status: 415 });
  }

  const headers = new Headers({
    "Cache-Control": "public, max-age=86400, s-maxage=604800",
    "Content-Type": contentType,
    "X-Content-Type-Options": "nosniff",
  });
  for (const headerName of ["etag", "last-modified"]) {
    const value = upstream.headers.get(headerName);
    if (value) headers.set(headerName, value);
  }

  const response = new Response(request.method === "HEAD" ? null : upstream.body, {
    status: 200,
    headers,
  });

  const waitUntil = (ctx as ExecutionContextLike | null | undefined)?.waitUntil;
  if (request.method === "GET" && cache && typeof waitUntil === "function") {
    waitUntil.call(ctx, cache.put(cacheKey, response.clone()));
  }
  return response;
}

function applyMetroProximityEdgeCachePolicy(request: Request, response: Response): Response {
  const url = new URL(request.url);
  if (request.method !== "GET" && request.method !== "HEAD") return response;
  if (!url.pathname.startsWith("/explore/near/")) return response;

  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "no-store, max-age=0");
  headers.set("CDN-Cache-Control", "no-store");
  headers.set("Cloudflare-CDN-Cache-Control", "no-store");
  headers.delete("age");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// This evergreen guide had been served from stale edge HTML after a successful
// deploy, despite updated fixture assets. Keep its canonical SSR HTML uncacheable;
// the existing targeted deployment purge invalidates any older cached copy.
function applyPlayoffGuideEdgeCachePolicy(request: Request, response: Response): Response {
  const url = new URL(request.url);
  if (request.method !== "GET" && request.method !== "HEAD") return response;
  if (url.pathname !== "/article/texas-high-school-football-playoffs-explained") return response;
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "no-store, max-age=0");
  headers.set("CDN-Cache-Control", "no-store");
  headers.set("Cloudflare-CDN-Cache-Control", "no-store");
  headers.delete("age");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function addBingVerificationMeta(request: Request, response: Response): Promise<Response> {
  const cacheSafeResponse = applyPlayoffGuideEdgeCachePolicy(request, applyMetroProximityEdgeCachePolicy(request, response));
  const url = new URL(request.url);
  if (request.method !== "GET" || url.pathname !== "/") return cacheSafeResponse;
  const contentType = cacheSafeResponse.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return cacheSafeResponse;

  const body = await cacheSafeResponse.text();
  if (body.includes('name="msvalidate.01"')) {
    return new Response(body, cacheSafeResponse);
  }

  const html = body.replace("</head>", `${BING_VERIFICATION_META}</head>`);
  const headers = new Headers(cacheSafeResponse.headers);
  headers.delete("content-length");
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const canonicalRedirect = canonicalHostRedirect(request);
      if (canonicalRedirect) return canonicalRedirect;
      const adsTxt = adsTxtResponse(request);
      if (adsTxt) return adsTxt;
      const image = await remoteImageResponse(request, ctx);
      if (image) return image;
      const viator = await viatorApiResponse(request, env, ctx);
      if (viator) return viator;
      const countyRedirect = legacyCountyRedirect(request);
      if (countyRedirect) return countyRedirect;
      const entityRedirect = canonicalEntityRedirect(request);
      if (entityRedirect) return entityRedirect;
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalizedResponse = await normalizeCatastrophicSsrResponse(response);
      return await addBingVerificationMeta(request, normalizedResponse);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
