import { createFileRoute } from "@tanstack/react-router";

import { FishingHabitatGuidePage } from "@/components/fishing/FishingHabitatGuidePage";
import { buildFishingHabitatHead, fishingHabitatGuides } from "@/data/fishing/habitat-guides";

const guide = fishingHabitatGuides.structure;

export const Route = createFileRoute("/fishing/structure")({
  head: () => buildFishingHabitatHead(guide),
  component: () => <FishingHabitatGuidePage guide={guide} />,
});
