import { Link } from "@tanstack/react-router";

import type { Collection } from "@/data/types";

export function CollectionStrip({ collections }: { collections: Collection[] }) {
  return (
    <ul className="grid gap-8 md:grid-cols-3">
      {collections.map((collection) => (
        <li key={collection.id} className="group">
          <Link to="/shop/$collection" params={{ collection: collection.slug }} className="block">
            <div className="overflow-hidden bg-muted">
              <img
                src={collection.image.src}
                alt={collection.image.alt}
                width={collection.image.width}
                height={collection.image.height}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-4 font-display text-2xl">{collection.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{collection.tagline}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
