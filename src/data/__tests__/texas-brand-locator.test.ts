import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const serverSource = readFileSync(new URL("../texas-brand-locator.server.ts", import.meta.url), "utf8");
const hebFormatsSource = readFileSync(new URL("../texas-brand-locator-heb-formats.server.ts", import.meta.url), "utf8");
const registrySource = readFileSync(new URL("../texas-brand-locator-registry.ts", import.meta.url), "utf8");
const rpcFallbackSource = readFileSync(new URL("../texas-brand-locator-rpc.server.ts", import.meta.url), "utf8");
const typesSource = readFileSync(new URL("../texas-brand-locator.types.ts", import.meta.url), "utf8");
const brandRouteSource = readFileSync(new URL("../../routes/things-unique-to-texas_.$category.lazy.tsx", import.meta.url), "utf8");
const apiSource = readFileSync(new URL("../../lib/texas-brand-locator-api.server.ts", import.meta.url), "utf8");
const signalsSource = readFileSync(new URL("../../lib/texas-defined-ai-signals.server.ts", import.meta.url), "utf8");
const serverEntrySource = readFileSync(new URL("../../server-entry.ts", import.meta.url), "utf8");
const rootSource = readFileSync(new URL("../../routes/__root.tsx", import.meta.url), "utf8");
const bootstrapSource = readFileSync(new URL("../../../public/texas-brand-locator.js", import.meta.url), "utf8");
const deployWorkflowSource = readFileSync(new URL("../../../.github/workflows/deploy-production.yml", import.meta.url), "utf8");
const migrationSource = readFileSync(new URL("../../../supabase/migrations/20260907143800_create_texasdefined_brand_locations.sql", import.meta.url), "utf8");
const geographyCacheMigration = readFileSync(new URL("../../../supabase/migrations/20260907193400_allow_brand_location_geography_cache.sql", import.meta.url), "utf8");
const geographyCacheRestriction = readFileSync(new URL("../../../supabase/migrations/20260907194900_restrict_brand_location_geography_cache.sql", import.meta.url), "utf8");
const nearestRpcMigration = readFileSync(new URL("../../../supabase/migrations/20260907231900_add_nearest_bucees_public_rpc.sql", import.meta.url), "utf8");

