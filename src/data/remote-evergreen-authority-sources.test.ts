import { describe, expect, it } from "vitest";

import { remoteEvergreenAuthoritySources } from "./remote-evergreen-authority-sources";

const REQUIRED_SLUGS = [
  "sam-houston-texas-life-legacy",
  "davy-crockett-texas-alamo-legend",
  "william-barret-travis-alamo-commander",
  "james-bowie-texas-alamo-life-legend",
  "stephen-f-austin-father-of-texas",
  "mirabeau-b-lamar-president-republic-texas",
  "juan-seguin-tejano-texas-revolution",
  "audie-murphy-texas-war-hero-actor",
  "chester-nimitz-texas-fleet-admiral",
  "chris-kyle-texas-navy-seal-life-legacy",
  "heb-texas-grocery-history-culture",
  "bucees-texas-road-trip-history",
  "king-ranch-texas-history-cattle-legacy",
  "san-antonio-spurs-texas-basketball-culture",
  "texas-high-school-football-friday-night-lights",
  "san-antonio-stock-show-rodeo-history-guide",
  "fort-worth-stockyards-history-cattle-culture",
  "blue-bell-ice-cream-brenham-texas-history",
  "texas-oil-boom-wichita-falls-west-texas-rigs",
] as const;

const APPROVED_SOURCE_HOSTS = new Set([
  "arlingtoncemetery.mil", "buc-ees.com", "careers.heb.com", "chron.com", "fortworthtexas.gov",
  "gov.texas.gov", "history.navy.mil", "king-ranch.com", "newsroom.heb.com", "nba.com",
  "sanantonio.gov", "sarodeo.com", "thealamo.org", "tshaonline.org", "tsl.texas.gov", "uiltexas.org",
  "www.arlingtoncemetery.mil", "www.bluebell.com", "www.chron.com", "www.fda.gov",
  "www.fortworthtexas.gov", "www.history.navy.mil", "www.nba.com", "www.navy.mil",
  "www.rrc.texas.gov", "www.sanantonio.gov", "www.sarodeo.com", "www.thealamo.org",
  "www.tshaonline.org", "www.tsl.texas.gov", "www.uiltexas.org",
]);

describe("remote evergreen authority sources", () => {
  it("covers the complete 19-article evergreen cohort", () => {
    expect(Object.keys(remoteEvergreenAuthoritySources).sort()).toEqual([...REQUIRED_SLUGS].sort());
  });

  for (const slug of REQUIRED_SLUGS) {
    it(`${slug} has multiple usable authority sources`, () => {
      const sources = remoteEvergreenAuthoritySources[slug];
      expect(sources?.length).toBeGreaterThanOrEqual(2);
      expect(new Set(sources.map((source) => source.url)).size).toBe(sources.length);
      for (const source of sources) {
        expect(source.label.trim().length).toBeGreaterThanOrEqual(8);
        expect(source.scope.trim().length).toBeGreaterThanOrEqual(20);
        const url = new URL(source.url);
        expect(url.protocol).toBe("https:");
        expect(APPROVED_SOURCE_HOSTS.has(url.hostname)).toBe(true);
      }
    });
  }
});
