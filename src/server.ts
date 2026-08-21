import "./lib/error-capture";

import { countySlugForLegacyArticle } from "./data/county-series";
import { findCompleteTexasEntity } from "./data/knowledge-graph";
import { canonicalEntityPath } from "./data/knowledge-graph/relationships";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

const BING_VERIFICATION_META =
  '<meta name="msvalidate.01" content="74E5E79AEC351CF6D2577A6FC6A125DF" />';

const ENTITY_ROUTE_KINDS = new Set([
  "county", "city", "census-place", "zip-code", "region", "metro-area",
  "lake", "river", "state-park", "national-park", "national-forest",
  "wildlife-management-area", "beach", "mountain", "cavern", "waterfall",
  "agency", "appraisal-district", "tax-office", "county-clerk", "dps-office",
  "museum", "historic-site", "courthouse", "mission", "battlefield",
  "attraction", "scenic-drive", "fair", "rodeo", "festival",
  "holiday-event", "sporting-event", "fairground", "sports-venue",
  "school-district", "university", "utility",
]);

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

function legacyCountyRedirect(request: Request) {
  const url = new URL(request.url);
  const match = url.pathname.match(/^\/article\/([^/]+)\/?$/);
  if (!match) return null;
  const countySlug = countySlugForLegacyArticle(decodeURIComponent(match[1]));
  if (!countySlug) return null;
  url.pathname = `/county/${countySlug}`;
  return Response.redirect(url.toString(), 301);
}

async function canonicalEntityRedirect(request: Request): Promise<Response | null> {
  if (request.method !== "GET" && request.method !== "HEAD") return null;
  const url = new URL(request.url);
  const match = url.pathname.match(/^\/([^/]+)\/([^/]+)\/?$/);
  if (!match) return null;

  let kind: string;
  let requestedSlug: string;
  try {
    kind = decodeURIComponent(match[1]).toLowerCase();
    requestedSlug = decodeURIComponent(match[2]).toLowerCase();
  } catch {
    return null;
  }
  if (!ENTITY_ROUTE_KINDS.has(kind)) return null;

  const entity = await findCompleteTexasEntity(`${kind}:${requestedSlug}`)
    ?? await findCompleteTexasEntity(requestedSlug);
  if (!entity || entity.kind !== kind) return null;

  const canonicalPath = canonicalEntityPath(entity);
  const requestedPath = `/${kind}/${requestedSlug}`;
  if (canonicalPath === requestedPath) return null;

  url.protocol = "https:";
  url.hostname = "texasdefined.com";
  url.port = "";
  url.pathname = canonicalPath;
  return Response.redirect(url.toString(), 301);
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
      const countyRedirect = legacyCountyRedirect(request);
      if (countyRedirect) return countyRedirect;
      const entityRedirect = await canonicalEntityRedirect(request);
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
