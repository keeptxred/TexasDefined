import type { Destination } from "./types";
/** Final fifteen Top-50 site-specific visitor Q&A supplements.
 * Primary official operator/agency/tourism sources checked October 18, 2026.
 * Keep the site review timestamp unchanged until the entire destination is rechecked.
 */
const ANSWERS: Record<string, Array<{ question: string; answer: string; sourceUrl: string }>> = {
  "san-antonio-river-walk": [
    {
      "question": "Is every River Walk segment one continuous downtown restaurant district?",
      "answer": "No. The downtown loop differs from the public-art Museum Reach to the north and the restored natural Mission Reach to the south. The River Authority supplies separate trail and access maps for each reach.",
      "sourceUrl": "https://www.sariverauthority.org/parks-trails/san-antonio-river-walk-museum-reach/"
    },
    {
      "question": "Does the Museum Reach cost admission?",
      "answer": "The San Antonio River Authority describes its Museum Reach public trail as free and open 24 hours. Cruises, dining, museums and other commercial experiences along it charge separately.",
      "sourceUrl": "https://www.sariverauthority.org/parks-trails/san-antonio-river-walk-museum-reach/"
    },
    {
      "question": "Can I use the Mission Reach as an alternative to the downtown walk?",
      "answer": "Yes. The River Authority describes a much quieter eight-mile linear park with more than 16 miles of trails and links to mission portals. Public trail admission is free; check weather and daylight.",
      "sourceUrl": "https://www.sariverauthority.org/parks-trails/san-antonio-river-walk-mission-reach/"
    }
  ],
  "natural-bridge-caverns": [
    {
      "question": "What should I wear for the Discovery Tour?",
      "answer": "The operator reports a 70-degree cavern with very high humidity and approximately three-quarters of a mile of walking. Wear grippy shoes for steep, wet surfaces; the tour includes stairs.",
      "sourceUrl": "https://www.naturalbridgecaverns.com/tour/discovery-tour/"
    },
    {
      "question": "Is the Hidden Wonders Tour identical to Discovery Tour?",
      "answer": "No. Hidden Wonders explores another part of the cavern system, takes about 70–75 minutes and uses an assisted conveyor ride for part of the return. Both tours require walking and stairs.",
      "sourceUrl": "https://www.naturalbridgecaverns.com/tour/hidden-wonders/"
    },
    {
      "question": "Is parking automatically included with cavern tour tickets?",
      "answer": "The operator's trip-planning page specifies a separate per-vehicle parking charge and lists tour tickets separately. Confirm the fee and parking rules for your specific booking.",
      "sourceUrl": "https://www.naturalbridgecaverns.com/plan-your-trip/"
    }
  ],
  "moody-gardens": [
    {
      "question": "Can I visit the upper Discovery Pyramid exhibit gallery in October 2026?",
      "answer": "The operator says the upstairs rotating exhibit gallery is closed during the move of the Galveston Children's Museum, which is scheduled to open in November 2026. Check date-specific access before purchasing.",
      "sourceUrl": "https://www.moodygardens.com/attractions/discovery-pyramid"
    },
    {
      "question": "Is Palm Beach open year-round?",
      "answer": "No. Moody Gardens describes Palm Beach as a seasonal summer waterpark experience, distinct from the aquarium and rainforest pyramids. Check the daily attraction calendar before expecting it to operate.",
      "sourceUrl": "https://www.moodygardens.com/attractions"
    },
    {
      "question": "Does Moody Gardens charge for standard parking?",
      "answer": "Moody Gardens' official visitor overview advertises free parking. Tickets to individual attractions and the hotel are separate, so decide which experiences you want before selecting a package.",
      "sourceUrl": "https://www.moodygardens.com/"
    }
  ],
  "guadalupe-mountains-national-park": [
    {
      "question": "Can I drive to McKittrick Canyon at any hour?",
      "answer": "No. NPS lists gate hours for McKittrick Canyon and says the gate closes and locks at the end of the visitor period. Check Mountain Time and the published hours before driving there.",
      "sourceUrl": "https://www.nps.gov/gumo/planyourvisit/basicinfo.htm"
    },
    {
      "question": "Is camping in the park's wilderness allowed without a permit?",
      "answer": "No. NPS requires a wilderness-use permit for overnight backpacking and separate reservations or fees for developed campgrounds. Secure the correct permit before starting.",
      "sourceUrl": "https://www.nps.gov/gumo/planyourvisit/permitsandreservations.htm"
    },
    {
      "question": "Is Guadalupe Peak trailhead parking unlimited?",
      "answer": "No. NPS documents limited parking at the Pine Springs trailhead used for Guadalupe Peak, Devil's Hall, the Bowl and El Capitan. On busy days, use official overflow arrangements instead of illegal roadside parking.",
      "sourceUrl": "https://www.nps.gov/gumo/planyourvisit/parking.htm"
    }
  ],
  "enchanted-rock-state-natural-area": [
    {
      "question": "Are advance passes required at Enchanted Rock?",
      "answer": "TPWD's park alert requires advance reservations on weekends, school breaks and holidays, and says weekdays commonly reach capacity too. Reserve the correct date to guarantee entry.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/enchanted-rock/alert"
    },
    {
      "question": "Can I climb the summit in rainy weather?",
      "answer": "Not necessarily. TPWD closes the exposed granite Summit Trail during wet or unsafe conditions; other trails can remain open. Check the latest park trail status before leaving home.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/enchanted-rock/trails-info"
    },
    {
      "question": "Can pets walk to the Enchanted Rock summit?",
      "answer": "No. TPWD prohibits pets on the elevated areas, including the Summit Trail. Pets are restricted to designated lower trails, picnic areas and campgrounds.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/enchanted-rock/trails-info"
    }
  ],
  "houston-museum-of-natural-science": [
    {
      "question": "Does a Houston Museum of Natural Science general ticket cover every experience?",
      "answer": "No. The museum's FAQ says general admission covers permanent halls, while some special exhibits, the Cockrell Butterfly Center, planetarium and giant-screen experiences have separate ticket rules.",
      "sourceUrl": "https://www.hmns.org/visit/faq/"
    },
    {
      "question": "Is HMNS free on Tuesdays?",
      "answer": "The museum lists free access to permanent exhibits on Tuesdays from 5 p.m. to 8 p.m. Other paid attractions are not necessarily included; verify the current visit calendar.",
      "sourceUrl": "https://www.hmns.org/visit/"
    },
    {
      "question": "Is the Hermann Park museum the same as HMNS at Sugar Land?",
      "answer": "No. HMNS operates separate facilities in Houston's Hermann Park and Sugar Land. Check your reservation's address and exhibit roster before heading out.",
      "sourceUrl": "https://www.hmns.org/visit/faq/"
    }
  ],
  "dallas-arboretum-and-botanical-garden": [
    {
      "question": "Which entrance should families use for the Children's Adventure Garden?",
      "answer": "The Dallas Arboretum recommends Entry 3 at 8657 Garland Road for the Rory Meyers Children's Adventure Garden, rather than assuming the 8525 Garland Road Main Entrance is closest.",
      "sourceUrl": "https://www.dallasarboretum.org/visitor-information/parking/"
    },
    {
      "question": "Is Dallas Arboretum parking always included with admission?",
      "answer": "No. The garden lists separate paid parking for most visitors, with exceptions for members and qualifying access programs. Reserve or purchase parking for the correct entry when needed.",
      "sourceUrl": "https://www.dallasarboretum.org/visitor-information/parking/"
    },
    {
      "question": "Is the Dallas Arboretum a short indoor museum visit?",
      "answer": "No. Its visitor FAQ describes a 66-acre outdoor garden, including an eight-acre children's garden. Wear walking shoes and plan for shade, weather and several hours outdoors.",
      "sourceUrl": "https://www.dallasarboretum.org/visitor-information/planning-your-visit/visitor-faqs/"
    }
  ],
  "galveston-island-historic-pleasure-pier": [
    {
      "question": "Can a visitor walk onto Galveston's Pleasure Pier without buying rides?",
      "answer": "Yes, but not free: the operator requires a paid Walk-On Pass even for non-riders, while an All Day Ride Pass includes pier admission. Confirm current categories before buying.",
      "sourceUrl": "https://www.pleasurepier.com/tickets"
    },
    {
      "question": "Can visitors buy just one ride at Pleasure Pier?",
      "answer": "Yes. The operator sells single-ride tickets, but also requires a Walk-On Pass for access to the pier unless the visitor already holds an eligible ride wristband.",
      "sourceUrl": "https://www.pleasurepier.com/faqs"
    },
    {
      "question": "Does a Pleasure Pier ride wristband guarantee every ride?",
      "answer": "No. Published height rules apply, and rides can close because of weather or maintenance. Check individual ride notices rather than assuming every attraction is operating.",
      "sourceUrl": "https://www.pleasurepier.com/weekend-adventure-pass"
    }
  ],
  "san-jacinto-battleground": [
    {
      "question": "Do I have to buy a museum ticket just to visit San Jacinto Battleground?",
      "answer": "No. The Texas Historical Commission lists the battlefield grounds as free, while the museum, monument observation experience and selected programs have separate prices or booking rules.",
      "sourceUrl": "https://thc.texas.gov/historic-sites/san-jacinto-battleground"
    },
    {
      "question": "Is the San Jacinto Monument open on exactly the same days as the grounds?",
      "answer": "No. The Texas Historical Commission lists daily battleground hours and a separate Wednesday-to-Sunday schedule for the Monument and Museum. Check the exact date before planning a tower visit.",
      "sourceUrl": "https://thc.texas.gov/historic-sites/san-jacinto-battleground"
    },
    {
      "question": "Can I still visit Battleship Texas at San Jacinto?",
      "answer": "No. Battleship Texas left the San Jacinto site in 2022 for restoration in Galveston. Do not include an onboard Battleship Texas tour in a modern battleground itinerary.",
      "sourceUrl": "https://www.tshaonline.org/handbook/entries/san-jacinto-battleground-state-historical-park"
    }
  ],
  "houston-zoo": [
    {
      "question": "Do nonmembers need advance timed tickets for Houston Zoo?",
      "answer": "Yes. The Houston Zoo's visitor instructions require online reservations for timed tickets for nonmember guests. Check the date-specific ticket calendar before driving to Hermann Park.",
      "sourceUrl": "https://www.houstonzoo.org/plan-your-visit/"
    },
    {
      "question": "Does every zoo animal appear in every visit?",
      "answer": "No. Zoo habitats and programming can change for animal welfare, maintenance and weather. Choose a few priority habitats and review the official schedule and current notices on arrival.",
      "sourceUrl": "https://www.houstonzoo.org/plan-your-visit/"
    },
    {
      "question": "Is the Houston Zoo inside the Museum District or a separate suburb?",
      "answer": "It is located at 6200 Hermann Park Drive beside Hermann Park in central Houston. Nearby museum visits have separate hours, tickets and parking logistics.",
      "sourceUrl": "https://www.houstonzoo.org/plan-your-visit/"
    }
  ],
  "barton-springs-pool": [
    {
      "question": "Is Barton Springs Pool open for ordinary lifeguarded swimming all day Thursday?",
      "answer": "No. The City of Austin's standard Thursday schedule provides early swim-at-your-own-risk, then a long cleaning closure before guarded evening swimming. Check the actual daily pool alert before traveling.",
      "sourceUrl": "https://www.austintexas.gov/services/visit-barton-springs-pool"
    },
    {
      "question": "Can visitors purchase Barton Springs Pool tickets online?",
      "answer": "Yes. Austin Parks and Recreation offers online and ATXSwims mobile tickets, with payment options at the pool. Resident, nonresident and age-based categories vary.",
      "sourceUrl": "https://www.austintexas.gov/services/visit-barton-springs-pool"
    },
    {
      "question": "Is Barton Springs Pool temporarily affected by retaining-wall repairs?",
      "answer": "Austin's wall-repair update says work may create fenced construction zones and change nearby shade, though no pool closure was anticipated at the time of the notice. Review current updates.",
      "sourceUrl": "https://www.austintexas.gov/parks/barton-springs-wall-repair-project"
    }
  ],
  "hamilton-pool-preserve": [
    {
      "question": "Does a Hamilton Pool reservation guarantee swimming?",
      "answer": "No. Local operator guidance explicitly says swimming is never guaranteed, and published falling-rock safety restrictions may prohibit access to the water or the cliff overhang. Never plan this as a guaranteed swim.",
      "sourceUrl": "https://drippingspringstx.gov/facilities/facility/details/Hamilton-Pool-Preserve-3"
    },
    {
      "question": "Can visitors walk into Hamilton Pool Preserve without a reservation?",
      "answer": "No. The preserve requires an advance reservation for entry. The posted rules include photo ID, specific vehicle and party restrictions, and an additional on-site fee.",
      "sourceUrl": "https://drippingspringstx.gov/facilities/facility/details/Hamilton-Pool-Preserve-3"
    },
    {
      "question": "Is the Hamilton Pool approach a fully paved easy path?",
      "answer": "No. The posted public guidance warns of a roughly quarter-mile route over rough terrain, so consider footwear and mobility before purchasing a timed entry.",
      "sourceUrl": "https://drippingspringstx.gov/facilities/facility/details/Hamilton-Pool-Preserve-3"
    }
  ],
  "cadillac-ranch": [
    {
      "question": "Is there an entrance fee for Cadillac Ranch?",
      "answer": "No. Visit Amarillo reports that the open-field public art installation has no admission charge. It is not a ticketed museum with a staffed entrance.",
      "sourceUrl": "https://www.visitamarillo.com/blog/post/cadillac-ranch/"
    },
    {
      "question": "Is Cadillac Ranch an indoor attraction open during business hours?",
      "answer": "No. Amarillo's tourism bureau describes a roadside outdoor installation on the south I-40 access road, open at all hours, with terrain and weather conditions that visitors should consider.",
      "sourceUrl": "https://www.visitamarillo.com/blog/post/cadillac-ranch/"
    },
    {
      "question": "Does the Cadillac Ranch stop represent the actual current Route 66 alignment?",
      "answer": "No. The installation originally reflected Route 66 culture, but Visit Amarillo explains its location changed with highway realignment. Use its current directions rather than a historic map.",
      "sourceUrl": "https://www.visitamarillo.com/blog/post/cadillac-ranch/"
    }
  ],
  "gruene-historic-district": [
    {
      "question": "Is every Gruene Hall concert free?",
      "answer": "No. The Gruene events calendar separately identifies many free live-music sets and ticketed evening concerts. Check the specific artist, date and entry conditions before arriving.",
      "sourceUrl": "https://www.gruenetexas.com/music/"
    },
    {
      "question": "Where is Gruene Hall within the district?",
      "answer": "Gruene's official venue listing places the historic dance hall at 1281 Gruene Road in New Braunfels. Shops and dining are nearby but operate on their own schedules.",
      "sourceUrl": "https://www.gruenetexas.com/venue/gruene-hall/"
    },
    {
      "question": "Is Gruene a separate town far from New Braunfels?",
      "answer": "Gruene is a historic district within the New Braunfels area; it works as a separate short walk or music outing rather than a distant overnight-only excursion.",
      "sourceUrl": "https://www.gruenetexas.com/"
    }
  ],
  "fredericksburg-historic-district": [
    {
      "question": "Where can I park for a Fredericksburg Main Street walking visit?",
      "answer": "The official Fredericksburg visitor center at 302 East Austin Street advertises free public parking, brochures and a useful starting point one block from Main Street. Overnight parking is not allowed.",
      "sourceUrl": "https://www.visitfredericksburgtx.com/plan/visitor-center/"
    },
    {
      "question": "Does Fredericksburg Main Street contain museums or only shops?",
      "answer": "Yes, Main Street connects the National Museum of the Pacific War to the east and Pioneer Museum toward the west, with shops and historic architecture between them.",
      "sourceUrl": "https://www.visitfredericksburgtx.com/things-to-do/shopping/main-street/"
    },
    {
      "question": "Can I use a self-guided historic district map?",
      "answer": "Yes. Visit Fredericksburg says free self-guided National Historic District walking maps are available at its visitor center, and the district encompasses more than 80 historic points of interest.",
      "sourceUrl": "https://www.visitfredericksburgtx.com/directory/national-historic-district/"
    }
  ]
};
export const TOP50_FINAL_FAQ_SLUGS = [
  "san-antonio-river-walk",
  "natural-bridge-caverns",
  "moody-gardens",
  "guadalupe-mountains-national-park",
  "enchanted-rock-state-natural-area",
  "houston-museum-of-natural-science",
  "dallas-arboretum-and-botanical-garden",
  "galveston-island-historic-pleasure-pier",
  "san-jacinto-battleground",
  "houston-zoo",
  "barton-springs-pool",
  "hamilton-pool-preserve",
  "cadillac-ranch",
  "gruene-historic-district",
  "fredericksburg-historic-district"
] as const;
export function applyTop50FinalVisitorAnswers(destination: Destination): Destination {
  const newFAQs = ANSWERS[destination.slug];
  if (!newFAQs) return destination;
  const merged = new Map<string, { question: string; answer: string; sourceUrl?: string }>();
  for (const item of [...(destination.visitorFaqs ?? []), ...newFAQs]) {
    merged.set(item.question.trim().toLowerCase(), item);
  }
  return { ...destination, visitorFaqs: [...merged.values()] };
}
