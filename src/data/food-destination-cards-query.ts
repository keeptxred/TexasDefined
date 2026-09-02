import { queryOptions } from "@tanstack/react-query";

export type FoodDestinationCard = {
  slug: string;
  name: string;
  city: string;
  region: string;
  significance: string;
  knownFor: string[];
};

// Keep source-rich food profiles behind a manual dynamic-import boundary so discovery cards do not inflate the main client bundle.
export const foodDestinationCardsQuery = () => queryOptions({
  queryKey: ["food-destination-cards"],
  staleTime: Infinity,
  queryFn: async (): Promise<FoodDestinationCard[]> => {
    const { FOOD_DESTINATIONS } = await import("./food-destinations");
    return FOOD_DESTINATIONS.map((destination) => ({
      slug: destination.slug,
      name: destination.name,
      city: destination.city,
      region: destination.region,
      significance: destination.significance,
      knownFor: destination.knownFor.slice(0, 2),
    }));
  },
});
