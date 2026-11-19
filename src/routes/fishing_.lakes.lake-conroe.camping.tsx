import { createFileRoute } from "@tanstack/react-router";

/** Root-detached campground route: both the editorial body and full metadata are loaded on demand without the heavyweight fishing parent. */
export const Route = createFileRoute("/fishing/lakes/lake-conroe/camping")({
  loader: async () => (await import("@/data/fishing/lake-conroe-camping-head")).lakeConroeCampingHead(),
  head: ({ loaderData }) => loaderData ?? { meta: [{ name: "robots", content: "noindex, follow" }] },
});
