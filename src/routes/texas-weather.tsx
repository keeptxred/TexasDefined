import { createFileRoute, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";

const PrioritySearchPage = lazy(() =>
  import("@/components/editorial/PrioritySearchPage").then((module) => ({ default: module.PrioritySearchPage })),
);

const canonicalPath = "/texas-weather";

export const Route = createFileRoute("/texas-weather")({
  loader: async () => {
    const data = await loadPrioritySearchPage("texas-weather");
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData ? buildPrioritySearchHead({
    canonicalPath,
    title: "Texas Weather: Radar, Alerts, Drought, Floods & Air Quality",
    description: loaderData.intro,
    data: loaderData,
    about: ["Texas weather", "Texas radar", "Texas drought", "Texas burn bans", "Texas flood conditions", "Texas air quality"],
  }) : {},
  component: Page,
});

function Page() {
  return <Suspense fallback={null}><PrioritySearchPage data={Route.useLoaderData()} /></Suspense>;
}
