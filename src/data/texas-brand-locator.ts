import { createServerFn } from "@tanstack/react-start";

import type { TexasBrandLocatorBrand, TexasBrandLocatorResponse } from "./texas-brand-locator.types";

const supportedBrands: TexasBrandLocatorBrand[] = ["heb", "bucees"];

const findTexasBrandLocationsServerFn = createServerFn({ method: "POST" })
  .inputValidator((data: { address: string; brands?: string[] }) => {
    const address = String(data.address ?? "").trim().slice(0, 240);
    const brands = Array.from(new Set((Array.isArray(data.brands) ? data.brands : [])
      .filter((brand): brand is TexasBrandLocatorBrand => supportedBrands.includes(brand as TexasBrandLocatorBrand))));
    return { address, brands };
  })
  .handler(async ({ data }) => {
    if (data.address.length < 8) {
      return {
        query: data.address,
        matchedAddress: null,
        results: [],
        notices: ["Enter a complete Texas street address so TexasDefined can rank nearby locations."],
        fallbackLinks: [],
      } satisfies TexasBrandLocatorResponse;
    }
    const { findTexasBrandLocationsServer } = await import("./texas-brand-locator.server");
    return findTexasBrandLocationsServer({
      address: data.address,
      brands: data.brands.length ? data.brands : supportedBrands,
    });
  });

export function findTexasBrandLocations(input: { address: string; brands?: TexasBrandLocatorBrand[] }): Promise<TexasBrandLocatorResponse> {
  return findTexasBrandLocationsServerFn({ data: input });
}

export type { TexasBrandLocatorBrand, TexasBrandLocatorLocation, TexasBrandLocatorResponse } from "./texas-brand-locator.types";
