import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-20";

export const lbjBoyhoodHomeDestinations: Destination[] = [
  {
    id: "historic-lbj-boyhood-home-johnson-city",
    brandId: "texasdefined",
    slug: "lbj-boyhood-home-johnson-city",
    name: "Lyndon B. Johnson Boyhood Home",
    summary:
      "The LBJ Boyhood Home in Johnson City preserves the modest house where Lyndon Johnson lived from age five through his school years, with free daily National Park Service programs interpreting the 1920s household, family life and early political influences of the future 36th president.",
    category: "historic-sites",
    region: "hill-country",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["texas-hill-country"],
      gatewaySubregionIds: ["austin-area"],
      countySlugs: ["blanco"],
      travelRegionIds: ["hill-country"],
      relocationPresentationLabels: ["Austin & Central Texas", "San Antonio & Hill Country"],
    },
    nearestTown: "Johnson City",
    county: "Blanco",
    coordinates: { lat: 30.27583, lng: -98.41054 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/LBJ%20Boyhood%20Home%20Johnson%20City%20Texas%202016.jpg?width=1600",
      alt: "Lyndon B. Johnson Boyhood Home in Johnson City, Texas",
      width: 2667,
      height: 1500,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    },
    bestSeason:
      "Fall through spring for the most comfortable house and grounds visit. Summer is still worthwhile, but the restored 1920s home has no air conditioning and NPS may limit interior programs when temperatures become unsafe.",
    entryNote:
      "National Park Service Boyhood Home programs are free. The current schedule lists daily programs at 10:30 a.m., 11:30 a.m. and 1:30 p.m. through May 31, 2027. Meet at the Johnson City NPS Visitor Center at 100 Ladybird Lane rather than going directly to the house for a tour. The nearly two-acre grounds and exterior porches remain available outside program times, subject to park conditions.",
    highlights: [
      "Free daily National Park Service Boyhood Home programs",
      "Restored early-to-mid-1920s household interpretation",
      "Home of Lyndon Johnson from age five through his Johnson City school years",
      "Johnson family dining room associated with political discussion and debate",
      "Nearly two acres of historic grounds and exterior porches",
      "Walkable from the Johnson City NPS Visitor Center and downtown courthouse square",
      "Easy pairing with the Johnson Settlement and broader LBJ National Historical Park",
    ],
    body: [
      "The LBJ Boyhood Home is the most personal historic site in Johnson City's presidential-history cluster. Lyndon Johnson's family moved from a farm near Stonewall to Johnson City in September 1913, two weeks after his fifth birthday, and this house remained the family's home for most of the next twenty-four years.",
      "The National Park Service furnishes the home to the early-to-mid-1920s period, focusing on the years when Johnson was growing up in a small Hill Country town. The interpretation is deliberately domestic: rooms, furniture, household routines and family stories help explain the environment that shaped him before college, teaching, Congress and the presidency.",
      "The dining room carries particular interpretive weight. NPS describes it as a place where the Johnson family discussed politics and where young Lyndon learned to debate. His father, Sam Ealy Johnson Jr., served in the Texas Legislature, so public affairs were part of family life rather than a subject Johnson discovered only after leaving home.",
      "A visit starts at the National Park Service Visitor Center on Ladybird Lane. Current Boyhood Home programs are free and run daily at 10:30 a.m., 11:30 a.m. and 1:30 p.m. Visitors should meet at the visitor center, where staff lead the program rather than assuming the house operates as an independent walk-in museum.",
      "The restored home has no modern air-conditioning system because NPS preserves its 1920s character. During June, July and August, interior temperatures can become high enough that tours are limited for safety. Summer visitors who specifically want to enter the house should favor the earliest available program and confirm conditions with park staff.",
      "The exterior is still worth seeing when an interior program is unavailable. NPS says the nearly two-acre grounds are open and visitors can experience the house from its exterior porches. The property also sits inside a compact Johnson City history district, making it easy to combine with the visitor center, Johnson Settlement and downtown.",
      "The Boyhood Home should be understood as one part of a two-district national historical park. The Johnson City district covers the visitor center, Boyhood Home and Johnson Settlement; the LBJ Ranch district lies about 14 miles west near Stonewall. A full LBJ day can connect childhood, family ranching roots and the presidential ranch, but each district has its own operating details.",
      "For travelers who have already seen the LBJ Ranch, the Boyhood Home adds a different scale to the story. The ranch explains Johnson's adult identity and presidency; the Johnson City house explains the household, town and family conversations that preceded them.",
    ],
    managingAuthority: "National Park Service — Lyndon B. Johnson National Historical Park",
    officialUrl: "https://www.nps.gov/lyjo/planyourvisit/visitboyhoodhome.htm",
    address: "Meet at NPS Visitor Center, 100 Ladybird Lane, Johnson City, TX 78636",
    directions:
      "For guided Boyhood Home programs, park at the Lyndon B. Johnson National Historical Park Visitor Center at 100 Ladybird Lane in Johnson City. From U.S. 290, follow the NPS directions to Avenue F and Ladybird Lane; the visitor center is a short walk from the historic house.",
    accessibilityNotes:
      "NPS describes the Boyhood Home programs as accessible. The Johnson City visitor-center area uses relatively level concrete sidewalks, and wheelchairs and walkers are available to borrow at the visitor center. Contact the park before travel if your visit depends on a specific interior-route accommodation.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Use the Boyhood Home as the center of a walkable Johnson City history block, then decide whether to continue through the Johnson Settlement or drive west toward the LBJ Ranch and Stonewall corridor.",
      nearbyAttractions: [
        {
          name: "Lyndon B. Johnson National Historical Park — Johnson City District",
          description:
            "The visitor center and Johnson Settlement expand the Boyhood Home into a broader story of the Johnson family and nineteenth-century Hill Country settlement.",
          proximity: "Walkable",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
        {
          name: "Science Mill",
          description:
            "Johnson City's hands-on STEM museum provides a substantial family stop within the same downtown area.",
          proximity: "Downtown Johnson City",
          href: "/destination/science-mill-johnson-city",
        },
        {
          name: "Texas Vintage Motorcycle Museum",
          description:
            "A collection of more than 100 vintage motorcycles inside a restored 1930s Ford dealership adds a very different layer of local history.",
          proximity: "Downtown Johnson City",
          href: "/destination/texas-vintage-motorcycle-museum-johnson-city",
        },
      ],
      foodAndDrink: [
        {
          name: "Downtown Johnson City",
          description:
            "Restaurants, cafes, tasting rooms and the courthouse-square cluster are easy to combine with a morning or midday NPS program.",
          proximity: "Walkable",
          href: "/destination/johnson-city",
        },
        {
          name: "Pecan Street Brewing",
          description:
            "A downtown brewpub with food, house-brewed beer and live events near the courthouse square.",
          proximity: "Downtown Johnson City",
          href: "/destination/pecan-street-brewing-johnson-city",
        },
      ],
      lodging: [
        {
          name: "Johnson City",
          description:
            "Staying in town keeps the Boyhood Home, Science Mill, downtown dining and evening events within a compact radius.",
          proximity: "In town",
          href: "/destination/johnson-city",
        },
      ],
      neighborhoods: [
        {
          name: "Johnson City historic core",
          description:
            "The Boyhood Home, NPS visitor center, courthouse square, museums and restaurants form a compact central visitor district.",
          proximity: "At the site",
          href: "/destination/johnson-city",
        },
      ],
      familyStops: [
        {
          name: "Johnson Settlement",
          description:
            "The one-mile settlement trail adds cabins, ranching history and the story of Johnson's grandparents to the Boyhood Home visit.",
          proximity: "Same NPS district",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
        {
          name: "Science Mill",
          description:
            "Use Science Mill as the hands-on indoor companion to the more interpretive historic-home experience.",
          proximity: "Downtown Johnson City",
          href: "/destination/science-mill-johnson-city",
        },
      ],
      sideTrips: [
        {
          name: "LBJ Ranch",
          description:
            "Continue about 14 miles west to the ranch district near Stonewall for Johnson's adult ranch and presidential-history landscape.",
          proximity: "Stonewall corridor",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
        {
          name: "LBJ State Park & Sauer-Beckmann Farm",
          description:
            "The adjacent state park near Stonewall adds German-Texan living history, longhorns, bison and the Pedernales River landscape.",
          proximity: "Near the LBJ Ranch",
          href: "/destination/lyndon-b-johnson-state-park-and-historic-site",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "The Boyhood Home isolates the formative Johnson City years within the much larger LBJ story, showing how family life, small-town Texas and a politically active household shaped the future president before his national career.",
      assessment: {
        recommendedVisit:
          "Plan 60 to 90 minutes for the visitor center, free Boyhood Home program and grounds; allow half a day when combined with the Johnson Settlement.",
        physicalEffort: "Low",
        weatherExposure: "Mixed indoor/outdoor",
        planningLevel: "Moderate",
        familyFit:
          "Good for families interested in U.S. or Texas history, especially when paired with the Johnson Settlement or Science Mill.",
        firstTimeValue:
          "Very high for visitors seeking a focused LBJ history stop in Johnson City without committing to the full ranch district.",
      },
      itineraries: [
        {
          label: "Boyhood Home program",
          duration: "60–90 minutes",
          steps: [
            "Park and check in at the NPS Visitor Center on Ladybird Lane.",
            "Join one of the current free daily Boyhood Home programs.",
            "Walk the grounds and exterior porches before returning to the visitor center.",
          ],
        },
        {
          label: "Johnson City LBJ half day",
          duration: "3–4 hours",
          steps: [
            "Start with the visitor-center exhibits and Boyhood Home program.",
            "Walk the Johnson Settlement trail and historic buildings.",
            "Finish with lunch or another downtown Johnson City attraction.",
          ],
        },
        {
          label: "Full LBJ corridor day",
          duration: "Full day",
          steps: [
            "Begin in Johnson City with the Boyhood Home and Johnson Settlement.",
            "Drive west toward Stonewall for LBJ State Park and Sauer-Beckmann Farm.",
            "Continue into the LBJ Ranch district based on current NPS access and driving-permit rules.",
          ],
        },
      ],
      sources: [
        {
          label: "National Park Service — Visiting the Boyhood Home",
          url: "https://www.nps.gov/lyjo/planyourvisit/visitboyhoodhome.htm",
          scope:
            "Current free program times, program format, summer heat limitations, grounds access and historical interpretation.",
        },
        {
          label: "National Park Service — current park conditions",
          url: "https://www.nps.gov/lyjo/planyourvisit/conditions.htm",
          scope:
            "Current Johnson City visitor-center hours, Boyhood Home access and district status.",
        },
        {
          label: "National Park Service — directions",
          url: "https://www.nps.gov/lyjo/planyourvisit/directions.htm",
          scope:
            "Current Johnson City visitor-center routing and relationship between the Johnson City and ranch districts.",
        },
        {
          label: "National Park Service — Boyhood Home history",
          url: "https://www.nps.gov/lyjo/learn/historyculture/boyhoodhome.htm",
          scope:
            "Johnson family move in 1913, household history and the home's role in LBJ's early life.",
        },
        {
          label: "Wikimedia Commons — LBJ Boyhood Home Johnson City Texas 2016",
          url: "https://commons.wikimedia.org/wiki/File:LBJ_Boyhood_Home_Johnson_City_Texas_2016.jpg",
          scope:
            "Exact-subject hero image, photographer attribution and CC BY 4.0 commercial-reuse license.",
        },
      ],
    },
    featured: false,
  },
];
