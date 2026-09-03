import type { Region, TexasRegion } from "./types";

/**
 * TexasDefined's canonical editorial region taxonomy.
 *
 * These are practical discovery regions, not administrative boundaries. Texas
 * is divided differently by state agencies, ecologists, historians and tourism
 * organizations, so edges should be treated as approximate transition zones.
 *
 * Keep the stable `id` values unchanged: destination, event and search records
 * already use them as foreign-key-like identifiers.
 */
export interface TexasRegionDefinition extends Region {
  canonicalPath: `/explore/region/${TexasRegion}`;
  definition: string;
  aliases: readonly string[];
  anchorPlaces: readonly string[];
}

export const TEXAS_REGION_DEFINITIONS: readonly TexasRegionDefinition[] = [
  {
    id: "big-bend",
    name: "Big Bend Country",
    blurb: "Chihuahuan Desert, mountain ranges, dark skies and the Rio Grande across far West Texas.",
    canonicalPath: "/explore/region/big-bend",
    definition: "TexasDefined's far-West Texas region centered on the Big Bend, Trans-Pecos desert and mountain country, including the communities and landscapes around Big Bend, the Davis Mountains and El Paso borderlands.",
    aliases: ["Big Bend", "Far West Texas", "Trans-Pecos"],
    anchorPlaces: ["Big Bend National Park", "Alpine", "Marfa", "Fort Davis", "El Paso"],
  },
  {
    id: "gulf-coast",
    name: "Gulf Coast",
    blurb: "Barrier islands, bays, marshes, ports and coastal cities along the Gulf of Mexico.",
    canonicalPath: "/explore/region/gulf-coast",
    definition: "TexasDefined's coastal region following the Gulf shoreline and adjacent coastal plain, from the upper coast through the Coastal Bend and south toward the lower coast.",
    aliases: ["Texas Gulf Coast", "Coastal Texas", "Coastal Bend"],
    anchorPlaces: ["Houston", "Galveston", "Corpus Christi", "Port Aransas", "Beaumont"],
  },
  {
    id: "hill-country",
    name: "Hill Country",
    blurb: "Limestone hills, spring-fed rivers, live oaks, ranch roads and small towns across Central Texas.",
    canonicalPath: "/explore/region/hill-country",
    definition: "TexasDefined's Central Texas limestone-and-springs region associated with the Edwards Plateau and Balcones landscape west of Austin and north and west of San Antonio.",
    aliases: ["Texas Hill Country", "Central Texas Hill Country"],
    anchorPlaces: ["Fredericksburg", "Kerrville", "Wimberley", "Johnson City", "Bandera"],
  },
  {
    id: "panhandle",
    name: "Panhandle Plains",
    blurb: "High Plains, caprock, canyon country, ranching and enormous horizons across the Texas Panhandle.",
    canonicalPath: "/explore/region/panhandle",
    definition: "TexasDefined's Panhandle and High Plains region, including the Llano Estacado, agricultural plains, ranch country and canyon landscapes of the state's northern reach.",
    aliases: ["Panhandle", "Panhandle & Plains", "Texas High Plains"],
    anchorPlaces: ["Amarillo", "Lubbock", "Palo Duro Canyon", "Canyon", "Caprock Canyons"],
  },
  {
    id: "piney-woods",
    name: "Piney Woods",
    blurb: "Pine forests, hardwood bottoms, lakes, bayous and historic towns across East Texas.",
    canonicalPath: "/explore/region/piney-woods",
    definition: "TexasDefined's forested East Texas region, stretching through pine and hardwood country toward the Louisiana border and including major lake, timber and bayou landscapes.",
    aliases: ["East Texas", "Texas Piney Woods"],
    anchorPlaces: ["Tyler", "Longview", "Nacogdoches", "Lufkin", "Caddo Lake"],
  },
  {
    id: "prairies-lakes",
    name: "Prairies & Lakes",
    blurb: "Blackland prairie, rolling countryside, reservoirs, courthouse towns and the Dallas–Fort Worth region.",
    canonicalPath: "/explore/region/prairies-lakes",
    definition: "TexasDefined's North and North-Central Texas interior region between East Texas forests and the western plains, organized around prairie landscapes, reservoirs, historic towns and the Dallas–Fort Worth metroplex.",
    aliases: ["Prairies and Lakes", "North Texas", "North-Central Texas"],
    anchorPlaces: ["Dallas", "Fort Worth", "Waco", "Denton", "Possum Kingdom Lake"],
  },
  {
    id: "south-texas",
    name: "South Texas Plains",
    blurb: "Brush country, ranchlands, border culture and the Rio Grande Valley across South Texas.",
    canonicalPath: "/explore/region/south-texas",
    definition: "TexasDefined's South Texas interior and lower Rio Grande region, spanning brush country, ranchlands, border communities and the subtropical Rio Grande Valley while overlapping the Gulf Coast near the shoreline.",
    aliases: ["South Texas", "South Texas Brush Country", "Rio Grande Valley"],
    anchorPlaces: ["Laredo", "McAllen", "Brownsville", "Edinburg", "Kingsville"],
  },
] as const;

export const TEXAS_REGION_IDS = TEXAS_REGION_DEFINITIONS.map((region) => region.id);

export function texasRegionDefinition(id: string): TexasRegionDefinition | undefined {
  return TEXAS_REGION_DEFINITIONS.find((region) => region.id === id);
}
