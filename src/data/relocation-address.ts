import { createServerFn } from "@tanstack/react-start";

export type RelocationAddressResult = {
  matchedAddress: string;
  state: string;
  county: string | null;
  place: string | null;
  schoolDistrict: string | null;
  latitude: number;
  longitude: number;
};

const resolveRelocationAddressServerFn = createServerFn({ method: "POST" })
  .inputValidator((data: { address: string }) => ({ address: String(data.address ?? "").trim().slice(0, 240) }))
  .handler(async ({ data }) => {
    if (data.address.length < 8) return null;
    const { resolveRelocationAddressServer } = await import("./relocation-address.server");
    return resolveRelocationAddressServer(data.address);
  });

export function resolveRelocationAddress(address: string): Promise<RelocationAddressResult | null> {
  return resolveRelocationAddressServerFn({ data: { address } });
}
