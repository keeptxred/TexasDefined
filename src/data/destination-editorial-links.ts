export type DestinationEditorialLink = {
  href: string;
  label: string;
  description: string;
};

const DESTINATION_EDITORIAL_LINKS: Record<string, DestinationEditorialLink[]> = {
  "pecan-street-brewing-johnson-city": [
    {
      href: "/event/gears-beers-johnson-city",
      label: "Plan Gears & Beers",
      description: "Use the current event guide for the annual car-and-motorcycle show hosted at Pecan Street Brewing.",
    },
    {
      href: "/destination/johnson-city",
      label: "Explore Johnson City",
      description: "Pair the brewpub with the courthouse square, museums, LBJ history and the rest of the downtown visitor cluster.",
    },
    {
      href: "/destination/texas-vintage-motorcycle-museum-johnson-city",
      label: "Add the vintage motorcycle museum",
      description: "Connect Pecan Street's Gears & Beers role with Johnson City's major vintage-motorcycle collection.",
    },
    {
      href: "/destination/hye",
      label: "Continue west to Hye",
      description: "Build a U.S. 290 food-and-drink route with Garrison Brothers, wineries and the historic Hye corridor.",
    },
    {
      href: "/county/blanco",
      label: "Explore Blanco County",
      description: "Connect the downtown brewpub with Blanco, Hye, Real Ale, the Pedernales and the county's broader Hill Country network.",
    },
  ],
  "hye": [
    {
      href: "/destination/garrison-brothers-distillery-hye",
      label: "Tour Garrison Brothers",
      description: "Use the dedicated Hye distillery guide for current tours, tastings, food, release weekends and visitor planning.",
    },
    {
      href: "/destination/lyndon-b-johnson-national-historical-park",
      label: "Add LBJ country",
      description: "Connect Hye's post-office history with the LBJ Ranch near Stonewall and the Johnson City district.",
    },
    {
      href: "/destination/johnson-city",
      label: "Explore Johnson City",
      description: "Use Johnson City as the eastern base for museums, food, family attractions and Blanco County planning.",
    },
    {
      href: "/destination/fredericksburg-texas-wineries-things-to-do-guide",
      label: "Continue toward Fredericksburg",
      description: "Extend west through Stonewall into the larger U.S. 290 wine, history, lodging and shopping corridor.",
    },
    {
      href: "/county/blanco",
      label: "Explore Blanco County",
      description: "See how Hye fits with Johnson City, Blanco, the Pedernales and the county's wider Hill Country geography.",
    },
  ],
  "real-ale-brewing-company-blanco": [
    {
      href: "/destination/blanco",
      label: "Explore Blanco",
      description: "Pair the brewery with the courthouse square, Blanco River and the town's broader Hill Country visitor guide.",
    },
    {
      href: "/destination/blanco-state-park",
      label: "Add Blanco State Park",
      description: "Combine the brewery with swimming, fishing, paddling and riverside time inside town.",
    },
    {
      href: "/destination/garrison-brothers-distillery-hye",
      label: "Compare Garrison Brothers in Hye",
      description: "Build a Blanco County Made-in-Texas route that contrasts Real Ale's beer-and-spirits production with Garrison Brothers bourbon.",
    },
    {
      href: "/county/blanco",
      label: "Explore Blanco County",
      description: "Connect Blanco with Johnson City, Hye, the Pedernales corridor and the rest of the county's Hill Country attractions.",
    },
  ],
  "garrison-brothers-distillery-hye": [
    {
      href: "/county/blanco",
      label: "Explore Blanco County",
      description: "Connect the Hye distillery with Johnson City, Blanco, the Pedernales and the county's broader Hill Country identity.",
    },
    {
      href: "/destination/johnson-city",
      label: "Explore Johnson City",
      description: "Use Johnson City as the eastern base for museums, food and the rest of the Blanco County visitor cluster.",
    },
    {
      href: "/destination/lyndon-b-johnson-national-historical-park",
      label: "Add LBJ country",
      description: "Pair the Hye distillery with the LBJ Ranch and Johnson City districts along the same eastern Hill Country corridor.",
    },
    {
      href: "/destination/fredericksburg-texas-wineries-things-to-do-guide",
      label: "Continue toward Fredericksburg",
      description: "Extend west on U.S. 290 into the larger winery, museum and Hill Country visitor corridor.",
    },
    {
      href: "/destination/real-ale-brewing-company-blanco",
      label: "Compare Real Ale in Blanco",
      description: "Add Blanco's working brewery and distillery for a second visitable Made-in-Texas production site in the same county.",
    },
    {
      href: "/destination/hye",
      label: "Explore Hye",
      description: "Put the distillery in context with the historic Hye Post Office, wineries and the U.S. 290 Johnson City–Stonewall corridor.",
    },
  ],
  "pedernales-falls-state-park": [
    {
      href: "/destination/pedernales-river-nature-park-johnson-city",
      label: "Compare Johnson City's in-town river park",
      description: "Use the LCRA nature park for convenient swimming, fishing, paddling and picnicking close to downtown.",
    },
    {
      href: "/destination/johnson-city",
      label: "Explore Johnson City",
      description: "Connect the state park with Johnson City's museums, food, wildlife attractions and LBJ history.",
    },
    {
      href: "/county/blanco",
      label: "Explore Blanco County",
      description: "Place Pedernales Falls in the wider Blanco County network of towns, river access and Hill Country destinations.",
    },
  ],
  "pedernales-river-nature-park-johnson-city": [
    {
      href: "/destination/johnson-city",
      label: "Explore Johnson City",
      description: "Pair the river park with downtown museums, food, the courthouse square and LBJ history.",
    },
    {
      href: "/destination/pedernales-falls-state-park",
      label: "Compare Pedernales Falls State Park",
      description: "See the larger TPWD park east of town for the falls, longer trails, camping and designated river access.",
    },
    {
      href: "/destination/science-mill-johnson-city",
      label: "Add Science Mill",
      description: "Build a family day around river time and Johnson City's hands-on STEM museum.",
    },
    {
      href: "/county/blanco",
      label: "Explore Blanco County",
      description: "Connect the nature park to Johnson City, Blanco, the Pedernales corridor and the wider Hill Country county guide.",
    },
  ],
  "reptilandia-johnson-city": [
    {
      href: "/destination/exotic-resort-zoo-johnson-city",
      label: "Add the Exotic Resort Zoo",
      description: "Pair Reptilandia's indoor reptile habitats with a large outdoor safari experience just north on the same U.S. 281 corridor.",
    },
    {
      href: "/destination/johnson-city",
      label: "Explore Johnson City",
      description: "Connect the reptile zoo with downtown museums, food, LBJ history and the courthouse square.",
    },
    {
      href: "/destination/science-mill-johnson-city",
      label: "Add Science Mill",
      description: "Build a weather-proof family day around reptiles, amphibians and hands-on STEM exhibits.",
    },
    {
      href: "/county/blanco",
      label: "Explore Blanco County",
      description: "Put Reptilandia in the wider county context of Johnson City, Blanco, the Pedernales and Hill Country attractions.",
    },
  ],
  "exotic-resort-zoo-johnson-city": [
    {
      href: "/destination/reptilandia-johnson-city",
      label: "Add Reptilandia",
      description: "Pair the outdoor safari with a temperature-controlled reptile and amphibian zoo a short drive south.",
    },
    {
      href: "/destination/johnson-city",
      label: "Explore Johnson City",
      description: "Use downtown Johnson City for food, museums, the courthouse square and LBJ history before or after the safari.",
    },
    {
      href: "/destination/science-mill-johnson-city",
      label: "Add Science Mill",
      description: "Pair the wildlife park with Johnson City's hands-on STEM museum for a full family day.",
    },
    {
      href: "/county/blanco",
      label: "Explore Blanco County",
      description: "Connect the safari park with the county's towns, river corridors, parks and Hill Country road trips.",
    },
  ],
  "johnson-city": [
    {
      href: "/destination/science-mill-johnson-city",
      label: "Plan a Science Mill visit",
      description: "Use the dedicated Science Mill guide for current hours, exhibit highlights and family-planning details.",
    },
    {
      href: "/destination/texas-vintage-motorcycle-museum-johnson-city",
      label: "See Johnson City's vintage motorcycle museum",
      description: "Add a second distinctive downtown museum with more than 100 vintage motorcycles in a restored Ford dealership.",
    },
    {
      href: "/destination/lyndon-b-johnson-national-historical-park",
      label: "Explore the LBJ National Historical Park",
      description: "Connect Johnson City to the Boyhood Home, Johnson Settlement and the separate LBJ Ranch district near Stonewall.",
    },
    {
      href: "/county/blanco",
      label: "Explore Blanco County",
      description: "Extend the town visit to Blanco, the Pedernales corridor and the wider county landscape.",
    },
    {
      href: "/destination/reptilandia-johnson-city",
      label: "Visit Reptilandia",
      description: "Add Johnson City's temperature-controlled reptile and amphibian zoo to a family itinerary.",
    },
    {
      href: "/destination/exotic-resort-zoo-johnson-city",
      label: "Plan the Exotic Resort Zoo safari",
      description: "Use the dedicated guide for guided tractor tours, self-drive reservations, animal encounters and onsite cabins.",
    },
    {
      href: "/destination/pedernales-river-nature-park-johnson-city",
      label: "Use the in-town Pedernales River park",
      description: "Add swimming, fishing, paddling, trails and picnic time only minutes from downtown Johnson City.",
    },
    {
      href: "/event/texas-wine-jam",
      label: "Plan Texas Wine Jam",
      description: "Use the current event guide for 2026 ticket tiers, festival schedule, Spotlight Sessions and severe-weather fallback.",
    },
    {
      href: "/event/johnson-city-jazz-fest",
      label: "See Johnson City Jazz Fest",
      description: "Plan the free October 24 downtown concert with the current 2026 lineup and evening schedule.",
    },
    {
      href: "/event/johnson-city-christmas-lights-spectacular",
      label: "Plan the Christmas Lights Spectacular",
      description: "Use the current holiday guide for the nightly light season and the published 2026 special-event calendar.",
    },
    {
      href: "/event/gears-beers-johnson-city",
      label: "Plan Gears & Beers",
      description: "Use the current guide for the October 24 car-and-motorcycle show, participant schedule and same-day Jazz Fest pairing.",
    },
    {
      href: "/destination/garrison-brothers-distillery-hye",
      label: "Tour Garrison Brothers in Hye",
      description: "Add the working bourbon distillery, reserve tastings and U.S. 290 spirits corridor west of Johnson City.",
    },
    {
      href: "/destination/hye",
      label: "Explore Hye",
      description: "Continue west on U.S. 290 to Hye for the historic post office, Texas wine and Garrison Brothers.",
    },
    {
      href: "/destination/pecan-street-brewing-johnson-city",
      label: "Eat and drink at Pecan Street Brewing",
      description: "Use the dedicated brewpub guide for current hours, food, house-brewed beer, live music and event planning.",
    },
  ],
  "science-mill-johnson-city": [
    {
      href: "/destination/johnson-city",
      label: "Explore Johnson City",
      description: "Build the Science Mill into a fuller downtown day with the courthouse square, food, museums and LBJ history.",
    },
    {
      href: "/destination/texas-vintage-motorcycle-museum-johnson-city",
      label: "Add the vintage motorcycle museum",
      description: "Pair hands-on STEM with a very different transportation-history collection just off the Johnson City square.",
    },
    {
      href: "/destination/lyndon-b-johnson-national-historical-park",
      label: "Add the LBJ National Historical Park",
      description: "Combine Science Mill with the Boyhood Home and Johnson Settlement for a science-and-history family day.",
    },
    {
      href: "/county/blanco",
      label: "Explore Blanco County",
      description: "See how Johnson City, Blanco and the Pedernales corridor fit together across the county.",
    },
    {
      href: "/destination/reptilandia-johnson-city",
      label: "Pair Science Mill with Reptilandia",
      description: "Build an all-weather family day around hands-on STEM and a specialized reptile-and-amphibian zoo.",
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
    {
      href: "/destination/johnson-city",
      label: "Explore Johnson City",
      description: "Use the town guide to connect the museum with Science Mill, the courthouse square, LBJ history and Hill Country side trips.",
    },
    {
      href: "/event/gears-beers-johnson-city",
      label: "See Gears & Beers",
      description: "Connect the museum with Johnson City's annual car-and-motorcycle show, which includes six dedicated motorcycle categories.",
    },
    {
      href: "/destination/pecan-street-brewing-johnson-city",
      label: "Add Pecan Street Brewing",
      description: "Pair the motorcycle museum with the historic-square brewpub that hosts Johnson City's annual Gears & Beers show.",
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
    {
      href: "/destination/johnson-city",
      label: "Explore Johnson City beyond the park",
      description: "Connect the national historical park with Science Mill, the motorcycle museum, downtown food and the Blanco County courthouse square.",
    },
    {
      href: "/destination/garrison-brothers-distillery-hye",
      label: "Add a Hye distillery stop",
      description: "Pair LBJ country with a working Texas bourbon distillery along the Johnson City–Stonewall corridor.",
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
