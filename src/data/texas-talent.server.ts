import { TEXAS_TALENT_PROFILES } from "@/data/texas-talent-profiles";
import { TEXAS_TALENT_MUSIC_EXPANSION } from "@/data/texas-talent-profiles-wave2-music";
import { TEXAS_TALENT_FILM_EXPANSION } from "@/data/texas-talent-profiles-wave2-film";
import { TEXAS_TALENT_ARTS_EXPANSION } from "@/data/texas-talent-profiles-wave2-arts";
import { TEXAS_TALENT_READINESS } from "@/data/texas-talent-readiness";

const TEXAS_TALENT_ALL_PROFILES = [
  ...TEXAS_TALENT_PROFILES,
  ...TEXAS_TALENT_MUSIC_EXPANSION,
  ...TEXAS_TALENT_FILM_EXPANSION,
  ...TEXAS_TALENT_ARTS_EXPANSION,
] as const;

function withReadiness<T extends (typeof TEXAS_TALENT_ALL_PROFILES)[number]>(profile: T) {
  return {
    ...profile,
    readiness: TEXAS_TALENT_READINESS[profile.slug] ?? null,
  };
}

export function loadTexasTalentProfilesServer() {
  return TEXAS_TALENT_ALL_PROFILES.map(withReadiness);
}

export function loadTexasTalentProfileServer(slug: string) {
  const profile = TEXAS_TALENT_ALL_PROFILES.find((candidate) => candidate.slug === slug);
  return profile ? withReadiness(profile) : null;
}
