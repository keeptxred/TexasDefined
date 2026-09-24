import type {
  PaintedChurchFact,
  PaintedChurchProfile,
  PaintedChurchSection,
  PaintedChurchSource,
} from "./painted-church-profiles";

export const paintedChurchesInTexasReviewDate = "2026-09-24";

export type PaintedChurchesInTexasSource = {
  slug: string;
  label: string;
  url: string;
  use: "profile-enrichment" | "candidate-lead" | "exclusion-cross-check";
  note: string;
};

export const paintedChurchesInTexasSources: PaintedChurchesInTexasSource[] = [
  { slug: "moravia-ascension-of-our-lord", label: "Painted Churches in Texas — Ascension of Our Lord, Moravia", url: "https://paintedchurchesintexas.com/the-church-of-the-ascension-of-our-lord-moravia/", use: "profile-enrichment", note: "Secondary church catalog reviewed for additional Moravia context; stronger NPS/THC and parish evidence remains controlling." },
  { slug: "plantersville-st-marys-catholic-church", label: "Painted Churches in Texas — Nativity of the Blessed Virgin Mary, Plantersville", url: "https://paintedchurchesintexas.com/church-of-the-nativity-of-the-blessed-virgin-mary-plantersville/", use: "profile-enrichment", note: "Adds restoration-era and surviving-furnishing leads that are kept separate from THC designation facts." },
  { slug: "wallis-guardian-angel", label: "Painted Churches in Texas — Guardian Angel, Wallis", url: "https://paintedchurchesintexas.com/guardian-angel-catholic-church-wallis-texas/", use: "profile-enrichment", note: "Adds useful detail about the 1960s repainting and surviving decorative scheme; NPS and parish sources retain precedence." },
  { slug: "east-bernard-holy-cross-catholic-church", label: "Painted Churches in Texas — Holy Cross, East Bernard", url: "https://paintedchurchesintexas.com/holy-cross-catholic-church-east-bernard/", use: "candidate-lead", note: "Useful discovery lead. THC and the parish independently verify the 1925 church, imported painted copper Stations, mosaics and Czech/German decorative program." },
  { slug: "panna-maria-immaculate-conception", label: "Painted Churches in Texas — Immaculate Conception, Panna Maria", url: "https://paintedchurchesintexas.com/immaculate-conception-of-the-blessed-virgin-mary-catholic-church-panna-maria-texas/", use: "profile-enrichment", note: "Adds church-artifact and devotional-art leads beyond the already verified parish chronology." },
  { slug: "cestohowa-nativity-of-the-blessed-virgin-mary", label: "Painted Churches in Texas — Nativity of the Blessed Virgin Mary, Cestohowa", url: "https://paintedchurchesintexas.com/nativity-of-the-blessed-virgin-mary-cestohowa-texas/", use: "exclusion-cross-check", note: "The catalog is a useful lead, but SAH Archipedia specifically says the vaulted ceilings did not receive painted interior decoration; Texas Defined therefore does not count it as a verified Painted Church." },
  { slug: "hostyn-queen-of-the-holy-rosary", label: "Painted Churches in Texas — Queen of the Holy Rosary, Hostyn", url: "https://paintedchurchesintexas.com/queen-of-the-holy-rosary-catholic-church-hostyn/", use: "exclusion-cross-check", note: "Preserves historical leads, but the older painted church was replaced in 1966 and the 1966 church was destroyed in 2022; the parish is rebuilding, so it is not counted as a surviving verified Painted Church." },
  { slug: "palestine-sacred-heart-catholic-church", label: "Painted Churches in Texas — Sacred Heart, Palestine", url: "https://paintedchurchesintexas.com/sacred-heart-catholic-church-palestine-2/", use: "profile-enrichment", note: "Adds construction-material and furnishing leads to the already independently verified Palestine profile." },
  { slug: "ammannsville-st-john-the-baptist", label: "Painted Churches in Texas — St. John the Baptist, Ammannsville", url: "https://paintedchurchesintexas.com/st-john-the-baptist-church-ammannsville/", use: "profile-enrichment", note: "Adds surviving-furnishing, interior-layout and community-detail leads while the NPS record remains controlling for designation metadata." },
  { slug: "rowena-st-joseph-catholic-church", label: "Painted Churches in Texas — St. Joseph, Rowena", url: "https://paintedchurchesintexas.com/st-joseph-catholic-church-rowena/", use: "candidate-lead", note: "Useful church-history lead, but this review did not locate sufficiently strong church-specific painted-interior evidence to promote Rowena into the verified collection." },
  { slug: "fredericksburg-st-marys-catholic-church", label: "Painted Churches in Texas — St. Mary's, Fredericksburg", url: "https://paintedchurchesintexas.com/st-mary-catholic-church-frederickburg/", use: "profile-enrichment", note: "Adds furnishing, stained-glass and iconographic detail to the NPS-backed Fredericksburg profile." },
  { slug: "high-hill-nativity-of-mary", label: "Painted Churches in Texas — St. Mary's, High Hill", url: "https://paintedchurchesintexas.com/saint-mary-catholic-church-nativity-of-the-blessed-virgin-mary-at-high-hill/", use: "profile-enrichment", note: "Adds inherited-window, furnishing and site-history details to the already verified High Hill record." },
  { slug: "praha-st-marys-assumption", label: "Painted Churches in Texas — St. Mary's Assumption, Praha", url: "https://paintedchurchesintexas.com/st-mary-church-of-the-assumption-praha/", use: "profile-enrichment", note: "Adds early-settlement and first-chapel detail; official parish visitor guidance continues to control current access." },
  { slug: "lindsay-st-peters-catholic-church", label: "Painted Churches in Texas — St. Peter, Lindsay", url: "https://paintedchurchesintexas.com/saint-peter-catholic-church-lindsay/", use: "profile-enrichment", note: "Adds tornado-survival, community-building and restoration leads; NPS remains controlling for federal metadata." },
  { slug: "dubina-saints-cyril-methodius", label: "Painted Churches in Texas — Saints Cyril & Methodius, Dubina", url: "https://paintedchurchesintexas.com/saints-cyril-and-methodius-catholic-church-dubina/", use: "profile-enrichment", note: "Adds settlement, iron-cross and reconstruction/restoration details to the existing Dubina record." },
  { slug: "shiner-saints-cyril-methodius", label: "Painted Churches in Texas — Saints Cyril & Methodius, Shiner", url: "https://paintedchurchesintexas.com/saints-cyril-methodius-catholic-church-shiner-texas/", use: "profile-enrichment", note: "Adds first-church storm history and present-building chronology to the formal National Register profile." },
  { slug: "serbin-st-paul-lutheran-church", label: "Painted Churches in Texas — St. Paul Lutheran, Serbin", url: "https://paintedchurchesintexas.com/st-paul-lutheran-church-serbin/", use: "profile-enrichment", note: "Adds seating and community-decoration context. A stray Hostyn paragraph on the source page was explicitly rejected rather than imported." },
  { slug: "wesley-brethren-church", label: "Painted Churches in Texas — Wesley Brethren Church", url: "https://paintedchurchesintexas.com/wesley-brethern-church-wesley-texas/", use: "profile-enrichment", note: "Adds symbolic and unfinished-work detail that is independently consistent with Austin PBS and THC/NPS records." },
];

