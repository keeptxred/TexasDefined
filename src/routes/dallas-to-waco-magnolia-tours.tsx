import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildSeoHead } from "@/lib/seo";

const canonicalPath = "/dallas-to-waco-magnolia-tours";
export const Route = createFileRoute("/dallas-to-waco-magnolia-tours")({
  head: () => buildSeoHead(texasDefinedBrand, {
    title: "Dallas to Waco Magnolia Tours: Day Trips, Departure & Tickets",
    description: "Plan a Dallas-to-Waco Magnolia day trip with tour departure guidance, inclusions, verified experience links and independent transport alternatives.",
    canonicalPath,
  }),
});
