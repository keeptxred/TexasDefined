import type { CampingDiscoveryProfile } from "./discovery";
import type { CampingProfile } from "./types";

const VERIFIED_AT = "2026-09-02";

type CampgroundDiscoveryProfile = CampingDiscoveryProfile & { profileSlug: string };

/**
 * Public river-authority and authority-operated camping wave.
 * Unknown facilities are omitted rather than interpreted as unavailable.
 */
export const CAMPING_PROFILES_WAVE5: CampingProfile[] = [
  {
    destinationSlug: "coleto-creek-park",
    profileSlug: "coleto-creek-park",
    name: "Coleto Creek Park & Reservoir",
    county: "Victoria",
    region: "gulf-coast",
    managingAgency: "Guadalupe-Blanco River Authority",
    styles: ["tent", "rv", "primitive", "cabin"],
    amenities: ["electric-20", "electric-30", "electric-50", "water-hookup", "sewer-hookup", "full-hookup", "dump-station", "restrooms", "showers", "pet-friendly", "swimming", "lake-access", "fishing", "hiking"],
    reservationPolicy: "GBRA lists reservable multi-use campsites, full-hookup campsites and five camping cabins. Primitive camping is also available; confirm current availability, burn restrictions and holiday minimums with the park before travel.",
    reservationAuthority: "Guadalupe-Blanco River Authority",
    reservationUrl: "https://www.gbra.org/recreation/coleto-creek-park/",
    campingNotes: [
      "GBRA lists 20 multi-use campsites with water and 20/30/50-amp electrical service plus 59 full-hookup campsites with water, sewer and 20/30/50-amp service.",
      "The park also lists a dump station, five camping cabins, primitive tent camping, restrooms with showers, swimming, fishing and a 1.5-mile hiking and nature trail.",
      "Primitive camping is tent-only and GBRA states that generators are not allowed in that undeveloped camping area.",
    ],
    searchTerms: ["Coleto Creek camping", "Coleto Creek RV camping", "GBRA camping", "Victoria Texas camping", "full hookup camping Victoria Texas", "Coleto Creek cabins"],
    generatorRules: "GBRA states that generator use is not allowed in the primitive tent-camping area.",
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "GBRA Coleto Creek Park", url: "https://www.gbra.org/recreation/coleto-creek-park/", fields: ["20 multi-use sites", "59 full-hookup sites", "20/30/50 amp", "water", "sewer", "dump station", "cabins", "primitive camping", "showers", "swimming", "fishing", "hiking", "generator rule"] }],
  },
  {
    destinationSlug: "brackenridge-park-campground",
    profileSlug: "brackenridge-park-campground",
    name: "Brackenridge Park & Campground — Lake Texana",
    county: "Jackson",
    region: "gulf-coast",
    managingAgency: "Lavaca-Navidad River Authority",
    styles: ["tent", "rv", "cabin"],
    amenities: ["electric-20", "electric-30", "electric-50", "water-hookup", "sewer-hookup", "full-hookup", "dump-station", "restrooms", "showers", "ada-site", "lake-access", "hiking"],
    reservationPolicy: "LNRA's Brackenridge Recreation Complex offers online campsite reservations for Brackenridge Park. Cabins are reserved through the park office; campsite reservations are generally limited to 90 days in advance and 28 days per reservation.",
    reservationAuthority: "Lavaca-Navidad River Authority",
    reservationUrl: "https://www.brackenridgepark.com/p/accommodations/online-reservations/brackenridge",
    campingNotes: [
      "Brackenridge Park lists 123 campsites, including full-hookup, partial-hookup and 16 pull-through sites; all campsites provide 20/30/50-amp electrical service.",
      "Partial-hookup sites include water and electricity, while full-hookup and pull-through sites include water, sewer and electricity.",
      "Four air-conditioned, handicap-accessible comfort stations provide restrooms and showers; the complex also lists five furnished cabins and hike-and-bike trails.",
    ],
    searchTerms: ["Brackenridge Park camping", "Lake Texana camping", "Lake Texana RV camping", "LNRA camping", "Edna Texas campground", "Brackenridge cabins"],
    verifiedAt: VERIFIED_AT,
    sources: [
      { label: "Brackenridge Recreation Complex campground information", url: "https://www.brackenridgepark.com/p/accommodations/camping-rates", fields: ["123 campsites", "full and partial hookup", "16 pull-through sites", "20/30/50 amp", "water", "sewer", "comfort stations", "showers", "dump stations"] },
      { label: "LNRA recreation division", url: "https://www.lnra.org/divisions/", fields: ["LNRA ownership and operation", "Brackenridge Park", "Lake Texana setting", "cabins"] },
    ],
  },
  {
    destinationSlug: "texana-park-campground",
    profileSlug: "texana-park-campground",
    name: "Texana Park & Campground — Lake Texana",
    county: "Jackson",
    region: "gulf-coast",
    managingAgency: "Lavaca-Navidad River Authority",
    styles: ["tent", "rv", "cabin"],
    amenities: ["electric-20", "electric-30", "electric-50", "water-hookup", "sewer-hookup", "full-hookup", "dump-station", "restrooms", "showers", "lake-access", "fishing", "hiking"],
    reservationPolicy: "LNRA's Brackenridge Recreation Complex offers online campsite reservations for Texana Park. Cabins are reserved through the park office; campsite reservations are generally limited to 90 days in advance and 28 days per reservation.",
    reservationAuthority: "Lavaca-Navidad River Authority",
    reservationUrl: "https://www.brackenridgepark.com/p/accommodations/online-reservations/texana",
    campingNotes: [
      "Texana Park lists 141 campsites with full-hookup and partial-hookup options; all campsites offer 20/30/50-amp electrical service.",
      "Partial-hookup sites include water and electricity, while full-hookup sites include water, sewer and electricity. Tent camping is allowed on eligible partial, full and pull-through sites.",
      "Seven comfort stations serve the campground, including three climate-controlled facilities with showers. The park also lists three fishing piers, more than five miles of nature trails and two furnished cabins.",
    ],
    searchTerms: ["Texana Park camping", "Lake Texana campground", "Lake Texana RV camping", "LNRA Texana Park", "Edna Texas RV camping", "Texana Park cabins"],
    verifiedAt: VERIFIED_AT,
    sources: [
      { label: "Brackenridge Recreation Complex campground information", url: "https://www.brackenridgepark.com/p/accommodations/camping-rates", fields: ["141 campsites", "full and partial hookup", "20/30/50 amp", "water", "sewer", "comfort stations", "showers", "dump station"] },
      { label: "Texana Park online reservations", url: "https://www.brackenridgepark.com/p/accommodations/online-reservations/texana", fields: ["reservations", "141 campsites", "fishing piers", "trails"] },
    ],
  },
  {
    destinationSlug: "lakeview-campground-toledo-bend",
    profileSlug: "lakeview-campground-toledo-bend",
    name: "Lakeview Campground — Toledo Bend Reservoir",
    county: "Sabine",
    region: "piney-woods",
    managingAgency: "Sabine River Authority of Texas / U.S. Forest Service",
    styles: ["tent"],
    amenities: ["lake-access", "hiking"],
    reservationPolicy: "SRA-TX describes Lakeview as a 10-site public campground but does not advertise an online reservation system on the campground page. Confirm current access and any stay requirements directly with SRA-TX before travel.",
    reservationAuthority: "Sabine River Authority of Texas",
    reservationUrl: "https://sratx.org/parks-and-recreation/lakeview/",
    campingNotes: [
      "Lakeview offers 10 camping sites, each with a table, grill, tent pad and garbage can.",
      "Water is supplied from two centrally located hydrants and portable toilet facilities serve the area; these are not represented as individual campsite hookups.",
      "The campground is a trailhead for the Trail Between the Lakes. The land is owned by the U.S. Forest Service's Sabine National Forest and operated by SRA-TX.",
    ],
    searchTerms: ["Lakeview Campground Toledo Bend", "Toledo Bend tent camping", "Sabine River Authority camping", "Sabine National Forest campground", "Trail Between the Lakes camping"],
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "SRA-TX Lakeview Campground", url: "https://sratx.org/parks-and-recreation/lakeview/", fields: ["10 campsites", "tent pads", "central water hydrants", "portable toilets", "Trail Between the Lakes", "USFS ownership", "SRA-TX operation"] }],
  },
  {
    destinationSlug: "toledo-bend-tailrace-camping",
    profileSlug: "toledo-bend-tailrace-camping",
    name: "Toledo Bend Tailrace Channel Primitive Camping",
    county: "Newton",
    region: "piney-woods",
    managingAgency: "Sabine River Authority of Texas",
    styles: ["primitive"],
    amenities: ["fishing"],
    reservationPolicy: "SRA-TX identifies the Tailrace Channel area as a day-use and overnight location for self-contained visitors. The official page does not advertise reservations; confirm current access and operating conditions before an overnight stay.",
    reservationAuthority: "Sabine River Authority of Texas",
    reservationUrl: "https://sratx.org/parks-and-recreation/tailrace-channel-area-recreation-facility/",
    campingNotes: [
      "SRA-TX explicitly permits primitive camping at the Toledo Bend Tailrace Channel Area on the Texas side of the dam.",
      "The area is intended for self-contained visitors and the only listed general amenities are trash cans.",
      "Fishing and a primitive boat ramp are available; no hookup, restroom or shower claims are included in this record.",
    ],
    searchTerms: ["Toledo Bend primitive camping", "Toledo Bend Tailrace camping", "Sabine River Authority primitive camping", "camping near Toledo Bend Dam"],
    verifiedAt: VERIFIED_AT,
    sources: [{ label: "SRA-TX Toledo Bend Tailrace Channel Area", url: "https://sratx.org/parks-and-recreation/tailrace-channel-area-recreation-facility/", fields: ["primitive camping", "overnight self-contained visitors", "fishing", "primitive boat ramp", "trash cans only"] }],
  },
];

export const CAMPING_DISCOVERY_PROFILES_WAVE5: CampgroundDiscoveryProfile[] = CAMPING_PROFILES_WAVE5.map((profile) => ({
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
