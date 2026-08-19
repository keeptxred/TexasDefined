export type PaintedChurchResearchItem = {
  label: string;
  detail: string;
};

export type PaintedChurchResearchSection = {
  heading: string;
  paragraphs: string[];
};

export type PaintedChurchResearchSource = {
  label: string;
  url: string;
  tier: "official" | "historic-register" | "public-media" | "scholarly" | "local";
  use: string;
};

export type PaintedChurchResearchDossier = {
  slug: string;
  researchSummary: string;
  lookFor: PaintedChurchResearchItem[];
  interpretation: PaintedChurchResearchSection[];
  communityContext: PaintedChurchResearchSection[];
  recordNotes?: string[];
  sources: PaintedChurchResearchSource[];
};

export const schulenburgTourInfo = {
  checkedAt: "2026-08-18",
  chamberName: "Greater Schulenburg Chamber of Commerce",
  chamberAddress: "618 N. Main St., Schulenburg, TX 78956",
  phone: "979-743-4514",
  chamberUrl: "https://schulenburgchamber.org/painted-churches/",
  texasTimeTravelUrl: "https://texastimetravel.com/directory/painted-churches/",
  normalSelfGuidedHours: "Monday-Saturday, generally 9:00 a.m.-4:00 p.m.; Praha closes at 3:00 p.m. Saturdays",
  selfGuidedLimit: "The Chamber says small self-guided groups of no more than six people can normally visit four of the six area churches.",
  guidedTour: "Guided tours are offered Monday-Saturday, except certain holidays and Catholic holy days. The usual tour covers four churches; one or two additional churches can be requested.",
  recommendedStart: "The Chamber recommends starting a four-church guided tour between 9:15 and 11:00 a.m.; five- or six-church tours should begin no later than 10:00 a.m.",
  deposit: "$60 deposit to reserve a date and guide; the deposit is applied to the guide fee.",
  spanish: "Spanish-language guided tours are available when requested in advance.",
  accessibility: "The Chamber states that all six churches on its local circuit are handicap accessible.",
  mapNote: "Printed maps are available for purchase at the Chamber office; the current Chamber page does not publish a map price.",
  etiquette: [
    "Active worship, funerals, weddings, prayer and parish events take priority over sightseeing.",
    "No food, drinks, chewing gum, tobacco or pets are allowed inside.",
    "Visitors may sit in the pews but should not enter the choir loft or altar area.",
    "Do not touch paintings, statues or sculptures, and leave parish prayer books in place.",
    "Close exterior doors behind you and remain outside when a service or private event is underway.",
  ],
};

