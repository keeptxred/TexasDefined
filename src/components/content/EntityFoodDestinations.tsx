import type { EntityFoodDestinationLink } from "@/data/food-destination-entity-index";
import type { TexasEntityRecord } from "@/data/knowledge-graph/types";

const siteUrl = "https://texasdefined.com";

export function EntityFoodDestinations({
  entity,
  destinations,
}: {
  entity: TexasEntityRecord;
  destinations: readonly EntityFoodDestinationLink[];
}) {
  if (!destinations.length) return null;

  const heading = entity.kind === "county"
    ? `Food & drink in ${entity.name}`
    : `Food & drink in ${entity.name}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/${entity.kind}/${entity.slug}#food-destinations`,
    name: heading,
    numberOfItems: destinations.length,
    itemListElement: destinations.map((destination, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": destination.schemaType,
        name: destination.name,
        url: `${siteUrl}/food/${destination.slug}`,
      },
    })),
  };

  return (
    <section className="border-b border-border py-12" aria-labelledby="entity-food-destinations-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Texas food destinations</p>
          <h2 id="entity-food-destinations-heading" className="mt-2 font-display text-4xl">{heading}</h2>
        </div>
        <div>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
            TexasDefined currently connects {destinations.length} source-checked food destination{destinations.length === 1 ? "" : "s"} to this {entity.kind === "county" ? "county" : "city"}. These profiles focus on durable history, regional significance and official-source verification rather than volatile menus, prices or hours.
          </p>
          <ul className="mt-6 grid gap-x-7 sm:grid-cols-2 xl:grid-cols-3">
            {destinations.map((destination) => (
              <li key={destination.slug} className="border-t border-border py-4">
                <a href={`/food/${destination.slug}`} className="group">
                  <strong className="block font-display text-xl group-hover:text-primary">{destination.name}</strong>
                  <span className="mt-1 block text-sm text-muted-foreground">{destination.city}, Texas · {destination.knownFor.join(" · ")}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href="/explore/food-bbq" className="mt-6 inline-block text-sm font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">
            Browse the Texas Food & BBQ guide →
          </a>
        </div>
      </div>
    </section>
  );
}

export default EntityFoodDestinations;
