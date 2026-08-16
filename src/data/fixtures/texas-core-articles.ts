import bbqBrisket from "@/assets/bbq-brisket.jpg";
import bigBend from "@/assets/big-bend.jpg";
import bluebonnets from "@/assets/bluebonnets.jpg";
import caddoLake from "@/assets/caddo-lake.jpg";
import paloDuro from "@/assets/palo-duro.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";

import type { Article, ImageRef } from "../types";

const BRAND = "texasdefined" as const;
const img = (src: string, alt: string): ImageRef => ({ src, alt, width: 1600, height: 1067 });
const images = {
  bbqBrisket: img(bbqBrisket, "Sliced smoked brisket with a dark peppery bark on butcher paper"),
  bluebonnets: img(bluebonnets, "A field of bluebonnets running to a fence line in spring"),
  roadTrip: img(roadTrip, "A two-lane Texas farm road running straight to the horizon"),
  caddoLake: img(caddoLake, "Bald cypress trees draped in Spanish moss on Caddo Lake at dawn"),
  smallTown: img(smallTown, "A historic Texas courthouse square in a small town at golden hour"),
  paloDuro: img(paloDuro, "Layered red rock walls of Palo Duro Canyon in late afternoon light"),
  bigBend: img(bigBend, "The Chisos Mountains rising over the Chihuahuan Desert in Big Bend"),
};

