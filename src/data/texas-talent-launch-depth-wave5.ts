import type { TexasTalentProfile } from "@/data/texas-talent";

type TexasTalentDepthOverride = Partial<TexasTalentProfile>;

const reviewed = "2026-08-26";

/**
 * Launch-depth editorial upgrades for a fifth Texas Talent cohort centered on
 * Texas film and television. Narrative depth never substitutes for the
 * independent source, image, link and editorial-launch approval gates.
 */
export const TEXAS_TALENT_LAUNCH_DEPTH_WAVE5: Readonly<Record<string, TexasTalentDepthOverride>> = {
  "robert-rodriguez": {
    overview: [
      "Robert Rodriguez was born in San Antonio in 1968 and developed his filmmaking ambitions in Texas before the national industry knew his name. He attended the University of Texas at Austin, where student work and access to film education helped turn a longstanding interest in drawing, storytelling and movies into practical directing experience. The Texas connection is unusually important because Rodriguez did not simply leave the state after college and build a career elsewhere. San Antonio supplies the family and childhood origin, while Austin became both an educational setting and the production base from which he would later make major films. UT Austin's Radio-Television-Film program recognizes him among its notable alumni, and Austin Film Society records his continuing role in the city's filmmaking community.",
      "Rodriguez's breakthrough came with El Mariachi, the low-budget Spanish-language action film that demonstrated how resourcefulness and visual energy could compensate for a tiny production budget. Its success led to a larger studio career that included Desperado, From Dusk Till Dawn, the Spy Kids series and Sin City. Across those projects, Rodriguez became known for combining directing, editing, cinematography, music and effects work rather than dividing filmmaking into rigid specialties. That do-it-yourself approach was not merely a story about making one inexpensive debut; it became part of the production philosophy behind his later Austin-based operation. Troublemaker Studios helped turn Central Texas into a place where substantial commercial projects could be developed and produced outside the traditional Los Angeles studio geography.",
      "For Texas Defined, Rodriguez's profile is therefore about both a person and an ecosystem. San Antonio explains the origin, UT Austin explains an important training and collaboration chapter, and Austin explains the decision to build production infrastructure in Texas rather than treating the state only as a location backdrop. His career also provides a bridge between Latino Texas culture, independent-film problem solving and large-scale genre entertainment. A strong profile can connect Bexar County, Travis County, UT Austin, Austin Film Society and the broader history of Texas filmmaking while making an important distinction: the significance is not that every Rodriguez film is about Texas, but that a major filmmaker deliberately made Texas part of the machinery through which an international career could operate." 
    ],
    timeline: [
      { year: "1968", event: "Born in San Antonio, Texas." },
      { year: "1990s", event: "Studies at the University of Texas at Austin while developing his early filmmaking practice." },
      { year: "1992", event: "El Mariachi becomes the low-budget breakthrough that brings Rodriguez national attention." },
      { year: "2001", event: "Spy Kids begins a successful family-film series produced within Rodriguez's expanding Texas-based operation." },
      { year: "2005", event: "Sin City demonstrates the digital-production style and multi-role filmmaking approach associated with his mature career." }
    ],
    legacy: [
      "Rodriguez became a durable example of filmmaker self-sufficiency, turning the resourcefulness associated with El Mariachi into a broader method of directing, editing, shooting, scoring and producing across many projects.",
      "His Austin production base matters to Texas film history because it demonstrated that substantial commercial genre work could be organized from Central Texas rather than using the state only for occasional location shooting.",
      "San Antonio and Austin give the profile a strong geographic arc from childhood to university training to professional infrastructure. That continuity makes Rodriguez one of the pillar's clearest examples of a career whose Texas connection continued after national success." 
    ],
    texasPlaces: [
      { name: "San Antonio", context: "Rodriguez's birthplace and childhood city provides the South Texas beginning for a filmmaker whose later professional infrastructure would remain deliberately rooted in the state." },
      { name: "Austin", context: "UT Austin, Austin Film Society connections and the later Troublemaker Studios production base make the city central to both Rodriguez's training and mature filmmaking career." }
    ],
    lastReviewedAt: reviewed,
  },
  "eva-longoria": {
    overview: [
      "Eva Longoria was born in Corpus Christi in 1975 and grew up in South Texas before attending Texas A&M University-Kingsville, where she earned a degree in kinesiology. Those two places give her profile a substantial Texas foundation rather than a simple birthplace label. The Television Academy records Corpus Christi as her birthplace and documents the acting, producing and directing career that followed, while Texas A&M University-Kingsville independently preserves the university connection. Corpus Christi and Kingsville therefore provide the geographic and institutional frame for understanding the years before Longoria entered the national television industry.",
      "Longoria worked in television before becoming a major star through Desperate Housewives, which premiered in 2004 and turned Gabrielle Solis into one of the era's most recognizable television characters. The role brought awards attention and a large international audience, but the later career expanded beyond acting. Longoria moved increasingly into producing and directing, working across television, film and documentary projects and building a public identity that included media entrepreneurship and advocacy. That expansion is important to the Texas Talent profile because it prevents the page from freezing her at the moment of one famous role. The career became a case study in using performance visibility to gain creative authority behind the camera.",
      "For Texas Defined, Longoria also provides an opportunity to explain South Texas talent through institutions and communities that can be overshadowed by Austin, Dallas and Houston in entertainment coverage. Corpus Christi is the birthplace and family setting, while Kingsville represents higher education and the period immediately before the professional career. Nueces County and Kleberg County create safe geographic links into the site's place network. The later entertainment career was national and international, so the profile should not pretend that production stayed in Texas; instead, it can show how a South Texas upbringing and university path preceded an actor-producer-director career with unusually broad reach." 
    ],
    timeline: [
      { year: "1975", event: "Born in Corpus Christi, Texas." },
      { year: "1990s", event: "Studies kinesiology at Texas A&M University-Kingsville and completes her undergraduate degree." },
      { year: "2004", event: "Desperate Housewives premieres and makes Gabrielle Solis Longoria's defining television breakthrough." },
      { year: "2010s", event: "Expands steadily into television producing and directing alongside acting work." },
      { year: "2020s", event: "Continues directing, producing and performing across film, television and documentary projects." }
    ],
    legacy: [
      "Longoria turned a breakthrough acting role into a broader creative career, moving into producing and directing rather than remaining defined only by the character that first made her internationally famous.",
      "Her South Texas background also broadens the geography of the Talent pillar. Corpus Christi and Kingsville connect entertainment history to communities and institutions beyond the state's largest media centers.",
      "The profile demonstrates how Texas Defined can distinguish formative geography from later career geography. Texas explains Longoria's origin and education, while the page remains accurate about a professional life that expanded far beyond the state." 
    ],
    texasPlaces: [
      { name: "Corpus Christi", context: "Longoria's birthplace and South Texas family setting supplies the primary geographic origin for a career that later expanded into national television, film, producing and directing." },
      { name: "Kingsville", context: "Texas A&M University-Kingsville anchors Longoria's college years and gives the profile a second substantive South Texas institution before her professional entertainment career began." }
    ],
    lastReviewedAt: reviewed,
  },
  "renee-zellweger": {
    overview: [
      "Renée Zellweger was born in Katy, Texas, in 1969 and attended Katy High School before enrolling at the University of Texas at Austin. Her early acting experience developed while she was still connected to Texas, including coursework and work in productions before Hollywood stardom. UT Austin's Radio-Television-Film program lists her among its notable alumni, while biographical sources document the Katy upbringing and university years. That makes the Texas story unusually coherent: Katy provides hometown and school identity, and Austin provides the university environment where acting moved from an interest into the beginning of a professional path.",
      "Zellweger's film career accelerated during the 1990s, with Jerry Maguire bringing broad recognition before Bridget Jones's Diary established one of her signature roles. She then moved between comedy, musical performance and drama, winning the Academy Award for Best Supporting Actress for Cold Mountain and later Best Actress for Judy. Those awards illustrate the range of a career that could easily be reduced to romantic comedy if viewed only through popular memory. Her strongest performances depended on different skills—comic timing, musical interpretation, physical characterization and dramatic restraint—making her one of the more versatile Texas-born actors of her generation.",
      "For Texas Defined, the profile should keep the early geography visible without pretending that the mature film career was locally based. Katy is the hometown anchor, while Austin and UT provide the educational and early-career connection. Because Katy crosses the Harris and Fort Bend county area in modern civic geography, the existing readiness record appropriately preserves both county routes while Travis County anchors Austin. The resulting profile can link suburban Houston-area history, UT Austin and Texas film culture to a career whose biggest achievements occurred on national and international stages. That balance makes the page more useful than a generic celebrity biography: it explains exactly where Texas enters the story and where the story moves beyond Texas." 
    ],
    timeline: [
      { year: "1969", event: "Born in Katy, Texas." },
      { year: "1990s", event: "Studies at the University of Texas at Austin and begins accumulating acting experience." },
      { year: "1996", event: "Jerry Maguire brings Zellweger broad international recognition." },
      { year: "2004", event: "Wins the Academy Award for Best Supporting Actress for Cold Mountain." },
      { year: "2020", event: "Wins the Academy Award for Best Actress for Judy." }
    ],
    legacy: [
      "Zellweger built a career across comedy, drama and musical performance, resisting the tendency for a successful romantic-comedy persona to define the limits of later roles.",
      "Two Academy Award wins in different acting categories underscore that range and place her among the most decorated performers in the Texas Talent film cohort.",
      "Katy and UT Austin give the page a specific Texas pathway from hometown schooling to university experience and early acting, while the profile remains honest that the mature professional career became international." 
    ],
    texasPlaces: [
      { name: "Katy", context: "Zellweger's birthplace, hometown and high-school community provides the Houston-area foundation for the biography before university study and professional acting expanded the story beyond Texas." },
      { name: "Austin", context: "The University of Texas at Austin anchors Zellweger's college years and early acting development, connecting her profile to the state's major film-education and creative network." }
    ],
    lastReviewedAt: reviewed,
  },
  "ethan-hawke": {
    overview: [
      "Ethan Hawke was born in Austin in 1970, but his family moved away while he was young, making his Texas connection fundamentally different from that of actors raised in the state. The profile should say that clearly. Austin is the birthplace and later became a meaningful creative connection through Hawke's repeated collaborations with filmmaker Richard Linklater, but it was not the setting for his entire upbringing. A&E's biographical record establishes the Austin birth, and Academy materials document the major acting and screenplay recognition that followed. This combination supports a Texas Talent profile based on verified origin plus a later artistic relationship with one of the state's most important filmmakers.",
      "Hawke became widely known through Dead Poets Society and then built a career that moved between mainstream films, independent projects, theater, writing and directing. His collaboration with Linklater became one of the defining threads: Before Sunrise and its sequels followed the same characters across decades, while Boyhood used a long production period to make the passage of time part of the film itself. Hawke received major Academy recognition both as an actor and as a screenwriter, demonstrating a career organized around authorship and collaboration as much as conventional stardom. That breadth makes him a strong fit for a Talent pillar that includes filmmakers and writers alongside screen performers.",
      "For Texas Defined, Austin works best as a carefully defined two-part anchor. It is Hawke's birthplace, and it is also part of the creative geography of the Linklater collaboration even though Hawke's childhood and much of his career unfolded elsewhere. Travis County provides the stable place link, while future Texas film coverage can connect Hawke with Linklater and the Austin filmmaking ecosystem without inventing residence claims. The page therefore becomes another example of the pillar's editorial discipline: Texas matters meaningfully to the biography, but the site explains the limits of that connection instead of expanding a birthplace fact into an unsupported Texas upbringing." 
    ],
    timeline: [
      { year: "1970", event: "Born in Austin, Texas." },
      { year: "1989", event: "Dead Poets Society gives Hawke an early major film breakthrough." },
      { year: "1995", event: "Before Sunrise begins his long-running creative collaboration with Richard Linklater." },
      { year: "2004", event: "Before Sunset extends the Linklater collaboration and earns major screenplay recognition for the writing team." },
      { year: "2014", event: "Boyhood becomes another landmark Linklater collaboration and brings Hawke major supporting-actor recognition." }
    ],
    legacy: [
      "Hawke built a career around sustained creative curiosity, moving among acting, writing, directing and theater rather than treating film stardom as the only measure of success.",
      "His long collaboration with Richard Linklater is especially important to modern independent film because it used time, repeated characters and unusually long production horizons as part of the storytelling method.",
      "Austin is a limited but meaningful Texas anchor: birthplace and later creative connection, not childhood mythology. Preserving that distinction strengthens the credibility of the entire Texas Talent eligibility system." 
    ],
    texasPlaces: [
      { name: "Austin", context: "Hawke's verified birthplace later regained creative significance through repeated collaborations with Austin filmmaker Richard Linklater, even though Hawke was not raised entirely in Texas." },
      { name: "Travis County", context: "The county-level anchor keeps Hawke connected to Texas Defined's place network while the profile explicitly distinguishes Austin birth and creative collaboration from a broader Texas upbringing claim." }
    ],
    lastReviewedAt: reviewed,
  },
  "dennis-quaid": {
    overview: [
      "Dennis Quaid was born in Houston in 1954 and grew up in the Houston area before studying drama at the University of Houston. That combination gives his Texas Talent profile both a hometown and an institutional connection. A&E Biography documents the Houston birth and university attendance, while the University of Houston's own records preserve his drama study and later alumni recognition. Houston therefore represents more than origin: it is also where acting became a serious educational pursuit before Quaid left for Los Angeles and professional film work.",
      "Quaid emerged as a major film actor during the late 1970s and 1980s, with roles in Breaking Away, The Right Stuff and The Big Easy demonstrating an ability to move between ensemble drama, historical material and charismatic leading-man work. Great Balls of Fire! added musical-biographical performance, while later films extended the career through family movies, thrillers, dramas and character roles. Like several other members of the Texas Talent film cohort, Quaid's importance lies partly in durability: the public image changed from young leading man to veteran character actor without a single franchise or genre defining the whole career.",
      "For Texas Defined, the strongest version of the page keeps Houston at the center of the early biography. Harris County provides the geographic authority link, while University of Houston coverage can eventually deepen the education connection. The later career is not a Texas production story in the way Robert Rodriguez's is, and the profile should not imply otherwise. Instead, it can show how Houston schooling and drama education preceded a long national screen career. That distinction—formation in Texas, career largely elsewhere—gives readers a more accurate understanding of what the Talent pillar means when it calls a performer Texas-connected." 
    ],
    timeline: [
      { year: "1954", event: "Born in Houston, Texas." },
      { year: "1970s", event: "Studies drama at the University of Houston before leaving for professional acting work." },
      { year: "1979", event: "Breaking Away becomes one of Quaid's important early film roles." },
      { year: "1983", event: "Appears in The Right Stuff as his film career expands into major studio productions." },
      { year: "1989", event: "Stars as Jerry Lee Lewis in Great Balls of Fire!, combining dramatic and musical performance." }
    ],
    legacy: [
      "Quaid sustained a screen career across several decades and genres, moving from youthful leading roles into veteran character work without becoming dependent on a single franchise or character type.",
      "His University of Houston drama training gives the profile an institutional Texas connection in addition to birthplace, showing how local education can be part of the pathway into a national acting career.",
      "Houston and Harris County provide the appropriate geographic center. The profile can celebrate a Texas formation while remaining accurate that Quaid's mature film career operated primarily in the wider American entertainment industry." 
    ],
    texasPlaces: [
      { name: "Houston", context: "Quaid's birthplace, upbringing area and university city gives the profile a concentrated Texas foundation before he left the state to pursue professional screen acting." },
      { name: "University of Houston", context: "Quaid's drama study at the university provides a documented institutional link between his Houston upbringing and the professional acting career that followed." }
    ],
    lastReviewedAt: reviewed,
  },
};
