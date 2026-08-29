import type { TexasTalentProfile } from "@/data/texas-talent";

type TexasTalentDepthOverride = Partial<TexasTalentProfile>;

const reviewed = "2026-08-27";

/** Narrow content-depth repair discovered by the wave-4 validator. */
export const TEXAS_TALENT_LAUNCH_DEPTH_WAVE4_REPAIR: Readonly<Record<string, TexasTalentDepthOverride>> = {
  "kacey-musgraves": {
    overview: [
      "Kacey Musgraves was born in Golden in 1988 and grew up in East Texas, where songwriting began early and regional performance exposed her to country and western-swing traditions before a major-label career existed. She wrote songs as a child, performed locally and learned how small-town observation could become material rather than merely background. Wood County gives her profile a particularly clear Texas foundation because the later songwriting voice often depends on close attention to social expectations, private choices and the contradictions of small communities. The Texas connection is therefore both geographic and creative.",
      "Musgraves's major-label breakthrough came with Same Trailer Different Park in 2013. Merry Go 'Round and Follow Your Arrow introduced a songwriter willing to question country conventions from inside the genre, using compact language and empathy rather than treating small-town life as either simple nostalgia or easy ridicule. Pageant Material continued that perspective, while Golden Hour expanded the production toward psychedelic pop, soft rock and electronic textures. The album won the Grammy for Album of the Year in 2019, demonstrating that a career rooted in country songwriting could cross genre boundaries without abandoning the observational precision that made the early records distinctive.",
      "Later projects continued to move between country, pop and more atmospheric production, while Texas references and the memory of East Texas remained part of Musgraves's public identity. For Texas Defined, the strongest page should connect Golden and the Mineola area to the wider history of Texas songwriting and western swing without overstating a single influence. Her importance lies partly in how she carried a small-town East Texas perspective into contemporary pop while resisting the idea that regional identity requires stylistic conservatism. The result is a profile where place explains the lens of the writing even as the sound travels far beyond traditional country. That tension between rooted observation and musical expansion is central to why her Texas story remains useful rather than ornamental.",
    ],
    lastReviewedAt: reviewed,
  },
};