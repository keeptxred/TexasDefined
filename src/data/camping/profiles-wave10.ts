import type { CampingDiscoveryProfile } from "./discovery";
import type { CampingProfile } from "./types";

const TPWD = "Texas Parks and Wildlife Department";
const TPWD_RESERVATIONS = "https://tpwd.texas.gov/state-parks/reservations/";
const VERIFIED_AT = "2026-10-03";

export const CAMPING_PROFILES_WAVE10: CampingProfile[] = [
  {
    destinationSlug: "stephen-f-austin-state-park",
    name: "Stephen F. Austin State Park",
    county: "Austin",
    region: "prairies-lakes",
    managingAgency: TPWD,
    styles: ["tent", "rv", "primitive", "group"],
    amenities: ["electric-30", "water-hookup", "sewer-hookup", "full-hookup", "restrooms", "showers", "shade"],
    reservationPolicy: "Most overnight sites are site-specific and reservable through TPWD; verify current availability in the official reservation system.",
    reservationAuthority: TPWD,
    reservationUrl: TPWD_RESERVATIONS,
    generatorRules: "TPWD states generators are not allowed in the full-hookup, tent-with-water, or primitive walk-in site classes.",
    campingNotes: ["TPWD lists 38 full-hookup RV/pop-up sites with water, sewer and 30-amp service.", "The park also has 39 tent-only campsites with water and 25 primitive walk-in tent sites.", "Restrooms with showers are near the full-hookup camping area; the primitive and tent-only classes have fewer services."],
    searchTerms: ["Stephen F Austin State Park camping", "camping near Houston", "camping near Sealy", "full hookup camping west of Houston", "primitive camping Stephen F Austin"],
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "TPWD Stephen F. Austin campsites", url: "https://tpwd.texas.gov/state-parks/stephen-f-austin/fees-facilities/campsites", fields: ["site counts", "full hookups", "tent camping", "primitive camping", "generator rules", "showers"] }],
  },
  {
    destinationSlug: "lockhart-state-park",
    name: "Lockhart State Park",
    county: "Caldwell",
    region: "prairies-lakes",
    managingAgency: TPWD,
    styles: ["tent", "rv"],
    amenities: ["electric-30", "electric-50", "water-hookup", "sewer-hookup", "full-hookup", "restrooms", "showers"],
    reservationPolicy: "Developed sites are reservable through TPWD; verify the exact site class and current availability before travel.",
    reservationAuthority: TPWD,
    reservationUrl: TPWD_RESERVATIONS,
    siteLengthNote: "TPWD says the 10 Fairway View full-hookup sites can accommodate RVs up to 40 feet.",
    campingNotes: ["Fairway View has 10 full-hookup sites with water, sewer and 30/50-amp electrical service.", "Clear Fork Creek has 10 additional wooded campsites with water and 30-amp electricity.", "Both developed camping classes have restrooms with showers nearby and access to a dump station."],
    searchTerms: ["Lockhart State Park camping", "camping near Austin", "camping near Lockhart", "full hookup camping Lockhart", "RV camping south of Austin"],
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "TPWD Lockhart campsites", url: "https://tpwd.texas.gov/state-parks/lockhart/fees-facilities/campsites/", fields: ["site counts", "full hookups", "electric service", "RV length", "showers", "dump station"] }],
  },
  {
    destinationSlug: "lake-tawakoni-state-park",
    name: "Lake Tawakoni State Park",
    county: "Hunt",
    region: "prairies-lakes",
    managingAgency: TPWD,
    styles: ["tent", "rv", "group"],
    amenities: ["electric-30", "electric-50", "water-hookup", "sewer-hookup", "full-hookup", "restrooms", "showers", "ada-site", "lake-access"],
    reservationPolicy: "Developed sites are reservable through TPWD. Select the exact loop/site class because hookup level varies substantially.",
    reservationAuthority: TPWD,
    reservationUrl: TPWD_RESERVATIONS,
    campingNotes: ["Spring Point has 16 full-hookup 30/50-amp sites and 16 additional 30/50-amp water/electric sites.", "White Deer Reach has 44 electric sites plus two specifically identified accessible electric sites.", "TPWD also lists a hike-in group camp; it does not have water at the campsite."],
    searchTerms: ["Lake Tawakoni camping", "camping near Dallas", "East Texas lake camping", "full hookup camping Lake Tawakoni", "RV camping east of Dallas"],
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "TPWD Lake Tawakoni campsites", url: "https://tpwd.texas.gov/state-parks/lake-tawakoni/fees-facilities/campsites/", fields: ["site counts", "full hookups", "electric service", "accessible sites", "group camping", "showers"] }],
  },
];

export const CAMPING_DISCOVERY_PROFILES_WAVE10: CampingDiscoveryProfile[] = CAMPING_PROFILES_WAVE10.map((profile) => ({
  destinationSlug: profile.destinationSlug,
  profileSlug: profile.profileSlug,
  name: profile.name,
  county: profile.county,
  region: profile.region,
  managingAgency: profile.managingAgency,
  styles: profile.styles,
  amenities: profile.amenities,
  reservationPolicy: profile.reservationPolicy,
  reservationAuthority: profile.reservationAuthority,
  reservationUrl: profile.reservationUrl,
  siteLengthNote: profile.siteLengthNote,
  generatorRules: profile.generatorRules,
  campingNotes: profile.campingNotes,
  searchTerms: profile.searchTerms,
  verifiedAt: profile.verifiedAt,
  sources: profile.sources,
}));
