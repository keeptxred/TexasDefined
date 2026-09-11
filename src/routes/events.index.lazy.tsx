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

  return <Suspense fallback={<EventsLoading majorEventGuides={data.majorEventGuides} />}>
    <EventsLandingPage
      data={{ ...data, eventTimingLinks, eventTopicLinks, eventRegionLinks }}
      search={search}
    />
  </Suspense>;
}

function EventsLoading({ majorEventGuides }: { majorEventGuides: Array<{ slug: string; name: string }> }) {
  return <main aria-busy="true" aria-label="Loading Texas events">
    <nav aria-label="Breadcrumb" className="ev-crumb"><ol><li><Link to="/">Front page</Link></li><li aria-hidden="true">/</li><li aria-current="page">Events</li></ol></nav>
    <section aria-labelledby="events-loading-guides"><h2 id="events-loading-guides">Major Texas event guides</h2><div>{majorEventGuides.map(({ slug, name }) => <Link key={slug} to="/event/$slug" params={{ slug }}>{name}</Link>)}</div></section>
  </main>;
}
