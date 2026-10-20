import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";
import type { Category, CategorySlug } from "./types";
import { getCuratedTourismCollection } from "./curated-tourism-collections";
import { getDestinationsBySlugs } from "./destination-collections.functions";

// This module stays outside the eagerly loaded Explore route shell. A visitor
// loads the tourism dataset and its SEO graph only when opening one of the
// five curated collections.
export async function loadCuratedTourismCategory(slug: string) {
  const curated = getCuratedTourismCollection(slug);
  if (!curated) return null;

  const slugs = curated.items.flatMap((item) => "destinationSlug" in item ? [item.destinationSlug] : []);
  const resolved = slugs.length ? await getDestinationsBySlugs({ data: { slugs } }) : [];
  const category: Category = {
    slug: curated.slug as CategorySlug,
    name: curated.title,
    eyebrow: curated.eyebrow,
    description: curated.intro,
  };
  const canonicalPath = `/explore/${curated.slug}`;
  const curatedHead = {
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: curated.title,
      description: curated.intro.slice(0, 270),
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [{
      type: "application/ld+json" as const,
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: curated.title,
        description: curated.intro,
        url: `https://${texasDefinedBrand.identity.domain}${canonicalPath}`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: curated.items.length,
          itemListElement: curated.items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            url: item.officialUrl,
          })),
        },
      }),
    }],
  };
  return {
    category,
    articles: [],
    destinations: [],
    authorityHtml: null,
    curated,
    existing: resolved.map(({ slug, name, hero }) => ({ slug, name, hero })),
    curatedHead,
  };
}
