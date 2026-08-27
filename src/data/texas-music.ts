export type TexasMusicTradition = {
  id: string;
  label: string;
  era: string;
  summary: string;
  places: readonly string[];
  representativeArtists: readonly string[];
  sourceUrl: string;
  guideHref?: string;
};

export type TexasMusicTimelineEra = {
  id: string;
  period: string;
  title: string;
  summary: string;
  milestones: readonly string[];
  links: readonly { href: string; label: string }[];
};

export type TexasMusicRelatedGuide = {
  title: string;
  href: string;
  description: string;
};

export const TEXAS_MUSIC_DESCRIPTION =
  "A guide to the roots, sounds, people and places of Texas music — from conjunto, blues and western swing to country, rock, jazz, R&B, pop and hip-hop.";

export const TEXAS_MUSIC_TRADITIONS: readonly TexasMusicTradition[] = [
  {
    id: "western-swing",
    label: "Western swing",
    era: "1930s onward",
    summary:
      "Texas musicians blended country string-band traditions with blues, jazz, ragtime, polkas and dance-band arrangements to create one of the state's most distinctive musical forms.",
    places: ["Fort Worth", "Waco", "Central Texas"],
    representativeArtists: ["Milton Brown", "Bob Wills", "Cindy Walker"],
    sourceUrl: "https://www.tshaonline.org/handbook/entries/country-music",
    guideHref: "/texas-western-swing",
  },
  {
    id: "country-outlaw",
    label: "Country & outlaw country",
    era: "1920s onward",
    summary:
      "Texas country grew through radio, dance halls, honky-tonks and touring circuits, then Austin became central to the 1970s outlaw-country movement and its looser relationship with Nashville convention.",
    places: ["Austin", "San Antonio", "West Texas", "Hill Country"],
    representativeArtists: ["Willie Nelson", "Waylon Jennings", "George Strait"],
    sourceUrl: "https://www.tshaonline.org/handbook/projects/texas-music",
    guideHref: "/texas-country-outlaw",
  },
  {
    id: "blues",
    label: "Texas blues",
    era: "Early 1900s onward",
    summary:
      "Texas blues developed through rural traditions and urban scenes in Dallas, Houston and other cities, producing guitarists and singers whose approaches helped shape electric blues and later rock music.",
    places: ["Dallas", "Houston", "Austin", "East Texas"],
    representativeArtists: ["Blind Lemon Jefferson", "T-Bone Walker", "Lightnin' Hopkins", "Stevie Ray Vaughan"],
    sourceUrl: "https://www.tshaonline.org/handbook/projects/texas-music/category/music/category/genres-blues",
    guideHref: "/texas-blues",
  },
  {
    id: "conjunto-tejano",
    label: "Conjunto, Tejano & border music",
    era: "Late 1800s onward",
    summary:
      "Along the Texas-Mexico border, musicians combined Mexican traditions with instruments and dance forms circulating through the region. Conjunto's accordion-and-bajo-sexto sound became a foundation for later Tejano music.",
    places: ["San Antonio", "Corpus Christi", "Rio Grande Valley", "South Texas"],
    representativeArtists: ["Narciso Martínez", "Lydia Mendoza", "Freddy Fender", "Selena"],
    sourceUrl: "https://www.tshaonline.org/handbook/entries/texas-mexican-conjunto",
    guideHref: "/texas-conjunto-tejano",
  },
  {
    id: "rock-rockabilly",
    label: "Rock, rockabilly & roots rock",
    era: "1950s onward",
    summary:
      "West Texas, the Gulf Coast and Austin all fed important rock traditions, from Buddy Holly's Lubbock beginnings to Janis Joplin's Port Arthur roots and later Texas guitar-driven scenes.",
    places: ["Lubbock", "Port Arthur", "Austin", "Dallas"],
    representativeArtists: ["Buddy Holly", "Janis Joplin", "Roy Orbison", "Stevie Ray Vaughan"],
    sourceUrl: "https://www.tshaonline.org/handbook/projects/texas-music",
    guideHref: "/texas-rock-rockabilly",
  },
  {
    id: "jazz",
    label: "Jazz",
    era: "Early 1900s onward",
    summary:
      "Texas cities nurtured jazz musicians who moved between blues, swing, territory bands and modern experimentation, with Fort Worth producing several figures of national importance.",
    places: ["Fort Worth", "Dallas", "Houston", "San Antonio"],
    representativeArtists: ["Ornette Coleman", "Teddy Wilson", "Arnett Cobb"],
    sourceUrl: "https://www.tshaonline.org/handbook/projects/texas-music/category/music/category/genres-jazz",
    guideHref: "/texas-jazz",
  },
  {
    id: "gospel-rnb-pop",
    label: "Gospel, R&B & pop",
    era: "1900s onward",
    summary:
      "Church music, blues, rhythm and blues and later pop scenes overlap throughout Texas, especially in Houston, Dallas and other large cities where local institutions helped launch nationally influential performers.",
    places: ["Houston", "Dallas", "Fort Worth"],
    representativeArtists: ["Beyoncé", "Kelly Rowland", "Kirk Franklin"],
    sourceUrl: "https://www.tshaonline.org/handbook/projects/texas-music",
    guideHref: "/texas-gospel-rnb-pop",
  },
  {
    id: "hip-hop",
    label: "Texas hip-hop",
    era: "1980s onward",
    summary:
      "Houston and Dallas-Fort Worth developed durable rap scenes with regional production styles, independent-label networks and local traditions that carried Texas voices into national hip-hop.",
    places: ["Houston", "Dallas", "Fort Worth", "Port Arthur"],
    representativeArtists: ["Geto Boys", "DJ Screw", "UGK"],
    sourceUrl: "https://www.tshaonline.org/handbook/projects/texas-music/category/music/category/genres-rap-and-hip-hop",
    guideHref: "/texas-hip-hop",
  },
] as const;

