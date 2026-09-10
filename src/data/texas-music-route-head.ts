import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";
import { getTexasMusicGuideBatch2 } from "@/data/texas-music-guides-batch2";

const seoTitles = {
  "texas-country-outlaw": "Texas Country & Outlaw Country: History & Austin Roots",
  "texas-rock-rockabilly": "Texas Rock & Rockabilly: Buddy Holly, Orbison & Roots",
  "texas-jazz": "Texas Jazz: History, Fort Worth, Houston & Innovators",
  "texas-hip-hop": "Texas Hip-Hop: Houston Rap, DJ Screw, Geto Boys & UGK",
} as const;

type Batch2RouteSlug = keyof typeof seoTitles;

export function loadTexasMusicGuideBatch2Route(slug: Batch2RouteSlug) {
  const guide = getTexasMusicGuideBatch2(slug);
  const canonicalPath = `/${slug}`;
  return {
    ...guide,
    head: {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: seoTitles[slug],
        description: guide.dek,
        type: "article",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    },
  };
}
