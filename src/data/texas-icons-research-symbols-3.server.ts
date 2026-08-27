import type { TexasIconResearchProfile } from "@/data/texas-icons-types";

const reviewed = "2026-08-27";
const staged = "First-pass authority profile remains noindex pending image-rights and internal-link certification.";

export const TEXAS_ICON_RESEARCH_SYMBOLS_BATCH_3: readonly TexasIconResearchProfile[] = [
  {
    slug: "texas-sheet-cake",
    editorialStatus: "researched-staged",
    publicationNote: staged,
    dek: "Texas Sheet Cake is a thin chocolate cake made for a crowd and finished with warm cooked chocolate icing—often with pecans—whose exact origin and even naming remain uncertain despite its durable Texas association.",
    overview: [
      "Food-history research does not support a single proven inventor or origin story for Texas Sheet Cake. The Library of Congress traces related printed recipes back to a large chocolate sheet cake in the Galveston Daily News in 1936 and notes later 'sheath cake' and sheet-cake variants, while also finding no evidence for some popular attribution stories.",
      "The modern form is generally baked in a shallow sheet or jelly-roll pan and commonly uses a tender chocolate batter with buttermilk or sour cream. A warm, fudge-like chocolate icing is poured over the cake soon after baking, often with pecans. Its large yield helped make it a staple of potlucks, funerals, church gatherings and other events where one dessert needs to serve many people.",
    ],
    definingWorks: ["thin chocolate sheet cake", "warm cooked chocolate icing", "pecans", "buttermilk variations", "crowd-serving Texas dessert"],
    timeline: [
      { year: "1936", event: "A large chocolate sheet-cake recipe appears in the Galveston Daily News, an early documented precursor in Texas print." },
      { year: "1960s", event: "Texas 'sheath cake' and related chocolate sheet-cake recipes circulate under several names." },
      { year: "1970s-present", event: "Texas Sheet Cake becomes a widely recognized name for the crowd-serving chocolate cake and warm icing style." },
    ],
    legacy: [
      "Texas Sheet Cake became a community-food symbol because its format is practical: a shallow pan produces many portions and the icing is applied while the cake is warm.",
      "Its origin remains uncertain, so a responsible Texas profile should preserve that ambiguity instead of repeating an unsupported inventor legend.",
    ],
    texasPlaces: [
      { name: "Galveston", context: "A 1936 Galveston Daily News recipe is an early documented Texas print precursor." },
      { name: "Statewide Texas", context: "The cake became associated with potlucks, funerals and community gatherings across the state." },
    ],
    sources: [
      { label: "Library of Congress — The Great Sheet Cake Mystery", url: "https://blogs.loc.gov/inside_adams/2013/04/the-great-sheet-cake-mystery/" },
      { label: "King Arthur Baking — Texas Sheet Cake", url: "https://www.kingarthurbaking.com/recipes/texas-sheet-cake-recipe" },
      { label: "Southern Living — Texas Funeral Cake history", url: "https://www.southernliving.com/culture/texas-funeral-cake-history" },
    ],
    lastReviewedAt: reviewed,
  },
  {
    slug: "the-cowboy-boot",
    editorialStatus: "researched-staged",
    publicationNote: staged,
    dek: "The cowboy boot evolved from practical mounted-work footwear into one of Texas's strongest visual symbols; lawmakers made it the official State Footwear in 2007 and named El Paso the state's Boot Capital in 2025.",
    overview: [
      "The modern cowboy boot evolved during the post-Civil War cattle-drive era as bootmakers adapted riding footwear to cowboys' needs, including high shafts, riding heels and shapes that worked with stirrups. Texas was central to that evolution, but the historical record does not support claiming that one Texan or one shop invented the form alone.",
      "Texas bootmaking developed enduring centers and companies: H. J. 'Big Daddy Joe' Justin began making boots in Spanish Fort in 1879, Lucchese was founded in San Antonio in 1883, Tony Lama established his El Paso business in 1912, and Nocona developed its own bootmaking tradition. Western films, rodeo, country music and fashion later carried the boot far beyond ranch work. The Legislature designated the cowboy boot official State Footwear in 2007 and El Paso official Boot Capital of Texas in 2025.",
    ],
    definingWorks: ["riding heel and high shaft", "Texas trail-drive history", "Texas bootmaking", "official State Footwear", "El Paso Boot Capital"],
    timeline: [
      { year: "1866-1890", event: "The major cattle-drive era accelerates demand for specialized riding boots used by working cowboys." },
      { year: "1879", event: "H. J. Justin begins bootmaking in Spanish Fort, Texas." },
      { year: "1883", event: "The Lucchese bootmaking business is established in San Antonio." },
      { year: "1912", event: "Tony Lama establishes his bootmaking business in El Paso." },
      { year: "2007", event: "The 80th Texas Legislature designates the cowboy boot the official State Footwear of Texas." },
      { year: "2025", event: "The Legislature designates El Paso the official Boot Capital of Texas." },
    ],
    legacy: [
      "The cowboy boot bridges working-ranch equipment and ceremonial Texas identity, appearing in rodeo, music, politics, fashion and everyday dress.",
      "Texas's significance comes from generations of makers and users rather than a simplistic single-inventor story, and El Paso's 2025 designation formally recognizes one of the state's major bootmaking centers.",
    ],
    texasPlaces: [
      { name: "Spanish Fort and Nocona", context: "North Texas communities associated with the Justin and Nocona bootmaking traditions." },
      { name: "San Antonio", context: "Early home of Lucchese bootmaking beginning in 1883." },
      { name: "El Paso", context: "Longstanding bootmaking center and official Boot Capital of Texas since 2025." },
    ],
    sources: [
      { label: "Texas Legislature — HCR 151 enrolled text", url: "https://capitol.texas.gov/tlodocs/80R/billtext/pdf/HC00151F.pdf" },
      { label: "Texas Legislature — HCR 151 analysis", url: "https://capitol.texas.gov/tlodocs/80R/analysis/pdf/HC00151H.pdf" },
      { label: "Texas State Library — Texas State Symbols", url: "https://www.tsl.texas.gov/ref/abouttx/symbols" },
      { label: "Texas Legislature — SCR 29 El Paso Boot Capital", url: "https://capitol.texas.gov/tlodocs/89R/billtext/html/SC00029F.htm" },
    ],
    lastReviewedAt: reviewed,
  },
];
