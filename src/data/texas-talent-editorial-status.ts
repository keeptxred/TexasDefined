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
};
