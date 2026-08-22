import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const articleSource = readFileSync(new URL("./texas-pool-owner-guide.ts", import.meta.url), "utf8");
const newestLoaderSource = readFileSync(new URL("./lazy-newest-evergreen.ts", import.meta.url), "utf8");
const eagerLoaderSource = readFileSync(new URL("./lazy-evergreen.ts", import.meta.url), "utf8");
const linksSource = readFileSync(new URL("./pool-owner-authority-links.ts", import.meta.url), "utf8");
const repositorySource = readFileSync(new URL("./repositories.ts", import.meta.url), "utf8");

describe("Texas pool owner authority guide", () => {
  it("protects substantive year-round pool ownership coverage and official sources", () => {
    expect((articleSource.match(/\bh\("/g) ?? []).length).toBeGreaterThanOrEqual(16);
    expect((articleSource.match(/\bp\("/g) ?? []).length).toBeGreaterThanOrEqual(30);
    expect((articleSource.match(/href:/g) ?? []).length).toBeGreaterThanOrEqual(10);

    for (const token of [
      "Chlorine and pH are the first water-quality controls",
      "Stabilizer helps outdoors",
      "Pump runtime should solve a circulation problem",
      "Filters tell you when circulation is being restricted",
      "A falling water level needs an evaporation test",
      "Storm preparation is mostly about water level, power and debris",
      "Freeze protection is an equipment plan",
      "Pool electricity belongs in the household energy model",
      "Chemical storage deserves the same respect as electrical equipment",
      "Safety barriers and drains are ownership systems too",
      "Buying a Texas house with a pool",
      "CDC home pool water treatment and testing",
      "CPSC residential pool barrier guidance",
      "U.S. Department of Energy pool-pump standards",
      "Spheroidite · CC BY-SA 4.0 · Wikimedia Commons",
    ]) {
      expect(articleSource).toContain(token);
    }
  });

  it("stays off the eager client registry and uses dynamic newest-evergreen loading with reciprocal discovery", () => {
    expect(newestLoaderSource).toContain('import "./pool-owner-authority-links"');
    expect(newestLoaderSource).toContain("texasPoolOwnerGuideStub");
    expect(newestLoaderSource).toContain('slug: "texas-pool-owner-guide"');
    expect(newestLoaderSource).toContain('import("./texas-pool-owner-guide")');
    expect(newestLoaderSource).toContain("texasPoolOwnerGuideArticle");
    expect(eagerLoaderSource).not.toContain("texasPoolOwnerGuideStub");
    expect(eagerLoaderSource).not.toContain("texas-pool-owner-guide");
    expect(repositorySource).toContain('import("./lazy-newest-evergreen")');

    for (const sourceSlug of [
      "texas-homeowner-field-manual",
      "texas-home-maintenance-calendar",
      "prepare-texas-house-freeze",
      "texas-hurricane-preparation-guide",
      "how-to-choose-electricity-plan-texas",
    ]) {
      expect(linksSource).toContain(`"${sourceSlug}"`);
    }
    expect(linksSource).toContain('/article/texas-pool-owner-guide');
  });
});
