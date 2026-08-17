import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    scrollRestorationBehavior: "instant",
    defaultPreloadStaleTime: 0,
  });

  if (typeof window !== "undefined") {
    router.subscribe("onResolved", ({ toLocation }) => {
      if (!toLocation.pathname.startsWith("/county/")) return;

      // County pages can be long. On a hard refresh, browser/router scroll
      // restoration can reopen the visitor deep in the page after the first
      // render, hiding the county heading and in-progress notice. Always land
      // county routes at the top once the route has fully resolved.
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });
    });
  }

  return router;
};
