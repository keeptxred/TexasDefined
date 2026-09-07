import type { TexasBrandLocatorBrand, TexasBrandLocatorResponse } from "@/data/texas-brand-locator.types";
import { findTexasBrandLocationsServer } from "@/data/texas-brand-locator.server";

const ENDPOINT_PATH = "/api/texas-brand-locator";
const MAX_REQUEST_BYTES = 4_096;
const SUPPORTED_BRANDS = new Set<TexasBrandLocatorBrand>(["heb", "bucees"]);

function json(body: TexasBrandLocatorResponse, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, private",
      "x-content-type-options": "nosniff",
    },
  });
}

function errorJson(message: string, status: number, allow?: string) {
  const headers = new Headers({
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store, private",
    "x-content-type-options": "nosniff",
  });
  if (allow) headers.set("allow", allow);
  return new Response(JSON.stringify({ error: message }), { status, headers });
}

function sameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return false;
  try {
    const requestUrl = new URL(request.url);
    const originUrl = new URL(origin);
    return originUrl.protocol === requestUrl.protocol && originUrl.host === requestUrl.host;
  } catch {
    return false;
  }
}

function fallbackLinks(brands: TexasBrandLocatorBrand[], query: string) {
  return brands.map((brand) => ({
    brand,
    label: brand === "heb" ? "Open H-E-B's official store locator" : "Open Buc-ee's official locations",
    url: brand === "heb"
      ? `https://www.heb.com/store-locations?address=${encodeURIComponent(query)}`
      : "https://buc-ees.com/locations/",
  }));
}

export async function texasBrandLocatorApiResponse(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  if (url.pathname !== ENDPOINT_PATH) return null;

  if (request.method !== "POST") return errorJson("Method not allowed", 405, "POST");
  if (!sameOriginRequest(request)) return errorJson("Cross-origin requests are not allowed", 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return errorJson("Content-Type must be application/json", 415);
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return errorJson("Request body is too large", 413);
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
    return errorJson("Request body is too large", 413);
  }

  const input = (() => {
    try {
      return JSON.parse(rawBody) as { address?: unknown; brands?: unknown };
    } catch {
      return null;
    }
  })();
  if (!input) return errorJson("Request body must be valid JSON", 400);

  const address = typeof input.address === "string" ? input.address.trim().slice(0, 240) : "";
  const brands = Array.from(new Set(
    (Array.isArray(input.brands) ? input.brands : [])
      .filter((brand): brand is TexasBrandLocatorBrand => typeof brand === "string" && SUPPORTED_BRANDS.has(brand as TexasBrandLocatorBrand)),
  ));
  const selectedBrands: TexasBrandLocatorBrand[] = brands.length ? brands : ["heb", "bucees"];

  if (address.length < 8) {
    return json({
      query: address,
      matchedAddress: null,
      results: [],
      notices: ["Enter a complete Texas street address so TexasDefined can rank nearby locations."],
      fallbackLinks: fallbackLinks(selectedBrands, address),
    }, 400);
  }

  try {
    return json(await findTexasBrandLocationsServer({ address, brands: selectedBrands }));
  } catch {
    return json({
      query: address,
      matchedAddress: null,
      results: [],
      notices: ["The TexasDefined locator is temporarily unavailable. Use the official brand locators below while the service recovers."],
      fallbackLinks: fallbackLinks(selectedBrands, address),
    }, 503);
  }
}
