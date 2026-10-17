import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/water-parks")({
  component: () => <Outlet />,
});
