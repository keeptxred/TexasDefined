/**
 * Source-checked, entry-specific interpretation and trip-use evidence.
 * Reviewed 2026-11-16 against primary operator, government and institutional sources.
 * Keep reference IDs stable. No unverified claims of personal visits, live opening hours,
 * guaranteed sightings, unrestricted entry or current admission prices.
 */
export type TexasIconFieldNote = { topic: string; fact: string; usefulFor: string; sources: ReadonlyArray<{ label: string; url: string }> };
export const TEXAS_ICON_FIELD_NOTES: Readonly<Record<number, TexasIconFieldNote>> = {
  "88": {
    "topic": "Indigenous history",
    "fact": "The three earthen mounds are a Caddo civic and ceremonial landscape. The Caddo Nation helped reopen the site in 2024 after the 2019 tornado; it is not a generic natural mound or an abandoned culture.",
    "usefulFor": "Use the Alto site’s visitor center and trail for context, and follow posted guidance around culturally sensitive areas.",
    "sources": [
      {
        "label": "Texas Historical Commission: Caddo Mounds",
        "url": "https://thc.texas.gov/historic-sites/caddo-mounds"
      },
      {
        "label": "THC: plan a respectful visit",
        "url": "https://thc.texas.gov/state-historic-sites/caddo-mounds/plan-your-visit-caddo-mounds"
      }
    ]
  },
  "93": {
    "topic": "Tour eligibility",
    "fact": "Space Center Houston is the public visitor attraction; NASA Johnson Space Center is an operating federal facility, not a museum with unrestricted access. The popular Mission Control tram experience is a separate reserved option.",
    "usefulFor": "Choose a ticket based on which NASA tram experiences are actually included, especially if Mission Control is the reason for visiting.",
    "sources": [
      {
        "label": "Space Center Houston: official ticket and tour guide",
        "url": "https://spacecenter.org/visitor-information/guide/"
      }
    ]
  },
  "95": {
    "topic": "Living heritage",
    "fact": "The San Antonio Missions landscape is not just a collection of preserved façades: the mission communities have Indigenous, colonial and continuing religious histories. The Alamo is separate from the four missions managed within the national historical park.",
    "usefulFor": "For a multi-mission visit, distinguish NPS sites, active parish access, and the separate Alamo visitor arrangements.",
    "sources": [
      {
        "label": "National Park Service: San Antonio Missions",
        "url": "https://www.nps.gov/saan/index.htm"
      }
    ]
  },
  "100": {
    "topic": "What the oil strike changed",
    "fact": "The 1901 Lucas gusher at Spindletop transformed oil production, investment and Beaumont’s economy. A museum interpreting the boom is not necessarily the same physical location as the original drilling site.",
    "usefulFor": "When planning a visit, distinguish historic oil-field interpretation from surviving artifacts and the original well location.",
    "sources": [
      {
        "label": "Texas State Historical Association: Spindletop",
        "url": "https://www.tshaonline.org/handbook/entries/spindletop-oilfield"
      }
    ]
  },
  "104": {
    "topic": "Independence and access",
    "fact": "Washington-on-the-Brazos is tied to the March 2, 1836 Texas Declaration of Independence. It is a reconstructed and interpreted historic townsite rather than a surviving intact 1836 town.",
    "usefulFor": "The state historic site distinguishes grounds access from ticketed museum, townsite and Barrington Farm facilities; check the operator before making the drive.",
    "sources": [
      {
        "label": "THC: Washington-on-the-Brazos",
        "url": "https://thc.texas.gov/historic-sites/washington-brazos"
      }
    ]
  },
  "123": {
    "topic": "Memory and interpretation",
    "fact": "The site records Confederate veterans’ reunion culture from 1889–1946 and earlier Indigenous use of the Navasota River landscape; it is not the location of a Civil War battlefield. Its 1902 dance pavilion and Mexia oil-boom remains tell different stories.",
    "usefulFor": "Read the reunion movement within the history of slavery, emancipation, Reconstruction and Confederate commemoration, not as an unqualified celebration.",
    "sources": [
      {
        "label": "THC: official site and interpretation",
        "url": "https://thc.texas.gov/historic-sites/confederate-reunion-grounds"
      },
      {
        "label": "THC: site history and land ownership",
        "url": "https://thc.texas.gov/state-historic-sites/confederate-reunion-grounds/confederate-reunion-grounds-history"
      }
    ]
  },
  "126": {
    "topic": "A specific photo stop",
    "fact": "The Paris tower is a modern Texas roadside reinterpretation of a French landmark, with a red cowboy hat added to its silhouette. It stands near the city civic center rather than at the town square.",
    "usefulFor": "Use the Love Civic Center area as the destination; this is a brief roadside stop, not a full-day Eiffel Tower attraction.",
    "sources": [
      {
        "label": "Paris tourism: Eiffel Tower",
        "url": "https://visitparistexas.com/eiffel-tower/"
      }
    ]
  },
  "128": {
    "topic": "Outdoor artwork, not a museum",
    "fact": "Ant Farm installed Cadillac Ranch in 1974; the ten buried cars were later relocated. The art’s exposure to paint and weather is part of its evolving visual character.",
    "usefulFor": "Approach from the I-40 frontage road and prepare for an outdoor walk; do not mistake the installation for a drive-through attraction.",
    "sources": [
      {
        "label": "Visit Amarillo: Cadillac Ranch",
        "url": "https://www.visitamarillo.com/blog/post/cadillac-ranch/"
      }
    ]
  },
  "130": {
    "topic": "Art rather than retail",
    "fact": "Elmgreen & Dragset created Prada Marfa in 2005. The sealed storefront just west of Valentine is a permanent artwork; its luxury goods are part of the installation, not a shop.",
    "usefulFor": "Treat it as an outdoor Highway 90 art stop. Do not arrive expecting purchases, indoor admission or facilities.",
    "sources": [
      {
        "label": "Ballroom Marfa: artists, site and production",
        "url": "https://www.ballroommarfa.org/prada-marfa/"
      }
    ]
  },
  "142": {
    "topic": "A researched reason to stop",
    "fact": "Leona was Leon County’s first county seat from 1846 until Centerville replaced it in 1850. That administrative history is a more useful reason to identify the town than a vague claim that small towns feel 'authentic'.",
    "usefulFor": "This is a local-history detour rather than a confirmed staffed attraction; research any desired business separately before planning a meal or visit.",
    "sources": [
      {
        "label": "THC marker record: Leon County and Leona",
        "url": "https://atlas.thc.texas.gov/Details/5289009628"
      }
    ]
  },
  "146": {
    "topic": "Seasonal road caution",
    "fact": "Fischer Store Road offers Hill Country scenery, but low-water crossings are travel hazards rather than attractions. A shallow-looking flood can hide damaged pavement and fast currents.",
    "usefulFor": "Check DriveTexas and the forecast. Never cross flooded roads or go around a barrier; choose another route instead.",
    "sources": [
      {
        "label": "TxDOT: flash-flood road guidance",
        "url": "https://www.txdot.gov/safety/severe-weather/flash-floods.html"
      }
    ]
  },
  "147": {
    "topic": "Access is not guaranteed",
    "fact": "Luck, Texas is associated with Willie Nelson and a Western movie set, but it is not an ordinary public main street to enter whenever you like.",
    "usefulFor": "Only plan access for a specifically announced and ticketed event; do not treat private land as a drop-in roadside town.",
    "sources": [
      {
        "label": "Texas music context and destinations",
        "url": "/texas-dance-halls-honky-tonks"
      }
    ]
  },
  "151": {
    "topic": "Houston folk art",
    "fact": "The Beer Can House is a transformed residential building, not a working brewery. Its decoration is a material record of one Houston maker’s sustained creative project.",
    "usefulFor": "Before travel, check the operator for viewing access and current visitor arrangements instead of assuming an ordinary open house.",
    "sources": [
      {
        "label": "Houston folk-art history",
        "url": "/texas-roadside-oddities"
      }
    ]
  },
  "166": {
    "topic": "Two overlapping music circuits",
    "fact": "Texas Country and Red Dirt are linked through regional songwriters, radio, touring and dance halls, but they are not interchangeable genres or uniformly separate from Nashville.",
    "usefulFor": "To understand the sound, compare a songwriter-led venue with a full-band dance-hall concert; do not infer genre from a performer’s home state alone.",
    "sources": [
      {
        "label": "Texas dance halls and honky-tonks",
        "url": "/texas-dance-halls-honky-tonks"
      }
    ]
  },
  "167": {
    "topic": "A hybrid sound",
    "fact": "Western swing brought jazz improvisation and dance-band instrumentation into country music. Its Texas history is not simply old-fashioned fiddle music.",
    "usefulFor": "Compare ensemble arrangements and dance-floor context instead of using a cowboy-costume visual as the genre definition.",
    "sources": [
      {
        "label": "Texas State Historical Association: Western swing",
        "url": "https://www.tshaonline.org/handbook/entries/western-swing"
      }
    ]
  },
  "168": {
    "topic": "Distinct border traditions",
    "fact": "Conjunto foregrounds the accordion and bajo sexto with deep South Texas and northern Mexican roots. Tejano is a broader commercial and performance category that can incorporate conjunto, orchestras and pop.",
    "usefulFor": "Look for named musicians, the instruments used and the community where a performance happens rather than treating every Spanish-language Texas act as one sound.",
    "sources": [
      {
        "label": "Handbook of Texas: conjunto",
        "url": "https://www.tshaonline.org/handbook/entries/conjunto"
      }
    ]
  },
  "185": {
    "topic": "What June 19 records",
    "fact": "On June 19, 1865, General Granger’s order in Galveston announced federal enforcement of emancipation in Texas. Freedom was a longer struggle; the date did not mean no one had resisted slavery or gained freedom earlier.",
    "usefulFor": "For historical interpretation distinguish the 1863 Emancipation Proclamation, the 1865 military announcement, and later community-organized annual celebrations.",
    "sources": [
      {
        "label": "Library of Congress: June 19 and General Orders No. 3",
        "url": "https://www.loc.gov/item/today-in-history/june-19/"
      }
    ]
  },
  "192": {
    "topic": "Living equestrian tradition",
    "fact": "Charrería is a Mexican equestrian sport and cultural practice with a living community presence in Texas. It should not be collapsed into the same history or competition rules as an American rodeo.",
    "usefulFor": "Identify the event’s actual organizers and format instead of assuming every horse show is a charreada.",
    "sources": [
      {
        "label": "Texas cultural history and traditions",
        "url": "/article/texas-cultural-regions-explained"
      }
    ]
  },
  "194": {
    "topic": "Record industry and Black Dallas",
    "fact": "Deep Ellum’s music history developed within early twentieth-century Black Dallas. The neighborhood was a center for blues, jazz, entertainment and recording businesses, not merely a modern bar district.",
    "usefulFor": "Use the historic-marker accounts to distinguish the original neighborhood’s institutions from today’s venues, which change independently.",
    "sources": [
      {
        "label": "Texas Historical Commission: Leadbelly in Deep Ellum",
        "url": "https://atlas.thc.texas.gov/Details/5507016121/print"
      }
    ]
  },
  "196": {
    "topic": "Timing matters for bat flights",
    "fact": "Mexican free-tailed bats form large maternity colonies in warm months; many migrate south as autumn cold fronts arrive. Some urban bridge roosts, including Houston’s Waugh Drive, retain year-round populations.",
    "usefulFor": "For the strongest flights, check the current colony and viewing-site guidance. Avoid flash photography, standing under bats or handling grounded animals.",
    "sources": [
      {
        "label": "TPWD: bat watching sites and etiquette",
        "url": "https://tpwd.texas.gov/huntwild/wild/species/bats/bat-watching-sites/"
      }
    ]
  },
  "197": {
    "topic": "State flower law versus roadside safety",
    "fact": "Texas has no statewide blanket law against picking bluebonnets, but trespass, right-of-way damage, traffic and parking rules still apply. The bloom varies with weather and region.",
    "usefulFor": "Photograph from a lawful, safe parking area rather than stopping on a dangerous highway shoulder or walking into private fields.",
    "sources": [
      {
        "label": "Texas State Law Library: bluebonnet legal question",
        "url": "https://sll.texas.gov/faqs/is-picking-bluebonnets-legal-in-texas/"
      }
    ]
  },
  "200": {
    "topic": "A conservation indicator",
    "fact": "Texas horned lizards depend on suitable open habitat and ant prey. Their decline in many formerly familiar areas makes sightings ecologically meaningful, not proof they have vanished statewide.",
    "usefulFor": "Look without handling or relocating them. Preserve habitat and use official TPWD wildlife guidance for identification.",
    "sources": [
      {
        "label": "Texas Parks and Wildlife: horned lizard",
        "url": "https://tpwd.texas.gov/huntwild/wild/species/thlizard/"
      }
    ]
  },
  "201": {
    "topic": "Winter-only viewing priority",
    "fact": "The endangered Aransas–Wood Buffalo flock breeds in Canada and winters in coastal marshes around Aransas. The federal estimate for the 2025–26 winter primary area was 540 cranes, a survey estimate rather than a count of every bird.",
    "usefulFor": "Plan for winter and use binoculars or guided observation, not close approaches to feeding birds. Numbers and specific sightings vary each season.",
    "sources": [
      {
        "label": "U.S. Fish & Wildlife Service: 2025–26 crane survey",
        "url": "https://www.fws.gov/press-release/2026-06/service-estimates-540-whooping-cranes-wintered-texas-coast-2025-2026"
      },
      {
        "label": "TPWD: whooping crane species and viewing season",
        "url": "https://tpwd.texas.gov/huntwild/wild/species/whooper/"
      }
    ]
  },
  "212": {
    "topic": "Protect habitat rather than chase a sighting",
    "fact": "Texas ocelots survive in fragmented South Texas thornscrub, with a key refuge population near Laguna Atascosa. Habitat connectivity and vehicle strikes are central conservation issues.",
    "usefulFor": "A refuge visit offers legitimate habitat education and birdwatching; never promise an ocelot sighting or pursue a rare cat for a photo.",
    "sources": [
      {
        "label": "FWS: Laguna Atascosa visitor and habitat guide",
        "url": "https://www.fws.gov/locations/laguna-atascosa-national-wildlife-refuge"
      },
      {
        "label": "FWS: wildlife underpass documented",
        "url": "https://www.fws.gov/story/2020-02/its-first-ocelot-crosses-under-road"
      }
    ]
  },
  "219": {
    "topic": "Unique endangered aquatic plant",
    "fact": "Texas wild-rice grows naturally only in the upper San Marcos River and depends on reliable cool spring flow. Wading and disturbance can harm the submerged plants.",
    "usefulFor": "When paddling or swimming, follow scientific-area protections and avoid walking through vegetation; the river is habitat, not a plant-collecting site.",
    "sources": [
      {
        "label": "U.S. Fish & Wildlife Service: Texas wild-rice",
        "url": "https://www.fws.gov/species/texas-wild-rice-zizania-texana"
      },
      {
        "label": "TPWD: species range and protection",
        "url": "https://tpwd.texas.gov/huntwild/wild/wildlife_diversity/nongame/listed-species/plants/texas_wild_rice.phtml"
      }
    ]
  },
  "221": {
    "topic": "A campaign, not a threat",
    "fact": "Don't Mess with Texas was created as an anti-litter message; its later use as a broader statement of state pride can obscure the practical environmental purpose.",
    "usefulFor": "When quoting the phrase, distinguish original civic advertising from later unofficial cultural reuse.",
    "sources": [
      {
        "label": "Don't Mess with Texas: official campaign",
        "url": "https://www.dontmesswithtexas.org/"
      }
    ]
  },
  "222": {
    "topic": "A linguistic tool, not Texas ownership",
    "fact": "Y'all marks a plural addressee; all y'all can emphasize the whole group. Both are part of wider Southern English, and their use varies by speaker and region.",
    "usefulFor": "Use examples in context, not claims that every Texan talks alike or that the phrase originated only in Texas.",
    "sources": [
      {
        "label": "Texas slang research guide",
        "url": "/texas-slang-explained"
      }
    ]
  },
  "223": {
    "topic": "Aspect, not just an accent",
    "fact": "Fixin' to signals an imminent or intended action. It is a grammatical construction of Southern U.S. English, not proof that someone is a lifelong Texan.",
    "usefulFor": "Separate the phrase’s actual meaning from comic spelling, and avoid invented survey percentages.",
    "sources": [
      {
        "label": "Texas slang research guide",
        "url": "/texas-slang-explained"
      }
    ]
  },
  "224": {
    "topic": "Context can reverse meaning",
    "fact": "Bless your heart can express real sympathy or condescension, depending on speaker, context and intonation. Presenting it as exclusively an insult distorts how people actually use it.",
    "usefulFor": "Readers should infer intent from a real exchange rather than a generic list of supposed Texas translations.",
    "sources": [
      {
        "label": "Texas slang research guide",
        "url": "/texas-slang-explained"
      }
    ]
  },
  "232": {
    "topic": "Not everyone orders drinks alike",
    "fact": "Calling any soft drink a Coke is a regional colloquial habit, not an official Texas vocabulary rule and not uniform across age groups or cities.",
    "usefulFor": "Explain that a server may ask what kind, rather than asserting everyone in Texas uses the term.",
    "sources": [
      {
        "label": "Texas slang research guide",
        "url": "/texas-slang-explained"
      }
    ]
  },
  "238": {
    "topic": "Separate song and folklore",
    "fact": "The Yellow Rose of Texas is a historical song with changing lyrics and interpretations; claims that its heroine has a single verified identity need documentary evidence, not repetition of legend.",
    "usefulFor": "Use the documented song history before retelling the Emily D. West story as fact.",
    "sources": [
      {
        "label": "Texas State Historical Association: Yellow Rose of Texas",
        "url": "https://www.tshaonline.org/handbook/entries/yellow-rose-of-texas"
      }
    ]
  },
  "239": {
    "topic": "A useful idiom with limits",
    "fact": "All hat, no cattle criticizes showy presentation without demonstrated substance. Its appeal rests on ranch imagery, but it works as a modern metaphor well beyond ranching.",
    "usefulFor": "Give a real usage example: a candidate boasting about plans but offering no record may be described this way; it is not a literal cattle inventory.",
    "sources": [
      {
        "label": "Texas slang research guide",
        "url": "/texas-slang-explained"
      }
    ]
  },
  "249": {
    "topic": "A remembered battle cry",
    "fact": "Remember the Alamo became a Texas Revolution slogan. Historical interpretation requires the full 1836 campaign context, including Tejano participation and the contested legacies of the revolution.",
    "usefulFor": "Read the slogan alongside historical evidence rather than treating a rallying phrase as an objective summary of the battle.",
    "sources": [
      {
        "label": "The Alamo: official history and interpretation",
        "url": "https://www.thealamo.org/"
      }
    ]
  }
};
export const VERIFIED_TEXAS_ICON_FIELD_IDS = [88,93,95,104,123,100,126,128,130,142,146,147,151,166,167,168,185,194,192,196,197,200,201,212,219,221,222,223,224,232,238,239,249] as const;
