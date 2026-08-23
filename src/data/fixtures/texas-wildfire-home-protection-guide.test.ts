import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const articleSource = readFileSync(new URL("./texas-wildfire-home-protection-guide.ts", import.meta.url), "utf8");
const loaderSource = readFileSync(new URL("./lazy-newest-evergreen.ts", import.meta.url), "utf8");
const eagerLoaderSource = readFileSync(new URL("./lazy-evergreen.ts", import.meta.url), "utf8");
const linksSource = readFileSync(new URL("./wildfire-home-authority-links.ts", import.meta.url), "utf8");
const repositorySource = readFileSync(new URL("./repositories.ts", import.meta.url), "utf8");

describe("Texas wildfire home protection authority guide", () => {
  it("protects substantive Texas wildfire homeowner coverage and source trails", () => {
    expect((articleSource.match(/\bh\("/g) ?? []).length).toBeGreaterThanOrEqual(15);
    expect((articleSource.match(/\bp\("/g) ?? []).length).toBeGreaterThanOrEqual(30);
    expect((articleSource.match(/href:/g) ?? []).length).toBeGreaterThanOrEqual(10);

    for (const token of [
      "Start with Texas wildfire risk",
      "Embers can matter more than the flame front",
      "zero to five feet",
      "five-to-thirty-foot zone",
      "thirty-to-one-hundred-foot zone",
      "Roofs, vents and gutters",
      "Decks, porches and wooden fences",
      "Emergency access",
      "Evacuation comes before property defense",
      "Buying a rural Texas home",
      "Texas A&M Forest Service wildfire risk",
      "Texas fire-resistant landscaping",
      "Texas fire-resistant construction",
      "Patsy Lynch / FEMA · Public domain · Wikimedia Commons",
    ]) {
      expect(articleSource).toContain(token);
    }
  });

  it("stays behind the dynamic newest-evergreen path with reciprocal discovery", () => {
    expect(loaderSource).toContain('import "./wildfire-home-authority-links"');
    expect(loaderSource).toContain("texasWildfireHomeProtectionGuideStub");
    expect(loaderSource).toContain('slug: "texas-wildfire-home-protection-guide"');
    expect(loaderSource).toContain('import("./texas-wildfire-home-protection-guide")');
    expect(loaderSource).toContain("texasWildfireHomeProtectionGuideArticle");
    expect(eagerLoaderSource).not.toContain("texasWildfireHomeProtectionGuideStub");
    expect(eagerLoaderSource).not.toContain("texas-wildfire-home-protection-guide");
    expect(repositorySource).toContain('import("./lazy-newest-evergreen")');

    for (const sourceSlug of [
      "texas-homeowner-field-manual",
      "texas-trees-around-home-guide",
      "best-native-plants-texas-yard",
      "buying-land-in-texas-guide",
    ]) {
      expect(linksSource).toContain(`"${sourceSlug}"`);
    }
  });
});
