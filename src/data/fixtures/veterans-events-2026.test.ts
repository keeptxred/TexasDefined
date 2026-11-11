import { describe, expect, it } from "vitest";
import { events } from "./texas";

describe("Flyover independent Veterans Day event canonicals", () => {
  const expected = [
    { slug: "houston-salutes-american-heroes-veterans-day", city: "Houston", officialHost: "www.houstontx.gov" },
    { slug: "central-texas-veterans-day-parade-killeen", city: "Killeen", officialHost: "killeentexas.gov" },
    { slug: "northeast-el-paso-veterans-day-parade", city: "El Paso", officialHost: "www.oldglorymemorial.org" },
    { slug: "texas-veterans-day-parade-arlington", city: "Arlington", officialHost: "www.arlingtontx.gov" },
  ];
  it("uses unique evergreen city-specific slugs and dated primary-source event windows", () => {
    for (const entry of expected) {
      const event = events.find((row) => row.slug === entry.slug);
      expect(event).toBeDefined();
      expect(event?.city).toBe(entry.city);
      expect(event?.startDate).toBe("2026-11-11");
      expect(event?.endDate).toBe("2026-11-11");
      expect(event?.sourceCheckedAt).toBeTruthy();
      expect(event?.officialUrl?.startsWith("https://")).toBe(true);
      expect(new URL(event!.officialUrl!).hostname).toBe(entry.officialHost);
      expect(event?.category).toBe("culture");
      expect(event?.slug).not.toMatch(/2026|2027/);
    }
    expect(new Set(events.map((event) => event.slug)).size).toBe(events.length);
  });
  it("preserves event-specific official logistics without implying all locations share times", () => {
    expect(events.find((event) => event.city === "Houston" && event.slug.includes("veterans"))?.blurb).toContain("11:30 a.m.");
    expect(events.find((event) => event.city === "Killeen" && event.slug.includes("veterans"))?.blurb).toContain("11 a.m.");
    expect(events.find((event) => event.city === "El Paso" && event.slug.includes("veterans"))?.blurb).toContain("10–11 a.m.");
  });
});
