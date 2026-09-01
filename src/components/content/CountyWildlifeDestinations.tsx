type CountyWildlifeLink = { counties: string[]; name: string; slug: string; kind: 'National Wildlife Refuge' | 'Wildlife Management Area' };

const wildlifeLinks: CountyWildlifeLink[] = [
  { counties: ['Chambers'], name: 'Jocelyn Nungaray National Wildlife Refuge', slug: 'jocelyn-nungaray-national-wildlife-refuge', kind: 'National Wildlife Refuge' },
  { counties: ['Aransas', 'Refugio'], name: 'Aransas National Wildlife Refuge', slug: 'aransas-national-wildlife-refuge', kind: 'National Wildlife Refuge' },
  { counties: ['Burnet', 'Travis', 'Williamson'], name: 'Balcones Canyonlands National Wildlife Refuge', slug: 'balcones-canyonlands-national-wildlife-refuge', kind: 'National Wildlife Refuge' },
  { counties: ['Matagorda'], name: 'Big Boggy National Wildlife Refuge', slug: 'big-boggy-national-wildlife-refuge', kind: 'National Wildlife Refuge' },
  { counties: ['Brazoria'], name: 'Brazoria National Wildlife Refuge', slug: 'brazoria-national-wildlife-refuge', kind: 'National Wildlife Refuge' },
  { counties: ['Randall'], name: 'Buffalo Lake National Wildlife Refuge', slug: 'buffalo-lake-national-wildlife-refuge', kind: 'National Wildlife Refuge' },
  { counties: ['Harrison'], name: 'Caddo Lake National Wildlife Refuge', slug: 'caddo-lake-national-wildlife-refuge', kind: 'National Wildlife Refuge' },
  { counties: ['Grayson'], name: 'Hagerman National Wildlife Refuge', slug: 'hagerman-national-wildlife-refuge', kind: 'National Wildlife Refuge' },
  { counties: ['Cameron'], name: 'Laguna Atascosa National Wildlife Refuge', slug: 'laguna-atascosa-national-wildlife-refuge', kind: 'National Wildlife Refuge' },
  { counties: ['Cameron', 'Hidalgo', 'Starr', 'Willacy'], name: 'Lower Rio Grande Valley National Wildlife Refuge', slug: 'lower-rio-grande-valley-national-wildlife-refuge', kind: 'National Wildlife Refuge' },
  { counties: ['Jefferson'], name: 'McFaddin National Wildlife Refuge', slug: 'mcfaddin-national-wildlife-refuge', kind: 'National Wildlife Refuge' },
  { counties: ['Bailey'], name: 'Muleshoe National Wildlife Refuge', slug: 'muleshoe-national-wildlife-refuge', kind: 'National Wildlife Refuge' },
  { counties: ['Anderson', 'Cherokee'], name: 'Neches River National Wildlife Refuge', slug: 'neches-river-national-wildlife-refuge', kind: 'National Wildlife Refuge' },
  { counties: ['Brazoria', 'Matagorda'], name: 'San Bernard National Wildlife Refuge', slug: 'san-bernard-national-wildlife-refuge', kind: 'National Wildlife Refuge' },
  { counties: ['Jefferson'], name: 'Texas Point National Wildlife Refuge', slug: 'texas-point-national-wildlife-refuge', kind: 'National Wildlife Refuge' },
  { counties: ['Liberty'], name: 'Trinity River National Wildlife Refuge', slug: 'trinity-river-national-wildlife-refuge', kind: 'National Wildlife Refuge' },
  { counties: ['Colorado'], name: 'Attwater Prairie Chicken National Wildlife Refuge', slug: 'attwater-prairie-chicken-national-wildlife-refuge', kind: 'National Wildlife Refuge' },
  { counties: ['Hidalgo'], name: 'Santa Ana National Wildlife Refuge', slug: 'santa-ana-national-wildlife-refuge', kind: 'National Wildlife Refuge' },
  { counties: ['Nacogdoches'], name: 'Alazan Bayou Wildlife Management Area', slug: 'alazan-bayou-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Brewster'], name: 'Black Gap Wildlife Management Area', slug: 'black-gap-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Chambers'], name: 'Candy Cain Abshier Wildlife Management Area', slug: 'candy-cain-abshier-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['La Salle', 'Dimmit'], name: 'Chaparral Wildlife Management Area', slug: 'chaparral-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Brewster'], name: 'Elephant Mountain Wildlife Management Area', slug: 'elephant-mountain-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Hemphill'], name: 'Gene Howe Wildlife Management Area', slug: 'gene-howe-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Anderson'], name: 'Gus Engeling Wildlife Management Area', slug: 'gus-engeling-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Live Oak', 'McMullen'], name: 'James E. Daughtrey Wildlife Management Area', slug: 'james-e-daughtrey-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Brazoria'], name: 'Justin Hurst Wildlife Management Area', slug: 'justin-hurst-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Leon'], name: 'Keechi Creek Wildlife Management Area', slug: 'keechi-creek-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Kerr'], name: 'Kerr Wildlife Management Area', slug: 'kerr-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Starr', 'Hidalgo', 'Cameron', 'Willacy'], name: 'Las Palomas Wildlife Management Area', slug: 'las-palomas-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Anderson'], name: 'Big Lake Bottom Wildlife Management Area', slug: 'big-lake-bottom-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Fannin'], name: 'Caddo National Grasslands Wildlife Management Area', slug: 'caddo-national-grasslands-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Henderson'], name: 'Cedar Creek Islands Wildlife Management Area', slug: 'cedar-creek-islands-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Delta', 'Hopkins'], name: 'Cooper Wildlife Management Area', slug: 'cooper-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Gonzales'], name: 'M.O. Neasloney Wildlife Management Area', slug: 'mo-neasloney-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Lamar'], name: 'Pat Mayse Wildlife Management Area', slug: 'pat-mayse-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Freestone', 'Navarro'], name: 'Richland Creek Wildlife Management Area', slug: 'richland-creek-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Hunt', 'Van Zandt'], name: 'Tawakoni Wildlife Management Area', slug: 'tawakoni-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Jasper', 'Tyler'], name: 'Angelina-Neches/Dam B Wildlife Management Area', slug: 'angelina-neches-dam-b-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Marion', 'Harrison'], name: 'Caddo Lake Wildlife Management Area', slug: 'caddo-lake-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Calhoun', 'Refugio'], name: 'Guadalupe Delta Wildlife Management Area', slug: 'guadalupe-delta-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Jefferson'], name: 'J.D. Murphree Wildlife Management Area', slug: 'jd-murphree-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Matagorda'], name: 'Mad Island Wildlife Management Area', slug: 'mad-island-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Cottle'], name: 'Matador Wildlife Management Area', slug: 'matador-wildlife-management-area', kind: 'Wildlife Management Area' },
  { counties: ['Mason'], name: 'Mason Mountain Wildlife Management Area', slug: 'mason-mountain-wildlife-management-area', kind: 'Wildlife Management Area' },
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
      <h3 id={`county-wildlife-${countySlug}`} className="mt-2 font-display text-3xl">Wildlife refuges and management areas connected to {countyName}</h3>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">These TexasDefined wildlife records are tied to {countyName} through current federal or state location data and point to the managing agency for current visitor conditions and access rules.</p>
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
