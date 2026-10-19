import type { Destination, DestinationAuthorityGuide, DestinationAuthoritySource } from "./types";

/** Source-backed editorial planning depth for existing canonical Top-50 pages.
 * This does not mark these pages as fully certified; photo rights, two-way links,
 * current admission and responsive live review have separate acceptance gates.
 * Preserve the earlier source-checked date unless the operator was actually reverified.
 */
export { TOP50_AUTHORITY_WAVE1_SLUGS, isTop50AuthorityWave1 } from "./top50-authority-wave1-slugs";
import { isTop50AuthorityWave1 } from "./top50-authority-wave1-slugs";
import type { Top50AuthorityWave1Slug } from "./top50-authority-wave1-slugs";

const GUIDES: Record<Top50AuthorityWave1Slug, DestinationAuthorityGuide> = {
  "dinosaur-valley-state-park": {
    "whyItMatters": "Dinosaur Valley is an unusually direct encounter with deep Texas history: ancient tracks remain in the Paluxy River bed rather than behind glass. The interpretive challenge is part of the visitor experience—tracks become visible or inaccessible as water levels, erosion and weather change. A rewarding visit balances track-site conditions against the wooded and limestone-ridge trails above the river.",
    "assessment": {
      "recommendedVisit": "Half day for tracks and interpretation; full day with hiking",
      "physicalEffort": "Moderate",
      "weatherExposure": "Fully outdoors",
      "planningLevel": "High",
      "familyFit": "Excellent for curious school-age children, but river crossings and limestone ledges can be slippery, steep or inaccessible.",
      "firstTimeValue": "One of Texas's most distinctive geology and paleontology experiences."
    },
    "itineraries": [
      {
        "label": "Track-focused morning",
        "duration": "2–3 hours",
        "steps": [
          "Confirm track visibility and trail alerts with TPWD before leaving",
          "Stop at headquarters and accessible replica tracks",
          "Visit an open riverside track site only if water conditions permit"
        ]
      },
      {
        "label": "Hike-and-track day",
        "duration": "4–6 hours",
        "steps": [
          "Start early at a designated river track site",
          "Choose a signed trail from the official map",
          "Finish with the interpretive center and park geology"
        ]
      },
      {
        "label": "Glen Rose weekend",
        "duration": "2 days",
        "steps": [
          "Spend the first morning at Dinosaur Valley",
          "Explore trails or picnic areas around peak afternoon heat",
          "Pair a second day with a separately ticketed Glen Rose-area experience"
        ]
      }
    ],
    "sources": [
      {
        "label": "Texas Parks and Wildlife — current park information",
        "url": "https://tpwd.texas.gov/state-parks/dinosaur-valley",
        "scope": "Official fees, entry, current alerts, maps and trail/track visibility."
      },
      {
        "label": "Texas Parks and Wildlife — track mapping",
        "url": "https://tpwd.texas.gov/state-parks/dinosaur-valley/dino-tracks/",
        "scope": "Named track locations, documented erosion and closed track sections."
      },
      {
        "label": "Texas Parks and Wildlife — accessibility",
        "url": "https://tpwd.texas.gov/state-parks/dinosaur-valley/fees-facilities/accessibility",
        "scope": "Terrain, river crossings, track-chair access and accessible replica options."
      }
    ]
  },
  "garner-state-park": {
    "whyItMatters": "Garner State Park combines the Frio River's swimming and tubing tradition with Hill Country hiking, camping, cabins and evening dances. It is not one single swimming hole; the best visit depends on whether the group wants an active river day, a hilltop hike, or the social atmosphere of a summer overnight.",
    "assessment": {
      "recommendedVisit": "Full day for river and trails; 2–3 days to enjoy an overnight stay",
      "physicalEffort": "Moderate",
      "weatherExposure": "Fully outdoors",
      "planningLevel": "High",
      "familyFit": "Strong for family river trips with active adult supervision, sun protection and careful judgment about current water conditions.",
      "firstTimeValue": "A classic Texas Hill Country combination of river scenery and multigenerational park tradition."
    },
    "itineraries": [
      {
        "label": "Frio River day",
        "duration": "Half day",
        "steps": [
          "Reserve day entry before departure",
          "Choose a designated river access suitable for your group",
          "Leave time for a shaded picnic and return before the busiest departure period"
        ]
      },
      {
        "label": "Hiking and river",
        "duration": "Full day",
        "steps": [
          "Hike early before the afternoon heat",
          "Take a break and use designated river access when conditions allow",
          "Check whether a scheduled evening dance fits the trip"
        ]
      },
      {
        "label": "Garner weekend",
        "duration": "2 days",
        "steps": [
          "Check in for a reserved campsite or cabin",
          "Split river time and a selected marked hike across two days",
          "Add a Concan-area stop outside the park if timing allows"
        ]
      }
    ],
    "sources": [
      {
        "label": "Texas Parks and Wildlife — Garner State Park",
        "url": "https://tpwd.texas.gov/state-parks/garner",
        "scope": "Official visitor operations, river activities, capacity notices, reservations and park map."
      }
    ]
  },
  "south-padre-island-beaches": {
    "whyItMatters": "South Padre's famous beach is not a single entrance or a uniformly serviced shoreline. Urban public access points, county beach areas, Gulf surf and the Laguna Madre setting reward visitors who decide where to park and which kind of coast they want before arrival. Its open-Gulf surf deserves different safety planning from bayside water.",
    "assessment": {
      "recommendedVisit": "3–5 hours for one beach session; full day with another island stop",
      "physicalEffort": "Low to moderate",
      "weatherExposure": "Fully outdoors",
      "planningLevel": "Moderate",
      "familyFit": "A strong family beach option when an access with appropriate facilities is selected and everyone follows surf and rip-current warnings.",
      "firstTimeValue": "A signature Texas Gulf beach experience near the Rio Grande Valley."
    },
    "itineraries": [
      {
        "label": "Beach morning",
        "duration": "3 hours",
        "steps": [
          "Pick a city or county access point and check parking rules",
          "Review surf flags and weather at the access",
          "Settle into one beach section rather than repeatedly moving the car"
        ]
      },
      {
        "label": "Island day",
        "duration": "Full day",
        "steps": [
          "Start with a cooler morning beach session",
          "Break for lunch or shade in the developed island corridor",
          "Explore a separate bayside or conservation stop only if conditions permit"
        ]
      },
      {
        "label": "Coast and history",
        "duration": "2 days",
        "steps": [
          "Use one day for the Gulf beach",
          "Cross to Port Isabel for independent historical sites",
          "Save a separate block for coastal wildlife or Laguna Madre scenery"
        ]
      }
    ],
    "sources": [
      {
        "label": "City of South Padre Island — beach information",
        "url": "https://www.myspi.org/",
        "scope": "Municipal beach access, safety and visitor rules should be verified from the current city sources."
      }
    ]
  },
  "port-aransas-beach": {
    "whyItMatters": "Port Aransas Beach is a working Texas coastal experience as much as a resort backdrop: visitors encounter beach-driving rules, shore fishing, Gulf surf and a town that still revolves around ferries, boats and the ship channel. It differs sharply from a private beachfront resort, because public shore access and conditions change by stretch.",
    "assessment": {
      "recommendedVisit": "Half day at one beach access; full day with town and nature stops",
      "physicalEffort": "Low to moderate",
      "weatherExposure": "Fully outdoors",
      "planningLevel": "Moderate",
      "familyFit": "Good for families who choose a manageable access and watch surf conditions, beach traffic and the current local permit rules.",
      "firstTimeValue": "A recognizable Mustang Island beach town with direct public Gulf access."
    },
    "itineraries": [
      {
        "label": "Beach-focused visit",
        "duration": "3–4 hours",
        "steps": [
          "Choose a city beach access and check parking permits",
          "Review surf warnings and vehicle lanes",
          "Enjoy beach time without overpacking the schedule"
        ]
      },
      {
        "label": "Port A day",
        "duration": "Full day",
        "steps": [
          "Start on the beach in the cooler morning",
          "Move into town for lunch and harbor views",
          "Use a separate afternoon block for birding or public wetlands"
        ]
      },
      {
        "label": "Coastal Bend weekend",
        "duration": "2 days",
        "steps": [
          "Spend the first day on the Port Aransas shoreline",
          "Add the town's birding or marine-science sites",
          "Continue to Corpus Christi or Mustang Island only as a separate driving segment"
        ]
      }
    ],
    "sources": [
      {
        "label": "City of Port Aransas — official visitor and beach guidance",
        "url": "https://cityofportaransas.org/",
        "scope": "Municipal beach-driving, camping, parking, access and surf-safety rules."
      }
    ]
  },
  "texas-state-aquarium": {
    "whyItMatters": "On the Corpus Christi waterfront, the Texas State Aquarium connects visible marine wildlife with Gulf and Caribbean conservation, animal rescue and coastal ecology. Its location next to North Beach makes it especially useful as the indoor anchor of a coastal trip, but programs and presentations—not just galleries—shape the best visit order.",
    "assessment": {
      "recommendedVisit": "3–5 hours for main exhibits and a presentation; longer for a full waterfront day",
      "physicalEffort": "Low to moderate",
      "weatherExposure": "Mixed indoor/outdoor",
      "planningLevel": "Moderate",
      "familyFit": "Strong for school-age children and multigenerational groups; verify guest-service needs and changing presentations with the aquarium.",
      "firstTimeValue": "A premier Texas introduction to Gulf Coast marine life and conservation."
    },
    "itineraries": [
      {
        "label": "Core aquarium visit",
        "duration": "3 hours",
        "steps": [
          "Check the day's presentation and exhibit schedule",
          "Prioritize Gulf marine habitats and conservation interpretation",
          "Leave room for one educational wildlife presentation"
        ]
      },
      {
        "label": "Family waterfront day",
        "duration": "5–6 hours",
        "steps": [
          "Begin with the aquarium's busiest exhibit priorities",
          "Break for lunch and rest before afternoon programming",
          "Take a short North Beach walk if weather is comfortable"
        ]
      },
      {
        "label": "Corpus Christi museums day",
        "duration": "Full day",
        "steps": [
          "Begin at the aquarium",
          "Visit the USS Lexington separately after confirming its schedule",
          "Finish with a bayfront or North Beach stop"
        ]
      }
    ],
    "sources": [
      {
        "label": "Texas State Aquarium — official visit information",
        "url": "https://www.texasstateaquarium.org/",
        "scope": "Controlling source for current ticketing, exhibits, presentations, guest services and conservation programming."
      }
    ]
  },
  "fort-worth-zoo": {
    "whyItMatters": "The Fort Worth Zoo is a substantial citywide destination, not merely a single aquarium habitat. A satisfying visit depends on choosing a route through animal zones and leaving time for conservation interpretation, family breaks and the broad footprint south of central Fort Worth.",
    "assessment": {
      "recommendedVisit": "4–6 hours; full day when visiting many animal zones with children",
      "physicalEffort": "Moderate",
      "weatherExposure": "Mixed indoor/outdoor",
      "planningLevel": "Moderate",
      "familyFit": "Very strong for families; afternoon summer heat, long walks and crowded special-event days favor an early start.",
      "firstTimeValue": "One of the state's signature urban wildlife and conservation attractions."
    },
    "itineraries": [
      {
        "label": "Zoo highlights",
        "duration": "3 hours",
        "steps": [
          "Review the current habitat map and daily notices",
          "Choose two or three priority animal zones",
          "Take a scheduled rest or education stop"
        ]
      },
      {
        "label": "Full zoo day",
        "duration": "5–6 hours",
        "steps": [
          "Arrive early and begin with priority outdoor habitats",
          "Pause for food, shade and indoor exhibits where available",
          "Finish at a different habitat zone instead of retracing the entire park"
        ]
      },
      {
        "label": "Fort Worth family weekend",
        "duration": "2 days",
        "steps": [
          "Give the zoo the larger part of day one",
          "Explore a separate Trinity River or museum-area stop",
          "Save the Stockyards for a different block or day"
        ]
      }
    ],
    "sources": [
      {
        "label": "Fort Worth Zoo — official visitor information",
        "url": "https://www.fortworthzoo.org/",
        "scope": "Current zoo map, exhibits, daily operations, accessibility services and admission."
      }
    ]
  },
  "san-antonio-zoo": {
    "whyItMatters": "The San Antonio Zoo sits within Brackenridge Park, creating an accessible animal-focused anchor near gardens, parkland and several other San Antonio cultural stops. The historic Friedrich Aquarium is just one part of the zoo: a broader guide needs to help families sequence outdoor habitats and optional indoor time.",
    "assessment": {
      "recommendedVisit": "3–5 hours, with additional time for Brackenridge Park",
      "physicalEffort": "Moderate",
      "weatherExposure": "Mixed indoor/outdoor",
      "planningLevel": "Moderate",
      "familyFit": "Strong for children and multigenerational groups; check stroller and mobility routes and account for exposed walking in summer.",
      "firstTimeValue": "A well-known San Antonio family attraction that pairs naturally with the city's park and museum corridor."
    },
    "itineraries": [
      {
        "label": "Animal-focused visit",
        "duration": "3 hours",
        "steps": [
          "Review the current zoo map and opening schedule",
          "See two priority animal zones",
          "Include a planned rest before leaving"
        ]
      },
      {
        "label": "Zoo and Brackenridge Park",
        "duration": "5–6 hours",
        "steps": [
          "Start with cooler zoo walking hours",
          "Break for food and a shorter indoor stop if available",
          "Spend separate time in the surrounding public park"
        ]
      },
      {
        "label": "San Antonio family weekend",
        "duration": "2 days",
        "steps": [
          "Use one morning for the zoo and park corridor",
          "Add the Witte Museum or gardens only if independently open",
          "Reserve a separate day for the downtown Alamo and River Walk"
        ]
      }
    ],
    "sources": [
      {
        "label": "San Antonio Zoo — official visitor information",
        "url": "https://sazoo.org/",
        "scope": "Primary source for admission, animal zones, current access, parking and visitor services."
      }
    ]
  },
  "reunion-tower-dallas": {
    "whyItMatters": "Reunion Tower turns the downtown Dallas skyline into a legible map: the GeO-Deck connects views of Dealey Plaza, the West End, the business district and regional rail and road corridors. The experience changes markedly between daylight and night, so time of day matters as much as time spent.",
    "assessment": {
      "recommendedVisit": "60–90 minutes at the observation deck; half day with nearby downtown history",
      "physicalEffort": "Low",
      "weatherExposure": "Mostly indoors",
      "planningLevel": "Moderate",
      "familyFit": "Suitable for families comfortable with height and elevator travel; consider weather and sensitive visitors' preferences.",
      "firstTimeValue": "A quick, iconic Dallas skyline experience with strong day-or-night choices."
    },
    "itineraries": [
      {
        "label": "Viewpoint visit",
        "duration": "75 minutes",
        "steps": [
          "Reserve an admission window if required",
          "Use the skyline displays to identify key districts",
          "Allow time for indoor and outdoor viewing if open"
        ]
      },
      {
        "label": "Downtown history pairing",
        "duration": "Half day",
        "steps": [
          "Visit Dealey Plaza and its interpretive museums separately",
          "Keep a timed Reunion Tower reservation",
          "Use the observation deck to see the route from above"
        ]
      },
      {
        "label": "Dallas skyline evening",
        "duration": "3 hours",
        "steps": [
          "Arrive near the planned light conditions",
          "Spend time identifying landmarks before dark",
          "Add nearby dining independently afterward"
        ]
      }
    ],
    "sources": [
      {
        "label": "Reunion Tower — official visitor information",
        "url": "https://reuniontower.com/",
        "scope": "Controlling visitor source for timed admission, deck availability and accessibility."
      },
      {
        "label": "Dallas CityPASS — attraction reservations",
        "url": "https://www.citypass.com/dallas",
        "scope": "Third-party pass rules and attraction participation, subject to change."
      }
    ]
  },
  "magnolia-market-at-the-silos": {
    "whyItMatters": "Magnolia Market at the Silos recast former downtown Waco grain infrastructure into an expansive retail and public-space destination. It works best when treated as more than a store: the gardens, historic structures, bakery, coffee and family gathering spaces can fill a half day even if shopping is not the main priority.",
    "assessment": {
      "recommendedVisit": "2–4 hours; half day when including food and nearby downtown",
      "physicalEffort": "Low",
      "weatherExposure": "Mixed indoor/outdoor",
      "planningLevel": "Low",
      "familyFit": "Good for mixed-age groups interested in food, browsing and outdoor gathering space; it is not a museum or hands-on children's attraction.",
      "firstTimeValue": "A contemporary Waco landmark that illustrates the city's visitor-economy revival."
    },
    "itineraries": [
      {
        "label": "Market sampler",
        "duration": "2 hours",
        "steps": [
          "Check the operating calendar before traveling",
          "Walk the silos grounds and flagship market",
          "Choose one food or garden stop"
        ]
      },
      {
        "label": "Downtown Waco half day",
        "duration": "4 hours",
        "steps": [
          "Start with coffee or a bakery stop if open",
          "Explore the public grounds, shops and historic structures",
          "Continue to one nearby downtown museum or riverfront stop"
        ]
      },
      {
        "label": "Waco weekend",
        "duration": "2 days",
        "steps": [
          "Give the Silos a relaxed half day",
          "Visit a separate Baylor-area or downtown institution",
          "Allow a second day for Waco Mammoth or another attraction"
        ]
      }
    ],
    "sources": [
      {
        "label": "Magnolia — visit the Silos",
        "url": "https://magnolia.com/visit/",
        "scope": "Primary guidance for current operating days, parking, dining and special-event access."
      }
    ]
  },
  "mcdonald-observatory": {
    "whyItMatters": "McDonald Observatory offers rare proximity to active professional astronomy in the Davis Mountains, where high elevation, dry air and comparatively dark skies shape both research and public programs. It is a destination for understanding the science as well as enjoying the night sky; weather and reserved programs are central planning constraints.",
    "assessment": {
      "recommendedVisit": "2–3 hours for a selected public program; combine with a Davis Mountains overnight for a Star Party",
      "physicalEffort": "Low to moderate",
      "weatherExposure": "Mixed indoor/outdoor",
      "planningLevel": "High",
      "familyFit": "Excellent for astronomy-interested school-age children and adults, though late-night events and mountain weather may be hard for younger children.",
      "firstTimeValue": "A standout West Texas science-and-dark-skies experience."
    },
    "itineraries": [
      {
        "label": "Daytime science visit",
        "duration": "2–3 hours",
        "steps": [
          "Reserve a public daytime tour if offered",
          "Arrive early for the scheduled orientation",
          "Use posted visitor routes without entering research-only spaces"
        ]
      },
      {
        "label": "Star Party night",
        "duration": "Evening",
        "steps": [
          "Reserve a nighttime program before the trip",
          "Check cloud cover and bring warm layers",
          "Follow staff guidance for dark-adapted eyes and lighting"
        ]
      },
      {
        "label": "Davis Mountains weekend",
        "duration": "2 days",
        "steps": [
          "Stay in the Fort Davis area for a separate daylight outing",
          "Visit the observatory on a reserved program",
          "Add a state park or historic site in another daylight block"
        ]
      }
    ],
    "sources": [
      {
        "label": "McDonald Observatory — official public programs",
        "url": "https://mcdonaldobservatory.org/",
        "scope": "Operator source for scheduled programs, ticketing, weather policies and observatory research."
      }
    ]
  }
};

