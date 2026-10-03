import type { Article, ImageRef } from "../types";

const image = (src: string, alt: string, width: number, height: number, credit: string): ImageRef => ({ src, alt, width, height, credit });

const hero = image(
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Port_Isabel_Texas_Lighthouse.jpg?width=1600",
  "Historic Port Isabel Lighthouse in Cameron County, Texas",
  1188,
  1528,
  "lfwlfw / Bevo · CC BY 2.0 · Wikimedia Commons",
);

const lighthouseImages = {
  portIsabel: image(
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Port_Isabel%2C_Texas_Lighthouse.jpg?width=1600",
    "Entrance and lower tower of the Port Isabel Lighthouse in Port Isabel, Texas",
    4608,
    3456,
    "Billy D. Wagner · CC BY-SA 4.0 · Wikimedia Commons",
  ),
  bolivar: image(
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Port_Bolivar_TX_-_Point_Bolivar_Lighthouse.jpg?width=1600",
    "Point Bolivar Lighthouse on the Bolivar Peninsula at the entrance to Galveston Bay",
    2502,
    1888,
    "Patrick Feller · CC BY 2.0 · Wikimedia Commons",
  ),
  halfmoon: image(
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/HALFMOON_REEF_LIGHTHOUSE.jpg?width=1600",
    "Halfmoon Reef Lighthouse preserved in Port Lavaca, Texas",
    5500,
    4423,
    "Charles Henry · CC BY 2.0 · Wikimedia Commons",
  ),
  lydiaAnn: image(
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lydia_Ann_Lighthouse_near_Port_Aransas.jpg?width=1600",
    "Lydia Ann Lighthouse near Port Aransas with its brick tower and keeper's dwelling",
    829,
    648,
    "Jon Lebkowsky · CC BY-SA 2.0 · Wikimedia Commons",
  ),
  matagorda: image(
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Matagorda_Island_Light_%28Calhoun_County%2C_Texas%29.jpg?width=1600",
    "Matagorda Island Lighthouse, the tapered cast-iron tower in Calhoun County",
    2244,
    2692,
    "U.S. Coast Guard · Public domain · Wikimedia Commons",
  ),
  sabine: image(
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sabine_Pass_Lighthouse_01.jpg?width=1600",
    "Sabine Pass Lighthouse on the Louisiana side of the Texas-Louisiana border waterway",
    723,
    499,
    "Jessica Kemm / National Park Service · Public domain · Wikimedia Commons",
  ),
};