const highHill: PaintedChurchResearchDossier = {
  slug: "high-hill-nativity-of-mary",
  researchSummary: "High Hill is especially important because its painting is part of the architecture itself: Leo Dielmann's Gothic Revival design uses decorative illusion to make a comparatively economical rural church read like a much more complex European Gothic interior.",
  lookFor: [
    { label: "Painted structure", detail: "Follow the painted ribs, joints and vault-like divisions overhead. They visually create Gothic groin vaulting where the underlying construction is much simpler." },
    { label: "Applied canvas", detail: "Some ornament was painted on canvas and attached to wood. Austin PBS notes that hardened bubbles and surface irregularities can still reveal the technique from the choir-loft area." },
    { label: "Faux materials", detail: "Marbleized columns and metallic accents make wood read as polished stone and richer architectural material." },
    { label: "Lamb of God", detail: "The apse includes the Lamb of God, a central Christian symbol of Christ's sacrificial role, framed within the larger decorative program." },
    { label: "Light and shadow", detail: "The comparatively darker Gothic interior and stained glass work together with the paint; the design is not meant to be read as bright modern mural painting alone." },
  ],
  interpretation: [
    {
      heading: "Why the paint is architectural, not merely decorative",
      paragraphs: [
        "Austin PBS contrasts High Hill with Dielmann's St. Mary's at Fredericksburg. At Fredericksburg a wealthier congregation could afford actual wood-and-plaster vaulting. At High Hill, painting supplies part of that Gothic architectural effect. The distinction helps explain why trompe-l'oeil matters here: it is doing spatial work, not just filling blank surfaces.",
        "The National Register record reinforces that interpretation by recognizing the building for art, architecture and religion and identifying both 1906 and 1912 as significant years—the church building and the decorative campaign are treated as a combined historic resource.",
      ],
    },
    {
      heading: "Stockert and Kern's 1912 campaign",
      paragraphs: [
        "Austin PBS attributes the interior to Ferdinand Stockert and Hermann Kern, who also worked at St. Joseph's Catholic Church in San Antonio. Parish memory recorded by the documentary project says that they painted designs on canvas before adhering them to the wooden interior.",
        "That technique explains the layered surface visitors see today and makes conservation especially complex: preserving High Hill means conserving both the building fabric and an applied painted skin.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "A German-Catholic statement in rural Texas",
      paragraphs: [
        "Austin PBS places Dielmann's design in a period when Catholic leadership encouraged more climate-adapted Spanish or Mission forms and more fire-resistant construction. German and Czech communities often preferred architectural traditions that looked back toward Central Europe.",
        "High Hill's brick exterior helped answer concerns about wood churches lost to fire and storms, while its interior retained the visual language of European Gothic worship spaces. The result is both a Texas adaptation and a deliberate cultural memory project.",
      ],
    },
  ],
  recordNotes: [
    "National Register ID 83003136; listed June 21, 1983 under Churches with Decorative Interior Painting TR.",
    "NPS metadata identifies Gothic Revival, Leo M. J. Dielmann and Frank Bohlmann, and statewide significance in art, architecture and religion.",
  ],
  sources: [
    { label: "National Park Service National Register record", url: "https://npgallery.nps.gov/AssetDetail/NRIS/83003136", tier: "historic-register", use: "designation, architect, builder, dates and significance" },
    { label: "Austin PBS — High Hill", url: "https://austinpbs.org/paintedchurches/highhill", tier: "public-media", use: "architectural interpretation, canvas technique and documentary research" },
    { label: "Schulenburg Chamber — Painted Churches", url: "https://schulenburgchamber.org/painted-churches/", tier: "official", use: "current touring and access guidance" },
    { label: "Texas Time Travel — Painted Churches", url: "https://texastimetravel.com/directory/painted-churches/", tier: "official", use: "THC tourism context and statewide designation framing" },
  ],
};

const ammannsville: PaintedChurchResearchDossier = {
  slug: "ammannsville-st-john-the-baptist",
  researchSummary: "Ammannsville is a case study in rebuilding, attribution and changing taste: the current pink church is the third building on the site, its open interior deliberately simpler than its lost predecessor, and its painter was identified decades later through comparative decorative-arts research.",
  lookFor: [
    { label: "The pink field", detail: "The pale rosy interior is the church's strongest visual signature and a useful backdrop for comparing its ornament with High Hill's darker architectural illusion." },
    { label: "Open nave", detail: "Notice the absence of the support columns documented in the more ornate second church. The rebuilt church uses a simpler, airier interior." },
    { label: "Repeated stencil work", detail: "Borders and repeated motifs show the efficiency and precision of stencil and transfer-based decorative painting." },
    { label: "Faux finishes", detail: "Look for surfaces treated to suggest more expensive materials rather than reading every apparent stone or marble surface literally." },
    { label: "Holy-water angels", detail: "The restored angel figures at the entrance are part of the church's preservation story as well as its devotional furnishing." },
  ],
  interpretation: [
    {
      heading: "Three churches, two disasters",
      paragraphs: [
        "Austin PBS documents a hurricane destroying the first church in 1909 and a fire destroying the second eight years later. Parishioners salvaged some statuary, but the fire was intense enough to melt the bells. The current church rose almost immediately on the second building's concrete footprint.",
        "That sequence explains the present building's restraint. The community did not simply recreate the elaborate Victorian predecessor; the third church eliminated much of that exterior embellishment and opened the nave by omitting interior support columns.",
      ],
    },
    {
      heading: "How Fred Donecker was identified",
      paragraphs: [
        "For years local tradition described the decorator as an unknown itinerant painter. Austin PBS reports that University of Texas decorative-painting scholar Buie Harwood compared techniques and stylistic traits across churches with documented artists and attributed Ammannsville's work to Fred Donecker.",
        "That makes Ammannsville especially useful for explaining how art-historical attribution works: authorship can be recovered through materials, repeated motifs, technique and comparison even when parish paperwork has disappeared.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "Preservation through local memory",
      paragraphs: [
        "The documentary project's oral-history work preserves details that conventional architectural records often miss, including recollections of the fire and the later recovery of damaged angel figures from the old rectory attic.",
        "Local artist Gene A. Mikulik later retouched the church and restored the angel figures. His work connects Ammannsville to the broader network of twentieth-century local preservation that also touched other Fayette County painted churches.",
      ],
    },
  ],
  sources: [
    { label: "Austin PBS — Ammannsville", url: "https://austinpbs.org/paintedchurches/ammansville", tier: "public-media", use: "three-building history, Donecker attribution, oral histories and restoration" },
    { label: "Schulenburg Chamber — Painted Churches", url: "https://schulenburgchamber.org/painted-churches/", tier: "official", use: "current touring, access, accessibility and etiquette" },
    { label: "Texas Time Travel — Painted Churches", url: "https://texastimetravel.com/directory/painted-churches/", tier: "official", use: "THC statewide cultural-tourism context" },
  ],
};

const praha: PaintedChurchResearchDossier = {
  slug: "praha-st-marys-assumption",
  researchSummary: "Praha combines Czech parish history, an unusually monumental 1895 stone church, multiple generations of artists and one of the strongest community-memory landscapes on the route, including the cemetery and memorials to the town's World War II dead.",
  lookFor: [
    { label: "Garden-like ceiling", detail: "Read Gottfried Flury's blue, green and turquoise foliage as an enveloping environment rather than isolated ceiling panels." },
    { label: "Saints Cyril and Methodius", detail: "Their presence connects the church to Czech and Moravian Catholic identity and the Slavic missionary tradition." },
    { label: "Layered authorship", detail: "The interior is not the work of one hand: distinguish Flury's decorative scheme, Father Louis Netardus's religious painting and Gene Mikulik's later conservation and additions." },
    { label: "Altars and gilding", detail: "The white-and-gold altars, statuary and painted surfaces were designed to work together as a complete devotional interior." },
    { label: "Cemetery and war memorials", detail: "The church grounds extend the story beyond architecture; Texas Time Travel highlights Praha's extraordinary World War II losses and memorial landscape." },
  ],
  interpretation: [
    {
      heading: "A church large enough to signal permanence",
      paragraphs: [
        "Austin PBS emphasizes the scale and solidity of the 1895 church and the sacrifice required of a small Czech farming community to build it. Its locally quarried stone and tall steeple make the exterior itself a statement of a parish that expected to endure.",
        "The painted interior then turns that permanence into cultural expression. The decorative program belongs to the same immigrant story as the building, but it accumulated over time through several artists rather than arriving as a single finished campaign.",
      ],
    },
    {
      heading: "The church as a community archive",
      paragraphs: [
        "Texas Time Travel connects St. Mary's to Praha's World War II history. The tiny community lost nine local men during the war's last year, and memorials in the cemetery and on the grounds keep that history physically attached to the church.",
        "That makes a visit to Praha more than an interior-design stop. The building, cemetery, chapels and veterans memorials together show how the parish became a repository for family, military, immigrant and religious memory.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "Czech Catholic settlement and chain migration",
      paragraphs: [
        "Austin PBS's Czech-history research explains how nineteenth-century migrants from Moravia and Bohemia often followed relatives and neighbors to Texas through chain migration. Rural congregations pooled land, labor and money to establish churches after years of traveling long distances for Mass.",
        "Praha fits that pattern particularly well: its successive worship spaces and eventually monumental stone church mark the transition from frontier settlement to a mature Czech-Texan community.",
      ],
    },
  ],
  sources: [
    { label: "Austin PBS — Praha", url: "https://austinpbs.org/paintedchurches/praha", tier: "public-media", use: "building history, artists and interpretive context" },
    { label: "Austin PBS — Czechs in Texas", url: "https://austinpbs.org/paintedchurches/history_czechs", tier: "public-media", use: "immigration, chain migration and parish-building context" },
    { label: "Texas Time Travel — Praha", url: "https://texastimetravel.com/cities/praha/", tier: "official", use: "World War II memorial landscape and THC tourism context" },
    { label: "Schulenburg Chamber — Painted Churches", url: "https://schulenburgchamber.org/painted-churches/", tier: "official", use: "current visitor access and touring" },
  ],
};

const dubina: PaintedChurchResearchDossier = {
  slug: "dubina-saints-cyril-methodius",
  researchSummary: "Dubina is one of the most instructive churches for understanding preservation ethics because its famous blue interior is partly restoration and reconstruction: the original scheme was whitewashed in the 1950s and recovered in the 1980s from surviving traces and stencils.",
  lookFor: [
    { label: "Sky-blue field", detail: "The blue ceiling and walls establish the celestial setting for vines, oak leaves and angels." },
    { label: "Oak imagery", detail: "Oak leaves are especially resonant in Dubina because the community name derives from the Czech word associated with an oak grove." },
    { label: "Angels near the choir loft", detail: "The restored scheme includes interpretive reconstruction; Austin PBS records Judge Ed Janecka acknowledging artistic license in one choir-loft angel." },
    { label: "Recovered stencil logic", detail: "Repeated motifs help show how surviving stencils could guide restoration after the original decorative work had been covered." },
    { label: "Salvaged continuity", detail: "The parish reused surviving elements after disaster, including the iron cross associated with blacksmith Tom Lee, linking successive church buildings." },
  ],
  interpretation: [
    {
      heading: "Original, hidden and reconstructed layers",
      paragraphs: [
        "Austin PBS reports that no record survives naming the original interior painter. The decorative scheme of vines, oak leaves and angels was later whitewashed in the 1950s, leaving the historic program concealed rather than simply preserved in plain view.",
        "In the 1980s, local restoration leaders uncovered traces of the earlier decoration and found some original stencils. Where evidence was incomplete, they made interpretive choices. TexasDefined should therefore describe today's interior as a historically grounded restoration, not imply that every visible brushstroke is untouched original work.",
      ],
    },
    {
      heading: "Why that uncertainty matters",
      paragraphs: [
        "Dubina offers a rare chance to explain preservation honestly. Historic interiors often survive through partial evidence, community memory and skilled reconstruction. A comprehensive guide should tell visitors what is documented, what was recovered and where modern interpretation entered the process.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "Moravian settlement and the meaning of Dubina",
      paragraphs: [
        "Austin PBS traces the community to Moravian families who reached Fayette County in 1856 after an arduous migration. The name is tied to the Czech word for an oak grove, making the oak imagery in the church's decorative program unusually connected to local identity.",
        "The parish also carries a history of rebuilding after severe weather. That repeated cycle of loss, salvage and reconstruction is essential context for understanding why continuity mattered so much to the community.",
      ],
    },
  ],
  recordNotes: [
    "Austin PBS lists Leo Dielmann as architect and explicitly identifies the original interior artist as unknown.",
    "The visible 1980s restoration should not be described as wholly original 19th- or early-20th-century paint.",
  ],
  sources: [
    { label: "Austin PBS — Dubina", url: "https://austinpbs.org/paintedchurches/dubina", tier: "public-media", use: "settlement history, unknown artist, whitewashing and restoration methodology" },
    { label: "Texas Historical Commission — Finding Fayette County", url: "https://thc.texas.gov/blog/finding-fayette-county", tier: "official", use: "Fayette County heritage-driving context" },
    { label: "Schulenburg Chamber — Painted Churches", url: "https://schulenburgchamber.org/painted-churches/", tier: "official", use: "current visitor access and etiquette" },
  ],
};

const moravia: PaintedChurchResearchDossier = {
  slug: "moravia-ascension-of-our-lord",
  researchSummary: "Moravia is the best place on the Schulenburg circuit to study Fred Donecker's decorative vocabulary because Austin PBS describes its 1923 interior as probably the least altered among the painted churches it examined.",
  lookFor: [
    { label: "Cruciform plan", detail: "The building's cross-shaped footprint is unusual in this regional group and was promoted as a practical response to hurricane winds." },
    { label: "Ascension image", detail: "The principal image of Christ's Ascension directly reflects the church's dedication." },
    { label: "Dove of the Holy Spirit", detail: "Look overhead for the dove, one of the clearest iconographic elements documented by Austin PBS." },
    { label: "Donecker techniques", detail: "Use Moravia to compare stencil work, faux finishes and ornamental systems associated with Fred Donecker against his attributed work at Ammannsville." },
    { label: "Shortened steeple", detail: "The present lower steeple records a practical adaptation after parishioners heard the taller original structure creak in strong storms." },
  ],
  interpretation: [
    {
      heading: "Architecture shaped by weather memory",
      paragraphs: [
        "Austin PBS records that Father Emil Schindler championed the cruciform plan after the destructive 1909 hurricane. He believed the cross-shaped footprint would better resist high winds than a simple rectangular church.",
        "The same concern appears in the steeple history: the original taller steeple was shortened after alarming movement in storms. Moravia therefore links architecture, environmental experience and parish memory in a way few painted-church guides explain.",
      ],
    },
    {
      heading: "A benchmark for Fred Donecker's work",
      paragraphs: [
        "Donecker and his sons painted Moravia in 1923, four years after the Ammannsville campaign attributed to him. Austin PBS considers Moravia particularly significant because its decorative work appears to have been left comparatively untouched.",
        "That makes it a benchmark for comparing Donecker's palette and technique across churches and for separating original decorative practice from later repainting or restoration elsewhere.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "A painted church built around resilience",
      paragraphs: [
        "Moravia's story is not simply immigrant nostalgia. The building form itself was a locally reasoned response to severe Texas weather, while the interior decoration continued a Central European visual tradition. The church therefore shows adaptation and cultural continuity operating at the same time.",
      ],
    },
  ],
  sources: [
    { label: "Austin PBS — Documentary field notes on Moravia", url: "https://austinpbs.org/paintedchurches/filmupdates", tier: "public-media", use: "cruciform design, hurricane rationale, steeple history, Donecker and iconography" },
    { label: "Schulenburg Chamber — Painted Churches", url: "https://schulenburgchamber.org/painted-churches/", tier: "official", use: "current touring, access and local circuit status" },
    { label: "Texas Time Travel — Painted Churches", url: "https://texastimetravel.com/directory/painted-churches/", tier: "official", use: "THC statewide painted-church context" },
  ],
};

const stJohn: PaintedChurchResearchDossier = {
  slug: "st-john-texas-st-john-the-baptist",
  researchSummary: "St. John is the least thoroughly documented of the six Schulenburg-area churches in major published sources, so the page should distinguish current parish facts from historical claims instead of borrowing details from better-documented neighbors.",
  lookFor: [
    { label: "Active parish character", detail: "Approach St. John first as a living rural Catholic parish that is included in the Chamber's six-community Painted Churches circuit." },
    { label: "Cemetery landscape", detail: "The parish cemetery is part of the site's community context and has its own local contact through the parish website." },
    { label: "Surviving decorative fabric", detail: "Record and describe only what can be supported by parish or archival evidence; do not assume motifs, dates or artists from nearby churches." },
  ],
  interpretation: [
    {
      heading: "Why a thinner documentary record should remain visible",
      paragraphs: [
        "The Greater Schulenburg Chamber explicitly includes St. John among the six area Painted Churches, while the parish's own current website confirms the active congregation, address, Mass schedule and parish contacts.",
        "Unlike High Hill, Ammannsville, Praha, Dubina and Moravia, major public documentary sources provide less detailed technical information about St. John's decorative authorship. A reference-grade site should mark that limit clearly rather than turn regional tradition into invented church-specific fact.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "A living parish within the touring circuit",
      paragraphs: [
        "The official parish website identifies St. John the Baptist Catholic Church at 7026 FM 957 and publishes an alternating weekend Mass schedule. The Chamber separately includes St. John in the local Painted Churches circuit.",
        "Because worship schedules and parish use are current rather than historical facts, visitors should verify them directly with the parish before planning access around a service day.",
      ],
    },
  ],
  recordNotes: [
    "Do not attribute an artist, painting date or specific iconographic program unless a parish archive, historic nomination or other church-specific source supports it.",
  ],
  sources: [
    { label: "St. John the Baptist Catholic Church — official parish site", url: "https://www.stjohntexas.org/", tier: "official", use: "address, current parish identity, Mass schedule and contacts" },
    { label: "Schulenburg Chamber — Painted Churches", url: "https://schulenburgchamber.org/painted-churches/", tier: "official", use: "six-church circuit inclusion and current tour guidance" },
  ],
};

export const paintedChurchResearchDossiers: Record<string, PaintedChurchResearchDossier> = {
  [highHill.slug]: highHill,
  [ammannsville.slug]: ammannsville,
  [praha.slug]: praha,
  [dubina.slug]: dubina,
  [moravia.slug]: moravia,
  [stJohn.slug]: stJohn,
};

export function paintedChurchResearchBySlug(slug: string) {
  return paintedChurchResearchDossiers[slug];
}
