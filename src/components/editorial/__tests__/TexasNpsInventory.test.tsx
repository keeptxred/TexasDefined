import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { TexasNpsInventory } from "../TexasNpsInventory";
import { TEXAS_NPS_DIRECTORY } from "@/data/texas-national-park-service-directory";
import { NPS_LOCAL_GUIDES } from "@/data/texas-nps-directory-ssr-fallback";

describe("Public NPS identity directory — server-rendered, not data-fetch dependent", () => {
  const html = renderToStaticMarkup(<TexasNpsInventory />);

  it("renders exactly 18 canonical federal Texas NPS official URLs into the real SSR HTML", () => {
    expect(TEXAS_NPS_DIRECTORY).toHaveLength(18);
    const official = [...html.matchAll(/href="https:\/\/www\.nps\.gov\/([a-z]{4})\/"/g)].map(m => m[1]);
    expect(official).toHaveLength(18);
    expect(new Set(official).size).toBe(18);
    expect(new Set(official)).toEqual(new Set(TEXAS_NPS_DIRECTORY.map(d => d.npsCode)));
    expect(html).toContain('id="complete-texas-nps-inventory"');
    expect(html).toContain("All 18 National Park Service designations in Texas");
    expect(html).toContain("mapped cards");
    expect(html).toContain("does not mean");
  });

  it("groups two formally designated National Parks, twelve other sites, and four corridors", () => {
    const parks = TEXAS_NPS_DIRECTORY.filter(d => d.designation === "national park");
    const corridors = TEXAS_NPS_DIRECTORY.filter(d => d.designation.includes("trail") || d.designation === "wild and scenic river");
    expect(parks).toHaveLength(2);
    expect(corridors).toHaveLength(4);
    expect(TEXAS_NPS_DIRECTORY.length - parks.length - corridors.length).toBe(12);
    for (const landmark of ["Big Bend National Park", "Big Thicket National Preserve", "Blackwell School National Historic Site", "Butterfield Overland National Historic Trail", "Waco Mammoth National Monument"]) {
      expect(html).toContain(landmark);
    }
  });

  it("links existing local guides without inventing guides for unverified sites", () => {
    const localLinks = [...html.matchAll(/href="(\/destination\/[^"]+|\/article\/[^"]+)"/g)].map(m => m[1]);
    expect(new Set(localLinks)).toEqual(new Set(Object.values(NPS_LOCAL_GUIDES)));
    for (const href of localLinks) expect(href.startsWith("/")).toBe(true);
    expect(html).toContain("https://www.nps.gov/state/tx/list.htm");
  });
});
