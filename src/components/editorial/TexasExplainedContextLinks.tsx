import { Link } from "@tanstack/react-router";

type TexasExplainedSurface = "destination" | "fishing" | "sports";

type ContextLink = {
  to: string;
  label: string;
  description: string;
};

const SURFACE_LINKS: Record<TexasExplainedSurface, ContextLink[]> = {
  destination: [
    { to: "/article/texas-regions-explained", label: "Texas Regions", description: "See how geography changes landscapes, climate and travel across the state." },
    { to: "/article/texas-cultural-regions-explained", label: "Cultural Regions", description: "Understand the settlement, migration and traditions behind different parts of Texas." },
    { to: "/article/texas-farm-to-market-roads-explained", label: "Farm-to-Market Roads", description: "Learn the road system that still shapes how many Texas destinations connect." },
  ],
  fishing: [
    { to: "/article/texas-lakes-reservoirs-explained", label: "Texas Lakes & Reservoirs", description: "Why most Texas lakes are man-made and how reservoirs fit into the state's water system." },
    { to: "/article/texas-rivers-explained", label: "Texas Rivers", description: "Follow the river systems that feed reservoirs, habitats and fishing waters across Texas." },
    { to: "/article/texas-wildlife-guide", label: "Texas Wildlife", description: "A field guide to the animals and habitats anglers encounter around Texas water." },
  ],
  sports: [
    { to: "/article/texas-cultural-regions-explained", label: "Cultural Regions", description: "See how migration, local identity and regional traditions shaped the Texas around the venue." },
    { to: "/article/texas-farm-to-market-roads-explained", label: "Farm-to-Market Roads", description: "Understand the Texas road network behind many game-day and weekend drives." },
    { to: "/article/texas-courthouses-town-square", label: "Courthouse Squares", description: "Learn why so many Texas communities developed around a county-seat core." },
  ],
};

export function TexasExplainedContextLinks({ surface }: { surface: TexasExplainedSurface }) {
  const links = SURFACE_LINKS[surface];
  return (
    <section className="border-b border-border py-10" aria-labelledby={`texas-explained-${surface}-heading`}>
      <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Texas Explained</p>
          <h2 id={`texas-explained-${surface}-heading`} className="mt-2 font-display text-3xl leading-tight">Understand the Texas behind the trip</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Go beyond the destination with the systems, landscapes and history that explain why this part of Texas looks and works the way it does.</p>
        </div>
        <div>
          <div className="grid gap-x-7 sm:grid-cols-3">
            {links.map((item) => (
              <Link key={item.to} to={item.to} className="group border-t border-border py-5">
                <strong className="block font-display text-2xl leading-tight group-hover:text-primary">{item.label}</strong>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span>
                <span className="eyebrow mt-4 inline-block text-primary">Read guide →</span>
              </Link>
            ))}
          </div>
          <Link to="/texas-explained" className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">Explore all 10 Texas Explained guides →</Link>
        </div>
      </div>
    </section>
  );
}
