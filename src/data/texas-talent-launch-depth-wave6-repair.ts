type TexasTalentDepthSupplement = {
  readonly overviewAppend: readonly string[];
  readonly lastReviewedAt: string;
};

const reviewed = "2026-08-27";

/**
 * Narrow supplemental depth discovered by the wave-6 validator. These
 * paragraphs append to, rather than replace, the reviewed profile narratives.
 */
export const TEXAS_TALENT_LAUNCH_DEPTH_WAVE6_REPAIR: Readonly<Record<string, TexasTalentDepthSupplement>> = {
  "robert-rodriguez": {
    overviewAppend: [
      "That Austin production base also makes Rodriguez useful to the wider Texas Defined knowledge graph: his story links San Antonio origins, UT Austin training and a durable Central Texas studio economy rather than treating Texas merely as scenery for work controlled elsewhere.",
    ],
    lastReviewedAt: reviewed,
  },
  "eva-longoria": {
    overviewAppend: [
      "Her South Texas route also gives the profile a concrete institutional spine: Corpus Christi, Texas A&M University-Kingsville and the surrounding Gulf Coast communities show how family background, higher education and later media leadership can remain part of one coherent Texas story.",
    ],
    lastReviewedAt: reviewed,
  },
  "renee-zellweger": {
    overviewAppend: [
      "The Katy-to-Austin progression also gives readers two distinct Texas settings to follow, connecting a Houston-area upbringing with UT Austin and the state's early professional film network before her career moved onto a national and international stage.",
    ],
    lastReviewedAt: reviewed,
  },
  "ethan-hawke": {
    overviewAppend: [
      "That recurring Austin connection is especially valuable editorially because it separates birthplace from creative relationship: the profile can document a limited early Texas tie while also showing a later, independently meaningful return through sustained filmmaking collaborations.",
    ],
    lastReviewedAt: reviewed,
  },
  "dennis-quaid": {
    overviewAppend: [
      "Houston therefore functions as both origin and training ground in the profile, giving Texas Defined a stronger institutional connection through the University of Houston than a simple birthplace fact would provide on its own.",
    ],
    lastReviewedAt: reviewed,
  },
};
