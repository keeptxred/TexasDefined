import { Outlet, createLazyFileRoute, useChildMatches } from "@tanstack/react-router";

import HuntingHubPage from "@/components/hunting/HuntingHubPage";

function HuntingLayout() {
  const childMatches = useChildMatches();
  if (childMatches.length > 0) return <Outlet />;
  return <HuntingHubPage />;
}

export const Route = createLazyFileRoute("/hunting")({ component: HuntingLayout });
