import type { PaintedChurchResearchDossier } from "./painted-church-research";

const wallis: PaintedChurchResearchDossier = {
  slug: "wallis-guardian-angel",
  researchSummary: "Guardian Angel at Wallis expands the Painted Churches story into Austin County and shows how Czech Catholic identity, disaster recovery and Gothic Revival architecture could converge in a growing railroad-era parish.",
  lookFor: [
    { label: "Gothic Revival shell", detail: "Read the pointed forms and vertical emphasis of the 1913 sanctuary before focusing on the decorative surfaces; the National Register identifies the church as Gothic Revival." },
    { label: "Painted celestial symbols", detail: "Look for the ceiling's stars and angelic imagery together with Christian symbols such as the dove and Alpha and Omega." },
    { label: "Stenciled borders", detail: "Repeated bands separate wall and ceiling zones and demonstrate how pattern books and stencils could organize a large interior efficiently." },
    { label: "Layers of repainting", detail: "The church's current decorative appearance includes later work, so treat the visible interior as a layered preservation history rather than a single untouched campaign." },
  ],
  interpretation: [
    {
      heading: "A parish repeatedly rebuilt after storms",
      paragraphs: [
        "Texas Historical Commission marker history traces the congregation to Czech families who organized in 1892. Their 1899 sanctuary was destroyed in the 1900 storm and rebuilt in 1904; the growing parish then erected the present Gothic-style sanctuary in 1913.",
        "That sequence makes Guardian Angel another example of Texas church architecture shaped by weather memory and persistence. Its significance is not only the painted interior but the community's repeated decision to rebuild and expand.",
      ],
    },
    {
      heading: "Architecture and decoration were recognized together",
      paragraphs: [
        "The National Register lists Guardian Angel under the statewide Churches with Decorative Interior Painting group and identifies statewide significance in art, architecture and religion. It credits Leo Dielmann and Mr. Bunch and classifies the building as Gothic Revival.",
        "That designation is useful interpretively: the paintings should be read as part of the building's architectural identity, not as detachable artwork hung inside an otherwise unrelated church.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "Czech Catholic migration within Texas",
      paragraphs: [
        "The THC marker says several organizing families had moved to the Wallis area from Fayette County. Guardian Angel therefore links the famous Fayette County painted-church region to a wider pattern of Czech Catholic migration and parish building elsewhere in Texas.",
      ],
    },
  ],
  recordNotes: [
    "National Register reference 83003074; listed June 21, 1983.",
    "THC identifies Leo Dielmann and Mr. Bunch in the architectural record.",
  ],
  sources: [
    { label: "Texas Historical Commission — National Register record", url: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003074", tier: "historic-register", use: "designation, style, architect attribution and significance" },
    { label: "Texas Historical Commission — Guardian Angel marker", url: "https://atlas.thc.texas.gov/Details/5015002301", tier: "official", use: "congregation history, Czech settlement and storm/rebuilding chronology" },
  ],
};

const wesley: PaintedChurchResearchDossier = {
  slug: "wesley-brethren-church",
  researchSummary: "Wesley Brethren Church is essential because it proves the Texas painted-church tradition was not exclusively Catholic: it preserves Czech-Moravian Protestant identity and one of the state's earliest immigrant congregational stories.",
  lookFor: [
    { label: "Illusionistic architecture", detail: "Read the painted columns, arches and simulated apse as trompe-l'oeil architecture designed to make a modest rural interior feel monumental." },
    { label: "Blue geometric ceiling", detail: "The ceiling's patterned field provides a striking contrast with the more pictorial Catholic churches in the collection." },
    { label: "Chalice imagery", detail: "The chalice is especially important in a Brethren setting and connects decorative painting directly to Protestant sacramental identity." },
    { label: "Unfinished character", detail: "The decorative campaign is historically valuable partly because Rev. Bohuslav Laciak died before completing the work." },
  ],
  interpretation: [
    {
      heading: "A Czech Protestant counterpart to the Catholic painted churches",
      paragraphs: [
        "The THC marker identifies Wesley as the first Czech-Moravian Brethren congregation in Texas, organized in 1864 by Rev. Joseph Opocensky. The congregation's early church served both worship and education, making the building a center of language, faith and community formation.",
        "Its painted interior belongs to the same immigrant impulse seen in Catholic churches—using visual form to recreate cultural memory—but expresses a different denominational tradition.",
      ],
    },
    {
      heading: "Why the building date needs careful handling",
      paragraphs: [
        "The THC marker states that the first church was built in 1866, while the National Register record spans both 1850-1874 and 1875-1899 periods. Because published accounts differ on how later work is characterized, TexasDefined should distinguish the original congregation/building chronology from the later decorative campaign rather than collapse them into one date.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "Religion, schooling and immigrant continuity",
      paragraphs: [
        "The marker notes that the church also functioned as a school until about 1900, often with the pastor teaching. That dual role helps explain why immigrant churches were more than worship spaces: they preserved language, literacy, faith and communal institutions simultaneously.",
      ],
    },
  ],
  recordNotes: [
    "National Register reference 79002910; listed January 18, 1979 under Churches with Decorative Interior Painting TR.",
    "Recorded Texas Historic Landmark marker identifies the congregation as the first Czech-Moravian Brethren congregation in Texas.",
  ],
  sources: [
    { label: "Texas Historical Commission — Wesley National Register record", url: "https://atlas.thc.texas.gov/Details?atlasnumber=2079002910", tier: "historic-register", use: "designation, period and significance" },
    { label: "Texas Historical Commission — Wesley Brethren marker", url: "https://atlas.thc.texas.gov/Details/5477008405", tier: "official", use: "1864 organization, 1866 church and school history" },
    { label: "Austin PBS — Painted Churches", url: "https://austinpbs.org/paintedchurches/churches", tier: "public-media", use: "decorative-interior context and comparative interpretation" },
  ],
};

const amarillo: PaintedChurchResearchDossier = {
  slug: "amarillo-first-baptist-church",
  researchSummary: "Amarillo's First Baptist entry matters because it pushes the formal painted-interior tradition far beyond Central Texas and into a major Panhandle city, showing that the National Register theme is broader than immigrant Catholic country churches.",
  lookFor: [
    { label: "Urban sanctuary", detail: "Compare its setting and scale with the rural Fayette and Lavaca County churches; the same statewide nomination encompasses very different congregational environments." },
    { label: "Decorative interior as evidence", detail: "Treat surviving painted ornament as the central reason the property belongs to the thematic National Register group, even where artist names or iconographic specifics remain undocumented." },
    { label: "Architectural restraint", detail: "The THC record does not assign a formal architectural style, so avoid forcing the building into a style label unsupported by the nomination database." },
  ],
  interpretation: [
    {
      heading: "Why Amarillo changes the statewide story",
      paragraphs: [
        "The Texas Historical Commission lists the property under Churches with Decorative Interior Painting with statewide significance in art, architecture and religion and credits architect J. Carlander. Its period of significance is 1925-1949.",
        "That record is important because it prevents the phrase 'Painted Churches of Texas' from becoming shorthand only for Czech and German Catholic churches around Schulenburg. The formal historic theme reaches the Panhandle and crosses denominational lines.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "A Baptist chapter in a multi-denominational collection",
      paragraphs: [
        "Including Amarillo alongside Catholic, Lutheran, Methodist and Brethren examples makes the collection more historically accurate. Decorative church painting in Texas was a technique and cultural practice, not the exclusive property of one denomination or ethnic group.",
      ],
    },
  ],
  recordNotes: [
    "National Register reference 83003158; listed June 21, 1983.",
    "THC credits J. Carlander and lists no formal architectural style in the database.",
    "Do not invent an interior artist, painting date or scene list without nomination or parish documentation.",
  ],
  sources: [
    { label: "Texas Historical Commission — First Baptist Church National Register record", url: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003158", tier: "historic-register", use: "designation, architect, period and statewide significance" },
    { label: "Texas Historical Commission — statewide decorative-interior listing", url: "https://atlas.thc.texas.gov/AdvancedSearch/MPS?mpsid=12", tier: "official", use: "thematic-list context" },
  ],
};

const umbarger: PaintedChurchResearchDossier = {
  slug: "umbarger-st-marys-catholic-church",
  researchSummary: "St. Mary's at Umbarger is one of the most distinctive sites in the entire collection because Italian prisoners of war from the nearby Hereford camp helped transform a German-Catholic Panhandle church with Old World carving, painting and stained-glass work during World War II.",
  lookFor: [
    { label: "Assumption above the altar", detail: "The principal Marian image anchors the sanctuary and connects the decorative campaign to the church's dedication to St. Mary." },
    { label: "Annunciation and Visitation", detail: "These Marian scenes flank the sanctuary and create a narrative sequence rather than isolated ornament." },
    { label: "Panhandle landscapes", detail: "Some mural backgrounds localize European religious imagery within the Texas Panhandle landscape." },
    { label: "Gold-leaf halos", detail: "Metallic accents intensify sacred figures and preserve an Old World devotional-art vocabulary." },
    { label: "Carved Last Supper", detail: "Woodcarving and painted surfaces should be read together; the Italian POW contribution was broader than mural painting alone." },
  ],
  interpretation: [
    {
      heading: "A wartime art project with an extraordinary origin",
      paragraphs: [
        "The THC Umbarger marker records that German-Catholic families established St. Mary's in 1908 and that Italian prisoners of war held at nearby Hereford later carved religious figures and painted the interior. Another THC marker for the POW camp specifically cites the religious murals at St. Mary's as one of the prisoners' lasting local projects.",
        "That context makes Umbarger different from the nineteenth-century immigrant churches of Central Texas: its 'Old World' artistry was created through a wartime encounter between local parishioners and European prisoners living in the Panhandle.",
      ],
    },
    {
      heading: "Architecture, construction and decorative campaign",
      paragraphs: [
        "The National Register credits W. H. Lightfoot and Rabey Funk and the W. Frank Little Construction Company. The building's historic significance falls within the 1925-1949 period, aligning the architecture with the later wartime decoration.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "German Catholic parish, Italian POW artists, Texas landscape",
      paragraphs: [
        "Umbarger compresses several histories into one interior: German Catholic settlement, Panhandle agricultural life, World War II incarceration and Italian artistic training. The resulting church is not simply imported European imagery; it is a hybrid Texas wartime cultural artifact.",
      ],
    },
  ],
  recordNotes: [
    "National Register reference 83003159; listed June 21, 1983.",
    "THC's Umbarger and POW-camp markers independently document Italian POW participation in the church's artistic work.",
  ],
  sources: [
    { label: "Texas Historical Commission — St. Mary's National Register record", url: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003159", tier: "historic-register", use: "architects, builder, period and designation" },
    { label: "Texas Historical Commission — Umbarger marker", url: "https://atlas.thc.texas.gov/Details/5381005591/print", tier: "official", use: "German Catholic founding and Italian POW decorative work" },
    { label: "Texas Historical Commission — Hereford POW camp chapel marker", url: "https://atlas.thc.texas.gov/Details/5069003902", tier: "official", use: "wartime prisoner context and confirmation of murals at St. Mary's" },
  ],
};

const paris: PaintedChurchResearchDossier = {
  slug: "paris-first-united-methodist-church",
  researchSummary: "First United Methodist at Paris demonstrates that decorative church painting also flourished in an urban Protestant setting, where Classical/Colonial Revival architecture, a monumental dome and interior stenciling create a very different experience from the Central Texas immigrant churches.",
  lookFor: [
    { label: "Corinthian portico", detail: "Begin with the monumental Classical exterior; the architecture establishes an urban civic scale before the decorative interior is encountered." },
    { label: "Central dome", detail: "The dome organizes the sanctuary spatially and supports the church's most distinctive overhead decorative effect." },
    { label: "Stenciled detailing", detail: "Look for repeated ornamental patterns as evidence of decorative-painting systems rather than one-off easel paintings." },
    { label: "Stained-glass ceiling", detail: "The glazing beneath the dome creates a luminous overhead focal point that works with the painted decoration." },
  ],
  interpretation: [
    {
      heading: "A different architectural language for the same statewide theme",
      paragraphs: [
        "THC classifies the church within Colonial Revival and other late-nineteenth- and twentieth-century revival architecture and credits Van Slyke & Woodruff. It was listed for statewide significance in art, architecture and religion.",
        "That makes Paris a useful comparison point: decorative painting was not tied to Gothic architecture. Here it participates in a more Classical urban composition centered on a dome and monumental portico.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "Urban Protestant decorative art",
      paragraphs: [
        "Placed beside Wesley and Amarillo, Paris helps broaden the category beyond Catholic immigrant parishes. The statewide National Register nomination intentionally grouped churches whose interiors shared decorative-art significance despite very different denominations, regions and architectural vocabularies.",
      ],
    },
  ],
  recordNotes: [
    "National Register reference 83003146; listed June 21, 1983.",
    "THC credits Van Slyke & Woodruff and identifies Colonial Revival among the architectural classifications.",
  ],
  sources: [
    { label: "Texas Historical Commission — First United Methodist National Register record", url: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003146", tier: "historic-register", use: "architecture, architect, designation and significance" },
    { label: "Texas Historical Commission — statewide decorative-interior listing", url: "https://atlas.thc.texas.gov/AdvancedSearch/MPS?mpsid=12", tier: "official", use: "comparative statewide context" },
  ],
};

const lindsay: PaintedChurchResearchDossier = {
  slug: "lindsay-st-peters-catholic-church",
  researchSummary: "St. Peter's at Lindsay is a North Texas German-Catholic landmark where community labor, reused windmill steel, Neo-Romanesque architecture, stained glass, carved altars and Swiss artist Fridolin Fuchs's frescoes form a single unusually well-documented ensemble.",
  lookFor: [
    { label: "Fuchs frescoes", detail: "The THC marker explicitly names Swiss artist Fridolin Fuchs; treat the frescoes as documented authorship rather than anonymous folk decoration." },
    { label: "Carved altars", detail: "The painted program operates with carved devotional furnishings, so read color, sculpture and architecture as one interior system." },
    { label: "Stained glass", detail: "Colored light reinforces the decorative surfaces and should be considered part of the total artistic effect." },
    { label: "Romanesque massing", detail: "Compare the rounded, weightier Neo-Romanesque vocabulary with the pointed Gothic Revival churches elsewhere in the collection." },
  ],
  interpretation: [
    {
      heading: "A church rebuilt after a cyclone",
      paragraphs: [
        "The THC marker says the present 1918 church replaced a building destroyed by cyclone. Lindsay's German settlers supplied substantial manual labor and even saved old windmill towers to reinforce the concrete construction.",
        "That detail turns the church into a literal record of community resourcefulness: agricultural infrastructure was repurposed inside a monumental sacred building.",
      ],
    },
    {
      heading: "Fridolin Fuchs and a documented decorative program",
      paragraphs: [
        "The marker specifically identifies Swiss artist Fridolin Fuchs and describes the interior as lavishly decorated with unusual frescoes, stained-glass windows and carved altars. That unusually direct attribution makes Lindsay a strong anchor for comparing named and anonymous artists across the statewide collection.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "German Catholic community building in North Texas",
      paragraphs: [
        "The marker emphasizes that the lives of Lindsay's German settlers centered on the church. Their labor contribution and material improvisation make the building a community artifact as much as an architect-designed monument.",
      ],
    },
  ],
  recordNotes: [
    "National Register reference 79002927; listed May 25, 1979.",
    "THC identifies Frank A. Ludewig as architect and Fridolin Fuchs as the interior artist.",
  ],
  sources: [
    { label: "Texas Historical Commission — St. Peter's National Register record", url: "https://atlas.thc.texas.gov/Details?atlasnumber=2079002927", tier: "historic-register", use: "architect, Romanesque classification and designation" },
    { label: "Texas Historical Commission — St. Peter's historical marker", url: "https://atlas.thc.texas.gov/Details/5097005077", tier: "official", use: "1918 reconstruction, windmill reinforcement, Fridolin Fuchs, frescoes and carved altars" },
  ],
};

const fredericksburg: PaintedChurchResearchDossier = {
  slug: "fredericksburg-st-marys-catholic-church",
  researchSummary: "St. Mary's at Fredericksburg is one of the best places to compare actual Gothic Revival construction with the painted architectural illusion used in poorer rural churches: a large German-Catholic parish could afford a more structurally elaborate 1908 sanctuary designed by Leo Dielmann and Jacob Wagner.",
  lookFor: [
    { label: "Twin-church landscape", detail: "Read the newer St. Mary's together with the neighboring 1861 Marienkirche; the pair compresses generations of Fredericksburg Catholic history into one site." },
    { label: "Real architectural depth", detail: "Compare the physical vaulting and richer construction with High Hill, where paint creates more of the Gothic structural illusion." },
    { label: "German parish continuity", detail: "The parish traces its beginnings to German immigrants in 1846, making the interior part of a long-lived community institution rather than a stand-alone tourist attraction." },
    { label: "Guided interpretation", detail: "The parish currently offers short guided tours after the 9:00 and 11:15 Sunday Masses and tours by appointment, giving visitors an official interpretation option." },
  ],
  interpretation: [
    {
      heading: "A useful comparison with High Hill",
      paragraphs: [
        "The National Register identifies Gothic Revival and credits Leo M. J. Dielmann and Jacob Wagner. Austin PBS research on High Hill uses Fredericksburg as a revealing contrast: a wealthier parish could realize more Gothic form through actual construction rather than relying as heavily on painted illusion.",
        "That comparison should be explicit across TexasDefined so visitors understand that 'painted church' does not mean every church uses paint in the same architectural way.",
      ],
    },
    {
      heading: "The parish and Fredericksburg grew together",
      paragraphs: [
        "The parish's official history says St. Mary's began with German immigrants in 1846. The Marienkirche followed in 1861 and the present St. Mary's in 1908, while the parish school dates to 1856.",
        "This continuity gives the site unusual depth: church, school and town history developed in parallel rather than as separate institutions.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "A living Hill Country parish with official tours",
      paragraphs: [
        "Unlike many rural churches where access can be uncertain, St. Mary's publishes visitor information and recurring Sunday tours. TexasDefined should treat that current parish guidance as the preferred source for planning a visit.",
      ],
    },
  ],
  recordNotes: [
    "National Register reference 83003143; listed June 21, 1983.",
    "The parish currently gives the church address as 304 W. San Antonio St.; historic-register data lists 306 W. San Antonio. Use the current parish address for navigation and retain the historic-register address in designation notes if needed.",
  ],
  sources: [
    { label: "St. Mary's Fredericksburg — official history", url: "https://church.stmarysfbg.com/history", tier: "official", use: "1846 parish history, Marienkirche, 1908 church and current guided tours" },
    { label: "St. Mary's Fredericksburg — visitor information", url: "https://church.stmarysfbg.com/out-of-town-visitors", tier: "official", use: "current Sunday tour schedule and visitor guidance" },
    { label: "Texas Historical Commission — National Register record", url: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003143", tier: "historic-register", use: "Gothic Revival classification, Dielmann/Wagner attribution and designation" },
  ],
};

const sweetHome: PaintedChurchResearchDossier = {
  slug: "sweet-home-queen-of-peace",
  researchSummary: "Queen of Peace at Sweet Home is a Lavaca County painted church whose 1918-19 brick architecture, polychrome masonry, stained glass and interior marbling/stenciling make the exterior and interior equally important to understanding the site.",
  lookFor: [
    { label: "Polychrome brickwork", detail: "The exterior uses contrasting buff, gray, green and red brick, including Greek-cross and checkerboard patterns; the decorative impulse begins before you enter." },
    { label: "Lancet windows", detail: "Large stained-glass lancets and the tower wheel window introduce Gothic vocabulary into an otherwise stylistically difficult-to-label building." },
    { label: "Marbling", detail: "Interior faux-marble work creates richer apparent materials and belongs to the same decorative-painting tradition seen elsewhere in the statewide nomination." },
    { label: "Stenciling and freehand work", detail: "The historic record describes a combination of controlled repeated pattern and freehand painting, useful for comparing methods within one sanctuary." },
  ],
  interpretation: [
    {
      heading: "A church whose exterior is already decorative",
      paragraphs: [
        "National Register-derived descriptions emphasize the patterned brickwork, corbel tables, contrasting colors and lancet openings. That makes Sweet Home unusually useful for showing that the 'painted churches' can express ornament through masonry, stained glass and paint together.",
        "The building was erected in 1918 and dedicated in 1919, with Vincent Falbo and M. Deodati associated with construction. The same builders later worked at Shiner, linking two Lavaca County churches through craftsmen as well as geography.",
      ],
    },
    {
      heading: "Storm damage is part of the modern appearance",
      paragraphs: [
        "Local marker reporting documents a 1967 tornado that destroyed the original eight-sided spire and severely damaged the church. The present exterior should therefore be read with that repair history in mind rather than assumed to reproduce every 1918 detail exactly.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "Czech and Moravian Catholic settlement in Lavaca County",
      paragraphs: [
        "The Sweet Home congregation emerged from the same broad Czech and Moravian Catholic settlement pattern that produced multiple ornate churches in Lavaca and Fayette counties. The parish's progression from makeshift worship space to a substantial brick church mirrors growing stability and population.",
      ],
    },
  ],
  recordNotes: [
    "National Register reference 83003149; listed June 21, 1983.",
    "Historic documentation associates Vincent Falbo and M. Deodati with the building.",
  ],
  sources: [
    { label: "National Park Service — Texas National Register list", url: "https://www.nps.gov/state/tx/list.htm?program=all", tier: "historic-register", use: "federal listing confirmation" },
    { label: "Texas Historical Commission — statewide decorative-interior listing", url: "https://atlas.thc.texas.gov/AdvancedSearch/MPS?mpsid=12", tier: "official", use: "thematic-list membership" },
    { label: "National Register nomination-derived architectural description", url: "https://www.flickr.com/photos/145229933@N08/31166962840/", tier: "local", use: "brickwork, windows and exterior description transcribed from the nomination" },
  ],
};

const stMarysLavaca: PaintedChurchResearchDossier = {
  slug: "st-marys-immaculate-conception-lavaca",
  researchSummary: "Immaculate Conception at St. Mary's is one of the quieter entries in the formal statewide group, but its Late Gothic Revival classification and long period of significance make it especially valuable for documenting how decorative church interiors evolved over time rather than in a single campaign.",
  lookFor: [
    { label: "Late Gothic Revival form", detail: "Use the architecture as the first interpretive layer; federal and state records classify the building within the Gothic Revival tradition." },
    { label: "Decorative chronology", detail: "The National Register spans both 1875-1899 and 1925-1949 periods, suggesting that building history and significant later decorative work should be distinguished rather than forced into one date." },
    { label: "Rural parish setting", detail: "The church's landscape and isolation are part of the experience and help explain why such elaborate interiors mattered as community focal points." },
  ],
  interpretation: [
    {
      heading: "A site where chronology matters more than a famous nickname",
      paragraphs: [
        "The National Register lists the church under the statewide decorative-interior theme and identifies Late Gothic Revival architecture. Its periods of significance include both the late nineteenth century and 1925-1949.",
        "Because easily accessible public sources provide less detailed artist and iconography documentation than for High Hill or Umbarger, TexasDefined should make that documentary limit visible and build outward only from archival or parish evidence.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "Why lesser-known churches belong in a comprehensive guide",
      paragraphs: [
        "A reference-grade statewide collection cannot simply repeat the most photographed Schulenburg loop. St. Mary's matters precisely because it is part of the formal historic theme yet remains less documented in popular tourism coverage.",
      ],
    },
  ],
  recordNotes: [
    "National Register reference 83003150; listed June 21, 1983.",
    "Do not confuse this Lavaca County church with Immaculate Conception at Panna Maria or similarly named Texas parishes.",
    "Artist names and specific painted scenes should remain unassigned until supported by a nomination, parish archive or other church-specific source.",
  ],
  sources: [
    { label: "National Park Service — Texas National Register list", url: "https://www.nps.gov/state/tx/list.htm?program=all", tier: "historic-register", use: "federal listing confirmation" },
    { label: "Texas Historical Commission — statewide decorative-interior listing", url: "https://atlas.thc.texas.gov/AdvancedSearch/MPS?mpsid=12", tier: "official", use: "thematic-list membership" },
  ],
};

const shiner: PaintedChurchResearchDossier = {
  slug: "shiner-saints-cyril-methodius",
  researchSummary: "Shiner's Saints Cyril and Methodius is a major Lavaca County landmark where Czech and German parish history, Romanesque Revival architecture, Munich stained glass, a monumental Gethsemane mural and repeated twentieth-century restoration campaigns can all be documented from parish and state records.",
  lookFor: [
    { label: "Gethsemane mural", detail: "A large image of Christ in the Garden of Gethsemane overlooks the altar and is one of the parish's most clearly documented interior focal points." },
    { label: "Munich stained glass", detail: "The THC marker identifies stained glass imported from Munich; compare its color and narrative role with the painted surfaces." },
    { label: "Arcaded front and tower", detail: "The Romanesque Revival exterior uses an arcaded portico, square tower and octagonal spire, providing a very different architectural frame from Gothic High Hill." },
    { label: "Restoration layers", detail: "The parish records repairs in 1954, stained-glass work in 1972-73 and a major interior renovation in 1995, so the current sanctuary is a carefully maintained historic interior rather than an untouched time capsule." },
  ],
  interpretation: [
    {
      heading: "From mission church to regional landmark",
      paragraphs: [
        "The parish history traces Czech and German Catholics to an 1890 mission and an 1891 frame church. A tornado shifted that building off its foundation in 1892. After the parish became independent in 1912, rapid growth led to the present church, constructed in 1920-21.",
        "The THC marker credits architect F. Wahrenburger, while the National Register record also associates V. Falbo and M. Deodati with the project. Volunteer labor led by Father F. X. Wolf is part of the parish's own account.",
      ],
    },
    {
      heading: "A documented preservation timeline",
      paragraphs: [
        "The parish's unusually detailed history records a 1954 repair campaign, stained-glass and steeple work in the early 1970s, and a four-month interior renovation in 1995 in which walls were repainted and sealed, pews repaired and stained, and statues touched up.",
        "Publishing that timeline helps visitors distinguish original design significance from later conservation and repainting—an essential distinction for serious painted-church interpretation.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "Patron saints tied to Slavic identity",
      paragraphs: [
        "The parish was named for Cyril and Methodius, missionaries associated with the Christianization and literary culture of Slavic peoples. In a Czech and Moravian immigrant community, that dedication carried cultural as well as devotional meaning.",
      ],
    },
  ],
  recordNotes: [
    "National Register reference 83003151; listed June 21, 1983.",
    "The parish currently gives its address as 306 S. Avenue F; the historic register lists 100 St. Ludmilla St. Preserve both in source notes rather than treating the difference as an error without further parcel research.",
  ],
  sources: [
    { label: "Saints Cyril and Methodius — official parish history", url: "https://sscmshiner.org/our-history", tier: "official", use: "mission history, construction, Gethsemane mural and restoration chronology" },
    { label: "Saints Cyril and Methodius — historical marker page", url: "https://sscmshiner.org/historical-marker", tier: "official", use: "Romanesque features, Munich stained glass and historic designation" },
    { label: "Texas Historical Commission — National Register record", url: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003151", tier: "historic-register", use: "architectural classification, attribution and statewide significance" },
  ],
};

const serbin: PaintedChurchResearchDossier = {
  slug: "serbin-st-paul-lutheran-church",
  researchSummary: "St. Paul Lutheran at Serbin is inseparable from the Wendish migration story: the church stands at the heart of the first major Wendish settlement in Texas and preserves a distinctive Lutheran interior centered on a balcony-level pulpit rather than the altar-focused arrangement of the Catholic churches.",
  lookFor: [
    { label: "Balcony-level pulpit", detail: "The elevated pulpit is the most important spatial clue to the church's Lutheran worship tradition and differs sharply from Catholic sanctuary organization." },
    { label: "Two-level interior", detail: "Read the galleries and pulpit together as a congregation-focused room designed for preaching, hearing and communal worship." },
    { label: "Painted decorative fields", detail: "The ornament should be interpreted within a Lutheran rather than Catholic devotional program; avoid importing Catholic iconographic assumptions." },
    { label: "Settlement landscape", detail: "The church site, cemetery and surrounding Serbin heritage landscape belong to the same story of Wendish settlement and religious liberty." },
  ],
  interpretation: [
    {
      heading: "A church at the center of the Wendish Texas story",
      paragraphs: [
        "Texas Historical Commission markers identify Serbin as the settlement established in 1854 under Rev. John Kilian by roughly 588-600 Wends seeking religious liberty. The settlement became a trilingual Wendish-German-English community.",
        "That background is indispensable for reading St. Paul: its significance is not simply visual novelty. The church is a material record of a small Slavic Protestant culture establishing institutions in Texas while negotiating language, religion and assimilation.",
      ],
    },
    {
      heading: "Why the interior should not be interpreted like a Catholic painted church",
      paragraphs: [
        "Serbin's spatial emphasis on preaching and congregational hearing reflects Lutheran worship priorities. The elevated pulpit and gallery arrangement are therefore not eccentric decorative features but part of the church's theological and liturgical organization.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "Religious liberty, language and a bypassed town",
      paragraphs: [
        "The 1969 THC marker describes Serbin as a thriving nineteenth-century community with stores, doctors, dentists and craftspeople before railroad routes bypassed the settlement and contributed to decline after about 1890.",
        "The church's survival gives modern visitors a rare physical anchor for a community whose commercial center largely faded while its religious and cultural memory endured.",
      ],
    },
  ],
  recordNotes: [
    "St. Paul is a Recorded Texas Historic Landmark; THC marker 8175 is an RTHL medallion record.",
    "Serbin's 1854 settlement history is independently documented by multiple THC markers.",
  ],
  sources: [
    { label: "Texas Historical Commission — St. Paul Lutheran Church", url: "https://atlas.thc.texas.gov/Details/5287008175", tier: "official", use: "RTHL designation and location" },
    { label: "Texas Historical Commission — Serbin 1936 marker", url: "https://atlas.thc.texas.gov/Details/5507016066", tier: "official", use: "1854 Wendish settlement and Rev. John Kilian" },
    { label: "Texas Historical Commission — Serbin 1969 marker", url: "https://atlas.thc.texas.gov/Details?atlasnumber=5287008176&fn=print", tier: "official", use: "trilingual community, population history and railroad bypass" },
  ],
};

const pannaMaria: PaintedChurchResearchDossier = {
  slug: "panna-maria-immaculate-conception",
  researchSummary: "Immaculate Conception at Panna Maria is one of the most nationally significant cultural sites in the collection because it anchors what Texas Historical Commission markers identify as the oldest permanent Polish colony and oldest Polish parish in the United States.",
  lookFor: [
    { label: "1877 church and tower", detail: "The THC marker identifies the present church as the 1877 building with a 100-foot tower, rebuilt after the earlier parish church was lost." },
    { label: "Polish devotional identity", detail: "Read the church within the community's Upper Silesian and Polish Catholic heritage rather than as a generic Victorian Texas church." },
    { label: "Historic interior layers", detail: "The building was remodeled in 1937, so separate nineteenth-century fabric from later changes when interpreting visible decorative work." },
    { label: "Settlement oak and church landscape", detail: "The nearby first-Mass tradition under an oak tree and surrounding historic resources make the church part of a larger settlement landscape." },
  ],
  interpretation: [
    {
      heading: "The church is the anchor of a migration story",
      paragraphs: [
        "The THC Panna Maria marker describes settlers from Upper Silesia and Krakow who arrived in 1854 under Father Leopold Moczygemba, traveled inland from Galveston and celebrated Midnight Mass on December 24 beneath an oak at the new settlement.",
        "The church therefore carries national ethnic-history significance beyond its decorative interior. It is part of the institutional core of the earliest permanent Polish colony in the United States.",
      ],
    },
    {
      heading: "Rebuilding and continuity",
      paragraphs: [
        "The Immaculate Conception marker records a first building in 1855 and the present church in 1877, later remodeled in 1937. That chronology should frame any discussion of paint, furnishings or architectural fabric because the visible church incorporates multiple generations of parish history.",
      ],
    },
  ],
  communityContext: [
    {
      heading: "Upper Silesian building traditions in Texas",
      paragraphs: [
        "Other THC markers at Panna Maria document Upper Silesian domestic-building traditions and local stone masonry, reinforcing that the church belongs to a broader transplanted cultural landscape rather than standing alone as an isolated monument.",
      ],
    },
  ],
  recordNotes: [
    "THC identifies the parish as the oldest Polish parish in America and the settlement as the oldest permanent Polish colony in America.",
    "Recorded Texas Historic Landmark; present church built 1877 and remodeled 1937 according to the marker.",
  ],
  sources: [
    { label: "Texas Historical Commission — Immaculate Conception Church marker", url: "https://atlas.thc.texas.gov/Details/5255002619", tier: "official", use: "parish primacy, 1855 first building, 1877 church and 1937 remodeling" },
    { label: "Texas Historical Commission — Panna Maria marker", url: "https://atlas.thc.texas.gov/Details?atlasnumber=5255006074&fn=print", tier: "official", use: "1854 migration, first Mass and oldest permanent Polish colony context" },
    { label: "Texas Historical Commission — John Gawlik House marker", url: "https://atlas.thc.texas.gov/Details/5507017888", tier: "official", use: "Upper Silesian building traditions and local stonemason context" },
  ],
};

export const statewidePaintedChurchResearchDossiers: Record<string, PaintedChurchResearchDossier> = {
  [wallis.slug]: wallis,
  [wesley.slug]: wesley,
  [amarillo.slug]: amarillo,
  [umbarger.slug]: umbarger,
  [paris.slug]: paris,
  [lindsay.slug]: lindsay,
  [fredericksburg.slug]: fredericksburg,
  [sweetHome.slug]: sweetHome,
  [stMarysLavaca.slug]: stMarysLavaca,
  [shiner.slug]: shiner,
  [serbin.slug]: serbin,
  [pannaMaria.slug]: pannaMaria,
};

export function statewidePaintedChurchResearchBySlug(slug: string) {
  return statewidePaintedChurchResearchDossiers[slug];
}
