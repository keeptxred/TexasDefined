import { TEXAS_TALENT_PROFILES } from "@/data/texas-talent-profiles";
import { TEXAS_TALENT_MUSIC_EXPANSION } from "@/data/texas-talent-profiles-wave2-music";
import { TEXAS_TALENT_FILM_EXPANSION } from "@/data/texas-talent-profiles-wave2-film";
import { TEXAS_TALENT_ARTS_EXPANSION } from "@/data/texas-talent-profiles-wave2-arts";

export const TEXAS_TALENT_ALL_PROFILES = [
  ...TEXAS_TALENT_PROFILES,
  ...TEXAS_TALENT_MUSIC_EXPANSION,
  ...TEXAS_TALENT_FILM_EXPANSION,
  ...TEXAS_TALENT_ARTS_EXPANSION,
] as const;

export function getTexasTalentProfile(slug: string) {
  return TEXAS_TALENT_ALL_PROFILES.find((profile) => profile.slug === slug);
}

export function getTexasTalentProfilesByCategory(category: (typeof TEXAS_TALENT_ALL_PROFILES)[number]["category"]) {
  return TEXAS_TALENT_ALL_PROFILES.filter((profile) => profile.category === category);
}
