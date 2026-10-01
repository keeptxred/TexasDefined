import { createLazyFileRoute } from "@tanstack/react-router";
import { StartBusinessTexasGuide } from "@/components/business/StartBusinessTexasGuide";

export const Route = createLazyFileRoute("/start-a-business-in-texas")({
  component: StartBusinessTexasGuide,
});
