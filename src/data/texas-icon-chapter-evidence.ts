/**
 * Distinctive, source-checked editorial framing for the public culture
 * chapters. These are interpretive explanations, not duplicated entry blurbs.
 * Reviewed 2026-11-15. Do not claim personal visits or original interviews.
 */
export type ChapterEvidence = {
  title: string;
  introduction: string;
  findings: Array<{ heading: string; paragraphs: string[]; sources: Array<{ label: string; url: string }> }>;
};
export const TEXAS_CHAPTER_EVIDENCE: Record<string, ChapterEvidence> = {
  "food-drink": {
    title: "How geography and migration shaped the Texas table",
    introduction: "These dishes are connected by place, not by a single invented Texas cuisine. The useful questions are who cooked them, where the ingredients came from and how a regional preparation became familiar across the state.",
    findings: [
      {
        heading: "Barbecue and the meat-market economy",
        paragraphs: [
          "Central Texas brisket is not the whole history of Texas barbecue. Cattle raising made beef prominent, while Central European butchers and meat markets helped build a style of slow-cooked meats sold by weight. East Texas barbecue retained stronger Southern traditions, and South Texas barbacoa has its own borderlands history. A plate of brisket, smoked sausage and pickles is therefore evidence of overlapping regional practices, not a statewide rule.",
          "The clearest way to compare a barbecue stop is by its cut, wood, cooking method and regional history rather than declaring one style to be the original Texas barbecue. The broader Texas food and barbecue guides supply regional context; individual restaurants still require independent reporting."
        ],
        sources: [{ label: "TexasDefined: regional barbecue styles", url: "/article/texas-barbecue-styles-explained" }]
      },
      {
        heading: "Texas-born, Texas-adopted and disputed origins",
        paragraphs: [
          "Chicken-fried steak is a Texas staple, but the Handbook of Texas explains that its exact invention story is disputed. The famous Lamesa accident story should be treated as a legend rather than settled fact. The dish belongs on this list because it became central to Texas menus, not because there is a proven single birthplace.",
          "The same distinction matters for tres leches cake, fresh pico de gallo and other dishes shared across Mexico and the American Southwest. Calling a food important to Texas does not mean Texans invented it. Dr Pepper, by contrast, has a specific Waco origin; the cultural comparison becomes richer when the categories stay separate."
        ],
        sources: [{ label: "Handbook of Texas: chicken-fried steak", url: "https://www.tshaonline.org/handbook/entries/chicken-fried-steak" }, { label: "TexasDefined: Dr Pepper's Waco history", url: "/dr-pepper-texas-history" }]
      },
      {
        heading: "Czech baking, border cooking and regional vocabulary",
        paragraphs: [
          "A sweet fruit-or-cheese kolache and a sausage-filled klobasnek are not the same pastry, even though signs and everyday speech sometimes use kolache for both. Explaining the distinction reveals how Central Texas communities preserved immigrant traditions while adapting them to American meat markets and highway travel.",
          "South Texas barbacoa, San Antonio puffy tacos and the breakfast-taco culture of Central and South Texas also belong to different histories. Rather than listing them as interchangeable Tex-Mex, the linked guides explain ingredients, preparation, locally documented origins and disputed claims."
        ],
        sources: [{ label: "TexasDefined: kolaches and klobasneks", url: "/article/kolache-or-klobasnek-texas-story" }, { label: "TexasDefined: San Antonio puffy tacos", url: "/san-antonio-puffy-taco-history" }]
      }
    ]
  },
  "texas-brands": {
    title: "What makes a company a Texas brand?",
    introduction: "A headquarters address, the place where a product was invented, a Texas factory and a loyal Texas audience are four different claims. This chapter concentrates on identifiable businesses and tells readers which connection applies.",
    findings: [
      {
        heading: "Birthplace versus ownership today",
        paragraphs: [
          "H-E-B, Whataburger, Buc-ee's and Dr Pepper are associated with different chapters of business history. Their founding places and early markets are historical facts; today's ownership, organizational structure and store footprints may change. A brand's Texas roots cannot by themselves establish that it is currently Texas-owned or that everything it sells is made here.",
          "In the accompanying origin-story guides, TexasDefined follows the communities and commercial decisions that shaped each company rather than ranking it by nostalgia. This also prevents a famous brand from receiving a misleading claim of statewide manufacturing."
        ],
        sources: [{ label: "TexasDefined: Texas brand origin stories", url: "/texas-brand-origin-stories" }, { label: "TexasDefined: H-E-B history", url: "/article/heb-texas-grocery-history-culture" }]
      },
      {
        heading: "Retail formats are part of cultural history",
        paragraphs: [
          "A Buc-ee's travel center and an H-E-B grocery are not alike in size or business model. They do, however, show how companies responded to particular Texas patterns: long interstate drives, neighborhood shopping routines and customers who expect regional products. Their value as subjects comes from that relationship to place, not promotional claims about being the 'best.'",
          "Working-class brands such as Dickies and Western bootmakers tell another story, one tied to trades, ranch work, manufacturing history and changing fashion. The place where a brand began and the place where particular goods are now produced should be verified separately."
        ],
        sources: [{ label: "TexasDefined: Buc-ee's origins", url: "/article/bucees-texas-road-trip-history" }, { label: "TexasDefined: Made in Texas classifications", url: "/made-in-texas" }]
      },
      {
        heading: "Editorial inclusion is not an advertisement",
        paragraphs: [
          "This chapter lists identifiable companies and retail institutions with documented Texas ties. Generic leather goods, Texas-shaped souvenirs and pecan candy are cultural or product categories rather than brands; they belong elsewhere in the collection. Topo Chico originated in Mexico and is discussed with Texas food and drink because Texas consumption does not change its birthplace.",
          "The selection is not a ranking, endorsement, sponsorship benefit or claim about a product's present quality. Purchasing decisions should use current product information; historic descriptions alone are not customer reviews."
        ],
        sources: [{ label: "TexasDefined: editorial methodology", url: "/things-unique-to-texas/methodology" }, { label: "TexasDefined: regional foods", url: "/things-unique-to-texas/food-drink" }]
      }
    ]
  },
  "natural-wonders": {
    title: "Four very different ways Texas landscapes were made",
    introduction: "The canyon walls of the Panhandle, ancient Permian reef mountains, limestone Hill Country springs and coastal barrier islands do not share a single origin story. Knowing the geology and ecology makes them more distinctive than generic sightseeing descriptions.",
    findings: [
      {
        heading: "Desert mountains are not just empty country",
        paragraphs: [
          "Big Bend National Park covers 801,163 acres according to the National Park Service. In its desert basins, Chisos Mountain woodlands and Rio Grande canyons, climate and elevation change over relatively short distances. A visitor who sees only a desert panorama misses much of the park's biological range.",
          "Guadalupe Mountains National Park illustrates another West Texas story: exposed remnants of a fossil reef system. The two parks are connected by the Chihuahuan Desert but should not be described as interchangeable mountain scenery."
        ],
        sources: [{ label: "NPS: Big Bend park statistics", url: "https://home.nps.gov/bibe/learn/management/statistics.htm" }, { label: "NPS: Big Bend biodiversity", url: "https://home.nps.gov/im/chdn/bibe.htm" }]
      },
      {
        heading: "Limestone country creates springs and sensitive access",
        paragraphs: [
          "Hamilton Pool, Jacob's Well, Barton Springs and Pedernales Falls are linked through Hill Country limestone, aquifers and flowing water, but their water sources, permitted activities and conservation rules differ. It is unsafe to infer that a swimming location is open merely because water is pictured.",
          "TexasDefined's destination guides handle present-day reservations, closures and water-access notices; this chapter explains the physical landscapes. The responsible county, municipal authority or state park remains the source for conditions on the day of a visit."
        ],
        sources: [{ label: "TPWD: state parks", url: "https://tpwd.texas.gov/state-parks/" }, { label: "TexasDefined: Hamilton Pool Preserve", url: "/destination/hamilton-pool-preserve" }]
      },
      {
        heading: "A barrier island, a cypress wetland and a reservoir are not one type of lake",
        paragraphs: [
          "Padre Island National Seashore protects a long Gulf barrier-island landscape where dunes and tidal waters shape habitat. Caddo Lake, on the Texas-Louisiana border, supports a cypress wetland landscape with entirely different water and vegetation. Lake Travis and Canyon Lake are engineered reservoirs whose water levels and access points reflect water management as well as natural topography.",
          "Caddo Mounds is primarily a Caddo archaeological and historical site, not a natural wonder; San Antonio's River Walk is an engineered urban cultural landscape. Those entries appear in the landmarks chapter so the categories do not suggest that an archaeological site or a built river corridor is an untouched natural formation."
        ],
        sources: [{ label: "NPS: Padre Island National Seashore", url: "https://www.nps.gov/pais/index.htm" }, { label: "TexasDefined: Caddo Mounds", url: "/destination/caddo-mounds-state-historic-site" }]
      }
    ]
  },
  "roadside-small-towns": {
    "title": "How to tell a roadside landmark from a useful small-town stop",
    "introduction": "Texas roadside culture ranges from a cowboy-hat Eiffel Tower in Paris to working leather shops, dance halls and desert towns. Named installations make short photo stops, while historic neighborhoods and living communities reward longer visits.",
    "findings": [
      {
        "heading": "The Panhandle is a real, manageable roadside corridor",
        "paragraphs": [
          "Cadillac Ranch is an Ant Farm installation created in 1974 outside Amarillo. Its cars were relocated after the work was created; calling its present position the original Route 66 alignment would misstate the history. The Amarillo visitor bureau locates the installation off the I-40 frontage road west of the city.",
          "For a coherent Panhandle day, pair the Amarillo installation with the city's historic Sixth Street Route 66 district. A separate Panhandle trip can follow the Texas Route 66 corridor through Shamrock's U-Drop Inn, Adrian's MidPoint Café and other towns. Check each attraction's current access separately rather than assuming every roadside object has staff or facilities."
        ],
        "sources": [
          {
            "label": "Visit Amarillo: Cadillac Ranch history and access",
            "url": "https://www.visitamarillo.com/blog/post/cadillac-ranch/"
          },
          {
            "label": "Texas Time Travel: Route 66 roadside heritage",
            "url": "https://texastimetravel.com/plan/trip-ideas/trip-ideas-roadside-heritage/"
          }
        ]
      },
      {
        "heading": "Paris, Texas offers more than a novelty photograph",
        "paragraphs": [
          "Paris's 65-foot Eiffel Tower with a cowboy hat stands outside the Love Civic Center at 2025 South Collegiate Drive. The local visitor organization also identifies the adjacent Red River Valley Veterans Memorial and Trail de Paris. Those nearby places make this a more useful town stop than treating the sculpture as a destination requiring an entire day.",
          "Built in 1993, the modern steel replica plays on the town's French namesake. The red cowboy hat and the nearby memorial tell visitors far more about local identity than a comparison to the original French tower would."
        ],
        "sources": [
          {
            "label": "Visit Paris Texas: Eiffel Tower",
            "url": "https://visitparistexas.com/eiffel-tower/"
          },
          {
            "label": "Visit Paris Texas: Love Civic Center surroundings",
            "url": "https://visitparistexas.com/love-civic-center/"
          }
        ]
      },
      {
        "heading": "Treat living towns and commercial attractions differently",
        "paragraphs": [
          "A town such as Marfa or Terlingua has residents, institutions and changing local conditions; it is not an unattended amusement site. Small-town entries should emphasize a precise destination and nearby museums, parks or local businesses where confirmed, with respect for private property.",
          "Artworks, businesses and spontaneous roadside displays have different access rules. Public art can be approached differently from a ticketed performance or a privately run dance hall. Some stops are free-standing roadside sculptures; others involve admission, reservations or private land. Local visitor information is the decisive source on access."
        ],
        "sources": [
          {
            "label": "TexasDefined: Texas Roadside Oddities itinerary guide",
            "url": "/texas-roadside-oddities"
          },
          {
            "label": "TexasDefined: collection methodology",
            "url": "/things-unique-to-texas/methodology"
          }
        ]
      }
    ]
  },
  "culture-music": {
    "title": "Why Texas has several musical histories, not one signature sound",
    "introduction": "Accordion music from the Texas–Mexico border, African-American blues, swing orchestras, gospel, rodeo celebrations and multigenerational dance halls each reflect different communities and musical histories.",
    "findings": [
      {
        "heading": "Conjunto, Tejano and Western swing crossed different musical borders",
        "paragraphs": [
          "Conjunto is associated with accordion-led dance music along the Texas–Mexico border; Tejano music covers a wider set of Mexican-American styles and audiences. Western swing instead grew through country and string-band ensembles drawing on jazz, blues and popular dance music. Similar dance-floor use does not mean these are the same genre.",
          "Narciso Martínez helped establish a distinctive accordion-led conjunto style, while Milton Brown's Fort Worth band and Bob Wills helped shape Western swing. Their music shared dance audiences but grew from different local and cross-cultural musical networks."
        ],
        "sources": [
          {
            "label": "Texas State Historical Association: Handbook of Texas Music",
            "url": "https://www.tshaonline.org/handbook/projects/texas-music"
          },
          {
            "label": "TexasDefined: Texas music",
            "url": "/texas-music"
          }
        ]
      },
      {
        "heading": "Black Texas music is foundational, not a footnote",
        "paragraphs": [
          "Texas blues developed through African-American musicians working across house parties, dances, churches, migration routes and later the recording industry. The TSHA's blues history describes its encounters with Gulf Coast, rural Anglo, Hispanic, Cajun, Creole and Central European musical traditions.",
          "Dallas's Deep Ellum was an important performance center for Blind Lemon Jefferson, while Sam Lightnin' Hopkins became associated with Houston and East Texas blues. Their histories show why a single Texas-blues label cannot describe every local performance circuit."
        ],
        "sources": [
          {
            "label": "Handbook of Texas: Blues",
            "url": "https://www.tshaonline.org/handbook/entries/blues"
          },
          {
            "label": "TexasDefined: Texas music history",
            "url": "/dallas-fort-worth-music-history"
          }
        ]
      },
      {
        "heading": "Cultural events are made by communities, not simply by tourism",
        "paragraphs": [
          "A dance hall, Juneteenth commemoration, homecoming mum or rodeo tradition is a living community practice with participants and local meanings. The appropriate question is who organized or sustained it, whose story might be left out and how it differs by region.",
          "For event attendance, use the organizer's schedule and venue accessibility information. Historical guides explain origins and cultural impact but should not be substituted for current admission, age restrictions, program times or cancellations."
        ],
        "sources": [
          {
            "label": "TexasDefined: dance halls and honky-tonks",
            "url": "/texas-dance-halls-honky-tonks"
          },
          {
            "label": "TexasDefined: homecoming mums history",
            "url": "/texas-homecoming-mums"
          }
        ]
      }
    ]
  },
  "wildlife-landscape": {
    "title": "Match Texas wildlife to its habitat instead of treating the state as one ecosystem",
    "introduction": "An animal sighting means something different on a coastal marsh, Edwards Plateau hillside, Trans-Pecos desert or pine woodland. The ecological setting and season matter as much as the species name.",
    "findings": [
      {
        "heading": "Ten ecoregions explain the state's striking differences",
        "paragraphs": [
          "Texas Parks and Wildlife recognizes ten broad ecoregions, from the Piney Woods and Gulf Prairies to the High Plains and Trans-Pecos. Rainfall ranges dramatically between the humid east and desert west. That helps explain why cypress swamps, shortgrass plains, limestone juniper woodlands and arid canyons occur within the same state.",
          "A painted bunting breeding in warm-season brush habitat and a wintering whooping crane on the coast illustrate different kinds of seasonal presence. An ocelot in South Texas thornscrub occupies an entirely different conservation setting from widespread armadillos or domestic Longhorn cattle."
        ],
        "sources": [
          {
            "label": "Texas Parks and Wildlife: ten Texas ecoregions",
            "url": "https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions"
          }
        ]
      },
      {
        "heading": "Bat flights change with migration and public access",
        "paragraphs": [
          "Mexican free-tailed bats form seasonal maternity colonies in Texas. The Congress Avenue Bridge colony in Austin is an urban spectacle, while Bracken Cave near San Antonio is a conservation site where access is managed separately. Texas Parks and Wildlife lists specific bat-watching locations rather than treating every cave or bridge as a public viewing area.",
          "Watching a flight is not guaranteed on a particular evening: weather, time of year and roost conditions affect the spectacle. Avoid entering caves or disturbing wildlife; check the responsible operator's visitor instructions before traveling."
        ],
        "sources": [
          {
            "label": "TPWD: Texas bat-watching locations and biology",
            "url": "https://tpwd.texas.gov/huntwild/wild/species/bats/bat-watching-sites/"
          },
          {
            "label": "TPWD: Devil's Sinkhole guided-access rules",
            "url": "https://tpwd.texas.gov/state-parks/devils-sinkhole/"
          }
        ]
      },
      {
        "heading": "Coastal cranes are a conservation story",
        "paragraphs": [
          "The endangered whooping crane breeds in northern Canada and winters on the Texas Gulf Coast near Aransas National Wildlife Refuge. It is not a resident coastal bird available for viewing in every season. Migration timing matters, and disturbance can affect the birds' feeding and roosting.",
          "By contrast, the Texas bluebonnet is a spring wildflower icon with a very different public-land and roadside-safety context. Observe plants from legal pullouts, leave roadside habitat undamaged and follow refuge or park rules for protected species."
        ],
        "sources": [
          {
            "label": "TPWD: Whooping crane status and migration",
            "url": "https://tpwd.texas.gov/huntwild/wild/species/whooper/"
          },
          {
            "label": "TPWD: state park information",
            "url": "https://tpwd.texas.gov/state-parks/"
          }
        ]
      }
      ,{
        heading: "The rarest plant in this chapter depends on one river",
        paragraphs: [
          "Texas wild-rice (Zizania texana) occurs naturally only in the upper San Marcos River in Hays County. The Texas Parks and Wildlife Department calls the species federally and state endangered. It is an aquatic grass rooted underwater in spring-fed flowing habitat, not the same thing as cultivated food rice or a broad Texas prairie grass.",
          "Spring-flow reductions, riverbed disturbance and invasive aquatic plants can endanger this population. TPWD and the U.S. Fish and Wildlife Service emphasize careful river use and habitat protection. Wildlife watching should not involve wading through or pulling vegetation in protected areas."
        ],
        sources: [
          {
            "label": "Texas Parks and Wildlife: Texas wild-rice species profile",
            "url": "https://tpwd.texas.gov/huntwild/wild/wildlife_diversity/nongame/listed-species/plants/texas_wild_rice.phtml?o=twildric"
          },
          {
            "label": "U.S. Fish and Wildlife Service: Texas wild-rice",
            "url": "https://www.fws.gov/rivers/rivers/species/texas-wild-rice-zizania-texana"
          }
        ]
      }
    ]
  },
  "slang-folklore": {
    "title": "Four kinds of Texas shorthand: speech, slogans, symbols and stories",
    "introduction": "A regional expression, a state-designated symbol, an advertising campaign and a folkloric tale are not the same kind of evidence. Keeping those distinctions visible makes the collection more reliable.",
    "findings": [
      {
        "heading": "A campaign slogan has a documented origin",
        "paragraphs": [
          "Don't mess with Texas began as a Texas Department of Transportation anti-litter campaign. TxDOT dates the public campaign to 1986, when Stevie Ray Vaughan helped launch the early advertising. The phrase later spread into broader identity language, but that broader reading should never replace its original meaning: don't litter.",
          "An official flower or flag is documented in state law and records; a widely used motto or folk expression is a matter of social history. Do not present them as having the same status."
        ],
        "sources": [
          {
            "label": "TxDOT: Don't mess with Texas campaign history",
            "url": "https://www.txdot.gov/about/campaigns-outreach/dont-mess-with-texas.html"
          },
          {
            "label": "TexasDefined: officially designated symbols",
            "url": "/texas-symbols"
          }
        ]
      },
      {
        "heading": "Texas speech includes Spanish and regional varieties of English",
        "paragraphs": [
          "Y'all, fixin' to and bless your heart occur outside Texas too. Their meaning depends on context, age and community; attaching them exclusively to Texas is a cultural shortcut rather than a linguistic fact.",
          "The University of Texas at Austin's Spanish in Texas Corpus documents actual bilingual Spanish–English speech. It provides better evidence of how people speak than a fabricated list of supposed statewide catchphrases. Language across the Rio Grande Valley, El Paso, the Gulf Coast and the Panhandle does not form one fixed dialect."
        ],
        "sources": [
          {
            "label": "UT Austin: Spanish in Texas Corpus",
            "url": "https://coerll.utexas.edu/coerll/project/spanishtx/"
          },
          {
            "label": "TexasDefined: full Texas slang explanations",
            "url": "/texas-slang-explained"
          }
        ]
      },
      {
        "heading": "Distinguish folklore from documented local history",
        "paragraphs": [
          "Tall tales about enormous jackalopes, ghost lights and exaggerated ranch feats can be enjoyable without being recorded as scientific or historical fact. Explain who tells a story, where it circulates and whether a dependable primary record exists.",
          "Pecos Bill's feats and jackalopes belong to tall-tale traditions. The state flower and flag have legal recognition, while 'all hat, no cattle' is an idiom whose meaning depends on shared ranch imagery. Their cultural roles overlap without making the claims equivalent."
        ],
        "sources": [
          {
            "label": "TexasDefined: editorial sourcing rules",
            "url": "/things-unique-to-texas/methodology"
          },
          {
            "label": "TexasDefined: Texas slang explained",
            "url": "/texas-slang-explained"
          }
        ]
      }
    ]
  },
  "landmarks": {
    title: "How to evaluate a Texas landmark beyond a photo",
    introduction: "A museum, preserved mission, nineteenth-century hotel, oil discovery site and modern visitor attraction require different historical claims. This chapter distinguishes formally designated properties from places that are culturally recognizable without a special legal designation.",
    findings: [
      {
        heading: "Recorded history and legal designation are separate questions",
        paragraphs: [
          "The Texas Historical Commission's historical marker program commemorates a wide range of people, sites and events, while the National Register of Historic Places recognizes historically significant properties through federal criteria. An interesting old building does not automatically qualify for either designation, and a marker is not the same thing as a National Historic Landmark.",
          "For every specific site with a designation claim, consult the applicable Texas Historical Commission Atlas or National Park Service record. This list includes recognizable landmarks that are not all legally protected or listed in the same way."
        ],
        sources: [{ label: "Texas Historical Commission: historical markers", url: "https://thc.texas.gov/preserve/preservation-programs/historical-markers" }, { label: "Texas Historical Commission: National Register criteria", url: "https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places" }]
      },
      {
        heading: "Texas's layered past is visible in its buildings",
        paragraphs: [
          "The Alamo cannot be understood only through the 1836 battle: its mission origins and the Indigenous, Spanish and Mexican histories of San Antonio came first. The San Antonio Missions form a larger cultural landscape, while Presidio La Bahía and Mission Espíritu Santo place Goliad inside a different regional story.",
          "The Texas State Capitol, opened in 1888, connects the state's political institutions to nineteenth-century building technology, granite quarries and land-based financing. Those details explain far more than the building's familiar silhouette."
        ],
        sources: [{ label: "State Preservation Board: Texas Capitol history", url: "https://tspb.texas.gov/prop/tc/tc-history/index.html" }, { label: "NPS: San Antonio Missions", url: "https://www.nps.gov/saan/index.htm" }]
      },
      {
        heading: "Oil, commerce and modern civic memory",
        paragraphs: [
          "Spindletop's Beaumont oil discovery belongs to industrial history; Fair Park's 1930s art-deco ensemble belongs to architecture and exposition history. They answer different questions about how Texas became economically connected to the wider world. A responsible guide gives the event or construction era, the place and why preservation matters.",
          "The San Antonio River Walk is a designed urban corridor, not a spontaneous natural river formation. Caddo Mounds is an important Caddo cultural site, not scenery detached from the people who built and used it. Both belong here with that distinction explicit. Before visiting any landmark, use the site steward's current access rules rather than treating a historic fact as an opening-hours promise."
        ],
        sources: [{ label: "Texas Historical Commission Atlas", url: "https://atlas.thc.texas.gov/" }, { label: "TexasDefined: Caddo Mounds historic site", url: "/destination/caddo-mounds-state-historic-site" }, { label: "TexasDefined: River Walk guide", url: "/destination/san-antonio-river-walk" }]
      }
      ,{
        heading: "Spindletop and Beaumont made an industrial landmark",
        paragraphs: [
          "On January 10, 1901, the Lucas well at Spindletop, south of Beaumont, blew in and transformed the prospects for American petroleum production. The Texas State Historical Association identifies the discovery as a turning point in the modern petroleum industry, not the first time oil had ever been found in Texas.",
          "The surviving commemorative site, museum interpretation and wider Beaumont landscape should not be confused with an operating well on the exact 1901 drilling spot. When discussing historic sites, separate the documented event, preserved material fabric, and later memorialization."
        ],
        sources: [
          {
            "label": "Handbook of Texas: Spindletop Oilfield",
            "url": "https://www.tshaonline.org/handbook/entries/spindletop-oilfield"
          },
          {
            "label": "Texas State Library: primary-source oil-boom exhibit",
            "url": "https://www.tsl.texas.gov/lobbyexhibits/extraextra/spindletop"
          }
        ]
      }
    ]
  }
};
