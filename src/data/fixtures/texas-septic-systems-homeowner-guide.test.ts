import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const articleSource = readFileSync(new URL("./texas-septic-systems-homeowner-guide.ts", import.meta.url), "utf8");
const loaderSource = readFileSync(new URL("./lazy-newest-evergreen.ts", import.meta.url), "utf8");
const repositorySource = readFileSync(new URL("./repositories.ts", import.meta.url), "utf8");
const linkSource = readFileSync(new URL("./septic-authority-links.ts", import.meta.url), "utf8");

describe("Texas septic systems homeowner authority guide", () => {
  it("protects substantive OSSF ownership coverage and official source trails", () => {
    expect((articleSource.match(/\bh\("/g) ?? []).length).toBeGreaterThanOrEqual(17);
    expect((articleSource.match(/\bp\("/g) ?? []).length).toBeGreaterThanOrEqual(25);
    expect((articleSource.match(/href:/g) ?? []).length).toBeGreaterThanOrEqual(10);

    for (const token of [
      "Texas septic systems are locally permitted under a statewide framework",
      "Conventional septic systems depend on soil and the disposal field",
      "Aerobic treatment units are small wastewater plants",
      "Learn what the alarm means",
      "The first two years of aerobic-system service are different",
      "If you use a maintenance contract",
      "Water use is a design assumption",
      "Protect the drainfield and spray area",
      "Flooding changes septic safety",
      "Buying a Texas house with septic requires its own due diligence",
      "Know which professional you actually need",
      "TCEQ OSSF information for homeowners",
      "TCEQ OSSF maintenance requirements",
      "TCEQ OSSF permit guidance",
      "CC BY-SA 4.0 · Wikimedia Commons",
    ]) {
      expect(articleSource).toContain(token);
    }
  });

  it("stays on the dynamically loaded newest-evergreen path", () => {
    expect(loaderSource).toContain("texasSepticSystemsHomeownerGuideStub");
    expect(loaderSource).toContain('slug: "texas-septic-systems-homeowner-guide"');
    expect(loaderSource).toContain('import("./texas-septic-systems-homeowner-guide")');
    expect(loaderSource).toContain("texasSepticSystemsHomeownerGuideArticle");
    expect(loaderSource).toContain('import "./septic-authority-links"');
    expect(repositorySource).toContain('import("./lazy-newest-evergreen")');
  });

  it("adds reciprocal rural-home discovery without eager article imports", () => {
    expect(linkSource).toContain('href: "/article/texas-septic-systems-homeowner-guide"');
    expect(linkSource).toContain('"texas-homeowner-field-manual"');
    expect(linkSource).toContain('"texas-rural-wells-water-guide"');
    expect(linkSource).toContain('"buying-land-in-texas-guide"');
  });
});
