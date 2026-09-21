import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-20";

export const johnsonSettlementDestinations: Destination[] = [
  {
    id: "historic-johnson-settlement-johnson-city",
    brandId: "texasdefined",
    slug: "johnson-settlement-johnson-city",
    name: "Johnson Settlement",
    summary:
      "The Johnson Settlement in Johnson City preserves the 1860s cattle-driving headquarters of Lyndon B. Johnson's grandfather and great-uncle, with a one-mile accessible trail, the Sam Ealy Johnson dogtrot cabin, historic barns, longhorn cattle and exhibits on Hill Country frontier life.",
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
    coordinates: { lat: 30.274, lng: -98.418 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Views%20at%20Lyndon%20B.%20Johnson%20National%20Historical%20Park,%20Texas%20%28aba67fb0-df16-475c-a9ff-993b02be2d9e%29.jpg?width=1600",
      alt: "Historic Johnson Cabin at the Johnson Settlement in Johnson City, Texas",
      width: 3072,
      height: 2048,
      credit: "NPS staff · U.S. public domain · Wikimedia Commons",
    },
    bestSeason:
      "Fall through spring for the most comfortable walking. Summer mornings are better for the exposed trail, and visitors should prepare for heat, limited shade and changing Hill Country weather.",
    entryNote:
      "The Johnson Settlement is part of Lyndon B. Johnson National Historical Park and does not require an entrance fee. The settlement and trail are currently open sunrise to sunset daily. The main walking route is about one mile, with access from the NPS Visitor Center or the Event Center parking area on U.S. 290.",
    highlights: [
      "Sam Ealy Johnson Sr. dogtrot cabin dating to the 1850s and 1860s",
      "One-mile Johnson Settlement trail",
      "Historic Johnson and Bruckner barns, windmill and cooler house",
      "Longhorn cattle and cattle-drive interpretation",
      "Exhibit center on early Johnson family history and Hill Country survival",
      "Accessible crushed-gravel trail and accessible historic buildings",
      "Direct connection to the LBJ Boyhood Home and Johnson City NPS Visitor Center",
    ],
    body: [
      "The Johnson Settlement is where the Lyndon Johnson story reaches back before the presidency and even before Johnson City itself. In the late 1850s, Samuel Ealy Johnson Sr., Lyndon Johnson's grandfather, and his brother Tom settled on land that became the headquarters of a major post-Civil War cattle-driving operation.",
      "The settlement's defining structure is the Sam Ealy Johnson cabin. The west wing dates to 1856, and Sam added the east wing around 1868. The two rooms are connected by a shaded breezeway, creating the dogtrot form once common across Texas. Sam and Eliza Johnson lived here from 1867 into the early 1870s while the cattle business grew around them.",
      "The cattle trade explains why the settlement mattered economically. After the Civil War, Texas had large numbers of cattle and northern markets paid substantially more for beef. The Johnson brothers used the Pedernales and Blanco valleys as gathering country, bought cattle on credit and drove herds north toward Kansas railheads. For a brief period the settlement became the center of one of the largest cattle-driving operations in the region.",
      "That success did not last. More drovers entered the market, cattle prices fell and the Johnson partnership dissolved in 1871. The family left Blanco County soon afterward, but several original structures survived. The National Park Service later acquired the site with funds donated by former President Johnson and preserved the cabin, barns and other features as part of the national historical park.",
      "The site is experienced primarily on foot. The current National Park Service accessibility guidance describes the Johnson Settlement trail as one mile long with only 59 feet of elevation change, an average grade of about 1 to 2 percent and a maximum grade of 8 percent. The surface is crushed gravel and is considered accessible.",
      "Visitors can start from the National Park Service Visitor Center in Johnson City or use the Event Center parking area on West Main Street. The trail leads through the settlement landscape past the exhibit center, Johnson Cabin, barns, windmill and cooler house. NPS also says visitors with disabilities may request a permit to drive into the settlement.",
      "Longhorn cattle are part of the historic atmosphere but should be treated as livestock, not a petting attraction. NPS specifically warns visitors not to climb corral fences or attempt to touch the animals. Staying on established trails also helps protect the historic landscape and reduces encounters with fire ants and rough ground.",
      "The Johnson Settlement pairs naturally with the LBJ Boyhood Home because the two sites explain different generations of the same family. The Settlement shows the frontier and cattle-driving world of Johnson's grandparents; the Boyhood Home shows the household and political environment of Johnson's childhood decades later.",
      "Visitors with more time can continue west to the LBJ Ranch and LBJ State Park near Stonewall. That route turns one Johnson City walk into a broader Hill Country history day spanning cattle drives, family settlement, rural education, ranching and the presidency.",
    ],
    managingAuthority: "National Park Service — Lyndon B. Johnson National Historical Park",
    officialUrl: "https://www.nps.gov/lyjo/learn/historyculture/thejohnsonsettlement.htm",
    address: "Access via NPS Visitor Center, 100 Ladybird Lane, Johnson City, TX 78636",
    directions:
      "From the Johnson City NPS Visitor Center, follow the self-guided settlement trail west. A second access point is available from the Event Center parking lot on West Main Street / U.S. 290.",
    accessibilityNotes:
      "NPS describes the one-mile crushed-gravel trail as accessible, with about 59 feet of elevation change, 1–2% average grade and 8% maximum grade. All Johnson Settlement buildings are described as accessible, and visitors with disabilities may request a permit at the visitor center to drive into the settlement.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Use the Johnson Settlement as the outdoor family-history half of the Johnson City NPS district, then pair it with the Boyhood Home, downtown museums or the ranch corridor.",
      nearbyAttractions: [
        {
          name: "LBJ Boyhood Home",
          description:
            "The restored 1920s childhood home shows the next generation of Johnson family life and the political household that shaped the future president.",
          proximity: "Walkable in the Johnson City NPS district",
          href: "/destination/lbj-boyhood-home-johnson-city",
        },
        {
          name: "Lyndon B. Johnson National Historical Park",
          description:
            "Use the broader park guide for current Johnson City hours, ranch permits, Texas White House closure and a full two-district itinerary.",
          proximity: "Same national park",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
        {
          name: "Science Mill",
          description:
            "Johnson City's hands-on STEM museum gives families a substantial indoor stop after the settlement walk.",
          proximity: "Downtown Johnson City",
          href: "/destination/science-mill-johnson-city",
        },
      ],
      foodAndDrink: [
        {
          name: "Downtown Johnson City",
          description:
            "Restaurants, cafes and tasting rooms around the courthouse square are easy to combine with a morning settlement walk.",
          proximity: "Nearby",
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
            "Staying in town keeps the Settlement, Boyhood Home, museums, food and evening events within a compact radius.",
          proximity: "In town",
          href: "/destination/johnson-city",
        },
      ],
      neighborhoods: [
        {
          name: "Johnson City historic core",
          description:
            "The NPS Visitor Center, Boyhood Home, Settlement, courthouse square and museums form one compact history-and-culture cluster.",
          proximity: "At the site",
          href: "/destination/johnson-city",
        },
      ],
      familyStops: [
        {
          name: "LBJ Boyhood Home",
          description:
            "Pair the outdoor settlement trail with a free ranger-led Boyhood Home program when current tour times fit.",
          proximity: "Same NPS district",
          href: "/destination/lbj-boyhood-home-johnson-city",
        },
        {
          name: "Science Mill",
          description:
            "Add an interactive science stop for a history-plus-STEM family day.",
          proximity: "Downtown Johnson City",
          href: "/destination/science-mill-johnson-city",
        },
      ],
      sideTrips: [
        {
          name: "LBJ State Park & Sauer-Beckmann Farm",
          description:
            "Continue west for German-Texan living history, longhorns, bison and the ranch driving-permit stop.",
          proximity: "Stonewall corridor",
          href: "/destination/lyndon-b-johnson-state-park-and-historic-site",
        },
        {
          name: "LBJ Ranch",
          description:
            "Use the broader national-park guide to continue from Johnson family settlement history into the presidential ranch landscape.",
          proximity: "About 14 miles west",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "The Johnson Settlement preserves the cattle-driving and frontier generation of the Johnson family, giving the LBJ story a deeper Texas context than presidential sites alone can provide.",
      assessment: {
        recommendedVisit:
          "Plan 60 to 90 minutes for the trail, exhibit center and historic structures; allow 2 to 3 hours when combined with the Boyhood Home.",
        physicalEffort: "Low",
        weatherExposure: "Mostly outdoors",
        planningLevel: "Low",
        familyFit:
          "Strong for families who want an easy walking trail, longhorns and tangible frontier-history structures rather than only indoor exhibits.",
        firstTimeValue:
          "High as part of the Johnson City NPS district, especially when paired with the Boyhood Home.",
      },
      itineraries: [
        {
          label: "Settlement walk",
          duration: "60–90 minutes",
          steps: [
            "Start at the Johnson City NPS Visitor Center or Event Center access point.",
            "Follow the settlement trail to the exhibit center, Johnson Cabin, barns and ranch structures.",
            "Observe the longhorns from outside the corrals and return by the established trail.",
          ],
        },
        {
          label: "Johnson family half day",
          duration: "2–4 hours",
          steps: [
            "Begin with NPS orientation at the Johnson City Visitor Center.",
            "Walk the Johnson Settlement and historic structures.",
            "Join a Boyhood Home program if the current schedule fits.",
          ],
        },
        {
          label: "Full heritage corridor",
          duration: "Full day",
          steps: [
            "Start with the Johnson Settlement and Boyhood Home in Johnson City.",
            "Drive west to LBJ State Park and Sauer-Beckmann Farm.",
            "Continue into the LBJ Ranch with a free driving permit.",
          ],
        },
      ],
      sources: [
        {
          label: "National Park Service — The Johnson Settlement",
          url: "https://www.nps.gov/lyjo/learn/historyculture/thejohnsonsettlement.htm",
          scope:
            "Current settlement history, structures, accessibility, longhorn safety and preservation context.",
        },
        {
          label: "National Park Service — Accessibility",
          url: "https://www.nps.gov/lyjo/planyourvisit/accessibility.htm",
          scope:
            "Current one-mile trail measurements, grade, crushed-gravel surface and accessible-building guidance.",
        },
        {
          label: "National Park Service — Johnson Cabin",
          url: "https://www.nps.gov/places/000/the-johnson-cabin-exhibit.htm",
          scope:
            "Dogtrot cabin history, Sam and Eliza Johnson household and building chronology.",
        },
        {
          label: "Wikimedia Commons — Johnson Settlement home",
          url: "https://commons.wikimedia.org/wiki/File:Views_at_Lyndon_B._Johnson_National_Historical_Park,_Texas_(aba67fb0-df16-475c-a9ff-993b02be2d9e).jpg",
          scope:
            "Exact-subject NPS hero image and U.S. public-domain reuse status.",
        },
      ],
    },
    featured: false,
  },
];
