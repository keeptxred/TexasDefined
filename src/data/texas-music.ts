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

export const TEXAS_MUSIC_RELATED_GUIDES: readonly TexasMusicRelatedGuide[] = [
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
    title: "Corpus Christi Music History",
    href: "/corpus-christi-music-history",
    description: "Follow the Coastal Bend's record stores, Tejano labels, studio infrastructure, regional dance circuit and Selena's Corpus Christi story.",
  },
  {
    title: "Texas Music Timeline",
    href: "/texas-music-timeline",
    description: "Trace durable milestones linking dance halls, Black performance circuits, recording centers, counterculture rooms and regional music systems.",
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
    title: "Texas Old West",
    href: "/texas-old-west",
    description: "Connect western swing and honky-tonk culture to ranching, frontier history, longhorns, rodeo and the broader western landscape.",
  },
  {
    title: "Sacred Places in Texas",
    href: "/texas-sacred-places",
    description: "Connect church music and immigrant-community history to Painted Churches, missions, living worship and sacred heritage travel.",
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
