import type { CampingDiscoveryProfile } from "./discovery";
import type { CampingProfile } from "./types";

const LCRA = "Lower Colorado River Authority";
const VERIFIED_AT = "2026-09-02";
const LCRA_RESERVATIONS = "https://book.lcraparks.com/";

type CampgroundDiscoveryProfile = CampingDiscoveryProfile & { profileSlug: string };

/**
 * Public river-authority camping and outdoor-lodging wave.
 *
 * These parks intentionally remain campground-level records until a separate
 * canonical Destination is justified. Unknown facilities are omitted rather
 * than interpreted as unavailable.
 */
export const CAMPING_PROFILES_WAVE4: CampingProfile[] = [
  {
    destinationSlug: "black-rock-park-lake-buchanan",
    profileSlug: "black-rock-park-lake-buchanan",
    name: "Black Rock Park — Lake Buchanan",
    county: "Llano",
    region: "hill-country",
    managingAgency: LCRA,
    styles: ["tent", "rv", "cabin", "airstream"],
    amenities: ["electric-30", "electric-50", "water-hookup", "sewer-hookup", "full-hookup", "restrooms", "showers", "pet-friendly", "swimming", "lake-access", "fishing"],
    reservationPolicy: "LCRA lists reservable tent campsites, full-hookup RV sites, cabins and Airstream lodging. Check the live booking calendar for current inventory and minimum-stay rules.",
    reservationAuthority: "Lower Colorado River Authority",
    reservationUrl: LCRA_RESERVATIONS,
    campingNotes: [
      "Black Rock Park sits on Lake Buchanan and currently lists 18 campsites, 14 full-hookup RV sites, 18 cabins and four Airstreams.",
      "The 14 RV sites are explicitly listed with full hookups and 30/50-amp electrical service.",
      "LCRA verifies flushing restrooms, showers, pet-friendly access, swimming areas and fishing among the park's current facilities and activities.",
    ],
    searchTerms: ["Black Rock Park camping", "Lake Buchanan camping", "Lake Buchanan RV camping", "LCRA camping", "cabins Lake Buchanan", "Airstream camping Texas"],
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "LCRA Black Rock Park", url: "https://lcraparks.com/parks/black-rock-park", fields: ["camping types", "14 full-hookup RV sites", "30/50 amp", "cabins", "Airstreams", "showers", "restrooms", "pet friendly", "swimming", "fishing"] }],
  },
  {
    destinationSlug: "lake-bastrop-north-shore-park",
    profileSlug: "lake-bastrop-north-shore-park",
    name: "Lake Bastrop North Shore Park",
    county: "Bastrop",
    region: "prairies-lakes",
    managingAgency: LCRA,
    styles: ["rv", "glamping", "airstream"],
    amenities: ["electric-30", "electric-50", "water-hookup", "sewer-hookup", "full-hookup", "restrooms", "showers", "pet-friendly", "swimming", "lake-access", "fishing", "hiking"],
    reservationPolicy: "LCRA lists reservable full-hookup RV sites, Airstreams and glamping accommodations. Use the live LCRA booking calendar for current availability and lodging-specific policies.",
    reservationAuthority: "Lower Colorado River Authority",
    reservationUrl: LCRA_RESERVATIONS,
    campingNotes: [
      "North Shore currently lists seven full-hookup RV sites with 30/50-amp service, five Airstreams and glamping tents.",
      "The park is on 900-acre Lake Bastrop in the Lost Pines region and provides direct lake recreation access.",
      "LCRA verifies flushing restrooms, showers, pet-friendly access, swimming areas, trails and fishing facilities or activities.",
    ],
    searchTerms: ["Lake Bastrop North Shore camping", "Lake Bastrop glamping", "Lake Bastrop RV camping", "Airstream camping Bastrop", "LCRA camping near Austin"],
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "LCRA Lake Bastrop North Shore Park", url: "https://lcraparks.com/parks/lake-bastrop-north-shore-park", fields: ["full-hookup RV sites", "30/50 amp", "Airstreams", "glamping", "showers", "restrooms", "pet friendly", "swimming", "trails", "fishing"] }],
  },
  {
    destinationSlug: "lake-bastrop-south-shore-park",
    profileSlug: "lake-bastrop-south-shore-park",
    name: "Lake Bastrop South Shore Park",
    county: "Bastrop",
    region: "prairies-lakes",
    managingAgency: LCRA,
    styles: ["rv", "cabin", "glamping"],
    amenities: ["electric-30", "electric-50", "water-hookup", "sewer-hookup", "full-hookup", "restrooms", "showers", "pet-friendly", "swimming", "lake-access", "fishing", "hiking"],
    reservationPolicy: "LCRA lists reservable cabins and RV sites; the park also advertises a separate premium glass-house lodging option. Check the live booking surfaces for current inventory and operator-specific terms.",
    reservationAuthority: "Lower Colorado River Authority",
    reservationUrl: LCRA_RESERVATIONS,
    campingNotes: [
      "South Shore currently lists 24 RV sites with water and 30/50-amp electricity plus 12 distinct full-hookup RV sites.",
      "The lodging inventory includes standard and deluxe cabins. A separate premium glass-house stay is also promoted from the park page.",
      "The park supports swimming, fishing and hiking around Lake Bastrop; verify any temporary facility construction notices before travel.",
    ],
    searchTerms: ["Lake Bastrop South Shore camping", "Lake Bastrop RV camping", "full hookup Lake Bastrop", "cabins Lake Bastrop", "LCRA camping Bastrop"],
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "LCRA Lake Bastrop South Shore Park", url: "https://lcraparks.com/parks/lake-bastrop-south-shore-park", fields: ["24 water-electric RV sites", "12 full-hookup RV sites", "30/50 amp", "cabins", "outdoor lodging", "swimming", "fishing", "hiking"] }],
  },
  {
    destinationSlug: "matagorda-bay-nature-park",
    profileSlug: "matagorda-bay-nature-park",
    name: "Matagorda Bay Nature Park",
    county: "Matagorda",
    region: "gulf-coast",
    managingAgency: LCRA,
    styles: ["rv", "airstream", "bungalow"],
    amenities: ["electric-30", "electric-50", "water-hookup", "sewer-hookup", "full-hookup", "restrooms", "showers", "pet-friendly", "swimming", "river-access", "gulf-access", "fishing"],
    reservationPolicy: "LCRA lists reservable RV sites, waterfront RV sites, Airstreams and beach bungalows. Check the live booking calendar for current inventory, stay restrictions and waterfront availability.",
    reservationAuthority: "Lower Colorado River Authority",
    reservationUrl: LCRA_RESERVATIONS,
    campingNotes: [
      "Matagorda Bay Nature Park sits where the Colorado River reaches the Gulf of Mexico, combining river, marsh and beach access in one public park.",
      "LCRA currently lists 34 standard full-hookup RV sites, five pull-through full-hookup sites and 15 waterfront full-hookup sites; the RV inventory is listed with 30/50-amp service.",
      "Outdoor lodging currently includes four Airstreams and ten beach bungalows. LCRA also verifies flushing restrooms, showers, pet-friendly access, swimming and fishing facilities or activities.",
    ],
    searchTerms: ["Matagorda Bay Nature Park camping", "Matagorda RV camping", "Texas Gulf camping", "Colorado River camping Matagorda", "Matagorda beach bungalow", "Matagorda Airstream", "LCRA coastal camping"],
    verifiedAt: VERIFIED_AT,
    sources: [
      { label: "LCRA Matagorda Bay Nature Park", url: "https://lcraparks.com/parks/matagorda-bay-nature-park", fields: ["39 standard and pull-through full-hookup RV sites", "15 waterfront full-hookup RV sites", "30/50 amp", "Airstreams", "beach bungalows", "restrooms", "showers", "pet friendly", "river and Gulf setting", "fishing"] },
      { label: "LCRA Matagorda property overview", url: "https://lcraparks.com/land-development/matagorda-bay-nature-park", fields: ["Matagorda County", "property location"] },
    ],
  },
];

export const CAMPING_DISCOVERY_PROFILES_WAVE4: CampgroundDiscoveryProfile[] = CAMPING_PROFILES_WAVE4.map((profile) => ({
  destinationSlug: profile.destinationSlug,
  profileSlug: profile.profileSlug ?? profile.destinationSlug,
  name: profile.name,
  county: profile.county,
  region: profile.region,
  managingAgency: profile.managingAgency,
  styles: profile.styles,
  amenities: profile.amenities,
  reservationPolicy: profile.reservationPolicy,
  reservationUrl: profile.reservationUrl,
  siteLengthNote: profile.siteLengthNote,
  generatorRules: profile.generatorRules,
  verifiedAt: profile.verifiedAt,
  sources: profile.sources.map(({ label, url }) => ({ label, url })),
}));
