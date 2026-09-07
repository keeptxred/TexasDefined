import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const serverSource = readFileSync(new URL("../texas-brand-locator.server.ts", import.meta.url), "utf8");
const clientSource = readFileSync(new URL("../texas-brand-locator.ts", import.meta.url), "utf8");
const typesSource = readFileSync(new URL("../texas-brand-locator.types.ts", import.meta.url), "utf8");
const componentSource = readFileSync(new URL("../../components/brands/TexasBrandLocator.tsx", import.meta.url), "utf8");
const interactiveSource = readFileSync(new URL("../../components/brands/TexasBrandLocatorInteractive.tsx", import.meta.url), "utf8");
const brandRouteSource = readFileSync(new URL("../../routes/things-unique-to-texas_.$category.lazy.tsx", import.meta.url), "utf8");
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
    expect(interactiveSource).toContain("Verify with {location.brandLabel}");
    expect(interactiveSource).toContain("Distances are approximate");
  });

  it("exposes one reusable server boundary and embeds it in the existing Texas Brands chapter", () => {
    expect(typesSource).toContain('export type TexasBrandLocatorBrand = "heb" | "bucees"');
    expect(clientSource).toContain('createServerFn({ method: "POST" })');
    expect(clientSource).toContain('await import("./texas-brand-locator.server")');
    expect(clientSource).toContain("findTexasBrandLocations");
    expect(brandRouteSource).toContain('import { TexasBrandLocator } from "@/components/brands/TexasBrandLocator"');
    expect(brandRouteSource).toContain("{isTexasBrands && <TexasBrandLocator />}");
  });

  it("keeps the interactive locator behind a lazy client boundary", () => {
    expect(componentSource).toContain('lazy(() => import("./TexasBrandLocatorInteractive"))');
    expect(componentSource).not.toContain("@/data/texas-brand-locator");
    expect(interactiveSource).toContain("@/data/texas-brand-locator");
  });

  it("uses typed address lookup without browser geolocation or address persistence", () => {
    expect(interactiveSource).toContain('autoComplete="street-address"');
    expect(interactiveSource).toContain("Your address is used to perform this search and is not stored or displayed publicly.");
    expect(interactiveSource).not.toContain("navigator.geolocation");
    expect(interactiveSource).not.toContain("getCurrentPosition");
    expect(serverSource).not.toContain("insert(");
    expect(serverSource).not.toContain("upsert(");
  });
});
