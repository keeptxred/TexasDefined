/**
 * Source-checked, entry-specific interpretation and trip-use evidence.
 * Reviewed 2026-11-16 against primary operator, government and institutional sources.
 * Keep reference IDs stable. No unverified claims of personal visits, live opening hours,
 * guaranteed sightings, unrestricted entry or current admission prices.
 */
export type TexasIconFieldNote = { topic: string; fact: string; usefulFor: string; sources: ReadonlyArray<{ label: string; url: string }> };
export const TEXAS_ICON_FIELD_NOTES: Readonly<Record<number, TexasIconFieldNote>> = {
  "50": {
    "topic": "Craft traditions require a named maker",
    "fact": "Saddlery, hand-tooling and leatherwork connect Texas ranching labor to a continuing craft economy. A display of stamped belts in a roadside shop, however, does not establish that the goods were made locally or by a named artisan.",
    "usefulFor": "For an actual craft visit, find a specific workshop or maker and confirm whether visits are offered. Use a clear maker attribution, location of production and type of work, not a vague claim that every souvenir is authentic Texas craft.",
    "sources": [
      {
        "label": "Texas State Historical Association: saddles and saddle makers",
        "url": "https://www.tshaonline.org/handbook/entries/saddles-and-saddle-makers"
      }
    ]
  },
  "51": {
    "topic": "Texas-shaped is not Texas-made",
    "fact": "Texas-shaped magnets, metal signs and housewares are visual identity products. They might be made in Texas or imported; the outline alone does not establish manufacturing origin, artistry or local cultural significance.",
    "usefulFor": "When sourcing a handmade travel souvenir, check the individual maker's location and provenance. Avoid marketing the product category as a separate public tourist destination.",
    "sources": [
      {
        "label": "TexasDefined: how this collection checks sourcing and origin",
        "url": "/things-unique-to-texas/methodology"
      }
    ]
  },
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
  "91": {
    "topic": "Interpretation beyond the battle",
    "fact": "The Alamo was a mission long before the 1836 siege. Its interpretation intersects Spanish colonial history, Indigenous communities, the Texas Revolution and later reconstruction, not just the final battle.",
    "usefulFor": "Consult the current Alamo visitor plan for access and guided interpretation; pair it with the other San Antonio missions without treating all five as the same managed site.",
    "sources": [
      {
        "label": "The Alamo: visitor and historical interpretation",
        "url": "https://www.thealamo.org/"
      }
    ]
  },
  "92": {
    "topic": "A free civic-history visit",
    "fact": "The Texas Capitol is a functioning legislative building as well as an 1888 architectural landmark. The State Preservation Board offers free guided tours and self-guided access, subject to official schedules and building closures.",
    "usefulFor": "Choose between a free guided interior tour and a grounds walk; check the State Preservation Board's schedule and accessibility notes rather than trusting a static third-party hour listing.",
    "sources": [
      {
        "label": "State Preservation Board: official Capitol tours",
        "url": "https://tspb.texas.gov/plan/tours/tours.html"
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
  "96": {
    "topic": "Ceremonial drive versus historic commerce",
    "fact": "The Fort Worth Stockyards preserve a historic cattle-market district, while today’s Fort Worth Herd cattle drives are staged heritage presentations. The daily march is not a continuation of a nineteenth-century trail shipment.",
    "usefulFor": "Check the official Fort Worth Herd page for the current drive schedule and weather cancellations. Choose safe viewing locations instead of stepping into the cattle path.",
    "sources": [
      {
        "label": "Fort Worth Herd: official schedule and viewing",
        "url": "https://www.fortworthstockyards.org/events/fort-worth-herd-twice-daily-cattle-drive"
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
  "101": {
    "topic": "Choose the kind of house tour",
    "fact": "The Moody Mansion was completed in 1895 and bought by W. L. Moody Jr. after the 1900 storm. It now interprets the family's business, preservation and domestic history, with a self-guided visitor route distinct from small-group all-access tours.",
    "usefulFor": "If you want normally closed rooms or a guided tour, use the museum's separately scheduled All-Access option. For an ordinary visit, the operator offers self-guided access with mobile interpretation; check accessibility and current admission.",
    "sources": [
      {
        "label": "Moody Mansion: house history and self-guided versus all-access tours",
        "url": "https://www.moodymansion.org/about"
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
  "107": {
    "topic": "A preserved atmospheric movie palace",
    "fact": "The Majestic Theatre's Spanish-themed interior reflects the twentieth-century theatre era in San Antonio. The historic façade is a streetscape sight; interior access depends on a scheduled performance or approved tour, not a presumed open-door heritage visit.",
    "usefulFor": "If you want interior ornament and lighting rather than an exterior photograph, plan around an actual event; compare tickets, accessibility and restrictions with the current theatre operator.",
    "sources": [
      {
        "label": "San Antonio Majestic Theatre: official venue",
        "url": "https://www.majesticempire.com/"
      }
    ]
  },
  "108": {
    "topic": "A nationally designated architectural district",
    "fact": "Fair Park’s 1936–37 Texas Centennial Exposition buildings form a National Historic Landmark district known for Art Deco architecture and public art. The campus is more than the State Fair's temporary autumn attractions.",
    "usefulFor": "Plan an architecture visit separately from a paid State Fair event, and check which museums, buildings and grounds are actually open on your date.",
    "sources": [
      {
        "label": "Texas Historical Commission: Fair Park landmark record",
        "url": "https://www.dallasparks.org/744/Fair-Park"
      }
    ]
  },
  "118": {
    "topic": "Historic buildings temporarily closed",
    "fact": "TxDOT's Langtry Travel Information Center interprets Judge Roy Bean and the Jersey Lilly Saloon, but its current site bulletin states that the saloon, opera house and gardens are temporarily closed for construction.",
    "usefulFor": "If driving U.S. 90 specifically to see the restored Judge Roy Bean buildings, check construction status first. TxDOT says the travel center lobby and restrooms remain open, but that is not the same as access to the historic interiors.",
    "sources": [
      {
        "label": "TxDOT: Langtry restoration closure and open services",
        "url": "https://www.txdot.gov/discover/rest-areas-travel-information-centers/travel-information-centers/langtry.html"
      }
    ]
  },
  "121": {
    "topic": "Military history and modern art share a site",
    "fact": "Fort D. A. Russell's former military grounds are now a principal campus of the Chinati Foundation, including permanent large-scale artworks. The military history and the modern art collection are different periods of use, not a continuously operating fort.",
    "usefulFor": "Chinati reports that most collection spaces and grounds require advance-booked guided tours; a major artillery-shed restoration began in October 2026, so confirm which installations remain accessible.",
    "sources": [
      {
        "label": "Chinati Foundation: access, tours and artillery-shed restoration",
        "url": "https://chinati.org/hours-locations/"
      }
    ]
  },
  "122": {
    "topic": "Free tours but important access limitations",
    "fact": "Beaumont's 1906 McFaddin-Ward House preserves a wealthy oil-era household and its grounds. As of the museum's 2026 program update, both the historic-house tour and the carriage-house-and-garden tour are free but have different routes and eligibility.",
    "usefulFor": "For families with children younger than eight or visitors avoiding historic stairs, choose the separate carriage-house-and-garden experience. The main house is restricted to ages eight and up; the operator recommends advance reservation and notes limited wheelchair access.",
    "sources": [
      {
        "label": "McFaddin-Ward House: official tour types, ages and accessibility",
        "url": "https://mcfaddin-ward.org/tours/"
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
  "124": {
    "topic": "Working theatre with a documented preservation story",
    "fact": "Austin's Paramount Theatre opened in 1915 as a vaudeville house designed by John Eberson. A 1970s rescue and restoration kept it in use; its restored blade sign and performance history are part of the landmark's significance.",
    "usefulFor": "A ticket to a current performance is not automatically a backstage or historic-building tour. Verify the theatre's own events and tour arrangements and enjoy the historic Congress Avenue exterior from public sidewalks.",
    "sources": [
      {
        "label": "Paramount Theatre: official chronology and restoration",
        "url": "https://www.austintheatre.org/about/history/"
      }
    ]
  },
  "125": {
    "topic": "Adaptive reuse is the architectural story",
    "fact": "The Dallas World Aquarium opened in October 1992 in a former 1924 warehouse at 1801 North Griffin Street. Later exhibits expanded into an adjacent converted building; preservation of the original structures is different from a legally designated historic landmark.",
    "usefulFor": "This is an operating aquarium with admission and animal habitats, not a free public architectural museum. Use its official visitor pages for tickets, exhibits and access and interpret the old warehouse as reuse rather than a claim of special legal landmark status.",
    "sources": [
      {
        "label": "Dallas World Aquarium: documented warehouse reuse and expansion",
        "url": "https://dwazoo.com/about-dwa/"
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
  "127": {
    "topic": "Free sculpture on private arts-campus grounds",
    "fact": "Stonehenge II is a contemporary Texas limestone-replica art installation created by Al Shepperd and Doug Hill. It was moved from Hunt to the Hill Country Arts Foundation property in Ingram, where two Easter Island-style head replicas stand nearby.",
    "usefulFor": "The arts foundation normally allows free daily visits but asks visitors to confirm access, leash pets and obtain permission for special events or commercial photography. Use 120 Point Theatre Road in Ingram, not the original Hunt location.",
    "sources": [
      {
        "label": "Hill Country Arts Foundation: Stonehenge II ownership and site rules",
        "url": "https://www.hcaf.com/stonehenge-ii/"
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
  "131": {
    "topic": "A designated viewing area, not a guaranteed light show",
    "fact": "Marfa tourism directs visitors to a viewing area nine miles east of town on U.S. 90. Reported lights have many possible explanations; the attraction is the landscape and long-running mystery, not a verified paranormal event.",
    "usefulFor": "Use the official viewing area rather than wandering across private ranchland. Bring appropriate lighting and travel plans without promising any lights will appear.",
    "sources": [
      {
        "label": "Visit Marfa: mystery lights and designated location",
        "url": "https://visitmarfa.com/mystery"
      }
    ]
  },
  "133": {
    "topic": "Silos are modern development, not an industrial museum",
    "fact": "Magnolia Market at the Silos in Waco is a landscaped retail and food destination developed around reused historic agricultural buildings. The modern shopping campus should not be presented as a public tour of working grain-processing equipment.",
    "usefulFor": "Use Magnolia's site map and current events or restaurant pages to decide how long to stay. Combine with a separately planned Dr Pepper Museum or Waco historic site rather than assuming they are on the same admission.",
    "sources": [
      {
        "label": "Magnolia: visitor and campus guide",
        "url": "https://magnolia.com/visit/"
      }
    ]
  },
  "134": {
    "topic": "Seasonal antique fields are not year-round storefronts",
    "fact": "Round Top's spring and fall antiques shows bring temporary vendors and seasonal stalls to Fayette County. The town also has individually operating shops, but a show-only venue may be entirely closed outside event dates.",
    "usefulFor": "Before taking a weekday detour to an antiques barn, use the Round Top shopping directory to filter 'open only during the show' versus 'open year round'. The current main show ended in early November 2026.",
    "sources": [
      {
        "label": "Round Top visitor directory: show-only versus year-round stores",
        "url": "https://roundtop.com/shops-shopping/"
      }
    ]
  },
  "136": {
    "topic": "Sunday houses were functional town lodging",
    "fact": "Fredericksburg Sunday houses let rural families stay in town for church, shopping or other weekend activities. They are not a type of bakery, and not all surviving houses are publicly tourable. German-Texan bakeries reflect a separate strand of heritage.",
    "usefulFor": "Plan an actual heritage walk or reserve an identified historic lodging property rather than wandering onto a private porch. Use the Fredericksburg visitor bureau's Sunday-house descriptions and check which examples are private residences.",
    "sources": [
      {
        "label": "Visit Fredericksburg: documented Sunday-house tradition",
        "url": "https://www.visitfredericksburgtx.com/things-to-do/museums-history/german-heritage/"
      }
    ]
  },
  "139": {
    "topic": "A real market with a published calendar",
    "fact": "The Wimberley Lions Club runs Market Day on the first Saturday of the month from March through December, with roughly 490 stalls. It is a scheduled outdoor antiques and crafts market, not a daily shopping district.",
    "usefulFor": "Use the operator's searchable vendor map at 601 FM 2325, verify the first-Saturday calendar and weather plan, and budget time to walk a large open-air site rather than assuming a short roadside photo stop.",
    "sources": [
      {
        "label": "Wimberley Lions Club: official calendar and vendor map",
        "url": "https://wimberleymarketday.com/market-map/"
      }
    ]
  },
  "141": {
    "topic": "A generic statue is not a verified visitor site",
    "fact": "The term 'Bigfoot roadside statues' refers to a shifting variety of privately operated souvenir displays rather than one established public attraction. Unverified figures may be removed, moved or unavailable to the public.",
    "usefulFor": "Only add an individual statue to a route once its operator confirms an exact address, legal public access and current existence. Do not route visitors to guessed pins or cross private property for a photograph.",
    "sources": [
      {
        "label": "TexasDefined: roadside-oddities guide with named stops",
        "url": "/texas-roadside-oddities"
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
  "143": {
    "topic": "Two destinations at one Luckenbach address",
    "fact": "Luckenbach's general store operates in the historic settlement alongside an active dance hall and outdoor music areas. Daytime browsing and a ticketed or scheduled evening show are different visitor experiences.",
    "usefulFor": "Check the current Luckenbach events calendar and venue instructions before assuming a concert is included with a store visit; it is a living entertainment business, not an abandoned ghost-town exhibit.",
    "sources": [
      {
        "label": "Luckenbach Texas: official calendar and visitor details",
        "url": "https://www.luckenbachtexas.com/"
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
    "topic": "Private set, limited event admission",
    "fact": "Luck, Texas is a preserved Western movie-set town on Willie Nelson's private ranch, not a public shopping street. Its own visitor bureau says it is closed to everyday visitors and opens for special events such as the annual Luck Reunion.",
    "usefulFor": "Use the organizer's published postcard lottery and ticket instructions before booking travel. Mailing an application does not guarantee purchase eligibility or admission; never attempt to enter the private ranch uninvited.",
    "sources": [
      {
        "label": "Luck Texas visitor bureau: private access and ticket process",
        "url": "https://www.visitlucktexas.com/plan-your-visit"
      }
    ]
  },
  "149": {
    "topic": "Historic room, active concert calendar",
    "fact": "Built in 1878, Gruene Hall remains a working music venue with an original-style open-air dance-hall layout. Its age and setting are historical facts; individual shows, ticket requirements and capacity change.",
    "usefulFor": "Choose a performance from the hall's current calendar and check ticket rules; the surrounding Gruene historic district can be visited on a different schedule.",
    "sources": [
      {
        "label": "Gruene Hall: official site and events",
        "url": "https://gruenehall.com/"
      }
    ]
  },
  "150": {
    "topic": "Closed for preservation",
    "fact": "The Orange Show Monument at 2401 Munger Street is a distinctive Houston folk-art environment. The operator explicitly lists the monument as closed for ongoing preservation and restoration; it is not currently open for ordinary interior visits.",
    "usefulFor": "Do not send visitors to the Orange Show for a walk-in tour. Check the operator's restoration updates and consider its separately managed Beer Can House or outdoor Smither Park, each with its own access arrangements.",
    "sources": [
      {
        "label": "Orange Show Center: official current monument closure and other sites",
        "url": "https://www.orangeshow.org/visit"
      }
    ]
  },
  "151": {
    "topic": "A separately visitable Houston folk-art site",
    "fact": "The Beer Can House at 222 Malone Street is maintained by the Orange Show Center and decorated with an estimated 50,000 aluminum cans. It is a separate visitor site from the Orange Show Monument, which is closed for restoration.",
    "usefulFor": "Check the Orange Show operator's latest notice before a special drive: its visit page currently displays inconsistent visiting hours in the page banner and body. Do not assume the closed Orange Show Monument and the Beer Can House share admission or hours.",
    "sources": [
      {
        "label": "Orange Show Center: Beer Can House and closure information",
        "url": "https://www.orangeshow.org/visit"
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
        "url": "https://www.tshaonline.org/handbook/entries/country-music"
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
        "url": "https://www.tshaonline.org/handbook/entries/texas-mexican-conjunto"
      }
    ]
  },
  "169": {
    "topic": "A conference, not one outdoor music festival",
    "fact": "South by Southwest began in Austin as a music-focused gathering in 1987 and has expanded to conferences, film, television, music and other programming with distinct badge, event and venue rules. It should not be confused with the fall ACL music festival.",
    "usefulFor": "Find the actual program track, credential or public event for the year you're attending; do not assume a single concert ticket includes SXSW conferences or film screenings.",
    "sources": [
      {
        "label": "SXSW: official history and event programs",
        "url": "https://www.sxsw.com/about/"
      }
    ]
  },
  "170": {
    "topic": "Television institution, not the festival",
    "fact": "Austin City Limits is a PBS performance series, whose Willie Nelson pilot was taped in October 1974 and whose national broadcasts began in 1975. It is distinct from the Austin City Limits Music Festival.",
    "usefulFor": "Use the TV show's performance and audience guidance for tapings; do not use a festival ticket schedule as the television program's calendar.",
    "sources": [
      {
        "label": "Austin City Limits: official program FAQ",
        "url": "https://acltv.com/faq/"
      }
    ]
  },
  "171": {
    "topic": "Seasonal fair versus year-round park",
    "fact": "The State Fair of Texas is a seasonal event at Fair Park; Big Tex is its prominent greeter, not a permanent year-round fair attraction. The 2026 fair closed in October, and future dates require a fresh calendar.",
    "usefulFor": "Plan Fair Park architectural visits separately from admission to the next State Fair. Verify the upcoming year's dates, gates and events with the official organizer.",
    "sources": [
      {
        "label": "State Fair of Texas: 2026 season close",
        "url": "https://bigtex.com/faq/"
      }
    ]
  },
  "176": {
    "topic": "Fiesta is many organizations and histories",
    "fact": "Fiesta San Antonio grew from the 1891 Battle of Flowers Parade and now includes river events, neighborhood celebrations and royal-court traditions whose dates and organizations differ.",
    "usefulFor": "Use the official Fiesta event list to select specific events and tickets rather than treating a multi-day civic festival as one venue with universal hours.",
    "sources": [
      {
        "label": "Fiesta San Antonio: historical event timeline",
        "url": "https://fiestasanantonio.org/fiesta-history/"
      }
    ]
  },
  "177": {
    "topic": "The concert is only one part of the rodeo",
    "fact": "Houston’s livestock show includes youth agriculture, auctions and education funding alongside rodeo competition and stadium concerts. The nonprofit's 2026 published commitment included separate scholarship and junior exhibitor allocations.",
    "usefulFor": "Compare a livestock-show visit with a rodeo-and-concert ticket; check the organizer for individual admission, schedule and scholarship information rather than assuming one ticket covers everything.",
    "sources": [
      {
        "label": "Houston Livestock Show and Rodeo: education programs",
        "url": "https://www.rodeohouston.com/scholarships-and-grants/"
      }
    ]
  },
  "178": {
    "topic": "Agricultural show versus arena show",
    "fact": "The Fort Worth Stock Show & Rodeo combines livestock competition, youth agriculture, community exhibits and organized rodeo events. It takes place on a seasonal calendar rather than operating as a daily year-round ranch attraction.",
    "usefulFor": "Choose whether your visit is for a particular livestock judging, rodeo performance, cattle exhibit or grounds event, and confirm the associated ticket and scheduled day with the organizer.",
    "sources": [
      {
        "label": "Fort Worth Stock Show and Rodeo: event information",
        "url": "https://www.fwssr.com/"
      }
    ]
  },
  "179": {
    "topic": "Trail rides are organized, not open-access processions",
    "fact": "Rodeo trail rides are coordinated community groups traveling with horses, wagons and support crews into rodeo celebrations. Routes and roadside stopping points depend on permits, local traffic arrangements and weather.",
    "usefulFor": "View from legal designated public areas and use organizer information; do not join or overtake a mounted procession without permission. Look up a specific trail ride before promising a viewing opportunity.",
    "sources": [
      {
        "label": "Houston Livestock Show and Rodeo: trail rides",
        "url": "https://www.rodeohouston.com/trail-rides/"
      }
    ]
  },
  "182": {
    "topic": "Zydeco crosses the state line",
    "fact": "Zydeco is tied particularly to Louisiana Creole traditions, and its reception in Beaumont, Port Arthur and Houston reflects migration and community connections across the Gulf Coast rather than its invention in Texas.",
    "usefulFor": "Look for events that explicitly identify zydeco musicians and dance music instead of labeling all Southeast Texas Cajun, Creole and blues performances as the same genre.",
    "sources": [
      {
        "label": "Handbook of Texas: Texas music history",
        "url": "https://www.tshaonline.org/handbook/projects/texas-music"
      }
    ]
  },
  "183": {
    "topic": "Youth livestock auctions are educational institutions",
    "fact": "Junior livestock auctions reward young agricultural exhibitors and raise funds through sale events, scholarships or premiums; each show sets its own judging and donation rules. They are more than entertainment for visiting rodeo audiences.",
    "usefulFor": "Choose whether you want to watch judging, purchase an animal at auction or support educational fundraising. The relevant event's official schedule and eligibility rules govern each option.",
    "sources": [
      {
        "label": "Houston Livestock Show and Rodeo: scholarships and grants",
        "url": "https://www.rodeohouston.com/scholarships-and-grants/"
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
  "188": {
    "topic": "Ceremonial titles are distinct",
    "fact": "Fiesta San Antonio's official royalty has multiple roles and organizations, including King Antonio, Rey Feo, the Charro Queen and Queen of Soul. Those aren't interchangeable and should not all be described as one historical royal court.",
    "usefulFor": "If you wish to attend or photograph appearances, check each official Fiesta schedule; the Fiesta organizing body publishes a current list and explains the roles and community service aspects.",
    "sources": [
      {
        "label": "Fiesta San Antonio: official royalty and participating organizations",
        "url": "https://fiestasanantonio.org/official-fiesta-royalty/"
      }
    ]
  },
  "190": {
    "topic": "School-specific custom, not an official statewide rule",
    "fact": "Homecoming mums are evolving school and community-made displays, with size, colors, costs and expectations varying widely. The wearable decorations are distinct from a school's official uniform or an organized contest.",
    "usefulFor": "Check each school's traditions and dress guidance before making or buying a mum; the history is better explained through Texas homecoming culture than through a generic product gallery.",
    "sources": [
      {
        "label": "Texas homecoming mums historical guide",
        "url": "/texas-homecoming-mums"
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
  "195": {
    "topic": "The slogan has a commercial history",
    "fact": "Keep Austin Weird emerged from a local independent-business campaign and became a widely reused urban identity slogan. It is an example of modern branding, not evidence that every Austin resident shares a single countercultural identity.",
    "usefulFor": "Compare the original small-business support context with commercial reuse, and use it as a lens for independent shopping rather than a literal visitor promise that a neighborhood will be unusual.",
    "sources": [
      {
        "label": "Austin Independent Business Alliance: local business mission",
        "url": "https://ibuyaustin.com/"
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
  "203": {
    "topic": "Feral hogs are not javelinas",
    "fact": "Feral hogs are introduced true pigs that damage habitats and agriculture. Collared peccaries look pig-like but belong to a different mammalian family; combining them as one invasive species is a biological error.",
    "usefulFor": "For identification and land-management issues, use TPWD guidance. Do not treat hog sightings as an invitation to approach wildlife or assume hunting permissions.",
    "sources": [
      {
        "label": "TPWD: exotic species and javelina distinction",
        "url": "https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/exotic-species"
      }
    ]
  },
  "210": {
    "topic": "A state fish with conservation work behind it",
    "fact": "The native Guadalupe bass is more than a state symbol: TPWD documents restoration and conservation efforts across central Texas watersheds, including stocking and habitat work since 1991.",
    "usefulFor": "Consult TPWD's public-access and current fishing guidance to find legitimate places to fish, and confirm identification and regulations before keeping any catch.",
    "sources": [
      {
        "label": "TPWD: Guadalupe bass restoration and public access",
        "url": "https://tpwd.texas.gov/fishboat/fish/management/guadalupe-bass/"
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
  "215": {
    "topic": "Peccaries, not wild pigs",
    "fact": "Javelinas are collared peccaries native to the Southwest, commonly seen in South Texas thornscrub, the Trans-Pecos and nearby habitats. They are not domestic hogs or an imported feral-swine population.",
    "usefulFor": "Identify the distinctive light shoulder collar and pig-like shape from a distance. Never approach or feed family groups near roads or camps.",
    "sources": [
      {
        "label": "TPWD: javelina range and behavior",
        "url": "https://tpwd.texas.gov/landwater/land/habitats/trans_pecos/big_game/javelina/"
      }
    ]
  },
  "217": {
    "topic": "A state shell with a left-handed spiral",
    "fact": "The lightning whelk is a marine mollusk whose shell winds counterclockwise, unlike many familiar coiled shells. Texas designated it the official state shell in 1987; living whelks remain part of the coastal ecosystem.",
    "usefulFor": "Compare shells without removing live animals from their habitat. Check local beach and park collecting rules rather than assuming anything washed ashore can be taken.",
    "sources": [
      {
        "label": "TPWD: lightning whelk identification and state symbol",
        "url": "https://tpwd.texas.gov/fishboat/fish/didyouknow/coastal/whelk.phtml"
      }
    ]
  },
  "218": {
    "topic": "Why mature cedar-oak woodland matters",
    "fact": "Ashe juniper is sometimes casually dismissed as 'cedar', but mature Ashe juniper and oak woodland provides nesting habitat for endangered golden-cheeked warblers, which breed only in central Texas.",
    "usefulFor": "When evaluating land-clearing or trail advice, distinguish young invasive woody growth from intact mature woodland and observe nesting habitat without disturbance.",
    "sources": [
      {
        "label": "TPWD: golden-cheeked warbler habitat",
        "url": "https://tpwd.texas.gov/huntwild/wild/species/gcw/"
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
        "url": "https://www.txdot.gov/about/campaigns-outreach/dont-mess-with-texas.html"
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
  "225": {
    "topic": "Flag-display rules are ordinary, not an exception",
    "fact": "Texas's Lone Star Flag was adopted by the Republic in 1839. State law describes display with the U.S. flag on equal-height poles of approximately equal-size flags, with the U.S. flag given the prescribed position; this is not a special Texas entitlement.",
    "usefulFor": "Check the Texas Government Code and federal Flag Code rather than repeating the myth that Texas can fly its state flag higher than the national flag.",
    "sources": [
      {
        "label": "Texas Government Code: Chapter 3100",
        "url": "https://statutes.capitol.texas.gov/?artSec=3100.065&chapter=GV.3100&code=GV&tab=1"
      },
      {
        "label": "Texas State Law Library: flag-height myth",
        "url": "https://www.sll.texas.gov/faqs/texas-flag-height/"
      }
    ]
  },
  "226": {
    "topic": "Six different sovereignties, not six identical eras",
    "fact": "The six-flags shorthand brings together Spain, France, Mexico, the Republic, the Confederacy and the United States, but the duration and geographic reach of control differed substantially. The Confederate period must be placed in the history of secession and slavery.",
    "usefulFor": "Use an actual historical timeline rather than reading each flag as evidence of an equal, peaceful or modern statewide government.",
    "sources": [
      {
        "label": "Texas State Historical Association: flags of Texas",
        "url": "https://www.tshaonline.org/handbook/entries/flags-of-texas"
      }
    ]
  },
  "228": {
    "topic": "Separate ranch labor from branding",
    "fact": "The King Ranch is an operating South Texas ranching enterprise, not a free public heritage park. Its history includes large-scale livestock breeding, workers and vaquero traditions that are broader than the brand's famous name.",
    "usefulFor": "If interested in touring, consult the ranch's own published visitor experiences; do not enter private ranch gates or treat a branded retail store as a historic cattle ranch tour.",
    "sources": [
      {
        "label": "King Ranch: official visitor and history information",
        "url": "https://king-ranch.com/"
      }
    ]
  },
  "229": {
    "topic": "Law enforcement and borderlands require balance",
    "fact": "The Texas Rangers became an enduring law-enforcement institution through changing political and legal periods, with both celebrated detective work and documented violence against Mexican American communities in the borderlands.",
    "usefulFor": "Compare Texas Ranger institutional histories with the Texas Historical Commission's borderlands interpretation rather than letting movies and folklore stand in for the record.",
    "sources": [
      {
        "label": "Texas Historical Commission: 1919 Ranger investigations and border history",
        "url": "https://thc.texas.gov/"
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
  "236": {
    "topic": "A Southwestern tall tale, not a biological species",
    "fact": "The jackalope is a fictional antlered rabbit in Western souvenir and storytelling traditions. A figure found in a Texas gift shop is evidence of playful folklore, not that the creature originated in Texas or exists in the wild.",
    "usefulFor": "Class it as humor or tourist imagery. Do not recommend a supposed wildlife-viewing area or present souvenir claims as zoological evidence.",
    "sources": [
      {
        "label": "Texas slang and folklore context",
        "url": "/texas-slang-explained"
      }
    ]
  },
  "237": {
    "topic": "Hyperbole is the historical subject",
    "fact": "Pecos Bill is a mythical cowboy whose impossible feats were retold in range-hand stories and later printed versions. The Handbook of Texas does not establish a single documented real-life person behind him.",
    "usefulFor": "Compare versions as storytelling and literary history, not as an itinerary for finding an actual historical Pecos Bill homesite.",
    "sources": [
      {
        "label": "Texas State Historical Association: Pecos Bill",
        "url": "https://www.tshaonline.org/handbook/entries/pecos-bill"
      }
    ]
  },
  "238": {
    "topic": "Separate song and folklore",
    "fact": "The earliest documented version of The Yellow Rose of Texas appeared in an 1853 blackface-minstrel collection. Later Texas Revolution links and accounts identifying a single historical heroine are not established by those early song documents; explaining that racial and performance history is essential.",
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
  "240": {
    "topic": "Dialect pronunciation is not a statewide census",
    "fact": "Pronunciations such as 'right cheer' are examples of informal, localized speech, not reliable markers of Texas residence or ethnicity. No single written spelling captures how all rural Texans pronounce a phrase.",
    "usefulFor": "Use a contextual recorded speaker or a documented linguistic study before assigning a phrase to a whole region, age group or community.",
    "sources": [
      {
        "label": "Texas slang guide: regional limitations",
        "url": "/texas-slang-explained"
      }
    ]
  },
  "243": {
    "topic": "A cattle trail was a working corridor",
    "fact": "Post-Civil War cattle drives moved Longhorns to railheads and markets across multiple routes, often passing through Indigenous lands and changing settlements. Trail names on a map do not mean a modern uninterrupted road follows the original hoofprints.",
    "usefulFor": "For a real driving itinerary use marked heritage sites, museums and legal public roads. Don't assume old routes cross only public land or that a historical marker designates a safe place to park.",
    "sources": [
      {
        "label": "Texas State Historical Association: Chisholm Trail",
        "url": "https://www.tshaonline.org/handbook/entries/chisholm-trail"
      }
    ]
  },
  "244": {
    "topic": "A Gulf Coast borrowing, not an invented Texan word",
    "fact": "Lagniappe is widely associated with Louisiana and Gulf Coast usage, where it means a little extra. Its presence in Southeast Texas reflects cultural exchange across the Sabine rather than a unique Texas etymology.",
    "usefulFor": "Explain the Louisiana connection and use a real merchant or conversational example instead of claiming the term was coined in Texas.",
    "sources": [
      {
        "label": "Texas cultural regions and cross-border influences",
        "url": "/article/texas-cultural-regions-explained"
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
export const VERIFIED_TEXAS_ICON_FIELD_IDS = [50,51,88,91,92,93,95,96,100,101,104,107,108,118,121,122,123,124,125,126,127,128,130,131,133,134,136,139,141,142,143,146,147,149,150,151,166,167,168,169,170,171,176,177,178,179,182,183,185,188,190,192,194,195,196,197,200,201,203,210,212,215,217,218,219,221,222,223,224,225,226,228,229,232,236,237,238,239,240,243,244,249] as const;
