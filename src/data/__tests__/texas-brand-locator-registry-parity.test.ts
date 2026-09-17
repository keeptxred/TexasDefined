import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  DEFAULT_TEXAS_BRAND_LOCATOR_BRANDS,
  TEXAS_BRAND_LOCATOR_BRANDS,
  TEXAS_BRAND_LOCATOR_REGISTRY,
  TEXAS_BRAND_LOCATOR_VERIFIED_REGISTRY_BRANDS,
} from "../texas-brand-locator-registry";

const bootstrapSource = readFileSync(new URL("../../../public/texas-brand-locator.js", import.meta.url), "utf8");
const baseServerSource = readFileSync(new URL("../texas-brand-locator.server.ts", import.meta.url), "utf8");
const verifiedProviderSource = readFileSync(new URL("../texas-brand-locator-verified-registry.server.ts", import.meta.url), "utf8");
const rpcSource = readFileSync(new URL("../texas-brand-locator-rpc.server.ts", import.meta.url), "utf8");

describe("Texas brand locator registry parity", () => {
  it("keeps every registered brand selectable in the deferred public locator UI", () => {
    for (const brand of TEXAS_BRAND_LOCATOR_BRANDS) {
      const label = TEXAS_BRAND_LOCATOR_REGISTRY[brand].label;
      expect(bootstrapSource).toContain(`["${brand}", "${label}"]`);
    }
  });

  it("keeps the default public search anchored to H-E-B plus Buc-ee's", () => {
    expect([...DEFAULT_TEXAS_BRAND_LOCATOR_BRANDS]).toEqual(["heb", "bucees"]);
    expect(bootstrapSource).toContain('["both", "H-E-B + Buc-ee\'s"]');
    expect(bootstrapSource).toContain('const brands = brand === "both" ? ["heb", "bucees"] : [brand]');
  });

  it("requires H-E-B specialty formats to declare a store-name discriminator", () => {
    for (const [brand, config] of Object.entries(TEXAS_BRAND_LOCATOR_REGISTRY)) {
      if (config.provider !== "heb-live" || brand === "heb") continue;
      expect(config.storeNamePattern, `${brand} must declare a storeNamePattern`).toBeInstanceOf(RegExp);
    }
  });

  it("routes every verified-registry brand through the generic server and bounded RPC providers", () => {
    expect(TEXAS_BRAND_LOCATOR_VERIFIED_REGISTRY_BRANDS).toEqual(["bucees", "academy"]);
    expect(baseServerSource).toContain("isTexasBrandLocatorVerifiedRegistryBrand");
    expect(baseServerSource).toContain("findVerifiedRegistryLocationsServer(brand, origin)");
    expect(verifiedProviderSource).toContain("TexasBrandLocatorVerifiedRegistryBrand");
    expect(verifiedProviderSource).toContain('.eq("brand_slug", brand)');
    expect(verifiedProviderSource).not.toContain('brand: "bucees"');
    expect(rpcSource).toContain('client.rpc("texasdefined_nearest_brand_locations"');
    expect(rpcSource).toContain("p_brand_slug: brand");
  });

  it("requires unique labels, official HTTPS locators and query patterns for every brand", () => {
    const labels = TEXAS_BRAND_LOCATOR_BRANDS.map((brand) => TEXAS_BRAND_LOCATOR_REGISTRY[brand].label);
    expect(new Set(labels).size).toBe(labels.length);

    for (const brand of TEXAS_BRAND_LOCATOR_BRANDS) {
      const config = TEXAS_BRAND_LOCATOR_REGISTRY[brand];
      expect(config.officialLocatorUrl).toMatch(/^https:\/\//);
      expect(config.queryPattern).toBeInstanceOf(RegExp);
      expect(config.fallbackLabel.trim().length).toBeGreaterThan(0);
    }
  });
});
