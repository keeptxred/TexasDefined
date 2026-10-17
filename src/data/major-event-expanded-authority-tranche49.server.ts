import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

// Official-source, past-edition guides. Dates are NOT projected forward.
// The current-year organizer must announce a new occurrence before any updated listing.
const records: MajorEventAuthorityRecord[] = [
  {
    slug: "great-texas-airshow",
    name: "The Great Texas Airshow",
    city: "San Antonio", countySlug: "bexar", countyName: "Bexar County", region: "hill-country", category: "culture",
    startDate: "2026-05-02", endDate: "2026-05-03", venue: "Joint Base San Antonio-Randolph",
    officialUrl: "https://www.jbsa.mil/GreatTexasAirshow/", sourceCheckedAt: "2026-10-17",
    whyItMatters: "The Great Texas Airshow is a major military aviation event at Joint Base San Antonio-Randolph that combines flight demonstrations, ground displays, and aviation education. Its confirmed May 2–3, 2026 edition was free and open to the public. The next public edition has not yet been verified; all schedules, aircraft and access information below refer to the 2026 event unless clearly marked otherwise.",
    quickFacts: [
      { label: "Most recent confirmed edition", value: "May 2–3, 2026 (completed)" },
      { label: "2026 admission", value: "Free general public entry" },
      { label: "2026 public hours", value: "Gates 9 a.m.; performances began about 11 a.m." },
      { label: "Installation", value: "Joint Base San Antonio-Randolph" },
      { label: "Next event", value: "Not yet verified by the installation" },
    ],
    planningSections: [
      { title: "Understand the latest event before making plans", body: "JBSA officially announced the May 2–3, 2026 Great Texas Airshow with the U.S. Air Force Thunderbirds and U.S. Army Golden Knights. Those are past performers, not a promised lineup for 2027. Check the official air-show portal for a new public announcement before making nonrefundable reservations or presenting any date as confirmed." },
      { title: "Plan military-base entry and event traffic", body: "The installation's April 2026 travel instructions routed Pat Booker Road traffic east to FM 78 and the East Gate; alternate directions applied to visitors arriving from Schertz, Seguin and Interstate 35. Shuttles carried visitors from general parking to the show grounds. These details are historical and must be rechecked for any future show, rather than copied as a permanent route." },
      { title: "Tickets and paid experiences", body: "JBSA stated that general admission was free in 2026. Do not buy an unrelated Ticketmaster or resale listing labeled 'Great Texas Airshow' without verifying it against the military organizer. Future access, parking and any premium experiences are not yet established." },
      { title: "Prepare for a full day outside", body: "The 2026 public gates opened at 9 a.m. and aerial demonstrations were scheduled to start about 11 a.m. Airfields have extensive walking, variable shade and aircraft noise. Use the current organizer's rules for coolers, chairs, bags, hearing protection, accessibility and weather delays when another show is announced." },
      { title: "Explore San Antonio before or after the show", body: "A trip to Randolph can be combined with the San Antonio missions, historic downtown and other Bexar County attractions. Choose a hotel based on your overall itinerary and verified show traffic patterns; do not imply that a particular hotel is adjacent to an accessible public gate." },
    ],
    relatedLinks: [
      { href: "/events/air-shows", label: "Texas air shows", description: "Compare confirmed upcoming dates and past air shows." },
      { href: "/county/bexar", label: "Bexar County guide", description: "Explore San Antonio attractions, museums and heritage." },
      { href: "/event/wings-over-south-texas", label: "Wings Over South Texas", description: "Compare a Naval Air Station air-show experience." },
    ],
    sources: [
      { label: "JBSA official Great Texas Airshow website", url: "https://www.jbsa.mil/GreatTexasAirshow/" },
      { label: "JBSA official 2026 dates, admission, performers", url: "https://www.jbsa.mil/News/News/Article/4376885/press-release-the-great-texas-airshow-returns-to-jbsa-randolph-may-2-3/" },
      { label: "JBSA 2026 travel and shuttle instructions", url: "https://www.jbsa.mil/News/News/Article/4463066/the-great-texas-airshow-kicks-off-at-jbsa-randolph-may-2-3/" },
    ],
  },
  {
    slug: "wings-over-south-texas",
    name: "Wings Over South Texas Air Show",
    city: "Kingsville", countySlug: "kleberg", countyName: "Kleberg County", region: "south-texas", category: "culture",
    startDate: "2026-04-18", endDate: "2026-04-19", venue: "Naval Air Station Kingsville",
    officialUrl: "https://www.wingsoversouthtexas.com/", sourceCheckedAt: "2026-10-17",
    whyItMatters: "Wings Over South Texas brings naval aviation demonstrations and static aircraft to Naval Air Station Kingsville. Unlike a typical civilian airport festival, the event requires planning around a military installation, identification checks and often very limited shade. The publicly confirmed April 18–19, 2026 edition has ended, and the organizer is not currently advertising a new show date.",
    quickFacts: [
      { label: "Last public edition", value: "April 18–19, 2026 (completed)" },
      { label: "Base", value: "Naval Air Station Kingsville" },
      { label: "2026 general admission", value: "Free; optional upgraded seating" },
      { label: "2026 public schedule", value: "Gates 9 a.m.; aerial program began 11 a.m." },
      { label: "Next announced date", value: "No next show confirmed on organizer website" },
    ],
    planningSections: [
      { title: "Do not treat a past show announcement as the next schedule", body: "The official Wings Over South Texas site currently says it has no air show at the moment and invites people to watch for future announcements. The organizer's April 17, 2026 practice day was restricted to base-access holders; April 18–19 were the public days. Check a new official event announcement before publishing next-year dates or a performer list." },
      { title: "Bring appropriate identification to the installation", body: "The organizer's published visitor FAQ requires government-issued ID for admission. Review any new installation access standards, entry gates, age policies, vehicle screening, parking and prohibited items when a new show is confirmed. Requirements can differ from those at a civilian airfield." },
      { title: "Choose free viewing or ticketed seating carefully", body: "For the 2026 edition, general admission was free while upgraded seating was available for purchase. The FAQ warned that free general admission had no shade and that large umbrellas could obstruct views. There is no verified current ticket checkout for a future show, so Texas Defined should not send visitors to unrelated resale inventory." },
      { title: "Protect hearing and prepare for the weather", body: "The organizer noted that high winds and low clouds can affect flying acts. Expect a long outdoor day with loud jets and walking between flight-line exhibits and food areas. Children may need age-appropriate hearing protection; check allowed chairs, water and bag rules before arrival." },
      { title: "Pair Kingsville with South Texas attractions", body: "The King Ranch area and Kingsville's historic attractions can justify an overnight trip. Guests coming from Corpus Christi or elsewhere along the Coastal Bend should verify actual gate access, traffic restrictions and return-trip conditions rather than relying on airport-to-downtown mileage alone." },
    ],
    relatedLinks: [
      { href: "/events/air-shows", label: "Texas air shows", description: "Find current verified air-show announcements across Texas." },
      { href: "/county/kleberg", label: "Kleberg County guide", description: "Plan a Kingsville stay and local attractions." },
      { href: "/event/great-texas-airshow", label: "Great Texas Airshow", description: "Compare a San Antonio-area military aviation event." },
    ],
    sources: [
      { label: "NAS Kingsville official Wings Over South Texas portal", url: "https://www.wingsoversouthtexas.com/" },
      { label: "Official 2026 public and base-only dates", url: "https://www.wingsoversouthtexas.com/modules/media/?do=inline&id=ca201fc1-61f4-4420-a095-bfd5e9747542" },
      { label: "Organizer FAQ: ID, weather, general admission", url: "https://www.wingsoversouthtexas.com/information/faqs" },
      { label: "Organizer ticket status", url: "https://www.wingsoversouthtexas.com/tickets" },
    ],
  },
  {
    slug: "wasp-homecoming-fly-in",
    name: "WASP Homecoming Celebration & Fly-In",
    city: "Sweetwater", countySlug: "nolan", countyName: "Nolan County", region: "panhandle", category: "culture",
    startDate: "2026-04-17", endDate: "2026-04-18", venue: "National WASP WWII Museum, Avenger Field",
    officialUrl: "https://waspmuseum.org/wasp-heritage-events/", sourceCheckedAt: "2026-10-17",
    whyItMatters: "The National WASP WWII Museum's Homecoming at Avenger Field in Sweetwater is both an aviation gathering and a historically significant tribute to the Women Airforce Service Pilots who trained there during World War II. It features museum interpretation, commemorative gatherings and aircraft. The 2026 public program was held April 17–18; the museum has mentioned early-bird 2027 tickets, but a verified detailed 2027 schedule was not established for this guide.",
    quickFacts: [
      { label: "Documented edition", value: "April 17–18, 2026 (completed)" },
      { label: "Venue", value: "Avenger Field and National WASP WWII Museum" },
      { label: "2026 grounds and museum", value: "Free public homecoming entry" },
      { label: "Special activities", value: "Some dinners, brunches and flight opportunities were separately ticketed" },
      { label: "Next program", value: "Review the museum's upcoming Homecoming details" },
    ],
    planningSections: [
      { title: "Understand what Homecoming celebrates", body: "Avenger Field was a central training location for Women Airforce Service Pilots during the Second World War. The museum's annual Homecoming celebrates those women through commemorations, reunions, educational programming and historic aviation. It is not simply a high-performance jet demonstration, and its historic mission should be central to the visitor experience." },
      { title: "Distinguish free admission from individual experiences", body: "The museum promoted free admission to the main 2026 Homecoming celebration and museum, while its Rendezvous dinner and Celebration Brunch needed separate tickets, with stated nonrefundable terms. For any future edition, consult the museum's own checkout for the particular activity and date; do not imply Ticketmaster sells event admission." },
      { title: "Plan around memorial programming", body: "The 2026 schedule included a WASP memorial observance and other remembrance events. Quiet, respectful conduct matters during memorial segments. The exact programs, invited veterans or families, times and venues can change each year; these details are not an announced future itinerary." },
      { title: "Enjoy historic aircraft without assuming an airshow", body: "The museum invited warbirds and public visitors to Avenger Field and described STEM activities and aircraft on site. Historic-aircraft appearances and flights depend on maintenance, crews and weather. Paid rides or discovery flights, when offered, require separate operator confirmation and safety requirements." },
      { title: "Make Sweetwater an aviation-history trip", body: "Visit the museum's exhibits and explore other Nolan County historic sites, with lodging or RV arrangements selected from current offerings. Check the current museum calendar and Avenger Field operating instructions before planning to fly into the event yourself." },
    ],
    relatedLinks: [
      { href: "/events/air-shows", label: "Texas air shows and fly-ins", description: "Browse confirmed aviation gatherings across Texas." },
      { href: "/county/nolan", label: "Nolan County", description: "Find Sweetwater activities and travel ideas." },
      { href: "/event/bluebonnet-airshow", label: "Bluebonnet Airshow", description: "Compare a historical-aircraft-focused Texas aviation day." },
    ],
    sources: [
      { label: "National WASP WWII Museum annual Homecoming details", url: "https://waspmuseum.org/wasp-heritage-events/" },
      { label: "National WASP WWII Museum 2026 Homecoming dates", url: "https://waspmuseum.org/events/2026-wasp-homecoming/" },
      { label: "National WASP WWII Museum homepage and 2027 updates", url: "https://waspmuseum.org/" },
    ],
  },
];

const bySlug = new Map(records.map(event => [event.slug,event]));
export function getExpandedMajorEventAuthorityTranche49Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
