import { createLazyFileRoute } from "@tanstack/react-router";

import { EventsLandingPage } from "@/components/events/EventsLandingPage";

export const Route = createLazyFileRoute("/events/")({ component: EventsPage });

function EventsPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const eventTimingLinks = data.eventTimingLinks.map((item) => item);
  const eventTopicLinks = data.eventTopicLinks.map((item) => item);
  const eventRegionLinks = data.eventRegionLinks.map((item) => item);
  const breadcrumb = <nav aria-label="Breadcrumb" className="ev-crumb"><ol><li><a href="/">Front page</a></li><li aria-hidden="true">/</li><li aria-current="page">Texas Events</li></ol></nav>;

  return <EventsLandingPage
    breadcrumb={breadcrumb}
    data={{ ...data, eventTimingLinks, eventTopicLinks, eventRegionLinks }}
    search={search}
  />;
}
