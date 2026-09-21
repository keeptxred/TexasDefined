import type { Article } from "../types";

const source = "https://www.wildflower.org/plants/";
const publishedAt = "2026-09-05";

const stub = (
  slug: string,
  title: string,
  dek: string,
  scientificName: string,
  image: string,
  alt: string,
): Article => ({
  id: `wildflower-${slug}`,
  brandId: "texasdefined",
  slug,
  title,
  dek,
  category: "outdoors",
  hero: { src: image, alt, width: 1600, height: 1200 },
  authorId: "a-marisol",
  publishedAt,
  readingMinutes: 6,
  tags: ["texas wildflowers", scientificName, "native plants"],
  featured: false,
  sourceName: "Lady Bird Johnson Wildflower Center",
  sourceUrl: source,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
});

export const texasWildflowerSpeciesStubs: Article[] = [
  stub("texas-indian-paintbrush-guide", "Texas Indian Paintbrush: Identification, Bloom Season and Where It Grows", "How to recognize Castilleja indivisa, the red-orange spring companion that often shares Texas roadsides and prairies with bluebonnets.", "Castilleja indivisa", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_Paintbrush.JPG", "Texas paintbrush with vivid red-orange bracts"),
  stub("texas-indian-blanket-guide", "Indian Blanket in Texas: Firewheel Identification, Season and Habitat", "A field guide to Gaillardia pulchella, the red-and-yellow firewheel that carries Texas wildflower color from spring toward summer.", "Gaillardia pulchella", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Gaillardia_pulchella.jpg", "Indian blanket flower with red petals tipped in yellow"),
  stub("texas-winecup-guide", "Texas Winecups: How to Identify Callirhoe involucrata and Grow It at Home", "Winecups spread magenta across Texas roadsides and native gardens. Learn their low growth habit, bloom season, habitat and landscape value.", "Callirhoe involucrata", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Callirhoe_involucrata.jpg", "Magenta winecup wildflowers"),
  stub("texas-prairie-verbena-guide", "Prairie Verbena in Texas: Purple Roadside Blooms Explained", "Identify Glandularia bipinnatifida by its purple flower clusters and divided leaves, and learn when and where it blooms in Texas.", "Glandularia bipinnatifida", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Glandularia_bipinnatifida.jpg", "Purple prairie verbena flowers"),
  stub("texas-horsemint-guide", "Texas Horsemint: Lemon Beebalm Identification, Season and Pollinator Value", "A field guide to Monarda citriodora, the stacked lavender horsemint that becomes a pollinator magnet as Texas spring turns to summer.", "Monarda citriodora", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Monarda_citriodora.jpg", "Horsemint with stacked lavender flower whorls"),
  stub("texas-mexican-hat-guide", "Mexican Hat Wildflowers in Texas: Identification, Bloom Season and Habitat", "Learn the tall-cone silhouette of Ratibida columnifera, a drought-tough prairie flower common across open Texas landscapes.", "Ratibida columnifera", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ratibida_columnifera.jpg", "Mexican hat wildflower with a tall cone and drooping rays"),
  stub("texas-black-eyed-susan-guide", "Black-eyed Susans in Texas: Rudbeckia hirta Identification and Growing Guide", "Golden rays and a dark center make Rudbeckia hirta familiar. See how its season, habitat and garden behavior fit Texas conditions.", "Rudbeckia hirta", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Rudbeckia_hirta.jpg", "Black-eyed Susan flowers with golden petals and dark centers"),
  stub("texas-purple-coneflower-guide", "Purple Coneflower in Texas: Identification, Garden Use and Native-Range Context", "Echinacea purpurea is a celebrated pollinator plant, but Texas gardeners should understand its regional native-range context before planting.", "Echinacea purpurea", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Echinacea_purpurea_plant.jpg", "Purple coneflower with raised orange-brown cones"),
  stub("texas-goldenrod-guide", "Texas Goldenrod: The Fall Wildflower That Deserves a Better Reputation", "Goldenrods bring late-season yellow to Texas and valuable pollen and nectar to insects. Learn how Solidago species fit Texas landscapes.", "Solidago spp.", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Solidago_canadensis_flower.jpg", "Goldenrod cluster with many small yellow flowers"),
  stub("texas-maximilian-sunflower-guide", "Maximilian Sunflowers in Texas: Tall Fall Color for Prairies and Gardens", "Helianthus maximiliani can turn a Texas prairie edge gold in fall. Learn its growth habit, bloom season and role in native landscapes.", "Helianthus maximiliani", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Helianthus_maximiliani_%284010962093%29.jpg", "Tall Maximilian sunflower stems with yellow flowers"),
];
