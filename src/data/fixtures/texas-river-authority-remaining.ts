import type { Article, ArticleBlock } from "../types";
import { sharedRiverPlanningLinks } from "./texas-river-shared-links";

const p = (text: string): ArticleBlock => ({ type:"paragraph", text });
const h = (text: string): ArticleBlock => ({ type:"heading", text });
export const additionalExistingRiverAuthorityResearch = [
  {
    "slug": "texas-trinity-river-guide",
    "name": "Trinity River",
    "context": "The Trinity is not one Dallas-Fort Worth float. Its West Fork, Elm Fork, East Fork and lower basin serve different communities and have different flood behavior, wastewater influence, dams, access and fishing pressure. The lower river's wide floodplain and wetland habitat need separate treatment from the developed urban reach.",
    "route": "For visitors near Arlington, TPWD's River Legacy Parks Paddling Trail has an identified access point inside the park at Collins Street, near the pedestrian bridge (32.7882, -97.1003). Dallas's separate 10.2-mile TPWD trail includes a channelized stretch, the Dallas Wave feature and a more natural downstream section; do not confuse the access instructions or assume unmarked hydraulic features are safe. Each river park has its own local hours and closures.",
    "fish": "On the River Legacy Parks paddling reach of the West Fork of the Trinity in Arlington, TPWD explicitly warns that a fish-consumption advisory covers all fish species and advises anglers not to eat fish taken from that stretch. Its recreation description also says the river there is suitable for paddling and incidental water contact, not swimming. Anglers may still encounter sunfish, largemouth bass and catfish, but fishing opportunity must be separated from harvest safety. Confirm the current Texas Department of State Health Services advisory boundary before keeping fish from any other Trinity reach. Reservoir fisheries, downstream waters and other forks may have distinct advisories, regulations and access conditions.",
    "camp": "For a weekend, pair the named public river park with approved campgrounds near Lake Worth, Lake Lewisville or Lake Livingston as separately identified *reservoir and basin* destinations; none of those is automatically a campsite on the flowing Trinity main stem. Confirm boat ramps, night access, permits, RV facilities and water-quality notices with the operator.",
    "visit": "An urban itinerary may pair a River Legacy Parks access morning with the park's nature-trail network; a different trip uses Dallas access and downtown river history. For families and people with mobility requirements, contact the managing park about paths to water, ramps and accessible restrooms; trail mileage does not prove accessible launch facilities.",
    "faq": [
      [
        "Where can I launch on the Trinity?",
        "One TPWD-mapped option is the River Legacy Parks access point in Arlington; additional trail options have completely separate rules and put-ins."
      ],
      [
        "Is the Dallas Trinity paddling route beginner-safe all the way?",
        "Do not assume so. The Dallas route includes the Dallas Wave and different channel conditions; investigate current hazards, necessary portage and an explicit take-out."
      ],
      [
        "Can I camp along the urban Trinity?",
        "Only in a specifically authorized facility. River proximity or navigability does not permit camping on city or privately owned banks."
      ],
      [
        "Is the Trinity the same as the lakes in its watershed?",
        "No. Lake Lewisville, Lake Livingston and other impoundments have different fisheries, ramps, rules and habitats than the main river."
      ],
      [
        "How do I check if the Trinity is safe to paddle today?",
        "Use real-time nearby USGS gauges, NWS flood products and the launch operator's current advice; neither gauge data nor a historic route estimate guarantees safety."
      ],
      [
        "Is swimming advised at Arlington's River Legacy Parks paddling trail?",
        "No. TPWD's River Legacy Parks trail description says the West Fork site is intended for paddling and incidental water contact but not swimming. Check current river quality notices before any outing."
      ],
      [
        "Can I eat fish from the River Legacy Parks section of the Trinity?",
        "TPWD describes an all-species fish consumption advisory for its River Legacy Parks trail reach and advises against eating caught fish there. Consult current Texas DSHS advisories for any other Trinity location."
      ]
    ],
    "official": [
      [
        "TPWD River Legacy Parks trail",
        "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/river-legacy-parks/"
      ],
      [
        "TPWD Dallas Trinity trail",
        "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/dallas-trinity/"
      ]
    ]
  },
  {
    "slug": "texas-rio-grande-river-guide",
    "name": "Rio Grande",
    "context": "Texas's Rio Grande combines managed international water, remote desert canyons, crossings, reservoirs and lower-valley irrigation; each is a distinct visitor setting. The river forms an international boundary, so obey both U.S. laws and relevant border regulations. Do not treat a scenic overlook at Big Bend, an Amistad boat ramp and the international lower river as interchangeable access.",
    "route": "Big Bend National Park's Santa Elena, Mariscal and Boquillas Canyon journeys have site-specific launch, take-out, difficulty and permit requirements; check NPS before choosing a route. NPS requires a backcountry-use permit before a watercraft is used on the Rio Grande within Big Bend National Park, except for day-use inner tubes. **That day-use permit exemption does not authorize inner tubes through major canyons:** the same official regulation prohibits inner tubes in Santa Elena, Mariscal and the Lower Canyons. The park also specifies personal flotation device requirements, extra paddles, waste containment and other safety equipment. Never describe a permit exemption as unrestricted access.",
    "fish": "Fishing in NPS-managed reaches, Amistad and Falcon Reservoir involves separate permit, license, species and boating rules, including potential cross-border and waterbody-specific issues. Never borrow reservoir bag limits or fishing access from another location without checking TPWD and the managing federal authority for the chosen reach.",
    "camp": "Inside Big Bend, use properly permitted national-park camping and river-trip itineraries. On Amistad or Falcon, research individual permitted campgrounds and boat launches; riverbank camping in remote private or international areas is not automatically lawful. Confirm drinking water, border safety, heat and cell coverage.",
    "visit": "First-time visitors can plan land-based Big Bend viewpoints before considering specialized multi-day water trips. Guided programs and interpretation explain canyon geology and human history; visitors should avoid an unprepared river crossing or entry where no designated exit exists.",
    "faq": [
      [
        "Do I need a permit to canoe the Rio Grande in Big Bend?",
        "Yes. NPS requires a backcountry-use permit for watercraft on the Rio Grande within the park. Day-use inner tubes have a permit exemption, but inner tubes are prohibited in Santa Elena, Mariscal and the Lower Canyons; the exemption must not be read as permission to float these canyons."
      ],
      [
        "Is the Rio Grande a single float trip from El Paso to the coast?",
        "No. It crosses remote canyons, dams, international reservoirs, urban areas and managed irrigation systems with different legal requirements and access."
      ],
      [
        "Can I cross the river into Mexico while paddling?",
        "An international river crossing raises immigration and border requirements; follow official border and park instructions, not casual trip recommendations."
      ],
      [
        "Where can families learn about the Rio Grande without boating?",
        "Publicly managed Big Bend park overlooks and interpretive facilities are suitable planning anchors when the park is open and conditions allow."
      ],
      [
        "Does a river gauge mean the canyon is safe?",
        "No. Water levels are only one risk input; assess weather upstream, canyon rescue access, boating skill, permits and local NPS alerts."
      ]
    ],
    "official": [
      [
        "Big Bend NPS river use regulations",
        "https://www.nps.gov/bibe/learn/management/riverregs.htm"
      ],
      [
        "Big Bend paddling and river trips",
        "https://www.nps.gov/bibe/planyourvisit/river-trips.htm"
      ]
    ]
  },
  {
    "slug": "texas-canadian-river-guide",
    "name": "Canadian River",
    "context": "The Canadian crosses the Texas Panhandle, but Lake Meredith, shallow or dry river reaches and flood-prone tributary draws offer very different recreation. It flows eastward into other states; the Texas river map is not a list of continuous public paddling opportunities. Wind and changing lake levels can matter more to day visitors than the main-stem river current.",
    "route": "Lake Meredith National Recreation Area, operated by NPS near Fritch, is the clearest official visitor-management base in the Texas Canadian River watershed. Choose a designated shore or boat access based on present lake elevation and closure status. Do not describe the reservoir as a guaranteed continuous canoe float down the Canadian's free-flowing Texas channel.",
    "fish": "Lake Meredith's fishing programs reflect a reservoir fishery; species and limits should come from current NPS/TPWD waterbody guidance, not extrapolation upstream into the shallow Canadian River. Check current licenses, aquatic invasive-species rules, lake access and consumption advisories.",
    "camp": "NPS describes several Lake Meredith campgrounds including Sanford-Yake, with a small set of electric-and-water RV sites that require reservations; other designated camping opportunities differ by site. Public camping inside the recreation area does not authorize camping anywhere along the Canadian, and lake-level or fire notices may restrict access.",
    "visit": "Pair the recreation area with Alibates Flint Quarries National Monument's ranger-led interpretation, but check program reservations and seasonal park access. Allow for exposed Panhandle weather, higher winds and substantial driving distances between facilities.",
    "faq": [
      [
        "Where should a first-time Canadian River visitor go?",
        "The federally operated Lake Meredith National Recreation Area has established visitor access and facilities, though it is an impoundment within the basin."
      ],
      [
        "Can I paddle the entire Texas Canadian?",
        "Do not assume a continuous maintained trail. Many reaches are shallow, intermittent or privately bounded; identify a managed access first."
      ],
      [
        "Is free camping available at Lake Meredith?",
        "NPS lists multiple first-come camping options along with some reservation-only utility sites; verify current individual campground rules and fees."
      ],
      [
        "Are Lake Meredith fish the same as those upstream?",
        "No. Reservoir fisheries and shallow river habitats differ; use specific TPWD/NPS data for your waterbody."
      ],
      [
        "How do I plan for Panhandle weather?",
        "Check NWS wind and storm alerts, extreme temperatures, NPS closures and safe boat ramp condition before leaving a service town."
      ]
    ],
    "official": [
      [
        "NPS Lake Meredith camping",
        "https://www.nps.gov/lamr/planyourvisit/camping.htm"
      ],
      [
        "NPS Lake Meredith visitor information",
        "https://www.nps.gov/lamr/planyourvisit/index.htm"
      ]
    ]
  },
  {
    "slug": "texas-cypress-river-basin-guide",
    "name": "Big Cypress Bayou and Cypress River Basin",
    "context": "The Cypress system includes Big Cypress Bayou, Lake O' the Pines and Caddo Lake's connected wetlands. It is not a large open river with one channel all visitors can follow. TPWD maps multiple marked paddling trails in both bayou and lake sections, and marsh or backwater routes can feel very different from rivers with strong downstream current.",
    "route": "TPWD maps the 3.8-mile Cathedral Paddling Trail at Caddo Lake with the Shady Glade Resort ramp on Cypress Drive in Uncertain as an access anchor. TPWD notes the private launch charges a fee. Marker colors and numbered boat roads are important for navigation; adjoining private lakeside areas, motorboat lanes and wildlife areas have their own rules.",
    "fish": "The system supports bass, sunfish, catfish and panfish in locations including Caddo Lake, but regulations are waterbody-specific and may involve a Texas-Louisiana boundary. Avoid giving fish limits based only on a general basin map. TPWD also notes seasonal hunting in nearby marshes and discourages swimming in swamp waters.",
    "camp": "Caddo Lake State Park is a managed camping base, but entry to some Caddo Lake Wildlife Management Area paddling routes can require permits. A resort launch fee does not include an overnight stay; verify water access, ramp hours, toilets, RV hookups and campsite inventory for the actual reservation.",
    "visit": "Jefferson's heritage and Uncertain's bayou paddling make complementary stops. Arrange one clearly marked loop with enough daylight, navigation skill, insect protection and a plan for low visibility among cypress stands.",
    "faq": [
      [
        "Is Big Cypress Bayou the same as Caddo Lake?",
        "They are connected parts of the Cypress drainage, but the bayou and lake have different channels, access points and boating conditions."
      ],
      [
        "Which Caddo route has an explicit mapped private launch?",
        "The TPWD Cathedral route begins at Shady Glade Resort; a launch fee applies and should be confirmed with the business."
      ],
      [
        "Can I swim in the cypress swamp?",
        "TPWD's Caddo/Big Cypress trail descriptions discourage swamp swimming; plan identified land and water recreation instead."
      ],
      [
        "Where can I camp legally?",
        "Use Caddo Lake State Park or another permitted operator; wildlife management areas and private launch lots may have different camping permissions."
      ],
      [
        "How do I avoid getting lost in bayou channels?",
        "Follow the TPWD trail map and color-coded markers, check weather, carry offline navigation and never assume every side channel rejoins your planned route."
      ]
    ],
    "official": [
      [
        "TPWD Cathedral paddling trail",
        "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/cathedral/"
      ],
      [
        "TPWD Caddo/Big Cypress trail inventory",
        "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/"
      ]
    ]
  },
  {
    "slug": "texas-lavaca-river-guide",
    "name": "Lavaca River",
    "context": "The Lavaca crosses Gulf Coastal Plain agricultural landscapes toward Lavaca Bay, with the Navidad River and Lake Texana important in the broader basin. The navigable lower estuary is not the same recreation environment as the smaller upstream channel. Salinity, tides, flood pulses, floodplain access and boat type matter to trip planning.",
    "route": "A first-time recreation plan should use a verified public boat ramp on the coast or a confirmed Lake Texana access operator, rather than treating any highway river bridge as a launch. Refer visitors to TPWD's official boating access and fishing pages and to Jackson County park management before naming a ramp as open. A map of the Lavaca watershed does not verify public riverbank access.",
    "fish": "Lower Lavaca estuarine waters can support salt- and brackish-water fishing where lawful access exists, while the upper watershed and Lake Texana have different fisheries. Use the applicable TPWD coastal or freshwater regulations by waterbody, and check seafood consumption advisories before keeping catch. An upstream freshwater bag limit should not be applied to Lavaca Bay.",
    "camp": "Lake Texana-area camping, Jackson County parks and Gulf Coast lodging may make sense for separate itineraries. Only a listed campground with current authorization counts as an overnight option; local public boat ramps and shoreline overlooks do not automatically allow camping.",
    "visit": "A good regional itinerary contrasts inland Edna and its historic community context with an intentional coastal Lavaca Bay stop. River-oriented accessibility should be checked at the specific ramp or park, particularly after heavy rains and coastal storms.",
    "faq": [
      [
        "Where does the Lavaca River end?",
        "It drains toward Lavaca Bay on the Texas coast; upstream flow and tidal or brackish lower areas require different visitor plans."
      ],
      [
        "Is Lake Texana the Lavaca River?",
        "Lake Texana is associated with the Navidad watershed in the Lavaca-Navidad basin, not the same as every Lavaca main-stem reach."
      ],
      [
        "Can I float the upper Lavaca from any road?",
        "No. A mapped watercourse and a public roadway do not automatically grant lawful riverbank entry, parking or safe put-in access."
      ],
      [
        "What kind of fishing license is needed near Lavaca Bay?",
        "Check TPWD's current saltwater/freshwater boundary and endorsement requirements for your exact location."
      ],
      [
        "Where should I camp?",
        "Choose an explicitly permitted park or commercial property near the specific inland lake or coastal reach, rather than assuming the riverbank is open camping."
      ]
    ],
    "official": [
      [
        "TWDB Lavaca basin overview",
        "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/lavaca/index.asp"
      ],
      [
        "TPWD boating and paddling trail finder",
        "https://tpwd.texas.gov/boating/paddling-trails/"
      ]
    ]
  },
  {
    "slug": "texas-nueces-river-guide",
    "name": "Nueces River",
    "context": "The Nueces is broader than the Concan Frio tourist corridor: upper limestone-and-spring country, the Atascosa/Frio watershed and lower South Texas river have different water availability and trip goals. Don't confuse the Nueces main stem with the Frio tributary, with Choke Canyon Reservoir, or with tidal Nueces Bay.",
    "route": "TPWD's 4.3-mile Nueces River Paddling Trail begins at Live Oak County Park on Airport Road near George West (28.3741, -98.1159) and exits at US Highway 59 (28.3335, -98.0866). TPWD estimates 2–4 hours depending on flow and wind and notes motorboat traffic. Confirm live county-park access, a shuttle and flood advisories before considering the route.",
    "fish": "TPWD lists catfish, sunfish and alligator gar along the George West route and warns that alligators can occur. Use the right TPWD freshwater regulations and fish-consumption advisories, and do not confuse that river fishery with fish in the downstream Nueces Bay estuary.",
    "camp": "A George West trip can use legally permitted nearby campgrounds and Choke Canyon State Park in the wider Nueces basin, but do not label the impounded reservoir as the free-flowing lower Nueces or guarantee campsites at the put-in. Confirm restrooms, RV hookups, drinking water and reservation rules with each operator.",
    "visit": "Pair the lower-river trail with George West's local-history stops or an independently planned Choke Canyon wildlife trip. For upper-river recreation use independently verified access on the Nueces headwaters, not Frio River commercial-float instructions.",
    "faq": [
      [
        "Is the Nueces the same river as the Frio?",
        "No. The Frio is a tributary in the broader Nueces watershed; the main Nueces has separate river reaches and access."
      ],
      [
        "Where is an official lower Nueces paddling route?",
        "TPWD maps 4.3 miles from Live Oak County Park in George West to the Highway 59 take-out."
      ],
      [
        "Is wildlife a consideration at George West?",
        "Yes. TPWD cautions that alligators may occur and notes motorboat traffic; keep distance and follow water safety rules."
      ],
      [
        "Can I camp at the boat launch?",
        "Do not assume so. Check Live Oak County Park's posted overnight rules and book a designated campground when needed."
      ],
      [
        "Can I apply coastal fishing rules to the whole river?",
        "No. Check the TPWD boundary and local waterbody regulations rather than using a single rule for the upper river and Nueces Bay."
      ]
    ],
    "official": [
      [
        "TPWD Nueces River trail, George West",
        "https://tpwd.texas.gov/boating/paddling-trails/south-texas-plains/nueces-river/"
      ],
      [
        "TPWD Choke Canyon park",
        "https://tpwd.texas.gov/state-parks/choke-canyon"
      ]
    ]
  },
  {
    "slug": "texas-red-river-guide",
    "name": "Red River",
    "context": "The Red River follows Texas's northern border in multiple places and connects to Lake Texoma, a major interstate reservoir. The border reach, reservoir, dam tailwater and East Texas tributaries cannot share one access or fishing rule. Flood hazards, currents, sandbars and riverbank ownership merit special attention.",
    "route": "For managed water access begin with Eisenhower State Park on Lake Texoma, which is a *reservoir* associated with the Red River system, or another verified TPWD/corps-managed location. Never market the wide free-flowing Red River as a casual float from an arbitrary Oklahoma or Texas roadside. Identify where state boundaries and local access authority matter.",
    "fish": "TPWD specifically describes Lake Texoma as a self-sustaining landlocked striped-bass fishery and lists special licensing options and species limits, including cross-border access considerations. The Red River below the dam has distinct invasive-species and live bait transport restrictions. Do not give one generalized bag-limit table for all locations.",
    "camp": "Eisenhower State Park and other managed Texoma shore campgrounds are practical overnight bases; confirm specific park amenities, water access, campsite reservations and boat-trailer policies. A Texoma shoreline campsite is not proof of a legal campsite on a distant Red River sandbar.",
    "visit": "A visitor itinerary can combine Lake Texoma's managed day-use facilities with regional history stops. For remote Red River exploration check local land permissions, gauges and weather first; the route is not a universally marked commercial float.",
    "faq": [
      [
        "Is Lake Texoma in both Texas and Oklahoma?",
        "Yes. TPWD lists special Texas and full-lake licensing options and species limits, so identify your actual fishing waters."
      ],
      [
        "Is the Red River safe to float wherever it crosses a highway?",
        "No. Legal parking, water access, recent floods and riverbed conditions must each be verified; a bridge does not provide a maintained launch."
      ],
      [
        "Do Red River fishing rules differ downstream of Texoma?",
        "Yes. TPWD describes restrictions on transport of live non-game fish from certain downstream river reaches; check current rules."
      ],
      [
        "Where can I camp near the Red River system?",
        "Designated Lake Texoma parks offer a managed base; overnight use of other riverfront property needs specific permission."
      ],
      [
        "Is the Red River the same as the Trinity?",
        "No. They drain different basins, though both have major reservoirs and northern Texas tributaries."
      ]
    ],
    "official": [
      [
        "TPWD Lake Texoma rules",
        "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/texoma/"
      ],
      [
        "TPWD Eisenhower State Park",
        "https://tpwd.texas.gov/state-parks/eisenhower"
      ]
    ]
  },
  {
    "slug": "texas-san-antonio-river-guide",
    "name": "San Antonio River",
    "context": "This river has an urban headwaters/River Walk reach, a restored Mission Reach, more rural reaches toward Goliad and a downstream junction with the Guadalupe. A downtown pedestrian riverfront is not by itself a launch or a public campground. The restored Mission Reach is a particularly useful example of how engineered chutes, public access and habitat protection coexist.",
    "route": "TPWD maps an 8-mile Mission Reach Paddling Trail from Roosevelt Park (29.4015, -98.4883) to Camino Coahuilteca (29.3196, -98.4489), with intermediate access points and a published estimate of 3–5 hours under normal conditions. It has numerous canoe chutes; paddlers should avoid strong urban runoff after rain and use official San Antonio River Authority flow-quality alerts.",
    "fish": "TPWD identifies largemouth bass, catfish and sunfish along Mission Reach, but urban river fisheries need present-day water quality and fish-consumption checks. Do not apply rules from other waters or assume fishing is permitted on every decorated downtown riverfront property.",
    "camp": "River Walk-area hotels serve downtown tourism; permitted campgrounds and Goliad State Park serve entirely different portions of the river's geography. For an actual canoe trip, confirm overnight allowances, operator amenities and launch rights separately from a hotel's riverside location.",
    "visit": "Pair the Mission Reach with San Antonio Missions National Historical Park and its trail corridor or a downtown heritage day. A different itinerary follows Goliad and the mission/civil war history; avoid presenting all stops as a walkable single afternoon.",
    "faq": [
      [
        "Can I kayak the San Antonio River?",
        "Yes on designated reaches such as the TPWD Mission Reach route, subject to current river conditions and posted launch rules."
      ],
      [
        "How long is the TPWD Mission Reach trail?",
        "Its published route is eight miles, with several intermediate take-outs; time depends on actual flow and conditions."
      ],
      [
        "Is the downtown River Walk a free public boat launch?",
        "No. Pedestrian attractions and authorized watercraft entry are different facilities; follow operator/river-authority instructions."
      ],
      [
        "Do urban rains affect paddling?",
        "Yes. TPWD warns urban storm runoff can create high flow and poor water quality for several days after rain."
      ],
      [
        "Where can I stay for a Mission Reach trip?",
        "Choose an appropriate San Antonio hotel or authorized campground and separately verify equipment, parking and transport to the chosen launch."
      ]
    ],
    "official": [
      [
        "TPWD Mission Reach route",
        "https://tpwd.texas.gov/boating/paddling-trails/south-texas-plains/mission-reach/"
      ],
      [
        "San Antonio River Authority",
        "https://www.sariverauthority.org/"
      ]
    ]
  },
  {
    "slug": "texas-san-jacinto-river-guide",
    "name": "San Jacinto River",
    "context": "The San Jacinto drains the Houston-region inland tributaries through Lake Conroe and Lake Houston toward Galveston Bay. Forks, controlled reservoir releases, developed floodplain settlements and brackish downstream waters make it hazardous to generalize from one lake or access site to another. The name also refers to the historic San Jacinto battlefield near the lower estuary; do not confuse historic sightseeing with lawful upper-river boat access.",
    "route": "For an official outing, use managed recreation at Lake Conroe or Lake Houston or marked public lands such as Lake Houston Wilderness Park, each of which has its own site rules. The river itself is not one signed city-to-bay paddling route. Before any paddling or bank access, verify flood risk and releases from local water managers as well as current ramp status.",
    "fish": "Lake Conroe and Lake Houston's reservoir fisheries include different managed species, launch arrangements and special local rules. The lower river and tidal connection can require a different license/endorsement category. Check the TPWD waterbody and current advisory rather than copying statewide numbers across the watershed.",
    "camp": "Lake Houston Wilderness Park and permitted regional campgrounds provide possible overnight bases by the wider watershed; confirm operator access before promising an actual riverfront campsite. Floodplain storm risk may change trail and campground availability quickly.",
    "visit": "A credible weekend can separate the San Jacinto Battleground's interpretation, northern watershed nature areas and reservoir boating by geography and journey time. Historic-site access does not authorize recreation in industrial or protected waterfront zones.",
    "faq": [
      [
        "Is Lake Conroe part of the San Jacinto watershed?",
        "Yes, but a reservoir and the free-flowing river have different boat-ramp and fisheries conditions."
      ],
      [
        "Can I access the San Jacinto from any bridge?",
        "No. Use verified agency launches and check legal bank rights, parking and current water levels."
      ],
      [
        "Is San Jacinto Battleground a paddling launch?",
        "Not by default. The landmark is primarily a historical visitor destination; confirm specific water access separately."
      ],
      [
        "Why are floods important on the San Jacinto?",
        "The basin can respond sharply to Houston-area storms, releases and downstream backwater conditions. Check flood warnings and local authorities."
      ],
      [
        "Which fishing rules apply near Galveston Bay?",
        "Check the applicable TPWD freshwater/saltwater boundary, endorsement requirements and local consumption advisories."
      ]
    ],
    "official": [
      [
        "TPWD Lake Conroe fishing",
        "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/"
      ],
      [
        "Houston-area NWS flood safety",
        "https://www.weather.gov/hgx/"
      ]
    ]
  },
  {
    "slug": "texas-sulphur-river-guide",
    "name": "Sulphur River",
    "context": "The Sulphur basin is an East/Northeast Texas system connected to Cooper Lake/Jim Chapman Lake and Wright Patman Lake farther downstream. Reservoir parks provide managed amenities, while remaining river stretches can be remote and muddy or flood-prone. A reservoir day-use site is not an unregulated put-in to the full Sulphur main stem.",
    "route": "Cooper Lake State Park's South Sulphur and Doctors Creek units provide official, mapped recreational facilities. TPWD explains the South Sulphur River as the source of the unit name. Select a legal park entrance, dock or marked ramp for a lake-based day rather than assuming a paddle connection into an unverified upstream river reach.",
    "fish": "TPWD's Jim Chapman Lake public-access directory distinguishes state-park units, fishing piers, boat ramps and individual amenities. These reservoir-specific fish and license rules do not establish what's safe or legal at an unmapped Sulphur River bank or the separate Wright Patman system.",
    "camp": "Cooper Lake's South Sulphur Unit has screened shelters, including a wheelchair-friendly shelter listed by TPWD, but overnight amenities differ by campground and unit. Confirm actual campsite reservations, RV capacity, pet rules, accessible services and day-use versus overnight fees before suggesting the park.",
    "visit": "A practical weekend combines a managed Cooper Lake recreation day with town visits around Cooper or Sulphur Springs. The wider Sulphur basin's ecology and floodplain history can be explained without recommending remote river launches without published access.",
    "faq": [
      [
        "What is the difference between Cooper Lake and the Sulphur River?",
        "Cooper Lake is a managed reservoir within the Sulphur system, with official ramps and campsites distinct from free-flowing reaches."
      ],
      [
        "Does the South Sulphur Unit offer overnight accommodation?",
        "Yes, TPWD publishes campground and screened-shelter options, but unit rules, openings and reservation status must be checked."
      ],
      [
        "Are there accessible shelters at Cooper Lake?",
        "TPWD identifies at least one wheelchair-friendly South Sulphur screened shelter; confirm availability and detailed accessibility needs with the park."
      ],
      [
        "Can I kayak the entire Sulphur from the park?",
        "Do not assume a continuous, maintained access or safe route along the river. Check the specific launch and river conditions."
      ],
      [
        "Where can I fish?",
        "TPWD maps lake ramps, piers and shoreline access; confirm current waterbody-specific regulations and park-use rules."
      ]
    ],
    "official": [
      [
        "TPWD Cooper Lake access facilities",
        "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cooper/access.phtml"
      ],
      [
        "TPWD Cooper Lake park",
        "https://tpwd.texas.gov/state-parks/cooper-lake"
      ]
    ]
  }
] as const;

