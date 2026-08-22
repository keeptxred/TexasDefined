import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const articleSource = readFileSync(new URL("./texas-pool-owner-guide.ts", import.meta.url), "utf8");
const stubSource = readFileSync(new URL("./texas-pool-owner-guide-stub.ts", import.meta.url), "utf8");
const loaderSource = readFileSync(new URL("./lazy-evergreen.ts", import.meta.url), "utf8");
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

  it("stays on the lazy evergreen path with reciprocal homeowner discovery", () => {
    expect(stubSource).toContain('slug: "texas-pool-owner-guide"');
    expect(stubSource).toContain('import "./pool-owner-authority-links"');
    expect(loaderSource).toContain("texasPoolOwnerGuideStub");
    expect(loaderSource).toContain('import("./texas-pool-owner-guide")');
    expect(loaderSource).toContain("texasPoolOwnerGuideArticle");
    expect(repositorySource).toContain('import { lazyEvergreenArticleStubs, loadLazyEvergreenArticle } from "./lazy-evergreen"');

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
