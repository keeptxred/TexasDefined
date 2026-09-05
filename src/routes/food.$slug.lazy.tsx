import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/food/$slug")({ component: FoodDestinationPage });

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
            <div><p className="eyebrow text-muted-foreground">Source checked</p><p className="mt-1 font-semibold">{destination.verifiedAt}</p></div>
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
