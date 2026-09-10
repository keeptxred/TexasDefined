import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  DEFAULT_TEXAS_BRAND_LOCATOR_BRANDS,
  TEXAS_BRAND_LOCATOR_BRANDS,
  TEXAS_BRAND_LOCATOR_REGISTRY,
} from "../texas-brand-locator-registry";

const bootstrapSource = readFileSync(new URL("../../../public/texas-brand-locator.js", import.meta.url), "utf8");

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

  it("does not silently add a verified-registry brand before the server provider supports it", () => {
    const verifiedRegistryBrands = TEXAS_BRAND_LOCATOR_BRANDS.filter(
      (brand) => TEXAS_BRAND_LOCATOR_REGISTRY[brand].provider === "verified-registry",
    );
    expect(verifiedRegistryBrands).toEqual(["bucees"]);
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
