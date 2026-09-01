type CountyWildlifeLink = { counties: string[]; name: string; slug: string };

const federalRefugeLinks: CountyWildlifeLink[] = [
  { counties: ["Chambers"], name: "Jocelyn Nungaray National Wildlife Refuge", slug: "jocelyn-nungaray-national-wildlife-refuge" },
  { counties: ["Aransas", "Refugio"], name: "Aransas National Wildlife Refuge", slug: "aransas-national-wildlife-refuge" },
  { counties: ["Burnet", "Travis", "Williamson"], name: "Balcones Canyonlands National Wildlife Refuge", slug: "balcones-canyonlands-national-wildlife-refuge" },
  { counties: ["Matagorda"], name: "Big Boggy National Wildlife Refuge", slug: "big-boggy-national-wildlife-refuge" },
  { counties: ["Brazoria"], name: "Brazoria National Wildlife Refuge", slug: "brazoria-national-wildlife-refuge" },
  { counties: ["Randall"], name: "Buffalo Lake National Wildlife Refuge", slug: "buffalo-lake-national-wildlife-refuge" },
  { counties: ["Harrison"], name: "Caddo Lake National Wildlife Refuge", slug: "caddo-lake-national-wildlife-refuge" },
  { counties: ["Grayson"], name: "Hagerman National Wildlife Refuge", slug: "hagerman-national-wildlife-refuge" },
  { counties: ["Cameron"], name: "Laguna Atascosa National Wildlife Refuge", slug: "laguna-atascosa-national-wildlife-refuge" },
  { counties: ["Starr", "Hidalgo", "Cameron", "Willacy"], name: "Lower Rio Grande Valley National Wildlife Refuge", slug: "lower-rio-grande-valley-national-wildlife-refuge" },
  { counties: ["Jefferson"], name: "McFaddin National Wildlife Refuge", slug: "mcfaddin-national-wildlife-refuge" },
  { counties: ["Bailey"], name: "Muleshoe National Wildlife Refuge", slug: "muleshoe-national-wildlife-refuge" },
  { counties: ["Anderson", "Cherokee"], name: "Neches River National Wildlife Refuge", slug: "neches-river-national-wildlife-refuge" },
  { counties: ["Brazoria", "Matagorda"], name: "San Bernard National Wildlife Refuge", slug: "san-bernard-national-wildlife-refuge" },
  { counties: ["Jefferson"], name: "Texas Point National Wildlife Refuge", slug: "texas-point-national-wildlife-refuge" },
  { counties: ["Liberty"], name: "Trinity River National Wildlife Refuge", slug: "trinity-river-national-wildlife-refuge" },
  { counties: ["Colorado"], name: "Attwater Prairie Chicken National Wildlife Refuge", slug: "attwater-prairie-chicken-national-wildlife-refuge" },
  { counties: ["Hidalgo"], name: "Santa Ana National Wildlife Refuge", slug: "santa-ana-national-wildlife-refuge" },
];

function normalizeCounty(value: string) {
  return value.replace(/\s+County$/i, "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function CountyWildlifeDestinations({ countyName }: { countyName: string }) {
  const countySlug = normalizeCounty(countyName);
  const destinations = federalRefugeLinks
    .filter((destination) => destination.counties.some((county) => normalizeCounty(county) === countySlug))
    .sort((left, right) => left.name.localeCompare(right.name));

  if (!destinations.length) return null;

  return <section className="mt-8 border-t border-border pt-6" aria-labelledby={`county-wildlife-${countySlug}`}>
    <p className="eyebrow text-primary">Wildlife &amp; public lands</p>
    <h3 id={`county-wildlife-${countySlug}`} className="mt-2 font-display text-3xl">Wildlife refuges connected to {countyName}</h3>
    <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">These destination guides are connected to {countyName} through the refuge’s verified county footprint. Current access, closures and visitor rules should always be confirmed with the managing agency.</p>
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      {destinations.map((destination) => <a key={destination.slug} href={`/destination/${destination.slug}`} className="group border-t border-border pt-4">
        <span className="eyebrow text-primary">National Wildlife Refuge</span>
        <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{destination.name}</strong>
        <span className="mt-3 inline-block text-sm font-semibold text-primary">Open destination guide →</span>
      </a>)}
    </div>
    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
      <a href="/explore/wildlife" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas wildlife destinations</a>
      <a href="/texas-birds-guide" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas birds guide</a>
      <a href="/explore/outdoors" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Outdoors &amp; wildlife</a>
    </div>
  </section>;
}
