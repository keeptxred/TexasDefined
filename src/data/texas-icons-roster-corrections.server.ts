import type { TexasIconResearchProfile } from "@/data/texas-icons-types";

const reviewed = "2026-08-27";

export const TEXAS_ICON_ROSTER_CORRECTIONS = Object.freeze([
  {
    sourceRank: 223,
    sourceName: "Trey Parker",
    sourceSlug: "trey-parker",
    replacementName: "Matt Stone",
    replacementSlug: "matt-stone",
    reason: "The owner-supplied row appears to have swapped the two South Park co-creators. Television Academy records identify Trey Parker as Colorado-born and Matt Stone as Houston-born. The raw intake row remains unchanged as provenance; this is an explicit editorial correction, not an alias.",
    evidence: [
      "https://www.televisionacademy.com/bios/trey-parker",
      "https://www.televisionacademy.com/bios/matt-stone",
      "https://southpark.cc.com/info/jveh1j/creator-bios?mdrv=southpark.cc.com%2F",
    ],
  },
] as const);

export const TEXAS_ICON_CORRECTED_RESEARCH_PROFILES: readonly TexasIconResearchProfile[] = [
  {
    slug: "matt-stone",
    editorialStatus: "researched-staged",
    publicationNote: "Legacy research-workflow note: explicit correction of owner-supplied rank 223 from Trey Parker to Houston-born collaborator Matt Stone. Runtime publication is governed by the written-content publication policy, not this historical staging field.",
    dek: "Houston-born Matt Stone became a defining American animation and musical-comedy creator through South Park and The Book of Mormon, a Texas birth connection that corrects an owner-supplied roster row that mistakenly named his Colorado-born collaborator Trey Parker.",
    overview: [
      "Matthew Richard Stone was born in Houston, Texas, in 1971 and was raised in the Denver-area community of Littleton, Colorado. At the University of Colorado Boulder he met Trey Parker, beginning the partnership that led to early animated shorts and eventually South Park. The Texas connection is therefore birth, not a claim that Stone was raised or professionally based in the state.",
      "Stone and Parker co-created South Park, which debuted in 1997 and became one of television's longest-running animated comedies. With songwriter Robert Lopez they also created The Book of Mormon, which premiered on Broadway in 2011. In 2026 Stone and Parker were inducted together into the Television Academy Hall of Fame.",
    ],
    definingWorks: ["South Park", "The Book of Mormon", "Team America: World Police", "BASEketball", "2026 Television Academy Hall of Fame"],
    timeline: [
      { year: "1971", event: "Born in Houston, Texas." },
      { year: "1990s", event: "Meets Trey Parker while studying at the University of Colorado Boulder and begins their creative partnership." },
      { year: "1997", event: "South Park premieres on Comedy Central." },
      { year: "2011", event: "The Book of Mormon opens on Broadway." },
      { year: "2026", event: "Inducted with Trey Parker into the Television Academy Hall of Fame." },
    ],
    legacy: [
      "Stone's Texas connection is modest but authoritative: the Television Academy lists Houston as his birthplace. The profile does not inflate that fact into a Texas upbringing.",
      "The explicit correction also demonstrates the registry's provenance rule: a demonstrably mismatched intake subject is corrected transparently rather than silently aliased or given a fabricated Texas biography.",
    ],
    texasPlaces: [{ name: "Houston", context: "Birthplace documented by the Television Academy." }],
    sources: [
      { label: "Television Academy — Matt Stone", url: "https://www.televisionacademy.com/bios/matt-stone" },
      { label: "South Park — Creator Bios", url: "https://southpark.cc.com/info/jveh1j/creator-bios?mdrv=southpark.cc.com%2F" },
      { label: "University of Colorado Boulder — Cinema Studies alumni", url: "https://www.colorado.edu/cinemastudies/where-are-they-now" },
      { label: "Television Academy — Trey Parker", url: "https://www.televisionacademy.com/bios/trey-parker" },
    ],
    lastReviewedAt: reviewed,
  },
];

const correctionBySourceSlug = new Map(
  TEXAS_ICON_ROSTER_CORRECTIONS.map((correction) => [correction.sourceSlug, correction]),
);
const correctionByReplacementSlug = new Map(
  TEXAS_ICON_ROSTER_CORRECTIONS.map((correction) => [correction.replacementSlug, correction]),
);
const researchBySlug = new Map(
  TEXAS_ICON_CORRECTED_RESEARCH_PROFILES.map((profile) => [profile.slug, profile]),
);

export function texasIconCorrectionSourceSlug(slug: string) {
  return correctionByReplacementSlug.get(slug)?.sourceSlug ?? slug;
}

export function texasIconCorrectedResearchProfile(slug: string) {
  return researchBySlug.get(slug) ?? null;
}

export function applyTexasIconRosterCorrection<T extends {
  rank: number;
  slug: string;
  name: string;
  href: string;
  summary: string;
  reuseKind: string;
  indexableAtOwnRoute: boolean;
  matchedResearchSlug?: string;
}>(icon: T): T {
  const correction = correctionBySourceSlug.get(icon.slug);
  if (!correction || icon.rank !== correction.sourceRank) return icon;
  const research = researchBySlug.get(correction.replacementSlug);
  if (!research) return icon;
  return {
    ...icon,
    slug: correction.replacementSlug,
    name: correction.replacementName,
    href: `/texas-icons/${correction.replacementSlug}`,
    summary: research.dek,
    reuseKind: "icon-research-staged",
    indexableAtOwnRoute: true,
    matchedResearchSlug: correction.replacementSlug,
  };
}