/** Visitor-intent research grounded in current official operator and state sources.
 * Answers do not imply measured search frequency; operational rules are dynamic.
 */
const VISITOR_FAQS: Record<Top50AuthorityWave1Slug, Array<{ question: string; answer: string; sourceUrl: string }>> = {
  "dinosaur-valley-state-park": [
    {
      "question": "Are dinosaur footprints always visible?",
      "answer": "No. TPWD explains that the original tracks lie in the Paluxy River bed and visibility depends on river levels, rain and trail conditions. Check the park's current notices just before traveling.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/dinosaur-valley"
    },
    {
      "question": "Can visitors with mobility limitations see the dinosaur tracks?",
      "answer": "TPWD describes accessible replica tracks and an interpretive center. Reaching actual river-bed tracks can involve steep, rough or wet terrain; contact the park about the available Trackchair and crossing conditions.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/dinosaur-valley/fees-facilities/accessibility"
    },
    {
      "question": "Do I need a reservation for day use?",
      "answer": "TPWD recommends reserving day passes because this park can reach capacity. Use the state park reservation system and confirm any active park alerts before departure.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/dinosaur-valley"
    }
  ],
  "garner-state-park": [
    {
      "question": "Can Garner State Park close to day visitors when it is full?",
      "answer": "Yes. TPWD warns that the park frequently reaches capacity on busy summer and holiday dates. Reserving a day pass in advance is the safest way to plan entry.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/garner/fees-facilities/entrance-fees"
    },
    {
      "question": "Can I camp and swim on the same trip?",
      "answer": "Garner offers overnight camping and Frio River recreation, but reserve camping separately and check river conditions and any restrictions before entering the water.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/garner"
    },
    {
      "question": "When is the park especially busy?",
      "answer": "TPWD identifies the Memorial Day through Labor Day period and holidays as the busiest times. Consider weekdays or cooler seasons if avoiding crowds is the priority.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/garner"
    }
  ],
  "south-padre-island-beaches": [
    {
      "question": "Is South Padre Island Beach one single entrance?",
      "answer": "No. Visitors choose among public beach access areas with different parking and nearby facilities. Check the city access and safety resources for the specific location you plan to use.",
      "sourceUrl": "https://www.myspi.org/"
    },
    {
      "question": "Should I check beach conditions before swimming?",
      "answer": "Yes. Gulf surf, rip currents, winds and local advisories change. Follow posted warnings and current official city or beach safety guidance; never assume calm conditions from an earlier visit.",
      "sourceUrl": "https://www.myspi.org/"
    },
    {
      "question": "Are Gulf beach access and Laguna Madre bayside recreation interchangeable?",
      "answer": "No. The Gulf shore and Laguna Madre side have different water and access conditions. Decide which experience you want and confirm its specific public access rules.",
      "sourceUrl": "https://www.myspi.org/"
    }
  ],
  "port-aransas-beach": [
    {
      "question": "Can I drive or park on the Port Aransas beach?",
      "answer": "Driving and parking are regulated by the city, with permit requirements and designated restrictions that can change. Confirm the current municipal beach rules before arriving in a vehicle.",
      "sourceUrl": "https://cityofportaransas.org/"
    },
    {
      "question": "Is every part of the beach suitable for swimming?",
      "answer": "No stretch of Gulf shoreline is safe in every condition. Check local surf alerts, currents and posted warnings, and avoid using the beach vehicle lanes as a pedestrian play area.",
      "sourceUrl": "https://cityofportaransas.org/"
    },
    {
      "question": "Can I camp anywhere along the shore?",
      "answer": "No. Beach camping has local limits and designated rules. Check the city's current instructions rather than assuming parking or overnight stays are unrestricted.",
      "sourceUrl": "https://cityofportaransas.org/"
    }
  ],
  "texas-state-aquarium": [
    {
      "question": "Should I follow the aquarium's daily presentation schedule?",
      "answer": "Yes. Live presentations and animal activities can change by day. Check the operator's current program schedule and plan a route around your highest-priority experiences.",
      "sourceUrl": "https://www.texasstateaquarium.org/"
    },
    {
      "question": "Is the USS Lexington part of the aquarium ticket?",
      "answer": "No; the USS Lexington is a separate museum and attraction on the Corpus Christi waterfront. Plan it as an independent visit with its own operating information and ticketing.",
      "sourceUrl": "https://www.texasstateaquarium.org/"
    },
    {
      "question": "Is the whole visit indoors?",
      "answer": "No. The aquarium includes both indoor and outdoor experiences, so prepare for coastal sun, wind or rain and check temporary exhibit closures before travel.",
      "sourceUrl": "https://www.texasstateaquarium.org/"
    }
  ],
  "fort-worth-zoo": [
    {
      "question": "Is the Fort Worth Zoo only an aquarium attraction?",
      "answer": "No. Aquatic habitats are only one part of a large zoo with multiple animal regions and conservation-focused exhibits. Use the operator's full zoo map to prioritize your interests.",
      "sourceUrl": "https://www.fortworthzoo.org/"
    },
    {
      "question": "How should families plan on a hot day?",
      "answer": "Plan an earlier arrival, water and rest breaks, and an achievable subset of habitats rather than trying to cover the entire property in midday heat. Consult the zoo's current guest guidance.",
      "sourceUrl": "https://www.fortworthzoo.org/"
    },
    {
      "question": "Are all animal habitats and activities available every day?",
      "answer": "Not necessarily. Animal-care needs, work and weather can affect individual habitats and experiences. Check official daily notices before choosing your route.",
      "sourceUrl": "https://www.fortworthzoo.org/"
    }
  ],
  "san-antonio-zoo": [
    {
      "question": "Is the Friedrich Aquarium the entire San Antonio Zoo?",
      "answer": "No. The aquarium is one component of a much larger zoo. Consult the current zoo map to plan both indoor and outdoor animal areas.",
      "sourceUrl": "https://sazoo.org/"
    },
    {
      "question": "Should I plan the zoo and the Alamo as one walking visit?",
      "answer": "They are in different parts of San Antonio. The zoo is near Brackenridge Park; treat downtown landmarks as a separate travel segment and allow for traffic and parking.",
      "sourceUrl": "https://sazoo.org/"
    },
    {
      "question": "Are the zoo's animal presentations guaranteed?",
      "answer": "No. Animal programming and access depend on the current operating calendar and animal-care decisions. Verify daily events through the zoo before arrival.",
      "sourceUrl": "https://sazoo.org/"
    }
  ],
  "reunion-tower-dallas": [
    {
      "question": "Is Reunion Tower the same as the Sixth Floor Museum?",
      "answer": "No. Reunion Tower is a skyline observation attraction. The Sixth Floor Museum is a separate historical museum near Dealey Plaza, with its own admission and schedule.",
      "sourceUrl": "https://reuniontower.com/"
    },
    {
      "question": "Should I reserve the observation deck before visiting?",
      "answer": "Check the official ticketing calendar for timed admission and availability, especially when targeting sunset or a special event.",
      "sourceUrl": "https://reuniontower.com/"
    },
    {
      "question": "Is a daytime visit different from an evening visit?",
      "answer": "Yes. Daylight makes it easier to identify city landmarks, while evening emphasizes skyline lighting. Check operating times and forecast conditions before choosing.",
      "sourceUrl": "https://reuniontower.com/"
    }
  ],
  "magnolia-market-at-the-silos": [
    {
      "question": "Is Magnolia Market at the Silos open every Sunday?",
      "answer": "No. Magnolia states that its Waco venues are ordinarily closed Sundays, with exceptions for certain special events. Verify the exact calendar before traveling.",
      "sourceUrl": "https://magnolia.com/pages/visit"
    },
    {
      "question": "Where can I find free parking at the Silos?",
      "answer": "Magnolia lists free street parking on 6th Street, 8th Street and Webster Avenue, plus a free lot at 9th and Webster. Event weekends may affect availability.",
      "sourceUrl": "https://help.magnolia.com/hc/en-us/articles/31170877634324-Parking-at-the-Silos"
    },
    {
      "question": "Is visiting the Silos only about shopping?",
      "answer": "No. The grounds include gathering spaces, food, gardens and historic structures in addition to retail. Check individual venue hours; nearby sites may follow different schedules.",
      "sourceUrl": "https://magnolia.com/pages/visit"
    }
  ],
  "mcdonald-observatory": [
    {
      "question": "Do I need to reserve a Star Party in advance?",
      "answer": "Check the official public-program ticket calendar and reserve the program you want before making the remote Davis Mountains trip. Availability can be limited.",
      "sourceUrl": "https://mcdonaldobservatory.org/"
    },
    {
      "question": "Will I definitely see stars through a telescope?",
      "answer": "No. Weather and clouds can prevent observing. Follow the observatory's official weather and program policies rather than assuming every booked night will have clear skies.",
      "sourceUrl": "https://mcdonaldobservatory.org/"
    },
    {
      "question": "Is McDonald Observatory the same place as Fort Davis National Historic Site?",
      "answer": "No. The observatory is an astronomy research and public-program location in the Davis Mountains; Fort Davis National Historic Site is a separate historic destination.",
      "sourceUrl": "https://mcdonaldobservatory.org/"
    }
  ]
};

