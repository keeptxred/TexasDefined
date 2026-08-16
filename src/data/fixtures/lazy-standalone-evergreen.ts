import rodeoHero from "@/assets/rodeo-101-hero-photo.jpg";
import footballHero from "@/assets/high-school-football-hero.jpg";
import kolacheHero from "@/assets/kolache-klobasnek-hero-photo.jpg";
import orderingBbqHero from "@/assets/ordering-bbq-hero-photo.jpg";
import sixFlagsHero from "@/assets/six-flags-hero-photo.jpg";
import type { Article } from "../types";

const rodeo101Stub: Article = {
  id: "evergreen-rodeo-101", brandId: "texasdefined", slug: "rodeo-101-guide-events-rules-traditions",
  title: "Rodeo 101: A Texan’s Guide to the Events, Rules and Traditions",
  dek: "From bronc riding and bull riding to barrels and roping, here is what you are actually watching when the chute opens.",
  category: "sports", hero: { src: rodeoHero, alt: "A cowboy riding a bucking bronc in a dusty Texas rodeo arena at dusk", width: 1600, height: 900 },
  authorId: "a-marisol", publishedAt: "2026-08-07", readingMinutes: 11,
  tags: ["texas rodeo", "bull riding", "barrel racing", "bronc riding", "texas culture", "rodeo guide"], featured: true,
  body: [], relatedCollections: [], relatedDestinations: [],
};

const highSchoolFootballNewcomersStub: Article = {
  id: "evergreen-high-school-football-newcomers", brandId: "texasdefined", slug: "texas-high-school-football-newcomers",
  title: "Texas High School Football for Newcomers: Why Friday Night Matters",
  dek: "The bands, stadium lights and rivalries are only the surface. Texas high school football is part sport, part civic ritual and part small-town calendar.",
  category: "sports", hero: { src: footballHero, alt: "Illustrated Texas high school football players walking toward a lit stadium at sunset", width: 1600, height: 900 },
  authorId: "a-marisol", publishedAt: "2026-08-07", readingMinutes: 10,
  tags: ["texas high school football", "friday night lights", "texas sports", "uil football", "texas culture"], featured: true,
  body: [], relatedCollections: [], relatedDestinations: [],
};

const kolacheOrKlobasnekStub: Article = {
  id: "evergreen-kolache-klobasnek", brandId: "texasdefined", slug: "kolache-or-klobasnek-texas-story",
  title: "Kolache or Klobasnek? The Texas Story Behind Both",
  dek: "Fruit-filled kolaches and sausage-filled klobasneks share Czech roots, but they are not the same pastry. Texas made room for both—and blurred the names along the way.",
  category: "food-bbq", hero: { src: kolacheHero, alt: "Fruit and cheese kolaches beside sausage-filled klobasniky on a Texas bakery tray", width: 1600, height: 900 },
  authorId: "a-marisol", publishedAt: "2026-08-07", readingMinutes: 9,
  tags: ["kolache", "klobasnek", "czech texas", "texas food", "west texas", "czech heritage"], featured: true,
  body: [], relatedCollections: [], relatedDestinations: [],
};

const orderingTexasBarbecueStub: Article = {
  id: "evergreen-ordering-texas-barbecue", brandId: "texasdefined", slug: "beginners-guide-ordering-texas-barbecue",
  title: "A Beginner’s Guide to Ordering Texas Barbecue",
  dek: "New to a Texas barbecue counter? Here is how to order brisket, ribs, sausage, sides and sauce without turning lunch into a vocabulary test.",
  category: "food-bbq", hero: { src: orderingBbqHero, alt: "A Texas barbecue tray with sliced brisket, sausage, pork ribs, pickles, onions and white bread", width: 1600, height: 900 },
  authorId: "a-marisol", publishedAt: "2026-08-07", readingMinutes: 9,
  tags: ["texas barbecue", "brisket", "bbq etiquette", "texas food", "barbecue guide"], featured: true,
  body: [], relatedCollections: [], relatedDestinations: [],
};

const sixFlagsOverTexasMeaningStub: Article = {
  id: "evergreen-six-flags-over-texas-meaning", brandId: "texasdefined", slug: "six-flags-over-texas-meaning",
  title: "What the Six Flags Over Texas Actually Mean",
  dek: "The six flags are more than a theme-park name. They trace the governments that claimed Texas across centuries—and explain why the phrase still carries so much weight here.",
  category: "texas-history", hero: { src: sixFlagsHero, alt: "The Texas State Capitol in Austin with flags flying on poles out front", width: 1600, height: 900 },
  authorId: "a-marisol", publishedAt: "2026-08-07", readingMinutes: 10,
  tags: ["six flags over texas", "texas history", "texas flags", "republic of texas", "texas identity"], featured: true,
  body: [], relatedCollections: [], relatedDestinations: [],
};

export const standaloneEvergreenStubs: Article[] = [
  rodeo101Stub,
  highSchoolFootballNewcomersStub,
  kolacheOrKlobasnekStub,
  orderingTexasBarbecueStub,
  sixFlagsOverTexasMeaningStub,
];

export async function loadStandaloneEvergreenArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined") return null;
  if (slug === rodeo101Stub.slug) return import("./rodeo-101").then((module) => module.rodeo101Article);
  if (slug === highSchoolFootballNewcomersStub.slug) return import("./high-school-football-newcomers").then((module) => module.highSchoolFootballNewcomersArticle);
  if (slug === kolacheOrKlobasnekStub.slug) return import("./kolache-or-klobasnek").then((module) => module.kolacheOrKlobasnekArticle);
  if (slug === orderingTexasBarbecueStub.slug) return import("./ordering-texas-barbecue").then((module) => module.orderingTexasBarbecueArticle);
  if (slug === sixFlagsOverTexasMeaningStub.slug) return import("./six-flags-over-texas-meaning").then((module) => module.sixFlagsOverTexasMeaningArticle);
  return null;
}
