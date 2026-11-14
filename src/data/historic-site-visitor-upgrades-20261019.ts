import type { Destination, DestinationAuthorityGuide } from "./types";

/** Additional site-specific THC research checked October 19, 2026.
 * Publication is immediate after deployment; official source changes are monitored
 * separately, never treated as a pre-publication holding queue.
 */
type HistoricVisitorUpgrade = {
  entryNote: string;
  accessibilityNotes: string;
  history: string[];
  source: DestinationAuthorityGuide["sources"][number];
  itineraries: DestinationAuthorityGuide["itineraries"];
};
const UPGRADES: Record<string, HistoricVisitorUpgrade> = {
  "eisenhower-birthplace": {
    "entryNote": "THC's site overview currently lists Wednesday–Saturday 9 a.m.–5 p.m. and Sunday noon–5 p.m., with hourly tours and the last tour at 4 p.m. The detailed tour page also mentions Tuesday; confirm Tuesday access with the operator rather than assuming it is open. Keep the ticket receipt for possible complimentary entry to Sam Rayburn House within one week.",
    "accessibilityNotes": "THC describes wheelchair-accessible ramps at the visitor center and Eisenhower birthplace house, with accessible restrooms at the picnic pavilion. Park in the official lot off Lamar Avenue; several adjacent streets are closed to through access.",
    "history": [
      "Dwight D. Eisenhower was born in Denison on October 14, 1890, in a modest two-story house built during the 1870s. The house and visitor center tell an important working-class railway-town origin story, not just Eisenhower's later wartime command or presidency.",
      "The Texas Historical Commission currently links Eisenhower Birthplace with Sam Rayburn House through reciprocal one-week ticket admission. Those are different sites approximately 25 miles apart with different arrival arrangements; travelers should allow independent time rather than treating the second as another room at the birthplace."
    ],
    "source": {
      "label": "THC — Eisenhower Birthplace tours, access and parking",
      "url": "https://thc.texas.gov/state-historic-sites/eisenhower-birthplace/plan-your-visit-eisenhower-birthplace",
      "scope": "One-hour house tours, historic working-class setting, visitor ramps, official parking and ticket reciprocity."
    },
    "itineraries": [
      {
        "label": "A guided Denison birthplace visit",
        "duration": "About one hour",
        "steps": [
          "Begin at the visitor center for the 1890 Denison railway-town context and current tour check-in.",
          "Tour the furnished original birthplace, distinguishing family history from later presidential exhibits.",
          "Use the official Lamar Avenue parking instructions because adjacent residential street access is restricted."
        ]
      },
      {
        "label": "Explore Eisenhower's early life",
        "duration": "Unhurried visit",
        "steps": [
          "Compare the house's working-class rooms with the larger political and military career outlined in the visitor center.",
          "Use the operator's virtual tour or other interpretation if a requested interior slot is unavailable.",
          "Allow time for the grounds and picnic pavilion rather than promising entry outside the scheduled house-tour hours."
        ]
      },
      {
        "label": "Two Texas national leaders",
        "duration": "Separate stops, half-day or longer",
        "steps": [
          "Keep the dated admission receipt: the operator currently offers complimentary Sam Rayburn House admission within a week.",
          "Plan the roughly 25-mile Denison–Bonham transfer and confirm both operators' opening days.",
          "At Sam Rayburn House, contrast a 1916 congressional home with Eisenhower's nineteenth-century birthplace."
        ]
      }
    ]
  },
  "sam-rayburn-house": {
    "entryNote": "THC's main visitor page currently lists Wednesday–Saturday 9 a.m.–5 p.m. and Sunday noon–5 p.m., last hourly tour 4 p.m. Its detailed program page contains partly different weekday and tour times; confirm the day and slot before traveling. Paid admission carries a one-week reciprocal Eisenhower Birthplace offer with the original receipt.",
    "accessibilityNotes": "The visitor center, accessible parking and restrooms are available; the house's porch and first floor can accommodate smaller wheelchairs, but the second floor is not wheelchair accessible. Grass, gravel and dirt paths cross the grounds; the visitor center offers a virtual-tour alternative.",
    "history": [
      "Sam Rayburn's 1916 Bonham house retains his personal furnishings, photographs and belongings across his long service in Congress. The site offers a different perspective on the Speaker than a Capitol portrait: domestic rooms, farm outbuildings, vehicles and guests connect twentieth-century public work to family life.",
      "Texas Historical Commission describes free self-guided grounds during public hours, while house tours are accompanied and separately ticketed. The Rayburn site's reciprocal admission agreement with Eisenhower Birthplace is useful, but it does not synchronize opening hours or guarantee immediate walk-in availability."
    ],
    "source": {
      "label": "THC — Sam Rayburn House guided house and free grounds visits",
      "url": "https://thc.texas.gov/state-historic-sites/sam-rayburn-house/plan-your-visit-sam-rayburn-house",
      "scope": "Accompanied 10–45-minute house tours, grounds, group booking, accessibility limitations and virtual alternative."
    },
    "itineraries": [
      {
        "label": "Inside Rayburn's home",
        "duration": "About 45 minutes",
        "steps": [
          "Start at the visitor center for tickets and the next escorted house-tour slot.",
          "Study original Rayburn family furnishings, political photographs and personal artifacts rather than expecting a modern interactive presidential museum.",
          "If upper floors are inaccessible, use the operator's virtual interpretation and first-floor experience."
        ]
      },
      {
        "label": "The house, grounds and farm",
        "duration": "Unhurried visit",
        "steps": [
          "Tour permitted rooms and compare the Speaker's household to the political events he influenced.",
          "Explore the free grounds and outbuildings, including vehicles, when currently accessible; paths include grass and gravel rather than continuous sidewalks.",
          "Check animal and outdoor-display conditions with the operator instead of expecting every item to be present on every visit."
        ]
      },
      {
        "label": "Bonham and Denison history",
        "duration": "Half-day or separate-day trip",
        "steps": [
          "Use the dated ticket receipt for the current reciprocal Eisenhower Birthplace admission offer within one week.",
          "Allow a separate drive to Denison; these are distinct homes with different visitor-hour policies.",
          "Compare Rayburn's twentieth-century house with Eisenhower's Denison birthplace and working-class family origins."
        ]
      }
    ]
  },
  "bush-family-home": {
    "entryNote": "THC lists Tuesday–Saturday 10 a.m.–5 p.m., with the last tour starting at 4:15 p.m. Public house tours take about 30–60 minutes; walk-ins are subject to space, and school/group visits should be reserved roughly two weeks ahead. Begin at the visitor center across the street.",
    "accessibilityNotes": "THC identifies accessible parking, restrooms and visitor center. The historic Bush house provides wheelchair access through the side entrance; the grounds have maintained grass and sidewalks leading to the porch.",
    "history": [
      "The Midland house has been restored to an early-1950s appearance, emphasizing the family's West Texas years before the national political careers of George H. W. Bush and George W. Bush. Context about oil development, postwar neighborhoods, schools and civic institutions makes the modest domestic setting more revealing than a presidential timeline alone.",
      "The public tour begins at a visitor center across West Ohio Avenue, not by walking directly into the front door of the house. The operator offers a separate Midland bus-tour program for booked groups; it is not included automatically in a normal admission ticket."
    ],
    "source": {
      "label": "THC — Bush Family Home public tours, group booking and accessible arrival",
      "url": "https://thc.texas.gov/state-historic-sites/bush-family-home/plan-your-visit-bush-family-home",
      "scope": "Thirty- to sixty-minute public tours, visitor-center check-in, last tour, wheelchair entrance, group reservations and distinct Midland bus programs."
    },
    "itineraries": [
      {
        "label": "A 1950s Midland house tour",
        "duration": "30–60 minutes",
        "steps": [
          "Park as directed and start across the street at the official visitor center; walk-in space is not guaranteed.",
          "Read the period furniture, children's toys and ordinary domestic details as evidence of the family's Midland life.",
          "Visit the house using the side-access route if wheelchair entry is required and staff confirm the accessible tour."
        ]
      },
      {
        "label": "The family and a changing oil town",
        "duration": "One to two hours",
        "steps": [
          "Connect the early-1950s interior to the Bush family's arrival in West Texas and George Bush's oil-business work.",
          "Explore exhibits and interpretation of community institutions, schools and neighborhood life without claiming all nearby buildings are publicly accessible.",
          "Allow extra time for the visitor center and current family-history exhibits."
        ]
      },
      {
        "label": "A wider Midland political-history program",
        "duration": "Group outing, advance booking",
        "steps": [
          "Reserve the operator's dedicated Midland history or group tour about two weeks ahead rather than expecting a bus on a walk-in ticket.",
          "Explore independently operating city museums or historic venues based on their current public schedules.",
          "Keep ordinary house admission and paid group/bus-program terms distinct."
        ]
      }
    ]
  },
  "san-felipe-de-austin": {
    "entryNote": "THC's main listing currently gives Tuesday–Sunday 9 a.m.–5 p.m.; its detailed standard self-guided tour page lists Wednesday–Sunday. Confirm Tuesday museum access before traveling. A regular museum, reconstructed town and trail visit takes about 90–120 minutes; special programs and groups have separate times and reservations.",
    "accessibilityNotes": "THC lists accessible parking and ramp access into the museum and visitor center. The outdoor reconstructed village and one-third-mile trail require additional standing and walking; ask staff about current surfaces and accommodations. Only service dogs may enter buildings.",
    "history": [
      "San Felipe de Austin was Stephen F. Austin's colonial headquarters and a busy civic center in Mexican Texas before residents burned the town during their withdrawal in the Runaway Scrape of 1836. Today's Villa de Austin buildings are reconstructions informed by interpretation and archaeology, not houses that survived the 1836 fire.",
      "The 10,000-square-foot museum uses archaeological materials and first-person accounts to describe colonists and the people who labored in the community, including enslaved residents. Linking the reconstructed courthouse, printing office, inn and Celia's home to those accounts helps readers distinguish a living-history installation from the original destroyed town."
    ],
    "source": {
      "label": "THC — San Felipe de Austin museum, reconstructed town and accessible visit",
      "url": "https://thc.texas.gov/state-historic-sites/san-felipe-de-austin/plan-your-visit-san-felipe-de-austin",
      "scope": "90–120-minute self-guided route, 10,000-square-foot museum, reconstructed Villa, one-third-mile trail, group booking and access."
    },
    "itineraries": [
      {
        "label": "Museum and townsite overview",
        "duration": "90–120 minutes",
        "steps": [
          "Begin in the archaeology and history museum to understand Austin's colony under Mexican rule.",
          "Continue to reconstructed Villa de Austin buildings, including civic and domestic spaces, recognizing that they reproduce a town burned in 1836.",
          "Use the one-third-mile trail if conditions and mobility permit; reserve walking time beyond the indoor galleries."
        ]
      },
      {
        "label": "Read the colony beyond the founders",
        "duration": "Unhurried visit",
        "steps": [
          "Compare firsthand accounts, archaeology and the stories of enslaved people, including Celia, with the colonial political history.",
          "Use the reconstructed print shop and businesses to understand how the colony's government and labor systems operated.",
          "Check whether Saturday living-history demonstrations are scheduled; do not promise every activity on weekdays."
        ]
      },
      {
        "label": "Follow the Texas Revolution's geography",
        "duration": "Half-day or separate-day route",
        "steps": [
          "Use San Felipe as the starting point for Austin's colony and the 1836 Runaway Scrape.",
          "Continue to separately operating Washington-on-the-Brazos on a date when its ticketed museum and reconstructed townsite are open.",
          "Only add nearby Stephen F. Austin State Park if its public access and any park reservations fit the itinerary."
        ]
      }
    ]
  }
};

export const historicallyVerifiedVisitorUpgrades = Object.keys(UPGRADES);

export function applyHistoricVisitorUpgrades20261019(destination: Destination): Destination {
  const research = UPGRADES[destination.slug];
  if (!research) return destination;
  const sources = destination.authorityGuide?.sources ?? [];
  const authorityGuide = destination.authorityGuide ? {
    ...destination.authorityGuide,
    itineraries: research.itineraries,
    sources: sources.some((source) => source.url === research.source.url) ? sources : [...sources, research.source],
  } : undefined;
  return {
    ...destination,
    body: [...destination.body, ...research.history].filter((paragraph, index, all) => all.indexOf(paragraph) === index),
    entryNote: research.entryNote,
    accessibilityNotes: research.accessibilityNotes,
    sourceCheckedAt: "2026-10-19",
    ...(authorityGuide ? { authorityGuide } : {}),
  };
}
