import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { INDEXABLE_STATIC_PATHS } from "./public-routes";

const renewalPath = "/texas-vehicle-registration-renewal";
const feesPath = "/texas-vehicle-registration-fees-taxes";
const renewalSource = readFileSync(new URL("../routes/texas-vehicle-registration-renewal.tsx", import.meta.url), "utf8");
const feesSource = readFileSync(new URL("../routes/texas-vehicle-registration-fees-taxes.tsx", import.meta.url), "utf8");
const parentSource = readFileSync(new URL("../routes/texas-vehicle-registration.lazy.tsx", import.meta.url), "utf8");

describe("Texas vehicle registration authority ownership", () => {
  it("registers both specialist guides as indexable static paths", () => {
    expect(INDEXABLE_STATIC_PATHS).toContain(renewalPath);
    expect(INDEXABLE_STATIC_PATHS).toContain(feesPath);
  });

  it("keeps specialist pages self-canonical and grounded in official Texas sources", () => {
    expect(renewalSource).toContain(`const canonicalPath = '${renewalPath}'`);
    expect(renewalSource).toContain("https://www.txdmv.gov/motorists/register-your-vehicle");
    expect(renewalSource).toContain("https://www.txdmv.gov/motorists/track");

    expect(feesSource).toContain(`const canonicalPath = '${feesPath}'`);
    expect(feesSource).toContain("https://www.txdmv.gov/motorists/register-your-vehicle");
    expect(feesSource).toContain("https://comptroller.texas.gov/taxes/motor-vehicle/sales-use.php");
    expect(feesSource).toContain("https://comptroller.texas.gov/taxes/motor-vehicle/private-party-spv.php");
  });

  it("links the parent registration authority directly to both specialist guides", () => {
    expect(parentSource).toContain(`to="${renewalPath}"`);
    expect(parentSource).toContain(`to="${feesPath}"`);
  });
});
