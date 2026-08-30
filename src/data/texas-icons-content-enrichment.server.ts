import type { TexasIconResearchProfile } from "@/data/texas-icons-types";

type TexasIconContentEnrichment = {
  legacyAppend: readonly string[];
};

// Full-registry content audit found these otherwise sourced profiles were
// materially shorter than the rest of the collection. Keep the enrichment
// separate from intake provenance so the original research batches remain
// reviewable while the public narrative receives the additional context.
export const TEXAS_ICON_CONTENT_ENRICHMENT: Readonly<Record<string, TexasIconContentEnrichment>> = {
  "chace-crawford": {
    legacyAppend: [
      "Crawford's Texas connection is more than a birthplace footnote: his Lubbock birth and North Texas upbringing place the beginning of his story in the state even though his best-known screen work was made elsewhere. That distinction helps explain why he belongs in a Texas media roster without pretending his career was primarily Texas-based.",
    ],
  },
  "bob-lilly": {
    legacyAppend: [
      "Lilly links several layers of Texas football history in one career: a Texas high-school and TCU foundation, the distinction of becoming the Dallas Cowboys' first-ever draft choice, and a Hall of Fame professional run identified with the franchise's rise. His place in the roster rests on that unusually continuous Texas football arc rather than on a single award or season.",
    ],
  },
  "andre-johnson": {
    legacyAppend: [
      "Johnson became one of the clearest early standards for the Houston Texans, giving a young franchise a durable offensive identity and a receiving benchmark that lasted beyond his playing years. His 2024 Pro Football Hall of Fame induction also made the Houston chapter nationally legible: a career built largely in Texas had reached the sport's highest individual honor.",
    ],
  },
  "craig-biggio": {
    legacyAppend: [
      "Biggio's importance in Houston comes from longevity as much as statistics. He moved from catcher to second base and the outfield while remaining an Astros fixture across changing eras, then crossed the 3,000-hit threshold in the same uniform. His 2015 Hall of Fame induction reinforced the idea that modern Houston baseball history can be told through one long, adaptable career.",
    ],
  },
  "michael-johnson": {
    legacyAppend: [
      "Johnson's Texas story connects Dallas beginnings with Baylor development and an international sprinting career that changed expectations in both the 200 and 400 meters. His upright running style and championship record made him visually distinctive, but the deeper Texas connection is institutional: elite college training in Waco became the platform for one of the defining track careers of the 1990s.",
    ],
  },
  "mia-hamm": {
    legacyAppend: [
      "Wichita Falls should therefore be understood as a formative stop rather than an attempt to claim Hamm's entire biography for Texas. Her later national-team achievements belong to a much larger American soccer story, while the Texas chapter matters because organized youth soccer there helped shape a player who would become one of the sport's most recognizable advocates and champions.",
    ],
  },
  "spud-webb": {
    legacyAppend: [
      "The Dallas dunk title is remembered because it condensed Webb's career into one dramatic image, but his Texas development was broader. Wilmer-Hutchins and Midland College gave him competitive stages before the NBA, and the fact that he remained in the league for more than a decade matters as much as the contest itself: the career outlasted the novelty narrative built around his height.",
    ],
  },
  "adrian-peterson": {
    legacyAppend: [
      "Peterson's Palestine background also places his rise inside the long East Texas football pipeline, where high-school production can become a national recruiting story before a player ever reaches college. His Oklahoma and NFL chapters took place outside Texas, but the speed-and-power reputation attached to him was already established at home, making Palestine a substantive origin point rather than a ceremonial hometown label.",
    ],
  },
  "von-miller": {
    legacyAppend: [
      "Few active-era stars have a Texas arc as geographically complete as Miller's: DeSoto shaped the high-school prospect, Texas A&M developed the college pass rusher, and the Cowboys eventually brought the veteran back to North Texas. That return does not erase his championship work elsewhere; it instead gives the Texas portion of his biography a beginning, middle and late-career professional chapter.",
    ],
  },
  "myles-garrett": {
    legacyAppend: [
      "Garrett's Arlington and Texas A&M years are important because they predate the professional accolades and show a continuous North Texas-to-College Station development path. His later NFL moves belong to a national career, but the state's role is foundational rather than incidental: high-school dominance and college production in Texas positioned him to become the first selection in the 2017 draft.",
    ],
  },
  "scottie-scheffler": {
    legacyAppend: [
      "Scheffler also illustrates why Texas identity in sports is not limited to birthplace. His family moved to the Dallas area when he was young, his junior-golf development took place there, and the University of Texas supplied the next competitive stage. Those connected chapters make Texas central to his formation even though his birth certificate points to New Jersey.",
    ],
  },
  "jordan-spieth": {
    legacyAppend: [
      "Spieth's Dallas-to-Austin path gives his profile a particularly coherent Texas through-line. Junior golf in North Texas and a University of Texas career preceded a rapid professional ascent, so his major championships are not the only reason he matters here. He also represents a visible example of the state's junior and collegiate golf systems feeding directly into the sport's highest level.",
    ],
  },
  "eric-dickerson": {
    legacyAppend: [
      "Dickerson's Texas football identity begins in Sealy and continues through the celebrated SMU backfield before his record-setting NFL years. The professional single-season rushing mark made him a national figure, but the earlier Texas chapters explain the scale of expectation around him before the NFL: he was already part of a major high-school and Southwest Conference football story.",
    ],
  },
  "sammy-baugh": {
    legacyAppend: [
      "Baugh's importance to Texas football stretches from Sweetwater to TCU and then into the early professional game. His reputation as a passer, punter and defensive back reflects an era when elite players routinely carried several responsibilities, and his success helped connect the state's prewar college football culture to the development of a more pass-oriented professional sport.",
    ],
  },
  "doak-walker": {
    legacyAppend: [
      "Walker's Dallas upbringing and SMU career made him one of the central figures in the city's postwar sports identity. The crowds and attention surrounding his college games were part of the phenomenon remembered as the 'House That Doak Built,' while his Heisman Trophy and later professional success ensured that the local popularity was matched by national recognition.",
    ],
  },
  "dat-nguyen": {
    legacyAppend: [
      "Nguyen's story also broadened the image of who could become a Texas football standard-bearer. Raised on the Gulf Coast in a Vietnamese American family, he became an All-American at Texas A&M and then a Dallas Cowboy. That path makes his significance cultural as well as athletic, connecting immigrant-family Texas, college football and the state's most visible professional franchise.",
    ],
  },
  "kamaru-usman": {
    legacyAppend: [
      "Usman's Texas connection is rooted in the immigrant and high-school years that preceded his collegiate wrestling and mixed-martial-arts career. Moving from Nigeria to the Dallas-Fort Worth area placed an important part of his athletic development in Texas, while his later championship run occurred on a global stage. The profile should preserve both facts instead of turning Texas into either the whole story or a footnote.",
    ],
  },
  "derrick-lewis": {
    legacyAppend: [
      "Lewis became closely identified with Houston because the city is where his adult fighting career and public persona took shape, even though he was born in New Orleans. His long UFC tenure, knockout power and unmistakably Houston presentation made him a local sports figure in a discipline that does not always produce city-specific identities as strongly as the major team sports do.",
    ],
  },
  "aj-foyt": {
    legacyAppend: [
      "Foyt's Houston roots anchor a racing career whose range is difficult to match. He won the Indianapolis 500 four times and also succeeded in major sports-car and stock-car events, demonstrating unusual versatility across disciplines. That breadth is why his Texas significance extends beyond one famous race: a Houston-born driver became a reference point for American motorsports across several forms of competition.",
    ],
  },
  "carroll-shelby": {
    legacyAppend: [
      "Shelby's Texas story spans both driving and design. Born in East Texas and raised around Dallas, he reached international racing success before health problems pushed him toward the engineering and business side of performance cars. The resulting Cobra and later Ford collaborations made his name durable far beyond the cockpit, tying Texas biography to one of the most recognizable American automotive-performance brands.",
    ],
  },
  "chris-simms": {
    legacyAppend: [
      "Simms belongs in the Texas sports story primarily because of his University of Texas years, not because of birthplace or a lifelong state identity. Quarterbacking the Longhorns placed him inside one of the country's most scrutinized college programs and made his career part of the Austin football record before he moved into the NFL and, later, national football broadcasting.",
    ],
  },
};

export function enrichTexasIconNarrativeContent(profile: TexasIconResearchProfile): TexasIconResearchProfile {
  const enrichment = TEXAS_ICON_CONTENT_ENRICHMENT[profile.slug];
  if (!enrichment) return profile;
  return {
    ...profile,
    legacy: [...profile.legacy, ...enrichment.legacyAppend],
  };
}
