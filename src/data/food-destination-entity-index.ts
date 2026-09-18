import { FOOD_DESTINATIONS, type FoodDestination } from "./food-destinations";

export type EntityFoodDestinationLink = Pick<
  FoodDestination,
  "slug" | "name" | "city" | "county" | "region" | "category" | "knownFor" | "significance" | "schemaType"
>;

function normalizePlaceSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+county$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toLink(destination: FoodDestination): EntityFoodDestinationLink {
  const { slug, name, city, county, region, category, knownFor, significance, schemaType } = destination;
  return { slug, name, city, county, region, category, knownFor, significance, schemaType };
}

export function loadEntityFoodDestinations(kind: string, slug: string): EntityFoodDestinationLink[] {
  if (kind !== "city" && kind !== "county") return [];
  const normalized = normalizePlaceSlug(slug);

  return FOOD_DESTINATIONS
    .filter((destination) => kind === "county"
      ? normalizePlaceSlug(destination.county) === normalized
      : normalizePlaceSlug(destination.city) === normalized)
    .map(toLink)
    .sort((left, right) => left.name.localeCompare(right.name))
    .slice(0, 12);
}
