import bbqBrisket from "@/assets/bbq-brisket.jpg";
import bigBend from "@/assets/big-bend.jpg";
import bluebonnets from "@/assets/bluebonnets.jpg";
import caddoLake from "@/assets/caddo-lake.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";

import type { Article, ImageRef } from "../types";

const image = (src: string, alt: string): ImageRef => ({ src, alt, width: 1600, height: 1067 });
const images = {
  bbq: image(bbqBrisket, "Texas barbecue brisket served on butcher paper"),
  bigBend: image(bigBend, "The Chisos Mountains rising over the Big Bend desert"),
  bluebonnets: image(bluebonnets, "A field of Texas bluebonnets in spring"),
  caddo: image(caddoLake, "Cypress trees on Caddo Lake"),
  road: image(roadTrip, "A two-lane Texas road stretching toward the horizon"),
  town: image(smallTown, "A Texas courthouse square at golden hour"),
};

const article = (record: Article): Article => record;

export const texasGatewayBestOfBatch9Articles: Article[] = [
  article({
    id: "gateway-b9-couples", brandId: "texasdefined", slug: "best-romantic-weekend-getaways-in-texas", title: "15 Best Romantic Weekend Getaways in Texas for Different Kinds of Couples", dek: "Wine country, historic hotels, small-town squares, Gulf sunsets and dark-sky desert nights all work—but not for the same couple.", category: "road-trips", hero: images.road, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 9, tags: ["romantic getaways texas", "texas couples trip", "texas weekend getaway"],
    body: [
      { type: "paragraph", text: "The best romantic Texas weekend depends on what the two of you actually enjoy. A Fredericksburg wine itinerary, a Galveston architecture weekend and a Big Bend stargazing trip solve completely different versions of the same question." },
      { type: "heading", text: "Choose the trip by mood" },
      { type: "list", items: ["Hill Country wine and small-town dining", "San Antonio history and the River Walk", "Galveston architecture and Gulf sunsets", "Big Bend dark skies", "Marfa art and desert quiet", "Jefferson bed-and-breakfast weekend", "Wimberley river-and-town escape", "Gruene music and dance-hall weekend", "Brenham country roads and food stops", "Rockport coastal birding and seafood", "Fredericksburg history plus Enchanted Rock", "Austin live music without an overloaded itinerary", "Fort Worth museums and Stockyards contrast", "Piney Woods cabin weekend", "A courthouse-square road trip with no major-city stop"] },
      { type: "paragraph", text: "Use the deeper road-trip, small-town and destination guides to turn the mood into an actual route rather than booking a generic hotel and hoping the weekend plans itself." },
    ],
    internalLinks: [{ href: "/road-trips", label: "Texas road trips" }, { href: "/small-towns", label: "Texas small towns" }, { href: "/explore", label: "Explore Texas" }, { href: "/events", label: "Texas events" }, { href: "/food-bbq", label: "Texas food & BBQ" }], relatedCollections: [], relatedDestinations: [],
  }),
  article({
    id: "gateway-b9-history", brandId: "texasdefined", slug: "best-texas-history-weekend-trips", title: "15 Best Texas History Weekend Trips", dek: "Missions, forts, courthouses, battlefields, railroads, oil towns and frontier sites make Texas history easier to understand in place.", category: "texas-history", hero: images.town, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 10, tags: ["texas history trips", "texas historic sites", "texas history weekend"],
    body: [
      { type: "paragraph", text: "Texas history is easier to understand as a set of places than as a single timeline. The strongest weekend trips connect a major site to the community, landscape and institutions around it." },
      { type: "list", items: ["San Antonio missions", "Goliad and Presidio La Bahía", "Washington-on-the-Brazos and nearby Republic-era sites", "San Felipe de Austin", "Galveston immigration, port and storm history", "Jefferson riverport history", "Fort Davis and Davis Mountains military history", "Fredericksburg German-Texan history", "Gonzales and Texas Revolution sites", "Nacogdoches and East Texas settlement history", "Austin state-government and archive weekend", "Fort Worth cattle and railroad history", "Odessa-Midland petroleum history", "El Paso border and mission history", "A county-courthouse architecture loop"] },
    ],
    internalLinks: [{ href: "/texas-history", label: "Texas history" }, { href: "/historic-sites", label: "Texas historic sites" }, { href: "/road-trips", label: "Texas road trips" }, { href: "/browse/counties", label: "Browse Texas counties" }, { href: "/browse/cities", label: "Browse Texas cities" }], relatedCollections: [], relatedDestinations: [],
  }),
  article({
    id: "gateway-b9-outdoors", brandId: "texasdefined", slug: "best-texas-weekend-trips-for-outdoor-lovers", title: "15 Best Texas Weekend Trips for Outdoor Lovers", dek: "Canyons, springs, cypress lakes, desert mountains and Gulf marshes give Texas outdoor weekends very different personalities.", category: "outdoors", hero: images.bigBend, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 9, tags: ["texas outdoor weekend", "texas hiking trip", "texas nature getaway"],
    body: [
      { type: "paragraph", text: "A useful outdoor list should not pretend every traveler wants the same thing. Some weekends are built around one long hike, some around paddling, some around wildlife, and some around simply being far from a city." },
      { type: "list", items: ["Big Bend National Park", "Guadalupe Mountains", "Palo Duro Canyon", "Caprock Canyons", "Caddo Lake", "Enchanted Rock and the Hill Country", "Garner State Park and the Frio River", "Colorado Bend State Park", "Lost Maples in season", "Davis Mountains", "Padre Island National Seashore", "Rockport-Aransas birding coast", "Brazos Bend wildlife weekend", "Inks Lake and Highland Lakes", "A Piney Woods paddling weekend"] },
    ],
    internalLinks: [{ href: "/outdoors", label: "Texas outdoors" }, { href: "/state-parks", label: "Texas state parks" }, { href: "/best-places-to-go-camping-in-texas", label: "Best camping in Texas" }, { href: "/lakes-rivers", label: "Texas lakes & rivers" }, { href: "/explore", label: "Explore Texas" }], relatedCollections: [], relatedDestinations: ["big-bend-chisos-basin", "palo-duro-canyon", "caddo-lake", "enchanted-rock"],
  }),
  article({
    id: "gateway-b9-budget", brandId: "texasdefined", slug: "best-budget-friendly-texas-weekend-trips", title: "15 Best Budget-Friendly Texas Weekend Trips", dek: "A good Texas weekend does not need a resort bill. Build around parks, courthouse squares, free museums, beaches, public trails and food worth the drive.", category: "road-trips", hero: images.town, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 8, tags: ["cheap texas weekend", "budget texas trip", "affordable texas getaway"],
    body: [
      { type: "paragraph", text: "The easiest way to control a Texas weekend budget is to choose a place where the destination itself provides the entertainment. Historic districts, state parks, beaches, trails and public spaces can do most of the work." },
      { type: "list", items: ["Courthouse-square small-town weekend", "State-park camping weekend", "Galveston beach plus historic district", "San Antonio missions-focused trip", "East Texas lake cabin split with friends", "Brenham and Washington County road trip", "Waco museums and river walk", "Glen Rose nature and history weekend", "Canyon and Palo Duro basecamp", "Rockport public-waterfront weekend", "Jefferson walking-history trip", "Fredericksburg without the wine-tour splurge", "Hill Country swimming-hole day trip", "Texas Gulf Coast shoulder-season weekend", "A local festival paired with a nearby small town"] },
    ],
    internalLinks: [{ href: "/road-trips", label: "Texas road trips" }, { href: "/small-towns", label: "Texas small towns" }, { href: "/state-parks", label: "Texas state parks" }, { href: "/events", label: "Texas events" }, { href: "/browse/cities", label: "Browse Texas cities" }], relatedCollections: [], relatedDestinations: [],
  }),
  article({
    id: "gateway-b9-spring", brandId: "texasdefined", slug: "best-spring-weekend-trips-in-texas", title: "15 Best Spring Weekend Trips in Texas", dek: "Wildflowers, mild hiking weather, spring-fed rivers and festival season make spring one of the easiest times to plan a Texas road trip.", category: "road-trips", hero: images.bluebonnets, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 8, tags: ["texas spring trips", "texas spring weekend", "bluebonnet road trip"],
    body: [
      { type: "paragraph", text: "Spring is one of the few seasons when much of Texas becomes travel-friendly at the same time. The catch is timing: wildflowers, river levels, storms and festival weekends can change the ideal route quickly." },
      { type: "list", items: ["Ennis bluebonnet country", "Washington County wildflower roads", "Hill Country wildflowers and small towns", "Enchanted Rock", "San Antonio missions", "Wimberley and Blanco", "Brenham and Round Top area", "Caddo Lake", "Palo Duro Canyon", "Guadalupe Mountains", "Rockport bird migration", "Fredericksburg before summer heat", "Austin greenbelt and festival season", "Glen Rose and Dinosaur Valley", "A courthouse-square wildflower loop"] },
    ],
    internalLinks: [{ href: "/article/bluebonnet-season-field-guide", label: "Bluebonnet season field guide" }, { href: "/road-trips", label: "Texas road trips" }, { href: "/events", label: "Texas events" }, { href: "/state-parks", label: "Texas state parks" }, { href: "/small-towns", label: "Texas small towns" }], relatedCollections: [], relatedDestinations: ["enchanted-rock", "palo-duro-canyon", "caddo-lake"],
  }),
  article({
    id: "gateway-b9-fall", brandId: "texasdefined", slug: "best-fall-weekend-trips-in-texas", title: "15 Best Fall Weekend Trips in Texas", dek: "Football, festivals, cooler trails, fall color pockets and the State Fair make autumn one of Texas's most varied travel seasons.", category: "road-trips", hero: images.road, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 8, tags: ["texas fall trips", "texas autumn weekend", "texas fall road trip"],
    body: [
      { type: "paragraph", text: "Fall does not arrive uniformly across Texas. North Texas fair season, Hill Country festival weekends, East Texas color and West Texas hiking weather peak on different schedules." },
      { type: "list", items: ["State Fair of Texas weekend", "Lost Maples when color cooperates", "Palo Duro Canyon", "Big Bend shoulder season", "Fredericksburg festival weekend", "Jefferson and East Texas color", "High-school-football small-town Friday", "College-town game weekend", "Wurstfest season in New Braunfels", "Round Top area", "Davis Mountains", "Garner and the Frio after summer crowds", "San Antonio cultural weekend", "Gulf Coast shoulder season", "Hill Country dance-hall road trip"] },
    ],
    internalLinks: [{ href: "/texas-state-fair", label: "State Fair of Texas guide" }, { href: "/events", label: "Texas events" }, { href: "/road-trips", label: "Texas road trips" }, { href: "/article/friday-night-and-the-texas-town", label: "Friday Night and the Texas Town" }, { href: "/state-parks", label: "Texas state parks" }], relatedCollections: [], relatedDestinations: ["palo-duro-canyon", "big-bend-chisos-basin"],
  }),
  article({
    id: "gateway-b9-winter", brandId: "texasdefined", slug: "best-winter-weekend-trips-in-texas", title: "15 Best Winter Weekend Trips in Texas", dek: "Desert hiking, Gulf birding, holiday towns and big-city museums make winter a better Texas travel season than many visitors expect.", category: "road-trips", hero: images.bigBend, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 8, tags: ["texas winter trips", "texas winter weekend", "texas december travel"],
    body: [
      { type: "paragraph", text: "Winter is not dead season in Texas. It is often the best time for desert travel, long urban walking days, coastal birding and attractions that are uncomfortable in August." },
      { type: "list", items: ["Big Bend", "Davis Mountains", "Guadalupe Mountains", "San Antonio holiday season", "Galveston architecture weekend", "Rockport birding", "Houston museum weekend", "Fort Worth museums and Stockyards", "Austin food and live music", "Fredericksburg holiday lights", "Jefferson historic district", "South Padre winter coast", "Palo Duro on a mild-weather window", "El Paso history and Franklin Mountains", "A Texas courthouse Christmas-lights road trip"] },
    ],
    internalLinks: [{ href: "/article/big-bend-in-winter", label: "Big Bend in winter" }, { href: "/road-trips", label: "Texas road trips" }, { href: "/events", label: "Texas events" }, { href: "/browse/cities", label: "Browse Texas cities" }, { href: "/outdoors", label: "Texas outdoors" }], relatedCollections: [], relatedDestinations: ["big-bend-chisos-basin", "palo-duro-canyon"],
  }),
  article({
    id: "gateway-b9-firsttimers", brandId: "texasdefined", slug: "best-texas-trips-for-first-time-visitors", title: "10 Best Texas Trips for First-Time Visitors", dek: "Do not try to see the whole state. Pick the version of Texas you actually want to understand first.", category: "guides", hero: images.road, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 9, tags: ["first trip to texas", "best texas trip first time", "texas itinerary"],
    body: [
      { type: "paragraph", text: "The biggest first-trip mistake is treating Texas like a single compact destination. A better approach is to choose one coherent slice of the state and let that trip teach you what to do next time." },
      { type: "list", items: ["San Antonio + Hill Country for history and small towns", "Austin + Hill Country for food, music and outdoors", "Houston + Galveston for global-city food and Gulf history", "Dallas-Fort Worth for museums, State Fair season and urban Texas", "Big Bend for desert scale", "Palo Duro + Panhandle for canyon country", "East Texas + Caddo Lake for forests and paddling", "Fredericksburg + Enchanted Rock for a compact Hill Country trip", "El Paso + Guadalupe Mountains for West Texas border and mountain landscapes", "A Texas barbecue-and-courthouse road trip"] },
    ],
    internalLinks: [{ href: "/explore", label: "Explore Texas" }, { href: "/road-trips", label: "Texas road trips" }, { href: "/browse/cities", label: "Browse Texas cities" }, { href: "/small-towns", label: "Texas small towns" }, { href: "/food-bbq", label: "Texas food & BBQ" }, { href: "/state-parks", label: "Texas state parks" }], relatedCollections: [], relatedDestinations: [],
  }),
  article({
    id: "gateway-b9-kids", brandId: "texasdefined", slug: "best-texas-trips-with-kids-by-age", title: "15 Best Texas Trips With Kids — Pick by Age and Attention Span", dek: "Toddlers, elementary-age kids and teenagers need very different Texas itineraries. The best family trip starts by admitting that.", category: "guides", hero: images.caddo, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 9, tags: ["texas trips with kids", "family texas vacation", "texas kids road trip"],
    body: [
      { type: "paragraph", text: "A family trip fails when the itinerary is built for adults and children are simply expected to endure it. Texas makes it easy to build trips around short hikes, water, animals, trains, caves, beaches and hands-on history." },
      { type: "heading", text: "Better matches by trip style" },
      { type: "list", items: ["Toddlers: short nature walks and shaded parks", "Toddlers: beach mornings with a nearby indoor backup", "Young kids: dinosaur and fossil-focused weekends", "Young kids: wildlife and zoo weekends", "Young kids: cavern and swimming-hole trips", "Elementary age: state-park Junior Ranger style weekends", "Elementary age: San Antonio missions plus family attractions", "Elementary age: Galveston beach and history", "Tweens: Palo Duro and canyon adventure", "Tweens: Austin + Hill Country outdoors", "Teens: Big Bend stargazing and hiking", "Teens: Houston food and museums", "Teens: Dallas-Fort Worth sports and museums", "Mixed ages: small-town festival weekend", "Mixed ages: lake cabin with one major outing per day"] },
    ],
    internalLinks: [{ href: "/explore", label: "Explore Texas" }, { href: "/state-parks", label: "Texas state parks" }, { href: "/events", label: "Texas events" }, { href: "/road-trips", label: "Texas road trips" }, { href: "/lakes-rivers", label: "Texas lakes & rivers" }], relatedCollections: [], relatedDestinations: [],
  }),
  article({
    id: "gateway-b9-foodweekends", brandId: "texasdefined", slug: "best-texas-weekend-trips-for-food-lovers", title: "15 Best Texas Weekend Trips for Food Lovers", dek: "Barbecue, Tex-Mex, Gulf seafood, Czech bakeries, border cooking and big-city global food scenes deserve trips built around them.", category: "food-bbq", hero: images.bbq, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 9, tags: ["texas food trip", "texas food weekend", "texas culinary travel"],
    body: [
      { type: "paragraph", text: "Texas food travel gets much more interesting once you stop asking for the single best restaurant and start asking which place tells a food story you cannot get somewhere else." },
      { type: "list", items: ["Lockhart barbecue weekend", "Houston international food weekend", "San Antonio Tex-Mex and market weekend", "Austin barbecue and taco weekend", "Fort Worth barbecue and Stockyards weekend", "El Paso border-food weekend", "Rio Grande Valley food trip", "Galveston seafood and historic-district weekend", "Brenham and Washington County bakery-and-country-food route", "West Czech bakery and kolache stop", "Shiner/Gonzales regional road trip", "Fredericksburg German-Texan food weekend", "Beaumont-Port Arthur Gulf and Cajun-influenced food weekend", "Dallas neighborhood food crawl", "A small-town meat-market and barbecue loop"] },
    ],
    internalLinks: [{ href: "/food-bbq", label: "Texas food & BBQ" }, { href: "/road-trips", label: "Texas road trips" }, { href: "/small-towns", label: "Texas small towns" }, { href: "/browse/cities", label: "Browse Texas cities" }, { href: "/events", label: "Texas food festivals and events" }], relatedCollections: [], relatedDestinations: [],
  }),
];

const batch9Slugs = new Set(texasGatewayBestOfBatch9Articles.map((article) => article.slug));

export async function loadTexasGatewayBestOfBatch9Article(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !batch9Slugs.has(slug)) return null;
  return texasGatewayBestOfBatch9Articles.find((article) => article.slug === slug) ?? null;
}
