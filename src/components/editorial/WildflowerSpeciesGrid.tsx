import { Link } from "@tanstack/react-router";
import { editorialImageSrc } from "@/lib/editorial-image-delivery";

type SpeciesCard = {
  slug: string;
  common: string;
  scientific: string;
  bloom: string;
  regions: string;
  image: string;
  alt: string;
  credit: string;
};

const species: SpeciesCard[] = [
  { slug: "texas-bluebonnets-complete-guide", common: "Texas bluebonnet", scientific: "Lupinus texensis", bloom: "March–April", regions: "Central Texas, Hill Country, Blackland Prairie and beyond", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_bluebonnet_plant_lupinus_texensis_with_dark_blue_flowers_with_white_top.jpg", alt: "Texas bluebonnet flower spike", credit: "Thomas G. Barnes / U.S. Fish & Wildlife Service · public domain" },
  { slug: "texas-indian-paintbrush-guide", common: "Texas paintbrush", scientific: "Castilleja indivisa", bloom: "March–May", regions: "Central, eastern and coastal Texas prairies and roadsides", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_Paintbrush.JPG", alt: "Texas paintbrush with red-orange bracts", credit: "Greyson Orlando · public domain" },
  { slug: "texas-indian-blanket-guide", common: "Indian blanket / firewheel", scientific: "Gaillardia pulchella", bloom: "Spring–summer", regions: "Widespread sunny roadsides, prairies and open ground", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Gaillardia_pulchella.jpg", alt: "Indian blanket flower with red and yellow rays", credit: "Apanasevich Maxim · CC BY 4.0" },
  { slug: "texas-winecup-guide", common: "Winecup", scientific: "Callirhoe involucrata", bloom: "Spring–early summer", regions: "Prairies and open slopes across central and north Texas", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Callirhoe_involucrata.jpg", alt: "Magenta winecup wildflowers", credit: "Ghislain118 · Wikimedia Commons" },
  { slug: "texas-prairie-verbena-guide", common: "Prairie verbena", scientific: "Glandularia bipinnatifida", bloom: "Spring, often again after rain", regions: "Rocky prairie and roadside sites across much of Texas", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Glandularia_bipinnatifida.jpg", alt: "Purple prairie verbena flowers", credit: "Wikimedia Commons · licensed file" },
  { slug: "texas-horsemint-guide", common: "Horsemint / lemon beebalm", scientific: "Monarda citriodora", bloom: "Late spring–summer", regions: "Prairies and roadsides across much of Texas", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Monarda_citriodora.jpg", alt: "Horsemint with stacked lavender flower whorls", credit: "Clarence A. Rechenthin / USDA-NRCS · public domain" },
  { slug: "texas-mexican-hat-guide", common: "Mexican hat", scientific: "Ratibida columnifera", bloom: "Late spring–summer", regions: "Prairies and dry open ground of central, north and west Texas", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ratibida_columnifera.jpg", alt: "Mexican hat wildflower with tall cone and drooping rays", credit: "USFWS / Kirsten Brennan · CC BY 2.0" },
  { slug: "texas-black-eyed-susan-guide", common: "Black-eyed Susan", scientific: "Rudbeckia hirta", bloom: "Late spring–summer", regions: "Open ground across central, northern and eastern Texas", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Rudbeckia_hirta.jpg", alt: "Black-eyed Susan flowers with dark centers", credit: "Circeus · CC BY-SA 2.0 Canada" },
  { slug: "texas-purple-coneflower-guide", common: "Purple coneflower", scientific: "Echinacea purpurea", bloom: "Late spring–summer", regions: "Widely cultivated; verify local native range before planting", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Echinacea_purpurea_plant.jpg", alt: "Purple coneflower with raised orange-brown cones", credit: "Lena Jaginyan · CC BY 4.0" },
  { slug: "texas-goldenrod-guide", common: "Goldenrod", scientific: "Solidago spp.", bloom: "Late summer–fall", regions: "Multiple species across Texas prairies, edges and roadsides", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Solidago_canadensis_flower.jpg", alt: "Goldenrod cluster with many small yellow flowers", credit: "Willow Coville · CC BY-SA 4.0" },
  { slug: "texas-maximilian-sunflower-guide", common: "Maximilian sunflower", scientific: "Helianthus maximiliani", bloom: "Late summer–fall", regions: "Sunny prairies and roadsides across broad areas of Texas", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Helianthus_maximiliani_%284010962093%29.jpg", alt: "Tall Maximilian sunflower stems with yellow flowers", credit: "Matt Lavin · Wikimedia Commons" },
];

export function WildflowerSpeciesGrid() {
  return (
    <section aria-labelledby="wildflower-species-heading" className="my-12 sm:my-16">
      <div className="mb-7 border-y border-border py-6">
        <p className="eyebrow text-primary">Visual field guide</p>
        <h2 id="wildflower-species-heading" className="mt-3 font-display text-[2.25rem] font-semibold leading-[1.05] sm:text-[2.8rem]">11 Texas wildflowers to know</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">See the flower first, then open its guide for identification marks, bloom timing, habitat, Texas range and native-garden context.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {species.map((flower, index) => (
          <article key={flower.slug} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-transform duration-300 hover:-translate-y-1">
            <Link to="/article/$slug" params={{ slug: flower.slug }} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
                <img src={editorialImageSrc(flower.image)} alt={flower.alt} width={1200} height={900} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold tabular-nums text-foreground backdrop-blur">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="font-display text-2xl font-semibold leading-tight text-foreground">{flower.common}</h3>
                <p className="mt-1 font-serif text-sm italic text-muted-foreground">{flower.scientific}</p>
                <dl className="mt-5 space-y-3 border-t border-border pt-4 text-sm leading-6">
                  <div><dt className="font-semibold text-foreground">Bloom</dt><dd className="text-muted-foreground">{flower.bloom}</dd></div>
                  <div><dt className="font-semibold text-foreground">Texas range</dt><dd className="text-muted-foreground">{flower.regions}</dd></div>
                </dl>
                <p className="mt-5 text-sm font-semibold text-primary">Open species guide →</p>
                <p className="mt-3 text-[0.68rem] leading-4 text-muted-foreground">Photo: {flower.credit}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
