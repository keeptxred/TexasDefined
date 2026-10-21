import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

// Organizer-verified 2026 festival; future edition dates are deliberately unannounced.
const records: MajorEventAuthorityRecord[] = [
  {
  slug: "texas-onion-fest",
  name: "Texas Onion Fest",
  city: "Weslaco",
  countySlug: "hidalgo",
  countyName: "Hidalgo County",
  region: "south-texas-plains",
  category: "culture",
  startDate: "2026-03-28",
  venue: "Texas Boulevard, historic downtown Weslaco",
  officialUrl: "https://www.weslaco.com/texasonionfest/",
  sourceCheckedAt: "2026-10-21",
  dateNote: "The 2026 Texas Onion Fest took place Saturday, March 28. The Weslaco Area Chamber of Commerce has not published an organizer-confirmed 2027 date. Do not turn third-party recurrence projections into live tickets.",
  whyItMatters: "Historic downtown Weslaco celebrates the Texas 1015 sweet onion, a crop developed locally and recognized as Texas's official state vegetable. This one-day Rio Grande Valley tradition combines agriculture, the onion-eating contest, live music, a car show, market vendors, dancing horses and children's activities. It is a specific annual event, not a generic statewide agriculture festival.",
  quickFacts: [
      {
  label: "Last confirmed festival",
  value: "March 28, 2026 (completed)"
      },
      {
  label: "2026 operating hours",
  value: "Saturday 10:15 a.m.–10:15 p.m."
      },
      {
  label: "General admission",
  value: "Free in 2026; some rides and purchases extra"
      },
      {
  label: "Where",
  value: "Texas Boulevard in historic downtown Weslaco"
      },
      {
  label: "Parking",
  value: "Free options included City Hall and South Texas College"
      },
      {
  label: "Next edition",
  value: "Await organizer's confirmed schedule"
      }
    ],
  planningSections: [
      {
  title: "Go to historic downtown Weslaco, not a farm fairground",
  body: "The Chamber placed the 2026 event along Texas Boulevard in the heart of Weslaco. The festival's street footprint connects food and commercial booths, the 1015 Market, stage performances and children's activities, so review that year's street map before choosing a parking or rideshare approach."
      },
      {
  title: "Understand why the 1015 onion matters",
  body: "The festival honors the famously sweet Texas 1015 onion developed in Weslaco. The name refers to a suggested October 15 planting date, not the March festival date. This is an opportunity to learn about Rio Grande Valley agriculture rather than just sample onion dishes."
      },
      {
  title: "Know what's free and what may cost extra",
  body: "The organizer advertised free general admission and free designated parking in 2026. Food, market purchases and some children's rides were separate. Do not equate a no-cost entrance with unlimited access to carnival rides or other vendor activities."
      },
      {
  title: "Plan around the distinctive activities",
  body: "The completed 2026 program featured an onion-eating contest, horse entertainment, a car show, music stages, children's rides and culinary demonstrations. Choose priority experiences after the Chamber posts the next official program; no specific entertainer or contest time is confirmed for 2027."
      },
      {
  title: "Use the Chamber's parking and park-and-ride guidance",
  body: "For 2026, additional parking was advertised at City Hall and South Texas College, along with a park-and-ride option. Check whether future shuttle pickup points, hours and accessible drop-off services are offered rather than relying on a third-party downtown map."
      },
      {
  title: "Make it a Rio Grande Valley visit",
  body: "Weslaco sits in Hidalgo County and can anchor a wider itinerary of food, agriculture and wildlife attractions. Leave time for realistic drives and check the specific hours of nearby natural areas, instead of assuming the entire Valley is within walking distance of the street festival."
      }
    ],
  relatedLinks: [
      {
  href: "/county/hidalgo",
  label: "Hidalgo County",
  description: "Find other Weslaco and Rio Grande Valley places worth visiting."
      },
      {
  href: "/event/texas-rice-festival",
  label: "Texas Rice Festival",
  description: "Compare a distinct agriculture and harvest celebration in Southeast Texas."
      },
      {
  href: "/events/food-festivals",
  label: "Texas food festivals",
  description: "Explore other source-confirmed food and agricultural events."
      }
    ],
  sources: [
      {
  label: "Weslaco Area Chamber of Commerce Texas Onion Fest and admission",
  url: "https://www.weslaco.com/texasonionfest/"
      },
      {
  label: "Chamber-hosted March 28, 2026 event registration and program",
  url: "https://www.eventeny.com/events/texas-onion-fest-2026-23602/"
      },
      {
  label: "Chamber description of annual Weslaco programs",
  url: "https://www.weslaco.com/programs/"
      }
    ]
  }
];

const bySlug = new Map(records.map((event) => [event.slug, event]));
export function getExpandedMajorEventAuthorityTranche56Server(slug: string): MajorEventAuthorityRecord | null { return bySlug.get(slug) ?? null; }
