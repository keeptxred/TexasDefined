import { majorEventIndexRecords, type MajorEventIndexRecord } from "./major-event-index";

export interface MajorEventSource { label: string; url: string; }
export interface MajorEventPlanningSection { title: string; body: string; }
export interface MajorEventRelatedLink { href: string; label: string; description: string; }
interface MajorEventAuthorityDetails {
  slug: string;
  whyItMatters: string;
  planningSections: MajorEventPlanningSection[];
  relatedLinks: MajorEventRelatedLink[];
  sources: MajorEventSource[];
}
export type MajorEventAuthorityRecord = MajorEventIndexRecord & Omit<MajorEventAuthorityDetails, "slug">;

// Server-only guide copy. The supplied inventory is a discovery seed; official
// organizer/host sources control verified dates stored in major-event-index.ts.
const majorEventAuthorityDetails: MajorEventAuthorityDetails[] = [
  {
    slug: "grapefest",
    whyItMatters: "The festival is a strong North Texas fall-travel anchor because it combines a walkable historic downtown with a large scheduled event.",
    planningSections: [
      { title: "Choose the day first", body: "Admission rules and hours vary by day. Decide whether you want Thursday, Friday evening or the heavier weekend crowd before locking in lodging and arrival time." },
      { title: "Treat downtown as the venue", body: "Build in walking time and use the organizer's current parking and transportation instructions before leaving home." },
      { title: "Make it a weekend", body: "Keep the festival as the fixed point, then add Main Street, dining and other Tarrant County stops around the hours you plan to attend." },
    ],
    relatedLinks: [{ href: "/events", label: "Texas events calendar", description: "Compare other fall events." }, { href: "/browse/counties#county-tarrant", label: "Explore Tarrant County", description: "Plan more of the North Texas trip." }],
    sources: [{ label: "GrapeFest official general information", url: "https://www.grapevinetexasusa.com/grapefest/general-information/" }],
  },
  {
    slug: "texas-renaissance-festival",
    whyItMatters: "This repeat-weekend destination can shape an entire fall trip, and the themed-weekend structure means the best weekend depends on the visitor.",
    planningSections: [
      { title: "Pick the theme first", body: "Start with the official themed-weekend calendar instead of assuming every weekend is interchangeable." },
      { title: "Plan for a full outdoor day", body: "Comfortable footwear, weather planning and a realistic arrival window matter across the large festival footprint." },
      { title: "Recheck operating days", body: "The published start and end dates mark the season boundary; the organizer's calendar remains authoritative for individual operating days." },
    ],
    relatedLinks: [{ href: "/events", label: "Texas events calendar", description: "See other major fall festivals." }],
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
    relatedLinks: [{ href: "/events", label: "Texas events calendar", description: "Compare other fall events." }, { href: "/browse/counties#county-smith", label: "Explore Smith County", description: "Plan more of the East Texas trip." }],
    sources: [{ label: "Texas Rose Festival official site", url: "https://www.texasrosefestival.org/" }],
  },
  {
    slug: "wurstfest",
    whyItMatters: "Wurstfest connects a current travel event to the deeper German-Texan story visible across Hill Country towns, dance halls, food traditions and historic communities.",
    planningSections: [
      { title: "Choose weekday or weekend", body: "The ten-day run gives visitors flexibility; choose the day before arranging lodging and other New Braunfels stops." },
      { title: "Use it as a heritage gateway", body: "Leave time for New Braunfels beyond the festival grounds and connect the visit to the region's German-Texan history." },
      { title: "Check the daily schedule", body: "Entertainment, admission details and operating hours vary; use the organizer's current schedule for your exact day." },
    ],
    relatedLinks: [{ href: "/german-czech-texas-towns", label: "German and Czech Texas towns", description: "Connect Wurstfest to the larger heritage story." }, { href: "/browse/counties#county-comal", label: "Explore Comal County", description: "Build a broader Hill Country itinerary." }, { href: "/events", label: "Texas events calendar", description: "Compare other major fall events." }],
    sources: [{ label: "Wurstfest official site", url: "https://wurstfest.com/" }],
  },
  {
    slug: "fort-worth-stock-show-rodeo",
    whyItMatters: "It supports several kinds of visits, from a single arena night to a full day built around the stock-show grounds and Fort Worth attractions.",
    planningSections: [
      { title: "Choose rodeo night or stock-show day", body: "Start with the specific performance, livestock competition or grounds activity you care about because arrival time and ticket needs differ." },
      { title: "Use the cultural district", body: "Pair the event with nearby museums, dining and other Tarrant County stops instead of making a separate cross-city trip." },
      { title: "Recheck final logistics", body: "Grounds hours, rodeo entry and other operational details can change; use the organizer's current visitor information." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-tarrant", label: "Explore Tarrant County", description: "Plan more of the Fort Worth trip." }, { href: "/events", label: "Texas events calendar", description: "Compare other rodeos and winter events." }],
    sources: [{ label: "Fort Worth Stock Show & Rodeo official site", url: "https://www.fwssr.com/" }, { label: "FWSSR visitor FAQ", url: "https://www.fwssr.com/p/plan-a-visit/frequently-asked-questions" }],
  },
  {
    slug: "san-antonio-stock-show-rodeo",
    whyItMatters: "The event can be the centerpiece of a San Antonio weekend or one major night inside a broader city trip, linking event, county and destination planning.",
    planningSections: [
      { title: "Start with the performance", body: "Pick the concert or rodeo performance first, then plan lodging and other San Antonio activities around that fixed time." },
      { title: "Budget time for the grounds", body: "If livestock exhibits, fair attractions or food are part of the plan, arrive early enough to use the grounds before the performance." },
      { title: "Use official day-of information", body: "Recheck parking, entry rules, show times and ticket availability with the organizer before attending." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-bexar", label: "Explore Bexar County", description: "Build a larger San Antonio visit." }, { href: "/events", label: "Texas events calendar", description: "Compare major Texas rodeos." }],
    sources: [{ label: "San Antonio Stock Show & Rodeo official site", url: "https://www.sarodeo.com/" }, { label: "Visit San Antonio rodeo guide", url: "https://www.visitsanantonio.com/events/arts-culture-events/san-antonio-rodeo/" }],
  },
  {
    slug: "sxsw",
    whyItMatters: "SXSW changes the normal rhythm of central Austin, so visitors need to plan around credentials, distributed venues, transportation and unusually high demand.",
    planningSections: [
      { title: "Know which SXSW you are attending", body: "Start with the badge, festival or program that matters to you, then build the day around its official schedule." },
      { title: "Plan for venue changes", body: "Programming is distributed across downtown; walking time, transit and schedule gaps are part of the event experience." },
      { title: "Book around event demand", body: "Lodging location and transportation strategy can matter as much as the session list when several days of programming are involved." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Connect SXSW with a broader Austin-area visit." }, { href: "/events", label: "Texas events calendar", description: "See other major cultural events." }],
    sources: [{ label: "SXSW official 2027 dates announcement", url: "https://sxsw.com/news/2026/south-by-southwest-2027-dates-announced/" }, { label: "SXSW official site", url: "https://sxsw.com/" }],
  },
  {
    slug: "texas-sandfest",
    whyItMatters: "SandFest is a strong travel event because the venue is also the destination, combining festival access, beach conditions, lodging and island transportation.",
    planningSections: [
      { title: "Plan the island stay first", body: "Decide whether to stay on the island or drive in before choosing arrival time; the festival adds traffic and pedestrian demand." },
      { title: "Check prohibited items", body: "The organizer publishes current guidance on pets, coolers, shade structures, wagons and other items, so check the list while packing." },
      { title: "Give the sculptures time", body: "Leave a broad viewing window, then place beach time, meals and other Port Aransas stops around the festival." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-nueces", label: "Explore Nueces County", description: "Expand the Gulf Coast trip beyond the festival." }, { href: "/events", label: "Texas events calendar", description: "Compare other spring events." }],
    sources: [{ label: "Texas SandFest official site", url: "https://www.texassandfest.org/" }, { label: "Texas SandFest know-before-you-go guide", url: "https://www.texassandfest.org/knowbeforeyougo" }],
  },
  {
    slug: "austin-film-festival",
    whyItMatters: "Austin Film Festival is built around both screenings and the Writers Conference, making badge choice, venue movement and downtown lodging part of the trip-planning decision.",
    planningSections: [
      { title: "Choose films, conference, or both", body: "Start with the badge or pass that matches your priorities because conference panels and film screenings overlap across the festival week." },
      { title: "Plan around multiple venues", body: "Screenings and panels use several downtown and nearby venues, so allow walking or travel time between sessions instead of stacking the schedule too tightly." },
      { title: "Recheck the daily program", body: "The official program evolves as screenings, panels and guests are finalized; use the current festival schedule before each day." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Build more Austin stops around the festival." }, { href: "/events", label: "Texas events calendar", description: "Compare other major cultural events." }],
    sources: [{ label: "Austin Film Festival official site", url: "https://austinfilmfestival.com/" }, { label: "Austin Film Festival 2026 festival information", url: "https://austinfilmfestival.com/festival-and-conference-aff/" }],
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
    ],
    relatedLinks: [{ href: "/browse/counties#county-harris", label: "Explore Harris County", description: "Plan more of the Houston trip." }, { href: "/events", label: "Texas events calendar", description: "Compare other major Texas rodeos." }],
    sources: [{ label: "Houston Livestock Show and Rodeo official site", url: "https://www.rodeohouston.com/" }, { label: "RODEOHOUSTON plan-your-visit guide", url: "https://www.rodeohouston.com/plan-your-visit/" }],
  },
  {
    slug: "fiesta-san-antonio",
    whyItMatters: "Fiesta is an 11-day citywide season rather than a single venue event, so visitors get more value by choosing a few priority parades, neighborhood events and traditions before booking the rest of the trip.",
    planningSections: [
      { title: "Choose anchor events", body: "Use the official Fiesta calendar to pick the parades, cultural events and nonprofit-hosted celebrations that matter most instead of trying to cover the full schedule." },
      { title: "Plan transportation by event", body: "Fiesta venues are distributed around San Antonio, and major parade days can change traffic and parking patterns; use current event-specific instructions." },
      { title: "Leave room between commitments", body: "Crowds, street closures and travel between venues can make an overpacked schedule frustrating, so build in realistic buffers." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-bexar", label: "Explore Bexar County", description: "Build a broader San Antonio visit." }, { href: "/events", label: "Texas events calendar", description: "Compare other major spring events." }],
    sources: [{ label: "Fiesta San Antonio official site", url: "https://fiestasanantonio.org/" }, { label: "Official Fiesta schedule", url: "https://fiestasanantonio.org/schedule/" }],
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
    sources: [{ label: "Kerrville Folk Festival official site", url: "https://www.kerrvillefolkfestival.org/" }, { label: "Kerrville Folk Festival volunteer dates", url: "https://www.kerrvillefolkfestival.org/volunteering/" }],
  },
  {
    slug: "wings-over-houston-airshow",
    whyItMatters: "Wings Over Houston is a large aviation event at Ellington Airport where transportation, arrival time and outdoor conditions can shape the day as much as the flying schedule.",
    planningSections: [
      { title: "Arrive with transportation settled", body: "Use the current official parking and shuttle plan before leaving home because event traffic and airport access can be constrained." },
      { title: "Plan for a long outdoor day", body: "Sun protection, hearing protection, water and comfortable footwear are practical considerations for spending hours on the airfield." },
      { title: "Check the performer schedule", body: "Flying demonstrations and performers can change; confirm the official schedule close to the event rather than relying on an older lineup." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-harris", label: "Explore Harris County", description: "Build more Houston stops around the airshow." }, { href: "/events", label: "Texas events calendar", description: "Compare other major fall events." }],
    sources: [{ label: "Wings Over Houston official site", url: "https://wingsoverhouston.com/" }, { label: "Wings Over Houston travel and parking", url: "https://wingsoverhouston.com/travel/" }],
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

export function getMajorEventAuthorityServer(slug: string) {
  return bySlug.get(slug) ?? null;
}
