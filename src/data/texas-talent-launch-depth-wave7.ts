import type { TexasTalentProfile } from "@/data/texas-talent";

type TexasTalentDepthOverride = Partial<TexasTalentProfile>;

const reviewed = "2026-08-29";

/**
 * Launch-depth upgrades for the seventh Texas Talent cohort. These edits
 * strengthen editorial depth only. They do not grant launch-ready status,
 * change image-rights review, or expose any public Texas Talent route.
 */
export const TEXAS_TALENT_LAUNCH_DEPTH_WAVE7: Readonly<Record<string, TexasTalentDepthOverride>> = {
  "miranda-lambert": {
    overview: [
      "Miranda Lambert was born in Longview in 1983 and raised in nearby Lindale, giving her career an unusually clear East Texas beginning. Music was part of family life early, and by her teenage years she was performing publicly and learning how songs worked in front of Texas audiences rather than only in rehearsal rooms. Lindale matters because it places the future country star inside a small-city East Texas setting where family, local stages and regional country traditions were part of everyday life. When Lambert later reached a national audience, the contrast between that local apprenticeship and the scale of her career remained one of the most durable parts of her public story.",
      "Her 2003 appearance on Nashville Star introduced Lambert to a national television audience, but the major-label breakthrough that followed was built around songwriting rather than television celebrity. Kerosene arrived in 2005 with a sharp mix of country structure, rock energy and narrators who often sounded stubborn, funny or wounded without becoming passive. Crazy Ex-Girlfriend, Revolution, Four the Record, Platinum and The Weight of These Wings expanded that voice while songs such as Gunpowder & Lead, The House That Built Me, Automatic and Bluebird demonstrated how effectively Lambert could move between confrontation and reflection. The Pistol Annies, formed with Ashley Monroe and Angaleena Presley, created another outlet for character-driven writing and ensemble country music.",
      "For Texas Defined, Lambert is most useful as an East Texas profile rather than as a generic modern-country biography. Longview supplies the birthplace, Lindale supplies the childhood and early-performance base, and the broader Texas country network explains why her regional identity remained legible even after Nashville became the center of the recording business. Her career also gives the Talent pillar a bridge between small-city East Texas and contemporary country at arena scale. That bridge can support future stories about Texas songwriting, women in country music and the way regional performance circuits feed national careers without pretending that every professional chapter happened inside the state.",
    ],
    timeline: [
      { year: "1983", event: "Born in Longview, Texas, and raised in nearby Lindale." },
      { year: "2003", event: "Finishes third on Nashville Star, bringing her songwriting and performance to a national television audience." },
      { year: "2005", event: "Releases major-label debut Kerosene, establishing the sound and point of view that drive her early career." },
      { year: "2011", event: "Forms the Pistol Annies with Ashley Monroe and Angaleena Presley and releases Hell on Heels." },
      { year: "2014", event: "Releases Platinum, a major commercial and critical milestone in her solo catalog." },
      { year: "2020s", event: "Continues recording and touring while remaining publicly identified with her East Texas roots." },
    ],
    legacy: [
      "Lambert helped keep songwriter-centered country commercially visible in the twenty-first century by pairing traditional narrative craft with rock dynamics, humor and narrators who are allowed to be difficult, contradictory and self-aware.",
      "Her work with the Pistol Annies broadened that influence by creating a durable female ensemble whose songs treat domestic life, money, relationships and small-town expectations as subjects for sharp country writing rather than background detail.",
      "Longview and Lindale give the career a specific East Texas geography. That place-based beginning lets Texas Defined connect a contemporary star to regional performance culture, county authority pages and the longer Texas-country story without reducing the profile to celebrity coverage.",
    ],
    texasPlaces: [
      { name: "Longview", context: "Lambert's Gregg County birthplace and the first geographic anchor in an East Texas biography that later reached the center of mainstream country music." },
      { name: "Lindale", context: "Her Smith County childhood home and early performance base, where family life and local stages helped turn songwriting from an interest into a working craft." },
    ],
    lastReviewedAt: reviewed,
  },
  "sissy-spacek": {
    overview: [
      "Sissy Spacek was born in Quitman in 1949 and grew up in the small Wood County seat before leaving Texas to pursue a creative career. That East Texas upbringing is more than a birthplace fact because the scale of Quitman provides a useful contrast with the intensity and visibility of the roles that later made her famous. Spacek first pursued music after moving to New York, then shifted toward acting and screen work. Her early career therefore followed a route familiar to many Texas Talent stories: a small-community beginning, a period of experimentation elsewhere, and a professional identity that ultimately became far larger than the place from which it started.",
      "Her breakthrough in Terrence Malick's Badlands established Spacek as an actor capable of making quiet behavior as important as dialogue. Carrie then turned a shy, isolated teenager into one of American horror's defining performances and brought her first Academy Award nomination. Coal Miner's Daughter required a different kind of transformation: Spacek portrayed Loretta Lynn across years of the singer's life and performed the songs herself, winning the Academy Award for Best Actress. Later work in Missing, Crimes of the Heart, In the Bedroom and television reinforced a career built less on a fixed star persona than on close observation and emotional precision.",
      "For Texas Defined, Spacek helps keep the Talent pillar geographically broad. Quitman and Wood County represent East Texas communities that are easy to overlook when cultural history is organized only around Houston, Dallas and Austin. Her profile can connect a nationally significant acting career back to a smaller Texas place without exaggerating how much of the professional work occurred there. That distinction is important to the editorial model: Texas shaped the beginning, while the later career became national and international. The resulting page can support East Texas place coverage, film history and the recurring Texas Defined theme that important creative careers often begin far from the state's largest cultural centers.",
    ],
    timeline: [
      { year: "1949", event: "Born in Quitman, Texas, and grows up in Wood County." },
      { year: "1973", event: "Stars in Badlands, an early role that establishes her as a distinctive film performer." },
      { year: "1976", event: "Receives her first Academy Award nomination for the title role in Carrie." },
      { year: "1980", event: "Portrays Loretta Lynn in Coal Miner's Daughter and performs the songs used in the film." },
      { year: "1981", event: "Wins the Academy Award for Best Actress for Coal Miner's Daughter." },
      { year: "2001", event: "Earns another Academy Award nomination for In the Bedroom, extending a multi-decade run of acclaimed character work." },
    ],
    legacy: [
      "Spacek built one of the most durable acting careers of her generation by moving between independent film, studio drama, horror and television without allowing a single genre or star image to define her range.",
      "Her performances repeatedly demonstrate how restraint can carry as much force as spectacle. Badlands, Carrie, Coal Miner's Daughter and In the Bedroom depend on different versions of close, interior character work rather than a repeated screen persona.",
      "Quitman and Wood County give that career a meaningful East Texas beginning. The profile expands Texas Talent beyond metropolitan origin stories and creates a natural cultural bridge into smaller-community and county coverage.",
    ],
    texasPlaces: [
      { name: "Quitman", context: "Spacek's birthplace and childhood home, a small East Texas community that provides the formative geographic setting before her move into music and acting." },
      { name: "Wood County", context: "The East Texas county surrounding Quitman and the broader place anchor that connects Spacek's early life to Texas Defined's county and regional coverage." },
    ],
    lastReviewedAt: reviewed,
  },
  "forest-whitaker": {
    overview: [
      "Forest Whitaker was born in Longview in 1961, giving his biography a clear East Texas origin even though his family moved to California while he was still young. The profile should preserve that distinction rather than invent a Texas upbringing he did not have. Longview matters as the beginning of the story; the training and professional development that followed happened largely elsewhere. Whitaker studied music before shifting more fully toward acting, and that combination of vocal, physical and dramatic training helped produce a screen style known for unusually close attention to gesture, rhythm and interior behavior.",
      "Early film appearances led to increasingly demanding work in Platoon, Good Morning, Vietnam and especially Bird, in which Whitaker portrayed jazz saxophonist Charlie Parker. The Crying Game and Ghost Dog: The Way of the Samurai reinforced his ability to make reserved characters feel psychologically dense, while The Last King of Scotland placed him at the center of a historical drama as Ugandan ruler Idi Amin. That performance won the Academy Award for Best Actor. Whitaker later continued acting while producing, directing and building humanitarian work through initiatives focused on conflict resolution, youth and community development.",
      "For Texas Defined, Whitaker is an example of a legitimate origin-based profile whose Texas claim should remain precise. Longview and Gregg County are not presented as the setting for his entire artistic formation; they are the documented starting point of a career that became global. That makes the page editorially useful because it demonstrates that the Talent pillar can accommodate different strengths of Texas connection without flattening them into one formula. It also gives East Texas another nationally significant creative figure and creates future pathways into Longview, Gregg County and broader stories about performers born in Texas whose professional identities developed far beyond the state.",
    ],
    timeline: [
      { year: "1961", event: "Born in Longview, Texas, before his family later relocates to California." },
      { year: "1982", event: "Appears in Fast Times at Ridgemont High during the early stage of his screen career." },
      { year: "1988", event: "Stars as Charlie Parker in Bird, a major early dramatic showcase." },
      { year: "1990s", event: "Expands his range through films including The Crying Game and Ghost Dog while also directing and producing." },
      { year: "2007", event: "Wins the Academy Award for Best Actor for The Last King of Scotland." },
      { year: "2010s", event: "Combines continuing film work with expanded peace and community-development initiatives." },
    ],
    legacy: [
      "Whitaker became known for performances that emphasize physical detail, vocal rhythm and psychological concentration, allowing him to move convincingly between historical figures, genre characters and intimate contemporary roles.",
      "His career also widened beyond acting through directing, producing and humanitarian work, showing how screen visibility can be converted into institutional and community-focused projects rather than remaining only a measure of celebrity.",
      "Longview and Gregg County provide a carefully bounded East Texas origin. Keeping that claim precise strengthens the pillar's credibility while giving Texas Defined another route from county-level place coverage into nationally important film history.",
    ],
    texasPlaces: [
      { name: "Longview", context: "Whitaker's birthplace and earliest Texas connection, anchoring the profile in East Texas while the page clearly states that his upbringing continued outside the state." },
      { name: "Gregg County", context: "The county containing Longview and the durable geographic link that lets Texas Defined connect Whitaker's origin story to East Texas place authority without overstating it." },
    ],
    lastReviewedAt: reviewed,
  },
  "richard-linklater": {
    overview: [
      "Richard Linklater was born in Houston in 1960 and spent formative years in Texas before settling in Austin, where his career became inseparable from the city's independent-film culture. Austin matters not only because Linklater made films there but because he helped build the infrastructure that allowed other filmmakers and audiences to gather around cinema. In 1985 he helped establish the Austin Film Society, creating a durable institution for screenings, education and production support. That institutional role gives his Texas Talent profile unusual depth: the subject is both an artist and one of the people who helped shape the environment around the art.",
      "Slacker turned Austin's streets, conversations and drifting characters into the organizing principle of a feature film and became a landmark of American independent cinema. Dazed and Confused revisited Texas adolescence through an ensemble structure, while the Before films pursued conversation and time across a much wider geography. School of Rock demonstrated that Linklater's sensibility could survive inside mainstream studio comedy. Boyhood then pushed duration into the production method itself, filming the same central cast across twelve years and making the passage of ordinary time a visible part of the film. The range of those projects helps explain why Linklater cannot be reduced to a single Austin-era style.",
      "For Texas Defined, Linklater is one of the strongest examples of the profile-to-place-to-story model. Houston supplies the birthplace, Huntsville belongs to the wider Texas upbringing, and Austin supplies the creative base, institutional legacy and locations associated with multiple films. The Austin Film Society, Texas Film Commission location trails and the city's broader production history can all connect back to his biography. Unlike a profile whose Texas relationship ends in childhood, Linklater repeatedly invested professional energy in the state's film ecosystem. That makes his page useful not only as biography but as a gateway into how a Texas city developed a sustainable independent-film identity.",
    ],
    timeline: [
      { year: "1960", event: "Born in Houston, Texas, and later spends formative years in Huntsville." },
      { year: "1985", event: "Helps establish the Austin Film Society, creating a lasting institution within the city's film culture." },
      { year: "1991", event: "Slacker receives national release and makes Austin itself central to a landmark independent film." },
      { year: "1993", event: "Releases Dazed and Confused, an ensemble portrait of Texas adolescence that later becomes a cult classic." },
      { year: "1995", event: "Begins the Before trilogy with Before Sunrise, launching a long-running collaboration with Ethan Hawke and Julie Delpy." },
      { year: "2014", event: "Boyhood is released after a twelve-year production and becomes one of the most acclaimed films of his career." },
    ],
    legacy: [
      "Linklater helped prove that a filmmaker could build an internationally important career while maintaining a durable creative base in Austin, strengthening the city's identity as a serious center for independent production.",
      "His formal experiments with conversation, duration and ensemble storytelling influenced filmmakers well beyond Texas, while projects from Slacker to Boyhood demonstrated that ordinary lives and elapsed time could carry ambitious cinematic structure.",
      "The Austin Film Society makes his legacy institutional as well as artistic. Houston, Huntsville and Austin create a multi-city Texas route that connects biography, film locations, education, production infrastructure and cultural history.",
    ],
    texasPlaces: [
      { name: "Houston", context: "Linklater's birthplace and the first Texas anchor in a biography that later becomes much more deeply associated with Central Texas filmmaking." },
      { name: "Huntsville", context: "A formative Texas community in Linklater's early life, adding an East-Central Texas chapter between his Houston origin and later Austin career." },
      { name: "Austin", context: "His principal creative and institutional base, home to the Austin Film Society and the city most closely associated with his role in modern Texas independent cinema." },
    ],
    lastReviewedAt: reviewed,
  },
  "megan-thee-stallion": {
    overview: [
      "Megan Jovon Ruth Pete was born in San Antonio in 1995 and raised in Houston, where the city's rap traditions and her mother's recording work placed music close to everyday life. Her mother, Holly Thomas, performed under the name Holly-Wood, and Megan spent time around recording sessions before she began releasing music professionally. Houston therefore belongs at the center of the profile rather than as a branding detail added after success. The city's long history of independent rap, regional slang, freestyle culture and strong local identity gave Megan a musical environment in which a specifically Houston voice could be an advantage rather than something to smooth away.",
      "While attending Prairie View A&M University, Megan drew wider attention through freestyle and cypher videos, then built momentum with releases that led into Tina Snow, Fever and the 2019 single Hot Girl Summer. Savage became a major crossover record, and its remix with Beyoncé created a high-profile collaboration between two Houston-connected artists. At the 2021 Grammy Awards Megan won Best New Artist as well as Best Rap Performance and Best Rap Song for Savage. Albums including Good News, Traumazine and Megan expanded the catalog while keeping Houston references, confident character writing and a strong sense of self-authorship visible in the public identity.",
      "Education adds another Texas layer to the story. Megan attended Prairie View A&M and later continued her studies at Texas Southern University while her career accelerated, connecting two historically Black Texas universities to a contemporary music biography. For Texas Defined, the strongest page therefore links San Antonio birthplace, Houston upbringing and creative identity, Prairie View college experience and Texas Southern University into one connected route. The profile can strengthen Texas hip-hop coverage while also showing how family influence, HBCU campuses and Houston's independent music tradition intersected before and during national success. That combination makes her more useful to the site's knowledge graph than a conventional chart-history biography would be.",
    ],
    timeline: [
      { year: "1995", event: "Born in San Antonio, Texas, and grows up in Houston." },
      { year: "2010s", event: "Begins attracting attention through freestyles and cyphers while attending Prairie View A&M University." },
      { year: "2018", event: "Releases Tina Snow, helping establish the confident persona and Houston-rooted style that drive her early rise." },
      { year: "2019", event: "Fever and Hot Girl Summer move her from a fast-rising regional artist into the national mainstream." },
      { year: "2020", event: "Savage becomes a major hit and the remix with Beyoncé links two generations of Houston-connected artists." },
      { year: "2021", event: "Wins Best New Artist plus Best Rap Performance and Best Rap Song at the Grammy Awards." },
    ],
    legacy: [
      "Megan Thee Stallion extended Houston rap's national visibility while keeping local language, confidence and regional identity prominent in a period when mainstream hip-hop careers often become geographically less specific as they grow.",
      "Her career also connects contemporary music with Texas HBCU life. Prairie View A&M and Texas Southern University make education part of the Texas story rather than a separate biographical footnote.",
      "San Antonio, Houston and Prairie View create a multi-city route for the Talent pillar, while her collaboration with Beyoncé and place within Houston hip-hop provide strong future links to Texas music authority pages and related profiles.",
    ],
    texasPlaces: [
      { name: "San Antonio", context: "Megan Thee Stallion's Bexar County birthplace and the first Texas point in a biography that becomes much more strongly identified with Houston." },
      { name: "Houston", context: "Her childhood home, principal cultural reference point and the rap ecosystem in which family influence, local style and early professional identity developed." },
      { name: "Prairie View", context: "The Waller County college setting where freestyle and cypher videos helped widen her early audience while she attended Prairie View A&M University." },
      { name: "Texas Southern University", context: "The Houston HBCU where Megan continued her studies during her rise, adding an education and community anchor to the city's music connection." },
    ],
    lastReviewedAt: reviewed,
  },
};
