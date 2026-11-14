import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("../routes/api.find-my-county.ts", import.meta.url), "utf8");
describe("Census county lookup upstream timeouts", () => {
  it("bounds all three server-side Census upstream fetch paths", () => {
    expect(source).toContain("const CENSUS_LOOKUP_TIMEOUT_MS = 8_000;");
    expect((source.match(/signal: AbortSignal\.timeout\(CENSUS_LOOKUP_TIMEOUT_MS\)/g) || []).length).toBe(3);
    expect(source).toContain("if (!response.ok) throw new Error('tigerweb-upstream')");
    expect(source).toContain("The Census address service could not be reached. Try again shortly.");
    expect(source).toContain("No Census address match was found.");
  });
});
