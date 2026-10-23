import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildSeoHead } from "@/lib/seo";

const canonicalPath = "/waco-attractions";
export const Route = createFileRoute("/waco-attractions")({
  head: () => buildSeoHead(texasDefinedBrand, {
    title: "Waco Attractions: Museums, Magnolia, Parks & Day Trips",
    description: "Explore Waco attractions, museums, the Suspension Bridge, Cameron Park and Magnolia, with official visit details and distinct ticket options.",
    canonicalPath,
  }),
});