type SecondaryEnrichment = {
  facts?: PaintedChurchFact[];
  history?: PaintedChurchSection[];
  paintings?: PaintedChurchSection[];
  preservation?: PaintedChurchSection[];
  visitorNotes?: string[];
};

const sourceFor = (slug: string): PaintedChurchSource | undefined => {
  const source = paintedChurchesInTexasSources.find((item) => item.slug === slug);
  return source ? { label: source.label, url: source.url } : undefined;
};

const enrichments: Record<string, SecondaryEnrichment> = {
  "high-hill-nativity-of-mary": {
    facts: [
      { label: "Inherited stained glass", value: "Eighteen windows from the second church were reused in the present building; five more were installed in the sanctuary and two later flanked the tower." },
      { label: "Interior furnishing sequence", value: "The pulpit, communion rail and baptismal enclosure were completed in 1910, followed by three parishioner-funded altars in 1911." },
      { label: "Earlier-site fabric", value: "Three bells from the second church were transferred to the present belfry; an 1891 marble cross from the earlier church site was also retained and relocated." },
    ],
    history: [{
      heading: "The 1906 church reused more than memories from its predecessors",
      paragraphs: [
        "The third High Hill church incorporated a substantial amount of material from the earlier parish buildings. Stained glass, bells and site monuments moved forward into the new Gothic Revival sanctuary, making the present complex a layered record of the parish rather than a clean break from the nineteenth century.",
        "The interior was finished in stages before the famous 1912 painting campaign: major woodwork and liturgical enclosures were completed in 1910 and the three altars followed in 1911. That sequence helps separate the building campaign from the later decorative-painting campaign.",
      ],
    }],
  },
  "ammannsville-st-john-the-baptist": {
    facts: [
      { label: "1917 fire salvage", value: "Six statues and a crucifix were saved from the second church and incorporated into the present sanctuary." },
      { label: "Present interior plan", value: "The 1918–1919 replacement uses a broad, column-free nave with large windows, unlike the more structurally articulated church it replaced." },
      { label: "Historic pew detail", value: "Original pews retain small hooks associated with the former custom of men hanging their hats during worship." },
    ],
    preservation: [{
      heading: "The present church carries physical survivors of the 1917 fire",
      paragraphs: [
        "The third Ammannsville church is not only a replacement building. A small group of statues and a crucifix rescued from the 1917 fire were returned to the sanctuary, preserving tangible links to the lost second church.",
        "The source also records a useful vernacular detail in the surviving pews: hat hooks remain from an era when seating customs separated men and women. Those small fittings help document how the church was actually used, not just how it was designed.",
      ],
    }],
  },
  "praha-st-marys-assumption": {
    facts: [
      { label: "First chapel", value: "A tiny stone chapel measuring about 17 by 15 feet was built in 1865, with walls roughly 18 inches thick." },
      { label: "First chapel Mass", value: "The early stone chapel hosted a Christmas Eve midnight Mass in 1865." },
      { label: "Early parish scale", value: "The secondary history identifies eight families in the earliest parish community before the larger church-building campaigns." },
    ],
    history: [{
      heading: "Praha's first worship space was a one-room stone chapel",
      paragraphs: [
        "Before the present landmark church, the Czech Catholic settlement built a remarkably small stone chapel in 1865. Its thick walls left an interior scarcely larger than a modern room, and a separate stone hut nearby gave visiting priests a place to stay and vest because the chapel had no sacristy.",
        "The Christmas Eve Mass celebrated there in 1865 gives the Praha story a useful physical starting point: the elaborate later church grew from a frontier worship space built by only a handful of families.",
      ],
    }],
  },
  "dubina-saints-cyril-methodius": {
    facts: [
      { label: "Historic steeple cross", value: "The first church's iron cross was forged by local Black blacksmith Tom Lee; after the 1909 storm it was recovered and placed on the replacement church." },
      { label: "Post-storm rebuilding fund", value: "The community raised $5,571.90 for the replacement sanctuary after the 1909 hurricane." },
      { label: "Restoration evidence", value: "During the early-1980s revival, parish volunteers uncovered surviving patterns and original stencils beneath later paint." },
    ],
    preservation: [{
      heading: "Restoration combined surviving evidence with community memory",
      paragraphs: [
        "The early-1980s restoration was led locally rather than treated as a purely commercial repainting project. Surviving traces beneath the whitewash, rediscovered stencils and memories of the earlier interior guided the reconstruction, while gaps in the evidence were acknowledged rather than presented as untouched original work.",
        "That history supports Texas Defined's reconstructed-from-evidence integrity label: today's visual impact is historically grounded, but it should not be described as an entirely untouched original paint surface.",
      ],
    }],
  },
  "wallis-guardian-angel": {
    facts: [
      { label: "1960s repainting", value: "Two German painters redecorated the church in pale green and metallic-gold tones during the early 1960s." },
      { label: "Surviving older motifs", value: "Parish memory identifies ceiling angels and stars as surviving elements of the earlier decorative program, although details may have changed." },
      { label: "Historic apse evidence", value: "Older photographs show an earlier beaded-board apse treatment with angels and a Latin inscription, demonstrating that the sanctuary scheme has changed over time." },
    ],
    preservation: [{
      heading: "Wallis is a layered painted interior, not a single frozen campaign",
      paragraphs: [
        "Guardian Angel's present appearance combines older decorative elements with a substantial early-1960s redecoration. That helps explain why Texas Defined classifies the interior as extensively repainted rather than treating every visible surface as 1913 fabric.",
        "Historic photographs and parish recollections are especially important here because they preserve evidence of an earlier apse and ceiling program that is no longer visible in exactly the same form.",
      ],
    }],
  },
  "wesley-brethren-church": {
    facts: [
      { label: "Entrance inscription", value: "A hand-painted Czech inscription above the entrance presents Christ's words, 'I am the way, the truth, and the life.'" },
      { label: "Chalice symbolism", value: "The gold chalice above the pulpit refers to the Brethren practice of Communion under both species, emphasizing access to both bread and wine." },
      { label: "Unfinished decoration", value: "Laciak died after a hunting accident before completing the program; faint layout tracings for intended additional work remain visible." },
    ],
    paintings: [{
      heading: "The unfinished portions are part of the evidence",
      paragraphs: [
        "Wesley's interior preserves not only Bohuslav Laciak's completed illusionistic architecture but also traces of work he never finished. Those faint outlines matter because they reveal process: the decorative scheme was being laid out and extended when his death stopped the campaign.",
        "The chalice above the pulpit also gives the painted program a specifically Brethren theological meaning. It is not simply ornamental goldwork; it points to the community's understanding of Communion and helps connect the interior directly to denominational identity.",
      ],
    }],
  },
  "lindsay-st-peters-catholic-church": {
    facts: [
      { label: "Lay-service tradition", value: "When no priest was present, settlers gathered on Sundays for the Rosary and a lay service using a Goffine devotional book; a copy is reported to survive in the parish office." },
      { label: "1917 tornado survival", value: "The tornado that devastated the 1903 church left the apse, three altars, facade and steeple standing, allowing major elements to be salvaged." },
      { label: "Community rebuilding", value: "Parishioners reused material from the damaged church and the fire-damaged Gainesville courthouse while contributing farm labor to the 1918 rebuilding." },
      { label: "Modern restoration", value: "A major project begun in 2009 replaced water-damaged plaster, copied and repainted decorative patterns, repaired furnishings and addressed roof, foundation and masonry problems." },
    ],
    preservation: [{
      heading: "The modern interior is the result of a major conservation campaign",
      paragraphs: [
        "By 2009, long-term roof leakage had damaged plaster and even compromised masonry. The response went well beyond cosmetic repainting: failed plaster was removed, historic patterns were documented and recreated on new plaster, and windows, floors, pews, altars, roof and foundation were addressed as one preservation problem.",
        "This history explains why the church can look exceptionally fresh while still carrying a documented historic scheme. The surviving design is best understood as a restored original program rather than untouched paint.",
      ],
    }],
  },
  "fredericksburg-st-marys-catholic-church": {
    facts: [
      { label: "Historic pipe organ", value: "A George Kilgen & Son organ installed during the early church campaign survives; its case was painted to harmonize with the decorative interior." },
      { label: "Memorial stained glass", value: "Two First Communion windows use likenesses of local children James Blum and Erma Wagner, turning the glass program into a family memorial as well as devotional art." },
      { label: "1936 iconographic campaign", value: "The later decorative program includes the Twelve Apostles on the nave arches, with Matthias replacing Judas, plus a Christ the King apse image and a Melchizedek scene tied to Eucharistic themes." },
    ],
    paintings: [{
      heading: "The 1936 program is theological as well as ornamental",
      paragraphs: [
        "Fredericksburg's later painting campaign organizes doctrine through placement. The apostolic procession over the center aisle, Christ the King in the apse and the Melchizedek scene in the sanctuary create a connected Eucharistic and apostolic program rather than a collection of unrelated murals.",
        "The church's decorative unity extends beyond wall painting. Even the historic organ case was finished to participate in the interior palette, while stained glass carries both devotional subjects and memorial portraits of parish children.",
      ],
    }],
  },
  "shiner-saints-cyril-methodius": {
    facts: [
      { label: "First-church storm", value: "A February 1892 twister shifted the first church about 11 feet off its foundation and destroyed its tower; the building was repaired and returned to service." },
      { label: "Present church chronology", value: "The cornerstone of the present church was laid in 1920 and the building was blessed on July 7, 1921." },
      { label: "Sanctuary focal point", value: "A large Christ-in-Gethsemane mural overlooks the altar and works with the stained-glass program as a major visual anchor." },
    ],
    history: [{
      heading: "Shiner rebuilt before it expanded",
      paragraphs: [
        "The parish's first church survived an unusually dramatic early setback: a twister moved the building off its foundation and destroyed the tower in 1892. Parishioners repaired it, replaced furnishings and continued using it for decades before growth finally produced the much larger present church.",
        "The current building belongs to the 1920–1921 campaign, giving the decorative interior a different architectural setting from the modest nineteenth-century mission church that preceded it.",
      ],
    }],
  },
  "serbin-st-paul-lutheran-church": {
    facts: [
      { label: "Historic seating pattern", value: "Men traditionally sat in the upper gallery while women and children occupied the ground floor, a practice remembered into the twentieth century." },
      { label: "Pulpit scale", value: "The upper-level pulpit is described by the secondary catalog as rising roughly 20 feet above the floor; Texas Defined treats that measurement as a secondary-source description rather than a surveyed dimension." },
      { label: "Community painting campaign", value: "The church remained comparatively plain for decades before the congregation undertook the painted interior campaign in 1906 without hiring a professional decorative artist." },
    ],
    paintings: [{
      heading: "Serbin's painted interior was a congregational project",
      paragraphs: [
        "Unlike churches whose decorative programs can be tied to a traveling studio or named professional painter, Serbin's 1906 transformation is presented as community work. That distinction reinforces the folk-art dimension of the church and the connection between decorative labor and Wendish congregational identity.",
        "The two-level seating arrangement and unusually elevated pulpit also shape how the decoration is experienced: painted surfaces are read from both the main floor and the gallery rather than from a single nave-level viewpoint.",
      ],
    }],
  },
  "panna-maria-immaculate-conception": {
    facts: [
      { label: "Black Madonna mosaic", value: "A mosaic of Our Lady of Częstochowa by Jan E. Krantz was presented to Panna Maria in 1966 during observances marking a millennium of Polish Christianity." },
      { label: "1858 devotional painting", value: "A painting of St. Stanislaus, Bishop and Martyr, brought from Poland in 1858 is preserved near the church entrance." },
      { label: "Papal-visit chairs", value: "Three carved chairs associated with Pope John Paul II's September 13, 1987 meeting with Polish Texans are preserved at the church." },
      { label: "Parish school legacy", value: "The community built St. Joseph's School in 1868; the surviving school building now serves a museum role in the Panna Maria heritage landscape." },
    ],
    history: [{
      heading: "The church preserves objects from multiple generations of Polish Texas",
      paragraphs: [
        "Panna Maria's significance is not limited to the painted walls. Devotional objects brought from Poland, twentieth-century gifts tied to Polish national memory and artifacts from Pope John Paul II's Texas visit layer later Polish-American history onto the nineteenth-century immigrant foundation.",
        "That continuity is reinforced by the former parish school and the nearby Polish Heritage Center, which broaden a church visit into a larger study of Polish settlement, education and religious life in South Texas.",
      ],
    }],
  },
  "plantersville-st-marys-catholic-church": {
    facts: [
      { label: "Wartime language loss and recovery", value: "German-language inscriptions were painted over during World War II amid concern about anti-German sentiment and were later restored." },
      { label: "Pew survival", value: "Most pews date to the 1917 church; the final two pews on each side are reported to have survived the fire that destroyed the 1894 building." },
      { label: "Restoration campaign", value: "A long-running restoration effort began in 2002 and has recovered decorative and devotional elements lost or obscured during mid-century renovations." },
    ],
    preservation: [{
      heading: "Restoration recovered both decoration and cultural memory",
      paragraphs: [
        "Plantersville's restoration story includes more than faded paint. German inscriptions were deliberately covered during World War II, when parishioners feared the consequences of being visibly identified with German culture. Their later recovery restores a linguistic layer of the immigrant church as well as a decorative one.",
        "Surviving pews and devotional objects from earlier buildings add another level of continuity, so the present interior combines the 1917 church, rescued nineteenth-century material and twenty-first-century restoration work.",
      ],
    }],
  },
  "palestine-sacred-heart-catholic-church": {
    facts: [
      { label: "Site-made brick", value: "The 1893 church used roughly 675,000 bricks manufactured on site from clay associated with the nearby Trinity River." },
      { label: "Interior furnishings", value: "The sanctuary combines the documented mural with stained glass reported from Italy and France and a historic Pilcher pipe organ in the choir loft." },
    ],
    history: [{
      heading: "The 1893 church was built for permanence after fire",
      paragraphs: [
        "After the first wooden church burned in 1890, the Palestine congregation rebuilt in masonry. The scale of the effort is visible in the reported hundreds of thousands of bricks made locally for Nicholas J. Clayton's church.",
        "That material history helps explain why Sacred Heart belongs in a broader architectural story as well as a painted-interior one: the mural, glass and organ sit inside a deliberately permanent late-nineteenth-century building created after the parish had already lost one sanctuary.",
      ],
    }],
  },
};

