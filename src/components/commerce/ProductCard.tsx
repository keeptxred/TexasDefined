import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

import { useBrand } from "@/brand/context";
import type { Product } from "@/data/types";
import { formatPrice } from "@/domain/utils/format";
import { useSavedProduct } from "@/hooks/useSavedProducts";
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
  const { saved, toggle } = useSavedProduct(product.id);

  const content = (
    <>
      <div className="relative overflow-hidden bg-muted">
        <img
          src={product.image.src}
          alt={product.image.alt}
          width={product.image.width}
          height={product.image.height}
          loading="lazy"
          decoding="async"
          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.madeInTexas && (
          <span className="absolute left-3 top-3 bg-background/90 px-2 py-1 text-xs text-foreground">
            Made here in Texas
          </span>
        )}
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
    <article className={cn("group relative", className)}>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${product.name} from your saved picks` : `Save ${product.name} for later`}
        title={saved ? "Remove from saved picks" : "Save for later"}
        className="absolute right-3 top-3 z-10 rounded-full bg-background/90 p-2 text-foreground/70 transition-all hover:text-primary lg:opacity-0 lg:focus-visible:opacity-100 lg:group-hover:opacity-100"
      >
        <Heart className={cn("size-4", saved && "fill-primary text-primary")} aria-hidden />
      </button>
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
