export type FoodDestinationCategory = "barbecue" | "czech-bakery" | "gulf-seafood" | "steakhouse";

export type FoodDestination = {
  slug: string;
  name: string;
  city: string;
  county: string;
  region: string;
  streetAddress: string;
  postalCode: string;
  category: FoodDestinationCategory;
  knownFor: readonly [string, string];
  significance: string;
  officialUrl: string;
  schemaType: "Restaurant" | "Bakery";
  verifiedAt: string;
};

export const FOOD_DESTINATIONS: FoodDestination[] = [
  { slug: "kreuz-market-lockhart", name: "Kreuz Market", city: "Lockhart", county: "Caldwell", region: "Prairies & Lakes", streetAddress: "619 N Colorado St", postalCode: "78644", category: "barbecue", knownFor: ["Central Texas barbecue", "post-oak smoke"], significance: "A foundational Lockhart barbecue institution whose meat-market lineage helped define the Central Texas style.", officialUrl: "https://www.kreuzmarket.com/", schemaType: "Restaurant", verifiedAt: "2026-09-05" },
  { slug: "blacks-barbecue-lockhart", name: "The Original Black's Barbecue", city: "Lockhart", county: "Caldwell", region: "Prairies & Lakes", streetAddress: "215 N Main St", postalCode: "78644", category: "barbecue", knownFor: ["family-run barbecue", "Lockhart brisket"], significance: "A multigenerational Lockhart barbecue institution rooted in the Black family's 1932 meat-market and grocery business.", officialUrl: "https://www.blacksbbq.com/locations/lockhart", schemaType: "Restaurant", verifiedAt: "2026-09-05" },
  { slug: "louie-mueller-barbecue-taylor", name: "Louie Mueller Barbecue", city: "Taylor", county: "Williamson", region: "Prairies & Lakes", streetAddress: "206 W 2nd St", postalCode: "76574", category: "barbecue", knownFor: ["Central Texas barbecue", "historic smokehouse"], significance: "A Taylor smokehouse operating since 1949 and one of the most historically important names in Central Texas barbecue.", officialUrl: "https://www.louiemuellerbarbecue.com/", schemaType: "Restaurant", verifiedAt: "2026-09-05" },
  { slug: "czech-stop-west", name: "Czech Stop", city: "West", county: "McLennan", region: "Prairies & Lakes", streetAddress: "105 N College St", postalCode: "76691", category: "czech-bakery", knownFor: ["kolaches", "Czech pastries"], significance: "A prominent I-35 road-trip stop connecting Texas travel culture with the Czech baking traditions associated with West.", officialUrl: "https://www.czechstop.net/", schemaType: "Bakery", verifiedAt: "2026-09-05" },
  { slug: "gaidos-seafood-galveston", name: "Gaido's Seafood Restaurant", city: "Galveston", county: "Galveston", region: "Gulf Coast", streetAddress: "3828 Seawall Blvd", postalCode: "77550", category: "gulf-seafood", knownFor: ["Gulf seafood", "Galveston dining history"], significance: "A Galveston seafood institution founded in 1911 and a durable anchor for understanding Gulf Coast dining traditions.", officialUrl: "https://www.gaidos.com/", schemaType: "Restaurant", verifiedAt: "2026-09-05" },
  { slug: "perini-ranch-steakhouse-buffalo-gap", name: "Perini Ranch Steakhouse", city: "Buffalo Gap", county: "Taylor", region: "Panhandle Plains", streetAddress: "3002 FM 89", postalCode: "79508", category: "steakhouse", knownFor: ["cowboy cooking", "mesquite-grilled beef"], significance: "A nationally recognized destination steakhouse preserving Texas ranch hospitality and modern cowboy-cooking traditions.", officialUrl: "https://www.periniranch.com/pages/steakhouse-information", schemaType: "Restaurant", verifiedAt: "2026-09-05" },
];

export function getFoodDestination(slug: string) {
  return FOOD_DESTINATIONS.find((destination) => destination.slug === slug) ?? null;
}

export function buildFoodSearchDocuments() {
  return FOOD_DESTINATIONS.map((destination) => ({
    id: `food-destination:${destination.slug}`,
    brandId: "texasdefined" as const,
    kind: "destination" as const,
    title: destination.name,
    summary: destination.significance,
    keywords: [destination.city, destination.county, destination.region, destination.category, ...destination.knownFor],
    href: `/food/${destination.slug}`,
  }));
}
