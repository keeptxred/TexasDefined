import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/explore/near/$metro")({
  component: MetroProximityLayout,
});

function MetroProximityLayout() {
  return <Outlet />;
}
