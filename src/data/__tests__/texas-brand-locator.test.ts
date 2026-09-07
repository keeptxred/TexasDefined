import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const serverSource = readFileSync(new URL("../texas-brand-locator.server.ts", import.meta.url), "utf8");
const typesSource = readFileSync(new URL("../texas-brand-locator.types.ts", import.meta.url), "utf8");
const componentSource = readFileSync(new URL("../../components/brands/TexasBrandLocator.tsx", import.meta.url), "utf8");
const brandRouteSource = readFileSync(new URL("../../routes/things-unique-to-texas_.$category.lazy.tsx", import.meta.url), "utf8");
const apiSource = readFileSync(new URL("../../routes/api.texas-brand-locator.ts", import.meta.url), "utf8");
const rootSource = readFileSync(new URL("../../routes/__root.tsx", import.meta.url), "utf8");
const bootstrapSource = readFileSync(new URL("../../../public/texas-brand-locator.js", import.meta.url), "utf8");
const migrationSource = readFileSync(new URL("../../../supabase/migrations/20260907143800_create_texasdefined_brand_locations.sql", import.meta.url), "utf8");

describe("Texas brand locator", () => {
  it("keeps the verified 36-location Buc-ee's Texas registry out of emitted app JavaScript", () => {
    const seededIds = migrationSource.match(/\('bucees-\d+'/g) ?? [];
    expect(seededIds).toHaveLength(36);
    expect(new Set(seededIds).size).toBe(36);
    expect(migrationSource).toContain("'bucees-40','bucees','Buc-ee''s','Buc-ee''s','40','Buc-ee''s #40 — Katy'");
    expect(migrationSource).toContain("'bucees-75','bucees','Buc-ee''s','Buc-ee''s','75','Buc-ee''s #75 — San Marcos'");
    expect(serverSource).toContain('from("texasdefined_brand_locations")');
    expect(serverSource).not.toContain("BUCEES_TEXAS_LOCATIONS");
    expect(componentSource).not.toContain("bucees-40");
    expect(bootstrapSource).not.toContain("bucees-40");
  });

  it("protects the server-only location registry with RLS and explicit service-role access", () => {
    expect(migrationSource).toContain("alter table public.texasdefined_brand_locations enable row level security");
    expect(migrationSource).toContain("revoke all on table public.texasdefined_brand_locations from anon, authenticated");
    expect(migrationSource).toContain("grant select on table public.texasdefined_brand_locations to service_role");
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

  it("fails closed to official locator links instead of fabricating store results", () => {
    expect(serverSource).toContain("Open H-E-B's official store locator");
    expect(serverSource).toContain("Open Buc-ee's official locations");
    expect(serverSource).toContain("H-E-B's live locator could not be reached from TexasDefined");
    expect(serverSource).toContain("Buc-ee's official Texas location registry is available");
    expect(apiSource).toContain("The TexasDefined locator is temporarily unavailable");
    expect(bootstrapSource).toContain("Verify with ${location.brandLabel}");
    expect(componentSource).toContain("Distances are approximate");
  });

  it("exposes a reusable server endpoint and embeds the locator in the existing Texas Brands chapter", () => {
    expect(typesSource).toContain('export type TexasBrandLocatorBrand = "heb" | "bucees"');
    expect(apiSource).toContain('createFileRoute("/api/texas-brand-locator")');
    expect(apiSource).toContain('await import("@/data/texas-brand-locator.server")');
    expect(apiSource).toContain("findTexasBrandLocationsServer");
    expect(brandRouteSource).toContain('import { TexasBrandLocator } from "@/components/brands/TexasBrandLocator"');
    expect(brandRouteSource).toContain("{isTexasBrands && <TexasBrandLocator />}");
  });

  it("keeps interaction out of the protected React main bundle", () => {
    expect(componentSource).toContain("data-texas-brand-locator-form");
    expect(componentSource).not.toContain("useState");
    expect(componentSource).not.toContain("lazy(");
    expect(rootSource).toContain("if (import.meta.env.SSR)");
    expect(rootSource).toContain('<script src="/texas-brand-locator.js" defer />');
    expect(bootstrapSource).toContain('const endpoint = "/api/texas-brand-locator"');
    expect(bootstrapSource).toContain("document.addEventListener(\"submit\"");
    expect(bootstrapSource).toContain("fetch(endpoint");
  });

  it("uses typed address lookup without browser geolocation or address persistence", () => {
    expect(componentSource).toContain('autoComplete="street-address"');
    expect(componentSource).toContain("Your address is used to perform this search and is not stored or displayed publicly.");
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
