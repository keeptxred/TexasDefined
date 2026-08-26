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
};
