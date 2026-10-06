export type DiscoverImageOverride = {
  src: string;
  type: string;
  width: number;
  height?: number;
};

const TEXASDEFINED_DISCOVER_IMAGE_OVERRIDES: Record<string, DiscoverImageOverride> = {
  "/event/chappell-hill-bluebonnet-festival": { src: "/images/discover/chappell-hill-bluebonnet-festival.webp", type: "image/webp", width: 1600, height: 900 },
  "/article/ima-hogg-texas-legacy": { src: "/images/discover/ima-hogg-texas-legacy.webp", type: "image/webp", width: 1600, height: 900 },
  "/article/camping-in-texas-with-your-dog": { src: "/images/discover/camping-in-texas-with-your-dog.webp", type: "image/webp", width: 1600, height: 900 },
  "/article/texas-high-school-football-scores-schedules": { src: "/images/discover/texas-high-school-football-scores-schedules.webp", type: "image/webp", width: 1600, height: 900 },
  "/article/best-lighthouses-to-visit-in-texas": { src: "/images/discover/best-lighthouses-to-visit-in-texas.webp", type: "image/webp", width: 1600, height: 900 },
  "/article/texas-medal-of-honor-heroes": { src: "/images/discover/texas-medal-of-honor-heroes.webp", type: "image/webp", width: 1600, height: 900 },
  "/article/texas-red-river-war-guide": { src: "/images/discover/texas-red-river-war-guide.webp", type: "image/webp", width: 1600, height: 900 },
  "/article/republic-of-texas-government-trail": { src: "/images/discover/republic-of-texas-government-trail.webp", type: "image/webp", width: 1600, height: 900 },
  "/article/brazoria-plantations-slavery-emancipation-history": { src: "/images/discover/brazoria-plantations-slavery-emancipation-history.webp", type: "image/webp", width: 1600, height: 900 },
  "/article/texas-frontier-forts-road-trip": { src: "/images/discover/texas-frontier-forts-road-trip.webp", type: "image/webp", width: 1600, height: 900 },
  "/article/texas-ecoregions-habitats-guide": { src: "/images/editorial/texas-ecoregions-habitats.jpg", type: "image/jpeg", width: 1600, height: 2133 },
  "/county/collin": { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Collin_County_Courthouse_%281927%29%2C_McKinney%2C_Texas_%2828181193439%29.jpg?width=1600", type: "image/jpeg", width: 1600 },
  "/sports-venue/xtreme-raceway-park": { src: "/images/discover/xtreme-raceway-park.webp", type: "image/webp", width: 1600, height: 900 },
};

export function getTexasDefinedDiscoverImageOverride(canonicalPath: string | undefined) {
  return canonicalPath ? TEXASDEFINED_DISCOVER_IMAGE_OVERRIDES[canonicalPath] : undefined;
}
