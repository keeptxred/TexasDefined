import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import { collectionQuery, productsQuery } from "@/data/queries";
import { formatPrice } from "@/domain/utils/format";
import { recoverOrHideImage } from "@/lib/image-fallback";

/** Inline editorial-to-commerce module rendered inside article bodies. */
export function ShopTheStory({ collectionSlug }: { collectionSlug: string }) {
  const brand = useBrand();
  const collection = useQuery(collectionQuery(collectionSlug));
  const products = useQuery(productsQuery({ collection: collectionSlug, limit: 3 }));

  // Editorial shop modules only exist when the collection is genuinely selling
  // something. Never link an article into an empty placeholder collection.
  if (!brand.features.shop || !collection.data || !products.data?.length) return null;

  return (
    <aside className="my-12 border-y border-border bg-secondary/60 px-5 py-8 sm:px-8">
      <p className="eyebrow text-primary">From the story</p>
      <h3 className="mt-2 font-display text-2xl">Things that caught our eye</h3>
      <p className="mt-1 text-sm text-muted-foreground">{collection.data.tagline}</p>
      <ul className="mt-6 grid gap-6 sm:grid-cols-3">
        {products.data.map((product) => (
          <li key={product.id}>
            <div className="relative aspect-square overflow-hidden bg-muted">
              <span aria-hidden className="eyebrow absolute left-5 top-5 text-muted-foreground">Product image unavailable</span>
              <img
              src={product.image.src}
              alt={product.image.alt}
              width={product.image.width}
              height={product.image.height}
              sizes="(min-width: 640px) 30vw, 100vw"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover"
              onError={(event) => recoverOrHideImage(event.currentTarget)}
            />
            </div>
            <p className="mt-3 font-display text-base leading-snug">{product.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatPrice(product.priceCents, product.currency, brand.identity.locale)}
            </p>
          </li>
        ))}
      </ul>
      <Link
        to="/shop/$collection"
        params={{ collection: collectionSlug }}
        className="eyebrow group mt-6 inline-flex min-h-11 items-center gap-2 border-b border-primary pb-1 text-primary"
      >
        Shop these picks
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </aside>
  );
}
