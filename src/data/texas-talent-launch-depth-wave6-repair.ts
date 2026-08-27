import type { TexasTalentProfile } from "@/data/texas-talent";

type TexasTalentDepthOverride = Partial<TexasTalentProfile>;

const reviewed = "2026-08-27";

/** Narrow content-depth repair discovered by the wave-6 validator. */
export const TEXAS_TALENT_LAUNCH_DEPTH_WAVE6_REPAIR: Readonly<Record<string, TexasTalentDepthOverride>> = {
  "robert-rodriguez": {
    overview: [
      "Robert Rodriguez was born in San Antonio in 1968 and developed his filmmaking ambitions in Texas before studying at the University of Texas at Austin. His early career is especially useful for Texas Defined because it links South Texas upbringing with a Central Texas film-education and production ecosystem. Rodriguez learned to work with limited resources, treating constraints as a reason to control more of the process rather than wait for a conventional industry invitation. That approach culminated in El Mariachi, the ultra-low-budget feature that became a Sundance success and turned a Texas film student into a widely discussed model of independent production.",
      "Rodriguez expanded that breakthrough into a career that moved between action, horror, family entertainment and stylized comic-book filmmaking. Desperado and From Dusk Till Dawn established his kinetic genre style, while Spy Kids demonstrated that the same production independence could support a major family franchise. Sin City pushed digital compositing and highly controlled visual design to the center of the process. Across those projects, Rodriguez often worked as writer, director, editor, camera operator, composer or producer, reinforcing the do-it-yourself identity that had begun with El Mariachi rather than surrendering control as budgets increased.",
      "The Texas connection became even more substantial when Rodriguez built long-term production infrastructure in Austin through Troublemaker Studios. That decision means his profile is not simply about a filmmaker who happened to be born in San Antonio. It connects Texas education, entrepreneurship and the state's modern film-production economy. San Antonio explains the personal origin; UT Austin explains the transition into serious filmmaking; and Austin explains the studio base from which international productions could be made without relocating the entire creative operation to California. Few Texas Talent film profiles offer such a direct biography-to-industry connection inside the state. His Austin production base also gives readers a concrete example of Texas serving as creative infrastructure, not merely as scenery for films made elsewhere.",
    ],
    lastReviewedAt: reviewed,
  },
};
