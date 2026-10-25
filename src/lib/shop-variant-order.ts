import type { ProductVariant } from "../data/types";

/**
 * TexasDefined merchandising invariant: apparel sizes display largest to
 * smallest, with color names sorted A–Z within each size. Source product
 * variants, IDs, prices, eligibility, images and checkout payload stay intact.
 *
 * We only reorder when *all* options have recognizable apparel sizes; other
 * products (stickers, drinkware, mixed option sets) keep provider order.
 */
function apparelSizeRank(value: string): number | null {
  const size = value.trim().toUpperCase().replace(/[\s_-]/g, "");
  const basics: Record<string, number> = {
    XXS: -1, EXTRAXTRASMALL: -1,
    XS: 0, EXTRASMALL: 0,
    S: 1, SMALL: 1,
    M: 2, MEDIUM: 2,
    L: 3, LARGE: 3,
    XL: 4, EXTRALARGE: 4,
    XXL: 5, EXTRAXTRALARGE: 5,
    XXXL: 6, XXXXL: 7, XXXXXL: 8,
  };
  if (Object.hasOwn(basics, size)) return basics[size];
  const multipleXL = size.match(/^(\d{1,2})X(?:L|LARGE)?$/);
  if (multipleXL) return 3 + Number(multipleXL[1]);
  const xRun = size.match(/^(X{2,10})L$/);
  if (xRun) return 3 + xRun[1].length;
  return null;
}

function variantAppearance(variant: ProductVariant) {
  const segments = variant.title.split(/\s*[/|]\s*/).map((part) => part.trim());
  const sizeIndex = segments.findIndex((part) => apparelSizeRank(part) !== null);
  return {
    rank: sizeIndex < 0 ? null : apparelSizeRank(segments[sizeIndex]),
    color: (variant.color?.trim() || segments.filter((_, index) => index !== sizeIndex).join(" / ")).trim(),
  };
}

const colorCollator = new Intl.Collator("en", { sensitivity: "base", numeric: true });

export function sortShopVariantsLargestFirst<T extends ProductVariant>(variants: readonly T[]): T[] {
  if (variants.length < 2) return [...variants];
  const parsed = variants.map((variant, index) => ({ variant, index, ...variantAppearance(variant) }));
  if (parsed.some((entry) => entry.rank === null)) return [...variants];
  parsed.sort((a, b) =>
    (b.rank! - a.rank!) ||
    colorCollator.compare(a.color, b.color) ||
    a.index - b.index
  );
  return parsed.map((entry) => entry.variant);
}
