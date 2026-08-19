import type { PaintedChurchProfile } from "./painted-church-profiles";

const profiles: PaintedChurchProfile[] = [
  {
    slug: "corpus-christi-sacred-heart-catholic-church",
    quickAnswer: "Sacred Heart Catholic Church in Corpus Christi is a strong broader-tradition Painted Church because multiple authoritative sources document monumental true frescoes painted by Mexican American artist Antonio E. Garcia between 1942 and 1948. The frescoes cover the sanctuary dome and include the Sacred Heart of Jesus and stories of the Blessed Virgin Mary.",
    architecture: "Twentieth-century Catholic church with a crossing dome and chancel murals",
    architect: "Richard S. Colley",
    paintedYear: 1942,
    artists: ["Antonio E. Garcia"],
    heritage: "Mexican American Catholic and South Texas regionalist artistic history",
    facts: [
      { label: "Address", value: "1322 Comanche St, Corpus Christi, Texas 78401" },
      { label: "Fresco campaign", value: "Three true frescoes painted between 1942 and 1948" },
      { label: "Artist", value: "Antonio E. Garcia, Monterrey-born South Texas regionalist" },
      { label: "Scale", value: "Texas A&M–Corpus Christi says each fresco is more than 30 feet high and together they cover the sanctuary dome" },
      { label: "Classification", value: "Broader historic Painted Churches tradition; not claimed as part of the formal 1983 National Register decorative-interior group" },
    ],
    history: [{ heading: "A South Texas Painted Church rooted in regional art", paragraphs: ["Sacred Heart broadens the Painted Churches story beyond the familiar Czech- and German-settlement corridor. The church is an active Corpus Christi parish, while its monumental interior frescoes connect Catholic devotional imagery to the career of one of South Texas's most important Mexican American artists."] }],
    paintings: [{ heading: "Antonio Garcia's true frescoes", paragraphs: ["The Diocese of Corpus Christi identifies Garcia's paintings of the Sacred Heart of Jesus and stories of the Blessed Virgin Mary inside the church. Texas A&M University–Corpus Christi documents three true frescoes painted between 1942 and 1948, each more than thirty feet high, together covering the sanctuary dome.", "SAH Archipedia independently describes bright Antonio Garcia murals decorating the chancel and identifies Richard S. Colley as the church architect."] }],
    preservation: [{ heading: "A documented artist legacy", paragraphs: ["The church is also the site of a Texas historical marker honoring Garcia's life and work. Texas Defined treats the frescoes as a historic decorative campaign with a named artist and dated evidence rather than simply labeling the church 'painted' from modern appearance."] }],
    visitorNotes: ["Use the active parish website for current Masses, calendar and contact information before sightseeing."],
    sources: [
      { label: "Sacred Heart Corpus Christi official parish", url: "https://www.sacredheartcorpus.org/" },
      { label: "Diocese of Corpus Christi — Antonio Garcia marker", url: "https://diocesecc.org/news/marker-at-sacred-heart-honors-life-of-catholic-artist" },
      { label: "Texas A&M University–Corpus Christi — Antonio E. Garcia", url: "https://www.tamucc.edu/education/departments/garcia-center/antonio-e-garcia.php" },
      { label: "SAH Archipedia — Sacred Heart Catholic Church", url: "https://sah-archipedia.org/buildings/TX-01-CC21" },
    ],
  },
  {
    slug: "san-antonio-st-joseph-catholic-church",
    quickAnswer: "St. Joseph Catholic Church in downtown San Antonio is a German Catholic Gothic church with a documented historic painted interior. The active parish traces the building to German Catholic immigrants, Portal to Texas History photographs identify frescoes on the ceiling and columns, and the Buie Harwood archive contains a dedicated St. Joseph decorative-painting slide group.",
    foundedYear: 1868,
    builtYear: 1871,
    architecture: "Gothic Revival German Catholic church",
    heritage: "German Catholic immigrant community in nineteenth-century San Antonio",
    facts: [
      { label: "Cornerstone", value: "1868" },
      { label: "Church completed", value: "1871; the parish site's modern summary gives completion as 1876 while its longer historical files document the 1871 dedication, so Texas Defined preserves the conflict" },
      { label: "Address", value: "623 E. Commerce St, San Antonio, Texas 78205" },
      { label: "Interior evidence", value: "San Antonio Conservation Society archival photograph identifies frescoes on the ceiling and columns" },
      { label: "Decorative-painting archive", value: "Buie Harwood archive includes eight St. Joseph research slides" },
    ],
    history: [{ heading: "A German national Catholic church in San Antonio", paragraphs: ["The parish traces St. Joseph to German Catholic immigrants who wanted worship in their own language. The cornerstone was laid in 1868, and parish historical files describe the church's 1871 dedication while the current summary page gives 1876 as completion. Texas Defined records that discrepancy rather than choosing one date silently."] }],
    paintings: [{ heading: "A documented frescoed interior", paragraphs: ["A historic San Antonio Conservation Society photograph preserved by the Portal to Texas History describes several frescoes on the church ceiling and columns. Separate historical reporting attributes paintings of the Ascension, Virgin Mary and Stations of the Cross to Rev. Henry Pefferkorn, a pastor described in parish historical files as an artist."] }],
    preservation: [{ heading: "A church repeatedly preserved in place", paragraphs: ["The parish survived a mid-twentieth-century attempt to acquire its downtown property for commercial expansion and later underwent restoration campaigns. Its decorative interior belongs to the church's broader preservation history rather than the formal 1983 Painted Churches National Register group."] }],
    visitorNotes: ["The parish publishes current Mass, adoration, confession and office schedules and explicitly welcomes visitors. Liturgical activity takes priority over sightseeing."],
    sources: [
      { label: "St. Joseph Downtown San Antonio — official parish history", url: "https://www.stjsa.org/our-parish" },
      { label: "St. Joseph historical parish files", url: "https://www.stjsa.net/cemetery/history/" },
      { label: "Portal to Texas History — St. Joseph apse interior", url: "https://texashistory.unt.edu/ark:/67531/metapth460055/" },
      { label: "Buie Harwood and Anna Brightman archive", url: "https://txarchives.org/utaaa/finding_aids/00136.xml" },
    ],
  },
];

export function paintedChurchExpansionProfileBySlug(slug: string) {
  return profiles.find((profile) => profile.slug === slug);
}
