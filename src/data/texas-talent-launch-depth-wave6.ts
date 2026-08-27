import type { TexasTalentProfile } from "@/data/texas-talent";

type TexasTalentDepthOverride = Partial<TexasTalentProfile>;

const reviewed = "2026-08-27";

/** Launch-depth editorial upgrades only; no launch approval is granted here. */
export const TEXAS_TALENT_LAUNCH_DEPTH_WAVE6: Readonly<Record<string, TexasTalentDepthOverride>> = {
  "robert-rodriguez": {
    overview: [
      "Robert Rodriguez was born in San Antonio in 1968 and developed his filmmaking ambitions in Texas before studying at the University of Texas at Austin. His early career is especially useful for Texas Defined because it links South Texas upbringing with a Central Texas film-education and production ecosystem. Rodriguez learned to work with limited resources, treating constraints as a reason to control more of the process rather than wait for a conventional industry invitation. That approach culminated in El Mariachi, the ultra-low-budget feature that became a Sundance success and turned a Texas film student into a widely discussed model of independent production.",
      "Rodriguez expanded that breakthrough into a career that moved between action, horror, family entertainment and stylized comic-book filmmaking. Desperado and From Dusk Till Dawn established his kinetic genre style, while Spy Kids demonstrated that the same production independence could support a major family franchise. Sin City pushed digital compositing and highly controlled visual design to the center of the process. Across those projects, Rodriguez often worked as writer, director, editor, camera operator, composer or producer, reinforcing the do-it-yourself identity that had begun with El Mariachi rather than surrendering control as budgets increased.",
      "The Texas connection became even more substantial when Rodriguez built long-term production infrastructure in Austin through Troublemaker Studios. That decision means his profile is not simply about a filmmaker who happened to be born in San Antonio. It connects Texas education, entrepreneurship and the state's modern film-production economy. San Antonio explains the personal origin; UT Austin explains the transition into serious filmmaking; and Austin explains the studio base from which international productions could be made without relocating the entire creative operation to California. Few Texas Talent film profiles offer such a direct biography-to-industry connection inside the state. That continuity also gives future Texas film coverage a concrete institution, production base and career pathway to connect back to.",
    ],
    timeline: [
      { year: "1968", event: "Born in San Antonio, Texas." },
      { year: "1980s–90s", event: "Studies and develops as a filmmaker in Texas, including work connected to the University of Texas at Austin." },
      { year: "1992", event: "El Mariachi breaks through at Sundance and becomes an international example of resourceful independent filmmaking." },
      { year: "2001", event: "Spy Kids launches a successful family-film franchise created from Rodriguez's Texas production base." },
      { year: "2000s", event: "Expands Austin-based Troublemaker Studios and continues building production infrastructure in Central Texas." },
    ],
    legacy: [
      "Rodriguez became a practical model for independent filmmakers by demonstrating that technical knowledge and control over multiple production roles could substitute for some of the resources traditionally required to enter the film industry.",
      "His career also showed that independence did not require remaining small. Family franchises, studio-scale action films and digital experiments all grew from the same philosophy of keeping production nimble and creative control concentrated.",
      "Austin makes his Texas legacy institutional as well as biographical. By maintaining production infrastructure in Central Texas, Rodriguez helped strengthen the state's capacity to host and generate film work rather than merely serving as an occasional location backdrop.",
    ],
    texasPlaces: [
      { name: "San Antonio", context: "Rodriguez's birthplace and South Texas origin, where his interest in drawing, storytelling and filmmaking began before formal university film work and professional production." },
      { name: "Austin", context: "The city tied to his University of Texas education, long-term studio base and production infrastructure, making Central Texas an operating center rather than a symbolic hometown connection." },
    ],
    lastReviewedAt: reviewed,
  },
  "eva-longoria": {
    overview: [
      "Eva Longoria was born in Corpus Christi in 1975 and grew up in South Texas before attending Texas A&M University-Kingsville, where she earned a degree in kinesiology. Those two geographic anchors give her Texas Talent profile more depth than a simple birthplace line. Corpus Christi represents family and South Texas Mexican American culture, while Kingsville represents an educational chapter completed before entertainment became her profession. Longoria's later work in acting, producing, directing and advocacy often addressed Latino representation, making the regional background relevant to the kinds of stories and industry questions she chose to pursue.",
      "After early television work, Longoria became a major star through Desperate Housewives, which premiered in 2004. Her performance as Gabrielle Solis brought broad recognition, but she increasingly used that visibility to move behind the camera as a producer and director. Work on projects including Devious Maids expanded her producing role, while Flamin' Hot marked her feature directing debut. That progression matters because the career cannot be understood only as the success of a television actor; Longoria deliberately developed the authority to shape projects, hire collaborators and influence which Latino stories reached mainstream audiences.",
      "For Texas Defined, Longoria offers a strong South Texas profile that connects entertainment with education and representation. Corpus Christi and Nueces County explain the upbringing, Kingsville and Kleberg County explain the university connection, and her later producing/directing work shows how a performer can convert visibility into institutional influence. The page should not claim that her professional career remained Texas-based, but it can accurately show that South Texas identity remained relevant to her public advocacy and creative priorities. That makes the profile useful not only for film and television coverage but for the broader story of Mexican American talent moving from Texas communities into national media leadership. It also creates a durable bridge between regional identity, higher education and behind-the-camera authority.",
    ],
    timeline: [
      { year: "1975", event: "Born in Corpus Christi, Texas, and raised in South Texas." },
      { year: "1998", event: "Graduates from Texas A&M University-Kingsville with a degree in kinesiology." },
      { year: "2004", event: "Desperate Housewives premieres, making Longoria an internationally recognized television performer." },
      { year: "2010s", event: "Expands her career through producing and television directing while increasing her work on Latino representation." },
      { year: "2023", event: "Makes her feature directing debut with Flamin' Hot." },
    ],
    legacy: [
      "Longoria used acting success as a platform for a broader creative career, moving into producing and directing rather than allowing one television role to define the limits of her influence within the industry.",
      "Her advocacy and production choices helped keep Latino representation, entrepreneurship and access to decision-making visible as entertainment-industry issues rather than treating diversity as separate from the mechanics of who controls projects.",
      "Corpus Christi and Kingsville give that career a clear South Texas beginning. The two cities allow Texas Defined to connect Mexican American cultural identity, higher education and national entertainment leadership within one profile.",
    ],
    texasPlaces: [
      { name: "Corpus Christi", context: "Longoria's birthplace and childhood home in Nueces County, providing the South Texas family and cultural setting that preceded her acting, producing and advocacy career." },
      { name: "Kingsville", context: "The Kleberg County university city where Longoria completed her Texas A&M University-Kingsville degree before pursuing entertainment professionally." },
    ],
    lastReviewedAt: reviewed,
  },
  "renee-zellweger": {
    overview: [
      "Renée Zellweger was born in Katy in 1969 and attended Katy High School before enrolling at the University of Texas at Austin. Her Texas story is especially coherent because the transition from student to professional actor began inside the state. While studying English at UT, Zellweger took acting work and appeared in commercials and Texas-produced films, turning Austin into more than an educational stop. Katy explains the suburban Houston-area upbringing, while Austin explains the period when performance shifted from an interest into an emerging profession.",
      "Zellweger's national breakthrough came with Jerry Maguire in 1996, followed by a run of roles that demonstrated unusual range across romantic comedy, musical performance and drama. Bridget Jones's Diary created one of her most recognizable characters, Chicago required singing and physical performance, and Cold Mountain brought her first Academy Award. Years later, after a period away from major screen roles, Judy produced a second Academy Award for her portrayal of Judy Garland. The arc is notable for both longevity and reinvention rather than a single uninterrupted period of stardom.",
      "For Texas Defined, Zellweger's profile can connect Katy, the Houston metropolitan region and UT Austin with the state's film-production history. Her early professional credits belong to the same Texas environment in which other filmmakers and actors built networks before moving into national careers. The page should emphasize that the state provided both childhood and the first professional foothold, not claim that her later career remained locally based. That distinction gives the Texas connection real substance: school, university and early set experience form a continuous path rather than disconnected trivia. It also makes her useful for explaining how Houston-area upbringing and Austin's university and production networks could function as consecutive stages in one career. The Texas layer therefore covers education, first paid work and professional development before national recognition arrived.",
    ],
    timeline: [
      { year: "1969", event: "Born in Katy, Texas, and later attends Katy High School." },
      { year: "1991", event: "Graduates from the University of Texas at Austin after beginning to take acting work while in college." },
      { year: "1996", event: "Breaks through nationally in Jerry Maguire." },
      { year: "2004", event: "Wins the Academy Award for Best Supporting Actress for Cold Mountain." },
      { year: "2020", event: "Wins the Academy Award for Best Actress for Judy." },
    ],
    legacy: [
      "Zellweger developed from Texas-based early acting work into one of the most decorated performers of her generation, with major roles spanning comedy, musical performance and dramatic character transformation.",
      "Her return to prominence with Judy demonstrated unusual career durability, showing that a performer identified with an earlier era of popular films could re-enter the center of awards culture through a substantially different kind of role.",
      "Katy and Austin give the profile a strong Texas progression from upbringing through higher education to early professional work. That continuity makes her a natural bridge between place coverage and the state's broader film-training and production history.",
    ],
    texasPlaces: [
      { name: "Katy", context: "Zellweger's birthplace, childhood community and high-school setting on the western edge of the Houston region, providing the personal foundation before her move to Austin." },
      { name: "Austin", context: "The university city where Zellweger studied at UT and began taking professional acting work, connecting her Texas education directly to the start of her screen career." },
    ],
    lastReviewedAt: reviewed,
  },
  "ethan-hawke": {
    overview: [
      "Ethan Hawke was born in Austin in 1970, although he grew up largely outside Texas. That distinction should remain explicit because his Texas Talent connection is a combination of origin and later creative return rather than a Texas upbringing. Hawke began acting young and gained major attention through Dead Poets Society, then built a career that moved among film, theater, novels, directing and screenwriting. Austin became artistically relevant again through his long collaboration with Richard Linklater, making the city part of the mature career as well as the birth certificate.",
      "The Linklater partnership produced some of Hawke's most important work. Before Sunrise introduced the long-running collaboration with Julie Delpy and Linklater, while Waking Life and Tape continued the relationship through very different forms. Boyhood made time itself part of the production method, filming Hawke and the cast over many years and earning him another Academy Award nomination. Hawke's work on the Before films also expanded into credited screenwriting, demonstrating that his role in these projects went beyond performance and helping explain why the collaboration became one of the most durable actor-director relationships in American independent cinema.",
      "For Texas Defined, Hawke's profile is strongest when Austin functions as a recurring creative node rather than when the page tries to invent a deeper childhood claim. Travis County supplies the geographic authority, Austin supplies the birthplace and collaboration setting, and Linklater provides the connection to the state's film ecosystem. This is exactly the kind of nuanced eligibility the pillar should preserve: someone can belong because Texas appears at multiple meaningful points in a career even when most of life unfolds elsewhere. The result is more credible than treating all Texas Talent subjects as equally rooted. It also gives the site a precise way to connect biography with Austin's independent-film culture and recurring creative partnerships without exaggerating residence history.",
    ],
    timeline: [
      { year: "1970", event: "Born in Austin, Texas, before growing up largely outside the state." },
      { year: "1989", event: "Breaks through as a young actor in Dead Poets Society." },
      { year: "1995", event: "Stars in Richard Linklater's Before Sunrise, beginning one of his most important long-term creative collaborations." },
      { year: "2004", event: "Co-writes and stars in Before Sunset, expanding his Linklater collaboration into screenwriting as well as acting." },
      { year: "2014", event: "Boyhood brings major critical recognition and another Academy Award nomination after a production spanning many years." },
    ],
    legacy: [
      "Hawke built a career unusually comfortable moving between acting, writing, directing and theater, using independent projects and long-term collaborations to avoid being defined solely by the early fame of his young-adult roles.",
      "His work with Richard Linklater became a landmark example of artistic continuity. The Before films and Boyhood use elapsed time as part of their meaning, giving the collaboration a formal ambition beyond a recurring actor-director pairing.",
      "Austin is both origin and later creative connection, which gives Texas Defined a precise but nuanced geographic case. The profile can link Texas film history to a major national career without misrepresenting Hawke as someone raised entirely in the state.",
    ],
    texasPlaces: [
      { name: "Austin", context: "Hawke's birthplace and a later recurring creative connection through his collaborations with Richard Linklater, giving the city significance at both the start and mature stages of his career." },
      { name: "Travis County", context: "The county authority anchoring Hawke's Austin connection and a stable route into Texas Defined's broader Central Texas film and cultural coverage." },
    ],
    lastReviewedAt: reviewed,
  },
  "dennis-quaid": {
    overview: [
      "Dennis Quaid was born in Houston in 1954 and studied drama at the University of Houston before leaving college to pursue acting professionally. Houston therefore provides both birthplace and formal training, giving his Texas Talent profile more substance than a simple origin claim. University study connected Quaid to a local theater and performance environment before the national film career began, and the city's institutional record has continued to recognize that relationship. His story adds another route into Texas film history by showing a major screen actor developing through a Texas university rather than through Austin's better-known film network.",
      "Quaid's career expanded through the late 1970s and 1980s with roles that moved between drama, comedy and large-scale studio films. The Right Stuff gave him one of his defining early performances, while The Big Easy, Great Balls of Fire! and later films demonstrated an ability to combine relaxed charm with more volatile or physically demanding characters. His portrayal of Jerry Lee Lewis made musical performance part of the screen persona, while later family and sports films introduced him to new generations of audiences. The durability of the career lies partly in its refusal to settle into a single genre identity.",
      "For Texas Defined, the Houston-to-University-of-Houston pathway is the essential structure. Harris County provides the geographic layer, the university provides the educational connection, and the later career demonstrates how Texas training fed into decades of mainstream film work. The page should avoid overstating a continuing Texas production base, but it can accurately show that both personal origin and professional preparation occurred in Houston. That combination makes Quaid a stronger pillar subject than someone connected to the state only through birth. It also broadens the site's Texas film history beyond Austin by showing Houston as a place where formal dramatic training could feed directly into a durable national screen career. That institutional connection is valuable for future university and performing-arts links.",
    ],
    timeline: [
      { year: "1954", event: "Born in Houston, Texas." },
      { year: "1970s", event: "Studies drama at the University of Houston before leaving to pursue acting professionally." },
      { year: "1983", event: "Appears as astronaut Gordon Cooper in The Right Stuff, one of his defining early film roles." },
      { year: "1989", event: "Stars as Jerry Lee Lewis in Great Balls of Fire!, combining dramatic acting with musical performance." },
      { year: "2000s", event: "Continues a long studio career across drama, sports films, family movies and character roles." },
    ],
    legacy: [
      "Quaid built one of the more durable mainstream acting careers to emerge from Texas university training, moving among drama, comedy, music biography, sports storytelling and family films without becoming permanently fixed in one category.",
      "His screen presence often combines accessibility with unpredictability, allowing him to play charismatic leads while also moving into more troubled or eccentric characters as the career matured.",
      "Houston gives the profile a coherent Texas foundation because it contains both the birthplace and University of Houston drama training. That dual connection links personal biography to a specific Texas institution rather than relying on fame alone.",
    ],
    texasPlaces: [
      { name: "Houston", context: "Quaid's birthplace and the city where his formal acting education began, giving his Texas connection both personal and professional significance before the move into national film." },
      { name: "University of Houston", context: "The institution where Quaid studied drama, providing a concrete Texas education link and a useful connection into Houston's broader performing-arts history." },
    ],
    lastReviewedAt: reviewed,
  },
};