import { CityPassCalloutContent } from "./CityPassCalloutContent";
import { CityViatorBooking } from "./CityViatorBooking";
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

  if (surface === "sports-venue") {
    if (!market) return null;
    return <CityPassCalloutContent market={market} placement={placement} />;
  }

  if (market) return <CityPassCalloutContent market={market} placement={placement} />;
  return surface === "city" ? <CityViatorBooking citySlug={slug} /> : null;
}
