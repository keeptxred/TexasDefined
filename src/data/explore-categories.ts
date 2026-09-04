import type { Category } from "./types";

export const supplementalExploreCategories: Category[] = [
  {
    slug: "national-parks",
    name: "National Parks",
    eyebrow: "Big landscapes",
    description: "National parks, monuments and federally protected landscapes across Texas.",
    image: {
      src: "/images/explore/national-parks/big-bend-national-park.jpg",
      alt: "Big Bend National Park in Texas",
      width: 1600,
      height: 2133,
      credit: "Betty Alex (US National Park Service) · Public domain · Wikimedia Commons",
    },
  },
  {
    slug: "major-springs",
    name: "Major Springs",
    eyebrow: "Clear water",
    description: "Texas springs, spring-fed pools and the waterways they sustain.",
    image: {
      src: "/images/explore/major-springs/hamilton-pool-preserve.jpg",
      alt: "Hamilton Pool Preserve in Texas",
      width: 1600,
      height: 1200,
      credit: "Alex Garrido · CC BY 3.0 · Wikimedia Commons",
    },
  },
  {
    slug: "swimming-holes-river-tubing" as Category["slug"],
    name: "Swimming Holes & River Tubing",
    eyebrow: "Get in the water",
    description: "Texas swimming holes, spring-fed pools, river tubing and float-trip destinations, organized around verified public access and practical trip planning.",
    image: {
      src: "/images/explore/major-springs/hamilton-pool-preserve.jpg",
      alt: "Clear spring-fed water at Hamilton Pool Preserve in Texas",
      width: 1600,
      height: 1200,
      credit: "Alex Garrido · CC BY 3.0 · Wikimedia Commons",
    },
  },
  {
    slug: "caverns",
    name: "Caverns & Caves",
    eyebrow: "Below ground",
    description: "Show caves, wild caverns and limestone rooms hidden beneath the Texas landscape.",
    image: {
      src: "/images/explore/caverns/longhorn-cavern-state-park.jpg",
      alt: "Underground limestone formations inside Longhorn Cavern State Park in Texas",
      width: 1600,
      height: 1200,
      credit: "Billy Hathorn · CC BY 3.0 · Wikimedia Commons",
    },
  },
  {
    slug: "beaches-coast",
    name: "Beaches & Coast",
    eyebrow: "Salt water",
    description: "Barrier islands, bay shores, beach towns and stretches of Gulf Coast worth the drive.",
    image: {
      src: "/images/explore/beaches-coast/galveston-island-state-park.jpg",
      alt: "Galveston Island State Park on the Texas Gulf Coast",
      width: 1600,
      height: 1057,
      credit: "Yinan Chen · Public Domain · Wikimedia Commons",
    },
  },
  {
    slug: "historic-sites",
    name: "Historic Sites & Museums",
    eyebrow: "Texas stories",
    description: "Missions, battlefields, museums, monuments and places where Texas history still has an address.",
    image: {
      src: "/images/explore/historic-sites/the-alamo.jpg",
      alt: "The Alamo in San Antonio, Texas",
      width: 1600,
      height: 1088,
      credit: "Tony Kent · CC BY-SA 2.0 · Wikimedia Commons",
    },
  },
];
