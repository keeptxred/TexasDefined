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
    slug: "houston-auto-show",
    whyItMatters: "The Houston Auto Show is one of the region's largest annual vehicle showcases, bringing new models, specialty displays and test-drive opportunities to NRG Center during a five-day winter run.",
    planningSections: [
      { title: "Use the published January 27-31, 2027 dates", body: "The Houston Auto Show's official site lists the 2027 event for January 27 through January 31 at NRG Center. Those organizer-published dates match the discovery inventory and are the dates to use for travel planning." },
      { title: "Choose the day around show hours", body: "The organizer publishes different hours by day, with later closing times Wednesday through Saturday and an earlier Sunday close. Confirm the current daily schedule before choosing tickets or parking." },
      { title: "Expect more than static vehicle displays", body: "The show includes manufacturer exhibits and other automotive experiences, and the organizer has paired it with the Houston Boat Show in recent years. Review the current attractions list because ride-and-drive programs and special displays can change." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-harris", label: "Explore Harris County", description: "Build a broader Houston visit around the show." }, { href: "/events", label: "Texas events calendar", description: "Compare other winter Texas events." }],
    sources: [{ label: "Houston Auto Show official site", url: "https://www.houstonautoshow.com/" }, { label: "Houston Auto Show visitor information", url: "https://www.houstonautoshow.com/show-info/" }],
  },
  {
    slug: "fulton-oysterfest",
    whyItMatters: "Fulton Oysterfest is a long-running Rockport-Fulton coastal festival built around local seafood culture, live entertainment, carnival attractions, vendors and oyster-themed competitions over four days.",
    planningSections: [
      { title: "Plan for March 4-7, 2027", body: "The official Oysterfest site publishes March 4 through March 7, 2027 for the next festival in Fulton. Current Rockport-Fulton tourism information independently points visitors to the same annual event." },
      { title: "Check the daily entertainment schedule", body: "Music, contests, carnival activity and vendor hours vary across the four days. Use the organizer's current schedule rather than assuming every attraction runs continuously from Thursday through Sunday." },
      { title: "Pair the festival with a coastal stay", body: "The event is concentrated around Fulton Harbor, making Rockport-Fulton lodging and nearby coastal attractions practical additions. Reserve early if the festival is the anchor for a weekend trip." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-aransas", label: "Explore Aransas County", description: "Add Rockport-Fulton and coastal stops." }, { href: "/events", label: "Texas events calendar", description: "Compare other Gulf Coast festivals." }],
    sources: [{ label: "Fulton Oysterfest official site", url: "https://fultonoysterfest.org/" }, { label: "Visit Rockport-Fulton Oysterfest listing", url: "https://www.rockport-fulton.org/Oysterfest" }],
  },
  {
    slug: "parker-county-peach-festival",
    whyItMatters: "Weatherford's Parker County Peach Festival is a signature North Texas summer event that fills the historic downtown area with peach-focused food, arts and crafts, entertainment, family activities and the Peach Pedal ride.",
    planningSections: [
      { title: "Use Saturday, July 10, 2027", body: "The official festival site lists the next Parker County Peach Festival for Saturday, July 10, 2027, from 8 a.m. to 4 p.m. in Historic Downtown Weatherford." },
      { title: "Arrive early for a one-day festival", body: "The festival packs hundreds of arts, crafts, food and activity booths into a single daytime window. Early arrival gives more time for peach vendors, entertainment stages and family activities before the afternoon heat and crowds peak." },
      { title: "Plan around downtown access", body: "Festival activity occupies the historic downtown core and draws substantial regional attendance. Review current parking, shuttle and street-closure guidance before driving into Weatherford." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-parker", label: "Explore Parker County", description: "Plan more of a Weatherford and Parker County visit." }, { href: "/events", label: "Texas events calendar", description: "Compare other summer Texas festivals." }],
    sources: [{ label: "Parker County Peach Festival official site", url: "https://www.parkercountypeachfestival.org/" }],
  },
];

const detailBySlug = new Map(expandedDetails.map((detail) => [detail.slug, detail]));
const indexBySlug = new Map(majorEventIndexRecords.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche7Server(slug: string): MajorEventAuthorityRecord | null {
  const event = indexBySlug.get(slug);
  const detail = detailBySlug.get(slug);
  if (!event || !detail) return null;
  const { slug: _slug, ...authorityDetail } = detail;
  return { ...event, ...authorityDetail };
}
