import smallTown from "@/assets/small-town.jpg";

import type { Article, ImageRef } from "../types";

const hero: ImageRef = {
  src: smallTown,
  alt: "Historic Texas courthouse square in warm evening light",
  width: 1600,
  height: 1067,
};

export const historicSitesRoadmapArticle: Article = {
  id: "explore-feature-historic-sites",
  brandId: "texasdefined",
  slug: "texas-historic-sites-roadmap",
  title: "Texas History Is Better When You Stand Where It Happened",
  dek: "Missions, battlefields, courthouses and museums make more sense as a road map than a timeline. These are the places that turn state history back into geography.",
  category: "historic-sites",
  region: "prairies-lakes",
  hero,
  authorId: "a-hollis",
  publishedAt: "2026-08-07",
  readingMinutes: 8,
  tags: ["Texas history", "historic sites", "missions", "battlefields", "courthouses", "museums", "Texas road trips"],
  relatedCollections: [],
  relatedDestinations: [],
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://thc.texas.gov/historic-sites",
  internalLinks: [
    {
      href: "/texas-history",
      label: "Explore more Texas history",
      description: "Use the statewide history section to go deeper on the eras, places and communities that shaped Texas.",
    },
    {
      href: "/article/texas-courthouses-town-square",
      label: "Why Texas towns grew around courthouse squares",
      description: "Connect county-seat geography, architecture and civic life to the squares that still anchor many Texas downtowns.",
    },
    {
      href: "/article/texas-main-street-downtowns-guide",
      label: "How historic Texas downtowns still work",
      description: "Follow the storefronts, depots and civic buildings that grew around older town centers.",
    },
    {
      href: "/article/texas-railroads-town-growth-explained",
      label: "How railroads remade the Texas map",
      description: "See why transportation history belongs beside missions, battlefields and courthouse towns on a serious Texas history trip.",
    },
    {
      href: "/browse/counties",
      label: "Browse Texas by county",
      description: "Turn statewide history into smaller county-by-county trips with local context and nearby places.",
    },
  ],
  body: [
    {
      type: "paragraph",
      text: "Texas history is usually taught as a sequence of dates, flags and battles. On the ground it feels less orderly and much more useful. A Spanish mission sits inside a modern city. A county courthouse still organizes a square laid out for nineteenth-century commerce. A battlefield that changed a republic can be reached from a freeway exit. A border prairie can explain a continental war better than a paragraph in a textbook. Geography makes the stories overlap, and once you start traveling that way, Texas history stops feeling like a list to memorize and starts feeling like a landscape you can read.",
    },
    {
      type: "paragraph",
      text: "The best historic-site trip is therefore not a race to collect famous markers. It is a route built around a question. How did Spanish colonial settlement work? Where did the Texas Revolution actually unfold? Why did county seats become the center of so many towns? How did the U.S.-Mexico War, railroads, cotton, cattle, oil and highways redraw the map? Pick one question, then let several places answer different parts of it. The result is slower than a checklist and far more memorable.",
    },
    { type: "heading", text: "Begin with San Antonio's missions, not only the Alamo" },
    {
      type: "paragraph",
      text: "San Antonio is the clearest place to understand Spanish colonial Texas as a system rather than a single building. Five mission complexes were established along the San Antonio River in the early eighteenth century. Four—Concepción, San José, San Juan and Espada—are preserved within San Antonio Missions National Historical Park, while Mission Valero is better known as the Alamo. Seeing more than one mission changes the story. Churches matter, but so do irrigation, agriculture, workshops, defense, Indigenous labor and the complicated cultural exchange that developed around communities the Spanish Crown intended to make self-sustaining.",
    },
    {
      type: "paragraph",
      text: "That wider route also prevents one of the easiest mistakes in Texas history travel: letting a later battle erase everything that came before it. The Alamo is inseparable from the Texas Revolution, but the mission landscape began generations earlier. Walk the river corridor, compare the compounds and pay attention to acequias, farmland and settlement patterns. The surviving geography makes clear that these were communities connected to water, food production, religion and imperial strategy—not isolated stone churches dropped into an empty landscape.",
    },
    { type: "heading", text: "Follow colonization and revolution as a route, not a single battlefield" },
    {
      type: "paragraph",
      text: "East and southeast of San Antonio, several public historic sites can be read as a rough map of settlement and revolution. San Felipe de Austin preserves the place where Stephen F. Austin established the headquarters of his colony in Mexican Texas in 1823. Before independence, it became a political, economic and social center for Anglo-American immigration. The town did not simply fade after the revolution began; residents burned it during the Runaway Scrape in 1836 as they evacuated ahead of the Mexican army. Standing there makes the vulnerability of settlement much easier to understand than seeing San Felipe only as a name in a chronology.",
    },
    {
      type: "paragraph",
      text: "Washington-on-the-Brazos adds the political turning point. Delegates met there in March 1836 and signed the Texas Declaration of Independence on March 2. Gonzales and Goliad add military and civilian dimensions, and San Jacinto closes the revolutionary arc with the battlefield where the April 1836 victory secured Texas independence from Mexico. You do not need to drive all of these in one weekend. In fact, the history works better when each stop has enough time to explain what changed between settlement, political rupture, retreat, defeat and final battle.",
    },
    { type: "heading", text: "Use San Jacinto to read industry layered over a battlefield" },
    {
      type: "paragraph",
      text: "San Jacinto is particularly useful because the historic landscape now sits beside one of the most industrialized corridors in Texas. The Texas Historical Commission manages a large battleground park anchored by the monument and museum, but the Houston Ship Channel and surrounding petrochemical infrastructure are impossible to ignore. That contrast is not a distraction from history. It is the next chapter. A place associated with an 1836 battle later became part of the transportation and industrial geography that helped turn the Houston region into an international port complex.",
    },
    { type: "heading", text: "Go to Palo Alto when you are ready for the U.S.-Mexico War" },
    {
      type: "paragraph",
      text: "Near Brownsville, Palo Alto Battlefield National Historical Park preserves the prairie where U.S. and Mexican forces fought on May 8, 1846, the first major battle of the U.S.-Mexico War. The open ground is the interpretive tool. The old road between Matamoros and Point Isabel crossed the battlefield, and the terrain helps explain how artillery, cavalry and long lines of troops could operate there. The war that followed changed the map of North America and left a legacy that remains inseparable from questions of borders, citizenship, land and memory in the region.",
    },
    {
      type: "paragraph",
      text: "Pairing Palo Alto with Brownsville, Port Isabel and other lower-coast history creates a better trip than treating the battlefield as an isolated stop. You begin to see the Rio Grande not as the edge of the story but as one of its central corridors. Military supply routes, ranching, trade, settlement and the Gulf all overlap here. That is exactly why historic travel works best geographically: the landscape keeps forcing subjects that textbooks often separate back into the same frame.",
    },
    { type: "heading", text: "Courthouse squares explain how local Texas government became geography" },
    {
      type: "paragraph",
      text: "Not every important historic site is connected to a battle. County courthouses may be the most repeatable history lesson in the state because Texas has 254 counties and many older county seats were physically organized around the courthouse. Banks, hotels, newspapers, law offices and stores clustered nearby. Roads converged on the civic center. When the square survives, a short walk around it can reveal how government, commerce and public life shared the same few blocks.",
    },
    {
      type: "paragraph",
      text: "The Texas Historical Commission's courthouse preservation program exists because many of those buildings were lost, altered or neglected during the twentieth century. The program has helped restore dozens of historic county courthouses and continues to support preservation and stewardship statewide. For travelers, that means a courthouse is not just architecture. It can be the best starting point for reading a town: look for the original commercial street, old bank corners, upper-floor offices, nearby churches, the former depot district and the point where later highway development pulled activity away from downtown.",
    },
    { type: "heading", text: "Then follow the railroad tracks away from the square" },
    {
      type: "paragraph",
      text: "Railroads changed the older courthouse-centered map by creating new corridors of trade and travel. Some towns boomed because a rail line arrived; others declined when a route bypassed them. Depots, warehouses, grain facilities and industrial districts often sit a few blocks from the traditional civic core, which means a town can contain two overlapping histories: the county-seat center and the railroad center. Walking or driving between them is one of the easiest ways to see how transportation technology reorganized everyday life.",
    },
    {
      type: "paragraph",
      text: "That same method works for later eras. Look for highway-era motels and bypasses outside the older grid. In oil regions, ask where pipelines, refineries and company housing changed growth. Along the coast, study ports, jetties and ship channels. In ranching country, stockyards and rail loading points may matter more than ornate civic buildings. A historic roadmap should keep expanding beyond the places that look oldest, because the twentieth century changed Texas just as decisively as the nineteenth.",
    },
    { type: "heading", text: "Museums work better when you arrive with a narrow question" },
    {
      type: "paragraph",
      text: "Large museums can become a blur if the assignment is simply to learn Texas history. A better approach is to arrive with a narrower subject: cattle, oil, borderlands, Black history, Tejano history, Indigenous history, German or Czech immigration, railroads, military service, spaceflight, agriculture or the Gulf. The museum then becomes part of a route rather than the entire route. Artifacts and interpretation give names and detail to patterns you have already seen in streets, fields, rivers and buildings.",
    },
    {
      type: "paragraph",
      text: "Small local museums deserve the same respect. Their hours can be limited and their exhibits can vary in polish, but they often preserve material that larger institutions cannot: family photographs, business records, school histories, local newspapers, oral histories and objects tied to one community. Check current hours before driving, and do not assume an older web listing is accurate. Many county and volunteer museums operate on schedules that change seasonally or depend on staffing.",
    },
    { type: "heading", text: "Do not treat Indigenous, Tejano or Black history as sidebars" },
    {
      type: "paragraph",
      text: "A statewide history route becomes misleading if it tells only the story of governments, armies and prominent settlers. Mission history requires attention to the Indigenous peoples whose lives were transformed by Spanish colonization. Border history cannot be understood without Tejano communities and the people whose property, citizenship and political status changed as governments changed. Reconstruction, segregation, migration and civil-rights history require places that document Black Texans as communities rather than only as supporting characters in somebody else's timeline.",
    },
    {
      type: "paragraph",
      text: "The practical rule is simple: read the current interpretation at the site, then ask who is missing from it. New research can change how a place is understood, and historical interpretation evolves as archives, archaeology and community scholarship add evidence. A roadside marker installed decades ago can still be useful, but it should not automatically outrank a modern museum, tribal source, National Park Service study or Texas Historical Commission interpretation built from newer research.",
    },
    { type: "heading", text: "Build regional history trips instead of trying to cover Texas at once" },
    {
      type: "paragraph",
      text: "Texas is too large for a sensible statewide history weekend, so build trips by region. San Antonio can anchor a Spanish colonial and mission route. Austin County, Washington County, Gonzales, Goliad and San Jacinto can be divided into separate Texas Revolution weekends. Brownsville and Port Isabel can anchor border, Mexican-American War and lower-coast history. A courthouse-and-main-street loop can work almost anywhere in Central, North or East Texas. Galveston and the upper coast can connect immigration, slavery, emancipation, shipping, hurricanes and industry in a compact geography.",
    },
    {
      type: "paragraph",
      text: "This regional method also produces better road trips. Instead of driving four hours between famous names, you can spend more time in the places between them. A cemetery, former depot, historic neighborhood or county museum may explain the transition from one major site to the next. Those intermediate stops are often where statewide history becomes local enough to feel human.",
    },
    { type: "heading", text: "A two-day history trip should have one anchor and several layers" },
    {
      type: "paragraph",
      text: "For a practical weekend, choose one anchor site that deserves several hours, then add two or three smaller places that deepen the same subject. A San Antonio mission day can be paired with a second day focused on downtown, Tejano history or nearby settlement patterns. A Washington-on-the-Brazos trip can add San Felipe and a courthouse town rather than racing all the way to San Jacinto. A Palo Alto day can add Brownsville and Port Isabel. The route should make the story clearer with each stop, not simply make the mileage larger.",
    },
    { type: "heading", text: "Historic-site etiquette is part of understanding the place" },
    {
      type: "list",
      items: [
        "Check the managing agency before traveling. Hours, tickets, weather closures, preservation work and event schedules can change.",
        "Treat battlefields, cemeteries and memorial spaces as places of remembrance, not as generic scenery or photo props.",
        "Stay on legal public access. A marker, ruin or historic coordinate does not create permission to cross private land.",
        "Read current interpretation rather than relying only on a decades-old plaque, school memory or viral social post.",
        "Give outdoor sites time. Roads, rivers, topography and distances often explain why an event happened where it did.",
        "Pair major institutions with local museums, downtowns and neighborhoods when they add a different community perspective.",
        "When a site presents contested history, look for primary evidence and interpretations from more than one affected community.",
      ],
    },
    { type: "heading", text: "Verify the modern visit before chasing the historic past" },
    {
      type: "paragraph",
      text: "Historic facts can be centuries old while visitor information changes next week. Washington-on-the-Brazos, for example, has different operating patterns for its grounds and museum facilities, and state historic sites can change ticketing, tours or closure notices. National Park Service units can adjust programs for weather, staffing or preservation work. Use TexasDefined to decide which places belong together, then use the official managing agency as the last check for the day you travel.",
    },
    { type: "heading", text: "The landscape gets a vote in the story" },
    {
      type: "paragraph",
      text: "A good Texas history trip should complicate what you thought you knew. If a site only confirms a slogan, keep looking. Stand at the mission and notice the water system. Stand at San Felipe and imagine a town deliberately burned during retreat. Stand at Palo Alto and look across the prairie that shaped artillery and movement. Walk a courthouse square and notice how streets, commerce and government were arranged around one building. The advantage of being there is that geography can challenge the simplified version of the story.",
    },
    {
      type: "paragraph",
      text: "That is the roadmap: not a ranked list of old buildings, but a way to move through Texas by following the places where power, transportation, culture and memory became physical. Missions explain empire and community. Battlefields explain decisions and consequences. Courthouses explain local government. Railroads and ports explain growth. Museums supply names and evidence. Modern towns show what survived, what disappeared and what was built on top of it. Once those layers connect, Texas history becomes less about reaching the next marker and more about understanding why the road leads there at all.",
    },
  ],
};
