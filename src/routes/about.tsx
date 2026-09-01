import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const description = "Texas Defined is a lifestyle magazine about the places, food, history, homes, traditions and people that make this state feel like nowhere else.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath: "/about", title: "About Texas Defined", description }),
    links: [canonicalLink(texasDefinedBrand, "/about")],
    scripts: [jsonLd({ "@context": "https://schema.org", "@graph": [
      { "@type": "AboutPage", "@id": `${absoluteUrl(texasDefinedBrand, "/about")}#page`, url: absoluteUrl(texasDefinedBrand, "/about"), name: "About Texas Defined", description, isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` }, about: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` } },
      { "@type": "ContactPage", "@id": `${absoluteUrl(texasDefinedBrand, "/about")}#contact-page`, url: `${absoluteUrl(texasDefinedBrand, "/about")}#contact`, name: "Contact Texas Defined", isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` }, about: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` } },
      { "@type": "BreadcrumbList", "@id": `${absoluteUrl(texasDefinedBrand, "/about")}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") }, { "@type": "ListItem", position: 2, name: "About", item: absoluteUrl(texasDefinedBrand, "/about") }] },
    ] })],
  }),
});