export const TEXAS_MUSIC_TIMELINE: readonly TexasMusicTimelineEra[] = [
  {
    id: "roots-before-recording",
    period: "Before 1900",
    title: "The roots arrive before the record industry",
    summary:
      "Texas music began as overlapping community traditions rather than commercial genres. Mexican and borderland music, African American sacred and secular traditions, Anglo fiddle music, German and Czech dance culture, cowboy songs and other local practices met across a rapidly changing state.",
    milestones: [
      "Accordion traditions entered South Texas and the borderlands through nineteenth-century cultural exchange and later became central to conjunto.",
      "German and Czech communities built dance halls and social institutions that made communal music and dancing part of Central Texas life.",
      "African American work songs, spirituals, blues precursors and church music created foundations later heard in Texas blues, gospel, R&B, jazz and rock.",
    ],
    links: [
      { href: "/texas-conjunto-tejano", label: "Conjunto & Tejano roots" },
      { href: "/texas-dance-halls-honky-tonks", label: "Dance halls & honky-tonks" },
    ],
  },
  {
    id: "recording-radio",
    period: "1900s–1920s",
    title: "Cities, records and radio make local sounds portable",
    summary:
      "Urban districts, touring circuits and new recording technology began turning regional performance traditions into music that could travel. Dallas and Houston became especially important to Black music networks, while radio and record companies changed how country and border musicians reached audiences.",
    milestones: [
      "Dallas's Deep Ellum developed into a major Black entertainment district where blues and jazz circulated through clubs, streets and businesses.",
      "Blind Lemon Jefferson's recordings in the 1920s helped carry a distinctive Texas guitar-and-vocal blues style into the national record market.",
      "Commercial recording and radio increasingly connected rural performers with city audiences and interstate touring networks.",
    ],
    links: [
      { href: "/texas-blues", label: "Texas blues" },
      { href: "/dallas-fort-worth-music-history", label: "Dallas–Fort Worth music history" },
    ],
  },
  {
    id: "swing-conjunto",
    period: "1930s–1940s",
    title: "Western swing, conjunto and big-city music systems take shape",
    summary:
      "The Depression and wartime decades did not produce one Texas sound. They produced several: western swing grew from dance-band experimentation, conjunto found a defining accordion-and-bajo-sexto format, and jazz, gospel, country and blues moved through increasingly connected radio, ballroom and touring systems.",
    milestones: [
      "Milton Brown, Bob Wills and other Texas musicians blended fiddle music, blues, jazz, polkas and dance-band arrangements into western swing.",
      "Narciso Martínez helped establish the two-row accordion as a lead voice in Texas-Mexican conjunto while the bajo sexto carried rhythm and bass movement.",
      "Church quartets, territory bands and urban blues scenes expanded the musical infrastructure of Houston, Dallas, Fort Worth and San Antonio.",
    ],
    links: [
      { href: "/texas-western-swing", label: "Western swing" },
      { href: "/texas-conjunto-tejano", label: "Conjunto & Tejano" },
      { href: "/texas-jazz", label: "Texas jazz" },
    ],
  },
  {
    id: "electric-postwar",
    period: "1940s–1950s",
    title: "Electric instruments and independent institutions reshape the sound",
    summary:
      "Postwar Texas music became louder, more urban and more connected to independent labels, clubs and studios. Electric blues, rhythm and blues, honky-tonk country, gospel and jazz overlapped with the emerging language of rock and roll.",
    milestones: [
      "T-Bone Walker's electric-guitar approach became one of the most important bridges from Texas blues into later electric blues and rock guitar.",
      "Houston's Duke-Peacock network became a major independent force in blues, gospel and rhythm and blues.",
      "Fort Worth, Houston and other cities produced jazz musicians who moved from swing and territory-band traditions toward bebop and modern experimentation.",
    ],
    links: [
      { href: "/texas-blues", label: "Texas blues" },
      { href: "/texas-gospel-rnb-pop", label: "Gospel, R&B & pop" },
      { href: "/houston-music-history", label: "Houston music history" },
    ],
  },
  {
    id: "rock-modern-jazz",
    period: "1950s–1960s",
    title: "Texas enters the rock-and-roll era without leaving its older traditions behind",
    summary:
      "Rock and roll made Texas musicians newly visible to international audiences, but the state's older systems kept evolving at the same time. West Texas rock, Gulf Coast R&B, modern jazz, country and border music all continued to borrow from one another.",
    milestones: [
      "Buddy Holly and the Crickets turned Lubbock influences into a compact band sound that became foundational to later rock groups.",
      "Roy Orbison and other Texas performers moved between country, rockabilly and pop as record-industry categories remained fluid.",
      "Fort Worth-born Ornette Coleman became a central figure in modern jazz experimentation, showing how far Texas-trained musicians could push beyond regional labels.",
    ],
    links: [
      { href: "/texas-rock-rockabilly", label: "Texas rock & rockabilly" },
      { href: "/lubbock-music-history", label: "Lubbock music history" },
      { href: "/texas-jazz", label: "Texas jazz" },
    ],
  },
  {
    id: "austin-progressive-country",
    period: "1970s",
    title: "Austin becomes a national crossroads while regional scenes keep their identities",
    summary:
      "Austin's progressive-country scene became the decade's most visible Texas music story by putting traditional country, folk, rock and counterculture audiences into the same rooms. At the same time, blues clubs, Tejano networks, soul, jazz and regional country scenes remained essential elsewhere in the state.",
    milestones: [
      "Willie Nelson, Waylon Jennings and a larger songwriter community helped make Austin an alternative center for country music outside Nashville convention.",
      "The Armadillo World Headquarters became a symbol of mixed audiences and cross-genre booking.",
      "Antone's opened in 1975 and connected veteran blues artists with a younger generation of Austin players.",
    ],
    links: [
      { href: "/texas-country-outlaw", label: "Country & outlaw country" },
      { href: "/austin-music-history", label: "Austin music history" },
      { href: "/antones-austin-history", label: "Antone's history" },
    ],
  },
  {
    id: "regional-stars",
    period: "1980s–1990s",
    title: "Regional systems create stars without erasing local identity",
    summary:
      "Texas scenes became nationally visible through very different channels: country radio, Tejano, blues-rock, gospel, independent rap and pop. The common pattern was strong local infrastructure—clubs, labels, radio, churches, studios and touring networks—before national attention arrived.",
    milestones: [
      "George Strait carried South Texas country and dance-hall traditions into a long national career while remaining closely associated with the state's country identity.",
      "Selena became the defining public figure of Tejano's 1990s boom and helped bring South Texas bilingual culture to a much wider audience.",
      "Houston rap grew through Rap-A-Lot, the Geto Boys, DJ Screw's tape culture and other independent networks rather than waiting for coastal industry approval.",
      "Fort Worth's Kirk Franklin helped transform contemporary gospel's national profile, while Houston's Destiny's Child emerged at the end of the decade.",
    ],
    links: [
      { href: "/texas-conjunto-tejano", label: "Conjunto & Tejano" },
      { href: "/texas-hip-hop", label: "Texas hip-hop" },
      { href: "/texas-gospel-rnb-pop", label: "Gospel, R&B & pop" },
    ],
  },
  {
    id: "national-global",
    period: "2000s–2010s",
    title: "Texas scenes move from national influence to global scale",
    summary:
      "By the twenty-first century, Texas musicians could carry unmistakably local histories into global pop, hip-hop, country, gospel and roots music. Houston rap entered the national mainstream, Beyoncé built a global career from Houston roots, and new artists repeatedly drew on older Texas forms without treating them as museum pieces.",
    milestones: [
      "Houston and Port Arthur hip-hop became central to the national Southern-rap story, with chopped-and-screwed aesthetics and Gulf Coast voices influencing artists far beyond Texas.",
      "Beyoncé's solo career expanded Houston's place in global R&B and pop while continuing to reference Southern and Texas identity.",
      "Fort Worth artists such as Leon Bridges demonstrated that older soul, gospel and R&B vocabularies could be renewed rather than merely reproduced.",
    ],
    links: [
      { href: "/texas-hip-hop", label: "Texas hip-hop" },
      { href: "/texas-gospel-rnb-pop", label: "Gospel, R&B & pop" },
      { href: "/texas-music-cities", label: "Texas music cities" },
    ],
  },
  {
    id: "living-history",
    period: "Today",
    title: "The timeline stays open because Texas music is still being made",
    summary:
      "The most useful way to read Texas music today is as living history. Dance halls still host music, old genres keep changing, city scenes overlap through touring and digital distribution, and new artists can draw simultaneously from country, rap, conjunto, gospel, blues, rock, jazz and pop.",
    milestones: [
      "Historic venues remain part of current music culture rather than functioning only as preserved landmarks.",
      "City scenes still matter even when digital distribution lets artists reach audiences without leaving Texas.",
      "TexasDefined treats this chronology as a framework for deeper genre, city, venue and artist research—not as a claim that musical change happened in neat decade-sized boxes.",
    ],
    links: [
      { href: "/texas-music-venues", label: "Legendary Texas music venues" },
      { href: "/texas-music-cities", label: "Texas music cities" },
      { href: "/events", label: "Texas events" },
    ],
  },
] as const;

