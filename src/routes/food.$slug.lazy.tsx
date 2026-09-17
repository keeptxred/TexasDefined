import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/food/$slug")({ component: FoodDestinationPage });

function FoodDestinationPage() {
  const { destination, authorityHtml } = Route.useLoaderData();
  const address = `${destination.streetAddress}, ${destination.city}, TX ${destination.postalCode}`;
  return <main><Container className="py-10 sm:py-14 lg:py-16">
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground"><Link to="/">Home</Link> / <Link to="/explore/$category" params={{ category: "food-bbq" }}>Food &amp; BBQ</Link> / <span>{destination.name}</span></nav>
    <article className="mx-auto mt-8 max-w-4xl">
      <p className="eyebrow text-primary">Texas food destination · {destination.region}</p>
      <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{destination.name}</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">{destination.significance}</p>
      <div className="mt-8 grid gap-4 border-y border-border py-6 text-sm sm:grid-cols-3"><div><p className="eyebrow text-muted-foreground">City</p><p className="mt-1 font-semibold">{destination.city}</p></div><div><p className="eyebrow text-muted-foreground">County</p><p className="mt-1 font-semibold">{destination.county} County</p></div><div><p className="eyebrow text-muted-foreground">Source checked</p><p className="mt-1 font-semibold">{destination.verifiedAt}</p></div></div>
      {authorityHtml ? <div className="mt-10 space-y-6 text-base leading-8 text-muted-foreground [&_a]:font-semibold [&_a]:text-foreground [&_a]:underline [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_p]:mt-3" dangerouslySetInnerHTML={{ __html: authorityHtml }} /> : null}
      <section className="mt-10 border-t border-border pt-8"><h2 className="font-display text-3xl">Plan the stop</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{address}. Hours, menus, prices and service details can change; confirm current operating information with the business before making a special trip.</p><a href={destination.officialUrl} target="_blank" rel="noreferrer" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Official website →</a></section>
    </article>
  </Container></main>;
}
