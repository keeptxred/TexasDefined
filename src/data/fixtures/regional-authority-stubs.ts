import roadTrip from "@/assets/road-trip.jpg";
import type { Article } from "../types";

const images = { roadTrip: {src:roadTrip,alt:"A two-lane Texas farm road extending to the horizon",width:1600,height:1067}};
const stub = (record: Omit<Article, "brandId" | "body">): Article => ({brandId:"texasdefined",body:[],...record});

// Canonical lightweight discovery stubs; full authority bodies remain lazy-loaded.
export const regionalAuthorityArticleStubs: Article[] = [
  stub({ id: "evergreen-scenic-drives-in-texas", slug: "scenic-drives-in-texas", title: "Scenic Drives in Texas: Routes, Stops, Seasons and Road Conditions",
    dek: "Choose a Texas scenic drive by landscape and road type, from the Hill Country and Piney Woods to Big Bend, Gulf Coast, Panhandle and South Texas—with realistic trip-planning advice.",
    category: "road-trips", hero: images.roadTrip, authorId: "a-marisol", publishedAt: "2026-10-12", updatedAt: "2026-10-12",
    readingMinutes: 27, tags: ["scenic drives in texas", "texas scenic routes", "big bend scenic drive", "texas road trips"], featured: true,
    sourceName: "TxDOT — 2026 Texas State Travel Guide and Official Travel Map",
    sourceUrl: "https://www.txdot.gov/about/newsroom/stories/get-your-kicks-with-the-2026-texas-travel-guide.html",
    relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "evergreen-texas-wine-country", slug: "texas-wine-country", title: "Texas Wine Country: Regions, Vineyards and Planning a Wine Weekend",
    dek: "Understand Texas wine regions beyond the Fredericksburg tasting corridor, including the Hill Country and Texas High Plains, with AVA geography, vineyard sourcing and practical visitor planning.",
    category: "guides", hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_Hills_vineyard.jpg?width=1280",
      alt: "Vineyard rows at Texas Hills Vineyard near Johnson City, Texas", width: 1280, height: 960,
      credit: "Jon Lebkowsky · Wikimedia Commons · CC BY-SA 2.0" },
    authorId: "a-hollis", publishedAt: "2026-10-12", updatedAt: "2026-10-12", readingMinutes: 23,
    tags: ["texas wine country", "texas wineries", "texas wine regions", "texas high plains ava"], featured: true,
    sourceName: "U.S. Alcohol and Tobacco Tax and Trade Bureau — established American Viticultural Areas",
    sourceUrl: "https://www.ttb.gov/regulated-commodities/beverage-alcohol/wine/established-avas",
    relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "evergreen-texas-german-belt", slug: "texas-german-belt", title: "Texas German Belt: Towns, Churches, History and Heritage Routes",
    dek: "Trace German-Texan immigration from New Braunfels and Fredericksburg to Comfort, Boerne and smaller communities, with historical context, churches, food traditions and a responsible heritage-drive itinerary.",
    category: "texas-history", region: "hill-country",
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fredericksburg%20July%202017%205%20%28Marktplatz%29.jpg?width=1600",
      alt: "Fredericksburg Marktplatz and historic town center in Texas", width: 1600, height: 1067,
      credit: "Michael Barera · CC BY-SA 4.0 · Wikimedia Commons" },
    authorId: "a-marisol", publishedAt: "2026-10-12", updatedAt: "2026-10-12", readingMinutes: 26,
    tags: ["texas german belt", "german towns in texas", "new braunfels", "fredericksburg"], featured: true,
    sourceName: "Texas State Historical Association — Adelsverein",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/adelsverein",
    relatedCollections: [], relatedDestinations: [] }),
];
