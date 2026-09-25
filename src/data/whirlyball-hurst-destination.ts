import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-19";

/**
 * Canonical TexasDefined guide for the Hurst WhirlyBall / LaserWhirld location.
 * Mutable operating details stay behind first-party links so the evergreen
 * destination page does not freeze prices or hours that can change.
 */
export const whirlyballHurstDestinations: Destination[] = [
  {
    id: "attraction-whirlyball-hurst",
    brandId: "texasdefined",
    slug: "whirlyball-hurst",
    name: "WhirlyBall Hurst",
    summary: "WhirlyBall Hurst is a Tarrant County indoor attraction where teams steer bumper-style WhirlyBugs while passing a ball with hand-held scoops toward electronic scoring targets, with laser tag, arcade games and group-event space under the same roof.",
    category: "sports",
    region: "prairies-lakes",
    geography: {
      primaryRegionId: "north-texas",
      subregionIds: ["dallas-fort-worth-metroplex"],
      metroId: "dallas-fort-worth",
      countySlugs: ["tarrant"],
      travelRegionIds: ["prairies-lakes"],
    },
    nearestTown: "Hurst",
    county: "Tarrant",
    coordinates: { lat: 32.8516, lng: -97.1685 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Whirlyball.jpg?width=1600",
      alt: "Representative WhirlyBall game in Texas with players riding bumper-style cars and using scoops to pass the ball",
      width: 1600,
      height: 1200,
      credit: "BobTheMad · CC BY-SA 3.0 · Wikimedia Commons · representative WhirlyBall game photographed in Plano in 2011",
    },
    bestSeason: "Year-round. Because the main activities are indoors, WhirlyBall Hurst is especially useful for hot North Texas afternoons, rainy days, evening group outings and weather-proof birthday or team events.",
    entryNote: "The operator says WhirlyBall participants must be at least 9 years old and at least 4 feet tall. Reservations are recommended when a specific court time matters, while open-play, league, party and public-hour schedules can change; confirm the current Hurst schedule before driving.",
    highlights: [
      "WhirlyBall team game played in bumper-style WhirlyBugs",
      "Two full WhirlyBall courts",
      "Two-story LaserWhirld laser-tag arena",
      "Arcade games, party rooms and group-event options",
    ],
    body: [
      "WhirlyBall is difficult to describe with one familiar sport because the point is the combination. Players drive electrically powered WhirlyBugs around a court, control the vehicle with a hand crank and foot pedal, and use a scoop to catch, carry and pass a lightweight ball. Teams try to score by sending the ball into an elevated electronic target. The operator compares the strategy to basketball and hockey, while the scoop-and-pass action also gives the game a lacrosse-like feel. The result is one of the more unusual indoor activities in the Dallas-Fort Worth area: part bumper-car driving, part team sport and part coordination challenge.",
      "The Hurst facility matters because WhirlyBall is the main attraction rather than a small add-on inside a conventional arcade. The operator lists two large WhirlyBall courts at the Hurst location, allowing organized groups, birthday parties, corporate outings and competitive play to build the visit around the game itself. First-time players do not need to arrive with a league background; the appeal is learning the steering, passing and scoring together. The published minimum of age 9 and four feet tall is important for family planning, especially when younger siblings are part of the group.",
      "WhirlyBall Hurst also operates LaserWhirld, a two-story laser-tag arena, along with arcade games and event rooms. That gives groups a way to extend the outing beyond one court session and makes the venue more useful when different people want different levels of competition. The operator also schedules leagues and Hurst open-play periods, which can be a better fit for individuals or small groups that do not want to reserve an entire private event. Because those schedules are operational rather than permanent, check the current official pages instead of relying on an old timetable.",
      "For TexasDefined trip planning, the location is also a useful Mid-Cities anchor. Hurst sits inside Tarrant County between Fort Worth, Arlington and the DFW Airport/Grapevine corridor, so an indoor WhirlyBall session can pair naturally with a larger North Texas weekend. Families can combine it with SEA LIFE Grapevine Aquarium or the Fort Worth Zoo; sports travelers can connect it with AT&T Stadium in Arlington; and visitors who want a distinctly Fort Worth stop can continue to the Stockyards. That geography makes WhirlyBall more than a local party venue—it is an easy unusual-activity option inside a much larger Tarrant County itinerary.",
    ],
    managingAuthority: "WhirlyBall Texas",
    officialUrl: "https://whirlyballtexas.com/locations/",
    address: "147 E Harwood Rd, Hurst, TX 76054",
    directions: "Use the official Hurst street address for navigation. The venue is in the Hurst-Euless-Bedford Mid-Cities area of Tarrant County, making it practical to combine with Fort Worth, Arlington, Grapevine and DFW Airport-area stops.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro: "Use WhirlyBall as an indoor anchor for a broader Tarrant County or Mid-Cities day rather than treating Hurst as disconnected from the rest of the Metroplex.",
      nearbyAttractions: [
        { name: "SEA LIFE Grapevine Aquarium", description: "A family-focused indoor aquarium at Grapevine Mills that works well as another weather-proof stop.", proximity: "Grapevine / DFW Airport corridor", href: "/destination/sea-life-grapevine-aquarium" },
        { name: "Fort Worth Stockyards", description: "Pair the modern indoor game with Fort Worth's cattle, rail and Western-heritage district.", proximity: "Fort Worth", href: "/destination/fort-worth-stockyards" },
        { name: "AT&T Stadium", description: "Add a stadium tour or game-day stop when the outing is built around North Texas sports.", proximity: "Arlington", href: "/sports-venue/att-stadium" },
      ],
      foodAndDrink: [
        { name: "Hurst and HEB Mid-Cities dining", description: "The Harwood Road and surrounding Mid-Cities corridors provide casual dining before or after a court session.", proximity: "Hurst", href: "/city/hurst" },
      ],
      lodging: [
        { name: "Hurst-Euless-Bedford hotels", description: "The Mid-Cities location is convenient for lodging between Fort Worth attractions and DFW Airport.", proximity: "Hurst / Euless / Bedford", href: "/county/tarrant" },
      ],
      neighborhoods: [
        { name: "Hurst and the HEB Mid-Cities", description: "Use the Hurst city guide for verified local systems, schools, parks, rail access and Mid-Cities context, then continue into Tarrant County for the broader county picture.", proximity: "Hurst / Mid-Cities", href: "/city/hurst" },
      ],
      familyStops: [
        { name: "SEA LIFE Grapevine Aquarium", description: "An indoor family stop with an underwater tunnel, rescued sea turtles and marine exhibits.", proximity: "Grapevine", href: "/destination/sea-life-grapevine-aquarium" },
        { name: "Fort Worth Zoo", description: "A major Tarrant County family attraction for a longer day when the weather works.", proximity: "Fort Worth", href: "/destination/fort-worth-zoo" },
      ],
      sideTrips: [
        { name: "Fort Worth Stockyards", description: "Build a North Texas day around one unusual indoor activity and one signature Fort Worth district.", proximity: "Fort Worth", href: "/destination/fort-worth-stockyards" },
        { name: "AT&T Stadium", description: "Connect WhirlyBall with the Arlington sports-and-entertainment district.", proximity: "Arlington", href: "/sports-venue/att-stadium" },
      ],
    },
    authorityGuide: {
      whyItMatters: "WhirlyBall Hurst gives Tarrant County a genuinely unusual indoor group activity built around a proprietary bumper-car team sport, while laser tag and arcade play make the same venue useful for families, parties and corporate outings.",
      assessment: {
        recommendedVisit: "Plan about 1.5 to 3 hours for a WhirlyBall session plus laser tag or arcade time; private parties and corporate events can run longer.",
        physicalEffort: "Low to moderate",
        weatherExposure: "Mostly indoors",
        planningLevel: "Moderate",
        familyFit: "Best for families with older children because the operator publishes a minimum age of 9 and minimum height of 4 feet for WhirlyBall; laser tag and arcade play broaden the group options.",
        firstTimeValue: "Strong for visitors who want an unusual DFW group activity that is meaningfully different from a standard bowling alley, arcade or trampoline park.",
      },
      itineraries: [
        {
          label: "First WhirlyBall session",
          duration: "About 90 minutes",
          steps: [
            "Arrive early enough for check-in and the game briefing.",
            "Play the scheduled WhirlyBall session and learn the WhirlyBug steering, scoop passing and electronic-target scoring.",
            "Use the remaining time for arcade play before continuing the day in Hurst or the Mid-Cities.",
          ],
        },
        {
          label: "Competitive indoor combo",
          duration: "2–3 hours",
          steps: [
            "Start with WhirlyBall while the group is fresh and everyone can learn the court together.",
            "Add a LaserWhirld session for a second team-based activity.",
            "Finish with arcade time, food or the event-room plan attached to the group's reservation.",
          ],
        },
        {
          label: "Tarrant County indoor day",
          duration: "Half day",
          steps: [
            "Make WhirlyBall Hurst the active centerpiece of the outing.",
            "Pair it with SEA LIFE Grapevine Aquarium when the goal is an all-indoor family day.",
            "Use the Tarrant County guide to extend the trip toward Grapevine, Arlington or Fort Worth based on the group's interests.",
          ],
        },
      ],
      sources: [
        { label: "WhirlyBall Texas — locations", url: "https://whirlyballtexas.com/locations/", scope: "Current Hurst location, address, phone and location status." },
        { label: "WhirlyBall Texas — how WhirlyBall works", url: "https://whirlyballtexas.com/whirlyball/", scope: "Game format, WhirlyBug controls, scoring, courts and participant age/height requirements." },
        { label: "WhirlyBall Texas — LaserWhirld", url: "https://whirlyballtexas.com/lasertag/", scope: "Laser-tag arena description and related Hurst entertainment." },
        { label: "WhirlyBall Texas — leagues and open play", url: "https://whirlyballtexas.com/league-and-open-play-guide/", scope: "Hurst league and open-play programming." },
      ],
    },
    featured: false,
  },
];
