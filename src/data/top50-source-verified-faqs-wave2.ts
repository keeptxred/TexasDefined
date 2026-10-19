import type { Destination } from "./types";

/**
 * Source-checked 2026-10-18 against the named managing agencies.
 * Permanent site-specific questions remain independent of volatile live
 * schedules; official operator links control current access and prices.
 */
export const TOP50_FAQ_WAVE2_SLUGS = [
  "the-alamo",
  "space-center-houston",
  "big-bend-national-park",
  "sixth-floor-museum-at-dealey-plaza",
  "palo-duro-canyon-state-park",
  "san-antonio-missions-national-historical-park",
  "texas-state-capitol",
  "fort-worth-stockyards",
  "padre-island-national-seashore"
] as const;
export type Top50FaqWave2Slug = typeof TOP50_FAQ_WAVE2_SLUGS[number];
const VERIFIED_FAQS: Record<Top50FaqWave2Slug, Array<{ question: string; answer: string; sourceUrl: string }>> = {
  "the-alamo": [
    {
      "question": "Do visitors need a ticket to enter the Alamo Church?",
      "answer": "Church entry remains free, but the Alamo uses timed-entry tickets. Obtain an available free ticket online or at an on-site Welcome Center; confirm current hours and any special closures before traveling.",
      "sourceUrl": "https://www.thealamo.org/support/alamo-plan/news/alamo-area-construction-news-september-2026"
    },
    {
      "question": "Does construction affect access around Alamo Plaza?",
      "answer": "Yes. Construction associated with the Alamo Visitor Center and Museum affects streets and pedestrian routes. The operator's monthly construction notices explain current fencing and routes, so do not rely on an older map.",
      "sourceUrl": "https://www.thealamo.org/support/alamo-plan/news/alamo-area-construction-news-september-2026"
    },
    {
      "question": "Is the future Alamo Visitor Center and Museum already open?",
      "answer": "No. The Alamo's September 2026 project update says the new Visitor Center and Museum is scheduled to open in 2028. Plan current exhibits and tickets using the operating Alamo attractions.",
      "sourceUrl": "https://www.thealamo.org/support/alamo-plan/news/alamo-area-construction-news-september-2026"
    }
  ],
  "space-center-houston": [
    {
      "question": "Is the Historic Mission Control tour included in general admission?",
      "answer": "No. Space Center Houston identifies its Historic Mission Control Tour as an additional-cost tram experience, purchased with general admission subject to its limited schedule.",
      "sourceUrl": "https://spacecenter.org/exhibits-and-experiences/nasa-tram-tour/"
    },
    {
      "question": "Can I reserve every NASA tram tour before I arrive?",
      "answer": "No. Reservation rules differ by tour. The operator identifies some tours as advance-purchase add-ons and other general-admission tram boarding passes as first-come, first-served on site. Confirm the exact tour.",
      "sourceUrl": "https://spacecenter.org/exhibits-and-experiences/nasa-tram-tour/"
    },
    {
      "question": "Could a NASA tram tour be cancelled after booking?",
      "answer": "Yes. NASA Johnson Space Center is a working government facility, and Space Center Houston warns that weather and NASA building access can interrupt or change tours without advance notice.",
      "sourceUrl": "https://spacecenter.org/exhibits-and-experiences/nasa-tram-tour/"
    }
  ],
  "big-bend-national-park": [
    {
      "question": "Can an ordinary passenger car use every Big Bend park road?",
      "answer": "No. The National Park Service warns that Old Ore Road, Black Gap Road and other primitive roads require true four-wheel drive, appropriate clearance and recovery supplies. Do not use these in a passenger car.",
      "sourceUrl": "https://www.nps.gov/bibe/planyourvisit/conditions.htm"
    },
    {
      "question": "Is Santa Elena Canyon Trail always accessible?",
      "answer": "No. The trail approach crosses the Terlingua Creek bed; rain, mud or high water can make the crossing unsafe. NPS advises checking conditions with a ranger and avoiding high-water crossings.",
      "sourceUrl": "https://www.nps.gov/bibe/planyourvisit/conditions.htm"
    },
    {
      "question": "Are Big Bend campground and border-crossing schedules fixed year-round?",
      "answer": "No. National Park Service current-conditions notices separately report seasonal facility closures and the operating schedule for the Boquillas port of entry. Check the latest notice just before visiting.",
      "sourceUrl": "https://www.nps.gov/bibe/planyourvisit/conditions.htm"
    }
  ],
  "sixth-floor-museum-at-dealey-plaza": [
    {
      "question": "Do I need an advance ticket for the Sixth Floor Museum?",
      "answer": "Yes. The museum's official FAQ states that timed entry tickets must be purchased in advance and used for their specified date and time.",
      "sourceUrl": "https://www.jfk.org/faq/"
    },
    {
      "question": "How long should I allow for the core museum exhibit?",
      "answer": "The museum says its self-guided sixth-floor permanent exhibition usually takes around 90 minutes. Allow more time if a seventh-floor temporary exhibition is open.",
      "sourceUrl": "https://www.jfk.org/faq/"
    },
    {
      "question": "Can visitors take photographs inside the Sixth Floor Museum?",
      "answer": "Non-flash photographs are generally allowed where not restricted by contract or curatorial policy, for personal use only. Commercial distribution requires advance written approval.",
      "sourceUrl": "https://www.jfk.org/faq/"
    }
  ],
  "palo-duro-canyon-state-park": [
    {
      "question": "Should I reserve a Palo Duro Canyon State Park day pass?",
      "answer": "Yes. TPWD reports that the park frequently reaches capacity and recommends online or phone reservations for both day use and camping, especially during peak periods.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/palo-duro-canyon"
    },
    {
      "question": "Can Palo Duro Canyon trails close even when the park is open?",
      "answer": "Yes. TPWD warns that trails can close because of wet weather, poor trail conditions or excessive heat. Check park alerts and posted status instead of assuming all mapped trails are available.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/palo-duro-canyon"
    },
    {
      "question": "Are flash floods a concern at Palo Duro Canyon?",
      "answer": "Yes. TPWD specifically lists flash flooding as a serious danger. Avoid low-water crossings and exposed canyon trails when heavy rain is forecast or occurring upstream.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/palo-duro-canyon"
    }
  ],
  "san-antonio-missions-national-historical-park": [
    {
      "question": "Is admission to San Antonio Missions National Historical Park free?",
      "answer": "Yes. The National Park Service says entrance to its historic mission sites requires no admission pass. Separate non-NPS experiences may have their own fees.",
      "sourceUrl": "https://www.nps.gov/saan/planyourvisit/fees.htm"
    },
    {
      "question": "Where should a first-time visitor begin exploring the missions?",
      "answer": "NPS recommends its visitor center at Mission San José, 6701 San José Drive, where interpretive information, a film and other visitor services are available.",
      "sourceUrl": "https://www.nps.gov/saan/planyourvisit/visitorcenters.htm"
    },
    {
      "question": "Does San Antonio Missions National Historical Park include the Alamo?",
      "answer": "No. The NPS national historical park protects Mission Concepción, Mission San José, Mission San Juan and Mission Espada; the Alamo is a separately managed historic attraction.",
      "sourceUrl": "https://www.nps.gov/saan/reachsanantonio.htm"
    }
  ],
  "texas-state-capitol": [
    {
      "question": "Are guided Texas Capitol tours free?",
      "answer": "Yes. The Texas State Preservation Board publishes free guided Capitol tours, generally about 40 minutes long. Schedules and the last tour departure vary by day.",
      "sourceUrl": "https://tspb.texas.gov/plan/tours/tours.html"
    },
    {
      "question": "Can I explore the Capitol without joining a guided tour?",
      "answer": "Yes. The State Preservation Board permits self-guided visits to the Capitol and grounds during published building hours, with informational brochures available at the Capitol.",
      "sourceUrl": "https://tspb.texas.gov/plan/tours/tours.html"
    },
    {
      "question": "Do large groups need to arrange a Capitol visit?",
      "answer": "Yes. The State Preservation Board asks groups larger than ten to call ahead. School groups should use the separate field-trip planning process.",
      "sourceUrl": "https://tspb.texas.gov/plan/tours/tours.html"
    }
  ],
  "fort-worth-stockyards": [
    {
      "question": "When is the Fort Worth Herd cattle drive?",
      "answer": "The Stockyards publishes its free Fort Worth Herd cattle drive for 11:30 a.m. and 4:00 p.m. daily, weather permitting. Special events and street closures can change access.",
      "sourceUrl": "https://www.fortworthstockyards.org/"
    },
    {
      "question": "Does visiting the Stockyards require one admission ticket?",
      "answer": "No. The Stockyards is a district with shops and streets open to the public. Rodeos, museums, attractions and entertainment may sell their own tickets and have separate schedules.",
      "sourceUrl": "https://www.fortworthstockyards.org/"
    },
    {
      "question": "Where should drivers park for the Stockyards cattle drive?",
      "answer": "The district has multiple public parking lots with variable charges. Consult the official parking map and arrive early enough to walk to East Exchange Avenue before the drive.",
      "sourceUrl": "https://www.fortworthstockyards.org/stockyards-nfr-experience"
    }
  ],
  "padre-island-national-seashore": [
    {
      "question": "Do I need four-wheel drive for the remote portions of Padre Island National Seashore?",
      "answer": "Yes. NPS says four-wheel drive is required on South Beach beyond mile marker five and on other remote beach routes. Driving near the developed beach is a different risk and still depends on sand and tides.",
      "sourceUrl": "https://www.nps.gov/pais/planyourvisit/gulf-of-america.htm"
    },
    {
      "question": "Can I drive any vehicle or golf cart along the national seashore?",
      "answer": "No. NPS requires a road-registered vehicle and bans unregistered off-highway vehicles, including many golf carts, ATVs and UTVs. Applicable traffic laws continue to apply on the beach.",
      "sourceUrl": "https://www.nps.gov/pais/planyourvisit/drivingdownisland.htm"
    },
    {
      "question": "What should I watch for during sea turtle nesting season?",
      "answer": "During the April-to-August nesting period, NPS asks beach drivers to remain alert for nesting turtles and follow all seasonal restrictions while protecting dunes and vegetation.",
      "sourceUrl": "https://www.nps.gov/pais/planyourvisit/drivingdownisland.htm"
    }
  ]
};

export function applyTop50FaqWave2(destination: Destination): Destination {
  const key = destination.slug as Top50FaqWave2Slug;
  const updates = VERIFIED_FAQS[key];
  if (!updates) return destination;
  const questions = new Map<string, { question: string; answer: string; sourceUrl?: string }>();
  for (const item of [...updates, ...(destination.visitorFaqs ?? [])]) {
    const key = item.question.toLowerCase().trim();
    if (!questions.has(key)) questions.set(key, item);
  }
  return { ...destination, visitorFaqs: [...questions.values()] };
}
