import { createLazyFileRoute } from "@tanstack/react-router";

import heroHillCountry from "@/assets/hero-hill-country.jpg";
import { CategoryPage } from "@/components/editorial/CategoryPage";

const description = "Ranchettes, bungalows, lake lots and city lofts — what homes cost, where people are moving and what to know before you buy, build or own property in Texas.";
const imageAlt = "Evening light across rolling Texas Hill Country";

export const Route = createLazyFileRoute("/real-estate")({
  component: RealEstatePage,
});

function RealEstatePage() {
  return <CategoryPage category="real-estate" eyebrow="Homes & Land" title="Homes, land and ownership across Texas" intro={description} image={{ src: heroHillCountry, alt: imageAlt, width: 1600, height: 1067 }} />;
}
