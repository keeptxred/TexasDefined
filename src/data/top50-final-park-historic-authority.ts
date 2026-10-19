import type { Destination, DestinationAuthorityGuide, DestinationAuthoritySource, DestinationItinerary } from "./types";

/** Original source-verified Top-50 authority for three special-case public attractions.
 * Preserve destination identities and the operator-reviewed date, only supplement the visitor guide.
 */
type Seed = Omit<DestinationAuthorityGuide, "itineraries"> & { itineraries: Array<{ label:string; duration:string; steps:string[] }> };
const DOSSIERS: Record<string, Seed> = {
  "enchanted-rock-state-natural-area": {
    "whyItMatters": "Enchanted Rock is one of the most conspicuous granite domes in the Hill Country and an outdoor landmark with far more to offer than its summit selfie. The pink granite records deep geological history, while vernal pools and fragile summit habitats require visitors to stay on durable surfaces and respect closures. The practical challenge is anticipating crowd-driven capacity, heat and slippery rock when rainfall changes the safety of elevated trails.",
    "assessment": {
      "recommendedVisit": "2–4 hours for a reserved summit walk and viewpoint; full day with the longer loops",
      "physicalEffort": "Moderate to high",
      "weatherExposure": "Fully outdoors",
      "planningLevel": "High",
      "familyFit": "Good for energetic families comfortable with steep exposed rock; families with very young children may prefer the lower Loop and Interpretive trails.",
      "firstTimeValue": "An iconic Texas granite landscape best visited with a prebooked pass and weather-aware hiking plan."
    },
    "itineraries": [
      {
        "label": "Granite summit",
        "duration": "2–3 hours",
        "steps": [
          "Reserve a day pass for the correct date and check TPWD closures",
          "Follow Summit Trail only when the granite surface is safely open",
          "Spend time observing the geology and vernal pools without entering the fragile habitat"
        ]
      },
      {
        "label": "Lower-trail nature day",
        "duration": "Half day",
        "steps": [
          "Start with park orientation and a lower interpretive trail",
          "Continue along the Loop Trail if heat and conditions permit",
          "Use a shaded picnic break and return before afternoon heat builds"
        ]
      },
      {
        "label": "Hill Country geology weekend",
        "duration": "2 days",
        "steps": [
          "Make Enchanted Rock the primary morning outing",
          "Explore Llano or Fredericksburg on a separate visit block",
          "Save nearby wineries and historic districts for a different day"
        ]
      }
    ],
    "sources": [
      {
        "label": "Texas Parks and Wildlife — Enchanted Rock visitor policies",
        "url": "https://tpwd.texas.gov/state-parks/enchanted-rock",
        "scope": "Reservations, visitor operations, capacity and park interpretation."
      },
      {
        "label": "Texas Parks and Wildlife — active park closures",
        "url": "https://tpwd.texas.gov/state-parks/enchanted-rock/alert",
        "scope": "Controlled visitor entry, seasonal closures and park alerts."
      },
      {
        "label": "Texas Parks and Wildlife — trail accessibility and pet limits",
        "url": "https://tpwd.texas.gov/state-parks/enchanted-rock/trails-info",
        "scope": "Wet-weather trail status, summit route and permitted pet areas."
      }
    ]
  },
  "san-jacinto-battleground": {
    "whyItMatters": "San Jacinto Battleground is the physical setting of the April 21, 1836 battle that established the military victory securing Texas independence from Mexico. The landscape is not simply a 567-foot-tall monument: public battlefield roads, historic interpretation and the museum offer different ways to understand the event and its consequences. A responsible visit also distinguishes the freely open battlefield from the separately ticketed monument and museum, and does not direct visitors to Battleship Texas, which left for restoration in 2022.",
    "assessment": {
      "recommendedVisit": "1–2 hours for battlefield landscape; 3–4 hours with the museum, film and observation deck",
      "physicalEffort": "Low to moderate",
      "weatherExposure": "Mixed indoor/outdoor",
      "planningLevel": "Moderate",
      "familyFit": "Good for school-age history learners; combine the outdoor battlefield with the museum's interpretive displays and allow time to discuss historical perspectives.",
      "firstTimeValue": "A defining Texas Revolution site with substantial documentary and on-the-ground interpretation."
    },
    "itineraries": [
      {
        "label": "Battlefield orientation",
        "duration": "90 minutes",
        "steps": [
          "Follow the public battlefield driving route and historic markers",
          "Study the 1836 battle geography and the monument from the grounds",
          "End with a short view of the surrounding coastal prairie"
        ]
      },
      {
        "label": "Monument and museum",
        "duration": "Half day",
        "steps": [
          "Visit the museum during its separately posted operating days",
          "Take the elevator to the observation deck if operating",
          "Spend time with the battle interpretation and historical film"
        ]
      },
      {
        "label": "Texas Revolution day",
        "duration": "Full day",
        "steps": [
          "Begin with San Jacinto for the military campaign's conclusion",
          "Use the museum's primary-source interpretation as a guide",
          "Visit a separate nearby maritime or early-Texas destination if open"
        ]
      }
    ],
    "sources": [
      {
        "label": "Texas Historical Commission — San Jacinto Battleground",
        "url": "https://thc.texas.gov/historic-sites/san-jacinto-battleground",
        "scope": "Current grounds/museum schedule, fees, history and official visitor contact."
      },
      {
        "label": "Texas Historical Commission — visit routes and monument",
        "url": "https://thc.texas.gov/state-historic-sites/san-jacinto-battleground/plan-your-visit-san-jacinto-battleground",
        "scope": "Museum, observation deck and guided battlefield experience."
      },
      {
        "label": "Texas State Historical Association — San Jacinto legacy",
        "url": "https://www.tshaonline.org/handbook/entries/san-jacinto-battleground-state-historical-park",
        "scope": "Historical site administration and Battleship Texas relocation chronology."
      }
    ]
  },
  "barton-springs-pool": {
    "whyItMatters": "Barton Springs Pool is a three-acre natural swimming experience fed by underground springs in Austin's Zilker Park. The pool carries ecological importance alongside its civic status, drawing attention to the spring system and sensitive Barton Springs salamander habitat. It also differs from a municipal lap pool: year-round cool spring water, natural edges, scheduled maintenance, lifeguarded hours and construction-related access changes all affect a safe visit.",
    "assessment": {
      "recommendedVisit": "90 minutes to 3 hours for a swim and park time",
      "physicalEffort": "Low to moderate",
      "weatherExposure": "Mostly outdoors",
      "planningLevel": "Moderate",
      "familyFit": "A distinctive Austin family outing for confident swimmers with active supervision; natural-bottom changes, water temperature and depth warrant extra care.",
      "firstTimeValue": "A signature free-flowing spring-fed urban swimming hole with protected natural ecology."
    },
    "itineraries": [
      {
        "label": "Morning swim",
        "duration": "2 hours",
        "steps": [
          "Check the City of Austin's daily schedule and any Thursday cleaning closure",
          "Buy or prepare the appropriate admission ticket",
          "Enter during staffed swim hours and leave time for warming up afterward"
        ]
      },
      {
        "label": "Zilker Park half day",
        "duration": "Half day",
        "steps": [
          "Swim at Barton Springs during an operating session",
          "Take a break in nearby Zilker Park for shade and lunch",
          "Use an approved public trail or garden visit only if weather permits"
        ]
      },
      {
        "label": "Austin springs and ecology",
        "duration": "Full day",
        "steps": [
          "Start with Barton Springs and learn about its protected spring ecosystem",
          "Explore a separate nearby Austin natural-history or ecology attraction",
          "Return downtown for a separate evening outing"
        ]
      }
    ],
    "sources": [
      {
        "label": "City of Austin — Barton Springs Pool official visitation",
        "url": "https://www.austintexas.gov/services/visit-barton-springs-pool",
        "scope": "Controlled operating times, Tuesday/Thursday cleaning schedules, admissions and online tickets."
      },
      {
        "label": "City of Austin — retaining wall maintenance",
        "url": "https://www.austintexas.gov/parks/barton-springs-wall-repair-project",
        "scope": "Fencing, visitor routing and current wall-repair access guidance."
      },
      {
        "label": "City of Austin — city pool fees and rentals",
        "url": "https://www.austintexas.gov/parks/locations/pool-fees-and-rentals",
        "scope": "Resident/nonresident admission categories and ATXSwims payment system."
      }
    ]
  }
};

export function applyTop50FinalAuthority(destination: Destination): Destination {
  const seed = DOSSIERS[destination.slug];
  if (!seed) return destination;
  const sources = new Map<string, DestinationAuthoritySource>();
  for (const item of [...(destination.authorityGuide?.sources ?? []), ...seed.sources]) {
    sources.set(item.url.replace(/\/$/, ""), item);
  }
  const guide: DestinationAuthorityGuide = {
    whyItMatters: seed.whyItMatters,
    assessment: seed.assessment,
    itineraries: seed.itineraries.map((it) => ({
      label: it.label, duration: it.duration, steps: it.steps as [string, ...string[]],
    })) as [DestinationItinerary, DestinationItinerary, DestinationItinerary],
    sources: [...sources.values()],
  };
  return { ...destination, authorityGuide: guide };
}
