import { majorEventIndexRecords, type MajorEventIndexRecord } from "./major-event-index";
import { verifiedTournamentBySlug } from "./tournaments/verified-profiles";
import { verifiedTournamentBatch3BySlug } from "./tournaments/verified-profiles-batch3";
import { verifiedTournamentBatch4BySlug } from "./tournaments/verified-profiles-batch4";
import { verifiedTournamentBatch5BySlug } from "./tournaments/verified-profiles-batch5";
import { verifiedTournamentBatch6BySlug } from "./tournaments/verified-profiles-batch6";
import { verifiedTournamentBatch7BySlug } from "./tournaments/verified-profiles-batch7";

export interface MajorEventSource { label: string; url: string; }
export interface MajorEventPlanningSection { title: string; body: string; }
export interface MajorEventRelatedLink { href: string; label: string; description: string; }
interface MajorEventAuthorityDetails {
  slug: string;
  whyItMatters: string;
  planningSections: MajorEventPlanningSection[];
  // Optional, individually sourced visitor essentials and search metadata.
  quickFacts?: Array<{ label: string; value: string }>;
  seoTitle?: string;
  seoDescription?: string;
  relatedLinks: MajorEventRelatedLink[];
  sources: MajorEventSource[];
}
export type MajorEventAuthorityRecord = MajorEventIndexRecord & Omit<MajorEventAuthorityDetails, "slug">;

