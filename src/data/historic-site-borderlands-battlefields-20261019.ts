import type { Destination, DestinationAuthorityGuide } from "./types";

/** Individually verified 19 October 2026 against the site's official THC pages.
 * Avoid treating accessible interpretive signs as evidence of a staffed facility.
 */
type SiteResearch = {
  entryNote: string;
  accessibilityNotes: string;
  history: string[];
  sources: DestinationAuthorityGuide["sources"];
  itineraries: DestinationAuthorityGuide["itineraries"];
  visitorFaqs: NonNullable<Destination["visitorFaqs"]>;
};
const RESEARCH: Record<string, SiteResearch> = {
  "casa-navarro": {
    "entryNote": "THC lists Tuesday–Sunday 10 a.m.–4:30 p.m. at 228 S. Laredo St. in San Antonio. The normal self-guided home visit takes about one hour with walk-in admission; specialized school/adult group experiences require arrangements roughly two weeks ahead.",
    "accessibilityNotes": "Visitor parking is across S. Laredo Street from the entrance. The site includes original nineteenth-century adobe and limestone buildings; ask THC about thresholds and individual room access before promising a fully step-free tour.",
    "history": [
      "José Antonio Navarro was a rancher, merchant and leading Tejano political figure who became one of two native-born Texans to sign the Declaration of Independence in 1836. His 1850s adobe-and-limestone home preserves evidence of daily family life and political organizing after the Revolution.",
      "Casa Navarro is among the few surviving tangible links to Laredito, San Antonio's historically Mexican west-side neighborhood. Interpreting adobe construction, family work, foodways and Tejano civic life is more useful than presenting the house as an isolated politician's residence."
    ],
    "sources": [
      {
        "label": "THC — Casa Navarro state historic site, admissions and hours",
        "url": "https://thc.texas.gov/historic-sites/casa-navarro",
        "scope": "Official Tuesday–Sunday hours, 228 S. Laredo St. arrival address, ticket tiers and original 1850s Tejano adobe home."
      },
      {
        "label": "THC — Casa Navarro self-guided and group visit planner",
        "url": "https://thc.texas.gov/state-historic-sites/casa-navarro/plan-your-visit-casa-navarro",
        "scope": "One-hour walk-in self-guided visit, school programs, two-week group reservation request, parking across the street and Laredito interpretation."
      }
    ],
    "itineraries": [
      {
        "label": "Navarro's house and Laredito",
        "duration": "About one hour",
        "steps": [
          "Park in the designated lot across the street and enter the original Navarro property for the self-guided experience.",
          "Study the adobe and limestone buildings as evidence of 1850s Tejano domestic life and construction.",
          "Follow Navarro's role in 1836 independence and later advocacy for Tejano rights, not just the home's furnishings."
        ]
      },
      {
        "label": "Tejano family and community history",
        "duration": "Unhurried visit",
        "steps": [
          "Read interpretation of the historically Mexican Laredito neighborhood and how urban renewal altered the surrounding district.",
          "Compare the family rooms and foodways with the merchant and ranching work that supported the household.",
          "School programs and special hands-on adobe workshops require advance arrangements; a regular walk-in ticket does not include every activity."
        ]
      },
      {
        "label": "Old San Antonio context",
        "duration": "Half-day or longer",
        "steps": [
          "Start with Navarro's house to establish a Tejano interpretation of early San Antonio.",
          "Continue separately to the Spanish Governor's Palace and San Fernando Cathedral if each operating authority permits access.",
          "Use Market Square for the changing neighborhood context; do not confuse contemporary retail with the footprint of the vanished Laredito community."
        ]
      }
    ],
    "visitorFaqs": [
      {
        "question": "Do I need a tour reservation for Casa Navarro?",
        "answer": "Ordinary one-hour self-guided public visits are walk-in; specialized school or adult group experiences should be requested about two weeks ahead.",
        "sourceUrl": "https://thc.texas.gov/state-historic-sites/casa-navarro/plan-your-visit-casa-navarro"
      }
    ]
  },
  "sabine-pass-battleground": {
    "entryNote": "THC lists Wednesday–Sunday 8 a.m.–5 p.m., $5 per vehicle. A self-guided battleground interpretation takes 30–60 minutes. There are restrooms and parking but NO visitor center; five first-come, first-served RV electric sites are a separate overnight arrangement.",
    "accessibilityNotes": "THC says the memorial, outdoor interpretation and other public areas are wheelchair accessible. Restrooms and shaded picnic areas are available; keep off monuments and historic ammunition magazines. Waterfront weather and heat can affect visits.",
    "history": [
      "On September 8, 1863, Confederate Lt. Richard 'Dick' Dowling and his small artillery crew at Fort Griffin repelled a Union naval assault at Sabine Pass. The surviving battleground setting, the river's narrow approach and a scaled fort model help explain why gun placement and shipping channels shaped the engagement.",
      "This was a Civil War fight over naval access, rail links and Confederate cotton-and-supply routes, not a story detached from slavery or Union blockade strategy. Interpretive works include the Dowling memorial, a monument to Union casualties and a recovered USS Clifton walking-beam artifact; the present waterfront has changed from the 1863 battlefield."
    ],
    "sources": [
      {
        "label": "THC — Sabine Pass Battleground, current access and admissions",
        "url": "https://thc.texas.gov/historic-sites/sabine-pass-battleground",
        "scope": "Wednesday–Sunday 8 a.m.–5 p.m., $5-per-vehicle entry, battleground background and five RV electric sites."
      },
      {
        "label": "THC — Sabine Pass walking tour, accessibility and amenities",
        "url": "https://thc.texas.gov/state-historic-sites/sabine-pass-battleground/plan-your-visit-sabine-pass-battleground",
        "scope": "Thirty- to sixty-minute self-guided route, cell-phone tour, accessible grounds, restrooms, no visitor center and fishing rules."
      },
      {
        "label": "THC — Sabine Pass Battleground 1863 historical context",
        "url": "https://thc.texas.gov/state-historic-sites/sabine-pass-battleground/sabine-pass-battleground-history",
        "scope": "September 1863 Union naval advance, Confederate fort artillery, waterfront supply strategy and broader Civil War chronology."
      },
      {
        "label": "THC — Sabine Pass RV campground operating terms",
        "url": "https://thc.texas.gov/state-historic-sites/sabine-pass-battleground/sabine-pass-battleground-campground",
        "scope": "Five first-come, first-served 50-amp RV spaces and separate overnight access; not an automatic campground reservation."
      }
    ],
    "itineraries": [
      {
        "label": "Understand the 1863 waterfront battle",
        "duration": "30–60 minutes",
        "steps": [
          "Start at the interpretive pavilion to orient to the Confederate Fort Griffin location and its scaled model.",
          "Follow the Dowling and Union-casualty memorials while comparing the 1863 naval passage to the riverfront today.",
          "Use the site's cell-phone interpretation as offered; there is no visitor-center desk or museum interior to expect."
        ]
      },
      {
        "label": "Explore the fort, ships and shoreline",
        "duration": "One to two hours",
        "steps": [
          "Study the historical signs and USS Clifton walking-beam artifact to understand the waterborne engagement.",
          "Compare the Confederate fort artillery with the Union ships and transport soldiers' planned landing.",
          "Respect marked preservation zones and waterfront hazards. Fishing requires adherence to Texas licensing rules."
        ]
      },
      {
        "label": "Civil War on the upper Gulf Coast",
        "duration": "Half-day or longer",
        "steps": [
          "Visit the Sabine Pass battleground during its posted Wednesday–Sunday open period.",
          "Continue to other independently accessible Port Arthur heritage sites only after checking current hours and transportation needs.",
          "If planning overnight RV use, call the THC site: its five 50-amp places are first-come, first-served and not guaranteed with day admission."
        ]
      }
    ],
    "visitorFaqs": [
      {
        "question": "Is the Sabine Pass Battleground an indoor museum?",
        "answer": "No. THC describes an outdoor memorial and interpretive site with a model, cell-phone tour, parking and restrooms, but no visitor center or gift shop.",
        "sourceUrl": "https://thc.texas.gov/state-historic-sites/sabine-pass-battleground/plan-your-visit-sabine-pass-battleground"
      }
    ]
  },
  "zaragoza-birthplace": {
    "entryNote": "THC lists Zaragoza Birthplace at 217 Loop 71, Goliad, open daily 10 a.m.–5 p.m. with last admission at 4:30 p.m.; paid tickets are separate from the adjoining Presidio La Bahía visitor program unless the operator confirms a package.",
    "accessibilityNotes": "This birthplace interpretive space is associated with the historic Presidio La Bahía landscape; confirm interior thresholds, steps and wheelchair routes with THC staff before traveling rather than assuming all old structures are accessible.",
    "history": [
      "Ignacio Zaragoza was born in 1829 near the presidio at Goliad, long before his career as a Mexican general. The interpretation places his childhood in the borderlands under Mexican Texas before the 1836 Revolution and the redrawing of political borders.",
      "As commander in Puebla on May 5, 1862, Zaragoza led Mexican forces against a French army. Cinco de Mayo commemorates this victory; it is not Mexico's Independence Day. This distinction matters when interpreting the significance of a Texas birthplace to Mexican national history."
    ],
    "sources": [
      {
        "label": "THC — Zaragoza Birthplace, operator hours and admission",
        "url": "https://thc.texas.gov/historic-sites/zaragoza-birthplace",
        "scope": "217 Loop 71 address, daily 10 a.m.–5 p.m. hours, last admission 4:30 p.m., paid entry and significance of the Battle of Puebla."
      },
      {
        "label": "THC — Presidio La Bahía separate visitor programs",
        "url": "https://thc.texas.gov/state-historic-sites/presidio-la-bahia/plan-your-visit-presidio-la-bahia",
        "scope": "Neighboring presidio's distinct self-guided and scheduled programs, their own ticketing/group reservations and Goliad campaign history."
      }
    ],
    "itineraries": [
      {
        "label": "Zaragoza in two countries' history",
        "duration": "Short visit",
        "steps": [
          "Start at the birthplace interpretive exhibits at 217 Loop 71 within the THC's posted admission period.",
          "Connect the 1829 Goliad birth to his later Mexican military service and 1862 Battle of Puebla.",
          "Explain why Cinco de Mayo commemorates Puebla, not the date of Mexican independence."
        ]
      },
      {
        "label": "The birthplace and presidio",
        "duration": "One to two hours or longer",
        "steps": [
          "Visit the Zaragoza interpretation, distinguishing a reconstructed or curated birthplace display from the broader military presidio complex.",
          "Tour Presidio La Bahía under its own currently published admission and exhibit terms.",
          "Compare Zaragoza's Mexican national story with the different 1836 military history interpreted in the presidio chapel and barracks."
        ]
      },
      {
        "label": "Goliad across colonial and revolutionary periods",
        "duration": "Half-day or full day",
        "steps": [
          "Pair Zaragoza Birthplace and separately operated Presidio La Bahía according to actual admission and last-entry times.",
          "Add Mission Espíritu Santo at Goliad State Park if the park is open and separate fees/tickets permit.",
          "For a further regional route, include Coleto Creek/Fannin Battleground, allowing extra driving and an outdoor-focused visit."
        ]
      }
    ],
    "visitorFaqs": [
      {
        "question": "What does Cinco de Mayo commemorate?",
        "answer": "It commemorates Mexican forces defeating a French army at Puebla on May 5, 1862, led by Goliad-born Gen. Ignacio Zaragoza. It is not Mexico's independence anniversary.",
        "sourceUrl": "https://thc.texas.gov/historic-sites/zaragoza-birthplace"
      }
    ]
  },
  "palmito-ranch-battlefield": {
    "entryNote": "THC says Palmito Ranch Battlefield opened for public interpretation after its April 25, 2026 Park Day improvements, but there are STILL no visitor services or facilities. Look for signs and two U.S. Fish and Wildlife Service viewing platforms on/near Boca Chica Highway (TX 4); confirm gate access and local road conditions before going.",
    "accessibilityNotes": "A dispersed outdoor battlefield with no on-site public restroom, visitor center, food, water or staffed counter according to THC. Viewing platforms are separate federal refuge facilities; the operator does not promise continuous accessible paths. Use roadside stops legally and verify conditions.",
    "history": [
      "The Battle of Palmito Ranch took place May 12–13, 1865, along the lower Rio Grande east of Brownsville, more than a month after Robert E. Lee's surrender at Appomattox. Confederate forces pushed Union troops back in this last land battle of the Civil War; a local victory did not reverse the impending Confederate defeat.",
      "This is a dispersed borderlands battlefield, not an intact fort or visitor museum. Current interpretation includes panels, highway historical markers, two wildlife-refuge viewing platforms, and a 1610 AM radio presentation. The broader story includes contested military posts, cotton trade across the international boundary and the later preservation of the battlefield."
    ],
    "sources": [
      {
        "label": "THC — Palmito Ranch Battlefield site and viewing locations",
        "url": "https://thc.texas.gov/historic-sites/palmito-ranch-battlefield",
        "scope": "43296 Palmito Hill Road, 1865 battlefield, interpretive panels, two USFWS viewpoints, radio 1610 AM and explicit lack of visitor facilities."
      },
      {
        "label": "THC — Texas Civil War preservation and April 2026 opening",
        "url": "https://thc.texas.gov/learn/military-history/texas-civil-war",
        "scope": "Official record that new Palmito Ranch State Historic Site interpretation opened to the public in April 2026 with more work forthcoming."
      },
      {
        "label": "THC — Palmito Ranch Battlefield operational and campaign history",
        "url": "https://thc.texas.gov/state-historic-sites/palmito-ranch-battlefield/palmito-ranch-battlefield-history",
        "scope": "May 12–13, 1865 fighting, Union and Confederate forces, trans-Mississippi campaign timeline and casualties."
      }
    ],
    "itineraries": [
      {
        "label": "Read the 1865 battlefield landscape",
        "duration": "Short outdoor interpretation",
        "steps": [
          "Confirm current access to the state site's interpretive panels at 43296 Palmito Hill Road; the April 2026 public opening did not add visitor-center services.",
          "Use public signage to distinguish the May 12–13, 1865 battlefield from nearby refuge viewpoints.",
          "Bring water, sun protection and a current route plan. Do not assume restrooms, staffed hours or a ticket desk."
        ]
      },
      {
        "label": "Compare the Rio Grande battle positions",
        "duration": "One to two hours, allowing driving",
        "steps": [
          "Visit the USFWS viewpoint near Palmito Hill Road and Boca Chica Highway (TX 4) when accessible.",
          "Use the additional viewing platform about one mile east and compare the battle's river corridor and surrounding terrain.",
          "Use 1610 AM interpretation where reception works; respect roadway stopping rules and posted wildlife refuge access."
        ]
      },
      {
        "label": "Two different South Texas wars",
        "duration": "Half-day or separate-day itinerary",
        "steps": [
          "Interpret Palmito Ranch as an 1865 Civil War engagement after Appomattox; do not call the site an indoor museum.",
          "Continue to NPS Palo Alto Battlefield for the separate 1846 U.S.–Mexico War story, allowing substantial driving time.",
          "If desired, add a Brownsville museum with verified public hours; do not assume the state archaeological site has visitor services."
        ]
      }
    ],
    "visitorFaqs": [
      {
        "question": "Is Palmito Ranch Battlefield open, and does it have restrooms?",
        "answer": "THC says the new state interpretation opened in April 2026 but separately states there are currently no public services or facilities. Confirm gate and refuge-road access before traveling.",
        "sourceUrl": "https://thc.texas.gov/learn/military-history/texas-civil-war"
      }
    ]
  }
};
export const verifiedBorderlandsBattlegroundSlugs = Object.keys(RESEARCH);

export function enrichHistoricBorderlandsBattlefields20261019(destination: Destination): Destination {
  const research = RESEARCH[destination.slug];
  if (!research) return destination;
  const base = destination.authorityGuide;
  const sources = base?.sources || [];
  const authorityGuide = base ? {
    ...base,
    itineraries: research.itineraries,
    sources: [...sources, ...research.sources.filter((newSource) => !sources.some((oldSource) => oldSource.url === newSource.url))],
  } : undefined;
  return {
    ...destination,
    body: [...destination.body, ...research.history].filter((paragraph, index, all) => all.indexOf(paragraph) === index),
    entryNote: research.entryNote,
    accessibilityNotes: research.accessibilityNotes,
    visitorFaqs: [...(destination.visitorFaqs || []), ...research.visitorFaqs.filter((faq) => !(destination.visitorFaqs || []).some((old) => old.question === faq.question))],
    sourceCheckedAt: "2026-10-19",
    ...(authorityGuide ? { authorityGuide } : {}),
  };
}
