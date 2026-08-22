import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const articleSource = readFileSync(new URL("./texas-backup-power-generator-guide.ts", import.meta.url), "utf8");
const loaderSource = readFileSync(new URL("./lazy-newest-evergreen.ts", import.meta.url), "utf8");
const eagerLoaderSource = readFileSync(new URL("./lazy-evergreen.ts", import.meta.url), "utf8");
const linksSource = readFileSync(new URL("./backup-power-authority-links.ts", import.meta.url), "utf8");
const repositorySource = readFileSync(new URL("./repositories.ts", import.meta.url), "utf8");

describe("Texas backup power and generator authority guide", () => {
  it("protects substantive outage, generator and life-safety coverage", () => {
    expect((articleSource.match(/\bh\("/g) ?? []).length).toBeGreaterThanOrEqual(16);
    expect((articleSource.match(/\bp\("/g) ?? []).length).toBeGreaterThanOrEqual(30);
    expect((articleSource.match(/href:/g) ?? []).length).toBeGreaterThanOrEqual(10);

    for (const token of [
      "Build the essential-load list",
      "Portable and standby generators solve different problems",
      "Never run a portable generator in a garage",
      "Carbon monoxide alarms are part of the generator system",
      "transfer switch prevents the dangerous shortcut called backfeeding",
      "Starting watts matter",
      "Central air conditioning can dominate generator sizing",
      "Winter outages create a different essential-load list",
      "Rain and standing water create electrical hazards",
      "Batteries and generators can complement each other",
      "Buying a Texas house with a generator",
      "CPSC carbon monoxide and generator safety",
      "Electrical Safety Foundation generator and transfer-switch guidance",
      "Patsy Lynch / FEMA · Public domain · Wikimedia Commons",
    ]) {
      expect(articleSource).toContain(token);
    }
  });

  it("stays on the dynamic newest-evergreen path and adds reciprocal homeowner discovery", () => {
    expect(loaderSource).toContain('import "./backup-power-authority-links"');
    expect(loaderSource).toContain("texasBackupPowerGeneratorGuideStub");
    expect(loaderSource).toContain('slug: "texas-backup-power-generator-guide"');
    expect(loaderSource).toContain('import("./texas-backup-power-generator-guide")');
    expect(loaderSource).toContain("texasBackupPowerGeneratorGuideArticle");
    expect(eagerLoaderSource).not.toContain("texasBackupPowerGeneratorGuideStub");
    expect(eagerLoaderSource).not.toContain("texas-backup-power-generator-guide");
    expect(repositorySource).toContain('import("./lazy-newest-evergreen")');

    for (const sourceSlug of [
      "texas-homeowner-field-manual",
      "prepare-texas-house-freeze",
      "texas-hurricane-preparation-guide",
      "texas-pool-owner-guide",
      "how-to-choose-electricity-plan-texas",
    ]) {
      expect(linksSource).toContain(`"${sourceSlug}"`);
    }
  });
});
