import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/privacy";
const description = "Read the Texas Defined privacy policy, including how the site handles analytics, forms, commerce, cookies, advertising, and privacy choices.";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Privacy Policy", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
