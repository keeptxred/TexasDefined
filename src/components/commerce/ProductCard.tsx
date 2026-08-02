import { Link } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import type { Product } from "@/data/types";
import { formatPrice } from "@/domain/utils/format";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const brand = useBrand();
  const collection = product.collectionSlugs[0];

  const content = (
    <>
      <div className="overflow-hidden bg-muted">
        <img
          src={product.image.src}
          alt={product.image.alt}
          width={product.image.width}
          height={product.image.height}
          loading="lazy"
          decoding="async"
          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="pt-4">
        <p className="eyebrow text-muted-foreground">{product.maker}</p>
        <h3 className="mt-1 font-display text-lg leading-snug">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.blurb}</p>
        <p className="mt-2 text-sm font-medium text-foreground">
          {formatPrice(product.priceCents, product.currency, brand.identity.locale)}
        </p>
      </div>
    </>
  );

  return (
    <article className={cn("group", className)}>
      {collection ? (
        <Link to="/shop/$collection" params={{ collection }} className="block">
          {content}
        </Link>
      ) : (
        content
      )}
    </article>
  );
}