function appendUnique<T>(base: T[] | undefined, additions: T[] | undefined, key: (item: T) => string) {
  const result = [...(base ?? [])];
  const seen = new Set(result.map(key));
  for (const item of additions ?? []) {
    const id = key(item);
    if (!seen.has(id)) {
      result.push(item);
      seen.add(id);
    }
  }
  return result;
}

export function enrichPaintedChurchProfileFromPaintedChurchesInTexas(profile: PaintedChurchProfile): PaintedChurchProfile {
  const enrichment = enrichments[profile.slug];
  const source = sourceFor(profile.slug);

  if (!enrichment && !source) return profile;

  return {
    ...profile,
    facts: appendUnique(profile.facts, enrichment?.facts, (item) => `${item.label}\u0000${item.value}`),
    history: appendUnique(profile.history, enrichment?.history, (item) => `${item.heading}\u0000${item.paragraphs.join("\u0000")}`),
    paintings: appendUnique(profile.paintings, enrichment?.paintings, (item) => `${item.heading}\u0000${item.paragraphs.join("\u0000")}`),
    preservation: appendUnique(profile.preservation, enrichment?.preservation, (item) => `${item.heading}\u0000${item.paragraphs.join("\u0000")}`),
    visitorNotes: appendUnique(profile.visitorNotes, enrichment?.visitorNotes, (item) => item),
    sources: appendUnique(profile.sources, source ? [source] : [], (item) => item.url),
  };
}
