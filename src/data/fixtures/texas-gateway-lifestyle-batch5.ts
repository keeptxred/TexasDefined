import bigBend from "@/assets/big-bend.jpg";
import bluebonnets from "@/assets/bluebonnets.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";

import type { Article, ImageRef } from "../types";

const image = (src: string, alt: string): ImageRef => ({ src, alt, width: 1600, height: 1067 });
const images = {
  bigBend: image(bigBend, "The Chisos Mountains rising over the Big Bend desert"),
  bluebonnets: image(bluebonnets, "A spring field of Texas bluebonnets"),
  road: image(roadTrip, "A two-lane Texas road stretching toward the horizon"),
  town: image(smallTown, "A historic Texas courthouse square at golden hour"),
};

export const texasGatewayLifestyleBatch5Articles: Article[] = [
  {
    id: "gateway-b5-etiquette",
    brandId: "texasdefined",
    slug: "unwritten-rules-of-texas-etiquette",
    title: "25 Unwritten Rules of Texas Etiquette",
    dek: "Hold the door, wave on a back road, do not block the gas pump, and understand that friendliness usually comes before formality.",
    category: "guides",
    hero: images.town,
    authorId: "a-hollis",
    publishedAt: "2026-08-20",
    readingMinutes: 9,
    tags: ["texas etiquette", "texas culture", "texas manners", "living in texas"],
    body: [
      { type: "paragraph", text: "Texas etiquette is not one rigid code, and the state is too diverse for every custom to apply everywhere. Still, certain habits show up often enough that newcomers notice them." },
      { type: "list", items: ["Hold the door when someone is right behind you.", "Acknowledge a neighbor even if you do not know them well.", "On a quiet road, a small steering-wheel wave is normal.", "Do not park at the fuel pump after you are done fueling if people are waiting.", "Let faster traffic pass when it is safe and legal to do so.", "Do not trespass for a wildflower photo.", "Ask before entering private ranch land, even if a gate is open.", "Respect posted burn bans and fire restrictions.", "Bring water for yourself instead of assuming someone else will have enough.", "If someone says a road can flood, believe them.", "Do not underestimate heat when a local tells you to start early.", "At barbecue counters, know roughly what you want before you reach the cutter.", "Expect casual conversation with strangers in small towns.", "Do not confuse friendliness with an invitation to overstay.", "Return borrowed tools in better shape than you found them.", "Offer help when a neighbor is dealing with storm debris.", "Keep gates the way you found them on ranch property.", "Do not stop in an active roadway for a scenic photo.", "At a crowded swimming hole, give people room.", "Treat county fairs and school events as community spaces, not theme parks.", "Use sir and ma’am if that is natural to you, but do not assume everyone does.", "Do not mock a town’s local tradition before you understand it.", "Remember that Texans disagree with one another as much as anyone else.", "If you are invited to eat, bringing something is rarely a bad idea.", "When in doubt, be friendly without being intrusive."] },
    ],
    internalLinks: [
      { href: "/things-unique-to-texas", label: "Things unique to Texas" },
      { href: "/texas-history", label: "Texas history" },
      { href: "/small-towns", label: "Texas small towns" },
      { href: "/texas-facts", label: "100 essential Texas facts" },
    ],
    relatedCollections: [], relatedDestinations: [],
  },
  {
    id: "gateway-b5-myths",
    brandId: "texasdefined",
    slug: "texas-myths-outsiders-still-believe",
    title: "30 Texas Myths Outsiders Still Believe",
    dek: "No, everyone does not own a ranch. No, the whole state is not desert. And no, one stereotype can explain a place this large.",
    category: "guides",
    hero: images.road,
    authorId: "a-dell",
    publishedAt: "2026-08-20",
    readingMinutes: 10,
    tags: ["texas myths", "texas stereotypes", "texas facts", "texas culture"],
    body: [
      { type: "paragraph", text: "Texas stereotypes are powerful because some are rooted in real history or regional culture. The problem comes when one image is stretched over a state with deserts, pine forests, beaches, global cities, ranch country and border communities." },
      { type: "heading", text: "The myths worth retiring" },
      { type: "list", items: ["All of Texas is desert.", "Everyone wears cowboy boots every day.", "Everyone owns a ranch.", "Every Texan listens to country music.", "Texas food is only barbecue and Tex-Mex.", "The whole state has the same accent.", "Houston, Dallas, Austin and San Antonio feel basically the same.", "There is no winter.", "It never gets humid outside Houston.", "There are no forests.", "There are no mountains.", "Texas beaches are all alike.", "Small-town Texas is culturally uniform.", "Every Texan agrees on chili.", "Every barbecue joint serves the same style.", "The Alamo tells the whole story of Texas history.", "Texas was always part of the United States.", "The state has one climate.", "Driving across Texas is easy in a day.", "No state income tax means taxes are low for everyone.", "Every city is cheap to live in.", "The Gulf Coast and West Texas have similar weather risks.", "Every county looks alike.", "The Rio Grande Valley is just another version of South Texas suburbs.", "East Texas feels like Central Texas.", "Texas wildlife is mostly cattle and deer.", "Rodeos are only tourist attractions.", "Dance halls are only historic relics.", "Texas traditions never change.", "There is one correct way to define what is truly Texas."] },
    ],
    internalLinks: [
      { href: "/texas-facts", label: "100 essential Texas facts" },
      { href: "/things-unique-to-texas", label: "Things unique to Texas" },
      { href: "/texas-history", label: "Texas history" },
      { href: "/explore", label: "Explore Texas regions" },
      { href: "/texas-vs-every-state", label: "Texas vs every other state" },
    ],
    relatedCollections: [], relatedDestinations: [],
  },
  {
    id: "gateway-b5-weather",
    brandId: "texasdefined",
    slug: "texas-weather-surprises-newcomers",
    title: "25 Texas Weather Surprises Newcomers Learn Fast",
    dek: "Heat gets the headlines, but hail, flash floods, hard freezes, hurricanes, wind and huge regional differences are part of the real Texas weather story.",
    category: "home-garden",
    hero: images.bigBend,
    authorId: "a-marisol",
    publishedAt: "2026-08-20",
    readingMinutes: 10,
    tags: ["texas weather", "moving to texas", "texas heat", "texas storms"],
    body: [
      { type: "paragraph", text: "Texas weather is easiest to misunderstand when people talk about the state as though it has one climate. It does not. Gulf humidity, Panhandle cold, desert dryness and North Texas severe storms create very different daily realities." },
      { type: "list", items: ["Summer heat lasts longer than many newcomers expect.", "Humidity can make the same temperature feel completely different by region.", "A hard freeze can still happen after weeks of mild winter weather.", "Hail can be a major property risk in parts of the state.", "Flash flooding can develop quickly in low-water crossings.", "A dry creek can become dangerous after upstream rain.", "Hurricane impacts can extend well inland.", "Storm surge is only one coastal hazard.", "Tornado risk is real but highly regional and seasonal.", "Straight-line wind can cause serious damage too.", "Drought can change landscaping and water rules for months.", "Wildfire danger rises when drought and wind overlap.", "Dust can become a major issue in West Texas and the Panhandle.", "The temperature can swing sharply behind a strong cold front.", "Blue-sky mornings can end with severe storms by evening.", "Coastal winters can feel damp even when temperatures are mild.", "Heat at night matters almost as much as daytime highs.", "Urban pavement makes summer nights warmer.", "Shade is an asset, not just a landscaping feature.", "Road surfaces can become dangerous during rare ice events.", "Freezing rain can be more disruptive than snow.", "Spring weather can change road-trip plans quickly.", "Fall is not guaranteed to arrive on the calendar date you expect.", "A Texas forecast should always be read with the specific region in mind.", "Weather preparation is part of homeownership, not just travel planning."] },
    ],
    internalLinks: [
      { href: "/home-garden", label: "Texas home & garden" },
      { href: "/article/prepare-texas-house-freeze", label: "Prepare a Texas house for a freeze" },
      { href: "/moving-to-texas", label: "Moving to Texas" },
      { href: "/outdoors", label: "Texas outdoors" },
      { href: "/guides", label: "Texas practical guides" },
    ],
    relatedCollections: [], relatedDestinations: [],
  },
  {
    id: "gateway-b5-daytrips",
    brandId: "texasdefined",
    slug: "texas-day-trips-that-feel-like-a-vacation",
    title: "20 Texas Day Trips That Feel Like a Vacation",
    dek: "A spring-fed river, canyon trail, courthouse square, Gulf beach or barbecue town can turn one free day into a real change of scenery.",
    category: "road-trips",
    hero: images.road,
    authorId: "a-dell",
    publishedAt: "2026-08-20",
    readingMinutes: 8,
    tags: ["texas day trips", "texas road trips", "things to do in texas", "texas weekend"],
    body: [
      { type: "paragraph", text: "The best Texas day trip is close enough to avoid spending the entire day in the car but different enough to feel like you went somewhere. Choose by region instead of chasing a statewide list from one starting point." },
      { type: "list", items: ["A Hill Country river town and swimming hole.", "A courthouse-square town with breakfast and local shops.", "A barbecue town with one major meal and a long walk afterward.", "A state park with one signature trail.", "A Gulf Coast beach outside peak crowds.", "A historic mission route.", "A Czech or German heritage town with bakery stops.", "A Piney Woods lake and paddling afternoon.", "A wildflower loop in spring.", "A small-town festival weekend compressed into one day.", "A historic fort or battlefield site.", "A scenic drive through ranch country.", "A birding destination during migration.", "A cavern or spring-fed attraction.", "A museum paired with the neighborhood or town that explains it.", "A football Friday in a small town.", "A rodeo or county fair.", "A lake day built around fishing or shoreline time.", "A dance-hall evening paired with a nearby town.", "A sunrise-to-sunset park day that ends with local food."] },
    ],
    internalLinks: [
      { href: "/road-trips", label: "Texas road trips" },
      { href: "/explore", label: "Explore Texas" },
      { href: "/state-parks", label: "Texas state parks" },
      { href: "/small-towns", label: "Texas small towns" },
      { href: "/events", label: "Texas events" },
    ],
    relatedCollections: [], relatedDestinations: [],
  },
  {
    id: "gateway-b5-festivals",
    brandId: "texasdefined",
    slug: "texas-festivals-worth-a-weekend",
    title: "25 Types of Texas Festivals Worth Planning a Weekend Around",
    dek: "Wildflowers, peaches, crawfish, rodeos, county fairs, Czech heritage, barbecue and music all become reasons to build a Texas road trip around the calendar.",
    category: "events",
    hero: images.town,
    authorId: "a-hollis",
    publishedAt: "2026-08-20",
    readingMinutes: 8,
    tags: ["texas festivals", "texas events", "texas weekend", "texas road trip"],
    body: [
      { type: "paragraph", text: "Texas festivals are useful travel anchors because they give a town a reason to show off its food, history, music and local identity all at once. Instead of chasing a static list of dates, look for the festival types that match the season and region you want to explore." },
      { type: "list", items: ["Wildflower festivals", "Bluebonnet celebrations", "Peach festivals", "Watermelon festivals", "Strawberry festivals", "Pecan festivals", "Crawfish festivals", "Barbecue cookoffs", "Chili cookoffs", "Kolache festivals", "Czech heritage festivals", "German heritage festivals", "Rodeos", "County fairs", "Livestock shows", "Western heritage festivals", "Music festivals", "Dance-hall weekends", "Coastal seafood festivals", "Birding festivals", "Holiday light festivals", "Pumpkin and harvest festivals", "Frontier-history events", "Car and tractor shows", "Small-town centennial or homecoming celebrations"] },
    ],
    internalLinks: [
      { href: "/events", label: "Texas events calendar" },
      { href: "/small-towns", label: "Texas small towns" },
      { href: "/road-trips", label: "Texas road trips" },
      { href: "/food-bbq", label: "Texas food & BBQ" },
      { href: "/browse/cities", label: "Browse Texas cities" },
    ],
    relatedCollections: [], relatedDestinations: [],
  },
  {
    id: "gateway-b5-summer",
    brandId: "texasdefined",
    slug: "things-you-understand-after-a-texas-summer",
    title: "25 Things You Only Understand After Living Through a Texas Summer",
    dek: "Shade becomes strategy, errands move earlier, steering wheels become hazards and the AC suddenly feels like essential infrastructure.",
    category: "guides",
    hero: images.bluebonnets,
    authorId: "a-dell",
    publishedAt: "2026-08-20",
    readingMinutes: 8,
    tags: ["texas summer", "living in texas", "texas heat", "texas culture"],
    body: [
      { type: "paragraph", text: "Texas summer is not one experience—El Paso heat and Houston heat feel very different—but prolonged heat changes daily behavior across much of the state." },
      { type: "list", items: ["You stop judging a parking spot only by distance.", "Shade can beat a closer space.", "The steering wheel can be painfully hot.", "Errands start moving earlier in the day.", "Outdoor workouts become sunrise activities.", "Water in the car is a habit, not an accessory.", "A broken AC becomes an urgent household problem.", "Attic temperature suddenly explains a lot about energy bills.", "Tree canopy feels like infrastructure.", "Blacktop radiates heat long after sunset.", "Pool water can get warmer than expected.", "Dogs need heat-aware walking schedules.", "Outdoor events become logistics exercises.", "A cloudy day can feel like a gift.", "Humidity changes what 'hot' means.", "Dry heat still punishes long exposure.", "Summer storms can arrive fast and hard.", "Indoor attractions become part of road-trip planning.", "Cold drinks disappear faster than expected.", "You learn which parks have real shade.", "The Gulf can feel warmer than expected.", "Nighttime lows matter for comfort.", "A good porch fan earns loyalty.", "You stop assuming September means fall.", "The first genuinely cool morning feels like a statewide holiday."] },
    ],
    internalLinks: [
      { href: "/home-garden", label: "Texas home & garden" },
      { href: "/outdoors", label: "Texas outdoors" },
      { href: "/article/texas-native-garden-that-survives-august", label: "A garden that survives August" },
      { href: "/moving-to-texas", label: "Moving to Texas" },
    ],
    relatedCollections: [], relatedDestinations: [],
  },
  {
    id: "gateway-b5-roadtrip-state",
    brandId: "texasdefined",
    slug: "texas-is-better-as-a-road-trip",
    title: "20 Reasons Texas Makes More Sense as a Road Trip Than a Checklist",
    dek: "The spaces between destinations—small towns, rivers, ranch roads, bakeries, courthouses and changing landscapes—are often where Texas actually becomes memorable.",
    category: "road-trips",
    hero: images.road,
    authorId: "a-dell",
    publishedAt: "2026-08-20",
    readingMinutes: 8,
    tags: ["texas road trip", "visit texas", "explore texas", "texas travel"],
    body: [
      { type: "paragraph", text: "A checklist trip can hit famous places and still miss what connects them. Texas is unusually rewarding when the drive itself is part of the plan." },
      { type: "list", items: ["The landscape changes dramatically between regions.", "Small towns fill the space between major cities.", "Food traditions are often tied to specific corridors and communities.", "Historic courthouses create natural stopping points.", "Farm-to-Market roads reveal a different state from the interstate.", "Wildflower season turns ordinary roads into attractions.", "Ranch entrances and old fences tell a land-use story.", "Oil, wind and agriculture can share the same horizon.", "Roadside historical markers add context in place.", "Local museums make more sense when paired with the town around them.", "State parks are scattered widely enough to anchor multi-day loops.", "Texas rivers create natural route themes.", "Barbecue destinations make sense as clusters.", "German and Czech heritage towns can form a food-and-history route.", "Mission sites connect better when seen as a network.", "The Gulf Coast rewards slow travel between towns.", "West Texas scale is part of the experience.", "East Texas forest roads feel like another state entirely.", "A two-lane detour can become the memorable part of the day.", "Texas makes more sense when you let geography explain the itinerary."] },
    ],
    internalLinks: [
      { href: "/road-trips", label: "Texas road trips" },
      { href: "/explore", label: "Explore Texas" },
      { href: "/article/hill-country-two-lane-loop", label: "The Two-Lane Loop" },
      { href: "/browse/counties", label: "Browse Texas counties" },
      { href: "/texas-facts", label: "Texas facts" },
    ],
    relatedCollections: [], relatedDestinations: [],
  },
  {
    id: "gateway-b5-signs",
    brandId: "texasdefined",
    slug: "texas-signs-newcomers-dont-understand",
    title: "20 Texas Signs Newcomers Don’t Understand Until Someone Explains Them",
    dek: "FM roads, low-water crossings, cattle guards, burn bans and county-line markers all carry more meaning than they first appear to.",
    category: "guides",
    hero: images.road,
    authorId: "a-hollis",
    publishedAt: "2026-08-20",
    readingMinutes: 7,
    tags: ["texas road signs", "texas roads", "texas travel", "texas newcomers"],
    body: [
      { type: "paragraph", text: "Some Texas signs are literal warnings; others are clues to how the state is organized. Once you know what they mean, a drive becomes much more legible." },
      { type: "list", items: ["FM — Farm to Market Road.", "RM — Ranch to Market Road.", "Low Water Crossing — a road segment that can flood quickly.", "Road May Flood — treat it as a real hazard, not decoration.", "Cattle Guard — a livestock barrier built into the roadway.", "Open Range — livestock may be present near or on roads in some areas.", "Burn Ban — local outdoor-burning restrictions are in effect.", "County Line — often a meaningful change in local government and road maintenance.", "Historical Marker — a state or local history site worth slowing down for safely.", "Scenic Overlook — one of the rare places where stopping is designed into the route.", "No Through Trucks — local routing restriction, often through older town centers.", "Flood Gauge — a visual depth reference at a crossing.", "Wildlife Crossing — especially relevant near dawn and dusk.", "Loose Livestock — exactly what it sounds like; reduce speed and stay alert.", "Road Closed When Flooded — do not attempt the crossing.", "Private Road — access is not public simply because the road is paved.", "County Road — local route naming that may replace familiar street conventions.", "Loop/Spur — short state-highway designations with specific route functions.", "Frontage Road — parallel access road serving businesses and local traffic along major highways.", "Next Services XX Miles — a reminder that Texas distance can become a logistics issue."] },
    ],
    internalLinks: [
      { href: "/road-trips", label: "Texas road trips" },
      { href: "/guides", label: "Texas practical guides" },
      { href: "/texas-facts", label: "Texas facts" },
      { href: "/explore", label: "Explore Texas" },
    ],
    relatedCollections: [], relatedDestinations: [],
  },
];

const batch5Slugs = new Set(texasGatewayLifestyleBatch5Articles.map((article) => article.slug));

export async function loadTexasGatewayLifestyleBatch5Article(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !batch5Slugs.has(slug)) return null;
  return texasGatewayLifestyleBatch5Articles.find((article) => article.slug === slug) ?? null;
}
