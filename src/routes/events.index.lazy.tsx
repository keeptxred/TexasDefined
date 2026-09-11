import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const EventsLandingPage = lazy(() => import("@/components/events/EventsLandingPage").then((module) => ({ default: module.EventsLandingPage })));

export const Route = createLazyFileRoute("/events/")({ component: EventsPage });

function EventsPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const eventTimingLinks = data.eventTimingLinks.map((item) => item);
  const eventTopicLinks = data.eventTopicLinks.map((item) => item);
  const eventRegionLinks = data.eventRegionLinks.map((item) => item);
  const breadcrumb = <nav aria-label="Breadcrumb" className="ev-crumb"><ol><li><Link to="/">Front page</Link></li><li aria-hidden="true">/</li><li aria-current="page">Texas Events</li></ol></nav>;

  return <Suspense fallback={<main aria-busy="true" aria-label="Loading Texas events" />}>
    <EventsLandingPage
      breadcrumb={breadcrumb}
      data={{ ...data, eventTimingLinks, eventTopicLinks, eventRegionLinks }}
      search={search}
    />
  </Suspense>;
}
