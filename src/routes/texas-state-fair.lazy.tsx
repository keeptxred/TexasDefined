import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { StateFairCurrentHighlights } from "@/components/editorial/StateFairCurrentHighlights";
import { StateFairHistoricalGallery, StateFairPlanningStrip } from "@/components/editorial/StateFairGuideEnhancements";

export const Route = createLazyFileRoute("/texas-state-fair")({
  component: TexasStateFairPage,
});

function TexasStateFairPage() {
  return (
    <PrioritySearchPage
      data={Route.useLoaderData()}
      showSectionNumbers={false}
      titleOverride="State Fair of Texas 2026"
      introOverride="Plan a day at Fair Park with current hours, tickets, transportation, 2026 food and attractions, family tips, college-football guidance and a practical first-timer itinerary."
      updatedOverride="October 2, 2026"
      excludeSectionHeadings={["What is new for 2026"]}
      collapsibleOfficialSources
      officialSourcesHeading="Official State Fair sources"
      officialSourcesIntro="Hours, schedules, prices and operating details can change during the Fair. These are the official State Fair pages used to verify this guide."
      afterQuickAnswer={
        <>
          <StateFairPlanningStrip />
          <StateFairCurrentHighlights />
        </>
      }
      beforeRelated={<StateFairHistoricalGallery />}
    />
  );
}
