import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/food/$slug")({
  loader: async ({ params }) => {
    const { getFoodDestination } = await import("@/data/food-destinations");
    const destination = getFoodDestination(params.slug);
    if (!destination) throw notFound();
    return { destination };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const { destination } = loaderData;
    const canonicalPath = `/food/${destination.slug}`;
    const description = `${destination.significance} Verified ${destination.verifiedAt}.`;
    const placeSchema = {
      "@type": destination.schemaType,
      "@id": `${siteUrl}${canonicalPath}#place`,
      name: destination.name,
      description: destination.significance,
      url: `${siteUrl}${canonicalPath}`,
      sameAs: destination.officialUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: destination.address.split(",")[0],
        addressLocality: destination.city,
        addressRegion: "TX",
        addressCountry: "US",
      },
      containedInPlace: { "@type": "AdministrativeArea", name: `${destination.county} County, Texas` },
      dateModified: destination.verifiedAt,
    };
    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}${canonicalPath}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Food & BBQ", item: `${siteUrl}/explore/food-bbq` },
        { "@type": "ListItem", position: 3, name: destination.name, item: `${siteUrl}${canonicalPath}` },
      ],
    };
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${destination.name}: Texas Food Destination Guide`,
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [placeSchema, breadcrumbSchema] }) }],
    };
  },
  component: FoodDestinationPage,
});

function FoodDestinationPage() {
  const { destination } = Route.useLoaderData();
  return (
    <main>
      <Container className="py-10 sm:py-14 lg:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/">Home</Link> <span aria-hidden="true">/</span>{" "}
          <Link to="/explore/$category" params={{ category: "food-bbq" }}>Food &amp; BBQ</Link> <span aria-hidden="true">/</span>{" "}
          <span>{destination.name}</span>
        </nav>

        <article className="mx-auto mt-8 max-w-4xl">
          <p className="eyebrow text-primary">Texas food destination · {destination.region}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{destination.name}</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">{destination.significance}</p>

          <div className="mt-8 grid gap-4 border-y border-border py-6 text-sm sm:grid-cols-3">
            <div><p className="eyebrow text-muted-foreground">City</p><p className="mt-1 font-semibold">{destination.city}</p></div>
            <div><p className="eyebrow text-muted-foreground">County</p><p className="mt-1 font-semibold">{destination.county} County</p></div>
            <div><p className="eyebrow text-muted-foreground">Verified</p><p className="mt-1 font-semibold">{destination.verifiedAt}</p></div>
          </div>

          <section className="mt-10">
            <h2 className="font-display text-3xl">Why it matters</h2>
            <p className="mt-4 leading-8 text-muted-foreground">{destination.history}</p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-3xl">Known for</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {destination.knownFor.map((item) => <li key={item} className="border border-border px-4 py-3 text-sm">{item}</li>)}
            </ul>
          </section>

          <section className="mt-10 border-t border-border pt-8">
            <h2 className="font-display text-3xl">Plan the stop</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{destination.address}. Hours, menus, pricing and service details can change; use the official business site for current operating information before making a special trip.</p>
            <a href={destination.officialUrl} target="_blank" rel="noreferrer" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Official website →</a>
          </section>

          <section className="mt-10 border-t border-border pt-8">
            <h2 className="font-display text-3xl">Keep exploring</h2>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              {destination.relatedLinks.map((link) => <a key={link.href} href={link.href} className="underline decoration-primary/40 underline-offset-4 hover:text-primary">{link.label}</a>)}
            </div>
          </section>

          <section className="mt-10 border-t border-border pt-8">
            <h2 className="font-display text-2xl">Sources &amp; verification</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">TexasDefined separates durable historical and location facts from volatile operating details. This profile was last source-checked on {destination.verifiedAt}.</p>
            <ul className="mt-4 space-y-2 text-sm">
              {destination.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">{source.label}</a></li>)}
            </ul>
          </section>
        </article>
      </Container>
    </main>
  );
}