export const lighthouseSearchIntentArticles: Article[] = [
  {
    id: "lighthouse-intent-1",
    brandId: "texasdefined",
    slug: "best-lighthouses-to-visit-in-texas",
    title: "Best Lighthouses to Visit in Texas: What You Can Actually See and Climb",
    dek: "A practical Texas lighthouse guide comparing public access, climbs, viewing methods and trip logistics from Port Isabel to the Sabine gateway.",
    category: "historic-sites",
    region: "gulf-coast",
    hero,
    authorId: "a-hollis",
    publishedAt: "2026-08-21",
    updatedAt: "2026-10-01",
    readingMinutes: 18,
    tags: ["best lighthouses in texas", "texas lighthouses to visit", "port isabel lighthouse", "point bolivar lighthouse", "lydia ann lighthouse", "matagorda island lighthouse", "halfmoon reef lighthouse", "texas gulf coast"],
    featured: true,
    sourceName: "Texas Historical Commission · U.S. Coast Guard Historian's Office · Texas Parks and Wildlife Department",
    sourceUrl: "https://thc.texas.gov/historic-sites/port-isabel-lighthouse",
    relatedCollections: [],
    relatedDestinations: ["port-isabel-lighthouse"],
    internalLinks: [
      { href: "/explore/lighthouses", label: "Open the Texas lighthouse map", description: "Compare locations, access status and county context for the major surviving and relocated lighthouse sites." },
      { href: "/article/texas-lighthouses-complete-guide", label: "Read the complete Texas lighthouse history", description: "Go beyond the visitor guide into the coastwide network of surviving and lost lights." },
      { href: "/article/texas-lighthouse-road-trip", label: "Plan the Texas lighthouse road trip", description: "Turn the lighthouse list into a multi-day Gulf Coast itinerary." },
      { href: "/destination/port-isabel-lighthouse", label: "Plan a Port Isabel Lighthouse visit", description: "Use the destination guide for the only Texas lighthouse built around a conventional public tower visit." },
      { href: "/article/point-bolivar-lighthouse-history", label: "Point Bolivar Lighthouse authority guide", description: "Read the full history of the black tower at the Galveston Bay entrance." },
      { href: "/article/halfmoon-reef-lighthouse-port-lavaca", label: "Halfmoon Reef Lighthouse authority guide", description: "See how the Matagorda Bay screw-pile light was moved ashore and preserved." },
      { href: "/article/lydia-ann-lighthouse-port-aransas", label: "Lydia Ann Lighthouse authority guide", description: "Understand the Aransas Pass light, Lighthouse Lakes and the working waterways around Port Aransas." },
      { href: "/article/matagorda-island-lighthouse-history", label: "Matagorda Island Lighthouse authority guide", description: "Go deeper on Pass Cavallo, the barrier island and the restored cast-iron tower." },
      { href: "/article/sabine-pass-lighthouse-texas-border", label: "Sabine Pass Lighthouse authority guide", description: "Follow the border-waterway history of the lighthouse on the Louisiana side of the Sabine." },
    ],
    body: [
      { type: "paragraph", text: "If the question is simply which Texas lighthouse is best to visit, Port Isabel is the clearest answer. It is the experience most travelers imagine when they start searching: a surviving historic tower, a public site, a climb toward the lantern room when operations and weather allow, and a lower-coast setting that can anchor a full day around Port Isabel, South Padre Island and Brownsville. The rest of the Texas lighthouse story is more varied—and that distinction matters when you plan a trip." },
      { type: "paragraph", text: "Texas does not have six interchangeable lighthouse attractions. One is a true public climb. One is a private tower best understood from the Galveston Bay approach. One is a relocated lighthouse you can see easily from land. One survives beside the waterways around Port Aransas. One stands on a remote barrier island with restricted, boat-only access. The eastern historical endpoint is actually on the Louisiana side of the Sabine. Use this page as a visitability guide, then use the linked authority pages for the deeper history." },

      { type: "heading", text: "Texas lighthouses at a glance: access, climbs and trip difficulty" },
      { type: "list", items: [
        "Port Isabel Lighthouse — Port Isabel · Public site: yes · Tower climb: yes when operating · Lighthouse hours: daily 9 a.m.–6 p.m. off-season and 10 a.m.–9 p.m. in summer, weather permitting · Visitor Center: daily 9 a.m.–5 p.m. · Current admission: adults $5, seniors $4, children age 5+ $3, military $2.50 · Trip difficulty: easy · Best nearby base: Port Isabel / South Padre Island.",
        "Point Bolivar Lighthouse — Bolivar Peninsula · Public tower access: no · Tower climb: no · Best viewing method: lawful public vantage points and the Galveston-Port Bolivar ferry corridor · Trip difficulty: easy · Best nearby base: Galveston / Crystal Beach · Respect private property.",
        "Halfmoon Reef Lighthouse — Port Lavaca · Publicly viewable from land: yes · Tower climb: no · Best viewing method: Bayfront Park / roadside historic stop · Trip difficulty: easy · Best nearby base: Port Lavaca · The structure is relocated from its original Matagorda Bay setting; do not rely on unofficial museum-hour listings for tower access.",
        "Lydia Ann Lighthouse — Harbor Island near Port Aransas · Public tower access: no · Tower climb: no · Best viewing method: public waterways and Lighthouse Lakes paddling country · Trip difficulty: moderate · Best nearby base: Port Aransas / Aransas Pass · Do not enter private lighthouse property.",
        "Matagorda Island Lighthouse — Matagorda Island · Road access: none; boat access only · Tower climb: not a conventional public attraction · Current TPWD guidance: call ahead because access is restricted; the north-end route through the lighthouse area may be used for unsupervised wildlife viewing and hiking during daylight hours · Trip difficulty: high · Best nearby base: Port O'Connor.",
        "Sabine Pass Lighthouse — Louisiana side of the Sabine · Conventional Texas lighthouse visit: no · Tower climb: no public Texas-side climb · Best experience: Texas-side battle, ship-channel and maritime context · Trip difficulty: moderate if the goal is history rather than tower access · Best nearby base: Port Arthur / Sabine Pass."
      ] },
      { type: "paragraph", text: "There is no single admission price for a Texas lighthouse trip because most of these are not ticketed lighthouse attractions. Port Isabel is the key exception. The Texas Historical Commission currently lists adults at $5, seniors at $4, children age 5 and older at $3, and military admission at $2.50. Because weather and seasonal operations can affect the climb, the official site remains the final check before departure." },

      { type: "heading", text: "1. Port Isabel Lighthouse — best overall" },
      { type: "image", image: lighthouseImages.portIsabel, caption: "Port Isabel is the only surviving Texas lighthouse organized around a conventional public tower visit and climb; hours vary by season and the climb is weather permitting." },
      { type: "paragraph", text: "Port Isabel is the easiest recommendation because it combines historical significance with genuine public access. The lighthouse dates to the early 1850s and was built to help shipping using the lower Texas coast near Brazos Santiago Pass. Its position also tied it to military traffic through Point Isabel and to the larger history of the Rio Grande delta." },
      { type: "paragraph", text: "The Texas Historical Commission identifies Port Isabel as the last Texas lighthouse open to the public. Visitors climb 75 winding stairs plus three short ladders to reach the upper portion of the tower when the climb is operating. A reproduction third-order Fresnel lens installed in 2022 returned a soft light to the lantern room; it is an interpretive reproduction, not the restored original lens and not an official navigation beacon." },
      { type: "paragraph", text: "Current official hours: the lighthouse is open daily from 9 a.m. to 6 p.m. in the off-season and 10 a.m. to 9 p.m. in summer, weather permitting. The Visitor Center is open daily from 9 a.m. to 5 p.m. Current posted admission is $5 for adults, $4 for seniors, $3 for children age 5 and older, and $2.50 for military visitors. Children must be at least 5 and accompanied by a guardian to tour the lighthouse." },
      { type: "paragraph", text: "Practical plan: build at least an hour around the lighthouse itself, then extend the day into Port Isabel, South Padre Island or Brownsville. Check the Texas Historical Commission page immediately before departure in case seasonal hours, admission or weather-related climb restrictions change." },
      { type: "paragraph", text: "Official authority to verify: Texas Historical Commission, Port Isabel Lighthouse historic-site page, plan-your-visit page and site history." },

      { type: "heading", text: "2. Point Bolivar Lighthouse — best for Galveston Bay history" },
      { type: "image", image: lighthouseImages.bolivar, caption: "Point Bolivar Lighthouse stands on the Bolivar side of the Galveston Bay entrance; treat it as a view-only private landmark." },
      { type: "paragraph", text: "Point Bolivar is the lighthouse that makes immediate sense when you approach Galveston Bay. The black cast-iron tower stands on the Bolivar side of the entrance, opposite Galveston Island and beside a maritime corridor still crowded with ferries and commercial traffic. The present tower was first lit in 1873 after Civil War disruption ended the earlier station." },
      { type: "paragraph", text: "The lighthouse also became a refuge during the catastrophic 1900 and 1915 hurricanes. That history makes the tower more than a navigation landmark. It is a physical reminder of how exposed Gulf Coast communities depended on the strongest structures available when major storms arrived." },
      { type: "paragraph", text: "Practical plan: do not plan on entering or climbing the lighthouse. Treat it as a private, view-only historic landmark and keep the Galveston-Port Bolivar Ferry in the itinerary. The ferry corridor, ships, jetties and low coastal terrain explain the tower's original job better than a disconnected roadside photo would." },
      { type: "paragraph", text: "Official authorities to verify: U.S. Coast Guard Historian's Office for lighthouse history; Texas Department of Transportation for current Galveston-Port Bolivar Ferry operations." },

      { type: "heading", text: "3. Halfmoon Reef Lighthouse — best easy historic stop from land" },
      { type: "image", image: lighthouseImages.halfmoon, caption: "Halfmoon Reef Lighthouse was moved from Matagorda Bay to Port Lavaca, making it one of the easiest historic Texas lighthouse structures to see from land." },
      { type: "paragraph", text: "Halfmoon Reef is the practical choice for travelers who want lighthouse history without a remote-island plan. The structure was built in 1858 as a screw-pile lighthouse in Matagorda Bay, where it marked a dangerous reef rather than a Gulf entrance. After Civil War darkness, federal repairs and decades of service, a 1942 hurricane badly damaged the station." },
      { type: "paragraph", text: "The lighthouse survived because it was moved. After leaving active service and spending time in a dredging yard, the structure was relocated to Port Lavaca and restored. The Texas Historical Commission places the historical marker at Bayfront Park and identifies the property as public. Its onshore setting no longer duplicates the shallow-water environment it originally marked, but that tradeoff is precisely why visitors can still see it easily today." },
      { type: "paragraph", text: "Practical plan: use Halfmoon Reef as a short Port Lavaca history stop rather than a tower-climb destination. Pair it with the waterfront, Indianola history and a look across Lavaca and Matagorda bays so the original navigation problem makes sense. There is no dependable official tower-hours schedule to plan around, so treat the exterior historic site as the reliable visit." },
      { type: "paragraph", text: "Official authority to verify: Texas Historical Commission historical survey and Atlas material for Calhoun County and Halfmoon Reef Lighthouse." },

      { type: "heading", text: "4. Lydia Ann Lighthouse — best for Port Aransas waterways" },
      { type: "image", image: lighthouseImages.lydiaAnn, caption: "Lydia Ann Lighthouse survives across the waterways from Port Aransas; the property is private, so the public experience is from lawful waterway viewpoints and Lighthouse Lakes." },
      { type: "paragraph", text: "Lydia Ann Lighthouse, historically the Aransas Pass Light Station, is the strongest lighthouse choice for travelers who want the surrounding landscape to do as much work as the tower. Established in the 1850s and first lit in 1857, the brick lighthouse helped vessels navigate the natural pass between the Gulf and the bays behind Mustang and San José islands." },
      { type: "paragraph", text: "The station was damaged during the Civil War when Confederate forces attempted to keep it from aiding Federal operations. It was rebuilt and relit after the war and remained a federal lighthouse station until 1952. The historic structure survives as a private aid to navigation." },
      { type: "paragraph", text: "Practical plan: do not attempt to enter the privately owned lighthouse property. Texas Parks and Wildlife identifies Lighthouse Lakes as a public paddling landscape near the historic lighthouse, with four loops ranging from about 1.25 to 6.8 miles and public access points along Highway 361. Conditions and sight lines vary, so think of Lydia Ann as a waterway experience rather than a guaranteed close-up tower stop." },
      { type: "paragraph", text: "Official authorities to verify: U.S. Coast Guard Historian's Office for the Aransas Pass Light Station history; Texas Parks and Wildlife Department for Lighthouse Lakes paddling information." },

      { type: "heading", text: "5. Matagorda Island Lighthouse — best for remote maritime history" },
      { type: "image", image: lighthouseImages.matagorda, caption: "Matagorda Island Lighthouse stands in a remote barrier-island setting near Pass Cavallo; current TPWD guidance makes this a restricted, boat-only daylight outing rather than a normal roadside attraction." },
      { type: "paragraph", text: "Matagorda Island Lighthouse is the opposite of a quick roadside stop. The tower is tied to Pass Cavallo, barrier-island geography and the old shipping routes into Matagorda Bay. An earlier light was built in the 1850s, the Civil War damaged the station, and the lighthouse was rebuilt farther inland in 1873 using surviving cast-iron material along with new components." },
      { type: "paragraph", text: "The surviving tower is one of the most atmospheric lighthouse settings on the Texas coast because the island remains remote. There is no ordinary road bridge to the lighthouse. Texas Parks and Wildlife currently says access to Matagorda Island Wildlife Management Area is restricted and visitors should call ahead; the island is accessible only by boat." },
      { type: "paragraph", text: "The important nuance is that 'restricted' does not mean the lighthouse area is categorically closed. TPWD says the north end of the island—including the headquarters/runway area, road system to the lighthouse and beach—is available for unsupervised wildlife viewing and hiking during daylight hours. Because management arrangements and transportation can change, confirm the current rules before committing to the trip." },
      { type: "paragraph", text: "Practical plan: begin with Port O'Connor, arrange lawful boat access, call ahead as TPWD directs and treat the outing as a remote wildlife-management-area visit rather than a ticketed lighthouse attraction. Do not rely on old ferry, shuttle or mileage information without current confirmation." },
      { type: "paragraph", text: "Official authorities to verify: Texas Historical Commission for the lighthouse record; Texas Parks and Wildlife Department and the current Matagorda Island refuge / wildlife-management authority for present-day access." },

      { type: "heading", text: "6. Sabine Pass Lighthouse — best for the story, not a conventional visit" },
      { type: "image", image: lighthouseImages.sabine, caption: "Sabine Pass Lighthouse stands in Louisiana, across the boundary waterway from Texas; include it for the shared maritime story, not as a conventional Texas tower visit." },
      { type: "paragraph", text: "Sabine Pass belongs on a Texas lighthouse list with a geographic warning in bold: the historic lighthouse tower stands on the Louisiana side of the Sabine. The waterway forms the Texas-Louisiana boundary, however, and the light served the Gulf entrance used by vessels traveling toward the Texas side of the Sabine-Neches system." },
      { type: "paragraph", text: "For a Texas traveler, the useful public context is on the Texas side. Sabine Pass Battleground explains the 1863 Civil War battle, while Port Arthur and the Sabine-Neches Ship Channel show how the upper coast evolved into one of the country's major industrial and maritime corridors." },
      { type: "paragraph", text: "Practical plan: do not advertise this as a normal public lighthouse attraction. Build the stop around Sabine Pass Battleground, the ship channel and the Texas-Louisiana border-waterway story, then use the dedicated TexasDefined authority page for the lighthouse's history and geographic caveat." },
      { type: "paragraph", text: "Official authorities to verify: National Park Service / National Register documentation and appropriate Louisiana property or preservation authorities for the lighthouse itself; Texas Historical Commission for Texas-side Sabine Pass context." },

      { type: "heading", text: "Best lighthouse near Houston, Galveston, Corpus Christi and South Padre" },
      { type: "list", items: [
        "From Houston: Point Bolivar is the most natural lighthouse add-on if you are willing to make the Galveston / Bolivar ferry corridor part of the day; it is a view-only private tower, not a climb.",
        "From Galveston: Point Bolivar is the obvious lighthouse landmark. Ride the ferry, respect private property and pair the view with Galveston port and hurricane history.",
        "From Corpus Christi / Port Aransas: Lydia Ann is the strongest regional choice, especially if you want ferries, paddling, marshes and working-waterway context rather than a public tower.",
        "From South Padre Island: Port Isabel is the clear choice and the only one on this list built around a conventional public lighthouse visit and climb when operations allow."
      ] },

      { type: "heading", text: "How to organize a Texas lighthouse road trip" },
      { type: "paragraph", text: "A coastwide lighthouse trip works better as four geographic legs than as one giant checklist. Upper Coast: Sabine Pass history, Galveston and Point Bolivar. Middle Coast: Port Lavaca, Halfmoon Reef, Port O'Connor and a separately planned Matagorda Island outing. Coastal Bend: Port Aransas, Lighthouse Lakes and Lydia Ann. Lower Coast: Port Isabel, South Padre Island and Brownsville. That order follows the coast and keeps the travel logic visible." },
      { type: "paragraph", text: "Use the TexasDefined lighthouse map for location context and the dedicated road-trip guide for sequencing. Do not let a map pin imply public access: the governing distinction is whether the site is a public attraction, a lawful view-only landmark, a restricted remote-access site or a historical story tied to another jurisdiction." },

      { type: "heading", text: "Which Texas lighthouse can you actually climb?" },
      { type: "paragraph", text: "Port Isabel is the Texas lighthouse to plan a public climb around. Current official hours are 9 a.m.–6 p.m. off-season and 10 a.m.–9 p.m. in summer, weather permitting, but tower access can still be limited by site conditions. Point Bolivar and Lydia Ann are private, Halfmoon Reef is a preserved relocated structure rather than a public tower climb, Matagorda Island requires restricted remote-access planning, and Sabine Pass is not a conventional Texas public lighthouse attraction." },
      { type: "heading", text: "Which Texas lighthouse is easiest to visit without a boat?" },
      { type: "paragraph", text: "Port Isabel is the strongest full lighthouse visit without a boat. Halfmoon Reef is the easiest preserved lighthouse structure to add to a road trip from land. Point Bolivar can be incorporated into a Galveston / Bolivar ferry day, but the lighthouse itself remains private." },
      { type: "heading", text: "Can you visit Lydia Ann Lighthouse from Port Aransas?" },
      { type: "paragraph", text: "You can experience the lighthouse's setting from lawful public waterways and the Lighthouse Lakes paddling system, but the lighthouse property itself is private. TPWD's trail network has four loops ranging from about 1.25 to 6.8 miles, with access points along Highway 361 between Aransas Pass and Port Aransas." },
      { type: "heading", text: "Is Matagorda Island Lighthouse open to the public?" },
      { type: "paragraph", text: "Not as a conventional attraction. TPWD currently describes access to Matagorda Island Wildlife Management Area as restricted and boat-only and tells visitors to call ahead. At the same time, TPWD says the north end—including the road system to the lighthouse—is available for unsupervised wildlife viewing and hiking during daylight hours. Verify current transportation and management rules before planning the trip." },
      { type: "heading", text: "Why is Sabine Pass Lighthouse on a Texas list if it is in Louisiana?" },
      { type: "paragraph", text: "Because the Sabine is the Texas-Louisiana boundary waterway and the lighthouse served the Gulf entrance connected to the Texas side of the Sabine-Neches system. Geographically the tower is in Louisiana; historically the navigation story crosses the state line." },

      { type: "heading", text: "Texas lighthouse trip-planning rules that prevent disappointment" },
      { type: "list", items: [
        "Check the current managing authority before traveling to any lighthouse where access, weather, ferry service or transportation matters.",
        "For Port Isabel, use the Texas Historical Commission's current hours and admission as the final pre-trip check; summer and off-season schedules differ and climbs are weather permitting.",
        "Do not assume a surviving lighthouse is open to the public simply because it appears on a map.",
        "Respect private-property boundaries at Point Bolivar and Lydia Ann and use lawful public vantage points.",
        "Treat Matagorda Island as a restricted, boat-only wildlife-management-area trip and call ahead rather than describing the lighthouse as simply open or closed.",
        "Remember that the Sabine Pass tower is in Louisiana even though its maritime history is inseparable from the Texas side of the waterway.",
        "Use the dedicated authority guides linked on this page when you want deeper history, then return to the managing agency for same-day access rules."
      ] },
      { type: "heading", text: "The bottom line" },
      { type: "paragraph", text: "For a traditional public lighthouse experience, start with Port Isabel. For Galveston Bay history, use Point Bolivar as a view-only ferry-corridor landmark. For the easiest preserved structure from land, choose Halfmoon Reef. For Port Aransas waterways and paddling context, choose Lydia Ann. For a serious remote coastal-history outing, investigate Matagorda Island with current TPWD access guidance in hand. For the eastern border-waterway story, include Sabine Pass with the clear understanding that its tower stands in Louisiana. Together they explain the Texas coast far better than a generic list of lighthouse pins ever could." },
    ],
  },
];