/**
 * Small, intentionally selective tourism collections; verified against official operator
 * sites October 19, 2026. This is not an exhaustive business directory.
 * Historic Jefferson Railway is intentionally excluded after its operator announced retirement.
 */
export const CURATED_TOURISM_COLLECTIONS = [
  {
    "slug": "scenic-trains",
    "title": "Scenic Train Rides & Heritage Railroads in Texas",
    "eyebrow": "Rail journeys · history · family day trips",
    "intro": "Texas offers a small number of passenger excursions where the ride itself is the destination. These are bookable heritage experiences, not regular transportation between cities. Choose by departure point, excursion length and date rather than assuming every route runs daily.",
    "selection": "Operating passenger excursion programs with a confirmed operator website. Retired or museum-only railroads are not presented as currently bookable train rides.",
    "tips": [
      "Check the operator's published calendar, not a general attraction listing; many runs are seasonal or special-event only.",
      "Verify the actual boarding depot, train type, accessibility and return time before buying tickets.",
      "For overnight itineraries, explore the county guide for the departure town."
    ],
    "items": [
      {
        "name": "Texas State Railroad",
        "town": "Palestine / Rusk",
        "countySlug": "anderson",
        "why": "The signature East Texas Piney Woods excursion links two historic railroad communities. Steam and diesel service varies by scheduled excursion, and special-event trains may have different ticket rules.",
        "plan": "Choose a specific train on the operator calendar before planning a drive to Palestine or Rusk; confirm which depot hosts your departure.",
        "officialUrl": "https://texasstaterailroad.net/"
      },
      {
        "name": "Grapevine Vintage Railroad",
        "town": "Grapevine",
        "countySlug": "tarrant",
        "why": "A heritage rail experience in the Dallas–Fort Worth area with excursions and seasonal rides associated with historic Grapevine.",
        "plan": "Compare the standard excursion with holiday programming, as departure points, schedules and ticket availability can differ.",
        "officialUrl": "https://www.grapevinetexasusa.com/gvrr/"
      },
      {
        "name": "Austin Steam Train Association",
        "town": "Cedar Park",
        "countySlug": "williamson",
        "why": "Vintage rail excursions depart from the Cedar Park and surrounding Hill Country rail corridor, with a mix of sightseeing and themed trips.",
        "plan": "Check your ticket for the actual boarding depot. Certain trips can depart from Cedar Park or Bertram, and the railroad is not open for casual yard tours.",
        "officialUrl": "https://www.austinsteamtrain.org/"
      }
    ]
  },
  {
    "slug": "dude-ranches",
    "title": "Texas Dude Ranches & Cowboy Vacations",
    "eyebrow": "Western stays · horseback riding · Texas ranch life",
    "intro": "Ranch vacations range from all-inclusive horse-focused guest ranches to upscale ranch resorts. This shortlist deliberately distinguishes the classic dude-ranch experience from resorts that happen to sit on ranchland, so visitors can choose the style of stay they want.",
    "selection": "Established destination ranch stays with an operator-run site and a clear overnight guest program; no exhaustive listing of working farms or generic vacation rentals.",
    "tips": [
      "Ask whether horseback riding, meals and activities are included or charged separately.",
      "Confirm minimum-night stays, riding age and weight rules, and activity availability before reserving.",
      "Choose Bandera for a classic cowboy-country trip; luxury ranch resorts can be a substantially different experience."
    ],
    "items": [
      {
        "name": "Dixie Dude Ranch",
        "town": "Bandera",
        "countySlug": "bandera",
        "why": "A traditional guest ranch with working-ranch roots, horseback rides, home-cooked meals and cabins in the Hill Country.",
        "plan": "The operator publishes minimum-stay requirements and riding restrictions; verify current packages before committing to dates.",
        "officialUrl": "https://dixieduderanch.com/"
      },
      {
        "name": "Mayan Dude Ranch",
        "town": "Bandera",
        "countySlug": "bandera",
        "why": "A family-oriented Bandera ranch vacation built around scenic trails, horseback riding, entertainment and shared cowboy meals.",
        "plan": "Review seasonal activity schedules, riding policies and accommodation options before choosing a room.",
        "officialUrl": "https://newsite.mayanranch.com/"
      },
      {
        "name": "Flying L Ranch Resort",
        "town": "Bandera",
        "countySlug": "bandera",
        "why": "A Western-themed ranch resort and golf getaway. It belongs in the wider ranch-vacation comparison but should not be mistaken for a traditional all-inclusive horse-riding dude ranch.",
        "plan": "Check the resort's current activity list and whether the particular Western experience you want is offered during your stay.",
        "officialUrl": "https://flyingl.com/"
      },
      {
        "name": "JL Bar Ranch, Resort & Spa",
        "town": "Sonora area",
        "countySlug": "sutton",
        "why": "A luxury ranch-resort retreat pairing wide-open West Texas land, guided activities, accommodations and spa services.",
        "plan": "Treat this as a premium ranch resort rather than a rustic dude ranch; confirm which experiences are included in the selected lodging package.",
        "officialUrl": "https://jlbar.com/"
      }
    ]
  },
  {
    "slug": "spa-retreats",
    "title": "Texas Spa Resorts & Wellness Retreats",
    "eyebrow": "Spa escapes · relaxation · overnight getaways",
    "intro": "Some destinations are purpose-built overnight wellness retreats; others are city hotels with destination-quality spas. Comparing them on the same page is useful only if those distinctions are clear, especially because day-spa access does not always include resort amenities.",
    "selection": "A deliberately short selection of Texas properties with substantial operator-confirmed spa or wellness programming—not every hotel with a massage room.",
    "tips": [
      "Confirm whether treatments, meals and activities are included in the room rate or billed separately.",
      "For a day spa visit, check whether non-overnight guests may book and which amenities are included.",
      "Book popular treatment times in advance and check age restrictions or cancellation windows."
    ],
    "items": [
      {
        "name": "Miraval Austin Resort & Spa",
        "town": "Austin",
        "countySlug": "travis",
        "why": "A wellness-focused Hill Country retreat built around mindfulness activities, spa services, classes and inclusive lodging packages.",
        "plan": "This property also offers select day packages; verify adult age requirements, inclusions and package-specific credits directly.",
        "officialUrl": "https://www.miravalresorts.com/austin"
      },
      {
        "name": "Lake Austin Spa Resort",
        "town": "Austin",
        "countySlug": "travis",
        "why": "An adults-focused lakeside wellness resort combining overnight accommodations, dining, spa facilities and lake activities.",
        "plan": "Confirm what is included in an overnight package, and reserve separately if seeking one of the limited day-spa appointments.",
        "officialUrl": "https://www.lakeaustin.com/"
      },
      {
        "name": "Mokara Hotel & Spa",
        "town": "San Antonio",
        "countySlug": "bexar",
        "why": "A downtown River Walk hotel with a full-service spa, ideal for travelers who want an urban hotel break rather than an immersive retreat.",
        "plan": "Book treatments independently of lodging and check the spa's current policies, service menu and opening hours.",
        "officialUrl": "https://www.omnihotels.com/hotels/san-antonio-mokara/spa"
      },
      {
        "name": "The Joule",
        "town": "Dallas",
        "countySlug": "dallas",
        "why": "An urban luxury hotel whose dedicated spa pairs well with a downtown Dallas weekend of art, dining and architecture.",
        "plan": "Compare hotel reservations and separate spa bookings; a room reservation should not be assumed to guarantee a treatment appointment.",
        "officialUrl": "https://www.thejouledallas.com/"
      }
    ]
  },
  {
    "slug": "wildlife-safaris",
    "title": "Texas Drive-Through Safari & Wildlife Parks",
    "eyebrow": "Wildlife viewing · conservation · family trips",
    "intro": "Drive-through wildlife experiences vary widely: some put conservation and endangered-species work first, while others emphasize interactive animal encounters. This collection favors established visitor operations and makes the vehicle, feeding and animal-welfare rules part of the planning decision.",
    "selection": "Purpose-built drive-through or guided safari experiences with confirmed visitor information—not every zoo, rescue sanctuary or private exotic-animal ranch.",
    "tips": [
      "Follow the attraction's rules on vehicle windows, feeding and remaining inside your car.",
      "Animal encounters are unpredictable; weather and welfare needs can change visibility and route access.",
      "Some operators require advance reservations for self-drive entry even if guided tours can be bought on site."
    ],
    "items": [
      {
        "name": "Fossil Rim Wildlife Center",
        "town": "Glen Rose",
        "countySlug": "somervell",
        "destinationSlug": "fossil-rim-wildlife-center",
        "why": "A nonprofit conservation center with a scenic driving route and guided experiences among wildlife habitats near Glen Rose.",
        "plan": "Allow ample time for the drive and overlook; book ahead, follow vehicle rules and note that pets are not allowed.",
        "officialUrl": "https://fossilrim.org/"
      },
      {
        "name": "Natural Bridge Wildlife Ranch",
        "town": "New Braunfels area",
        "countySlug": "comal",
        "destinationSlug": "natural-bridge-wildlife-ranch",
        "why": "A drive-through safari experience in Hill Country ranchland near Natural Bridge Caverns, making a convenient family day-trip pairing.",
        "plan": "Check current vehicle, animal-feeding and ticket policies; leave extra time on busy weekends.",
        "officialUrl": "https://www.wildliferanchtexas.com/"
      },
      {
        "name": "Exotic Resort Zoo",
        "town": "Johnson City",
        "countySlug": "blanco",
        "destinationSlug": "exotic-resort-zoo",
        "why": "A family-operated safari property offering guided tractor tours, a reserved self-drive option and safari-style cabins.",
        "plan": "The operator recommends advance drive-through booking and distinguishes it from its guided tour; decide which experience fits your group.",
        "officialUrl": "https://www.zooexotics.com/"
      }
    ]
  },
  {
    "slug": "botanical-gardens",
    "title": "Destination Botanical Gardens & Arboretums in Texas",
    "eyebrow": "Garden trails · seasonal blooms · horticulture",
    "intro": "These are major gardens worth planning a trip around, not every landscaped city park. Each offers a distinct experience—from immersive seasonal display gardens to native-plant landscapes and botanical research—so the best choice depends on travel season and personal interests.",
    "selection": "Established public-facing botanical gardens with major collections and maintained visitor information; ordinary neighborhood gardens are excluded.",
    "tips": [
      "Flowering seasons depend on rainfall, temperatures and horticultural calendars, not fixed dates.",
      "Reserve timed tickets and parking for major seasonal displays when required.",
      "Check mobility and heat conditions: garden visits often involve significant outdoor walking."
    ],
    "items": [
      {
        "name": "Dallas Arboretum and Botanical Garden",
        "town": "Dallas",
        "countySlug": "dallas",
        "destinationSlug": "dallas-arboretum-and-botanical-garden",
        "why": "A major White Rock Lake garden with elaborate seasonal displays, formal landscapes and family programming.",
        "plan": "Book tickets and parking around headline spring or fall events and leave time for lakeside viewpoints.",
        "officialUrl": "https://www.dallasarboretum.org/"
      },
      {
        "name": "Fort Worth Botanic Garden",
        "town": "Fort Worth",
        "countySlug": "tarrant",
        "destinationSlug": "fort-worth-botanic-garden",
        "why": "A multi-garden attraction with Japanese, rose and native-plant areas near Fort Worth's Cultural District.",
        "plan": "Check admission, conservatory status and event closures before combining the gardens with nearby museums.",
        "officialUrl": "https://fwbg.org/"
      },
      {
        "name": "Lady Bird Johnson Wildflower Center",
        "town": "Austin",
        "countySlug": "travis",
        "destinationSlug": "lady-bird-johnson-wildflower-center",
        "why": "A native-plant conservation and education landscape showing how Texas wildflowers, grasses and ecological design work together.",
        "plan": "Spring bloom is weather-dependent; the trails and habitat exhibits make visits worthwhile beyond bluebonnet season.",
        "officialUrl": "https://www.wildflower.org/"
      },
      {
        "name": "San Antonio Botanical Garden",
        "town": "San Antonio",
        "countySlug": "bexar",
        "why": "A major city botanical garden with changing horticultural displays, plant collections and educational programming.",
        "plan": "Review timed admissions, seasonal events and the garden's current visitor guidance before traveling.",
        "officialUrl": "https://sabgtx.org/"
      },
      {
        "name": "Houston Botanic Garden",
        "town": "Houston",
        "countySlug": "harris",
        "why": "A destination garden with themed displays and nature landscapes near Sims Bayou, providing a different outdoor experience from Houston's museum attractions.",
        "plan": "Check current entry, events and heat-sensitive visiting hours; weekday and morning visits may offer a different experience from festivals.",
        "officialUrl": "https://hbg.org/"
      }
    ]
  }
] as const;

export type CuratedTourismCollection = (typeof CURATED_TOURISM_COLLECTIONS)[number];
export type CuratedTourismSlug = (typeof CURATED_TOURISM_COLLECTIONS)[number]["slug"];

export function getCuratedTourismCollection(slug: string) {
  return CURATED_TOURISM_COLLECTIONS.find((collection) => collection.slug === slug);
}
