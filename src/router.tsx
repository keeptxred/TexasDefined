import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { applyLeafOnlyParentRouteFixes } from "./lib/leaf-only-parent-routes";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  applyLeafOnlyParentRouteFixes();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Keep fresh SSR route data intact through the first client hydration pass.
    // Unconditionally stale loaders re-fetch immediately and can briefly
    // empty <Outlet> on slower mobile connections; this bounded window does
    // not affect per-request SSR freshness or explicit route invalidation.
    defaultStaleTime: 30_000,
  });

  return router;
};
