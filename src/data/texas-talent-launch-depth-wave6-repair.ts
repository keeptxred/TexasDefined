type TexasTalentDepthSupplement = {
  readonly overviewAppend: readonly string[];
  readonly legacyAppend: readonly string[];
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
    legacyAppend: [
      "That combination of independent method and Texas production infrastructure gives his legacy a local institutional dimension as well as a national filmmaking one.",
    ],
    lastReviewedAt: reviewed,
  },
  "eva-longoria": {
    overviewAppend: [
      "Her South Texas route also gives the profile a concrete institutional spine: Corpus Christi, Texas A&M University-Kingsville and the surrounding Gulf Coast communities show how family background, higher education and later media leadership can remain part of one coherent Texas story.",
    ],
    legacyAppend: [
      "Her career therefore connects South Texas identity with decision-making power behind the camera, extending the profile beyond celebrity into questions of who develops, directs and produces mainstream stories.",
    ],
    lastReviewedAt: reviewed,
  },
  "renee-zellweger": {
    overviewAppend: [
      "The Katy-to-Austin progression also gives readers two distinct Texas settings to follow, connecting a Houston-area upbringing with UT Austin and the state's early professional film network before her career moved onto a national and international stage.",
    ],
    legacyAppend: [
      "Her Texas beginning also illustrates how university training and regional production experience can become an early professional bridge rather than remaining separate from a later national career.",
    ],
    lastReviewedAt: reviewed,
  },
  "ethan-hawke": {
    overviewAppend: [
      "That recurring Austin connection is especially valuable editorially because it separates birthplace from creative relationship: the profile can document a limited early Texas tie while also showing a later, independently meaningful return through sustained filmmaking collaborations.",
    ],
    legacyAppend: [
      "The Austin collaborations also make his Texas connection artistically consequential, tying a major acting and writing career to one of the state's most durable independent-film partnerships.",
    ],
    lastReviewedAt: reviewed,
  },
  "dennis-quaid": {
    overviewAppend: [
      "Houston therefore functions as both origin and training ground in the profile, giving Texas Defined a stronger institutional connection through the University of Houston than a simple birthplace fact would provide on its own.",
    ],
    legacyAppend: [
      "That educational anchor makes Quaid useful to Texas cultural history because it connects a long mainstream film career back to a specific Houston performing-arts institution.",
    ],
    lastReviewedAt: reviewed,
  },
};
