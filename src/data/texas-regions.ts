import type { Region } from "./types";

/**
 * TexasDefined's stable public travel-discovery region taxonomy.
 *
 * These are practical Explore/presentation regions, not administrative
 * boundaries and not the canonical broad geographic backbone. Keep the stable
 * `id` values unchanged: destination, event and search records use them as
 * foreign-key-like identifiers and public routes use them as URL slugs. New
 * canonical geography lives in `canonical-geography.ts`, which cross-walks
 * these travel regions without changing existing URLs.
 *
 * Longer boundary and travel definitions live in the evergreen
 * `texas-regions-explained` article so this lightweight presentation layer can
 * remain safe to load throughout the client.
 */
export const TEXAS_REGION_DEFINITIONS: readonly Region[] = [
  { id: "big-bend", name: "Big Bend Country", blurb: "Chihuahuan Desert, mountain ranges, dark skies and the Rio Grande across far West Texas." },
  { id: "gulf-coast", name: "Gulf Coast", blurb: "Barrier islands, bays, marshes, ports and coastal cities along the Gulf of Mexico." },
  { id: "hill-country", name: "Hill Country", blurb: "Limestone hills, spring-fed rivers, live oaks, ranch roads and small towns across Central Texas." },
  { id: "panhandle", name: "Panhandle Plains", blurb: "High Plains, caprock, canyon country, ranching and enormous horizons across the Texas Panhandle." },
  { id: "piney-woods", name: "Piney Woods", blurb: "Pine forests, hardwood bottoms, lakes, bayous and historic towns across East Texas." },
  { id: "prairies-lakes", name: "Prairies & Lakes", blurb: "Blackland prairie, rolling countryside, reservoirs, courthouse towns and the Dallas–Fort Worth region." },
  { id: "south-texas", name: "South Texas Plains", blurb: "Brush country, ranchlands, border culture and the Rio Grande Valley across South Texas." },
] as const;

export const TEXAS_REGION_IDS = TEXAS_REGION_DEFINITIONS.map((region) => region.id);

export function texasRegionDefinition(id: string): Region | undefined {
  return TEXAS_REGION_DEFINITIONS.find((region) => region.id === id);
}
