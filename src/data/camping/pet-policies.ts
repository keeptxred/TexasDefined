import type { CampingDiscoveryProfile } from "./discovery";

/**
 * Positive pet-camping classification backed by operator rules. This is an
 * OVERLAY on existing 72 records, not a fictional facility/loop guarantee.
 * Keep pet-review dates separate from each campground's site-facility dates.
 * When an operator's rule changes, remove/downgrade the classification until
 * the newly published rule is researched.
 */
export const CAMPING_PET_POLICY_RESEARCHED_AT = "2026-11-05";
export const CAMPING_TPWD_PET_RULES_URL =
  "https://tpwd.texas.gov/state-parks/park-information/frequently-asked-questions";
const BIG_BEND_PETS_URL = "https://www.nps.gov/bibe/planyourvisit/campground_rules.htm";
const GUADALUPE_MOUNTAINS_PETS_URL = "https://www.nps.gov/gumo/planyourvisit/pets.htm";
const PADRE_ISLAND_PETS_URL = "https://www.nps.gov/pais/planyourvisit/pets.htm";

/** TPWD explicitly identifies these parks as having special restrictions.
 * Their status is NOT inferred from the agency-wide "almost all parks" rule.
 * Enchanted Rock is separately covered by its verified campground exception.
 */
const NEEDS_PARK_SPECIFIC_CONFIRMATION = new Set([
  "government-canyon-state-natural-area",
  "seminole-canyon-state-park-and-historic-site",
]);

const SPECIAL_TPWD_RULES: Readonly<Record<string, { note: string; url: string }>> = {
  "enchanted-rock-state-natural-area": {
    note: "Pets are permitted at designated campgrounds and on the Loop Trail, but not on the Summit Trail or other elevated trails; leash at most six feet.",
    url: "https://tpwd.texas.gov/state-parks/enchanted-rock",
  },
  "inks-lake-state-park": {
    note: "Pets may accompany campers in eligible developed sites under TPWD rules, but are prohibited in the hike-in primitive camping area. Verify the precise site type.",
    url: "https://tpwd.texas.gov/state-parks/inks-lake/fees-facilities/campsites",
  },
  "lost-maples-state-natural-area": {
    note: "TPWD explicitly allows leashed pets at hike-in primitive campsites; carry out pet waste and keep animals on designated trails.",
    url: "https://tpwd.texas.gov/state-parks/lost-maples/fees-facilities/campsites",
  },
  "balmorhea-state-park": {
    note: "Pets are permitted outside the fenced swimming-pool area under TPWD rules. They cannot enter the pool area and cannot be left unattended.",
    url: "https://tpwd.texas.gov/state-parks/balmorhea/balmorhea-faqs",
  },
};

const TPWD_STANDARD_NOTE =
  "TPWD generally permits leashed, attended pets in state parks (maximum six-foot leash). Pets cannot enter buildings or designated swimming areas. This agency-wide rule is not proof that every campsite, trail or primitive area permits pets.";

const BIBE_NOTE =
  "Leashed pets are permitted in frontcountry campgrounds and designated roadside campsites, but not on trails, in the hike-in backcountry or on the river. Never leave pets unattended; confirm exact site rules.";
const GUMO_NOTE =
  "Pets are allowed in developed frontcountry campgrounds; they are prohibited in the backcountry and on almost all trails. Only the Pinery and Pine Springs campground connector trails are pet-accessible.";
const PADRE_NOTE =
  "Leashed pets are allowed in campgrounds and on park beaches, trails and boardwalks; not in park buildings. Observe beach and visitor-center restrictions.";

interface Rule { note: string; url: string }

function researchedRule(profile: CampingDiscoveryProfile): Rule | null {
  if (profile.managingAgency === "Texas Parks and Wildlife Department") {
    if (NEEDS_PARK_SPECIFIC_CONFIRMATION.has(profile.destinationSlug)) return null;
    return SPECIAL_TPWD_RULES[profile.destinationSlug] ?? {
      note: TPWD_STANDARD_NOTE,
      url: CAMPING_TPWD_PET_RULES_URL,
    };
  }
  if (profile.destinationSlug === "big-bend-national-park") {
    // The separate concession-operated full-hookup lot has explicit NPS rules.
    if (profile.profileSlug === "big-bend-national-park-rio-grande-village-rv-park") {
      return { note: BIBE_NOTE, url: "https://www.nps.gov/bibe/planyourvisit/rgv_hookups.htm" };
    }
    return { note: BIBE_NOTE, url: BIG_BEND_PETS_URL };
  }
  if (profile.destinationSlug === "guadalupe-mountains-national-park") {
    return { note: GUMO_NOTE, url: GUADALUPE_MOUNTAINS_PETS_URL };
  }
  if (profile.destinationSlug === "padre-island-national-seashore") {
    return { note: PADRE_NOTE, url: PADRE_ISLAND_PETS_URL };
  }
  if (profile.destinationSlug === "cedar-breaks-park-lake-georgetown") {
    return {
      note: "Recreation.gov verifies pets are allowed at Cedar Breaks electric campsites, including site 002. Check the individual reserved site's pet and leash rules.",
      url: "https://www.recreation.gov/camping/campsites/26710",
    };
  }
  if (profile.destinationSlug === "russell-park-lake-georgetown") {
    return {
      note: "Recreation.gov permits leashed pets in Russell Park's campground; dogs are prohibited at the swim beach. Confirm the booked campsite.",
      url: "https://www.recreation.gov/camping/campgrounds/234665",
    };
  }
  return null;
}

/** Exact, source-backed pet-camping scope: applies to SOME qualifying sites,
 * not a representation that every campground activity welcomes pets.
 */
export function withResearchedCampingPetPolicy(profile: CampingDiscoveryProfile): CampingDiscoveryProfile {
  const rule = researchedRule(profile);
  if (!rule) {
    // Preserve already documented LCRA/GBRA operator-specific positive tags.
    if (!profile.amenities.includes("pets")) return profile;
    const operatorSource = profile.sources[0];
    return {
      ...profile,
      petPolicy: "Pet access is documented in this operator's campground research; site, lodging and swimming-area restrictions may differ. Check the operator's current terms.",
      petPolicySourceUrl: operatorSource?.url,
    };
  }
  return {
    ...profile,
    amenities: profile.amenities.includes("pets") ? profile.amenities : [...profile.amenities, "pets"],
    petPolicy: rule.note,
    petPolicySourceUrl: rule.url,
    petPolicyResearchedAt: CAMPING_PET_POLICY_RESEARCHED_AT,
  };
}
