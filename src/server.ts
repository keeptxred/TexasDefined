import "./lib/error-capture";

import { countySlugForLegacyArticle } from "./data/county-series";
import { allowedRemoteImageUrl, REMOTE_IMAGE_PATH } from "./lib/editorial-image-delivery";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { remoteImageRequestHeaders } from "./lib/remote-image-fetch-policy";

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
  "/lake/caddo-lake": "/destination/caddo-lake",
  "/state-park/palo-duro-canyon-state-park": "/destination/palo-duro-canyon-state-park",
  "/state-park/enchanted-rock-state-natural-area": "/destination/enchanted-rock-state-natural-area",
  "/national-park/big-bend-national-park": "/destination/big-bend-national-park",
  "/cavern/natural-bridge-caverns": "/destination/natural-bridge-caverns",
  "/beach/padre-island-national-seashore": "/destination/padre-island-national-seashore",
  "/historic-site/the-alamo": "/destination/the-alamo",
  "/destination/courthouse-on-the-square-museum-denton": "/destination/denton-county-courthouse-on-the-square-museum",
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

async function fetchAllowedRemoteImage(initialUrl: URL) {
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

async function viatorApiResponse(
  request: Request,
  env: unknown,
  ctx: unknown,
): Promise<Response | null> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith(VIATOR_API_PREFIX + "/")) return null;

  const apiKey = viatorApiKey(env);
  if (!apiKey) return viatorError("Viator integration is unavailable", 503);

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

async function addBingVerificationMeta(request: Request, response: Response): Promise<Response> {
  const url = new URL(request.url);
  if (request.method !== "GET" || url.pathname !== "/") return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return response;

  const body = await response.text();
  if (body.includes('name="msvalidate.01"')) {
    return new Response(body, response);
  }

  const html = body.replace("</head>", `${BING_VERIFICATION_META}</head>`);
  const headers = new Headers(response.headers);
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
