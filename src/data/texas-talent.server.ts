import { TEXAS_TALENT_PROFILES } from "@/data/texas-talent-profiles";
import { TEXAS_TALENT_MUSIC_EXPANSION } from "@/data/texas-talent-profiles-wave2-music";
import { TEXAS_TALENT_FILM_EXPANSION } from "@/data/texas-talent-profiles-wave2-film";
import { TEXAS_TALENT_ARTS_EXPANSION } from "@/data/texas-talent-profiles-wave2-arts";
import { TEXAS_TALENT_PROFILE_CORRECTIONS } from "@/data/texas-talent-profile-corrections";
import { TEXAS_TALENT_READINESS } from "@/data/texas-talent-readiness";
import { TEXAS_TALENT_READINESS_BATCH3 } from "@/data/texas-talent-readiness-batch3";
import { TEXAS_TALENT_READINESS_BATCH4 } from "@/data/texas-talent-readiness-batch4";
import { TEXAS_TALENT_READINESS_BATCH5 } from "@/data/texas-talent-readiness-batch5";
import { TEXAS_TALENT_READINESS_BATCH6 } from "@/data/texas-talent-readiness-batch6";
import { TEXAS_TALENT_READINESS_BATCH7 } from "@/data/texas-talent-readiness-batch7";
import { TEXAS_TALENT_READINESS_BATCH8 } from "@/data/texas-talent-readiness-batch8";
import { TEXAS_TALENT_READINESS_BATCH9 } from "@/data/texas-talent-readiness-batch9";
import { TEXAS_TALENT_READINESS_BATCH10 } from "@/data/texas-talent-readiness-batch10";

const TEXAS_TALENT_ALL_PROFILES = [
  ...TEXAS_TALENT_PROFILES,
  ...TEXAS_TALENT_MUSIC_EXPANSION,
  ...TEXAS_TALENT_FILM_EXPANSION,
  ...TEXAS_TALENT_ARTS_EXPANSION,
] as const;

const TEXAS_TALENT_ALL_READINESS = {
  ...TEXAS_TALENT_READINESS,
  ...TEXAS_TALENT_READINESS_BATCH3,
  ...TEXAS_TALENT_READINESS_BATCH4,
  ...TEXAS_TALENT_READINESS_BATCH5,
  ...TEXAS_TALENT_READINESS_BATCH6,
  ...TEXAS_TALENT_READINESS_BATCH7,
  ...TEXAS_TALENT_READINESS_BATCH8,
  ...TEXAS_TALENT_READINESS_BATCH9,
  ...TEXAS_TALENT_READINESS_BATCH10,
};

const profileSlugs = TEXAS_TALENT_ALL_PROFILES.map((profile) => profile.slug);
const duplicateProfileSlugs = profileSlugs.filter((slug, index) => profileSlugs.indexOf(slug) !== index);
const missingReadinessSlugs = profileSlugs.filter((slug) => !TEXAS_TALENT_ALL_READINESS[slug]);
const orphanCorrectionSlugs = Object.keys(TEXAS_TALENT_PROFILE_CORRECTIONS).filter(
  (slug) => !profileSlugs.includes(slug as (typeof profileSlugs)[number]),
);

if (duplicateProfileSlugs.length > 0) {
  throw new Error(`Duplicate Texas Talent profile slugs: ${[...new Set(duplicateProfileSlugs)].join(", ")}`);
}

if (missingReadinessSlugs.length > 0) {
  throw new Error(`Texas Talent profiles missing readiness records: ${missingReadinessSlugs.join(", ")}`);
}

if (orphanCorrectionSlugs.length > 0) {
  throw new Error(`Texas Talent profile corrections target unknown slugs: ${orphanCorrectionSlugs.join(", ")}`);
}

function withReadiness<T extends (typeof TEXAS_TALENT_ALL_PROFILES)[number]>(profile: T) {
  const correctedProfile = {
    ...profile,
    ...(TEXAS_TALENT_PROFILE_CORRECTIONS[profile.slug] ?? {}),
  };

  return {
    ...correctedProfile,
    readiness: TEXAS_TALENT_ALL_READINESS[profile.slug],
  };
}

export function loadTexasTalentProfilesServer() {
  return TEXAS_TALENT_ALL_PROFILES.map(withReadiness);
}

export function loadTexasTalentProfileServer(slug: string) {
  const profile = TEXAS_TALENT_ALL_PROFILES.find((candidate) => candidate.slug === slug);
  return profile ? withReadiness(profile) : null;
}
