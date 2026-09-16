import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { INDEXABLE_STATIC_PATHS } from "./public-routes";

const renewalPath = "/texas-vehicle-registration-renewal";
const feesPath = "/texas-vehicle-registration-fees-taxes";
const renewalRouteSource = readFileSync(new URL("../routes/texas-vehicle-registration-renewal.tsx", import.meta.url), "utf8");
const feesRouteSource = readFileSync(new URL("../routes/texas-vehicle-registration-fees-taxes.tsx", import.meta.url), "utf8");
const authorityPagesSource = readFileSync(new URL("../components/editorial/VehicleRegistrationAuthorityPages.tsx", import.meta.url), "utf8");
const schemaSource = readFileSync(new URL("../components/editorial/VehicleRegistrationAuthoritySchema.tsx", import.meta.url), "utf8");
const renewalPageSource = readFileSync(new URL("../components/editorial/VehicleRegistrationRenewalPage.tsx", import.meta.url), "utf8");
const feesPageSource = readFileSync(new URL("../components/editorial/VehicleRegistrationFeesTaxesPage.tsx", import.meta.url), "utf8");
const parentSource = readFileSync(new URL("../routes/texas-vehicle-registration.lazy.tsx", import.meta.url), "utf8");

describe("Texas vehicle registration authority ownership", () => {
  it("registers both specialist guides as indexable static paths", () => {
    expect(INDEXABLE_STATIC_PATHS).toContain(renewalPath);
    expect(INDEXABLE_STATIC_PATHS).toContain(feesPath);
  });

  it("keeps specialist routes self-canonical with source-visible search metadata", () => {
    expect(renewalRouteSource).toContain(`const canonicalPath = '${renewalPath}'`);
    expect(feesRouteSource).toContain(`const canonicalPath = '${feesPath}'`);
    expect(renewalRouteSource).toContain('head: () => pageHead');
    expect(feesRouteSource).toContain('head: () => pageHead');
    expect(renewalRouteSource).toContain('https://texasdefined.com${canonicalPath}');
    expect(feesRouteSource).toContain('https://texasdefined.com${canonicalPath}');
    expect(renewalRouteSource).toContain("const title = 'Texas Vehicle Registration Renewal: Online & In Person'");
    expect(feesRouteSource).toContain("const title = 'Texas Vehicle Registration Fees, Taxes & EV Charges'");
  });

  it("keeps heavy specialist UI behind client lazy boundaries", () => {
    expect(renewalRouteSource).toContain("lazy(() =>");
    expect(feesRouteSource).toContain("lazy(() =>");
    expect(renewalRouteSource).toContain("VehicleRegistrationRenewalRouteContent");
    expect(feesRouteSource).toContain("VehicleRegistrationFeesTaxesRouteContent");
    expect(renewalRouteSource).not.toContain("TxDMV says online renewal");
    expect(feesRouteSource).not.toContain("standard presumptive value (SPV)");
    expect(authorityPagesSource).toContain("VehicleRegistrationRenewalPage");
    expect(authorityPagesSource).toContain("VehicleRegistrationFeesTaxesPage");
  });

  it("preserves Article, FAQ and breadcrumb structured data in the lazy authority module", () => {
    expect(schemaSource).toContain("'@type': 'Article'");
    expect(schemaSource).toContain("'@type': 'FAQPage'");
    expect(schemaSource).toContain("'@type': 'BreadcrumbList'");
    expect(schemaSource).toContain(`canonicalPath: '${renewalPath}'`);
    expect(schemaSource).toContain(`canonicalPath: '${feesPath}'`);
    expect(authorityPagesSource).toContain("VehicleRegistrationRenewalSchema");
    expect(authorityPagesSource).toContain("VehicleRegistrationFeesTaxesSchema");
  });

  it("grounds both specialist guides in official Texas sources", () => {
    expect(renewalPageSource).toContain("https://txt.texas.gov/dmv/vehicle-registration-renewal");
    expect(renewalPageSource).toContain("https://www.txdmv.gov/motorists/register-your-vehicle");
    expect(renewalPageSource).toContain("https://www.txdmv.gov/motorists/track");

    expect(feesPageSource).toContain("https://www.txdmv.gov/motorists/register-your-vehicle");
    expect(feesPageSource).toContain("https://comptroller.texas.gov/taxes/motor-vehicle/sales-use.php");
    expect(feesPageSource).toContain("https://comptroller.texas.gov/taxes/motor-vehicle/private-party-spv.php");
  });

  it("links the parent registration authority directly to both specialist guides", () => {
    expect(parentSource).toContain(`to=\"${renewalPath}\"`);
    expect(parentSource).toContain(`to=\"${feesPath}\"`);
  });
});
