import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

type TexasMusicRouteSeo = {
  canonicalPath: `/${string}`;
  title: string;
  description: string;
};

type Batch1RouteSlug = "texas-blues" | "texas-conjunto-tejano" | "texas-western-swing";
type Batch2RouteSlug = "texas-country-outlaw" | "texas-rock-rockabilly" | "texas-jazz" | "texas-hip-hop";
type Batch3RouteSlug = "texas-gospel-rnb-pop";

type TexasMusicGuide = ReturnType<typeof import("@/data/texas-music-guides-batch1")["getTexasMusicGuideBatch1"]>;

function withRouteHead(guide: TexasMusicGuide, seo: TexasMusicRouteSeo) {
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

export async function loadTexasMusicGuideBatch1Route(slug: Batch1RouteSlug, seo: TexasMusicRouteSeo) {
  const { getTexasMusicGuideBatch1 } = await import("@/data/texas-music-guides-batch1");
  return withRouteHead(getTexasMusicGuideBatch1(slug), seo);
}

export async function loadTexasMusicGuideBatch2Route(slug: Batch2RouteSlug, seo: TexasMusicRouteSeo) {
  const { getTexasMusicGuideBatch2 } = await import("@/data/texas-music-guides-batch2");
  return withRouteHead(getTexasMusicGuideBatch2(slug), seo);
}

export async function loadTexasMusicGuideBatch3Route(slug: Batch3RouteSlug, seo: TexasMusicRouteSeo) {
  const { getTexasMusicGuideBatch3 } = await import("@/data/texas-music-guides-batch3");
  return withRouteHead(getTexasMusicGuideBatch3(slug), seo);
}
