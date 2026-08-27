import type { TexasTalentProfile } from "@/data/texas-talent";

type TexasTalentDepthOverride = Partial<TexasTalentProfile>;

/** Narrow launch-depth repairs only; no launch approval is granted here. */
export const TEXAS_TALENT_LAUNCH_DEPTH_WAVE5_REPAIR: Readonly<Record<string, TexasTalentDepthOverride>> = {
  "t-bone-walker": {
    legacy: [
      "Walker helped establish electric guitar as a lead voice in blues, combining amplification with phrasing, chord sophistication and physical showmanship in a way later guitarists could build upon rather than merely copy.",
      "His influence extends through blues into rock and roll because the guitar vocabulary he popularized became part of the common language inherited by B.B. King, Chuck Berry and generations of amplified players.",
      "The Linden-to-Dallas route gives that innovation a precise Texas geography. Cass County marks the origin, while Dallas and Deep Ellum explain the urban Black performance culture that shaped Walker before his influence became international, across genres and generations.",
    ],
  },
  "jamie-foxx": {
    overview: [
      "Jamie Foxx was born Eric Bishop in Terrell in 1967 and was raised there by his maternal grandparents. Music came before national comedy or film: he played piano in church, studied music seriously and performed in school, giving the future actor a technical and performance foundation inside a small North Texas community. Terrell matters because the later versatility of Foxx's career—singing, comic timing, mimicry and dramatic performance—did not begin as separate professional lanes. They were all present in some form before he left Texas, which makes the hometown a meaningful origin rather than a decorative birthplace fact.",
      "Stand-up comedy led Foxx toward television and a breakthrough on In Living Color in the early 1990s. The Jamie Foxx Show established him as a sitcom lead, while film roles increasingly demonstrated that the comic persona did not limit his dramatic range. In 2004 he appeared in both Collateral and Ray, receiving Academy Award nominations for each and winning Best Actor for his portrayal of Ray Charles. The performance drew directly on the musical training that had been part of his life since Terrell, making the career's different disciplines converge in one of its most important roles.",
      "Foxx later continued working across film, television and popular music, including major action and dramatic roles as well as recording success. For Texas Defined, his profile offers a strong example of a small-town Texas beginning producing a genuinely multi-disciplinary entertainer. Terrell is the central place; Kaufman County provides the geographic authority layer; and church music, school performance and comedy form a coherent pathway into the later career. The page should resist treating those achievements as an awards list. Its value is to show how several kinds of performance were already being combined before the national audience knew his name. That early combination remained a durable advantage throughout his career.",
    ],
  },
};
