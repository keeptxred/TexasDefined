import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { StateFairCurrentHighlights } from "@/components/editorial/StateFairCurrentHighlights";
import { StateFairHistoricalGallery, StateFairPlanningStrip } from "@/components/editorial/StateFairGuideEnhancements";

export const Route = createLazyFileRoute("/texas-state-fair")({
  component: TexasStateFairPage,
});

function TexasStateFairPage() {
  const data = Route.useLoaderData();
  const concluded = Date.now() >= Date.parse("2026-10-19T00:00:00-05:00");
  return (
    <PrioritySearchPage
      data={concluded
        ? { ...data, quickAnswer: "The 2026 State Fair concluded October 18 at Fair Park in Dallas. These are historical 2026 details; confirm future dates and ticket prices with the organizer." }
        : data}
      showSectionNumbers={false}
      titleOverride="State Fair of Texas 2026: Sept. 25–Oct. 18"
      introOverride={concluded
        ? "The 2026 State Fair concluded October 18 at Fair Park in Dallas. Explore the archive of 2026 food, attractions, tickets, accessibility, parking and DART tips. Check with the organizer for upcoming dates."
        : "The 2026 State Fair of Texas runs Sept. 25–Oct. 18 at Fair Park in Dallas. Plan your visit with current hours, tickets, daily schedule, DART and parking guidance, 2026 food and attractions, and a practical first-timer itinerary."}
      updatedOverride="October 10, 2026"
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
