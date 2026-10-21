import { majorEventIndexRecords } from "./major-event-index";
import type { MajorEventAuthorityRecord, MajorEventPlanningSection, MajorEventRelatedLink, MajorEventSource } from "./major-event-authority.server";

interface ExpandedDetails {
  slug: string;
  whyItMatters: string;
  planningSections: MajorEventPlanningSection[];
  quickFacts?: Array<{ label: string; value: string }>;
  relatedLinks: MajorEventRelatedLink[];
  sources: MajorEventSource[];
}

const expandedDetails: ExpandedDetails[] = [
  {
    slug: "austin-film-festival",
    whyItMatters: "Austin Film Festival is built around both screenings and the Writers Conference, making badge choice, venue movement and downtown lodging part of the trip-planning decision.",
    planningSections: [
      { title: "Choose films, conference, or both", body: "Start with the badge or pass that matches your priorities because conference panels and film screenings overlap across the festival week." },
      { title: "Plan around multiple venues", body: "Screenings and panels use several downtown and nearby venues, so allow walking or travel time between sessions instead of stacking the schedule too tightly." },
      { title: "Recheck the daily program", body: "The official program evolves as screenings, panels and guests are finalized; use the current festival schedule before each day." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Build more Austin stops around the festival." }, { href: "/events", label: "Texas events calendar", description: "Compare other major cultural events." }],
    sources: [{ label: "Austin Film Festival official site", url: "https://austinfilmfestival.com/" }, { label: "Austin Film Festival festival information", url: "https://austinfilmfestival.com/festival-and-conference-aff/" }],
  },
  {
    slug: "dickens-on-the-strand",
    whyItMatters: "Dickens on The Strand turns Galveston's historic downtown into a concentrated holiday destination, so parking, admission windows and time on foot all matter to the visit.",
    planningSections: [
      { title: "Pick the festival day", body: "Friday, Saturday and Sunday have different operating patterns and admission details, so choose the day before arranging the rest of the island weekend." },
      { title: "Use the historic district as the venue", body: "Expect to spend much of the visit on foot around The Strand and nearby historic blocks; use current festival access and parking guidance." },
      { title: "Pair history with the festival", body: "Leave room for Galveston's historic sites and waterfront attractions instead of treating the festival as an isolated stop." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-galveston", label: "Explore Galveston County", description: "Build a larger island itinerary." }, { href: "/events", label: "Texas events calendar", description: "Compare other holiday events." }],
    sources: [{ label: "Galveston Historical Foundation Dickens on The Strand", url: "https://www.galvestonhistory.org/events/dickens-on-the-strand" }],
  },
  {
    slug: "houston-livestock-show-rodeo",
    whyItMatters: "The Houston Livestock Show and Rodeo combines livestock exhibitions, fairgrounds activity, rodeo competition and nightly concerts, so the best plan depends on which parts of the event matter most.",
    planningSections: [
      { title: "Start with the rodeo or concert", body: "Choose the performance date first if the arena show is the anchor, then build grounds time and Houston activities around it." },
      { title: "Understand the ticket types", body: "Grounds admission and rodeo-concert seating serve different purposes; confirm what your ticket includes before arrival." },
      { title: "Budget time for NRG Park", body: "Livestock shows, food, exhibits and entertainment can fill many hours before the arena performance, so plan a realistic arrival window." },
      { title: "Use the confirmed 2027 calendar", body: "The organizer confirms March 2-21, 2027 for the main Houston Livestock Show and Rodeo. The World’s Championship Bar-B-Que Contest is a separate pre-rodeo event February 25-27. Do not mistake those dates for arena rodeo performances." },
      { title: "Choose the right admission before buying", body: "Concert and rodeo arena tickets, general grounds access and some special events are not interchangeable. Use the organizer's official ticket guidance for your chosen date, and check whether any add-on experience requires separate admission." },
      { title: "Plan NRG Park access as its own project", body: "Parking, shuttles and rail access can change by event and performance. Use the published parking and transportation map and allow extra time for entry screening rather than assuming a normal NRG Stadium game-day route." },
      { title: "Build a Houston itinerary that respects the show time", body: "Use daylight for livestock, exhibits or attractions around the city, but leave a generous window to reach NRG Park before the arena program. Artists perform after the rodeo, so concert start times can vary." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-harris", label: "Explore Harris County", description: "Plan more of the Houston trip." }, { href: "/event/fort-worth-stock-show-rodeo", label: "Fort Worth Stock Show and Rodeo", description: "Compare two major Texas rodeo trips." }, { href: "/county/harris", label: "Harris County guide", description: "Explore Houston beyond NRG Park." }, { href: "/events", label: "Texas events calendar", description: "Compare other major Texas rodeos." }],
    sources: [{ label: "RODEOHOUSTON official 2027 dates and barbecue contest", url: "https://www.rodeohouston.com/the-houston-livestock-show-and-rodeo-announces-2027-dates/" }, { label: "RODEOHOUSTON 2027 arena performance schedule", url: "https://www.rodeohouston.com/rodeohouston/" }, { label: "Houston Livestock Show and Rodeo official site", url: "https://www.rodeohouston.com/" }, { label: "RODEOHOUSTON plan-your-visit guide", url: "https://www.rodeohouston.com/plan-your-visit/" }],
  },
  {
    slug: "fiesta-san-antonio",
    whyItMatters: "Fiesta is an 11-day citywide season rather than a single venue event, so visitors get more value by choosing a few priority parades, neighborhood events and traditions before booking the rest of the trip.",
    planningSections: [
      { title: "Choose anchor events", body: "Use the official Fiesta calendar to pick the parades, cultural events and nonprofit-hosted celebrations that matter most instead of trying to cover the full schedule." },
      { title: "Plan transportation by event", body: "Fiesta venues are distributed around San Antonio, and major parade days can change traffic and parking patterns; use current event-specific instructions." },
      { title: "Leave room between commitments", body: "Crowds, street closures and travel between venues can make an overpacked schedule frustrating, so build in realistic buffers." },
      { title: "Use the announced 2027 parade dates", body: "Fiesta is April 15-25, 2027. The organizer lists the Texas Cavaliers River Parade for April 19, the Battle of Flowers Parade for April 23, and the Fiesta Flambeau Parade for April 24. These occupy different routes and viewing arrangements; use each parade's current map and admission details." },
      { title: "Do not plan around a suspended 2027 event", body: "The Conservation Society announced that A Night in Old San Antonio (NIOSA) is paused for 2027. Some older event listings may still show a projected NIOSA date. Verify the current Fiesta calendar and NIOSA organizer notices, and do not purchase travel or event tickets based on stale references." },
      { title: "Use park-and-ride and event-specific access details", body: "Citywide Fiesta events have different street closures, viewing rules and parking. Fiesta's official calendar notes VIA Park & Ride as an option for many events; check the specific parade or festival page for your day." },
      { title: "Separate free kickoff activities from paid events", body: "Fiesta Fiesta at Travis Park on April 15 is listed as free admission, but other parades and hosted events may sell bleacher, chair or VIP tickets. Choose which experiences matter before setting a budget." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-bexar", label: "Explore Bexar County", description: "Build a broader San Antonio visit." }, { href: "/events/san-antonio-area-events", label: "San Antonio-area event calendar", description: "Compare Fiesta with other city and Hill Country events." }, { href: "/county/bexar", label: "Bexar County guide", description: "Plan attractions alongside Fiesta parades." }, { href: "/events", label: "Texas events calendar", description: "Compare other major spring events." }],
    sources: [{ label: "Official 2027 parade dates and admission", url: "https://fiestasanantonio.org/parade/" }, { label: "Conservation Society NIOSA 2027 pause updates", url: "https://www.saconservation.org/niosaupdates/" }, { label: "Fiesta San Antonio official site", url: "https://fiestasanantonio.org/" }, { label: "Official Fiesta schedule", url: "https://fiestasanantonio.org/schedule/" }],
  },
  {
    slug: "scarborough-renaissance-festival",
    whyItMatters: "Scarborough runs across multiple spring weekends, giving visitors flexibility but also making themed programming and operating-day confirmation important before traveling to Waxahachie.",
    planningSections: [
      { title: "Choose the weekend", body: "Start with the current festival calendar and special programming because not every operating weekend is identical." },
      { title: "Plan for a full outdoor day", body: "Comfortable footwear, weather preparation and enough time for shows, food and artisan areas make the visit more manageable." },
      { title: "Confirm the operating calendar", body: "The published season spans many weeks but is not a continuous daily run; verify the exact operating day before departure." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-ellis", label: "Explore Ellis County", description: "Plan more stops around Waxahachie." }, { href: "/events", label: "Texas events calendar", description: "Compare other major Texas festivals." }],
    sources: [{ label: "Scarborough Renaissance Festival official site", url: "https://www.srfestival.com/" }],
  },
  {
    slug: "kerrville-folk-festival",
    whyItMatters: "The long-running festival is designed around songwriting, concerts, camping and community at Quiet Valley Ranch, making it suited to anything from a single-day visit to a multi-day Hill Country stay.",
    planningSections: [
      { title: "Choose day trip or campout", body: "Decide whether you want one concert day, a weekend, or a longer stay before selecting tickets and lodging or camping arrangements." },
      { title: "Build around the songwriter schedule", body: "Use the official daily lineup and workshop calendar to choose the performances and activities that matter most." },
      { title: "Prepare for the ranch setting", body: "Weather, footwear, water and arrival logistics matter at an outdoor multi-day festival; review current visitor and camping information before the trip." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-kerr", label: "Explore Kerr County", description: "Add more Hill Country stops around Kerrville." }, { href: "/events", label: "Texas events calendar", description: "Compare other music festivals." }],
    sources: [{ label: "Kerrville Folk Festival official site", url: "https://www.kerrvillefolkfestival.org/" }, { label: "Kerrville Folk Festival volunteer information", url: "https://www.kerrvillefolkfestival.org/volunteering/" }],
  },
  {
    slug: "wings-over-houston-airshow",
    whyItMatters: "Wings Over Houston is a large aviation event at Ellington Airport where transportation, arrival time and outdoor conditions can shape the day as much as the flying schedule.",
    planningSections: [
      { title: "Arrive with transportation settled", body: "For the October 31–November 1, 2026 show, parking at Ellington is constrained by construction. Free ticket-included shuttles run from 7:30 a.m. to 6 p.m.; the last inbound shuttle departs at 2:30 p.m. Review the official park-and-ride locations and maps, and arrive before the 2:30 p.m. outbound-only traffic conversion." },
      { title: "Plan for a long outdoor day", body: "Gates open at 8 a.m.; the official ticket page lists flying roughly 10:30 a.m.–4 p.m. Sun protection, hearing protection, comfortable footwear and restrictions on what you can carry all matter for this long airfield day." },
      { title: "Check the performer schedule", body: "Flying demonstrations and performers can change; confirm the official schedule close to the event rather than relying on an older lineup." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-harris", label: "Explore Harris County", description: "Build more Houston stops around the airshow." }, { href: "/events/air-shows", label: "Texas air shows", description: "Compare other confirmed air-show weekends." }, { href: "/events", label: "Texas events calendar", description: "Compare other major fall events." }],
    sources: [{ label: "Wings Over Houston official site", url: "https://wingsoverhouston.com/" }, { label: "Wings Over Houston travel and parking", url: "https://wingsoverhouston.com/travel/" }],
  },
  {
    slug: "amigo-airsho",
    whyItMatters: "El Paso's Amigo Airsho brings military aviation and high-performance flying to Biggs Army Airfield at Fort Bliss. Because it takes place on a military installation, the base-access rules, ticket type, traffic plan and arrival time are all central to the visit—not minor details.",
    quickFacts: [
      { label: "2026 dates", value: "October 24–25" },
      { label: "Airfield", value: "Biggs Army Airfield, Fort Bliss" },
      { label: "Admission / access", value: "Ticket required; review ID requirements for entry to Fort Bliss" },
      { label: "Daily program", value: "Gates at 9 a.m.; aerial show approximately 11:30 a.m.–4:30 p.m., subject to change" },
    ],
    planningSections: [
      { title: "Check military-base access before purchasing or driving", body: "This show is on Fort Bliss. The organizer's current visitor FAQ requires guests to bring a valid government-issued ID for entry on October 24–25, 2026. Review all current entry, vehicle and prohibited-item rules and allow for security checks; admission alone is not the same thing as permission to ignore base-entry procedures." },
      { title: "Choose the exact day and ticket type", body: "The organizer sells its own tickets. Check the 2026 ticket page for current availability, age rules, permitted purchases and any premium admission. Do not assume that Ticketmaster tickets or a third-party reseller are accepted." },
      { title: "Time your arrival around the aerial program", body: "The official visitor FAQ lists gates opening at 9 a.m., aerial performances beginning approximately 11:30 a.m. and ending at 4:30 p.m., with the site closing at 5 p.m. All timings and demonstration aircraft can change for weather and operations." },
      { title: "Make an El Paso weekend of it", body: "Add nearby El Paso attractions only after allowing adequate time for installation entry and post-show traffic. Consider an overnight stay rather than attempting a long late-night return after the flying program." },
    ],
    relatedLinks: [
      { href: "/events/air-shows", label: "Texas air shows", description: "Compare verified Texas air-show dates and travel requirements." },
      { href: "/county/el-paso", label: "Explore El Paso County", description: "Plan museums, history and other stops around the show." },
      { href: "/event/texas-capital-air-show", label: "Texas Capital Air Show", description: "Compare another fall Texas air show." },
    ],
    sources: [
      { label: "Amigo Airsho 2026 official dates", url: "https://www.amigoairsho.com/home" },
      { label: "Amigo Airsho 2026 tickets", url: "https://www.amigoairsho.com/tickets" },
      { label: "Amigo Airsho entry rules and FAQ", url: "https://www.amigoairsho.com/faqs" },
    ],
  },
  {
    slug: "texas-capital-air-show",
    whyItMatters: "The Texas Capital Air Show makes San Marcos a practical Central Texas aviation weekend with aerial performances and static displays. Its parking-pass rules are materially different from air shows that include parking in admission, so choosing tickets and transportation together is essential.",
    quickFacts: [
      { label: "2026 dates", value: "November 7–8" },
      { label: "Airport", value: "San Marcos Regional Airport" },
      { label: "Flying", value: "Approximately noon–4 p.m." },
      { label: "Gates", value: "9:30 a.m.–4:30 p.m. (parking opens 9 a.m.)" },
      { label: "Parking", value: "A separate advance parking pass is required for vehicles parked at the show" },
    ],
    planningSections: [
      { title: "Buy admission and parking separately", body: "The organizer states that a parking pass is required for vehicles parking at the event and must be purchased in advance; tickets alone do not include general parking. One pass is per vehicle, and general parking inventory is limited. Premium ticket packages may have different arrangements; confirm them before checkout." },
      { title: "Choose seats or general admission based on shade and comfort", body: "General admission is outdoors with limited shade; the organizer also offers reserved seating and premium hospitality. As of the official 2026 ticket page, children age 15 and under receive free general admission when accompanying a ticketed adult, but not necessarily free premium seating. Recheck the current offer before booking." },
      { title: "Use the official flying window", body: "The organizer currently lists parking opening at 9 a.m., gates at 9:30 a.m., flying approximately noon–4 p.m., and gates closing at 4:30 p.m. Performers and sequence can change. Check the official schedule and grounds map the week of the show." },
      { title: "Verify mobility and entry arrangements", body: "Accessible parking requires a general parking pass plus the appropriate placard or license plate; designated spaces are limited and first come, first served. Review the organizer's entry restrictions, venue map and accessibility guidance before arrival." },
      { title: "Extend the visit around San Marcos", body: "San Marcos makes a convenient base for Central Texas food, river and Hill Country attractions. Reserve nearby lodging if coming from outside the region, but prioritize confirmed show-day traffic and parking instructions over speculative travel-time estimates." },
    ],
    relatedLinks: [
      { href: "/events/air-shows", label: "Texas air shows", description: "Compare upcoming and recurring aviation events." },
      { href: "/county/hays", label: "Explore Hays County", description: "Build a longer San Marcos itinerary." },
      { href: "/event/amigo-airsho", label: "Amigo Airsho", description: "Compare another late-2026 aviation weekend." },
    ],
    sources: [
      { label: "Texas Capital Air Show 2026 homepage", url: "https://texascapitalairshow.com/" },
      { label: "Official ticket types and parking-pass rules", url: "https://texascapitalairshow.com/tickets/" },
      { label: "Official flying schedule", url: "https://texascapitalairshow.com/guest-information/schedule/" },
      { label: "Official accessibility rules", url: "https://texascapitalairshow.com/guest-information/accessibility/" },
    ],
  },
  {
    slug: "bluebonnet-airshow",
    whyItMatters: "Burnet's Bluebonnet Airshow combines Commemorative Air Force heritage with a concentrated Hill Country flying day. The show works well as a day trip or overnight visit, but public parking is not at the airfield, which makes transportation planning especially important.",
    quickFacts: [
      { label: "Confirmed next show", value: "Saturday, March 20, 2027" },
      { label: "Airfield", value: "Burnet Municipal Airport" },
      { label: "Gates / flying", value: "Gates 9 a.m.; flying from noon" },
      { label: "Parking", value: "No general-public airport parking; consult official offsite parking instructions" },
    ],
    planningSections: [
      { title: "Do not drive directly to airport parking", body: "The Commemorative Air Force Highland Lakes Squadron states that general-public parking is not available at the airport. Read its current parking/shuttle guidance and plan the drop-off or departure arrangement before starting your trip to Burnet." },
      { title: "Check advance tickets and age categories", body: "The official 2027 site is already offering advance tickets with adult, youth, senior, military and young-child categories. Prices and availability can change. Use the show's official sales links rather than assuming there is an approved Ticketmaster listing." },
      { title: "Keep the flying lineup current", body: "The official website prominently recaps the 2026 aircraft and performers. Those are historical highlights, not a verified 2027 lineup. Check for a current-year flying roster as the March event approaches." },
      { title: "Plan the rest of Burnet County", body: "Tie the show to Burnet, local museums and Highland Lakes drives. If booking a hotel, compare Burnet-area availability first without claiming that any unverified property is within walking distance." },
    ],
    relatedLinks: [
      { href: "/events/air-shows", label: "Texas air shows", description: "Browse verified upcoming Texas aviation events." },
      { href: "/county/burnet", label: "Explore Burnet County", description: "Make a weekend of the Highland Lakes visit." },
      { href: "/event/wings-over-cowtown-airshow", label: "Wings Over Cowtown", description: "Compare a spring 2027 North Texas aviation weekend." },
    ],
    sources: [{ label: "Official CAF Highland Lakes Squadron Bluebonnet Airshow 2027 information", url: "https://www.bluebonnetairshow.com/" }],
  },
  {
    slug: "wings-over-cowtown-airshow",
    whyItMatters: "Wings Over Cowtown brings military aviation to Naval Air Station Joint Reserve Base Fort Worth. The U.S. Navy's published 2027 Blue Angels schedule lists April 24–25, but host-site visitor information is still being developed, so the guide separates confirmed dates from details visitors must wait to verify.",
    quickFacts: [
      { label: "Confirmed 2027 dates", value: "April 24–25" },
      { label: "Location", value: "NAS Joint Reserve Base Fort Worth" },
      { label: "2027 performer", value: "U.S. Navy Blue Angels (on the Navy's published 2027 schedule)" },
      { label: "Tickets / gates / parking", value: "Not yet published on the host's current official event site" },
    ],
    planningSections: [
      { title: "Dates are confirmed; visitor logistics are not", body: "The U.S. Navy's 2027 demonstration-team schedule confirms the two Fort Worth show dates. The organizer's official website currently says it is being updated, so do not treat any old show hours, access gates or prices as 2027 facts." },
      { title: "Plan for a military installation", body: "Admission, ID screening, installation access, transportation and prohibited items may differ from civilian-airport shows. Check the host's official visitor information when published, especially if arriving with children or visitors without standard U.S. identification." },
      { title: "Avoid speculative tickets and resale listings", body: "We have not verified a current official admission checkout for 2027. Texas Defined should link to the host rather than presenting a fabricated ticket offer or unrelated Ticketmaster event." },
      { title: "Explore Fort Worth beyond the show", body: "Fort Worth's museum district, Stockyards and other attractions can make the weekend worthwhile even if aviation scheduling changes. Book nearby lodging only after selecting a realistic travel base and checking current base access." },
    ],
    relatedLinks: [
      { href: "/events/air-shows", label: "Texas air shows", description: "See the statewide verified aviation calendar." },
      { href: "/county/tarrant", label: "Explore Tarrant County", description: "Build a Fort Worth travel itinerary." },
      { href: "/event/bluebonnet-airshow", label: "Bluebonnet Airshow", description: "Compare another upcoming 2027 Texas show." },
    ],
    sources: [
      { label: "Official Wings Over Cowtown host website", url: "https://www.wingsovercowtown.com/" },
      { label: "Official U.S. Navy Blue Angels show schedule", url: "https://www.blueangels.navsea.cloud.navy.mil/show/" },
    ],
  },
];

const detailBySlug = new Map(expandedDetails.map((detail) => [detail.slug, detail]));
const indexBySlug = new Map(majorEventIndexRecords.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityServer(slug: string): MajorEventAuthorityRecord | null {
  const event = indexBySlug.get(slug);
  const detail = detailBySlug.get(slug);
  if (!event || !detail) return null;
  const { slug: _slug, ...authorityDetail } = detail;
  return { ...event, ...authorityDetail };
}
