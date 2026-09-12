import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const verifier = readFileSync(
  new URL("../../../scripts/data/verify-academy-location-source.mjs", import.meta.url),
  "utf8",
);
const workflow = readFileSync(
  new URL("../../../.github/workflows/verify-brand-location-sources.yml", import.meta.url),
  "utf8",
);
const freshnessMigration = readFileSync(
  new URL("../../../supabase/migrations/20260910043005_generalize_brand_location_source_freshness.sql", import.meta.url),
  "utf8",
);

describe("Academy Texas brand-location source freshness guard", () => {
  it("crawls only Academy's first-party Texas directory hierarchy and fails closed on incomplete inventory", () => {
    expect(verifier).toContain("https://www.academy.com/storelocator/texas");
    expect(verifier).toContain("parseAcademyTexasCityUrls");
    expect(verifier).toContain("parseAcademyTexasStoreUrls");
    expect(verifier).toContain("parseAcademyStorePage");
    expect(verifier).toContain("MIN_EXPECTED_ACTIVE_TEXAS_STORES = 110");
    expect(verifier).toContain("directStoreUrls.length < 70 || cityUrls.length < 5");
    expect(verifier).toContain("storeUrls.length < MIN_EXPECTED_ACTIVE_TEXAS_STORES");
    expect(verifier).toContain("Academy official source returned duplicate store");
  });

  it("compares active official stores to the protected public registry using stable store IDs and per-store source URLs", () => {
    expect(verifier).toContain("officialLocations.filter((row) => row.status === 'active')");
    expect(verifier).toContain("location_number");
    expect(verifier).toContain("normalizeStreet(official.street)");
    expect(verifier).toContain("String(official.postalCode)");
    expect(verifier).toContain("registry.source_url !== official.sourceUrl");
    expect(verifier).toContain("registry.public_locator_enabled !== true");
    expect(verifier).toContain("public_locator_enabled', 'eq.true'");
    expect(verifier).toContain("status', 'eq.active'");
  });

  it("advances freshness only after an exact match through the existing service-role-only generic RPC", () => {
    expect(verifier).toContain("if (!comparison.matches)");
    expect(verifier.indexOf("if (!comparison.matches)")).toBeLessThan(verifier.indexOf("await markAcademyRegistryChecked"));
    expect(verifier).toContain("/rest/v1/rpc/touch_brand_location_source_checked");
    expect(verifier).toContain("p_brand_slug: 'academy'");
    expect(freshnessMigration).toContain("create or replace function public.touch_brand_location_source_checked(");
    expect(freshnessMigration).toContain("and public_locator_enabled = true");
    expect(freshnessMigration).toContain("and state = 'TX'");
    expect(freshnessMigration).toContain("and status = 'active'");
    expect(freshnessMigration).toContain("revoke all on function public.touch_brand_location_source_checked(text, date) from public, anon, authenticated");
    expect(freshnessMigration).toContain("grant execute on function public.touch_brand_location_source_checked(text, date) to service_role");
  });

  it("never auto-adds, deletes, relabels, or rewrites Academy inventory", () => {
    expect(verifier).not.toMatch(/\.(?:insert|upsert|update|delete)\(/);
    expect(verifier).not.toMatch(/method:\s*['"](?:PATCH|PUT|DELETE)['"]/i);
    expect(verifier).not.toMatch(/\/rest\/v1\/texasdefined_brand_locations[^\n]*(?:POST|PATCH|PUT|DELETE)/i);
    expect(verifier).toContain("method: 'POST'");
    expect(verifier).toContain("/rest/v1/rpc/touch_brand_location_source_checked");
  });

  it("keeps visitor-location privacy and zero-paid-location-provider boundaries", () => {
    expect(verifier).not.toMatch(/google\s*(?:maps|places)|mapbox/i);
    expect(verifier).not.toMatch(/navigator\.geolocation|getCurrentPosition/i);
    expect(verifier).not.toMatch(/visitor.*address|typed.*address/i);
    expect(verifier).not.toContain("CENSUS_BATCH_ENDPOINT");
    expect(verifier).not.toContain("CENSUS_SINGLE_ENDPOINT");
  });

  it("enrolls Academy in the existing single weekly source guard and drift issue", () => {
    expect(workflow).toContain("name: Verify Texas brand location sources");
    expect(workflow).toContain("cron: '17 13 * * 1'");
    expect(workflow).toContain("scripts/data/verify-academy-location-source.mjs");
    expect(workflow).toContain("node scripts/data/verify-academy-location-source.mjs --self-test");
    expect(workflow).toContain("node scripts/data/verify-academy-location-source.mjs --live");
    expect(workflow).toContain("node scripts/data/verify-brand-location-sources.mjs --live-all");
    expect(workflow).toContain('DRIFT_ISSUE_TITLE: "Texas brand location source drift detected"');
    expect(workflow).toContain("never auto-adds, removes, relabels, or rewrites location inventory");
  });
});
