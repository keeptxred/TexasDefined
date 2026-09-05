import { CAMPING_DISCOVERY_PROFILES } from "./camping/discovery";
import { CAMPING_DISCOVERY_PROFILES_WAVE2 } from "./camping/profiles-wave2";
import { CAMPING_DISCOVERY_PROFILES_WAVE3 } from "./camping/profiles-wave3";
import { CAMPING_DISCOVERY_PROFILES_WAVE4 } from "./camping/profiles-wave4";
import { CAMPING_DISCOVERY_PROFILES_WAVE5 } from "./camping/profiles-wave5";
import type { CampingDiscoveryProfile } from "./camping/discovery";

export interface CountyRvCampingItem {
  name: string;
  destinationHref: string;
  managingAgency: string;
  facilitySummary: string;
  fullHookup: boolean;
  siteLengthNote?: string;
  reservationUrl: string;
  sourceLabel: string;
  sourceUrl: string;
  verifiedAt: string;
}

type DiscoveryProfile = CampingDiscoveryProfile & { profileSlug?: string };

const profiles: DiscoveryProfile[] = [
  ...CAMPING_DISCOVERY_PROFILES,
  ...CAMPING_DISCOVERY_PROFILES_WAVE2,
  ...CAMPING_DISCOVERY_PROFILES_WAVE3,
  ...CAMPING_DISCOVERY_PROFILES_WAVE4,
  ...CAMPING_DISCOVERY_PROFILES_WAVE5,
];

const facilityLabels: Record<string, string> = {
  "electric-hookup": "electric hookup",
  "electric-20": "20 amp",
  "electric-30": "30 amp",
  "electric-50": "50 amp",
  "water-hookup": "water hookup",
  "sewer-hookup": "sewer hookup",
  "full-hookup": "full hookup",
  "dump-station": "dump station",
  restrooms: "restrooms",
  showers: "showers",
  "ada-site": "ADA site",
  swimming: "swimming",
  "lake-access": "lake access",
  "river-access": "river access",
  "gulf-access": "Gulf access",
  fishing: "fishing",
  hiking: "hiking",
};

export function loadCountyRvCampingServer(countySlug: string): CountyRvCampingItem[] {
  const normalizedCountySlug = slugify(countySlug);

  return profiles
    .filter((profile) => profile.styles.includes("rv") && slugify(profile.county) === normalizedCountySlug)
    .map((profile) => {
      const profileSlug = profile.profileSlug ?? profile.destinationSlug;
      const source = profile.sources[0];
      return {
        name: profile.name,
        destinationHref: profileSlug === profile.destinationSlug
          ? `/destination/${profile.destinationSlug}`
          : `/best-places-to-go-camping-in-texas#${profileSlug}`,
        managingAgency: profile.managingAgency,
        facilitySummary: profile.amenities.map((amenity) => facilityLabels[amenity] ?? amenity.replaceAll("-", " ")).join(" · ") || "Verified RV camping; facility details are still being expanded",
        fullHookup: profile.amenities.includes("full-hookup"),
        siteLengthNote: profile.siteLengthNote,
        reservationUrl: profile.reservationUrl,
        sourceLabel: source?.label ?? profile.managingAgency,
        sourceUrl: source?.url ?? profile.reservationUrl,
        verifiedAt: profile.verifiedAt,
      };
    })
    .sort((left, right) => Number(right.fullHookup) - Number(left.fullHookup) || left.name.localeCompare(right.name))
    .slice(0, 8);
}

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
