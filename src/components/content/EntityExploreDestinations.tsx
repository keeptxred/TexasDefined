import type { EntityExploreDestinationLink } from "@/data/entity-explore-destinations";
import type { TexasEntityRecord } from "@/data/knowledge-graph/types";

const siteUrl = "https://texasdefined.com";

export function EntityExploreDestinations({
  entity,
  destinations,
}: {
  entity: TexasEntityRecord;
  destinations: EntityExploreDestinationLink[];
}) {
  if (!destinations.length) return null;

  const placeLabel = entity.kind === "county" ? entity.name : `${entity.name}, Texas`;
  const categories = [...new Map(destinations.map((destination) => [
    destination.category,
    categoryLabel(destination.category),
  ])).entries()];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/${entity.kind}/${entity.slug}#explore-destinations`,
    name: `Places to visit in ${placeLabel}`,
    numberOfItems: destinations.length,
    itemListElement: destinations.map((destination, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "TouristAttraction",
        name: destination.name,
        description: destination.summary,
        url: `${siteUrl}/destination/${destination.slug}`,
      },
    })),
  };

  return <section className="border-b border-border py-12" aria-labelledby="entity-explore-destinations-heading">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
      <div>
        <p className="eyebrow text-primary">Explore nearby</p>
        <h2 id="entity-explore-destinations-heading" className="mt-2 font-display text-4xl">
          Places to visit in {placeLabel}
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          TexasDefined destination guides connected directly to this {entity.kind === "county" ? "county" : "city"}, with official visitor sources and trip-planning context.
        </p>
      </div>
      <div>
        <div className="border-y border-border py-5">
          <h3 className="font-display text-2xl">
            What TexasDefined destinations are connected to {placeLabel}?
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            We currently have {destinations.length} featured destination guide{destinations.length === 1 ? "" : "s"} linked here. Each guide connects back to county context, nearby places and the relevant statewide Explore collection.
          </p>
        </div>

        <div className="mt-7 grid gap-x-7 sm:grid-cols-2 xl:grid-cols-3">
          {destinations.map((destination) => <a
            key={destination.slug}
            href={`/destination/${destination.slug}`}
            className="group border-t border-border py-5"
          >
            <span className="eyebrow text-primary">{categoryLabel(destination.category)}</span>
            <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{destination.name}</strong>
            <span className="mt-3 block line-clamp-3 text-sm leading-6 text-muted-foreground">{destination.summary}</span>
            <span className="mt-3 block text-sm font-semibold text-primary">Open destination guide →</span>
          </a>)}
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <p className="eyebrow text-primary">Keep exploring Texas</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            {categories.map(([category, label]) => <a
              key={category}
              href={`/explore/${category}`}
              className="underline decoration-primary/40 underline-offset-4 hover:text-primary"
            >
              {label}
            </a>)}
            <a href="/explore" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">All Explore Texas guides</a>
          </div>
        </div>
      </div>
    </div>
  </section>;
}

function categoryLabel(category: string) {
  const labels: Record<string, string> = {
    "historic-sites": "Historic sites",
    "road-trips": "Road trips",
    "food-bbq": "Texas food & BBQ",
    outdoors: "Outdoors",
    sports: "Sports",
    "small-towns": "Small towns",
  };
  return labels[category] ?? category.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
