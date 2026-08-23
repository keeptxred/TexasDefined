import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const articleSource = readFileSync(new URL("./texas-homeowner-field-manual.ts", import.meta.url), "utf8");
const loaderSource = readFileSync(new URL("./lazy-newest-evergreen.ts", import.meta.url), "utf8");
const repositorySource = readFileSync(new URL("./repositories.ts", import.meta.url), "utf8");

describe("Texas homeowner field manual authority layer", () => {
  it("protects substantive homeowner coverage", () => {
    expect((articleSource.match(/\bh\("/g) ?? []).length).toBeGreaterThanOrEqual(15);
    expect((articleSource.match(/\bp\("/g) ?? []).length).toBeGreaterThanOrEqual(30);
    expect((articleSource.match(/href:/g) ?? []).length).toBeGreaterThanOrEqual(12);

    for (const token of [
      "Learn the address before you learn the house",
      "Treat drainage as a structural system",
      "Know what expansive clay can do",
      "Roofs need a storm history",
      "Electricity plans should be modeled with your real usage",
      "Pools are mechanical systems",
      "Insurance should be reviewed before a claim exists",
      "Build the emergency file before the emergency",
      "Wildlife is normal",
      "Pest pressure is seasonal and regional",
      "Texas Department of Insurance homeowners guidance",
      "Texas Division of Emergency Management preparedness",
      "Public Utility Commission electricity information",
      "Texas Parks and Wildlife species guidance",
    ]) {
      expect(articleSource).toContain(token);
    }
  });

  it("is registered on the dynamically loaded newest-evergreen path", () => {
    expect(loaderSource).toContain("texasHomeownerFieldManualStub");
    expect(loaderSource).toContain('slug: "texas-homeowner-field-manual"');
    expect(loaderSource).toContain('import("./texas-homeowner-field-manual")');
    expect(loaderSource).toContain("texasHomeownerFieldManualArticle");
    expect(repositorySource).toContain('import("./lazy-newest-evergreen")');
  });
});
