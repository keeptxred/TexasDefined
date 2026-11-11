import { describe, expect, it } from "vitest";
import { statewideMuseumExpansionWave4Destinations } from "./museum-expansion-statewide-wave4";

describe("Texas Broadcast Museum original 2026 radio heritage", () => {
  it("anchors Diane Day to a verified induction rather than inventing an exhibit", () => {
    const museum = statewideMuseumExpansionWave4Destinations.find((entry) => entry.slug === "texas-broadcast-museum-kilgore");
    expect(museum).toBeDefined();
    const story = (museum?.body ?? []).join(" ");
    expect(story).toContain("Diane Day");
    expect(story).toContain("November 7, 2026");
    expect(story).toContain("20 broadcasters");
    expect(story).toContain("not an ongoing daily show or guaranteed permanent Diane Day exhibit");
    expect(museum?.visitorFaqs?.[0]?.sourceUrl).toBe("https://www.trhof.net/texas-radio-hall-of-fame-announces-2026-inductees/");
    expect(museum?.visitorFaqs?.[0]?.answer).toContain("not a promise of regular ceremonies");
    expect(story).not.toContain("https://");
    expect(museum?.officialUrl).toBe("https://texasbroadcastmuseum.com/");
  });
});
