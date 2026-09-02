import type { CampingAmenity, CampingSource, CampingStyle } from "./types";
import type { TexasRegion } from "../types";

export interface CampingDiscoveryProfile {
  destinationSlug: string;
  name: string;
  county: string;
  region: TexasRegion;
  managingAgency: string;
  styles: CampingStyle[];
  amenities: CampingAmenity[];
  reservationPolicy: string;
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
    reservationUrl: TPWD_RESERVATIONS,
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
    reservationUrl: TPWD_RESERVATIONS,
    siteLengthNote: "Some Mesquite, Sagebrush and Hackberry sites can hold RVs up to 60 feet; verify the individual site.",
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
    reservationUrl: TPWD_RESERVATIONS,
    generatorRules: "Generators may not run during specified quiet hours from 10 p.m. to 6 a.m.",
    siteLengthNote: "Site lengths vary; some water-only areas are limited to rigs 20 feet or less.",
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
    reservationUrl: TPWD_RESERVATIONS,
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
    reservationUrl: TPWD_RESERVATIONS,
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
    reservationUrl: TPWD_RESERVATIONS,
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
    reservationUrl: TPWD_RESERVATIONS,
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
    reservationUrl: TPWD_RESERVATIONS,
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
    amenities: ["full-hookup", "dump-station", "restrooms", "river-access", "hiking"],
    reservationPolicy: "Advance campground reservations are required; backcountry overnight use requires a permit.",
    reservationUrl: RECREATION_GOV,
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
    reservationUrl: RECREATION_GOV,
    siteLengthNote: "Pine Springs prohibits RVs/trailers 55 feet or longer; Dog Canyon has four short RV sites.",
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "NPS camping", url: "https://www.nps.gov/gumo/planyourvisit/camping.htm" }],
  },
];
