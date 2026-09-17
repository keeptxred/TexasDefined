import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  TEXAS_BRAND_LOCATOR_REGISTRY,
  isTexasBrandLocatorOfficialDirectoryBrand,
} from "../texas-brand-locator-registry";
import {
  findOfficialDirectoryLocationsServer,
  parseWhataburgerTexasDirectory,
} from "../texas-brand-locator-official-directory.server";
import { classifyTexasBrandLocationQuestion } from "../../lib/texas-defined-ai-location.server";

const serverSource = readFileSync(new URL("../texas-brand-locator.server.ts", import.meta.url), "utf8");
const directorySource = readFileSync(new URL("../texas-brand-locator-official-directory.server.ts", import.meta.url), "utf8");
const bootstrapSource = readFileSync(new URL("../../../public/texas-brand-locator.js", import.meta.url), "utf8");

function fixtureHtml() {
  return `<!doctype html><html><body>
    <script type="text/data" class="js-map-data">${JSON.stringify({
      response: {
        entities: [
          {
            url: "tx/austin/100-congress-ave.html",
            profile: {
              name: "Congress Ave Whataburger # 101",
              address: { line1: "100 Congress Ave", city: "Austin", region: "TX", postalCode: "78701" },
              yextDisplayCoordinate: { lat: 30.2637, long: -97.7431 },
              meta: { id: "101" },
            },
          },
          {
            url: "/tx/austin/2800-guadalupe-st.html",
            profile: {
              name: "Guadalupe Whataburger # 202",
              address: { line1: "2800 Guadalupe St", city: "Austin", region: "Texas", postalCode: "78705" },
              yextDisplayCoordinate: { lat: 30.2934, long: -97.7419 },
              meta: { id: "202" },
            },
          },
          {
            url: "ok/example/1-main-st.html",
            profile: {
              name: "Out of state",
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

describe("Whataburger Texas brand locator", () => {
  it("registers Whataburger as a first-party official-directory brand", () => {
    expect(TEXAS_BRAND_LOCATOR_REGISTRY.whataburger.label).toBe("Whataburger");
    expect(TEXAS_BRAND_LOCATOR_REGISTRY.whataburger.provider).toBe("official-directory");
    expect(TEXAS_BRAND_LOCATOR_REGISTRY.whataburger.officialLocatorUrl).toBe("https://locations.whataburger.com/");
    expect(isTexasBrandLocatorOfficialDirectoryBrand("whataburger")).toBe(true);
  });

  it("parses Texas entities from Whataburger's official Yext directory payload and rejects non-Texas rows", () => {
    const locations = parseWhataburgerTexasDirectory(fixtureHtml());
    expect(locations).toHaveLength(2);
    expect(locations[0]).toMatchObject({
      id: "101",
      name: "Congress Ave Whataburger # 101",
      address: "100 Congress Ave, Austin, TX 78701",
      city: "Austin",
      postalCode: "78701",
      latitude: 30.2637,
      longitude: -97.7431,
      sourceUrl: "https://locations.whataburger.com/tx/austin/100-congress-ave.html",
    });
    expect(locations.some((location) => location.id === "999")).toBe(false);
  });

  it("fails closed when the official map payload is absent", () => {
    expect(() => parseWhataburgerTexasDirectory("<html><body>No map payload</body></html>")).toThrow(
      "Official directory map data was not found",
    );
  });

  it("ranks Whataburger results by distance from the grounded Texas point", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(fixtureHtml(), { status: 200 })));
    const results = await findOfficialDirectoryLocationsServer("whataburger", {
      latitude: 30.264,
      longitude: -97.743,
    });
    expect(results).toHaveLength(2);
    expect(results[0].id).toBe("whataburger-101");
    expect(results[0].distanceMiles).toBeLessThan(results[1].distanceMiles ?? Number.POSITIVE_INFINITY);
    expect(results[0].sourceLabel).toBe("Whataburger official Texas location directory");
  });

  it("routes Whataburger through the same locator and Ask Texas brand intelligence", () => {
    const intent = classifyTexasBrandLocationQuestion("Where is the nearest Whataburger to Austin?");
    expect(intent.isLocationQuestion).toBe(true);
    expect(intent.brands).toEqual(["whataburger"]);
    expect(serverSource).toContain("findOfficialDirectoryLocationsServer(brand, origin)");
    expect(serverSource).toContain('brand === "whataburger"');
    expect(serverSource).toContain("Whataburger's official Texas directory");
  });

  it("keeps Whataburger in the deferred framework-free UI and outside paid location APIs", () => {
    expect(bootstrapSource).toContain('["whataburger", "Nearest Whataburger locations"]');
    expect(bootstrapSource).toContain('["whataburger", "Whataburger"]');
    expect(bootstrapSource).toContain("Whataburger's official Texas location directory");
    expect(directorySource).toContain('sourceUrl: "https://locations.whataburger.com/tx.html"');
    expect(directorySource).toContain("js-map-data");
    expect(directorySource).not.toMatch(/GOOGLE_(?:MAPS|PLACES)_API_KEY|MAPBOX_TOKEN|GEOCODIO|HERE_API/i);
    expect(directorySource).not.toContain("texasdefined_brand_locations");
  });
});
