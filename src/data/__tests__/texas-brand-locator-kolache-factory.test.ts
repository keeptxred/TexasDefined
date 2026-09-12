import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  TEXAS_BRAND_LOCATOR_REGISTRY,
  isTexasBrandLocatorOfficialDirectoryBrand,
} from "../texas-brand-locator-registry";
import {
  findOfficialDirectoryLocationsServer,
  parseKolacheFactoryTexasDirectory,
} from "../texas-brand-locator-official-directory.server";
import { classifyTexasBrandLocationQuestion } from "../../lib/texas-defined-ai-location.server";

const directorySource = readFileSync(new URL("../texas-brand-locator-official-directory.server.ts", import.meta.url), "utf8");
const bootstrapSource = readFileSync(new URL("../../../public/texas-brand-locator.js", import.meta.url), "utf8");

function fixtureHtml() {
  return `<!doctype html><html><body>
    <script type="text/data" class="js-map-data">${JSON.stringify({
      response: {
        entities: [
          {
            url: "tx/houston/5810-kirby",
            profile: {
              name: "Kolache Factory",
              address: { line1: "5810 Kirby", city: "Houston", region: "TX", postalCode: "77005" },
              yextDisplayCoordinate: { lat: 29.7177, long: -95.4185 },
              meta: { id: "houston-kirby" },
            },
          },
          {
            url: "/tx/pearland/9821-broadway",
            profile: {
              name: "Kolache Factory",
              address: { line1: "9821 Broadway #109", city: "Pearland", region: "Texas", postalCode: "77584" },
              yextDisplayCoordinate: { lat: 29.555, long: -95.365 },
              meta: { id: "pearland-broadway" },
            },
          },
          {
            url: "ok/example/1-main-st",
            profile: {
              name: "Kolache Factory",
              address: { line1: "1 Main St", city: "Example", region: "OK", postalCode: "73000" },
              yextDisplayCoordinate: { lat: 35.0, long: -97.0 },
              meta: { id: "999" },
            },
          },
        ],
      },
    })}</script>
  </body></html>`;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Kolache Factory Texas brand locator", () => {
  it("registers Kolache Factory as an official-directory brand", () => {
    expect(TEXAS_BRAND_LOCATOR_REGISTRY["kolache-factory"].label).toBe("Kolache Factory");
    expect(TEXAS_BRAND_LOCATOR_REGISTRY["kolache-factory"].provider).toBe("official-directory");
    expect(TEXAS_BRAND_LOCATOR_REGISTRY["kolache-factory"].officialLocatorUrl).toBe("https://locations.kolachefactory.com/tx");
    expect(isTexasBrandLocatorOfficialDirectoryBrand("kolache-factory")).toBe(true);
  });

  it("parses Texas entities from Kolache Factory's official directory payload and rejects non-Texas rows", () => {
    const locations = parseKolacheFactoryTexasDirectory(fixtureHtml());
    expect(locations).toHaveLength(2);
    expect(locations[0]).toMatchObject({
      id: "houston-kirby",
      name: "Kolache Factory",
      address: "5810 Kirby, Houston, TX 77005",
      city: "Houston",
      postalCode: "77005",
      latitude: 29.7177,
      longitude: -95.4185,
      sourceUrl: "https://locations.kolachefactory.com/tx/houston/5810-kirby",
    });
    expect(locations.some((location) => location.id === "999")).toBe(false);
  });

  it("fails closed when the official map payload is absent", () => {
    expect(() => parseKolacheFactoryTexasDirectory("<html><body>No map payload</body></html>")).toThrow(
      "Official directory map data was not found",
    );
  });

  it("ranks Kolache Factory results by distance from the grounded Texas point", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(fixtureHtml(), { status: 200 })));
    const results = await findOfficialDirectoryLocationsServer("kolache-factory", {
      latitude: 29.718,
      longitude: -95.419,
    });
    expect(results).toHaveLength(2);
    expect(results[0].id).toBe("kolache-factory-houston-kirby");
    expect(results[0].distanceMiles).toBeLessThan(results[1].distanceMiles ?? Number.POSITIVE_INFINITY);
    expect(results[0].sourceLabel).toBe("Kolache Factory official Texas location directory");
  });

  it("routes Kolache Factory through Ask Texas brand-location recognition", () => {
    const intent = classifyTexasBrandLocationQuestion("Where is the nearest Kolache Factory to Houston?");
    expect(intent.isLocationQuestion).toBe(true);
    expect(intent.brands).toEqual(["kolache-factory"]);
  });

  it("keeps Kolache Factory in the deferred framework-free UI and outside paid location APIs", () => {
    expect(bootstrapSource).toContain('["kolache-factory", "Nearest Kolache Factory locations"]');
    expect(bootstrapSource).toContain('["kolache-factory", "Kolache Factory"]');
    expect(bootstrapSource).toContain("Kolache Factory's official Texas location directory");
    expect(directorySource).toContain('sourceUrl: "https://locations.kolachefactory.com/tx"');
    expect(directorySource).toContain("parseYextTexasDirectory");
    expect(directorySource).not.toMatch(/GOOGLE_(?:MAPS|PLACES)_API_KEY|MAPBOX_TOKEN|GEOCODIO|HERE_API/i);
    expect(directorySource).not.toContain("texasdefined_brand_locations");
  });
});