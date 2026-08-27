export type TexasMusicTimelineLink = {
  label: string;
  href: string;
};

export type TexasMusicTimelineEra = {
  period: string;
  title: string;
  summary: string;
  details: readonly string[];
  links: readonly TexasMusicTimelineLink[];
};

export type TexasMusicTimelineSource = {
  label: string;
  url: string;
  publisher: string;
  note: string;
};

export const TEXAS_MUSIC_TIMELINE_DESCRIPTION =
  "A chronological guide to the roots and evolution of Texas music, from Indigenous and mission-era traditions through blues, conjunto, western swing, rock, outlaw country, Tejano, hip-hop and modern global pop.";

export const TEXAS_MUSIC_TIMELINE_ERAS: readonly TexasMusicTimelineEra[] = [
  {
    period: "Before the 1800s",
    title: "Indigenous traditions, missions and the first cultural crossings",
    summary:
      "Texas music did not begin with the recording industry. Long before commercial genres had names, Indigenous communities maintained musical traditions of their own, while Spanish mission life brought Catholic liturgical music, guitars and other European practices into the region.",
    details: [
      "The Handbook of Texas describes Indigenous song as the earliest documented layer of music in the region and identifies Catholic mission music as the earliest European musical tradition to take root here.",
      "Spanish folk traditions arrived with soldiers and settlers, while French influence moved west from Louisiana. Those overlapping cultural streams established a pattern that would define Texas music for centuries: traditions meeting at borders and being reshaped by local communities.",
    ],
    links: [
      { label: "Texas Music overview", href: "/texas-music" },
      { label: "San Antonio music history", href: "/san-antonio-music-history" },
    ],
  },
  {
    period: "1800s–early 1900s",
    title: "Migration builds the Texas musical mosaic",
    summary:
      "Anglo-American settlement, Mexican and Tejano continuity, emancipation, Black church life, and German, Czech, Polish and other immigration expanded the state's musical vocabulary. Fiddles, guitars, brass instruments, accordions, hymns, work songs and dance music circulated through towns, farms, churches and community halls.",
    details: [
      "Central Texas dance halls became social institutions as German and Czech communities maintained polkas, waltzes and other dance traditions. Along the border, accordion music interacted with Mexican forms that would become central to conjunto.",
      "African American sacred and secular traditions developed through churches, community gatherings and traveling musicians. Blues, gospel, ragtime and jazz would emerge from this broader social world rather than from a single city or moment.",
    ],
    links: [
      { label: "Conjunto & Tejano", href: "/texas-conjunto-tejano" },
      { label: "Dance halls & honky-tonks", href: "/texas-dance-halls-honky-tonks" },
    ],
  },
  {
    period: "1900s–1920s",
    title: "Blues, gospel and jazz move through growing Texas cities",
    summary:
      "Railroads, migration and expanding cities gave musicians larger circuits and audiences. Dallas, Houston, Fort Worth, San Antonio and East Texas became important nodes for blues, gospel, jazz and related forms.",
    details: [
      "Blind Lemon Jefferson emerged from East Texas and Dallas-area street performance into one of the defining figures of early recorded country blues. Deep Ellum became one of the state's best-known urban crossroads for Black music and nightlife.",
      "Churches and gospel networks created another durable musical infrastructure. Jazz musicians moved through territory bands and city scenes, carrying Texas approaches into national touring networks while bringing outside influences back home.",
    ],
    links: [
      { label: "Texas Blues", href: "/texas-blues" },
      { label: "Texas Jazz", href: "/texas-jazz" },
      { label: "Gospel, R&B & pop", href: "/texas-gospel-rnb-pop" },
    ],
  },
  {
    period: "1920s–1940s",
    title: "Recording, radio, conjunto and western swing create new Texas sounds",
    summary:
      "Commercial recording and radio amplified regional styles. In South Texas, conjunto took recognizable form around accordion and bajo sexto. In North and Central Texas, dance-band experimentation helped create western swing.",
    details: [
      "Narciso Martínez became a foundational conjunto accordionist as the style developed into a distinct borderlands tradition. Lydia Mendoza's career demonstrated how Spanish-language Texas music could reach broad audiences through records, radio and touring.",
      "Milton Brown and Bob Wills helped turn a mix of fiddle music, blues, jazz, pop and dance-band arrangements into western swing. The result was not simply country music with new instrumentation; it was a hybrid built for Texas dance floors and radio audiences.",
    ],
    links: [
      { label: "Texas Western Swing", href: "/texas-western-swing" },
      { label: "Conjunto & Tejano", href: "/texas-conjunto-tejano" },
      { label: "Legendary music venues", href: "/texas-music-venues" },
    ],
  },
  {
    period: "1940s–1960s",
    title: "Electric blues, R&B, rock-and-roll and modern jazz expand the map",
    summary:
      "Postwar Texas musicians helped push several American genres toward new forms. Electric amplification transformed blues; independent labels connected gospel and R&B; West Texas became crucial to early rock-and-roll; and Fort Worth produced modern-jazz innovators.",
    details: [
      "T-Bone Walker's electric guitar language became a major influence on postwar blues, while Lightnin' Hopkins made Houston one of the defining places in Texas blues history. Houston's record-label and studio ecosystem linked gospel, blues and rhythm and blues.",
      "Buddy Holly's work out of Lubbock helped establish the self-contained rock band as a creative unit. Ornette Coleman, raised in Fort Worth, became one of the central innovators of modern jazz. The period shows why Texas music is best understood as multiple local systems interacting with national markets.",
    ],
    links: [
      { label: "Rock & rockabilly", href: "/texas-rock-rockabilly" },
      { label: "Houston music history", href: "/houston-music-history" },
      { label: "Lubbock music history", href: "/lubbock-music-history" },
    ],
  },
  {
    period: "1960s–1980s",
    title: "Austin, outlaw country and the live-music ecosystem",
    summary:
      "The late 1960s and 1970s connected psychedelic rock, blues, folk, country and singer-songwriter communities in new ways. Austin's clubs, dance halls and audiences became central to progressive and outlaw country, while older Texas traditions continued evolving elsewhere.",
    details: [
      "Willie Nelson's return to Texas became part of a broader Austin scene that rejected rigid Nashville categories and mixed country audiences with rock-era counterculture. Waylon Jennings and other Texans became closely associated with the outlaw-country movement.",
      "Venues such as the Broken Spoke, Armadillo World Headquarters and Antone's helped make physical rooms part of the story. The scene was not one genre: blues revival, roots music, country, rock and songwriting communities overlapped through the city's live infrastructure.",
    ],
    links: [
      { label: "Country & outlaw country", href: "/texas-country-outlaw" },
      { label: "Austin music history", href: "/austin-music-history" },
      { label: "Broken Spoke history", href: "/broken-spoke-austin-history" },
      { label: "Antone's history", href: "/antones-austin-history" },
    ],
  },
  {
    period: "1980s–2000s",
    title: "Tejano, Texas blues-rock and hip-hop build new mass audiences",
    summary:
      "Texas artists again moved regional traditions into national and international culture. Tejano entered a major commercial era, Austin blues-rock reached enormous audiences, and Houston and Port Arthur built influential hip-hop systems outside the traditional music-industry centers.",
    details: [
      "Selena became the defining star of Tejano's commercial expansion while remaining deeply identified with Corpus Christi and South Texas. Stevie Ray Vaughan carried a Texas blues lineage into mainstream rock without severing its relationship to earlier electric blues.",
      "Houston's Geto Boys established a national presence for Southern rap, DJ Screw developed a slowed-down tape culture with enormous regional influence, and Port Arthur's UGK helped define Gulf Coast rap. Independent distribution, neighborhood networks and local identity were central to that growth.",
    ],
    links: [
      { label: "Texas Hip-Hop", href: "/texas-hip-hop" },
      { label: "Conjunto & Tejano", href: "/texas-conjunto-tejano" },
      { label: "Texas Blues", href: "/texas-blues" },
    ],
  },
  {
    period: "2000s–today",
    title: "Texas music becomes global without becoming singular",
    summary:
      "The modern period makes the central lesson of Texas music history even clearer: there is no single Texas sound. Artists rooted in Houston, Dallas–Fort Worth, Austin, San Antonio, South Texas and other communities work across country, gospel, R&B, pop, rap, regional Mexican music, indie rock and hybrids that resist easy classification.",
    details: [
      "Beyoncé's Houston roots connect contemporary global pop to the state's longer histories of Black church music, R&B, studio culture and performance. Fort Worth's Kirk Franklin transformed contemporary gospel, while artists across country and regional Mexican music continue to reinterpret older Texas traditions.",
      "Streaming changed distribution, but geography still matters. Local venues, studios, churches, festivals, dance traditions and city scenes remain the institutions through which musicians meet audiences and inherit musical memory. Texas music continues to evolve through the same process visible throughout this timeline: migration, exchange and reinvention.",
    ],
    links: [
      { label: "Gospel, R&B & pop", href: "/texas-gospel-rnb-pop" },
      { label: "Texas Music Cities", href: "/texas-music-cities" },
      { label: "Texas Music hub", href: "/texas-music" },
    ],
  },
] as const;

export const TEXAS_MUSIC_TIMELINE_SOURCES: readonly TexasMusicTimelineSource[] = [
  {
    label: "Music — Handbook of Texas",
    url: "https://www.tshaonline.org/handbook/entries/music",
    publisher: "Texas State Historical Association",
    note: "Provides the broad chronological overview from Indigenous and mission-era music through the development of Texas musical institutions and genres.",
  },
  {
    label: "Handbook of Texas Music",
    url: "https://www.tshaonline.org/handbook/projects/texas-music",
    publisher: "Texas State Historical Association",
    note: "Provides genre, artist and place-level Texas music history and emphasizes the cross-cultural development of the state's musical traditions.",
  },
  {
    label: "The History of Texas Music",
    url: "https://www.txst.edu/ctmh/publications/history-of-tx-music.html",
    publisher: "Center for Texas Music History, Texas State University",
    note: "Academic overview of the ethnic origins, genre cross-pollination and cultural forces that shaped Texas music.",
  },
  {
    label: "Center for Texas Music History",
    url: "https://www.txst.edu/ctmh/",
    publisher: "Texas State University",
    note: "Research and teaching center devoted to preserving and studying Texas and Southwestern musical heritage.",
  },
] as const;
