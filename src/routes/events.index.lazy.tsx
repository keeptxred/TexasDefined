import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import "@/components/events/events-landing.css";

const EventsLandingPage = lazy(() => import("@/components/events/EventsLandingPage").then((module) => ({ default: module.EventsLandingPage })));

export const Route = createLazyFileRoute("/events/")({ component: EventsPage });

function EventsPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const eventTimingLinks = data.eventTimingLinks.map((item) => item);
  const eventTopicLinks = data.eventTopicLinks.map((item) => item);
  const eventRegionLinks = data.eventRegionLinks.map((item) => item);
  const breadcrumb = <nav aria-label="Breadcrumb" className="ev-crumb"><ol><li><Link to="/">Front page</Link></li><li aria-hidden="true">/</li><li aria-current="page">Texas Events</li></ol></nav>;

  return <><Suspense fallback={<main aria-busy="true" aria-label="Loading Texas events" />}>
    <EventsLandingPage
      breadcrumb={breadcrumb}
      data={{ ...data, eventTimingLinks, eventTopicLinks, eventRegionLinks }}
      search={search}
    />
  </Suspense><aside aria-label="Corporate event planning" className="border-t border-border bg-surface px-5 py-10 text-center"><h2 className="font-display text-3xl">Organizing a company outing?</h2><p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">Find Texas corporate event venues and team-building activities by group size, compare options and create a proposal.</p><Link to="/corporate-events" className="mt-5 inline-flex min-h-11 items-center border border-primary px-5 text-sm font-semibold text-primary">Explore group event planning →</Link></aside></>;
}
