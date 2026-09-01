type CountyWildlifeLink = { county: string; name: string; slug: string };

const federalRefugeLinks: CountyWildlifeLink[] = [
  { county: 'Chambers', name: 'Jocelyn Nungaray National Wildlife Refuge', slug: 'jocelyn-nungaray-national-wildlife-refuge' },
  { county: 'Refugio', name: 'Aransas National Wildlife Refuge', slug: 'aransas-national-wildlife-refuge' },
  { county: 'Burnet', name: 'Balcones Canyonlands National Wildlife Refuge', slug: 'balcones-canyonlands-national-wildlife-refuge' },
  { county: 'Matagorda', name: 'Big Boggy National Wildlife Refuge', slug: 'big-boggy-national-wildlife-refuge' },
  { county: 'Brazoria', name: 'Brazoria National Wildlife Refuge', slug: 'brazoria-national-wildlife-refuge' },
  { county: 'Randall', name: 'Buffalo Lake National Wildlife Refuge', slug: 'buffalo-lake-national-wildlife-refuge' },
  { county: 'Harrison', name: 'Caddo Lake National Wildlife Refuge', slug: 'caddo-lake-national-wildlife-refuge' },
  { county: 'Grayson', name: 'Hagerman National Wildlife Refuge', slug: 'hagerman-national-wildlife-refuge' },
  { county: 'Cameron', name: 'Laguna Atascosa National Wildlife Refuge', slug: 'laguna-atascosa-national-wildlife-refuge' },
  { county: 'Hidalgo', name: 'Lower Rio Grande Valley National Wildlife Refuge', slug: 'lower-rio-grande-valley-national-wildlife-refuge' },
  { county: 'Jefferson', name: 'McFaddin National Wildlife Refuge', slug: 'mcfaddin-national-wildlife-refuge' },
  { county: 'Bailey', name: 'Muleshoe National Wildlife Refuge', slug: 'muleshoe-national-wildlife-refuge' },
  { county: 'Cherokee', name: 'Neches River National Wildlife Refuge', slug: 'neches-river-national-wildlife-refuge' },
  { county: 'Brazoria', name: 'San Bernard National Wildlife Refuge', slug: 'san-bernard-national-wildlife-refuge' },
  { county: 'Jefferson', name: 'Texas Point National Wildlife Refuge', slug: 'texas-point-national-wildlife-refuge' },
  { county: 'Liberty', name: 'Trinity River National Wildlife Refuge', slug: 'trinity-river-national-wildlife-refuge' },
  { county: 'Colorado', name: 'Attwater Prairie Chicken National Wildlife Refuge', slug: 'attwater-prairie-chicken-national-wildlife-refuge' },
  { county: 'Hidalgo', name: 'Santa Ana National Wildlife Refuge', slug: 'santa-ana-national-wildlife-refuge' },
];

function normalizeCounty(value: string) {
  return value.replace(/\s+County$/i, '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function CountyWildlifeDestinations({ countyName }: { countyName: string }) {
  const countySlug = normalizeCounty(countyName);
  const destinations = federalRefugeLinks
    .filter((destination) => normalizeCounty(destination.county) === countySlug)
    .sort((left, right) => left.name.localeCompare(right.name));

  if (!destinations.length) return null;

  return (
    <section className="mt-8 border-t border-border pt-6" aria-labelledby={`county-wildlife-${countySlug}`}>
      <p className="eyebrow text-primary">Wildlife & public lands</p>
      <h3 id={`county-wildlife-${countySlug}`} className="mt-2 font-display text-3xl">Wildlife refuges in {countyName}</h3>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
        These TexasDefined destination guides are tied to {countyName} through verified location data and use the managing agency as the controlling visitor source.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {destinations.map((destination) => (
          <a key={destination.slug} href={`/destination/${destination.slug}`} className="group border-t border-border pt-4">
            <span className="eyebrow text-primary">National Wildlife Refuge</span>
            <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{destination.name}</strong>
            <span className="mt-2 block text-sm leading-6 text-muted-foreground">Open the TexasDefined guide for visitor planning, wildlife highlights, official-source details and regional trip links.</span>
            <span className="mt-3 inline-block text-sm font-semibold text-primary">Open wildlife guide →</span>
          </a>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
        <a href="/explore/wildlife" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas wildlife destinations</a>
        <a href="/texas-birds-guide" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas birds guide</a>
        <a href="/explore/outdoors" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Outdoors & wildlife</a>
      </div>
    </section>
  );
}
