/** Source-led editorial depth for Dallas Black heritage destinations.
 * Researched 2026-10-12; never silently refresh review dates.
 * Historical claims use public agency, education, preservation, and archaeology records.
 */
export type DallasHeritageSection = { heading: string; paragraphs: string[] };
export type DallasHeritageFaq = { question: string; answer: string };
export type DallasHeritageSource = { label: string; url: string; supports: string };
export type DallasHeritageProfile = {
  slug: string;
  shortName: string;
  period: string;
  focus: string;
  visitType: string;
  reviewFrequency: "monthly" | "quarterly";
  sections: DallasHeritageSection[];
  faqs: DallasHeritageFaq[];
  sources: DallasHeritageSource[];
};
export const dallasBlackHistoryResearch: DallasHeritageProfile[] = [
  {
    slug: "african-american-museum-dallas-fair-park", shortName: "African American Museum Dallas",
    period: "1970s–present, with collections reaching much farther back", focus: "Black art, material culture and the North Dallas Freedmen's Town",
    visitType: "Museum; check exhibitions, Fair Park access and group reservations", reviewFrequency: "monthly",
    sections: [
      { heading: "An art collection is also an archive of community memory", paragraphs: [
        "Dallas's African American Museum in Fair Park preserves artistic expression and historical evidence that conventional civic narratives have too often neglected. Objects can reveal migration, religion, work, family, political choices and aesthetic practices as effectively as written chronicles. Unlike a general art-gallery visit, studying the museum's folk-art material rewards attention to the people, materials and communities behind the work.",
        "The Billy R. Allen Folk Art Collection is a distinctive reason to research this museum beyond its temporary exhibitions. Its relationship to the larger story of Black folk art deserves documentation from the museum's own collections materials rather than unsupported rankings or changing object-count claims. Visitors should confirm which portions of any collection are actually on view before planning a trip around individual objects."
      ] },
      { heading: "Facing the Rising Sun links Fair Park to Freedman's Cemetery", paragraphs: [
        "Facing the Rising Sun interprets the North Dallas Freedmen's Town and the historic burial landscape at Freedman's Cemetery. The subject extends beyond archaeology: the people whose graves were threatened helped build Dallas neighborhoods, families, congregations and businesses. The cemetery's damaged terrain and later memorial illustrate how preservation work can recover histories that urban infrastructure obscured.",
        "The museum and cemetery are separate stops. The cemetery is an outdoor site of remembrance near North Central Expressway; the Fair Park galleries supply historical interpretation and artifacts. A photograph of the museum exhibition should never be captioned as a photograph of the cemetery itself."
      ] },
      { heading: "What visitors and researchers should verify", paragraphs: [
        "Admissions, exhibitions and parking are time-sensitive. The museum's operator gives official visiting guidance, including typical free individual admission and restrictions for larger organized groups. Fair Park has event-specific entry and parking rules that can differ from the museum's ordinary arrangements. Treat a dated show notice as archival context when its run has ended.",
        "For independent research, pair museum material with Dallas city landmark records and TxDOT's cemetery archaeology. That combination links collections to named places and documented institutions rather than relying on a generic summary of African American history."
      ] }
    ],
    faqs: [
      { question: "Is the African American Museum Dallas in Fair Park?", answer: "Yes. The museum is at 3536 Grand Avenue inside Fair Park; confirm the appropriate gate and parking arrangements for your visit." },
      { question: "Is general admission free?", answer: "The museum ordinarily describes individual general admission as free. Organized groups, special programs and event-day access can have separate rules; check the official visitor page." },
      { question: "Is Facing the Rising Sun about the same place as Freedman's Cemetery?", answer: "It is an interpretive exhibition about the North Dallas Freedmen's Town and cemetery; the cemetery and its memorial are at a different location." },
      { question: "Can I see every object in the Billy R. Allen collection?", answer: "No promise of that is warranted. Museum collection holdings and objects currently exhibited are different things; ask the operator which galleries are on view." }
    ],
    sources: [
      { label: "African American Museum, Dallas — Plan Your Visit", url: "https://aamdallas.org/plan-your-visit/", supports: "Admissions, reservations, location, visitor access" },
      { label: "Texas Historical Commission — Dallas African American History Sites", url: "https://thc.texas.gov/blog/discover-these-8-african-american-history-sites-dallas", supports: "Museum's historical context and local heritage network" },
      { label: "Texas Department of Transportation — Freedman's Cemetery exhibit", url: "https://www.dot.state.tx.us/ENV/pdf/envisionpdf/19Fall00.pdf", supports: "Archaeological interpretation and Facing the Rising Sun exhibit" },
    ]
  },
  {
    slug: "booker-t-washington-high-school-dallas", shortName: "Booker T. Washington Arts High School",
    period: "1892–present", focus: "Education under segregation and arts education since 1976",
    visitType: "Operating public high school; public performances and authorized tours only", reviewFrequency: "monthly",
    sections: [
      { heading: "A timeline that must begin before the arts magnet", paragraphs: [
        "1892: Dallas Colored High School served Black pupils denied equal access to white schools. 1922: Booker T. Washington opened its purpose-built high-school building. 1955: vocational training space expanded. 1976: a desegregation court order and magnet strategy brought a new performing- and visual-arts mission. 2006–09: the historic building was renovated alongside new arts facilities.",
        "Those dates describe changing institutions within one site. They should not be collapsed into a simple claim that an arts magnet opened in 1922: the school was founded in a segregated system and acquired its contemporary arts mission much later."
      ] },
      { heading: "The physical school is evidence of unequal opportunity and community achievement", paragraphs: [
        "During segregation, demand for schooling outpaced the facilities Dallas supplied to Black students. Booker T. Washington became a place of education, community activity and shared ambition despite those constraints. Its remaining original fabric is valuable because it was used by generations whose opportunities were sharply restricted.",
        "The contemporary building complex demonstrates an unusual combination of preservation and adaptation. Dallas ISD's dedication materials explain that historic hallways and classrooms were renovated while a large new wing provided spaces for dance, theatre, music and visual arts. The older structure should be interpreted with the newer one, not replaced in the historical narrative by an alumni list."
      ] },
      { heading: "Planning a legitimate educational visit", paragraphs: [
        "Check the school's event calendar or performance ticketing for opportunities to see student art. Family and prospective-student tours use the school's separate published procedures. There is no general permission to photograph minors, enter classrooms, or walk the property simply because the building is historic.",
        "The church across the street, St. Paul United Methodist, offers a second chronology of Black institution building; both sites can be understood from the public Arts District streetscape before choosing an authorized indoor event."
      ] }
    ],
    faqs: [
      { question: "When did the original Booker T. Washington school open?", answer: "The historic Dallas school building opened in 1922; the predecessor Dallas Colored High School dates to 1892." },
      { question: "When did it become a performing and visual arts magnet?", answer: "Dallas ISD ties the magnet conversion to the 1976 desegregation plan." },
      { question: "Can tourists walk into classrooms?", answer: "No. This is an active public school. Use authorized campus visits or advertised public programs and follow school visitor rules." },
      { question: "Are public performances offered?", answer: "The school publishes an activities calendar and performance-ticket information. Specific times and ticket requirements change with each production." }
    ],
    sources: [
      { label: "Dallas ISD — School History", url: "https://btwhspva.dallasisd.org/about/about-booker-t/school-history", supports: "School history and 1976 arts magnet" },
      { label: "Dallas ISD — 2009 Dedication", url: "https://www2.dallasisd.org/inside_disd/calendardata_sw/news_releases/1242838112.html", supports: "Historic renovation, arts additions and original school fabric" },
      { label: "Dallas ISD — Visiting Campus", url: "https://btwhspva.dallasisd.org/applying-auditioning/visiting-campus", supports: "Current visitor arrangements" },
      { label: "Dallas ISD — Events", url: "https://btwhspva.dallasisd.org/activities", supports: "Public programs and performances" },
    ]
  },
  {
    slug: "deep-ellum", shortName: "Deep Ellum Historic District",
    period: "1872–present", focus: "Black commerce, railroad labor, blues, jazz and creative industries",
    visitType: "Lived-in neighborhood and entertainment district; accessible public streets", reviewFrequency: "monthly",
    sections: [
      { heading: "Railroads, migration and a Black commercial center", paragraphs: [
        "The Houston and Texas Central Railroad reached Dallas in 1872, followed by the Texas and Pacific in 1873. Their crossing created work, new street life, boarding houses, services and commerce. Deep Ellum, a dialect rendering of Deep Elm, grew as a mixed neighborhood with important African American commercial and musical activity.",
        "History should not begin and end at modern murals. Black entrepreneurs, railroad workers, artists and residents helped establish the area's identity long before its contemporary bars and restaurants. Deep Ellum was also an intercultural place in which Black, Jewish, immigrant and other communities lived and worked in close proximity."
      ] },
      { heading: "The music network: churches, streets, theatres and recording", paragraphs: [
        "Blind Lemon Jefferson's Dallas performances, connections with Huddie 'Lead Belly' Ledbetter, Blind Willie Johnson's sacred blues and the presence of other touring musicians place Deep Ellum inside the national history of blues and early recorded music. The cultural influence came from social networks—jobs, travel, performance spaces and audiences—as much as from any surviving single club.",
        "Music histories sometimes group performers from different decades together as if they shared one fixed 1920s lineup. Instead, distinguish the region's longer blues history, documented Deep Ellum performances, and later musicians who drew on that inheritance. The district's own history project and Texas Historical Commission records provide a better starting point than a generic nightlife list."
      ] },
      { heading: "From decline to nationally recognized historic district", paragraphs: [
        "Deep Ellum later experienced disinvestment, redevelopment and successive creative revivals. Its role as a blues center coexists with later punk, rock, contemporary art and cultural businesses. Recognition as a Texas Cultural District in 2020 and National Register historic district in 2023 acknowledges a much wider history than a typical night out.",
        "Look for streets, storefront proportions, old industrial structures and historic markers by daylight; check the Deep Ellum Foundation for updated walking and event guidance. The National Register nomination is the best available structured primary resource for researchers who want precise preservation boundaries and architectural inventory."
      ] }
    ],
    faqs: [
      { question: "Why is it called Deep Ellum?", answer: "The name evolved from Deep Elm, shaped by local speech and the district's position beyond the old downtown core along Elm Street." },
      { question: "When did Deep Ellum begin?", answer: "Its commercial-neighborhood origin is linked to railroad development in 1872 and 1873; the area changed continuously afterward." },
      { question: "Was Deep Ellum a Black neighborhood?", answer: "It was a significant center of Black commerce, residents and musical culture within a diverse area shaped by railroads and migrants." },
      { question: "Is it a National Register historic district?", answer: "Yes. The district was listed in 2023. A National Register designation does not mean every storefront or venue is individually protected or open to the public." }
    ],
    sources: [
      { label: "Deep Ellum Foundation — District History", url: "https://www.deepellumtexas.com/history/", supports: "Railroads, migration, music and designations" },
      { label: "Texas Historical Commission — National Register nomination", url: "https://atlas.thc.texas.gov/NR/pdfs/100009082/100009082.pdf", supports: "2023 historic district and significance evidence" },
      { label: "Texas Historical Commission — Leadbelly marker", url: "https://atlas.thc.texas.gov/Details/5507016121/print", supports: "Blind Lemon Jefferson and Lead Belly Dallas connection" },
    ]
  },
  {
    slug: "freedmans-cemetery-memorial-dallas", shortName: "Freedman's Cemetery Memorial",
    period: "1860s–present", focus: "North Dallas Freedmen's Town, burials, archaeology, displacement and remembrance",
    visitType: "Outdoor memorial and sacred burial landscape", reviewFrequency: "quarterly",
    sections: [
      { heading: "Two founding dates are present in official records", paragraphs: [
        "The Dallas Office of Historic Preservation says the burial ground was established in 1861. The Texas Historical Commission's African Americans in Texas guide instead calls it dedicated in 1869. The site history therefore requires a qualified chronology rather than printing one unchallenged origin date.",
        "The cemetery served the North Dallas Black community as its population grew following emancipation. Later transportation construction, grading and neglect obscured many visible signs. The historical landscape is not the same as the small surviving memorial footprint."
      ] },
      { heading: "What the archaeological count actually means", paragraphs: [
        "A TxDOT environmental newsletter reports the removal and reburial of the remains of 1,157 individuals from the North Central Expressway right of way. Published archaeological scholarship distinguishes 1,150 excavated burials containing those 1,157 people. The count refers to the studied impact area, not to every person ever buried in the larger cemetery.",
        "Community leaders and descendants pressed for archaeological documentation when new highway construction approached the cemetery. Those interventions show a contested preservation process: recovery of data was important but could not undo the disruption or fully restore original burial contexts."
      ] },
      { heading: "The memorial is a place of remembrance, not a photo stop", paragraphs: [
        "The City of Dallas recognizes Freedman's Cemetery as a landmark, and public artworks help commemorate people whose graves were disturbed or rendered unrecognizable by decades of change. The precise condition of paths, nearby crossings and approach points should be checked before a visit.",
        "A companion visit to the African American Museum at Fair Park can provide context through the Facing the Rising Sun historical interpretation. The museum's exhibition is not physically located at the memorial; any historic exhibition photograph must be labeled accurately."
      ] }
    ],
    faqs: [
      { question: "When was Freedman's Cemetery founded?", answer: "Official sources conflict: the City of Dallas gives 1861, while the Texas Historical Commission's travel guide describes dedication in 1869. The difference needs further archival resolution." },
      { question: "How many burials were excavated?", answer: "Published archaeology reports 1,150 burials containing remains of 1,157 individuals in the highway project's impacted area; this is not a count of all cemetery burials." },
      { question: "Were all the graves moved?", answer: "No. The documented exhumations concerned highway-impact excavation areas, and it would be misleading to claim the entire historic cemetery was moved." },
      { question: "Where is the memorial?", answer: "At the North Central Expressway and Lemmon Avenue corridor in Dallas. Plan a legal, safe pedestrian approach and treat the grounds respectfully." }
    ],
    sources: [
      { label: "Dallas Office of Historic Preservation — Freedman's Cemetery", url: "https://www.dallascityhall.com/departments/sustainabledevelopment/historicpreservation/Pages/freedman_s_cemetery.aspx", supports: "1861 date, North Dallas context, landmark" },
      { label: "Texas Historical Commission — African Americans in Texas", url: "https://www.thc.texas.gov/public/upload/African-Americans-in-Texas-2021.pdf", supports: "1869 dedication, preservation and memorial account" },
      { label: "TxDOT — ENVision Freedman's Cemetery Project", url: "https://www.dot.state.tx.us/ENV/pdf/envisionpdf/19Fall00.pdf", supports: "1,157 individuals, excavation and reburial" },
      { label: "Dallas Parks — Freedman's Cemetery", url: "https://dallasparks.org/766/Freedmans-Cemetery", supports: "Current public remembrance and memorial setting" },
      { label: "Dallas Parks — Freedman's Memorial Cemetery photo gallery", url: "https://dallasparks.org/Facilities/Facility/Details/Freedmans-Memorial-Cemetery-769", supports: "Official photographs showing the actual memorial entrance, artworks and plaza; these are not the Fair Park museum-exhibition photo" }
    ]
  },
  {
    slug: "juanita-craft-civil-rights-house-dallas", shortName: "Juanita J. Craft Civil Rights House",
    period: "1930s–1980s organizing; reopened as museum in 2023", focus: "Dallas NAACP history, civic organizing and youth mentorship",
    visitType: "Historic-house museum; schedule entry through the operator", reviewFrequency: "monthly",
    sections: [
      { heading: "A network-builder, not merely a local symbol", paragraphs: [
        "Juanita Craft joined the NAACP in 1935 and was instrumental in building chapters across rural Texas. Sources differ on the exact chapter total: the City of Dallas cultural-venue text says 182, while Texas Historical Commission visitor literature uses 185. This guide avoids passing off either as an uncontested precise statistic.",
        "Craft's activism crossed many issues: access to education, public accommodations, participation in elections, anti-discrimination work and training of young people. Her later Dallas City Council service extended her influence into municipal government."
      ] },
      { heading: "Why the house matters", paragraphs: [
        "The bungalow at 2618 Warren Avenue was a gathering place where activists, children and notable visitors discussed difficult civic questions. The City of Dallas landmark documentation notes the surrounding neighborhood's experience of racial bombings in the early 1950s, making the home's everyday domestic character all the more significant.",
        "The house is also an architectural and neighborhood resource, connected to the Wheatley Place Historic District. Its restoration and museum use allow visitors to encounter civil-rights organizing through the lived space of a central Dallas figure rather than only through photographs of public speeches. The original construction year is not settled in the public institutional record: the City of Dallas landmark summary describes a 1930 bungalow, Preservation Texas gives 1926, and a City of Dallas January 2026 report gives 1925. We present the disagreement rather than silently selecting a single date."
      ] },
      { heading: "How to plan a visit", paragraphs: [
        "The Dallas Office of Arts and Culture reports the house reopened to the public in May 2023 and describes docent-guided tours at noon, 2 p.m. and 4 p.m. Tuesday through Saturday in its visitor materials. These are published operator hours, not an assurance that a particular tour is currently bookable. Confirm an appointment, groups, and accessibility directly before traveling.",
        "For visits, the City of Dallas Office of Arts and Culture and the Friends of Juanita Craft House direct visitors to call 214-670-3687; tours are by appointment and posted 2023 time slots should not be assumed current. For deeper reading, the City's landmark nomination and Preservation Texas rehabilitation records complement museum interpretation. The home belongs within Dallas civil-rights history alongside, but distinct from, Queen City Heights and Wheatley Place."
      ] }
    ],
    faqs: [
      { question: "Where is Juanita Craft's house?", answer: "2618 Warren Avenue in the Wheatley Place area of South Dallas—not the separate Juanita J. Craft Center on Spring Avenue." },
      { question: "Is the house a museum today?", answer: "Yes. The City of Dallas Office of Arts and Culture reports a May 2023 reopening as a museum and offers information about docent-guided visits." },
      { question: "Can I visit without a reservation?", answer: "Do not assume walk-in entry. Check the museum's current tour scheduling with the City of Dallas or South Dallas Cultural Center." },
      { question: "How many NAACP chapters did Craft organize?", answer: "Official summaries differ: Dallas's venue page says 182 rural chapters, while the Texas Historical Commission reports 185. We note the discrepancy rather than assert one exact total." },
      { question: "When was Juanita Craft's house built?", answer: "Official accounts conflict: a City of Dallas preservation page says 1930, Preservation Texas says 1926, and the City's January 2026 report says 1925. The historical significance and address are well documented; the precise construction year is not consistent across these sources." }
    ],
    sources: [
      { label: "City of Dallas Office of Arts and Culture — Craft House", url: "https://dallasculture.org/cultural-venues/juanita-craft-house/", supports: "Museum history, tours and official visitor information" },
      { label: "Friends of Juanita Craft House — Tour arrangements", url: "https://friendsofjuanitacraft.org/house/", supports: "Appointment-only visitor arrangements and City of Dallas arts-and-culture phone contact" },
      { label: "City of Dallas — Craft Home Landmark Record", url: "https://www.dallascityhall.com/departments/sustainabledevelopment/historicpreservation/Pages/Juanita-Craft-House.aspx", supports: "Warren Avenue history and designation" },
      { label: "City of Dallas — Landmark Nomination", url: "https://www.dallascityhall.com/departments/sustainabledevelopment/historicpreservation/HP%20Documents/Landmark%20Structures/Juanita%20Craft%20House%20Landmark%20Nomination.pdf", supports: "Primary designation dossier and historic place evidence" },
      { label: "Preservation Texas — 2025 Rehabilitation Award", url: "https://www.preservationtexas.org/honor-awards/juanita-craft-house", supports: "2025 rehabilitation, accessibility improvements, museum interpretation and reported 1926 construction date" },
      { label: "City of Dallas — January 2026 Historic Report", url: "https://dallas.gov/departments/sustainabledevelopment/historicpreservation/HP%20Documents/FINAL%20Dallas%20Report_January%202026.pdf", supports: "Official 2026 city report listing a 1925 construction date for the Craft bungalow; source disagrees with other city and preservation summaries" },
      { label: "Texas Historical Commission — Eight Dallas sites", url: "https://thc.texas.gov/blog/discover-these-8-african-american-history-sites-dallas", supports: "Activism context and differing rural chapter figure" }
    ]
  },
  {
    slug: "st-paul-united-methodist-church-dallas", shortName: "St. Paul United Methodist Church",
    period: "1873–present", focus: "Black Methodist community and historic architecture in the Arts District",
    visitType: "Active congregation; worship and announced programs", reviewFrequency: "monthly",
    sections: [
      { heading: "A congregation precedes its brick sanctuary", paragraphs: [
        "St. Paul's African American Methodist congregation began in 1873. Its role in Dallas's post-emancipation social and spiritual life long predates the Arts District's modern museum and performance complexes. The congregation therefore occupies a different historical category from a modern landmark preserved only for tourism.",
        "The structure's construction chronology varies in public institutional sources: the City of Dallas says work began in 1901 and was finished in 1924; a Texas Historical Commission travel guide cites a completed building in 1927. The beginning of construction, reported completion dates, and founding of the congregation should be discussed separately."
      ] },
      { heading: "Reading the building carefully", paragraphs: [
        "Brickwork, ornamental stone, tall arches and stained glass make the surviving sanctuary visually distinctive. The City describes Gothic and Victorian architectural influences; those observations provide a more disciplined basis than an unsupported claim that it simply imitates Renaissance churches.",
        "The landmark record, Texas state historic markers and the congregation's history together establish the building's significance. Any description of an archaeological display or recurring concert series should be checked with the church before describing it as currently available."
      ] },
      { heading: "Responsible access and neighboring history", paragraphs: [
        "St. Paul remains a house of worship. Respect services, ceremonies, privacy, and any limits on taking photographs; obtain permission for group visits. Availability of accessible entrances and facilities should be confirmed with the congregation rather than inferred from the historic exterior.",
        "Across the way, Booker T. Washington's school opened in 1922 to educate Black students in segregated Dallas. Together the buildings tell an unusually concentrated story of educational, religious and community institutions on the streets of today's Arts District."
      ] }
    ],
    faqs: [
      { question: "When was the St. Paul congregation founded?", answer: "1873, according to the Texas Historical Commission's African Americans in Texas material." },
      { question: "When was the church building completed?", answer: "Official references disagree: Dallas gives 1924 after construction began in 1901, while a Texas Historical Commission guide gives 1927." },
      { question: "Can I tour the church any day?", answer: "No regular walk-in tourist access is verified. Check the congregation's published worship, visitor and event arrangements." },
      { question: "What is across from the church?", answer: "Booker T. Washington High School for the Performing and Visual Arts, whose historic school building dates to 1922." }
    ],
    sources: [
      { label: "City of Dallas — St. Paul Methodist Church Landmark Record", url: "https://dallascityhall.com/departments/sustainabledevelopment/historicpreservation/Pages/st_paul_methodist_church.aspx", supports: "Architecture, 1901–24 construction and landmark designations" },
      { label: "Texas Historical Commission — African Americans in Texas", url: "https://www.thc.texas.gov/public/upload/African-Americans-in-Texas-2021.pdf", supports: "1873 congregation and alternative 1927 completion" },
      { label: "St. Paul UMC — Congregation", url: "https://stpaulumcdallas.org/", supports: "Current active church and visit questions" }
    ]
  },
  {
    slug: "queen-city-heights-historic-district-dallas", shortName: "Queen City Heights",
    period: "Reconstruction–20th century", focus: "Working-class Black settlement and neighborhood architecture",
    visitType: "Occupied residential historic district; public sidewalks and Exline Park", reviewFrequency: "quarterly",
    sections: [
      { heading: "From rural settlement to South Dallas neighborhood", paragraphs: [
        "Queen City Heights developed from a Black farming settlement after the Civil War and expanded as Dallas grew. The district's later working-class housing and community networks reflect changing employment opportunities and residential restrictions across South Dallas.",
        "A historic district is defined by a shared landscape over time, not by whether one building achieved individual celebrity. The transition from farming settlement to urban blocks is the central story here."
      ] },
      { heading: "How to identify the architectural record", paragraphs: [
        "Craftsman bungalows and modest vernacular houses—including shotgun forms—mark different phases of neighborhood growth. Comparing porch designs, lot patterns and roof forms from the sidewalk can be more informative than treating the neighborhood as a generic collection of pretty historic houses.",
        "The Texas Historical Commission describes its rough boundaries by Eugene, Cooper, Latimer, Kynard and Dildock. Historic-map and National Register documentation should be consulted for any parcel-level claim, and not every structure inside the district will have the same date or contributing status."
      ] },
      { heading: "Visiting without making a neighborhood into a museum", paragraphs: [
        "Exline Park is a public community space near the historic streets. Plan a modest daytime walk, respect residents' privacy, and avoid drawing unwarranted conclusions from current building conditions about the people who live there.",
        "Queen City Heights and Wheatley Place share a larger South Dallas story but are not synonymous. Juanita Craft's house is associated with Wheatley Place, and the two historic areas should be cross-referenced as separate places."
      ] }
    ],
    faqs: [
      { question: "Where is Queen City Heights?", answer: "In South Dallas, roughly within streets identified by the Texas Historical Commission as Eugene, Cooper, Latimer, Kynard and Dildock." },
      { question: "Is it a museum?", answer: "No. It is an occupied historic residential district whose buildings and street patterns are the primary heritage resources." },
      { question: "What architectural styles should I look for?", answer: "Modest Craftsman bungalows, shotgun and other vernacular houses that reflect working-class neighborhood development." },
      { question: "Is Exline Park part of the visitor experience?", answer: "It is a public neighborhood park near the district, but park facilities and access conditions should be confirmed with Dallas Parks." }
    ],
    sources: [
      { label: "Texas Historical Commission — African Americans in Texas", url: "https://www.thc.texas.gov/public/upload/African-Americans-in-Texas-2021.pdf", supports: "Settlement history, district boundaries and Exline Park" },
      { label: "Texas Historical Commission — Eight Dallas sites", url: "https://thc.texas.gov/blog/discover-these-8-african-american-history-sites-dallas", supports: "Summary of history and neighborhood architecture" },
      { label: "Wikimedia Commons — Licensed Queen City Heights building photograph", url: "https://commons.wikimedia.org/wiki/File:MASS_Building.jpg", supports: "Documented depiction and location of one building in district" }
    ]
  },
  {
    slug: "tenth-street-historic-district-oak-cliff", shortName: "Tenth Street Freedmen's Town",
    period: "Post–Civil War–present", focus: "Freedmen's Oak Cliff community, vernacular architecture and preservation",
    visitType: "Lived-in historic neighborhood; no ticketed general admission", reviewFrequency: "quarterly",
    sections: [
      { heading: "A Black community predates an 1890 plat", paragraphs: [
        "Freed people were settling in the Tenth Street area after the Civil War. Dallas's historic preservation page records Elizabeth Chapel in 1880 and a school established in 1886. T. L. Marsalis's 1890 subdivision plat organized subsequent growth but did not create the community from a blank slate.",
        "Segregation both restricted families' choices and fostered an interconnected neighborhood of institutions and local businesses. Interpret the district through the residents' own community building, not only the decisions of a white land developer."
      ] },
      { heading: "What survives—and what does not", paragraphs: [
        "The district preserves late nineteenth- and early twentieth-century vernacular dwellings including shotgun, double-shotgun and Craftsman forms. Those small buildings can document family, labor and construction history even when they lack grand architectural ornament.",
        "Not every historic church or institution remains in its original building. Highway construction, later demolition and disinvestment erased portions of the historic landscape. Preservation Dallas highlights I-35E's disruptive effect on physical connections and housing in Oak Cliff."
      ] },
      { heading: "The meaning of designation and the visitor's responsibility", paragraphs: [
        "Dallas established a landmark district in 1993; National Register listing followed in 1994. Municipal preservation controls and national recognition are not interchangeable. The City's nomination report, boundaries and contributing-property documents are the place to verify a particular structure's preservation status.",
        "Tenth Street is an occupied neighborhood. Stay on public streets and paths, respect cemetery grounds, avoid intrusive house photography and use the city-preserved documentation to give your visit historical context."
      ] }
    ],
    faqs: [
      { question: "Is Tenth Street the same as North Dallas Freedmen's Town?", answer: "No. Tenth Street is a distinct community in Oak Cliff, while Freedman's Cemetery commemorates the North Dallas Freedmen's Town." },
      { question: "When was the Tenth Street district designated?", answer: "Dallas local historic-district designation was in 1993 and National Register listing in 1994." },
      { question: "What structures are characteristic?", answer: "Modest late nineteenth- and early twentieth-century wood-frame folk houses, including shotgun plans and some Craftsman homes." },
      { question: "Can visitors tour the historic houses?", answer: "They are predominantly private homes; no general public interior access should be assumed." }
    ],
    sources: [
      { label: "City of Dallas — Tenth Street District", url: "https://www.dallascityhall.com/departments/sustainabledevelopment/historicpreservation/Pages/tenth_street.aspx", supports: "District history, structures, maps, 1993 and 1994 designations" },
      { label: "Preservation Dallas — Tenth Street", url: "https://preservationdallas.org/neighborhoods/tenth-street", supports: "Location and folk housing architecture" },
      { label: "Preservation Dallas — Tenth Street Historic District", url: "https://preservationdallas.org/location/tenth-street-historic-district-oak-cliff", supports: "Highway disruption and neighborhood context" },
      { label: "City of Dallas — Landmark districts", url: "https://dallascityhall.com/departments/sustainabledevelopment/historicpreservation/Pages/landmark_districts.aspx", supports: "Historic preservation system" }
    ]
  }
];
export const dallasBlackHistorySlugs = dallasBlackHistoryResearch.map(({slug}) => slug);
export const dallasBlackHistoryFor = (slug: string) => dallasBlackHistoryResearch.find((entry) => entry.slug === slug);