/** Enrich all existing basin guides not handled by the five initial recreation upgrades.
 * This retains the existing primary geography content instead of replacing it.
 * Last research review is separate from real-time operational/fishery checking.
 */
export function enhanceRemainingRiverGuide(article: Article): Article {
 const river = additionalExistingRiverAuthorityResearch.find((entry) => entry.slug === article.slug);
 if (!river) return article;
 const body:ArticleBlock[] = [
  h("From watershed map to a real visit"), p(river.context),
  h("Named access and a responsible trip plan"), p(river.route),
  h("Fishing, species and harvest decisions"), p(river.fish),
  h("Camping, RV options and overnight permissions"), p(river.camp),
  h("Worthwhile nearby stops and trip logistics"), p(river.visit),
  h("Visitor questions specific to the "+river.name),
  ...river.faq.flatMap(([question, answer]) => [h(question),p(answer)]),
  h("Official source checks and review schedule"),
  p("This river recreation research was revised October 12, 2026. The official managing sources below support named route and park examples. Current water levels, local access, commercial operations, regulation exceptions and seasonal conditions must still be verified for the trip date. An agency source's unchanged webpage is not proof that an editorial fact-check was completed. This page is not a navigational or flood clearance document."),
  p("Recommended citation: TexasDefined.com, "+river.name+" river guide, recreation and visitor review October 12, 2026."),
 ];
 const seen=new Set((article.internalLinks??[]).map(link=>link.href));
 const links=[...sharedRiverPlanningLinks,
 ...river.official.map(([label,href])=>({href,label,description:"Official agency source for the named access, managed waterbody or rule."}))].filter(link=>!seen.has(link.href));
 const oldSources=article.sources??[];
 const sources=river.official.map(([label,url])=>({label,url})).filter(x=>!oldSources.some(t=>t.url===x.url));
 return {...article, body:[...article.body,...body], updatedAt:"2026-10-12",
   readingMinutes:Math.max(article.readingMinutes??10,15),
   sources:[...oldSources,...sources],internalLinks:[...(article.internalLinks??[]),...links]};
}
