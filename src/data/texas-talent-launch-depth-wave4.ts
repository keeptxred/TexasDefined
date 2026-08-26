import type { TexasTalentProfile } from "@/data/texas-talent";

type TexasTalentDepthOverride = Partial<TexasTalentProfile>;

const reviewed = "2026-08-26";

/**
 * Launch-depth editorial upgrades for a fourth Texas Talent cohort spanning
 * blues, acting and filmmaking. This layer only strengthens narrative depth;
 * source, image, link and explicit editorial-launch approval remain separate.
 */
export const TEXAS_TALENT_LAUNCH_DEPTH_WAVE4: Readonly<Record<string, TexasTalentDepthOverride>> = {
  "t-bone-walker": {
    overview: [
      "Aaron Thibeaux 'T-Bone' Walker was born in Linden, Texas, in 1910 and grew up in Dallas, where music was woven into family life and the city's Black entertainment districts. Dallas placed him close to a working blues culture that included street performers, theaters, dances and traveling musicians, and the young Walker absorbed both guitar playing and showmanship before he was old enough to build a national career. The Handbook of Texas documents his East Texas birth and Dallas upbringing, while the Rock & Roll Hall of Fame places him among the foundational figures of electric blues. That combination matters for Texas Defined because Walker's story is not simply about a famous guitarist who happened to come from Texas. Linden supplies the East Texas origin, and Dallas supplies the urban musical environment where a performer could encounter older country-blues traditions while learning how to command a stage for larger audiences.",
      "By the 1930s and 1940s Walker had moved into professional touring and recording, developing a style in which amplified guitar became a featured melodic voice rather than merely accompaniment. His single-note lines, bent notes, jazz-informed phrasing and theatrical stage presence helped establish a vocabulary later absorbed by blues and rock guitarists. Call It Stormy Monday, recorded during the 1940s, became his best-known composition and a blues standard interpreted by generations of performers. Walker's importance therefore lies in both sound and presentation: he demonstrated that electric guitar could carry sophisticated phrasing, volume and visual drama without losing the emotional directness of the blues. The career became national and international, but the musical apprenticeship that preceded it belonged to the Dallas world in which blues, jazz and popular entertainment overlapped.",
      "Walker died in 1975, but his influence became more visible as later guitarists identified him as a model. The Rock & Roll Hall of Fame inducted him in 1987, recognizing a contribution that reaches from postwar blues into rock and rhythm-and-blues guitar. For Texas Defined, the profile creates a strong route between Cass County, Dallas County, Deep Ellum history and the Texas blues authority cluster. It also helps explain a larger historical transition: amplification did not erase Texas blues traditions; musicians such as Walker used new technology to extend them. His Texas story therefore connects rural origin, urban Black music culture and an innovation in performance practice that changed how guitar would function across popular music for decades." 
    ],
    timeline: [
      { year: "1910", event: "Born Aaron Thibeaux Walker in Linden, Texas." },
      { year: "1920s", event: "Develops as a young performer in Dallas amid the city's blues, jazz and entertainment circuits." },
      { year: "1940s", event: "Establishes his mature amplified-guitar style through touring and recording." },
      { year: "1947", event: "Call It Stormy Monday becomes the recording most closely associated with his songwriting legacy." },
      { year: "1987", event: "Posthumously inducted into the Rock & Roll Hall of Fame." }
    ],
    legacy: [
      "Walker helped establish the electric guitar as a lead voice in modern blues. His precise single-note lines, bends and jazz-inflected phrasing gave later blues and rock players a vocabulary that could be expanded without losing its blues foundation.",
      "His stagecraft mattered alongside his recordings. Playing behind his head, moving with the instrument and treating guitar performance as visual entertainment anticipated the showmanship later associated with major rock guitarists.",
      "Linden and Dallas make that innovation legible as a Texas story rather than an abstract genre milestone. The profile links an East Texas birthplace to Dallas's Black music culture and then outward to the international history of electric blues and rock guitar." 
    ],
    texasPlaces: [
      { name: "Linden", context: "Walker's Cass County birthplace gives his story an East Texas beginning before his family and musical development became closely associated with Dallas." },
      { name: "Dallas", context: "The city was Walker's formative musical environment, exposing him to blues, jazz, theater and working performers before his amplified guitar style reached national audiences." }
    ],
    lastReviewedAt: reviewed,
  },
  "jamie-foxx": {
    overview: [
      "Jamie Foxx was born Eric Marlon Bishop in Terrell, Texas, in 1967 and was raised in the East Texas community where school, church and local performance gave him early opportunities to develop as an entertainer. Terrell's own civic and visitor materials preserve that hometown connection, making the profile stronger than a generic birthplace note. Foxx learned piano while young and participated in music and performance before leaving Texas for college and the professional entertainment world. That background matters because his later career would repeatedly cross boundaries between comedy, acting and music. For Texas Defined, Terrell and Kaufman County provide a specific home landscape behind a performer often understood primarily through Hollywood and national television.",
      "Foxx first became widely known through television comedy, including In Living Color, before moving into an increasingly ambitious film career. Roles in Any Given Sunday and Collateral demonstrated dramatic range, but Ray became the defining turning point. His portrayal of Ray Charles earned the Academy Award for Best Actor at the 2005 ceremony, while the same awards season also brought a supporting-actor nomination for Collateral. The achievement was unusual not simply because of the award but because Foxx maintained a parallel music career and continued working in comedy. That combination made him a modern example of the multi-hyphenate entertainer: a performer whose public identity could not be confined to one medium even after reaching the highest level of recognition in film.",
      "The national scale of Foxx's career should not obscure the Texas geography that formed the beginning of the story. Terrell remains the central place because it is where family, school and community performance preceded the professional persona. Kaufman County provides the broader regional anchor into Texas Defined's place network. A strong profile can therefore connect readers from an Oscar-winning career back to the smaller East Texas city that claims him as a native son, while avoiding the common mistake of pretending later Hollywood achievements occurred inside Texas. The state's role is formative: Terrell supplied the early environment from which a remarkably versatile national career emerged." 
    ],
    timeline: [
      { year: "1967", event: "Born Eric Marlon Bishop in Terrell, Texas." },
      { year: "1991", event: "Joins the cast of In Living Color and gains a national television audience." },
      { year: "1999", event: "Appears in Any Given Sunday as his dramatic film career expands." },
      { year: "2004", event: "Stars as Ray Charles in Ray and appears in Collateral." },
      { year: "2005", event: "Wins the Academy Award for Best Actor for Ray while also receiving a supporting-actor nomination for Collateral." }
    ],
    legacy: [
      "Foxx built unusual credibility across comedy, dramatic acting and music instead of allowing success in one field to close off the others. That versatility is central to understanding why his career has lasted across changing entertainment formats.",
      "His Academy Award for Ray placed a performer who began in television comedy among the most recognized dramatic actors of his generation, while the simultaneous Collateral nomination underscored the breadth of that transition.",
      "Terrell gives the profile a durable Texas center. The hometown connection lets Texas Defined tie a globally recognized entertainer to Kaufman County without overstating Texas's role in the later Hollywood chapters of his career." 
    ],
    texasPlaces: [
      { name: "Terrell", context: "Foxx's birthplace and childhood community, where family, school, church music and early performance preceded his move into national comedy, film and recording." },
      { name: "Kaufman County", context: "The county-level anchor for Terrell connects Foxx's formative East Texas story to Texas Defined's geographic network without implying that his later career remained locally based." }
    ],
    lastReviewedAt: reviewed,
  },
  "woody-harrelson": {
    overview: [
      "Woody Harrelson was born in Midland, Texas, in 1961. His family later left the state and much of his upbringing occurred elsewhere, so the Texas Talent profile has to be precise about what Texas contributes to the biography: Midland is the origin, not a claim that West Texas shaped every phase of his childhood or professional development. The Television Academy identifies Midland as his birthplace and documents the television career that first made him widely known. That limited but clear connection still matters within a pillar whose eligibility rules allow birthplace-based profiles when the relationship is stated accurately rather than stretched into a larger regional mythology.",
      "Harrelson became a national television figure after joining Cheers in the 1980s as Woody Boyd, a role that turned an initially supporting character into one of the series' recognizable personalities. From there he built a film career notable for its range, moving from broad comedy into independent drama, political satire, crime stories and large studio productions. The People vs. Larry Flynt established him as a serious dramatic lead and brought major awards attention, while later work such as The Messenger and Three Billboards Outside Ebbing, Missouri reinforced a reputation for performances that could shift between humor, volatility and vulnerability. His career also includes major ensemble and franchise work, demonstrating longevity beyond the television role that first defined his public image.",
      "For Texas Defined, Harrelson's page is useful precisely because it shows how the pillar handles a Texas connection that is real but geographically narrow. Midland and Midland County provide the appropriate place anchors; the profile does not need to invent an Austin, Dallas or Houston chapter to make him belong. Instead, it can distinguish origin from upbringing and career, then let the broader biography explain why a Midland-born actor became one of the most adaptable screen performers of his generation. That editorial restraint strengthens the pillar because readers can trust that 'Texas Talent' does not automatically mean every famous person's whole story took place inside the state." 
    ],
    timeline: [
      { year: "1961", event: "Born in Midland, Texas." },
      { year: "1985", event: "Joins Cheers as Woody Boyd and becomes a nationally recognized television actor." },
      { year: "1996", event: "Stars in The People vs. Larry Flynt, establishing major dramatic-film credibility." },
      { year: "2009", event: "Appears in The Messenger, adding another acclaimed dramatic performance to his film career." },
      { year: "2017", event: "Appears in Three Billboards Outside Ebbing, Missouri as his long-running screen career continues." }
    ],
    legacy: [
      "Harrelson's career demonstrates unusual movement between comedy and drama. The approachable persona established on Cheers did not prevent him from taking difficult, eccentric or morally complicated film roles later in his career.",
      "He also sustained relevance across television, independent film and large studio projects for decades, a durability that separates the career from performers remembered primarily for a single breakthrough role.",
      "Within Texas Talent, Harrelson is an important test of geographic honesty. Midland is a verified birthplace and legitimate Texas connection, but the profile explicitly distinguishes that origin from the later upbringing and career that unfolded elsewhere." 
    ],
    texasPlaces: [
      { name: "Midland", context: "Harrelson's verified birthplace supplies the Texas connection while the profile deliberately avoids claiming that his later upbringing or acting career was centered in the city." },
      { name: "Midland County", context: "The county provides the appropriate West Texas geographic anchor for a birthplace-based profile whose connection is real but narrower than those of artists raised or professionally formed in Texas." }
    ],
    lastReviewedAt: reviewed,
  },
  "tommy-lee-jones": {
    overview: [
      "Tommy Lee Jones was born in San Saba, Texas, in 1946 and spent important parts of his youth in Midland and Dallas before leaving the state for Harvard. Those places give his biography more than a single birthplace marker: Central Texas, West Texas and North Texas all appear in the early story documented by biographical sources. Jones eventually became closely associated on screen with laconic authority, hard landscapes and modern western characters, but the profile should separate that screen image from literal biography. His Texas upbringing helps explain why the association feels credible; it does not mean every character is simply an extension of his home state.",
      "After Harvard, Jones built a long stage, television and film career before becoming one of the most recognizable American character actors. Roles in Coal Miner's Daughter, Lonesome Dove and JFK expanded his reputation, and The Fugitive brought the Academy Award for Best Supporting Actor at the 1994 ceremony. Later films such as No Country for Old Men and his own directing work continued the connection between Jones and stories concerned with law, violence, landscape and the contemporary West. The durability of the career is as significant as any individual role: he moved from supporting work into leading roles and direction without losing the severe, economical performance style audiences associated with him.",
      "Texas Defined can make Jones's page especially place-rich because the early biography crosses several parts of the state. San Saba supplies the birthplace and Hill Country/central-Texas anchor, Midland represents a West Texas childhood chapter, and Dallas adds another formative city before college. Those links create a profile that can move naturally through county and city coverage while the film section explains the national career that followed. Jones therefore fits Texas Talent both as a Texas-raised actor and as a performer whose later body of work repeatedly engaged with western and Texas-adjacent themes without requiring the site to confuse fictional roles with personal history." 
    ],
    timeline: [
      { year: "1946", event: "Born in San Saba, Texas." },
      { year: "1969", event: "Graduates from Harvard and begins pursuing professional acting." },
      { year: "1991", event: "Appears in JFK during a period of increasingly prominent film roles." },
      { year: "1994", event: "Wins the Academy Award for Best Supporting Actor for The Fugitive." },
      { year: "2007", event: "Appears in No Country for Old Men, adding another major modern-western role to his career." }
    ],
    legacy: [
      "Jones became one of the defining American character actors of his generation through performances built on restraint, precision and authority rather than constant transformation or celebrity spectacle.",
      "His work in westerns, crime films and stories about law and landscape helped keep modern versions of the western tradition central to mainstream film even as the genre changed form.",
      "San Saba, Midland and Dallas give Texas Defined unusually strong geographic context for the profile. The state is both birthplace and upbringing landscape, while the later national career can be discussed without reducing every role to a Texas stereotype." 
    ],
    texasPlaces: [
      { name: "San Saba", context: "Jones's birthplace provides the Central Texas starting point for a biography that later moved through other parts of the state before his college and acting years." },
      { name: "Midland", context: "A documented childhood location that adds a genuine West Texas chapter to Jones's upbringing rather than relying only on the western imagery of his later film roles." },
      { name: "Dallas", context: "Another formative Texas city in Jones's youth, broadening the profile's geographic network beyond the San Saba birthplace and Midland childhood connection." }
    ],
    lastReviewedAt: reviewed,
  },
  "wes-anderson": {
    overview: [
      "Wes Anderson was born and raised in Houston, Texas, in 1969 and later attended the University of Texas at Austin, where an important part of his filmmaking story began. At UT he met Owen Wilson, and the friendship developed into the collaboration that produced Bottle Rocket first as a short and then as a feature. UT Austin's Radio-Television-Film program lists Anderson among its notable alumni, giving the Austin chapter an institutional anchor rather than treating it as film-industry folklore. Houston supplies childhood and origin; Austin supplies the creative partnership and transition from student interest into professional filmmaking.",
      "Bottle Rocket introduced many of the concerns that would recur across Anderson's films: tightly arranged images, eccentric communities, damaged families, elaborate objects and characters trying to impose order on emotional disorder. Rushmore, filmed substantially in Houston, deepened both his visual style and the connection between his early filmmaking and Texas locations. The Royal Tenenbaums expanded his audience and brought an Academy Award nomination for original screenplay shared with Owen Wilson. Later projects such as The Grand Budapest Hotel, Fantastic Mr. Fox and Moonrise Kingdom made Anderson's formal precision instantly recognizable across live-action and stop-motion work. The mature career became international in setting and production, but the first creative network was distinctly Texas-based.",
      "For Texas Defined, Anderson offers one of the clearest examples of how a Talent profile can link people to an institutional and urban creative ecosystem. Houston is not only a birthplace; it appears in schooling, family history and the production geography of early work. Austin is not only a college stop; UT is where Anderson met the collaborator with whom he wrote his first features. The profile can therefore connect Harris County, Travis County, Houston film locations, UT Austin and broader Texas film history. That network is more informative than simply labeling Anderson a 'Texas director' because it shows the mechanisms—schools, friendships, locations and small early projects—through which a Texas creative environment contributed to a distinctive international filmmaking career." 
    ],
    timeline: [
      { year: "1969", event: "Born in Houston, Texas." },
      { year: "1990s", event: "Attends the University of Texas at Austin and develops a creative partnership with Owen Wilson." },
      { year: "1996", event: "Bottle Rocket is released as a feature film, launching Anderson's professional directing career." },
      { year: "1998", event: "Rushmore expands his audience and uses Houston locations central to his early filmmaking story." },
      { year: "2001", event: "The Royal Tenenbaums brings wider recognition and an Academy Award screenplay nomination with Owen Wilson." }
    ],
    legacy: [
      "Anderson created one of the most immediately recognizable visual and narrative styles in contemporary filmmaking, combining formal composition, production design, deadpan humor and emotionally complicated ensemble stories.",
      "His early partnership with Owen Wilson demonstrates how creative careers can emerge from university friendships and modest regional projects before entering the national film industry. That origin is an important part of modern Texas film history.",
      "Houston and Austin give the profile unusually strong Texas anchors. The cities connect upbringing, early locations, UT Austin and the Bottle Rocket collaboration, allowing the site to explain a real creative ecosystem rather than relying on birthplace branding alone." 
    ],
    texasPlaces: [
      { name: "Houston", context: "Anderson's birthplace and upbringing city also supplied important locations and cultural texture for early work, including the Houston-made world associated with Rushmore." },
      { name: "Austin", context: "The University of Texas at Austin is where Anderson met Owen Wilson and developed the collaboration that led from student filmmaking into Bottle Rocket and professional directing." }
    ],
    lastReviewedAt: reviewed,
  },
};