export const texasCoreArticles: Article[] = [
  {
    id: "ar-1", brandId: BRAND, slug: "what-defines-texas-barbecue", title: "The Line Is the Point",
    dek: "Why Texans will stand three hours in July for a plate of meat and butcher paper — and what the wait is actually for.",
    category: "food-bbq", region: "hill-country", hero: images.bbqBrisket, authorId: "a-marisol", publishedAt: "2026-06-18", readingMinutes: 8,
    tags: ["barbecue", "lockhart", "brisket", "central texas"], featured: true, relatedCollections: ["smoke-and-salt"], relatedDestinations: ["gruene-historic-district"],
    body: [
      { type: "paragraph", text: "The first thing you notice in Lockhart is not smoke. It is the parking. By ten in the morning the lots are full and the line is already out the door, made up of people who drove ninety minutes to eat lunch at eleven." },
      { type: "paragraph", text: "Central Texas barbecue is a German and Czech butcher tradition that got adopted by everybody. Meat markets smoked what they could not sell fresh, served it on butcher paper with white bread and pickles, and never developed the habit of sauce. The technique is nearly absent: post oak, salt, coarse black pepper, and twelve to fourteen hours of somebody paying attention." },
      { type: "heading", text: "What the pitmaster is actually doing" },
      { type: "paragraph", text: "A brisket is two muscles with wildly different fat content, cooked as one piece. The flat wants to dry out; the point wants more time. Getting both right means managing a fire by feel for half a day, wrapping at the stall, and then — the part nobody photographs — resting the meat for hours before slicing." },
      { type: "quote", text: "You can teach the fire. You cannot teach somebody to stay awake for it.", attribution: "A third-generation Lockhart pitmaster" },
      { type: "shop", collectionSlug: "smoke-and-salt" },
      { type: "heading", text: "How to eat it" },
      { type: "list", items: ["Order by the pound, fatty end, and ask for it sliced in front of you.", "Skip the sauce at least once before you decide.", "Sausage is the honest test of a pit — order a link.", "Go on a weekday. The best meat is gone by two."] },
      { type: "paragraph", text: "The line, in the end, is a room full of strangers who agreed the same thing was worth rearranging a day for. That is rare enough in Texas or anywhere else. It is also, if you press people on it, most of the answer to what defines this state: not the meat, the willingness to wait for it." },
    ],
  },
  {
    id: "ar-2", brandId: BRAND, slug: "bluebonnet-season-field-guide", title: "Chasing Bluebonnet Season",
    dek: "Six weeks, one flower, and a state that reorganizes its weekends around it. Where to go, when, and how not to ruin the field.",
    category: "outdoors", region: "hill-country", hero: images.bluebonnets, authorId: "a-hollis", publishedAt: "2026-03-04", readingMinutes: 6,
    tags: ["wildflowers", "spring", "hill country", "highway 71"], featured: true, relatedCollections: ["wildflower-house"], relatedDestinations: ["enchanted-rock"],
    body: [
      { type: "paragraph", text: "Bluebonnet season is not a date. It is a moving front that starts in South Texas in late February and works north through the Hill Country until the first hot week ends it, usually in mid-April." },
      { type: "paragraph", text: "The reliable corridors are unglamorous stretches of state highway: 71 between Llano and Austin, 16 south of Fredericksburg, and the loop of farm roads around Ennis that the town has been mapping since 1951." },
      { type: "heading", text: "The etiquette nobody posts about" },
      { type: "list", items: ["Pull fully off the pavement — half a car in the lane is how people get hurt.", "Sit at the edge of a patch, not the middle. Crushed plants do not reseed.", "Fences mean private land. The flowers on the far side are not yours.", "It is legal to photograph them and always has been; picking on the right-of-way is what the old rumor was about."] },
      { type: "quote", text: "A good bluebonnet year is decided in October, by rain nobody was paying attention to." },
      { type: "shop", collectionSlug: "wildflower-house" },
      { type: "paragraph", text: "Plant your own in fall, not spring — seed needs the cool wet months to establish. Sow shallow, water once, then leave it alone. Caliche does not need your help." },
    ],
  },
  {
    id: "ar-3", brandId: BRAND, slug: "hill-country-two-lane-loop", title: "The Two-Lane Loop",
    dek: "A 240-mile Hill Country drive built entirely from roads with no stripe down the middle — dance halls, low-water crossings and one perfect pie.",
    category: "road-trips", region: "hill-country", hero: images.roadTrip, authorId: "a-dell", publishedAt: "2026-05-02", readingMinutes: 9,
    tags: ["road trip", "hill country", "weekend", "driving"], featured: true, relatedCollections: ["campfire-kitchen"], relatedDestinations: ["enchanted-rock", "blue-hole-wimberley"],
    body: [
      { type: "paragraph", text: "Start in Fredericksburg with coffee and leave before the square wakes up. Take Ranch Road 965 north toward Enchanted Rock while the granite is still cold enough to touch." },
      { type: "heading", text: "Leg one: 965 to Llano" },
      { type: "paragraph", text: "The dome appears the way it always does — too suddenly, too pink. If you did not reserve a day pass, keep driving; the roadside view is honest enough and Llano has barbecue at eleven." },
      { type: "heading", text: "Leg two: the river roads" },
      { type: "paragraph", text: "From Llano, drop south on 16 and pick up the Willow City Loop if it is April. Thirteen miles of ranch road through a private valley, open to drivers, closed to anyone who thinks a gate is a suggestion." },
      { type: "list", items: ["Low-water crossings flood fast — turn around, every time.", "Fuel in Llano and Fredericksburg. Not between.", "Sunday afternoon shows at Gruene Hall start at 1 p.m."] },
      { type: "shop", collectionSlug: "campfire-kitchen" },
      { type: "paragraph", text: "End at Wimberley, feet in Cypress Creek, tank half empty, having covered 240 miles without touching an interstate. That is the whole assignment." },
    ],
  },
  {
    id: "ar-4", brandId: BRAND, slug: "caddo-lake-cypress-morning", title: "Morning on Caddo",
    dek: "Paddling the boat roads of the only large natural lake in Texas, where the map is a maze and the fog does not lift on schedule.",
    category: "lakes-rivers", region: "piney-woods", hero: images.caddoLake, authorId: "a-hollis", publishedAt: "2026-04-11", readingMinutes: 7,
    tags: ["caddo", "paddling", "east texas", "cypress"], relatedCollections: ["campfire-kitchen"], relatedDestinations: ["caddo-lake"],
    body: [
      { type: "paragraph", text: "There is a town on Caddo Lake called Uncertain, and the name is the most accurate piece of cartography in East Texas." },
      { type: "paragraph", text: "The lake is not a lake in the way Texans usually mean it. It is a flooded bottomland forest, 25,000 acres of bald cypress standing in tannin-black water, threaded with numbered channels that locals call boat roads." },
      { type: "quote", text: "You do not get lost out here all at once. You get lost one correct-looking turn at a time." },
      { type: "paragraph", text: "Go at first light with a rented kayak and a guide the first time. In April the prothonotary warblers arrive, small and absurdly yellow, and the whole swamp sounds like it is being tuned." },
    ],
  },
  {
    id: "ar-5", brandId: BRAND, slug: "moving-to-texas-what-nobody-tells-you", title: "What Nobody Tells You About Moving to Texas",
    dek: "Property tax math, water districts, the summer that never ends, and the case for renting a year before you buy.",
    category: "moving-to-texas", hero: images.smallTown, authorId: "a-dell", publishedAt: "2026-02-20", readingMinutes: 10,
    tags: ["moving", "cost of living", "property tax", "relocation"], featured: true, relatedCollections: [], relatedDestinations: ["gruene-historic-district"],
    body: [
      { type: "paragraph", text: "The pitch is no state income tax. The fine print is that the money comes from somewhere, and in Texas that somewhere is the house." },
      { type: "heading", text: "Property taxes are the real number" },
      { type: "paragraph", text: "Effective rates commonly land near two percent of assessed value, and the assessment is revisited annually. On a $450,000 house that is a payment line most newcomers underestimate by more than their utilities." },
      { type: "heading", text: "Ask about the district before the kitchen" },
      { type: "list", items: ["MUD districts add a separate levy for water and sewer infrastructure in newer suburbs.", "Homestead exemptions matter and must be filed — nobody does it for you.", "Well and septic are normal outside city limits; get both inspected.", "Summer electricity bills in August can triple a spring bill."] },
      { type: "quote", text: "Rent through one August. If you still like it in September, buy." },
      { type: "paragraph", text: "None of this is a warning. It is a budget. People who arrive with the real numbers tend to stay, and staying is how Texas gets you." },
    ],
  },
  {
    id: "ar-6", brandId: BRAND, slug: "palo-duro-lighthouse-walk", title: "Down Into the Panhandle",
    dek: "Palo Duro Canyon does not announce itself. It just opens, 800 feet deep, in the middle of a wheat field.",
    category: "state-parks", region: "panhandle", hero: images.paloDuro, authorId: "a-dell", publishedAt: "2026-05-19", readingMinutes: 6,
    tags: ["palo duro", "hiking", "panhandle", "state parks"], relatedCollections: ["campfire-kitchen"], relatedDestinations: ["palo-duro-canyon"],
    body: [
      { type: "paragraph", text: "Everything about the drive to Canyon, Texas prepares you for nothing. Then the road tips over the rim." },
      { type: "paragraph", text: "The Lighthouse Trail runs six miles round trip through mesquite and juniper, level enough to lull you, and finishes with a short brutal scramble to a 300-foot sandstone column that has been the Panhandle's landmark since before there were roads to it." },
      { type: "paragraph", text: "Carry more water than you think. The canyon floor runs hotter than the rim and there is no shade to negotiate with." },
    ],
  },
  {
    id: "ar-7", brandId: BRAND, slug: "texas-dance-hall-survival", title: "The Last Dance Halls",
    dek: "Nine hundred were built. Fewer than four hundred are standing. What keeps a wooden room with no air conditioning alive in 2026.",
    category: "texas-history", region: "hill-country", hero: images.smallTown, authorId: "a-hollis", publishedAt: "2026-01-28", readingMinutes: 8,
    tags: ["history", "music", "dance halls", "preservation"], relatedCollections: [], relatedDestinations: ["gruene-historic-district"],
    body: [
      { type: "paragraph", text: "German and Czech immigrants built them as social halls — shooting clubs, singing societies, insurance lodges — and dancing was simply what the building was for on Saturday." },
      { type: "paragraph", text: "The architecture is a climate strategy: high ceilings, side flaps instead of glass, a plank floor sprung just enough to be kind to knees. Air conditioning was never added at the good ones because it would require sealing the room, and sealing the room would end it." },
      { type: "quote", text: "The building is the instrument. You can hear the floor in the recording." },
      { type: "paragraph", text: "The halls that survive are the ones with a family or a nonprofit willing to fix a roof nobody profits from. Gruene, Luckenbach, Twin Sisters, Anhalt. Go on a Sunday afternoon and put money in the tip jar." },
    ],
  },
  {
    id: "ar-8", brandId: BRAND, slug: "texas-native-garden-that-survives-august", title: "A Garden That Survives August",
    dek: "Ten native plants that ask for nothing, plus the watering habit that kills more Texas landscapes than drought does.",
    category: "home-garden", hero: images.bluebonnets, authorId: "a-marisol", publishedAt: "2026-04-25", readingMinutes: 7,
    tags: ["gardening", "native plants", "xeriscape", "home"], relatedCollections: ["wildflower-house"], relatedDestinations: [],
    body: [
      { type: "paragraph", text: "The most common mistake in a Texas yard is kindness: shallow water every evening, which trains roots to stay near the surface where the first hot week can find them." },
      { type: "list", items: ["Water deeply and rarely — an inch, once a week, early morning.", "Plant in October, not April. Fall establishment beats spring optimism.", "Mulch three inches, and keep it off the trunk."] },
      { type: "heading", text: "The ten that hold" },
      { type: "paragraph", text: "Gulf muhly, blackfoot daisy, autumn sage, Texas sage, flame acanthus, mealy blue sage, damianita, rock rose, inland sea oats for shade, and a live oak if you have the patience of somebody planting for grandchildren." },
      { type: "shop", collectionSlug: "wildflower-house" },
    ],
  },
  {
    id: "ar-9", brandId: BRAND, slug: "friday-night-and-the-texas-town", title: "Friday Night and the Texas Town",
    dek: "Why the stadium is the largest civic building in towns of four thousand people, and what happens there that has nothing to do with football.",
    category: "sports", hero: images.smallTown, authorId: "a-dell", publishedAt: "2026-06-02", readingMinutes: 6,
    tags: ["football", "small towns", "friday night", "community"], relatedCollections: [], relatedDestinations: [],
    body: [
      { type: "paragraph", text: "Drive any farm road in September at seven-thirty and you can find the town by the light on the horizon." },
      { type: "paragraph", text: "The criticism is familiar and mostly fair: too much money, too much weight on teenagers. What the criticism misses is that in a town without a theater, a mall or a downtown after six, this is the only recurring event where everybody shows up on purpose." },
      { type: "quote", text: "It is the only night of the week the whole county is in the same place." },
    ],
  },
  {
    id: "ar-10", brandId: BRAND, slug: "big-bend-in-winter", title: "Big Bend Is a Winter Park",
    dek: "The five-hour drive, the eighty-mile gas gap, and why the hardest national park in Texas to reach is best in January.",
    category: "outdoors", region: "big-bend", hero: images.bigBend, authorId: "a-hollis", publishedAt: "2026-01-09", readingMinutes: 8,
    tags: ["big bend", "national parks", "desert", "dark skies"], relatedCollections: ["campfire-kitchen"], relatedDestinations: ["big-bend-chisos-basin"],
    body: [
      { type: "paragraph", text: "Big Bend gets a fraction of the visitors of the famous parks for one honest reason: it is genuinely hard to get to, and the summer is a legitimate hazard." },
      { type: "paragraph", text: "January solves both. Daytime highs sit in the sixties, the Chisos trails are empty, and the sky — certified as one of the darkest in North America — comes out at six." },
      { type: "list", items: ["Fill the tank in Marathon or Study Butte. Nowhere else.", "Book Chisos Basin lodging months ahead; there is not much of it.", "Santa Elena Canyon at midday, the Window Trail at sunset."] },
    ],
  },
];