describe("Texas brand locator", () => {
  it("keeps the verified 36-location Buc-ee's Texas registry out of emitted app JavaScript", () => {
    const seededIds = migrationSource.match(/\('bucees-\d+'/g) ?? [];
    expect(seededIds).toHaveLength(36);
    expect(new Set(seededIds).size).toBe(36);
    expect(migrationSource).toContain("'bucees-40','bucees','Buc-ee''s','Buc-ee''s','40','Buc-ee''s #40 — Katy'");
    expect(migrationSource).toContain("'bucees-75','bucees','Buc-ee''s','Buc-ee''s','75','Buc-ee''s #75 — San Marcos'");
    expect(serverSource).toContain('from("texasdefined_brand_locations")');
    expect(serverSource).not.toContain("BUCEES_TEXAS_LOCATIONS");
    expect(bootstrapSource).not.toContain("bucees-40");
  });

  it("keeps the registry private while exposing only a constrained nearest-location read RPC", () => {
    expect(migrationSource).toContain("alter table public.texasdefined_brand_locations enable row level security");
    expect(migrationSource).toContain("revoke all on table public.texasdefined_brand_locations from anon, authenticated");
    expect(migrationSource).toContain("grant select on table public.texasdefined_brand_locations to service_role");
    expect(geographyCacheMigration).toContain("grant update (latitude, longitude, updated_at)");
    expect(geographyCacheRestriction).toContain("revoke insert, delete, truncate, references, trigger, update");
    expect(geographyCacheRestriction).toContain("grant update (latitude, longitude, updated_at)");
    expect(geographyCacheRestriction).toContain("to service_role");
    expect(geographyCacheRestriction).not.toMatch(/to\s+(?:anon|authenticated)/i);
    expect(nearestRpcMigration.toLowerCase()).toContain("security definer");
    expect(nearestRpcMigration).toContain("set search_path = pg_catalog, public");
    expect(nearestRpcMigration).toContain("l.brand_slug = 'bucees'");
    expect(nearestRpcMigration).toContain("l.status = 'active'");
    expect(nearestRpcMigration).toContain("l.state = 'TX'");
    expect(nearestRpcMigration).toContain("limit 5");
    expect(nearestRpcMigration).toContain("revoke all on function public.texasdefined_nearest_bucees(double precision, double precision) from public");
    expect(nearestRpcMigration).toContain("grant execute on function public.texasdefined_nearest_bucees(double precision, double precision) to anon, authenticated");
    expect(nearestRpcMigration).not.toMatch(/\b(insert|update|delete|truncate)\s+public\.texasdefined_brand_locations\b/i);
    expect(migrationSource).toContain("https://buc-ees.com/locations/");
    expect(migrationSource).toContain("'2026-09-06','active'");
  });

  it("uses official brand sources and zero-added-cost location primitives", () => {
    expect(serverSource).toContain('url: "https://www.heb.com/store-locations"');
    expect(serverSource).toContain('url: "https://buc-ees.com/locations/"');
    expect(serverSource).toContain("geocoding.geo.census.gov/geocoder/locations/addressbatch");
    expect(serverSource).toContain("commerce-api/v1/store/locator/address");
    expect(serverSource).toContain("radius: 100");
    expect(serverSource).toContain("resolveRelocationAddressServer");
    expect(registrySource).toContain('officialLocatorUrl: "https://www.heb.com/store-locations"');
    expect(registrySource).toContain('officialLocatorUrl: "https://buc-ees.com/locations/"');
    expect(registrySource).toContain('"central-market": {');
    expect(registrySource).toContain('label: "Central Market"');
    expect(registrySource).toContain('"joe-vs": {');
    expect(registrySource).toContain('label: "Joe V\'s Smart Shop"');
    expect(registrySource).toContain('"mi-tienda": {');
    expect(registrySource).toContain('label: "Mi Tienda"');
    expect(hebFormatsSource).toContain("commerce-api/v1/store/locator/address");
    expect(hebFormatsSource).toContain("radius: 100");
    expect(serverSource).not.toMatch(/GOOGLE_(?:MAPS|PLACES)_API_KEY|MAPBOX_TOKEN|GEOCODIO|HERE_API/i);
    expect(hebFormatsSource).not.toMatch(/GOOGLE_(?:MAPS|PLACES)_API_KEY|MAPBOX_TOKEN|GEOCODIO|HERE_API/i);
    expect(rpcFallbackSource).not.toMatch(/GOOGLE_(?:MAPS|PLACES)_API_KEY|MAPBOX_TOKEN|GEOCODIO|HERE_API/i);
  });

  it("filters H-E-B family formats from one live upstream result set instead of storing duplicate location inventories", () => {
    expect(hebFormatsSource).toContain("async function findHebFormatLocations(query: string, brands: TexasBrandLocatorHebFormatBrand[])");
    expect(hebFormatsSource).toContain("return brands.flatMap((brand) => stores");
    expect(hebFormatsSource).toContain("texasBrandLocatorStoreNamePattern(brand)");
    expect(hebFormatsSource).toContain("pattern?.test(name)");
    expect(hebFormatsSource).toContain(".slice(0, RESULTS_PER_BRAND)");
    expect(hebFormatsSource).not.toContain("texasdefined_brand_locations");
    expect(hebFormatsSource).not.toMatch(/Central Market.*street|Joe V.*street|Mi Tienda.*street/i);
  });

  it("does not mislabel specialty-format H-E-B results as ordinary H-E-B stores", () => {
    expect(hebFormatsSource).toContain("function isHebSpecialtyName(name: string)");
    expect(hebFormatsSource).toContain("TEXAS_BRAND_LOCATOR_HEB_FORMAT_BRANDS.some");
    expect(hebFormatsSource).toContain("function keepOrdinaryHebResults(");
    expect(hebFormatsSource).toContain('location.brand !== "heb" || !isHebSpecialtyName(location.name)');
    expect(hebFormatsSource).toContain("returned only specialty-format stores for this search");
    expect(hebFormatsSource).toContain("keepOrdinaryHebResults(response, selectedBrands)");
  });

  it("reuses verified Buc-ee's coordinates before geocoding and persists only missing geography", () => {
    expect(serverSource).toContain('select("id,brand_slug,name,street,city,state,postal_code,latitude,longitude,source_url")');
    expect(serverSource).toContain("function storedBuceesCoordinates");
    expect(serverSource).toContain("const missing = locations.filter((location) => !coordinates.has(location.id))");
    expect(serverSource).toContain("if (!missing.length) return coordinates");
    expect(serverSource).toContain("async function persistBuceesCoordinates");
    expect(serverSource).toContain("update({ latitude: point.latitude, longitude: point.longitude, updated_at: updatedAt })");
    expect(serverSource).toContain("Brand location geography cache persistence failed");
    expect(serverSource).not.toContain("county_slug:");
  });

  it("falls back to the constrained public nearest-location RPC if the Worker admin read path is unavailable", () => {
    expect(serverSource).toContain('await import("./texas-brand-locator-rpc.server")');
    expect(serverSource).toContain("findBuceesLocationsViaPublicRpcServer(origin)");
    expect(rpcFallbackSource).toContain('client.rpc("texasdefined_nearest_bucees"');
    expect(rpcFallbackSource).toContain("p_latitude: origin.latitude");
    expect(rpcFallbackSource).toContain("p_longitude: origin.longitude");
    expect(rpcFallbackSource).toContain(".slice(0, 5)");
    expect(rpcFallbackSource).not.toContain('.from("texasdefined_brand_locations")');
    expect(rpcFallbackSource).not.toMatch(/\.(?:insert|upsert|update|delete)\(/);
  });

  it("fails closed to official locator links instead of fabricating store results", () => {
    expect(serverSource).toContain("Open H-E-B's official store locator");
    expect(serverSource).toContain("Open Buc-ee's official locations");
    expect(serverSource).toContain("H-E-B's live locator could not be reached from TexasDefined");
    expect(serverSource).toContain("Buc-ee's official Texas location registry is available");
    expect(hebFormatsSource).toContain("did not appear in H-E-B's live results for this search");
    expect(hebFormatsSource).toContain("Use the official H-E-B locator link below");
    expect(apiSource).toContain("The TexasDefined locator is temporarily unavailable");
    expect(bootstrapSource).toContain("Verify with ${location.brandLabel}");
    expect(bootstrapSource).toContain("Distances are approximate");
  });

  it("hardens the public locator endpoint against cross-origin and oversized requests", () => {
    expect(apiSource).toContain("const MAX_REQUEST_BYTES = 4_096");
    expect(apiSource).toContain("function sameOriginRequest");
    expect(apiSource).toContain("Cross-origin requests are not allowed");
    expect(apiSource).toContain("Content-Type must be application/json");
    expect(apiSource).toContain("Request body is too large");
    expect(apiSource).toContain("new TextEncoder().encode(rawBody).byteLength");
  });

  it("accepts the registered H-E-B family formats without changing the default H-E-B plus Buc-ee's search", () => {
    expect(registrySource).toContain('"central-market"');
    expect(registrySource).toContain('"joe-vs"');
    expect(registrySource).toContain('"mi-tienda"');
    expect(registrySource).toContain('DEFAULT_TEXAS_BRAND_LOCATOR_BRANDS = ["heb", "bucees"]');
    expect(apiSource).toContain("isTexasBrandLocatorBrand(brand)");
    expect(apiSource).toContain("[...DEFAULT_TEXAS_BRAND_LOCATOR_BRANDS]");
    expect(apiSource).toContain("findExpandedTexasBrandLocationsServer");
  });

  it("centralizes server-side brand identity, labels, providers and recognition patterns", () => {
    expect(registrySource).toContain("export const TEXAS_BRAND_LOCATOR_REGISTRY");
    expect(registrySource).toContain("export type TexasBrandLocatorBrand = keyof typeof TEXAS_BRAND_LOCATOR_REGISTRY");
    expect(registrySource).toContain('provider: "heb-live"');
    expect(registrySource).toContain('provider: "verified-registry"');
    expect(registrySource).toContain("queryPattern:");
    expect(typesSource).toContain('export type { TexasBrandLocatorBrand } from "./texas-brand-locator-registry"');
    expect(apiSource).not.toContain("const SUPPORTED_BRANDS");
    expect(apiSource).not.toContain("const HEB_LIVE_BRANDS");
    expect(apiSource).not.toContain("const BRAND_LABELS");
    expect(hebFormatsSource).not.toContain("const HEB_FORMAT_CONFIG");
  });

  it("records public locator demand without persisting the typed street address", () => {
    expect(apiSource).toContain("recordAskTexasQuestionSignal");
    expect(apiSource).toContain("const place = coarseTexasPlace(response.matchedAddress) ?? resultCity");
    expect(apiSource).toContain('question: `brand locator ${brandKey} ${place ?? "texas"}`');
    expect(apiSource).toContain('clusterKey: `brand-locator-form:${brandKey}:${safeClusterPlace(place)}`');
    expect(apiSource).toContain('surface: "texas-brands"');
    expect(apiSource).toContain('model: "deterministic-brand-locator-form"');
    expect(apiSource).not.toContain("question: address");
    expect(apiSource).not.toContain("question: response.matchedAddress");
    expect(signalsSource).not.toContain("raw_question");
    expect(signalsSource).not.toMatch(/street_address|matched_address|postal_address/i);
  });

  it("binds Supabase service credentials as Worker secrets instead of plaintext vars", () => {
    expect(deployWorkflowSource).toContain("SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY || secrets.KEEP_TX_RED_SUPABASE_SERVICE_ROLE_KEY }}");
    expect(deployWorkflowSource).toContain("writeFileSync('.artifacts/texasdefined-worker-secrets.json'");
    expect(deployWorkflowSource).toContain("npx wrangler deploy --secrets-file .artifacts/texasdefined-worker-secrets.json");
    expect(deployWorkflowSource).toContain("trap 'rm -f .artifacts/texasdefined-worker-secrets.json' EXIT");
    expect(deployWorkflowSource).not.toContain("--var SUPABASE_SERVICE_ROLE_KEY");
  });

  it("exposes a reusable server endpoint and mounts only on the existing Texas Brands chapter", () => {
    expect(typesSource).toContain('export type { TexasBrandLocatorBrand } from "./texas-brand-locator-registry"');
    expect(apiSource).toContain('const ENDPOINT_PATH = "/api/texas-brand-locator"');
    expect(apiSource).toContain("findExpandedTexasBrandLocationsServer");
    expect(hebFormatsSource).toContain("findExpandedTexasBrandLocationsNearPointServer");
    expect(serverEntrySource).toContain('import { texasBrandLocatorApiResponse } from "./lib/texas-brand-locator-api.server"');
    expect(serverEntrySource).toContain("const brandLocatorResponse = await texasBrandLocatorApiResponse(request)");
    expect(brandRouteSource).toContain("data-texas-brand-locator-anchor");
    expect(brandRouteSource).not.toContain("TexasBrandLocator");
    expect(bootstrapSource).toContain('document.querySelector("[data-texas-brand-locator-anchor]")');
  });

  it("keeps all locator UI and interaction out of the protected React main bundle", () => {
    expect(rootSource).toContain("if (import.meta.env.SSR)");
    expect(rootSource).toContain('<script src="/texas-brand-locator.js" defer />');
    expect(bootstrapSource).toContain('const endpoint = "/api/texas-brand-locator"');
    expect(bootstrapSource).toContain("Find your H-E-B, Central Market, Joe V's, Mi Tienda or Buc-ee's");
    expect(bootstrapSource).toContain('["central-market", "Central Market"]');
    expect(bootstrapSource).toContain('["joe-vs", "Joe V\'s Smart Shop"]');
    expect(bootstrapSource).toContain('["mi-tienda", "Mi Tienda"]');
    expect(bootstrapSource).toContain("data-texas-brand-locator-form");
    expect(bootstrapSource).toContain("document.addEventListener(\"submit\"");
    expect(bootstrapSource).toContain("fetch(endpoint");
    expect(bootstrapSource).toContain("new MutationObserver(mountLocator)");
  });

  it("uses typed address lookup without browser geolocation or address persistence", () => {
    expect(bootstrapSource).toContain('address.autocomplete = "street-address"');
    expect(bootstrapSource).toContain("Your address is used to perform this search and is not stored or displayed publicly.");
    expect(bootstrapSource).not.toContain("navigator.geolocation");
    expect(bootstrapSource).not.toContain("getCurrentPosition");
    expect(bootstrapSource).not.toMatch(/localStorage|sessionStorage|document\.cookie/);
    expect(apiSource).toContain('"cache-control": "no-store, private"');
    expect(apiSource).not.toContain("insert(");
    expect(apiSource).not.toContain("upsert(");
    expect(serverSource).not.toContain("insert(");
    expect(serverSource).not.toContain("upsert(");
    expect(hebFormatsSource).not.toContain("insert(");
    expect(hebFormatsSource).not.toContain("upsert(");
    expect(rpcFallbackSource).not.toContain("insert(");
    expect(rpcFallbackSource).not.toContain("upsert(");
  });
});