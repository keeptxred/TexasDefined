import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import {
  LAKE_CONROE_CAMPING_CANONICAL_PATH as canonicalPath,
  LAKE_CONROE_CAMPING_TITLE as title,
  LAKE_CONROE_CAMPING_DESCRIPTION as description,
} from "@/data/fishing/lake-conroe-camping-metadata";
import { buildMeta, canonicalLink } from "@/lib/seo";

/** Detached SEO route; the separate lazy body owns sourced campground detail
 * and JSON-LD without ever loading the statewide fishing-parent graph. */
export const Route = createFileRoute("/fishing/lakes/lake-conroe/camping")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title: title, description, canonicalPath }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
