import { supabase } from "@/integrations/supabase/client";
import type { TexasBrandLocatorLocation } from "./texas-brand-locator.types";

type Point = { latitude: number; longitude: number };
type NearestBuceesRow = {
  id: string;
  name: string;
  street: string;
  city: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  source_url: string;
  distance_miles: number;
};
type NearestBuceesRpcResult = {
  data: NearestBuceesRow[] | null;
  error: { message: string } | null;
};
type NearestBuceesRpcClient = {
  rpc: (
    name: "texasdefined_nearest_bucees",
    params: { p_latitude: number; p_longitude: number },
  ) => PromiseLike<NearestBuceesRpcResult>;
};

const BUCEES_SOURCE_URL = "https://buc-ees.com/locations/";

function directionsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export async function findBuceesLocationsViaPublicRpcServer(origin: Point): Promise<TexasBrandLocatorLocation[]> {
  const client = supabase as unknown as NearestBuceesRpcClient;
  const { data, error } = await client.rpc("texasdefined_nearest_bucees", {
    p_latitude: origin.latitude,
    p_longitude: origin.longitude,
  });
  if (error) throw new Error(`Nearest Buc-ee's RPC failed: ${error.message}`);

  const locations = (data ?? [])
    .filter((row) =>
      typeof row.id === "string"
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
        brand: "bucees",
        brandLabel: "Buc-ee's",
        name: row.name,
        address,
        city: row.city,
        postalCode: row.postal_code,
        distanceMiles: row.distance_miles,
        latitude: row.latitude,
        longitude: row.longitude,
        directionsUrl: directionsUrl(address),
        sourceLabel: "Buc-ee's official locations",
        sourceUrl: row.source_url || BUCEES_SOURCE_URL,
      };
    });

  if (!locations.length) throw new Error("Nearest Buc-ee's RPC returned no active Texas locations");
  return locations;
}
