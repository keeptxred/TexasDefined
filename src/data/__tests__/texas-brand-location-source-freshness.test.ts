import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const genericVerifier = readFileSync(new URL("../../../scripts/data/verify-brand-location-sources.mjs", import.meta.url), "utf8");
const compatibilityVerifier = readFileSync(new URL("../../../scripts/data/verify-bucees-location-source.mjs", import.meta.url), "utf8");
const workflow = readFileSync(new URL("../../../.github/workflows/verify-brand-location-sources.yml", import.meta.url), "utf8");
const migration = readFileSync(new URL("../../../supabase/migrations/20260910043005_generalize_brand_location_source_freshness.sql", import.meta.url), "utf8");
const retiredWorkflowUrl = new URL("../../../.github/workflows/verify-bucees-location-source.yml", import.meta.url);

describe("Texas brand location source freshness guard", () => {
  it("uses an adapter registry with the existing Buc-ee's official source as the first verified brand", () => {
    expect(genericVerifier).toContain("export const SOURCE_ADAPTERS");
    expect(genericVerifier).toContain("brandSlug: 'bucees'");
    expect(genericVerifier).toContain("label: \"Buc-ee's\"");
    expect(genericVerifier).toContain("sourceUrl: 'https://buc-ees.com/locations/'");
    expect(genericVerifier).toContain("minExpectedTexasLocations: 30");
    expect(genericVerifier).toContain("parseOfficialLocations: parseBuceesOfficialTexasLocations");
  });

  it("requires the protected registry row to be explicitly public-locator enabled before freshness can advance", () => {
    expect(genericVerifier).toContain("endpoint.searchParams.set('public_locator_enabled', 'eq.true')");
    expect(genericVerifier).toContain("public_locator_enabled");
    expect(genericVerifier).toContain("registry.public_locator_enabled !== true");
    expect(migration).toContain("and public_locator_enabled = true");
    expect(migration).toContain("and state = 'TX'");
    expect(migration).toContain("and status = 'active'");
  });

  it("marks freshness only through the generic service-role RPC after an exact source comparison", () => {
    expect(genericVerifier).toContain("if (!comparison.matches)");
    expect(genericVerifier.indexOf("if (!comparison.matches)")).toBeLessThan(genericVerifier.indexOf("await markRegistryChecked"));
    expect(genericVerifier).toContain("/rest/v1/rpc/touch_brand_location_source_checked");
    expect(genericVerifier).toContain("p_brand_slug: adapter.brandSlug");
    expect(genericVerifier).toContain("p_checked_at: checkedAt");
    expect(migration).toContain("create or replace function public.touch_brand_location_source_checked(");
    expect(migration).toContain("set search_path = pg_catalog, public");
    expect(migration).toContain("revoke all on function public.touch_brand_location_source_checked(text, date) from public, anon, authenticated");
    expect(migration).toContain("grant execute on function public.touch_brand_location_source_checked(text, date) to service_role");
  });

  it("preserves the Buc-ee's freshness RPC and command as compatibility wrappers", () => {
    expect(migration).toContain("create or replace function public.touch_bucees_source_checked");
    expect(migration).toContain("public.touch_brand_location_source_checked('bucees', p_checked_at)");
    expect(compatibilityVerifier).toContain("runCli(process.argv.slice(2), { forcedBrand: 'bucees' })");
    expect(compatibilityVerifier).toContain("parseBuceesOfficialTexasLocations as parseOfficialTexasLocations");
    expect(compatibilityVerifier).toContain("compareBuceesOfficialToRegistry as compareOfficialToRegistry");
  });

  it("never auto-adds, deletes, relabels or rewrites location inventory", () => {
    expect(genericVerifier).not.toMatch(/\.(?:insert|upsert|update|delete)\(/);
    expect(genericVerifier).not.toMatch(/\/rest\/v1\/texasdefined_brand_locations[^\n]*(?:POST|PATCH|DELETE)/i);
    expect(migration).not.toMatch(/\binsert\s+into\s+public\.texasdefined_brand_locations\b/i);
    expect(migration).not.toMatch(/\bdelete\s+from\s+public\.texasdefined_brand_locations\b/i);
    expect(migration).not.toMatch(/\btruncate\s+(?:table\s+)?public\.texasdefined_brand_locations\b/i);
    expect(migration).not.toMatch(/\bset\s+(?:name|street|city|postal_code|location_number|source_url)\s*=/i);
    expect(workflow).toContain("never auto-adds, removes, relabels, or rewrites location inventory");
  });

  it("runs one generic scheduled guard for all configured adapters and opens one actionable drift issue", () => {
    expect(workflow).toContain("name: Verify Texas brand location sources");
    expect(workflow).toContain("cron: '17 13 * * 1'");
    expect(workflow).toContain("node scripts/data/verify-brand-location-sources.mjs --self-test");
    expect(workflow).toContain("node scripts/data/verify-brand-location-sources.mjs --live-all");
    expect(workflow).toContain("environment: texasdefined-publication");
    expect(workflow).toContain("SUPABASE_SERVICE_ROLE_KEY");
    expect(workflow).toContain('DRIFT_ISSUE_TITLE: "Texas brand location source drift detected"');
    expect(existsSync(retiredWorkflowUrl)).toBe(false);
  });

  it("supports one-brand diagnostics without weakening all-brand scheduled verification", () => {
    expect(genericVerifier).toContain("--live <brand-slug>");
    expect(genericVerifier).toContain("if (mode === '--live')");
    expect(genericVerifier).toContain("if (mode === '--live-all')");
    expect(genericVerifier).toContain("for (const adapter of Object.values(SOURCE_ADAPTERS))");
    expect(genericVerifier).toContain("failures.push");
  });
});
