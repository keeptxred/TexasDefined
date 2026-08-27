import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "houston-auto-show",
    name: "Houston Auto & Boat Show",
    city: "Houston",
    countySlug: "harris",
    countyName: "Harris County",
    region: "gulf-coast",
    category: "culture",
    startDate: "2027-01-27",
    endDate: "2027-01-31",
    dateNote: "The Houston Auto Show's official media page confirms the 2027 Houston Auto & Boat Show for January 27-31, 2027 at NRG Center.",
    venue: "NRG Center",
    officialUrl: "https://www.houstonautoshow.com/",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "The Houston Auto & Boat Show is a major Texas consumer exhibition that brings new vehicles, automotive technology, ride-and-drive experiences and marine displays into one NRG Center event, making it useful for enthusiasts and shoppers alike.",
    planningSections: [
      { title: "Choose a weekday or weekend strategy", body: "The official show schedule lists January 27-31, 2027, with longer daytime access on Saturday and Sunday and later closing times Wednesday through Saturday. Use the current hours page before buying tickets because exhibit and ride-and-drive schedules may differ from building hours." },
      { title: "Plan for a large indoor show floor", body: "NRG Center consolidates a large number of automotive and boat exhibits under one roof. Build in enough time for display halls, brand activations and any test-drive experiences rather than planning the visit around a single booth." },
      { title: "Use NRG Park logistics", body: "Parking, entry and event-day traffic around NRG Park can add time to the visit. Check official parking and ticket instructions shortly before departure and avoid assuming a normal non-event arrival pattern." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-harris", label: "Explore Harris County", description: "Connect the show to a broader Houston visit." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas conventions and seasonal events." },
    ],
    sources: [
      { label: "Houston Auto Show official site", url: "https://www.houstonautoshow.com/" },
      { label: "Houston Auto Show 2027 press and show information", url: "https://www.houstonautoshow.com/press-news-media/" },
    ],
  },
  {
    slug: "fulton-oysterfest",
    name: "Fulton Oysterfest",
    city: "Fulton",
    countySlug: "aransas",
    countyName: "Aransas County",
    region: "gulf-coast",
    category: "food",
    startDate: "2027-03-04",
    endDate: "2027-03-07",
    venue: "Fulton Oysterfest grounds",
    officialUrl: "https://fultonoysterfest.org/",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "Fulton Oysterfest turns the Rockport-Fulton area's Gulf seafood identity into a four-day community festival with oysters, live music, carnival rides, vendors and the event's signature oyster-eating competition.",
    planningSections: [
      { title: "The 2027 dates are already confirmed", body: "The organizer lists Fulton Oysterfest for March 4-7, 2027. The Rockport-Fulton visitor bureau independently lists all four dates, so visitors can plan lodging and travel around a confirmed event window rather than a projected recurrence." },
      { title: "Choose the day around music and contests", body: "Music headliners, contests and carnival activity vary across the four days. Check the organizer's current entertainment and contest pages before choosing a day if a specific performance or oyster competition is the priority." },
      { title: "Make it part of a Rockport-Fulton coast trip", body: "Fulton and neighboring Rockport are close enough for the festival to anchor a wider Aransas County weekend. Leave time for the waterfront and local seafood rather than limiting the visit to the festival gates." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-aransas", label: "Explore Aransas County", description: "Build a wider Rockport-Fulton coastal itinerary." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas food and Gulf Coast festivals." },
    ],
    sources: [
      { label: "Fulton Oysterfest official site", url: "https://fultonoysterfest.org/" },
      { label: "Rockport-Fulton visitor bureau Oysterfest listing", url: "https://www.visitrockportfulton.com/event/fulton-oysterfest/327/" },
    ],
  },
  {
    slug: "sandhills-stock-show-rodeo",
    name: "Sandhills Stock Show & Rodeo",
    city: "Odessa",
    countySlug: "ector",
    countyName: "Ector County",
    region: "big-bend",
    category: "rodeo",
    startDate: "2027-01-07",
    endDate: "2027-01-16",
    dateNote: "Texas A&M AgriLife-linked 4-H stock-show guidance lists the 2027 SandHills Stock Show & Rodeo for January 7-16 in Odessa, and the Ector County Coliseum ticketing venue lists event entries throughout that same window.",
    venue: "Ector County Coliseum",
    officialUrl: "https://sandhillsstockshow.com/",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "The Sandhills Stock Show & Rodeo is one of the early anchors of the Texas winter livestock-and-rodeo calendar, bringing agricultural exhibitors and rodeo competition to Odessa at the start of the major-show season.",
    planningSections: [
      { title: "Use the January 7-16 show window", body: "Current Texas 4-H major-show guidance lists the SandHills Stock Show & Rodeo for January 7-16, 2027 in Odessa, while the Ector County Coliseum ticketing calendar shows Sandhills events across the same dates. Verify the detailed stock-show and rodeo schedule before choosing a day." },
      { title: "Separate livestock and rodeo planning", body: "A stock show and a ticketed rodeo are related but not interchangeable experiences. Decide whether livestock judging, exhibitors or a rodeo performance is the primary goal, then use the relevant official schedule and entry information." },
      { title: "Plan Odessa logistics before arrival", body: "The Ector County Coliseum is the main venue anchor. Check current parking, gate and ticket details before traveling, particularly for evening rodeo performances and higher-attendance weekend dates." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-ector", label: "Explore Ector County", description: "Connect the rodeo to a broader Odessa and West Texas visit." },
      { href: "/events", label: "Texas events calendar", description: "Compare other winter stock shows and Texas rodeos." },
    ],
    sources: [
      { label: "Sandhills Stock Show & Rodeo official site", url: "https://sandhillsstockshow.com/" },
      { label: "Texas A&M AgriLife-linked major stock show schedule", url: "https://www.uvaldecounty4h.com/stock-show-information" },
      { label: "Ector County Coliseum event ticketing calendar", url: "https://www.axs.com/venues/100925/ector-county-coliseum-odessa-tickets" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche15Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
