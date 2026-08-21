import bbqBrisket from "@/assets/bbq-brisket.jpg";
import bluebonnets from "@/assets/bluebonnets.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";

import type { Article, ImageRef } from "../types";

const image = (src: string, alt: string): ImageRef => ({ src, alt, width: 1600, height: 1067 });
const images = {
  bbq: image(bbqBrisket, "Texas barbecue brisket on butcher paper"),
  flowers: image(bluebonnets, "A spring field of Texas bluebonnets"),
  road: image(roadTrip, "A two-lane Texas road stretching toward the horizon"),
  town: image(smallTown, "A historic Texas courthouse square at golden hour"),
};

const base = {
  brandId: "texasdefined" as const,
  authorId: "a-dell",
  publishedAt: "2026-08-20",
  readingMinutes: 8,
  relatedCollections: [],
  relatedDestinations: [],
};

export const texasGatewayLifestyleBatch6Articles: Article[] = [
  {
    ...base,
    id: "gateway-b6-family",
    slug: "texas-things-every-family-should-do",
    title: "25 Texas Things Every Family Should Do at Least Once",
    dek: "From state parks and county fairs to barbecue stops, swimming holes and Friday-night football, these are experiences kids remember long after the drive home.",
    category: "guides",
    hero: images.road,
    tags: ["texas family trips", "things to do in texas with kids", "texas family bucket list"],
    body: [
      { type: "paragraph", text: "A Texas family bucket list does not have to mean expensive attractions. The strongest memories often come from places where geography, food, history and local traditions overlap." },
      { type: "list", items: ["Hike an easy state-park trail.", "Swim in a spring-fed Texas river.", "Watch a small-town parade.", "Go to a county fair.", "See a rodeo.", "Visit a historic mission.", "Walk a courthouse square.", "Eat barbecue from butcher paper.", "Try breakfast tacos from a local favorite.", "Take a wildflower drive.", "See Big Tex at the State Fair.", "Watch a Friday-night high school football game.", "Visit a Texas cave or cavern.", "Spend a day on a lake.", "See the Gulf Coast at sunrise.", "Visit a ranching or frontier-history site.", "Take a two-lane Hill Country road trip.", "See the stars in West Texas.", "Visit a Texas museum tied to the town around it.", "Go birding during migration.", "Attend a small-town food festival.", "Visit a historic dance hall.", "Stop at a roadside produce stand or bakery.", "Explore a Texas national park.", "Let the kids choose one unexpected roadside stop."] },
    ],
    internalLinks: [
      { href: "/explore", label: "Explore Texas" },
      { href: "/state-parks", label: "Texas state parks" },
      { href: "/events", label: "Texas events" },
      { href: "/small-towns", label: "Texas small towns" },
      { href: "/road-trips", label: "Texas road trips" },
      { href: "/texas-state-fair", label: "State Fair of Texas guide" },
    ],
  },
  {
    ...base,
    id: "gateway-b6-free",
    slug: "free-things-to-do-in-texas",
    title: "30 Free Things to Do in Texas That Are Actually Worth Your Time",
    dek: "Courthouse squares, historic districts, beaches, scenic drives, public art, wildflowers and local events prove a Texas weekend does not have to be expensive.",
    category: "guides",
    hero: images.town,
    tags: ["free things to do in texas", "cheap texas trips", "texas travel"],
    body: [
      { type: "paragraph", text: "Free does not automatically mean worthwhile, so this list focuses on experiences that still reveal something about Texas rather than merely filling time." },
      { type: "list", items: ["Walk a historic courthouse square.", "Drive a scenic Farm-to-Market road.", "See spring wildflowers from public roads and legal pull-offs.", "Walk a Gulf beach with public access.", "Visit a historic district.", "Read roadside historical markers.", "Explore public art in a Texas downtown.", "Watch bats emerge where public viewing is allowed.", "Bird at a public park.", "Attend a free community concert.", "Visit a farmers market even if you only browse.", "Walk a university campus with historic architecture.", "Tour a public memorial.", "Photograph county courthouses.", "Watch sunset from a public overlook.", "Explore a riverwalk or public greenway.", "Attend a town Christmas-lighting event.", "Watch a small-town parade.", "Visit free-admission museum days when offered.", "Explore state capitol grounds.", "Walk a historic cemetery respectfully.", "See public murals.", "Visit a public pier.", "Explore a downtown railroad district.", "Watch wildlife from a public observation area.", "Take a self-guided architecture walk.", "Explore a historic mission exterior and grounds where free access is offered.", "Attend a local festival with free general admission when available.", "Drive a bluebonnet loop without entering private property.", "Build a full day around one walkable Texas town."] },
    ],
    internalLinks: [
      { href: "/explore", label: "Explore Texas" },
      { href: "/small-towns", label: "Texas small towns" },
      { href: "/road-trips", label: "Texas road trips" },
      { href: "/events", label: "Texas events" },
      { href: "/texas-history", label: "Texas history" },
      { href: "/browse/cities", label: "Browse Texas cities" },
    ],
  },
  {
    ...base,
    id: "gateway-b6-date",
    slug: "texas-date-ideas-better-than-dinner",
    title: "25 Texas Date Ideas Better Than Just Going to Dinner",
    dek: "Sunset overlooks, dance halls, small-town squares, paddling, festivals and two-lane drives make better stories than another table for two.",
    category: "guides",
    hero: images.road,
    tags: ["texas date ideas", "texas couples trips", "texas weekend ideas"],
    body: [
      { type: "paragraph", text: "Texas has enough scale and variety to make a date feel like a miniature trip without requiring a full vacation." },
      { type: "list", items: ["Take a sunset Hill Country drive.", "Dance at a historic dance hall.", "Visit a county fair.", "Split a barbecue tray and walk a courthouse square.", "Paddle a lake or slow river.", "Go wildflower spotting in spring.", "Visit a small-town bakery before the morning rush.", "Watch the stars in a dark-sky area.", "Take a historic walking tour.", "Go to a rodeo.", "Spend an evening at the State Fair.", "Visit a Texas winery region without making the trip only about drinking.", "Watch sunrise at the coast.", "Explore a cavern.", "Choose a town neither of you has visited.", "Go birding during migration.", "Take a scenic train ride where available.", "Visit a museum and then explore the neighborhood around it.", "Try a food festival.", "Go antiquing in a small town.", "Find a spring-fed swimming hole.", "Take a photography drive.", "Attend a live local music night.", "Pick a state park trail around sunset.", "Plan a one-day road trip where each person chooses one stop."] },
    ],
    internalLinks: [
      { href: "/road-trips", label: "Texas road trips" },
      { href: "/events", label: "Texas events" },
      { href: "/small-towns", label: "Texas small towns" },
      { href: "/state-parks", label: "Texas state parks" },
      { href: "/food-bbq", label: "Texas food & BBQ" },
    ],
  },
  {
    ...base,
    id: "gateway-b6-home-mistakes",
    slug: "texas-homeowner-mistakes",
    title: "25 Mistakes New Texas Homeowners Make in the First Year",
    dek: "Ignoring drainage, shade, freeze prep, roof age, irrigation, insurance details and summer energy use can turn a manageable house into an expensive lesson.",
    category: "home-garden",
    hero: images.town,
    tags: ["texas homeowner", "texas home mistakes", "moving to texas", "texas home maintenance"],
    body: [
      { type: "paragraph", text: "Texas homeownership is highly regional, but some first-year mistakes repeat because weather, soil, taxes, utilities and insurance work differently than newcomers expect." },
      { type: "list", items: ["Ignoring drainage until the first heavy storm.", "Assuming flood risk ends at mapped flood zones.", "Underestimating summer electric bills.", "Not learning the irrigation schedule.", "Overwatering clay soil.", "Ignoring foundation movement signs.", "Buying plants poorly suited to Texas heat.", "Waiting until a freeze to find faucet covers.", "Not learning the main water shutoff location.", "Ignoring roof age when reviewing insurance.", "Assuming every policy covers the same wind or hail losses.", "Letting gutters and downspouts discharge beside the foundation.", "Treating shade trees as cosmetic rather than functional.", "Ignoring attic insulation and air leaks.", "Failing to service HVAC before peak summer.", "Leaving hoses connected before a freeze.", "Not checking fence and gate condition before storm season.", "Ignoring termites and other pest risks.", "Letting standing water create mosquito habitat.", "Not understanding HOA or local watering rules.", "Assuming all utility providers work the same way.", "Missing homestead-exemption deadlines or eligibility research.", "Ignoring pool freeze protection if the property has a pool.", "Waiting until hurricane season to inventory outdoor items.", "Treating the first year as though Texas weather will be average."] },
    ],
    internalLinks: [
      { href: "/home-garden", label: "Texas home & garden" },
      { href: "/article/prepare-texas-house-freeze", label: "Prepare a Texas house for a freeze" },
      { href: "/moving-to-texas", label: "Moving to Texas" },
      { href: "/guides", label: "Texas practical guides" },
      { href: "/texas-home-insurance-calculator", label: "Texas home insurance calculator" },
    ],
  },
  {
    ...base,
    id: "gateway-b6-garden",
    slug: "texas-gardening-mistakes",
    title: "20 Texas Gardening Mistakes That Make Summer Harder Than It Has to Be",
    dek: "The wrong plant, the wrong soil assumption and the wrong watering habit can turn August into a losing battle.",
    category: "home-garden",
    hero: images.flowers,
    tags: ["texas gardening", "texas plants", "texas yard", "native plants texas"],
    body: [
      { type: "paragraph", text: "A Texas garden becomes easier when it is designed for the local soil, rainfall pattern, heat and sun exposure instead of copied from a catalog photo." },
      { type: "list", items: ["Planting for appearance without checking heat tolerance.", "Ignoring mature plant size.", "Watering shallowly every day.", "Assuming all Texas soils drain quickly.", "Assuming all Texas soils are clay.", "Planting full-sun labels into reflected afternoon heat without context.", "Using too much lawn where shade or drought makes it struggle.", "Ignoring native and adapted plants.", "Planting at the wrong time of year.", "Mulching directly against trunks.", "Letting irrigation spray pavement.", "Ignoring drainage after storms.", "Failing to group plants by water needs.", "Choosing thirsty plants for hard-to-reach beds.", "Overfertilizing stressed plants in heat.", "Ignoring freeze sensitivity.", "Using invasive plants without understanding their behavior.", "Forgetting pollinator value.", "Not adjusting irrigation seasonally.", "Fighting the site instead of designing around it."] },
    ],
    internalLinks: [
      { href: "/home-garden", label: "Texas home & garden" },
      { href: "/article/texas-native-garden-that-survives-august", label: "A garden that survives August" },
      { href: "/article/best-native-plants-texas-yard", label: "Best native plants for a Texas yard" },
      { href: "/guides", label: "Texas practical guides" },
    ],
  },
  {
    ...base,
    id: "gateway-b6-trivia",
    slug: "texas-trivia-questions",
    title: "50 Texas Trivia Questions That Get Harder as You Go",
    dek: "History, geography, symbols, food, cities, culture and the odd details that separate casual Texas knowledge from the serious stuff.",
    category: "texas-history",
    hero: images.town,
    tags: ["texas trivia", "texas quiz", "texas facts", "texas history"],
    body: [
      { type: "paragraph", text: "Use these as a family road-trip quiz, classroom warm-up, Facebook post series or a way to test how much of Texas you actually know. Answers can be verified through the deeper Texas Defined fact and history pages linked below." },
      { type: "heading", text: "Questions 1–10: warm-up" },
      { type: "list", items: ["What is the capital of Texas?", "What flower is the state flower?", "What nickname is Texas known by?", "Which city is home to the Alamo?", "What is the largest city in Texas by population?", "What is the name of the state's famous annual fair mascot?", "Which Texas city is closely associated with NASA's Johnson Space Center?", "What mountain is the highest natural point in Texas?", "What river forms much of the Texas-Mexico border?", "How many counties does Texas have?"] },
      { type: "heading", text: "Questions 11–30: know your Texas" },
      { type: "list", items: ["Which national park contains the Chisos Mountains?", "Which city is known for the Stockyards?", "What desert covers much of far West Texas?", "What 1836 battle secured Texas independence?", "What is the official state dish?", "Which city is associated with the State Fair of Texas?", "What major canyon lies in the Panhandle?", "Which lake is known for cypress trees and Spanish moss?", "What year did Texas join the United States?", "Which Texas city is famous for River Walk tourism?", "What is a Farm to Market road?", "What crop is strongly associated with the South Plains?", "Which Gulf Coast island city was devastated by the 1900 hurricane?", "What style of music is strongly associated with Tejano culture?", "Which historic cattle trail passed through Texas?", "Which Texas city is known for live music and the state capitol?", "What is a kolache?", "Which region is known for German-settled towns like Fredericksburg?", "What is the official state tree?", "Which large spring-fed pool is located in Balmorhea State Park?"] },
      { type: "heading", text: "Questions 31–50: Texas deep cuts" },
      { type: "list", items: ["What was Texas called when it was an independent nation?", "Which Spanish mission later became known as the Alamo?", "What is the difference between a kolache and a klobasnek?", "Which Texas city is home to the world's first purpose-built domed sports stadium?", "What is the name of the mountain range containing Guadalupe Peak?", "Which East Texas ecosystem is dominated by pine forest?", "What historic oil discovery transformed Texas in 1901?", "What is a low-water crossing?", "Which Texas city sits directly across the Rio Grande from Ciudad Juárez?", "What does RM mean on a Texas road sign?", "Which natural region includes much of the Hill Country's limestone terrain?", "What famous dance hall in Gruene is among the oldest continually operating in Texas?", "Which Texas university uses the phrase 'Gig 'em'?", "What is the official state large mammal?", "Which coastal birding corridor is globally significant during migration?", "What is the state's official small mammal?", "Which historic route connected Spanish missions in Texas?", "What is the name of the state's distinctive five-pointed symbol?", "Which city became a major center of the early Texas oil industry after Spindletop?", "What makes Texas trivia hard? The state is too large for one region's facts to explain the whole thing."] },
    ],
    internalLinks: [
      { href: "/texas-facts", label: "100 essential Texas facts" },
      { href: "/texas-history", label: "Texas history" },
      { href: "/texas-symbols", label: "Texas symbols" },
      { href: "/things-unique-to-texas", label: "Things unique to Texas" },
    ],
  },
  {
    ...base,
    id: "gateway-b6-facebook",
    slug: "you-know-youre-from-texas-when",
    title: "You Know You’re From Texas When… 40 Things That Need No Explanation",
    dek: "The steering-wheel wave, the weather whiplash, the barbecue opinions and the instinct to measure distance in hours all feel completely normal after long enough here.",
    category: "guides",
    hero: images.road,
    tags: ["you know youre from texas when", "texas culture", "texas facebook", "texas humor"],
    body: [
      { type: "paragraph", text: "No list can define every Texan, but some experiences are familiar enough to start an argument in the comments—which is part of the fun." },
      { type: "list", items: ["You measure a road trip in hours, not miles.", "A steering-wheel wave feels normal.", "You have strong opinions about barbecue.", "You know breakfast tacos are not only breakfast food.", "You have experienced all four seasons in a short span.", "You understand why shade determines parking choices.", "You know not to drive into water over the road.", "You have a preferred bluebonnet-photo spot.", "You know a hard freeze can create grocery-store chaos.", "You understand why Buc-ee's becomes a landmark on a trip.", "You know county lines actually matter.", "You have heard someone debate beans in chili.", "You can recognize a Farm to Market road sign.", "You have seen a high-school stadium larger than expected.", "You know 'y'all' solves a grammatical problem efficiently.", "You have attended a rodeo, livestock show or county fair.", "You know summer does not end because the calendar says September.", "You have checked hail risk before parking under a storm.", "You know a dry creek can become dangerous fast.", "You have driven farther for barbecue than some people drive for vacation.", "You know the Gulf Coast and West Texas barely feel like the same state.", "You understand why a dance hall matters to a town.", "You know the smell before rain on hot pavement.", "You have changed outdoor plans because of heat rather than rain.", "You know a small-town bakery can be a road-trip destination.", "You understand why Friday night means football in many towns.", "You have a favorite Texas state park.", "You know wildflowers are a season, not just scenery.", "You have explained to someone that Texas has mountains.", "You have explained that Texas also has forests.", "You know the phrase 'next services 80 miles' deserves attention.", "You have heard a local weather forecast change three times in a day.", "You know brisket prices can become a serious conversation.", "You recognize that a courthouse square can be the center of a whole town.", "You have seen cattle, wind turbines and oil equipment on the same drive.", "You know locals can disagree fiercely about what counts as truly Texas.", "You have a road-trip snack strategy.", "You have learned to keep water in the car.", "You know the Texas flag appears almost everywhere.", "You know the state is too big for one stereotype to explain it."] },
    ],
    internalLinks: [
      { href: "/things-unique-to-texas", label: "Things unique to Texas" },
      { href: "/texas-facts", label: "Texas facts" },
      { href: "/road-trips", label: "Texas road trips" },
      { href: "/food-bbq", label: "Texas food & BBQ" },
      { href: "/small-towns", label: "Texas small towns" },
    ],
  },
  {
    ...base,
    id: "gateway-b6-regions",
    slug: "texas-regions-that-feel-like-different-states",
    title: "8 Texas Regions That Feel Like Completely Different States",
    dek: "Pine forests, subtropical borderlands, Gulf marshes, limestone hills, plains and desert mountains make the Texas map more varied than the stereotype suggests.",
    category: "guides",
    hero: images.road,
    tags: ["texas regions", "texas geography", "explore texas", "texas travel"],
    body: [
      { type: "paragraph", text: "The fastest way to understand Texas is to stop treating it as one landscape. Each major region creates different weather, food, architecture, road trips and outdoor experiences." },
      { type: "list", items: ["Hill Country — limestone rivers, oak-juniper hills, German-settled towns and spring-fed swimming.", "Piney Woods — forests, cypress water, East Texas food traditions and a wetter climate.", "Gulf Coast — beaches, bays, ports, seafood, marshes and hurricane exposure.", "South Texas — brush country, ranching, Tejano culture and deep borderland history.", "Rio Grande Valley — subtropical agriculture, bird migration, border cities and a distinctive food landscape.", "Panhandle and High Plains — broad horizons, wind, cattle, agriculture, canyons and dramatic weather swings.", "Big Bend and Trans-Pecos — desert basins, mountains, dark skies and huge distances.", "Prairies and Lakes — major metros, Blackland Prairie, reservoirs, farms and rapidly changing suburban landscapes."] },
    ],
    internalLinks: [
      { href: "/explore", label: "Explore Texas by region" },
      { href: "/road-trips", label: "Texas road trips" },
      { href: "/browse/cities", label: "Browse Texas cities" },
      { href: "/browse/counties", label: "Browse Texas counties" },
      { href: "/texas-facts", label: "Texas facts" },
    ],
  },
  {
    ...base,
    id: "gateway-b6-weekend-budget",
    slug: "cheap-texas-weekend-ideas",
    title: "25 Cheap Texas Weekend Ideas That Still Feel Like a Real Trip",
    dek: "A tank of gas, a courthouse square, a state park, a bakery stop and one memorable meal can be enough for a great Texas weekend.",
    category: "road-trips",
    hero: images.town,
    tags: ["cheap texas weekend", "budget texas travel", "texas road trips"],
    body: [
      { type: "paragraph", text: "Budget Texas travel works best when the destination itself is the attraction instead of a stack of paid admissions." },
      { type: "list", items: ["Build a weekend around one small town.", "Camp at a state park.", "Take a wildflower loop in spring.", "Visit a county fair.", "Spend a beach day on the Gulf.", "Create a barbecue-and-history loop.", "Visit a courthouse-square town and nearby park.", "Take a birding weekend.", "Drive a scenic two-lane route.", "Plan a museum plus downtown walk.", "Visit a lake with public access.", "Take a historic mission weekend.", "Explore a German or Czech heritage corridor.", "Stay close to home and visit three towns you usually drive past.", "Take a photography weekend.", "Build a trip around a free festival.", "Visit historic cemeteries and markers respectfully.", "Take a sunrise-and-sunset coast trip.", "Choose one state park and one local food stop.", "Visit a college town outside game weekend.", "Explore a railroad-history town.", "Take a public-art and architecture trip.", "Visit a dance hall with low-cost live music when available.", "Plan around a farmers market and local bakery.", "Let one county become the whole weekend itinerary."] },
    ],
    internalLinks: [
      { href: "/road-trips", label: "Texas road trips" },
      { href: "/small-towns", label: "Texas small towns" },
      { href: "/state-parks", label: "Texas state parks" },
      { href: "/events", label: "Texas events" },
      { href: "/browse/counties", label: "Browse Texas counties" },
    ],
  },
  {
    ...base,
    id: "gateway-b6-food-road",
    slug: "texas-food-road-trip-bucket-list",
    title: "25 Stops for the Ultimate Texas Food Road Trip",
    dek: "Brisket, breakfast tacos, kolaches, Gulf seafood, chicken-fried steak and small-town bakeries turn the highways into the menu.",
    category: "food-bbq",
    hero: images.bbq,
    tags: ["texas food road trip", "texas food bucket list", "texas barbecue", "texas road trips"],
    body: [
      { type: "paragraph", text: "The best Texas food road trip is not one restaurant ranking. It follows communities and food traditions across regions." },
      { type: "list", items: ["Central Texas brisket", "South Texas barbacoa", "Breakfast tacos", "Tex-Mex enchiladas", "Queso", "Chicken-fried steak", "Czech kolaches", "Klobasneks", "German sausage", "East Texas chopped beef", "Gulf shrimp", "Oysters in season", "Fried catfish", "Chili con carne", "Pecan pie", "Peach cobbler", "Small-town bakery cinnamon rolls", "Meat-market sausage", "Beef ribs", "Smoked turkey", "Carne guisada", "Tacos al pastor", "Fajitas", "Local ice cream", "A town-specific festival food you have never tried before"] },
    ],
    internalLinks: [
      { href: "/food-bbq", label: "Texas food & BBQ" },
      { href: "/road-trips", label: "Texas road trips" },
      { href: "/small-towns", label: "Texas small towns" },
      { href: "/events", label: "Texas food festivals and events" },
      { href: "/browse/cities", label: "Browse Texas cities" },
    ],
  },
];

const batch6Slugs = new Set(texasGatewayLifestyleBatch6Articles.map((article) => article.slug));

export async function loadTexasGatewayLifestyleBatch6Article(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !batch6Slugs.has(slug)) return null;
  return texasGatewayLifestyleBatch6Articles.find((article) => article.slug === slug) ?? null;
}
