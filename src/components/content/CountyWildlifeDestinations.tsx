type CountyWildlifeLink = { counties: string[]; kind: 'National Wildlife Refuge' | 'Wildlife Management Area'; name: string; slug: string };

const wildlifeLinks: CountyWildlifeLink[] = [
  { counties: ['Chambers'], kind: 'National Wildlife Refuge', name: 'Jocelyn Nungaray National Wildlife Refuge', slug: 'jocelyn-nungaray-national-wildlife-refuge' },
  { counties: ['Aransas', 'Refugio'], kind: 'National Wildlife Refuge', name: 'Aransas National Wildlife Refuge', slug: 'aransas-national-wildlife-refuge' },
  { counties: ['Burnet', 'Travis', 'Williamson'], kind: 'National Wildlife Refuge', name: 'Balcones Canyonlands National Wildlife Refuge', slug: 'balcones-canyonlands-national-wildlife-refuge' },
  { counties: ['Matagorda'], kind: 'National Wildlife Refuge', name: 'Big Boggy National Wildlife Refuge', slug: 'big-boggy-national-wildlife-refuge' },
  { counties: ['Brazoria'], kind: 'National Wildlife Refuge', name: 'Brazoria National Wildlife Refuge', slug: 'brazoria-national-wildlife-refuge' },
  { counties: ['Randall'], kind: 'National Wildlife Refuge', name: 'Buffalo Lake National Wildlife Refuge', slug: 'buffalo-lake-national-wildlife-refuge' },
  { counties: ['Harrison'], kind: 'National Wildlife Refuge', name: 'Caddo Lake National Wildlife Refuge', slug: 'caddo-lake-national-wildlife-refuge' },
  { counties: ['Grayson'], kind: 'National Wildlife Refuge', name: 'Hagerman National Wildlife Refuge', slug: 'hagerman-national-wildlife-refuge' },
  { counties: ['Cameron'], kind: 'National Wildlife Refuge', name: 'Laguna Atascosa National Wildlife Refuge', slug: 'laguna-atascosa-national-wildlife-refuge' },
  { counties: ['Cameron', 'Hidalgo', 'Starr', 'Willacy'], kind: 'National Wildlife Refuge', name: 'Lower Rio Grande Valley National Wildlife Refuge', slug: 'lower-rio-grande-valley-national-wildlife-refuge' },
  { counties: ['Jefferson'], kind: 'National Wildlife Refuge', name: 'McFaddin National Wildlife Refuge', slug: 'mcfaddin-national-wildlife-refuge' },
  { counties: ['Bailey'], kind: 'National Wildlife Refuge', name: 'Muleshoe National Wildlife Refuge', slug: 'muleshoe-national-wildlife-refuge' },
  { counties: ['Anderson', 'Cherokee'], kind: 'National Wildlife Refuge', name: 'Neches River National Wildlife Refuge', slug: 'neches-river-national-wildlife-refuge' },
  { counties: ['Brazoria', 'Matagorda'], kind: 'National Wildlife Refuge', name: 'San Bernard National Wildlife Refuge', slug: 'san-bernard-national-wildlife-refuge' },
  { counties: ['Jefferson'], kind: 'National Wildlife Refuge', name: 'Texas Point National Wildlife Refuge', slug: 'texas-point-national-wildlife-refuge' },
  { counties: ['Liberty'], kind: 'National Wildlife Refuge', name: 'Trinity River National Wildlife Refuge', slug: 'trinity-river-national-wildlife-refuge' },
  { counties: ['Colorado'], kind: 'National Wildlife Refuge', name: 'Attwater Prairie Chicken National Wildlife Refuge', slug: 'attwater-prairie-chicken-national-wildlife-refuge' },
  { counties: ['Hidalgo'], kind: 'National Wildlife Refuge', name: 'Santa Ana National Wildlife Refuge', slug: 'santa-ana-national-wildlife-refuge' },
  { counties: ['Nacogdoches'], kind: 'Wildlife Management Area', name: 'Alazan Bayou Wildlife Management Area', slug: 'alazan-bayou-wildlife-management-area' },
  { counties: ['Anderson'], kind: 'Wildlife Management Area', name: 'Big Lake Bottom Wildlife Management Area', slug: 'big-lake-bottom-wildlife-management-area' },
  { counties: ['Brewster'], kind: 'Wildlife Management Area', name: 'Black Gap Wildlife Management Area', slug: 'black-gap-wildlife-management-area' },
  { counties: ['Marion', 'Harrison'], kind: 'Wildlife Management Area', name: 'Caddo Lake Wildlife Management Area', slug: 'caddo-lake-wildlife-management-area' },
  { counties: ['La Salle', 'Dimmit'], kind: 'Wildlife Management Area', name: 'Chaparral Wildlife Management Area', slug: 'chaparral-wildlife-management-area' },
  { counties: ['Brewster'], kind: 'Wildlife Management Area', name: 'Elephant Mountain Wildlife Management Area', slug: 'elephant-mountain-wildlife-management-area' },
];

function normalizeCounty(value: string) {
  return value.replace(/\s+County$/i, '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function CountyWildlifeDestinations({ countyName }: { countyName: string }) {
  const countySlug = normalizeCounty(countyName);
  const destinations = wildlifeLinks
    .filter((destination) => destination.counties.some((county) => normalizeCounty(county) === countySlug))
    .sort((left, right) => left.name.localeCompare(right.name));

  if (!destinations.length) return null;

  return (
    <section className="mt-8 border-t border-border pt-6" aria-labelledby={`county-wildlife-${countySlug}`}>
      <p className="eyebrow text-primary">Wildlife & public lands</p>
      <h3 id={`county-wildlife-${countySlug}`} className="mt-2 font-display text-3xl">Wildlife destinations connected to {countyName}</h3>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">These TexasDefined records connect {countyName} to source-checked federal refuges and TPWD Wildlife Management Areas. Use the managing agency linked from each guide for current closures, permits and visitor conditions.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {destinations.map((destination) => (
          <a key={destination.slug} href={`/destination/${destination.slug}`} className="group border-t border-border pt-4">
            <span className="eyebrow text-primary">{destination.kind}</span>
            <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{destination.name}</strong>
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
