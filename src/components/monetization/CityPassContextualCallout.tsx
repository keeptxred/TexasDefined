import { CityPassCalloutContent } from "./CityPassCalloutContent";
import {
  cityPassMarketForCitySlug,
  cityPassMarketForDestinationSlug,
  cityPassMarketForSportsVenueSlug,
} from "@/data/citypass";

export type CityPassSurface = "city" | "destination" | "sports-venue";

export function CityPassContextualCallout({
  surface,
  slug,
  placement = "inline",
}: {
  surface: CityPassSurface;
  slug: string;
  placement?: "inline" | "rail";
}) {
  const market = surface === "destination"
    ? cityPassMarketForDestinationSlug(slug)
    : surface === "city"
      ? cityPassMarketForCitySlug(slug)
      : cityPassMarketForSportsVenueSlug(slug);

  return market ? <CityPassCalloutContent market={market} placement={placement} /> : null;
}
