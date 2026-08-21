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
  });

  return router;
};
