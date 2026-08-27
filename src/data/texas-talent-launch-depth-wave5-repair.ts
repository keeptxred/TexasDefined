import type { TexasTalentProfile } from "@/data/texas-talent";

type TexasTalentDepthOverride = Partial<TexasTalentProfile>;

/** Narrow launch-depth repair only; no launch approval is granted here. */
export const TEXAS_TALENT_LAUNCH_DEPTH_WAVE5_REPAIR: Readonly<Record<string, TexasTalentDepthOverride>> = {
  "t-bone-walker": {
    legacy: [
      "Walker helped establish electric guitar as a lead voice in blues, combining amplification with phrasing, chord sophistication and physical showmanship in a way later guitarists could build upon rather than merely copy.",
      "His influence extends through blues into rock and roll because the guitar vocabulary he popularized became part of the common language inherited by B.B. King, Chuck Berry and generations of amplified players.",
      "The Linden-to-Dallas route gives that innovation a precise Texas geography. Cass County marks the origin, while Dallas and Deep Ellum explain the urban Black performance culture that shaped Walker before his influence became international, across genres and generations.",
    ],
  },
};
