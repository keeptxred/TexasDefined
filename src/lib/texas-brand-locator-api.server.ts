import {
  DEFAULT_TEXAS_BRAND_LOCATOR_BRANDS,
  isTexasBrandLocatorBrand,
  texasBrandLocatorFallbackLabel,
  texasBrandLocatorOfficialUrl,
  texasBrandLocatorProvider,
} from "@/data/texas-brand-locator-registry";
import type { TexasBrandLocatorBrand, TexasBrandLocatorResponse } from "@/data/texas-brand-locator.types";
import { findExpandedTexasBrandLocationsServer } from "@/data/texas-brand-locator-heb-formats.server";
import { recordAskTexasQuestionSignal } from "./texas-defined-ai-signals.server";

const ENDPOINT_PATH = "/api/texas-brand-locator";
const MAX_REQUEST_BYTES = 4_096;

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
  return brands.map((brand) => {
    const officialUrl = texasBrandLocatorOfficialUrl(brand);
    return {
      brand,
      label: texasBrandLocatorFallbackLabel(brand),
      url: texasBrandLocatorProvider(brand) === "heb-live"
        ? `${officialUrl}?address=${encodeURIComponent(query)}`
        : officialUrl,
    };
  });
}

function coarseTexasPlace(matchedAddress: string | null) {
  if (!matchedAddress) return null;
  const parts = matchedAddress.split(",").map((part) => part.trim()).filter(Boolean);
  const texasIndex = parts.findIndex((part) => /^TX(?:\s+\d{5}(?:-\d{4})?)?$/i.test(part));
  if (texasIndex <= 0) return null;
  const city = parts[texasIndex - 1]?.replace(/\s+/g, " ").trim().slice(0, 80) ?? "";
  return city || null;
}

function safeClusterPlace(value: string | null) {
  if (!value) return "statewide";
  const normalized = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
  return normalized || "statewide";
}

async function recordPublicLocatorSignal(
  response: TexasBrandLocatorResponse,
  selectedBrands: TexasBrandLocatorBrand[],
  startedAt: number,
) {
  const resultCity = response.results
    .find((result) => selectedBrands.includes(result.brand) && result.city)
    ?.city?.slice(0, 80) ?? null;
  const place = coarseTexasPlace(response.matchedAddress) ?? resultCity;
  const brandKey = selectedBrands.join("+");
  const brandsWithResults = new Set(response.results.map((result) => result.brand));
  const resultCount = response.results.filter((result) => selectedBrands.includes(result.brand)).length;
  const fullCoverage = selectedBrands.every((brand) => brandsWithResults.has(brand));
  const liveHebSourceCount = [...brandsWithResults].some((brand) => texasBrandLocatorProvider(brand) === "heb-live") ? 1 : 0;

  await recordAskTexasQuestionSignal({
    // Deliberately synthetic: never fingerprint or persist the visitor's typed street address.
    question: `brand locator ${brandKey} ${place ?? "texas"}`,
    clusterKey: `brand-locator-form:${brandKey}:${safeClusterPlace(place)}`,
    intent: "nearby",
    topics: ["texas-brands"],
    texasPlace: place,
    freshnessClass: "periodic",
    sourceCount: brandsWithResults.size,
    currentSourceCount: liveHebSourceCount,
    coverageStatus: fullCoverage ? "strong" : resultCount > 0 ? "medium" : "none",
    answerStatus: fullCoverage ? "answered" : "partial",
    model: "deterministic-brand-locator-form",
    latencyMs: Date.now() - startedAt,
    metadata: {
      tool: "brand-locator",
      surface: "texas-brands",
      brands: selectedBrands,
      resultCount,
      noticeCount: response.notices.length,
      fallbackCount: response.fallbackLinks.length,
    },
  });
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
      .filter((brand): brand is TexasBrandLocatorBrand => typeof brand === "string" && isTexasBrandLocatorBrand(brand)),
  ));
  const selectedBrands: TexasBrandLocatorBrand[] = brands.length ? brands : [...DEFAULT_TEXAS_BRAND_LOCATOR_BRANDS];

  if (address.length < 8) {
    return json({
      query: address,
      matchedAddress: null,
      results: [],
      notices: ["Enter a complete Texas street address so TexasDefined can rank nearby locations."],
      fallbackLinks: fallbackLinks(selectedBrands, address),
    }, 400);
  }

  const startedAt = Date.now();
  try {
    const response = await findExpandedTexasBrandLocationsServer({ address, brands: selectedBrands });
    await recordPublicLocatorSignal(response, selectedBrands, startedAt);
    return json(response);
  } catch {
    const response: TexasBrandLocatorResponse = {
      query: address,
      matchedAddress: null,
      results: [],
      notices: ["The TexasDefined locator is temporarily unavailable. Use the official brand locators below while the service recovers."],
      fallbackLinks: fallbackLinks(selectedBrands, address),
    };
    await recordPublicLocatorSignal(response, selectedBrands, startedAt);
    return json(response, 503);
  }
}
