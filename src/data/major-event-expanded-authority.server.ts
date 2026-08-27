import { majorEventIndexRecords } from "./major-event-index";
import type { MajorEventAuthorityRecord, MajorEventPlanningSection, MajorEventRelatedLink, MajorEventSource } from "./major-event-authority.server";

interface ExpandedDetails {
  slug: string;
  whyItMatters: string;
  planningSections: MajorEventPlanningSection[];
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
    sources: [{ label: "Kerrville Folk Festival official site", url: "https://www.kerrvillefolkfestival.org/" }, { label: "Kerrville Folk Festival volunteer information", url: "https://www.kerrvillefolkfestival.org/volunteering/" }],
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

const detailBySlug = new Map(expandedDetails.map((detail) => [detail.slug, detail]));
const indexBySlug = new Map(majorEventIndexRecords.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityServer(slug: string): MajorEventAuthorityRecord | null {
  const event = indexBySlug.get(slug);
  const detail = detailBySlug.get(slug);
  if (!event || !detail) return null;
  const { slug: _slug, ...authorityDetail } = detail;
  return { ...event, ...authorityDetail };
}
