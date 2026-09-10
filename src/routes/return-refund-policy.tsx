import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description = "Read the Texas Defined policy for damaged, defective, misprinted, incorrect, lost, or made-to-order merchandise.";

export const Route = createFileRoute("/return-refund-policy")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/return-refund-policy",
      title: "Return & Refund Policy",
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, "/return-refund-policy")],
  }),
  component: lazyRouteComponent(() => import("@/components/ReturnRefundPolicyPage")),
});
