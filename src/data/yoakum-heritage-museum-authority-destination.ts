import type { Destination } from "./types";

/**
 * Independently researched authority record for the museum in the city of
 * Yoakum (Lavaca/DeWitt counties). Do not confuse it with Yoakum County
 * Heritage and Art Museum in Plains, Texas.
 * Research reviewed 2026-10-09. Public hours originate in a THC 2021 entry,
 * so they must not be presented as independently confirmed current hours.
 */
export const yoakumHeritageMuseumDestinations: Destination[] = [{
  id: "museum-yoakum-heritage-authority",
  brandId: "texasdefined",
  slug: "yoakum-heritage-museum",
  name: "Yoakum Heritage Museum",
  summary: "Discover Yoakum's railroad beginnings, Tex-Tan leather industry, tomato-shipping history and the 1912 Elkins–Browning house at a volunteer-founded museum with an unusually rich local archive.",
  category: "historic-sites",
  region: "south-texas",
  nearestTown: "Yoakum",
  county: "Lavaca County",
  // Approximate Yoakum town-center point for regional discovery; directions
  // and visitor-facing maps must use the verified street address below.
  coordinates: { lat: 29.293406, lng: -97.146937 },
  hero: {
    src: "/images/yoakum-heritage-museum-editorial.svg",
    alt: "Original illustrated editorial graphic about Yoakum railroads, saddlery and local history; not a photograph of the museum",
    width: 1600,
    height: 900,
    credit: "TexasDefined original conceptual editorial graphic; not a photograph of the museum or a representation of its historic architecture",
  },
  bestSeason: "Year-round indoor heritage visit. Ask about the museum's changing exhibitions and special seasonal events, including its reported Christmas Tree Forest.",
  entryNote: "Public hours and admission require confirmation. A Texas Historical Commission directory record last updated August 8, 2021 lists Sunday, Tuesday and Thursday 1–4 p.m. and Friday 10 a.m.–4 p.m. Call (361) 293-7022 before traveling; do not assume those hours or donation policies remain unchanged.",
  highlights: [
    "1912 Elkins–Browning historic home",
    "San Antonio and Aransas Pass Railway records",
    "Leather Room, saddles and local tannery story",
    "Military, tomato industry and community heritage",
    "Grassroots museum founded in 1981–82",
  ],
  body: [
    "Yoakum Heritage Museum is more than a collection of old objects in a historic house. It is a key to a South-Central Texas community whose prosperity has been reshaped several times: cattle-gathering country before the town, rail transportation from 1887, leather goods and saddlery in the twentieth century, and agricultural shipping centered on tomatoes.",
    "Yoakum owes its initial rapid growth to the San Antonio and Aransas Pass Railway, which reached the area in 1887. The town was named for railroad official Benjamin Franklin Yoakum; the railroad shops and roundhouse attracted workers and businesses. The museum's railroad photographs and memorabilia connect that transportation history to families who lived it.",
    "By 1919 Carl Welhausen had taken over a small tanning company that became Tex-Tan. Saddles, bridles, harnesses, belts and other goods helped earn Yoakum its Leather Capital identity. The museum's Leather Room interprets the tools, workmanship and changing economy behind that label rather than treating leather as a decorative Texas souvenir.",
    "The same community also grew tomatoes and shipped produce beyond its immediate region; by the 1940s the town had numerous packing sheds. Understanding leather, agriculture and rail together reveals why a comparatively small town held regional importance.",
    "The museum itself grew out of local initiative. Organizers first met on November 30, 1981, received city support in December and obtained a state charter January 26, 1982. A contemporary centennial account documents a succession of early quarters before the former J. K. Elkins residence entered the museum story after Mary Bell Browning donated it in December 1986.",
    "The present home was rebuilt around 1912 and features an ornate stairway, stained glass and beveled entry glazing. Visitors encounter domestic architecture as well as community artifacts. The centennial history describes the role of museum volunteers and founding members; those names and dates make the institution's civic origins part of the interpretation.",
    "A military-history room and rotating community exhibits widen the story beyond the railway and tanneries. Specific objects and temporary displays may be changed or taken off view; contact staff before making a special trip to see a particular collection."
  ],
  address: "312 Simpson St, Yoakum, TX 77995",
  directions: "Use 312 Simpson Street for navigation, not the approximate city-center point on regional discovery maps. The town lies across the Lavaca–DeWitt county line, while the museum is cataloged by the Texas Historical Commission in Lavaca County.",
  accessibilityNotes: "The museum occupies a multi-level historic house. Call ahead to confirm entrance access, stair-lift availability and access to the individual rooms; do not assume all areas are step-free.",
  managingAuthority: "Yoakum Heritage Museum",
  officialUrl: "https://www.facebook.com/YHMuseum/",
  sourceCheckedAt: "2026-10-09",
  authorityGuide: {
    whyItMatters: "The museum provides an unusually direct way to understand how a railroad depot and workshops, the Tex-Tan leather industry, agricultural packing and local preservation created the city of Yoakum. Its own Elkins–Browning home is historical evidence, not simply a venue.",
    assessment: {
      recommendedVisit: "Allow approximately 45–90 minutes for a first visit; longer if a volunteer is available to explain special exhibits. This is an editorial planning estimate, not an official tour duration.",
      physicalEffort: "Low",
      weatherExposure: "Mostly indoors",
      planningLevel: "Moderate",
      familyFit: "Good for school-age children and families interested in trains, saddles, everyday life and historic homes; check hands-on activities with the museum.",
      firstTimeValue: "Start in the railway and leather exhibits, then trace the house's own history. The paired stories explain both the town's economy and the work of preservation."
    },
    itineraries: [
      { label: "Quick introduction", duration: "45–60 minutes", steps: ["Confirm the museum is open", "Visit the Leather Room and railway displays", "Look for surviving features of the 1912 house"] },
      { label: "Yoakum heritage half-day", duration: "3–4 hours", steps: ["Tour Yoakum Heritage Museum", "Walk or drive by historic downtown Yoakum", "Add Chisholm Trail Memorial Park if access and conditions suit"] },
      { label: "Regional history day", duration: "Full day", steps: ["Start with Yoakum's rail and leather story", "Explore Shiner and its Czech–German heritage", "Continue toward Hallettsville or Cuero for a second county-history perspective"] }
    ],
    sources: [
      { label: "Texas Historical Commission — museum Atlas entry", url: "https://atlas.thc.texas.gov/Details/4200000614", scope: "Verified street address, telephone, Lavaca County classification and date of last published hours" },
      { label: "Texas Time Travel — museum tour", url: "https://texastimetravel.com/directory/yoakum-heritage-museum-tour/", scope: "Museum themes, Leather Room, military and railroad exhibits, Elkins residence" },
      { label: "Texas Time Travel — museum directory", url: "https://texastimetravel.com/directory/yoakum-heritage-museum/", scope: "1912 residence, railway photos, saddles and tannery displays" },
      { label: "Yoakum Community: The First Hundred Years (1987), p. 24", url: "https://texashistory.unt.edu/ark:/67531/metapth880869/m1/34/", scope: "Primary local account of 1981 organizing meeting, 1982 charter, 1986 Browning gift, home details and volunteer origins" },
      { label: "Handbook of Texas — Yoakum", url: "https://www.tshaonline.org/handbook/entries/yoakum-tx", scope: "Railway-founded town, Tex-Tan, 1919 Welhausen purchase and tomato packing history" },
      { label: "Handbook of Texas — San Antonio and Aransas Pass Railway", url: "https://www.tshaonline.org/handbook/entries/san-antonio-and-aransas-pass-railway", scope: "Railroad infrastructure, route chronology and regional context" },
      { label: "Yoakum Area Chamber — organizations", url: "https://www.yoakumareachamber.com/our-members/organizations/", scope: "Present local chamber confirmation of museum address and telephone" },
      { label: "Yoakum Heritage Museum — direct updates", url: "https://www.facebook.com/YHMuseum/", scope: "Museum-managed channel for time-sensitive exhibit and visiting announcements; verify before travel" }
    ]
  }
}];
