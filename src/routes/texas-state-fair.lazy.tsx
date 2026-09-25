import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { StateFairHistoricalGallery, StateFairPlanningStrip } from "@/components/editorial/StateFairGuideEnhancements";

export const Route = createLazyFileRoute("/texas-state-fair")({
  component: TexasStateFairPage,
});

function TexasStateFairPage() {
  return (
    <PrioritySearchPage
      data={Route.useLoaderData()}
      showSectionNumbers={false}
      afterQuickAnswer={<StateFairPlanningStrip />}
      beforeRelated={<StateFairHistoricalGallery />}
    />
  );
}
