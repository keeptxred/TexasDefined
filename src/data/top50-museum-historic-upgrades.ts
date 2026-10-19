import type { Destination, DestinationAuthorityGuide, DestinationAuthoritySource, DestinationItinerary } from "./types";

/** Six individually researched Top-50 canonical museum/historic destination dossiers.
 * Facts checked against named NPS, museum and foundation sources 2026-10-18.
 * Does not alter existing hero/gallery provenance, daily ticket inventory or full-page review date.
 */
type MuseumUpgrade = Omit<DestinationAuthorityGuide, "itineraries" | "sources"> & {
  itineraries: Array<{ label: string; duration: string; steps: string[] }>;
  sources: DestinationAuthoritySource[];
  visitorFaqs: Array<{ question: string; answer: string; sourceUrl: string }>;
};
const DETAILS: Record<string, MuseumUpgrade> = {
  "uss-lexington-museum-corpus-christi": {
    "whyItMatters": "USS Lexington is not an ordinary static military exhibit: visitors walk an Essex-class aircraft carrier with decks, hangar spaces and onboard equipment preserved in Corpus Christi. The ship's World War II service and later training-carrier life make it possible to connect sea power and naval aviation to real scale, while its ladders, deck heights and weather-exposed sections determine how much of a tour different visitors can physically enjoy.",
    "assessment": {
      "recommendedVisit": "3–4 hours for key hangar and flight decks; longer for shipboard exhibits",
      "physicalEffort": "Moderate to high",
      "weatherExposure": "Mixed indoor/outdoor",
      "planningLevel": "Moderate",
      "familyFit": "Best for children able to navigate crowds, elevated decks and some steep stairs; the more accessible hangar/flight-deck loop supports shorter family visits.",
      "firstTimeValue": "A rare chance to enter and interpret an actual aircraft carrier in the Gulf Coast."
    },
    "itineraries": [
      {
        "label": "Carrier essentials",
        "duration": "2 hours",
        "steps": [
          "Start with orientation and the hangar deck",
          "Inspect the aircraft displayed on the flight deck",
          "Choose an accessible onboard section based on the current museum map"
        ]
      },
      {
        "label": "Read the ship",
        "duration": "Half day",
        "steps": [
          "Study Lexington's World War II and training history",
          "Visit supported onboard trails through service and crew spaces",
          "Take a slower look at shipboard aircraft and the Corpus Christi waterfront"
        ]
      },
      {
        "label": "North Beach maritime day",
        "duration": "Full day",
        "steps": [
          "Give USS Lexington a dedicated morning",
          "Break for lunch away from the ship or at its operating cafe",
          "Visit the separately ticketed Texas State Aquarium if hours allow"
        ]
      }
    ],
    "sources": [
      {
        "label": "USS Lexington Museum operator and visitor information",
        "url": "https://www.usslexington.com/",
        "scope": "Current admission, access, tour zones and management policies."
      }
    ],
    "visitorFaqs": [
      {
        "question": "Is USS Lexington a battleship?",
        "answer": "No. USS Lexington (CV-16) is an Essex-class aircraft carrier, a different kind of naval ship from Battleship Texas; plan for aviation and carrier history.",
        "sourceUrl": "https://www.usslexington.com/"
      },
      {
        "question": "Can visitors with limited mobility explore every deck?",
        "answer": "No. The museum describes elevator access to its hangar and flight decks, while some original ship spaces have ladders and narrow passageways. Ask the museum about the specific tour route before arrival.",
        "sourceUrl": "https://www.usslexington.com/"
      },
      {
        "question": "Is the Texas State Aquarium included in Lexington admission?",
        "answer": "No. The ship museum and Texas State Aquarium are distinct attractions on Corpus Christi's North Beach with separate tickets and operating schedules.",
        "sourceUrl": "https://www.usslexington.com/"
      }
    ]
  },
  "waco-mammoth-national-monument": {
    "whyItMatters": "Waco Mammoth preserves Columbian mammoth remains in their original Ice Age bone bed rather than transporting all fossils into a conventional gallery. The suspended walkway and protected dig shelter reveal how scientists interpret group fossil deposits, while the site story ties Waco to broader Pleistocene ecology. The park grounds are free, but reaching the actual fossil shelter is a separate, staff-led experience.",
    "assessment": {
      "recommendedVisit": "60–90 minutes for guided fossil shelter access; more with park trails and interpretation",
      "physicalEffort": "Low to moderate",
      "weatherExposure": "Mixed indoor/outdoor",
      "planningLevel": "Low",
      "familyFit": "Excellent for school-age children who enjoy fossil science, provided they can stay with a guided group and respect the protected dig surface.",
      "firstTimeValue": "One of the clearest places in Texas to see mammoth fossils in the ground."
    },
    "itineraries": [
      {
        "label": "Fossils first",
        "duration": "1 hour",
        "steps": [
          "Begin at the Welcome Center and obtain a Dig Shelter ticket",
          "Join the next available guided tour",
          "View the in-situ mammoth remains from the suspended walkway"
        ]
      },
      {
        "label": "Family paleontology morning",
        "duration": "2 hours",
        "steps": [
          "Start with the guided Dig Shelter experience",
          "Ask staff about fossil interpretation and accessible routes",
          "Use the park's outdoor interpretive area before lunch"
        ]
      },
      {
        "label": "Waco science weekend",
        "duration": "2 days",
        "steps": [
          "Give the mammoth monument a guided daytime visit",
          "Explore a separate Baylor or downtown Waco museum",
          "Use another day for the riverfront or historical stops"
        ]
      }
    ],
    "sources": [
      {
        "label": "NPS Waco Mammoth — fees and pass exceptions",
        "url": "https://www.nps.gov/waco/planyourvisit/fees.htm",
        "scope": "Free grounds versus paid shelter, pass exclusions and 2027 fee change."
      },
      {
        "label": "NPS Waco Mammoth — guided tours",
        "url": "https://www.nps.gov/waco/planyourvisit/index.htm",
        "scope": "Guided visit format, start point and approximate duration."
      },
      {
        "label": "NPS Waco Mammoth — fossil shelter",
        "url": "https://www.nps.gov/places/waco-mammoth-nm-dig-shelter.htm",
        "scope": "Original-location fossil preservation, dig shelter significance and scientific history."
      }
    ],
    "visitorFaqs": [
      {
        "question": "Is Waco Mammoth National Monument free?",
        "answer": "The park grounds are free, but the fossil-containing Dig Shelter requires a separate paid access ticket. National park passes do not waive the shelter fee.",
        "sourceUrl": "https://www.nps.gov/waco/planyourvisit/fees.htm"
      },
      {
        "question": "Can visitors explore the fossil shelter without a guide?",
        "answer": "No. NPS says access to the Dig Shelter is by a staff-led guided tour, beginning at the Welcome Center. Regular tours run on a schedule, with no general advance reservation required.",
        "sourceUrl": "https://www.nps.gov/waco/planyourvisit/index.htm"
      },
      {
        "question": "Is the Dig Shelter accessible by wheelchair?",
        "answer": "Yes. NPS describes a roughly 300-yard accessible paved route from the Welcome Center and loaner wheelchairs, with an elevated viewing route inside the shelter.",
        "sourceUrl": "https://www.nps.gov/waco/planyourvisit/hours.htm"
      }
    ]
  },
  "national-museum-pacific-war": {
    "whyItMatters": "The National Museum of the Pacific War in Fredericksburg links Admiral Chester W. Nimitz's Texas roots to the wider Pacific theater of World War II. A meaningful visit spans multiple interpretive spaces, not just one building: the George H.W. Bush Gallery, Admiral Nimitz Gallery, Pacific Combat Zone and freely accessible remembrance spaces have different schedules and ticket rules. Visitors need to make a conscious choice between a focused gallery visit and a full campus study day.",
    "assessment": {
      "recommendedVisit": "4–6 hours for the major galleries; reserve a full day for deeper interpretation",
      "physicalEffort": "Moderate",
      "weatherExposure": "Mixed indoor/outdoor",
      "planningLevel": "Moderate",
      "familyFit": "Strong for older children and adults interested in WWII history; the subject matter and length may require a shorter route for younger visitors.",
      "firstTimeValue": "A major American World War II museum tied directly to a Texas-born naval leader."
    },
    "itineraries": [
      {
        "label": "Nimitz and the Pacific",
        "duration": "2–3 hours",
        "steps": [
          "Start in the Admiral Nimitz Gallery",
          "Continue to high-priority George H.W. Bush Gallery exhibits",
          "Finish with the Memorial Courtyard and Japanese Garden of Peace"
        ]
      },
      {
        "label": "Full Pacific War study day",
        "duration": "5–6 hours",
        "steps": [
          "Begin early with the galleries and the theater-wide timeline",
          "See Pacific Combat Zone before its earlier closing time",
          "Visit the free commemorative gardens and courtyard"
        ]
      },
      {
        "label": "Fredericksburg history weekend",
        "duration": "2 days",
        "steps": [
          "Allow a dedicated museum day instead of treating it as a brief Main Street stop",
          "Explore the city's separate German-settlement heritage next",
          "Visit another Hill Country heritage stop on a different day"
        ]
      }
    ],
    "sources": [
      {
        "label": "National Museum of the Pacific War — admissions",
        "url": "https://www.pacificwarmuseum.org/purchase-tickets",
        "scope": "Included museum venues and separately ticketed immersive experience."
      },
      {
        "label": "National Museum of the Pacific War — current visitor plan",
        "url": "https://www.pacificwarmuseum.org/visit",
        "scope": "Gallery operating hours and Pacific Combat Zone early closing."
      },
      {
        "label": "National Museum of the Pacific War — Japanese Garden of Peace",
        "url": "https://www.pacificwarmuseum.org/visit/exhibits/japanese-garden-of-peace",
        "scope": "The garden's postwar reconciliation history and public interpretation."
      }
    ],
    "visitorFaqs": [
      {
        "question": "Does general admission include every museum experience?",
        "answer": "The museum lists its major galleries and Pacific Combat Zone under general admission, but its immersive 'The Rescue' experience requires a separate add-on ticket.",
        "sourceUrl": "https://www.pacificwarmuseum.org/purchase-tickets"
      },
      {
        "question": "Does the Pacific Combat Zone close earlier than the other galleries?",
        "answer": "Yes. The museum's current visitor information says the Pacific Combat Zone closes at 3 p.m., while general museum hours extend later. Prioritize that section earlier.",
        "sourceUrl": "https://www.pacificwarmuseum.org/visit"
      },
      {
        "question": "Can visitors enter the Japanese Garden of Peace without a paid ticket?",
        "answer": "Yes. The museum states that the Japanese Garden of Peace and Memorial Courtyard are free to visit, separate from the paid main-gallery experience.",
        "sourceUrl": "https://www.pacificwarmuseum.org/visit/ticket-prices"
      }
    ]
  },
  "museum-of-fine-arts-houston": {
    "whyItMatters": "The Museum of Fine Arts, Houston spans several major gallery buildings in the Museum District, so a productive first visit depends on choosing a collection and route rather than trying to see everything. The Kinder Building, Beck Building and Law Building serve distinct display programs on the main campus, while separately located house museums expand the institution beyond a single address. Admission policies also distinguish permanent-collection access from special exhibitions.",
    "assessment": {
      "recommendedVisit": "2–3 hours for selected galleries; 4–6 hours for a museum-focused day",
      "physicalEffort": "Low to moderate",
      "weatherExposure": "Mostly indoors",
      "planningLevel": "Moderate",
      "familyFit": "Excellent for art-interested families when the visit targets a manageable group of galleries; children's admission and sensory resources can help.",
      "firstTimeValue": "One of Texas's leading multi-building art institutions with flexible free-collection opportunities."
    },
    "itineraries": [
      {
        "label": "First-time highlights",
        "duration": "2 hours",
        "steps": [
          "Choose one campus building and several collection galleries",
          "Leave time for a second distinct art period if nearby",
          "Finish with public art or grounds rather than rushing every building"
        ]
      },
      {
        "label": "Art and architecture day",
        "duration": "Half day",
        "steps": [
          "Start in one permanent-collection building",
          "Compare a different collection or exhibition in another campus building",
          "Use the campus map for museum-to-museum transitions and a break"
        ]
      },
      {
        "label": "Houston Museum District visit",
        "duration": "Full day",
        "steps": [
          "Start at MFAH during its verified admission hours",
          "Visit a separately ticketed neighboring museum after lunch",
          "Return for a late museum gallery if the current schedule permits"
        ]
      }
    ],
    "sources": [
      {
        "label": "MFAH — admission exceptions and Thursday policy",
        "url": "https://www.mfah.org/visit/admission-information",
        "scope": "Free permanent-collection Thursdays and separately ticketed exhibitions."
      },
      {
        "label": "MFAH — museum campus and visitor planning",
        "url": "https://www.mfah.org/visit",
        "scope": "Main gallery buildings, campus access and operating programs."
      },
      {
        "label": "MFAH — accessibility and sensory resources",
        "url": "https://www.mfah.org/visit/accessibility-resources/",
        "scope": "Museum quiet-period guidance, resources and requests."
      }
    ],
    "visitorFaqs": [
      {
        "question": "Are permanent collections free at MFAH on Thursdays?",
        "answer": "Yes. MFAH states that permanent-collection admission is free for everyone on Thursdays; special exhibitions may require a separately priced All Access ticket.",
        "sourceUrl": "https://www.mfah.org/visit/admission-information"
      },
      {
        "question": "Is MFAH one museum building?",
        "answer": "No. Its main Sarofim Campus includes the Beck, Law and Kinder Buildings. The institution also operates separate house museums, so check the exact collection's building and hours.",
        "sourceUrl": "https://www.mfah.org/visit"
      },
      {
        "question": "Does MFAH offer resources for visitors with sensory needs?",
        "answer": "Yes. MFAH describes quiet visiting windows and sensory processing kits at its Beck and Kinder Building coat checks. Check availability and accommodations before arriving.",
        "sourceUrl": "https://www.mfah.org/visit/accessibility-resources/"
      }
    ]
  },
  "kimbell-art-museum-fort-worth": {
    "whyItMatters": "The Kimbell Art Museum offers a rare combination of internationally significant art and major twentieth-century museum architecture, with Louis Kahn's original building and Renzo Piano's later pavilion shaping how people encounter the collection. It is a different visit from the larger Fort Worth Museum District generally: Kimbell's permanent collection is unusually approachable in a few hours, and its pricing deliberately separates free collection access from special exhibitions.",
    "assessment": {
      "recommendedVisit": "90 minutes to 3 hours for the permanent collection; more with a special exhibition",
      "physicalEffort": "Low",
      "weatherExposure": "Mostly indoors",
      "planningLevel": "Low to moderate",
      "familyFit": "Well suited to art-curious families and short cultural outings, with manageable gallery scale and clear free-admission options.",
      "firstTimeValue": "A standout Fort Worth architecture-and-art destination that can be worthwhile even on a modest budget."
    },
    "itineraries": [
      {
        "label": "Free collection introduction",
        "duration": "90 minutes",
        "steps": [
          "Enter during regular museum hours for the permanent collection",
          "Explore a selected series of galleries rather than everything",
          "Look at Kahn's building and grounds as part of the visit"
        ]
      },
      {
        "label": "Art and architecture",
        "duration": "Half day",
        "steps": [
          "Begin in the Kahn Building",
          "Compare the Renzo Piano Pavilion architecture",
          "Add a ticketed exhibition only if personally interesting and available"
        ]
      },
      {
        "label": "Fort Worth cultural district day",
        "duration": "Full day",
        "steps": [
          "Visit the Kimbell permanent collection",
          "Walk to another distinct Cultural District museum with its own rules",
          "Leave time for lunch and the district's outdoor spaces"
        ]
      }
    ],
    "sources": [
      {
        "label": "Kimbell Art Museum — official admission, hours and parking",
        "url": "https://kimbellart.org/visit",
        "scope": "Permanent collection is free, special exhibits paid, parking and gallery photography rules."
      }
    ],
    "visitorFaqs": [
      {
        "question": "Is Kimbell Art Museum admission free?",
        "answer": "Admission to the Kimbell's permanent collection is free for all visitors. The museum charges separately for many special exhibitions, so check the admission category before purchasing.",
        "sourceUrl": "https://kimbellart.org/visit"
      },
      {
        "question": "Can visitors park at the Kimbell without paying?",
        "answer": "Yes. The museum's official visit page lists free parking at its underground garage, Kahn Building parking and Kimbell East lot, subject to space availability.",
        "sourceUrl": "https://kimbellart.org/visit"
      },
      {
        "question": "May visitors photograph artworks?",
        "answer": "The museum generally permits non-flash, noncommercial gallery photography unless restricted near particular works; equipment such as tripods and selfie sticks is not allowed.",
        "sourceUrl": "https://kimbellart.org/visit"
      }
    ]
  },
  "strand-historic-district": {
    "whyItMatters": "Galveston's Strand is a downtown historic district rather than an enclosed museum. Its commercial buildings tell the story of nineteenth-century port wealth, trade, disaster and preservation, with public streets acting as the first level of interpretation. The best visit pays attention to the facades and original street pattern while distinguishing free public walking from privately operated shops, museums and ticketed preservation tours.",
    "assessment": {
      "recommendedVisit": "90 minutes to 3 hours on public streets; half day with museums or a tour",
      "physicalEffort": "Low to moderate",
      "weatherExposure": "Mostly outdoors",
      "planningLevel": "Low",
      "familyFit": "Good for family walks and historic-building spotting, but narrow sidewalks, seasonal crowds and humid weather may require a short route.",
      "firstTimeValue": "A practical introduction to Galveston's port-era architecture and preservation story."
    },
    "itineraries": [
      {
        "label": "Historic walking loop",
        "duration": "90 minutes",
        "steps": [
          "Start near the preserved commercial blocks of the Strand",
          "Compare different 19th-century building facades and public markers",
          "Pause at a public square or museum entrance for historical context"
        ]
      },
      {
        "label": "Architecture and preservation",
        "duration": "Half day",
        "steps": [
          "Follow a printed or professionally led architecture walk",
          "Visit one open historic-building interior that offers public access",
          "Compare the waterfront's former industrial role with today's visitor district"
        ]
      },
      {
        "label": "Galveston heritage weekend",
        "duration": "2 days",
        "steps": [
          "Spend a morning exploring the Strand on foot",
          "Visit an independent maritime or residential historic property",
          "Use the next day for beachfront or island recreation rather than cramming both together"
        ]
      }
    ],
    "sources": [
      {
        "label": "Galveston Historical Foundation — public historic preservation",
        "url": "https://www.galvestonhistory.org/",
        "scope": "Foundation background and public historic resources."
      },
      {
        "label": "Galveston Historical Foundation — guided history calendar",
        "url": "https://www.galvestonhistory.org/calendar",
        "scope": "Current tour availability; booked tours are separate from free district walking."
      }
    ],
    "visitorFaqs": [
      {
        "question": "Do visitors need tickets just to walk through the Strand Historic District?",
        "answer": "No. The Strand is a network of public downtown streets. Admission may be charged separately for guided tours, museums, events and privately operated interiors.",
        "sourceUrl": "https://www.galvestonhistory.org/"
      },
      {
        "question": "Can I book a guided history or architecture walk?",
        "answer": "Yes. Galveston Historical Foundation operates ticketed downtown history and architecture walking tours on selected dates. Verify the available departure and route before arriving.",
        "sourceUrl": "https://www.galvestonhistory.org/calendar"
      },
      {
        "question": "Is the Strand only about shopping?",
        "answer": "No. The historic commercial blocks are part of Galveston's port and preservation history. A self-guided visitor can study architecture and public interpretation even without entering shops.",
        "sourceUrl": "https://www.galvestonhistory.org/event/saint-arnolds-walking-tours/2026-12-04"
      }
    ]
  }
};
const INCLUDED = new Set(Object.keys(DETAILS));
export function isTop50MuseumHistoricUpgrade(slug: string): boolean { return INCLUDED.has(slug); }

export function applyTop50MuseumHistoricUpgrade(destination: Destination): Destination {
  const update = DETAILS[destination.slug];
  if (!update) return destination;
  const sourceMap = new Map<string, DestinationAuthoritySource>();
  for (const source of [...(destination.authorityGuide?.sources ?? []), ...update.sources]) {
    sourceMap.set(source.url.replace(/\/$/, ""), source);
  }
  const questionMap = new Map<string, { question: string; answer: string; sourceUrl?: string }>();
  for (const faq of [...(destination.visitorFaqs ?? []), ...update.visitorFaqs]) {
    questionMap.set(faq.question.trim().toLowerCase(), faq);
  }
  const guide: DestinationAuthorityGuide = {
    whyItMatters: update.whyItMatters,
    assessment: update.assessment,
    itineraries: update.itineraries.map((plan) => ({
      ...plan,
      steps: plan.steps as [string, ...string[]],
    })) as [DestinationItinerary, DestinationItinerary, DestinationItinerary],
    sources: [...sourceMap.values()],
  };
  return { ...destination, authorityGuide: guide, visitorFaqs: [...questionMap.values()] };
}
