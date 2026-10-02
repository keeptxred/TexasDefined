import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const StartBusinessTexasGuide = lazy(() =>
  import("@/components/business/StartBusinessTexasGuide").then((module) => ({ default: module.StartBusinessTexasGuide })),
);

export const Route = createFileRoute("/start-a-business-in-texas")({
  loader: () => import("@/data/start-business-texas-guide").then((module) => module.loadStartBusinessHead()),
  head: ({ loaderData }) => loaderData ?? {},
  component: Page,
});

function Page() {
  return (
    <Suspense fallback={<div className="p-5 text-sm" role="status">Loading guide…</div>}>
      <StartBusinessTexasGuide />
    </Suspense>
  );
}
