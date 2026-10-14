import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });
const navalImage = (file: string, alt: string, width: number, height: number, credit: string, caption: string): ArticleBlock => ({
  type: "image",
  image: {
    src: `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=1280`,
    alt, width, height, credit,
  },
  caption,
});

/**
 * Distinguish the WWII aircraft carrier CV-16 from the separate Lexington CV-2
 * lost at Coral Sea, and from the U.S. battleships named Texas. Curated links
 * below use individual official or archival evidence, not unlicensed stock.
 */
export const ussLexingtonCv16HistoryVisitorGuideArticle: Article = {
  id: "evergreen-uss-lexington-cv16-history-visitor-guide",
  brandId: "texasdefined",
  slug: "uss-lexington-cv16-history-visitor-guide",
  title: "USS Lexington (CV-16): The Blue Ghost, World War II Aircraft Carrier and Corpus Christi Museum",
  dek: "The complete story of USS Lexington: 1942 launching, Pacific combat, postwar jet-era and training-carrier service, preservation on Corpus Christi's North Beach, and practical museum hours, tickets, accessibility and photographs.",
  category: "texas-history",
  region: "gulf-coast",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/USS_Lexington_%28CV-16%29_underway_on_13_June_1944.jpg?width=1600",
    alt: "USS Lexington CV-16 in the western Pacific, photographed from an airborne SBD Dauntless on June 13, 1944",
    width: 5732, height: 4313,
    credit: "U.S. Navy photograph 80-G-236932 · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-10-14",
  updatedAt: "2026-10-14",
  readingMinutes: 18,
  tags: ["USS Lexington CV-16", "Blue Ghost aircraft carrier", "USS Lexington Corpus Christi", "Texas naval museums", "World War II Pacific", "Essex class carriers", "Naval aviation", "Corpus Christi museums"],
  featured: true,
  sourceName: "USS Lexington Museum on the Bay",
  sourceUrl: "https://usslexington.com/about-the-uss-lexington/the-ship/",
  sources: [
    { label: "USS Lexington Museum — ship's service history and specifications", url: "https://usslexington.com/about-the-uss-lexington/the-ship/" },
    { label: "USS Lexington Museum — museum and preservation history", url: "https://usslexington.com/about-the-uss-lexington/the-museum/" },
    { label: "USS Lexington Museum — hours, admissions, parking and accessibility (checked 2026-10-14)", url: "https://usslexington.com/visit/hours-admission/" },
    { label: "National Park Service — National Historic Landmark interpretation", url: "https://home.nps.gov/articles/the-uss-lexington.htm" },
    { label: "Historic CV-16 photographs, individual image rights and dates", url: "https://commons.wikimedia.org/wiki/Category:USS_Lexington_(CV-16)" },
    { label: "Museum-era photograph categories and creator rights", url: "https://commons.wikimedia.org/wiki/Category:USS_Lexington_Museum_on_the_Bay" },
  ],
  internalLinks: [
    { href: "/destination/uss-lexington-museum-corpus-christi", label: "Visit USS Lexington in Corpus Christi", description: "Address, accessibility, current hours, admission and nearby Corpus Christi attractions." },
    { href: "/article/battleship-texas-bb-35-history-restoration", label: "Battleship Texas (BB-35) history and restoration", description: "Contrast the battleship's 14-inch shore-bombardment guns and preservation project in Galveston with Lexington's carrier air wing." },
    { href: "/article/uss-texas-1895-original-battleship", label: "Original USS Texas (1895)", description: "The first U.S. battleship named Texas fought at Santiago de Cuba and never served in World War II." },
    { href: "/article/texas-world-war-ii-historic-sites-guide", label: "Texas and World War II historic places", description: "Find Texas museums, ships, memorials and sites preserving the global war." },
    { href: "/article/texas-military-museums-historic-sites-guide", label: "Best Texas military museums and historic sites", description: "Choose between a carrier, a battleship, aircraft museums, military forts and battlefields." },
    { href: "/article/texas-military-history-timeline", label: "Texas military history timeline", description: "Place the aviation revolution after earlier battleship eras." },
    { href: "/county/nueces", label: "Nueces County travel and history", description: "Plan North Beach, the Corpus Christi waterfront and the Coastal Bend." },
    { href: "/destination/texas-state-aquarium", label: "Texas State Aquarium", description: "The next-door North Beach companion attraction." },
  ],
  relatedCollections: [],
  relatedDestinations: ["uss-lexington-museum-corpus-christi", "texas-state-aquarium", "battleship-texas", "national-museum-pacific-war"],
  body: [
    p("USS Lexington (CV-16), nicknamed the Blue Ghost, is not a battleship. She is an Essex-class aircraft carrier whose World War II aircraft attacked targets hundreds of miles from the ship, whose deck operated fighters and bombers, and whose service lasted until 1991. Today the carrier is preserved on North Beach in Corpus Christi, where visitors can explore selected spaces from the flight deck to exhibits inside the hull. She provides the strongest direct comparison to Battleship Texas (BB-35): a different weapon, a different mission, and a different preservation story."),
    p("A crucial naming distinction: CV-16 was not the famous earlier aircraft carrier USS Lexington (CV-2), sunk at the Battle of the Coral Sea in May 1942. The new Essex-class carrier was originally intended to be named Cabot, but it received the Lexington name after CV-2 was lost. Nor was either Lexington a U.S. warship named Texas. We connect them because together they explain the shift from gun-centered sea power to aviation."),
    h("At a glance: the three Texas-connected museum and history ships"),
    list(
      "USS Texas (1895–1911): a second-class/pre-dreadnought battleship; fought during the Spanish–American War; renamed San Marcos; not preserved for visiting.",
      "USS Texas (BB-35, 1914–1948): a dreadnought battleship that served in both World Wars; preserved and currently CLOSED for routine tours during restoration at Gulf Copper in Galveston; planned future museum at Pier 15.",
      "USS Lexington (CV-16, 1943–1991): an Essex-class fleet aircraft carrier; Pacific War and later Navy training service; open as a museum on North Beach in Corpus Christi (check operator hours before traveling)."
    ),
    h("1941–1943: a new aircraft carrier gets a famous name"),
    p("The Navy laid the keel of the future CV-16 at the Fore River Shipyard in Quincy, Massachusetts, during 1941. Launched on September 26, 1942, the ship was commissioned on February 17, 1943. She belonged to the mass-produced Essex class, a principal instrument of American naval air power across the Pacific."),
    p("The carrier was originally laid down as Cabot. After Lexington (CV-2) was lost at Coral Sea, the Navy transferred that honored name to CV-16. It is a rare instance where confusing ships with the same name can change the interpretation of a whole campaign: the 1942 Lexington loss belongs to CV-2; the carrier visible in Corpus Christi and the great 1944–45 fast-carrier operations belong to CV-16."),
    navalImage("Launch of USS Lexington (CV-16) at the Fore River Shipyard in 1942.jpg", "The Essex-class aircraft carrier Lexington launching at Fore River in 1942", 1193, 981, "U.S. Navy archive · Public domain · Wikimedia Commons", "1942 — The newly launched carrier was part of the industrial expansion that transformed Pacific sea power."),
    h("Why the aircraft carrier changed naval warfare"),
    p("A battleship such as BB-35 put its fighting power into armored hulls and turret guns. A fleet carrier used fighters, dive bombers and torpedo planes to strike aircraft, shipping and targets ashore far beyond the reach of a battleship's guns. The carrier was therefore both a moving airfield and an intricate refueling, armament, aviation-maintenance and command system."),
    p("That difference changed strategy, logistics and the lives of sailors. Lexington needed flight-deck crews, aviation gasoline, aircraft mechanics, bomb and torpedo handlers, fire and damage control teams, and a command organization coordinating flight cycles. Battleships still provided valuable shore bombardment and protection, but the fleet carrier became the main long-range strike platform."),
    navalImage("USS Lexington (CV-16) underway on 12 November 1943.jpg", "USS Lexington aircraft carrier underway during late-1943 Pacific deployment", 5725, 3146, "U.S. Navy archive · Public domain · Wikimedia Commons", "November 1943 — Lexington moving with the U.S. fleet before her major 1944 campaign work."),
    h("1943–1945: combat in the Pacific"),
    p("Lexington joined the Pacific carrier force in 1943 and took part in successive fast-carrier raids and island campaigns. Her aircraft helped project U.S. air power across the central and western Pacific, including operations connected with the Gilberts, Marshalls, Marianas and later Philippine and Japanese approaches. Rather than treating a list of battles as the entire story, the central development was the emergence of sustained aircraft operations from a mobile seagoing base."),
    p("The June 1944 Marianas operations, including the Battle of the Philippine Sea, demonstrated the strength of U.S. carrier air groups and pilot training against Japan's naval air forces. Lexington was among the carriers whose squadrons contributed to that campaign."),
    navalImage("USS Lexington (CV-16) underway on 13 June 1944.jpg", "Lexington seen from the rear cockpit of a Dauntless dive bomber just after takeoff in June 1944", 5732, 4313, "U.S. Navy photograph 80-G-236932 · Public domain · Wikimedia Commons", "June 13, 1944 — A view from a departing Dauntless during strikes in the Marianas, before the Philippine Sea battle."),
    navalImage("USS Lexington (CV-16) underway on 20 June 1944.jpg", "Lexington maneuvering with aircraft on deck during the Marianas campaign in June 1944", 5194, 3897, "U.S. Navy archive · Public domain · Wikimedia Commons", "June 20, 1944 — Lexington's flight operations during the Philippine Sea campaign."),
    h("The Blue Ghost nickname"),
    p("The ship's museum recounts Japanese reports of Lexington being sunk repeatedly, even though the carrier returned to action after attacks and repairs. The museum associates the nickname 'Blue Ghost' with that reputation, wartime naval camouflage and Tokyo Rose broadcasts. Because popular retellings of radio propaganda often conflate several voices and later memories, the nickname is best attributed to the museum's historical tradition rather than presented as a verbatim surviving broadcast quotation."),
    p("During World War II, Lexington's aircraft and gunners served in dangerous operations far from the ship's home shores. The human story includes pilots killed on missions, deck personnel working around propellers and ordnance, and sailors who fought fires and damage. A carefully captioned photograph of the ship's flight deck should be read as a record of those working conditions, not only of military equipment."),
    h("Why Lexington was not the same kind of ship as Battleship Texas"),
    p("BB-35's primary offensive weapons were ten 14-inch guns and its wartime assignment repeatedly involved firing on coastal positions to support troops landing ashore. CV-16 launched aircraft for reconnaissance, interception and strikes across a far wider radius. The ships' combat histories overlap chronologically in 1944–45 but not in purpose: Lexington participated in carrier strikes in the Pacific while Texas supported amphibious operations from North Africa and Normandy to Iwo Jima and Okinawa."),
    p("This contrast is why a TexasDefined naval-history network should not call Lexington a battleship merely because it is a giant Navy museum ship. Naming the difference improves research accuracy and lets a reader decide which experience matters most."),
    h("From combat carrier to jet-era and training carrier"),
    p("Lexington briefly left active service after World War II, then returned in the 1950s with modernized equipment and capabilities reflecting the jet age. She served in the fleet before becoming a principal Navy training carrier based at Pensacola. Her longevity allowed generations of naval aviators to practice the demanding procedures required for carrier takeoffs and landings."),
    navalImage("USS Lexington (CVA-16) being reactivated in September 1953.jpg", "Lexington undergoing reactivation work in September 1953", 2899, 2026, "U.S. Navy archive · Public domain · Wikimedia Commons", "1953 — Reactivation work reflected the Navy's effort to adapt World War II hulls to postwar aviation."),
    navalImage("USS Lexington (CVA-16) launching planes in 1956.jpg", "Lexington launching aircraft during the postwar jet-aircraft era in 1956", 1646, 973, "U.S. Navy archive · Public domain · Wikimedia Commons", "1956 — The flight deck was increasingly adapted for postwar aircraft and training demands."),
    navalImage("USS Lexington (AVT-16) launches an A-7 Corsair II in 1984.jpg", "A-7 Corsair II launches from the training carrier USS Lexington in 1984", 764, 472, "U.S. Navy archive · Public domain · Wikimedia Commons", "1984 — Lexington was still training naval aviators four decades after her Pacific War combat service."),
    h("1991–1992: preservation in Corpus Christi"),
    p("The Navy decommissioned Lexington on November 26, 1991. Corpus Christi successfully worked to preserve the carrier, which arrived in the area in January 1992, was transferred for museum use and moved into its permanent North Beach berth. The museum opened to the public in October 1992. Preserving a working aircraft carrier meant caring for an enormous, complex steel ship and converting areas designed for military operations into interpretive and visitor spaces."),
    p("Lexington was recognized as a National Historic Landmark in 2003. Its significance goes beyond a single combat engagement: it embodies both World War II fleet-carrier design and four decades of technological adaptation and aircrew training."),
    navalImage("An aerial photo of the USS Lexington in Corpus Christi.jpg", "Aerial view of museum ship USS Lexington and the aircraft display at Corpus Christi North Beach", 2897, 2171, "Matthew T Rader · CC BY-SA 4.0 · Wikimedia Commons (unaltered photograph)", "2018 — The carrier as a North Beach museum, rather than an active Navy vessel. Photo: Matthew T Rader (CC BY-SA 4.0)."),
    h("Plan a visit to USS Lexington: 2026 hours and prices"),
    p("The museum operator's published schedule, reviewed October 14, 2026, lists 9 a.m.–5 p.m. during the season from Labor Day to Memorial Day and 9 a.m.–6 p.m. in summer. The museum generally opens seven days a week except Thanksgiving Day and Christmas Day. Admission tickets are sold at the entrance booths on the day of the visit; standard admission is not marketed as a general online ticket."),
    list(
      "Address: 2914 N. Shoreline Boulevard, Corpus Christi, Texas 78402, on North Beach.",
      "2026 published general admission: adults (18+) $25; seniors (60+) $21; military $16 with ID; ages 13–17 $20; ages 4–12 $15; children 3 and under free.",
      "Published all-day visitor parking: $5 (members free). The museum notes a 3% processing surcharge on non-cash transactions.",
      "The flight and hangar decks are listed as wheelchair accessible, with a LEX LIFT elevator between them; much of the ship's historic machinery and passageway system includes steep ladders and restricted access.",
      "Check the operator's current hours-and-admission page for updated prices, closures, holiday events or accessibility changes before traveling."
    ),
    h("What to see aboard: plan your time around the ship"),
    p("Start with the flight deck for the most immediate sense of carrier scale. Its aircraft displays and open sky help explain the long runway required for takeoff and arresting-gear landings at sea. In hot or windy weather, do this portion earlier in the day; the deck is exposed."),
    p("The hangar deck and museum exhibits add the human side: aircraft maintenance, navigation and command, damage control, crew living areas and special exhibitions. The ship also promotes a 3D theater, Pearl Harbor exhibit and other visitor activities. Not every compartment is wheelchair accessible; the museum expressly identifies the hangar and flight decks as accessible and describes the elevator connecting them."),
    p("Allow several hours for an unhurried visit, and choose closed-toe shoes with good grip. Visitors with a disability or medical mobility concerns should ask the museum directly which decks and exhibit zones they can reach; an accessible main route does not imply that every original Navy ladder has been replaced."),
    h("A practical North Beach day in Corpus Christi"),
    p("Lexington sits beside the Texas State Aquarium. For a focused family day, choose one attraction for the morning and the other after lunch, keeping an eye on the museum's closing time and time spent walking. Downtown Corpus Christi, the bayfront and the marina district are nearby but across the Harbor Bridge corridor, so plan that transfer rather than assuming it is the same stroll as North Beach."),
    p("For a longer Coastal Bend trip, add Padre Island National Seashore on another day. It is not adjacent to the aircraft carrier, and beach-road closures, weather and summer heat require different planning from a museum visit."),
    h("Frequently asked questions"),
    list(
      "Is USS Lexington a battleship? No. CV-16 is an Essex-class aircraft carrier. Battleship Texas BB-35 is a separate museum ship in restoration at Galveston.",
      "Is this the ship sunk at Coral Sea in 1942? No. That was an earlier carrier, USS Lexington CV-2. The museum ship CV-16 was commissioned in 1943.",
      "Is the Lexington museum open? The operator currently lists regular daily museum hours, excluding Thanksgiving and Christmas, subject to current notices.",
      "Can visitors with wheelchairs board? The operator states that the flight and hangar decks are accessible using the LEX LIFT, but not every historic ship space is accessible.",
      "Are tickets sold online? The operator states that ordinary museum admission is purchased at its admission booths; event/escape-room tickets can differ.",
      "Is the USS Texas in Corpus Christi? No. BB-35 is undergoing restoration at Gulf Copper in Galveston. The preserved carrier Lexington is in Corpus Christi."
    ),
    h("Sources, reuse rights and update policy"),
    p("The USS Lexington Museum's original-history, admission and visitor pages are the authoritative sources for operating claims and museum facts. The National Park Service provides independent National Historic Landmark context. All historic photographs above use individually named Wikimedia Commons files from Navy collections; the Corpus Christi aerial photograph is attributed to Matthew T Rader under CC BY-SA 4.0 and has not been intentionally modified. Check each Commons file for source, license and full-resolution alternatives."),
    p("Admission, opening hours, parking, accessibility and visitor routes were checked against the museum's official pages on October 14, 2026 and should be reviewed at least every 14 days. The historical guide should also receive a longer-term evidence review when new naval research is published."),
  ],
};
