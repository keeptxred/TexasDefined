import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-01";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Twenty-fourth statewide museum wave after canonical reconciliation. Ellis
 * County Museum and Denton County Courthouse-on-the-Square Museum are owned by
 * their earlier Wave 22 canonical records; this file retains only the museum
 * destinations that were genuinely new in Wave 24.
 */
export const statewideMuseumExpansionWave24Destinations: Destination[] = [
  {
    id: "museum-statewide-wave24-lampasas-county",
    brandId: "texasdefined",
    slug: "lampasas-county-museum",
    name: "Lampasas County Museum",
    summary: "The Lampasas County Museum preserves local photographs, artifacts, documents and rotating exhibits that interpret Lampasas County's springs, settlement, ranching, business and community life from a downtown museum near the city's historic core.",
    category: "historic-sites",
    region: "hill-country",
    nearestTown: "Lampasas",
    county: "Lampasas County",
    coordinates: { lat: 31.066314, lng: -98.179125 },
    hero: museumPlaceholder("Lampasas County Museum"),
    bestSeason: "Year-round when galleries are accessible; spring and fall are especially comfortable for combining the museum with Hancock Springs, downtown Lampasas and Hill Country drives.",
    entryNote: "CURRENT IMPROVEMENT WORK: the museum's 2026 updates describe roof and structural work and the temporary movement or reworking of exhibits. The site still publishes Friday-Saturday hours from 10 a.m. to 4 p.m., but verify current public access before making a special trip. Admission is donation-supported.",
    highlights: ["Lampasas County history", "Local photographs and archives", "Rotating community exhibits", "Downtown Lampasas heritage"],
    body: [
      "The Lampasas County Museum provides the county-level context behind a Hill Country town better known to many travelers for mineral springs and historic downtown architecture. Local artifacts, photographs and documentary collections connect those landmarks to the people, businesses and rural communities that shaped the county.",
      "The museum is currently working through physical improvements, so accurate status guidance matters more than repeating a normal-hours listing. Roof and structural work has required exhibits to be moved or reconsidered, and travelers should confirm current access rather than assume every gallery is operating normally.",
      "The museum gives Lampasas County visitors a useful history stop connecting Lampasas, Hancock Springs, ranching and Hill Country travel. Renovation progress should be checked before a dedicated visit."
    ],
    officialUrl: "https://www.lampasasmuseum.org/",
    managingAuthority: "Lampasas County Museum Foundation",
    address: "303 S Western Ave, Lampasas, TX 76550",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave24-comanche-county",
    brandId: "texasdefined",
    slug: "comanche-county-historical-museum",
    name: "Comanche County Historical Museum",
    summary: "An artifact-rich Comanche museum with more than fourteen exhibit rooms, a Jack Wright Saloon diorama and original mirror, John Wesley Hardin history, blacksmith tools, an Indigenous campsite display, and generations of Comanche County farm and community life.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Comanche",
    county: "Comanche County",
    coordinates: {
      lat: 31.898076,
      lng: -98.618822
    },
    hero: {
      src: DESTINATION_PHOTO_PLACEHOLDER,
      alt: "Comanche County Historical Museum — destination-specific photograph not yet available",
      width: 1600,
      height: 1067
    },
    bestSeason: "Year-round during the museum's published Thursday–Saturday visiting window; spring and autumn are comfortable for a companion courthouse-square walk.",
    entryNote: "The museum lists Thursday–Saturday, 10 a.m.–4 p.m., at 402 Moorman Road in Comanche; school and group tours may be arranged. Check for holiday changes. This visitor guide does not claim a published admission price, accessible building layout or an open-air blacksmith demonstration.",
    highlights: [
      "More than 14 historical exhibit rooms",
      "Jack Wright Saloon diorama with original mirror",
      "John Wesley Hardin photographs and memorabilia",
      "Blacksmith work area with windmill head and tools",
      "Indigenous campsite diorama",
      "Veterans galleries and children's area",
      "Bernice Jones artwork and Comanche County heritage"
    ],
    body: [
      "The Comanche County Historical Museum tells the stories visitors may otherwise miss while walking the courthouse square. It is a community museum at 402 Moorman Road, with more than fourteen exhibit rooms covering the county's Indigenous history, frontier settlement, small-town commerce, ranching and agriculture, transportation, military service and family life. The museum reports a roughly 50,000-square-foot facility; that number is its own description, not an independently measured visitor gallery area.",
      "One standout display recreates the 1870s Jack Wright Saloon, which operated on the northeast side of the Comanche courthouse square. The museum says the diorama includes the saloon's original mirror, later used in a barber shop in Gustine before it was donated. That physical object's journey helps connect downtown Comanche's commercial life to the county's smaller communities and makes the exhibit more than a Western-themed set.",
      "The museum also exhibits photographs, artwork and memorabilia associated with John Wesley Hardin, who lived in Comanche County. In May 1874 Hardin killed Brown County deputy Charles Webb in Comanche. Later violence included the lynching of Hardin's brother Joe and two other jailed associates. Visitors should understand this as real frontier violence and a failure of justice, not as a family-friendly gunfight performance or an occasion for outlaw celebration.",
      "The real downtown story extends beyond the museum walls. Clint and Jami Tunnell uncovered an approximately 18-foot-square Bull Durham tobacco advertisement, thought to date from 1892–1893, while renovating a building at 109 West Grand Street in 2019. The former Jack Wright Saloon site and surrounding redevelopment help explain why the mural was preserved under later building materials. Pair the museum's saloon display with the mural and other square landmarks for a richer understanding of changing storefronts, not an invented reenactment.",
      "For agricultural and trade history, look for the museum's blacksmith area, including a windmill head and metalworking tools. Such equipment points to essential rural skills: shoeing and repairing farm gear, maintaining machinery and keeping windmills working when homes and ranches depended on well water. These objects give visitors a concrete way to understand the larger county story of livestock, cotton, peanuts, dairying and the railroads that connected producers to distant markets.",
      "A diorama portraying a Comanche Indigenous family campsite introduces a much older history than the county's formal creation in 1856. It should be interpreted as the museum's historical reconstruction, not a living cultural representation or complete account of the Comanche Nation. The museum also displays original art by Bernice Jones, including depictions of Quanah Parker. Travelers seeking a fuller picture can consult tribal and historical scholarship beyond the exhibit itself.",
      "Veterans collections include clothing, photographs, equipment and service-related objects from the First World War through Vietnam. A children's area focuses on play and everyday life. Those galleries broaden a visit beyond outlaws and landmark architecture: they show how ordinary residents learned, worked, served, raised families and built institutions through several generations.",
      "The museum's homepage confirms free general admission, supported by donations. Its Thursday–Saturday public hours, currently published as 10 a.m.–4 p.m., suit a half-day Comanche itinerary. Private, school and group tours are offered by arrangement; the organization welcomes donations, memberships, volunteers and appropriate artifact contributions. The museum does not publish a complete accessibility inventory, so call before a special visit; free general admission does not guarantee all privately arranged group programs have the same terms.",
      "The museum also publishes a Comanche Square Walking Tour with QR-triggered audio commentary on Old Cora, Fleming Oak and other landmarks. Check its online map and onsite QR access; this is a self-guided audio resource, not an advertised staffed guided tour. Combine the museum with the current Art Moderne Comanche County Courthouse, the Old Cora log courthouse and Fleming Oak on the town square. Old Cora was first used in Cora in 1856 and is presently listed by the Chamber as closed for renovation, so plan for an exterior history stop only when grounds are accessible. The restored 1909 Comanche-Frisco depot at 304 South Austin Street is another nearby heritage stop with its own visitor-center opening arrangements.",
      "For a longer county day, use the museum first to interpret De Leon's peanut history, the rail era, Cora's original county-seat role, and the Leon River landscape before driving to Proctor Lake. Alternatively, explore Comanche's present-day wine businesses. Brennan Vineyards and JW Hardin Wine Co. both maintain official local presences, but tasting hours and reservations should be verified independently; this museum itinerary does not imply a guided wine-tour service."
    ],
    officialUrl: "https://www.comanchecountytxmuseum.com/",
    managingAuthority: "Comanche County Historical Museum",
    address: "402 Moorman Rd, Comanche, TX 76442",
    sourceCheckedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    directions: "Museum: 402 Moorman Road, Comanche, TX 76442. Pair with the courthouse square, Old Cora and Fleming Oak in downtown Comanche; confirm operating hours before travel.",
    accessibilityNotes: "The museum has multiple exhibit rooms and historical displays. Its public website does not confirm accessible routes to each area; call (325) 356-5115 for specific needs, parking and any step-free entry arrangements.",
    areaGuide: {
      intro: "Start with the museum's saloon, blacksmith and community-history rooms, then use the Comanche square to place the exhibits in their real-world setting.",
      nearbyAttractions: [
        {
          name: "Comanche courthouse square, Old Cora and Fleming Oak",
          description: "Compare the surviving log courthouse first used in 1856 and the WPA-era courthouse; Old Cora is currently closed for renovation.",
          href: "/destination/comanche"
        },
        {
          name: "Bull Durham mural, 109 W. Grand",
          description: "Historic c.1892–93 advertisement exposed by Clint and Jami Tunnell in 2019; storefront viewing subject to access.",
          href: "/destination/comanche"
        },
        {
          name: "Comanche-Frisco Depot",
          description: "Restored 1909 brick railroad depot and Chamber tourism connection.",
          href: "https://www.comanchechamber.org/comanchefriscotraindepot"
        }
      ],
      foodAndDrink: [
        {
          name: "Downtown Comanche",
          description: "Restaurants and small businesses on and near the courthouse square.",
          href: "/destination/comanche"
        },
        {
          name: "Brennan Vineyards",
          description: "Comanche winemaking and historic McCrary House; check tasting plans.",
          href: "https://www.brennanvineyards.com/"
        }
      ],
      lodging: [
        {
          name: "Comanche",
          description: "Convenient home base for museum history, wineries and a Proctor Lake side trip.",
          href: "/destination/comanche"
        }
      ],
      neighborhoods: [
        {
          name: "Museum grounds and Moorman Road",
          description: "Museum collections and special visiting arrangements."
        },
        {
          name: "Courthouse square",
          description: "Old Cora, Fleming Oak and the buildings connected to the Jack Wright Saloon history.",
          href: "/destination/comanche"
        }
      ],
      familyStops: [
        {
          name: "Children's room",
          description: "The museum has a dedicated play and childhood-history area."
        },
        {
          name: "Comanche square history walk",
          description: "Short outdoor stops for historic markers and building exteriors.",
          href: "/destination/comanche"
        }
      ],
      sideTrips: [
        {
          name: "Comanche County guide",
          description: "Cora, De Leon, ranching, peanuts, railroads and the Leon River.",
          href: "/county/comanche"
        },
        {
          name: "City of Comanche visitor guide",
          description: "Town history, mural, nearby wineries and practical day plans.",
          href: "/destination/comanche"
        },
        {
          name: "Proctor Lake fishing guide",
          description: "Plan water recreation separately from the museum stop.",
          href: "/fishing/lakes/proctor-lake"
        }
      ]
    },
    authorityGuide: {
      whyItMatters: "The museum holds tangible links to Comanche's historic square—notably an original saloon mirror—while preserving less famous farm tools, veterans' objects, artworks and family history from across the county.",
      assessment: {
        recommendedVisit: "Allow 60–120 minutes for selected galleries, longer for a guided group visit; reserve another 1–2 hours for downtown history.",
        physicalEffort: "Low to moderate",
        weatherExposure: "Mostly indoors",
        planningLevel: "Moderate",
        familyFit: "Children's area and artifact exhibits make it accessible to mixed-age groups; the Hardin story includes violence.",
        firstTimeValue: "High for county heritage and for understanding Comanche's downtown landmarks."
      },
      itineraries: [
        {
          label: "Museum essentials",
          duration: "1–2 hours",
          steps: [
            "Start with the Jack Wright Saloon diorama and original mirror",
            "Explore John Wesley Hardin material in historical context",
            "Visit the blacksmith tools, veterans and community-history exhibits"
          ]
        },
        {
          label: "Museum and square",
          duration: "Half day",
          steps: [
            "Visit the museum during its published visiting window",
            "Walk the courthouse square for Fleming Oak and Old Cora exterior",
            "Look for the Bull Durham mural through the storefront at 109 W. Grand if visible"
          ]
        },
        {
          label: "County heritage day",
          duration: "1 full day",
          steps: [
            "Begin with the museum's rural, community and Indigenous history",
            "Explore the square and 1909 Frisco Depot if open",
            "Continue toward Proctor Lake or De Leon for the agricultural and rail chapters"
          ]
        }
      ],
      sources: [
        { label: "Museum operator — Free admission", url: "https://www.comanchecountytxmuseum.com/", scope: "Museum confirms free entry and voluntary donation support" },
        { label: "Museum operator — Comanche square audio tour", url: "https://www.comanchecountytxmuseum.com/about-1-1", scope: "QR-triggered audio stops and walking map" },
        {
          label: "Comanche County Historical Museum — About",
          url: "https://www.comanchecountytxmuseum.com/about-us",
          scope: "Official rooms, public visiting hours, tour arrangements and organizational information"
        },
        {
          label: "Comanche County Historical Museum — Collection",
          url: "https://www.comanchecountytxmuseum.com/collection",
          scope: "Official saloon mirror, blacksmith, Hardin, veterans, children's and Indigenous exhibitions"
        },
        {
          label: "Comanche County Historical Museum — Contact",
          url: "https://www.comanchecountytxmuseum.com/contact",
          scope: "Official street address and contact details"
        },
        {
          label: "Texas Historical Association — Comanche County",
          url: "https://www.tshaonline.org/handbook/entries/comanche-county",
          scope: "Historical timeline, Hardin incident, agricultural and railroad changes"
        },
        {
          label: "Authentic Texas — It's a Lot of Bull!",
          url: "https://authentictexas.com/its-a-lot-of-bull/",
          scope: "Bull Durham mural discovery and the saloon building's downtown history"
        },
        {
          label: "Comanche Chamber — Explore",
          url: "https://www.comanchechamber.org/explorecomanche",
          scope: "Old Cora closure, Fleming Oak and Comanche visitor context"
        }
      ]
    },
    visitorFacts: [
      { topic: "price", label: "General admission", detail: "Free general admission according to the museum, supported by donations; verify group arrangements.", sourceUrl: "https://www.comanchecountytxmuseum.com/", checkedAt: "2026-11-22" },
      {
        topic: "hours",
        label: "Published public hours",
        detail: "Thursday–Saturday, 10 a.m.–4 p.m.; verify changes before travel.",
        sourceUrl: "https://www.comanchecountytxmuseum.com/about-us",
        checkedAt: "2026-11-22"
      },
      {
        topic: "reservations",
        label: "Group tours",
        detail: "School, private and group tours are available by appointment; arrange directly with the museum.",
        sourceUrl: "https://www.comanchecountytxmuseum.com/about-us",
        checkedAt: "2026-11-22"
      },
      {
        topic: "access",
        label: "Museum address",
        detail: "402 Moorman Road, Comanche, Texas 76442; telephone (325) 356-5115.",
        sourceUrl: "https://www.comanchecountytxmuseum.com/contact",
        checkedAt: "2026-11-22"
      }
    ],
    visitorFaqs: [
      { question: "Does the museum charge admission?", answer: "No. Its official homepage states general admission is free; donations support the museum. Confirm separate group arrangements with museum volunteers.", sourceUrl: "https://www.comanchecountytxmuseum.com/" },
      { question: "Is there an audio walking tour of Comanche square?", answer: "Yes. The museum publishes a QR-linked Comanche Square Walking Tour with audio interpretation of Old Cora, Fleming Oak and other historic landmarks. Check the site and onsite QR availability.", sourceUrl: "https://www.comanchecountytxmuseum.com/about-1-1" },
      {
        question: "Where is the Comanche County Historical Museum?",
        answer: "It is at 402 Moorman Road in Comanche, Texas. The museum lists telephone (325) 356-5115.",
        sourceUrl: "https://www.comanchecountytxmuseum.com/contact"
      },
      {
        question: "When is the Comanche County Historical Museum open?",
        answer: "The museum publishes public hours Thursday through Saturday, 10 a.m.–4 p.m., and group tours by appointment. Confirm holiday exceptions.",
        sourceUrl: "https://www.comanchecountytxmuseum.com/about-us"
      },
      {
        question: "Does the museum have the John Wesley Hardin saloon?",
        answer: "It has a diorama of the historical Jack Wright Saloon and displays the original saloon mirror, plus Hardin photographs and memorabilia; it is not an operating bar or a reenactment.",
        sourceUrl: "https://www.comanchecountytxmuseum.com/collection"
      },
      {
        question: "Is there a blacksmith shop at the museum?",
        answer: "The museum describes a blacksmith exhibit with a windmill head and tools. It does not promise live demonstrations.",
        sourceUrl: "https://www.comanchecountytxmuseum.com/collection"
      },
      {
        question: "Can the museum be visited with children?",
        answer: "The museum lists a children's area among its exhibits. Families should also know some Hardin-history displays cover violence and killings.",
        sourceUrl: "https://www.comanchecountytxmuseum.com/collection"
      }
    ]
  }
];
