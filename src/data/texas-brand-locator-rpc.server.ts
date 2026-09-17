import { supabase } from "@/integrations/supabase/client";
import {
  texasBrandLocatorLabel,
  texasBrandLocatorOfficialUrl,
  texasBrandLocatorProvider,
  type TexasBrandLocatorVerifiedRegistryBrand,
} from "./texas-brand-locator-registry";
import type { TexasBrandLocatorLocation } from "./texas-brand-locator.types";

type Point = { latitude: number; longitude: number };
type NearestBrandLocationRow = {
  id: string;
  brand_slug: string;
  name: string;
  street: string;
  city: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  source_url: string;
  distance_miles: number;
};
type NearestBrandLocationRpcResult = {
  data: NearestBrandLocationRow[] | null;
  error: { message: string } | null;
};
type NearestBrandLocationRpcClient = {
  rpc: (
    name: "texasdefined_nearest_brand_locations",
    params: { p_brand_slug: string; p_latitude: number; p_longitude: number },
  ) => PromiseLike<NearestBrandLocationRpcResult>;
};

function directionsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export async function findVerifiedRegistryLocationsViaPublicRpcServer(
  brand: TexasBrandLocatorVerifiedRegistryBrand,
  origin: Point,
): Promise<TexasBrandLocatorLocation[]> {
  if (texasBrandLocatorProvider(brand) !== "verified-registry") {
    throw new Error(`${brand} is not configured for the verified registry provider`);
  }

  const client = supabase as unknown as NearestBrandLocationRpcClient;
  const { data, error } = await client.rpc("texasdefined_nearest_brand_locations", {
    p_brand_slug: brand,
    p_latitude: origin.latitude,
    p_longitude: origin.longitude,
  });
  if (error) throw new Error(`Nearest ${texasBrandLocatorLabel(brand)} RPC failed: ${error.message}`);

  const label = texasBrandLocatorLabel(brand);
  const locations = (data ?? [])
    .filter((row) =>
      row.brand_slug === brand
      && typeof row.id === "string"
      && typeof row.name === "string"
      && typeof row.street === "string"
      && typeof row.city === "string"
      && typeof row.postal_code === "string"
      && Number.isFinite(row.latitude)
      && Number.isFinite(row.longitude)
      && Number.isFinite(row.distance_miles))
    .slice(0, 5)
    .map((row): TexasBrandLocatorLocation => {
      const address = `${row.street}, ${row.city}, TX ${row.postal_code}`;
      return {
        id: row.id,
        brand,
        brandLabel: label,
        name: row.name,
        address,
        city: row.city,
        postalCode: row.postal_code,
        distanceMiles: row.distance_miles,
        latitude: row.latitude,
        longitude: row.longitude,
        directionsUrl: directionsUrl(address),
        sourceLabel: `${label} official locations`,
        sourceUrl: row.source_url || texasBrandLocatorOfficialUrl(brand),
      };
    });

  if (!locations.length) throw new Error(`Nearest ${label} RPC returned no public active Texas locations`);
  return locations;
}

export async function findBuceesLocationsViaPublicRpcServer(origin: Point) {
  return findVerifiedRegistryLocationsViaPublicRpcServer("bucees", origin);
}
