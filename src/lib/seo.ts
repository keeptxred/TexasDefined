import type { BrandConfig } from "@/brand/types";

/** Brand-agnostic head/meta and schema builders. */

export interface PageSeo {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageType?: string;
  type?: "website" | "article";
  canonicalPath?: string;
  robots?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

interface EditorialCollectionItem {
  name: string;
  url: string;
  image?: string;
  description?: string;
  type: "Article" | "TouristAttraction";
}

interface EditorialCollectionSeo extends PageSeo {
  canonicalPath: string;
  collectionName: string;
  breadcrumbParentName?: string;
  breadcrumbParentPath?: string;
  items: EditorialCollectionItem[];
}

const DEFAULT_INDEX_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const META_DESCRIPTION_MAX_LENGTH = 160;

type TechnicalSeoOverride = { title: string; description?: string };

const TEXASDEFINED_TECHNICAL_SEO_OVERRIDES: Record<string, TechnicalSeoOverride> = {
  "/county/bexar": { title: "Bexar County, Texas Guide" },
  "/explore": { title: "Explore Texas: Places, Road Trips & Outdoors" },
  "/explore/top-attractions": { title: "Top 25 Texas Attractions" },
  "/explore/road-trips": {
    title: "Texas Road Trips & Scenic Drives",
    description: "Plan Texas road trips with scenic drives, regional routes, stop-by-stop itineraries, parks, small towns and practical trip-planning details.",
  },
  "/explore/landscapes/where-does-texas-turn-into-desert": {
    title: "Where Does Texas Turn Into Desert? Texas Regions Explained",
    description: "See where Texas shifts from plains and Hill Country into Chihuahuan Desert landscapes, and how elevation, rainfall and geography define the transition.",
  },
  "/texas-history": { title: "Texas History: People, Places & Stories" },
  "/texas-explained": { title: "Texas Explained: How the State Works" },
  "/texas-closing-cost-calculator": { title: "Texas Closing Cost Calculator" },
  "/texas-property-tax-estimator": { title: "Texas Property Tax Estimator" },
  "/texas-home-equity-calculator": { title: "Texas Home Equity Calculator" },
  "/texas-moving-cost-calculator": {
    title: "Texas Moving Cost Calculator: Move Budget",
    description: "Estimate the full cost of moving to or within Texas, including transportation, packing, travel, deposits, setup costs and a contingency for the unexpected.",
  },
  "/property-tax-calculators": { title: "Texas Property Tax Calculators" },
  "/fishing": { title: "Texas Fishing Guide | Lakes & Species" },
  "/sports-venues": { title: "Texas Stadiums & Sports Venues" },
  "/events": { title: "Texas Events & Festivals" },
  "/destination/palo-duro-canyon-state-park": { title: "Palo Duro Canyon State Park Guide" },
  "/texas-vs/california": { title: "Texas vs California: Cost & Living" },
  "/article/texas-wildlife-guide": { title: "Texas Wildlife Guide: Animals & Habitats" },
  "/article/texas-regions-explained": {
    title: "Texas Landforms & Regions: Mountains, Plains, Coast & More",
    description: "Explore Texas landforms and regions, from the Hill Country and Piney Woods to the Gulf Coast, High Plains, Big Bend mountains, basins and South Texas.",
  },
  "/article/texas-farm-to-market-roads-explained": { title: "Texas Farm-to-Market Roads Explained" },
  "/article/beginners-guide-ordering-texas-barbecue": { title: "How to Order Texas Barbecue" },
  "/article/texas-septic-systems-homeowner-guide": {
    title: "Texas Septic System Design & OSSF Guide",
    description: "Texas septic system design guide covering OSSF site evaluation, permits, conventional and aerobic systems, drainfields, approved plans and homeowner maintenance.",
  },
  "/article/texas-rio-grande-river-guide": {
    title: "Rio Grande in Texas: Basin, Border, Reservoirs & River Guide",
    description: "Guide to the Rio Grande in Texas, from desert canyons and the border to Amistad, Falcon, water treaties, irrigation and the river's Gulf outlet.",
  },
  "/article/texas-major-cities-regional-differences": {
    title: "Major Texas Cities Compared: Houston, DFW, Austin & San Antonio",
    description: "Compare Houston, Dallas-Fort Worth, Austin, San Antonio and Texas regions on climate, culture, jobs, driving and daily life before choosing where to live.",
  },
  "/article/texas-national-parks-big-bend-guadalupe-guide": {
    title: "Big Bend & Guadalupe Mountains National Parks: Texas Guide",
    description: "Compare Big Bend National Park and Guadalupe Mountains National Park in Texas, including landscapes, hiking, access, seasons and which park fits your trip.",
  },
};

// These high-impression snippet experiments matter to server-rendered search output but are
// deliberately excluded from the browser bundle. Client navigation falls back to each page's
// existing metadata; canonical SSR output carries the GSC-aligned title/description.
const TEXASDEFINED_GSC_SSR_OVERRIDES: Record<string, TechnicalSeoOverride> = import.meta.env.SSR ? {
  "/article/texas-rivers-explained": {
    title: "Major Rivers in Texas: Boundary Rivers, Regions & Basins",
    description: "Find Texas's major and boundary rivers by region, from the Rio Grande and Red to the Brazos, Colorado, Guadalupe, Trinity, Sabine and Neches.",
  },
  "/article/texas-river-basins-guide": {
    title: "Texas River Basins: 15 Major & 8 Coastal Basins",
    description: "Learn how Texas's 15 major and eight coastal basins divide the state by watershed, and how rivers, reservoirs, cities and the Gulf connect.",
  },
  "/article/texas-lakes-reservoirs-explained": {
    title: "Texas Lakes & Reservoirs: Why Most Are Man-Made",
    description: "See why most familiar inland Texas lakes are reservoirs built for water supply and flood control, including Lake Travis, Texoma and Canyon Lake.",
  },
  "/article/texas-highway-designations-explained": {
    title: "Texas Road Names: What FM, RM, SH, Loop & Spur Mean",
    description: "Decode Texas road designations: FM and RM roads, State Highways, Loops and Spurs.",
  },
  "/article/texas-school-districts-explained": {
    title: "What Does ISD Stand For in Texas? School District Guide",
    description: "ISD means Independent School District. Learn why city limits and ZIP codes do not determine school districts, campus zones or local school taxes.",
  },
  "/article/texas-settlement-patterns-explained": {
    title: "Texas Settlement Patterns: How Geography Shaped Towns",
    description: "See how rivers and reliable water drew early Texas settlement, while rainfall and fertile soils supported denser farm communities than drier ranch country.",
  },
  "/article/why-texas-has-254-counties": {
    title: "Why Does Texas Have 254 Counties? History & County Seats",
    description: "Texas has more counties than any other state. See how distance, settlement, county seats and 19th-century travel created the 254-county map.",
  },
  "/sports-venue/legacy-stadium-katy": {
    title: "Legacy Stadium Katy: Parking, Events & Visitor Guide",
    description: "Plan a Legacy Stadium visit in Katy with verified parking, arrival, event, official venue and map links for Katy ISD football and UIL playoff games.",
  },
  "/sports-venue/eagle-stadium-allen": {
    title: "Eagle Stadium Allen: Parking & Football Guide",
    description: "Plan Eagle Stadium in Allen with verified parking, arrival and official venue links for Allen Eagles football, UIL playoffs and game nights.",
  },
  "/sports-venue/mesquite-memorial-stadium": {
    title: "Mesquite Memorial Stadium: Parking, Tickets & Events",
    description: "Plan Mesquite Memorial Stadium with verified parking, directions, ticket and event links for Mesquite ISD football, soccer and UIL games.",
  },
  "/sports-venue/mckinney-isd-stadium": {
    title: "McKinney ISD Stadium: Parking, Events & Visitor Guide",
    description: "Plan a McKinney ISD Stadium visit with verified parking, arrival, event-day and official venue links for football and community events.",
  },
  "/event/westfest": {
    title: "Westfest Texas: Dates, Parade, Schedule & Hours",
    description: "Plan Westfest in West, Texas with the current date guidance, parade information, schedule and hours sources, admission details and trip-planning links.",
  },
  "/event/heart-o-texas-fair-rodeo": {
    title: "Heart O' Texas Fair & Rodeo 2026: Dates & Schedule",
    description: "The 2026 Heart O' Texas Fair & Rodeo runs Oct. 8-18 in Waco. Check fair hours, One HOT Rodeo dates, ticket rules and official planning links.",
  },
  "/event/sweetwater-rattlesnake-roundup": {
    title: "Sweetwater Rattlesnake Roundup 2027: Dates & Visitor Guide",
    description: "Sweetwater Rattlesnake Roundup 2027 planning window: March 12-14. The dedicated 2027 schedule is not yet published; confirm dates and hours before travel.",
  },
  "/texas-symbols": {
    title: "Texas State Symbols: Official List, Meanings & State Icons",
    description: "Explore Texas state symbols and official designations, from the flag, flower and bird to foods, animals, plants and other Lone Star State icons.",
  },
  "/article/republic-of-texas-navy-history": {
    title: "Republic of Texas Navy: Ships, Battles & History",
    description: "Explore the Republic of Texas Navy, its ships, commanders, Gulf operations, battles and role in defending the independent republic from 1836 to 1846.",
  },
  "/event/charro-days-fiesta": {
    title: "Charro Days Fiesta 2027: Dates, Parade & Brownsville Guide",
    description: "Charro Days Fiesta 2027 core dates are Feb. 25-27 in Brownsville. See parade and festival guidance, official sources and Rio Grande Valley trip planning.",
  },
  "/event/hidalgo-borderfest": {
    title: "BorderFest Hidalgo: Dates, Schedule & Visitor Guide",
    description: "Plan BorderFest in Hidalgo, Texas with current dates, schedule guidance, official event sources and practical Rio Grande Valley visitor information.",
  },
  "/texas-rock-rockabilly": {
    title: "Texas Rock & Rockabilly: Artists, History & Sound",
    description: "Explore Texas rock and rockabilly through the artists, scenes, venues and sounds that helped shape the state's place in American music history.",
  },
  "/article/battleship-texas-bb-35-history-restoration": {
    title: "Battleship Texas (BB-35): History & Restoration",
    description: "Follow Battleship Texas BB-35 from World War I and World War II service through preservation, dry-dock work, restoration and its Texas legacy.",
  },
  "/event/floresville-peanut-festival": {
    title: "Floresville Peanut Festival 2026: Dates, Schedule & Tickets",
    description: "Plan the 2026 Floresville Peanut Festival with verified dates, parade and schedule information, ticket details, official sources and Wilson County context.",
  },
  "/sports-venue/childrens-health-stadium-prosper": {
    title: "Children's Health Stadium Prosper: Parking & Events",
    description: "Plan a Children's Health Stadium visit in Prosper with parking, arrival, event-day and official venue links for football, soccer and community events.",
  },
  "/event/dallas-holiday-parade": {
    title: "Dallas Holiday Parade 2026: Date, Route & Planning Guide",
    description: "Dallas Holiday Parade 2026 planning date: Dec. 5, based on the organizer's first-Saturday rule. See route, 9 a.m. start, viewing and DART guidance.",
  },
  "/event/houston-thanksgiving-day-parade": {
    title: "Houston Thanksgiving Parade 2026: Date, Time & Route",
    description: "Houston's H-E-B Thanksgiving Day Parade is Nov. 26, 2026 at 9 a.m. downtown. See official route, viewing, closures and arrival-planning guidance.",
  },
  "/event/texas-rose-festival": {
    title: "Texas Rose Festival 2026: Tyler Dates, Parade & Schedule",
    description: "Plan the 2026 Texas Rose Festival in Tyler with official dates, parade and schedule information, venue details and practical Smith County trip planning.",
  },
  "/event/larry-joe-taylor-texas-music-festival": {
    title: "Larry Joe Taylor Festival 2027: Dates, Tickets & Camping",
    description: "LJT Fest returns to Stephenville April 19-24, 2027. Find official ticket and camping links plus Melody Mountain Ranch and Erath County planning details.",
  },
  "/event/fulton-oysterfest": {
    title: "Fulton Oysterfest 2027: Dates, Tickets & Visitor Guide",
    description: "Fulton Oysterfest runs March 4-7, 2027 at Fulton Harbor Park. Find official event information, coastal trip planning and Rockport-Fulton context.",
  },
  "/article/texas-colorado-river-guide": {
    title: "Colorado River in Texas: Lakes, Basin & Hill Country Guide",
    description: "Follow the Texas Colorado River through the Highland Lakes and Austin to the Gulf, with basin geography, reservoirs, Hill Country context and key places.",
  },
  "/article/texas-ecoregions-habitats-guide": {
    title: "Texas Ecoregions: Habitats, Landscapes & Wildlife Guide",
    description: "Explore Texas ecoregions from Piney Woods and prairies to Edwards Plateau, South Texas brush, desert and mountains, with habitats and wildlife by region.",
  },
  "/article/texas-home-architecture-regions": {
    title: "Texas Home Styles: Ranch, Hill Country, Craftsman & More",
    description: "Compare Texas home styles and regional architecture, including ranch, Hill Country, Craftsman, Spanish-influenced and Gulf Coast designs.",
  },
  "/article/texas-prairies-grasslands-guide": {
    title: "Texas Prairies & Grasslands: Regions, Plants & Wildlife",
    description: "Explore Texas prairies and grasslands, including Blackland Prairie, coastal prairie and High Plains habitats, with plants, wildlife and landscape context.",
  },
  "/article/texas-ranch-to-market-roads-explained": {
    title: "What Does RM Mean on Texas Roads? Ranch-to-Market Roads",
    description: "RM means Ranch-to-Market Road in Texas. Learn how RM roads differ from FM roads, where they are used and how TxDOT designates them.",
  },
  "/things-unique-to-texas/texas-brands": {
    title: "Famous Texas Brands: H-E-B, Buc-ee's, Whataburger & More",
    description: "Explore famous and iconic Texas brands, from H-E-B, Buc-ee's and Whataburger to retailers, food companies and businesses closely identified with Texas.",
  },
  "/sports-venues/high-school-football": {
    title: "Texas High School Football Stadiums: Best Venues & Guides",
    description: "Explore Texas high school football stadiums with venue guides, locations, parking and game-day context for notable stadiums across the state.",
  },
  "/sports-venue/whataburger-field": {
    title: "Whataburger Field Corpus Christi: Parking, Map & Events",
    description: "Plan a Whataburger Field visit in Corpus Christi with parking, map, arrival, ticket and event information for Corpus Christi Hooks baseball games.",
  },
  "/texas-food-history": {
    title: "Texas Food History: Barbecue, Tex-Mex, Chili & More",
    description: "Explore the history of Texas food through barbecue, Tex-Mex, chili, Czech and German traditions, Gulf seafood and regional dishes across the state.",
  },
  "/event/burnet-bluebonnet-festival": {
    title: "Burnet Bluebonnet Festival 2027: Dates, Schedule & Guide",
    description: "Burnet's Bluebonnet Festival runs April 9-11, 2027. See official date guidance, schedule planning, downtown Burnet details and Hill Country trip tips.",
  },
  "/event/chappell-hill-bluebonnet-festival": {
    title: "Chappell Hill Bluebonnet Festival 2027: Dates & Guide",
    description: "The Official State of Texas Bluebonnet Festival returns to Chappell Hill April 10-11, 2027. See dates, parking, schedule and Washington County planning.",
  },
  "/event/buc-days": {
    title: "Buc Days 2027: Corpus Christi Dates, Rodeo & Carnival",
    description: "Buc Days runs April 29-May 9, 2027 in Corpus Christi. Plan around Rodeo Corpus Christi, parades, carnival attractions, concerts and official schedules.",
  },
  "/event/poteet-strawberry-festival": {
    title: "Poteet Strawberry Festival 2027: Date Status & Visitor Guide",
    description: "Planning Poteet Strawberry Festival 2027? The organizer says the 80th annual dates are coming soon. Check the latest official date status and visitor guide.",
  },
  "/county/palo-pinto": {
    title: "Palo Pinto County, Texas: Population, Acres & County Guide",
    description: "Explore Palo Pinto County with population, land area, county seat, communities, geography, official links and practical local-reference information.",
  },
  "/article/lake-whitney-water-system-guide": {
    title: "Lake Whitney Texas: Brazos River Reservoir & Water Guide",
    description: "Understand Lake Whitney as a Brazos River reservoir, including flood control, water supply, recreation, dam context and how the lake fits the larger basin.",
  },
  "/article/texas-jobs-economy-industries": {
    title: "Texas Economy & Jobs: Major Industries, Regions & Growth",
    description: "Explore the Texas economy by major industries, jobs and regions, from energy and manufacturing to technology, health care, trade and agriculture.",
  },
  "/county/lamb": {
    title: "Lamb County, Texas: Population, County Seat & Local Guide",
    description: "Explore Lamb County, Texas with population, county seat, communities, land area, geography, official links and practical local-reference information.",
  },
  "/event/great-american-scrapbook-convention": {
    title: "Great American Scrapbook Convention: Mesquite Visitor Guide",
    description: "Plan the Great American Scrapbook Convention in Mesquite with event information, venue guidance, official sources and practical Dallas-area trip planning.",
  },
  "/events/big-bend-events": {
    title: "Big Bend Events & Festivals: Far West Texas Calendar Guide",
    description: "Find Big Bend and Far West Texas events with festival, community, arts and outdoor planning guidance for Alpine, Marfa, Terlingua and nearby towns.",
  },
  "/sports-venue/constellation-field": {
    title: "Constellation Field Sugar Land: Parking, Map & Events",
    description: "Plan a Constellation Field visit in Sugar Land with parking, map, arrival, ticket and event information for Space Cowboys baseball and other stadium events.",
  },
  "/sports-venue/ford-center-at-the-star": {
    title: "Ford Center at The Star: Parking, Map & Events",
    description: "Plan a Ford Center at The Star visit in Frisco with parking, map, arrival and event information for football, practices, tournaments and special events.",
  },
  "/sports-venue/houston-motorsports-park": {
    title: "Houston Motorsports Park: Racing, Schedule & Visitor Guide",
    description: "Plan a Houston Motorsports Park visit with racing, event, arrival, map and official-source guidance for the motorsports venue in the Houston area.",
  },
  "/sports-venue/texas-motorplex": {
    title: "Texas Motorplex Ennis: Drag Racing, Events & Visitor Guide",
    description: "Plan a Texas Motorplex visit in Ennis with drag-racing event, parking, map, arrival and official-source guidance for race weekends and special events.",
  },
  "/sports-venue/ufcu-stadium": {
    title: "UFCU Stadium San Marcos: Parking, Map & Events",
    description: "Plan a UFCU Stadium visit in San Marcos with parking, map, arrival and event information for Texas State football and other stadium events.",
  },
  "/sports-venues/baseball": {
    title: "Texas Baseball Stadiums & Ballparks: Venue Guides",
    description: "Explore Texas baseball stadiums and ballparks with venue guides, locations, parking and game-day planning for professional, college and other notable fields.",
  },
  "/texas-symbols/fruit": {
    title: "Texas State Fruit: Texas Red Grapefruit Facts & History",
    description: "Texas Red Grapefruit is the official state fruit. Learn when Texas adopted it, why the Rio Grande Valley matters and how grapefruit became a state symbol.",
  },
  "/texas-symbols/pepper": {
    title: "Texas State Pepper: Jalapeño Facts & State Symbol History",
    description: "The jalapeño is the official Texas state pepper. Learn when it was designated, its place in Texas food culture and how it differs from the native pepper.",
  },
  "/texas-symbols/shell": {
    title: "Texas State Shell: Lightning Whelk Facts & Gulf Coast Guide",
    description: "The lightning whelk is the official Texas state shell. Learn its designation, distinctive left-opening shell and connection to the Texas Gulf Coast.",
  },
  "/texas-vs/georgia": {
    title: "Texas vs Georgia: Cost of Living, Taxes, Climate & Lifestyle",
    description: "Compare Texas and Georgia on cost of living, taxes, housing, climate, jobs, geography and daily life using a practical side-by-side state guide.",
  },
  "/texas-vs/ohio": {
    title: "Texas vs Ohio: Cost of Living, Taxes, Climate & Lifestyle",
    description: "Compare Texas and Ohio on cost of living, taxes, housing, climate, jobs, geography and daily life with a practical side-by-side state guide.",
  },
  "/texas-vs/tennessee": {
    title: "Texas vs Tennessee: Cost of Living, Taxes & Lifestyle",
    description: "Compare Texas and Tennessee on cost of living, taxes, housing, climate, jobs, geography and daily life with a practical side-by-side state guide.",
  },
  "/events/rodeos": {
    title: "Texas Rodeos: Major Events, Calendar & Visitor Guides",
    description: "Explore Texas rodeos with major event guides, locations, seasonal planning and links to individual rodeo pages across the state.",
  },
  "/sports-venue/rice-stadium": {
    title: "Rice Stadium Houston: Parking, Map & Events",
    description: "Plan a Rice Stadium visit in Houston with parking, map, arrival and event information for Rice football and other stadium events.",
  },
  "/sports-venue/tdecu-stadium": {
    title: "TDECU Stadium Houston: Parking, Map & Events",
    description: "Plan a TDECU Stadium visit in Houston with parking, map, arrival and event information for Houston Cougars football and other stadium events.",
  },

  "/county/bowie": {
    title: "Bowie County, Texas: Population, County Seat & Local Guide",
    description: "Explore Bowie County, Texas with population, county seat, communities, land area, geography, maps, official links and practical local-reference information.",
  },
  "/county/burnet": {
    title: "Burnet County, Texas: Population, County Seat & Local Guide",
    description: "Explore Burnet County, Texas with population, county seat, communities, land area, geography, maps, official links and practical local-reference information.",
  },
  "/county/erath": {
    title: "Erath County, Texas: Population, County Seat & Local Guide",
    description: "Explore Erath County, Texas with population, county seat, communities, land area, geography, maps, official links and practical local-reference information.",
  },
  "/county/henderson": {
    title: "Henderson County, Texas: Population, County Seat & Local Guide",
    description: "Explore Henderson County, Texas with population, county seat, communities, land area, geography, maps, official links and practical local-reference information.",
  },
  "/county/jasper": {
    title: "Jasper County, Texas: Population, County Seat & Local Guide",
    description: "Explore Jasper County, Texas with population, county seat, communities, land area, geography, maps, official links and practical local-reference information.",
  },
  "/county/orange": {
    title: "Orange County, Texas: Population, County Seat & Local Guide",
    description: "Explore Orange County, Texas with population, county seat, communities, land area, geography, maps, official links and practical local-reference information.",
  },
  "/county/panola": {
    title: "Panola County, Texas: Population, County Seat & Local Guide",
    description: "Explore Panola County, Texas with population, county seat, communities, land area, geography, maps, official links and practical local-reference information.",
  },
  "/county/refugio": {
    title: "Refugio County, Texas: Population, County Seat & Local Guide",
    description: "Explore Refugio County, Texas with population, county seat, communities, land area, geography, maps, official links and practical local-reference information.",
  },
  "/explore/painted-churches/guides/painted-churches-weekend-hours": {
    title: "Painted Churches of Texas: Weekend Hours & Tour Planning",
    description: "Plan a weekend visit to Texas Painted Churches with opening-hour guidance, church-by-church stops, etiquette and official sources to check before you drive.",
  },
  "/fishing/lakes/sam-rayburn-reservoir/fish": {
    title: "Sam Rayburn Reservoir Fish Species: Bass, Crappie & More",
    description: "See common fish species in Sam Rayburn Reservoir, including largemouth bass, crappie and catfish, with practical Texas fishing and lake context.",
  },
  "/sports-venue/momentum-bank-ballpark": {
    title: "Momentum Bank Ballpark: Midland RockHounds Stadium Guide",
    description: "Plan a Momentum Bank Ballpark visit in Midland with RockHounds baseball, parking, map, arrival, ticket and event information from official sources.",
  },
  "/sports-venue/lone-star-park": {
    title: "Lone Star Park Grand Prairie: Racing, Tickets & Visitor Guide",
    description: "Plan a Lone Star Park visit in Grand Prairie with horse-racing, ticket, parking, map, arrival and event information from official venue sources.",
  },
  "/sports-venue/sun-bowl-stadium": {
    title: "Sun Bowl Stadium El Paso: Parking, Map & Events",
    description: "Plan a Sun Bowl Stadium visit in El Paso with parking, map, arrival and event information for UTEP football, the Sun Bowl and other stadium events.",
  },
  "/sports-venue/college-park-center": {
    title: "College Park Center Arlington: Parking, Map & Events",
    description: "Plan a College Park Center visit in Arlington with parking, map, arrival, ticket and event information for UT Arlington basketball and arena events.",
  },
  "/sports-venue/unt-coliseum": {
    title: "UNT Coliseum (Super Pit): Parking, Map & Events",
    description: "Plan a UNT Coliseum visit in Denton with parking, map, arrival and event information for North Texas basketball and other Super Pit events.",
  },
  "/texas-symbols/amphibian": {
    title: "Texas State Amphibian: Texas Toad Facts & History",
    description: "The Texas toad is the official state amphibian. Learn about its designation, habitat, range, identifying traits and place among Texas state symbols.",
  },
  "/texas-symbols/cobbler": {
    title: "Texas State Cobbler: Peach Cobbler Facts & History",
    description: "Peach cobbler is the official Texas state cobbler. Learn about its designation, Texas peach traditions and how the dessert became a state symbol.",
  },
  "/texas-symbols/dinosaur": {
    title: "Texas State Dinosaur: Paluxysaurus Facts & History",
    description: "Learn about the official Texas state dinosaur, Paluxysaurus, its designation, fossil history, Texas connections and place among state symbols.",
  },
  "/texas-vs/utah": {
    title: "Texas vs Utah: Cost of Living, Climate, Taxes & Lifestyle",
    description: "Compare Texas and Utah on cost of living, taxes, housing, climate, jobs, geography and daily life with a practical side-by-side state guide.",
  },
  "/texas-vs/south-carolina": {
    title: "Texas vs South Carolina: Cost, Taxes, Climate & Lifestyle",
    description: "Compare Texas and South Carolina on cost of living, taxes, housing, climate, jobs, geography and daily life with a practical side-by-side state guide.",
  },

  "/event/addison-oktoberfest": {
    title: "Addison Oktoberfest 2026: Dates, Hours, Tickets & Parking",
    description: "Addison Oktoberfest runs Sept. 17-20, 2026 at Addison Circle Park. Find festival hours, tickets, parking, hotel and official planning links.",
  },
  "/texas-state-fair": {
    title: "State Fair of Texas 2026: Dates, Hours, Tickets & Fair Park",
    description: "The State Fair of Texas runs Sept. 25-Oct. 18, 2026 at Fair Park in Dallas. Plan hours, tickets, DART, parking, food, rides and daily events.",
  },
  "/article/el-paso-county-missions-rio-grande-texas": {
    title: "El Paso County Missions & Rio Grande: Borderlands History Guide",
    description: "Explore El Paso County through the Rio Grande, Ysleta Mission, borderlands history, communities and West Texas geography.",
  },
  "/article/texas-barbecue-styles-explained": {
    title: "Texas Barbecue Styles: Central, East, South & West Texas BBQ",
    description: "Compare Texas barbecue styles by region, from Central Texas brisket and East Texas barbecue to South and West Texas traditions, meats and cooking methods.",
  },
  "/article/texas-business-routes-explained": {
    title: "What Is a Business Highway? Texas Business Routes Explained",
    description: "Learn what a business highway or business route is, why older highway alignments run through towns, and how Texas business routes, loops and signs work.",
  },
  "/article/texas-culture-social-customs-newcomers": {
    title: "Texas Culture & Traditions: Newcomer Guide to Social Customs",
    description: "Understand Texas culture, traditions and everyday social customs, including regional differences, greetings, food, sports, community events and local etiquette.",
  },
  "/things-unique-to-texas": {
    title: "What Is Texas Known For? Iconic Foods, Places & Traditions",
    description: "Explore things strongly associated with Texas, including barbecue, rodeos, bluebonnets, football, ranch culture, music, iconic brands and distinctive landscapes.",
  },
  "/article/texas-guadalupe-river-guide": {
    title: "Guadalupe River Texas: Canyon Lake, Tubing, Basin & River Guide",
    description: "Follow the Guadalupe River through the Hill Country, Canyon Lake and New Braunfels with tubing, basin, water, recreation and destination context.",
  },
  "/destination/natural-bridge-wildlife-ranch": {
    title: "Natural Bridge Wildlife Ranch: Tickets, Hours & Visitor Guide",
    description: "Plan a Natural Bridge Wildlife Ranch visit near San Antonio with ticket, hours, drive-through safari, arrival and official-site planning information.",
  },
  "/event/lone-star-cowboy-poetry-gathering-bastrop": {
    title: "Lone Star Cowboy Poetry Gathering 2027: Bastrop Dates & Guide",
    description: "The Lone Star Cowboy Poetry Gathering returns to Bastrop Sept. 3-4, 2027. Find venue, schedule, ticket and official planning links.",
  },
  "/event/schulenburg-festival": {
    title: "Schulenburg Festival 2027: Dates, Schedule & Visitor Guide",
    description: "Schulenburg Festival runs Aug. 5-8, 2027. Find schedule, entertainment, event, official-source and Fayette County visitor-planning information.",
  },
  "/event/terlingua-international-chili-championship": {
    title: "Terlingua International Chili Championship: Dates & Visitor Guide",
    description: "Plan the Terlingua International Chili Championship with event, schedule, arrival, official-source and Big Bend visitor information.",
  },
  "/sports-venue/cotton-bowl-stadium": {
    title: "Cotton Bowl Stadium Dallas: Parking, Map & Events",
    description: "Plan a Cotton Bowl Stadium visit at Fair Park in Dallas with parking, map, arrival, event and official venue information.",
  },
  "/sports-venue/datcu-stadium": {
    title: "DATCU Stadium Denton: Parking, Map & North Texas Football",
    description: "Plan a DATCU Stadium visit in Denton with parking, map, arrival and event information for North Texas football and other stadium events.",
  },
  "/sports-venue/jamail-texas-swimming-center": {
    title: "Lee & Joe Jamail Texas Swimming Center: Parking & Events",
    description: "Plan a Jamail Texas Swimming Center visit in Austin with parking, arrival, meet, venue and official University of Texas event information.",
  },
  "/sports-venue/tpc-san-antonio": {
    title: "TPC San Antonio: Golf Courses, Tournaments & Visitor Guide",
    description: "Explore TPC San Antonio with course, tournament, resort-area and visitor-planning information plus official golf and venue links.",
  },
  "/texas-country-outlaw": {
    title: "Texas Outlaw Country: Artists, History & Texas Country Sound",
    description: "Explore Texas outlaw country and Texas country music through influential artists, scenes, venues and the sound that grew beyond Nashville conventions.",
  },
  "/texas-vs/louisiana": {
    title: "Texas vs Louisiana: Cost of Living, Taxes, Climate & Lifestyle",
    description: "Compare Texas and Louisiana on cost of living, taxes, housing, climate, jobs, geography and daily life with a practical side-by-side state guide.",
  },
  "/texas-symbols/tree": {
    title: "Texas State Tree: Pecan Tree Facts & State Symbol History",
    description: "The pecan is the official Texas state tree. Learn its designation, history, habitat, uses and place among the official symbols of Texas.",
  },
  "/destination/mckinney-falls-state-park": {
    title: "McKinney Falls State Park: Trails, Camping & Austin Visitor Guide",
    description: "Plan McKinney Falls State Park near Austin with trails, waterfalls, camping, swimming, reservations, maps and official Texas State Parks information.",
  },

  "/event/kerrville-folk-festival": {
    title: "Kerrville Folk Festival 2027: Schedule, Tickets & Visitor Guide",
    description: "Plan the 2027 Kerrville Folk Festival at Quiet Valley Ranch with schedule, ticket, camping, arrival and official festival information.",
  },
  "/article/texas-caverns-caves-first-timers-guide": {
    title: "Caverns in Texas: Public Caves, Tours & First-Timer Guide",
    description: "Find Texas caverns and caves open to the public, compare tour experiences and plan a first visit with location, access and official-site guidance.",
  },
  "/explore/painted-churches-plan": {
    title: "Painted Churches of Texas Map: Schulenburg Route & Trip Planner",
    description: "Plan a Schulenburg-area Painted Churches road trip with a mapped route, church stops, weekend-hour guidance and practical trip-planning links.",
  },
  "/texas-disabled-veteran-property-tax-calculator": {
    title: "Texas Disabled Veteran Property Tax Calculator & Exemption Guide",
    description: "Estimate the tax effect of a verified Texas disabled-veteran property-tax exemption amount using official local taxing-unit rates that apply to the property.",
  },
  "/article/texas-highway-designations-explained": {
    title: "Texas Road Names Explained: FM, RM, SH, Loops & Spurs",
    description: "Learn what FM, RM, SH, loops, spurs and other Texas highway designations mean, how the road system is named and where each designation is used.",
  },
  "/article/possum-kingdom-water-system-guide": {
    title: "Possum Kingdom Lake: Water Level, Brazos River Authority & Guide",
    description: "Understand Possum Kingdom Lake water management, current-level resources, Brazos River Authority ownership and the reservoir system behind the lake.",
  },
  "/texas-data/school-district-tax-rates": {
    title: "Texas School District Property Tax Rates: Comptroller Data",
    description: "Compare selected Texas school-district adopted property-tax rates from the statewide Comptroller dataset, with source and year context for each figure.",
  },
  "/sports-venue/amarillo-national-center": {
    title: "Amarillo National Center: Events, Parking & Visitor Guide",
    description: "Plan an Amarillo National Center visit with event, parking, arrival, address and official venue information for the Tri-State Fairgrounds complex.",
  },
  "/sports-venue/eagles-canyon-raceway": {
    title: "Eagles Canyon Raceway: Track Map, Events & Visitor Guide",
    description: "Plan an Eagles Canyon Raceway visit with track, event, arrival, map and official motorsports information for the Decatur-area road course.",
  },
  "/sports-venue/expo-center-taylor-county": {
    title: "Taylor County Expo Center: Events, Parking & Abilene Guide",
    description: "Plan a Taylor County Expo Center visit in Abilene with event, parking, arrival, address and official venue information.",
  },
  "/texas-symbols/motto": {
    title: "Texas State Motto: Friendship Meaning, History & Facts",
    description: "Learn the official Texas state motto, what Friendship means in Texas history and how the motto fits among the state's official symbols.",
  },
  "/texas-symbols/horse": {
    title: "Texas State Horse: American Quarter Horse Facts & History",
    description: "Learn about the American Quarter Horse as an official Texas state symbol, including its designation, history and connection to Texas ranching culture.",
  },
  "/texas-vs/kentucky": {
    title: "Texas vs Kentucky: Cost of Living, Taxes, Climate & Lifestyle",
    description: "Compare Texas and Kentucky on cost of living, taxes, housing, climate, jobs, geography and day-to-day lifestyle in a practical side-by-side guide.",
  },
  "/texas-vs/west-virginia": {
    title: "Texas vs West Virginia: Cost of Living, Taxes & Lifestyle",
    description: "Compare Texas and West Virginia on cost of living, taxes, housing, climate, jobs, geography and daily life in a practical side-by-side state guide.",
  },
  "/article/texas-courthouse-architecture-guide": {
    title: "Texas Courthouse Architecture: Styles, History & Buildings Guide",
    description: "Explore Texas courthouse architecture by style and era, from Romanesque and Classical designs to regional materials, historic squares and preservation.",
  },
} : {};

const SOCIAL_IMAGE_FALLBACKS: Partial<Record<BrandConfig["identity"]["id"], { src: string; alt: string; type: string }>> = {
  texasdefined: {
    src: "/images/state-parks/palo-duro-canyon-state-park.jpg",
    alt: "Palo Duro Canyon, one of the landscapes that define Texas",
    type: "image/jpeg",
  },
};

function cleanMetaText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function cleanMetaDescription(value: string) {
  const cleaned = cleanMetaText(value);
  if (cleaned.length <= META_DESCRIPTION_MAX_LENGTH) return cleaned;
  const slice = cleaned.slice(0, META_DESCRIPTION_MAX_LENGTH - 1);
  const wordBoundary = slice.lastIndexOf(" ");
  const trimmed = (wordBoundary >= 120 ? slice.slice(0, wordBoundary) : slice).replace(/[,:;\s]+$/, "");
  return `${trimmed}.`;
}

export function absoluteUrl(brand: BrandConfig, value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  const path = value.startsWith("/") ? value : `/${value}`;
  return `https://${brand.identity.domain}${path}`;
}

export function buildMeta(brand: BrandConfig, page: PageSeo) {
  const technicalOverride = brand.identity.id === "texasdefined" && page.canonicalPath
    ? TEXASDEFINED_GSC_SSR_OVERRIDES[page.canonicalPath] ?? TEXASDEFINED_TECHNICAL_SEO_OVERRIDES[page.canonicalPath]
    : undefined;
  const pageTitle = cleanMetaText(technicalOverride?.title ?? page.title);
  const description = cleanMetaDescription(technicalOverride?.description ?? page.description);
  const fullTitle = cleanMetaText(brand.seo.titleTemplate.replace("%s", pageTitle));
  const canonicalUrl = page.canonicalPath ? absoluteUrl(brand, page.canonicalPath) : undefined;
  const fallbackImage = SOCIAL_IMAGE_FALLBACKS[brand.identity.id];
  const image = page.image
    ? { src: page.image, alt: page.imageAlt, type: page.imageType }
    : fallbackImage;
  const imageUrl = image ? absoluteUrl(brand, image.src) : undefined;
  const robots = page.robots ?? (page.canonicalPath ? DEFAULT_INDEX_ROBOTS : undefined);
  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: page.type ?? "website" },
    { property: "og:site_name", content: brand.identity.name },
    { property: "og:locale", content: brand.identity.locale.replace("-", "_") },
    { name: "twitter:card", content: imageUrl ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
  ];
  if (canonicalUrl) meta.push({ property: "og:url", content: canonicalUrl });
  if (imageUrl) {
    meta.push(
      { property: "og:image", content: imageUrl },
      { property: "og:image:secure_url", content: imageUrl },
      { name: "twitter:image", content: imageUrl },
    );
    if (image?.alt) meta.push({ property: "og:image:alt", content: cleanMetaText(image.alt) }, { name: "twitter:image:alt", content: cleanMetaText(image.alt) });
    if (page.imageWidth) meta.push({ property: "og:image:width", content: String(page.imageWidth) });
    if (page.imageHeight) meta.push({ property: "og:image:height", content: String(page.imageHeight) });
    if (image?.type) meta.push({ property: "og:image:type", content: image.type });
  }
  if (robots) meta.push({ name: "robots", content: robots }, { name: "googlebot", content: robots });
  if (page.publishedTime) meta.push({ property: "article:published_time", content: page.publishedTime });
  if (page.modifiedTime) meta.push({ property: "article:modified_time", content: page.modifiedTime });
  if (brand.seo.twitterSite) meta.push({ name: "twitter:site", content: brand.seo.twitterSite });
  return meta;
}

