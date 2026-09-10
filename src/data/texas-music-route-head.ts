import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";
import { getTexasMusicGuideBatch2 } from "@/data/texas-music-guides-batch2";

type Batch2RouteSlug = "texas-country-outlaw" | "texas-rock-rockabilly" | "texas-jazz" | "texas-hip-hop";

type TexasMusicRouteSeo = {
  canonicalPath: `/${string}`;
  title: string;
  description: string;
};

export function loadTexasMusicGuideBatch2Route(slug: Batch2RouteSlug, seo: TexasMusicRouteSeo) {
  const guide = getTexasMusicGuideBatch2(slug);
  return {
    ...guide,
    head: {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: seo.canonicalPath,
        title: seo.title,
        description: seo.description,
        type: "article",
      }),
      links: [canonicalLink(texasDefinedBrand, seo.canonicalPath)],
    },
  };
}
