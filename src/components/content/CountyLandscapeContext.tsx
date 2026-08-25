const regionalLandscapes: Record<string, Array<{ href: string; label: string }>> = {
  'hill-country': [
    { href: '/explore/landscapes/hill-country', label: 'Texas Hill Country' },
    { href: '/explore/landscapes/edwards-plateau', label: 'Edwards Plateau' },
    { href: '/explore/landscapes/caves-and-karst', label: 'Caves & karst' },
  ],
  'east-texas': [
    { href: '/explore/landscapes/piney-woods', label: 'Piney Woods' },
    { href: '/explore/landscapes/post-oak-savannah', label: 'Post Oak Savannah' },
    { href: '/explore/landscapes/forests', label: 'Texas forests' },
  ],
  'gulf-coast': [
    { href: '/explore/landscapes/gulf-coast', label: 'Texas Gulf Coast' },
    { href: '/explore/landscapes/wetlands-and-marshes', label: 'Wetlands & marshes' },
    { href: '/explore/landscapes/rivers-and-river-valleys', label: 'Rivers & river valleys' },
  ],
  'south-texas': [
    { href: '/explore/landscapes/south-texas-brush-country', label: 'South Texas Brush Country' },
    { href: '/explore/landscapes/rio-grande-valley', label: 'Rio Grande Valley' },
    { href: '/explore/landscapes/prairies-and-grasslands', label: 'Prairies & grasslands' },
  ],
  'west-texas': [
    { href: '/explore/landscapes/permian-basin', label: 'Permian Basin' },
    { href: '/explore/landscapes/trans-pecos-far-west-texas', label: 'Trans-Pecos & Far West Texas' },
    { href: '/explore/landscapes/deserts', label: 'Texas deserts' },
  ],
  panhandle: [
    { href: '/explore/landscapes/texas-panhandle', label: 'Texas Panhandle' },
    { href: '/explore/landscapes/high-plains-llano-estacado', label: 'High Plains & Llano Estacado' },
    { href: '/explore/landscapes/canyons', label: 'Texas canyons' },
  ],
  'north-texas': [
    { href: '/explore/landscapes/cross-timbers', label: 'Cross Timbers' },
    { href: '/explore/landscapes/blackland-prairie', label: 'Blackland Prairie' },
    { href: '/explore/landscapes/lakes-and-reservoirs', label: 'Lakes & reservoirs' },
  ],
};

export function CountyLandscapeContext({ countyName, region }: { countyName: string; region: string }) {
  const landscapes = regionalLandscapes[region] ?? [];
  if (!landscapes.length) return null;

  return <div className="border-t border-border pt-5">
    <p className="eyebrow text-primary">Landscape context</p>
    <p className="mt-2 text-sm leading-6">Because county lines can cross ecological boundaries, these are broad landscape guides associated with Texas Defined's <strong className="text-foreground">{title(region)}</strong> browsing region—not a claim that one ecoregion covers all of {countyName}.</p>
    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">{landscapes.map((link) => <a key={link.href} href={link.href} className="underline decoration-primary/40 underline-offset-4 hover:text-primary">{link.label}</a>)}</div>
    <a href="/explore/landscapes" className="mt-3 inline-block text-sm font-semibold text-primary">Explore all Texas landscapes →</a>
  </div>;
}

function title(value: string) { return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase()); }
