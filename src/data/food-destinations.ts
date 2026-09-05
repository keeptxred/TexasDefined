export type FoodDestinationCategory = "barbecue" | "czech-bakery" | "gulf-seafood" | "steakhouse";

export type FoodDestination = {
  slug: string;
  name: string;
  city: string;
  county: string;
  region: string;
  address: string;
  categories: FoodDestinationCategory[];
  knownFor: string[];
  significance: string;
  history: string;
  officialUrl: string;
  schemaType: "Restaurant" | "Bakery";
  verifiedAt: string;
  sources: { label: string; url: string }[];
  relatedLinks: { label: string; href: string }[];
};

export const FOOD_DESTINATIONS: FoodDestination[] = [
  {
    slug: "kreuz-market-lockhart",
    name: "Kreuz Market",
    city: "Lockhart",
    county: "Caldwell",
    region: "Prairies & Lakes",
    address: "619 N Colorado St, Lockhart, TX 78644",
    categories: ["barbecue"],
    knownFor: ["Central Texas barbecue", "post-oak smoke", "sausage", "brisket"],
    significance: "One of Lockhart's foundational barbecue institutions, carrying a meat-market tradition that helped make the city synonymous with Central Texas barbecue.",
    history: "Kreuz Market's lineage reaches back to the late nineteenth century. The business spent 99 years at 208 S. Commerce Street before moving in 1999 to its current North Colorado Street location, where original hot coals were carried from the old pits to the new building.",
    officialUrl: "https://www.kreuzmarket.com/",
    schemaType: "Restaurant",
    verifiedAt: "2026-09-02",
    sources: [{ label: "Kreuz Market history", url: "https://www.kreuzmarket.com/history" }],
    relatedLinks: [
      { label: "Explore Texas Food & BBQ", href: "/explore/food-bbq" },
      { label: "Texas food history", href: "/texas-food-history" },
      { label: "Texas food trail", href: "/texas-food-trail" },
      { label: "Caldwell County", href: "/county/caldwell" },
    ],
  },
  {
    slug: "blacks-barbecue-lockhart",
    name: "The Original Black's Barbecue",
    city: "Lockhart",
    county: "Caldwell",
    region: "Prairies & Lakes",
    address: "215 N Main St, Lockhart, TX 78644",
    categories: ["barbecue"],
    knownFor: ["family-run barbecue", "brisket", "sausage", "Lockhart barbecue"],
    significance: "A five-generation Lockhart barbecue institution that identifies itself as Texas' oldest major barbecue business continuously owned by the same family.",
    history: "Edgar Black Sr. established the family business in Lockhart in 1932 as a meat market and grocery. Barbecue became central to the operation, and later generations expanded the restaurant while retaining the original Lockhart location as the family's historic anchor.",
    officialUrl: "https://www.blacksbbq.com/locations/lockhart",
    schemaType: "Restaurant",
    verifiedAt: "2026-09-02",
    sources: [
      { label: "Black's Barbecue history", url: "https://www.blacksbbq.com/our-history" },
      { label: "Black's Lockhart location", url: "https://www.blacksbbq.com/locations/lockhart" },
    ],
    relatedLinks: [
      { label: "Explore Texas Food & BBQ", href: "/explore/food-bbq" },
      { label: "Texas food history", href: "/texas-food-history" },
      { label: "Texas food trail", href: "/texas-food-trail" },
      { label: "Caldwell County", href: "/county/caldwell" },
    ],
  },
  {
    slug: "louie-mueller-barbecue-taylor",
    name: "Louie Mueller Barbecue",
    city: "Taylor",
    county: "Williamson",
    region: "Prairies & Lakes",
    address: "206 W 2nd St, Taylor, TX 76574",
    categories: ["barbecue"],
    knownFor: ["Central Texas barbecue", "beef ribs", "brisket", "historic smokehouse"],
    significance: "A multigenerational Taylor smokehouse and one of the most historically important names in Central Texas barbecue.",
    history: "Louie Mueller opened the restaurant in 1949. His son Bobby took over in 1974, and third-generation owner and pitmaster Wayne Mueller assumed leadership in 2007. The restaurant received a James Beard Foundation America's Classics award, reinforcing its national importance as a regional institution.",
    officialUrl: "https://www.louiemuellerbarbecue.com/",
    schemaType: "Restaurant",
    verifiedAt: "2026-09-02",
    sources: [{ label: "Louie Mueller Barbecue official history", url: "https://www.louiemuellerbarbecue.com/" }],
    relatedLinks: [
      { label: "Explore Texas Food & BBQ", href: "/explore/food-bbq" },
      { label: "Texas food history", href: "/texas-food-history" },
      { label: "Texas food trail", href: "/texas-food-trail" },
      { label: "Williamson County", href: "/county/williamson" },
    ],
  },
  {
    slug: "czech-stop-west",
    name: "Czech Stop",
    city: "West",
    county: "McLennan",
    region: "Prairies & Lakes",
    address: "105 N College St, West, TX 76691",
    categories: ["czech-bakery"],
    knownFor: ["kolaches", "Czech pastries", "I-35 road-trip stop", "West Czech heritage"],
    significance: "A prominent I-35 food stop that connects modern Texas road-trip culture with the Czech baking traditions strongly associated with West.",
    history: "Czech Stop was established in November 1983 and has served travelers in West for more than four decades. Its official history emphasizes Czech heritage, kolaches and pastries as the core of a roadside institution positioned directly on the Dallas-Austin corridor.",
    officialUrl: "https://www.czechstop.net/",
    schemaType: "Bakery",
    verifiedAt: "2026-09-02",
    sources: [
      { label: "Czech Stop history", url: "https://www.czechstop.net/our-history/" },
      { label: "Czech Stop location", url: "https://www.czechstop.net/location/" },
    ],
    relatedLinks: [
      { label: "Explore Texas Food & BBQ", href: "/explore/food-bbq" },
      { label: "German & Czech Texas towns", href: "/german-czech-texas-towns" },
      { label: "Texas food trail", href: "/texas-food-trail" },
      { label: "McLennan County", href: "/county/mclennan" },
    ],
  },
  {
    slug: "gaidos-seafood-galveston",
    name: "Gaido's Seafood Restaurant",
    city: "Galveston",
    county: "Galveston",
    region: "Gulf Coast",
    address: "3828 Seawall Blvd, Galveston, TX 77550",
    categories: ["gulf-seafood"],
    knownFor: ["Gulf seafood", "Galveston dining history", "oysters", "shrimp"],
    significance: "A century-plus Galveston seafood institution whose longevity makes it a durable anchor for understanding Gulf Coast dining traditions.",
    history: "San Giacinto Gaido opened the restaurant in 1911. The family describes a continuous emphasis on Gulf seafood prepared by hand, with Southern, Creole and Southwestern influences layered into a Galveston restaurant tradition spanning more than a century.",
    officialUrl: "https://www.gaidos.com/",
    schemaType: "Restaurant",
    verifiedAt: "2026-09-02",
    sources: [{ label: "Gaido's official history", url: "https://www.gaidos.com/about/" }],
    relatedLinks: [
      { label: "Explore Texas Food & BBQ", href: "/explore/food-bbq" },
      { label: "Texas food history", href: "/texas-food-history" },
      { label: "Explore the Gulf Coast", href: "/explore/beaches-coast" },
      { label: "Galveston County", href: "/county/galveston" },
    ],
  },
  {
    slug: "perini-ranch-steakhouse-buffalo-gap",
    name: "Perini Ranch Steakhouse",
    city: "Buffalo Gap",
    county: "Taylor",
    region: "Panhandle Plains",
    address: "3002 FM 89, Buffalo Gap, TX 79508",
    categories: ["steakhouse"],
    knownFor: ["cowboy cooking", "mesquite-grilled beef", "Texas steakhouse tradition", "green chile hominy"],
    significance: "A nationally recognized Texas steakhouse built around ranch hospitality, mesquite-grilled beef and the modern preservation of cowboy-cooking traditions.",
    history: "Tom Perini began catering ranch events in 1973 and opened Perini Ranch Steakhouse in a converted barn in Buffalo Gap in 1983. The restaurant received a James Beard Foundation America's Classics award in 2014 and remains closely identified with West Texas cowboy cooking.",
    officialUrl: "https://www.periniranch.com/pages/steakhouse-information",
    schemaType: "Restaurant",
    verifiedAt: "2026-09-02",
    sources: [
      { label: "Perini Ranch story", url: "https://www.periniranch.com/pages/our-story" },
      { label: "Perini Ranch Steakhouse information", url: "https://www.periniranch.com/pages/steakhouse-information" },
    ],
    relatedLinks: [
      { label: "Explore Texas Food & BBQ", href: "/explore/food-bbq" },
      { label: "Texas food history", href: "/texas-food-history" },
      { label: "Texas food trail", href: "/texas-food-trail" },
      { label: "Taylor County", href: "/county/taylor" },
    ],
  },
];

export function getFoodDestination(slug: string) {
  return FOOD_DESTINATIONS.find((destination) => destination.slug === slug) ?? null;
}

export function getFoodDestinationsByCounty(county: string) {
  return FOOD_DESTINATIONS.filter((destination) => destination.county.toLowerCase() === county.toLowerCase());
}

export function getFoodDestinationsByCategory(category: FoodDestinationCategory) {
  return FOOD_DESTINATIONS.filter((destination) => destination.categories.includes(category));
}
