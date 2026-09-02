import type { TexasRegion } from "../types";

export type CampingStyle = "tent" | "rv" | "primitive" | "beach" | "backcountry" | "group";
export type CampingAmenity =
  | "electric-20"
  | "electric-30"
  | "electric-50"
  | "water-hookup"
  | "sewer-hookup"
  | "full-hookup"
  | "dump-station"
  | "restrooms"
  | "showers"
  | "ada-site"
  | "shade"
  | "swimming"
  | "lake-access"
  | "river-access"
  | "gulf-access"
  | "fishing"
  | "hiking";

export interface CampingSource {
  label: string;
  url: string;
  fields: string[];
}

/**
 * Camping metadata extends a canonical Destination by slug. Unknown amenities
 * are deliberately omitted instead of being converted to false.
 */
export interface CampingProfile {
  destinationSlug: string;
  name: string;
  county: string;
  region: TexasRegion;
  managingAgency: string;
  styles: CampingStyle[];
  amenities: CampingAmenity[];
  reservationPolicy: string;
  reservationAuthority: string;
  reservationUrl: string;
  siteLengthNote?: string;
  generatorRules?: string;
  campingNotes: string[];
  searchTerms: string[];
  verifiedAt: string;
  sources: CampingSource[];
}
