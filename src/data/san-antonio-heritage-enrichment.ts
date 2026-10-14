import type { Destination, DestinationAuthorityGuide } from "./types";

/** Enrich existing canonical San Antonio destination records without creating duplicate URLs.
 * Historical facts and mutable visitor access checked from official operators 2026-10-12.
 */
const sanAntonioExistingAuthority: Record<string, Partial<Destination> & { __sources: DestinationAuthorityGuide["sources"] }> = {
  "casa-navarro": {
    "summary": "Casa Navarro preserves the 1850s home and mercantile life of José Antonio Navarro, a central Tejano political leader and signer of the Texas Declaration of Independence. Its original adobe buildings reveal San Antonio's Laredito district beyond the Alamo story.",
    "hero": {
      "src": "https://commons.wikimedia.org/wiki/Special:Redirect/file/Casa%20Navarro%20State%20Historic%20Site%20in%202009.jpg?width=1600",
      "alt": "Whitewashed adobe and wood-shingle buildings at Casa Navarro State Historic Site in San Antonio",
      "width": 500,
      "height": 333,
      "credit": "TxHC · CC BY-SA 3.0 · Wikimedia Commons"
    },
    "entryNote": "Texas Historical Commission hours: Tuesday–Sunday, 10 a.m.–4:30 p.m.; closed Monday. Current listed admission: adults $5, seniors/veterans/teachers/first responders $3, ages 6–17 $2, ages 5 and under free. Family offers and special programs have their own terms; check the operator before traveling.",
    "bestSeason": "Year-round, but a fall or spring downtown walking circuit is most comfortable.",
    "address": "228 S Laredo St, San Antonio, TX 78207",
    "body": [
      "José Antonio Navarro (1795–1871) occupied this collection of adobe buildings in the 1850s and 1860s, but his career began much earlier. Born in Spanish San Antonio, he became a merchant, landowner, writer and political figure whose public life extended across the Mexican period, Texas Revolution, Republic and United States. He was one of only two native-born Texas delegates who signed the Declaration of Independence in 1836.",
      "Navarro's story challenges a historical itinerary confined to white Anglo settlers and military battles. He advocated for the rights of Tejanos within rapidly changing political systems, served in the Texas Congress, participated in constitutional debates and grappled with the consequences of annexation. His positions and class background also deserve analysis rather than treating him as an uncomplicated hero.",
      "The restored home contains small adobe structures and commercial space associated with the nineteenth-century Laredito neighborhood. The buildings' materials, plan and domestic scale matter: they reveal urban Tejano life and neighborhood economy rather than another grand civic monument. Interpret the site through merchant networks, politics, household routines and Mexican-Texan cultural continuity.",
      "A focused visit works especially well after San Fernando Cathedral and the Spanish Governor's Palace. Together they let a reader follow civic government, migration and Tejano political leadership. Check the Texas Historical Commission's current hours, admission, accessibility and tours; its historical displays can be updated independently of this editorial page."
    ],
    "highlights": [
      "1850s original adobe buildings",
      "José Antonio Navarro and Tejano politics",
      "Laredito neighborhood context",
      "Independence and early Texas constitutions"
    ],
    "accessibilityNotes": "Historic adobe buildings have different interior and courtyard surfaces; confirm current accessible entrances and interpretive options with THC.",
    "visitorFaqs": [
      {
        "question": "What is Casa Navarro?",
        "answer": "The 1850s home and associated mercantile complex of Tejano statesman José Antonio Navarro, now a state historic site.",
        "sourceUrl": "https://thc.texas.gov/historic-sites/casa-navarro"
      },
      {
        "question": "Why was Navarro significant?",
        "answer": "He was a Texas independence signer and an important Tejano leader in the Republic and early state.",
        "sourceUrl": "https://thc.texas.gov/historic-sites/casa-navarro"
      },
      {
        "question": "How much is admission?",
        "answer": "THC currently lists adults $5; seniors, veterans, teachers and first responders $3; ages 6–17 $2; ages five and under free. It also advertises a family package, so confirm current categories on the THC site.",
        "sourceUrl": "https://thc.texas.gov/historic-sites/casa-navarro"
      },
      {
        "question": "Where is it?",
        "answer": "228 South Laredo Street in downtown San Antonio's historic Laredito area.",
        "sourceUrl": "https://thc.texas.gov/historic-sites/casa-navarro"
      },
      {
        "question": "Is it near the Alamo?",
        "answer": "Both are downtown, but this is a separate neighborhood and interpretive experience.",
        "sourceUrl": "https://thc.texas.gov/historic-sites/casa-navarro"
      }
    ],
    "__sources": [
      {
        "label": "Texas Historical Commission site and hours",
        "url": "https://thc.texas.gov/historic-sites/casa-navarro",
        "scope": "Primary site history and current visitor policy"
      },
      {
        "label": "Texas State Historical Association Navarro biography",
        "url": "https://www.tshaonline.org/handbook/entries/navarro-jose-antonio",
        "scope": "Primary site history and current visitor policy"
      }
    ]
  },
  "spanish-governors-palace-san-antonio": {
    "body": [
      "The Spanish Governor's Palace is a rare surviving stone residence associated with the colonial Presidio San Antonio de Béxar. Its traditional name can mislead: San Antonio was not the capital residence of a modern state governor here. It served high-ranking presidio and administrative officials. Architecture, courtyard and room layout preserve the texture of the Spanish colonial town.",
      "The carved keystone traditionally bearing the date 1749 helps date part of the historic building, but visitors should not assume every wall and furnishing survives unchanged from the 1740s. Preservation, later additions and curated interior rooms shaped what is visible today. The building's significance lies in the layered survival of the colonial residential and official setting.",
      "Its placement near Plaza de Armas and Main Plaza matters as much as decorative detail. Compare the palace with San Fernando Cathedral and the Bexar County Courthouse to see how changing political systems used related public spaces over two centuries. This is a compact downtown site, not a self-contained full-day attraction.",
      "The City manages the historic house with its own admission, closures and sometimes special events. Confirm the current entry arrangement and accessible paths independently, and distinguish the courtyard and ground-floor viewing from any interior area that may be temporarily restricted."
    ],
    "accessibilityNotes": "An eighteenth-century house has historic thresholds and paving; contact the City for current accessible visitor routes.",
    "visitorFaqs": [
      {
        "question": "Was a Spanish governor actually based here?",
        "answer": "The building is known by that historic name, but interpretation describes the local presidio commandant and royal administrative officials rather than a separate modern gubernatorial mansion.",
        "sourceUrl": "https://www.sanantonio.gov/governorspalace/"
      },
      {
        "question": "When was it built?",
        "answer": "The historic property is associated with an eighteenth-century building phase and a 1749 carved date.",
        "sourceUrl": "https://www.sanantonio.gov/governorspalace/"
      },
      {
        "question": "How far is it from Main Plaza?",
        "answer": "It is close enough to include in the same downtown civic-architecture walk.",
        "sourceUrl": "https://www.sanantonio.gov/governorspalace/"
      },
      {
        "question": "Who operates it?",
        "answer": "The City of San Antonio.",
        "sourceUrl": "https://www.sanantonio.gov/governorspalace/"
      },
      {
        "question": "Does it charge admission?",
        "answer": "Yes. The City lists adults $6, seniors (60+) and military $4, children 7–13 $3, and children under 7 free; rates may change.",
        "sourceUrl": "https://www.sanantonio.gov/governorspalace/"
      },
      {
        "question": "What are the visitor hours?",
        "answer": "The City lists Tuesday–Saturday 9 a.m.–5 p.m., Sunday 10 a.m.–5 p.m., and Monday closed. Verify special closures before arrival.",
        "sourceUrl": "https://www.sanantonio.gov/governorspalace/"
      }
    ],
    "__sources": [
      {
        "label": "City of San Antonio palace visitor page",
        "url": "https://www.sanantonio.gov/governorspalace/",
        "scope": "Primary site history and current visitor policy"
      },
      {
        "label": "Texas Historical Commission San Antonio route",
        "url": "https://thc.texas.gov/blog/historic-road-trip-san-antonio",
        "scope": "Primary site history and current visitor policy"
      }
    ],
    "entryNote": "The City currently lists Tuesday–Saturday, 9 a.m.–5 p.m.; Sunday, 10 a.m.–5 p.m.; closed Monday. General admission $6, seniors (60+) or military $4, children 7–13 $3 and under 7 free. Check current city hours, rates and accessible entry before visiting."
  },
  "king-william-historic-district": {
    "body": [
      "King William Historic District is an inhabited Southtown neighborhood whose nineteenth-century houses reveal the growth of German-Texan commercial families and San Antonio's changing riverfront. The district was included in the National Register of Historic Places in 1972; a walk here is a chance to compare several architectural movements rather than admire a single elaborate mansion.",
      "Greek Revival, Italianate and Victorian-era designs coexist in a neighborhood shaped by the city's river and later preservation. House styles do not map neatly onto one ethnicity; wealth, trade connections and successive owners also influenced what was built and remodeled. The individual properties are best read within the surrounding historic district.",
      "The surviving residential streets also tell a preservation story. Walter Nold Mathis purchased and restored Villa Finale in the 1960s and helped galvanize wider neighborhood interest. Other properties had different outcomes. Critically, the Conservation Society sold Steves Homestead in 2022; tourist information portraying it as an operating museum is now outdated unless a current property operator confirms new public tours.",
      "Use public sidewalks and observe residential privacy. For a verified interior experience, check Villa Finale's guided-tour schedule. Guenther House offers dining and historical interpretation, but restaurant access is not the same as an unrestricted house tour. Pair these with the wider downtown civic sites for a contrast between private business wealth and colonial government."
    ],
    "accessibilityNotes": "Use public sidewalks and verify modern accessible public entrances for specific house museums, which may have historic-floor limitations.",
    "visitorFaqs": [
      {
        "question": "Are King William houses open to tour?",
        "answer": "Most are private homes; Villa Finale is a separate historic-house museum with published visitor programs.",
        "sourceUrl": "https://www.sanantonio.gov/Mission-Trails/Mission-Trails-Historic-Sites/Historic-Districts-Neighborhoods/King-William-Historic-District/King-William-Historic-District-Expanded"
      },
      {
        "question": "Is Steves Homestead open?",
        "answer": "Its former public museum was sold in 2022; do not assume current interior access.",
        "sourceUrl": "https://www.sanantonio.gov/Mission-Trails/Mission-Trails-Historic-Sites/Historic-Districts-Neighborhoods/King-William-Historic-District/King-William-Historic-District-Expanded"
      },
      {
        "question": "Is it walkable?",
        "answer": "Yes, public streets and sidewalks provide a neighborhood architecture route; distances vary by itinerary.",
        "sourceUrl": "https://www.sanantonio.gov/Mission-Trails/Mission-Trails-Historic-Sites/Historic-Districts-Neighborhoods/King-William-Historic-District/King-William-Historic-District-Expanded"
      },
      {
        "question": "What historical periods does it reflect?",
        "answer": "Primarily nineteenth-century residential growth and twentieth-century preservation.",
        "sourceUrl": "https://www.sanantonio.gov/Mission-Trails/Mission-Trails-Historic-Sites/Historic-Districts-Neighborhoods/King-William-Historic-District/King-William-Historic-District-Expanded"
      },
      {
        "question": "Is King William the same as La Villita?",
        "answer": "No. They are distinct districts with different histories, though they can be linked by a downtown walk.",
        "sourceUrl": "https://www.sanantonio.gov/Mission-Trails/Mission-Trails-Historic-Sites/Historic-Districts-Neighborhoods/King-William-Historic-District/King-William-Historic-District-Expanded"
      }
    ],
    "__sources": [
      {
        "label": "City of San Antonio King William district",
        "url": "https://www.sanantonio.gov/Mission-Trails/Mission-Trails-Historic-Sites/Historic-Districts-Neighborhoods/King-William-Historic-District/King-William-Historic-District-Expanded",
        "scope": "Primary site history and current visitor policy"
      },
      {
        "label": "Conservation Society Steves status",
        "url": "https://www.saconservation.org/who-we-are-2/saved-properties/",
        "scope": "Primary site history and current visitor policy"
      },
      {
        "label": "Villa Finale visitor programs",
        "url": "https://villafinale.org/visit/",
        "scope": "Primary site history and current visitor policy"
      }
    ],
    "entryNote": "King William is a lived-in historic residential district. Public sidewalks provide a self-guided architecture walk; houses and yards are predominantly private. Paid indoor access applies only where a separate operator, such as Villa Finale, explicitly advertises public visiting."
  },
  "villa-finale-museum-gardens-san-antonio": {
    "hero": {
      "src": "https://commons.wikimedia.org/wiki/Special:Redirect/file/Norton%20polk%20mathis%20house%202014.jpg?width=1600",
      "alt": "Villa Finale Norton-Polk-Mathis historic mansion in King William, San Antonio",
      "width": 1600,
      "height": 1067,
      "credit": "Larry D. Moore · CC BY 4.0 · Wikimedia Commons"
    },
    "accessibilityNotes": "Guided house access and garden paths may differ; contact the museum for current step-free route or accommodation needs.",
    "visitorFaqs": [
      {
        "question": "Can I tour the rooms of Villa Finale?",
        "answer": "Yes. The museum advertises self-guided QR-code house tours Tuesday–Saturday between 10 a.m. and 4 p.m., last admission 3:30 p.m.; an additional paid guided option is listed for Thursdays at 3:30 p.m.",
        "sourceUrl": "https://villafinale.org/visit/"
      },
      {
        "question": "Who was Walter Nold Mathis?",
        "answer": "He was a preservationist and owner whose work helped restore the house and strengthen King William's preservation movement.",
        "sourceUrl": "https://villafinale.org/visit/"
      },
      {
        "question": "What is the house's original name?",
        "answer": "The Norton-Polk-Mathis House.",
        "sourceUrl": "https://villafinale.org/visit/"
      },
      {
        "question": "When was it first built?",
        "answer": "Its first major construction phase dates to 1876.",
        "sourceUrl": "https://villafinale.org/visit/"
      },
      {
        "question": "Are gardens always open?",
        "answer": "No. The operator lists free public garden access Tuesday–Saturday, 10 a.m.–4 p.m.; holidays and events can change that schedule.",
        "sourceUrl": "https://villafinale.org/visit/"
      },
      {
        "question": "How much does Villa Finale admission cost?",
        "answer": "The operator lists $12 adult/$10 senior, military or student for self-guided house visits; guided Thursday tours cost $15 adult/$12 eligible concessions. Children under five are free and gardens are free during public hours.",
        "sourceUrl": "https://villafinale.org/visit/"
      }
    ],
    "__sources": [
      {
        "label": "Villa Finale official museum",
        "url": "https://villafinale.org/visit/",
        "scope": "Primary site history and current visitor policy"
      },
      {
        "label": "National Trust for Historic Preservation property",
        "url": "https://savingplaces.org/places/villa-finale",
        "scope": "Primary site history and current visitor policy"
      }
    ],
    "entryNote": "Current operator schedule: Tuesday–Saturday, 10 a.m.–4 p.m. (last house admission sold 3:30 p.m.). Self-guided house tickets $12 adults or $10 seniors/military/students; Thursday guided tour at 3:30 p.m. is priced separately. Gardens are free during public hours. Verify special-event/holiday closures before visiting."
  },
  "the-alamo": {
    "visitorFaqs": [
      {
        "question": "Is the Alamo one of the five UNESCO missions?",
        "answer": "Yes, it is Mission San Antonio de Valero, included in the UNESCO cultural landscape but managed separately from the four NPS mission districts.",
        "sourceUrl": "https://www.thealamo.org/visit"
      },
      {
        "question": "Do I need a ticket?",
        "answer": "The Alamo requires a reservation for the free Church visit. Other exhibits, guided tours and experiences may require paid tickets and separate time slots. Verify directly with the Alamo.",
        "sourceUrl": "https://www.thealamo.org/visit"
      },
      {
        "question": "Is it only about the 1836 battle?",
        "answer": "No. It was a Spanish mission decades before the battle and has a long Indigenous, religious and preservation history.",
        "sourceUrl": "https://www.thealamo.org/visit"
      },
      {
        "question": "Can I visit the NPS missions on the same day?",
        "answer": "It is possible by car, but plan a longer day and verify programs and seasonal access.",
        "sourceUrl": "https://www.thealamo.org/visit"
      }
    ],
    "__sources": [
      {
        "label": "The Alamo official visitor information",
        "url": "https://www.thealamo.org/visit",
        "scope": "Primary site history and current visitor policy"
      },
      {
        "label": "UNESCO San Antonio Missions inscription",
        "url": "https://whc.unesco.org/en/list/1466/",
        "scope": "Primary site history and current visitor policy"
      },
      {
        "label": "National Park Service mission context",
        "url": "https://www.nps.gov/saan/index.htm",
        "scope": "Primary site history and current visitor policy"
      }
    ],
    "entryNote": "Alamo Church admission is free but currently requires a reservation. The Alamo Exhibit, guided tours and other experiences have separate ticket policies and possible charges. The operator advertises daily site hours 9 a.m.–5:30 p.m., with its collections center closing 5 p.m.; verify the reservation and current construction/access notices."
  },
  "san-antonio-missions-national-historical-park": {
    "accessibilityNotes": "NPS reports varying accessible paths across the mission sites; verify individual mission interior access and ranger programming. Historic paving and church access may differ from paved visitor approaches.",
    "visitorFaqs": [
      {
        "question": "Which four sites are managed by NPS?",
        "answer": "Mission Concepción, Mission San José, Mission San Juan Capistrano and Mission Espada.",
        "sourceUrl": "https://www.nps.gov/saan/planyourvisit/index.htm"
      },
      {
        "question": "Is the Alamo inside the national historical park?",
        "answer": "No. It is separately administered, although all five missions make up the UNESCO inscription.",
        "sourceUrl": "https://www.nps.gov/saan/planyourvisit/index.htm"
      },
      {
        "question": "Where is the visitor center?",
        "answer": "The principal NPS visitor center is at Mission San José.",
        "sourceUrl": "https://www.nps.gov/saan/planyourvisit/index.htm"
      },
      {
        "question": "Is admission free?",
        "answer": "Yes, there is no standard entry charge to NPS mission grounds and interpretation.",
        "sourceUrl": "https://www.nps.gov/saan/planyourvisit/index.htm"
      },
      {
        "question": "Are all park sites open the same hours?",
        "answer": "No. Grounds, buildings, active church interiors and ranger programs have differing operating schedules.",
        "sourceUrl": "https://www.nps.gov/saan/planyourvisit/index.htm"
      }
    ],
    "__sources": [
      {
        "label": "National Park Service visiting information",
        "url": "https://www.nps.gov/saan/planyourvisit/index.htm",
        "scope": "Primary site history and current visitor policy"
      },
      {
        "label": "NPS hours by site",
        "url": "https://www.nps.gov/saan/planyourvisit/hours.htm",
        "scope": "Primary site history and current visitor policy"
      },
      {
        "label": "UNESCO San Antonio Missions",
        "url": "https://whc.unesco.org/en/list/1466/",
        "scope": "Primary site history and current visitor policy"
      }
    ],
    "entryNote": "NPS currently lists interpretive park hours 9 a.m.–5 p.m. daily, outdoor mission grounds sunrise to sunset, and Thanksgiving, Christmas and New Year's Day closures. Active church services, temporary access restrictions and ranger programs operate separately. The four NPS missions have no standard admission charge."
  }
};