export function applyTop50AuthorityWave1(destination: Destination): Destination {
  if (!isTop50AuthorityWave1(destination.slug)) return destination;
  const guide = GUIDES[destination.slug];
  const fromOperator: DestinationAuthoritySource[] = [];
  if (destination.officialUrl) fromOperator.push({
    label: destination.name + " — operator visitor information",
    url: destination.officialUrl,
    scope: "Controlling visitor source for schedules, admission, access, closures and accessibility."
  });
  if (destination.reservationUrl && destination.reservationUrl !== destination.officialUrl) fromOperator.push({
    label: destination.name + " — official reservations",
    url: destination.reservationUrl,
    scope: "Current operator ticket and reservation procedures."
  });
  const deduped = new Map<string, DestinationAuthoritySource>();
  for (const source of [...fromOperator, ...guide.sources]) deduped.set(source.url.replace(/\/$/, ""), source);
  const questionMap = new Map<string, { question: string; answer: string; sourceUrl?: string }>();
  for (const faq of [...(destination.visitorFaqs ?? []), ...VISITOR_FAQS[destination.slug]]) {
    questionMap.set(faq.question.trim().toLowerCase(), faq);
  }
  return {
    ...destination,
    visitorFaqs: [...questionMap.values()],
    authorityGuide: { ...guide, sources: [...deduped.values()] },
  };
}
