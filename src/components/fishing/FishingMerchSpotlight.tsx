import { useQuery } from "@tanstack/react-query";

import { fetchAssignedShopProducts } from "@/data/shop-products-remote";
import type { Product } from "@/data/types";
import { recoverOrHideImage } from "@/lib/image-fallback";

/**
 * Shared on-page merchandising slot used by present and future fishing guides.
 * Fetches only active, TexasDefined-assigned products in the Fishing Shirts
 * collection. Editorial facts and official fishing guidance never depend on it.
 */
export function FishingMerchSpotlight({
  lakeName,
  speciesName,
  speciesNames = [],
  compact = false,
}: {
  lakeName?: string;
  speciesName?: string;
  speciesNames?: string[];
  compact?: boolean;
}) {
  const { data: products = [] } = useQuery({
    queryKey: ["texasdefined", "fishing-shirt-merch-v1"],
    queryFn: () => fetchAssignedShopProducts({ collection: "fishing-shirts", limit: 24 }),
    staleTime: 10 * 60 * 1000,
    retry: false,
  });

  // No merchandising box or fake recommendation while the catalog is empty
  // or the commerce API is unavailable. The rest of the guide remains usable.
  const available = products.filter((product) => product.image.src && product.productUrl && (product.variants ?? []).some((variant) => variant.is_enabled !== false));
  if (!available.length) return null;

  const recommended = rankFishingShirts(available, lakeName, speciesName, speciesNames).slice(0, compact ? 2 : 3);
  return (
    <section aria-label="Texas Defined fishing shirts" className={compact ? "mt-9 border-t border-border pt-6" : "border-y border-border py-9 sm:py-12"}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow text-primary">From the Texas Defined shop</p>
          <h3 className="mt-2 font-display text-2xl sm:text-3xl">Fishing shirts for the next trip</h3>
        </div>
        <a href="/shop/fishing-shirts" className="text-xs font-semibold text-primary underline underline-offset-4">All fishing shirts →</a>
      </div>
      <p className="mt-3 max-w-3xl text-xs leading-5 text-muted-foreground">
        Original graphic apparel, not technical sun-protection gear. Editorial fishing advice is independent of merchandise.
      </p>
      <div className={compact ? "mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1" : "mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"}>
        {recommended.map((product) => (
          <a
            key={product.id}
            href={product.productUrl ?? `/shop/product/${encodeURIComponent(product.id)}`}
            className="group flex min-w-0 gap-3 border-t border-border pt-4 sm:flex-col"
          >
            <div className="h-28 w-24 shrink-0 overflow-hidden bg-muted sm:aspect-[4/5] sm:h-auto sm:w-full">
              <img
                src={product.image.src}
                alt={product.image.alt || product.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                onError={(event) => recoverOrHideImage(event.currentTarget)}
              />
            </div>
            <div className="min-w-0">
              <strong className="line-clamp-2 text-sm leading-5 group-hover:text-primary">{product.name.replace(/\s+[–-]\s*T-Shirt\s*$/, "")}</strong>
              <p className="mt-2 text-sm font-semibold">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(product.priceCents / 100)}</p>
              <span className="mt-2 inline-block text-xs font-semibold text-primary">See sizes & colors →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function rankFishingShirts(products: Product[], lakeName?: string, speciesName?: string, speciesNames: string[] = []): Product[] {
  const context = [lakeName, speciesName, ...speciesNames].filter(Boolean).join(" ").toLowerCase();
  const lake = lakeName?.toLowerCase().trim() ?? "";
  const isBass = /\bbass\b|largemouth|smallmouth/.test(context);
  const isCoastal = /redfish|red drum|saltwater|coast|gulf|flounder|speckled trout|sea trout/.test(context);
  return [...products].sort((a, b) => score(b) - score(a) || a.id.localeCompare(b.id));

  function score(product: Product) {
    const title = product.name.toLowerCase();
    const productText = [product.name, ...product.tags].join(" ").toLowerCase();
    let rank = 0;
    // Future dedicated lake merchandise beats generic apparel automatically.
    if (lake.length > 4 && title.includes(lake)) rank += 120;
    if (isBass && /largemouth|bass/.test(productText)) rank += 45;
    if (isCoastal && /redfish|red drum|saltwater|coastal|gulf/.test(productText)) rank += 65;
    if (context.includes("sunrise") && title.includes("sunrise")) rank += 20;
    // Useful evergreen picks when no exact product exists for this fishery.
    if (/lake weekend/i.test(title)) rank += 12;
    if (/sunrise cast/i.test(title)) rank += 8;
    if (/tackle club/i.test(title)) rank += 5;
    return rank;
  }
}
