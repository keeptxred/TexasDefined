import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildSeoHead } from "@/lib/seo";

const canonicalPath = "/waco-ghost-tours";
export const Route = createFileRoute("/waco-ghost-tours")({
  head: () => buildSeoHead(texasDefinedBrand, {
    title: "Waco Ghost Tours: Night Walks, History & Booking Guide";
    description: "Compare Waco ghost walks and historical nighttime tours, departure details, tour durations, accessibility considerations and verified booking options.";
    canonicalPath,
  }),
});
