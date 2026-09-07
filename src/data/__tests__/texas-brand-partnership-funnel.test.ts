import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const brandRoute = readFileSync(new URL("../../routes/things-unique-to-texas_.$category.lazy.tsx", import.meta.url), "utf8");
const partnerRoute = readFileSync(new URL("../../routes/partner-with-us.tsx", import.meta.url), "utf8");
const partnerForm = readFileSync(new URL("../../routes/partner-with-us.lazy.tsx", import.meta.url), "utf8");
const partnerFn = readFileSync(new URL("../partner-inquiry.functions.ts", import.meta.url), "utf8");
const partnerServer = readFileSync(new URL("../partner-inquiry.server.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../../../supabase/migrations/20260907021500_allow_texas_brand_partner_inquiries.sql", import.meta.url), "utf8");

describe("Texas Brands partnership funnel", () => {
  it("routes brand and retail inquiries from the directory into the existing partner form", () => {
    expect(brandRoute).toContain("type=brand-retail&source=%2Fthings-unique-to-texas%2Ftexas-brands");
    expect(brandRoute).toContain("Partnerships do not buy inclusion, rankings, favorable coverage or changes to factual conclusions.");
    expect(partnerRoute).toContain("'/things-unique-to-texas/texas-brands'");
    expect(partnerForm).toContain("['brand-retail', 'Texas brand / grocery / retail']");
    expect(partnerForm).toContain("Inclusion and editorial treatment are not for sale.");
  });

  it("accepts brand-retail only through the validated server and database contract", () => {
    expect(partnerFn).toContain("'brand-retail'");
    expect(partnerFn).toContain("z.literal('/things-unique-to-texas/texas-brands')");
    expect(partnerServer).toContain("'brand-retail'");
    expect(migration).toContain("'brand-retail'::text");
    expect(migration).toContain("texasdefined_partner_inquiries_partnership_type_check");
  });
});
