import type { TexasTalentProfile } from "@/data/texas-talent";

type TexasTalentEditorialStatusOverride = Pick<
  TexasTalentProfile,
  "profileStatus" | "lastReviewedAt"
>;

// Content readiness is deliberately separate from publication readiness.
// These profiles have completed the current editorial/source review pass, but
// their readiness records remain the only authority for launch approval.
export const TEXAS_TALENT_EDITORIAL_STATUS_OVERRIDES: Readonly<
  Record<string, TexasTalentEditorialStatusOverride>
> = {
  "willie-nelson": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  selena: { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "buddy-holly": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  beyonce: { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "matthew-mcconaughey": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "george-strait": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "stevie-ray-vaughan": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "janis-joplin": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "waylon-jennings": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "roy-orbison": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "jamie-foxx": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "woody-harrelson": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "tommy-lee-jones": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "wes-anderson": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "robert-rodriguez": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "ornette-coleman": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "townes-van-zandt": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "lightnin-hopkins": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "lead-belly": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "billy-gibbons": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "eva-longoria": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "renee-zellweger": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "ethan-hawke": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "dennis-quaid": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "sissy-spacek": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "forest-whitaker": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "richard-linklater": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "katherine-anne-porter": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "sandra-cisneros": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "cormac-mccarthy": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "benjamin-alire-saenz": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "robert-rauschenberg": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "steve-martin": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "tom-lea": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "julian-onderdonk": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "t-bone-walker": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "don-henley": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "kelly-clarkson": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "kacey-musgraves": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "leon-bridges": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "erykah-badu": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "carol-burnett": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "debbie-allen": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "bill-hicks": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "j-frank-dobie": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "horton-foote": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "dorothy-hood": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "donald-judd": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "larry-mcmurtry": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "megan-thee-stallion": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
  "miranda-lambert": { profileStatus: "ready", lastReviewedAt: "2026-08-26" },
};
