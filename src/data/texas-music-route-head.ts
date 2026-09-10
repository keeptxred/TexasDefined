import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

type Batch1RouteSlug = "texas-blues" | "texas-conjunto-tejano" | "texas-western-swing";
type Batch2RouteSlug = "texas-country-outlaw" | "texas-rock-rockabilly" | "texas-jazz" | "texas-hip-hop";
type Batch3RouteSlug = "texas-gospel-rnb-pop";
type CityRouteSlug = "austin-music-history" | "houston-music-history" | "lubbock-music-history" | "san-antonio-music-history" | "dallas-fort-worth-music-history";

type TexasMusicRouteSlug = Batch1RouteSlug | Batch2RouteSlug | Batch3RouteSlug | CityRouteSlug;
type TexasMusicGuide = ReturnType<typeof import("@/data/texas-music-guides-batch1")["getTexasMusicGuideBatch1"]>;

const routeTitles: Record<TexasMusicRouteSlug, string> = {
  "texas-blues": "Texas Blues: History, East Texas Roots & Houston Sound",
  "texas-conjunto-tejano": "Texas Conjunto & Tejano: History, San Antonio & Border Sound",
  "texas-western-swing": "Texas Western Swing: History, Bob Wills & Dance Hall Sound",
  "texas-country-outlaw": "Texas Country & Outlaw Country: History & Austin Roots",
  "texas-rock-rockabilly": "Texas Rock & Rockabilly: Buddy Holly, Orbison & Roots",
  "texas-jazz": "Texas Jazz: History, Fort Worth, Houston & Innovators",
  "texas-hip-hop": "Texas Hip-Hop: Houston Rap, DJ Screw, Geto Boys & UGK",
  "texas-gospel-rnb-pop": "Texas Gospel, R&B & Pop: Church Roots, Houston Soul & Global Stars",
  "austin-music-history": "Austin Music History: Country, Blues & Live Music",
  "houston-music-history": "Houston Music History: Blues, R&B, Gospel & Hip-Hop",
  "lubbock-music-history": "Lubbock Music History: Buddy Holly & West Texas Rock",
  "san-antonio-music-history": "San Antonio Music History: Conjunto, Tejano & West Side Sound",
  "dallas-fort-worth-music-history": "Dallas–Fort Worth Music History: Blues, Jazz & Recording",
};

function withRouteHead(slug: TexasMusicRouteSlug, guide: TexasMusicGuide) {
  const canonicalPath = `/${slug}` as const;
  return {
    ...guide,
    head: {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: routeTitles[slug],
        description: guide.dek,
        type: "article",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    },
  };
}

export async function loadTexasMusicRoute(slug: TexasMusicRouteSlug) {
  let guide: TexasMusicGuide;
  switch (slug) {
    case "texas-blues":
    case "texas-conjunto-tejano":
    case "texas-western-swing": {
      const { getTexasMusicGuideBatch1 } = await import("@/data/texas-music-guides-batch1");
      guide = getTexasMusicGuideBatch1(slug);
      break;
    }
    case "texas-country-outlaw":
    case "texas-rock-rockabilly":
    case "texas-jazz":
    case "texas-hip-hop": {
      const { getTexasMusicGuideBatch2 } = await import("@/data/texas-music-guides-batch2");
      guide = getTexasMusicGuideBatch2(slug);
      break;
    }
    case "texas-gospel-rnb-pop": {
      const { getTexasMusicGuideBatch3 } = await import("@/data/texas-music-guides-batch3");
      guide = getTexasMusicGuideBatch3(slug);
      break;
    }
    default: {
      const { getTexasMusicCityGuide } = await import("@/data/texas-music-city-guides");
      guide = getTexasMusicCityGuide(slug);
    }
  }
  return withRouteHead(slug, guide);
}
