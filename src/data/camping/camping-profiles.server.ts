import { CAMPING_PROFILES } from "./profiles";
import { CAMPING_PROFILES_WAVE2 } from "./profiles-wave2";
import { CAMPING_PROFILES_WAVE3 } from "./profiles-wave3";
import { CAMPING_PROFILES_WAVE4 } from "./profiles-wave4";
import { CAMPING_PROFILES_WAVE5 } from "./profiles-wave5";
import type { CampingProfile } from "./types";

export interface CampingSearchIndexEntry {
  destinationSlug: string;
  terms: string[];
}

const ALL_CAMPING_PROFILES: CampingProfile[] = [
  ...CAMPING_PROFILES,
  ...CAMPING_PROFILES_WAVE2,
  ...CAMPING_PROFILES_WAVE3,
  ...CAMPING_PROFILES_WAVE4,
  ...CAMPING_PROFILES_WAVE5,
];

function normalized(value: string) {
  return value.trim().toLowerCase();
}

function profileIdentity(profile: CampingProfile) {
  return `${normalized(profile.destinationSlug)}::${normalized(profile.profileSlug ?? profile.destinationSlug)}::${normalized(profile.name)}`;
}

function uniqueProfiles() {
  const seen = new Set<string>();
  return ALL_CAMPING_PROFILES.filter((profile) => {
    const identity = profileIdentity(profile);
    if (seen.has(identity)) return false;
    seen.add(identity);
    return true;
  });
}

export function loadAllCampingProfilesServer(): CampingProfile[] {
  return uniqueProfiles();
}

export function loadCampingProfilesForDestinationServer(destinationSlug: string): CampingProfile[] {
  const target = normalized(destinationSlug);
  return uniqueProfiles()
    .filter((profile) => normalized(profile.destinationSlug) === target)
    .sort((left, right) => {
      const leftAnchor = left.profileSlug ?? left.destinationSlug;
      const rightAnchor = right.profileSlug ?? right.destinationSlug;
      return leftAnchor.localeCompare(rightAnchor) || left.name.localeCompare(right.name);
    });
}

export function loadCampingSearchIndexServer(): CampingSearchIndexEntry[] {
  const byDestination = new Map<string, Set<string>>();

  for (const profile of uniqueProfiles()) {
    const destinationSlug = normalized(profile.destinationSlug);
    const terms = byDestination.get(destinationSlug) ?? new Set<string>();
    const add = (value?: string) => {
      const term = value?.trim();
      if (term) terms.add(term);
    };

    add(profile.name);
    add(profile.profileSlug?.replaceAll("-", " "));
    add(profile.managingAgency);
    add(profile.reservationAuthority);
    add(profile.county);
    add(profile.region.replaceAll("-", " "));
    for (const style of profile.styles) add(style.replaceAll("-", " "));
    for (const amenity of profile.amenities) add(amenity.replaceAll("-", " "));
    for (const searchTerm of profile.searchTerms) add(searchTerm);

    byDestination.set(destinationSlug, terms);
  }

  return [...byDestination.entries()]
    .map(([destinationSlug, terms]) => ({ destinationSlug, terms: [...terms].sort((left, right) => left.localeCompare(right)) }))
    .sort((left, right) => left.destinationSlug.localeCompare(right.destinationSlug));
}
