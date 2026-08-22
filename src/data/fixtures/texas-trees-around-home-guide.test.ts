import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const articleSource = readFileSync(new URL("./texas-trees-around-home-guide.ts", import.meta.url), "utf8");
const loaderSource = readFileSync(new URL("./lazy-newest-evergreen.ts", import.meta.url), "utf8");
const repositorySource = readFileSync(new URL("./repositories.ts", import.meta.url), "utf8");
const linkSource = readFileSync(new URL("./tree-homeowner-authority-links.ts", import.meta.url), "utf8");

describe("Texas trees around homes authority guide", () => {
  it("protects substantive homeowner tree-risk coverage and source trails", () => {
    expect((articleSource.match(/\bh\("/g) ?? []).length).toBeGreaterThanOrEqual(16);
    expect((articleSource.match(/\bp\("/g) ?? []).length).toBeGreaterThanOrEqual(25);
    expect((articleSource.match(/href:/g) ?? []).length).toBeGreaterThanOrEqual(10);

    for (const token of [
      "Start with structure, not leaf color",
      "After a storm, safety comes before cleanup",
      "A damaged tree is not automatically a dead tree",
      "Oak pruning has a Texas-specific disease consequence",
      "Do not top a mature tree",
      "The root system extends far beyond the trunk",
      "Drought stress can outlast the drought",
      "Utility lines create a hard safety boundary",
      "Choose a certified arborist before the emergency",
      "Document valuable trees before storm season",
      "Texas A&M Forest Service storm-tree guidance",
      "Texas A&M Forest Service pruning guidance",
      "Texas A&M Forest Service drought guidance",
      "CC BY 2.0 · Wikimedia Commons",
    ]) {
      expect(articleSource).toContain(token);
    }
  });

  it("stays on the dynamically loaded newest-evergreen path", () => {
    expect(loaderSource).toContain("texasTreesAroundHomeGuideStub");
    expect(loaderSource).toContain('slug: "texas-trees-around-home-guide"');
    expect(loaderSource).toContain('import("./texas-trees-around-home-guide")');
    expect(loaderSource).toContain("texasTreesAroundHomeGuideArticle");
    expect(loaderSource).toContain('import "./tree-homeowner-authority-links"');
    expect(repositorySource).toContain('import("./lazy-newest-evergreen")');
  });

  it("adds reciprocal discovery from the existing homeowner and tree layers", () => {
    expect(linkSource).toContain('href: "/article/texas-trees-around-home-guide"');
    expect(linkSource).toContain('"texas-homeowner-field-manual"');
    expect(linkSource).toContain('"texas-trees-guide"');
    expect(linkSource).toContain('"best-native-plants-texas-yard"');
    expect(linkSource).toContain('"texas-hurricane-preparation-guide"');
  });
});
