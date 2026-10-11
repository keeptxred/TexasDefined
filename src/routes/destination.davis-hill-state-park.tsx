import { createFileRoute } from "@tanstack/react-router";

const canonical = "https://texasdefined.com/destination/davis-hill-state-park";
export const Route = createFileRoute("/destination/davis-hill-state-park")({
  head: () => ({
    meta: [
      { title: "Davis Hill State Natural Area: Access, History & Geology | Texas Defined" },
      { name: "description", content: "Davis Hill in Liberty County is not open for public visits. Explore its 1983 history, Trinity River habitat, salt dome, rare plants and TPWD future plans." },
      { name: "robots", content: "index, follow, max-image-preview:large" },
    ],
    links: [{ rel: "canonical", href: canonical }],
  }),
});
