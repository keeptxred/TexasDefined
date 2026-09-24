import bigBend from "@/assets/big-bend.jpg";
import caddoLake from "@/assets/caddo-lake.jpg";
import enchantedRock from "@/assets/enchanted-rock.jpg";
import heroHillCountry from "@/assets/hero-hill-country.jpg";
import paloDuro from "@/assets/palo-duro.jpg";
import smallTown from "@/assets/small-town.jpg";
import wildlife from "@/assets/wildlife.jpg";

import type { Article, ImageRef } from "../types";

const image = (src: string, alt: string, width = 1600, height = 1067): ImageRef => ({ src, alt, width, height });
const stub = (record: Omit<Article, "brandId" | "body">): Article => ({ brandId: "texasdefined", body: [], ...record });

export const roadTripCameraAuthorityStubs: Article[] = [
  stub({
    id: "authority-dash-cams-in-texas",
    slug: "dash-cams-in-texas",
    title: "Dash Cams in Texas: What the Law Says and How to Set One Up",
    dek: "Texas does not have a special dash-cam statute, but windshield obstruction, audio-recording rules, heat, mounting and storage all matter. This guide separates the legal rules from the practical choices.",
    category: "guides",
    hero: image("/images/editorial/moving/dallas-fort-worth.jpg", "Dallas skyline and freeway approaches, a Texas driving environment", 1600, 900),
    authorId: "a-dell", publishedAt: "2026-09-24", updatedAt: "2026-09-24", readingMinutes: 10,
    tags: ["dash cams Texas", "dash cam laws Texas", "Texas dash cam placement", "driving in Texas", "road trip technology"],
    relatedCollections: [], relatedDestinations: [],
  }),
  stub({
    id: "authority-texas-road-trip-vehicle-checklist",
    slug: "texas-road-trip-vehicle-checklist",
    title: "The Texas Road-Trip Vehicle Checklist to Run Before You Leave",
    dek: "Tires, battery, fluids, lights, weather, fuel, offline maps and the small details that matter more when a Texas drive stretches hundreds of miles.",
    category: "road-trips",
    hero: image(bigBend, "The Chisos Mountains rising above a long drive through Big Bend country"),
    authorId: "a-dell", publishedAt: "2026-09-24", updatedAt: "2026-09-24", readingMinutes: 10,
    tags: ["Texas road trip checklist", "road trip vehicle preparation", "Texas driving", "road trip safety", "vehicle readiness"],
    relatedCollections: [], relatedDestinations: ["big-bend-national-park"],
  }),
  stub({
    id: "authority-dash-cam-road-trips",
    slug: "dash-cam-setup-texas-road-trips",
    title: "How to Set Up a Dash Cam for a Texas Road Trip",
    dek: "A practical setup guide for long Texas drives: camera coverage, storage, parking mode, heat, power, night driving and route-specific tradeoffs.",
    category: "road-trips",
    hero: image(smallTown, "A Texas courthouse square reached by a long road trip"),
    authorId: "a-dell", publishedAt: "2026-09-24", updatedAt: "2026-09-24", readingMinutes: 9,
    tags: ["dash cam road trip", "Texas road trip camera", "dash cam setup", "Texas driving", "road trip technology"],
    relatedCollections: [], relatedDestinations: ["big-bend-national-park", "palo-duro-canyon-state-park"],
  }),
  stub({
    id: "authority-trail-cameras-texas",
    slug: "trail-cameras-in-texas",
    title: "Trail Cameras in Texas: Where They Make Sense—and Where to Ask First",
    dek: "A Texas-first trail-camera guide for private land, ranches and wildlife observation, with clear boundaries around public land, placement, privacy and hunting rules.",
    category: "outdoors",
    hero: image(wildlife, "Texas wildlife habitat at the edge of brush country"),
    authorId: "a-hollis", publishedAt: "2026-09-24", updatedAt: "2026-09-24", readingMinutes: 10,
    tags: ["trail cameras Texas", "wildlife camera Texas", "ranch camera", "Texas wildlife", "outdoor cameras"],
    relatedCollections: [], relatedDestinations: [],
  }),
  stub({
    id: "authority-texas-wildlife-camera-guide",
    slug: "texas-wildlife-camera-guide",
    title: "A Texas Wildlife Camera Guide for Watching What Moves After Dark",
    dek: "How to use trail and outdoor cameras to observe deer, hogs, coyotes, bobcats, raccoons, turkeys and other Texas wildlife without turning observation into disturbance.",
    category: "outdoors",
    hero: image(caddoLake, "Wooded Texas wildlife habitat beside Caddo Lake"),
    authorId: "a-hollis", publishedAt: "2026-09-24", updatedAt: "2026-09-24", readingMinutes: 10,
    tags: ["Texas wildlife camera", "trail camera wildlife", "Texas wildlife observation", "deer camera Texas", "outdoor camera"],
    relatedCollections: [], relatedDestinations: ["caddo-lake"],
  }),
  stub({
    id: "authority-texas-heat-vehicle-electronics",
    slug: "texas-heat-vehicle-electronics",
    title: "Texas Heat and the Electronics You Leave in the Car",
    dek: "Dash cams, power banks, memory cards, mounts and vehicle batteries all face a harsher environment inside a parked Texas car. Here is what to check without inventing one temperature limit for every device.",
    category: "guides",
    hero: image(paloDuro, "Sunlit red walls of Palo Duro Canyon during hot Texas weather"),
    authorId: "a-dell", publishedAt: "2026-09-24", updatedAt: "2026-09-24", readingMinutes: 9,
    tags: ["Texas heat electronics", "dash cam heat", "car electronics heat", "Texas summer driving", "vehicle battery heat"],
    relatedCollections: [], relatedDestinations: ["palo-duro-canyon-state-park"],
  }),
  stub({
    id: "authority-cameras-texas-camping-outdoors",
    slug: "cameras-texas-camping-outdoors",
    title: "Cameras for Texas Camping and Outdoor Trips",
    dek: "Dash cams, action cameras and wildlife cameras can all earn a place on a Texas trip—but public-land rules, heat, batteries, storage and privacy decide where each one belongs.",
    category: "outdoors",
    hero: image(enchantedRock, "Granite and open sky at Enchanted Rock in the Texas Hill Country"),
    authorId: "a-hollis", publishedAt: "2026-09-24", updatedAt: "2026-09-24", readingMinutes: 9,
    tags: ["Texas camping cameras", "outdoor cameras Texas", "action camera camping", "trail camera camping", "Texas outdoors"],
    relatedCollections: [], relatedDestinations: ["enchanted-rock-state-natural-area"],
  }),
  stub({
    id: "authority-rural-texas-property-monitoring",
    slug: "rural-texas-property-monitoring",
    title: "Rural Texas Property Monitoring: Cameras for Gates, Acreage and Wildlife",
    dek: "A practical way to think about cameras on rural Texas property: start with the gate, power, signal, weather and purpose before buying a pile of devices.",
    category: "home-garden",
    hero: image(heroHillCountry, "Rural Texas Hill Country landscape with open acreage"),
    authorId: "a-dell", publishedAt: "2026-09-24", updatedAt: "2026-09-24", readingMinutes: 10,
    tags: ["rural property camera Texas", "ranch monitoring", "acreage camera", "trail camera ranch", "Texas rural living"],
    relatedCollections: [], relatedDestinations: [],
  }),
  stub({
    id: "authority-rideshare-dash-cams-texas",
    slug: "rideshare-dash-cams-texas",
    title: "Rideshare Dash Cams in Texas: Cabin Recording, Audio and Rider Notice",
    dek: "Uber and Lyft both support driver recording tools, but a Texas rideshare setup still needs deliberate choices about cabin video, audio, notice, storage and trips that cross state lines.",
    category: "guides",
    hero: image("/images/editorial/moving/houston.jpg", "Houston skyline and freeway traffic, a common Texas rideshare environment", 1600, 900),
    authorId: "a-dell", publishedAt: "2026-09-24", updatedAt: "2026-09-24", readingMinutes: 10,
    tags: ["rideshare dash cam Texas", "Uber dash cam Texas", "Lyft dash cam Texas", "cabin camera Texas", "audio recording Texas"],
    relatedCollections: [], relatedDestinations: [],
  }),
];

const slugs = new Set(roadTripCameraAuthorityStubs.map((article) => article.slug));

export async function loadRoadTripCameraAuthorityArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !slugs.has(slug)) return null;
  const { roadTripCameraAuthorityArticles } = await import("./road-trip-camera-authority");
  return roadTripCameraAuthorityArticles.find((article) => article.slug === slug) ?? null;
}