export function enrichSanAntonioHeritageAuthority(destination: Destination): Destination {
  const more = sanAntonioExistingAuthority[destination.slug];
  if (!more) return destination;
  const { __sources, ...overrides } = more;
  const prior = destination.authorityGuide;
  const authorityGuide: DestinationAuthorityGuide = prior
    ? { ...prior, sources: [...prior.sources, ...__sources].filter((source, index, arr) => arr.findIndex((entry) => entry.url === source.url) === index) }
    : {
      whyItMatters: overrides.summary ?? destination.summary,
      assessment: { recommendedVisit: "45–120 minutes, depending on programs and access", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Appropriate for an architecture/history-focused visit; check site accessibility", firstTimeValue: "Part of a complete San Antonio historic-tour route" },
      itineraries: [
        { label: "Historic focus", duration: "60–90 minutes", steps: ["Confirm current official operator access", "Examine the distinct historical features", "Read the interpretation beyond its best-known event"] },
        { label: "Downtown and King William", duration: "Half day", steps: ["Explore nearby historic streets", "Compare the city's different periods", "Visit related interpretation where publicly accessible"] },
        { label: "Complete San Antonio heritage", duration: "Two days", steps: ["Tour the downtown civics and Tejano sites", "Explore King William preservation", "Visit the four NPS mission districts"] },
      ],
      sources: __sources,
    };
  return { ...destination, ...overrides, authorityGuide, sourceCheckedAt: "2026-10-12" };
}
