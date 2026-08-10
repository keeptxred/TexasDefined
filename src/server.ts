import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

const LEGACY_COUNTY_ARTICLE_REDIRECTS: Record<string, string> = {
  "/article/brewster-county-big-bend-texas": "/county/brewster",
  "/article/presidio-county-marfa-borderlands-texas": "/county/presidio",
  "/article/jeff-davis-county-fort-davis-mountains-texas": "/county/jeff-davis",
  "/article/culberson-county-van-horn-guadalupe-mountains-texas": "/county/culberson",
  "/article/hudspeth-county-sierra-blanca-salt-flats-texas": "/county/hudspeth",
  "/article/el-paso-county-missions-rio-grande-texas": "/county/el-paso",
  "/article/el-paso-county-pass-missions-borderlands-texas": "/county/el-paso",
  "/article/reeves-county-pecos-balmorhea-texas": "/county/reeves",
  "/article/pecos-county-fort-stockton-comanche-springs-texas": "/county/pecos",
  "/article/ward-county-monahans-sandhills-texas": "/county/ward",
  "/article/winkler-county-kermit-wink-oil-texas": "/county/winkler",
  "/article/andrews-county-andrews-oil-shafter-lake-texas": "/county/andrews",
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

function legacyCountyRedirect(request: Request) {
  if (request.method !== "GET" && request.method !== "HEAD") return null;
  const url = new URL(request.url);
  const target = LEGACY_COUNTY_ARTICLE_REDIRECTS[url.pathname];
  if (!target) return null;
  const destination = new URL(target, url.origin);
  destination.search = url.search;
  return new Response(null, {
    status: 301,
    headers: {
      location: destination.toString(),
      "cache-control": "public, max-age=3600",
    },
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
    const redirect = legacyCountyRedirect(request);
    if (redirect) return redirect;

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
