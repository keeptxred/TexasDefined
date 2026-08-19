export type PaintedChurchSymbolSlug =
  | "all-seeing-eye"
  | "ihs"
  | "lamb-of-god"
  | "holy-spirit-dove"
  | "maltese-cross"
  | "grapes-and-vines"
  | "wheat-and-eucharist"
  | "angels"
  | "marian-imagery"
  | "evangelist-symbols";

export type PaintedChurchSymbol = {
  slug: PaintedChurchSymbolSlug;
  name: string;
  shortDefinition: string;
  answer: string;
  whatItMeans: string[];
  churchSlugs: string[];
  sourceLabel: string;
  sourceUrl: string;
  related: PaintedChurchSymbolSlug[];
};

const PBS_SYMBOLS = "https://austinpbs.org/paintedchurches/symbols";

export const paintedChurchSymbols: PaintedChurchSymbol[] = [
  {
    slug: "all-seeing-eye",
    name: "All-Seeing Eye",
    shortDefinition: "A triangular eye motif representing the omniscience of God the Father.",
    answer: "In the Texas Painted Churches, the All-Seeing Eye is a Christian symbol of divine omniscience rather than a generic decorative emblem. Austin PBS documents it specifically at Praha, where the eye appears in a triangle on the ceiling.",
    whatItMeans: ["The eye represents God's awareness and watchfulness.", "The surrounding triangle is commonly read as a Trinitarian form.", "Church-specific placement and surrounding imagery should be interpreted from the documented interior rather than assumed from the symbol alone."],
    churchSlugs: ["praha-st-marys-assumption"],
    sourceLabel: "Austin PBS — Symbols in the Painted Churches",
    sourceUrl: PBS_SYMBOLS,
    related: ["ihs", "holy-spirit-dove"],
  },
  {
    slug: "ihs",
    name: "IHS Christogram",
    shortDefinition: "A historic abbreviation of the Greek name of Jesus used as a Christological emblem.",
    answer: "IHS is a Christogram formed from the Greek name of Jesus. Austin PBS highlights an example in the stained glass above the Ammannsville entrance, where the letters overlap visually.",
    whatItMeans: ["The letters derive from the Greek spelling of Jesus.", "The emblem became widely used in Western Christianity.", "Later devotional explanations exist, but Texas Defined separates those later interpretations from the linguistic origin."],
    churchSlugs: ["ammannsville-st-john-the-baptist"],
    sourceLabel: "Austin PBS — Symbols in the Painted Churches",
    sourceUrl: PBS_SYMBOLS,
    related: ["lamb-of-god", "maltese-cross"],
  },
  {
    slug: "lamb-of-god",
    name: "Lamb of God",
    shortDefinition: "A symbol of Christ associated with sacrifice, suffering, resurrection and victory over death.",
    answer: "The Lamb of God represents Jesus Christ. Austin PBS documents the High Hill example as a reclining lamb carrying a cross-shaped staff and resurrection banner, combining suffering and triumph imagery.",
    whatItMeans: ["The lamb refers to Christ as sacrificial Lamb of God.", "A cross-shaped staff links the image to the Crucifixion.", "A white banner with red cross is a resurrection and victory emblem."],
    churchSlugs: ["high-hill-nativity-of-mary", "plantersville-st-marys-catholic-church"],
    sourceLabel: "Austin PBS — Symbols in the Painted Churches",
    sourceUrl: PBS_SYMBOLS,
    related: ["wheat-and-eucharist", "grapes-and-vines"],
  },
  {
    slug: "holy-spirit-dove",
    name: "Descending Dove / Holy Spirit",
    shortDefinition: "A dove motif representing the Holy Spirit, often shown with rays or a Trinitarian triangle.",
    answer: "The descending dove is one of the most common Christian symbols of the Holy Spirit. Austin PBS documents it at High Hill and also discusses a painted dove in Moravia.",
    whatItMeans: ["The dove recalls the Gospel accounts of Christ's baptism.", "A triangle can reinforce a Trinitarian reading.", "Rays or glowing light represent divine grace or presence."],
    churchSlugs: ["high-hill-nativity-of-mary", "moravia-ascension-of-our-lord"],
    sourceLabel: "Austin PBS — Symbols in the Painted Churches",
    sourceUrl: PBS_SYMBOLS,
    related: ["all-seeing-eye", "evangelist-symbols"],
  },
  {
    slug: "maltese-cross",
    name: "Maltese Cross",
    shortDefinition: "An eight-pointed cross whose points are traditionally associated with the Beatitudes.",
    answer: "Austin PBS identifies the cross above the older St. Mary's entrance in Fredericksburg as a Maltese Cross and interprets its eight points in relation to the eight Beatitudes.",
    whatItMeans: ["The form remains a Christian cross symbol.", "Its eight points are traditionally linked to the Beatitudes.", "The Fredericksburg example is documented specifically by Austin PBS."],
    churchSlugs: ["fredericksburg-st-marys-catholic-church"],
    sourceLabel: "Austin PBS — Symbols in the Painted Churches",
    sourceUrl: PBS_SYMBOLS,
    related: ["ihs", "lamb-of-god"],
  },
  {
    slug: "grapes-and-vines",
    name: "Grapes and Vines",
    shortDefinition: "Vine and grape imagery associated with Christ, the Eucharist, growth and the biblical vine metaphor.",
    answer: "Grapes and vines in Painted Church decoration can carry Eucharistic and biblical vine symbolism while also functioning as ornamental foliage. Texas Defined marks the motif only where church-specific visual or textual evidence supports it.",
    whatItMeans: ["Grapes can refer to Eucharistic wine.", "Vines can evoke Christ's 'true vine' imagery.", "Decorative foliage should not automatically be assigned Eucharistic meaning without context."],
    churchSlugs: ["dubina-saints-cyril-methodius", "moravia-ascension-of-our-lord", "shiner-saints-cyril-methodius"],
    sourceLabel: "Austin PBS — Painted Churches documentary and church profiles",
    sourceUrl: "https://austinpbs.org/paintedchurches/",
    related: ["wheat-and-eucharist", "lamb-of-god"],
  },
  {
    slug: "wheat-and-eucharist",
    name: "Wheat and Eucharistic Symbols",
    shortDefinition: "Wheat, chalices and related motifs associated with the Eucharist and sacramental life.",
    answer: "Wheat and chalice imagery commonly points to Eucharistic themes. At Wesley, Austin PBS specifically documents a gold chalice above the pulpit and connects it to the congregation's theology of receiving both bread and wine.",
    whatItMeans: ["Wheat can signify bread and Eucharistic nourishment.", "A chalice signifies sacramental wine and the Blood of Christ.", "Denominational context matters: Wesley's chalice has a specifically Brethren/Lutheran interpretive history documented by Austin PBS."],
    churchSlugs: ["wesley-brethren-church", "bandera-st-stanislaus-catholic-church"],
    sourceLabel: "Austin PBS — Wesley Brethren Church",
    sourceUrl: "https://austinpbs.org/paintedchurches/wesley",
    related: ["grapes-and-vines", "lamb-of-god"],
  },
  {
    slug: "angels",
    name: "Angels",
    shortDefinition: "Painted or stained-glass heavenly figures used in devotional, narrative and architectural compositions.",
    answer: "Angels appear repeatedly across Texas Painted Churches, but their role varies by church. They may frame an altar, populate a painted heaven, accompany Christ or Mary, or serve as part of a restored decorative program.",
    whatItMeans: ["Angels function as heavenly attendants and messengers.", "Their meaning depends on the scene they inhabit.", "Restored angels at Dubina should be distinguished from untouched original imagery because parts of that interior were reconstructed from surviving evidence."],
    churchSlugs: ["dubina-saints-cyril-methodius", "praha-st-marys-assumption", "bandera-st-stanislaus-catholic-church", "plantersville-st-marys-catholic-church"],
    sourceLabel: "Austin PBS — Painted Churches church profiles",
    sourceUrl: "https://austinpbs.org/paintedchurches/",
    related: ["marian-imagery", "holy-spirit-dove"],
  },
  {
    slug: "marian-imagery",
    name: "Marian Imagery",
    shortDefinition: "Images of the Virgin Mary and Marian devotional scenes, including coronation imagery.",
    answer: "Marian imagery is especially important in Catholic Painted Churches dedicated to Mary. Bandera's parish directly documents a Coronation of the Blessed Mother scene painted during its 2003–2008 campaign.",
    whatItMeans: ["Marian scenes can reflect a church's dedication and devotional identity.", "Coronation imagery presents Mary as Queen of Heaven.", "Texas Defined identifies exact scenes only when parish, archival or visual evidence supports the attribution."],
    churchSlugs: ["bandera-st-stanislaus-catholic-church", "praha-st-marys-assumption", "high-hill-nativity-of-mary"],
    sourceLabel: "St. Stanislaus Bandera — official church history",
    sourceUrl: "https://www.ststanislausbandera.com/history-of-the-church.html",
    related: ["angels", "holy-spirit-dove"],
  },
  {
    slug: "evangelist-symbols",
    name: "Four Evangelist Symbols",
    shortDefinition: "Traditional symbols associated with Matthew, Mark, Luke and John.",
    answer: "St. Stanislaus in Bandera has a modern, parish-documented ceiling program with symbols of the four evangelists. The parish credits Fr. Antoni Polaniak with designing and painting that interior work.",
    whatItMeans: ["The four symbols traditionally correspond to the four Gospel writers.", "The Bandera program is a modern documented campaign rather than immigrant-era original paint.", "This distinction is preserved in Texas Defined's integrity classification."],
    churchSlugs: ["bandera-st-stanislaus-catholic-church"],
    sourceLabel: "St. Stanislaus Bandera — official church history",
    sourceUrl: "https://www.ststanislausbandera.com/history-of-the-church.html",
    related: ["holy-spirit-dove", "angels"],
  },
];

export const paintedChurchSymbolBySlug = new Map(paintedChurchSymbols.map((symbol) => [symbol.slug, symbol]));
