import { TEXAS_TALENT_PROFILES } from "@/data/texas-talent-profiles";
import { TEXAS_TALENT_MUSIC_EXPANSION } from "@/data/texas-talent-profiles-wave2-music";
import { TEXAS_TALENT_FILM_EXPANSION } from "@/data/texas-talent-profiles-wave2-film";
import { TEXAS_TALENT_ARTS_EXPANSION } from "@/data/texas-talent-profiles-wave2-arts";
import { TEXAS_TALENT_READINESS } from "@/data/texas-talent-readiness";
import { TEXAS_TALENT_READINESS_BATCH3 } from "@/data/texas-talent-readiness-batch3";
import { TEXAS_TALENT_READINESS_BATCH4 } from "@/data/texas-talent-readiness-batch4";
import { TEXAS_TALENT_READINESS_BATCH5 } from "@/data/texas-talent-readiness-batch5";
import { TEXAS_TALENT_READINESS_BATCH6 } from "@/data/texas-talent-readiness-batch6";
import { TEXAS_TALENT_READINESS_BATCH7 } from "@/data/texas-talent-readiness-batch7";
import { TEXAS_TALENT_READINESS_BATCH8 } from "@/data/texas-talent-readiness-batch8";
import { TEXAS_TALENT_READINESS_BATCH9 } from "@/data/texas-talent-readiness-batch9";

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
};

function withReadiness<T extends (typeof TEXAS_TALENT_ALL_PROFILES)[number]>(profile: T) {
  return {
    ...profile,
    readiness: TEXAS_TALENT_ALL_READINESS[profile.slug] ?? null,
  };
}

export function loadTexasTalentProfilesServer() {
  return TEXAS_TALENT_ALL_PROFILES.map(withReadiness);
}

export function loadTexasTalentProfileServer(slug: string) {
  const profile = TEXAS_TALENT_ALL_PROFILES.find((candidate) => candidate.slug === slug);
  return profile ? withReadiness(profile) : null;
}
