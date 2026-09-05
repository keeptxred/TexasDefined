import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { getCityAuthorityProfile } from "@/data/city-authority-profiles";
import { texasLifeSplitArticles } from "./texas-life-split";

const countyContextSource = readFileSync(
  new URL("../../components/content/CountyStatewideContextSection.tsx", import.meta.url),
  "utf8",
);
const livingPathsSource = readFileSync(
  new URL("../../components/editorial/LivingAuthorityPaths.tsx", import.meta.url),
  "utf8",
);
const schoolFinderSource = readFileSync(
  new URL("../../routes/find-my-school-district.lazy.tsx", import.meta.url),
  "utf8",
);
const policyHost = ["keep", "tx", "red", ".com"].join("");

function linksFor(slug: string) {
  const article = texasLifeSplitArticles.find((candidate) => candidate.slug === slug);
  expect(article, `missing Texas Life article ${slug}`).toBeDefined();
  return article?.internalLinks?.map((link) => link.href) ?? [];
}

function policyPathsFor(slug: string) {
  return linksFor(slug).flatMap((href) => {
    if (!href.startsWith("https://")) return [];
    const url = new URL(href);
    return url.hostname === policyHost ? [url.pathname] : [];
  });
}

describe("Texas Life reciprocal policy and discovery graph", () => {
  it("keeps practical guides connected back to the companion policy authority", () => {
    expect(policyPathsFor("texas-jobs-economy-industries")).toEqual(expect.arrayContaining([
      "/policy/right-to-work",
      "/policy/energy-ercot",
    ]));
    expect(policyPathsFor("texas-schools-family-life")).toEqual(expect.arrayContaining([
      "/policy/charter-schools",
      "/policy/homeschool-autonomy",
      "/policy/parental-rights",
      "/policy/property-taxes",
    ]));
    expect(policyPathsFor("texas-health-safety-daily-living")).toContain("/policy/medical-freedom");
    expect(policyPathsFor("texas-major-cities-regional-differences")).toEqual(expect.arrayContaining([
      "/policy/housing",
      "/policy/state-federal-power",
    ]));
  });

  it("surfaces the Texas Life guides from relocation, county, city and school research paths", () => {
    for (const slug of [
      "texas-culture-social-customs-newcomers",
      "texas-jobs-economy-industries",
      "texas-schools-family-life",
      "texas-health-safety-daily-living",
      "texas-major-cities-regional-differences",
    ]) {
      expect(livingPathsSource).toContain(`/article/${slug}`);
    }

    expect(countyContextSource).toContain("/article/texas-major-cities-regional-differences");
    expect(countyContextSource).toContain("/article/texas-culture-social-customs-newcomers");
    expect(schoolFinderSource).toContain("/article/texas-schools-family-life");

    const houston = getCityAuthorityProfile("houston");
    const cityLinks = houston?.systems.flatMap((system) => system.links.map((link) => link.href)) ?? [];
    expect(cityLinks).toEqual(expect.arrayContaining([
      "/article/texas-major-cities-regional-differences",
      "/article/texas-jobs-economy-industries",
      "/article/texas-schools-family-life",
      "/article/texas-health-safety-daily-living",
    ]));
  });
});
