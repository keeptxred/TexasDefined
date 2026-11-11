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
    expect(story).toContain("https://www.trhof.net/texas-radio-hall-of-fame-announces-2026-inductees/");
    expect(story).toContain("https://www.kltv.com/2026/11/05/east-texas-dj-be-inducted-into-texas-radio-hall-fame/");
    expect(museum?.officialUrl).toBe("https://texasbroadcastmuseum.com/");
  });
});
