import { createFileRoute } from "@tanstack/react-router";

import { FishingHabitatGuidePage } from "@/components/fishing/FishingHabitatGuidePage";
import { buildFishingHabitatHead, fishingHabitatGuides } from "@/data/fishing/habitat-guides";

const guide = fishingHabitatGuides.vegetation;

export const Route = createFileRoute("/fishing/vegetation")({
  head: () => buildFishingHabitatHead(guide),
  component: () => <FishingHabitatGuidePage guide={guide} />,
});
