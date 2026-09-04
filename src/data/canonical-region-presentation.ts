import { CANONICAL_PRIMARY_REGION_IDS } from "./canonical-geography.ts";
import type { CanonicalPrimaryRegionId } from "./types";

/**
 * Editorial presentation copy for the canonical geography graph.
 *
 * Geography assignments, boundaries, subregions, metros and aliases must stay
 * in canonical-geography.ts / geography-knowledge-graph.ts. This file only
 * explains those canonical IDs to readers and must never become a second
 * geography database.
 */
export interface CanonicalRegionPresentation {
  id: CanonicalPrimaryRegionId;
  summary: string;
  mapContext: string;
  identity: string;
  travelLens: string;
  relocationLens: string;
  signatures: readonly string[];
}

const presentationById: Readonly<Record<CanonicalPrimaryRegionId, CanonicalRegionPresentation>> = {
  "north-texas": {
    id: "north-texas",
    summary: "Dallas–Fort Worth, prairie country, Cross Timbers and Texoma form a fast-growing northern Texas region where major-city scale sits beside courthouse towns, reservoirs and ranch country.",
    mapContext: "TexasDefined uses North Texas for the state’s north-central corridor around Dallas–Fort Worth and the country extending toward Texoma and the Red River. It meets Central Texas to the south, East Texas to the east and the Panhandle toward the northwest.",
    identity: "The Metroplex is the population and transportation anchor, but North Texas is larger than DFW. Blackland prairie, Cross Timbers, lake country and older rail-and-courthouse towns give the region several distinct layers.",
    travelLens: "Use North Texas when a trip mixes big-city museums, sports and food with lake weekends, small-town stops, prairie landscapes or the Texoma corridor.",
    relocationLens: "The region offers the state’s largest concentration of North Texas jobs and suburbs, but housing, commute patterns, property taxes, utilities and school boundaries vary sharply across the Metroplex and surrounding counties.",
    signatures: ["Dallas–Fort Worth Metroplex", "Cross Timbers", "Texoma", "North Texas prairies"],
  },
  "central-texas": {
    id: "central-texas",
    summary: "Austin, the Hill Country gateway, Brazos Valley and Central Texas prairie country meet in a region shaped by limestone, spring-fed water, fast-growing cities and some of the state’s best-known road-trip country.",
    mapContext: "TexasDefined centers Central Texas on Austin and the middle of the state, reaching into the Hill Country and Brazos Valley while recognizing a transition toward San Antonio and South Texas rather than treating that boundary as a hard administrative line.",
    identity: "Central Texas is a meeting place of limestone hills, prairie, river corridors, university towns and the Austin growth engine. The Hill Country is a major travel identity within the region, not a replacement for the broader canonical region.",
    travelLens: "Use Central Texas for spring-fed rivers, state parks, barbecue towns, wineries, music, college-town stops and Hill Country drives that can be combined with Austin without forcing every destination into an Austin itinerary.",
    relocationLens: "Austin anchors the job market, but the relocation decision extends through Williamson, Hays, Bell, Brazos and Hill Country communities where housing costs, commute tradeoffs, water, utilities and property taxes can look very different.",
    signatures: ["Austin area", "Texas Hill Country", "Brazos Valley", "Central Texas prairies"],
  },
  "east-texas": {
    id: "east-texas",
    summary: "Pine forests, bayous, historic towns and lake country define East Texas, from Upper East Texas through the Piney Woods and deeper forest country near the Louisiana border.",
    mapContext: "TexasDefined places East Texas east of the north-central and central corridors, with North Texas and Central Texas to the west and the Gulf Coast transition to the south. Piney Woods, Upper East Texas and Deep East Texas remain distinct subregions inside the same canonical region.",
    identity: "Forests change the scale and feel of travel here. East Texas is less about a single dominant metro and more about a network of timber towns, historic communities, reservoirs, state parks and long-established regional centers.",
    travelLens: "Use East Texas for cypress water, pine forest, lake weekends, historic downtowns, state parks and quieter road trips linking Tyler, Nacogdoches, Jefferson, Lufkin and the surrounding countryside.",
    relocationLens: "East Texas can offer smaller-city and rural alternatives to the major metros, but employment base, healthcare access, broadband, utilities, commute distances and insurance considerations should be checked community by community.",
    signatures: ["Piney Woods", "Upper East Texas", "Deep East Texas", "lake and forest country"],
  },
  "south-texas": {
    id: "south-texas",
    summary: "San Antonio, brush country, border culture and the Rio Grande Valley anchor South Texas, a region where Hill Country gateways give way to ranch land, subtropical landscapes and the lower Rio Grande.",
    mapContext: "TexasDefined treats San Antonio as primarily South Texas while acknowledging its Central Texas adjacency and Hill Country gateway role. Farther south, Laredo, the Brush Country and Rio Grande Valley remain distinct parts of the region; the Coastal Bend belongs to the canonical Gulf Coast.",
    identity: "South Texas connects one of the state’s oldest major cities with ranch country, border communities and the subtropical Valley. Spanish and Mexican heritage, Tejano culture, bird migration and working-land traditions are central to its identity.",
    travelLens: "Use South Texas for San Antonio history and food, ranch-country drives, borderland culture, birding and Rio Grande Valley destinations, while using the separate Gulf Coast region for Corpus Christi and Coastal Bend beach travel.",
    relocationLens: "San Antonio is the largest employment and healthcare anchor, while the Valley and border metros have their own labor, housing and cross-border economies. Climate, heat, water, insurance and distance to specialized services matter differently across the region.",
    signatures: ["San Antonio area", "South Texas Brush Country", "Rio Grande Valley", "border and ranch country"],
  },
  "west-texas": {
    id: "west-texas",
    summary: "The Permian Basin, Big Bend, Trans-Pecos and El Paso make West Texas a region of enormous distances, desert basins, mountain ranges, energy cities and some of the least urbanized landscapes in the state.",
    mapContext: "TexasDefined separates West Texas from the Panhandle. West Texas reaches from the Permian Basin through Big Bend and the Trans-Pecos to El Paso, while Amarillo, Lubbock, the High Plains and South Plains belong to the canonical Panhandle region.",
    identity: "Distance is part of the geography. Oil-and-gas centers, borderland El Paso, desert arts towns, mountain parks and Big Bend country share a western scale but require very different trip and relocation assumptions.",
    travelLens: "Use West Texas for Big Bend, Davis Mountains, Marfa and Alpine, El Paso, desert highways, dark skies and the long-distance road trips that connect them.",
    relocationLens: "Energy employment and lower-density living can be advantages in parts of West Texas, but housing cycles, healthcare distance, water, extreme heat, wind, transportation and long drives deserve more weight than they might in a large metro.",
    signatures: ["Big Bend", "Trans-Pecos", "Permian Basin", "El Paso and desert mountain country"],
  },
  "gulf-coast": {
    id: "gulf-coast",
    summary: "Houston, the Upper Gulf Coast, Golden Triangle and Coastal Bend form TexasDefined’s coastal region, tying the state’s largest port economy to bays, barrier islands, wetlands and beach towns.",
    mapContext: "TexasDefined follows the Gulf-facing side of the state from the Houston and Golden Triangle area through the Coastal Bend. This keeps Corpus Christi and nearby barrier-island communities in the Gulf Coast while South Texas remains the inland and lower-border region.",
    identity: "Ports, petrochemicals, shipping, fisheries, wetlands and hurricane exposure shape this region as much as beaches do. Houston adds global-city scale to a coastline made up of very different bays, estuaries and communities.",
    travelLens: "Use the Gulf Coast for beaches, birding, fishing, seafood, barrier islands, maritime history, Houston attractions and road trips that connect bays and coastal towns.",
    relocationLens: "Houston’s job market is a major draw, but flood exposure, windstorm and homeowners insurance, evacuation routes, humidity, property taxes and commute geography can materially change the cost and risk profile from one coastal community to another.",
    signatures: ["Houston area", "Upper Gulf Coast", "Golden Triangle", "Coastal Bend"],
  },
  panhandle: {
    id: "panhandle",
    summary: "Amarillo, Lubbock, the Texas Panhandle and South Plains make up the state’s High Plains region, where canyon country, agricultural scale, Route 66 history and open horizons define the landscape.",
    mapContext: "TexasDefined treats the Panhandle as a canonical region separate from West Texas. It includes the northern Panhandle around Amarillo and the South Plains around Lubbock, meeting North Texas and West Texas along broad transition zones.",
    identity: "The High Plains are flatter, higher and more agricultural than much of Texas, interrupted dramatically by places such as Palo Duro Canyon and the Caprock. Amarillo and Lubbock provide the main urban anchors without erasing the region’s rural scale.",
    travelLens: "Use the Panhandle for Route 66, Palo Duro Canyon, Caprock landscapes, ranching and agricultural history, wide-sky drives and trips built around Amarillo or Lubbock.",
    relocationLens: "Housing and congestion can be lighter than in the largest metros, but wind, winter weather, water, distance, agriculture-linked economies and access to specialized services should be considered alongside local job and housing advantages.",
    signatures: ["Texas Panhandle", "South Plains", "Amarillo", "Lubbock and High Plains country"],
  },
};

export const CANONICAL_REGION_PRESENTATIONS = CANONICAL_PRIMARY_REGION_IDS.map((id) => presentationById[id]);

export const CANONICAL_REGION_PATHS = CANONICAL_PRIMARY_REGION_IDS.map((id) => `/regions/${id}` as const);

export function canonicalRegionPresentation(id: CanonicalPrimaryRegionId) {
  return presentationById[id];
}