// Server-only guide copy. The supplied inventory is a discovery seed; official
// organizer/host sources control verified dates stored in major-event-index.ts.
const majorEventAuthorityDetails: MajorEventAuthorityDetails[] = [
  {
    slug: "heritage-syrup-festival",
    whyItMatters: "Henderson's annual Heritage Syrup Festival preserves the labor and community life surrounding East Texas ribbon-cane syrup making. The museum demonstrates traditional cane crushing and boiling while the nearby historic downtown hosts local crafts, food, music and family activities. The museum traces festival demonstrations on its grounds to 1989; Rusk County was designated the official Syrup Capital of Texas under the Legislature's H.C.R. 83 in 2025. The 37th annual festival took place November 14, 2026; that edition has ended and next-edition details await official confirmation.",
    seoTitle: "Heritage Syrup Festival in Henderson: 2026 Recap & Visitor Guide",
    seoDescription: "Learn about Henderson's Heritage Syrup Festival, the 37th annual 2026 edition, ribbon-cane demonstrations, Depot Museum grounds and planning future visits.",
    quickFacts: [
      { label: "2026 edition", value: "37th annual · Saturday, November 14, 2026 (concluded)" },
      { label: "2026 public hours", value: "9 a.m.–5 p.m.; museum demonstrations generally 10 a.m.–4 p.m." },
      { label: "Two main areas", value: "Depot Museum, 514 N. High St; historic downtown, 100 E. Main St, Henderson" },
      { label: "Main heritage activity", value: "Traditional ribbon-cane crushing and syrup boiling on the museum grounds" },
      { label: "State designation", value: "Rusk County, not Henderson alone, designated Syrup Capital of Texas in 2025" },
      { label: "Next edition", value: "Not yet independently confirmed by an organizer; verify before making plans" }
    ],
    planningSections: [
      { title: "The 37th annual 2026 festival has passed", body: "Henderson's city government and the Rusk County Depot Museum confirmed November 14, 2026, 9 a.m.–5 p.m. for the 37th annual Heritage Syrup Festival. This is a historical recap and permanent guide, not an advertisement for an upcoming 2026 event. The organizers call the second Saturday of November the annual tradition, but do not treat a calculated 2027 date, vendor form or past schedule as a fresh official announcement." },
      { title: "The syrup demonstration is at the Depot Museum", body: "Head to 514 N. High Street for the old-fashioned syrup process: ribbon cane is pressed for juice and the juice is boiled into syrup using preserved equipment. Museum programming for the 2026 edition was described as 10 a.m.–4 p.m., narrower than the overall festival window. See also the other folk-life and working-history exhibits on the museum grounds. Availability and public demonstrations outside festival day are not guaranteed." },
      { title: "Historic downtown is a second festival zone", body: "The festival spreads from the museum into the downtown National Register historic district near 100 E. Main Street. The city's program describes handcrafted vendor booths, East Texas food, live music, antique and classic cars and activities for children. The courthouse square and the museum are different locations; allow time to move between them rather than expecting a single-stage event." },
      { title: "Plan parking and transport from the current edition, not a copied map", body: "For November 2026 the city listed free parking at the Henderson Municipal Services Complex / City Hall, 300 W. Main Street, and a festival information booth near 100 E. Main. It also described hayride shuttles linking downtown and the museum, with a historic 2026 fare of $2 per person. These are documented 2026 arrangements only. Street closures, shuttle boarding zones, accessibility information and any fee can change for a future festival; obtain the current city map before leaving home." },
      { title: "Understand what 'Syrup Capital of Texas' means", body: "The 89th Texas Legislature's 2025 House Concurrent Resolution 83 officially designated Rusk County the Syrup Capital of Texas for a 10-year period ending in 2035. Henderson is the county seat and host of the festival. The honor recognizes a cultural and agricultural tradition, not a commercial-sales claim or a separate official title for Henderson County." },
      { title: "Include the museum on a regular Henderson trip", body: "Festival dates are not required to appreciate the history. The Rusk County Depot Museum & History Center has a restored 1901 railroad depot, the Children's Discovery Center and historic structures including a syrup mill, cotton gin, country store, sawmill and caboose. The museum currently lists free regular admission and separate museum hours; call 903-657-4303 or check its official website ahead of a normal visit." },
      { title: "What to expect when the next festival is confirmed", body: "Choose whether to prioritize hands-on heritage demonstrations at the museum or shopping and entertainment downtown. The two areas work as one event but have different attractions. Recheck the official year-specific date, hours, vendor and shuttle arrangements, parking, street closures and bad-weather information; do not rely on the archived 2026 particulars to make nonrefundable plans." }
    ],
    relatedLinks: [
      { href: "/county/rusk", label: "Rusk County authority guide", description: "Read the county's syrup heritage, Republic-era settlement, railroads and 1930s oil story." },
      { href: "/destination/rusk-county-depot-museum-history-center-henderson", label: "Rusk County Depot Museum & History Center", description: "See the original depot and historic grounds where the syrup-mill demonstrations take place." },
      { href: "/texas-capital-designations", label: "Official Texas capital designations", description: "Verify the 2025 legislative title for Rusk County." },
      { href: "/events/november-events", label: "November events in Texas", description: "Explore other Texas fall traditions and the latest confirmed upcoming events." },
      { href: "/events", label: "Texas events calendar", description: "Find more current source-verified festivals and celebrations." }
    ],
    sources: [
      { label: "City of Henderson — Heritage Syrup Festival dates, parking and visitor areas", url: "https://www.hendersontx.us/14/Heritage-Syrup-Festival" },
      { label: "Rusk County Depot Museum & History Center — 37th annual festival", url: "https://www.ruskcountyhistory.org/syrup-festival" },
      { label: "Museum grounds — syrup mill and historic structures", url: "https://www.ruskcountyhistory.org/our-grounds" },
      { label: "Texas State Library — official Syrup Capital of Texas", url: "https://www.tsl.texas.gov/ref/abouttx/capitals" },
      { label: "Texas Legislature — H.C.R. 83 (2025)", url: "https://capitol.texas.gov/tlodocs/89R/billtext/html/HC00083F.htm" }
    ]
  },
  {
    slug: "grapefest",
    whyItMatters: "The 41st GrapeFest is scheduled for September 16–19, 2027 in historic downtown Grapevine, turning the walkable Main Street district into a four-day celebration of Texas and international wine, live entertainment and food. Unlike a general winery tour, tasting sessions can require separately timed purchases in addition to festival admission.",
    quickFacts: [
      { label: "2027 dates", value: "September 16–19, 2027" },
      { label: "Venue", value: "Historic Main Street, Grapevine" },
      { label: "Thursday", value: "Organizer currently advertises free entry" },
      { label: "Saturday admission", value: "Organizer lists adult $12; reconfirm before purchase" },
    ],
    planningSections: [
      { title: "Understand the daily admission pattern", body: "The organizer currently posts complimentary admission Thursday, paid Friday entry after 5 p.m., and paid weekend admission. The 2027 web table contains a contradictory Sunday date that conflicts with its confirmed September 16–19 festival header, so check the final posted hours and any corrections before traveling." },
      { title: "Budget separately for tastings", body: "The People's Choice and other wine experiences are special festival sessions rather than unlimited tastings included with a general gate ticket. Check session start times, ID requirements, availability, designated-driver options and the organizer's current ticket rules." },
      { title: "Use walkable historic downtown as your base", body: "Historic Main Street is the festival footprint, which affects vehicle access and parking. Arrive with a current street map or published shuttle plan; if staying in Grapevine, choose a base that lets your group travel safely after evening tastings." },
      { title: "Plan for families and non-drinkers too", body: "GrapeFest also brings food, performers and downtown atmosphere. Wine tastings are age-restricted, but a family visit may focus on live entertainment or the Main Street environment. Confirm specific children's programming and festival accessibility details before setting your schedule." },
    ],
    relatedLinks: [
      { href: "/event/texas-rose-festival", label: "Texas Rose Festival", description: "Compare another major North and East Texas fall festival weekend." },
      { href: "/event/wurstfest", label: "Wurstfest", description: "Compare another destination-scale Texas fall festival." },{ href: "/events", label: "Texas events calendar", description: "Compare other fall events." }, { href: "/browse/counties#county-tarrant", label: "Explore Tarrant County", description: "Plan more of the North Texas trip." }],
    sources: [{ label: "GrapeFest official general information", url: "https://www.grapevinetexasusa.com/grapefest/general-information/" }],
  },
  {
    slug: "texas-renaissance-festival",
    whyItMatters: "This repeat-weekend destination can shape an entire fall trip, and the themed-weekend structure means the best weekend depends on the visitor.",
    quickFacts: [
      { label: "2026 season", value: "October 10–November 29, weekends plus Thanksgiving Friday" },
      { label: "Festival hours", value: "9 a.m.–8 p.m.; last entry 7 p.m., per 2026 organizer" },
      { label: "Venue", value: "21778 FM 1774, Todd Mission, Texas" },
      { label: "Camping", value: "Separate camping pass; festival admission is not included" },
      { label: "Planning choice", value: "Choose a themed weekend, not merely a date inside the season" },
    ],
    planningSections: [
      { title: "Drive to Todd Mission, not downtown Austin", body: "The Texas Renaissance Festival is held at 21778 FM 1774 in Todd Mission, northwest of Houston. Avoid online lists that incorrectly place it in Austin. Allow for rural approach traffic and follow the organizer's current parking directions rather than a generic city-center route." },
      { title: "Choose the weekend's theme", body: "The 2026 season is open Saturdays and Sundays October 10–November 29, plus Thanksgiving Friday. Each themed weekend has different entertainment, costumes and activities. The range in the calendar does not mean the gates open Monday through Thursday." },
      { title: "Know the entrance cutoff", body: "The 2026 organizer lists 9 a.m. to 8 p.m. festival hours with no entry after 7 p.m. That matters for visitors hoping to arrive after another Houston-area attraction. Confirm any holiday-specific variation and show times before departure." },
      { title: "Separate camping from admission", body: "The Fields of New Market campground has separately sold weekend passes, and an ordinary camping pass does not include admission to the festival. A bundled Stay and Play package is different. Check rules for vehicles, quiet hours and campsite services directly with the operator." },
      { title: "Plan for a long day on foot", body: "The village blends stages, shops, jousting, food and family activities across a large outdoor footprint. Comfortable shoes, water, shade, accessible route information and weather contingencies matter more than checking off every act. Buy admission through official channels and verify costume and prop rules in advance." },
    ],
    relatedLinks: [
      { href: "/event/grapefest", label: "GrapeFest", description: "Compare another major North Texas fall festival." },
      { href: "/event/wurstfest", label: "Wurstfest", description: "Compare another repeat-weekend fall destination." },{ href: "/events", label: "Texas events calendar", description: "See other major fall festivals." }],
    sources: [{ label: "Texas Renaissance Festival official site", url: "https://www.texrenfest.com/" }],
  },
  {
    slug: "texas-rose-festival",
    whyItMatters: "The festival turns Tyler's rose identity into a concentrated travel window that connects horticulture, civic tradition and an East Texas weekend.",
    planningSections: [
      { title: "Build around the program", body: "Use the official schedule to choose the ceremonies, parade activities and public events that matter to your trip." },
      { title: "Leave room for Tyler", body: "Reserve time outside the scheduled program for rose-related attractions and other Smith County stops." },
      { title: "Plan for October demand", body: "Confirm lodging, parking and event-access details early, then check the organizer again close to departure." },
    ],
    relatedLinks: [
      { href: "/event/grapefest", label: "GrapeFest", description: "Compare another major Texas fall festival." },
      { href: "/event/texas-renaissance-festival", label: "Texas Renaissance Festival", description: "Compare another destination-scale fall festival." },{ href: "/events", label: "Texas events calendar", description: "Compare other fall events." }, { href: "/browse/counties#county-smith", label: "Explore Smith County", description: "Plan more of the East Texas trip." }],
    sources: [{ label: "Texas Rose Festival official site", url: "https://www.texasrosefestival.org/" }],
  },
  {
    slug: "wurstfest",
    whyItMatters: "Wurstfest connects a current travel event to the deeper German-Texan story visible across Hill Country towns, dance halls, food traditions and historic communities.",
    quickFacts: [
      { label: "2026 dates", value: "November 6–15, 2026" },
      { label: "City", value: "New Braunfels, Comal County" },
      { label: "Focus", value: "German-Texan music, food and cultural traditions" },
      { label: "Admission", value: "Current-day tickets, discounts and hours vary by date" },
      { label: "Planning", value: "Weekdays and weekends have different crowd conditions" },
    ],
    planningSections: [
      { title: "Pick a day based on the experience", body: "Wurstfest's ten-day run is not a single uniform party: stage schedules, admission terms, food vendor offerings and dance-hall crowds vary between weekdays and weekends. Use the current year's day-by-day lineup before choosing a trip." },
      { title: "Understand what admission does and does not buy", body: "Entry to the festival and purchases from food or beverage vendors are separate considerations. Confirm current advance-admission, group and age policies from Wurstfest; do not rely on an old per-day price or a generic event resale ticket." },
      { title: "Plan for food, dance halls and music", body: "The core visitor experience combines German-influenced Texas dishes, polka and other live music, and indoor/outdoor gathering spaces. Families can enjoy music and heritage activities without trying to attend every evening entertainment block." },
      { title: "Explore New Braunfels beyond the grounds", body: "Historic downtown, the Comal River and German-Texan history sites are natural complements; check seasonal opening hours and the weather if combining the festival with outdoor recreation in November." },
      { title: "Know the arrival and accessibility tradeoffs", body: "The grounds and surrounding streets can be busy on weekends. Consult official parking, shuttle and accessibility information, especially if traveling with a stroller or mobility aid, rather than assuming curbside access close to the entry gate." },
      { title: "Compare confirmed 2026 admission by day", body: "The official 2026 schedule lists free admission Monday through Thursday; $15 online or $20 at the gate on Fridays and Sundays; and $25 online or $30 at the gate on Saturdays. Children 12 and under enter free every day, and final Sunday November 15 is free after 3 p.m. Verify all prices in the current organizer checkout." },
      { title: "Use the operating-hours calendar", body: "The opening Friday runs 4-11 p.m.; Saturdays November 7 and 14 run 11 a.m.-midnight; Monday-Wednesday November 9-11 run 5-10 p.m.; Thursday November 12 runs 5-11 p.m. Sunday hours differ; verify the official daily schedule before traveling." },
    ],
    relatedLinks: [{ href: "/county/comal", label: "Comal County guide", description: "Compare nearby lodging bases and other New Braunfels-area stops." }, 
      { href: "/event/texas-renaissance-festival", label: "Texas Renaissance Festival", description: "Compare another repeat-weekend Texas fall event." },
      { href: "/event/texas-rose-festival", label: "Texas Rose Festival", description: "Compare another heritage-focused fall festival." },{ href: "/german-czech-texas-towns", label: "German and Czech Texas towns", description: "Connect Wurstfest to the larger heritage story." }, { href: "/browse/counties#county-comal", label: "Explore Comal County", description: "Build a broader Hill Country itinerary." }, { href: "/events", label: "Texas events calendar", description: "Compare other major fall events." }],
    sources: [{ label: "Wurstfest official site", url: "https://wurstfest.com/" }],
  },
  {
    slug: "fort-worth-stock-show-rodeo",
    whyItMatters: "It supports several kinds of visits, from a single arena night to a full day built around the stock-show grounds and Fort Worth attractions.",
    quickFacts: [
      { label: "2027 show dates", value: "January 15–February 6, 2027" },
      { label: "Rodeo venue", value: "Ariat Arena (formerly Dickies Arena), 1911 Montgomery Street" },
      { label: "Stock-show venue", value: "Will Rogers Memorial Center and associated grounds" },
      { label: "2027 grounds hours", value: "8 a.m.–10:30 p.m. daily, per official FAQ" },
      { label: "Rodeo admission", value: "Rodeo ticket includes same-day showgrounds admission" },
    ],
    planningSections: [
      { title: "Choose a particular kind of rodeo", body: "The 2027 Dickies Arena program ranges from Best of the West Ranch Rodeo and Best of Mexico Celebración to Cowboys of Color, Bulls Night Out, PRORODEO tournament events and championship finals. Choose the format first rather than assuming all arena evenings show the same rodeo competition." },
      { title: "Know what admission covers", body: "The organizer confirms a Dickies Arena rodeo ticket includes same-day admission to the Stock Show grounds. A grounds-only ticket is not a reserved seat for the arena. Other paid experiences and the carnival have their own admission or coupon rules." },
      { title: "Allow time for livestock and trade exhibits", body: "The 2027 grounds are scheduled to operate 8 a.m.–10:30 p.m. each day; show times and trade exhibits differ. Review the livestock and horse-show calendar to avoid arriving on the wrong day for a specific class, sale or judging event." },
      { title: "Navigate two connected but different venues", body: "Dickies Arena and Will Rogers Memorial Center are in the Fort Worth Cultural District. Your rodeo seat and a livestock-building destination can use different entrances and parking approaches. Consult the specific performance's parking and accessible entrance instructions." },
      { title: "Make it a Cultural District day", body: "The Stock Show is near Fort Worth's museums, gardens and local dining. Leave enough time to move between exhibitions and a fixed arena start, especially on busy weekends. The organizer's approved Ticketmaster ticketing channel, not a generic resale listing, controls the actual seats available." },
    ],
    relatedLinks: [
      { href: "/event/san-antonio-stock-show-rodeo", label: "San Antonio Stock Show & Rodeo", description: "Compare another major Texas stock show and rodeo." },{ href: "/browse/counties#county-tarrant", label: "Explore Tarrant County", description: "Plan more of the Fort Worth trip." }, { href: "/events", label: "Texas events calendar", description: "Compare other rodeos and winter events." }],
    sources: [{ label: "Fort Worth Stock Show & Rodeo official site", url: "https://www.fwssr.com/" }, { label: "FWSSR visitor FAQ", url: "https://www.fwssr.com/p/plan-a-visit/frequently-asked-questions" }],
  },
  {
    slug: "san-antonio-stock-show-rodeo",
    whyItMatters: "The event can be the centerpiece of a San Antonio weekend or one major night inside a broader city trip, linking event, county and destination planning.",
    quickFacts: [
      { label: "2027 season", value: "February 11–28, 2027" },
      { label: "Arena setting", value: "Frost Bank Center, San Antonio" },
      { label: "Grounds", value: "Freeman Coliseum and neighboring fairgrounds" },
      { label: "Admission", value: "Check separate concert/rodeo and fairgrounds entitlements" },
      { label: "Schedule", value: "Confirm the specific performance date and livestock show" },
    ],
    planningSections: [
      { title: "Start with the rodeo and concert you want", body: "The winter program includes different arena performances, entertainers and livestock activities across February. Choose your specific arena date first; do not assume a 2026 entertainer or admission promotion returns in 2027." },
      { title: "Distinguish arena seats from the grounds", body: "The Frost Bank Center is the rodeo arena while many exhibits, shops and attractions use the nearby Freeman Coliseum grounds. Ticket packages can differ; review exactly what the official checkout includes for an arena performance versus grounds admission." },
      { title: "Choose the right day for livestock exhibits", body: "Junior and open livestock classes, horse events and agricultural exhibits follow their own schedules. Families interested in a particular animal, school competition or educational showcase need the published daily program, not just the overall February 11–28 event window." },
      { title: "Plan parking and security around your venue", body: "Arena, coliseum and outdoor entry points can have different traffic patterns, accessibility paths, screening and bag rules. Check the organizers' current campus map and ride pickup zones rather than assuming downtown San Antonio parking guidance applies." },
      { title: "Extend the trip thoughtfully", body: "The stock show grounds sit northeast of central San Antonio; the Alamo, River Walk and missions are a separate city itinerary. Build in transport time and avoid pairing too many timed attractions with a fixed evening rodeo." },
    ],
    relatedLinks: [
      { href: "/event/fort-worth-stock-show-rodeo", label: "Fort Worth Stock Show & Rodeo", description: "Compare another major Texas stock show and rodeo." },{ href: "/browse/counties#county-bexar", label: "Explore Bexar County", description: "Build a larger San Antonio visit." }, { href: "/events", label: "Texas events calendar", description: "Compare major Texas rodeos." }],
    sources: [{ label: "San Antonio Stock Show & Rodeo official site", url: "https://www.sarodeo.com/" }, { label: "Visit San Antonio rodeo guide", url: "https://www.visitsanantonio.com/events/arts-culture-events/san-antonio-rodeo/" }],
  },
  {
    slug: "sxsw",
    whyItMatters: "SXSW changes the normal rhythm of central Austin, so visitors need to plan around credentials, distributed venues, transportation and unusually high demand.",
    quickFacts: [
      { label: "2027 conferences and festivals", value: "March 15–21, 2027" },
      { label: "SXSW EDU", value: "March 13–16, 2027 (a separate overlapping program)" },
      { label: "Innovation Conference", value: "March 15–20, 2027" },
      { label: "Film & TV and Music", value: "March 15–21, 2027" },
      { label: "Comedy Festival", value: "March 17–20, 2027" },
    ],
    planningSections: [
      { title: "Choose the right SXSW credential", body: "SXSW is several overlapping programs, not a single all-access concert ticket. Innovation, Film & TV, Music and Comedy have different admission levels and priority rules. Confirm which programming a badge, wristband or individual screening ticket actually admits before paying." },
      { title: "Separate SXSW EDU from SXSW week", body: "The official 2027 schedule puts SXSW EDU on March 13–16 and the Conferences & Festivals on March 15–21. The overlapping March 15–16 days are not evidence that every EDU attendee can enter all other programs without additional credentials." },
      { title: "Build an itinerary by venue and program", body: "Film screenings, panels, music showcases and comedy events use changing downtown Austin locations. Prioritize reservations or access queues where required and leave travel buffers. A downtown convention-center pin is not a reliable location for every performance." },
      { title: "Understand the different program dates", body: "The 2027 Innovation Conference runs March 15–20, the Film & TV and Music programs extend through March 21, and Comedy runs March 17–20. The SXSW-wide March 15–21 window does not guarantee every track is active every day." },
      { title: "Book around peak downtown demand", body: "If multiple programs matter, choose accommodation and transportation with venue clusters and late-night travel in mind. Check official hotel and transportation policies, disability access and age restrictions, and avoid affiliate ticket offers unless the partner is officially authorized." },
      { title: "Separate badge-only programming from public activities", body: "SXSW conference sessions, film screenings, official showcases and public brand activations do not necessarily share one admission credential. Confirm the access requirements for each activity before paying for a badge, pass or individual ticket." },
      { title: "Compare lodging by movement rather than advertised distance", body: "A less expensive room outside central Austin can lose its advantage through event-week transportation, parking and ride-share surcharges. Compare total trip costs and late-night return options before booking nonrefundable lodging." },
    ],
    relatedLinks: [{ href: "/county/travis", label: "Travis County guide", description: "Combine SXSW with other Austin destinations." }, 
      { href: "/event/texas-sandfest", label: "Texas SandFest", description: "Compare another destination-scale Texas spring event." },{ href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Connect SXSW with a broader Austin-area visit." }, { href: "/events", label: "Texas events calendar", description: "See other major cultural events." }],
    sources: [{ label: "SXSW official 2027 dates announcement", url: "https://sxsw.com/news/2026/south-by-southwest-2027-dates-announced/" }, { label: "SXSW official site", url: "https://sxsw.com/" }],
  },
  {
    slug: "texas-sandfest",
    whyItMatters: "SandFest is a strong travel event because the venue is also the destination, combining festival access, beach conditions, lodging and island transportation.",
    planningSections: [
      { title: "Plan the island stay first", body: "Decide whether to stay on the island or drive in before choosing arrival time; the festival adds traffic and pedestrian demand." },
      { title: "Check prohibited items", body: "The organizer publishes current guidance on pets, coolers, shade structures, wagons and other items, so check the list while packing." },
      { title: "Give the sculptures time", body: "Leave a broad viewing window, then place beach time, meals and other Port Aransas stops around the festival." },
      { title: "Budget the 2027 admission accurately", body: "For April 16-18, 2027, the organizer lists a three-day general admission wristband at $30 for adults ages 13+, $5 for ages 6-12, and free entry for ages 5 and younger. There is no single-day general admission ticket. The limited one-day VIP experience is listed at $250; verify current checkout fees and availability before purchasing." },
      { title: "Include the city beach-parking permit", body: "A vehicle parked on Port Aransas beach needs a city beach-parking permit, listed at $12 for the calendar year on the 2027 organizer guide. SandFest does not charge a separate parking fee. Free park-and-ride service operates from Roberts Point Park and Port Aransas Community Park to the South Gate during the festival." },
      { title: "Use the 2027 beach markers and event-day hours", body: "Texas SandFest is April 16-18, 2027, 9 a.m.-7:30 p.m. each day, on Port Aransas beach between markers 13 and 17. The north gate is at marker 13 and the south gate at marker 17. Confirm entrance procedures and wristband sales hours before leaving." },
      { title: "Know the transit and parking alternatives", body: "The organizer lists a dedicated free SandFest shuttle route, distinct from fare-charging regular transit routes. Review the current parking and shuttles instructions before driving onto the island or toward the beach; oversized vehicles face restrictions in festival lots." },
      { title: "Plan beach accessibility before booking", body: "This is an event on sand rather than pavement. The organizer lists limited accessible parking near marker 12.5, accessible portable toilets, and a limited supply of reserve-ahead beach wheelchairs. Confirm availability and current reservation terms with the festival." },
      { title: "Pack to the event rules", body: "The 2027 organizer guidance permits service animals but not ordinary pets, and prohibits outside coolers and alcohol. Check shade structures, wagons and mobility-device rules rather than assuming standard beach-day rules apply inside the festival." },
    ],
    relatedLinks: [{ href: "/explore/beaches-coast", label: "Texas beaches and coast", description: "Add nearby coastal experiences without duplicating the festival guide." }, { href: "/county/nueces", label: "Nueces County guide", description: "Explore the wider Corpus Christi and Port Aransas coast." }, 
      { href: "/event/sxsw", label: "SXSW", description: "Compare another destination-scale Texas spring event." },{ href: "/browse/counties#county-nueces", label: "Explore Nueces County", description: "Expand the Gulf Coast trip beyond the festival." }, { href: "/events", label: "Texas events calendar", description: "Compare other spring events." }],
    sources: [{ label: "Texas SandFest FAQ and shuttles", url: "https://www.texassandfest.org/faq" }, { label: "Texas SandFest accessibility and beach wheelchair details", url: "https://www.texassandfest.org/accessibility" }, { label: "Texas SandFest official site", url: "https://www.texassandfest.org/" }, { label: "Texas SandFest know-before-you-go guide", url: "https://www.texassandfest.org/knowbeforeyougo" }],
  },
];

const detailsBySlug = new Map(majorEventAuthorityDetails.map((event) => [event.slug, event]));
const majorEventAuthorityRecords: MajorEventAuthorityRecord[] = majorEventIndexRecords.flatMap((event) => {
  const details = detailsBySlug.get(event.slug);
  if (!details) return [];
  const { slug: _detailSlug, ...routeDetails } = details;
  return [{ ...event, ...routeDetails }];
});
const bySlug = new Map(majorEventAuthorityRecords.map((event) => [event.slug, event]));

// Static registrations keep first-party-verified tournament leaves visible to the
// major-event authority validator while profile modules remain the source of facts.
const newVerifiedTournamentRegistrations = [
  { slug: "charles-schwab-challenge" },
  { slug: "the-cj-cup-byron-nelson" },
  { slug: "texas-childrens-houston-open" },
  { slug: "chevron-championship" },
  { slug: "the-cotton-bowl-classic" },
  { slug: "the-texas-bowl" },
  { slug: "the-sun-bowl" },
  { slug: "the-armed-forces-bowl" },
  { slug: "the-first-responder-bowl" },
  { slug: "uil-football-state-championships" },
  { slug: "uil-boys-basketball-state-tournament" },
  { slug: "uil-girls-basketball-state-tournament" },
  { slug: "uil-baseball-state-tournament" },
  { slug: "uil-softball-state-tournament" },
  { slug: "uil-soccer-state-championships" },
  { slug: "uil-tennis-state-tournaments" },
  { slug: "us-mens-clay-court-championships" },
  { slug: "uil-volleyball-state-tournament" },
  { slug: "uil-cross-country-state-championships" },
  { slug: "uil-wrestling-state-championships" },
  { slug: "uil-spirit-state-championships" },
  { slug: "the-texas-relays" },
  { slug: "worlds-championship-bar-b-que-contest" },
  { slug: "nsca-national-sporting-clays-championship" },
  { slug: "texas-state-science-and-engineering-fair" },
  { slug: "ironman-texas" },
  { slug: "world-skeet-shooting-championships" },
] as const;

const newVerifiedTournamentSlugs = new Set(newVerifiedTournamentRegistrations.map(({ slug }) => slug));

const verifiedTournamentRegionByCounty: Record<string, MajorEventIndexRecord["region"]> = {
  tarrant: "prairies-lakes",
  collin: "prairies-lakes",
  harris: "gulf-coast",
  "el-paso": "big-bend",
  dallas: "prairies-lakes",
  bexar: "south-texas",
  travis: "hill-country",
  williamson: "hill-country",
  brazos: "prairies-lakes",
  montgomery: "piney-woods",
};

function getVerifiedTournamentAuthorityServer(slug: string): MajorEventAuthorityRecord | null {
  if (!newVerifiedTournamentSlugs.has(slug as (typeof newVerifiedTournamentRegistrations)[number]["slug"])) return null;
  const profile = verifiedTournamentBySlug(slug)
    ?? verifiedTournamentBatch3BySlug(slug)
    ?? verifiedTournamentBatch4BySlug(slug)
    ?? verifiedTournamentBatch5BySlug(slug)
    ?? verifiedTournamentBatch6BySlug(slug)
    ?? verifiedTournamentBatch7BySlug(slug);
  if (!profile) return null;

  const venue = profile.slug === "the-texas-bowl" ? "NRG Stadium" : profile.venue;
  const planningTitles = [
    "Start with the current organizer page",
    "Confirm the exact day and access plan",
    "Build the wider Texas itinerary",
  ] as const;

  return {
    slug: profile.slug,
    name: profile.name,
    city: profile.city,
    countySlug: profile.countySlug,
    countyName: profile.countyName,
    region: verifiedTournamentRegionByCounty[profile.countySlug] ?? "prairies-lakes",
    category: "eventCategory" in profile ? profile.eventCategory : "category" in profile && profile.category === "rodeo-ranch" ? "rodeo" : "sport",
    startDate: profile.startDate,
    endDate: profile.endDate,
    dateNote: `Texas Defined checked the current first-party event source on ${profile.sourceCheckedAt}. Reconfirm the official schedule before travel.`,
    venue,
    officialUrl: profile.officialUrl,
    sourceCheckedAt: profile.sourceCheckedAt,
    whyItMatters: profile.whyItMatters,
    planningSections: profile.planningNotes.map((body, index) => ({
      title: planningTitles[index] ?? "Plan from the official event source",
      body,
    })),
    relatedLinks: [
      {
        href: profile.categoryPath,
        label: profile.categoryLabel,
        description: "Compare related verified guides and discovery-stage tournament listings.",
      },
      {
        href: `/browse/counties#county-${profile.countySlug}`,
        label: `Explore ${profile.countyName}`,
        description: "Build a wider trip around the host county.",
      },
      {
        href: "/events/tournaments",
        label: "Texas tournaments",
        description: "Return to the statewide tournament directory and all competition categories.",
      },
    ],
    sources: [{ label: profile.officialSourceLabel, url: profile.officialUrl }],
  };
}

export function getMajorEventAuthorityServer(slug: string) {
  return bySlug.get(slug) ?? getVerifiedTournamentAuthorityServer(slug);
}
