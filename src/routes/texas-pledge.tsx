import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const PATH = "/texas-pledge";
const TITLE = "Texas Pledge: Words, History, and Where It Is Used";
const DESCRIPTION = "The exact Texas pledge, how its wording changed, where Texas law places it in schools, and how it differs from the U.S. Pledge of Allegiance and Texas's state song.";

export const Route = createFileRoute(PATH)({
  head: () => ({ meta: buildMeta(texasDefinedBrand, { title: TITLE, description: DESCRIPTION, canonicalPath: PATH }), links: [canonicalLink(texasDefinedBrand, PATH)] }),
});
