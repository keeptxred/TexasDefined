import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  TEXAS_BRAND_LOCATOR_REGISTRY,
  isTexasBrandLocatorOfficialDirectoryBrand,
} from "../texas-brand-locator-registry";
import {
  findOfficialDirectoryLocationsServer,
  parseShipleyNearbyDirectory,
} from "../texas-brand-locator-official-directory.server";
import { classifyTexasBrandLocationQuestion } from "../../lib/texas-defined-ai-location.server";

const directorySource = readFileSync(new URL("../texas-brand-locator-official-directory.server.ts", import.meta.url), "utf8");
const bootstrapSource = readFileSync(new URL("../../../public/texas-brand-locator.js", import.meta.url), "utf8");

function fixtureHtml() {
  return `<!doctype html><html><body>
    <section>
      <div>Pickup Available Delivery Available Open until 1 pm</div>
      <h5>Red Oak</h5>
      <div>0 miles</div>
      <div>502 n. i-35 e. road</div>
      <div>red oak, TX 75154</div>
      <div>(469) 820-9116</div>
      <a>ORDER NOW</a><a>STORE INFO</a>
    </section>
    <section>
      <div>Closed • Opens at 4 am</div>
      <h5>Ennis</h5>
      <div>18.28 miles</div>
      <div>901 east ennis ave</div>
      <div>ennis, TX 75119</div>
      <div>(469) 456-0977</div>
      <a>ORDER NOW</a><a>STORE INFO</a>
    </section>
  </body></html>`;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Shipley Texas brand locator", () => {
  it("registers Shipley as an official-directory brand without copying a store inventory", () => {
    expect(TEXAS_BRAND_LOCATOR_REGISTRY.shipley.label).toBe("Shipley Do-Nuts");
    expect(TEXAS_BRAND_LOCATOR_REGISTRY.shipley.provider).toBe("official-directory");
    expect(TEXAS_BRAND_LOCATOR_REGISTRY.shipley.officialLocatorUrl).toBe("https://shipleydonuts.com/locations");
    expect(isTexasBrandLocatorOfficialDirectoryBrand("shipley")).toBe(true);
    expect(directorySource).not.toContain("SHIPLEY_TEXAS_LOCATIONS");
    expect(directorySource).not.toContain("texasdefined_brand_locations");
  });

  it("parses Shipley's official nearby results and preserves the official distance", () => {
    const locations = parseShipleyNearbyDirectory(
      fixtureHtml(),
      "https://shipleydonuts.com/locations?lat=32.5334&lng=-96.8213",
    );
    expect(locations).toHaveLength(2);
    expect(locations[0]).toMatchObject({
      name: "Shipley Do-Nuts — Red Oak",
      address: "502 n. i-35 e. road, red oak, TX 75154",
      city: "red oak",
      postalCode: "75154",
      distanceMiles: 0,
    });
    expect(locations[1]).toMatchObject({
      name: "Shipley Do-Nuts — Ennis",
      address: "901 east ennis ave, ennis, TX 75119",
      distanceMiles: 18.28,
    });
  });

  it("fails closed when Shipley's official nearby markup no longer contains parseable locations", () => {
    expect(() => parseShipleyNearbyDirectory("<html><body>Find a Shipley Near You</body></html>")).toThrow(
      "Shipley official locator returned no parseable nearby locations",
    );
  });

  it("queries Shipley with privacy-minimized coordinates and returns its nearest official results", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(fixtureHtml(), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const results = await findOfficialDirectoryLocationsServer("shipley", {
      latitude: 32.53342,
      longitude: -96.82125,
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0]?.[0])).toBe(
      "https://shipleydonuts.com/locations?lat=32.5334&lng=-96.8213",
    );
    expect(results).toHaveLength(2);
    expect(results[0]).toMatchObject({
      brand: "shipley",
      brandLabel: "Shipley Do-Nuts",
      distanceMiles: 0,
      sourceLabel: "Shipley Do-Nuts official location finder",
    });
    expect(results[1].distanceMiles).toBe(18.28);
  });

  it("routes Shipley through Ask Texas brand-location recognition", () => {
    const intent = classifyTexasBrandLocationQuestion("Where is the nearest Shipley Do-Nuts to Houston?");
    expect(intent.isLocationQuestion).toBe(true);
    expect(intent.brands).toEqual(["shipley"]);
  });

  it("keeps Shipley in the deferred framework-free UI and outside paid location APIs", () => {
    expect(bootstrapSource).toContain('["shipley", "Nearest Shipley Do-Nuts locations"]');
    expect(bootstrapSource).toContain('["shipley", "Shipley Do-Nuts"]');
    expect(bootstrapSource).toContain("Shipley Do-Nuts' official nearby-location finder");
    expect(directorySource).toContain("https://shipleydonuts.com/locations?lat=");
    expect(directorySource).not.toMatch(/GOOGLE_(?:MAPS|PLACES)_API_KEY|MAPBOX_TOKEN|GEOCODIO|HERE_API/i);
  });
});