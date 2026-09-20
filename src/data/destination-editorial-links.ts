export type DestinationEditorialLink = {
  href: string;
  label: string;
  description: string;
};

const DESTINATION_EDITORIAL_LINKS: Record<string, DestinationEditorialLink[]> = {
  "paris-texas-eiffel-tower": [
    {
      href: "/texas-roadside-oddities",
      label: "Explore more Texas roadside oddities",
      description: "Use the statewide guide to turn the cowboy-hatted Eiffel Tower into a larger road trip built around verified strange stops.",
    },
    {
      href: "/county/lamar",
      label: "Explore Lamar County",
      description: "Connect the tower with downtown Paris, local history and the wider Northeast Texas county guide.",
    },
    {
      href: "/things-unique-to-texas/roadside-small-towns",
      label: "Browse roadside and small-town Texas",
      description: "See how the Paris tower fits into the larger collection of Texas roadside icons, town landmarks and offbeat detours.",
    },
  ],
  "tex-randall-canyon": [
    {
      href: "/texas-roadside-oddities",
      label: "Explore more Texas roadside oddities",
      description: "Compare Tex Randall with other verified giant objects, folk-art landmarks and strange highway stops across Texas.",
    },
    {
      href: "/county/randall",
      label: "Explore Randall County",
      description: "Build the cowboy stop into a Canyon itinerary with museums, local history and the county's Panhandle landscape.",
    },
    {
      href: "/destination/palo-duro-canyon-state-park",
      label: "Add Palo Duro Canyon",
      description: "Turn the quick roadside stop into a fuller Canyon-area day with one of the Panhandle's major destinations.",
    },
  ],
  "prada-marfa": [
    {
      href: "/texas-roadside-oddities",
      label: "Explore more Texas roadside oddities",
      description: "Place the Valentine land-art installation in a statewide guide to unusual Texas road-trip stops.",
    },
    {
      href: "/county/jeff-davis",
      label: "Explore Jeff Davis County",
      description: "Put Prada Marfa in its actual county context and connect the stop with the Davis Mountains and surrounding West Texas towns.",
    },
    {
      href: "/things-unique-to-texas/roadside-small-towns",
      label: "Browse roadside and small-town Texas",
      description: "Compare West Texas land art with other strange, oversized and place-specific Texas landmarks.",
    },
  ],
  "beer-can-house-houston": [
    {
      href: "/texas-roadside-oddities",
      label: "Explore more Texas roadside oddities",
      description: "Connect Houston's folk-art house with other verified unconventional landmarks and roadside environments across the state.",
    },
    {
      href: "/county/harris",
      label: "Explore Harris County",
      description: "Use the county guide to place the Beer Can House inside a much larger Houston itinerary of museums, neighborhoods and local history.",
    },
    {
      href: "/things-unique-to-texas/roadside-small-towns",
      label: "Browse roadside and small-town Texas",
      description: "See the Beer Can House alongside the wider Texas collection of folk art, odd architecture and memorable roadside stops.",
    },
  ],
  "texas-vintage-motorcycle-museum-johnson-city": [
    {
      href: "/county/blanco",
      label: "Explore Blanco County",
      description: "Connect the museum with Johnson City, Blanco, the Pedernales corridor, courthouse history and the wider Hill Country county guide.",
    },
    {
      href: "/destination/lyndon-b-johnson-national-historical-park",
      label: "Add the LBJ National Historical Park",
      description: "Pair motorcycle history with the Johnson City and Stonewall districts of Lyndon B. Johnson National Historical Park.",
    },
    {
      href: "/explore/region/hill-country",
      label: "Explore the Texas Hill Country",
      description: "Build the Johnson City stop into a larger Hill Country route with parks, small towns, scenic drives and museums.",
    },
  ],
  "lyndon-b-johnson-national-historical-park": [
    {
      href: "/destination/texas-vintage-motorcycle-museum-johnson-city",
      label: "See Johnson City's vintage motorcycle museum",
      description: "Add a very different layer of Johnson City history with more than 100 vintage motorcycles inside a restored 1930s Ford dealership.",
    },
    {
      href: "/county/blanco",
      label: "Explore Blanco County",
      description: "Place the Johnson City and ranch districts in the broader county landscape of the Pedernales, Blanco, ranching and Hill Country towns.",
    },
  ],
  "shiner": [
    {
      href: "/destination/spoetzl-brewery",
      label: "Plan the K. Spoetzl Brewery visit",
      description: "See current tour planning, the beer lineup, distillery, barbecue and Rickhouse visitor details before choosing your brewery time.",
    },
    {
      href: "/texas-icons/shiner-bock",
      label: "Read the Shiner Bock history",
      description: "Separate the town trip from the deeper 1909 brewery history, Kosmos Spoetzl story and Shiner Bock timeline.",
    },
    {
      href: "/county/lavaca",
      label: "Explore all of Lavaca County",
      description: "Connect Shiner with Hallettsville, Yoakum, Moulton, river country and the wider Czech and German settlement landscape.",
    },
    {
      href: "/explore/painted-churches/shiner-saints-cyril-methodius",
      label: "Go inside Shiner's painted-church story",
      description: "Use the dedicated church guide for architectural, parish and preservation context before visiting Saints Cyril and Methodius.",
    },
    {
      href: "/event/shiner-oktoberfest-weekends",
      label: "Shiner Oktoberfest Weekends",
      description: "Use the verified three-Saturday 2026 event guide for dates, brewery logistics and trip planning.",
    },
    {
      href: "/event/shinerfest",
      label: "ShinerFest",
      description: "Plan the 4th annual 2026 country-music event at the brewery and build the rest of Shiner around the noon-to-10 p.m. concert day.",
    },
    {
      href: "/event/shiner-beer-run",
      label: "Shiner Beer Run",
      description: "Plan the annual 5K, 10K and half-marathon race weekend at the brewery.",
    },
  ],
  "spoetzl-brewery": [
    {
      href: "/destination/shiner",
      label: "Explore Shiner beyond the brewery",
      description: "Build the brewery into a fuller town visit with the painted church, local museum, municipal park and Lavaca County context.",
    },
    {
      href: "/texas-icons/shiner-bock",
      label: "Read the full Shiner Bock history",
      description: "Follow Shiner Bock from the 1909 brewery story and Kosmos Spoetzl through Prohibition, year-round Bock production and modern Texas brand identity.",
    },
    {
      href: "/county/lavaca",
      label: "Explore Lavaca County",
      description: "Connect the brewery to Hallettsville, Shiner, Yoakum, Czech and German settlement, railroads, ranching and the Lavaca-Navidad landscape.",
    },
    {
      href: "/explore/painted-churches/shiner-saints-cyril-methodius",
      label: "See Shiner's painted church",
      description: "Pair the brewery with Saints Cyril and Methodius Church for a deeper look at the town's Czech and German Catholic heritage.",
    },
    {
      href: "/texas-brand-origin-stories",
      label: "Compare Texas brand origin stories",
      description: "See how Shiner fits alongside H-E-B, Whataburger, Blue Bell, Dickies and Buc-ee's as a place-rooted Texas brand.",
    },
    {
      href: "/event/shiner-oktoberfest-weekends",
      label: "Plan Shiner Oktoberfest Weekends",
      description: "See the three verified 2026 Saturdays and how to combine the event with tours and the rest of Shiner.",
    },
    {
      href: "/event/shinerfest",
      label: "Plan ShinerFest",
      description: "Use the verified 2026 date, hours, admission snapshot and brewery-campus planning guide.",
    },
    {
      href: "/event/shiner-beer-run",
      label: "Plan the Shiner Beer Run",
      description: "See the verified 2026 race date, distance options and brewery-campus planning notes.",
    },
  ],
  "jasper": [
    {
      href: "/article/blue-hole-jasper-county-east-texas",
      label: "Read the history of Jasper County's Blue Hole",
      description: "Learn how a private sandstone quarry became a blue-green East Texas landmark, with railroad history, geology, access limits and the lost-train legend.",
    },
  ],
  "port-isabel-lighthouse": [
    {
      href: "/article/best-lighthouses-to-visit-in-texas",
      label: "Compare the best Texas lighthouse visits",
      description: "See why Port Isabel ranks first, then compare Bolivar, Halfmoon Reef, Lydia Ann, Matagorda Island and Sabine Pass by access and trip style.",
    },
    {
      href: "/article/port-isabel-lighthouse-guide",
      label: "Read the full Port Isabel Lighthouse history",
      description: "Go deeper on the tower's maritime, military and preservation history before or after your visit.",
    },
    {
      href: "/explore/lighthouses",
      label: "Open the Texas lighthouse map",
      description: "Place Port Isabel in the coastwide network of surviving, relocated and historic lighthouse sites.",
    },
  ],
  "enchanted-rock-state-natural-area": [
    {
      href: "/article/texas-bluebonnets-complete-guide",
      label: "Use the Texas bluebonnet season guide",
      description: "Check statewide bloom timing, current-report strategy, viewing etiquette and the regions most worth planning around before a spring visit.",
    },
    {
      href: "/article/best-places-to-see-bluebonnets-in-texas",
      label: "Compare the best bluebonnet regions",
      description: "Put Enchanted Rock and the western Hill Country in context with Ennis, Washington County, the Highland Lakes, Lake Travis and Big Bend.",
    },
    {
      href: "/article/texas-bluebonnet-road-trip",
      label: "Build a spring Hill Country road trip",
      description: "Connect current bloom reports with Fredericksburg, Willow City, the Highland Lakes and other backup-rich spring stops.",
    },
  ],
  "caddo-lake-state-park": [
    {
      href: "/article/fall-in-texas-complete-guide",
      label: "Use the Texas fall-color guide",
      description: "Compare East Texas cypress and hardwood color with Lost Maples, the Frio, the Guadalupe corridor and other statewide fall regions.",
    },
    {
      href: "/article/east-texas-fall-colors",
      label: "Plan an East Texas fall weekend",
      description: "Build a Piney Woods foliage trip around Caddo Lake, Daingerfield, Tyler and Lake Bob Sandlin using current color reports.",
    },
    {
      href: "/article/best-texas-state-parks-for-fall-colors",
      label: "Compare Texas state parks for fall color",
      description: "See which public parks combine reliable tree species, water, trails and autumn scenery for a fall trip.",
    },
    {
      href: "/article/texas-fall-foliage-road-trip",
      label: "Turn Caddo Lake into a fall road trip",
      description: "Compare the East Texas alternative with the Frio, Lost Maples and Guadalupe route, then follow the region with the better current color.",
    },
  ],
  "caddo-lake": [
    {
      href: "/article/fall-in-texas-complete-guide",
      label: "Use the Texas fall-color guide",
      description: "Compare Caddo Lake's bald cypress color with the strongest fall regions across Texas.",
    },
    {
      href: "/article/east-texas-fall-colors",
      label: "Go deeper on East Texas fall color",
      description: "Turn Caddo Lake into a wider Piney Woods foliage trip built around current conditions.",
    },
    {
      href: "/article/best-texas-state-parks-for-fall-colors",
      label: "Compare Texas state parks for fall color",
      description: "See how Caddo Lake stacks up against Lost Maples, Garner, Daingerfield, Guadalupe River and other strong public-land autumn stops.",
    },
  ],
  "garner-state-park": [
    {
      href: "/explore/swimming-holes-river-tubing",
      label: "Compare Texas swimming and tubing destinations",
      description: "Connect Garner's verified Frio River swimming and inner-tube floating with the statewide collection of public swim and float destinations.",
    },
  ],
  "leakey": [
    {
      href: "/explore/swimming-holes-river-tubing",
      label: "Plan a Frio Canyon water weekend",
      description: "Use the statewide swimming and tubing collection to compare verified Frio River access near Garner and Concan without treating every roadside crossing as public access.",
    },
    {
      href: "/texas-paddling-guide",
      label: "Compare Texas river and paddling trips",
      description: "Place the Frio Canyon in the wider Texas river-recreation network and check current access and flow before choosing a route.",
    },
  ],
  "bandera": [
    {
      href: "/explore/swimming-holes-river-tubing",
      label: "Explore Medina River swimming and tubing",
      description: "Compare Bandera's established Medina River recreation with other verified Texas swim and float destinations and check current river conditions before going.",
    },
    {
      href: "/texas-paddling-guide",
      label: "Compare Texas river and paddling trips",
      description: "Place the Medina River in the statewide paddling and river-recreation network, with current access and conditions checked before launch.",
    },
  ],
  "guadalupe-river-state-park": [
    {
      href: "/explore/swimming-holes-river-tubing",
      label: "Compare Texas swimming and tubing destinations",
      description: "Put the park's Guadalupe River access alongside other verified swimming holes, tubing gateways and float-friendly public destinations.",
    },
    {
      href: "/article/fall-in-texas-complete-guide",
      label: "Use the Texas fall-color guide",
      description: "Compare the Guadalupe River corridor with Lost Maples, the Frio and East Texas using current foliage reports before a fall trip.",
    },
    {
      href: "/article/hill-country-fall-colors",
      label: "Plan a Hill Country fall-color drive",
      description: "Pair Guadalupe River State Park with the strongest Hill Country foliage corridors and backup stops for variable autumn conditions.",
    },
    {
      href: "/article/best-texas-state-parks-for-fall-colors",
      label: "Compare state parks for fall color",
      description: "See how the Guadalupe's cypress-lined riverbanks compare with other public parks that reliably deliver Texas autumn scenery.",
    },
  ],
  "south-llano-river-state-park": [
    {
      href: "/explore/swimming-holes-river-tubing",
      label: "Compare Texas swimming and tubing destinations",
      description: "Connect South Llano's tuber put-ins, float access and swimming with the statewide water-recreation collection.",
    },
    {
      href: "/texas-paddling-guide",
      label: "Plan a Texas paddling trip",
      description: "Use the statewide paddling guide to compare the South Llano with other spring-fed rivers, lakes and public launch corridors.",
    },
  ],
  "new-braunfels": [
    {
      href: "/explore/swimming-holes-river-tubing",
      label: "Explore Texas swimming holes and river tubing",
      description: "Compare New Braunfels' Comal and Guadalupe tubing access with other verified Texas swim and float destinations.",
    },
    {
      href: "/article/christmas-in-texas-complete-guide",
      label: "Plan New Braunfels in the Texas Christmas guide",
      description: "Compare the city's German-Texan holiday traditions with statewide Christmas towns, lights, train rides and coastal celebrations.",
    },
    {
      href: "/article/best-christmas-towns-in-texas",
      label: "Compare Texas Christmas towns",
      description: "See how New Braunfels and nearby Gruene fit alongside Fredericksburg, Grapevine, Johnson City, Marshall and other strong holiday destinations.",
    },
    {
      href: "/article/texas-christmas-road-trip",
      label: "Build a Hill Country Christmas road trip",
      description: "Use New Braunfels as a southern add-on to the Fredericksburg, Johnson City and Marble Falls holiday loop.",
    },
  ],
  "san-marcos": [
    {
      href: "/explore/swimming-holes-river-tubing",
      label: "Explore Texas swimming holes and river tubing",
      description: "Compare San Marcos River tubing and public access with other verified Texas swim and float destinations.",
    },
    {
      href: "/texas-paddling-guide",
      label: "Plan a Texas paddling trip",
      description: "Compare the spring-fed San Marcos River with other Texas paddling routes and public-water destinations.",
    },
  ],
  "gruene-historic-district": [
    {
      href: "/article/christmas-in-texas-complete-guide",
      label: "Put Gruene in a Texas Christmas trip",
      description: "Connect the historic district's Hill Country setting with the statewide holiday guide and current seasonal planning advice.",
    },
    {
      href: "/article/best-christmas-towns-in-texas",
      label: "Compare the best Texas Christmas towns",
      description: "Use the statewide shortlist to pair Gruene with other places where historic streets and local traditions shape the season.",
    },
  ],
};

export function destinationEditorialLinks(slug: string): DestinationEditorialLink[] {
  return DESTINATION_EDITORIAL_LINKS[slug] ?? [];
}
