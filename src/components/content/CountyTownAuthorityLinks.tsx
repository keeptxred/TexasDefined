import { Link } from "@tanstack/react-router";
import { townAuthorityCityLinks, townAuthorityCountyLinks } from "@/data/town-authority-links";

export function CountyTownAuthorityLinks({ kind, slug, name }: { kind: "city" | "county"; slug: string; name: string }) {
  const links = kind === "county" ? townAuthorityCountyLinks(slug) : townAuthorityCityLinks(slug);
  if (links.length === 0) return null;
  return <section aria-label={"Research-backed town guides for " + name} className="border-b border-border py-9">
    <p className="eyebrow text-primary">Town and local attraction guides</p>
    <h2 className="mt-2 font-display text-3xl">Explore {name} in more depth</h2>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
      Explore these independent town guides for history, primary-source links, area attractions,
      trip timing, access considerations and nearby places. Town boundaries and regional side trips
      are distinguished from the county itself.
    </p>
    <ul className="mt-6 grid gap-5 sm:grid-cols-2">
      {links.map((item) => <li key={item.href} className="border-t border-border pt-4">
        <Link to={item.href} className="font-display text-xl text-primary underline decoration-primary/40 underline-offset-4">
          {item.label}
        </Link>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
      </li>)}
    </ul>
  </section>;
}
