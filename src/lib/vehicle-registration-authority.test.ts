import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { INDEXABLE_STATIC_PATHS } from "./public-routes";

const renewalPath = "/texas-vehicle-registration-renewal";
const feesPath = "/texas-vehicle-registration-fees-taxes";
const renewalRouteSource = readFileSync(new URL("../routes/texas-vehicle-registration-renewal.tsx", import.meta.url), "utf8");
const feesRouteSource = readFileSync(new URL("../routes/texas-vehicle-registration-fees-taxes.tsx", import.meta.url), "utf8");
const renewalPageSource = readFileSync(new URL("../components/editorial/VehicleRegistrationRenewalPage.tsx", import.meta.url), "utf8");
const feesPageSource = readFileSync(new URL("../components/editorial/VehicleRegistrationFeesTaxesPage.tsx", import.meta.url), "utf8");
const parentSource = readFileSync(new URL("../routes/texas-vehicle-registration.lazy.tsx", import.meta.url), "utf8");

describe("Texas vehicle registration authority ownership", () => {
  it("registers both specialist guides as indexable static paths", () => {
    expect(INDEXABLE_STATIC_PATHS).toContain(renewalPath);
    expect(INDEXABLE_STATIC_PATHS).toContain(feesPath);
  });

  it("keeps specialist pages self-canonical and lazily rendered", () => {
    expect(renewalRouteSource).toContain(`const canonicalPath = '${renewalPath}'`);
    expect(feesRouteSource).toContain(`const canonicalPath = '${feesPath}'`);
    expect(renewalRouteSource).toContain('lazyRouteComponent');
    expect(feesRouteSource).toContain('lazyRouteComponent');
    expect(renewalRouteSource).toContain('VehicleRegistrationRenewalPage');
    expect(feesRouteSource).toContain('VehicleRegistrationFeesTaxesPage');
  });

  it("grounds both specialist guides in official Texas sources", () => {
    expect(renewalPageSource).toContain("https://www.txdmv.gov/motorists/register-your-vehicle");
    expect(renewalPageSource).toContain("https://www.txdmv.gov/motorists/track");

    expect(feesPageSource).toContain("https://www.txdmv.gov/motorists/register-your-vehicle");
    expect(feesPageSource).toContain("https://comptroller.texas.gov/taxes/motor-vehicle/sales-use.php");
    expect(feesPageSource).toContain("https://comptroller.texas.gov/taxes/motor-vehicle/private-party-spv.php");
  });

  it("links the parent registration authority directly to both specialist guides", () => {
    expect(parentSource).toContain(`to="${renewalPath}"`);
    expect(parentSource).toContain(`to="${feesPath}"`);
  });
});
