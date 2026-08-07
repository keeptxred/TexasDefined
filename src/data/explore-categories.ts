import type { Category } from "./types";

export const supplementalExploreCategories: Category[] = [
  {
    slug: "national-parks",
    name: "National Parks",
    eyebrow: "Big landscapes",
    description: "National parks, monuments and federally protected landscapes across Texas.",
  },
  {
    slug: "major-springs",
    name: "Major Springs",
    eyebrow: "Clear water",
    description: "Texas springs, spring-fed pools and the waterways they sustain.",
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
  },
  {
    slug: "historic-sites",
    name: "Historic Sites & Museums",
    eyebrow: "Texas stories",
    description: "Missions, battlefields, museums, monuments and places where Texas history still has an address.",
  },
];
