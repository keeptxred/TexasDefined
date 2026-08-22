import roadTrip from "@/assets/road-trip.jpg";

import type { Article, ImageRef } from "../types";

const BRAND = "texasdefined" as const;
const coastHero: ImageRef = { src: roadTrip, alt: "A Texas Gulf Coast road leading toward open coastal country", width: 1600, height: 1067 };
const portIsabelHero: ImageRef = {
  src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Port_Isabel%2C_Texas_Lighthouse.jpg?width=1600",
  alt: "Port Isabel Lighthouse on the southern Texas Gulf Coast",
  width: 1600,
  height: 1200,
  credit: "Billy D. Wagner · CC BY-SA 4.0 · Wikimedia Commons",
};

export const lighthouseDeepDiveArticles: Article[] = [
  {
    id: "lh-1", brandId: BRAND, slug: "point-bolivar-lighthouse-history", title: "Point Bolivar Lighthouse: The Black Tower at Galveston Bay",
    dek: "The history of the cast-iron lighthouse that guarded the Bolivar side of Galveston Bay, survived catastrophic hurricanes and still stands beside one of Texas' busiest ferry approaches.",
    category: "texas-history", region: "gulf-coast", hero: coastHero, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 8,
    tags: ["Point Bolivar Lighthouse", "Galveston County", "Bolivar Peninsula", "Galveston Bay", "Texas lighthouses", "1900 hurricane"], relatedCollections: [], relatedDestinations: [],
    sourceName: "U.S. Coast Guard Historian's Office · Texas Historical Commission", sourceUrl: "https://www.history.uscg.mil/Browse-by-Topic/Assets/Land/Lighthouses-Light-Stations/Article/2014930/point-bolivar-lighthouse/",
    internalLinks: [
      { href: "/explore/lighthouses", label: "Open the Texas lighthouse map", description: "See Bolivar in the coastwide network and compare public-access status." },
      { href: "/article/texas-lighthouses-complete-guide", label: "Read the complete Texas lighthouse guide", description: "Follow the surviving and lost lights from Sabine Pass to Port Isabel." },
      { href: "/county/galveston", label: "Explore Galveston County", description: "Connect the tower with Galveston, the ferry, ports, storms and island history." },
    ],
    body: [
      { type: "paragraph", text: "Point Bolivar Lighthouse is the dark vertical punctuation mark on the Bolivar side of the Galveston Bay entrance. The present cast-iron tower was first lit in 1873, replacing an earlier station disrupted during the Civil War. Its job was simple to describe and difficult to perform: help ships distinguish the bay entrance and approach one of the most important ports on the Texas coast." },
      { type: "heading", text: "A lighthouse built for Galveston's rise" },
      { type: "paragraph", text: "The first federal light at Point Bolivar dates to the early 1850s, when Galveston's commercial importance was growing rapidly. The station stood opposite Galveston Island at a passage that concentrated inbound and outbound traffic. A reliable coastal light mattered because the surrounding land was low and visually repetitive, especially at night or in poor weather." },
      { type: "paragraph", text: "Civil War disruption ended the first tower's service. After the war, the station returned with a stronger cast-iron structure lined with brick. The U.S. Coast Guard's historical record dates the current tower's first lighting to 1873. Its black exterior became one of the most recognizable lighthouse profiles on the Gulf Coast." },
      { type: "heading", text: "The tower became a storm refuge" },
      { type: "paragraph", text: "Point Bolivar's story is inseparable from hurricanes. Texas Historical Commission records note that residents sought shelter in the lighthouse during the devastating 1900 and 1915 storms. That changed the tower's meaning. It was not only a navigational aid seen from offshore; in moments of disaster it became one of the strongest structures available to people on the peninsula." },
      { type: "heading", text: "Why the light went out" },
      { type: "paragraph", text: "The station was deactivated in 1933 as navigation systems and the Galveston entrance evolved. The tower survived, however, and was listed in the National Register of Historic Places in 1977 for its connections to transportation, architecture and commerce." },
      { type: "heading", text: "How to see Point Bolivar today" },
      { type: "paragraph", text: "Point Bolivar is best treated as a view-only historic landmark rather than a public lighthouse climb. The surrounding ferry approach is part of the experience: ships, ferries, jetties and the width of the Galveston entrance make the lighthouse's original purpose immediately understandable. Pair it with the Galveston-Port Bolivar Ferry and Galveston's port and hurricane history." },
    ],
  },
  {
    id: "lh-2", brandId: BRAND, slug: "lydia-ann-lighthouse-port-aransas", title: "Lydia Ann Lighthouse: The Light Across From Port Aransas",
    dek: "Why the 1857 Aransas Pass light survived Civil War demolition attempts, returned to service and still marks the maritime landscape behind Port Aransas as a private aid to navigation.",
    category: "texas-history", region: "gulf-coast", hero: coastHero, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 9,
    tags: ["Lydia Ann Lighthouse", "Aransas Pass Lighthouse", "Port Aransas", "Aransas County", "Lighthouse Lakes", "Texas lighthouses"], relatedCollections: [], relatedDestinations: [],
    sourceName: "U.S. Coast Guard Historian's Office", sourceUrl: "https://www.history.uscg.mil/Browse-by-Topic/Assets/Land/All/Article/2014937/aransas-pass-light-station-lydia-ann-lighthouse/",
    internalLinks: [
      { href: "/explore/lighthouses", label: "Find Lydia Ann on the lighthouse map", description: "Compare the Coastal Bend light with the rest of the Texas Gulf Coast network." },
      { href: "/article/texas-lighthouse-road-trip", label: "Add Lydia Ann to the lighthouse road trip", description: "Build the Port Aransas stop around ferries, waterways and maritime history." },
      { href: "/county/aransas", label: "Explore Aransas County", description: "Continue into the bays, islands and communities around the lighthouse." },
    ],
    body: [
      { type: "paragraph", text: "Lydia Ann Lighthouse feels hidden even when you know where to look. The brick tower stands on Harbor Island northwest of Aransas Pass, separated from ordinary road travel by channels, marshes and the working waterways around Port Aransas. That setting is not an inconvenience to the story. It is the story." },
      { type: "heading", text: "The Aransas Pass Light began in the 1850s" },
      { type: "paragraph", text: "The station was established in 1855 and first lit in 1857. The natural pass between the Gulf and the bays behind Mustang and San José islands needed a recognizable light for vessels entering the region. The brown octagonal brick tower carried a fourth-order Fresnel lens." },
      { type: "heading", text: "Confederate troops tried to destroy it" },
      { type: "paragraph", text: "The lens was removed and the station secured in 1861. Confederate forces later attempted to destroy the lighthouse so it could not aid Federal operations. Coast Guard historical records describe explosive damage to brickwork and the iron stairway. A federal survey after the war found the structure badly injured but salvageable." },
      { type: "paragraph", text: "The tower was rebuilt in 1867 and relit that June. It continued serving the pass until the Coast Guard disestablished the federal light station in 1952 and shifted navigational aids elsewhere." },
      { type: "heading", text: "A lighthouse that still has a light" },
      { type: "paragraph", text: "The old station survives as the Lydia Ann Channel Light, a private aid to navigation. That makes it unusual: the historic structure is no longer a federal lighthouse station, but it still participates in the visual language of navigation on the coast." },
      { type: "heading", text: "The best public connection is from the water" },
      { type: "paragraph", text: "The lighthouse is privately owned and is not a public tower. Texas Parks and Wildlife's Lighthouse Lakes Paddling Trail, however, moves through the black-mangrove estuary near the historic light. From Port Aransas and nearby waterways, visitors can understand how the lighthouse relates to Harbor Island, the pass and the ship channel without trespassing on the property." },
    ],
  },
  {
    id: "lh-3", brandId: BRAND, slug: "matagorda-island-lighthouse-history", title: "Matagorda Island Lighthouse: The Black Tower Beyond Port O'Connor",
    dek: "A cast-iron lighthouse rebuilt after the Civil War, moved inland from an eroding shoreline and preserved on one of the wildest barrier islands of the middle Texas coast.",
    category: "texas-history", region: "gulf-coast", hero: coastHero, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 10,
    tags: ["Matagorda Island Lighthouse", "Calhoun County", "Port O'Connor", "Pass Cavallo", "Texas lighthouses", "Matagorda Island"], relatedCollections: [], relatedDestinations: [],
    sourceName: "Texas Historical Commission · Texas Parks and Wildlife Department", sourceUrl: "https://atlas.thc.texas.gov/Details/2084001624",
    internalLinks: [
      { href: "/explore/lighthouses", label: "Find Matagorda Island on the lighthouse map", description: "See how the remote middle-coast light fits between Bolivar and the Coastal Bend." },
      { href: "/article/texas-lighthouse-road-trip", label: "Plan the middle-coast lighthouse leg", description: "Pair Matagorda Island history with Halfmoon Reef and Port Lavaca." },
      { href: "/county/calhoun", label: "Explore Calhoun County", description: "Connect the lighthouse with Port Lavaca, Port O'Connor, Indianola and Matagorda Bay." },
    ],
    body: [
      { type: "paragraph", text: "Matagorda Island Lighthouse rises from a barrier island where access has always been defined by water. The station was built to help vessels use Pass Cavallo, the opening between Matagorda Island and Matagorda Peninsula that once carried shipping into Matagorda Bay and toward ports such as Indianola and Port Lavaca." },
      { type: "heading", text: "The first light was built in 1852" },
      { type: "paragraph", text: "The federal government acquired land for a lighthouse in 1848. Construction of a cast-iron tower began in 1852, and the first light shone at the end of that year. The tower was later raised and fitted with a third-order Fresnel lens, improving its reach over the Gulf." },
      { type: "heading", text: "War and erosion forced a rebuild" },
      { type: "paragraph", text: "The Civil War darkened the station. Confederate troops removed the lens and damaged the structure. After the war, the damaged tower was dismantled. The lighthouse was rebuilt farther inland in 1873 using surviving iron panels along with new material, a move that also reduced the threat from shoreline erosion." },
      { type: "paragraph", text: "The rebuilt 92-foot tower served for generations. It was eventually automated, later decommissioned by the Coast Guard in 1995, and preserved through a partnership involving public agencies and local supporters. It entered the National Register of Historic Places in 1984." },
      { type: "heading", text: "The lighthouse returned to light" },
      { type: "paragraph", text: "Texas Parks and Wildlife completed a major restoration in the early 2000s after corrosion and more than a century of Gulf weather threatened the cast-iron structure. A modern solar-powered marine lantern had already returned a light to the tower at the turn of the millennium. The historic Fresnel lens itself had been removed earlier for preservation." },
      { type: "heading", text: "Why this is not a casual roadside stop" },
      { type: "paragraph", text: "Matagorda Island has no bridge to the mainland. Conditions, transportation options and management arrangements can change, so visitors should verify current access with the responsible public agencies before planning a trip. The remoteness is precisely what makes the lighthouse one of the strongest places to understand the old Texas coast: the tower still stands in the kind of barrier-island environment it was built to serve." },
    ],
  },
  {
    id: "lh-4", brandId: BRAND, slug: "halfmoon-reef-lighthouse-port-lavaca", title: "Halfmoon Reef Lighthouse: The Texas Light That Came Ashore",
    dek: "How an 1858 screw-pile lighthouse survived Civil War darkness and hurricane damage, then moved from Matagorda Bay to a permanent home beside Port Lavaca.",
    category: "texas-history", region: "gulf-coast", hero: coastHero, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 8,
    tags: ["Halfmoon Reef Lighthouse", "Port Lavaca", "Calhoun County", "Matagorda Bay", "Texas lighthouses"], relatedCollections: [], relatedDestinations: [],
    sourceName: "Texas Historical Commission", sourceUrl: "https://thc.texas.gov/sites/default/files/2025-04/Calhoun_County_Survey_Report.pdf",
    internalLinks: [
      { href: "/explore/lighthouses", label: "Find Halfmoon Reef on the lighthouse map", description: "Compare the relocated light with the surviving offshore and coastal towers." },
      { href: "/article/matagorda-island-lighthouse-history", label: "Continue to Matagorda Island Lighthouse", description: "See the other major Calhoun County lighthouse story." },
      { href: "/county/calhoun", label: "Explore Calhoun County", description: "Use Port Lavaca, Port O'Connor and Matagorda Bay as the larger maritime context." },
    ],
    body: [
      { type: "paragraph", text: "Halfmoon Reef Lighthouse looks almost too small to belong to the same family as the tall towers at Bolivar or Port Isabel. That is because it was built for a different job. The 1858 structure stood out in Matagorda Bay on screw piles, marking a reef that threatened vessels using the bay." },
      { type: "heading", text: "A bay lighthouse rather than a coastal tower" },
      { type: "paragraph", text: "Texas navigation required more than tall Gulf-facing towers. Shallow bays contained reefs, bars and channels that could be dangerous even after a vessel had safely entered from the Gulf. Halfmoon Reef Light was part of that second layer of navigation infrastructure." },
      { type: "heading", text: "Civil War darkness and a hurricane ending" },
      { type: "paragraph", text: "The Confederacy controlled the lighthouse during the Civil War and kept it dark. The federal government repaired it and returned it to service in 1868. Decades later, a 1942 hurricane badly damaged the structure. The Coast Guard condemned it and removed it from active service." },
      { type: "heading", text: "The lighthouse was saved by moving it" },
      { type: "paragraph", text: "After a period in a dredging yard, the lighthouse was donated to the Calhoun County Historical Commission. In 1979 it was moved to a permanent site at Port Lavaca, repaired and painted. The relocation removed it from the exact water setting that explains its original purpose, but it also preserved a rare example of the bay lights that once made Texas shipping safer." },
      { type: "heading", text: "Pair the structure with the bay" },
      { type: "paragraph", text: "Seeing Halfmoon Reef makes the most sense when you also look across Lavaca and Matagorda bays. The small structure becomes a doorway into a larger history of Indianola, Port Lavaca, Port O'Connor, Pass Cavallo and the constant effort to move ships through shallow coastal water." },
    ],
  },
  {
    id: "lh-5", brandId: BRAND, slug: "sabine-pass-lighthouse-texas-border", title: "Sabine Pass Lighthouse and the Eastern Edge of the Texas Coast",
    dek: "The unusual border lighthouse story at Sabine Pass, where a tower on the Louisiana side still belongs to the navigation, war and port history of Texas' eastern Gulf gateway.",
    category: "texas-history", region: "gulf-coast", hero: portIsabelHero, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 8,
    tags: ["Sabine Pass Lighthouse", "Jefferson County", "Sabine Pass", "Texas Louisiana border", "Texas lighthouses", "Sabine Neches"], relatedCollections: [], relatedDestinations: [],
    sourceName: "NOAA Coast and Geodetic Survey", sourceUrl: "https://data.ngdc.noaa.gov/platforms/ocean/nos/coast/F00001-F02000/F00351/DR/F00351.pdf",
    internalLinks: [
      { href: "/explore/lighthouses", label: "Start the Texas lighthouse map at Sabine Pass", description: "Follow the Gulf Coast southwest toward Bolivar, Matagorda, Lydia Ann and Port Isabel." },
      { href: "/article/texas-lighthouse-road-trip", label: "Begin the lighthouse road trip", description: "Use Sabine Pass as the eastern historical gateway before continuing to Galveston." },
      { href: "/county/jefferson", label: "Explore Jefferson County", description: "Connect the lighthouse story with Sabine Pass, Beaumont, Port Arthur and the ship channel." },
    ],
    body: [
      { type: "paragraph", text: "Sabine Pass creates an immediate complication for anyone trying to draw a tidy map of Texas lighthouses: the historic lighthouse stands on the Louisiana side of the Sabine. Yet the waterway is the Texas-Louisiana boundary, and the light served the same entrance used by vessels bound for the Texas side of the Sabine-Neches system. It belongs in the Texas coastal story as a border lighthouse, not as a claim that the tower itself sits inside Texas." },
      { type: "heading", text: "A lighthouse for a border waterway" },
      { type: "paragraph", text: "The Sabine was both boundary and transportation corridor. A lighthouse at the pass helped vessels locate the entrance from the Gulf before moving into waters serving communities and industries on both sides. NOAA survey records preserve precise historical positions for the Sabine Pass Lighthouse, evidence of how carefully federal navigators mapped the structure." },
      { type: "heading", text: "Why Sabine Pass matters to Texas history" },
      { type: "paragraph", text: "The pass is better known in Texas history for the Civil War battle in which a small Confederate force defended the waterway in 1863. Later, the region's economic importance expanded dramatically with petroleum refining, ports and the Sabine-Neches Ship Channel. The lighthouse therefore sits at the beginning of a much larger story about the industrial upper Gulf Coast." },
      { type: "heading", text: "Use the lighthouse as the eastern endpoint, not a public attraction promise" },
      { type: "paragraph", text: "This is a historical and geographic stop rather than a conventional public lighthouse visit. Travelers should use Sabine Pass Battleground and the Texas side of the waterway for interpretation, then continue southwest toward Galveston and Point Bolivar. That route makes the border light's function clearer than treating it as an isolated tower." },
    ],
  },
];