export function canonicalLink(brand: BrandConfig, path: string) {
  return { rel: "canonical", href: absoluteUrl(brand, path) };
}

export function buildSeoHead(brand: BrandConfig, page: PageSeo) {
  return {
    meta: buildMeta(brand, page),
    links: page.canonicalPath ? [canonicalLink(brand, page.canonicalPath)] : [],
  };
}

export function jsonLd(data: Record<string, unknown>) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data),
  };
}

export function buildEditorialCollectionHead(brand: BrandConfig, page: EditorialCollectionSeo) {
  const pageUrl = absoluteUrl(brand, page.canonicalPath);
  const siteUrl = `https://${brand.identity.domain}`;
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
    ...(page.breadcrumbParentName && page.breadcrumbParentPath
      ? [{
          "@type": "ListItem",
          position: 2,
          name: page.breadcrumbParentName,
          item: absoluteUrl(brand, page.breadcrumbParentPath),
        }]
      : []),
    {
      "@type": "ListItem",
      position: page.breadcrumbParentName && page.breadcrumbParentPath ? 3 : 2,
      name: page.collectionName,
      item: pageUrl,
    },
  ];
  const itemListElement = page.items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": item.type,
      name: item.name,
      url: absoluteUrl(brand, item.url),
      ...(item.description ? { description: item.description } : {}),
      ...(item.image ? { image: absoluteUrl(brand, item.image) } : {}),
    },
  }));

  return {
    meta: buildMeta(brand, page),
    links: [canonicalLink(brand, page.canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}#collection`,
          url: pageUrl,
          name: page.collectionName,
          description: page.description,
          ...(page.image
            ? {
                image: {
                  "@type": "ImageObject",
                  url: absoluteUrl(brand, page.image),
                  ...(page.imageAlt ? { caption: page.imageAlt } : {}),
                },
              }
            : {}),
          isPartOf: { "@id": `${siteUrl}/#website` },
          mainEntity: { "@id": `${pageUrl}#items` },
          breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
        },
        {
          "@type": "ItemList",
          "@id": `${pageUrl}#items`,
          numberOfItems: itemListElement.length,
          itemListElement,
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumbs`,
          itemListElement: breadcrumbItems,
        },
      ],
    })],
  };
}

export function schemaTypeForEntityKind(kind: string) {
  const normalized = kind.toLowerCase();
  if (normalized === "city" || normalized === "town") return "City";
  if (normalized === "county" || normalized === "region") return "AdministrativeArea";
  if (normalized === "lake" || normalized === "river") return "BodyOfWater";
  if (normalized === "park") return "Park";
  if (normalized === "event") return "Event";
  if (normalized === "organization" || normalized === "agency") return "Organization";
  if (normalized === "person") return "Person";
  if (normalized === "attraction" || normalized === "destination") return "TouristAttraction";
  return "Place";
}