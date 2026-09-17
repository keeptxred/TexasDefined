import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const typesSource = readFileSync(new URL("../data/texas-brand-locator.types.ts", import.meta.url), "utf8");
const registrySource = readFileSync(new URL("../data/texas-brand-locator-verified-registry.server.ts", import.meta.url), "utf8");
const placeScopeSource = readFileSync(new URL("./texas-defined-ai-location-place.server.ts", import.meta.url), "utf8");
const migrationSource = readFileSync(new URL("../../supabase/migrations/20260910150000_ground_bucees_counties.sql", import.meta.url), "utf8");

describe("Ask Texas exact brand-location county grounding", () => {
  it("persists Census-grounded county identity for every active Texas Buc-ee's registry row", () => {
    const rows = migrationSource.match(/\('bucees-\d+',\s*'[a-z-]+'\)/g) ?? [];
    const ids = rows.map((row) => row.match(/bucees-\d+/)?.[0]).filter(Boolean);

    expect(rows).toHaveLength(36);
    expect(new Set(ids).size).toBe(36);
    expect(migrationSource).toContain("U.S. Census Geocoder");
    expect(migrationSource).toContain("Public_AR_Current / Current_Current");
    expect(migrationSource).toContain("Checked 2026-09-10");
    expect(migrationSource).toContain("('bucees-40', 'fort-bend')");
    expect(migrationSource).toContain("('bucees-37', 'denton')");
    expect(migrationSource).toContain("('bucees-22', 'comal')");
    expect(migrationSource).toContain("('bucees-75', 'hays')");
    expect(migrationSource).toContain("county_slug is null");
  });

  it("carries exact county identity through the verified server registry without exposing another client dataset", () => {
    expect(typesSource).toContain("countySlug?: string;");
    expect(registrySource).toContain("countySlug: string | null;");
    expect(registrySource).toContain("countySlug:county_slug");
    expect(registrySource).toContain("countySlug: row.countySlug");
    expect(registrySource).toContain("countySlug: location.countySlug || undefined");
    expect(registrySource).not.toContain("BUCEES_TEXAS_LOCATIONS");
  });

  it("uses direct location county identity before falling back to city inference", () => {
    expect(placeScopeSource).toContain("const exactMatches = results.filter");
    expect(placeScopeSource).toContain("result.countySlug && normalizeCountySlug(result.countySlug) === expectedCounty");
    expect(placeScopeSource).toContain("const unresolved = results.filter((result) => !result.countySlug)");
    expect(placeScopeSource).toContain("if (!unresolved.length) return exactMatches");
    expect(placeScopeSource).toContain("uniqueCities = [...new Set(unresolved.map");
    expect(placeScopeSource).toContain("return [...exactMatches, ...inferredMatches]");
  });
});
