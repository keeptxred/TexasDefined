import bigBend from "@/assets/big-bend.jpg";
import caddoLake from "@/assets/caddo-lake.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";

import type { Article, ImageRef } from "../types";

const image = (src: string, alt: string): ImageRef => ({ src, alt, width: 1600, height: 1067 });
const images = {
  city: image(smallTown, "A Texas downtown and courthouse square at golden hour"),
  road: image(roadTrip, "A Texas highway running toward the horizon"),
  west: image(bigBend, "Desert mountains in far West Texas"),
  east: image(caddoLake, "Cypress trees on an East Texas lake"),
};

const base = {
  brandId: "texasdefined" as const,
  authorId: "a-dell",
  publishedAt: "2026-08-20",
  readingMinutes: 8,
  relatedCollections: [],
  relatedDestinations: [],
};

export const texasGatewayRegionalBatch7Articles: Article[] = [
  {
    ...base,
    id: "gateway-b7-houston",
    slug: "things-to-know-before-visiting-houston",
    title: "25 Things to Know Before Visiting Houston",
    dek: "The city is bigger, more international, more neighborhood-driven and more spread out than first-time visitors expect.",
    category: "guides",
    hero: images.city,
    tags: ["visiting houston", "houston travel tips", "things to know houston"],
    body: [
      { type: "paragraph", text: "Houston rewards visitors who plan by neighborhood instead of treating the metro as one compact downtown. Food, museums, sports, parks and cultural districts are scattered across a huge urban area." },
      { type: "list", items: ["Driving distances can be deceptive.", "Traffic patterns should shape your itinerary.", "Humidity changes how outdoor plans feel.", "The food scene is far broader than barbecue and Tex-Mex.", "Houston's diversity is one of its defining strengths.", "The Museum District can fill an entire day.", "Space Center Houston is a destination, not a quick stop.", "Downtown is only one part of the city.", "Neighborhood food corridors are worth planning around.", "Flood awareness matters during heavy rain.", "Summer outdoor plans work better early or late.", "Sports venues draw large crowds across the year.", "The bayou system is part of the city's geography.", "Galveston can work as a separate day trip.", "The Gulf Coast influences weather and culture.", "Airport choice can affect drive time significantly.", "Public transit works better for some corridors than others.", "Parking expectations vary by district.", "Art and murals extend well beyond museums.", "International grocery stores and restaurants are attractions in their own right.", "The city has more green space than many visitors assume.", "Houston is not a stereotypical version of Texas.", "A one-day visit barely scratches the surface.", "Neighborhood-level planning beats attraction-hopping.", "Leave room for a meal you did not plan in advance."] },
    ],
    internalLinks: [
      { href: "/browse/cities", label: "Browse Texas cities" },
      { href: "/food-bbq", label: "Texas food & BBQ" },
      { href: "/events", label: "Texas events" },
      { href: "/road-trips", label: "Texas road trips" },
      { href: "/texas-history", label: "Texas history" },
    ],
  },
  {
    ...base,
    id: "gateway-b7-austin",
    slug: "things-to-know-before-visiting-austin",
    title: "25 Things to Know Before Visiting Austin",
    dek: "Music, food, swimming holes, traffic, heat and rapid growth make Austin easier to enjoy when you know what kind of trip you actually want.",
    category: "guides",
    hero: images.road,
    tags: ["visiting austin", "austin travel tips", "things to know austin"],
    body: [
      { type: "paragraph", text: "Austin is often reduced to live music, barbecue and the state capitol. Those matter, but the city's best experiences are spread across neighborhoods, waterways and nearby Hill Country routes." },
      { type: "list", items: ["Traffic can erase ambitious schedules.", "Summer heat changes walking plans.", "Swimming holes and spring-fed water are part of local culture.", "Live music happens far beyond famous venues.", "Breakfast tacos deserve their own morning.", "Barbecue lines can consume hours.", "The Capitol area rewards walking.", "South Congress is only one slice of the city.", "East Austin changes block by block.", "Parking can shape evening plans.", "Barton Springs is not a typical pool experience.", "Nearby Hill Country makes day trips easy.", "Festival weekends can transform prices and traffic.", "University events can affect the whole central city.", "The city is more outdoors-oriented than many visitors expect.", "Heat-safe timing matters for trails.", "The food scene extends well beyond Tex-Mex.", "Music history is easier to appreciate with context.", "The city has changed rapidly and locals notice it.", "Downtown is not the only nightlife zone.", "Public transit is useful on some routes but not universal.", "Weather can swing sharply in spring.", "You do not need to do every famous thing.", "One good neighborhood day can beat six rushed attractions.", "Pair Austin with a Hill Country loop if time allows."] },
    ],
    internalLinks: [
      { href: "/browse/cities", label: "Browse Texas cities" },
      { href: "/road-trips", label: "Texas road trips" },
      { href: "/food-bbq", label: "Texas food & BBQ" },
      { href: "/outdoors", label: "Texas outdoors" },
      { href: "/events", label: "Texas events" },
    ],
  },
  {
    ...base,
    id: "gateway-b7-sanantonio",
    slug: "things-to-know-before-visiting-san-antonio",
    title: "25 Things to Know Before Visiting San Antonio",
    dek: "The River Walk is famous, but missions, neighborhoods, food, military history and Tejano culture make the city much deeper than one downtown attraction.",
    category: "guides",
    hero: images.city,
    tags: ["visiting san antonio", "san antonio travel tips", "things to know san antonio"],
    body: [
      { type: "paragraph", text: "San Antonio is one of the easiest Texas cities to misunderstand if the trip never leaves the central River Walk. The city's history and culture make much more sense when the missions and surrounding neighborhoods are part of the itinerary." },
      { type: "list", items: ["The Alamo is only one mission story.", "San Antonio Missions deserve dedicated time.", "The River Walk changes character by section.", "Downtown can be walked more easily than many Texas city centers.", "Summer heat still demands breaks.", "Tex-Mex is only part of the local food story.", "Tejano culture matters to understanding the city.", "Military history is visible across the metro.", "Fiesta season changes the city dramatically.", "Market Square is different from the River Walk.", "Neighborhood bakeries and taco shops can be trip highlights.", "Mission trails work well by bike in suitable weather.", "Parking strategy matters downtown.", "The city has deep Spanish colonial history.", "German and Mexican influences overlap in surprising ways.", "Museums can provide context before historic sites.", "The city is family-friendly beyond theme parks.", "Hill Country day trips are easy from the north side.", "The urban landscape spreads farther than tourists expect.", "River-level navigation can be confusing at first.", "Local festivals can be more memorable than major attractions.", "Architecture tells multiple centuries of history.", "Food markets reward wandering.", "A two-night stay feels very different from a day trip.", "The best San Antonio trip balances downtown with history beyond downtown."] },
    ],
    internalLinks: [
      { href: "/browse/cities", label: "Browse Texas cities" },
      { href: "/texas-history", label: "Texas history" },
      { href: "/events", label: "Texas events" },
      { href: "/food-bbq", label: "Texas food & BBQ" },
      { href: "/road-trips", label: "Texas road trips" },
    ],
  },
  {
    ...base,
    id: "gateway-b7-dallas",
    slug: "things-to-know-before-visiting-dallas-fort-worth",
    title: "25 Things to Know Before Visiting Dallas–Fort Worth",
    dek: "DFW is not one city trip—it is a giant metroplex where museums, sports, food, historic districts and neighborhoods can be many miles apart.",
    category: "guides",
    hero: images.city,
    tags: ["visiting dallas", "visiting fort worth", "dfw travel tips"],
    body: [
      { type: "paragraph", text: "Dallas–Fort Worth makes more sense as a network of distinct cities and districts than as one downtown destination. Choosing where to stay based on your actual plans can save hours." },
      { type: "list", items: ["Dallas and Fort Worth are not interchangeable.", "The metroplex is enormous.", "Airport location can shape the whole trip.", "Sports venues are scattered across multiple cities.", "Fort Worth Stockyards are their own destination.", "Dallas arts institutions can fill a full day.", "Summer heat changes outdoor timing.", "Traffic varies sharply by corridor and time.", "Neighborhood restaurants can justify cross-town drives.", "State Fair season changes Dallas travel patterns.", "Football weekends can affect prices and crowds.", "Public transit is useful in some corridors but not all.", "Downtown Dallas is only one activity center.", "Fort Worth has a distinct western identity.", "Arlington is central to major sports and entertainment.", "Suburban distances add up quickly.", "Weather can turn severe in spring.", "Hail deserves respect.", "The food scene extends well beyond steakhouses.", "Museums and historic districts reward slower itineraries.", "Parking is easier in some areas than visitors expect and harder in others.", "One metro weekend should focus on a few zones.", "The State Fair is a trip anchor when in season.", "Fort Worth can deserve its own overnight.", "Do not plan DFW as though everything is fifteen minutes apart."] },
    ],
    internalLinks: [
      { href: "/browse/cities", label: "Browse Texas cities" },
      { href: "/texas-state-fair", label: "State Fair of Texas guide" },
      { href: "/events", label: "Texas events" },
      { href: "/food-bbq", label: "Texas food & BBQ" },
      { href: "/road-trips", label: "Texas road trips" },
    ],
  },
  {
    ...base,
    id: "gateway-b7-west",
    slug: "things-people-get-wrong-about-west-texas",
    title: "20 Things People Get Wrong About West Texas",
    dek: "It is not empty, flat or all desert. Mountains, oil towns, ranch country, borderlands, dark skies and enormous distances make West Texas its own world.",
    category: "guides",
    hero: images.west,
    tags: ["west texas", "west texas travel", "texas myths", "big bend"],
    body: [
      { type: "paragraph", text: "West Texas is often described as though it were one blank desert. In reality, the term covers multiple landscapes and communities with very different histories and economies." },
      { type: "list", items: ["West Texas is not all flat.", "It is not all desert.", "It is not uninhabited.", "Oil is important but not the whole story.", "Ranching remains culturally important.", "Border communities are central to the region's identity.", "Mountain landscapes can surprise first-time visitors.", "Weather can turn cold quickly at elevation.", "Dark skies are a major attraction.", "Fuel planning matters on remote routes.", "Big Bend is farther from major cities than many visitors expect.", "Marfa is not representative of all West Texas.", "El Paso has a distinct identity from the Permian Basin.", "The Davis Mountains feel different from desert basins.", "Agriculture matters in many western counties.", "Wind and energy infrastructure shape the horizon.", "Small towns can be many miles apart.", "Road closures and weather deserve attention.", "The region rewards slow driving and deliberate stops.", "Distance is part of the experience rather than wasted time."] },
    ],
    internalLinks: [
      { href: "/explore", label: "Explore Texas" },
      { href: "/road-trips", label: "Texas road trips" },
      { href: "/outdoors", label: "Texas outdoors" },
      { href: "/article/big-bend-in-winter", label: "Big Bend in winter" },
      { href: "/browse/counties", label: "Browse Texas counties" },
    ],
  },
  {
    ...base,
    id: "gateway-b7-east",
    slug: "things-people-dont-expect-about-east-texas",
    title: "20 Things People Don’t Expect About East Texas",
    dek: "Pine forests, cypress lakes, Southern foodways, historic towns and a wetter landscape make East Texas look nothing like the stereotype of the state.",
    category: "guides",
    hero: images.east,
    tags: ["east texas", "east texas travel", "piney woods", "texas regions"],
    body: [
      { type: "paragraph", text: "East Texas is one of the clearest examples of why Texas cannot be described with one landscape. The Piney Woods feel closer to parts of the Deep South than to far West Texas." },
      { type: "list", items: ["Forests dominate large areas.", "Rainfall is much higher than in West Texas.", "Cypress lakes create a distinctive landscape.", "Humidity can be intense.", "Small towns carry deep railroad and timber history.", "Food traditions overlap with broader Southern cooking.", "Barbecue can differ from Central Texas style.", "Fishing is a major part of outdoor culture.", "Birding can be excellent.", "Historic downtowns are scattered widely.", "Lakes can anchor entire weekends.", "The region has major Black history and heritage sites.", "Timber shaped local economies.", "The terrain is not uniformly flat.", "Wildlife encounters feel different in dense woods.", "Fall color can be stronger than outsiders expect.", "Spring can be lush and stormy.", "Mosquitoes and humidity affect outdoor planning.", "Caddo Lake feels unlike almost anywhere else in Texas.", "East Texas deserves its own trip rather than a drive-through."] },
    ],
    internalLinks: [
      { href: "/explore", label: "Explore Texas" },
      { href: "/lakes-rivers", label: "Texas lakes & rivers" },
      { href: "/article/caddo-lake-cypress-morning", label: "Morning on Caddo" },
      { href: "/small-towns", label: "Texas small towns" },
      { href: "/browse/counties", label: "Browse Texas counties" },
    ],
  },
  {
    ...base,
    id: "gateway-b7-hill-country",
    slug: "hill-country-mistakes-first-time-visitors-make",
    title: "20 Texas Hill Country Mistakes First-Time Visitors Make",
    dek: "Trying to do too much, ignoring heat and flash floods, skipping small towns and treating every swimming hole as guaranteed access can ruin an otherwise perfect trip.",
    category: "road-trips",
    hero: images.road,
    tags: ["texas hill country", "hill country travel", "texas road trip mistakes"],
    body: [
      { type: "paragraph", text: "The Hill Country looks compact on a map, but winding roads, crowded weekends and seasonal river conditions make it easy to over-plan." },
      { type: "list", items: ["Trying to visit too many towns in one day.", "Assuming every scenic swimming spot has public access.", "Ignoring reservations at popular parks.", "Starting hikes too late in summer.", "Driving low-water crossings during flooding.", "Expecting strong river flow during drought.", "Treating Fredericksburg as the entire Hill Country.", "Skipping smaller courthouse towns.", "Ignoring dance halls and music history.", "Planning only around wineries.", "Underestimating weekend traffic.", "Forgetting that parking can be limited at popular natural sites.", "Assuming spring wildflowers peak on the same dates every year.", "Ignoring burn bans while camping.", "Failing to carry water on scenic drives.", "Rushing between barbecue stops.", "Missing early-morning light and cooler temperatures.", "Treating every ranch road as public access.", "Skipping local bakeries and meat markets.", "Planning the trip without leaving room for a two-lane detour."] },
    ],
    internalLinks: [
      { href: "/road-trips", label: "Texas road trips" },
      { href: "/state-parks", label: "Texas state parks" },
      { href: "/article/hill-country-two-lane-loop", label: "The Two-Lane Loop" },
      { href: "/small-towns", label: "Texas small towns" },
      { href: "/outdoors", label: "Texas outdoors" },
    ],
  },
  {
    ...base,
    id: "gateway-b7-coast",
    slug: "things-to-know-before-texas-gulf-coast-trip",
    title: "20 Things to Know Before a Texas Gulf Coast Trip",
    dek: "Beach access, heat, tides, storms, seafood, mosquitoes and huge differences between coastal towns all matter more than first-time visitors expect.",
    category: "beaches-coast",
    hero: images.road,
    tags: ["texas gulf coast", "texas beach trip", "gulf coast travel tips"],
    body: [
      { type: "paragraph", text: "The Texas coast is hundreds of miles long, so a Galveston weekend, a Port Aransas trip and a South Padre vacation should not be planned as though they are interchangeable." },
      { type: "list", items: ["Texas beaches vary dramatically by location.", "Public beach access rules differ by place.", "Heat and humidity can be intense.", "Storm season matters for travel planning.", "Hurricane forecasts should be taken seriously.", "Rip currents can be dangerous even on calm-looking days.", "Mosquito pressure can change after rain.", "Seaweed conditions vary seasonally.", "Water clarity is not the same everywhere.", "Seafood traditions differ by port and region.", "Bird migration can make the coast spectacular.", "Fishing rules and licenses matter.", "Tides affect some activities and access.", "Beach driving is allowed only where local rules permit it.", "Salt and sand are hard on vehicles and gear.", "Sun exposure adds up quickly near water.", "Holiday weekends can transform traffic.", "Smaller coastal towns can be more rewarding than a single famous beach.", "Wetland and bay ecosystems are as important as open Gulf beaches.", "A good coast trip includes more than sitting on the sand."] },
    ],
    internalLinks: [
      { href: "/explore", label: "Explore Texas" },
      { href: "/outdoors", label: "Texas outdoors" },
      { href: "/events", label: "Texas coastal events" },
      { href: "/food-bbq", label: "Texas food & seafood" },
      { href: "/browse/cities", label: "Browse Texas cities" },
    ],
  },
];

const batch7Slugs = new Set(texasGatewayRegionalBatch7Articles.map((article) => article.slug));

export async function loadTexasGatewayRegionalBatch7Article(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !batch7Slugs.has(slug)) return null;
  return texasGatewayRegionalBatch7Articles.find((article) => article.slug === slug) ?? null;
}