export const TEXAS_MUSIC_RELATED_GUIDES: readonly TexasMusicRelatedGuide[] = [
  {
    title: "Texas Music Timeline",
    href: "/texas-music#timeline",
    description: "Follow the statewide chronology from community roots and early records through western swing, rock, outlaw country, Tejano, hip-hop and modern pop.",
  },
  {
    title: "Texas Blues",
    href: "/texas-blues",
    description: "From Blind Lemon Jefferson and Deep Ellum to Lightnin' Hopkins, electric guitar and Austin blues-rock.",
  },
  {
    title: "Texas Conjunto & Tejano",
    href: "/texas-conjunto-tejano",
    description: "Accordion, bajo sexto, South Texas borderlands and the generations that led from conjunto to modern Tejano.",
  },
  {
    title: "Texas Western Swing",
    href: "/texas-western-swing",
    description: "Fort Worth dance music, Milton Brown, Bob Wills, steel guitar and the blend of country, blues and jazz.",
  },
  {
    title: "Texas Country & Outlaw Country",
    href: "/texas-country-outlaw",
    description: "Dance halls, songwriters and the Austin progressive-country movement that challenged Nashville convention.",
  },
  {
    title: "Texas Rock & Rockabilly",
    href: "/texas-rock-rockabilly",
    description: "Buddy Holly, Roy Orbison, Janis Joplin and the Texas roots that fed rock-and-roll and later roots rock.",
  },
  {
    title: "Texas Jazz",
    href: "/texas-jazz",
    description: "Territory bands, Houston tenor saxophone, Fort Worth innovators and Texas musicians who changed modern jazz.",
  },
  {
    title: "Texas Gospel, R&B & Pop",
    href: "/texas-gospel-rnb-pop",
    description: "Church quartets, Duke-Peacock, Kirk Franklin, Erykah Badu, Destiny's Child and the Texas line from gospel to global pop.",
  },
  {
    title: "Texas Hip-Hop",
    href: "/texas-hip-hop",
    description: "Houston rap, DJ Screw's tape culture, the Geto Boys, UGK and the Gulf Coast systems that built a national sound.",
  },
  {
    title: "Texas Music Cities",
    href: "/texas-music-cities",
    description: "Compare Austin, Houston, San Antonio, Lubbock and Dallas–Fort Worth as local systems that shaped distinct Texas music scenes.",
  },
  {
    title: "Legendary Texas Music Venues",
    href: "/texas-music-venues",
    description: "Gruene Hall, Broken Spoke, Continental Club, Antone's and Billy Bob's—rooms that turned Texas music into lived culture.",
  },
  {
    title: "Texas Dance Halls & Honky-Tonks",
    href: "/texas-dance-halls-honky-tonks",
    description: "How the rooms, floors and roadside venues of Texas became part of the state's musical infrastructure.",
  },
  {
    title: "Culture & Music: Things That Define Texas",
    href: "/things-unique-to-texas/culture-music",
    description: "Music, traditions, rituals and cultural touchstones in the Texas Defined reference collection.",
  },
  {
    title: "Texas History",
    href: "/texas-history",
    description: "Put musical movements into the larger story of migration, communities, industry and change in Texas.",
  },
  {
    title: "Texas Small Towns",
    href: "/explore/small-towns",
    description: "Explore the towns, courthouse squares and local institutions connected to Texas culture.",
  },
  {
    title: "Texas Events",
    href: "/events",
    description: "Find festivals and recurring events where Texas traditions are still experienced in person.",
  },
] as const;

export const TEXAS_MUSIC_PRIMARY_SOURCES = [
  {
    label: "Handbook of Texas Music",
    url: "https://www.tshaonline.org/handbook/projects/texas-music",
    publisher: "Texas State Historical Association",
  },
  {
    label: "Texas Music — Venues",
    url: "https://www.tshaonline.org/handbook/projects/texas-music/category/music/category/venues",
    publisher: "Texas State Historical Association",
  },
  {
    label: "Music — Handbook of Texas",
    url: "https://www.tshaonline.org/handbook/entries/music",
    publisher: "Texas State Historical Association",
  },
  {
    label: "Texas-Mexican Conjunto — Handbook of Texas",
    url: "https://www.tshaonline.org/handbook/entries/texas-mexican-conjunto",
    publisher: "Texas State Historical Association",
  },
  {
    label: "Center for Texas Music History",
    url: "https://www.txst.edu/ctmh/",
    publisher: "Texas State University",
  },
] as const;