import bigBend from "@/assets/big-bend.jpg";
import blueHole from "@/assets/blue-hole.jpg";
import enchantedRock from "@/assets/enchanted-rock.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";
import wildlife from "@/assets/wildlife.jpg";
import bbqBrisket from "@/assets/bbq-brisket.jpg";

import type { Article, ImageRef } from "../types";

const image = (src: string, alt: string): ImageRef => ({ src, alt, width: 1600, height: 1067 });
const stub = (record: Omit<Article, "brandId" | "authorId" | "readingMinutes" | "body" | "relatedCollections" | "relatedDestinations"> & { relatedDestinations?: string[] }): Article => ({
  brandId: "texasdefined",
  authorId: "a-hollis",
  readingMinutes: 4,
  body: [],
  relatedCollections: [],
  relatedDestinations: record.relatedDestinations ?? [],
  ...record,
});

export const exploreFeatureArticleStubs: Article[] = [
  stub({
    id: "explore-feature-major-springs",
    slug: "texas-major-springs-clear-water-guide",
    title: "Where Texas Comes Up From the Ground",
    dek: "A field guide to the springs that feed swimming holes, rivers and whole communities — and why the clearest water in Texas is also some of the most fragile.",
    category: "major-springs",
    region: "hill-country",
    hero: image(blueHole, "Clear spring-fed water beneath bald cypress trees in the Texas Hill Country"),
    publishedAt: "2026-08-07",
    tags: ["springs", "hill country", "swimming", "aquifers"],
    relatedDestinations: ["blue-hole-wimberley"],
  }),
  stub({
    id: "explore-feature-state-parks",
    slug: "texas-state-parks-first-timers-guide",
    title: "The Texas State Park You Should Start With",
    dek: "There is no single best park. There is a best first park for the kind of Texas you want to understand — canyon, coast, granite, forest or river.",
    category: "state-parks",
    region: "hill-country",
    hero: image(enchantedRock, "Pink granite dome at Enchanted Rock State Natural Area beneath a wide Texas sky"),
    publishedAt: "2026-08-07",
    tags: ["state parks", "camping", "hiking", "weekend"],
    relatedDestinations: ["enchanted-rock", "palo-duro-canyon"],
  }),
  stub({
    id: "explore-feature-national-parks",
    slug: "texas-national-parks-big-bend-guadalupe-guide",
    title: "Two National Parks, Two Completely Different Texases",
    dek: "Big Bend and Guadalupe Mountains are both desert parks, but they ask different things of a traveler. Here is how to choose between them — or plan for both.",
    category: "national-parks",
    region: "big-bend",
    hero: image(bigBend, "Chisos Mountains rising from the desert in Big Bend National Park"),
    publishedAt: "2026-08-07",
    tags: ["national parks", "big bend", "guadalupe mountains", "west texas"],
  }),
  stub({
    id: "explore-feature-caverns",
    slug: "texas-caverns-caves-first-timers-guide",
    title: "Texas Underground",
    dek: "The state’s limestone hides rooms, rivers and formations you would never guess were beneath the highway. A first-timer’s guide to seeing caves without turning them into a checklist.",
    category: "caverns",
    region: "hill-country",
    hero: image(enchantedRock, "Texas Hill Country limestone landscape above a network of caves and caverns"),
    publishedAt: "2026-08-07",
    tags: ["caverns", "caves", "hill country", "geology"],
  }),
  stub({
    id: "explore-feature-beaches-coast",
    slug: "texas-coast-beaches-guide",
    title: "How to Pick the Right Texas Beach",
    dek: "The Texas coast is not one beach repeated for 367 miles. Barrier islands, fishing towns and bays each reward a different kind of weekend.",
    category: "beaches-coast",
    region: "gulf-coast",
    hero: image(roadTrip, "Open road leading toward the Texas Gulf Coast"),
    publishedAt: "2026-08-07",
    tags: ["gulf coast", "beaches", "barrier islands", "weekend"],
  }),
  stub({
    id: "explore-feature-historic-sites",
    slug: "texas-historic-sites-roadmap",
    title: "Texas History Is Better When You Stand Where It Happened",
    dek: "Missions, battlefields, courthouses and museums make more sense as a road map than a timeline. These are the places that turn state history back into geography.",
    category: "historic-sites",
    region: "prairies-lakes",
    hero: image(smallTown, "Historic Texas courthouse square in warm evening light"),
    publishedAt: "2026-08-07",
    tags: ["history", "missions", "museums", "courthouses"],
  }),
  stub({
    id: "explore-feature-road-trips",
    slug: "texas-road-trip-how-to-plan",
    title: "The Texas Road Trip Is About What You Refuse to Skip",
    dek: "The best drives are not built from maximum mileage. They are built around one landscape, a few deliberate stops and enough empty road to let Texas change around you.",
    category: "road-trips",
    region: "hill-country",
    hero: image(roadTrip, "Two-lane Texas road stretching toward the horizon"),
    publishedAt: "2026-08-07",
    tags: ["road trips", "scenic drives", "weekend", "texas travel"],
  }),
  stub({
    id: "explore-feature-small-towns",
    slug: "texas-small-towns-how-to-visit",
    title: "How to Read a Texas Small Town",
    dek: "Start at the courthouse, find the old commercial street, ask what still opens before eight and stay long enough to see the town as more than a photo stop.",
    category: "small-towns",
    region: "prairies-lakes",
    hero: image(smallTown, "Historic courthouse square in a Texas small town at golden hour"),
    publishedAt: "2026-08-07",
    tags: ["small towns", "courthouse squares", "weekend", "main street"],
  }),
  stub({
    id: "explore-feature-food-bbq",
    slug: "texas-food-beyond-brisket-guide",
    title: "Texas Is Bigger Than Brisket",
    dek: "Barbecue deserves the attention, but a real Texas food trip also means tortillas, kolaches, Gulf seafood, border cooking and the dishes that belong to specific towns.",
    category: "food-bbq",
    region: "hill-country",
    hero: image(bbqBrisket, "Sliced smoked brisket on butcher paper at a Texas barbecue joint"),
    publishedAt: "2026-08-07",
    tags: ["food", "barbecue", "tex-mex", "texas travel"],
  }),
  stub({
    id: "explore-feature-outdoors",
    slug: "texas-outdoors-seasons-guide",
    title: "The Secret to Texas Outdoors Is Picking the Right Month",
    dek: "Heat, migration, wildflowers, river flow and hunting seasons can completely change the same landscape. A calendar is often more useful than a bucket list.",
    category: "outdoors",
    region: "hill-country",
    hero: image(wildlife, "White-tailed deer at the edge of Texas brush country near dusk"),
    publishedAt: "2026-08-07",
    tags: ["outdoors", "wildlife", "seasons", "hiking"],
  }),
];

const exploreFeatureSlugs = new Set(exploreFeatureArticleStubs.map((article) => article.slug));

function estimateReadingMinutes(article: Article): number {
  const text = article.body.map((block) => {
    if ("text" in block && typeof block.text === "string") return block.text;
    if ("items" in block && Array.isArray(block.items)) return block.items.join(" ");
    return "";
  }).join(" ");
  const words = text.match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g)?.length ?? 0;
  return Math.max(3, Math.ceil(words / 200));
}

export async function loadExploreFeatureArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !exploreFeatureSlugs.has(slug)) return null;
  const { exploreFeatureArticles } = await import("./explore-feature-articles");
  const article = exploreFeatureArticles.find((candidate) => candidate.slug === slug);
  return article ? { ...article, readingMinutes: estimateReadingMinutes(article) } : null;
}
