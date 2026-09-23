import type { CampingAmenity, CampingSource, CampingStyle } from "./types";
import type { TexasRegion } from "../types";

export interface CampingDiscoveryProfile {
  destinationSlug: string;
  profileSlug?: string;
  name: string;
  county: string;
  region: TexasRegion;
  managingAgency: string;
  styles: CampingStyle[];
  amenities: CampingAmenity[];
  reservationPolicy: string;
  whyCampHere?: string;
  planningDetail?: string;
  searchTerms?: string[];
  reservationUrl: string;
  siteLengthNote?: string;
  generatorRules?: string;
  verifiedAt: string;
  sources: Array<Pick<CampingSource, "label" | "url">>;
}

const TPWD = "Texas Parks and Wildlife Department";
const NPS = "National Park Service";
const TPWD_RESERVATIONS = "https://tpwd.texas.gov/state-parks/reservations/";
const RECREATION_GOV = "https://www.recreation.gov/";
const VERIFIED_AT = "2026-09-01";

/**
 * Lean browser projection of the richer source-of-truth camping profiles.
 * Long research notes, search terms and field-level provenance stay out of the
 * unsplit client bundle; the discovery UI retains the verified planning fields
 * users actually compare plus direct authoritative source links.
 */
export const CAMPING_DISCOVERY_PROFILES: CampingDiscoveryProfile[] = [
  {
    destinationSlug: "enchanted-rock-state-natural-area",
    name: "Enchanted Rock State Natural Area",
    county: "Gillespie",
    region: "hill-country",
    managingAgency: TPWD,
    styles: ["tent", "primitive", "group"],
    amenities: ["restrooms", "showers", "hiking"],
    reservationPolicy: "Reservable walk-in tent sites; designated primitive hike-in camping.",
    whyCampHere: "A tent-first Hill Country option for campers who want walk-in or primitive access close to Enchanted Rock's trail system.",
    reservationUrl: TPWD_RESERVATIONS,
    searchTerms: ["primitive camping", "tent camping", "Hill Country camping", "camping near Fredericksburg", "hiking camping"],
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "TPWD campsites", url: "https://tpwd.texas.gov/state-parks/enchanted-rock/fees-facilities/campsites" }],
  },
  {
    destinationSlug: "palo-duro-canyon-state-park",
    name: "Palo Duro Canyon State Park",
    county: "Randall",
    region: "panhandle",
    managingAgency: TPWD,
    styles: ["tent", "rv", "primitive", "group"],
    amenities: ["electric-20", "electric-30", "electric-50", "water-hookup", "restrooms", "showers", "ada-site", "shade", "hiking"],
    reservationPolicy: "Developed sites are reservable; primitive hike-in permits are issued on arrival.",
    whyCampHere: "One of the strongest mixed-format choices in Texas: developed tent and RV camping plus primitive hike-in access inside the canyon.",
    reservationUrl: TPWD_RESERVATIONS,
    siteLengthNote: "Some Mesquite, Sagebrush and Hackberry sites can hold RVs up to 60 feet; verify the individual site.",
    searchTerms: ["RV camping", "Panhandle camping", "primitive camping", "50 amp camping", "camping near Amarillo", "family camping"],
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "TPWD campsites", url: "https://tpwd.texas.gov/state-parks/palo-duro-canyon/fees-facilities/campsites" }],
  },
  {
    destinationSlug: "garner-state-park",
    name: "Garner State Park",
    county: "Uvalde",
    region: "hill-country",
    managingAgency: TPWD,
    styles: ["tent", "rv"],
    amenities: ["electric-20", "electric-30", "electric-50", "water-hookup", "sewer-hookup", "full-hookup", "restrooms", "showers", "river-access", "swimming", "hiking"],
    reservationPolicy: "Reservable campsites; choose the exact site type and check seasonal loop availability.",
    whyCampHere: "A Frio River base with swimming, showers and verified full-hookup inventory for campers who want both water recreation and RV convenience.",
    reservationUrl: TPWD_RESERVATIONS,
    generatorRules: "Generators may not run during specified quiet hours from 10 p.m. to 6 a.m.",
    siteLengthNote: "Site lengths vary; some water-only areas are limited to rigs 20 feet or less.",
    searchTerms: ["full hookup public campground", "RV camping", "Frio River camping", "family camping", "Hill Country camping", "river camping"],
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "TPWD campsites", url: "https://tpwd.texas.gov/state-parks/garner/fees-facilities/campsites" }],
  },
  {
    destinationSlug: "mckinney-falls-state-park",
    name: "McKinney Falls State Park",
    county: "Travis",
    region: "prairies-lakes",
    managingAgency: TPWD,
    styles: ["tent", "rv"],
    amenities: ["electric-20", "electric-30", "electric-50", "water-hookup", "restrooms", "showers", "swimming", "fishing", "hiking"],
    reservationPolicy: "Developed campsites are reservable through TPWD.",
    whyCampHere: "A practical Austin-area option that combines developed camping with swimming, fishing and hiking without requiring a long drive from the city.",
    reservationUrl: TPWD_RESERVATIONS,
    searchTerms: ["RV camping near Austin", "campgrounds near Austin", "family camping", "swimming camping", "electric campsites"],
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "TPWD campsites", url: "https://tpwd.texas.gov/state-parks/mckinney-falls/fees-facilities/campsites" }],
  },
  {
    destinationSlug: "caddo-lake",
    name: "Caddo Lake / Caddo Lake State Park",
    county: "Harrison",
    region: "piney-woods",
    managingAgency: TPWD,
    styles: ["tent", "rv"],
    amenities: ["electric-30", "electric-50", "water-hookup", "sewer-hookup", "full-hookup", "restrooms", "ada-site", "lake-access", "fishing"],
    reservationPolicy: "Developed campsites are reservable; verify the exact loop and site before booking.",
    whyCampHere: "A lake-focused East Texas choice with fishing access and a verified mix that includes full-hookup RV inventory.",
    reservationUrl: TPWD_RESERVATIONS,
    searchTerms: ["lake camping", "East Texas camping", "full hookup public campground", "RV camping", "fishing camping", "Caddo Lake camping"],
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "TPWD campsites", url: "https://tpwd.texas.gov/state-parks/caddo-lake/fees-facilities/campsites" }],
  },
  {
    destinationSlug: "mustang-island-state-park",
    name: "Mustang Island State Park",
    county: "Nueces",
    region: "gulf-coast",
    managingAgency: TPWD,
    styles: ["tent", "rv", "primitive", "beach"],
    amenities: ["electric-50", "water-hookup", "restrooms", "showers", "shade", "gulf-access", "swimming", "fishing"],
    reservationPolicy: "Developed electric sites are reservable; primitive beach sites are non-reservable and weather-dependent.",
    whyCampHere: "Choose it when Gulf access is the priority: developed electric camping behind the dunes or weather-dependent primitive beach camping.",
    reservationUrl: TPWD_RESERVATIONS,
    searchTerms: ["Texas beach camping", "Gulf camping", "primitive beach camping", "RV beach camping", "Port Aransas camping"],
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "TPWD campsites", url: "https://tpwd.texas.gov/state-parks/mustang-island/fees-facilities/campsites" }],
  },
  {
    destinationSlug: "sea-rim-state-park",
    name: "Sea Rim State Park",
    county: "Jefferson",
    region: "gulf-coast",
    managingAgency: TPWD,
    styles: ["tent", "rv", "primitive", "beach"],
    amenities: ["electric-30", "electric-50", "water-hookup", "gulf-access", "swimming", "fishing"],
    reservationPolicy: "Developed sites are reservable; West Beach primitive sites are non-reservable and weather-dependent.",
    whyCampHere: "A more remote Gulf Coast option for campers who want beach access, fishing and a choice between developed and primitive coastal camping.",
    reservationUrl: TPWD_RESERVATIONS,
    searchTerms: ["Texas beach camping", "primitive beach camping", "Gulf Coast camping", "RV camping", "fishing camping"],
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "TPWD campsites", url: "https://tpwd.texas.gov/state-parks/sea-rim/fees-facilities/campsites" }],
  },
  {
    destinationSlug: "brazos-bend-state-park",
    name: "Brazos Bend State Park",
    county: "Fort Bend",
    region: "gulf-coast",
    managingAgency: TPWD,
    styles: ["tent", "rv", "primitive"],
    amenities: ["electric-30", "electric-50", "water-hookup", "restrooms", "showers", "hiking", "fishing"],
    reservationPolicy: "Developed campsites are reservable; primitive walk-in sites are also available.",
    whyCampHere: "A strong Houston-area escape with developed and primitive options, trails and fishing in a wildlife-heavy wetland landscape.",
    reservationUrl: TPWD_RESERVATIONS,
    searchTerms: ["campgrounds near Houston", "RV camping near Houston", "primitive camping", "family camping", "wildlife camping"],
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "TPWD campsites", url: "https://tpwd.texas.gov/state-parks/brazos-bend/fees-facilities/campsites" }],
  },
  {
    destinationSlug: "big-bend-national-park",
    name: "Big Bend National Park",
    county: "Brewster",
    region: "big-bend",
    managingAgency: NPS,
    styles: ["tent", "rv", "primitive", "backcountry", "group"],
    amenities: ["dump-station", "restrooms", "river-access", "hiking"],
    reservationPolicy: "Reservations are required for Big Bend's NPS campgrounds; backcountry overnight use requires a permit. The separately operated Rio Grande Village RV Campground is the park's full-hookup option.",
    whyCampHere: "Best for campers who want a remote national-park trip with multiple developed campgrounds, backcountry options and a separately operated full-hookup RV choice.",
    reservationUrl: RECREATION_GOV,
    searchTerms: ["Big Bend camping", "national park camping", "RV camping", "backcountry camping", "primitive camping", "dark sky camping"],
    verifiedAt: VERIFIED_AT,
    sources: [
      { label: "NPS camping", url: "https://www.nps.gov/bibe/planyourvisit/camping.htm" },
      { label: "NPS permits", url: "https://www.nps.gov/bibe/planyourvisit/permitsandreservations.htm" },
    ],
  },
  {
    destinationSlug: "guadalupe-mountains-national-park",
    name: "Guadalupe Mountains National Park",
    county: "Culberson",
    region: "big-bend",
    managingAgency: NPS,
    styles: ["tent", "rv", "group", "backcountry"],
    amenities: ["restrooms", "ada-site", "shade", "hiking"],
    reservationPolicy: "Pine Springs and Dog Canyon are reservable; backcountry camping requires a wilderness-use permit.",
    whyCampHere: "A trail-focused West Texas base for Guadalupe Peak and backcountry access, with developed campgrounds but no expectation of resort-style RV amenities.",
    reservationUrl: RECREATION_GOV,
    siteLengthNote: "Pine Springs prohibits RVs/trailers 55 feet or longer; Dog Canyon has four short RV sites.",
    searchTerms: ["Guadalupe Mountains camping", "national park camping", "RV camping", "tent camping", "hiking camping", "West Texas camping"],
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "NPS camping", url: "https://www.nps.gov/gumo/planyourvisit/camping.htm" }],
  },
];
