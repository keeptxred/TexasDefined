import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/events")({
  component: EventsLayout,
});

function EventsLayout() {
  return <Outlet />;
}
