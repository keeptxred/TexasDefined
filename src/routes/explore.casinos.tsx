import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/casinos")({
  component: () => <Outlet />,
});
