import { useMemo, useState } from "react";

import { ProductCard } from "@/components/commerce/ProductCard";
import type { Product } from "@/data/types";

type SortKey = "featured" | "newest" | "best-selling" | "price-low" | "price-high" | "name";

const CATEGORY_LABELS: Record<string, string> = {
  shirts: "T-Shirts",
  hoodies: "Hoodies",
  hats: "Hats",
  drinkware: "Drinkware",
  stickers: "Stickers",
  "tote-bags": "Tote Bags",
  accessories: "Accessories",
};

const COLLECTION_LABELS: Record<string, string> = {
  patriotic: "Patriotic",
  texas: "Texas",
  floral: "Floral",
  conservative: "Conservative",
  "texas-pride": "Texas Pride",
  outdoors: "Outdoors",
  home: "Home",
  gifts: "Gifts",
  "texas-wildlife": "Texas Wildlife",
  "hill-country": "Hill Country",
  "gulf-coast": "Gulf Coast",
  bbq: "BBQ",
  "state-parks": "State Parks",
  "small-town-texas": "Small Town Texas",
  "texas-christmas": "Texas Christmas",
  holiday: "Holiday Collection",
};

const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "best-selling", label: "Best Selling" },
  { value: "price-low", label: "Price: Low → High" },
  { value: "price-high", label: "Price: High → Low" },
  { value: "name", label: "Name: A → Z" },
];

function humanize(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function collectionLabel(value: string) {
  return COLLECTION_LABELS[value] ?? humanize(value);
}

function categoryLabel(value: string) {
  return CATEGORY_LABELS[value] ?? humanize(value);
}

function isBestSeller(product: Product) {
  return (product.tags ?? []).some((tag) => {
    const normalized = tag.trim().toLowerCase();
    return normalized === "best seller" || normalized === "bestseller" || normalized === "best-selling";
  });
}

function productSearchText(product: Product) {
  return [
    product.name,
    product.blurb,
    product.category ?? "",
    ...(product.tags ?? []),
    ...product.collectionSlugs,
    ...product.collectionSlugs.map(collectionLabel),
  ]
    .join(" ")
    .toLowerCase();
}

export function ShopCatalog({ products }: { products: Product[] }) {
  const [category, setCategory] = useState("all");
  const [collection, setCollection] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");

  const categoryOptions = useMemo(() => {
    const values = [...new Set(products.map((product) => product.category).filter((value): value is string => Boolean(value)))];
    return values.sort((a, b) => categoryLabel(a).localeCompare(categoryLabel(b)));
  }, [products]);

  const collectionOptions = useMemo(() => {
    const values = [...new Set(products.flatMap((product) => product.collectionSlugs))];
    return values.sort((a, b) => collectionLabel(a).localeCompare(collectionLabel(b)));
  }, [products]);

  const hasNewArrivals = products.some((product) => product.isNew);
  const hasSaleItems = products.some((product) => product.isOnSale);
  const normalizedQuery = query.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    return products
      .map((product, originalIndex) => ({ product, originalIndex }))
      .filter(({ product }) => category === "all" || product.category === category)
      .filter(({ product }) => {
        if (collection === "all") return true;
        if (collection === "__new") return product.isNew === true;
        if (collection === "__sale") return product.isOnSale === true;
        return product.collectionSlugs.includes(collection);
      })
      .filter(({ product }) => !normalizedQuery || productSearchText(product).includes(normalizedQuery))
      .sort((a, b) => {
        if (sort === "price-low") return a.product.priceCents - b.product.priceCents;
        if (sort === "price-high") return b.product.priceCents - a.product.priceCents;
        if (sort === "name") return a.product.name.localeCompare(b.product.name);
        if (sort === "best-selling") {
          const bestSellerDifference = Number(isBestSeller(b.product)) - Number(isBestSeller(a.product));
          return bestSellerDifference || a.originalIndex - b.originalIndex;
        }
        if (sort === "newest") {
          const newDifference = Number(b.product.isNew) - Number(a.product.isNew);
          return newDifference || a.originalIndex - b.originalIndex;
        }
        const featuredDifference = Number(b.product.isFeatured) - Number(a.product.isFeatured);
        if (featuredDifference) return featuredDifference;
        const orderDifference = (a.product.displayOrder ?? 0) - (b.product.displayOrder ?? 0);
        return orderDifference || a.originalIndex - b.originalIndex;
      })
      .map(({ product }) => product);
  }, [products, category, collection, normalizedQuery, sort]);

  const hasActiveFilters = category !== "all" || collection !== "all" || query.trim() !== "" || sort !== "featured";

  const clearFilters = () => {
    setCategory("all");
    setCollection("all");
    setQuery("");
    setSort("featured");
  };

  return (
    <>
      <div className="mt-8 border-b border-border pb-7">
        {categoryOptions.length > 0 ? (
          <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Filter products by category">
            <div className="flex w-max min-w-full gap-2">
              <button
                type="button"
                aria-pressed={category === "all"}
                onClick={() => setCategory("all")}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${category === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/60 hover:text-primary"}`}
              >
                All
              </button>
              {categoryOptions.map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={category === value}
                  onClick={() => setCategory(value)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${category === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/60 hover:text-primary"}`}
                >
                  {categoryLabel(value)}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {collectionOptions.length > 0 || hasNewArrivals || hasSaleItems ? (
          <div className="mt-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Shop by collection</p>
            <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Filter products by collection">
              <div className="flex w-max min-w-full gap-2">
                <button
                  type="button"
                  aria-pressed={collection === "all"}
                  onClick={() => setCollection("all")}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${collection === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-secondary/40 hover:border-primary/60 hover:text-primary"}`}
                >
                  All Collections
                </button>
                {hasNewArrivals ? (
                  <button type="button" aria-pressed={collection === "__new"} onClick={() => setCollection("__new")} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${collection === "__new" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-secondary/40 hover:border-primary/60 hover:text-primary"}`}>New Arrivals</button>
                ) : null}
                {hasSaleItems ? (
                  <button type="button" aria-pressed={collection === "__sale"} onClick={() => setCollection("__sale")} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${collection === "__sale" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-secondary/40 hover:border-primary/60 hover:text-primary"}`}>On Sale</button>
                ) : null}
                {collectionOptions.map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={collection === value}
                    onClick={() => setCollection(value)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${collection === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-secondary/40 hover:border-primary/60 hover:text-primary"}`}
                  >
                    {collectionLabel(value)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px] sm:items-end">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Search products</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Sort by</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm font-medium outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {SORT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold" aria-live="polite">
            {filteredProducts.length} of {products.length} {products.length === 1 ? "product" : "products"}
          </p>
          {hasActiveFilters ? (
            <button type="button" onClick={clearFilters} className="text-sm font-semibold text-primary hover:underline">
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <li id={`product-${product.id}`} key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 border-y border-border py-12 text-center">
          <h3 className="font-display text-3xl">No products match those filters</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">Try another category or collection, clear the search, or reset the filters to see the full Texas Defined shop.</p>
          <button type="button" onClick={clearFilters} className="mt-5 text-sm font-semibold text-primary hover:underline">Show all products</button>
        </div>
      )}
    </>
  );
}
