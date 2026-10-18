import { describe, expect, it } from "vitest";
import { militaryHistoryDestinations } from "../military-history-destinations";

describe("Palo Alto Battlefield exact-site photo attribution", () => {
  it("uses a first-party NPS battlefield photograph instead of a fragile Commons redirect", () => {
    const destination = militaryHistoryDestinations.find(d => d.slug === "palo-alto-battlefield-national-historical-park");
    expect(destination).toBeDefined();
    expect(destination?.hero.src).toBe("https://www.nps.gov/common/uploads/structured_data/3C792376-1DD8-B71B-0BFE87475AD26DCA.jpg");
    expect(destination?.hero.src).not.toContain("Special:Redirect");
    expect(destination?.hero.credit).toContain("National Park Service");
    expect(destination?.hero.credit).toContain("Public domain");
    expect(destination?.hero.alt).toContain("field gun");
    expect(destination?.hero.alt).toContain("Palo Alto Battlefield");
    expect(destination?.officialUrl).toContain("nps.gov/paal/");
  });
});
