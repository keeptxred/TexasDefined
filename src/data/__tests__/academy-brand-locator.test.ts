import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  TEXAS_BRAND_LOCATOR_REGISTRY,
  TEXAS_BRAND_LOCATOR_VERIFIED_REGISTRY_BRANDS,
} from "../texas-brand-locator-registry";

const migrationSource = readFileSync(
  new URL("../../../supabase/migrations/20260912140500_add_academy_brand_locations.sql", import.meta.url),
  "utf8",
);
const bootstrapSource = readFileSync(new URL("../../../public/texas-brand-locator.js", import.meta.url), "utf8");
const aiLocationSource = readFileSync(new URL("../../lib/texas-defined-ai-location.server.ts", import.meta.url), "utf8");

describe("Academy Sports + Outdoors Texas brand locator", () => {
  it("registers Academy as a verified-registry brand with an official Texas source", () => {
    const academy = TEXAS_BRAND_LOCATOR_REGISTRY.academy;
    expect(academy.provider).toBe("verified-registry");
    expect(academy.officialLocatorUrl).toBe("https://www.academy.com/storelocator/texas");
    expect(academy.queryPattern.test("nearest Academy to Austin")).toBe(true);
    expect(academy.queryPattern.test("Academy Sports + Outdoors near me")).toBe(true);
    expect(TEXAS_BRAND_LOCATOR_VERIFIED_REGISTRY_BRANDS).toContain("academy");
  });

  it("seeds the complete verified Texas registry while withholding planned stores from public results", () => {
    expect(migrationSource).toContain("check (brand_slug in ('heb', 'bucees', 'academy'))");
    expect(migrationSource.match(/\"n\":\"/g)).toHaveLength(127);
    expect(migrationSource.match(/\"status\":\"active\"/g)).toHaveLength(120);
    expect(migrationSource.match(/\"status\":\"planned\"/g)).toHaveLength(7);
    expect(migrationSource).toContain("status = 'active'");
    expect(migrationSource).toContain("active_public_count <> 120");
    expect(migrationSource).toContain("planned_private_count <> 7");
    expect(migrationSource).toContain("total_count <> 127");
  });

  it("keeps every Academy row grounded to an official store page, coordinate and exact county", () => {
    expect(migrationSource.match(/https:\/\/www\.academy\.com\/storelocator\/texas\//g)).toHaveLength(127);
    expect(migrationSource).toContain('"county":"harris"');
    expect(migrationSource).toContain('"county":"travis"');
    expect(migrationSource).toContain('"county":"el-paso"');
    expect(migrationSource).not.toContain('"county":null');
    expect(migrationSource).not.toContain('"lat":null');
    expect(migrationSource).not.toContain('"lon":null');
  });

  it("exposes Academy through the deferred UI and the registry-driven Ask Texas classifier", () => {
    expect(bootstrapSource).toContain('["academy", "Academy Sports + Outdoors"]');
    expect(bootstrapSource).toContain('["academy", "Nearest Academy Sports + Outdoors locations"]');
    expect(aiLocationSource).toContain("TEXAS_BRAND_LOCATOR_BRANDS.filter");
    expect(aiLocationSource).toContain("texasBrandLocatorQueryPattern(brand).test(question)");
  });
});
