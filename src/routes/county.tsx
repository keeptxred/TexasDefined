import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { TEXAS_COUNTIES } from "@/data/texas-places";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description = "Browse all 254 Texas county guides, combining county facts, communities, official local resources and Texas Defined's long-form county profiles.";

export const Route = createFileRoute("/county")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/county",
      title: "Texas County Guides",
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, "/county")],
  }),
  component: CountyIndexPage,
});

function CountyIndexPage() {
  const counties = [...TEXAS_COUNTIES].sort((a, b) => a.name.localeCompare(b.name));

  return <Container className="pb-20 pt-12 sm:pb-24 sm:pt-16">
    <header className="border-b border-border pb-10">
      <p className="eyebrow text-primary">Texas counties</p>
      <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">All 254 Texas county guides</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>
    </header>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {counties.map((county) => <Link
        key={county.slug}
        to="/$kind/$slug"
        params={{ kind: "county", slug: county.slug }}
        className="group border-b border-border py-6 sm:px-5 sm:odd:border-r lg:border-r"
      >
        <span className="eyebrow text-primary">County guide</span>
        <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{county.name}</strong>
        <span className="mt-3 block text-sm text-muted-foreground">Facts, places, history and local resources →</span>
      </Link>)}
    </div>
  </Container>;
}
