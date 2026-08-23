import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const articleSource = readFileSync(new URL("./texas-household-pests-guide.ts", import.meta.url), "utf8");
const loaderSource = readFileSync(new URL("./lazy-newest-evergreen.ts", import.meta.url), "utf8");
const repositorySource = readFileSync(new URL("./repositories.ts", import.meta.url), "utf8");
const linkSource = readFileSync(new URL("./pest-authority-links.ts", import.meta.url), "utf8");

describe("Texas household pests authority guide", () => {
  it("protects substantive Texas pest coverage and source trails", () => {
    expect((articleSource.match(/\bh\("/g) ?? []).length).toBeGreaterThanOrEqual(14);
    expect((articleSource.match(/\bp\("/g) ?? []).length).toBeGreaterThanOrEqual(25);
    expect((articleSource.match(/href:/g) ?? []).length).toBeGreaterThanOrEqual(10);

    for (const token of [
      "Termites: the pest where documentation matters",
      "Fire ants: manage the colony",
      "Mosquitoes: the most important control step",
      "German cockroaches",
      "Scorpions: reduce shelter and entry points first",
      "Rodents: close the route before setting the trap",
      "Fleas and ticks",
      "Bed bugs",
      "When Texas requires a licensed pest-control professional",
      "Buying a Texas home: pest records belong in due diligence",
      "After a storm or flood",
      "Texas Department of Agriculture pest-control consumer information",
      "Texas DSHS mosquito-borne disease prevention",
      "Texas A&M fire ant program",
      "CC0 · Wikimedia Commons",
    ]) {
      expect(articleSource).toContain(token);
    }
  });

  it("stays on the dynamically loaded newest-evergreen path", () => {
    expect(loaderSource).toContain("texasHouseholdPestsGuideStub");
    expect(loaderSource).toContain('slug: "texas-household-pests-guide"');
    expect(loaderSource).toContain('import("./texas-household-pests-guide")');
    expect(loaderSource).toContain("texasHouseholdPestsGuideArticle");
    expect(loaderSource).toContain('import "./pest-authority-links"');
    expect(repositorySource).toContain('import("./lazy-newest-evergreen")');
  });

  it("adds reciprocal discovery without editing eager article bodies", () => {
    expect(linkSource).toContain('href: "/article/texas-household-pests-guide"');
    expect(linkSource).toContain('"texas-homeowner-field-manual"');
    expect(linkSource).toContain('"texas-home-maintenance-calendar"');
    expect(linkSource).toContain('"texas-wildlife-guide"');
  });
});
