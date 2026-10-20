import { Link } from "@tanstack/react-router";

export type CountyStateParkLink = { slug: string; name: string; summary: string };

export function CountyStateParks({ countyName, parks, scope = "county" }: { countyName: string; parks: CountyStateParkLink[]; scope?: "city" | "county" }) {
  if (!parks.length) return null;
  return <section aria-label={`State parks in ${countyName}`} className="border-t border-border py-8">
    <p className="eyebrow text-primary">Explore this county</p>
    <h2 className="mt-3 font-display text-3xl">State parks {scope === "city" ? "near" : "in"} {countyName}</h2>
    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">Visit-ready local park guides with official maps, facilities research and nearby trip ideas. Review current park alerts and reservations before setting out.</p>
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {parks.map((park) => <div key={park.slug} className="border-t border-border pt-4">
        <Link to="/destination/$slug" params={{ slug: park.slug }} className="font-semibold text-primary underline underline-offset-4">{park.name}</Link>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{park.summary}</p>
      </div>)}
    </div>
    <p className="mt-5 text-sm"><Link to="/explore/$category" params={{ category: "state-parks" }} className="underline underline-offset-4">Browse all Texas state parks</Link></p>
  </section>;
}
