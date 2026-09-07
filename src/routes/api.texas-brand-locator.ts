import { createFileRoute } from "@tanstack/react-router";

import type { TexasBrandLocatorBrand, TexasBrandLocatorResponse } from "@/data/texas-brand-locator.types";

const SUPPORTED_BRANDS = new Set<TexasBrandLocatorBrand>(["heb", "bucees"]);

function json(body: TexasBrandLocatorResponse, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, private",
      "x-content-type-options": "nosniff",
    },
  });
}

function fallbackLinks(brands: TexasBrandLocatorBrand[], query: string) {
  return brands.map((brand) => ({
    brand,
    label: brand === "heb" ? "Open H-E-B's official store locator" : "Open Buc-ee's official locations",
    url: brand === "heb"
      ? `https://www.heb.com/store-locations?address=${encodeURIComponent(query)}`
      : "https://buc-ees.com/locations/",
  }));
}

export const Route = createFileRoute("/api/texas-brand-locator")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const input = await request.json().catch(() => null) as { address?: unknown; brands?: unknown } | null;
        const address = typeof input?.address === "string" ? input.address.trim().slice(0, 240) : "";
        const brands = Array.from(new Set(
          (Array.isArray(input?.brands) ? input.brands : [])
            .filter((brand): brand is TexasBrandLocatorBrand => typeof brand === "string" && SUPPORTED_BRANDS.has(brand as TexasBrandLocatorBrand)),
        ));
        const selectedBrands = brands.length ? brands : ["heb", "bucees"] satisfies TexasBrandLocatorBrand[];

        if (address.length < 8) {
          return json({
            query: address,
            matchedAddress: null,
            results: [],
            notices: ["Enter a complete Texas street address so TexasDefined can rank nearby locations."],
            fallbackLinks: fallbackLinks(selectedBrands, address),
          }, 400);
        }

        try {
          const { findTexasBrandLocationsServer } = await import("@/data/texas-brand-locator.server");
          return json(await findTexasBrandLocationsServer({ address, brands: selectedBrands }));
        } catch {
          return json({
            query: address,
            matchedAddress: null,
            results: [],
            notices: ["The TexasDefined locator is temporarily unavailable. Use the official brand locators below while the service recovers."],
            fallbackLinks: fallbackLinks(selectedBrands, address),
          }, 503);
        }
      },
    },
  },
});
