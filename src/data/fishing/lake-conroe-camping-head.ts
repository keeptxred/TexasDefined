import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";
import {
  LAKE_CONROE_CAMPING_CANONICAL_PATH as canonicalPath,
  LAKE_CONROE_CAMPING_TITLE as title,
  LAKE_CONROE_CAMPING_DESCRIPTION as description,
} from "./lake-conroe-camping-metadata";

/** Full canonical, indexability and social SEO stays intact, loaded on demand rather than into every visitor's main bundle. */
export function lakeConroeCampingHead() {
  return {
    meta: buildMeta(texasDefinedBrand, { title, description, canonicalPath }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  };
}
