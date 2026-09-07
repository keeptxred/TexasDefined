import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const serverSource = readFileSync(new URL("../texas-brand-locator.server.ts", import.meta.url), "utf8");
const typesSource = readFileSync(new URL("../texas-brand-locator.types.ts", import.meta.url), "utf8");
const brandRouteSource = readFileSync(new URL("../../routes/things-unique-to-texas_.$category.lazy.tsx", import.meta.url), "utf8");
const apiSource = readFileSync(new URL("../../lib/texas-brand-locator-api.server.ts", import.meta.url), "utf8");
const serverEntrySource = readFileSync(new URL("../../server-entry.ts", import.meta.url), "utf8");
const rootSource = readFileSync(new URL("../../routes/__root.tsx", import.meta.url), "utf8");
const bootstrapSource = readFileSync(new URL("../../../public/texas-brand-locator.js", import.meta.url), "utf8");
const migrationSource = readFileSync(new URL("../../../supabase/migrations/20260907143800_create_texasdefined_brand_locations.sql", import.meta.url), "utf8");
const geographyCacheMigration = readFileSync(new URL("../../../supabase/migrations/20260907193400_allow_brand_location_geography_cache.sql", import.meta.url), "utf8");

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

  it("protects the server-only location registry with RLS and explicit service-role access", () => {
    expect(migrationSource).toContain("alter table public.texasdefined_brand_locations enable row level security");
    expect(migrationSource).toContain("revoke all on table public.texasdefined_brand_locations from anon, authenticated");
    expect(migrationSource).toContain("grant select on table public.texasdefined_brand_locations to service_role");
    expect(geographyCacheMigration).toContain("grant update (latitude, longitude, updated_at)");
    expect(geographyCacheMigration).toContain("to service_role");
    expect(geographyCacheMigration).not.toMatch(/to\s+(?:anon|authenticated)/i);
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
    expect(serverSource).not.toMatch(/GOOGLE_(?:MAPS|PLACES)_API_KEY|MAPBOX_TOKEN|GEOCODIO|HERE_API/i);
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

  it("fails closed to official locator links instead of fabricating store results", () => {
    expect(serverSource).toContain("Open H-E-B's official store locator");
    expect(serverSource).toContain("Open Buc-ee's official locations");
    expect(serverSource).toContain("H-E-B's live locator could not be reached from TexasDefined");
    expect(serverSource).toContain("Buc-ee's official Texas location registry is available");
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

  it("exposes a reusable server endpoint and mounts only on the existing Texas Brands chapter", () => {
    expect(typesSource).toContain('export type TexasBrandLocatorBrand = "heb" | "bucees"');
    expect(apiSource).toContain('const ENDPOINT_PATH = "/api/texas-brand-locator"');
    expect(apiSource).toContain("findTexasBrandLocationsServer");
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
    expect(bootstrapSource).toContain("Find your H-E-B or Buc-ee's");
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
  });
});
