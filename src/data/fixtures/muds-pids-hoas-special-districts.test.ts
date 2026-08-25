import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("./muds-pids-hoas-special-districts.ts", import.meta.url), "utf8");

describe("MUD/PID/HOA authority cluster", () => {
  it("connects the guide to property-tax and ownership planning tools", () => {
    for (const href of [
      "/property-tax-calculators",
      "/texas-property-tax-county-comparison-calculator",
      "/texas-homeownership-cost-calculator",
      "/article/texas-major-cities-regional-differences",
    ]) {
      expect(source).toContain(`href: "${href}"`);
    }
  });

  it("retains primary Texas authority sources", () => {
    expect(source).toContain("www.tceq.texas.gov/agency/subjects-of-interest/utilities/municipal-utility-districts");
    expect(source).toContain("comptroller.texas.gov/transparency/local/sb625/lookup.php");
    expect(source).toContain("statutes.capitol.texas.gov/Docs/LG/htm/LG.372.htm");
    expect(source).toContain("statutes.capitol.texas.gov/Docs/PR/htm/PR.209.htm");
  });
});
